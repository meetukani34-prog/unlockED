import { Course, Job, Assessment, Skill, Profile, Project, Resume, Company, Notification } from "@/types";

export const INITIAL_SKILLS: Skill[] = [
  { id: "s1", name: "TypeScript", category: "Frontend", description: "Typed JavaScript for large-scale applications", icon: "code", created_at: "2024-11-20T12:00:00.000Z" },
  { id: "s2", name: "React & Next.js", category: "Frontend", description: "Component-based architecture & App Router", icon: "layers", created_at: "2024-11-20T12:00:00.000Z" },
  { id: "s3", name: "Go (Golang)", category: "Backend", description: "Fast, concurrent microservices backend", icon: "terminal", created_at: "2024-11-20T12:00:00.000Z" },
  { id: "s4", name: "PostgreSQL", category: "Database", description: "Relational database with JSONB and RLS", icon: "database", created_at: "2024-11-20T12:00:00.000Z" },
  { id: "s5", name: "Kubernetes", category: "DevOps", description: "Container orchestration & cloud scaling", icon: "box", created_at: "2024-11-20T12:00:00.000Z" },
  { id: "s6", name: "Docker & CI/CD", category: "DevOps", description: "Automated test & deployment containers", icon: "cpu", created_at: "2024-11-20T12:00:00.000Z" },
  { id: "s7", name: "Python", category: "AI/ML", description: "Core data science & ML language", icon: "sparkles", created_at: "2024-11-20T12:00:00.000Z" },
  { id: "s8", name: "Gemini AI & LLMs", category: "AI/ML", description: "Prompt engineering, embeddings, and RAG", icon: "bot", created_at: "2024-11-20T12:00:00.000Z" },
  { id: "s9", name: "AWS Cloud Infrastructure", category: "Cloud", description: "S3, Lambda, ECS, and VPC networking", icon: "cloud", created_at: "2024-11-20T12:00:00.000Z" },
  { id: "s10", name: "System Architecture", category: "Backend", description: "Caching, queueing, and distributed resilience", icon: "network", created_at: "2024-11-20T12:00:00.000Z" },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: "c1",
    title: "Full-Stack Cloud Architecture: Go, Next.js & Serverless Systems",
    description: "Architect and deploy low-latency web platforms using Go microservices, modern TypeScript with Next.js 15, and cloud-native databases. Master concurrent worker pools, zero-downtime DB migrations, and production-grade caching.",
    short_description: "Architect high-performance web platforms with Go, Next.js and Postgres.",
    thumbnail_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    category: "Full-Stack Development",
    difficulty: "intermediate",
    duration_weeks: 16,
    tags: ["Golang", "Next.js 15", "PostgreSQL", "Redis", "Docker"],
    is_published: true,
    created_by: "admin",
    created_at: "2024-11-15T12:00:00.000Z",
    updated_at: "2024-11-20T12:00:00.000Z",
    lesson_count: 8,
    enrolled_count: 1240,
  },
  {
    id: "c2",
    title: "Production AI & LLM Systems: Agentic AI & Vector Engineering",
    description: "Master enterprise RAG architectures, local fine-tuning pipelines, evaluation harnesses, and multi-agent systems using the Google Gemini SDK, LangGraph, and vector databases.",
    short_description: "Master enterprise RAG, vector embeddings, and autonomous agent systems.",
    thumbnail_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    category: "AI & Machine Learning",
    difficulty: "advanced",
    duration_weeks: 14,
    tags: ["Python", "Gemini API", "LangGraph", "Vector DB", "RAG"],
    is_published: true,
    created_by: "admin",
    created_at: "2024-11-15T12:00:00.000Z",
    updated_at: "2024-11-20T12:00:00.000Z",
    lesson_count: 6,
    enrolled_count: 980,
  },
  {
    id: "c3",
    title: "DevOps & Site Reliability: Kubernetes, Terraform & CI/CD",
    description: "Deploy fault-tolerant multi-cloud clusters, orchestrate infrastructure as code, and construct resilient deployment pipelines with zero-downtime rollouts and automated rollback triggers.",
    short_description: "Deploy fault-tolerant multi-cloud clusters and orchestrate Terraform IaC.",
    thumbnail_url: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80",
    category: "DevOps & Cloud",
    difficulty: "intermediate",
    duration_weeks: 18,
    tags: ["AWS", "Terraform", "Kubernetes", "GitHub Actions", "Prometheus"],
    is_published: true,
    created_by: "admin",
    created_at: "2024-11-15T12:00:00.000Z",
    updated_at: "2024-11-20T12:00:00.000Z",
    lesson_count: 7,
    enrolled_count: 820,
  },
  {
    id: "c4",
    title: "Modern Frontend Mastery: React 19, TypeScript & Design Systems",
    description: "Deep-dive into production-level web UI engineering. Build accessible, pixel-perfect design systems with Tailwind CSS, Radix UI, server components, optimistic updates, and complex client state.",
    short_description: "Create accessible, blazing-fast interfaces with React 19 and modern styling.",
    thumbnail_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    category: "Frontend Development",
    difficulty: "beginner",
    duration_weeks: 12,
    tags: ["React 19", "TypeScript", "Tailwind CSS", "Shadcn/UI"],
    is_published: true,
    created_by: "admin",
    created_at: "2024-11-15T12:00:00.000Z",
    updated_at: "2024-11-20T12:00:00.000Z",
    lesson_count: 5,
    enrolled_count: 1450,
  },
];

