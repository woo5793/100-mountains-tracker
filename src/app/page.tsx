"use client";

import { useEffect, useState } from "react";
import InfoRow from "@/components/InfoRow";
import Header from "@/components/Header";
import SectionCard from "@/components/SectionCard";
import PrimaryButton from "@/components/PrimaryButton";
import Checklist from "@/components/Checklist";
import briefings from "@/data/briefing";
import mountains, { MountainRegion } from "@/data/mountains";

type ChecklistItem = {
  name: string;
  checked: boolean;
};

type RegionFilter = "전체" | MountainRegion;

type SavedPlan = {
  mountainId: string;
  hikingDate: string;
  checklist: ChecklistItem[];
};

type HikingPlan = SavedPlan & {
  id: string;
  createdAt: string;
};

const STORAGE_KEY = "summit100-hiking-plan";
const PLANS_STORAGE_KEY = "summit100-hiking-plans";

const defaultChecklist: ChecklistItem[] = [
  { name: "물", checked: false },
  { name: "등산스틱", checked: false },
  { name: "간식", checked: false },
  { name: "바람막이", checked: false },
];

const regionOptions: RegionFilter[] = [
  "전체",
  "서울·경기",
  "강원",
  "충청",
  "전라",
  "경상",
  "제주",
];

const formatDate = (dateString: string) => {
  if (!dateString) return "날짜를 선택해 주세요";

  const [year, month, day] = dateString.split("-");

  return `${year}.${month}.${day}`;
};

const calculateDday = (dateString: string) => {
  if (!dateString) return "";

  const [year, month, day] = dateString
    .split("-")
    .map(Number);

  const hikingDate = new Date(
    year,
    month - 1,
    day
  );

  const today = new Date();

  hikingDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const difference =
    hikingDate.getTime() - today.getTime();

  const days = Math.round(
    difference / (1000 * 60 * 60 * 24)
  );

  if (days === 0) {
    return "D-Day";
  }

  if (days > 0) {
    return `D-${days}`;
  }

  return `D+${Math.abs(days)}`;
};

