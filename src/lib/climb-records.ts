export type ClimbFeeling = "좋음" | "보통" | "힘듦";

export type ClimbRecord = {
  id: string;
  mountainName: string;
  trailName: string;
  date: string;
  memo: string;
  feeling: ClimbFeeling;
  createdAt: string;
};

const STORAGE_KEY = "summit100-climb-records";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function readClimbRecords(): ClimbRecord[] {
  if (!canUseStorage()) return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is ClimbRecord => {
      return (
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "mountainName" in item &&
        "trailName" in item &&
        "date" in item &&
        "memo" in item &&
        "feeling" in item &&
        "createdAt" in item
      );
    });
  } catch {
    return [];
  }
}

export function saveClimbRecord(
  record: Omit<ClimbRecord, "id" | "createdAt">
): ClimbRecord | null {
  if (!canUseStorage()) return null;

  const current = readClimbRecords();
  const nextRecord: ClimbRecord = {
    ...record,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  const next = [nextRecord, ...current];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return nextRecord;
}

export function deleteClimbRecord(id: string) {
  if (!canUseStorage()) return;

  const current = readClimbRecords();
  const next = current.filter((record) => record.id !== id);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}