export const INITIAL_LESSONS: Record<string, { id: string; title: string; content: string; order_index: number; duration_minutes: number }[]> = {
  c1: [
    {
      id: "l1",
      title: "1. High-Concurrency Foundations & Architecture",
      order_index: 1,
      duration_minutes: 25,
      content: `## Architecture Principles for High Concurrency

In this module, you will understand how modern distributed applications achieve sub-50ms p99 latency under tens of thousands of concurrent users.

### The Problem with Stateful Application Nodes
When servers maintain user session state in local memory, load balancing requires sticky sessions, making autoscaling sluggish and failover dangerous.

\`\`\`
+-----------+      +------------------+
|  Client   | ---> | Ingress / Proxy  |
+-----------+      +------------------+
                            |
           +----------------+----------------+
           |                                 |
+---------------------+           +---------------------+
| Go Web Worker #1    |           | Go Web Worker #2    |
| (Stateless Process) |           | (Stateless Process) |
+---------------------+           +---------------------+
           |                                 |
           +----------------+----------------+
                            |
           +----------------+----------------+
           |                                 |
+---------------------+           +---------------------+
| Redis Cluster Cache |           | Postgres Primary/Repl|
+---------------------+           +---------------------+
\`\`\`

### Core Tenets
1. **Stateless Service Layer**: Any node can serve any request.
2. **Read/Write DB Splitting**: Read replicas handle search and listings; the primary handles transactions.
3. **Connection Pooling**: Prevent TCP exhaustion with connection reuse.
`,
    },
    {
      id: "l2",
      title: "2. Concurrency in Go: Goroutines & Channels",
      order_index: 2,
      duration_minutes: 35,
      content: `## Concurrency Patterns with Go

Go's runtime schedules lightweight threads (goroutines) across OS threads using an M:N work-stealing scheduler.

\`\`\`go
package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

type Result struct {
	ID    int
	Data  string
	Error error
}

func WorkerPool(ctx context.Context, jobs <-chan int, results chan<- Result, wg *sync.WaitGroup) {
	defer wg.Done()
	for {
		select {
		case <-ctx.Done():
			return
		case job, ok := <-jobs:
			if !ok {
				return
			}
			// Process job
			results <- Result{ID: job, Data: fmt.Sprintf("Processed job %d", job)}
		}
	}
}
\`\`\`

### Channel Buffering Guidelines
- Use unbuffered channels for strict synchronization.
- Use buffered channels when producers burst faster than consumers, but bound the queue to avoid out-of-memory errors.
`,
    },
    {
      id: "l3",
      title: "3. PostgreSQL Relational Modeling & Index Strategies",
      order_index: 3,
      duration_minutes: 40,
      content: `## High-Performance PostgreSQL

A schema is only as fast as its indexes and transaction boundaries.

### When to use B-Tree vs GIN Indexes
- **B-Tree**: Scalar comparisons (\`=\`, \`<\`, \`>\`, \`BETWEEN\`, \`ORDER BY\`).
- **GIN (Generalized Inverted Index)**: Array containment (\`@>\`), Full-Text Search (\`tsvector\`), JSONB keys.

\`\`\`sql
-- Composite index optimizing candidate searches
CREATE INDEX idx_jobs_recruiter_active 
  ON jobs(recruiter_id, is_active) 
  WHERE is_active = true;
\`\`\`
`,
    },
  ],
  c2: [
    {
      id: "l21",
      title: "1. Vector Embeddings & Semantic Search",
      order_index: 1,
      duration_minutes: 30,
      content: `## Vector Embeddings & High-Dimensional Projections

Learn how modern LLMs map text chunks into 768 or 1536-dimensional continuous vector spaces.

### Cosine Similarity Formula
\\[
\\text{Cosine Similarity}(A, B) = \\frac{A \\cdot B}{\\|A\\| \\|B\\|}
\\]

Use Cosine Similarity or Dot Product on normalized vectors to perform nearest-neighbor queries in sub-millisecond retrieval.
`,
    },
    {
      id: "l22",
      title: "2. Building Multi-Agent Systems with Google Gemini",
      order_index: 2,
      duration_minutes: 45,
      content: `## Gemini 2.5 / 2.0 Integration & Tool Calling

Using the official \`@google/genai\` SDK, we can pass structured JSON schemas as function declarations so Gemini can plan and invoke tools reliably.
`,
    },
  ],
  c3: [
    {
      id: "l31",
      title: "1. Kubernetes Pod Lifecycle & Cluster Architecture",
      order_index: 1,
      duration_minutes: 35,
      content: `## Kubernetes Deep-Dive

Understand the Control Plane (API Server, etcd, Controller Manager, Scheduler) and the Worker Nodes (kubelet, kube-proxy, Container Runtime).
`,
    },
  ],
  c4: [
    {
      id: "l41",
      title: "1. React 19 Server Components Architecture",
      order_index: 1,
      duration_minutes: 30,
      content: `## React 19 & Next.js App Router

React Server Components allow you to fetch data directly inside components on the server without useEffect, useState or client side fetching waterfalls.
`,
    },
  ],
};

