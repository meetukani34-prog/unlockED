-- ============================================================================
-- UnlockED Database Schema Migration (001_initial_schema.sql)
-- 19 Tables with UUIDs, Foreign Keys, Indexes, and Updated_At triggers
-- ============================================================================

-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enum Types
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('student', 'recruiter', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE enrollment_status AS ENUM ('active', 'completed', 'dropped');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE skill_proficiency AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE job_type_enum AS ENUM ('full-time', 'part-time', 'contract', 'internship');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE experience_level_enum AS ENUM ('entry', 'mid', 'senior');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE application_status_enum AS ENUM ('pending', 'reviewed', 'shortlisted', 'interviewed', 'offered', 'rejected', 'withdrawn');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE ai_conversation_type AS ENUM ('career_assistant', 'mock_interview', 'resume_review', 'skill_gap');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE notification_type AS ENUM ('application_update', 'course_achievement', 'assessment_result', 'job_alert', 'system', 'ai_recommendation');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 1. Profiles Table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'student',
  bio TEXT,
  phone TEXT,
  location TEXT,
  website TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Companies Table (belongs to recruiter)
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recruiter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  website TEXT,
  industry TEXT,
  size TEXT,
  location TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Courses Table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  thumbnail_url TEXT,
  category TEXT NOT NULL,
  difficulty difficulty_level NOT NULL DEFAULT 'beginner',
  duration_weeks INTEGER NOT NULL DEFAULT 4,
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Lessons Table
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 1,
  duration_minutes INTEGER DEFAULT 20,
  video_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(course_id, order_index)
);

-- 5. Enrollments Table (student <-> course)
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  status enrollment_status NOT NULL DEFAULT 'active',
  progress_percentage INTEGER NOT NULL DEFAULT 0,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  completed_at TIMESTAMPTZ,
  UNIQUE(student_id, course_id)
);

-- 6. Lesson Progress Table (student <-> lesson)
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT true,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(student_id, lesson_id)
);

-- 7. Skills Table (Catalog)
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. User Skills Table
CREATE TABLE IF NOT EXISTS user_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  proficiency skill_proficiency NOT NULL DEFAULT 'beginner',
  verified BOOLEAN NOT NULL DEFAULT false,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, skill_id)
);

-- 9. Assessments Table
CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  skill_id UUID REFERENCES skills(id) ON DELETE SET NULL,
  time_limit_minutes INTEGER NOT NULL DEFAULT 15,
  passing_score INTEGER NOT NULL DEFAULT 70,
  total_questions INTEGER NOT NULL DEFAULT 5,
  questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. Assessment Attempts Table
CREATE TABLE IF NOT EXISTS assessment_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_points INTEGER NOT NULL,
  percentage INTEGER NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  started_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  completed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  time_spent_seconds INTEGER NOT NULL DEFAULT 0,
  passed BOOLEAN NOT NULL DEFAULT false
);

-- 11. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  thumbnail_url TEXT,
  images TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  is_public BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 12. Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  certificate_number TEXT NOT NULL UNIQUE,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(student_id, course_id)
);

-- 13. Resumes Table
CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'My Resume',
  template TEXT NOT NULL DEFAULT 'modern-obsidian',
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  file_url TEXT,
  is_primary BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 14. Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  recruiter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  responsibilities TEXT[] DEFAULT '{}',
  skills_required TEXT[] DEFAULT '{}',
  location TEXT NOT NULL,
  job_type job_type_enum NOT NULL DEFAULT 'full-time',
  experience_level experience_level_enum NOT NULL DEFAULT 'entry',
  salary_min INTEGER,
  salary_max INTEGER,
  salary_currency TEXT NOT NULL DEFAULT 'USD',
  is_remote BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  application_deadline TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 15. Applications Table
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  resume_id UUID REFERENCES resumes(id) ON DELETE SET NULL,
  cover_letter TEXT,
  status application_status_enum NOT NULL DEFAULT 'pending',
  applied_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(student_id, job_id)
);

-- 16. Saved Jobs Table
CREATE TABLE IF NOT EXISTS saved_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(student_id, job_id)
);

