# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router entry points (`layout.tsx`, `page.tsx`) and global styles in `globals.css`.
- `components/main/`: Page sections (Hero, About, Projects, Contact, etc.) used to compose the homepage.
- `contexts/`: React context providers (for example, theme state).
- `data/`: Static typed content sources (`projects.ts`, `links.ts`, `tech-docs.ts`).
- `public/`: Static assets served directly (images, icons).
- Root config files: `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`.

## Build, Test, and Development Commands
- `npm install`: Install dependencies.
- `npm run dev`: Start local dev server at `http://localhost:3000`.
- `npm run build`: Create production build with Next.js.
- `npm run start`: Serve the production build locally.
- `npm run lint`: Run ESLint checks.

Use `npm run lint && npm run build` before opening a PR to catch most integration issues.

## Coding Style & Naming Conventions
- Language: TypeScript + React function components.
- Indentation: 2 spaces; keep imports grouped and sorted logically (framework, third-party, local).
- Components: file names in kebab-case (for example, `tech-stack.tsx`), exported component names in PascalCase.
- Data modules: keep typed exports in `data/*.ts`; avoid hardcoding large content blocks inside components.
- Follow rules from `eslint-config-next`; resolve warnings where practical.

## Testing Guidelines
- No dedicated test framework is currently configured.
- Minimum validation for changes:
  - `npm run lint`
  - `npm run build`
  - Manual smoke test of key sections in browser (`Hero`, `Projects`, `Contact`).
- If you add tests, prefer colocated `*.test.ts(x)` files and document any new test command in `package.json`.

## Commit & Pull Request Guidelines
- Existing history uses Conventional Commit style, primarily `feat:` (for example, `feat: rename section titles`).
- Recommended commit prefixes: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`.
- Keep commits focused and atomic; one logical change per commit.
- PRs should include:
  - Clear summary and motivation
  - Linked issue/task (if applicable)
  - Screenshots or short video for UI changes
  - Notes on validation performed (`lint`, `build`, manual checks)
