"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  Mail,
  User,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { INITIAL_STUDENT_PROFILE } from "@/lib/data/mock-data";

export default function RecruiterApplicationsPage() {
  const [applications, setApplications] = useState([
    {
      id: "app-1",
      candidateName: "Alex Chen",
      candidateAvatar: INITIAL_STUDENT_PROFILE.avatar_url,
      jobTitle: "Associate Cloud Infrastructure SRE",
      readinessScore: 88,
      status: "shortlisted",
      appliedAt: "2 days ago",
      note: "Former operations supervisor with verified Go concurrency benchmark and live Kubernetes rollback daemon.",
    },
    {
      id: "app-2",
      candidateName: "Marcus Kim",
      candidateAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      jobTitle: "Associate Cloud Infrastructure SRE",
      readinessScore: 91,
      status: "reviewed",
      appliedAt: "3 days ago",
      note: "Logistics coordinator transitioning into Go systems. Containerized microservices capstone.",
    },
    {
      id: "app-3",
      candidateName: "Camila Ortiz",
      candidateAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      jobTitle: "Full-Stack Software Engineer (React / Go)",
      readinessScore: 96,
      status: "interviewed",
      appliedAt: "5 days ago",
      note: "Top 2% cohort benchmark in distributed caching and React 19 server actions.",
    },
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-20">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F3FF]">
          Application Management Pipeline
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
          Review candidate submissions, inspect verified code attestations, and update pipeline stages.
        </p>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <Card
            key={app.id}
            className="p-6 bg-[#151520] border-[#232336] flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <img
                src={app.candidateAvatar!}
                alt={app.candidateName}
                className="w-12 h-12 rounded-xl object-cover border border-[#232336]"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#F5F3FF]">
                    {app.candidateName}
                  </h3>
                  <Badge variant="emerald">{app.readinessScore}/100 Readiness</Badge>
                </div>
                <p className="text-xs text-[#8B5CF6] font-medium">
                  Applied for: {app.jobTitle}
                </p>
                <p className="text-xs text-[#94A3B8] max-w-xl leading-relaxed mt-1">
                  "{app.note}"
                </p>
                <span className="text-[11px] text-[#64748B] block pt-1">
                  Received {app.appliedAt}
                </span>
              </div>
            </div>

            {/* Pipeline Stage Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#101018] border border-[#232336] text-xs">
                <button
                  onClick={() => updateStatus(app.id, "reviewed")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    app.status === "reviewed"
                      ? "bg-[#6366F1] text-white"
                      : "text-[#94A3B8] hover:text-[#F5F3FF]"
                  }`}
                >
                  Reviewed
                </button>
                <button
                  onClick={() => updateStatus(app.id, "shortlisted")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    app.status === "shortlisted"
                      ? "bg-[#8B5CF6] text-white"
                      : "text-[#94A3B8] hover:text-[#F5F3FF]"
                  }`}
                >
                  Shortlist
                </button>
                <button
                  onClick={() => updateStatus(app.id, "interviewed")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    app.status === "interviewed"
                      ? "bg-[#A078FF] text-white"
                      : "text-[#94A3B8] hover:text-[#F5F3FF]"
                  }`}
                >
                  Interview
                </button>
                <button
                  onClick={() => updateStatus(app.id, "offered")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    app.status === "offered"
                      ? "bg-[#22C55E] text-slate-950 font-bold"
                      : "text-[#94A3B8] hover:text-[#F5F3FF]"
                  }`}
                >
                  Offer
                </button>
              </div>

              <Link href="/portfolio/alexchen" target="_blank">
                <Button size="sm" variant="gradient" className="text-xs gap-1">
                  <ExternalLink className="w-3.5 h-3.5" /> View Proof
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
