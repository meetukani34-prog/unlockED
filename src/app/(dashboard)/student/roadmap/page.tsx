"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/auth-context";
import {
  MapPin,
  Sparkles,
  CheckCircle2,
  Clock,
  Award,
  Terminal,
  ArrowRight,
  RefreshCw,
  Layers,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PersonalizedRoadmap } from "@/lib/ai/roadmap";

export default function CareerRoadmapPage() {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<PersonalizedRoadmap>({
    targetRole: "Associate Cloud Infrastructure SRE",
    estimatedWeeksTotal: 16,
    phases: [
      {
        id: "p1",
        title: "Phase 1: High-Concurrency Backend Architecture",
        description:
          "Establish deep command over Go syntax, goroutines, worker pools, memory profiling, and ACID PostgreSQL relational modeling.",
        duration_weeks: 4,
        skills: ["Go (Golang)", "HTTP/REST", "PostgreSQL", "Connection Pooling"],
        projects: ["High-Throughput Task Dispatcher CLI"],
        milestones: ["Pass Go Benchmark with 85%+ score"],
        status: "in_progress",
        order: 1,
      },
      {
        id: "p2",
        title: "Phase 2: Containerization & Cluster Orchestration",
        description:
          "Package services into minimal Alpine Docker containers and orchestrate multi-node deployments with Kubernetes.",
        duration_weeks: 4,
        skills: ["Docker", "Kubernetes", "Helm", "Ingress Controllers"],
        projects: ["Clustered Payment Gateway Mock Deployment"],
        milestones: ["Deploy 3-replica cluster with automated health checks"],
        status: "not_started",
        order: 2,
      },
      {
        id: "p3",
        title: "Phase 3: Observability & Automated Mitigation",
        description:
          "Implement distributed tracing, Prometheus counter/gauge metrics, and automated rollback daemons.",
        duration_weeks: 4,
        skills: ["Prometheus", "Grafana", "Alertmanager", "Chaos Testing"],
        projects: ["PulseGuard: Autonomous Rollback Daemon"],
        milestones: ["Simulate latency spike and verify automated zero-downtime rollback"],
        status: "not_started",
        order: 3,
      },
      {
        id: "p4",
        title: "Phase 4: Hiring Partner Telemetry & Capstone",
        description:
          "Polish code repository, pass AI architectural evaluation, and publish verified candidate attestation to recruiter hub.",
        duration_weeks: 4,
        skills: ["System Design", "CI/CD Automations", "Technical Communication"],
        projects: ["Production Portfolio Publication"],
        milestones: ["Attain 90+ Career Readiness Index and apply to hiring partners"],
        status: "not_started",
        order: 4,
      },
    ],
    milestoneBadges: [
      "Go Concurrency Certified",
      "Kubernetes Cluster Operator",
      "Prometheus Telemetry Attestation",
      "UnlockED Verified SRE Readiness",
    ],
  });

  const handleRegenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/ai/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole: roadmap.targetRole,
          currentLevel: "Intermediate",
          timeCommitmentHoursPerWeek: 15,
        }),
      });
      const data = await res.json();
      setRoadmap(data.data);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#232336]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F3FF]">
              Personalized Career Roadmap
            </h1>
            <Badge variant="default">
              <Sparkles className="w-3 h-3" />
              AI Calibrated
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Targeting: <strong className="text-[#F5F3FF]">{roadmap.targetRole}</strong> · Total Timeline: {roadmap.estimatedWeeksTotal} Weeks
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          disabled={isGenerating}
          onClick={handleRegenerate}
          className="gap-2 text-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
          {isGenerating ? "Regenerating..." : "Recalibrate with Gemini"}
        </Button>
      </div>

      {/* Badges Strip */}
      <Card className="p-5 bg-[#151520] border-[#232336] flex flex-wrap items-center gap-4">
        <span className="text-xs font-semibold text-[#94A3B8]">Target Attestation Badges:</span>
        <div className="flex flex-wrap gap-2">
          {roadmap.milestoneBadges.map((badge, idx) => (
            <Badge key={idx} variant={idx === 0 ? "emerald" : "outline"} dot={idx === 0}>
              <Award className="w-3 h-3" />
              {badge}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Step by Step Phases */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-[#232336] before:z-0">
        {roadmap.phases.map((phase, idx) => {
          const isInProgress = phase.status === "in_progress";
          const isDone = phase.status === "completed";

          return (
            <div key={phase.id} className="relative z-10 flex items-start gap-4">
              {/* Node Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border text-xs font-bold ${
                  isDone
                    ? "bg-[#22C55E] border-[#22C55E] text-slate-950"
                    : isInProgress
                    ? "bg-[#8B5CF6] border-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/30 ring-4 ring-[#8B5CF6]/20"
                    : "bg-[#151520] border-[#232336] text-[#94A3B8]"
                }`}
              >
                {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
              </div>

              {/* Phase Card */}
              <Card
                className={`flex-1 p-6 ${
                  isInProgress
                    ? "bg-[#1C1C2B] border-[#8B5CF6]/50 shadow-xl"
                    : "bg-[#151520] border-[#232336]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#F5F3FF]">
                      {phase.title}
                    </h3>
                    <Badge
                      variant={
                        isDone ? "emerald" : isInProgress ? "default" : "secondary"
                      }
                    >
                      {isDone ? "Completed" : isInProgress ? "In Progress" : "Upcoming"}
                    </Badge>
                  </div>
                  <span className="text-xs font-mono text-[#94A3B8] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {phase.duration_weeks} Weeks
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {phase.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 pt-4 border-t border-[#232336] text-xs">
                  {/* Skills */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] block mb-1.5">
                      Skills Mastered
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {phase.skills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded bg-[#101018] text-[#D0BCFF] font-mono text-[11px] border border-[#232336]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Projects */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] block mb-1.5">
                      Proof Project
                    </span>
                    <ul className="space-y-1 text-[#E4E1EC]">
                      {phase.projects.map((p, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-[#22C55E]" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Milestones */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] block mb-1.5">
                      Verification Gate
                    </span>
                    <ul className="space-y-1 text-[#E4E1EC]">
                      {phase.milestones.map((m, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-[#8B5CF6]" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
