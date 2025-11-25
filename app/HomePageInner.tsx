"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { sendLog } from "@/lib/log";

export default function HomePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // UT 참가자 ID (?pid=U01)
  const pid = searchParams.get("pid") ?? "";

  // 상태들
  const [serviceType, setServiceType] = useState<"appweb" | "product" | null>(null);
  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceSummary, setServiceSummary] = useState("");
  const [ageRange, setAgeRange] = useState<string | null>(null);
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [occupation, setOccupation] = useState("");
  const [userGoal, setUserGoal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams({
      serviceType: serviceType ?? "",
      serviceCategory,
      serviceSummary,
      ageRange: ageRange ?? "",
      gender: gender ?? "",
      occupation,
      userGoal,
    });

    // 로그 찍기
    sendLog({
      pid: pid || undefined,
      page: "home",
      event: "home_submit",
      payload: {
        serviceType: serviceType ?? "",
        serviceCategory,
        serviceSummary,
        ageRange: ageRange ?? "",
        gender: gender ?? "",
        occupation,
        userGoal,
      },
    });

    router.push(`/output?${params.toString()}`);
  };

  return (
    <div className="screen">
      <header className="frame">
        <div className="header">
          <div className="rectangle"></div>
          <h1 className="text-wrapper-2">AI Persona Gen</h1>
          <div className="group">
            <div className="ellipse"></div>
            <div className="ellipse-2"></div>
          </div>

          <nav className="home" aria-label="홈으로 이동" onClick={() => router.push("/")}>
            <div className="material-symbols">
              <img className="vector" src="/img/Home.svg" alt="홈 아이콘" />
            </div>
          </nav>

          <nav className="dashboard" aria-label="대시보드로 이동" onClick={() => router.push("/dashboard")}>
            <div className="material-symbols">
              <img className="img" src="/img/Dashboard.svg" alt="대시보드 아이콘" />
            </div>
          </nav>
        </div>
      </header>

      <main>
        <form onSubmit={handleSubmit}>

          {/* --- 이하 내용은 기존 HomePage 코드 그대로 --- */}

          <section aria-labelledby="product-info-heading">
            <h2 className="div">
              <span className="text-wrapper">프로덕트 정보</span>
              <span className="span">를 입력해주세요.</span>
            </h2>

            <h3 className="text-wrapper-3">프로덕트 정보</h3>
            
            {/* 서비스 타입 */}
            <div className="form-group">
              <label htmlFor="service-type" className="text-wrapper-10">서비스 타입</label>

              <div className="service-type-options">
                <div className="group-wrapper">
                  <button
                    type="button"
                    className="group-3"
                    aria-pressed={serviceType === "appweb"}
                    onClick={() => setServiceType("appweb")}
                  >
                    <span className="text-wrapper-11">앱/웹</span>
                  </button>
                </div>

                <button
                  type="button"
                  className="group-4"
                  aria-pressed={serviceType === "product"}
                  onClick={() => setServiceType("product")}
                >
                  <span className="text-wrapper-12">제품</span>
                </button>
              </div>
            </div>

            {/* (여기 아래부터도 네가 보내준 그대로 유지) */}
            {/* ... 생략 ... */}
          </section>

          {/* 제출 버튼 */}
          <button type="submit" className="frame-2">
            <span className="text-wrapper-16">AI 페르소나 생성하기</span>
          </button>

        </form>
      </main>
    </div>
  );
}
