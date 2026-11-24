"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Sparkles, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function NewJobPostingPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("San Francisco, CA (Hybrid)");
  const [jobType, setJobType] = useState<string>("full-time");
  const [salaryMin, setSalaryMin] = useState("110000");
  const [salaryMax, setSalaryMax] = useState("140000");
  const [isRemote, setIsRemote] = useState(true);
  const [skillsRequired, setSkillsRequired] = useState("Go (Golang), Kubernetes, Docker, PostgreSQL");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      router.push("/recruiter/jobs");
    }, 600);
  };

  return (
    <div className="max-w-3xl space-y-6 animate-in fade-in duration-300 pb-20">
      <Link
        href="/recruiter"
        className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-[#F5F3FF] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Recruiter Hub
      </Link>

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F3FF]">
          Create Technical Requisition
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
          Post an opportunity directly to pre-assessed UnlockED learners.
        </p>
      </div>

      <Card className="p-6 sm:p-8 bg-[#151520] border-[#232336] shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-semibold text-[#E4E1EC] block mb-1">
              Position Title
            </label>
            <Input
              required
              placeholder="e.g. Associate Distributed Systems Engineer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#E4E1EC] block mb-1">
                Location
              </label>
              <Input
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#E4E1EC] block mb-1">
                Job Type
              </label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full h-[42px] rounded-lg border border-[#232336] bg-[#101018] px-3.5 py-2 text-sm text-[#F5F3FF] focus:border-[#8B5CF6] focus:outline-none"
              >
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#E4E1EC] block mb-1">
                Salary Min ($ USD)
              </label>
              <Input
                type="number"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#E4E1EC] block mb-1">
                Salary Max ($ USD)
              </label>
              <Input
                type="number"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#E4E1EC] block mb-1">
              Required Core Skills (Comma Separated)
            </label>
            <Input
              value={skillsRequired}
              onChange={(e) => setSkillsRequired(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#E4E1EC] block mb-1">
              Detailed Role Description & Architecture Responsibilities
            </label>
            <Textarea
              rows={5}
              required
              placeholder="Outline engineering scope, microservice languages, SLA requirements, and interview expectations..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="pt-4 border-t border-[#232336] flex items-center justify-end gap-3">
            <Link href="/recruiter">
              <Button type="button" variant="secondary" size="sm" className="text-xs">
                Cancel
              </Button>
            </Link>
            <Button type="submit" variant="gradient" size="sm" disabled={isSaving} className="text-xs">
              {isSaving ? "Publishing Requisition..." : "Publish Job to Platform"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
