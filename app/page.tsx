"use client";

import { Suspense } from "react";
import HomePageInner from "./HomePageInner";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageInner />
    </Suspense>
  );
}
