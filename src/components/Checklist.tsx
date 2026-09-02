"use client";

type ChecklistItem = {
  name: string;
  checked: boolean;
};

type ChecklistProps = {
  items: ChecklistItem[];
  onToggle: (itemName: string) => void;
  completedCount: number;
  progress: number;
};

export default function Checklist({
  items,
  onToggle,
  completedCount,
  progress,
}: ChecklistProps) {
  const isComplete = progress === 100;

  return (
    <div>
      <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-2 flex items-center justify-between text-sm text-gray-500">
          <span>준비 진행률</span>
          <span className="font-semibold text-green-700">{progress}%</span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full transition-all ${
              isComplete ? "bg-green-700" : "bg-emerald-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-green-700">
            준비 완료 : {completedCount} / {items.length}
          </p>

          {isComplete && (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              모두 준비 완료
            </span>
          )}
        </div>
      </div>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.name}>
            <button
              type="button"
              onClick={() => onToggle(item.name)}
              className="
                w-full rounded-2xl bg-white px-4 py-3 text-left
                shadow-sm transition
                hover:bg-green-50 hover:shadow
              "
            >
              {item.checked ? "☑" : "☐"} {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}