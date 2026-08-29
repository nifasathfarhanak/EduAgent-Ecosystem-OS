/**
 * Supabase Client — Real Database Connection
 * 
 * This module provides the Supabase client for real CRUD operations
 * against your Supabase PostgreSQL database.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Database types matching our Supabase schema
export interface DBTeacher {
  id: string;
  name: string;
  email: string;
  department: string;
  created_at: string;
}

export interface DBStudent {
  id: string;
  name: string;
  roll_no: string;
  email: string | null;
  department: string;
  teacher_id: string | null;
  created_at: string;
}

export interface DBCourse {
  id: string;
  code: string;
  name: string;
  teacher_id: string | null;
  created_at: string;
}

export interface DBAttendance {
  id: string;
  student_id: string;
  course_id: string | null;
  date: string;
  status: 'present' | 'absent' | 'late';
  marked_by: string | null;
  created_at: string;
}

export interface DBAssignment {
  id: string;
  title: string;
  description: string | null;
  course_id: string | null;
  due_date: string | null;
  max_marks: number;
  created_by: string | null;
  created_at: string;
}

export interface DBSubmission {
  id: string;
  assignment_id: string;
  student_id: string;
  content: string | null;
  submitted_at: string;
  score: number | null;
  ai_feedback: string | null;
  graded_by: string | null;
  graded_at: string | null;
}

// Create the Supabase client
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://wvfpbwbxhxqhzzufouzi.supabase.co';
const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_WFvRTS8imi8UpFFceAwSHQ_AvlYkDtJ';

let supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!supabase) {
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables');
    }
    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
}

// ============================================================
// STUDENTS CRUD
// ============================================================

export async function fetchStudents(teacherId?: string): Promise<DBStudent[]> {
  const sb = getSupabase();
  let query = sb.from('students').select('*').order('name');
  if (teacherId) {
    query = query.eq('teacher_id', teacherId);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function createStudent(student: { name: string; roll_no: string; email?: string; department?: string; teacher_id?: string }): Promise<DBStudent> {
  const sb = getSupabase();
  const { data, error } = await sb.from('students').insert(student).select().single();
  if (error) throw error;
  return data;
}

export async function updateStudent(id: string, updates: Partial<DBStudent>): Promise<DBStudent> {
  const sb = getSupabase();
  const { data, error } = await sb.from('students').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteStudent(id: string): Promise<void> {
  const sb = getSupabase();
  const { error } = await sb.from('students').delete().eq('id', id);
  if (error) throw error;
}

// ============================================================
// COURSES CRUD
// ============================================================

export async function fetchCourses(teacherId?: string): Promise<DBCourse[]> {
  const sb = getSupabase();
  let query = sb.from('courses').select('*').order('code');
  if (teacherId) {
    query = query.eq('teacher_id', teacherId);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function createCourse(course: { code: string; name: string; teacher_id?: string }): Promise<DBCourse> {
  const sb = getSupabase();
  const { data, error } = await sb.from('courses').insert(course).select().single();
  if (error) throw error;
  return data;
}

// ============================================================
// ATTENDANCE CRUD
// ============================================================

export async function fetchAttendance(filters: { student_id?: string; course_id?: string; date?: string; from_date?: string; to_date?: string }): Promise<DBAttendance[]> {
  const sb = getSupabase();
  let query = sb.from('attendance').select('*').order('date', { ascending: false });
  if (filters.student_id) query = query.eq('student_id', filters.student_id);
  if (filters.course_id) query = query.eq('course_id', filters.course_id);
  if (filters.date) query = query.eq('date', filters.date);
  if (filters.from_date) query = query.gte('date', filters.from_date);
  if (filters.to_date) query = query.lte('date', filters.to_date);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function markAttendance(records: { student_id: string; course_id?: string; date: string; status: 'present' | 'absent' | 'late'; marked_by?: string }[]): Promise<DBAttendance[]> {
  const sb = getSupabase();
  const { data, error } = await sb.from('attendance').upsert(records, { onConflict: 'student_id,course_id,date' }).select();
  if (error) throw error;
  return data || [];
}

// ============================================================
// ASSIGNMENTS CRUD
// ============================================================

export async function fetchAssignments(courseId?: string): Promise<DBAssignment[]> {
  const sb = getSupabase();
  let query = sb.from('assignments').select('*').order('created_at', { ascending: false });
  if (courseId) query = query.eq('course_id', courseId);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function createAssignment(assignment: { title: string; description?: string; course_id?: string; due_date?: string; max_marks?: number; created_by?: string }): Promise<DBAssignment> {
  const sb = getSupabase();
  const { data, error } = await sb.from('assignments').insert(assignment).select().single();
  if (error) throw error;
  return data;
}

// ============================================================
// SUBMISSIONS CRUD
// ============================================================

export async function fetchSubmissions(filters: { assignment_id?: string; student_id?: string }): Promise<DBSubmission[]> {
  const sb = getSupabase();
  let query = sb.from('submissions').select('*').order('submitted_at', { ascending: false });
  if (filters.assignment_id) query = query.eq('assignment_id', filters.assignment_id);
  if (filters.student_id) query = query.eq('student_id', filters.student_id);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function createSubmission(submission: { assignment_id: string; student_id: string; content: string }): Promise<DBSubmission> {
  const sb = getSupabase();
  const { data, error } = await sb.from('submissions').insert(submission).select().single();
  if (error) throw error;
  return data;
}

export async function gradeSubmission(id: string, updates: { score: number; ai_feedback?: string; graded_by?: string }): Promise<DBSubmission> {
  const sb = getSupabase();
  const { data, error } = await sb.from('submissions').update({ ...updates, graded_at: new Date().toISOString() }).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

// ============================================================
// TEACHERS CRUD
// ============================================================

export async function fetchTeachers(): Promise<DBTeacher[]> {
  const sb = getSupabase();
  const { data, error } = await sb.from('teachers').select('*').order('name');
  if (error) throw error;
  return data || [];
}

export async function createTeacher(teacher: { name: string; email: string; department?: string }): Promise<DBTeacher> {
  const sb = getSupabase();
  const { data, error } = await sb.from('teachers').insert(teacher).select().single();
  if (error) throw error;
  return data;
}

// ============================================================
// ANALYTICS HELPERS
// ============================================================

export async function getAttendanceStats(studentId: string): Promise<{ total: number; present: number; absent: number; late: number; percentage: number }> {
  const records = await fetchAttendance({ student_id: studentId });
  const total = records.length;
  const present = records.filter(r => r.status === 'present').length;
  const absent = records.filter(r => r.status === 'absent').length;
  const late = records.filter(r => r.status === 'late').length;
  const percentage = total > 0 ? Math.round(((present + late) / total) * 100) : 0;
  return { total, present, absent, late, percentage };
}

export async function getClassAttendanceForDate(courseId: string, date: string): Promise<{ studentId: string; status: string }[]> {
  const records = await fetchAttendance({ course_id: courseId, date });
  return records.map(r => ({ studentId: r.student_id, status: r.status }));
}
