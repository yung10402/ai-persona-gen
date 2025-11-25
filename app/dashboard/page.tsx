"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Output에서 저장하는 형태
export type DashboardItem = {
  id: string;
  createdAt: string; // ISO
  name: string;
  ageRange: string;
  gender: string;
  occupation: string;
  summary: string;
  full: any;
};

type LegacySavedPersona = {
  id: string;
  name: string;
  ageRange: string;
  gender: string;
  occupation: string;
  createdAt: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [items, setItems] = useState<DashboardItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      // 새 포맷
      const rawNew = window.localStorage.getItem("personaDashboardItems");
      if (rawNew) {
        const parsed = JSON.parse(rawNew) as DashboardItem[];
        const sorted = [...parsed].sort((a, b) => {
          const ta = new Date(a.createdAt).getTime();
          const tb = new Date(b.createdAt).getTime();
          return tb - ta;
        });
        setItems(sorted);
        return;
      }

      // 예전 포맷
      const rawOld = window.localStorage.getItem("personas");
      if (rawOld) {
        const legacy = JSON.parse(rawOld) as LegacySavedPersona[];
        const mapped: DashboardItem[] = legacy.map((p) => ({
          id: p.id,
          createdAt: p.createdAt,
          name: p.name,
          ageRange: p.ageRange,
          gender: p.gender,
          occupation: p.occupation,
          summary: "",
          full: null,
        }));
        const sorted = mapped.sort((a, b) => {
          const ta = new Date(a.createdAt).getTime();
          const tb = new Date(b.createdAt).getTime();
          return tb - ta;
        });
        setItems(sorted);
        return;
      }

      setItems([]);
    } catch (e) {
      console.error("대시보드 localStorage 파싱 오류:", e);
      setItems([]);
    }
  }, []);

  const formatDate = (iso: string) => {
    if (!iso) return "-";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "-";
    return d.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleClickCard = (id: string) => {
    router.push(`/report?id=${id}`);
  };

  return (
    <div className="screen">
      {/* 헤더 */}
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
              <img className="vector" src="/img/Home.svg" alt="홈 아이콘" />
            </div>
          </nav>

          <nav
            className="dashboard"
            aria-label="대시보드"
            onClick={() => router.push("/dashboard")}
          >
            <div className="material-symbols">
              <img
                className="img"
                src="/img/Dashboard.svg"
                alt="대시보드 아이콘"
              />
            </div>
          </nav>
        </div>
      </header>

      <main className="output-main">
        <h2 className="output-title">
          <span className="output-title-blue">AI 페르소나</span> 대시보드
        </h2>

        {items.length === 0 ? (
          <p style={{ marginTop: "24px" }}>
            아직 저장된 페르소나가 없습니다.
            <br />
            Output 화면에서 &quot;AI 페르소나와 인터뷰 하기&quot;를 눌러
            페르소나를 생성·저장해 보세요.
          </p>
        ) : (
          <section className="output-section-list">
            {items.map((p) => (
              <button
                key={p.id}
                type="button"
                className="dashboard-card-button"
                onClick={() => handleClickCard(p.id)}
              >
                <article className="output-card">
                  <div className="output-card-header">
                    <div className="output-card-title-wrap">
                      <h3 className="output-card-title">{p.name}</h3>
                      <span className="output-card-sub">
                        {p.ageRange || "나이 미입력"} ·{" "}
                        {p.gender || "성별 미입력"} ·{" "}
                        {p.occupation || "직업 미입력"}
                      </span>
                    </div>
                  </div>

                  {p.summary && (
                    <p className="output-paragraph dashboard-summary">
                      {p.summary}
                    </p>
                  )}

                  <div className="output-card-footer">
                    <span className="output-card-sub">
                      생성 시각: {formatDate(p.createdAt)}
                    </span>
                  </div>
                </article>
              </button>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
