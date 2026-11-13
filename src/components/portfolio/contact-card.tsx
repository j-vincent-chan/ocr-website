import { Link } from "@tanstack/react-router";

export function ContactCard() {
  return (
    <section id="contact" className="pb-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <div
          className="relative overflow-hidden rounded-[32px] md:rounded-[48px]"
          style={{
            background:
              "linear-gradient(120deg, #45202f, #3a1245, #1c1b56, #102a52, #06303f)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full opacity-40 blur-2xl"
            style={{ background: "#00b5b6" }}
          />
          <div className="relative flex flex-wrap items-stretch gap-8 p-8 md:gap-12 md:p-12">
            <div className="min-w-0 flex-[1_1_280px]">
              <span
                className="text-white/70"
                style={{
                  font: "500 12px/1.4 Inter, system-ui, sans-serif",
                  letterSpacing: ".22em",
                  textTransform: "uppercase",
                }}
              >
                Start with us
              </span>
              <h2
                className="mt-4 font-display text-white"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.25rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-.02em",
                  fontWeight: 400,
                }}
              >
                Have something we{" "}
                <span style={{ color: "#cdbccf" }}>/ should be working on?</span>
              </h2>
              <p className="mt-4 max-w-[40ch] text-[15.5px] leading-[1.6] text-white/75 text-pretty">
                Tell us about a program, project, or community you want OCR to support. We will
                help figure out the fit.
              </p>
            </div>

            <div
              className="min-w-0 flex-[1_1_260px] rounded-[24px] border p-6"
              style={{
                background: "rgba(255,255,255,.09)",
                borderColor: "rgba(255,255,255,.2)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              <div
                className="text-white/70"
                style={{
                  font: "500 11px/1.4 Inter, system-ui, sans-serif",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                }}
              >
                Email us
              </div>
              <a
                href="mailto:ocr@ucsf.edu"
                className="mt-2 block font-display text-2xl text-white no-underline hover:underline"
                style={{ fontWeight: 400 }}
              >
                ocr@ucsf.edu
              </a>
              <div className="mt-6 flex flex-col gap-3">
                {/* TODO(OCR): replace mailto with the director's scheduling URL when supplied. */}
                <a
                  href="mailto:ocr@ucsf.edu?subject=30-minute%20consult%20request"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-[#010621] no-underline hover:bg-[#f2eee6]"
                >
                  Book a 30-min consult <span aria-hidden>→</span>
                </a>
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/40 px-5 text-sm font-medium text-white no-underline hover:bg-white/10"
                >
                  Partner with OCR
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
