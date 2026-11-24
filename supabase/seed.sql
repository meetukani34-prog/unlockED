-- ============================================================================
-- UnlockED Seed Data (supabase/seed.sql)
-- Realistic initial data matching Google Stitch "Obsidian Kinetic" specifications
-- ============================================================================

-- Skills Catalog
INSERT INTO skills (id, name, category, description, icon) VALUES
  ('11111111-1111-1111-1111-111111111101', 'TypeScript', 'Frontend', 'Strongly typed JavaScript for scalable web development', 'code'),
  ('11111111-1111-1111-1111-111111111102', 'React & Next.js', 'Frontend', 'Modern component architecture and full-stack React framework', 'layers'),
  ('11111111-1111-1111-1111-111111111103', 'Go (Golang)', 'Backend', 'High concurrency backend microservices development', 'terminal'),
  ('11111111-1111-1111-1111-111111111104', 'PostgreSQL', 'Database', 'Relational database design, query optimization, and indexing', 'database'),
  ('11111111-1111-1111-1111-111111111105', 'Kubernetes', 'DevOps', 'Container orchestration, multi-node clustering, and service mesh', 'box'),
  ('11111111-1111-1111-1111-111111111106', 'Docker & CI/CD', 'DevOps', 'Containerization and automated deployment pipelines', 'cpu'),
  ('11111111-1111-1111-1111-111111111107', 'Python & PyTorch', 'AI/ML', 'Machine learning frameworks and numerical computing', 'sparkles'),
  ('11111111-1111-1111-1111-111111111108', 'LLM Agentic Systems', 'AI/ML', 'RAG architectures, vector embeddings, and LangGraph multi-agent flows', 'bot'),
  ('11111111-1111-1111-1111-111111111109', 'AWS Cloud Infrastructure', 'Cloud', 'Cloud architecture, IAM, serverless, and VPC networking', 'cloud'),
  ('11111111-1111-1111-1111-111111111110', 'System Architecture', 'Backend', 'Distributed caching, event-driven streaming, and resilience', 'network')
ON CONFLICT (name) DO NOTHING;

-- Courses
INSERT INTO courses (id, title, description, short_description, thumbnail_url, category, difficulty, duration_weeks, tags, is_published) VALUES
  (
    '22222222-2222-2222-2222-222222222201',
    'Full-Stack Cloud Architecture: Go, Next.js & Serverless',
    'Architect and deploy high-performance web systems using Go microservices, modern TypeScript with Next.js App Router, and production-ready PostgreSQL databases. Learn concurrency patterns, caching strategies, and zero-downtime migrations.',
    'Master high-concurrency backend services and modern frontend applications.',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    'Full-Stack Development',
    'intermediate',
    16,
    ARRAY['Golang', 'Next.js', 'PostgreSQL', 'Redis', 'Docker'],
    true
  ),
  (
    '22222222-2222-2222-2222-222222222202',
    'Production AI & LLM Systems: Agentic AI & Vector Engineering',
    'Build enterprise-ready AI applications powered by modern LLMs. Master vector embeddings, semantic search, hybrid retrieval, agent orchestration with LangGraph, and safe prompt evaluation harnesses with Google Gemini.',
    'Build production RAG pipelines, agentic workflows, and LLM evaluation engines.',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    'AI & Machine Learning',
    'advanced',
    14,
    ARRAY['Python', 'Gemini API', 'LangGraph', 'Vector DB', 'RAG'],
    true
  ),
  (
    '22222222-2222-2222-2222-222222222203',
    'Site Reliability & DevOps: Kubernetes, Terraform & CI/CD',
    'Deploy fault-tolerant multi-cluster cloud infrastructure. Gain hands-on mastery over Terraform infrastructure-as-code, GitOps workflows, Prometheus telemetry, and disaster recovery automations.',
    'Design resilient infrastructure and continuous deployment pipelines.',
    'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80',
    'DevOps & Cloud',
    'intermediate',
    18,
    ARRAY['Kubernetes', 'Terraform', 'AWS', 'GitHub Actions', 'Prometheus'],
    true
  ),
  (
    '22222222-2222-2222-2222-222222222204',
    'Modern Frontend Mastery: React 19, TypeScript & Design Systems',
    'Deep-dive into production-level web UI engineering. Build accessible, pixel-perfect design systems with Tailwind CSS, Radix UI, server components, optimistic updates, and complex client state.',
    'Create accessible, blazing-fast interfaces with React 19 and modern styling.',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    'Frontend Development',
    'beginner',
    12,
    ARRAY['React 19', 'TypeScript', 'Tailwind CSS', 'Shadcn/UI', 'Framer Motion'],
    true
  )
ON CONFLICT (id) DO NOTHING;

