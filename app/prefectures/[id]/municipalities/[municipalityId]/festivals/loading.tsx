import LoadingState from "@/components/LoadingState";

export default function MunicipalityFestivalsLoading() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <LoadingState message="この地域のお祭りを読み込み中です..." />
    </main>
  );
}

