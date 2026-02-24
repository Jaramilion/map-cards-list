import type { MapTopics } from "@/types";

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
}

export function sanitizeData(data: MapTopics[]) {
  const seenIds = new Set();
  return data.map((item, index) => {
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id);
      return item;
    }
    return { ...item, id: `${item.id}${index}` };
  });
}