export const INITIAL_ASSESSMENTS: Assessment[] = [
  {
    id: "a1",
    title: "Cloud Architecture & Go Fundamentals Benchmark",
    description: "Verify your understanding of distributed concurrency, database sharding, and resilient microservice design.",
    course_id: "c1",
    skill_id: "s3",
    time_limit_minutes: 15,
    passing_score: 70,
    total_questions: 4,
    questions: [
      {
        id: "q1",
        question: "What happens when a Go channel with a buffer size of 0 receives a message?",
        options: [
          "The sender proceeds immediately without waiting",
          "The sender blocks until another goroutine is ready to receive from the channel",
          "The channel stores the message in memory up to 1024 entries",
          "The runtime panics with ErrChannelOverflow"
        ],
        correct_answer: 1,
        explanation: "An unbuffered channel requires both sender and receiver to synchronize at the exact moment of transfer.",
        points: 25
      },
      {
        id: "q2",
        question: "Which HTTP header instructs the browser to always revalidate cache with the origin server?",
        options: [
          "Cache-Control: public, max-age=3600",
          "Cache-Control: no-cache",
          "Cache-Control: no-store",
          "Expires: -1"
        ],
        correct_answer: 1,
        explanation: "Cache-Control: no-cache allows local caching but requires validation before reuse.",
        points: 25
      },
      {
        id: "q3",
        question: "In PostgreSQL, what is the best index type for querying tags inside a TEXT[] array column?",
        options: [
          "B-Tree index",
          "Hash index",
          "GIN (Generalized Inverted Index)",
          "BRIN index"
        ],
        correct_answer: 2,
        explanation: "GIN indexes are designed for composite values where individual elements (like array items or JSONB fields) are queried with containment operators.",
        points: 25
      },
      {
        id: "q4",
        question: "Why are React Server Components (RSC) advantageous for data-intensive dashboards?",
        options: [
          "They compile to WebAssembly in the browser",
          "They execute exclusively on the server, eliminating client waterfalls and reducing JS bundle weight",
          "They eliminate the need for SQL databases",
          "They allow client-side mutations without network requests"
        ],
        correct_answer: 1,
        explanation: "RSCs keep expensive dependencies and secret keys on the server and stream lightweight rendered HTML/JSON to the client.",
        points: 25
      }
    ],
    is_published: true,
    created_by: "admin",
    created_at: "2024-11-20T12:00:00.000Z",
    updated_at: "2024-11-20T12:00:00.000Z",
  },
  {
    id: "a2",
    title: "AI Vector Systems & Prompt Engineering Evaluation",
    description: "Benchmark your mastery of vector embeddings, hybrid semantic retrieval, and safe LLM tool orchestration.",
    course_id: "c2",
    skill_id: "s8",
    time_limit_minutes: 20,
    passing_score: 75,
    total_questions: 3,
    questions: [
      {
        id: "q201",
        question: "What is the primary advantage of Hybrid Search (Sparse BM25 + Dense Vectors)?",
        options: [
          "It cuts API token costs by 90%",
          "It combines exact keyword matching (for codes, names, SKUs) with conceptual semantic understanding",
          "It eliminates the need for vector indexing",
          "It guarantees 100% precision with zero hallucinations"
        ],
        correct_answer: 1,
        explanation: "Dense vectors capture semantic concepts, while sparse BM25 preserves exact matches for rare domain terms and IDs.",
        points: 33
      },
      {
        id: "q202",
        question: "Why should an application validate LLM JSON output with schemas like Zod?",
        options: [
          "Because LLMs are non-deterministic and can generate invalid JSON or unexpected schema fields",
          "To speed up LLM generation time",
          "Because TypeScript requires runtime schema validation to compile",
          "To bypass prompt injection attacks automatically"
        ],
        correct_answer: 0,
        explanation: "LLMs can produce missing fields, improper data types, or syntax errors. Runtime Zod validation guarantees safe data consumption.",
        points: 33
      },
      {
        id: "q203",
        question: "What does temperature = 0 signify in Gemini API generation?",
        options: [
          "Maximum creativity and exploration",
          "Most deterministic, greedy token selection minimizing random variability",
          "Disable safety filters",
          "Stream responses in real-time"
        ],
        correct_answer: 1,
        explanation: "Temperature 0 produces deterministic, reproducible output by choosing the highest-probability token at each step.",
        points: 34
      }
    ],
    is_published: true,
    created_by: "admin",
    created_at: "2024-11-20T12:00:00.000Z",
    updated_at: "2024-11-20T12:00:00.000Z",
  }
];

