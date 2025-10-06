import { getPublicFestivalById } from '@/lib/api';

export const revalidate = 60;

type Params = { id: string };

export default async function FestivalDetailPage({ params }: { params: Params }) {
  const id = Number(params.id);
  const festival = await getPublicFestivalById(id);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">{festival.name}</h1>
        <p className="text-sm text-gray-600 mt-1">
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
    </main>
  );
}


