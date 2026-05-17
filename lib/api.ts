import { API_BASE, YATE_CATEGORY_ID, type ApiResponse, type Yate } from "@/types/yate";

export async function fetchYates(): Promise<Yate[]> {
  try {
    const url = `${API_BASE}/collections/easc_businesses/records?filter=(category='${YATE_CATEGORY_ID}')&sort=-featured,-created&perPage=50`;
    const res = await fetch(url, {
      next: { revalidate: 300 }, // ISR: revalidate every 5 min
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data: ApiResponse = await res.json();
    return data.items;
  } catch (err) {
    console.error("fetchYates error:", err);
    return [];
  }
}

export async function fetchYateBySlug(slug: string): Promise<Yate | null> {
  try {
    const url = `${API_BASE}/collections/easc_businesses/records?filter=(slug='${slug}'%26%26category='${YATE_CATEGORY_ID}')`;
    const res = await fetch(url, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data: ApiResponse = await res.json();
    return data.items[0] ?? null;
  } catch (err) {
    console.error("fetchYateBySlug error:", err);
    return null;
  }
}
