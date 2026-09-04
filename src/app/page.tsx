"use client";

import { useState } from "react";
import InfoRow from "@/components/InfoRow";
import Header from "@/components/Header";
import SectionCard from "@/components/SectionCard";
import PrimaryButton from "@/components/PrimaryButton";
import Checklist from "@/components/Checklist";
import briefings from "@/data/briefing";
import mountains from "@/data/mountains";

type ChecklistItem = {
  name: string;
  checked: boolean;
};

export default function Home() {
  const [selectedMountain, setSelectedMountain] = useState(
    briefings[0].mountain
  );

  const [searchText, setSearchText] = useState("");

  const selectedBriefing =
    briefings.find((item) => item.mountain === selectedMountain) ??
    briefings[0];

  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    selectedBriefing.checklist
  );

  const filteredMountains = mountains.filter((mountain) =>
    mountain.name.includes(searchText.trim())
  );

  const completedCount = checklist.filter(
    (item) => item.checked
  ).length;

  const progress =
    checklist.length === 0
      ? 0
      : Math.round((completedCount / checklist.length) * 100);

  const isReady = completedCount === checklist.length;

  const toggleItem = (itemName: string) => {
    setChecklist((prev) =>
      prev.map((current) =>
        current.name === itemName
          ? {
              ...current,
              checked: !current.checked,
            }
          : current
      )
    );
  };

  const changeMountain = (mountain: string) => {
    const newBriefing = briefings.find(
      (item) => item.mountain === mountain
    );

    if (!newBriefing) return;

    setSelectedMountain(mountain);
    setChecklist(newBriefing.checklist);
    setSearchText("");
  };

  return (
    <main className="mx-auto min-h-screen max-w-md bg-stone-50 p-5">
      <Header />

      <SectionCard title="🏔 내일 산행">

        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="산 이름 검색"
          className="mb-3 w-full rounded-xl border border-gray-300 bg-white p-3"
        />

        {searchText && (
          <div className="mb-4 rounded-xl border border-gray-200 bg-white p-2">
            {filteredMountains.length > 0 ? (
              filteredMountains.map((mountain) => (
                <button
                  key={mountain.id}
                  onClick={() => changeMountain(mountain.name)}
                  className="flex w-full items-center justify-between rounded-lg p-3 text-left hover:bg-gray-100"
                >
                  <span className="font-semibold">
                    {mountain.name}
                  </span>

                  <span className="text-sm text-gray-500">
                    {mountain.region} · {mountain.height}m
                  </span>
                </button>
              ))
            ) : (
              <p className="p-3 text-sm text-gray-500">
                검색 결과가 없습니다.
              </p>
            )}
          </div>
        )}

        <select
          value={selectedMountain}
          onChange={(e) => changeMountain(e.target.value)}
          className="mb-3 w-full rounded-xl border border-gray-300 bg-white p-3 font-semibold"
        >
          {mountains.map((mountain) => (
            <option key={mountain.id} value={mountain.name}>
              {mountain.name}
            </option>
          ))}
        </select>

        <h3 className="text-2xl font-bold">
          {selectedBriefing.mountain}
        </h3>

        <p className="text-gray-500">
          {selectedBriefing.date}
        </p>

        <p className="font-semibold text-green-700">
          {selectedBriefing.dday}
        </p>
      </SectionCard>

      <SectionCard title="🌤 날씨">
        <p className="text-3xl font-bold">
          {selectedBriefing.weather.temp}
        </p>

        <p>
          강수확률 {selectedBriefing.weather.rain}
        </p>

        <p>
          {selectedBriefing.weather.rating}
        </p>

        <p className="font-semibold text-green-700">
          {selectedBriefing.weather.status}
        </p>
      </SectionCard>

      <SectionCard title="🥾 AI 추천 코스">
        <p className="font-bold">
          {selectedBriefing.course.name}
        </p>

        <p>
          {selectedBriefing.course.duration}
        </p>

        <InfoRow
          label="거리"
          value={selectedBriefing.course.distance}
        />

        <InfoRow
          label="고도"
          value={selectedBriefing.course.elevation}
        />

        <InfoRow
          label="난이도"
          value={selectedBriefing.course.difficulty}
        />

        <div className="mt-4 flex gap-2">
          <button className="rounded-xl bg-gray-100 px-4 py-2 transition hover:bg-gray-200">
            지도 보기
          </button>

          <button className="rounded-xl bg-gray-100 px-4 py-2 transition hover:bg-gray-200">
            다른 코스
          </button>
        </div>
      </SectionCard>

      <SectionCard title="🚗 이동">
        <p>
          🚗 {selectedBriefing.transport.car}
        </p>

        <p className="mt-2">
          🚇 {selectedBriefing.transport.transit}
        </p>
      </SectionCard>

      <SectionCard title="🎒 준비물">
        <Checklist
          items={checklist}
          onToggle={toggleItem}
          completedCount={completedCount}
          progress={progress}
        />
      </SectionCard>

      <PrimaryButton
        text={
          isReady
            ? "출발 준비 완료"
            : "준비가 아직 남았습니다"
        }
        disabled={!isReady}
      />
    </main>
  );
}