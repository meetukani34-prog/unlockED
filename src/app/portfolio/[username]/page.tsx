"use client";

import React, { use } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Code2,
  Globe,
  Award,
  Terminal,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Download,
  Mail,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { INITIAL_STUDENT_PROFILE, INITIAL_PROJECTS, INITIAL_SKILLS } from "@/lib/data/mock-data";

export const dynamic = "force-dynamic";

export default function PublicPortfolioPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const profile = INITIAL_STUDENT_PROFILE;

  return (
    <div className="min-h-screen bg-[#0B0B12] text-[#E4E1EC] pb-20">
      {/* Top Attestation Bar */}
      <div className="bg-[#151520] border-b border-[#232336] py-2 px-4 text-center text-xs text-[#94A3B8] flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
        <span>
          Cryptographically Verified Attestation on UnlockED · Record #7F84-AI
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        {/* Candidate Hero Card */}
        <Card className="p-6 sm:p-10 bg-[#151520] border-[#232336] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <img
                src={profile.avatar_url!}
                alt={profile.full_name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#8B5CF6]/40 shadow-lg"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F3FF]">
                    {profile.full_name}
                  </h1>
                  <Badge variant="emerald" dot>
                    Verified SRE Ready
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                  Associate Cloud Infrastructure & Backend Systems Engineer
                </p>
                <div className="flex items-center gap-4 mt-3 text-xs text-[#CBC3D7]">
                  {profile.github_url && (
                    <a
                      href={profile.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#F5F3FF] flex items-center gap-1"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  )}
                  {profile.linkedin_url && (
                    <a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#F5F3FF] flex items-center gap-1"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      LinkedIn
                    </a>
                  )}
                  {profile.website && (
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#F5F3FF] flex items-center gap-1"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
              <div className="p-3 rounded-xl bg-[#101018] border border-[#232336] text-right">
                <span className="text-[10px] uppercase font-bold text-[#94A3B8] block">
                  Readiness Index
                </span>
                <span className="text-2xl font-bold text-[#22C55E]">88 / 100</span>
              </div>
              <a href="mailto:alex.chen@unlocked.edu">
                <Button variant="gradient" size="sm" className="gap-1.5 text-xs">
                  <Mail className="w-3.5 h-3.5" /> Contact Candidate
                </Button>
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#232336] text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            {profile.bio}
          </div>
        </Card>

        {/* Verified Skills */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#F5F3FF]">Verified Core Competencies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: "Go (Golang)", level: "94% Verified", color: "text-[#22C55E]" },
              { name: "Kubernetes Orchestration", level: "92% Verified", color: "text-[#22C55E]" },
              { name: "PostgreSQL & pgvector", level: "88% Verified", color: "text-[#8B5CF6]" },
              { name: "Docker Containerization", level: "90% Verified", color: "text-[#22C55E]" },
              { name: "Prometheus Telemetry", level: "82% Verified", color: "text-[#6366F1]" },
              { name: "Next.js 15 & React 19", level: "86% Verified", color: "text-[#8B5CF6]" },
              { name: "Distributed Concurrency", level: "91% Verified", color: "text-[#22C55E]" },
              { name: "CI/CD GitHub Actions", level: "85% Verified", color: "text-[#6366F1]" },
            ].map((skill, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-[#151520] border border-[#232336] flex flex-col justify-between"
              >
                <span className="text-xs font-semibold text-[#F5F3FF]">{skill.name}</span>
                <span className={`text-[11px] font-mono mt-1 ${skill.color}`}>
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Showcase */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#F5F3FF]">Attested Production Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INITIAL_PROJECTS.map((project) => (
              <Card key={project.id} className="p-6 bg-[#151520] border-[#232336] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="emerald">Codebase Traced & Tested</Badge>
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#F5F3FF] leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-[#101018] text-[11px] text-[#CBC3D7] font-mono border border-[#232336]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#232336] flex items-center gap-4 text-xs">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#D0BCFF] hover:underline"
                    >
                      <Code2 className="w-3.5 h-3.5" /> Repository
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#22C55E] hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
