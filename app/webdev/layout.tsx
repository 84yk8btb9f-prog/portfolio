import { FilingShell } from "@/components/filing-shell";
import { getItems } from "@/lib/content";
import type { ReactNode } from "react";

export default function WebDevLayout({ children }: { children: ReactNode }) {
  const items = getItems("webdev");
  return (
    <FilingShell items={items} section="webdev">
      {children}
    </FilingShell>
  );
}
