import { NextResponse } from "next/server";
import { generatePersonalizedRoadmap } from "@/lib/ai/roadmap";
import { checkAiRateLimit } from "@/lib/ai/gemini";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "local-client";
    const { allowed } = checkAiRateLimit(ip);
    if (!allowed) {
      return NextResponse.json({ error: "AI rate limit reached." }, { status: 429 });
    }

    const body = await req.json();
    const { targetRole, currentLevel, timeCommitmentHoursPerWeek, focusAreas } = body;

    const roadmap = await generatePersonalizedRoadmap({
      targetRole: targetRole || "Associate Cloud Infrastructure SRE",
      currentLevel: currentLevel || "Intermediate",
      timeCommitmentHoursPerWeek: Number(timeCommitmentHoursPerWeek) || 15,
      focusAreas: Array.isArray(focusAreas) ? focusAreas : ["Go", "Kubernetes", "Observability"],
    });

    return NextResponse.json({ data: roadmap });
  } catch {
    return NextResponse.json({ error: "Failed to generate roadmap" }, { status: 500 });
  }
}
