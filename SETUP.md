# UnlockED — Setup & Installation Guide

This guide details step-by-step instructions for running **UnlockED** locally and connecting external backend services (Supabase & Google Gemini API).

---

## 1. Prerequisites
- **Node.js**: v20 or higher (v24 recommended)
- **npm**: v10 or higher
- **Supabase Account**: (Optional for local demo mode; required for persistent cloud PostgreSQL)
- **Google Gemini API Key**: For server-side AI generative features

---

## 2. Quick Local Start (Zero-Config Demo Mode)
The repository contains built-in demo datasets, mock databases, and algorithmic AI fallback engines so you can immediately run and test the complete platform locally without external API keys:

```bash
cd unlocked
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 3. Environment Configuration
Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your service credentials:

```ini
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-secret-key

# Google Gemini API Configuration (Official @google/genai SDK)
GEMINI_API_KEY=AIzaSy...

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=UnlockED

# Administrator Initialization Secret
ADMIN_INIT_SECRET=your-secure-admin-token
```

---

## 4. Supabase Database & Migrations Setup
1. Create a new project in the [Supabase Dashboard](https://supabase.com).
2. Open the **SQL Editor** tab in your Supabase dashboard.
3. Run the following migrations in order:
   - `supabase/migrations/001_initial_schema.sql` (Creates all 19 tables, enums, triggers, and composite indexes)
   - `supabase/migrations/002_rls_policies.sql` (Enables strict Row Level Security policies across all tables)
   - `supabase/seed.sql` (Seeds courses, lessons, skills catalog, and assessment benchmarks)

---

## 5. First Administrator Account Setup
Per platform security guidelines, public signups never grant administrative privileges. Initialize your first platform administrator via the protected server-side endpoint:

```bash
curl -X POST http://localhost:3000/api/admin/seed \
  -H "Authorization: Bearer your-secure-admin-token" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@unlocked.edu",
    "password": "SecurePassword123!",
    "fullName": "Platform Lead Administrator"
  }'
```

In the local web UI, you can also toggle between **Student**, **Recruiter**, and **Admin** workspaces in 1 click using the top navigation bar's role switcher.
