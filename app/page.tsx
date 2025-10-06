import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">お祭りナビ</h1>
      <p className="text-gray-600">近場や今週末に行けるお祭りを探そう。</p>
      <div>
        <Link href="/festivals" className="inline-block px-4 py-2 bg-black text-white rounded">
          お祭りを探す
        </Link>
      </div>
    </main>
  );
}
