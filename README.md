# Portfolio Website

포트폴리오 웹사이트 프로젝트입니다.

## 🌐 배포

**Live Demo**: [https://www.jaehyunsin.com](https://www.jaehyunsin.com)

## 🚀 기술 스택

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Library**: React 19.2.3
- **Icons**: lucide-react
- **Theme**: Theme Context

## 📦 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인할 수 있습니다.

## 🏗️ 프로젝트 구조

```
portfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈 페이지
│   └── globals.css        # 전역 스타일
├── components/            # 재사용 가능한 컴포넌트
│   └── main/
│       └── hero.tsx       # Hero 섹션 컴포넌트
└── public/                # 정적 파일
```

## 🎨 주요 기능

### 다국어 지원
- 한글/영어 토글 기능
- 모든 섹션 이중 언어 지원
- 기본 언어: 한글

### 테마
- 라이트모드/다크모드 전환
- 기본 테마: 라이트 모드

### 섹션
- **Hero**: 메인 소개, 애니메이션 효과 (BlurText)
- **About**: 학력, 언어, 자기소개
- **Projects**: 8개 프로젝트 상세 정보
- **Tech Stack**: 기술 스택 및 핵심 전문 분야
- **Experience**: 경력 사항 및 활동
- **Contact**: 연락처 정보

### 기타
- 반응형 디자인
- 스크롤 감지 헤더
- 프로필 이미지

## 📝 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린팅
npm run lint
```

## 📚 패키지 정보

### Dependencies
- `next`: ^16.1.6
- `react`: ^19.2.3
- `react-dom`: ^19.2.3
- `lucide-react`: ^0.469.0 (아이콘 라이브러리)

### DevDependencies
- `@tailwindcss/postcss`: ^4
- `@types/node`: ^20
- `@types/react`: ^19
- `@types/react-dom`: ^19
- `eslint`: ^9
- `eslint-config-next`: 16.1.6
- `tailwindcss`: ^4
- `typescript`: ^5

## 🔧 개발 환경 설정

이 프로젝트는 다음을 사용합니다:
- **Node.js**: 20 이상 권장
- **패키지 매니저**: npm

## 📄 라이선스

Private

## 📌 템플릿 사용 안내

이 포트폴리오 템플릿은 자유롭게 가져가서 참고하셔도 좋습니다! 🎉

**단, 다음 사항을 꼭 지켜주세요:**
- ⚠️ **디자인을 반드시 수정**해서 사용하세요
- ⚠️ **내용(텍스트, 이미지, 프로젝트 정보 등)을 본인의 것으로 변경**하세요
- ✅ 코드 구조와 기능은 참고하되, 자신만의 스타일로 커스터마이징하세요

이 템플릿이 여러분의 멋진 포트폴리오를 만드는 데 도움이 되길 바랍니다! 💪
## Analytics 설정 (Vercel Postgres)

Vercel 프로젝트 환경변수에 아래 값을 설정하세요.

- `POSTGRES_URL`: Vercel Postgres/Neon 연결 문자열
- `ADMIN_STATS_TOKEN`: 관리자 통계 API 보호용 비밀 토큰

공개 API:

- `GET /api/analytics/public` : UI 표시용 누적 방문자수 조회

관리자 API:

- `GET /api/analytics/stats`
- 요청 헤더: `Authorization: Bearer <ADMIN_STATS_TOKEN>`

트래킹 API:

- `POST /api/analytics/track` : 페이지 방문 시 자동 호출

## 배포 후 확인

배포 완료 후 아래 항목을 확인하세요.

1. 공개 카운터 확인
- `GET https://<your-domain>/api/analytics/public`
- 기대 결과: `200` + `{ "totalVisits": number, "updatedAt": string }`

2. 관리자 인증 실패 확인
- 토큰 없이 `GET https://<your-domain>/api/analytics/stats`
- 기대 결과: `401 Unauthorized`

3. 관리자 통계 정상 확인
- 헤더 포함 `GET https://<your-domain>/api/analytics/stats`
- `Authorization: Bearer <ADMIN_STATS_TOKEN>`
- 기대 결과: `200` + `totalVisits`, `todayVisits`, `monthVisits`, `daily`, `monthly`

4. UI 확인
- 홈페이지 Hero 섹션에 `Total Visitors` / `누적 방문자` 표시 확인

5. 중복 방지 확인 (30분)
- 같은 브라우저 세션에서 여러 번 새로고침해도 카운트가 급격히 증가하지 않는지 확인
