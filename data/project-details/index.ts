import type { ProjectDetail } from "@/data/project-detail-types";
import { llmEducationContentPipelineDetail } from "@/data/project-details/llm-education-content-pipeline";

export const projectDetailsBySlug: Record<string, ProjectDetail> = {
  "llm-education-content-pipeline": llmEducationContentPipelineDetail,
};
