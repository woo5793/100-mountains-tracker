"use client";

import { useMemo, useState } from "react";
import { mountains } from "@/data/mountains";

export default function RecommendPage() {
  const [search, setSearch] = useState("");
  const [selectedMountainName, setSelectedMountainName] = useState("");

  const filteredMountains = useMemo(() => {
    if (!search.trim()) return mountains;
    return mountains.filter((mountain) =>
      mountain.name.includes(search.trim())
    );
  }, [search]);

  const selectedMountain =
    mountains.find((mountain) => mountain.name === selectedMountainName) ??
    filteredMountains[0];

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold">가고 싶은 산 추천</h1>
        <p className="mb-8 text-slate-600">
          산 이름을 검색하면 추천 등산로를 바로 보여줍니다.
        </p>

        <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            산 이름 검색
          </label>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedMountainName("");
            }}
            placeholder="예: 설악, 북한, 한라"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">검색 결과</h2>
            <div className="mt-4 space-y-3">
              {filteredMountains.map((mountain) => (
                <button
                  key={mountain.name}
                  onClick={() => setSelectedMountainName(mountain.name)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    selectedMountain?.name === mountain.name
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold">{mountain.name}</p>
                      <p className="text-sm opacity-80">
                        {mountain.region} · {mountain.height}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {mountain.status}
                    </span>
                  </div>
                </button>
              ))}

              {filteredMountains.length === 0 && (
                <p className="rounded-2xl bg-slate-50 p-4 text-slate-500">
                  검색 결과가 없습니다.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            {selectedMountain ? (
              <>
                <h2 className="text-2xl font-bold">{selectedMountain.name}</h2>
                <p className="mt-1 text-slate-500">
                  {selectedMountain.region} · {selectedMountain.height}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {selectedMountain.trails.map((trail) => (
                    <div key={trail.name} className="rounded-2xl bg-slate-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-lg font-semibold">{trail.name}</p>
                          <p className="mt-1 text-sm text-slate-500">
                            {trail.distance} · {trail.estimatedTime}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            trail.difficulty === "쉬움"
                              ? "bg-green-100 text-green-700"
                              : trail.difficulty === "보통"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {trail.difficulty}
                        </span>
                      </div>

                      <p className="mt-3 text-sm text-slate-700">
                        <span className="font-medium">추천 이유:</span> {trail.reason}
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        <span className="font-medium">주의사항:</span> {trail.warning}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-slate-500">산을 선택하면 추천 등산로가 표시됩니다.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}