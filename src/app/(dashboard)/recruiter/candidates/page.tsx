"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Award,
  Sparkles,
  ArrowRight,
  BookmarkCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { INITIAL_STUDENT_PROFILE } from "@/lib/data/mock-data";

export default function CandidateSearchPage() {
  const [skillFilter, setSkillFilter] = useState("Go");
  const [shortlisted, setShortlisted] = useState<string[]>([]);

  const candidates = [
    {
      id: "c-1",
      name: "Alex Chen",
      title: "Associate Cloud Infrastructure SRE",
      location: "Chicago, IL (Open to Remote)",
      readinessIndex: 88,
      verifiedHash: "#7F84-AI",
      avatar: INITIAL_STUDENT_PROFILE.avatar_url,
      skills: ["Go (Golang)", "Kubernetes", "PostgreSQL", "Prometheus"],
      featuredProject: "PulseGuard: Autonomous Rollback Daemon (Go + Prometheus)",
      bio: "Transitioned from shift supervision to backend systems. Solved concurrency leaks in high-throughput microservices.",
    },
    {
      id: "c-2",
      name: "Camila Ortiz",
      title: "Backend Distributed Systems Engineer",
      location: "Austin, TX (Remote)",
      readinessIndex: 94,
      verifiedHash: "#82C1-AI",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      skills: ["Go (Golang)", "Docker", "gRPC", "Redis"],
      featuredProject: "Distributed Key-Value Store with Raft Consensus",
      bio: "High-volume data processing and zero-downtime database sharding. Top 2% cohort benchmark.",
    },
    {
      id: "c-3",
      name: "DeShawn Turner",
      title: "Full-Stack Product Engineer",
      location: "Atlanta, GA (Hybrid)",
      readinessIndex: 86,
      verifiedHash: "#44D9-AI",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      skills: ["React 19", "Next.js", "TypeScript", "Tailwind CSS"],
      featuredProject: "Enterprise Design System & Collaborative Canvas",
      bio: "Built accessible design systems with Radix UI and server component streaming.",
    },
  ];

  const toggleShortlist = (id: string) => {
    setShortlisted((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-20">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F3FF]">
            Candidate Search & Discovery
          </h1>
          <Badge variant="emerald" dot>
            Attested Talent Pool
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
          Explore candidates with cryptographically attested projects and verified scores.
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-3.5" />
          <Input
            placeholder="Search by verified skill (Go, Kubernetes, React, Python)..."
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#94A3B8]">Quick Filters:</span>
          {["All", "Go", "Kubernetes", "React", "Python"].map((s) => (
            <button
              key={s}
              onClick={() => setSkillFilter(s === "All" ? "" : s)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                (s === "All" && !skillFilter) || skillFilter.toLowerCase() === s.toLowerCase()
                  ? "bg-[#8B5CF6] text-white border-[#8B5CF6]"
                  : "bg-[#151520] border-[#232336] text-[#94A3B8] hover:text-[#F5F3FF]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Candidates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((cand) => {
          const isShortlisted = shortlisted.includes(cand.id);

          return (
            <Card
              key={cand.id}
              hoverEffect
              className="p-6 flex flex-col justify-between bg-[#151520] border-[#232336]"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={cand.avatar!}
                      alt={cand.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#232336]"
                    />
                    <div>
                      <h3 className="text-base font-bold text-[#F5F3FF]">
                        {cand.name}
                      </h3>
                      <p className="text-[11px] text-[#94A3B8]">{cand.location}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-[#22C55E] block">
                      {cand.readinessIndex}/100
                    </span>
                    <span className="text-[10px] text-[#94A3B8]">Readiness</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#101018] border border-[#232336] text-xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#8B5CF6] block">
                    Verified Capstone Proof
                  </span>
                  <p className="font-medium text-[#F5F3FF] line-clamp-1">
                    {cand.featuredProject}
                  </p>
                </div>

                <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
                  {cand.bio}
                </p>

                <div className="flex flex-wrap gap-1">
                  {cand.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded bg-[#1F1F26] text-[10px] text-[#CBC3D7] font-mono border border-[#2A2931]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#232336] flex items-center justify-between text-xs">
                <button
                  onClick={() => toggleShortlist(cand.id)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    isShortlisted ? "text-[#22C55E] font-bold" : "text-[#94A3B8] hover:text-[#F5F3FF]"
                  }`}
                >
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  {isShortlisted ? "Shortlisted" : "Shortlist"}
                </button>

                <Link href="/portfolio/alexchen" target="_blank">
                  <Button size="sm" variant="gradient" className="text-xs gap-1">
                    Inspect Proof <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
