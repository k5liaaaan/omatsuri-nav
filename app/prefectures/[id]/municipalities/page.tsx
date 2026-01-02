import Link from "next/link";
import { getMunicipalitiesByPrefecture, getPrefectures } from "@/lib/api";
import BackButton from "@/components/BackButton";

export const revalidate = 60;

type Params = { id: string };

export default async function MunicipalityListPage({ params }: { params: Promise<Params> }) {
  const { id: idStr } = await params;
  const prefectureId = Number(idStr);
  
  const [{ data: municipalities }, { data: prefectures }] = await Promise.all([
    getMunicipalitiesByPrefecture(prefectureId),
    getPrefectures()
  ]);
  
  const prefecture = prefectures.find(p => p.id === prefectureId);
  if (!prefecture) {
    return <div>都道府県が見つかりません</div>;
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <BackButton />
        <nav aria-label="パンくずリスト" className="flex items-center text-sm text-gray-600">
          <Link href="/" className="text-blue-600 hover:underline">トップ</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-500">{prefecture.name}</span>
        </nav>
      </div>

      <h1 className="text-2xl font-semibold">{prefecture.name}の市区町村</h1>
      
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {municipalities.map((municipality) => (
            <Link
              key={municipality.id}
              href={`/prefectures/${prefectureId}/municipalities/${municipality.id}/festivals`}
              className="block p-4 border rounded hover:bg-gray-50 transition"
            >
              <h3 className="font-medium">{municipality.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
