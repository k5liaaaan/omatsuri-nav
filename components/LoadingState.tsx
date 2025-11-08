type LoadingStateProps = {
  message?: string;
};

export default function LoadingState({ message = "読み込み中です..." }: LoadingStateProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-gray-600">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"
        role="status"
        aria-label={message}
      />
      <p className="text-sm">{message}</p>
    </div>
  );
}

