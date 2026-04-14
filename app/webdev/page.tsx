import { redirect } from "next/navigation";
import { getItems } from "@/lib/content";

export default function WebDevIndex() {
  const items = getItems("webdev");
  if (items.length > 0) redirect(`/webdev/${items[0].slug}`);

  return (
    <div className="p-12 text-sm font-mono text-shell-muted">
      No web dev projects yet. Add an MDX file to content/webdev/.
    </div>
  );
}
