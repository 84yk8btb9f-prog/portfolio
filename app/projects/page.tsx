import { redirect } from "next/navigation";
import { getItems } from "@/lib/content";

export default function ProjectsIndex() {
  const items = getItems("projects");
  if (items.length > 0) redirect(`/projects/${items[0].slug}`);

  return (
    <div className="p-12 text-sm font-mono text-shell-muted">
      No projects yet. Add an MDX file to content/projects/.
    </div>
  );
}
