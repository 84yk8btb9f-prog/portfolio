import { notFound } from "next/navigation";
import { getItem, getItems } from "@/lib/content";
import { MdxContent } from "@/components/mdx-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getItems("webdev").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = getItem("webdev", slug);
  return { title: item?.title ?? "Web Dev" };
}

export default async function WebDevPage({ params }: Props) {
  const { slug } = await params;
  const item = getItem("webdev", slug);
  if (!item) notFound();

  return (
    <MdxContent
      source={item.content}
      title={item.title}
      date={item.date}
      status={item.status}
    />
  );
}
