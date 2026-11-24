# UnlockED — Testing & Quality Assurance Guide

This document describes the test scenarios, verification procedures, and quality checks implemented for the **UnlockED** web platform.

---

## 1. Automated Verification Commands

### TypeScript Strict Mode Check
Verifies zero TypeScript errors, no implicit `any`, and strict type compliance:
```bash
npx tsc --noEmit
```

### Production Build Validation
Compiles all Server Components, Route Handlers, Client Components, and prerenders all pages:
```bash
npm run build
```

### Linting Check
Validates ESLint rules across all files:
```bash
npm run lint
```

---

## 2. Interactive End-to-End Functional Test Suite

### Scenario A: Public Landing Page & Stitch Fidelity
1. Navigate to `/`.
2. Verify visual tokens:
   - Deep Obsidian background (`#0B0B12`, `#13131A`).
   - Violet accent `#8B5CF6`, Indigo `#6366F1`, and Emerald `#22C55E`.
   - Inter typography with tighter optical tracking on headings.
3. Test the interactive **AI Pathfinder** widget:
   - Click between `Retail -> Cloud SRE`, `Hospitality -> Product Eng`, and `Logistics -> Data Platform`.
   - Verify dynamic updates to Origin profile, Crucible curriculum, Destination compensation, and lift metrics.
4. Verify the **Telemetry Bento** preview with concentric circular radar gauge.

### Scenario B: Role Switching & Authentication
1. On any page, observe the **Role Switcher** pill in the top navigation bar (`Student`, `Recruiter`, `Admin`).
2. Click **Student**:
   - Workspace switches to Student context (Alex Chen).
   - Sidebar navigates to `/student` (Overview, Courses, Benchmarks, AI Assistant, Roadmap, Portfolio, Resume, Jobs, Certificates).
3. Click **Recruiter**:
   - Workspace switches to Recruiter context (David Vance, FinScale Technologies).
   - Sidebar navigates to `/recruiter` (Talent Hub, Company, Manage Jobs, Candidate Search, Applications).
4. Click **Admin**:
   - Workspace switches to Platform Lead Administrator.
   - Sidebar navigates to `/admin` (Analytics, User Access, Course Moderation, Job Moderation, Partner Verification).

### Scenario C: Course Learning & Progress
1. Navigate to `/student/courses`.
2. Search for "Go" or select the "Full-Stack Development" filter.
3. Click on **Full-Stack Cloud Architecture** -> View Syllabus.
4. Click **Start** on Lesson 1 -> Interactive Lesson Viewer opens.
5. Click **Mark as Complete** -> Verify the course progress increases.
6. Click **Next Lesson** to transition to Lesson 2.

### Scenario D: Skill Assessment & Server-Side Scoring
1. Navigate to `/student/assessments`.
2. Click **Start Assessment** on the "Cloud Architecture & Go Fundamentals Benchmark".
3. Verify the 15-minute countdown timer begins ticking.
4. Answer all 4 multiple-choice questions.
5. Submit the assessment.
6. **Security Check**: Verify that correct answers were never delivered in the initial payload; score is computed via `/api/assessments/submit`.
7. Verify the score result modal displays the calculated score, percentage, breakdown explanations, and generated cryptographic attestation hash (`#7F84-AI-...`).

### Scenario E: AI Features (Server-Side Gemini Integration)
1. **AI Career Advisor** (`/student/ai-assistant`):
   - Click a quick-prompt chip or type a question.
   - Verify structured suggestions, match scores, transferable strengths, and step-by-step action plans are returned.
2. **AI Mock Interview** (`/student/ai-assistant` -> Interview Studio):
   - Click "Generate 3 Practice Questions".
   - Type an answer and click "Submit Answer For Review".
   - Verify that Gemini evaluates the response with scoring criteria (0-100), strengths, areas to deepen, and a model senior response.
3. **AI Resume Architect** (`/student/resume`):
   - Click "AI Enhance Bullets".
   - Verify active engineering verbs and quantified metrics are suggested.
   - Click "Apply to Resume" and toggle between **Obsidian Dark**, **Clean Light**, and **Tech Executive** templates.
   - Click "Print / Export PDF" to trigger the browser's clean print dialog.

### Scenario F: Job Portal & Recruiter Pipeline
1. In Student view, navigate to `/student/jobs`.
2. Select "Associate Cloud Infrastructure SRE".
3. Click **Apply Now**, fill in a note, and submit.
4. Try to re-apply to the same position -> Verify duplicate prevention blocks re-submission.
5. Switch to **Recruiter** role in the top nav -> Navigate to `/recruiter/applications`.
6. Verify the application appears in the pipeline.
7. Click between **Reviewed**, **Shortlist**, **Interview**, and **Offer** to transition the candidate through pipeline stages.

### Scenario G: Admin Governance & Security
1. Switch to **Admin** role -> Navigate to `/admin/analytics`.
2. Verify interactive Recharts area chart and domain distribution pie chart render smoothly.
3. Navigate to `/admin/users`:
   - Search for users.
   - Change user roles between Student, Recruiter, and Admin dynamically.
4. Navigate to `/admin/jobs`:
   - Toggle job status between "Active & Approved" and "Suspended".
5. Navigate to `/admin/recruiters`:
   - Verify or revoke employer verification status.
