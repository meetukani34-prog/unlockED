import { z } from "zod";
import { generateAiContent, sanitizeAiInput } from "./gemini";

export const RoadmapPhaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  duration_weeks: z.number(),
  skills: z.array(z.string()),
  projects: z.array(z.string()),
  milestones: z.array(z.string()),
  status: z.enum(["not_started", "in_progress", "completed"]),
  order: z.number(),
});

export const PersonalizedRoadmapSchema = z.object({
  targetRole: z.string(),
  estimatedWeeksTotal: z.number(),
  phases: z.array(RoadmapPhaseSchema),
  milestoneBadges: z.array(z.string()),
});

export type PersonalizedRoadmap = z.infer<typeof PersonalizedRoadmapSchema>;

export async function generatePersonalizedRoadmap({
  targetRole,
  currentLevel,
  timeCommitmentHoursPerWeek,
  focusAreas,
}: {
  targetRole: string;
  currentLevel: string;
  timeCommitmentHoursPerWeek: number;
  focusAreas: string[];
}): Promise<PersonalizedRoadmap> {
  const safeRole = sanitizeAiInput(targetRole);
  const safeLevel = sanitizeAiInput(currentLevel);

  const prompt = `
Create an intensive, step-by-step career acceleration roadmap:
Target Role: ${safeRole || "Associate Cloud Infrastructure SRE"}
Current Level: ${safeLevel || "Beginner to Intermediate"}
Weekly Availability: ${timeCommitmentHoursPerWeek || 15} hours/week
Focus Areas: ${focusAreas.join(", ") || "Cloud Architecture, Containerization, Microservices"}

Return pure JSON matching:
{
  "targetRole": "${safeRole}",
  "estimatedWeeksTotal": 16,
  "phases": [
    {
      "id": "phase-1",
      "title": "Phase 1: Systems Foundations & Concurrency",
      "description": "Master Go data structures, goroutines, and network I/O.",
      "duration_weeks": 4,
      "skills": ["Go", "Linux Internals"],
      "projects": ["Multi-Threaded Log Parser CLI"],
      "milestones": ["Score 80%+ on Go Benchmark"],
      "status": "in_progress",
      "order": 1
    }
  ],
  "milestoneBadges": ["Go Concurrency Verified", "Kubernetes Operator Badge"]
}
`;

  try {
    const rawJson = await generateAiContent({
      systemInstruction: "You are the UnlockED Curriculum Architect. Build realistic, project-focused technical roadmaps that prioritize undeniable proof over passive reading. Return JSON only.",
      prompt,
      responseMimeType: "application/json",
    });

    const parsed = JSON.parse(rawJson);
    return PersonalizedRoadmapSchema.parse(parsed);
  } catch {
    return {
      targetRole: safeRole || "Associate Cloud Infrastructure SRE",
      estimatedWeeksTotal: 16,
      phases: [
        {
          id: "p1",
          title: "Phase 1: High-Concurrency Backend Architecture",
          description: "Establish deep command over Go syntax, goroutines, worker pools, and memory profiling.",
          duration_weeks: 4,
          skills: ["Go (Golang)", "HTTP/REST", "PostgreSQL", "Connection Pooling"],
          projects: ["High-Throughput Task Dispatcher CLI"],
          milestones: ["Pass Go Benchmark with 85%+ score"],
          status: "in_progress",
          order: 1,
        },
        {
          id: "p2",
          title: "Phase 2: Containerization & Cluster Orchestration",
          description: "Package services into minimal Alpine Docker containers and orchestrate multi-node deployments with Kubernetes.",
          duration_weeks: 4,
          skills: ["Docker", "Kubernetes", "Helm", "Ingress Controllers"],
          projects: ["Clustered Payment Gateway Mock Deployment"],
          milestones: ["Deploy 3-replica cluster with automated health checks"],
          status: "not_started",
          order: 2,
        },
        {
          id: "p3",
          title: "Phase 3: Observability & Automated Mitigation",
          description: "Implement distributed tracing, Prometheus counter/gauge metrics, and automated rollback daemons.",
          duration_weeks: 4,
          skills: ["Prometheus", "Grafana", "Alertmanager", "Chaos Testing"],
          projects: ["PulseGuard: Autonomous Rollback Daemon"],
          milestones: ["Simulate latency spike and verify automated zero-downtime rollback"],
          status: "not_started",
          order: 3,
        },
        {
          id: "p4",
          title: "Phase 4: Hiring Partner Telemetry & Capstone",
          description: "Polish code repository, pass AI architectural evaluation, and publish verified candidate attestation to recruiter hub.",
          duration_weeks: 4,
          skills: ["System Design", "CI/CD Automations", "Technical Communication"],
          projects: ["Production Portfolio Publication"],
          milestones: ["Attain 90+ Career Readiness Index and apply to hiring partners"],
          status: "not_started",
          order: 4,
        },
      ],
      milestoneBadges: [
        "Go Concurrency Certified",
        "Kubernetes Cluster Operator",
        "Prometheus Telemetry Attestation",
        "UnlockED Verified SRE Readiness",
      ],
    };
  }
}
