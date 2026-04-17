import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Link = { title: string; href: string };

export function GuideNav({ prev, next }: { prev?: Link; next?: Link }) {
  if (!prev && !next) return null;

  return (
    <nav className="mt-12 pt-6 border-t border-[#EBEBEB] flex items-stretch gap-3">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex-1 flex flex-col gap-1 px-4 py-3 rounded-lg border border-[#EBEBEB] hover:border-[#C7C7C7] hover:bg-[#FAFAFA] transition-colors"
        >
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#86868b]">
            <ArrowLeft size={11} />
            Previous
          </span>
          <span className="text-[13px] font-medium text-[#1d1d1f] truncate">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex-1 flex flex-col gap-1 px-4 py-3 rounded-lg border border-[#EBEBEB] hover:border-[#C7C7C7] hover:bg-[#FAFAFA] transition-colors text-right"
        >
          <span className="flex items-center justify-end gap-1.5 text-[10px] uppercase tracking-wider text-[#86868b]">
            Next
            <ArrowRight size={11} />
          </span>
          <span className="text-[13px] font-medium text-[#1d1d1f] truncate">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
