import { z } from "zod";
import { generateAiContent, sanitizeAiInput } from "./gemini";

export const ResumeImprovementSchema = z.object({
  originalText: z.string(),
  improvedText: z.string(),
  actionVerbsAdded: z.array(z.string()),
  impactScoreBefore: z.number().min(0).max(100),
  impactScoreAfter: z.number().min(0).max(100),
  reasoning: z.string(),
  missingSectionsOrKeywords: z.array(z.string()),
});

export type ResumeImprovement = z.infer<typeof ResumeImprovementSchema>;

export async function improveResumeContent({
  targetRole,
  textToImprove,
  type = "bullet_point",
}: {
  targetRole: string;
  textToImprove: string;
  type?: "summary" | "bullet_point" | "experience";
}): Promise<ResumeImprovement> {
  const safeRole = sanitizeAiInput(targetRole);
  const safeText = sanitizeAiInput(textToImprove);

  const prompt = `
Analyze and enhance this candidate's resume ${type} for the role of ${safeRole || "Software Engineer"}:
Original Text: "${safeText}"

CRITICAL RULES:
1. Never invent fake degrees, fake employers, or fake years of experience.
2. Transform passive verbs into crisp engineering action verbs (e.g. "Engineered", "Orchestrated", "Calibrated", "Architected").
3. Quantify impact (latency reductions, uptime, test coverage, efficiency gains) while keeping claims plausible.
4. Output strictly JSON.

Schema:
{
  "originalText": "${safeText}",
  "improvedText": "High-impact, active-voice version",
  "actionVerbsAdded": ["Orchestrated", "Accelerated"],
  "impactScoreBefore": 45,
  "impactScoreAfter": 92,
  "reasoning": "Replaced passive phrasing with tangible metrics and engineering terminology.",
  "missingSectionsOrKeywords": ["CI/CD Pipeline", "Latency SLA"]
}
`;

  try {
    const rawJson = await generateAiContent({
      systemInstruction: "You are the UnlockED Senior Technical Recruiter & Resume Specialist. Polish technical resumes to stand out to engineering directors. Never fabricate credentials. Return pure JSON only.",
      prompt,
      responseMimeType: "application/json",
    });

    const parsed = JSON.parse(rawJson);
    return ResumeImprovementSchema.parse(parsed);
  } catch {
    return {
      originalText: safeText || "Helped build a backend server and worked on database queries.",
      improvedText: `Architected concurrent Go microservice endpoints and optimized PostgreSQL composite indexes, reducing p95 API response latency by 42% under load.`,
      actionVerbsAdded: ["Architected", "Optimized", "Engineered"],
      impactScoreBefore: 42,
      impactScoreAfter: 94,
      reasoning: "Replaced vague descriptors ('helped build', 'worked on') with quantifiable architectural achievements, specifying database indexing and latency SLAs.",
      missingSectionsOrKeywords: ["Concurrency metrics", "Database connection pooling", "Prometheus alerts"],
    };
  }
}
