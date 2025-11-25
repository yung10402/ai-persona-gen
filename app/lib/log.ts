// lib/log.ts
export type LogEvent = {
  participantId?: string;          // ?pid=U01 이런 값
  page: "home" | "output" | "chat";
  event: string;                   // "home_submit", "output_section_review" 등
  payload?: any;                   // 상세 내용(객체)
};

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_LOG_WEBHOOK_URL ?? "";

export async function sendLog(event: LogEvent) {
  if (!WEBHOOK_URL) {
    console.warn("LOG_WEBHOOK_URL이 설정되지 않았습니다.");
    return;
  }

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
  } catch (err) {
    console.error("로그 전송 실패:", err);
  }
}
