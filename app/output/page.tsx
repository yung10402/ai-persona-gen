// app/output/page.tsx
import { Suspense } from "react";
import OutputPageClient from "./OutputPageClient";

export default function OutputPage() {
  return (
    <Suspense fallback={<div>결과를 불러오는 중입니다...</div>}>
      <OutputPageClient />
    </Suspense>
  );
}
