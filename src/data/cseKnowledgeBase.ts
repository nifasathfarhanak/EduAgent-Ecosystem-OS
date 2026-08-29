export interface CSEKnowledgeChunk {
  id: string;
  subjectCode: 'CS201' | 'CS301' | 'CS302';
  subjectName: string;
  topic: string;
  subtopic: string;
  source: string;
  keywords: string[];
  content: string;
  codeSnippet?: string;
  complexityOrProperties?: string;
}

export const CSE_SUBJECTS = [
  {
    code: 'CS201',
    name: 'Data Structures & Algorithms',
    shortName: 'DSA',
    degree: 'B.Tech / B.E. Computer Science & Engineering',
    semester: 'Semester 3 / Core',
    iconName: 'Code2',
    color: 'cyan',
    topicsCount: 18,
    sampleQuestions: [
      'How does AVL tree rotation maintain O(log n) search balance vs Red-Black trees?',
      'Compare Dijkstra vs Bellman-Ford algorithm for negative edge weights.',
      'Explain Dynamic Programming state transition for 0/1 Knapsack vs Fractional Knapsack.',
      'What is the difference between Open Addressing and Separate Chaining in Hash Tables?',
      'Solve recurrence relation T(n) = 2T(n/2) + O(n) using Master Theorem.'
    ]
  },
  {
    code: 'CS301',
    name: 'Database Management Systems',
    shortName: 'DBMS',
    degree: 'B.Tech / B.E. Computer Science & Engineering',
    semester: 'Semester 4 / Core',
    iconName: 'Database',
    color: 'emerald',
    topicsCount: 16,
    sampleQuestions: [
      'Explain B+ Tree index search, insertion and why leaf node linking speeds up range queries.',
      'What is the difference between 3NF and BCNF with a practical decomposition example?',
      'How does Strict Two-Phase Locking (Strict 2PL) prevent cascading rollbacks in ACID transactions?',
      'Explain Write-Ahead Logging (WAL) and the ARIES recovery algorithm (Analysis, Redo, Undo).',
      'Compare Pessimistic Locking with Multi-Version Concurrency Control (MVCC) in PostgreSQL.'
    ]
  },
  {
    code: 'CS302',
    name: 'Operating Systems & Cloud Architecture',
    shortName: 'OS & Systems',
    degree: 'B.Tech / B.E. Computer Science & Engineering',
    semester: 'Semester 4 / Core',
    iconName: 'Cpu',
    color: 'purple',
    topicsCount: 15,
    sampleQuestions: [
      'How does the Linux Completely Fair Scheduler (CFS) use virtual runtime (vruntime) and Red-Black trees?',
      'Explain Multi-level Paging, Page Fault handling, and how Translation Lookaside Buffer (TLB) reduces memory lookup latency.',
      'What are the 4 Coffman conditions for Deadlock, and how does Banker’s Algorithm ensure safe state?',
      'Compare Counting Semaphores vs Mutexes and how Priority Inversion is solved via Priority Inheritance.',
      'Explain Unix Inode structure (direct, indirect, double-indirect blocks) and hard links vs soft links.'
    ]
  }
];

