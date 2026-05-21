import { API_BASE, YATE_CATEGORY_ID, type ApiResponse, type Yate } from "@/types/yate";
import { TOUR_CATEGORY_ID, type Tour, type ToursApiResponse } from "@/types/tour";

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

//  const url = `${API_BASE}/collections/easc_businesses/records?filter=(category='${YATE_CATEGORY_ID}')&sort=-featured,-created&perPage=50`;

export async function fetchTours(): Promise<Tour[]> {
  try {
    const url = `${API_BASE}/collections/easc_businesses/records?filter=(category='${TOUR_CATEGORY_ID}')&sort=-featured,-created&perPage=50`;
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data: ToursApiResponse = await res.json();
    return data.items;
  } catch (err) {
    console.error("fetchTours error:", err);
    return [];
  }
}

export async function fetchTourBySlug(slug: string): Promise<Tour | null> {
  try {
    const url = `${API_BASE}/collections/easc_businesses/records?filter=(slug='${slug}'%26%26category='${TOUR_CATEGORY_ID}')`;
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data: ToursApiResponse = await res.json();
    return data.items[0] ?? null;
  } catch (err) {
    console.error("fetchTourBySlug error:", err);
    return null;
  }
}