-- 17. AI Conversations Table
CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type ai_conversation_type NOT NULL DEFAULT 'career_assistant',
  title TEXT NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 18. Career Roadmaps Table
CREATE TABLE IF NOT EXISTS career_roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  target_role TEXT NOT NULL,
  current_level TEXT NOT NULL,
  roadmap_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  generated_by_ai BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 19. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type notification_type NOT NULL DEFAULT 'system',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- INDEXES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_companies_recruiter ON companies(recruiter_id);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_difficulty ON courses(difficulty);
CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(is_published);
CREATE INDEX IF NOT EXISTS idx_lessons_course_order ON lessons(course_id, order_index);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_student ON lesson_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_user_skills_user ON user_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_assessments_course ON assessments(course_id);
CREATE INDEX IF NOT EXISTS idx_assessment_attempts_student ON assessment_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_projects_student ON projects(student_id);
CREATE INDEX IF NOT EXISTS idx_projects_public ON projects(is_public);
CREATE INDEX IF NOT EXISTS idx_certificates_student ON certificates(student_id);
CREATE INDEX IF NOT EXISTS idx_resumes_student ON resumes(student_id);
CREATE INDEX IF NOT EXISTS idx_jobs_company ON jobs(company_id);
CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_applications_student ON applications(student_id);
CREATE INDEX IF NOT EXISTS idx_applications_job ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_saved_jobs_student ON saved_jobs(student_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_student ON ai_conversations(student_id);
CREATE INDEX IF NOT EXISTS idx_career_roadmaps_student ON career_roadmaps(student_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, read);

-- ============================================================================
-- AUTOMATIC updated_at TRIGGER FUNCTION
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
DO $$
DECLARE
  t text;
BEGIN
  FOR t IN SELECT unnest(ARRAY['profiles', 'companies', 'courses', 'lessons', 'assessments', 'projects', 'resumes', 'jobs', 'applications', 'ai_conversations', 'career_roadmaps'])
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trigger_updated_at ON %I;', t);
    EXECUTE format('CREATE TRIGGER trigger_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();', t);
  END LOOP;
END $$;
-- ============================================================================
-- UnlockED Row Level Security (RLS) Policies (002_rls_policies.sql)
-- Strict security rules for all 19 tables
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Helper functions
CREATE OR REPLACE FUNCTION auth_user_role()
RETURNS user_role AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION is_recruiter()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'recruiter'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ----------------------------------------------------------------------------
-- 1. PROFILES POLICIES
-- ----------------------------------------------------------------------------
-- Everyone authenticated can read basic profile info (needed for candidate search, public portfolios)
CREATE POLICY "Public profiles are readable by authenticated users"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

-- Users can update only their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Insert permitted via auth trigger or self upon registration
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

-- Admins can update any profile (e.g., change roles, ban/verify)
CREATE POLICY "Admins can update any profile"
  ON profiles FOR ALL
  TO authenticated
  USING (is_admin());

-- ----------------------------------------------------------------------------
-- 2. COMPANIES POLICIES
-- ----------------------------------------------------------------------------
-- Anyone authenticated can view verified/active companies
CREATE POLICY "Companies readable by authenticated users"
  ON companies FOR SELECT
  TO authenticated
  USING (true);

-- Recruiters can manage only their own company
CREATE POLICY "Recruiters manage own company"
  ON companies FOR ALL
  TO authenticated
  USING (recruiter_id = auth.uid())
  WITH CHECK (recruiter_id = auth.uid());

-- Admins can manage any company
CREATE POLICY "Admins manage any company"
  ON companies FOR ALL
  TO authenticated
  USING (is_admin());

-- ----------------------------------------------------------------------------
-- 3. COURSES POLICIES
-- ----------------------------------------------------------------------------
-- Anyone authenticated or public can view published courses
CREATE POLICY "Published courses are viewable by everyone"
  ON courses FOR SELECT
  USING (is_published = true OR is_admin());

-- Admins can insert, update, delete courses
CREATE POLICY "Admins manage courses"
  ON courses FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ----------------------------------------------------------------------------
-- 4. LESSONS POLICIES
-- ----------------------------------------------------------------------------
-- Enrolled students or admins can view published lessons
CREATE POLICY "Published lessons viewable by authenticated users"
  ON lessons FOR SELECT
  TO authenticated
  USING (is_published = true OR is_admin());

CREATE POLICY "Admins manage lessons"
  ON lessons FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ----------------------------------------------------------------------------
-- 5. ENROLLMENTS POLICIES
-- ----------------------------------------------------------------------------
-- Students manage their own enrollments
CREATE POLICY "Students view own enrollments"
  ON enrollments FOR SELECT
  TO authenticated
  USING (student_id = auth.uid() OR is_admin());

CREATE POLICY "Students create own enrollments"
  ON enrollments FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students update own enrollments"
  ON enrollments FOR UPDATE
  TO authenticated
  USING (student_id = auth.uid() OR is_admin())
  WITH CHECK (student_id = auth.uid() OR is_admin());

-- ----------------------------------------------------------------------------
-- 6. LESSON PROGRESS POLICIES
-- ----------------------------------------------------------------------------
CREATE POLICY "Students manage own lesson progress"
  ON lesson_progress FOR ALL
  TO authenticated
  USING (student_id = auth.uid() OR is_admin())
  WITH CHECK (student_id = auth.uid() OR is_admin());

-- ----------------------------------------------------------------------------
-- 7. SKILLS POLICIES
-- ----------------------------------------------------------------------------
-- Everyone can read the skills catalog
CREATE POLICY "Skills viewable by authenticated users"
  ON skills FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins manage skills catalog"
  ON skills FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ----------------------------------------------------------------------------
-- 8. USER SKILLS POLICIES
-- ----------------------------------------------------------------------------
CREATE POLICY "User skills viewable by authenticated users"
  ON user_skills FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users manage own skills"
  ON user_skills FOR ALL
  TO authenticated
  USING (user_id = auth.uid() OR is_admin())
  WITH CHECK (user_id = auth.uid() OR is_admin());

-- ----------------------------------------------------------------------------
-- 9. ASSESSMENTS POLICIES
-- ----------------------------------------------------------------------------
-- Published assessments are viewable by authenticated users
CREATE POLICY "Assessments viewable by authenticated users"
  ON assessments FOR SELECT
  TO authenticated
  USING (is_published = true OR is_admin());

CREATE POLICY "Admins manage assessments"
  ON assessments FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ----------------------------------------------------------------------------
-- 10. ASSESSMENT ATTEMPTS POLICIES
-- ----------------------------------------------------------------------------
CREATE POLICY "Students view and submit own attempts"
  ON assessment_attempts FOR SELECT
  TO authenticated
  USING (student_id = auth.uid() OR is_admin());

CREATE POLICY "Students insert own attempts"
  ON assessment_attempts FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

-- ----------------------------------------------------------------------------
-- 11. PROJECTS POLICIES
-- ----------------------------------------------------------------------------
-- Public projects viewable by anyone, private by owner or admin
CREATE POLICY "Public projects viewable by all"
  ON projects FOR SELECT
  USING (is_public = true OR student_id = auth.uid() OR is_admin());

CREATE POLICY "Students manage own projects"
  ON projects FOR ALL
  TO authenticated
  USING (student_id = auth.uid() OR is_admin())
  WITH CHECK (student_id = auth.uid() OR is_admin());

-- ----------------------------------------------------------------------------
-- 12. CERTIFICATES POLICIES
-- ----------------------------------------------------------------------------
-- Certificates viewable by anyone (for verification) or student
CREATE POLICY "Certificates viewable by all"
  ON certificates FOR SELECT
  USING (true);

CREATE POLICY "System/Admins issue certificates"
  ON certificates FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid() OR is_admin());

