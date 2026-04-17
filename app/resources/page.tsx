import { redirect } from "next/navigation";
import { getTree } from "@/lib/content";

export default function ResourcesIndex() {
  const tree = getTree("resources");
  const first = tree.files[0] ?? tree.folders[0]?.items[0];
  if (first) redirect(`/resources/${first.slug}`);

  return (
    <div className="p-12 text-sm font-mono text-shell-muted">
      No resources yet. Add an MDX file to content/resources/.
    </div>
  );
}
