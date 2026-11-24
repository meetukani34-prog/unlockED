import { NextResponse } from "next/server";
import { analyzeSkillGap } from "@/lib/ai/skill-gap";
import { checkAiRateLimit } from "@/lib/ai/gemini";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "local-client";
    const { allowed } = checkAiRateLimit(ip);
    if (!allowed) {
      return NextResponse.json({ error: "AI rate limit reached." }, { status: 429 });
    }

    const body = await req.json();
    const { candidateSkills, targetRole, jobRequirements } = body;

    const analysis = await analyzeSkillGap({
      candidateSkills: candidateSkills || ["Go (Golang)", "Docker & CI/CD", "PostgreSQL"],
      targetRole: targetRole || "Associate Cloud Infrastructure SRE",
      jobRequirements: jobRequirements || [
        "Go or Python proficiency",
        "Kubernetes multi-node concepts",
        "Prometheus metrics",
      ],
    });

    return NextResponse.json({ data: analysis });
  } catch {
    return NextResponse.json({ error: "Failed to analyze skill gap" }, { status: 500 });
  }
}
