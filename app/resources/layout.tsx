import { FinderSidebar } from "@/components/finder-sidebar";
import { getItems } from "@/lib/content";
import type { ReactNode } from "react";

export default function ResourcesLayout({ children }: { children: ReactNode }) {
  const items = getItems("resources");
  return (
    <>
      <aside className="w-52 flex-none border-r border-[#DCDCDC] bg-[#F6F6F6] overflow-y-auto">
        <FinderSidebar items={items} section="resources" label="Resources" />
      </aside>
      <main className="flex-1 bg-white overflow-y-auto">{children}</main>
    </>
  );
}
