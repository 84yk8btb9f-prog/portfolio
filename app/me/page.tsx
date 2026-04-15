export const metadata = {
  title: "Nikolas Sapalidis",
};

export default function MePage() {
  return (
    <main className="flex-1 bg-white overflow-y-auto">
      <div className="p-8 md:p-12 max-w-2xl">
        <div className="mb-10 pb-6 border-b border-[#EBEBEB]">
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#86868b] mb-3">
            Athens, Greece · 16
          </p>
          <h1 className="text-2xl font-sans font-semibold text-[#1d1d1f] leading-tight">
            Nikolas Sapalidis
          </h1>
        </div>

        <div className="space-y-5 text-sm text-[#1d1d1f] leading-relaxed">
          <p>
            I started where most teenagers start: deep in the self-improvement
            rabbit hole. That led to trading and crypto, then running a Google
            Ads agency, then trying to sell digital products — and getting
            nowhere. Didn&apos;t make a cent from any of it.
          </p>

          <p>
            Then I learned to code. Started building websites for businesses,
            got my first paying client in February 2026, and realized this was
            actually working. No templates — everything I build is custom, from
            scratch, exactly what the client needs.
          </p>

          <p>
            Alongside the client work, I started building products. First was{" "}
            <a
              href="https://helpmarq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
            >
              Helpmarq
            </a>{" "}
            — a feedback marketplace where you upload a project and get
            structured, multi-perspective feedback from real users. It&apos;s
            live. Now I&apos;m building{" "}
            <a
              href="https://www.trypadelup.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
            >
              Padel Up
            </a>{" "}
            (an all-in-one iOS app for padel players),{" "}
            <span className="font-medium">MarketMyApp</span> (AI-driven weekly
            marketing actions for indie founders), and{" "}
            <span className="font-medium">Creator Roast</span> (AI that
            diagnoses exactly what&apos;s broken in your creator profile).
          </p>

          <p>
            Since April 2026 I&apos;ve been on Claude Code Max. It changed how
            I work. I&apos;m shipping faster, building more things in parallel,
            and actually enjoying the process. I write about it too — real
            patterns, not hype.
          </p>

          <div className="pt-5 border-t border-[#EBEBEB]">
            <p className="text-[11px] font-mono uppercase tracking-widest text-[#86868b] mb-3">
              Currently
            </p>
            <ul className="space-y-1.5 font-mono text-xs text-[#86868b]">
              <li>→ Padel Up — waiting on App Store approval</li>
              <li>→ MarketMyApp — building</li>
              <li>→ Creator Roast — building</li>
              <li>→ Client web work — websites, apps, custom systems</li>
              <li>→ Writing about building with Claude Code</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
