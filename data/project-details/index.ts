import type { ProjectDetail } from "@/data/project-detail-types";
import { automatedMp3SplittingListeningAssessmentsDetail } from "@/data/project-details/automated-mp3-splitting-listening-assessments";
import { llmEducationContentPipelineDetail } from "@/data/project-details/llm-education-content-pipeline";

export const projectDetailsBySlug: Record<string, ProjectDetail> = {
  "automated-mp3-splitting-listening-assessments": automatedMp3SplittingListeningAssessmentsDetail,
  "llm-education-content-pipeline": llmEducationContentPipelineDetail,
};
