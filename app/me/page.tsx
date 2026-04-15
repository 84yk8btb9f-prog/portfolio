import { FilingShell } from "@/components/filing-shell";

export const metadata = {
  title: "Nikolas Sapalidis",
};

export default function MePage() {
  return (
    <FilingShell items={[]} section="me">
      <div className="p-8 md:p-12 max-w-2xl">
        <div className="mb-10 pb-6 border-b border-shell-border">
          <p className="text-[11px] font-mono uppercase tracking-widest text-shell-muted mb-3">
            About
          </p>
          <h1 className="text-2xl font-sans font-semibold text-shell-ink leading-tight">
            Nikolas Sapalidis
          </h1>
        </div>

        <div className="space-y-6 text-sm text-shell-ink leading-relaxed">
          <p>
            Solo founder, indie hacker, developer, entrepreneur, creator.
            I build products from zero — idea to shipped — and wear every hat
            along the way. Based in Greece.
          </p>

          <p>
            Right now I&apos;m heads-down on{" "}
            <span className="font-medium">Helpmarq</span>, an AI-driven
            customer engagement platform, and{" "}
            <span className="font-medium">Padel AI Coach</span>, a video
            analysis app for padel players. I also build websites and
            web apps for clients through{" "}
            <a
              href="https://nikolassapa.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
            >
              my web dev practice
            </a>
            .
          </p>

          <p>
            This site is my living notebook — projects I&apos;m building,
            things I&apos;m writing, resources I keep coming back to, and a
            timeline of what&apos;s actually happening.
          </p>

          <div className="pt-4 border-t border-shell-border">
            <p className="text-[11px] font-mono uppercase tracking-widest text-shell-muted mb-3">
              Currently
            </p>
            <ul className="space-y-2 font-mono text-xs text-shell-muted">
              <li>→ Building Helpmarq — engagement intelligence for SaaS</li>
              <li>→ Building Padel AI Coach — video analysis for padel</li>
              <li>→ Shipping client web projects</li>
              <li>→ Writing about what I learn building with AI</li>
            </ul>
          </div>
        </div>
      </div>
    </FilingShell>
  );
}
