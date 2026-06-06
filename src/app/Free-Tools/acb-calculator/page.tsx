import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  FileSpreadsheet,
  LockKeyhole,
  Upload,
} from "lucide-react";

import { AcbCalculatorClient } from "./AcbCalculatorClient";

const GOOGLE_SHEETS_COPY_URL =
  "https://docs.google.com/spreadsheets/d/1kovHZbl-xfIgDNtptMGjti6BefufwlifA5rYA4sYG70/copy";

export const metadata: Metadata = {
  title: "ACB Calculator Canada | Free Adjusted Cost Base Calculator",
  description:
    "Free Canadian ACB calculator for stocks and ETFs. Enter trades manually or import a CSV, calculate adjusted cost base, and export your worksheet with no login.",
  alternates: { canonical: "/Free-Tools/acb-calculator" },
};

const assurances = [
  { label: "No login", icon: LockKeyhole },
  { label: "CSV import", icon: Upload },
  { label: "Export worksheet", icon: FileSpreadsheet },
  { label: "Runs in your browser", icon: CheckCircle2 },
];

export default function AcbCalculatorPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            KansoBooks
          </Link>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Free tax tool
              </p>
              <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                ACB Calculator Canada
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                Calculate adjusted cost base for Canadian stocks and ETFs with a
                simple transaction table. Also called cost basis or average cost
                basis in some investing contexts, ACB is the Canadian tax term
                used for capital gains reporting.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <h2 className="text-base font-semibold">Built to be useful</h2>
              <div className="mt-4 grid gap-3">
                {assurances.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-sm">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                      <item.icon className="size-4" />
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
              <a
                className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
                href={GOOGLE_SHEETS_COPY_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FileSpreadsheet className="size-4" />
                Copy Google Sheet
              </a>
              <a
                className="mt-2 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-muted"
                href="/free-tools/acb-calculator/kansobooks-acb-calculator-template.xlsx"
              >
                <FileSpreadsheet className="size-4" />
                Download Excel workbook
              </a>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Prefer your own saved file? Copy the Google Sheet or download
                the Excel workbook. No account with KansoBooks required.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AcbCalculatorClient />
      </section>

      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              What this handles
            </h2>
            <p className="mt-2">
              Buys, sells, DRIPs, returns of capital, stock splits, commissions,
              CAD amounts, and basic foreign-currency conversion when you provide
              an FX rate.
            </p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              What to export
            </h2>
            <p className="mt-2">
              Export the transaction CSV, print the calculation log, copy the
              Google Sheet, or download the Excel workbook to keep a saved copy.
            </p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Filing note
            </h2>
            <p className="mt-2">
              This worksheet is for planning and review. ACB edge cases can be
              subtle, especially superficial losses, foreign currency, and
              multiple brokerage accounts.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
