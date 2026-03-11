import type { ProjectDetail } from "@/data/project-detail-types";

export const automatedMp3SplittingListeningAssessmentsDetail: ProjectDetail = {
  overview: {
    ko: "LLM 기반 접근의 한계를 확인한 뒤 오디오 파형 분석 알고리즘으로 전환해, 교육청 듣기평가 원본 MP3를 문항 단위로 자동 분할하는 시스템을 구축했습니다.",
    en: "After identifying the limits of an LLM-based approach, I shifted to waveform analysis and built a system that automatically splits long listening-assessment MP3 files into per-question clips.",
  },
  summary: {
    ko: "LLM 접근 한계를 확인하고 신호 분석으로 전환\n206개 MP3 파일 무오류 자동 분할\n파일당 약 10~15초 처리",
    en: "Validated the limit of LLM timestamping and switched to signal analysis\nAutomatically split 206 MP3 files with zero errors\nProcessed each file in about 10 to 15 seconds",
  },
  highlightMetrics: [
    {
      value: { ko: "206개", en: "206" },
      label: { ko: "무오류 자동 분할 파일", en: "Files split with zero errors" },
    },
    {
      value: { ko: "10~15초", en: "10-15 sec" },
      label: { ko: "30분 음원 처리 시간", en: "Processing time for a 30-min file" },
    },
    {
      value: { ko: "100%", en: "100%" },
      label: { ko: "외주 비용 절감", en: "Outsourcing cost reduction" },
    },
    {
      value: { ko: "연 200만 원+", en: "KRW 2M+ / year" },
      label: { ko: "절감 비용", en: "Annual savings" },
    },
  ],
  sections: [
    {
      key: "problem",
      title: {
        ko: "문제 정의",
        en: "Problem Statement",
      },
      paragraphs: [
        {
          ko: "서비스에 업로드되는 교육청 듣기평가 음원은 문항별로 분리된 MP3 파일 형태여야 했지만, 실제 원본은 20~30분 길이의 단일 MP3로 제공됐습니다. 운영팀은 문항 시작 지점을 직접 찾아 하나씩 잘라내야 했습니다.",
          en: "Listening-assessment audio had to be delivered to the service as separate MP3 files per question, but the source material arrived as a single 20 to 30 minute MP3. Operators had to find each question boundary and cut it manually.",
        },
        {
          ko: "기존 방식은 작업자가 처음부터 끝까지 음원을 청취하고, 문항 시작 지점을 판단한 뒤, 오디오 편집 프로그램으로 직접 분할하는 구조였습니다. 파일 하나를 처리하는 데 1시간 이상이 걸렸고, 반복 작업이라 생산성이 낮았습니다.",
          en: "The previous workflow required someone to listen through the file, decide where each question started, and split the audio in an editor. Processing a single file often took more than an hour, and the work was highly repetitive.",
        },
        {
          ko: "또한 작업자마다 판단 기준이 달라 문항 시작 시점 품질 편차가 발생할 수 있었고, 이 작업을 외주로 처리하면서 연간 약 200만 원 이상의 비용이 지속적으로 발생했습니다.",
          en: "Different editors could also interpret boundaries differently, which introduced quality variance. Because the task was outsourced, it created a recurring cost of more than KRW 2 million per year.",
        },
      ],
    },
    {
      key: "initial-approach",
      title: {
        ko: "초기 접근 방식",
        en: "Initial Approach",
      },
      paragraphs: [
        {
          ko: "처음에는 LLM과 음성 인식 결과를 활용해 문항 시작 타임스탬프를 추출하려 했습니다. 음성 내용을 텍스트로 이해하면 각 문항이 시작되는 문장을 기준으로 분할 시점을 찾을 수 있다고 판단했습니다.",
          en: "The initial idea was to use LLMs and speech recognition output to extract question start timestamps. The assumption was that once the spoken content was understood as text, each segment boundary could be derived from the opening sentence of a question.",
        },
        {
          ko: "하지만 테스트 결과 LLM은 'Question 1 starts around 00:02:10'처럼 대략적인 시점은 제시할 수 있었어도, 실제 편집에 필요한 초 단위 정확도를 보장하지 못했습니다. 실제 시작이 00:02:07인데 3초가 밀리면 음성 앞부분이 잘리거나 이전 문항 잔여 음성이 섞이는 문제가 생겼습니다.",
          en: "In testing, the model could identify approximate positions such as 'Question 1 starts around 00:02:10', but it could not guarantee the second-level precision required for editing. If the true start was 00:02:07, even a three-second offset would cut the beginning or leak audio from the previous question.",
        },
        {
          ko: "이 실험을 통해 LLM은 음성 내용을 이해하는 데는 유용하지만, 정확한 오디오 편집 타임스탬프 계산 문제의 핵심 해법은 아니라는 점을 확인했습니다.",
          en: "That experiment made the tradeoff clear: LLMs were useful for understanding content, but they were not the right tool for the exact timestamp calculations needed for audio editing.",
        },
      ],
    },
    {
      key: "solution",
      title: {
        ko: "해결 방식",
        en: "Solution",
      },
      paragraphs: [
        {
          ko: "접근 방식을 텍스트 해석 중심에서 오디오 신호 분석 중심으로 전환했습니다. FFmpeg 기반 오디오 처리 파이프라인으로 MP3 파형을 직접 읽고, 문항 사이에 반복적으로 나타나는 무음과 파형 변화를 기준으로 경계를 탐지했습니다.",
          en: "The approach was changed from text interpretation to audio-signal analysis. An FFmpeg-based processing pipeline read the MP3 waveform directly and detected boundaries using recurring silence windows and waveform changes between questions.",
        },
        {
          ko: "분석 과정에서 각 문항이 끝난 뒤 약 3초 이상의 무음 구간과 일정한 패턴 변화가 반복된다는 점을 발견했습니다. 이를 기반으로 문항 경계를 식별하고 다음 문항 시작 타임스탬프를 계산하는 알고리즘을 구현했습니다.",
          en: "During analysis, the team found a repeated pattern: after each question there was usually a silence interval of at least three seconds followed by a consistent waveform transition. That pattern became the basis for a boundary-detection algorithm that calculated the next question start timestamp.",
        },
        {
          ko: "탐지된 타임스탬프는 FFmpeg 분할 파이프라인에 전달되어 문항별 MP3 파일로 자동 출력되도록 구성했습니다. 결과적으로 편집 품질을 사람이 직접 맞추지 않아도 되는 자동화 흐름을 만들었습니다.",
          en: "The detected timestamps were then passed into an FFmpeg splitting pipeline that exported question-level MP3 files automatically. This created an automated workflow that no longer depended on manual editing judgement.",
        },
      ],
    },
    {
      key: "validation",
      title: {
        ko: "문항 검증 시스템",
        en: "Question Validation System",
      },
      paragraphs: [
        {
          ko: "자동 분할 정확도를 높이기 위해 후처리 검증 로직도 함께 구현했습니다. 핵심은 탐지 결과가 실제 시험 구성과 맞는지 빠르게 확인해 잘못된 분할을 걸러내는 것이었습니다.",
          en: "A post-processing validation layer was added to improve splitting accuracy. The goal was to quickly verify whether detected boundaries matched the expected exam structure and filter out incorrect splits before delivery.",
        },
        {
          ko: "검증은 세 단계로 구성했습니다. 첫째, 문항 번호 순서가 정상적으로 증가하는지 확인했습니다. 둘째, 예상 문항 수와 실제 탐지된 문항 수를 비교했습니다. 셋째, 인접 타임스탬프 간 간격이 비정상적으로 짧거나 긴 구간이 있는지 검사했습니다.",
          en: "Validation was implemented in three checks. First, question numbers had to progress in the expected order. Second, the expected question count was compared against the detected count. Third, intervals between adjacent timestamps were checked for abnormal gaps that were too short or too long.",
        },
        {
          ko: "이 검증 로직으로 문항 누락, 순서 어긋남, 비정상 분할을 자동으로 탐지해 운영 적용 전 품질 안정성을 확보했습니다.",
          en: "This validation layer automatically detected missing questions, ordering issues, and abnormal splits, which stabilized quality before files were applied in production.",
        },
      ],
    },
    {
      key: "technical-core",
      title: {
        ko: "기술적 핵심",
        en: "Technical Core",
      },
      paragraphs: [
        {
          ko: "이 프로젝트의 핵심은 '무엇을 이해해야 하는가'보다 '무엇을 정확하게 계산해야 하는가'를 다시 정의한 점이었습니다. 초기에는 자연어 이해 문제처럼 보였지만 실제 요구 사항은 초 단위 오디오 경계 계산이었습니다.",
          en: "The technical inflection point of this project was reframing the problem around what had to be measured precisely, not what had to be semantically understood. At first it looked like a language-understanding problem, but the real requirement was second-level audio-boundary calculation.",
        },
        {
          ko: "그래서 LLM 중심 접근을 보조 수단으로 낮추고, 파형 기반 경계 탐지와 FFmpeg 분할 자동화를 주축으로 설계를 재구성했습니다. 필요한 경우 Whisper와 LangChain은 보조 분석에 활용할 수 있게 유지하되, 실제 분할 성공 여부는 신호 분석 로직이 결정하도록 했습니다.",
          en: "The architecture was therefore rebuilt around waveform-based boundary detection and FFmpeg automation, while any LLM or Whisper usage was treated as supporting analysis rather than the source of truth. Actual split correctness was determined by the signal-analysis logic.",
        },
      ],
    },
    {
      key: "before-after",
      title: {
        ko: "Before / After Workflow",
        en: "Before / After Workflow",
      },
      paragraphs: [
        {
          ko: "기존 수작업 편집 방식은 외부 작업자가 원본 MP3를 처음부터 끝까지 청취하고, 문항 시작 지점을 수동으로 탐색한 뒤, 오디오 편집 프로그램에서 문항별 MP3를 직접 잘라내는 구조였습니다. 파일당 약 1시간이 소요됐고 작업자 숙련도에 따라 결과 품질도 달라졌습니다.",
          en: "The original manual workflow depended on an external operator listening through the MP3, locating each question boundary by hand, and cutting separate files in an audio editor. It took about an hour per file, and output quality varied by editor experience.",
        },
        {
          ko: "자동 분할 파이프라인에서는 콘텐츠팀이 MP3를 업로드하면 Audio Processing Service가 실행되고, 파형 기반 문항 경계 탐지와 FFmpeg 자동 분할을 거쳐 문항별 MP3가 생성됩니다. 같은 파일을 약 10~15초 안에 처리할 수 있게 되면서 운영 흐름이 완전히 달라졌습니다.",
          en: "In the automated workflow, the content team uploads the MP3, the Audio Processing Service runs, waveform-based boundary detection is applied, and FFmpeg exports per-question MP3 files. The same file can now be processed in about 10 to 15 seconds, which fundamentally changed the operating workflow.",
        },
      ],
    },
    {
      key: "performance",
      title: {
        ko: "성능 비교",
        en: "Performance Comparison",
      },
      paragraphs: [
        {
          ko: "처리 방식은 수작업 편집에서 자동 파이프라인으로 전환됐고, 파일 처리 시간은 약 1시간에서 10~15초 수준으로 단축됐습니다. 편집 정확도는 작업자 경험 의존 구조에서 알고리즘 기반 검증 구조로 바뀌었고, 외주 비용도 100% 절감됐습니다.",
          en: "The processing model changed from manual editing to an automated pipeline. Per-file processing time dropped from about one hour to roughly 10 to 15 seconds. Editing accuracy moved from operator-dependent judgement to algorithm-backed validation, and outsourcing cost was reduced by 100%.",
        },
      ],
    },
    {
      key: "impact",
      title: {
        ko: "성과",
        en: "Impact",
      },
      paragraphs: [
        {
          ko: "최종적으로 206개 MP3 파일을 무오류로 자동 분할했고, 30분 길이의 음원도 약 10~15초 내에 처리할 수 있게 됐습니다. 반복 음원 편집 작업은 사실상 자동화됐고, 작업자는 예외 케이스만 확인하면 되도록 운영 방식이 바뀌었습니다.",
          en: "In production, the system automatically split 206 MP3 files with zero errors, and even a 30-minute recording could be processed in roughly 10 to 15 seconds. Repetitive audio editing was effectively automated, leaving operators to review only exception cases.",
        },
        {
          ko: "외주 편집 비용은 100% 절감됐고, 음원 편집은 더 이상 지속적인 병목이나 비용 항목으로 남지 않게 됐습니다. 실제 콘텐츠 제작 파이프라인 운영 환경에 적용되면서 제작 효율과 처리 일관성을 함께 높였습니다.",
          en: "Outsourcing cost for editing was reduced by 100%, and audio editing stopped being a recurring bottleneck and cost center. Once applied to the live content-production pipeline, it improved both throughput and operational consistency.",
        },
        {
          ko: "면접에서는 다음 한 문장으로 설명할 수 있습니다. 콘텐츠팀이 원본 듣기평가 MP3를 업로드하면 Audio Processing Service가 실행되고, 파형 분석을 통해 3초 이상 무음 구간과 반복되는 경계 패턴을 탐지합니다. 이를 기반으로 문항 시작 타임스탬프를 계산한 뒤 FFmpeg로 자동 분할하며, 전체 과정은 약 10~15초 내에 완료됩니다.",
          en: "For interviews, the system can be summarized in one sentence: when the content team uploads a source listening-assessment MP3, the Audio Processing Service runs, detects 3+ second silence windows and repeated boundary patterns from waveform analysis, calculates question start timestamps, and automatically splits the file with FFmpeg in about 10 to 15 seconds.",
        },
      ],
    },
  ],
  umlImages: [
    {
      src: "/projects/automated-mp3-splitting-listening-assessments/uml-system-architecture.svg",
      alt: {
        ko: "듣기평가 MP3 자동 분할 시스템 아키텍처 다이어그램",
        en: "System architecture diagram for the listening-assessment MP3 auto-splitting service",
      },
      caption: {
        ko: "콘텐츠팀 업로드부터 오디오 처리 서비스, 분할 파일 저장, 앱 반영까지 이어지는 운영 시스템 구조",
        en: "Operational system structure from content-team upload through audio processing, segmented file storage, and app delivery",
      },
    },
    {
      src: "/projects/automated-mp3-splitting-listening-assessments/uml-processing-pipeline.svg",
      alt: {
        ko: "듣기평가 MP3 문항 분할 처리 파이프라인 다이어그램",
        en: "Processing pipeline diagram for per-question MP3 splitting",
      },
      caption: {
        ko: "파형 분석, 무음 탐지, 경계 탐지, 타임스탬프 계산, 검증, FFmpeg 분할로 이어지는 내부 처리 흐름",
        en: "Internal processing flow from waveform analysis through silence detection, boundary detection, timestamp inference, validation, and FFmpeg segmentation",
      },
    },
  ],
};
