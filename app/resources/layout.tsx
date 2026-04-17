import { FinderSidebar } from "@/components/finder-sidebar";
import { getTree } from "@/lib/content";
import type { ReactNode } from "react";

export default function ResourcesLayout({ children }: { children: ReactNode }) {
  const tree = getTree("resources");
  return (
    <>
      <aside className="flex-none md:w-60 md:border-r border-[#DCDCDC] bg-[#F6F6F6] md:overflow-y-auto">
        <FinderSidebar tree={tree} section="resources" label="Resources" />
      </aside>
      <main className="flex-1 bg-white overflow-y-auto min-h-0">{children}</main>
    </>
  );
}
