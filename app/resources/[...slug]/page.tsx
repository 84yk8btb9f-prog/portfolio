import { notFound } from "next/navigation";
import { getItem, getItems, getFolderItems } from "@/lib/content";
import { MdxContent } from "@/components/mdx-content";
import { GuideNav } from "@/components/guide-nav";

type Props = { params: Promise<{ slug: string[] }> };

export async function generateStaticParams() {
  return getItems("resources").map((p) => ({ slug: p.slugParts }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = getItem("resources", slug);
  return { title: item?.title ?? "Resource" };
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  const item = getItem("resources", slug);
  if (!item) notFound();

  // Build prev/next nav when inside a folder (excluding index)
  let nav: { prev?: { title: string; href: string }; next?: { title: string; href: string } } | null = null;
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
