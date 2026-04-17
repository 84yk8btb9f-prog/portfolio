"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronRight, ChevronDown, Search, X } from "lucide-react";
import type { ContentItem, ContentTree, ContentFolder } from "@/lib/content";

type Props = {
  tree?: ContentTree;
  items?: ContentItem[];
  section: string;
  label: string;
  suggestions?: string[];
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

// Collect searchable items from the whole tree (flat view)
function flattenTree(tree: ContentTree): ContentItem[] {
  return [
    ...tree.files,
    ...tree.folders.flatMap((f) =>
      f.items.filter((i) => i.slugParts[i.slugParts.length - 1] !== "index")
    ),
  ];
}

function matches(item: ContentItem, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    item.title,
    item.description,
    item.folder ?? "",
    ...(item.tags ?? []),
    item.group ?? "",
  ]
    .join(" ")
    .toLowerCase();
  return q.split(/\s+/).every((term) => haystack.includes(term));
}

export function FinderSidebar({
  tree,
  items: flatItems,
  section,
  label,
  suggestions,
}: Props) {
  const pathname = usePathname();
  const [rootOpen, setRootOpen] = useState(true);
  const [query, setQuery] = useState("");

  const resolved: ContentTree =
    tree ?? ({ files: flatItems ?? [], folders: [] } as ContentTree);

  const flatAll = useMemo(() => flattenTree(resolved), [resolved]);
  const results = useMemo(
    () => (query.trim() ? flatAll.filter((i) => matches(i, query)) : []),
    [flatAll, query]
  );

  const showResults = query.trim().length > 0;

  // Flatten for mobile horizontal strip
  const flatForMobile: ContentItem[] = flatAll;

  return (
    <>
      {/* ── Mobile: search + horizontal strip ── */}
      <div className="md:hidden border-b border-[#DCDCDC] bg-[#F6F6F6]">
        <SearchBox
          query={query}
          setQuery={setQuery}
          suggestions={suggestions}
          compact
        />
        {!showResults && (
          <div className="flex items-center gap-1.5 px-3 py-2 overflow-x-auto">
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
        )}
        {showResults && (
          <ResultList
            results={results}
            section={section}
            pathname={pathname}
            onPick={() => setQuery("")}
          />
        )}
      </div>

      {/* ── Desktop: search + vertical tree ── */}
      <div className="hidden md:block">
        <div className="px-2 pt-2 pb-1 border-b border-[#E8E8E8]">
          <SearchBox
            query={query}
            setQuery={setQuery}
            suggestions={suggestions}
          />
        </div>

        {showResults ? (
          <ResultList
            results={results}
            section={section}
            pathname={pathname}
            onPick={() => setQuery("")}
          />
        ) : (
          <div className="py-1.5 px-1">
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
              <span className="ml-1 text-[12px] truncate leading-none">
                {label}
              </span>
            </div>

            {rootOpen && (
              <>
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
        )}
      </div>
    </>
  );
}

// ── Search box + suggestions ─────────────────────────────────────────────────

function SearchBox({
  query,
  setQuery,
  suggestions,
  compact,
}: {
  query: string;
  setQuery: (q: string) => void;
  suggestions?: string[];
  compact?: boolean;
}) {
  return (
    <div className={compact ? "px-3 py-2" : "flex flex-col gap-1.5"}>
      <div className="relative">
        <Search
          size={11}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-[#86868b]"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search resources"
          className="w-full pl-7 pr-7 py-1.5 rounded-md text-[12px] bg-white border border-[#DCDCDC] focus:border-[#0064D2] focus:outline-none text-[#1d1d1f] placeholder:text-[#86868b]"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-black/[0.08] text-[#86868b]"
          >
            <X size={11} />
          </button>
        )}
      </div>
      {!query && suggestions && suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-0.5">
          {suggestions.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-1.5 py-0.5 rounded-full text-[10px] bg-white border border-[#DCDCDC] text-[#3d3d3d] hover:bg-[#0064D2] hover:text-white hover:border-[#0064D2] transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Search result list ───────────────────────────────────────────────────────

function ResultList({
  results,
  section,
  pathname,
  onPick,
}: {
  results: ContentItem[];
  section: string;
  pathname: string;
  onPick: () => void;
}) {
  if (results.length === 0) {
    return (
      <div className="px-3 py-3 text-[11px] text-[#86868b]">
        No results. Try another term.
      </div>
    );
  }
  return (
    <ul className="py-1">
      {results.map((item) => {
        const href = `/${section}/${item.slug}`;
        const active = pathname === href;
        const breadcrumb = [item.folder, item.group].filter(Boolean).join(" / ");
        return (
          <li key={item.slug}>
            <Link
              href={href}
              onClick={onPick}
              className={[
                "flex flex-col gap-0.5 px-3 py-1.5 border-l-2",
                active
                  ? "border-[#0064D2] bg-[#0064D2]/[0.06]"
                  : "border-transparent hover:bg-black/[0.04]",
              ].join(" ")}
            >
              <span className="text-[12px] font-medium text-[#1d1d1f] truncate">
                {item.title}
              </span>
              {breadcrumb && (
                <span className="text-[10px] uppercase tracking-wider text-[#86868b] truncate">
                  {breadcrumb}
                </span>
              )}
              {item.description && (
                <span className="text-[11px] text-[#3d3d3d] line-clamp-2 leading-snug">
                  {item.description}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

// ── Subfolder with optional virtual group subheaders ─────────────────────────

function SubFolder({
  section,
  folder,
  pathname,
}: {
  section: string;
  folder: ContentFolder;
  pathname: string;
}) {
  const inside = pathname.startsWith(`/${section}/${folder.slug}`);
  const [open, setOpen] = useState(inside);

  const folderHref = `/${section}/${folder.slug}`;
  const children = folder.items.filter(
    (i) => i.slugParts[i.slugParts.length - 1] !== "index"
  );

  // Group children by `group` field (preserving order)
  const hasGroups = children.some((c) => c.group);
  const grouped = useMemo(() => {
    if (!hasGroups) return null;
    const map = new Map<string, { title: string; slug: string; items: ContentItem[] }>();
    const ungrouped: ContentItem[] = [];
    for (const child of children) {
      if (!child.group) {
        ungrouped.push(child);
        continue;
      }
      const key = child.groupSlug ?? child.group;
      if (!map.has(key)) {
        map.set(key, { title: child.group, slug: key, items: [] });
      }
      map.get(key)!.items.push(child);
    }
    const sorted = [...map.values()].sort((a, b) => a.slug.localeCompare(b.slug));
    return { groups: sorted, ungrouped };
  }, [children, hasGroups]);

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

      {open && !grouped &&
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

      {open && grouped && (
        <>
          {grouped.ungrouped.map((item) => {
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
          {grouped.groups.map((g) => (
            <VirtualGroup
              key={g.slug}
              title={g.title}
              items={g.items}
              section={section}
              pathname={pathname}
            />
          ))}
        </>
      )}
    </div>
  );
}

function VirtualGroup({
  title,
  items,
  section,
  pathname,
}: {
  title: string;
  items: ContentItem[];
  section: string;
  pathname: string;
}) {
  const inside = items.some((i) => pathname === `/${section}/${i.slug}`);
  const [open, setOpen] = useState(inside);

  return (
    <div>
      <div
        className="flex items-center gap-1 py-[3px] pr-2 rounded cursor-pointer select-none text-[#1d1d1f] hover:bg-black/[0.06]"
        style={{ paddingLeft: "34px" }}
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
        <span className="ml-1 text-[12px] truncate leading-none">{title}</span>
      </div>
      {open &&
        items.map((item) => {
          const href = `/${section}/${item.slug}`;
          return (
            <FileRow
              key={item.slug}
              href={href}
              title={item.title}
              active={pathname === href}
              depth={3}
            />
          );
        })}
    </div>
  );
}