export const INITIAL_COMPANIES: Company[] = [
  {
    id: "comp1",
    recruiter_id: "rec1",
    name: "FinScale Technologies",
    description: "FinScale builds high-throughput payment rails and risk intelligence platforms for global enterprises.",
    logo_url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80",
    website: "https://finscale.example.com",
    industry: "FinTech & Cloud Infrastructure",
    size: "250-500 employees",
    location: "San Francisco, CA (Hybrid)",
    verified: true,
    created_at: "2024-11-20T12:00:00.000Z",
    updated_at: "2024-11-20T12:00:00.000Z",
  },
  {
    id: "comp2",
    recruiter_id: "rec2",
    name: "Aether Cloud Systems",
    description: "Aether builds next-generation Kubernetes telemetry and autonomous incident mitigation agents.",
    logo_url: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=200&q=80",
    website: "https://aethercloud.example.com",
    industry: "DevOps & Developer Tooling",
    size: "100-250 employees",
    location: "Remote (Global)",
    verified: true,
    created_at: "2024-11-20T12:00:00.000Z",
    updated_at: "2024-11-20T12:00:00.000Z",
  },
  {
    id: "comp3",
    recruiter_id: "rec3",
    name: "Nexus Vector Labs",
    description: "Applied generative AI lab specializing in agentic workflows, LLM reasoning architectures, and vector pipelines.",
    logo_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=200&q=80",
    website: "https://nexusvector.example.com",
    industry: "Artificial Intelligence",
    size: "50-100 employees",
    location: "New York, NY / Remote",
    verified: true,
    created_at: "2024-11-20T12:00:00.000Z",
    updated_at: "2024-11-20T12:00:00.000Z",
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: "j1",
    company_id: "comp1",
    recruiter_id: "rec1",
    title: "Associate Cloud Infrastructure SRE",
    description: "We are seeking a high-aptitude Junior or Mid-level Site Reliability Engineer to manage high-availability edge nodes, automated rollback orchestration, and incident mitigation for high-traffic payment APIs.",
    requirements: [
      "Proficiency with Go or Python for automation and tooling",
      "Hands-on experience with Docker containerization and Kubernetes cluster concepts",
      "Understanding of CI/CD pipelines, Prometheus metrics, and infrastructure-as-code",
      "Demonstrated ability to write clear post-mortems and debug distributed systems"
    ],
    responsibilities: [
      "Maintain 99.99% availability of global payment gateway edge nodes",
      "Build automated rollout verification scripts and blue-green deployments",
      "Collaborate with backend engineering on database connection pooling and sharding",
      "Participate in blameless post-mortem investigations and telemetry audits"
    ],
    skills_required: ["Go (Golang)", "Kubernetes", "Docker & CI/CD", "AWS Cloud Infrastructure"],
    location: "San Francisco, CA / Remote",
    job_type: "full-time",
    experience_level: "entry",
    salary_min: 110000,
    salary_max: 135000,
    salary_currency: "USD",
    is_remote: true,
    is_active: true,
    application_deadline: "2024-12-25T12:00:00.000Z",
    created_at: "2024-11-15T12:00:00.000Z",
    updated_at: "2024-11-20T12:00:00.000Z",
    company: INITIAL_COMPANIES[0],
    application_count: 14,
  },
  {
    id: "j2",
    company_id: "comp3",
    recruiter_id: "rec3",
    title: "Junior AI & Vector Applications Engineer",
    description: "Join our core team building production-grade LLM applications. You will work on vector embeddings, multi-turn RAG retrieval, prompt tuning, and LangGraph agent pipelines.",
    requirements: [
      "Strong Python and TypeScript programming skills",
      "Familiarity with Gemini API or other modern LLM provider SDKs",
      "Knowledge of vector databases (Pinecone, pgvector) and semantic search metrics",
      "Eagerness to build production-tested projects rather than theoretical toys"
    ],
    responsibilities: [
      "Implement and test hybrid retrieval pipelines using semantic and keyword matching",
      "Develop evaluation harnesses for prompt regression testing",
      "Deploy containerized microservices to cloud infrastructure",
      "Benchmark response latency and token usage metrics"
    ],
    skills_required: ["Python", "TypeScript", "Gemini AI & LLMs", "PostgreSQL"],
    location: "Remote",
    job_type: "full-time",
    experience_level: "entry",
    salary_min: 105000,
    salary_max: 125000,
    salary_currency: "USD",
    is_remote: true,
    is_active: true,
    application_deadline: "2024-12-25T12:00:00.000Z",
    created_at: "2024-11-15T12:00:00.000Z",
    updated_at: "2024-11-20T12:00:00.000Z",
    company: INITIAL_COMPANIES[2],
    application_count: 22,
  },
  {
    id: "j3",
    company_id: "comp2",
    recruiter_id: "rec2",
    title: "Full-Stack Software Engineer (React / Go)",
    description: "Develop responsive, accessible developer dashboards with Next.js 15, paired with ultra-fast Go microservices handling millions of events daily.",
    requirements: [
      "Solid understanding of React 19, TypeScript, and modern Tailwind CSS",
      "Familiarity with REST APIs, WebSocket streaming, and SQL querying",
      "Portfolio of functional projects showing clean component architecture",
      "Strong communication and collaborative problem-solving skills"
    ],
    responsibilities: [
      "Construct modular UI components adhering to strict design system standards",
      "Integrate front-end dashboards with high-throughput backend APIs",
      "Write unit and end-to-end tests for mission-critical client journeys",
      "Optimize web vital metrics and server-side rendering performance"
    ],
    skills_required: ["React & Next.js", "TypeScript", "Go (Golang)", "PostgreSQL"],
    location: "Austin, TX / Remote",
    job_type: "full-time",
    experience_level: "mid",
    salary_min: 125000,
    salary_max: 155000,
    salary_currency: "USD",
    is_remote: true,
    is_active: true,
    application_deadline: "2024-12-25T12:00:00.000Z",
    created_at: "2024-11-15T12:00:00.000Z",
    updated_at: "2024-11-20T12:00:00.000Z",
    company: INITIAL_COMPANIES[1],
    application_count: 31,
  }
];

