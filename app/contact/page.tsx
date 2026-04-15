import { X, AtSign, Link, ExternalLink } from "lucide-react";

const LINKS = [
  {
    label: "X / Twitter",
    href: "https://x.com/nikolassapa",
    value: "@nikolassapa",
    Icon: X,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nikolas.sapa/",
    value: "@nikolas.sapa",
    Icon: AtSign,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nik-sapa/",
    value: "nik-sapa",
    Icon: Link,
  },
  {
    label: "GitHub",
    href: "https://github.com/84yk8btb9f-prog",
    value: "84yk8btb9f-prog",
    Icon: ExternalLink,
  },
];

export default function ContactPage() {
  return (
    <main className="flex-1 bg-white overflow-y-auto">
      <div className="p-8 md:p-12">
        <div className="mb-8 pb-6 border-b border-[#EBEBEB]">
          <h1 className="text-2xl font-sans font-semibold text-[#1d1d1f]">
            Contact
          </h1>
          <p className="mt-2 text-sm font-mono text-[#86868b]">
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
                  className="text-[#86868b] group-hover:text-[#1d1d1f] transition-colors flex-none"
                />
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868b] w-24 flex-none">
                  {label}
                </span>
                <span className="text-sm text-[#1d1d1f] group-hover:underline underline-offset-2">
                  {value}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
