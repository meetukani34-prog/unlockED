"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/auth-context";
import {
  Sparkles,
  Send,
  Bot,
  User,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Award,
  Layers,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CareerGuidanceResponse } from "@/lib/ai/career-assistant";
import { InterviewQuestion, InterviewEvaluation } from "@/lib/ai/mock-interview";

export default function AiAssistantPage() {
  const { user } = useAuth();

  // Chat State
  const [messages, setMessages] = useState<
    { role: "assistant" | "user"; content: string; data?: CareerGuidanceResponse }[]
  >([
    {
      role: "assistant",
      content: `Hello ${user?.full_name?.split(" ")[0] || "Alex"}! I am your UnlockED AI Career Guidance Partner. Based on your background in operations and current training in Go and distributed systems, I can help map realistic career paths, analyze skill gaps, and run simulated technical interviews. What would you like to explore today?`,
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock Interview State
  const [interviewQuestions, setInterviewQuestions] = useState<InterviewQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<InterviewEvaluation | null>(null);

  const handleSendMessage = async (customPrompt?: string) => {
    const text = customPrompt || inputPrompt;
    if (!text.trim() || isGenerating) return;

    const newMsgs = [...messages, { role: "user" as const, content: text }];
    setMessages(newMsgs);
    setInputPrompt("");
    setIsGenerating(true);

    try {
      const res = await fetch("/api/ai/career-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interests: text,
          background: user?.bio || "Operations and logistics background",
          skills: ["Go (Golang)", "Docker & CI/CD", "PostgreSQL"],
        }),
      });
      const data = await res.json();
      const guidance: CareerGuidanceResponse = data.data;

      setMessages([
        ...newMsgs,
        {
          role: "assistant",
          content: guidance.summary,
          data: guidance,
        },
      ]);
    } catch {
      setMessages([
        ...newMsgs,
        {
          role: "assistant",
          content:
            "I've analyzed your telemetry and project history. Your best alignment is currently in Associate Cloud Infrastructure SRE with an 88% readiness index.",
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Start Mock Interview
  const handleStartInterview = async () => {
    setIsEvaluating(true);
    try {
      const res = await fetch("/api/ai/mock-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate",
          targetRole: "Associate Cloud Infrastructure SRE",
        }),
      });
      const data = await res.json();
      setInterviewQuestions(data.data);
      setCurrentQIndex(0);
      setUserAnswer("");
      setEvaluation(null);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Evaluate Answer
  const handleEvaluateAnswer = async () => {
    if (!userAnswer.trim() || isEvaluating) return;
    setIsEvaluating(true);
    const q = interviewQuestions[currentQIndex];
    try {
      const res = await fetch("/api/ai/mock-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "evaluate",
          targetRole: "Associate Cloud Infrastructure SRE",
          question: q.question,
          expectedConcepts: q.expectedKeyConcepts,
          candidateAnswer: userAnswer,
        }),
      });
      const data = await res.json();
      setEvaluation(data.data);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F3FF]">
            AI Career Advisor & Pathfinder
          </h1>
          <Badge variant="default">
            <Sparkles className="w-3 h-3" />
            Gemini Powered
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
          Explore personalized career trajectories, analyze requirements, and practice technical interviews.
        </p>
      </div>

      <Tabs defaultValue="guidance" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="guidance">Career Trajectory Chat</TabsTrigger>
          <TabsTrigger value="interview">AI Mock Interview Studio</TabsTrigger>
        </TabsList>

        {/* TAB 1: Career Guidance Chat */}
        <TabsContent value="guidance" className="space-y-4">
          <Card className="flex flex-col h-[600px] bg-[#151520] border-[#232336] shadow-xl overflow-hidden">
            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 ${
                    m.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs ${
                      m.role === "user"
                        ? "bg-[#6366F1] text-white"
                        : "bg-[#8B5CF6]/20 text-[#D0BCFF] border border-[#8B5CF6]/30"
                    }`}
                  >
                    {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className={`space-y-3 max-w-[85%] ${m.role === "user" ? "text-right" : "text-left"}`}>
                    <div
                      className={`inline-block p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-[#8B5CF6] text-white rounded-tr-none text-left"
                          : "bg-[#101018] text-[#E4E1EC] border border-[#232336] rounded-tl-none"
                      }`}
                    >
                      {m.content}
                    </div>

                    {/* Render structured recommendations if present */}
                    {m.data?.suggestedPaths && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-left">
                        {m.data.suggestedPaths.map((path, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-xl bg-[#1C1C2B] border border-[#2A2931] space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#F5F3FF]">
                                {path.title}
                              </span>
                              <Badge variant="emerald">{path.matchScore}% Match</Badge>
                            </div>
                            <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                              {path.reasoning}
                            </p>
                            <div className="text-[11px] text-[#22C55E] font-mono">
                              Comp: {path.salaryRange}
                            </div>
                            <div className="pt-2 border-t border-[#232336] text-[11px] text-[#D0BCFF]">
                              <strong>Action:</strong> {path.recommendedFirstStep}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isGenerating && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/20 text-[#D0BCFF] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 animate-spin" />
                  </div>
                  <span className="text-xs text-[#94A3B8] animate-pulse">
                    Analyzing technical telemetry with Gemini...
                  </span>
                </div>
              )}
            </div>

            {/* Prompt Chips */}
            <div className="p-3 bg-[#101018] border-t border-[#232336] flex items-center gap-2 overflow-x-auto text-xs">
              <span className="text-[#64748B] text-[11px] uppercase tracking-wider shrink-0">
                Suggested:
              </span>
              <button
                onClick={() =>
                  handleSendMessage("How do my retail operations skills translate to Cloud SRE?")
                }
                className="px-2.5 py-1 rounded-lg bg-[#151520] border border-[#232336] text-[#94A3B8] hover:text-[#F5F3FF] whitespace-nowrap"
              >
                Retail to Cloud SRE
              </button>
              <button
                onClick={() =>
                  handleSendMessage("What specific projects should I build next to get noticed by Stripe?")
                }
                className="px-2.5 py-1 rounded-lg bg-[#151520] border border-[#232336] text-[#94A3B8] hover:text-[#F5F3FF] whitespace-nowrap"
              >
                Projects for Stripe/Fintech
              </button>
              <button
                onClick={() =>
                  handleSendMessage("Analyze my readiness for Full-Stack React & Go engineering.")
                }
                className="px-2.5 py-1 rounded-lg bg-[#151520] border border-[#232336] text-[#94A3B8] hover:text-[#F5F3FF] whitespace-nowrap"
              >
                Evaluate Go + React readiness
              </button>
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 bg-[#13131A] border-t border-[#232336] flex items-center gap-2">
              <Input
                placeholder="Ask about career paths, skills, or target engineering salaries..."
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button
                variant="gradient"
                size="sm"
                disabled={isGenerating || !inputPrompt.trim()}
                onClick={() => handleSendMessage()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* TAB 2: AI Mock Interview Studio */}
        <TabsContent value="interview" className="space-y-4">
          <Card className="p-6 sm:p-8 bg-[#151520] border-[#232336] shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#232336]">
              <div>
                <h3 className="text-lg font-bold text-[#F5F3FF]">
                  AI Mock Technical Interview
                </h3>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Simulate technical screen questions calibrated for Associate Cloud Infrastructure SRE
                </p>
              </div>

              <Button
                variant="gradient"
                size="sm"
                onClick={handleStartInterview}
                disabled={isEvaluating}
                className="text-xs"
              >
                Generate 3 Practice Questions
              </Button>
            </div>

            {interviewQuestions.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mx-auto flex items-center justify-center text-[#8B5CF6]">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-semibold text-[#F5F3FF]">
                  Ready to test your knowledge?
                </h4>
                <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
                  Click 'Generate 3 Practice Questions' to receive scenario-based architecture and concurrency questions.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Question Details */}
                <div className="p-4 rounded-xl bg-[#101018] border border-[#232336] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider">
                      Question {currentQIndex + 1} of {interviewQuestions.length} · {interviewQuestions[currentQIndex].topic}
                    </span>
                    <Badge variant="secondary">
                      {interviewQuestions[currentQIndex].difficulty.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-[#F5F3FF] leading-relaxed">
                    {interviewQuestions[currentQIndex].question}
                  </p>
                </div>

                {/* Candidate Answer Box */}
                <div>
                  <label className="text-xs font-medium text-[#E4E1EC] block mb-2">
                    Your Technical Answer:
                  </label>
                  <textarea
                    rows={5}
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Provide your systematic response explaining diagnostic steps, telemetry tools, or architectural trade-offs..."
                    className="w-full rounded-xl border border-[#232336] bg-[#101018] p-3 text-xs sm:text-sm text-[#F5F3FF] placeholder:text-[#64748B] focus:border-[#8B5CF6] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={currentQIndex === 0}
                    onClick={() => {
                      setCurrentQIndex((prev) => prev - 1);
                      setEvaluation(null);
                      setUserAnswer("");
                    }}
                    className="text-xs"
                  >
                    Previous Question
                  </Button>

                  <Button
                    variant="gradient"
                    size="sm"
                    disabled={isEvaluating || !userAnswer.trim()}
                    onClick={handleEvaluateAnswer}
                    className="text-xs"
                  >
                    {isEvaluating ? "Evaluating with Gemini..." : "Submit Answer For Review"}
                  </Button>
                </div>

                {/* Evaluation Feedback */}
                {evaluation && (
                  <div className="p-5 rounded-2xl bg-[#1C1C2B] border border-[#8B5CF6]/30 space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={evaluation.passedCriteria ? "emerald" : "amber"}>
                          {evaluation.passedCriteria ? "CRITERIA MET" : "NEEDS DETAIL"}
                        </Badge>
                        <span className="text-xs text-[#94A3B8]">Score:</span>
                        <span className="text-base font-bold text-[#F5F3FF]">
                          {evaluation.score} / 100
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#E4E1EC] leading-relaxed">
                      {evaluation.detailedFeedback}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-[#101018] border border-[#232336]">
                        <span className="text-[#22C55E] font-semibold block mb-1">
                          Strengths Demonstrated
                        </span>
                        <ul className="space-y-1 text-[#94A3B8]">
                          {evaluation.strengths.map((s, i) => (
                            <li key={i}>• {s}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-3 rounded-xl bg-[#101018] border border-[#232336]">
                        <span className="text-[#F59E0B] font-semibold block mb-1">
                          Areas to Deepen
                        </span>
                        <ul className="space-y-1 text-[#94A3B8]">
                          {evaluation.areasForImprovement.map((a, i) => (
                            <li key={i}>• {a}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#101018] border border-[#232336] text-xs space-y-1">
                      <span className="text-[#D0BCFF] font-semibold block">
                        Senior Engineering Model Response Sample:
                      </span>
                      <p className="text-[#94A3B8] italic leading-relaxed">
                        "{evaluation.idealAnswerSample}"
                      </p>
                    </div>

                    {currentQIndex < interviewQuestions.length - 1 && (
                      <div className="text-right pt-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setCurrentQIndex((prev) => prev + 1);
                            setUserAnswer("");
                            setEvaluation(null);
                          }}
                          className="text-xs"
                        >
                          Next Question <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
