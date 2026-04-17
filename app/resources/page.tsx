import { getTree, type ContentItem } from "@/lib/content";
import { FolderListing, formatDate, type FolderRow } from "@/components/folder-listing";

export const metadata = {
  title: "Resources — Nikolas Sapalidis",
};

function latestDate(items: ContentItem[]): string {
  const dates = items.map((i) => i.date).filter(Boolean).sort();
  return dates[dates.length - 1] ?? "";
}

export default function ResourcesIndex() {
  const tree = getTree("resources");

  const folderRows: FolderRow[] = tree.folders.map((f) => ({
    href: `/resources/${f.slug}`,
    name: f.slug,
    kind: "Folder",
    modified: formatDate(latestDate(f.items)),
    isFolder: true,
  }));

  const fileRows: FolderRow[] = tree.files.map((item) => ({
    href: `/resources/${item.slug}`,
    name: `${item.slug}.md`,
    kind: "Markdown Document",
    modified: formatDate(item.date),
    isFolder: false,
  }));

  return <FolderListing rows={[...folderRows, ...fileRows]} />;
}