-- ----------------------------------------------------------------------------
-- 13. RESUMES POLICIES
-- ----------------------------------------------------------------------------
-- Students manage their own resumes
-- Recruiters can view student resumes ONLY if applied to their job
CREATE POLICY "Students manage own resumes"
  ON resumes FOR ALL
  TO authenticated
  USING (student_id = auth.uid() OR is_admin())
  WITH CHECK (student_id = auth.uid() OR is_admin());

CREATE POLICY "Recruiters view resumes of applicants"
  ON resumes FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM applications a
      JOIN jobs j ON a.job_id = j.id
      WHERE a.resume_id = resumes.id
      AND j.recruiter_id = auth.uid()
    )
  );

-- ----------------------------------------------------------------------------
-- 14. JOBS POLICIES
-- ----------------------------------------------------------------------------
-- Active jobs viewable by anyone
CREATE POLICY "Active jobs viewable by authenticated users"
  ON jobs FOR SELECT
  TO authenticated
  USING (is_active = true OR recruiter_id = auth.uid() OR is_admin());

CREATE POLICY "Recruiters manage own jobs"
  ON jobs FOR ALL
  TO authenticated
  USING (recruiter_id = auth.uid() OR is_admin())
  WITH CHECK (recruiter_id = auth.uid() OR is_admin());

