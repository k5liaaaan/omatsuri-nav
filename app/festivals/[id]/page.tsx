import Link from 'next/link';
import { getPublicFestivalById } from '@/lib/api';
import BackButton from '@/components/BackButton';

export const revalidate = 60;

type Params = { id: string };

export default async function FestivalDetailPage({ params }: { params: Params }) {
  const id = Number(params.id);
  const festival = await getPublicFestivalById(id);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <BackButton fallbackHref="/festivals" />
        <nav aria-label="パンくずリスト" className="flex items-center text-sm text-gray-600">
          <Link href="/" className="text-blue-600 hover:underline">ホーム</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/festivals" className="text-blue-600 hover:underline">お祭り一覧</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-500 line-clamp-1" title={festival.name}>{festival.name}</span>
        </nav>
      </div>
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">{festival.name}</h1>
        <p className="text-sm text-gray-600">
          {festival.municipality.prefecture.name} / {festival.municipality.name} / {festival.address}
        </p>
      </header>

      <section>
        <h2 className="text-lg font-medium mb-2">開催日程</h2>
        <ul className="space-y-1">
          {festival.schedules.map(s => (
            <li key={s.id} className="text-sm">{s.date} {s.startTime} - {s.endTime}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-2">概要</h2>
        <p className="whitespace-pre-wrap leading-relaxed">{festival.content}</p>
      </section>

      <footer className="pt-6 border-t">
        <p className="text-xs text-gray-500 mb-2">掲載情報が正確でない場合があります。</p>
        <Link
          href="/terms"
          className="text-sm text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          利用規約・免責事項
        </Link>
      </footer>
    </main>
  );
}


