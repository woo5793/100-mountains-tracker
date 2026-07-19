export default function StatsPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold">통계</h1>
        <p className="mb-8 text-slate-600">
          완료한 산 수와 최근 등반 흐름을 보는 화면입니다.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">총 완료</p>
            <p className="mt-2 text-3xl font-bold">18개</p>
          </div>
 
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">이번 달 등반</p>
            <p className="mt-2 text-3xl font-bold">3회</p>
          </div>
 
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">완료율</p>
            <p className="mt-2 text-3xl font-bold">18%</p>
          </div>
        </div>
      </div>
    </main>
  );
}