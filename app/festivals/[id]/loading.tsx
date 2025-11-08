import LoadingState from "@/components/LoadingState";

export default function FestivalDetailLoading() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <LoadingState message="お祭りの詳細を読み込み中です..." />
    </main>
  );
}

