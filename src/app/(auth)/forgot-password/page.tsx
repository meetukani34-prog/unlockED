"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Sparkles, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-[#0B0B12]">
      <Card className="w-full max-w-md p-6 sm:p-8 bg-[#151520] border-[#232336] shadow-2xl">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-[#F5F3FF] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Sign In
        </Link>

        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 text-[#D0BCFF] border border-[#8B5CF6]/30 mx-auto flex items-center justify-center mb-3">
            <Mail className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-[#F5F3FF]">Password Reset</h1>
          <p className="text-xs text-[#94A3B8] mt-1">
            Enter your account email to receive a password recovery link
          </p>
        </div>

        {submitted ? (
          <div className="p-4 rounded-xl bg-[#101018] border border-[#22C55E]/40 text-center space-y-2">
            <CheckCircle2 className="w-6 h-6 text-[#22C55E] mx-auto" />
            <h3 className="text-sm font-semibold text-[#F5F3FF]">Recovery Email Dispatched</h3>
            <p className="text-xs text-[#94A3B8]">
              If an account exists for {email}, a recovery link has been sent. Check your inbox and spam folder.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#E4E1EC] block mb-1">
                Account Email
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
              />
            </div>
            <Button type="submit" variant="gradient" className="w-full text-xs">
              Send Password Reset Link
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
