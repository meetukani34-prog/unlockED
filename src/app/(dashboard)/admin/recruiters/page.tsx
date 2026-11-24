"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Building2, ArrowLeft, ShieldCheck, CheckCircle2, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { INITIAL_COMPANIES } from "@/lib/data/mock-data";

export default function AdminRecruitersPage() {
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);

  const toggleVerify = (id: string) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, verified: !c.verified } : c))
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
          Hiring Partner & Recruiter Verification
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
          Validate corporate legitimacy, employer compliance, and grant access to candidate pipelines.
        </p>
      </div>

      <div className="space-y-4">
        {companies.map((company) => (
          <Card key={company.id} className="p-5 bg-[#151520] border-[#232336] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={company.logo_url || ""}
                alt={company.name}
                className="w-12 h-12 rounded-xl object-cover border border-[#232336]"
              />
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-base font-bold text-[#F5F3FF]">{company.name}</h3>
                  <Badge variant={company.verified ? "emerald" : "secondary"}>
                    {company.verified ? "Verified Partner" : "Pending Vetting"}
                  </Badge>
                </div>
                <p className="text-xs text-[#94A3B8]">
                  {company.industry} · {company.location} · {company.size}
                </p>
              </div>
            </div>

            <Button
              variant={company.verified ? "secondary" : "gradient"}
              size="sm"
              onClick={() => toggleVerify(company.id)}
              className="text-xs shrink-0"
            >
              {company.verified ? "Revoke Verification" : "Verify Organization"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