export const CSE_KNOWLEDGE_BASE: CSEKnowledgeChunk[] = [
  // ==========================================
  // SUBJECT 1: DATA STRUCTURES & ALGORITHMS (CS201)
  // ==========================================
  {
    id: 'dsa-01',
    subjectCode: 'CS201',
    subjectName: 'Data Structures & Algorithms',
    topic: 'Self-Balancing Binary Search Trees',
    subtopic: 'AVL Trees vs Red-Black Trees',
    source: 'MIT OCW 6.006 / Stanford CS166 / CLRS Chapter 13-14',
    keywords: ['avl', 'red black tree', 'rotation', 'balance factor', 'height', 'binary search tree', 'tree', 'rebalance', 'left rotation', 'right rotation'],
    content: `AVL trees are strictly height-balanced binary search trees where for every node, the height difference between left and right subtrees (Balance Factor = Height(Left) - Height(Right)) is at most ±1. 
When an insertion or deletion violates this invariant, balance is restored in O(1) time using 4 types of rotations: Single Left (LL), Single Right (RR), Left-Right (LR), and Right-Left (RL).
In contrast, Red-Black Trees maintain balance through node color properties (root is black, no two consecutive red nodes, all root-to-leaf paths contain the same number of black nodes). AVL trees are more rigidly balanced (height ≤ 1.44 log2 n) making lookup faster, whereas Red-Black trees require fewer rotations during frequent insertions and deletions (height ≤ 2 log2 n), making them the preferred standard in Linux Kernel (rbtree) and C++ std::map.`,
    codeSnippet: `// AVL Tree Node & Balance Factor calculation in C++
struct Node {
    int key;
    Node *left, *right;
    int height;
};

int getBalance(Node *N) {
    if (N == nullptr) return 0;
    return height(N->left) - height(N->right);
}

Node* rightRotate(Node *y) {
    Node *x = y->left;
    Node *T2 = x->right;
    x->right = y;
    y->left = T2;
    y->height = max(height(y->left), height(y->right)) + 1;
    x->height = max(height(x->left), height(x->right)) + 1;
    return x; // New root of rotated subtree
}`,
    complexityOrProperties: 'Search: O(log n), Insertion: O(log n) with at most 2 rotations, Deletion: O(log n) with O(log n) rotations. Space: O(n).'
  },
  {
    id: 'dsa-02',
    subjectCode: 'CS201',
    subjectName: 'Data Structures & Algorithms',
    topic: 'Graph Algorithms',
    subtopic: 'Single-Source Shortest Path: Dijkstra vs Bellman-Ford',
    source: 'OSSU CS Core / CLRS Chapter 24 / GATE CSE Algorithms',
    keywords: ['dijkstra', 'bellman ford', 'shortest path', 'graph', 'negative weight cycle', 'priority queue', 'min heap', 'relaxation', 'edge relaxation'],
    content: `Dijkstra's Algorithm finds the shortest path from a single source node to all other vertices in a weighted directed/undirected graph with non-negative edge weights using a Greedy approach with a Min-Heap / Priority Queue. It repeatedly selects the vertex with minimum tentative distance and relaxes its adjacent edges.
Limitation: Dijkstra fails if negative edge weights exist because once a node is marked visited, its distance is assumed final.
Bellman-Ford Algorithm operates on Dynamic Programming principles by relaxing all |E| edges (|V| - 1) times. It correctly handles graphs with negative edge weights and can detect negative weight cycles in an extra |V|-th iteration: if any distance can still be reduced in the V-th pass, a negative cycle exists.`,
    codeSnippet: `// Dijkstra Algorithm using Min-Heap in Python
import heapq

def dijkstra(graph, start, num_vertices):
    dist = [float('inf')] * num_vertices
    dist[start] = 0
    pq = [(0, start)] # (distance, vertex)
    
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))
    return dist`,
    complexityOrProperties: 'Dijkstra: O((V + E) log V) with Min-Heap. Bellman-Ford: O(V * E). Negative cycles detected in O(V * E).'
  },
  {
    id: 'dsa-03',
    subjectCode: 'CS201',
    subjectName: 'Data Structures & Algorithms',
    topic: 'Dynamic Programming',
    subtopic: '0/1 Knapsack Problem & Optimal Substructure',
    source: 'Stanford CS161 / CLRS Chapter 16-17 / GeeksforGeeks Curated CSE',
    keywords: ['dynamic programming', 'knapsack', '0/1 knapsack', 'memoization', 'tabulation', 'optimal substructure', 'overlapping subproblems', 'space optimization'],
    content: `The 0/1 Knapsack problem demonstrates Optimal Substructure and Overlapping Subproblems: Given weights wt[0..n-1] and values val[0..n-1], select a subset of items to maximize total value without exceeding capacity W. Each item can either be included (1) or excluded (0).
State Definition: dp[i][w] represents the maximum value attainable using a prefix of the first i items with weight capacity w.
Recurrence Relation:
dp[i][w] = dp[i-1][w]  (if wt[i-1] > w)
dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]])  (if wt[i-1] <= w)
Space Optimization: Since dp[i][w] only depends on row i-1, space can be reduced from 2D O(n*W) to 1D O(W) array traversed backwards from W down to wt[i-1] to prevent re-using the same item multiple times.`,
    codeSnippet: `// 1D Space Optimized 0/1 Knapsack in C++
int knapSack(int W, const vector<int>& wt, const vector<int>& val, int n) {
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++) {
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    return dp[W];
}`,
    complexityOrProperties: 'Time Complexity: O(n * W) (Pseudo-polynomial). Space Complexity: O(W) optimized.'
  },
  {
    id: 'dsa-04',
    subjectCode: 'CS201',
    subjectName: 'Data Structures & Algorithms',
    topic: 'Hashing & Hash Tables',
    subtopic: 'Collision Resolution: Chaining vs Open Addressing',
    source: 'MIT 6.006 / OpenDSA / CLRS Chapter 11',
    keywords: ['hash table', 'hashing', 'collision', 'separate chaining', 'open addressing', 'linear probing', 'quadratic probing', 'double hashing', 'load factor'],
    content: `A Hash Table maps keys to bucket indices using a hash function h(k) = k mod m. When two distinct keys hash to the same bucket index (collision), two primary strategies resolve it:
1. Separate Chaining (Open Hashing): Each bucket points to a linked list / red-black tree (e.g. Java 8 HashMap treeifies chains when length > 8). Load factor α = n/m can exceed 1.0.
2. Open Addressing (Closed Hashing): All items reside directly in the table array. On collision, probing locates the next vacant slot:
   - Linear Probing: h(k, i) = (h'(k) + i) mod m (suffers from Primary Clustering).
   - Quadratic Probing: h(k, i) = (h'(k) + c1*i + c2*i^2) mod m (suffers from Secondary Clustering).
   - Double Hashing: h(k, i) = (h1(k) + i * h2(k)) mod m where h2(k) is relatively prime to m (best distribution, minimal clustering).
Load factor α must remain strictly < 1.0 (typically resized when α > 0.70).`,
    codeSnippet: `// Double Hashing Probe Function
int hash1(int key, int tableSize) { return key % tableSize; }
int hash2(int key, int prime) { return prime - (key % prime); }

int probe(int key, int i, int tableSize, int prime) {
    return (hash1(key, tableSize) + i * hash2(key, prime)) % tableSize;
}`,
    complexityOrProperties: 'Average Case Search/Insert/Delete: O(1). Worst Case: O(n) when all keys collide into one bucket.'
  },
  {
    id: 'dsa-05',
    subjectCode: 'CS201',
    subjectName: 'Data Structures & Algorithms',
    topic: 'Algorithm Analysis',
    subtopic: 'Master Theorem for Divide-and-Conquer Recurrences',
    source: 'CLRS Chapter 4 / Stanford Algorithms / GATE CSE',
    keywords: ['master theorem', 'asymptotic analysis', 'divide and conquer', 'big o', 'theta', 'recurrence relation', 'merge sort', 'binary search'],
    content: `The Master Theorem solves divide-and-conquer recurrences of the form:
T(n) = a * T(n/b) + f(n), where a ≥ 1 is subproblem count, b > 1 is division factor, and f(n) = Θ(n^k log^p n) is combination cost.
Let critical exponent c_crit = log_b(a):
Case 1: If f(n) = O(n^c) where c < log_b(a), then T(n) = Θ(n^(log_b(a))). (Tree leaves dominate, e.g., Strassen Matrix Multipl.: T(n) = 7T(n/2) + O(n^2) -> Θ(n^log2(7)) ≈ Θ(n^2.81)).
Case 2: If f(n) = Θ(n^(log_b(a)) * log^k n) where k ≥ 0, then T(n) = Θ(n^(log_b(a)) * log^(k+1) n). (Work is split evenly across all tree levels, e.g., Merge Sort: T(n) = 2T(n/2) + Θ(n) -> Θ(n log n)).
Case 3: If f(n) = Ω(n^c) where c > log_b(a) and regularity condition a*f(n/b) ≤ d*f(n) for d < 1 holds, then T(n) = Θ(f(n)). (Root combination work dominates).`,
    complexityOrProperties: 'Direct analytical derivation of Θ-bounds without expanding full recursion trees.'
  },

  // ==========================================
  // SUBJECT 2: DATABASE MANAGEMENT SYSTEMS (CS301)
  // ==========================================
  {
    id: 'dbms-01',
    subjectCode: 'CS301',
    subjectName: 'Database Management Systems',
    topic: 'Database Normalization',
    subtopic: 'Normal Forms (1NF, 2NF, 3NF, BCNF) & Dependency Preservation',
    source: 'Silberschatz Database System Concepts 7th Ed / Stanford CS145 / CMU 15-445',
    keywords: ['normalization', '1nf', '2nf', '3nf', 'bcnf', 'functional dependency', 'lossless join', 'dependency preservation', 'candidate key', 'superkey'],
    content: `Database Normalization minimizes data redundancy and update/delete anomalies while preserving relational integrity:
- First Normal Form (1NF): All attributes contain atomic (indivisible) values with no repeating groups.
- Second Normal Form (2NF): Must be in 1NF and have NO Partial Dependencies (no non-prime attribute may depend on a proper subset of any candidate key).
- Third Normal Form (3NF): Must be in 2NF and have NO Transitive Dependencies (for every X -> Y, either X is a superkey OR Y is a prime attribute).
- Boyce-Codd Normal Form (BCNF): A stricter version of 3NF where for EVERY functional dependency X -> Y, X MUST be a Superkey.
Trade-off: BCNF eliminates all redundancy due to functional dependencies, but unlike 3NF, BCNF decomposition cannot always guarantee Dependency Preservation. Every relational schema can be decomposed into 3NF with both Lossless Join and Dependency Preservation.`,
    codeSnippet: `-- Example: Decomposing a 2NF violating table into 3NF
-- Original (Violates 2NF if PK is (StudentID, CourseID)):
-- Students(StudentID, CourseID, StudentName, CourseInstructor, InstructorOffice)

-- Normalized 3NF Schema:
CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    StudentName VARCHAR(100)
);

CREATE TABLE Courses (
    CourseID INT PRIMARY KEY,
    CourseName VARCHAR(100),
    InstructorID INT REFERENCES Instructors(InstructorID)
);

CREATE TABLE Enrollments (
    StudentID INT REFERENCES Students(StudentID),
    CourseID INT REFERENCES Courses(CourseID),
    Grade CHAR(2),
    PRIMARY KEY (StudentID, CourseID)
);`,
    complexityOrProperties: 'Eliminates insertion, update, and deletion anomalies. Guaranteed lossless decomposition.'
  },
  {
    id: 'dbms-02',
    subjectCode: 'CS301',
    subjectName: 'Database Management Systems',
    topic: 'Storage & Indexing',
    subtopic: 'B-Tree vs B+ Tree Indexing & Range Scans',
    source: 'CMU 15-445 Database Systems (Andy Pavlo) / PostgreSQL Internal Docs',
    keywords: ['b+ tree', 'b tree', 'indexing', 'database index', 'leaf node', 'range query', 'fanout', 'disk io', 'clustered index', 'innodb', 'page size'],
    content: `B+ Trees are the universal indexing structure for relational database storage engines (InnoDB in MySQL, PostgreSQL default index, Oracle).
Key differences between B-Tree and B+ Tree:
1. Data Storage: In a standard B-Tree, keys and actual data records (or record pointers) are stored in BOTH internal and leaf nodes. In a B+ Tree, internal nodes store ONLY routing keys and child pointers, while ALL data records/row pointers are stored exclusively at the Leaf Level.
2. Higher Fanout & Reduced Height: Because internal nodes do not store payload pointers, many more keys fit into a single disk page (typically 4KB-16KB), maximizing Fanout and keeping tree height low (typically 3 to 4 levels for millions of rows), minimizing disk I/O.
3. Doubly Linked Leaf Level: Leaf nodes in a B+ Tree are connected via bidirectional pointers (next/prev). Range queries (e.g. SELECT * WHERE age BETWEEN 20 AND 30) perform a single O(log n) descent to the starting leaf and then sequential O(k) linear scans across leaf pages, avoiding expensive tree traversals.`,
    codeSnippet: `-- Creating Clustered & Non-Clustered B+ Tree Indexes in SQL
CREATE TABLE Transactions (
    tx_id BIGSERIAL PRIMARY KEY, -- Clustered Primary Index
    account_id INT NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- Composite B+ Tree Index for fast range scans and sorting
CREATE INDEX idx_tx_account_date ON Transactions(account_id, created_at DESC);`,
    complexityOrProperties: 'Search, Insert, Delete: O(log_B N) where B is page fanout (typically 100-500). Range scans: O(log_B N + k/B).'
  },
  {
    id: 'dbms-03',
    subjectCode: 'CS301',
    subjectName: 'Database Management Systems',
    topic: 'Transaction Processing & Concurrency',
    subtopic: 'ACID Properties & Strict Two-Phase Locking (Strict 2PL)',
    source: 'Silberschatz Chapter 17-19 / CMU 15-445 / Berkeley CS186',
    keywords: ['acid', 'strict 2pl', 'two phase locking', 'concurrency control', 'serializability', 'cascading aborts', 'dirty read', 'isolation levels', 'deadlock'],
    content: `Database transactions must uphold ACID guarantees:
- Atomicity: All operations in the transaction succeed, or the entire transaction is rolled back (All-or-Nothing).
- Consistency: The database transitions from one valid state satisfying all schema constraints to another.
- Isolation: Concurrent transactions execute without interfering with each other (as if running serially).
- Durability: Once committed, state changes survive any subsequent crash or power failure.
Concurrency Control:
Two-Phase Locking (2PL) guarantees Conflict Serializability:
1. Growing Phase: Transaction acquires locks, cannot release any.
2. Shrinking Phase: Transaction releases locks, cannot acquire any new locks.
Strict 2PL prevents Cascading Aborts (Dirty Read anomalies): A transaction holds ALL Exclusive (X) write locks until it reaches COMMIT or ABORT.
Rigorous 2PL holds BOTH Shared (S) and Exclusive (X) locks until transaction completion, producing strict serializable execution schedules.`,
    complexityOrProperties: 'Guarantees Conflict Serializability and prevents cascading aborts. Deadlocks resolved via Wait-For Graphs or timeouts.'
  },
  {
    id: 'dbms-04',
    subjectCode: 'CS301',
    subjectName: 'Database Management Systems',
    topic: 'Crash Recovery',
    subtopic: 'Write-Ahead Logging (WAL) & ARIES Algorithm',
    source: 'C. Mohan (IBM Research) ARIES / CMU 15-445 Crash Recovery / Silberschatz',
    keywords: ['wal', 'write ahead logging', 'aries', 'crash recovery', 'redo', 'undo', 'checkpoint', 'log sequence number', 'dirty page table', 'transaction table'],
    content: `Write-Ahead Logging (WAL) enforces that:
1. Every state modification must generate a log record before the modified database page is written to disk (WAL protocol).
2. All log records up to transaction commit must be flushed to stable storage before transaction commit returns success (Force Log at Commit).
ARIES (Algorithms for Recovery and Isolation Exploiting Semantics) executes 3 phases after a crash:
1. Analysis Phase: Scans the log forward from the last checkpoint to identify active transactions at crash time (Transaction Table) and unwritten dirty pages (Dirty Page Table - DPT) along with smallest recLSN.
2. Redo Phase: Repeats history starting from the smallest recLSN. Redoes all logged operations (including those of loser transactions) to bring the database back to the exact physical state at the time of crash.
3. Undo Phase: Scans backwards and rolls back the actions of all active (loser) transactions that never committed, generating Compensation Log Records (CLRs) to ensure idempotency during recurring crashes.`,
    complexityOrProperties: 'Guarantees full crash recovery idempotency without duplicating updates.'
  },

  // ==========================================
  // SUBJECT 3: OPERATING SYSTEMS & CLOUD ARCHITECTURE (CS302)
  // ==========================================
  {
    id: 'os-01',
    subjectCode: 'CS302',
    subjectName: 'Operating Systems & Cloud Architecture',
    topic: 'Process Scheduling',
    subtopic: 'Linux Completely Fair Scheduler (CFS) & vruntime',
    source: 'Linux Kernel Development (Robert Love) / OSTEP Chapter 7-9 / Stanford CS140',
    keywords: ['cfs', 'completely fair scheduler', 'vruntime', 'virtual runtime', 'red black tree', 'process scheduling', 'cpu scheduling', 'nice value', 'latency'],
    content: `The Linux Completely Fair Scheduler (CFS) implements an O(log N) fair-share CPU scheduling model using a Red-Black Tree instead of traditional runqueues.
Concept: Each runnable task is tracked by its Virtual Runtime (vruntime) — the amount of execution time spent on the CPU scaled by the task's priority weight (nice value: -20 to +19).
1. Fair Scheduling Invariant: CFS always selects the task with the smallest vruntime for execution (the leftmost node in the red-black tree, cached in O(1)).
2. Weight Scaling: Higher priority tasks (negative nice) accumulate vruntime more slowly, receiving proportionally larger time slices:
   vruntime += execution_time * (NICE_0_LOAD / task_weight).
3. Latency Target: CFS divides a configurable period (sysctl_sched_latency, e.g. 6ms) among all runnable tasks proportional to their weights, ensuring predictable response times and avoiding starvation.`,
    codeSnippet: `// Concept of Linux CFS vruntime update
void update_curr(struct task_struct *curr, u64 delta_exec) {
    u64 delta_exec_weighted;
    // Scale real delta by task priority weight
    delta_exec_weighted = calc_delta_fair(delta_exec, curr);
    curr->vruntime += delta_exec_weighted;
    // Re-insert into CFS Red-Black tree
    rb_erase(&curr->rb_node, &cfs_rq->tasks_timeline);
    __enqueue_entity(cfs_rq, curr);
}`,
    complexityOrProperties: 'Selection of next process: O(1) cached leftmost node. Re-insertion/tree update: O(log N). Highly starvation-free.'
  },
  {
    id: 'os-02',
    subjectCode: 'CS302',
    subjectName: 'Operating Systems & Cloud Architecture',
    topic: 'Memory Management',
    subtopic: 'Multi-Level Paging, TLB Translation & Page Fault Handling',
    source: 'OSTEP (Remzi Arpaci-Dusseau) Chapters 18-22 / Tanenbaum Modern Operating Systems',
    keywords: ['paging', 'virtual memory', 'page fault', 'tlb', 'translation lookaside buffer', 'page table', 'cr3', 'mmu', 'page replacement', 'lru', 'clock algorithm'],
    content: `Virtual Memory provides isolated 64-bit address spaces per process using Hardware Paging managed by the Memory Management Unit (MMU):
1. Address Translation: Virtual Address is split into Virtual Page Number (VPN) and Page Offset. On x86-64, a 4-level page table (PML4 -> PDPT -> PD -> PT -> Physical Frame) translates VPN to PPN.
2. Translation Lookaside Buffer (TLB): A hardware associative cache storing recent VPN-to-PPN translations.
   - TLB Hit: MMU retrieves PPN in ~1 CPU cycle.
   - TLB Miss: MMU walks the 4-level page table (multiple RAM access cycles) and caches the translation in TLB.
3. Page Fault Sequence: When a valid page is accessed whose Present Bit = 0 (swapped to disk):
   a. CPU raises an interrupt (Trap 14 - Page Fault Exception).
   b. OS saves process state, inspects CR2 register (faulting address), validates memory permissions.
   c. OS allocates a free physical frame (running Clock / LRU replacement if full).
   d. Issues asynchronous disk I/O to read page from swap/backing file into RAM.
   e. Updates Page Table entry (Present = 1, PPN assigned), flushes TLB, resumes faulted instruction.`,
    complexityOrProperties: 'TLB Hit: ~1ns, Memory page walk: ~50-100ns, Page Fault Disk I/O: ~1-5ms.'
  },
  {
    id: 'os-03',
    subjectCode: 'CS302',
    subjectName: 'Operating Systems & Cloud Architecture',
    topic: 'Process Synchronization & Deadlock',
    subtopic: 'Semaphores, Mutexes & Banker’s Safety Algorithm',
    source: 'Silberschatz OS Concepts / Dijkstra Cooperating Sequential Processes / MIT 6.828',
    keywords: ['deadlock', 'bankers algorithm', 'semaphore', 'mutex', 'coffman conditions', 'priority inversion', 'priority inheritance', 'critical section', 'safe state'],
    content: `Deadlock is a state where a set of processes are permanently blocked because each holds a resource and waits for another resource held by another process in the set.
4 Necessary Coffman Conditions:
1. Mutual Exclusion: Resources cannot be shared simultaneously.
2. Hold and Wait: A process holding resources requests additional ones.
3. No Preemption: Resources cannot be forcibly revoked from a process.
4. Circular Wait: A closed loop P0 -> P1 -> ... -> Pn -> P0 where each waits for the next.
Banker's Algorithm (Dijkstra):
Maintains Allocation, Max, Available, and Need matrices where Need[i][j] = Max[i][j] - Allocation[i][j].
Before granting a resource request, it simulates the allocation and checks if a Safe Sequence <P1, P2, ... Pn> exists such that all processes can run to completion. If granting the request leaves the system in an Unsafe state, the requesting process is forced to wait.`,
    codeSnippet: `// Banker's Algorithm Safe State Check in Python
def is_safe_state(available, max_m, allocation):
    num_p = len(allocation)
    num_r = len(available)
    need = [[max_m[i][j] - allocation[i][j] for j in range(num_r)] for i in range(num_p)]
    work = list(available)
    finish = [False] * num_p
    safe_seq = []
    
    while len(safe_seq) < num_p:
        found = False
        for p in range(num_p):
            if not finish[p] and all(need[p][j] <= work[j] for j in range(num_r)):
                for j in range(num_r):
                    work[j] += allocation[p][j]
                finish[p] = True
                safe_seq.append(p)
                found = True
                break
        if not found:
            return False, [] # Unsafe / Deadlock potential
    return True, safe_seq`,
    complexityOrProperties: 'Banker’s Safety Check: O(R * P^2) where R is resource types and P is process count.'
  },
  {
    id: 'os-04',
    subjectCode: 'CS302',
    subjectName: 'Operating Systems & Cloud Architecture',
    topic: 'File Systems & Storage Architecture',
    subtopic: 'Unix Inodes, Journaling (ext4), and Hard vs Soft Links',
    source: 'OSTEP Chapter 39-42 / Linux File System Hierarchy / MIT 6.828',
    keywords: ['inode', 'ext4', 'file system', 'journaling', 'hard link', 'symbolic link', 'soft link', 'directory', 'superblock', 'block group'],
    content: `Unix File Systems separate file metadata from filename and directory structure using Inodes (Index Nodes):
1. Inode Metadata: Contains file type, permissions (chmod), owner UID/GID, file size, timestamps (atime, mtime, ctime), and Direct/Indirect block pointers. Filenames are NOT stored in the inode; they exist solely as directory entry mappings (dentry) pointing (filename -> inode_number).
2. Hard Links vs Symbolic (Soft) Links:
   - Hard Link: Creates another directory entry pointing directly to the SAME inode number. Increments the inode's link count. Deleting the original file does not destroy data as long as link count > 0. Cannot cross file system boundaries.
   - Soft (Symbolic) Link: Creates a NEW separate inode whose data block contains the string path of the target file. If the target file is deleted or moved, the soft link becomes a Broken / Dangling pointer.
3. Journaling (ext4): Writes metadata updates to a circular on-disk journal before committing to actual filesystem blocks, preventing filesystem corruption during sudden power failures.`,
    complexityOrProperties: 'Direct block access: O(1) via pointer table. Journaling recovery on crash: O(journal size) in milliseconds.'
  }
];

