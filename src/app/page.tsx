"use client";

import { useState } from "react";
import InfoRow from "@/components/InfoRow";
import Header from "@/components/Header";
import SectionCard from "@/components/SectionCard";
import PrimaryButton from "@/components/PrimaryButton";
import Checklist from "@/components/Checklist";
import briefing from "@/data/briefing";

type ChecklistItem = {
  name: string;
  checked: boolean;
};

export default function Home() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    briefing.checklist
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

  return (
    <main className="mx-auto min-h-screen max-w-md bg-stone-50 p-5">
      <Header />

      <SectionCard title="🏔 내일 산행">
        <h3 className="text-2xl font-bold">{briefing.mountain}</h3>
        <p className="text-gray-500">{briefing.date}</p>
        <p className="font-semibold text-green-700">{briefing.dday}</p>
      </SectionCard>

      <SectionCard title="🌤 날씨">
        <p className="text-3xl font-bold">{briefing.weather.temp}</p>
        <p>{briefing.weather.rain}</p>
        <p>{briefing.weather.rating}</p>
        <p className="font-semibold text-green-700">
          {briefing.weather.status}
        </p>
      </SectionCard>

      <SectionCard title="🥾 AI 추천 코스">
        <p className="font-bold">{briefing.course.name}</p>
        <p>{briefing.course.duration}</p>

        <InfoRow label="거리" value={briefing.course.distance} />
        <InfoRow label="고도" value={briefing.course.elevation} />
        <InfoRow label="난이도" value={briefing.course.difficulty} />

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
        <p>🚗 {briefing.transport.car}</p>
        <p className="mt-2">🚇 대중교통 보기</p>
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