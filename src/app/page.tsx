import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Download,
  FileCheck2,
  FolderOpen,
  LockKeyhole,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const readinessItems = [
  "All transactions accounted for",
  "Everything reconciled",
  "2 items need review",
];

const controlPlaneItems = [
  "License verification",
  "Eve credit balance",
  "Product download access",
];

export default function Home() {
  return (
    <main className="min-h-svh bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a className="flex items-center gap-3" href="#" aria-label="KansoBooks">
            <span className="flex size-8 items-center justify-center rounded-full bg-foreground text-primary-foreground">
              <span className="h-px w-5 bg-primary-foreground" />
            </span>
            <span className="text-base font-semibold text-foreground">
              Kanso<span className="font-normal">Books</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a className="transition-colors hover:text-foreground" href="#proof">
              Proof
            </a>
            <a className="transition-colors hover:text-foreground" href="#ownership">
              Ownership
            </a>
            <a className="transition-colors hover:text-foreground" href="#billing">
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button>
              Early access
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:py-24">
        <div className="flex max-w-3xl flex-col justify-center">
          <p className="mb-5 text-sm font-medium text-info">
            AI-speed bookkeeping. Proof-grade trust.
          </p>
          <h1 className="text-4xl font-semibold tracking-normal text-foreground sm:text-5xl lg:text-6xl">
            Get your books ready for your accountant.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Eve drafts the routine work. Kanso checks the evidence, validation,
            and reconciliation. You approve what becomes true.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg">
              Request early access
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="secondary">
              <Download className="size-4" aria-hidden="true" />
              Download for Mac
            </Button>
          </div>

          <div className="mt-10 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-success" aria-hidden="true" />
              Local-first books
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-success" aria-hidden="true" />
              Deterministic checks
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-success" aria-hidden="true" />
              Accountant package
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 shadow-sm lg:p-5">
          <div className="rounded-md border border-border bg-background">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div>
                <p className="text-xs text-muted-foreground">YOUR 2026 BOOKS</p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  Ready check
                </p>
              </div>
              <span className="rounded-md bg-success-soft px-2.5 py-1 text-xs font-medium text-success">
                In review
              </span>
            </div>

            <div className="grid gap-0 md:grid-cols-[0.9fr_1fr]">
              <div className="border-b border-border bg-muted p-5 md:border-b-0 md:border-r">
                <p className="text-xs font-medium text-muted-foreground">
                  BEFORE
                </p>
                <div className="mt-7 grid gap-3">
                  {["bank.csv", "amex.qfx", "receipts.pdf", "invoice.png"].map(
                    (file) => (
                      <div
                        className="flex h-11 items-center gap-3 rounded-lg border border-border bg-card px-3 text-sm text-foreground shadow-sm"
                        key={file}
                      >
                        <FolderOpen
                          className="size-4 text-muted-foreground"
                          aria-hidden="true"
                        />
                        {file}
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs font-medium text-muted-foreground">
                  AFTER
                </p>
                <div className="mt-6 space-y-4">
                  {readinessItems.map((item, index) => (
                    <div className="flex items-center gap-3" key={item}>
                      {index < 2 ? (
                        <CheckCircle2
                          className="size-5 text-success"
                          aria-hidden="true"
                        />
                      ) : (
                        <CircleAlert
                          className="size-5 text-warning"
                          aria-hidden="true"
                        />
                      )}
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 border-t border-border pt-6">
                  <p className="text-sm font-semibold uppercase text-foreground">
                    Ready for your accountant
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Every claim can be traced to a source file, a validation
                    result, or a decision you approved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-y border-border bg-card"
        id="proof"
        aria-labelledby="proof-heading"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-3">
          <div>
            <h2
              className="text-2xl font-semibold tracking-normal text-foreground"
              id="proof-heading"
            >
              The trust loop is visible.
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              KansoBooks does not ask users to trust a black box. AI-drafted
              work becomes truth only after validation and approval.
            </p>
          </div>

          {[
            ["Eve drafts", "Routine categories, matches, and fixes are proposed."],
            ["Kanso proves", "Rules, evidence, and reconciliation checks are deterministic."],
            ["You approve", "Accepted decisions are logged without rewriting history."],
          ].map(([title, body]) => (
            <div className="rounded-lg border border-border bg-background p-5" key={title}>
              <FileCheck2 className="size-5 text-info" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-medium text-foreground">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1fr]"
        id="ownership"
        aria-labelledby="ownership-heading"
      >
        <div>
          <h2
            className="text-2xl font-semibold tracking-normal text-foreground"
            id="ownership-heading"
          >
            Your books live in simple files you own.
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            The cloud account manages access, licenses, and Eve credits. It
            does not become the database for your financial books.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="border-b border-border p-5 md:border-b-0 md:border-r">
              <LockKeyhole className="size-5 text-success" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-medium text-foreground">
                Local source of truth
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Statements, receipts, ledgers, reconciliation state, and
                accountant packages stay on the local machine.
              </p>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-medium text-foreground">
                Control plane
              </h3>
              <div className="mt-5 space-y-3">
                {controlPlaneItems.map((item) => (
                  <div className="flex items-center gap-3" key={item}>
                    <CheckCircle2
                      className="size-4 text-success"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-t border-border bg-muted"
        id="billing"
        aria-labelledby="billing-heading"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2
              className="text-xl font-semibold tracking-normal text-foreground"
              id="billing-heading"
            >
              Paid software. Merchant of record handled by Lemon Squeezy.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Yearly desktop licenses and Eve credit top-ups are verified
              through signed webhooks before entitlements are updated.
            </p>
          </div>
          <Button variant="secondary">
            Join the launch list
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </section>
    </main>
  );
}
