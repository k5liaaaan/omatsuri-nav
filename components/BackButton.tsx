'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

type BackButtonProps = {
  className?: string;
  label?: string;
  fallbackHref?: string;
};

export default function BackButton({
  className,
  label = '前に戻る',
  fallbackHref = '/',
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  }, [fallbackHref, router]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-100 ${className ?? ''}`}
    >
      <span aria-hidden="true">←</span>
      <span>{label}</span>
    </button>
  );
}

