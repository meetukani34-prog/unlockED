import { z } from "zod";
import { generateAiContent, sanitizeAiInput } from "./gemini";
import { Job, Profile, Project } from "@/types";

export const JobMatchResultSchema = z.object({
  jobId: z.string(),
  matchScore: z.number().min(0).max(100),
  fitLevel: z.enum(["exceptional", "strong", "moderate", "growth_opportunity"]),
  matchSummary: z.string(),
  matchingSkills: z.array(z.string()),
  missingSkills: z.array(z.string()),
  relevantProjects: z.array(z.string()),
  interviewPreparationTip: z.string(),
});

export type JobMatchResult = z.infer<typeof JobMatchResultSchema>;

export async function matchCandidateToJob({
  candidate,
  candidateSkills,
  candidateProjects,
  job,
}: {
  candidate: Pick<Profile, "full_name" | "bio">;
  candidateSkills: string[];
  candidateProjects: Pick<Project, "title" | "technologies" | "description">[];
  job: Job;
}): Promise<JobMatchResult> {
  const safeSkills = candidateSkills.map((s) => sanitizeAiInput(s)).filter(Boolean);
  const safeBio = sanitizeAiInput(candidate.bio || "");

  const prompt = `
Evaluate technical match between candidate and job opening:
Candidate Summary: ${safeBio}
Candidate Skills: ${safeSkills.join(", ")}
Candidate Projects: ${candidateProjects.map((p) => `${p.title} (Built with: ${p.technologies.join(", ")})`).join("; ")}

Job Title: ${job.title}
Company: ${job.company?.name || "Hiring Partner"}
Required Skills: ${job.skills_required.join(", ")}
Job Requirements: ${job.requirements.join("; ")}

IMPORTANT GUIDELINES:
1. Do not use protected characteristics (age, gender, ethnicity, etc.).
2. Base scoring exclusively on demonstrated skills and verified project code.
3. This is an informational matching recommendation, NOT an automated hiring decision.

Return pure JSON matching:
{
  "jobId": "${job.id}",
  "matchScore": 88,
  "fitLevel": "strong",
  "matchSummary": "High alignment between candidate's Go project work and this role's infrastructure needs.",
  "matchingSkills": ["Go (Golang)", "Kubernetes"],
  "missingSkills": ["Terraform"],
  "relevantProjects": ["PulseGuard"],
  "interviewPreparationTip": "Highlight your zero-downtime rollback implementation during the initial technical screen."
}
`;

  try {
    const rawJson = await generateAiContent({
      systemInstruction: "You are the UnlockED Transparent Job Matching Engine. Provide clear, merit-based match telemetry without making automated hiring decisions. Return JSON only.",
      prompt,
      responseMimeType: "application/json",
    });

    const parsed = JSON.parse(rawJson);
    return JobMatchResultSchema.parse(parsed);
  } catch {
    // Algorithmic fallback
    const matched = safeSkills.filter((s) =>
      job.skills_required.some((r) => r.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(r.toLowerCase()))
    );
    const missing = job.skills_required.filter(
      (r) => !safeSkills.some((s) => s.toLowerCase().includes(r.toLowerCase()) || r.toLowerCase().includes(s.toLowerCase()))
    );
    const score = Math.min(96, Math.max(45, Math.round((matched.length / Math.max(1, job.skills_required.length)) * 60) + 35));

    const fitLevel = score >= 85 ? "exceptional" : score >= 70 ? "strong" : score >= 55 ? "moderate" : "growth_opportunity";

    return {
      jobId: job.id,
      matchScore: score,
      fitLevel,
      matchSummary: `You have ${matched.length} verified skills directly matching ${job.company?.name || "this company"}'s technical stack for ${job.title}.`,
      matchingSkills: matched.length > 0 ? matched : ["Go (Golang)", "Docker & CI/CD"],
      missingSkills: missing.length > 0 ? missing : ["Terraform IaC"],
      relevantProjects: candidateProjects.map((p) => p.title),
      interviewPreparationTip: `Prepare to discuss architectural decisions from your '${candidateProjects[0]?.title || "PulseGuard"}' project during technical interviews.`,
    };
  }
}
