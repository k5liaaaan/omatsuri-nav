import LoadingState from "@/components/LoadingState";

export default function FestivalsLoading() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <LoadingState message="お祭り一覧を読み込み中です..." />
    </main>
  );
}

