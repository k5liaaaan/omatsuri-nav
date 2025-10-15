import Link from "next/link";
import { getMunicipalitiesByPrefecture, getPrefectures } from "@/lib/api";

export const revalidate = 60;

type Params = { id: string };

export default async function MunicipalityListPage({ params }: { params: Params }) {
  const prefectureId = Number(params.id);
  
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
      <nav className="text-sm text-gray-500">
        <Link href="/" className="hover:underline">トップ</Link> &gt; {prefecture.name}
      </nav>
      
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
