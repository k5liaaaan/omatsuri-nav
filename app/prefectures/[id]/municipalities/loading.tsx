import LoadingState from "@/components/LoadingState";

export default function MunicipalitiesLoading() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <LoadingState message="市区町村を読み込み中です..." />
    </main>
  );
}