export default function Home() {
  const [selectedMountainId, setSelectedMountainId] =
    useState("seoraksan");

  const [searchText, setSearchText] = useState("");

  const [selectedRegion, setSelectedRegion] =
    useState<RegionFilter>("전체");

  const [hikingDate, setHikingDate] = useState("");

  const [storageLoaded, setStorageLoaded] =
    useState(false);

  const [savedPlans, setSavedPlans] =
    useState<HikingPlan[]>([]); 

  const initialBriefing =
    briefings.find(
      (item) => item.mountainId === "seoraksan"
    ) ?? briefings[0];

  const [checklist, setChecklist] =
    useState<ChecklistItem[]>(
      initialBriefing.checklist
    );

  /*
   * 앱을 처음 열 때
   * 브라우저에 저장된 산행 계획 불러오기
   */
  useEffect(() => {
    try {
      const savedData =
        localStorage.getItem(STORAGE_KEY);

      if (savedData) {
        const savedPlan: SavedPlan =
          JSON.parse(savedData);

        const mountainExists = mountains.some(
          (mountain) =>
            mountain.id === savedPlan.mountainId
        );

        if (mountainExists) {
          setSelectedMountainId(
            savedPlan.mountainId
          );
        
          if (
            Array.isArray(savedPlan.checklist) &&
            savedPlan.checklist.length > 0
          ) {
            setChecklist(
              savedPlan.checklist.map((item) => ({
                ...item,
              }))
            );
          } else {
            const savedBriefing =
              briefings.find(
                (item) =>
                  item.mountainId ===
                  savedPlan.mountainId
              );
        
            if (savedBriefing) {
              setChecklist(
                savedBriefing.checklist.map(
                  (item) => ({ ...item })
                )
              );
            } else {
              setChecklist(
                defaultChecklist.map(
                  (item) => ({ ...item })
                )
              );
            }
          }
        }

        if (savedPlan.hikingDate) {
          setHikingDate(
            savedPlan.hikingDate
          );
        }
      }
    } catch (error) {
      console.error(
        "저장된 산행 계획을 불러오지 못했습니다.",
        error
      );
    }

    setStorageLoaded(true);
  }, []);

  /*
   * 산이나 날짜가 변경되면
   * 브라우저에 자동 저장
   */
  useEffect(() => {
    if (!storageLoaded) return;

    const planToSave: SavedPlan = {
      mountainId: selectedMountainId,
      hikingDate,
      checklist,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(planToSave)
    );
  }, [
    selectedMountainId,
    hikingDate,
    checklist,
    storageLoaded,
  ]);

  useEffect(() => {
    try {
      const savedData =
        localStorage.getItem(PLANS_STORAGE_KEY);
  
      if (savedData) {
        const parsedPlans = JSON.parse(savedData);
  
        if (Array.isArray(parsedPlans)) {
          setSavedPlans(parsedPlans);
        }
      }
    } catch (error) {
      console.error(
        "산행 계획 목록을 불러오지 못했습니다.",
        error
      );
    }
  }, []);

  const saveCurrentPlan = () => {
    if (!hikingDate) {
      alert("산행 날짜를 먼저 선택해 주세요.");
      return;
    }
  
    const newPlan: HikingPlan = {
      id: `${selectedMountainId}-${hikingDate}`,
      mountainId: selectedMountainId,
      hikingDate,
      checklist: checklist.map((item) => ({
        ...item,
      })),
      createdAt: new Date().toISOString(),
    };
  
    const nextPlans = [
      ...savedPlans.filter(
        (plan) => plan.id !== newPlan.id
      ),
      newPlan,
    ].sort((a, b) =>
      a.hikingDate.localeCompare(b.hikingDate)
    );
  
    setSavedPlans(nextPlans);
  
    localStorage.setItem(
      PLANS_STORAGE_KEY,
      JSON.stringify(nextPlans)
    );
  };
  
    const loadPlan = (plan: HikingPlan) => {
      setSelectedMountainId(plan.mountainId);
      setHikingDate(plan.hikingDate);
  
      setChecklist(
        plan.checklist.map((item) => ({
          ...item,
        }))
      );
  
      setSearchText("");
      setSelectedRegion("전체");
    };
  
    const deletePlan = (planId: string) => {
      const confirmed = window.confirm(
        "이 산행 계획을 삭제하시겠습니까?"
      );
  
      if (!confirmed) return;
  
      const nextPlans = savedPlans.filter(
        (plan) => plan.id !== planId
      );
  
      setSavedPlans(nextPlans);
  
      localStorage.setItem(
        PLANS_STORAGE_KEY,
        JSON.stringify(nextPlans)
      );
    };
  
  const selectedMountainInfo =
    mountains.find(
      (mountain) =>
        mountain.id === selectedMountainId
    ) ??
    mountains.find(
      (mountain) =>
        mountain.id === "seoraksan"
    )!;

  const existingBriefing =
    briefings.find(
      (item) =>
        item.mountainId === selectedMountainId
    );

  const selectedBriefing =
    existingBriefing ?? {
      mountainId: selectedMountainId,
      mountain: selectedMountainInfo.name,
      date: "날짜를 선택해 주세요",
      dday: "",

      weather: {
        temp: "-",
        rain: "-",
        rating: "",
        status: "날씨 정보 준비 중",
      },

      course: {
        name: "추천 코스 준비 중",
        duration: "-",
        distance: "-",
        elevation: "-",
        difficulty: "-",
      },

      transport: {
        car: "이동정보 준비 중",
        transit: "대중교통 정보 준비 중",
      },

      checklist: defaultChecklist,
    };

  const formattedHikingDate =
    formatDate(hikingDate);

  const dday =
    calculateDday(hikingDate);

  const filteredMountains =
    mountains.filter((mountain) => {
      const matchesSearch =
        mountain.name.includes(
          searchText.trim()
        );

      const matchesRegion =
        selectedRegion === "전체" ||
        mountain.regions.includes(
          selectedRegion
        );

      return matchesSearch && matchesRegion;
    });

  const showMountainList =
    searchText.trim() !== "" ||
    selectedRegion !== "전체";

  const completedCount =
    checklist.filter(
      (item) => item.checked
    ).length;

  const progress =
    checklist.length === 0
      ? 0
      : Math.round(
          (completedCount /
            checklist.length) *
            100
        );

  const isReady =
    checklist.length > 0 &&
    completedCount === checklist.length;

  const toggleItem = (
    itemName: string
  ) => {
    setChecklist((prev) =>
      prev.map((current) =>
        current.name === itemName
          ? {
              ...current,
              checked:
                !current.checked,
            }
          : current
      )
    );
  };

  const changeMountain = (
    mountainId: string
  ) => {
    setSelectedMountainId(mountainId);
    setSearchText("");

    const newBriefing =
      briefings.find(
        (item) =>
          item.mountainId === mountainId
      );

    if (newBriefing) {
      setChecklist(
        newBriefing.checklist.map(
          (item) => ({
            ...item,
          })
        )
      );
    } else {
      setChecklist(
        defaultChecklist.map(
          (item) => ({
            ...item,
          })
        )
      );
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-md bg-stone-50 p-5">
      <Header />

      <SectionCard title="🏔 산 선택">
        <input
          type="text"
          value={searchText}
          onChange={(e) =>
            setSearchText(e.target.value)
          }
          placeholder="산 이름 검색"
          className="mb-3 w-full rounded-xl border border-gray-300 bg-white p-3"
        />

        <div className="mb-4 flex flex-wrap gap-2">
          {regionOptions.map((region) => (
            <button
              key={region}
              onClick={() =>
                setSelectedRegion(region)
              }
              className={
                selectedRegion === region
                  ? "rounded-full bg-green-700 px-3 py-2 text-sm font-semibold text-white"
                  : "rounded-full bg-gray-100 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
              }
            >
              {region}
            </button>
          ))}
        </div>

        {showMountainList && (
          <div className="mb-4 rounded-xl border border-gray-200 bg-white p-2">
            <p className="px-3 py-2 text-sm text-gray-500">
              검색 결과{" "}
              {filteredMountains.length}개
            </p>

            {filteredMountains.length >
            0 ? (
              filteredMountains.map(
                (mountain) => (
                  <button
                    key={mountain.id}
                    onClick={() =>
                      changeMountain(
                        mountain.id
                      )
                    }
                    className="flex w-full items-center justify-between rounded-lg p-3 text-left hover:bg-gray-100"
                  >
                    <div>
                      <p className="font-semibold">
                        {mountain.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {
                          mountain.location
                        }
                      </p>
                    </div>

                    <span className="text-sm text-gray-500">
                      {mountain.height.toLocaleString()}
                      m
                    </span>
                  </button>
                )
              )
            ) : (
              <p className="p-3 text-sm text-gray-500">
                검색 결과가 없습니다.
              </p>
            )}
          </div>
        )}

        <div className="rounded-xl bg-green-50 p-4">
          <p className="text-xs font-semibold text-green-700">
            선택한 산
          </p>

          <h3 className="mt-1 text-2xl font-bold">
            {selectedMountainInfo.name}
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            {selectedMountainInfo.location}
          </p>

          <p className="text-sm text-gray-600">
            해발{" "}
            {selectedMountainInfo.height.toLocaleString()}
            m
          </p>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              📅 산행 날짜
            </label>

            <input
              type="date"
              value={hikingDate}
              onChange={(e) =>
                setHikingDate(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 bg-white p-3"
            />
          </div>

          <p className="mt-3 text-gray-500">
            {formattedHikingDate}
          </p>

          {dday && (
            <p className="font-semibold text-green-700">
              {dday}
            </p>
          )}

          <button
            onClick={saveCurrentPlan}
            disabled={!hikingDate}
            className="mt-4 w-full rounded-xl bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            산행 계획 저장
          </button>
        
        </div>
      </SectionCard>
      
      <SectionCard title="📋 내 산행 계획">
        {savedPlans.length === 0 ? (
          <p className="text-sm text-gray-500">
            저장된 산행 계획이 없습니다.
          </p>
        ) : (
          <div className="space-y-3">
            {savedPlans.map((plan) => {
              const mountain = mountains.find(
                (item) =>
                  item.id === plan.mountainId
              );

        return (
        <div
          key={plan.id}
          className="rounded-xl border border-gray-200 bg-white p-4"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="font-bold">
                {mountain?.name ?? plan.mountainId}
              </p>

              <p className="text-sm text-gray-500">
                {formatDate(plan.hikingDate)}
              </p>

              {mountain && (
                <p className="mt-1 text-xs text-gray-400">
                  {mountain.location}
                </p>
              )}
            </div>

            <span className="font-semibold text-green-700">
              {calculateDday(plan.hikingDate)}
            </span>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => loadPlan(plan)}
              className="flex-1 rounded-lg bg-green-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
            >
              불러오기
            </button>

            <button
              onClick={() => deletePlan(plan.id)}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-200"
            >
              삭제
            </button>
          </div>
        </div>
        );
      })}
    </div>
  )}
</SectionCard>

      <SectionCard title="🌤 날씨">
        <p className="text-3xl font-bold">
          {selectedBriefing.weather.temp}
        </p>

        <p>
          강수확률{" "}
          {selectedBriefing.weather.rain}
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
          value={
            selectedBriefing.course.distance
          }
        />

        <InfoRow
          label="고도"
          value={
            selectedBriefing.course.elevation
          }
        />

        <InfoRow
          label="난이도"
          value={
            selectedBriefing.course.difficulty
          }
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
          🚗{" "}
          {selectedBriefing.transport.car}
        </p>

        <p className="mt-2">
          🚇{" "}
          {
            selectedBriefing.transport
              .transit
          }
        </p>
      </SectionCard>

      <SectionCard title="🎒 준비물">
        <Checklist
          items={checklist}
          onToggle={toggleItem}
          completedCount={
            completedCount
          }
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