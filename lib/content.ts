import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ContentItem = {
  slug: string;          // joined path e.g. "claude-code-guide/01-philosophy"
  slugParts: string[];   // ["claude-code-guide", "01-philosophy"]
  title: string;
  date: string;
  description: string;
  status?: string;
  tags?: string[];
  order?: number;
  folder?: string;       // parent folder slug, if nested
  content: string;
};

export type ContentFolder = {
  slug: string;
  title: string;
  description: string;
  items: ContentItem[];
};

export type ContentTree = {
  files: ContentItem[];
  folders: ContentFolder[];
};

const CONTENT_DIR = path.join(process.cwd(), "content");

function readMdx(filePath: string, slugParts: string[]): ContentItem {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug: slugParts.join("/"),
    slugParts,
    title: data.title ?? slugParts[slugParts.length - 1],
    date: data.date ?? "",
    description: data.description ?? "",
    status: data.status,
    tags: data.tags ?? [],
    order: typeof data.order === "number" ? data.order : undefined,
    folder: slugParts.length > 1 ? slugParts[0] : undefined,
    content,
  };
}

function sortItems(items: ContentItem[]): ContentItem[] {
  return items.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return a.date < b.date ? 1 : -1;
  });
}

export function getTree(section: string): ContentTree {
  const dir = path.join(CONTENT_DIR, section);
  if (!fs.existsSync(dir)) return { files: [], folders: [] };

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const files: ContentItem[] = [];
  const folders: ContentFolder[] = [];

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      const slug = entry.name.replace(/\.mdx$/, "");
      files.push(readMdx(path.join(dir, entry.name), [slug]));
    } else if (entry.isDirectory()) {
      const folderDir = path.join(dir, entry.name);
      const folderFiles = fs
        .readdirSync(folderDir)
        .filter((f) => f.endsWith(".mdx"));

      const items: ContentItem[] = [];
      let folderTitle = entry.name;
      let folderDescription = "";

      for (const f of folderFiles) {
        const slug = f.replace(/\.mdx$/, "");
        const item = readMdx(path.join(folderDir, f), [entry.name, slug]);
        if (slug === "index") {
          folderTitle = item.title ?? folderTitle;
          folderDescription = item.description ?? "";
        }
        items.push(item);
      }

      folders.push({
        slug: entry.name,
        title: folderTitle,
        description: folderDescription,
        items: sortItems(items),
      });
    }
  }

  return { files: sortItems(files), folders };
}

export function getItems(section: string): ContentItem[] {
  const tree = getTree(section);
  return [...tree.files, ...tree.folders.flatMap((f) => f.items)];
}

export function getItem(
  section: string,
  slugParts: string | string[]
): ContentItem | null {
  const parts = Array.isArray(slugParts) ? slugParts : [slugParts];
  const direct = path.join(CONTENT_DIR, section, ...parts) + ".mdx";
  if (fs.existsSync(direct)) return readMdx(direct, parts);

  // Folder index: /resources/claude-code-guide → folder/index.mdx
  if (parts.length === 1) {
    const indexFile = path.join(CONTENT_DIR, section, parts[0], "index.mdx");
    if (fs.existsSync(indexFile)) {
      return readMdx(indexFile, [parts[0], "index"]);
    }
  }

  return null;
}

export function getFolderItems(
  section: string,
  folderSlug: string
): ContentItem[] {
  const tree = getTree(section);
  const folder = tree.folders.find((f) => f.slug === folderSlug);
  return folder?.items ?? [];
}
