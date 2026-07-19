"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { mountains, type Mountain, type MountainStatus } from "@/data/mountains";
import { readMountainStatusMap } from "@/lib/mountain-progress";

const regions = ["전체", "서울/경기", "강원", "충청", "경상/전라", "제주", "충청/경상", "강원/경상"];

export default function MountainsPage() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [statusMap, setStatusMap] = useState<Record<string, MountainStatus>>({});

  useEffect(() => {
    const loadStatus = () => setStatusMap(readMountainStatusMap());
    loadStatus();

    window.addEventListener("storage", loadStatus);
    return () => window.removeEventListener("storage", loadStatus);
  }, []);

  const filteredMountains = useMemo(() => {
    return mountains.filter((mountain: Mountain) => {
      const matchName = mountain.name.includes(search);
      const matchRegion =
        selectedRegion === "전체" || mountain.region === selectedRegion;
      return matchName && matchRegion;
    });
  }, [search, selectedRegion]);

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold">산 목록</h1>
        <p className="mb-8 text-slate-600">
          100대 명산을 검색하고, 지역별로 확인할 수 있습니다.
        </p>

        <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            산 이름 검색
          </label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="예: 설악, 북한, 한라"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
          />
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedRegion === region
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 shadow-sm hover:bg-slate-100"
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredMountains.map((mountain) => {
            const currentStatus = statusMap[mountain.name] ?? mountain.status;

            return (
              <Link
                key={mountain.name}
                href={`/mountains/${encodeURIComponent(mountain.name)}`}
                className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{mountain.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {mountain.region} · {mountain.height}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      currentStatus === "완료"
                        ? "bg-green-100 text-green-700"
                        : currentStatus === "계획중"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {currentStatus}
                  </span>
                </div>

                <p className="mt-4 text-sm text-slate-500">
                  클릭해서 상세 정보를 보기
                </p>
              </Link>
            );
          })}
        </div>

        {filteredMountains.length === 0 && (
          <div className="mt-6 rounded-2xl bg-white p-6 text-slate-500 shadow-sm">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </main>
  );
}