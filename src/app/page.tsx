"use client";

import { useState } from "react";
import InfoRow from "@/components/InfoRow";
import Header from "@/components/Header";
import SectionCard from "@/components/SectionCard";
import PrimaryButton from "@/components/PrimaryButton";
import Checklist from "@/components/Checklist";
import briefings from "@/data/briefing";

type ChecklistItem = {
  name: string;
  checked: boolean;
};

export default function Home() {
  const [selectedMountain, setSelectedMountain] = useState(briefings[0].mountain);

  const selectedBriefing =
    briefings.find((item) => item.mountain === selectedMountain) ?? briefings[0];

  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    selectedBriefing.checklist
  );

  const completedCount = checklist.filter((item) => item.checked).length;

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
    setSelectedMountain(mountain);

    const newBriefing = briefings.find(
      (item) => item.mountain === mountain
    );

    if (newBriefing) {
      setChecklist(newBriefing.checklist);
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-md bg-stone-50 p-5">
      <Header />

      <SectionCard title="🏔 내일 산행">
        <select
          value={selectedMountain}
          onChange={(e) => changeMountain(e.target.value)}
          className="mb-3 w-full rounded-xl border border-gray-300 bg-white p-3 font-semibold"
        >
          {briefings.map((item) => (
            <option key={item.mountain} value={item.mountain}>
              {item.mountain}
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

        <p>강수확률 {selectedBriefing.weather.rain}</p>

        <p>{selectedBriefing.weather.rating}</p>

        <p className="font-semibold text-green-700">
          {selectedBriefing.weather.status}
        </p>
      </SectionCard>

      <SectionCard title="🥾 AI 추천 코스">
        <p className="font-bold">
          {selectedBriefing.course.name}
        </p>

        <p>{selectedBriefing.course.duration}</p>

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
        <p>🚗 {selectedBriefing.transport.car}</p>
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
        text={isReady ? "출발 준비 완료" : "준비가 아직 남았습니다"}
        disabled={!isReady}
      />
    </main>
  );
}