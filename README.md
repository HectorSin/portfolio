# Portfolio Website

포트폴리오 웹사이트 프로젝트입니다.

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

### Hero 섹션
- 반응형 디자인
- 다크모드/라이트모드 전환
- 애니메이션 효과 (BlurText)
- 네비게이션 메뉴
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
