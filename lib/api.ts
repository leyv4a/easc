import { API_BASE, YATE_CATEGORY_ID, type ApiResponse, type Yate } from "@/types/yate";
import { TOUR_CATEGORY_ID, type Tour, type ToursApiResponse } from "@/types/tour";
import { HOSPEDAJE_CATEGORY_ID, type Hospedaje, type HospedajeApiResponse } from "@/types/hospedaje";

export async function fetchYates(): Promise<Yate[]> {
  try {
    const url = `${API_BASE}/collections/easc_businesses/records?filter=(category='${YATE_CATEGORY_ID}')&sort=-featured,-created&perPage=50`;
    const res = await fetch(url, { next: { revalidate: 300 } });
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
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data: ApiResponse = await res.json();
    return data.items[0] ?? null;
  } catch (err) {
    console.error("fetchYateBySlug error:", err);
    return null;
  }
}

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

export async function fetchHospedajes(): Promise<Hospedaje[]> {
  try {
    const url = `${API_BASE}/collections/easc_businesses/records?filter=(category='${HOSPEDAJE_CATEGORY_ID}')&sort=-featured,-created&perPage=50`;
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data: HospedajeApiResponse = await res.json();
    return data.items;
  } catch (err) {
    console.error("fetchHospedajes error:", err);
    return [];
  }
}

export async function fetchHospedajeBySlug(slug: string): Promise<Hospedaje | null> {
  try {
    const url = `${API_BASE}/collections/easc_businesses/records?filter=(slug='${slug}'%26%26category='${HOSPEDAJE_CATEGORY_ID}')`;
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data: HospedajeApiResponse = await res.json();
    return data.items[0] ?? null;
  } catch (err) {
    console.error("fetchHospedajeBySlug error:", err);
    return null;
  }
}