-- ----------------------------------------------------------------------------
-- 15. APPLICATIONS POLICIES
-- ----------------------------------------------------------------------------
-- Students can view and create their own applications
CREATE POLICY "Students view own applications"
  ON applications FOR SELECT
  TO authenticated
  USING (student_id = auth.uid() OR is_admin());

CREATE POLICY "Students submit own applications"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students update/withdraw own applications"
  ON applications FOR UPDATE
  TO authenticated
  USING (student_id = auth.uid() AND status = 'pending')
  WITH CHECK (student_id = auth.uid());

-- Recruiters can view and update applications for their jobs
CREATE POLICY "Recruiters view and update job applications"
  ON applications FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM jobs WHERE jobs.id = applications.job_id AND jobs.recruiter_id = auth.uid()
    ) OR is_admin()
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM jobs WHERE jobs.id = applications.job_id AND jobs.recruiter_id = auth.uid()
    ) OR is_admin()
  );

-- ----------------------------------------------------------------------------
-- 16. SAVED JOBS POLICIES
-- ----------------------------------------------------------------------------
CREATE POLICY "Students manage saved jobs"
  ON saved_jobs FOR ALL
  TO authenticated
  USING (student_id = auth.uid())
  WITH CHECK (student_id = auth.uid());

-- ----------------------------------------------------------------------------
-- 17. AI CONVERSATIONS POLICIES
-- ----------------------------------------------------------------------------
CREATE POLICY "Students manage own AI conversations"
  ON ai_conversations FOR ALL
  TO authenticated
  USING (student_id = auth.uid() OR is_admin())
  WITH CHECK (student_id = auth.uid() OR is_admin());

-- ----------------------------------------------------------------------------
-- 18. CAREER ROADMAPS POLICIES
-- ----------------------------------------------------------------------------
CREATE POLICY "Students manage own roadmaps"
  ON career_roadmaps FOR ALL
  TO authenticated
  USING (student_id = auth.uid() OR is_admin())
  WITH CHECK (student_id = auth.uid() OR is_admin());

-- ----------------------------------------------------------------------------
-- 19. NOTIFICATIONS POLICIES
-- ----------------------------------------------------------------------------
CREATE POLICY "Users manage own notifications"
  ON notifications FOR ALL
  TO authenticated
  USING (user_id = auth.uid() OR is_admin())
  WITH CHECK (user_id = auth.uid() OR is_admin());
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
    '22222222-2222-2222-2222-222222222201',
    'Building Microservices with Go & PostgreSQL',
    '# Building Microservices with Go & PostgreSQL\n\nLearn how to structure robust API endpoints with clean architecture, prepared SQL queries, transaction boundaries, and structured JSON responses.\n\n### Database Schema Considerations\nAlways define proper foreign keys and composite indexes for multi-column filters.\n\n```sql\nCREATE INDEX idx_orders_user_created ON orders (user_id, created_at DESC);\n```',
    2,
    35,
    true
  ),
  (
    '33333333-3333-3333-3333-333333333303',
    '22222222-2222-2222-2222-222222222201',
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
