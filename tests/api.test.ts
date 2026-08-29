import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import { db } from '../src/server/db';
import { authMiddleware, AuthenticatedRequest, generateMockToken } from '../src/server/auth';

function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use('/api', authMiddleware);

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.get('/api/db/health', (req, res) => {
    const dbStatus = db.getHealthStatus();
    res.json({ database: dbStatus, timestamp: new Date().toISOString() });
  });

  app.get('/api/auth/verify', (req: AuthenticatedRequest, res) => {
    res.json({ authenticated: true, user: req.user });
  });

  app.post('/api/auth/token', (req, res) => {
    const { role = 'Student' } = req.body;
    const token = generateMockToken(role as any);
    res.json({ role, token, authorizationHeader: `Bearer ${token}` });
  });

  app.get('/api/telemetry/students', async (req, res) => {
    const students = await db.getStudents();
    res.json({ students });
  });

  app.get('/api/telemetry/student/:studentId', async (req, res) => {
    const { studentId } = req.params;
    const student = await db.getStudentById(studentId);
    const submissions = await db.getActivitySubmissions(studentId);
    res.json({ student, submissions });
  });

  app.post('/api/telemetry/activity', async (req, res) => {
    const activity = req.body;
    const submission = await db.addActivitySubmission(activity);
    const updatedStudents = await db.getStudents();
    res.json({ success: true, submission, updatedStudents });
  });

  app.post('/api/cloud-db/seed', async (req, res) => {
    const counts = await db.seedCloudDB();
    const dbStatus = db.getHealthStatus();
    res.json({ success: true, message: 'Seeded', provider: dbStatus.provider, records: counts });
  });

  app.get('/api/admin/students', async (req, res) => {
    const students = await db.getStudents();
    res.json({ success: true, students });
  });

  app.post('/api/admin/students', async (req, res) => {
    const data = req.body;
    const newStudent = await db.upsertStudent({ id: data.id || `st-${Date.now()}`, ...data });
    res.json({ success: true, student: newStudent });
  });

  app.delete('/api/admin/students/:id', async (req, res) => {
    const deleted = await db.deleteStudent(req.params.id);
    res.json({ success: deleted });
  });

  app.get('/api/admin/teachers', async (req, res) => {
    const teachers = await db.getTeachers();
    res.json({ success: true, teachers });
  });

  app.post('/api/admin/teachers', async (req, res) => {
    const newTeacher = await db.upsertTeacher({ id: req.body.id || `tc-${Date.now()}`, ...req.body });
    res.json({ success: true, teacher: newTeacher });
  });

  app.delete('/api/admin/teachers/:id', async (req, res) => {
    const deleted = await db.deleteTeacher(req.params.id);
    res.json({ success: deleted });
  });

  app.get('/api/admin/courses', async (req, res) => {
    const courses = await db.getCourses();
    res.json({ success: true, courses });
  });

  app.post('/api/admin/courses', async (req, res) => {
    const newCourse = await db.upsertCourse({ id: req.body.id || `crs-${Date.now()}`, ...req.body });
    res.json({ success: true, course: newCourse });
  });

  app.delete('/api/admin/courses/:id', async (req, res) => {
    const deleted = await db.deleteCourse(req.params.id);
    res.json({ success: deleted });
  });

  return app;
}

describe('API Endpoints & Integration Tests', () => {
  const app = createTestApp();
  const teacherToken = generateMockToken('Teacher');
  const studentToken = generateMockToken('Student');

  it('GET /api/health should return ok status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('timestamp');
  });

  it('GET /api/db/health should return database connection pool metrics', async () => {
    const res = await request(app)
      .get('/api/db/health')
      .set('Authorization', `Bearer ${teacherToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('database');
    expect(res.body.database.status).toBe('connected');
    expect(res.body.database.maxPoolSize).toBe(20);
  });

  it('GET /api/auth/verify should return current authenticated user context', async () => {
    const res = await request(app)
      .get('/api/auth/verify')
      .set('Authorization', `Bearer ${teacherToken}`);

    expect(res.status).toBe(200);
    expect(res.body.authenticated).toBe(true);
    expect(res.body.user.role).toBe('Teacher');
  });

  it('POST /api/auth/token should generate a new bearer token', async () => {
    const res = await request(app)
      .post('/api/auth/token')
      .send({ role: 'Student' });

    expect(res.status).toBe(200);
    expect(res.body.role).toBe('Student');
    expect(res.body).toHaveProperty('token');
    expect(res.body.authorizationHeader).toContain('Bearer ');
  });

  it('GET /api/telemetry/students should return list of students', async () => {
    const res = await request(app)
      .get('/api/telemetry/students')
      .set('Authorization', `Bearer ${teacherToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('students');
    expect(Array.isArray(res.body.students)).toBe(true);
    expect(res.body.students.length).toBeGreaterThan(0);
  });

  it('GET /api/telemetry/student/:studentId should return student details and submissions', async () => {
    const res = await request(app)
      .get('/api/telemetry/student/st-101')
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('student');
    expect(res.body).toHaveProperty('submissions');
    expect(res.body.student.id).toBe('st-101');
  });

  it('POST /api/cloud-db/seed should trigger Cloud DB seeding and return provider metrics', async () => {
    const res = await request(app)
      .post('/api/cloud-db/seed')
      .set('Authorization', `Bearer ${teacherToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty('provider');
    expect(res.body).toHaveProperty('records');
  });

  it('GET and POST /api/admin/students should manage student records correctly', async () => {
    const createRes = await request(app)
      .post('/api/admin/students')
      .set('Authorization', `Bearer ${teacherToken}`)
      .send({
        studentName: 'Alex Cloud',
        rollNo: 'AST-2026-999',
        email: 'alex.cloud@eng.edu',
        targetRole: 'Cloud Native Developer',
      });

    expect(createRes.status).toBe(200);
    expect(createRes.body.success).toBe(true);
    expect(createRes.body.student.studentName).toBe('Alex Cloud');

    const getRes = await request(app)
      .get('/api/admin/students')
      .set('Authorization', `Bearer ${teacherToken}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body.students.some((s: any) => s.studentName === 'Alex Cloud')).toBe(true);
  });

  it('GET and POST /api/admin/teachers should manage teacher records correctly', async () => {
    const createRes = await request(app)
      .post('/api/admin/teachers')
      .set('Authorization', `Bearer ${teacherToken}`)
      .send({
        name: 'Dr. Alan Turing',
        email: 'turing@eng.edu',
        department: 'Theoretical CS',
      });

    expect(createRes.status).toBe(200);
    expect(createRes.body.success).toBe(true);
    expect(createRes.body.teacher.name).toBe('Dr. Alan Turing');
  });

  it('GET and POST /api/admin/courses should manage course records correctly', async () => {
    const createRes = await request(app)
      .post('/api/admin/courses')
      .set('Authorization', `Bearer ${teacherToken}`)
      .send({
        code: 'CS808',
        name: 'Cloud DB Architectures',
      });

    expect(createRes.status).toBe(200);
    expect(createRes.body.success).toBe(true);
    expect(createRes.body.course.code).toBe('CS808');
  });
});