export const INITIAL_STUDENT_PROFILE: Profile = {
  id: "student-demo-id",
  email: "alex.chen@unlocked.edu",
  full_name: "Alex Chen",
  avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  role: "student",
  bio: "Former hospitality manager transitioning into Cloud SRE and Backend Systems. Passionate about Go, distributed architectures, and automated resilience.",
  phone: "+1 (555) 234-5678",
  location: "Chicago, IL",
  website: "https://alexchen.dev",
  github_url: "https://github.com/alexchen-dev",
  linkedin_url: "https://linkedin.com/in/alexchen-sre",
  onboarding_completed: true,
  created_at: "2024-11-15T12:00:00.000Z",
  updated_at: "2024-11-20T12:00:00.000Z",
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "p1",
    student_id: "student-demo-id",
    title: "PulseGuard: Distributed Kubernetes Telemetry & Rollback Daemon",
    description: "A production-grade Go daemon that monitors Kubernetes pod latency anomalies and automatically initiates zero-downtime rollbacks when error rates exceed calibrated SLIs.",
    short_description: "Automated rollback daemon for Kubernetes clusters using Go and Prometheus metrics.",
    thumbnail_url: "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    ],
    technologies: ["Go (Golang)", "Kubernetes", "Prometheus", "Docker", "PostgreSQL"],
    github_url: "https://github.com/alexchen-dev/pulseguard",
    live_url: "https://pulseguard-demo.example.com",
    is_public: true,
    is_featured: true,
    status: "published",
    created_at: "2024-11-15T12:00:00.000Z",
    updated_at: "2024-11-20T12:00:00.000Z",
    student: {
      id: "student-demo-id",
      full_name: "Alex Chen",
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    }
  },
  {
    id: "p2",
    student_id: "student-demo-id",
    title: "OmniRAG: Multi-Modal Semantic Query Engine",
    description: "Enterprise knowledge base assistant implementing sparse-dense hybrid retrieval over documentation, powered by Google Gemini embeddings and pgvector.",
    short_description: "Hybrid vector search assistant using Gemini embeddings and PostgreSQL pgvector.",
    thumbnail_url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80"
    ],
    technologies: ["Next.js 15", "TypeScript", "Python", "Gemini API", "PostgreSQL"],
    github_url: "https://github.com/alexchen-dev/omnirag",
    live_url: "https://omnirag-demo.example.com",
    is_public: true,
    is_featured: true,
    status: "published",
    created_at: "2024-11-15T12:00:00.000Z",
    updated_at: "2024-11-20T12:00:00.000Z",
    student: {
      id: "student-demo-id",
      full_name: "Alex Chen",
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    }
  }
];

