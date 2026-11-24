"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Users, Award, Briefcase, Sparkles } from "lucide-react";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminAnalyticsPage() {
  const cohortGrowth = [
    { cohort: "Cohort 1", enrolled: 320, graduated: 290, placed: 275 },
    { cohort: "Cohort 2", enrolled: 540, graduated: 490, placed: 460 },
    { cohort: "Cohort 3", enrolled: 890, graduated: 810, placed: 770 },
    { cohort: "Cohort 4", enrolled: 1420, graduated: 1290, placed: 1210 },
  ];

  const domainDistribution = [
    { name: "Cloud SRE & Go", value: 42, color: "#8B5CF6" },
    { name: "AI & Vector", value: 28, color: "#22C55E" },
    { name: "DevOps K8s", value: 18, color: "#6366F1" },
    { name: "React Full-Stack", value: 12, color: "#F59E0B" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-20">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-[#F5F3FF] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Console
      </Link>

      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F3FF]">
            Platform Analytics & Placement Telemetry
          </h1>
          <Badge variant="emerald" dot>
            Real-Time
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
          Deep cohort performance, placement velocity, and benchmark distribution across 18,520 learners.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cohort Graduation & Placement */}
        <Card className="lg:col-span-2 p-6 bg-[#151520] border-[#232336] space-y-4">
          <CardTitle>Cohort Completion & Placement Conversion</CardTitle>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cohortGrowth}>
                <XAxis dataKey="cohort" stroke="#64748B" fontSize={11} />
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
                <Bar dataKey="enrolled" fill="#363654" name="Enrolled" radius={[4, 4, 0, 0]} />
                <Bar dataKey="graduated" fill="#8B5CF6" name="Graduated" radius={[4, 4, 0, 0]} />
                <Bar dataKey="placed" fill="#22C55E" name="Direct Hires" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Domain Distribution Pie */}
        <Card className="p-6 bg-[#151520] border-[#232336] space-y-4 flex flex-col justify-between">
          <CardTitle>Specialization Domain Distribution</CardTitle>
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={domainDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {domainDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1 text-xs">
            {domainDistribution.map((d, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#CBC3D7]">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  {d.name}
                </span>
                <span className="font-mono font-bold text-[#F5F3FF]">{d.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
