"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { mountains, getMountainByName } from "@/data/mountains";
import {
  deleteClimbRecord,
  readClimbRecords,
  saveClimbRecord,
  type ClimbFeeling,
  type ClimbRecord,
} from "@/lib/climb-records";

export default function RecordsPage() {
  const searchParams = useSearchParams();

  const [mountainName, setMountainName] = useState(mountains[0]?.name ?? "");
  const [trailName, setTrailName] = useState("");
  const [date, setDate] = useState("");
  const [feeling, setFeeling] = useState<ClimbFeeling>("좋음");
  const [memo, setMemo] = useState("");
  const [records, setRecords] = useState<ClimbRecord[]>([]);

  useEffect(() => {
    const fromQueryMountain = searchParams.get("mountain");
    const fromQueryTrail = searchParams.get("trail");

    if (fromQueryMountain && getMountainByName(fromQueryMountain)) {
      setMountainName(fromQueryMountain);
    }

    if (fromQueryTrail) {
      setTrailName(fromQueryTrail);
    }
  }, [searchParams]);

  useEffect(() => {
    setRecords(readClimbRecords());
  }, []);

  const selectedMountain = useMemo(() => {
    return getMountainByName(mountainName) ?? mountains[0];
  }, [mountainName]);

  useEffect(() => {
    if (!selectedMountain) return;

    const trailExists = selectedMountain.trails.some(
      (trail) => trail.name === trailName
    );

    if (!trailExists) {
      setTrailName(selectedMountain.trails[0]?.name ?? "");
    }
  }, [selectedMountain, trailName]);

  const handleSave = () => {
    if (!mountainName || !trailName || !date) {
      alert("산, 코스, 날짜는 꼭 입력해 주세요.");
      return;
    }

    saveClimbRecord({
      mountainName,
      trailName,
      date,
      memo,
      feeling,
    });

    setRecords(readClimbRecords());
    setMemo("");
    setFeeling("좋음");
    alert("등반 기록이 저장되었습니다.");
  };

  const handleDelete = (id: string) => {
    deleteClimbRecord(id);
    setRecords(readClimbRecords());
  };

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold">내 기록</h1>
        <p className="mb-8 text-slate-600">
          다녀온 산, 코스, 날짜, 메모를 저장하는 화면입니다.
        </p>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">등반 기록 입력</h2>

            <div className="mt-5 grid gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  산 선택
                </label>
                <select
                  value={mountainName}
                  onChange={(e) => setMountainName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                >
                  {mountains.map((mountain) => (
                    <option key={mountain.name} value={mountain.name}>
                      {mountain.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  코스
                </label>
                <select
                  value={trailName}
                  onChange={(e) => setTrailName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                >
                  {selectedMountain?.trails.map((trail) => (
                    <option key={trail.name} value={trail.name}>
                      {trail.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  날짜
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  체감
                </label>
                <select
                  value={feeling}
                  onChange={(e) => setFeeling(e.target.value as ClimbFeeling)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                >
                  <option value="좋음">좋음</option>
                  <option value="보통">보통</option>
                  <option value="힘듦">힘듦</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  메모
                </label>
                <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  rows={5}
                  placeholder="날씨, 함께 간 사람, 힘들었던 구간 등을 적어보세요."
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                />
              </div>

              <button
                onClick={handleSave}
                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-700"
              >
                저장
              </button>
            </div>
          </section>

          <aside className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">선택한 산 정보</h2>

            {selectedMountain ? (
              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">산 이름</p>
                  <p className="mt-1 text-lg font-semibold">{selectedMountain.name}</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">추천 코스</p>
                  <p className="mt-1 text-lg font-semibold">{selectedMountain.route}</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">추천 등산로</p>
                  <div className="mt-3 space-y-3">
                    {selectedMountain.trails.map((trail) => (
                      <div key={trail.name} className="rounded-xl bg-white p-3 shadow-sm">
                        <p className="font-semibold">{trail.name}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {trail.distance} · {trail.estimatedTime}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/mountains/${encodeURIComponent(selectedMountain.name)}`}
                  className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100"
                >
                  산 상세로 보기
                </Link>
              </div>
            ) : (
              <p className="mt-5 text-slate-500">산을 선택하면 정보가 보입니다.</p>
            )}
          </aside>
        </div>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">저장된 기록</h2>

          {records.length > 0 ? (
            <div className="mt-5 grid gap-4">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold">{record.mountainName}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {record.date} · {record.trailName}
                      </p>
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                      {record.feeling}
                    </span>
                  </div>

                  {record.memo ? (
                    <p className="mt-3 text-slate-700">{record.memo}</p>
                  ) : (
                    <p className="mt-3 text-slate-400">메모 없음</p>
                  )}

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-100"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-slate-500">아직 저장된 기록이 없습니다.</p>
          )}
        </section>
      </div>
    </main>
  );
}