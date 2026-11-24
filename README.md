# UnlockED

> **Learn skills. Build projects. Prove your potential. Unlock opportunities.**

UnlockED is a full-stack, AI-powered education and career platform engineered to help non-traditional and underserved learners master high-demand technical capabilities, build verifiable production systems, prove competency through AI-evaluated benchmarks, and unlock career opportunities directly with hiring partners.

---

## Visual Design Reference: "Obsidian Kinetic"
Based directly on **Google Stitch Project #6434954933055708230**:
- **Dual Visual Paradigms**: High-luminous public discovery with an obsidian dark workspace engineered for deep focus and tangible momentum.
- **Color System**: Spectral Purples (`#8B5CF6`, `#A078FF`, `#D0BCFF`), Indigos (`#6366F1`), and Emerald Growth indicators (`#22C55E`, `#4AE176`).
- **Dark Surface Tiers**: Micro-refined tonal surfaces (`#0B0B12`, `#101018`, `#151520`, `#1C1C2B`) with 1px structural hairline borders (`#232336`).
- **Inter Typography**: Tight optical tracking (`-0.03em` display to `-0.01em` body).

---

## Core Capabilities & User Roles

### 1. Student Workspace (`/student`)
- **Dashboard Overview**: Career readiness telemetry (88/100 Index), active course progress, verified skill radar, and incoming interview requests.
- **Curriculum & Lesson Sandboxes** (`/student/courses`): High-concurrency Go microservices, AI & Vector pipelines, and DevOps/Kubernetes tracks with interactive markdown and sandbox code execution.
- **Skill Benchmark Assessments** (`/student/assessments`): Timed multiple-choice quizzes with countdown timer and **server-side scoring** (`/api/assessments/submit`) that never exposes answers before submission.
- **AI Career Advisor & Pathfinder** (`/student/ai-assistant`): Multi-turn interactive career counseling powered by Google Gemini, generating tailored role suggestions, transferable strengths, and action plans.
- **AI Mock Technical Interview** (`/student/ai-assistant`): Real-time technical interview simulator grading answers on transparent criteria with model senior responses.
- **Personalized Career Roadmap** (`/student/roadmap`): Step-by-step phased milestones, project requirements, and attestation gates.
- **Project Portfolio** (`/student/portfolio`): Showcase of production systems (e.g. *PulseGuard*, *OmniRAG*) with verified repository code links and live demos.
- **Public Portfolio Attestation** (`/portfolio/[username]`): External shareable candidate profile with cryptographic verification hash (`#7F84-AI`).
- **AI Resume Architect** (`/student/resume`): Structured resume builder with action-verb enhancements, impact scoring, template switcher, and PDF export.
- **Job Opportunities & Applications** (`/student/jobs`): Search, filter, save, and apply to roles with duplicate application prevention.
- **Verified Certificates** (`/student/certificates`): Cryptographic certificates of technical mastery.

### 2. Recruiter Talent Hub (`/recruiter`)
- **Talent Hub Overview**: Metrics on active requisitions, applicant volume, shortlisted talent, and candidate readiness distributions.
- **Candidate Search** (`/recruiter/candidates`): Discover pre-assessed candidates filtered by verified skills (Go, Kubernetes, React, Vector DB) and inspect code proof directly.
- **Application Pipeline** (`/recruiter/applications`): Transition candidates through stages (*Reviewed*, *Shortlisted*, *Interview*, *Offered*, *Rejected*).
- **Manage Requisitions** (`/recruiter/jobs/new`): Post new roles with salary bands, remote work policies, and required skill criteria.
- **Company Profile** (`/recruiter/company`): Manage verified hiring partner branding and engineering culture descriptions.

### 3. Platform Admin Console (`/admin`)
- **Admin Console & Telemetry**: Platform-wide KPIs (18,520 learners, 420 partners, 1,580 placements).
- **Platform Analytics** (`/admin/analytics`): Interactive **Recharts** visualizations displaying 6-month talent growth trends, placement conversion, and domain distributions.
- **User Access & Role Management** (`/admin/users`): Server-side role assignment (*Student*, *Recruiter*, *Admin*) with account state toggles. Public registration never grants admin permissions.
- **Course & Module Moderation** (`/admin/courses`): Publish or unpublish curricula.
- **Job Moderation & Compliance** (`/admin/jobs`): Review and approve employer postings for equity and compliance.
- **Partner Verification** (`/admin/recruiters`): Verify employer legitimacy and grant access to candidate pipelines.

---

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS 4 & Custom Obsidian Kinetic Theme
- **UI Components**: Radix UI Primitives, Lucide Icons, Class Variance Authority
- **Visual Analytics**: Recharts
- **Database & Auth**: Supabase PostgreSQL, Row Level Security (RLS), Cookie-based SSR
- **AI Engine**: Google Gemini API via official `@google/genai` SDK (Server-Side Only)

---

## Getting Started
See [SETUP.md](./SETUP.md) for local installation instructions.
See [DEPLOYMENT.md](./DEPLOYMENT.md) for production hosting on Vercel and Supabase.
See [TESTING.md](./TESTING.md) for the end-to-end testing manual.
