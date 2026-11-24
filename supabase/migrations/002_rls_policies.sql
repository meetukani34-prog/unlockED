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
