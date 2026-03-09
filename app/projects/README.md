# 프로젝트 상세 페이지 작성 가이드

이 문서는 이 저장소에서 **새 프로젝트 상세 페이지를 추가/작성하는 방법**을 설명합니다.

기준 브랜치: `feat/project-detail-pages`

---

## 1. 현재 구조 요약

상세 페이지는 다음 구조로 동작합니다.

- 데이터 원본: `data/projects.ts`
- 상세 본문(슬러그별): `data/project-details/<slug>/index.ts`
- 상세 맵 집계: `data/project-details/index.ts`
- 상세 페이지 라우트: `app/projects/[slug]/page.tsx`
- 상세 렌더 컴포넌트: `components/main/project-detail-page.tsx`
- 유틸/검증: `lib/projects.ts`
- UML 이미지 위치: `public/projects/<slug>/...`

핵심 규칙:

- 카드 클릭 가능 여부는 `detail` 존재 여부로 결정됩니다.
- `detail`이 있으면 `/projects/[slug]`로 이동합니다.
- `detail`이 없으면 카드에서 상세 링크가 비활성(준비중) 상태로 유지됩니다.

---

## 2. 새 프로젝트를 추가할 때 반드시 입력할 값

파일: `data/projects.ts`

`baseProjects`에 항목을 추가한 뒤, 아래도 반드시 함께 맞춰야 합니다.

1. `projectSlugs` 배열에 slug 추가
2. (선택) `data/project-details/<slug>/index.ts` 파일 생성
3. (선택) `data/project-details/index.ts`에 slug 매핑 추가

최종 `projects`는 아래처럼 생성됩니다.

- `id`: 자동 생성 (`project-번호`)
- `slug`: `projectSlugs[index]`
- `detail`: `projectDetailsBySlug[slug]`가 있을 때만 연결

주의:

- `slug`는 중복되면 안 됩니다.
- `id`도 중복되면 안 됩니다.
- 중복 시 `validateProjectCatalog`에서 에러가 발생합니다.

---

## 3. 상세 페이지를 "실제로 열리게" 하려면

아래 두 조건이 모두 필요합니다.

1. `data/projects.ts`에 해당 프로젝트의 `slug`가 존재
2. `data/project-details/index.ts`에 동일한 `slug` 키 매핑이 존재

예시 형태:

```ts
// data/project-details/my-new-project/index.ts
export const myNewProjectDetail = {
  overview: {
    ko: "프로젝트 한 줄 요약",
    en: "One-line summary",
  },
  sections: [
    {
      key: "problem",
      title: { ko: "문제", en: "Problem" },
      paragraphs: [{ ko: "문제 배경 설명", en: "Background" }],
    },
  ],
};

// data/project-details/index.ts
export const projectDetailsBySlug = {
  "my-new-project": myNewProjectDetail,
};
```

---

## 4. UML 이미지 추가 방법

이미지는 `public/projects/<slug>/` 아래에 둡니다.

예:

- 파일 경로: `public/projects/my-new-project/uml-overview.svg`
- 데이터 참조: `src: "/projects/my-new-project/uml-overview.svg"`

권장:

- 웹 최적화 가능한 `svg` 또는 압축된 `png/webp`
- 파일명 규칙 통일: `uml-overview`, `uml-sequence`, `uml-component` 등

---

## 5. 한/영 작성 규칙

현재 상세 구조는 다국어를 전제로 합니다.

- `overview.ko`, `overview.en` 모두 작성
- `sections[].title.ko/en` 모두 작성
- `sections[].paragraphs[].ko/en` 모두 작성
- `umlImages[].alt.ko/en` 모두 작성

하나라도 비면 검증에서 실패할 수 있습니다.

---

## 6. 빠른 작업 순서 (실무용)

1. `data/projects.ts`의 `baseProjects`에 새 항목 추가
2. `projectSlugs`에 새 slug 추가
3. 우선 카드만 노출하려면 상세 파일/매핑은 생략
4. 상세 공개 시점에 `data/project-details/<slug>/index.ts` 작성 + 매핑 추가
5. UML 이미지 `public/projects/<slug>/`에 추가
6. `npm.cmd run lint` 실행
7. 개발 서버에서 카드/상세 페이지 동작 확인

팁:
- `data/project-details/_template/index.ts`를 복사해서 새 slug 폴더에 붙여 시작하면 빠릅니다.

---

## 7. 동작 체크리스트

- 홈 프로젝트 카드에 새 프로젝트가 보이는가?
- `detail`이 없을 때 카드가 비활성 상태 문구를 보이는가?
- `detail` 추가 후 카드에서 `/projects/<slug>` 이동되는가?
- 상세 페이지에서 섹션/다이어그램/링크가 정상 렌더되는가?
- 언어 토글 시 한/영 텍스트가 정상 전환되는가?

---

## 8. 자주 나는 오류

1. `Duplicate project slug detected`
- 원인: `projectSlugs` 중복
- 해결: slug를 고유하게 변경

2. `Project detail ... is incomplete`
- 원인: `detail` 하위의 `ko/en` 또는 `sections` 누락
- 해결: 누락 필드 채우기

3. 상세 링크가 안 열림
- 원인: `detail` 미작성
- 해결: `data/project-details/<slug>/index.ts` 작성 후 `projectDetailsBySlug` 매핑 추가

---

## 9. 권장 slug 규칙

- 영어 소문자 + 하이픈만 사용
- 제목이 바뀌어도 slug는 가능한 고정
- 예: `llm-education-content-pipeline`

---

## 10. 참고 파일

- `data/projects.ts`
- `data/project-details/index.ts`
- `data/project-details/<slug>/index.ts`
- `lib/projects.ts`
- `components/main/projects.tsx`
- `components/main/project-detail-page.tsx`
- `app/projects/[slug]/page.tsx`
