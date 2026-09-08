import type { ProjectDetail } from "@/data/project-detail-types";
import { automatedMp3SplittingListeningAssessmentsDetail } from "@/data/project-details/automated-mp3-splitting-listening-assessments";
import { llmEducationContentPipelineDetail } from "@/data/project-details/llm-education-content-pipeline";
import { samsungCardAgenticRagAssistantDetail } from "@/data/project-details/samsung-card-agentic-rag-assistant";

export const projectDetailsBySlug: Record<string, ProjectDetail> = {
  "samsung-card-agentic-rag-assistant": samsungCardAgenticRagAssistantDetail,
  "automated-mp3-splitting-listening-assessments": automatedMp3SplittingListeningAssessmentsDetail,
  "llm-education-content-pipeline": llmEducationContentPipelineDetail,
};
