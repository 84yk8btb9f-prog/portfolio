import { FilingShell } from "@/components/filing-shell";
import { getItems } from "@/lib/content";

export const metadata = {
  title: "Timeline — Nikolas Sapalidis",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function TimelinePage() {
  const events = getItems("timeline"); // already sorted newest first

  return (
    <FilingShell items={[]} section="timeline">
      <div className="p-8 md:p-12">
        <div className="mb-10 pb-6 border-b border-shell-border">
          <p className="text-[11px] font-mono uppercase tracking-widest text-shell-muted mb-3">
            Timeline
          </p>
          <h1 className="text-2xl font-sans font-semibold text-shell-ink leading-tight">
            What&apos;s happening
          </h1>
        </div>

        {events.length === 0 ? (
          <p className="text-sm font-mono text-shell-muted">
            No events yet. Add an MDX file to content/timeline/.
          </p>
        ) : (
          <ol className="relative">
            {events.map((event, i) => (
              <li key={event.slug} className="flex gap-6 pb-10 last:pb-0">
                {/* Line + dot */}
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-shell-ink mt-1 flex-none" />
                  {i < events.length - 1 && (
                    <div className="w-px flex-1 bg-shell-border mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-2">
                  <p className="text-[11px] font-mono uppercase tracking-widest text-shell-muted mb-1">
                    {formatDate(event.date)}
                  </p>
                  <p className="text-sm font-sans font-medium text-shell-ink leading-snug">
                    {event.title}
                  </p>
                  {event.description && (
                    <p className="mt-1 text-sm text-shell-muted leading-relaxed">
                      {event.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </FilingShell>
  );
}
