import type { MountainStatus } from "@/data/mountains";

const STORAGE_KEY = "summit100-status-map";

type StatusMap = Record<string, MountainStatus>;

function canUseStorage() {
  return typeof window !== "undefined";
}

export function readMountainStatusMap(): StatusMap {
  if (!canUseStorage()) return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw) as Partial<StatusMap>;
    const result: StatusMap = {};

    for (const [name, status] of Object.entries(parsed)) {
      if (status === "완료" || status === "미등반" || status === "계획중") {
        result[name] = status;
      }
    }

    return result;
  } catch {
    return {};
  }
}

export function saveMountainStatus(name: string, status: MountainStatus) {
  if (!canUseStorage()) return;

  const current = readMountainStatusMap();
  current[name] = status;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}