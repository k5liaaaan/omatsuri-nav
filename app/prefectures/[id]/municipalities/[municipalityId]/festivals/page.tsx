import Link from "next/link";
import { getPublicFestivals, getMunicipalitiesByPrefecture, getPrefectures } from "@/lib/api";
import BackButton from "@/components/BackButton";

export const revalidate = 60;

type Params = { id: string; municipalityId: string };

export default async function FestivalListPage({ params, searchParams }: { 
  params: Params; 
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const prefectureId = Number(params.id);
  const municipalityId = Number(params.municipalityId);
  const page = Number(searchParams?.page ?? 1);

  const [
    { festivals, pagination },
    { data: municipalities },
    { data: prefectures }
  ] = await Promise.all([
    getPublicFestivals({ municipalityId, page, orderBy: 'nearest', limit: 12 }),
    getMunicipalitiesByPrefecture(prefectureId),
    getPrefectures()
  ]);

  const prefecture = prefectures.find(p => p.id === prefectureId);
  const municipality = municipalities.find(m => m.id === municipalityId);

  if (!prefecture || !municipality) {
    return <div>地域が見つかりません</div>;
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <BackButton fallbackHref={`/prefectures/${prefectureId}/municipalities`} />
        <nav aria-label="パンくずリスト" className="flex items-center text-sm text-gray-600">
          <Link href="/" className="text-blue-600 hover:underline">トップ</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href={`/prefectures/${prefectureId}/municipalities`} className="text-blue-600 hover:underline">{prefecture.name}</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-500 line-clamp-1" title={`${prefecture.name}${municipality.name}`}>{municipality.name}</span>
        </nav>
      </div>

      <h1 className="text-2xl font-semibold">{municipality.name}のお祭り</h1>
      
      {festivals.length === 0 ? (
        <p className="text-gray-500">この地域のお祭りはまだ登録されていません。</p>
      ) : (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {festivals.map((festival) => (
              <li key={festival.id} className="border rounded-lg p-4 hover:shadow-sm transition">
                <h2 className="font-medium text-lg mb-1 line-clamp-2">{festival.name}</h2>
                <p className="text-sm text-gray-500 mb-2">
                  {festival.municipality.prefecture.name} / {festival.municipality.name}
                </p>
                {festival.schedules[0] && (
                  <p className="text-sm">{festival.schedules[0].date} {festival.schedules[0].startTime} - {festival.schedules[0].endTime}</p>
                )}
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{festival.content}</p>
                <div className="mt-3">
                  <Link href={`/festivals/${festival.id}`} className="text-blue-600 hover:underline">詳細を見る</Link>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center justify-between pt-4">
            <div className="text-sm text-gray-600">
              {pagination.totalCount}件中 {((pagination.currentPage - 1) * pagination.limit) + 1} - {Math.min(pagination.currentPage * pagination.limit, pagination.totalCount)} を表示
            </div>
            <div className="space-x-2">
              {pagination.hasPrevPage && (
                <Link href={`/prefectures/${prefectureId}/municipalities/${municipalityId}/festivals?page=${pagination.currentPage - 1}`} className="px-3 py-1 border rounded">前へ</Link>
              )}
              {pagination.hasNextPage && (
                <Link href={`/prefectures/${prefectureId}/municipalities/${municipalityId}/festivals?page=${pagination.currentPage + 1}`} className="px-3 py-1 border rounded">次へ</Link>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}




