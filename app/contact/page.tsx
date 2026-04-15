import { FilingShell } from "@/components/filing-shell";
import { X, ExternalLink } from "lucide-react";

const LINKS = [
  {
    label: "X / Twitter",
    href: "https://x.com/nikolassapa",
    value: "@nikolassapa",
    Icon: X,
  },
  {
    label: "GitHub",
    href: "https://github.com/84yk8btb9f-prog",
    value: "github.com/84yk8btb9f-prog",
    Icon: ExternalLink,
  },
];

export default function ContactPage() {
  return (
    <FilingShell items={[]} section="contact">
      <div className="p-8 md:p-12">
        <div className="mb-8 pb-6 border-b border-shell-border">
          <h1 className="text-2xl font-sans font-semibold text-shell-ink">
            Contact
          </h1>
          <p className="mt-2 text-sm font-mono text-shell-muted">
            Building in public — reach out anytime.
          </p>
        </div>

        <ul className="space-y-5">
          {LINKS.map(({ label, href, value, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <Icon
                  size={15}
                  className="text-shell-muted group-hover:text-shell-ink transition-colors flex-none"
                />
                <span className="text-[11px] font-mono uppercase tracking-wider text-shell-muted w-24 flex-none">
                  {label}
                </span>
                <span className="text-sm text-shell-ink group-hover:underline underline-offset-2">
                  {value}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </FilingShell>
  );
}
