import Link from 'next/link';
import { getPublicFestivals } from '@/lib/api';

export const revalidate = 60;

export default async function FestivalListPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const page = Number(searchParams?.page ?? 1);
  const prefectureId = searchParams?.prefectureId ? Number(searchParams.prefectureId) : undefined;
  const municipalityId = searchParams?.municipalityId ? Number(searchParams.municipalityId) : undefined;
  const month = typeof searchParams?.month === 'string' ? searchParams.month : undefined;

  const { festivals, pagination } = await getPublicFestivals({ page, prefectureId, municipalityId, month, orderBy: 'nearest', limit: 12 });

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">お祭り一覧</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {festivals.map((f) => (
          <li key={f.id} className="border rounded-lg p-4 hover:shadow-sm transition">
            <h2 className="font-medium text-lg mb-1 line-clamp-2">{f.name}</h2>
            <p className="text-sm text-gray-500 mb-2">
              {f.municipality.prefecture.name} / {f.municipality.name}
            </p>
            {f.schedules[0] && (
              <p className="text-sm">{f.schedules[0].date} {f.schedules[0].startTime} - {f.schedules[0].endTime}</p>
            )}
            <p className="text-sm text-gray-600 mt-2 line-clamp-3">{f.content}</p>
            <div className="mt-3">
              <Link href={`/festivals/${f.id}`} className="text-blue-600 hover:underline">詳細を見る</Link>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between pt-4">
        <div className="text-sm text-gray-600">{pagination.totalCount}件中 {((pagination.currentPage - 1) * pagination.limit) + 1} - {Math.min(pagination.currentPage * pagination.limit, pagination.totalCount)} を表示</div>
        <div className="space-x-2">
          {pagination.hasPrevPage && (
            <Link href={`/festivals?page=${pagination.currentPage - 1}`} className="px-3 py-1 border rounded">前へ</Link>
          )}
          {pagination.hasNextPage && (
            <Link href={`/festivals?page=${pagination.currentPage + 1}`} className="px-3 py-1 border rounded">次へ</Link>
          )}
        </div>
      </div>
    </main>
  );
}


