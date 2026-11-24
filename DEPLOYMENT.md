# UnlockED — Deployment Guide

This guide details the deployment of **UnlockED** to **Vercel** with a managed **Supabase** backend and **Google Gemini AI**.

---

## Architecture Overview

```
                      +-----------------------------+
                      |       Vercel (Hosting)      |
                      |  - Next.js App Router (RSC) |
                      |  - Edge Middleware (Auth)   |
                      |  - Server Actions & Routes  |
                      +--------------+--------------+
                                     |
               +---------------------+---------------------+
               |                                           |
+--------------v---------------+             +-------------v---------------+
|     Supabase Cloud Services  |             |      Google Gemini API      |
|  - Managed PostgreSQL DB     |             |  - Official @google/genai   |
|  - Row Level Security (RLS)  |             |  - Server-Side Generative   |
|  - Cookie-based SSR Auth     |             |  - Structured AI Schemas    |
|  - Object Storage (Portfolios|             +-----------------------------+
+------------------------------+
```

---

## 1. Supabase Hosted Backend Setup

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com) and create a new project.
   - Choose a region geographically close to your target audience.

2. **Execute Database Migrations**:
   - Navigate to the **SQL Editor** in the Supabase Dashboard.
   - Execute `supabase/migrations/001_initial_schema.sql` (Creates all 19 tables, enums, triggers, and indexes).
   - Execute `supabase/migrations/002_rls_policies.sql` (Enables Row Level Security on all tables with granular access control).
   - Execute `supabase/seed.sql` (Seeds initial production courses, lessons, and assessment benchmarks).

3. **Storage Buckets**:
   - Under **Storage**, create two buckets:
     - `project-media`: Public bucket for student project screenshots and demos.
     - `resumes`: Private bucket restricted to authenticated owners and associated job recruiters.

4. **Authentication Settings**:
   - Under **Authentication -> URL Configuration**:
     - Site URL: `https://your-domain.vercel.app`
     - Redirect URLs: `https://your-domain.vercel.app/**`

---

## 2. Google Gemini API Setup

1. Obtain a Gemini API Key from [Google AI Studio](https://aistudio.google.com).
2. Ensure the key has permissions for:
   - `gemini-2.5-flash` / `gemini-2.0-flash`
3. Rate limits and safety guardrails are pre-configured in `src/lib/ai/gemini.ts`.

---

## 3. Vercel Deployment

### Method A: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

### Method B: Git Integration
1. Push your repository to GitHub / GitLab / Bitbucket.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New Project** and import the repository.
3. Configure the **Build & Development Settings**:
   - Framework Preset: `Next.js`
   - Root Directory: `unlocked`
4. Add **Environment Variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
   SUPABASE_SERVICE_ROLE_KEY = your-service-role-key
   GEMINI_API_KEY = your-gemini-api-key
   NEXT_PUBLIC_APP_URL = https://your-domain.vercel.app
   NEXT_PUBLIC_APP_NAME = UnlockED
   ADMIN_INIT_SECRET = your-custom-secret-token
   ```
5. Click **Deploy**.

---

## 4. Post-Deployment Verification Checklist

1. [ ] **Public Landing Page**: Accessible at root URL with Obsidian Kinetic dark styling.
2. [ ] **Role Switcher / Auth**: Able to switch between Student, Recruiter, and Admin.
3. [ ] **Courses**: Syllabus viewable, progress tracks correctly when completing lessons.
4. [ ] **Assessments**: Benchmarks submit to `/api/assessments/submit` and score accurately on the server.
5. [ ] **AI Assistant**: Generates career guidance and runs mock technical interviews.
6. [ ] **Job Portal**: Student can apply to roles; Recruiter can update applicant status in `/recruiter/applications`.
7. [ ] **Admin Console**: Platform analytics and user role permissions can be managed from `/admin`.
