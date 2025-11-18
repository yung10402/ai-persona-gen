"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Message = {
  id: number;
  role: "user" | "ai";
  text: string;
  time: string;
};

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 나중에 output → chat 넘어올 때 쿼리스트링으로 값 받을 수 있게
  const name = searchParams.get("name") ?? "김민준";
  const age = searchParams.get("age") ?? "34";
  const job = searchParams.get("job") ?? "프로덕트 매니저";

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "ai",
      text: "말풍선 어쩌고 가로 최대 크기는 이만큼 입니다",
      time: "오후 12:13",
    },
    {
      id: 2,
      role: "user",
      text: "말풍선 어쩌고 저쩌고 가로 최대 크기는 이만큼 입니다",
      time: "오후 12:12",
    },
    {
      id: 3,
      role: "ai",
      text: "말풍선 어쩌고 가로 최대 크기는 이만큼 입니다",
      time: "오후 12:13",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const time = new Date().toLocaleTimeString("ko-KR", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // 유저 메세지 추가
    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      text: trimmed,
      time,
    };

    // 일단은 더미 AI 응답 (나중에 API 붙이면 여기서 호출)
    const aiMsg: Message = {
      id: Date.now() + 1,
      role: "ai",
      text: "AI 응답 예시입니다. 나중에 API 연결해서 실제 인터뷰 답변으로 교체하면 됨!",
      time,
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <div className="screen">
      {/* 공통 헤더 (홈 / 대시보드 아이콘) */}
      <header className="frame">
        <div className="header">
          <div className="rectangle" />
          <div className="group">
            <div className="ellipse" />
            <div className="ellipse-2" />
          </div>
          <h1 className="text-wrapper-2">AI Persona Gen</h1>

          <nav
            className="home"
            aria-label="홈으로 이동"
            onClick={() => router.push("/")}
          >
            <div className="material-symbols">
              <img className="vector" src="/img/Home.svg" alt="홈 아이콘" />
            </div>
          </nav>

          <nav
            className="dashboard"
            aria-label="대시보드로 이동"
            onClick={() => router.push("/output")}
          >
            <div className="material-symbols">
              <img className="img" src="/img/Dashboard.svg" alt="대시보드 아이콘" />
            </div>
          </nav>
        </div>
      </header>

      <main>
        <div className="chat-container">
          {/* 상단 요약 영역 */}
          <h2 className="chat-title">AI 페르소나 정보 요약</h2>

          <section className="chat-summary-card" aria-label="AI 페르소나 정보 요약">
            <div className="chat-summary-header">
              <div className="chat-summary-col">이름</div>
              <div className="chat-summary-col">나이</div>
              <div className="chat-summary-col">직업</div>
            </div>
            <div className="chat-summary-row">
              <div className="chat-summary-col">{name}</div>
              <div className="chat-summary-col">{age}</div>
              <div className="chat-summary-col">{job}</div>
            </div>
          </section>

          {/* 채팅 영역 */}
          <section
            className="chat-messages"
            aria-label="AI 페르소나와의 채팅 메세지"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={
                  msg.role === "ai"
                    ? "chat-message-row chat-message-ai"
                    : "chat-message-row chat-message-user"
                }
              >
                {msg.role === "ai" && (
                  <div className="chat-avatar">
                    <img
                      src="/img/avatar-sample.png"
                      alt="AI 페르소나 프로필"
                      className="chat-avatar-img"
                    />
                  </div>
                )}

                <div className="chat-bubble-wrapper">
                  <div className="chat-bubble">{msg.text}</div>
                  <div className="chat-time">{msg.time}</div>
                </div>
              </div>
            ))}
          </section>

          {/* 입력창 */}
          <form className="chat-input-bar" onSubmit={handleSubmit}>
            <textarea
              className="chat-input"
              placeholder="AI 페르소나와 인터뷰를 진행해보세요."
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="chat-send-btn"
              aria-label="메세지 보내기"
            >
              {/* 아이콘 파일 있으면 img로 교체 가능 */}
              <span className="chat-send-icon">➤</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}


