"use client";

export default function Problem() {
  return (
    <section
      className="relative px-6 lg:px-8 py-20 overflow-hidden"
      style={{ borderTop: "1px solid var(--clr-border)" }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full blur-4xl"
          style={{ background: "var(--glow-route)" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p className="eyebrow">The problem</p>

        {/* Main dramatic text */}
        <div
          className="font-syne text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug mb-8 space-y-1"
          style={{ color: "var(--clr-text-60)" }}
        >
          <p>You are new on campus.</p>
          <p>You need the Faculty of Engineering.</p>
          <p>You ask three people.</p>
          <p
            className="font-extrabold"
            style={{ color: "var(--clr-text-100)" }}
          >
            You get three different answers.
          </p>
        </div>

        {/* Resolution */}
        <div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-syne font-bold text-lg sm:text-xl"
          style={{
            background: "var(--clr-route-subtle)",
            border: "1px solid var(--clr-border-route)",
            color: "var(--clr-route)",
          }}
        >
          LASU Navigate fixes this.
        </div>
      </div>
    </section>
  );
}
