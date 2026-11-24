"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Users,
  BookOpen,
  Briefcase,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

export default function AdminConsolePage() {
  const growthData = [
    { month: "Jun", students: 4200, placed: 310 },
    { month: "Jul", students: 6800, placed: 520 },
    { month: "Aug", students: 9500, placed: 740 },
    { month: "Sep", students: 12400, placed: 980 },
    { month: "Oct", students: 15600, placed: 1240 },
    { month: "Nov", students: 18520, placed: 1580 },
  ];

  const passRateData = [
    { track: "Cloud SRE", passRate: 88 },
    { track: "Go Systems", passRate: 92 },
    { track: "AI & Vector", passRate: 81 },
    { track: "DevOps K8s", passRate: 85 },
    { track: "React 19", passRate: 94 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232336]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F3FF]">
              Platform Admin Console
            </h1>
            <Badge variant="emerald" dot>
              Security Level 4: Operational
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Global governance, system telemetry, user role assignment, and curriculum moderation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/users">
            <Button variant="secondary" size="sm" className="gap-1.5 text-xs">
              <Users className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Manage Users
            </Button>
          </Link>
          <Link href="/admin/analytics">
            <Button variant="gradient" size="sm" className="gap-1.5 text-xs">
              <BarChart3 className="w-3.5 h-3.5" />
              Full Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* Admin KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
              Total Users
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-[#F5F3FF]">18,520</span>
            </div>
            <span className="text-[11px] text-[#22C55E]">+18% MoM growth</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6]">
            <Users className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
              Verified Partners
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-[#22C55E]">420</span>
            </div>
            <span className="text-[11px] text-[#22C55E]">14 pending vetting</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center text-[#22C55E]">
            <Briefcase className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
              Benchmarks Taken
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-[#6366F1]">4,892</span>
            </div>
            <span className="text-[11px] text-[#8B5CF6]">88% average score</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center text-[#6366F1]">
            <Award className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
              Total Placements
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-[#D0BCFF]">1,580</span>
            </div>
            <span className="text-[11px] text-[#22C55E]">$118k avg comp</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#D0BCFF]/10 border border-[#D0BCFF]/20 flex items-center justify-center text-[#D0BCFF]">
            <TrendingUp className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Recharts Analytics Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Curve */}
        <Card className="p-6 bg-[#151520] border-[#232336] space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle>Platform Talent Growth & Placements</CardTitle>
            <Badge variant="default">6-Month Trend</Badge>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="studentColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="placedColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#101018",
                    borderColor: "#232336",
                    borderRadius: "0.75rem",
                    color: "#F5F3FF",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#studentColor)"
                  name="Enrolled Learners"
                />
                <Area
                  type="monotone"
                  dataKey="placed"
                  stroke="#22C55E"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#placedColor)"
                  name="Direct Placements"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Benchmark Pass Rates */}
        <Card className="p-6 bg-[#151520] border-[#232336] space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle>Benchmark Pass Rates by Domain</CardTitle>
            <Badge variant="emerald">Evaluation Engine 4.2</Badge>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={passRateData}>
                <XAxis dataKey="track" stroke="#64748B" fontSize={11} />
                <YAxis domain={[50, 100]} stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#101018",
                    borderColor: "#232336",
                    borderRadius: "0.75rem",
                    color: "#F5F3FF",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="passRate" fill="#6366F1" radius={[6, 6, 0, 0]} name="Pass Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Action Table: Pending Moderation */}
      <Card className="p-6 bg-[#151520] border-[#232336] space-y-4">
        <div className="flex items-center justify-between border-b border-[#232336] pb-3">
          <CardTitle>Pending Moderation & Approvals</CardTitle>
          <span className="text-xs text-[#94A3B8]">3 items requiring administrator sign-off</span>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#101018] border border-[#232336] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#6366F1]/15 text-[#6366F1] flex items-center justify-center shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#F5F3FF]">
                  Recruiter Verification: FinScale Technologies
                </h4>
                <p className="text-[11px] text-[#94A3B8]">
                  Tax ID and corporate email domain verified. Requested SRE candidate access.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="gradient" className="text-xs">
                Approve Partner
              </Button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#101018] border border-[#232336] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/15 text-[#8B5CF6] flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#F5F3FF]">
                  Course Publication: Distributed Systems in Go (Module 4)
                </h4>
                <p className="text-[11px] text-[#94A3B8]">
                  Curriculum team submitted new lessons on Raft consensus and deadlock tracing.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="default" className="text-xs">
                Publish Module
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
