"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import type { ContentItem, ContentTree } from "@/lib/content";

type Props = {
  tree?: ContentTree;
  items?: ContentItem[];
  section: string;
  label: string;
};

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M1 4.5C1 3.67 1.67 3 2.5 3H6L7.5 4.5H13.5C14.33 4.5 15 5.17 15 6V12.5C15 13.33 14.33 14 13.5 14H2.5C1.67 14 1 13.33 1 12.5V4.5Z"
        fill="#7BA7E8"
        stroke="#5A8ED4"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path d="M3 2H10L13 5V14H3V2Z" fill="#fff" stroke="#C0C0C0" strokeWidth="0.8" />
      <path d="M10 2V5H13" fill="none" stroke="#C0C0C0" strokeWidth="0.8" />
      <line x1="5" y1="7.5" x2="11" y2="7.5" stroke="#C0C0C0" strokeWidth="0.7" />
      <line x1="5" y1="9.5" x2="11" y2="9.5" stroke="#C0C0C0" strokeWidth="0.7" />
      <line x1="5" y1="11.5" x2="9" y2="11.5" stroke="#C0C0C0" strokeWidth="0.7" />
    </svg>
  );
}

function FileRow({
  href,
  title,
  active,
  depth,
}: {
  href: string;
  title: string;
  active: boolean;
  depth: number;
}) {
  return (
    <Link
      href={href}
      className={[
        "flex items-center gap-1 py-[3px] pr-2 rounded select-none",
        active
          ? "bg-[#0064D2] text-white"
          : "text-[#1d1d1f] hover:bg-black/[0.06]",
      ].join(" ")}
      style={{ paddingLeft: `${6 + depth * 14}px` }}
    >
      <span className="w-3 h-3 flex-none" />
      <FileIcon className="w-4 h-4 flex-none" />
      <span className="ml-1 text-[12px] truncate leading-none">{title}</span>
    </Link>
  );
}

export function FinderSidebar({ tree, items: flatItems, section, label }: Props) {
  const pathname = usePathname();
  const [rootOpen, setRootOpen] = useState(true);

  // Normalize: if only `items` was passed (legacy), convert to tree shape
  const resolved: ContentTree =
    tree ??
    ({
      files: flatItems ?? [],
      folders: [],
    } as ContentTree);

  const flatForMobile: ContentItem[] = [
    ...resolved.files,
    ...resolved.folders.flatMap((f) => f.items.filter((i) => i.slugParts[i.slugParts.length - 1] !== "index")),
  ];

  return (
    <>
      {/* ── Mobile: horizontal scrollable file strip ── */}
      <div className="md:hidden flex items-center gap-1.5 px-3 py-2 overflow-x-auto border-b border-[#DCDCDC]">
        <div className="flex items-center gap-1 flex-none pr-2 border-r border-[#DCDCDC]">
          <FolderIcon className="w-3.5 h-3.5 flex-none" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#86868b] whitespace-nowrap">
            {label}
          </span>
        </div>
        {flatForMobile.map((item) => {
          const href = `/${section}/${item.slug}`;
          const active = pathname === href;
          return (
            <Link
              key={item.slug}
              href={href}
              className={[
                "flex items-center gap-1 px-2 py-0.5 rounded text-[11px] whitespace-nowrap flex-none transition-colors",
                active
                  ? "bg-[#0064D2] text-white"
                  : "text-[#1d1d1f] bg-black/[0.05] hover:bg-black/[0.10]",
              ].join(" ")}
            >
              <FileIcon className="w-3 h-3 flex-none" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>

      {/* ── Desktop: vertical tree ── */}
      <div className="hidden md:block py-1.5 px-1">
        {/* Root folder row */}
        <div
          className="flex items-center gap-1 py-[3px] pr-2 rounded cursor-pointer select-none text-[#1d1d1f] hover:bg-black/[0.06]"
          style={{ paddingLeft: "6px" }}
          onClick={() => setRootOpen(!rootOpen)}
        >
          <span className="w-3 h-3 flex-none flex items-center justify-center">
            {rootOpen ? (
              <ChevronDown size={9} className="text-[#86868b]" />
            ) : (
              <ChevronRight size={9} className="text-[#86868b]" />
            )}
          </span>
          <FolderIcon className="w-4 h-4 flex-none" />
          <span className="ml-1 text-[12px] truncate leading-none">{label}</span>
        </div>

        {rootOpen && (
          <>
            {/* Flat files at root */}
            {resolved.files.map((item) => {
              const href = `/${section}/${item.slug}`;
              return (
                <FileRow
                  key={item.slug}
                  href={href}
                  title={item.title}
                  active={pathname === href}
                  depth={1}
                />
              );
            })}

            {/* Subfolders */}
            {resolved.folders.map((folder) => (
              <SubFolder
                key={folder.slug}
                section={section}
                folder={folder}
                pathname={pathname}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}

function SubFolder({
  section,
  folder,
  pathname,
}: {
  section: string;
  folder: ContentTree["folders"][number];
  pathname: string;
}) {
  const inside = pathname.startsWith(`/${section}/${folder.slug}`);
  const [open, setOpen] = useState(inside);

  const folderHref = `/${section}/${folder.slug}`;
  const children = folder.items.filter(
    (i) => i.slugParts[i.slugParts.length - 1] !== "index"
  );

  return (
    <div>
      <div
        className="flex items-center gap-1 py-[3px] pr-2 rounded cursor-pointer select-none text-[#1d1d1f] hover:bg-black/[0.06]"
        style={{ paddingLeft: "20px" }}
        onClick={() => setOpen(!open)}
      >
        <span className="w-3 h-3 flex-none flex items-center justify-center">
          {open ? (
            <ChevronDown size={9} className="text-[#86868b]" />
          ) : (
            <ChevronRight size={9} className="text-[#86868b]" />
          )}
        </span>
        <FolderIcon className="w-4 h-4 flex-none" />
        <Link
          href={folderHref}
          onClick={(e) => e.stopPropagation()}
          className="ml-1 text-[12px] truncate leading-none hover:underline"
        >
          {folder.title}
        </Link>
      </div>

      {open &&
        children.map((item) => {
          const href = `/${section}/${item.slug}`;
          return (
            <FileRow
              key={item.slug}
              href={href}
              title={item.title}
              active={pathname === href}
              depth={2}
            />
          );
        })}
    </div>
  );
}
