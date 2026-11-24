"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/auth-context";
import {
  FileText,
  Sparkles,
  Download,
  Printer,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Resume, ResumeData } from "@/types";

export default function ResumeBuilderPage() {
  const { resume, updateResume } = useAuth();
  const [resumeData, setResumeData] = useState<ResumeData>(resume.data);
  const [selectedTemplate, setSelectedTemplate] = useState<"modern-obsidian" | "clean-light" | "executive">(
    "modern-obsidian"
  );
  const [isPolishing, setIsPolishing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<{
    original: string;
    improved: string;
    verbs: string[];
    scoreBefore: number;
    scoreAfter: number;
    reasoning: string;
  } | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // AI Polish
  const handleAiPolish = async (bulletText: string) => {
    setIsPolishing(true);
    try {
      const res = await fetch("/api/ai/resume-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole: "Cloud Infrastructure SRE",
          textToImprove: bulletText,
          type: "bullet_point",
        }),
      });
      const json = await res.json();
      setAiSuggestions({
        original: json.data.originalText,
        improved: json.data.improvedText,
        verbs: json.data.actionVerbsAdded,
        scoreBefore: json.data.impactScoreBefore,
        scoreAfter: json.data.impactScoreAfter,
        reasoning: json.data.reasoning,
      });
    } finally {
      setIsPolishing(false);
    }
  };

  const handleApplyAiSuggestion = () => {
    if (!aiSuggestions) return;
    // Apply to first highlight of first experience
    const newExp = [...resumeData.experience];
    if (newExp[0]) {
      newExp[0].highlights[0] = aiSuggestions.improved;
      setResumeData({ ...resumeData, experience: newExp });
    }
    setAiSuggestions(null);
  };

  const handleSave = () => {
    updateResume({
      ...resume,
      data: resumeData,
      template: selectedTemplate,
      updated_at: new Date().toISOString(),
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#232336]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F3FF]">
              AI Resume Architect
            </h1>
            <Badge variant="default">
              <Sparkles className="w-3 h-3" />
              Gemini Powered
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Build verifiable technical resumes optimized for engineering hiring managers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrint}
            className="gap-1.5 text-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Export PDF
          </Button>
          <Button
            variant="gradient"
            size="sm"
            onClick={handleSave}
            className="gap-1.5 text-xs"
          >
            <Save className="w-3.5 h-3.5" />
            {isSaved ? "Saved!" : "Save Resume"}
          </Button>
        </div>
      </div>

      {/* Template Switcher */}
      <div className="flex items-center gap-2 p-1.5 bg-[#101018] rounded-xl border border-[#232336] max-w-md">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] px-2">
          Template:
        </span>
        <button
          onClick={() => setSelectedTemplate("modern-obsidian")}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            selectedTemplate === "modern-obsidian"
              ? "bg-[#8B5CF6] text-white"
              : "text-[#94A3B8] hover:text-[#F5F3FF]"
          }`}
        >
          Obsidian Dark
        </button>
        <button
          onClick={() => setSelectedTemplate("clean-light")}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            selectedTemplate === "clean-light"
              ? "bg-[#6366F1] text-white"
              : "text-[#94A3B8] hover:text-[#F5F3FF]"
          }`}
        >
          Clean Light
        </button>
        <button
          onClick={() => setSelectedTemplate("executive")}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            selectedTemplate === "executive"
              ? "bg-[#22C55E] text-slate-950 font-bold"
              : "text-[#94A3B8] hover:text-[#F5F3FF]"
          }`}
        >
          Tech Executive
        </button>
      </div>

      {/* AI Suggestion Banner if open */}
      {aiSuggestions && (
        <Card className="p-5 bg-[#1C1C2B] border-[#8B5CF6] shadow-xl space-y-3 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="emerald">
                +{aiSuggestions.scoreAfter - aiSuggestions.scoreBefore}% Impact Score Lift
              </Badge>
              <span className="text-xs font-semibold text-[#F5F3FF]">
                Gemini Action-Verb Enhancement
              </span>
            </div>
            <button
              onClick={() => setAiSuggestions(null)}
              className="text-[#94A3B8] hover:text-[#F5F3FF] text-xs"
            >
              ✕ Dismiss
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-[#101018] border border-[#232336] text-[#94A3B8]">
              <span className="text-[10px] uppercase font-bold text-[#64748B] block mb-1">
                Original Bullet
              </span>
              "{aiSuggestions.original}"
            </div>
            <div className="p-3 rounded-xl bg-[#151520] border border-[#22C55E]/40 text-[#E4E1EC]">
              <span className="text-[10px] uppercase font-bold text-[#22C55E] block mb-1">
                Polished Engineering Achievement
              </span>
              "{aiSuggestions.improved}"
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-[#94A3B8]">
              Added strong action verbs: <strong className="text-[#D0BCFF]">{aiSuggestions.verbs.join(", ")}</strong>
            </span>
            <Button
              size="sm"
              variant="gradient"
              onClick={handleApplyAiSuggestion}
              className="text-xs gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Apply To Resume
            </Button>
          </div>
        </Card>
      )}

      {/* Main Layout: Split Editor and Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Form Editor */}
        <div className="space-y-6">
          {/* Personal Info */}
          <Card className="p-5 bg-[#151520] border-[#232336] space-y-4">
            <h3 className="text-sm font-bold text-[#F5F3FF] border-b border-[#232336] pb-2">
              1. Personal & Contact Information
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-[#94A3B8] block mb-1">Full Name</label>
                <Input
                  value={resumeData.personal.name}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personal: { ...resumeData.personal, name: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label className="text-[11px] text-[#94A3B8] block mb-1">Email</label>
                <Input
                  value={resumeData.personal.email}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personal: { ...resumeData.personal, email: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-[#94A3B8] block mb-1">Location</label>
              <Input
                value={resumeData.personal.location}
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    personal: { ...resumeData.personal, location: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <label className="text-[11px] text-[#94A3B8] block mb-1">Professional Summary</label>
              <Textarea
                rows={3}
                value={resumeData.personal.summary}
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    personal: { ...resumeData.personal, summary: e.target.value },
                  })
                }
              />
            </div>
          </Card>

          {/* Experience */}
          <Card className="p-5 bg-[#151520] border-[#232336] space-y-4">
            <div className="flex items-center justify-between border-b border-[#232336] pb-2">
              <h3 className="text-sm font-bold text-[#F5F3FF]">2. Experience & Roles</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAiPolish(resumeData.experience[0]?.highlights[0] || "")}
                disabled={isPolishing}
                className="text-xs text-[#8B5CF6] gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isPolishing ? "Polishing..." : "AI Enhance Bullets"}
              </Button>
            </div>

            {resumeData.experience.map((exp, idx) => (
              <div key={exp.id} className="p-4 rounded-xl bg-[#101018] border border-[#232336] space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#94A3B8] block mb-1">Role Title</label>
                    <Input
                      value={exp.title}
                      onChange={(e) => {
                        const newExp = [...resumeData.experience];
                        newExp[idx].title = e.target.value;
                        setResumeData({ ...resumeData, experience: newExp });
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#94A3B8] block mb-1">Company</label>
                    <Input
                      value={exp.company}
                      onChange={(e) => {
                        const newExp = [...resumeData.experience];
                        newExp[idx].company = e.target.value;
                        setResumeData({ ...resumeData, experience: newExp });
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#94A3B8] block mb-1">
                    Key Achievement Bullet Point
                  </label>
                  <Textarea
                    rows={2}
                    value={exp.highlights[0] || ""}
                    onChange={(e) => {
                      const newExp = [...resumeData.experience];
                      newExp[idx].highlights[0] = e.target.value;
                      setResumeData({ ...resumeData, experience: newExp });
                    }}
                  />
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Right Column: Live Rendered Resume Preview */}
        <div className="sticky top-20">
          <div
            id="printable-resume"
            className={`p-8 rounded-2xl shadow-2xl transition-all border ${
              selectedTemplate === "modern-obsidian"
                ? "bg-[#13131A] text-[#E4E1EC] border-[#232336]"
                : selectedTemplate === "clean-light"
                ? "bg-[#FFFFFF] text-[#0F172A] border-[#E2E8F0]"
                : "bg-[#0E0E15] text-[#F5F3FF] border-[#363654]"
            }`}
          >
            {/* Header */}
            <div className="border-b pb-4 mb-6 border-current/20">
              <h2 className="text-2xl font-bold tracking-tight">
                {resumeData.personal.name}
              </h2>
              <p className="text-xs opacity-80 mt-1">
                {resumeData.personal.location} · {resumeData.personal.email} · {resumeData.personal.phone}
              </p>
              <div className="flex items-center gap-3 text-xs font-mono mt-2 opacity-90">
                <span>{resumeData.personal.github}</span>
                <span>·</span>
                <span>{resumeData.personal.linkedin}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-6 space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider opacity-60">
                Executive Summary
              </h4>
              <p className="text-xs leading-relaxed opacity-90">
                {resumeData.personal.summary}
              </p>
            </div>

            {/* Experience */}
            <div className="mb-6 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider opacity-60">
                Professional Experience
              </h4>
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline text-xs font-semibold">
                    <span>{exp.title} — {exp.company}</span>
                    <span className="opacity-70 font-mono">{exp.start_date} - Present</span>
                  </div>
                  <ul className="list-disc list-inside text-xs opacity-90 space-y-1">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Technical Projects */}
            <div className="mb-6 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider opacity-60">
                Production Projects & Proof
              </h4>
              {resumeData.projects.map((proj) => (
                <div key={proj.id} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span>{proj.name}</span>
                    <span className="opacity-70 font-mono">Verified Attestation</span>
                  </div>
                  <p className="opacity-90">{proj.description}</p>
                  <p className="opacity-75 font-mono text-[11px]">
                    Technologies: {proj.technologies.join(", ")}
                  </p>
                </div>
              ))}
            </div>

            {/* Education & Certs */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2">
                Education & Verification
              </h4>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="text-xs space-y-0.5">
                  <div className="flex justify-between font-semibold">
                    <span>{edu.degree}</span>
                    <span className="opacity-70 font-mono">{edu.gpa}</span>
                  </div>
                  <p className="opacity-80">{edu.institution} · {edu.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
