export default function ResponseTimePromise() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="liquid-glass rounded-2xl border border-emerald-500/20 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-2xl">
              ⚡
            </div>
            <div>
              <p className="text-base font-semibold text-white">
                24-hour response promise
              </p>
              <p className="text-sm text-hero-sub/70">
                Every inquiry gets a real reply within one business day. No
                bots, no auto-responders — a human from our team.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/923039969903"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-5 py-2.5 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/25"
          >
            WhatsApp us
          </a>
        </div>
      </div>
    </div>
  );
}