export const INITIAL_RESUME: Resume = {
  id: "res-demo-1",
  student_id: "student-demo-id",
  title: "Alex Chen — SRE & Cloud Systems Engineer",
  template: "modern-obsidian",
  is_primary: true,
  file_url: null,
  data: {
    personal: {
      name: "Alex Chen",
      email: "alex.chen@unlocked.edu",
      phone: "+1 (555) 234-5678",
      location: "Chicago, IL (Open to Relocation / Remote)",
      website: "https://alexchen.dev",
      linkedin: "https://linkedin.com/in/alexchen-sre",
      github: "https://github.com/alexchen-dev",
      summary: "Results-driven Software Engineer with rigorous hands-on training in distributed systems, Kubernetes cluster automation, and Go microservices. Proven ability to orchestrate zero-downtime CI/CD pipelines, troubleshoot distributed concurrency bugs, and deliver verifiable production software.",
    },
    experience: [
      {
        id: "exp1",
        title: "Operations & Systems Lead",
        company: "Apex Hospitality Group",
        location: "Chicago, IL",
        start_date: "2021-03",
        end_date: "2024-06",
        current: false,
        description: "Led multi-location logistics, inventory tracking automation, and critical incident response.",
        highlights: [
          "Engineered automated inventory reconciliation workflows reducing stock discrepancies by 34%",
          "Directed triage for 15+ daily operational anomalies with a sub-10 minute average resolution time",
          "Mentored a team of 12 associates on standardized digital workflows and SLA adherence"
        ]
      }
    ],
    education: [
      {
        id: "edu1",
        degree: "Verified Cloud & Backend Systems Engineering Track",
        institution: "UnlockED Career Platform",
        location: "Online",
        start_date: "2024-07",
        end_date: "2024-11",
        gpa: "Top 5% Cohort Score",
        highlights: [
          "Completed 500+ hours of production microservice development and Kubernetes cluster debugging",
          "Achieved 96% AI code evaluation index on distributed systems benchmark"
        ]
      }
    ],
    skills: [
      {
        category: "Languages & Frameworks",
        items: ["Go (Golang)", "TypeScript", "Python", "Next.js 15", "React 19", "SQL"]
      },
      {
        category: "Cloud & Infrastructure",
        items: ["Kubernetes", "Docker", "AWS (ECS, S3, IAM)", "Terraform", "GitHub Actions", "Prometheus"]
      },
      {
        category: "Databases & Tools",
        items: ["PostgreSQL", "Redis", "pgvector", "Git", "Postman", "Linux/Bash"]
      }
    ],
    projects: [
      {
        id: "proj1",
        name: "PulseGuard: Kubernetes Telemetry & Rollback Daemon",
        description: "Built an autonomous Go daemon observing Prometheus metrics to initiate automated blue/green rollbacks during latency spikes.",
        technologies: ["Go", "Kubernetes", "Prometheus", "Docker"],
        url: "https://github.com/alexchen-dev/pulseguard"
      },
      {
        id: "proj2",
        name: "OmniRAG: Vector Search Engine",
        description: "Implemented hybrid semantic and keyword retrieval over technical specs using Google Gemini embeddings and PostgreSQL pgvector.",
        technologies: ["TypeScript", "Next.js 15", "Gemini API", "PostgreSQL"],
        url: "https://github.com/alexchen-dev/omnirag"
      }
    ],
    certifications: [
      {
        id: "cert1",
        name: "Full-Stack Cloud Architecture Certified Attestation",
        issuer: "UnlockED Evaluation Engine",
        date: "2024-10",
        url: "https://unlocked.edu/verify/7F84-AI"
      }
    ]
  },
  created_at: "2024-11-15T12:00:00.000Z",
  updated_at: "2024-11-20T12:00:00.000Z",
};

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    user_id: "student-demo-id",
    type: "application_update",
    title: "Application Shortlisted!",
    message: "FinScale Technologies reviewed your application for Associate Cloud Infrastructure SRE and moved you to the Technical Interview stage.",
    data: { jobId: "j1", company: "FinScale Technologies" },
    read: false,
    created_at: "2024-11-15T12:00:00.000Z",
  },
  {
    id: "n2",
    user_id: "student-demo-id",
    type: "course_achievement",
    title: "Course Milestone Achieved",
    message: "You completed Module 2: Concurrency in Go with a perfect score on the practice exercises.",
    data: { courseId: "c1" },
    read: false,
    created_at: "2024-11-15T12:00:00.000Z",
  },
  {
    id: "n3",
    user_id: "student-demo-id",
    type: "ai_recommendation",
    title: "AI Career Match Update",
    message: "Your Verified Career Readiness index increased to 88/100 based on your latest PulseGuard project commit.",
    data: { score: 88 },
    read: true,
    created_at: "2024-11-15T12:00:00.000Z",
  }
];
