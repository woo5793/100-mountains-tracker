"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { getMountainByName, type MountainStatus } from "@/data/mountains";
import { readMountainStatusMap, saveMountainStatus } from "@/lib/mountain-progress";

export default function MountainDetailPage() {
  const params = useParams<{ name: string }>();
  const mountainName = useMemo(() => {
    const raw = params?.name;
    const value = Array.isArray(raw) ? raw[0] : raw;
    return decodeURIComponent(value ?? "");
  }, [params]);

  const mountain = getMountainByName(mountainName);
  const [status, setStatus] = useState<MountainStatus>("미등반");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!mountain) return;

    const stored = readMountainStatusMap()[mountain.name];
    setStatus(stored ?? mountain.status);
  }, [mountain]);

  if (!mountain) {
    return (
      <main className="min-h-screen px-6 py-10">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold">산을 찾을 수 없습니다.</h1>
          <Link href="/mountains" className="mt-4 inline-block text-slate-600 hover:text-slate-900">
            ← 산 목록으로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  const handleComplete = () => {
    saveMountainStatus(mountain.name, "완료");
    setStatus("완료");
    setMessage("완료 처리되었습니다. 산 목록과 홈 화면에도 반영됩니다.");
  };

  const handleBackToPlanned = () => {
    saveMountainStatus(mountain.name, "계획중");
    setStatus("계획중");
    setMessage("계획중으로 변경되었습니다.");
  };

  const handleReset = () => {
    saveMountainStatus(mountain.name, "미등반");
    setStatus("미등반");
    setMessage("미등반으로 변경되었습니다.");
  };

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/mountains"
          className="mb-6 inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          ← 산 목록으로 돌아가기
        </Link>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{mountain.name}</h1>
              <p className="mt-2 text-slate-500">
                {mountain.region} · {mountain.height}
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                status === "완료"
                  ? "bg-green-100 text-green-700"
                  : status === "계획중"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-slate-100 text-slate-600"
              }`}
            >
              {status}
            </span>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">난이도</p>
              <p className="mt-1 text-lg font-semibold">{mountain.difficulty}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">추천 계절</p>
              <p className="mt-1 text-lg font-semibold">{mountain.season}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">대표 코스</p>
              <p className="mt-1 text-lg font-semibold">{mountain.route}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">현재 상태</p>
              <p className="mt-1 text-lg font-semibold">{status}</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">메모</p>
            <p className="mt-2 text-slate-700">{mountain.memo}</p>
          </div>

          {message ? (
            <div className="mt-6 rounded-2xl bg-green-50 p-4 text-green-700">
              {message}
            </div>
          ) : null}

<div className="mt-8 flex flex-wrap gap-3">
  <Link
    href={`/records?mountain=${encodeURIComponent(
      mountain.name
    )}&trail=${encodeURIComponent(mountain.route)}`}
    className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-700"
  >
    기록 남기기
  </Link>

  <button
    onClick={handleComplete}
    className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100"
  >
    완료 처리
  </button>

  <button
    onClick={handleBackToPlanned}
    className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100"
  >
    계획중으로 변경
  </button>

  <button
    onClick={handleReset}
    className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100"
  >
    미등반으로 변경
  </button>
</div>

        </div>
      </div>
    </main>
  );
}