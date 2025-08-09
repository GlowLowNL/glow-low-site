"use client";
import { ReactQueryProvider } from '@/lib/query-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
