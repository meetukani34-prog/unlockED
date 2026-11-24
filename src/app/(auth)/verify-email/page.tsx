"use client";

import React from "react";
import Link from "next/link";
import { MailCheck, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-[#0B0B12]">
      <Card className="w-full max-w-md p-6 sm:p-8 bg-[#151520] border-[#232336] shadow-2xl text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] mx-auto flex items-center justify-center">
          <MailCheck className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-[#F5F3FF]">Verify Your Email</h1>
        <p className="text-xs text-[#94A3B8] leading-relaxed">
          We have sent an authentication verification link to your registered email address. Click the link in the message to activate your account.
        </p>

        <div className="pt-4 border-t border-[#232336]">
          <Link href="/login">
            <Button variant="gradient" className="w-full text-xs gap-1.5">
              Return to Sign In <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
