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
            I build products at the intersection of AI and real-world problems.
            Based in Greece, working on things that matter — customer intelligence,
            sports performance, and tooling for the way people actually work today.
          </p>

          <p>
            Currently heads-down on{" "}
            <span className="font-medium">Helpmarq</span> — an engagement
            intelligence platform — and{" "}
            <span className="font-medium">Padel AI Coach</span>, a video-based
            coaching app for padel players.
          </p>

          <p>
            I write about building with AI, lessons from shipping products, and
            the occasional padel match breakdown. This site is where I keep
            everything: projects, notes, guides, and status updates.
          </p>

          <div className="pt-4 border-t border-shell-border">
            <p className="text-[11px] font-mono uppercase tracking-widest text-shell-muted mb-3">
              Currently
            </p>
            <ul className="space-y-2 font-mono text-xs text-shell-muted">
              <li>→ Building Helpmarq (engagement intelligence)</li>
              <li>→ Building Padel AI Coach (video analysis)</li>
              <li>→ Exploring agent-native product patterns</li>
              <li>→ Writing about what I learn along the way</li>
            </ul>
          </div>
        </div>
      </div>
    </FilingShell>
  );
}
