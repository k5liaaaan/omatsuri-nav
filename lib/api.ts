export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type Prefecture = {
  id: number;
  code: string;
  name: string;
};

export type Municipality = {
  id: number;
  code: string;
  name: string;
  prefecture: Prefecture;
};

export type FestivalSchedule = {
  id: number;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
};

export type Festival = {
  id: number;
  name: string;
  municipality: Municipality;
  address: string;
  content: string;
  organizer?: { id: number; username: string };
  schedules: FestivalSchedule[];
  createdAt: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

async function fetchJson<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(input, { ...init, next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }
  return res.json();
}

export async function getPrefectures(): Promise<{ success: boolean; data: Prefecture[] }> {
  return fetchJson(`${API_BASE}/api/region/prefectures`);
}

export async function getMunicipalitiesByPrefecture(prefectureId: number): Promise<{ success: boolean; data: Municipality[] }> {
  return fetchJson(`${API_BASE}/api/region/prefectures/${prefectureId}/municipalities`);
}

export async function getPublicFestivals(params: {
  prefectureId?: number;
  municipalityId?: number;
  month?: string; // YYYY-MM
  orderBy?: 'nearest' | 'newest';
  page?: number;
  limit?: number;
}): Promise<{ festivals: Festival[]; pagination: Pagination }> {
  const query = new URLSearchParams();
  if (params.prefectureId) query.set('prefectureId', String(params.prefectureId));
  if (params.municipalityId) query.set('municipalityId', String(params.municipalityId));
  if (params.month) query.set('month', params.month);
  if (params.orderBy) query.set('orderBy', params.orderBy);
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  const qs = query.toString();
  return fetchJson(`${API_BASE}/api/public/festivals${qs ? `?${qs}` : ''}`);
}

export async function getPublicFestivalById(id: number): Promise<Festival> {
  return fetchJson(`${API_BASE}/api/public/festivals/${id}`);
}