-- Lessons for Course 1
INSERT INTO lessons (id, course_id, title, content, order_index, duration_minutes, is_published) VALUES
  (
    '33333333-3333-3333-3333-333333333301',
    '22222222-2222-2222-2222-222222222201',
    'Introduction to High-Concurrency System Design',
    '# Introduction to High-Concurrency System Design\n\nIn this foundational lesson, we explore how modern distributed systems handle tens of thousands of requests per second with sub-50ms latency.\n\n### Key Principles\n1. **Stateless Service Nodes:** Keep application state out of web processes; store state in distributed caches (Redis) and durable ACID databases (PostgreSQL).\n2. **Backpressure & Queue Decoupling:** Use asynchronous message buffers to prevent cascading service crashes during sudden traffic spikes.\n3. **Connection Pooling:** Manage database connection exhaustion through PgBouncer or connection multiplexing.\n\n### Code Demonstration (Go HTTP Server with Goroutines)\n```go\npackage main\n\nimport (\n\t"fmt"\n\t"net/http"\n\t"time"\n)\n\nfunc workerHandler(w http.ResponseWriter, r *http.Request) {\n\tctx := r.Context()\n\tselect {\n\tcase <-time.After(50 * time.Millisecond):\n\t\tw.WriteHeader(http.StatusOK)\n\t\tfmt.Fprintf(w, `{"status":"processed"}`)\n\tcase <-ctx.Done():\n\t\thttp.Error(w, "Request timed out", http.StatusGatewayTimeout)\n\t}\n}\n```\n\n### Next Steps\nComplete the quiz at the end of this module to verify your understanding of event loops vs goroutine thread pooling.',
    1,
    25,
    true
  ),
  (
    '33333333-3333-3333-3333-333333333302',
    'Building Microservices with Go & PostgreSQL',
    '# Building Microservices with Go & PostgreSQL\n\nLearn how to structure robust API endpoints with clean architecture, prepared SQL queries, transaction boundaries, and structured JSON responses.\n\n### Database Schema Considerations\nAlways define proper foreign keys and composite indexes for multi-column filters.\n\n```sql\nCREATE INDEX idx_orders_user_created ON orders (user_id, created_at DESC);\n```',
    2,
    35,
    true
  ),
  (
    '33333333-3333-3333-3333-333333333303',
    'Next.js 15 App Router & Server Actions Integration',
    '# Next.js 15 App Router & Server Actions Integration\n\nConnect your Go services with Next.js 15. Learn how React Server Components (RSC) fetch data on the server without shipping JavaScript bundles to the browser client.',
    3,
    40,
    true
  )
ON CONFLICT (id) DO NOTHING;

-- Assessments
INSERT INTO assessments (id, title, description, course_id, skill_id, time_limit_minutes, passing_score, total_questions, questions, is_published) VALUES
  (
    '44444444-4444-4444-4444-444444444401',
    'Cloud Architecture & Go Fundamentals Benchmark',
    'Test your knowledge of high-concurrency principles, database sharding, and REST/gRPC microservice patterns.',
    '22222222-2222-2222-2222-222222222201',
    '11111111-1111-1111-1111-111111111103',
    15,
    70,
    4,
    '[
      {
        "id": "q1",
        "question": "What happens when a Go channel with a buffer size of 0 receives a message?",
        "options": [
          "The sender proceeds immediately without waiting",
          "The sender blocks until another goroutine is ready to receive from the channel",
          "The channel stores the message in memory up to 1024 entries",
          "The runtime panics with ErrChannelOverflow"
        ],
        "correct_answer": 1,
        "explanation": "An unbuffered channel requires both sender and receiver to synchronize simultaneously; the sender will block until a receiver is ready.",
        "points": 25
      },
      {
        "id": "q2",
        "question": "Which HTTP caching header ensures that a client must revalidate stale assets with the origin server using ETag?",
        "options": [
          "Cache-Control: public, max-age=0, must-revalidate",
          "Cache-Control: no-cache",
          "Cache-Control: no-store",
          "Pragma: no-cache"
        ],
        "correct_answer": 1,
        "explanation": "Cache-Control: no-cache instructs clients and proxies to revalidate cached responses against the server before serving them.",
        "points": 25
      },
      {
        "id": "q3",
        "question": "In PostgreSQL, what is the key difference between a B-Tree index and a Hash index?",
        "options": [
          "B-Tree indexes support equality and range comparisons (<, <=, =, >=, >), while Hash indexes only support equality (=)",
          "Hash indexes support sorting with ORDER BY whereas B-Tree does not",
          "B-Tree indexes cannot be used for string columns",
          "Hash indexes are automatically replicated to all replicas"
        ],
        "correct_answer": 0,
        "explanation": "B-Tree is the default index type in PostgreSQL and can efficiently handle range and equality queries. Hash indexes are specialized exclusively for = equality.",
        "points": 25
      },
      {
        "id": "q4",
        "question": "Why are React Server Components (RSC) ideal for database-heavy dashboards?",
        "options": [
          "They compile to WebAssembly and run inside the browser thread",
          "They execute exclusively on the server, eliminating client waterfall requests and reducing JS bundle size",
          "They bypass SQL query authentication completely",
          "They replace the need for CSS and HTML entirely"
        ],
        "correct_answer": 1,
        "explanation": "RSCs execute on the server with direct access to backend resources and return rendered UI trees, keeping sensitive code and heavy dependencies off the client bundle.",
        "points": 25
      }
    ]'::jsonb,
    true
  )
ON CONFLICT (id) DO NOTHING;
