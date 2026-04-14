"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Me",        href: "/me"        },
  { label: "Projects",  href: "/projects"  },
  { label: "Web Dev",   href: "/webdev"    },
  { label: "Writing",   href: "/writing"   },
  { label: "Resources", href: "/resources" },
  { label: "Contact",   href: "/contact"   },
];

export function TabNav() {
  const pathname = usePathname();

  return (
    <div className="flex border-b border-shell-border bg-shell-bg">
      {TABS.map((tab) => {
        const active = pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={[
              "px-5 py-2.5 text-xs font-mono tracking-wide border-r border-shell-border transition-colors",
              active
                ? "bg-shell-content text-shell-ink -mb-px border-b border-b-shell-content"
                : "bg-shell-tab text-shell-muted hover:bg-shell-bg hover:text-shell-ink",
            ].join(" ")}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
