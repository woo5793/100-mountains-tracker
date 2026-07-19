import Header from "@/components/Header";
import SectionCard from "@/components/SectionCard";
import PrimaryButton from "@/components/PrimaryButton";

export default function Home() {
  return (
    <main className="max-w-md mx-auto p-5 bg-stone-50 min-h-screen">

      <Header />

      <SectionCard title="🏔 내일 산행">
        <h3 className="text-2xl font-bold">
          설악산
        </h3>

        <p className="text-gray-500">
          2026.08.09 (토)
        </p>

        <p className="font-semibold text-green-700">
          D-1
        </p>
      </SectionCard>

      <SectionCard title="🌤 날씨">
        <p className="text-3xl font-bold">
          18℃
        </p>

        <p>강수확률 10%</p>

        <p>★★★★☆</p>

        <p className="text-green-700 font-semibold">
          산행 적합
        </p>
      </SectionCard>

      <SectionCard title="🥾 AI 추천 코스">
        <p className="font-bold">
          오색 → 대청봉
        </p>

        <p>6시간 20분</p>

        <div className="flex gap-2 mt-4">
          <button className="px-4 py-2 bg-gray-100 rounded-xl">
            지도 보기
          </button>

          <button className="px-4 py-2 bg-gray-100 rounded-xl">
            다른 코스
          </button>
        </div>
      </SectionCard>

      <SectionCard title="🚗 이동">
        <p>🚗 자동차 2시간 40분</p>
        <p className="mt-2">
          🚇 대중교통 보기
        </p>
      </SectionCard>

      <SectionCard title="🎒 준비물">
        <ul className="space-y-2">
          <li>☑ 물</li>
          <li>☑ 등산스틱</li>
          <li>☑ 헤드랜턴</li>
          <li>☑ 바람막이</li>
        </ul>
      </SectionCard>

      <PrimaryButton text="출발 준비 완료" />

    </main>
  );
}