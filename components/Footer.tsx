import Link from "next/link";

const rawAdminUrl = process.env.NEXT_PUBLIC_OMATSURI_ADMIN_URL;
const adminUrl =
  rawAdminUrl && rawAdminUrl.trim().length > 0
    ? rawAdminUrl
    : process.env.NODE_ENV === "development"
      ? "http://localhost:5173/"
      : undefined;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
        <span>© {currentYear} お祭りナビ</span>
        <nav className="flex flex-wrap items-center gap-4">
          <Link href="/" className="hover:text-blue-600 hover:underline">
            TOP
          </Link>
          <Link href="/terms" className="hover:text-blue-600 hover:underline">
            利用規約・免責事項
          </Link>
          {adminUrl ? (
            <a
              href={adminUrl}
              className="hover:text-blue-600 hover:underline"
              target={adminUrl.startsWith("http") ? "_blank" : undefined}
              rel={adminUrl.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              掲載ご希望の方
            </a>
          ) : (
            <span className="cursor-not-allowed text-gray-400" aria-disabled="true" title="URL が未設定です">
              掲載ご希望の方
            </span>
          )}
        </nav>
      </div>
    </footer>
  );
}

