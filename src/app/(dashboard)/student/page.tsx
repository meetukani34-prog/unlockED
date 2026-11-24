"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import {
  Sparkles,
  BookOpen,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  TrendingUp,
  FileText,
  FolderGit2,
  Clock,
  ExternalLink,
  Bot,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { INITIAL_COURSES, INITIAL_ASSESSMENTS, INITIAL_JOBS, INITIAL_PROJECTS } from "@/lib/data/mock-data";

export default function StudentDashboardPage() {
  const { user, enrolledCourseIds, completedLessons, appliedJobs } = useAuth();

  const enrolledCourses = INITIAL_COURSES.filter((c) =>
    enrolledCourseIds.includes(c.id)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232336]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F3FF]">
              Welcome back, {user?.full_name?.split(" ")[0] || "Alex"}
            </h1>
            <Badge variant="emerald" dot>
              Verified Candidate
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Your career readiness index has increased by +4% this week. 3 hiring partners reviewed your project portfolio.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/student/ai-assistant">
            <Button variant="gradient" size="sm" className="gap-2 text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              AI Career Advisor
            </Button>
          </Link>
          <Link href="/student/resume">
            <Button variant="secondary" size="sm" className="gap-2 text-xs">
              <FileText className="w-3.5 h-3.5 text-[#6366F1]" />
              Resume Builder
            </Button>
          </Link>
        </div>
      </div>

      {/* Top Stat Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <Card className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
              Readiness Index
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-[#22C55E]">88</span>
              <span className="text-xs text-[#94A3B8]">/ 100</span>
            </div>
            <span className="text-[11px] text-[#22C55E] font-medium">+12% vs last month</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center text-[#22C55E]">
            <TrendingUp className="w-6 h-6" />
          </div>
        </Card>

        {/* Metric 2 */}
        <Card className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
              Active Courses
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-[#8B5CF6]">
                {enrolledCourseIds.length}
              </span>
              <span className="text-xs text-[#94A3B8]">enrolled</span>
            </div>
            <span className="text-[11px] text-[#8B5CF6] font-medium">
              {completedLessons.length} lessons completed
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6]">
            <BookOpen className="w-6 h-6" />
          </div>
        </Card>

        {/* Metric 3 */}
        <Card className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
              Portfolio Projects
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-[#6366F1]">
                {INITIAL_PROJECTS.length}
              </span>
              <span className="text-xs text-[#94A3B8]">attested</span>
            </div>
            <span className="text-[11px] text-[#6366F1] font-medium">100% code verified</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center text-[#6366F1]">
            <FolderGit2 className="w-6 h-6" />
          </div>
        </Card>

        {/* Metric 4 */}
        <Card className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
              Job Applications
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-[#D0BCFF]">
                {appliedJobs.length}
              </span>
              <span className="text-xs text-[#94A3B8]">active</span>
            </div>
            <span className="text-[11px] text-[#22C55E] font-medium">1 Shortlisted</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#D0BCFF]/10 border border-[#D0BCFF]/20 flex items-center justify-center text-[#D0BCFF]">
            <Briefcase className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Main Grid: Course In-Progress + Telemetry Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: In-Progress Curriculum */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle>Current Learning Focus</CardTitle>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Pick up right where you left off in your technical track
                </p>
              </div>
              <Link href="/student/courses">
                <Button variant="ghost" size="sm" className="text-xs text-[#8B5CF6]">
                  Browse Catalog
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {enrolledCourses.map((course) => {
                const progressPct = Math.round(
                  (completedLessons.length / (course.lesson_count || 6)) * 100
                );

                return (
                  <div
                    key={course.id}
                    className="p-5 rounded-2xl bg-[#101018] border border-[#232336] flex flex-col justify-between gap-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <Badge variant="default">{course.category}</Badge>
                          <span className="text-xs font-mono text-[#94A3B8]">
                            {course.duration_weeks} WEEKS
                          </span>
                        </div>
                        <h4 className="text-base font-semibold text-[#F5F3FF]">
                          {course.title}
                        </h4>
                        <p className="text-xs text-[#94A3B8] mt-1 line-clamp-2">
                          {course.short_description}
                        </p>
                      </div>

                      <Link href={`/student/courses/${course.id}`}>
                        <Button size="sm" variant="gradient" className="shrink-0 text-xs">
                          Continue Track
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-[#94A3B8]">
                          Progress: {completedLessons.length} of {course.lesson_count || 6} lessons
                        </span>
                        <span className="font-semibold text-[#22C55E]">{progressPct}%</span>
                      </div>
                      <Progress value={progressPct} indicatorColor="bg-[#22C55E]" />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Recommended Assessments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle>Skill Benchmark Assessments</CardTitle>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Prove production competency with AI-evaluated benchmarks
                </p>
              </div>
              <Link href="/student/assessments">
                <Button variant="ghost" size="sm" className="text-xs text-[#8B5CF6]">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {INITIAL_ASSESSMENTS.map((assessment) => (
                <div
                  key={assessment.id}
                  className="p-4 rounded-xl bg-[#101018] border border-[#232336] flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#F5F3FF]">
                        {assessment.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-[#94A3B8] mt-0.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {assessment.time_limit_minutes} mins
                        </span>
                        <span>·</span>
                        <span>{assessment.total_questions} Questions</span>
                        <span>·</span>
                        <span className="text-[#22C55E]">Passing: {assessment.passing_score}%</span>
                      </div>
                    </div>
                  </div>

                  <Link href={`/student/assessments/${assessment.id}`}>
                    <Button size="sm" variant="secondary" className="text-xs shrink-0">
                      Take Quiz
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right 1 Col: AI Career Telemetry & Opportunities */}
        <div className="space-y-6">
          {/* AI Skill Gap Callout */}
          <Card className="p-6 bg-gradient-to-b from-[#1C1C2B] to-[#151520] border-[#8B5CF6]/30 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="default">
                <Sparkles className="w-3 h-3" />
                AI Skill Gap Analysis
              </Badge>
              <span className="text-xs text-[#22C55E] font-bold">88% Match</span>
            </div>
            <h4 className="text-sm font-semibold text-[#F5F3FF]">
              Target: Cloud Infrastructure SRE
            </h4>
            <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
              You are only 1 benchmark away from the 95th percentile candidate tier. Complete the Prometheus Telemetry module to close the remaining gap.
            </p>

            <div className="mt-4 pt-4 border-t border-[#232336] space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#94A3B8]">Go Concurrency</span>
                <span className="text-[#22C55E] font-semibold">100% Matched</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#94A3B8]">Kubernetes Cluster</span>
                <span className="text-[#22C55E] font-semibold">92% Matched</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#94A3B8]">Prometheus Alertmanager</span>
                <span className="text-[#F59E0B] font-semibold">Bridging (70%)</span>
              </div>
            </div>

            <Link href="/student/roadmap" className="block mt-5">
              <Button size="sm" variant="gradient" className="w-full text-xs">
                View Learning Roadmap
              </Button>
            </Link>
          </Card>

          {/* Matched Job Opportunities */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Top Matched Jobs</CardTitle>
                <Link
                  href="/student/jobs"
                  className="text-xs text-[#8B5CF6] hover:underline"
                >
                  All Jobs
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {INITIAL_JOBS.slice(0, 2).map((job) => (
                <div
                  key={job.id}
                  className="p-3.5 rounded-xl bg-[#101018] border border-[#232336] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#F5F3FF] line-clamp-1">
                      {job.title}
                    </span>
                    <Badge variant="emerald">94% Match</Badge>
                  </div>
                  <p className="text-[11px] text-[#94A3B8]">
                    {job.company?.name} · {job.location}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-semibold text-[#F5F3FF]">
                      ${(job.salary_min || 110000) / 1000}k - ${(job.salary_max || 135000) / 1000}k
                    </span>
                    <Link href={`/student/jobs`}>
                      <span className="text-xs text-[#8B5CF6] hover:underline flex items-center gap-1">
                        Apply <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
