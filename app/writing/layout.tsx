import { FinderSidebar } from "@/components/finder-sidebar";
import { getItems } from "@/lib/content";
import type { ReactNode } from "react";

export default function WritingLayout({ children }: { children: ReactNode }) {
  const items = getItems("writing");
  return (
    <>
      <aside className="w-52 flex-none border-r border-[#DCDCDC] bg-[#F6F6F6] overflow-y-auto">
        <FinderSidebar items={items} section="writing" label="Writing" />
      </aside>
      <main className="flex-1 bg-white overflow-y-auto">{children}</main>
    </>
  );
}
