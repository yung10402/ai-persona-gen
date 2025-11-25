// app/source/SourcePageClient.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function SourcePageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const section = searchParams.get("section") ?? "";

  return (
    <div className="screen">
      {/* 기존 헤더 유지 */}
      <header className="frame">
        <div className="header">
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
              <img className="vector" src="/img/Home.svg" alt="홈" />
            </div>
          </nav>

          <nav className="dashboard">
            <div className="material-symbols">
              <img className="img" src="/img/Dashboard.svg" alt="대시보드" />
            </div>
          </nav>
        </div>
      </header>

      {/* 콘텐츠 영역 */}
      <main className="source-main">
        <h2 className="source-title">출처 확인</h2>

        <div className="source-box">
          <h3 className="source-section-name">
            {section ? `섹션: ${section}` : "섹션 정보 없음"}
          </h3>

          <p className="source-text">
            이 영역에는 나중에 AI가 생성한 “출처 내용”을 넣을 예정입니다.
            <br />
            사용자가 선택한 페르소나 정보가 어디서 유래했는지 AI가 설명하는
            텍스트가 들어갑니다.
          </p>
        </div>

        <button className="source-back" onClick={() => router.back()}>
          돌아가기
        </button>
      </main>
    </div>
  );
}
