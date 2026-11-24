"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Briefcase, ArrowLeft, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { INITIAL_JOBS } from "@/lib/data/mock-data";

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);

  const toggleStatus = (id: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, is_active: !j.is_active } : j))
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-20">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-[#F5F3FF] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Console
      </Link>

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F3FF]">
          Job Moderation & Compliance
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
          Review employer requisitions, verify non-discriminatory criteria, and moderate active status.
        </p>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className="p-5 bg-[#151520] border-[#232336] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={job.is_active ? "emerald" : "secondary"}>
                  {job.is_active ? "Active & Approved" : "Suspended"}
                </Badge>
                <span className="text-xs text-[#94A3B8]">{job.company?.name}</span>
              </div>
              <h3 className="text-base font-bold text-[#F5F3FF]">{job.title}</h3>
              <p className="text-xs text-[#94A3B8] mt-1">
                {job.location} · Compensation: ${(job.salary_min || 100000)/1000}k - ${(job.salary_max || 135000)/1000}k · {job.application_count} Applicants
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant={job.is_active ? "secondary" : "gradient"}
                size="sm"
                onClick={() => toggleStatus(job.id)}
                className="text-xs"
              >
                {job.is_active ? "Suspend Listing" : "Approve Listing"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
