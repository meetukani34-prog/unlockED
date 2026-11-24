"use client";

import React from "react";
import { useAuth } from "@/context/auth-context";
import { Award, ShieldCheck, Printer, Download, Sparkles, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { INITIAL_COURSES } from "@/lib/data/mock-data";

export default function CertificatesPage() {
  const { user } = useAuth();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#232336]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F3FF]">
              Verified Platform Attestations
            </h1>
            <Badge variant="emerald" dot>
              Tamper-Proof
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Official cryptographic credentials awarded upon benchmark validation and code verification.
          </p>
        </div>

        <Button variant="secondary" size="sm" onClick={handlePrint} className="gap-2 text-xs">
          <Printer className="w-4 h-4" />
          Print Verified Certificate
        </Button>
      </div>

      {/* Main Certificate Card (Printable) */}
      <div className="max-w-3xl mx-auto">
        <Card
          id="printable-certificate"
          className="p-8 sm:p-12 bg-gradient-to-b from-[#1C1C2B] to-[#151520] border-2 border-[#8B5CF6]/50 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle watermark / glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Border Filigree effect */}
          <div className="border border-[#232336] p-8 sm:p-10 rounded-2xl relative z-10 text-center space-y-6">
            <div className="flex items-center justify-between border-b border-[#232336] pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-sm tracking-tight text-[#F5F3FF]">
                  UnlockED
                </span>
              </div>
              <Badge variant="emerald" dot>
                Attestation Hash #7F84-AI
              </Badge>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#8B5CF6]">
                Certificate of Technical Mastery
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F5F3FF] mt-2 tracking-tight">
                {user?.full_name || "Alex Chen"}
              </h2>
              <p className="text-xs text-[#94A3B8] mt-2 max-w-md mx-auto leading-relaxed">
                has successfully completed all rigorous curricula, hands-on production code sandboxes, and AI-evaluated benchmark assessments for
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#101018] border border-[#232336] max-w-lg mx-auto">
              <h3 className="text-base font-bold text-[#D0BCFF]">
                Full-Stack Cloud Architecture: Go, Next.js & Serverless Systems
              </h3>
              <p className="text-[11px] text-[#22C55E] font-mono mt-1">
                Verified Skills: Go Concurrency · Kubernetes Orchestration · PostgreSQL RLS
              </p>
            </div>

            <div className="pt-8 border-t border-[#232336] flex items-center justify-between text-xs text-[#94A3B8]">
              <div className="text-left">
                <p className="font-bold text-[#F5F3FF]">Evaluation Engine 4.2</p>
                <p className="text-[10px]">Autonomous Code Verification</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#F5F3FF]">Issued: November 2024</p>
                <p className="text-[10px] font-mono text-[#22C55E]">STATUS: ACTIVE & VERIFIED</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
