"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type SectionKey = "persona" | "behavior" | "needs" | "pain" | "scenario";

export default function OutputPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 홈에서 넘긴 값들 (간단히만 사용)
  const ageRange = searchParams.get("ageRange") ?? "";
  const gender = searchParams.get("gender") ?? "";
  const occupation = searchParams.get("occupation") ?? "";
  const serviceSummary = searchParams.get("serviceSummary") ?? "";

  const displayGender =
    gender === "male" ? "남성" : gender === "female" ? "여성" : "성별 미입력";

  const params = new URLSearchParams({
    ageRange,
    gender,
    occupation,
    serviceSummary,
  });

  // 섹션별 채택 상태
  const [selected, setSelected] = useState<Record<SectionKey, boolean>>({
    persona: false,
    behavior: false,
    needs: false,
    pain: false,
    scenario: false,
  });

  const toggleAdopt = (key: SectionKey) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const goSource = (key: SectionKey) => {
    router.push(`/source?section=${key}`);
  };

  return (
    <div className="screen">
      {/* 헤더는 홈이랑 동일하게 유지 */}
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

          <nav className="dashboard" aria-label="대시보드로 이동">
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
        {/* 상단 타이틀 */}
        <h2 className="output-title">
          <span className="output-title-blue">AI 페르소나</span> 결과
        </h2>

        {/* 1. 상단 페르소나 카드 */}
        <section className="persona-card">
          <div className="persona-main">
            <div className="persona-avatar" />
            <div className="persona-text">
              <h3 className="persona-name">김민준</h3>
              <p className="persona-meta">
                {ageRange || "나이 미입력"}, {displayGender},{" "}
                {occupation || "직업 미입력"}
              </p>
              <p className="persona-desc">
                {serviceSummary ||
                  "신입으로 커리어를 시작한 프론트엔드 엔지니어로, 디자이너와 기획자의 의도를 정확히 구현하고자 하는 욕구가 강함. 새로운 기술 도입에 적극적이며, 직관적이고 깔끔한 UI·UX를 선호함."}
              </p>
            </div>
          </div>

          <div className="card-actions">
            <button
              type="button"
              className="tag-adopt"
              aria-pressed={selected.persona}
              onClick={() => toggleAdopt("persona")}
            >
              채택
            </button>
            <button
              type="button"
              className="tag-source"
              onClick={() => goSource("persona")}
            >
              출처 확인
            </button>
          </div>
        </section>

        {/* 2. 섹션 카드 리스트 (세로로 4개) */}
        <section className="output-section-list">
          {/* 행동 패턴 */}
          <article className="output-card">
            <div className="output-card-header">
              <div className="output-card-title-wrap">
                <h3 className="output-card-title">행동 패턴</h3>
                <span className="output-card-sub">Behavioral Patterns</span>
              </div>
              <div className="card-actions">
                <button
                  type="button"
                  className="tag-adopt"
                  aria-pressed={selected.behavior}
                  onClick={() => toggleAdopt("behavior")}
                >
                  채택
                </button>
                <button
                  type="button"
                  className="tag-source"
                  onClick={() => goSource("behavior")}
                >
                  출처 확인
                </button>
              </div>
            </div>

            <ul className="output-list">
              <li>디자인 시안을 분석하고 컴포넌트 구조 설계</li>
              <li>UI 컴포넌트 개발 및 재사용성 검토</li>
              <li>코드 리뷰 참여 및 팀원 리뷰 확인</li>
              <li>신기술 테스트 및 개발 환경 개선</li>
              <li>간단한 자동화 스크립트 작성</li>
            </ul>
          </article>

          {/* 니즈·목표 */}
          <article className="output-card">
            <div className="output-card-header">
              <div className="output-card-title-wrap">
                <h3 className="output-card-title">니즈·목표</h3>
                <span className="output-card-sub">Needs/Goals</span>
              </div>
              <div className="card-actions">
                <button
                  type="button"
                  className="tag-adopt"
                  aria-pressed={selected.needs}
                  onClick={() => toggleAdopt("needs")}
                >
                  채택
                </button>
                <button
                  type="button"
                  className="tag-source"
                  onClick={() => goSource("needs")}
                >
                  출처 확인
                </button>
              </div>
            </div>

            <ul className="output-list">
              <li>디자인 의도를 정확히 이해할 수 있는 커뮤니케이션 채널</li>
              <li>일관된 UI 가이드와 컴포넌트 기준</li>
              <li>반복 작업을 줄여주는 자동화 도구</li>
              <li>성장과 학습을 위한 코드 리뷰와 피드백</li>
            </ul>
          </article>

          {/* 페인 포인트 */}
          <article className="output-card">
            <div className="output-card-header">
              <div className="output-card-title-wrap">
                <h3 className="output-card-title">페인 포인트</h3>
                <span className="output-card-sub">Pain Points</span>
              </div>
              <div className="card-actions">
                <button
                  type="button"
                  className="tag-adopt"
                  aria-pressed={selected.pain}
                  onClick={() => toggleAdopt("pain")}
                >
                  채택
                </button>
                <button
                  type="button"
                  className="tag-source"
                  onClick={() => goSource("pain")}
                >
                  출처 확인
                </button>
              </div>
            </div>

            <ul className="output-list">
              <li>기획 문서와 실제 요구사항 사이의 불일치</li>
              <li>컴포넌트 재사용 기준이 모호해 코드가 쉽게 복잡해짐</li>
              <li>긴 빌드/배포 시간으로 인한 작업 흐름 단절</li>
              <li>새로운 기술 도입에 대한 팀 내 저항</li>
            </ul>
          </article>

          {/* 유저 시나리오 */}
          <article className="output-card">
            <div className="output-card-header">
              <div className="output-card-title-wrap">
                <h3 className="output-card-title">유저 시나리오</h3>
                <span className="output-card-sub">User Scenario</span>
              </div>
              <div className="card-actions">
                <button
                  type="button"
                  className="tag-adopt"
                  aria-pressed={selected.scenario}
                  onClick={() => toggleAdopt("scenario")}
                >
                  채택
                </button>
                <button
                  type="button"
                  className="tag-source"
                  onClick={() => goSource("scenario")}
                >
                  출처 확인
                </button>
              </div>
            </div>

            <p className="output-paragraph">
              퇴근 후 집에서, 혹은 출퇴근 지하철에서 Slack과 협업 도구를 통해
              전달된 디자인 변경사항을 빠르게 확인하고, 주말이나 집중 가능한
              시간에 컴포넌트 구조를 정리한다. 반복 작업은 스크립트로
              자동화하고, 남는 시간에 새로운 UI 패턴과 도구를 탐색한다.
            </p>
          </article>
        </section>

        

        {/* 하단 CTA 버튼 */}
        <button
          className="output-cta"
          type="button"
          onClick={() => router.push(`/chat?${params.toString()}`)}
        >
          AI 페르소나와 인터뷰 하기
        </button>
      </main>
    </div>
  );
}
