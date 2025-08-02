# AI 채팅 플랫폼

Next.js 15, Supabase, AI SDK 5로 구축된 현대적인 AI 채팅 플랫폼입니다.

## 기능

- 🔐 Supabase를 통한 Google OAuth 인증
- 💬 OpenAI GPT-4를 사용한 실시간 AI 채팅
- 📁 Supabase를 통한 채팅 기록 저장
- 🎨 shadcn/ui와 Tailwind CSS를 사용한 현대적인 UI
- ⚡ AI SDK 5를 사용한 스트리밍 응답
- 🔒 사용자 데이터를 위한 행 수준 보안

## 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **데이터베이스**: Supabase (PostgreSQL)
- **인증**: Supabase Auth + Google OAuth
- **AI**: AI SDK 5를 통한 OpenAI GPT-4
- **UI**: shadcn/ui, Tailwind CSS
- **언어**: TypeScript

## 설치 방법

### 1. 저장소 복제

```bash
git clone <repository-url>
cd ai-chat-platform-new
npm install
```

### 2. Supabase 설정

1. [supabase.com](https://supabase.com)에서 새 프로젝트 생성
2. `supabase/migrations/001_initial_schema.sql`의 SQL 마이그레이션 실행
3. 인증 설정에서 Google OAuth 활성화
4. 프로젝트 설정 > API에서 프로젝트 URL과 anon key 가져오기

### 3. Google OAuth 설정

1. [Google Cloud Console](https://console.cloud.google.com)로 이동
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. Google+ API 활성화
4. OAuth 2.0 자격 증명 생성
5. 승인된 리디렉션 URI 추가: `https://yourproject.supabase.co/auth/v1/callback`
6. Supabase Auth 설정에 클라이언트 ID와 시크릿 추가

### 4. 환경 변수 설정

`.env.local` 파일 생성:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)을 열어 앱을 확인하세요.

## 프로젝트 구조

```
src/
├── app/
│   ├── api/
│   │   └── chat/          # AI 채팅 엔드포인트
│   ├── auth/
│   │   ├── login/         # 로그인 페이지
│   │   └── callback/      # OAuth 콜백
│   └── page.tsx           # 메인 채팅 페이지
├── components/
│   ├── ui/                # shadcn/ui 컴포넌트
│   ├── chat/              # 채팅 컴포넌트
│   └── layout/            # 레이아웃 컴포넌트
├── lib/
│   ├── supabase/          # Supabase 클라이언트
│   ├── types/             # TypeScript 타입
│   └── utils.ts           # 유틸리티 함수
└── middleware.ts          # 인증 미들웨어
```

## 데이터베이스 스키마

앱은 다음과 같은 주요 테이블을 사용합니다:

- `profiles`: 사용자 프로필 (Supabase Auth 확장)
- `chats`: 채팅 세션
- `messages`: AI SDK 5 parts 구조를 사용한 채팅 메시지
- `votes`: 메시지 평가
- `documents`: 향후 MCP 통합을 위한 테이블

모든 테이블은 데이터 격리를 위해 행 수준 보안(RLS)이 활성화되어 있습니다.

## 개발

### 새로운 UI 컴포넌트 추가

```bash
npx shadcn@latest add <component-name>
```

### 타입 체크 실행

```bash
npm run type-check
```

### 프로덕션 빌드

```bash
npm run build
```

## 향후 개선 사항

- [ ] 파일 첨부 및 이미지 지원
- [ ] 다중 AI 모델 지원
- [ ] 채팅 공유 및 협업
- [ ] MCP (Model Context Protocol) 통합
- [ ] 음성 입력/출력
- [ ] 모바일 앱