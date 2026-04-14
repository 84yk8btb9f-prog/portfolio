import { FilingShell } from "@/components/filing-shell";
import { getItems } from "@/lib/content";
import type { ReactNode } from "react";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  const items = getItems("projects");
  return (
    <FilingShell items={items} section="projects">
      {children}
    </FilingShell>
  );
}
