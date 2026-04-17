import { notFound } from "next/navigation";
import {
  getItem,
  getItems,
  getTree,
  getFolderItems,
  getFolderGroups,
  getFolderGroup,
  type ContentItem,
} from "@/lib/content";
import { MdxContent } from "@/components/mdx-content";
import { GuideNav } from "@/components/guide-nav";
import {
  FolderListing,
  formatDate,
  type FolderRow,
} from "@/components/folder-listing";

type Props = { params: Promise<{ slug: string[] }> };

function latestDate(items: ContentItem[]): string {
  const dates = items.map((i) => i.date).filter(Boolean).sort();
  return dates[dates.length - 1] ?? "";
}

export async function generateStaticParams() {
  const items = getItems("resources").map((p) => ({ slug: p.slugParts }));

  // Also pre-render virtual group routes: /resources/<folder>/<groupSlug>
  const tree = getTree("resources");
  const groupParams: { slug: string[] }[] = [];
  for (const folder of tree.folders) {
    for (const g of getFolderGroups("resources", folder.slug)) {
      groupParams.push({ slug: [folder.slug, g.slug] });
    }
    // Pre-render folder landing: /resources/<folder>
    groupParams.push({ slug: [folder.slug] });
  }
  return [...items, ...groupParams];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  // Folder landing
  if (slug.length === 1) {
    const tree = getTree("resources");
    const folder = tree.folders.find((f) => f.slug === slug[0]);
    if (folder) return { title: folder.title };
  }

  // Group landing
  if (slug.length === 2) {
    const group = getFolderGroup("resources", slug[0], slug[1]);
    if (group) return { title: group.name };
  }

  const item = getItem("resources", slug);
  return { title: item?.title ?? "Resource" };
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  const tree = getTree("resources");

  // ── Folder landing: /resources/<folder> → list group subfolders ─────
  if (slug.length === 1) {
    const folder = tree.folders.find((f) => f.slug === slug[0]);
    if (folder) {
      const groups = getFolderGroups("resources", folder.slug);
      const rows: FolderRow[] = groups.map((g) => ({
        href: `/resources/${folder.slug}/${g.slug}`,
        name: g.name,
        kind: "Folder",
        modified: formatDate(latestDate(g.items)),
        isFolder: true,
      }));
      return (
        <FolderListing
          rows={rows}
          header={{
            crumb: "Resources",
            title: folder.title,
            description: folder.description,
          }}
        />
      );
    }
  }

  // ── Group landing: /resources/<folder>/<groupSlug> → list pages ─────
  if (slug.length === 2) {
    const folder = tree.folders.find((f) => f.slug === slug[0]);
    const group = folder ? getFolderGroup("resources", folder.slug, slug[1]) : null;
    if (folder && group) {
      const rows: FolderRow[] = group.items.map((item) => ({
        href: `/resources/${item.slug}`,
        name: `${item.slugParts[item.slugParts.length - 1]}.md`,
        kind: "Markdown Document",
        modified: formatDate(item.date),
        isFolder: false,
      }));
      return (
        <FolderListing
          rows={rows}
          header={{
            crumb: `Resources / ${folder.title}`,
            title: group.name,
          }}
        />
      );
    }
  }

  // ── Page content: /resources/<folder>/<pageSlug> or /resources/<file> ──
  const item = getItem("resources", slug);
  if (!item) notFound();

  let nav: {
    prev?: { title: string; href: string };
    next?: { title: string; href: string };
  } | null = null;

  if (item.folder && item.slugParts[item.slugParts.length - 1] !== "index") {
    const siblings = getFolderItems("resources", item.folder).filter(
      (s) => s.slugParts[s.slugParts.length - 1] !== "index"
    );
    const idx = siblings.findIndex((s) => s.slug === item.slug);
    if (idx >= 0) {
      const prev = siblings[idx - 1];
      const next = siblings[idx + 1];
      nav = {
        prev: prev ? { title: prev.title, href: `/resources/${prev.slug}` } : undefined,
        next: next ? { title: next.title, href: `/resources/${next.slug}` } : undefined,
      };
    }
  }

  return (
    <MdxContent source={item.content} title={item.title} date={item.date}>
      {nav && <GuideNav prev={nav.prev} next={nav.next} />}
    </MdxContent>
  );
}