/**
 * Executes a high-precision keyword + semantic chunk retrieval over the CSE Knowledge Base.
 */
export function retrieveCSEKnowledgeChunks(query: string, subjectCode?: string, topK: number = 3): Array<{ chunk: CSEKnowledgeChunk; score: number }> {
  const cleanTokens = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2);

  const scored = CSE_KNOWLEDGE_BASE
    .filter((c) => !subjectCode || c.subjectCode === subjectCode)
    .map((chunk) => {
      let score = 0;
      const combinedText = `${chunk.subjectName} ${chunk.topic} ${chunk.subtopic} ${chunk.keywords.join(' ')} ${chunk.content} ${chunk.source}`.toLowerCase();

      // Check keywords exact match (high boost)
      chunk.keywords.forEach((kw) => {
        if (query.toLowerCase().includes(kw.toLowerCase())) {
          score += 15;
        }
      });

      // Check subtopic & topic match
      if (query.toLowerCase().includes(chunk.topic.toLowerCase())) score += 20;
      if (query.toLowerCase().includes(chunk.subtopic.toLowerCase())) score += 25;

      // Check token frequency
      cleanTokens.forEach((token) => {
        const matches = combinedText.split(token).length - 1;
        if (matches > 0) {
          score += Math.min(matches, 5) * 2;
        }
      });

      return { chunk, score };
    })
    .sort((a, b) => b.score - a.score);

  // Filter out chunks with 0 score (no token or keyword match)
  const matching = scored.filter((item) => item.score > 0);
  if (matching.length === 0) {
    return [];
  }

  // Normalize scores to a 0.0 - 1.0 confidence range
  const topScore = matching[0].score;
  return matching.slice(0, topK).map((item) => ({
    chunk: item.chunk,
    score: Math.min(0.99, Number((item.score / (topScore * 1.2)).toFixed(2)))
  }));
}
