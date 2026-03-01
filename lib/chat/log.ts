import { sql } from "@vercel/postgres";

type ChatLogInput = {
  question: string;
  answer?: string;
  error?: string;
  model: string;
  ip: string;
  userAgent: string;
  referer: string;
};

let schemaReady: Promise<void> | null = null;

export async function ensureChatLogSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS chat_logs (
          id BIGSERIAL PRIMARY KEY,
          question TEXT NOT NULL,
          answer TEXT,
          error TEXT,
          model VARCHAR(100) NOT NULL,
          ip VARCHAR(100) NOT NULL,
          user_agent TEXT NOT NULL,
          referer TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS idx_chat_logs_created_at
        ON chat_logs (created_at DESC);
      `;
    })().catch((error) => {
      schemaReady = null;
      throw error;
    });
  }

  await schemaReady;
}

function clampText(value: string | undefined, maxLength: number): string | null {
  if (!value) {
    return null;
  }
  return value.trim().slice(0, maxLength);
}

export async function saveChatLog(input: ChatLogInput): Promise<void> {
  await ensureChatLogSchema();

  const question = clampText(input.question, 4000) ?? "";
  const answer = clampText(input.answer, 8000);
  const error = clampText(input.error, 1000);
  const model = clampText(input.model, 100) ?? "unknown";
  const ip = clampText(input.ip, 100) ?? "unknown";
  const userAgent = clampText(input.userAgent, 1000) ?? "unknown";
  const referer = clampText(input.referer, 1000) ?? "unknown";

  await sql`
    INSERT INTO chat_logs (question, answer, error, model, ip, user_agent, referer)
    VALUES (${question}, ${answer}, ${error}, ${model}, ${ip}, ${userAgent}, ${referer});
  `;
}
