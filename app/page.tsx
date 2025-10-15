import Link from "next/link";
import { getPrefectures } from "@/lib/api";

export const revalidate = 60;

export default async function Home() {
  const { data: prefectures } = await getPrefectures();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">お祭りナビ</h1>
      <p className="text-gray-600">地域からお祭りを探そう。</p>
      
      <section>
        <h2 className="text-lg font-medium mb-4">都道府県を選択</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {prefectures.map((prefecture) => (
            <Link
              key={prefecture.id}
              href={`/prefectures/${prefecture.id}/municipalities`}
              className="block p-3 text-center border rounded hover:bg-gray-50 transition"
            >
              {prefecture.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
