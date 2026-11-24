"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  Briefcase,
  TrendingUp,
  Award,
  Plus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Search,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { INITIAL_JOBS, INITIAL_STUDENT_PROFILE } from "@/lib/data/mock-data";

export default function RecruiterDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232336]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F3FF]">
              Recruiter Talent Hub
            </h1>
            <Badge variant="indigo" dot>
              Verified Hiring Partner
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            FinScale Technologies · High-Throughput Payment Rails & Cloud Infrastructure
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/recruiter/jobs/new">
            <Button variant="gradient" size="sm" className="gap-2 text-xs">
              <Plus className="w-3.5 h-3.5" />
              Post New Opportunity
            </Button>
          </Link>
          <Link href="/recruiter/candidates">
            <Button variant="secondary" size="sm" className="gap-2 text-xs">
              <Search className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Candidate Search
            </Button>
          </Link>
        </div>
      </div>

      {/* Recruiter Metrics Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
              Active Postings
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-[#F5F3FF]">3</span>
              <span className="text-xs text-[#22C55E]">live</span>
            </div>
            <span className="text-[11px] text-[#94A3B8]">67 applications received</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center text-[#6366F1]">
            <Briefcase className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
              Shortlisted
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-[#22C55E]">12</span>
              <span className="text-xs text-[#94A3B8]">candidates</span>
            </div>
            <span className="text-[11px] text-[#22C55E]">Ready for technical screen</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center text-[#22C55E]">
            <Users className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
              Avg Readiness Score
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-[#8B5CF6]">89</span>
              <span className="text-xs text-[#94A3B8]">/ 100</span>
            </div>
            <span className="text-[11px] text-[#8B5CF6]">Top 10% talent pool</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6]">
            <Award className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
              Offers Extended
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-[#D0BCFF]">4</span>
              <span className="text-xs text-[#94A3B8]">accepted</span>
            </div>
            <span className="text-[11px] text-[#22C55E]">Zero attrition rate</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#D0BCFF]/10 border border-[#D0BCFF]/20 flex items-center justify-center text-[#D0BCFF]">
            <TrendingUp className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* 2-Column: Active Roles & Incoming Candidate Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Job Postings */}
        <Card className="p-6 bg-[#151520] border-[#232336] space-y-4">
          <div className="flex items-center justify-between border-b border-[#232336] pb-3">
            <CardTitle>Your Active Requisitions</CardTitle>
            <Link href="/recruiter/jobs/new">
              <Button size="sm" variant="ghost" className="text-xs text-[#8B5CF6]">
                + New Requisition
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {INITIAL_JOBS.map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-xl bg-[#101018] border border-[#232336] flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="text-sm font-bold text-[#F5F3FF]">{job.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-[#94A3B8] mt-1">
                    <span>{job.job_type}</span>
                    <span>·</span>
                    <span>{job.location}</span>
                    <span>·</span>
                    <span className="text-[#22C55E]">
                      ${(job.salary_min || 100000) / 1000}k - ${(job.salary_max || 135000) / 1000}k
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="emerald">{job.application_count} Applicants</Badge>
                  <Link href="/recruiter/applications">
                    <Button size="sm" variant="secondary" className="text-xs">
                      Review
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Pre-Screened Candidates */}
        <Card className="p-6 bg-[#151520] border-[#232336] space-y-4">
          <div className="flex items-center justify-between border-b border-[#232336] pb-3">
            <CardTitle>Top Pre-Screened Talent</CardTitle>
            <Link href="/recruiter/candidates">
              <Button size="sm" variant="ghost" className="text-xs text-[#8B5CF6]">
                Search All
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {/* Candidate Card */}
            <div className="p-4 rounded-xl bg-[#101018] border border-[#232336] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={INITIAL_STUDENT_PROFILE.avatar_url!}
                    alt="Alex Chen"
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#F5F3FF]">Alex Chen</h4>
                    <p className="text-[11px] text-[#94A3B8]">Chicago, IL (Open to Remote)</p>
                  </div>
                </div>
                <Badge variant="emerald">88 Match Index</Badge>
              </div>

              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Completed 16-Week Distributed Systems. Verified projects: PulseGuard (Kubernetes Telemetry Daemon in Go).
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#232336] text-xs">
                <span className="text-[#22C55E] font-mono text-[11px]">
                  Attestation Hash #7F84-AI
                </span>
                <Link href="/portfolio/alexchen" target="_blank">
                  <Button size="sm" variant="gradient" className="text-xs gap-1">
                    Inspect Portfolio <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
