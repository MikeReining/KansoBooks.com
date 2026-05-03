import {
  ArrowRight,
  Banknote,
  BarChart3,
  BookOpen,
  Box,
  Check,
  CheckCircle2,
  CircleAlert,
  Code2,
  Database,
  FileText,
  FolderOpen,
  LockKeyhole,
  Pencil,
  ReceiptText,
  Search,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const WAITLIST_URL = "https://tally.so/r/pb4O9P";
const TRANSPARENT_LOGO_SRC = "/brand/kanso-logo-transparent.png";

export const metadata: Metadata = {
  title: "The KansoBooks Manifesto | The books should be yours",
  description:
    "KansoBooks is built for owned records, visible proof, AI-assisted drafting, and books you can hand to your accountant with confidence.",
};

const proofRows = [
  {
    question: "Am I done?",
    before: "Unknown",
    after: "Yes",
  },
  {
    question: "Is this right?",
    before: "Unverified",
    after: "Verified",
  },
  {
    question: "Can I prove it?",
    before: "Not yet",
    after: "Evidence attached",
  },
];

const vendorRecordInputs = [
  { label: "Bank data", icon: Banknote },
  { label: "Receipts", icon: ReceiptText },
  { label: "Invoices", icon: FileText },
  { label: "Categories", icon: Pencil },
  { label: "Decisions", icon: UserCheck },
] satisfies Array<{ label: string; icon: LucideIcon }>;

const vendorRecordRisks = [
  "Subscription required",
  "Migration friction",
  "Vendor-controlled workflow",
  "Context lost on export",
  "Pricing power",
];

const proofRecordLayers = [
  { label: "Source files", icon: FolderOpen },
  { label: "Extracted facts", icon: FileText },
  { label: "Matches", icon: CheckCircle2 },
  { label: "Policy checks", icon: ShieldCheck },
  { label: "Review decisions", icon: UserCheck },
  { label: "Final reports", icon: BarChart3 },
  { label: "Accountant package", icon: Box },
] satisfies Array<{ label: string; icon: LucideIcon }>;

const proofRecordChecks = [
  "Owned files",
  "Visible evidence",
  "Recorded decisions",
  "Reproducible reports",
  "Portable package",
];

const boundaryColumns = [
  {
    title: "AI prepares",
    items: [
      "Suggested category",
      "Receipt match",
      "Transfer candidate",
      "Duplicate warning",
    ],
    tone: "draft",
  },
  {
    title: "Kanso proves",
    items: ["Evidence check", "Match reason", "Policy check", "Balance check"],
    tone: "prove",
  },
  {
    title: "You approve",
    items: ["Accept", "Reject", "Override", "Send to accountant"],
    tone: "approve",
  },
] satisfies Array<{
  title: string;
  items: string[];
  tone: "draft" | "prove" | "approve";
}>;

const gitMomentRows = [
  {
    record: "Code",
    icon: Code2,
    shift: "Git",
    before: "Code trapped in centralized systems",
    after: "Portable history and reviewable changes.",
  },
  {
    record: "Writing",
    icon: FileText,
    shift: "Markdown",
    before: "Documents trapped in app workflows",
    after: "Plain files and durable formats.",
  },
  {
    record: "Data",
    icon: Database,
    shift: "Postgres / SQLite",
    before: "Data locked inside proprietary tools",
    after: "Open engines and clean exports.",
  },
  {
    record: "Business books",
    icon: BookOpen,
    shift: "KansoBooks",
    before: "Books trapped in vendor clouds",
    after: "Owned records, visible proof, and portable packages.",
  },
] satisfies Array<{
  record: string;
  icon: LucideIcon;
  shift: string;
  before: string;
  after: string;
}>;

const finishLines = [
  { label: "All transactions accounted for.", tone: "success" },
  { label: "Everything reconciled.", tone: "success" },
  { label: "2 items need review.", tone: "warning" },
  { label: "Ready for your accountant.", tone: "success" },
] satisfies Array<{ label: string; tone: "success" | "warning" }>;

const accountantPackageItems = [
  "Categorized transactions",
  "Source evidence",
  "Reconciliation summary",
  "Unresolved items",
  "User decisions",
  "Export log",
];

function Wordmark() {
  return (
    <Link className="flex items-center gap-3" href="/" aria-label="KansoBooks">
      <Image
        alt=""
        aria-hidden="true"
        className="size-9"
        height={36}
        priority
        src={TRANSPARENT_LOGO_SRC}
        width={36}
      />
      <span className="text-2xl font-semibold text-foreground">
        Kanso<span className="font-normal">Books</span>
      </span>
    </Link>
  );
}

function StatusPill({
  children,
  state,
}: {
  children: React.ReactNode;
  state: "before" | "after";
}) {
  const isAfter = state === "after";

  return (
    <span
      className={`inline-flex h-11 min-w-[132px] items-center justify-center gap-3 rounded-full border px-5 text-base leading-none shadow-sm ${
        isAfter
          ? "border-[#dce7d8] bg-[#edf4e9] text-[#1f6b28]"
          : "border-[#e0ddd4] bg-white/70 text-[#514e48]"
      }`}
    >
      <span
        className={`flex size-6 items-center justify-center rounded-full ${
          isAfter ? "border border-[#1f6b28]" : "border border-dashed border-[#74716a]"
        }`}
        aria-hidden="true"
      >
        {isAfter ? <Check className="size-4" strokeWidth={2.2} /> : null}
      </span>
      <span className="[font-family:Georgia,ui-serif,serif]">{children}</span>
    </span>
  );
}

function ThreeQuestionsVisual() {
  return (
    <div className="mt-14 border-y border-[#d9d5cc]">
      {proofRows.map((row) => (
        <div
          className="grid gap-6 border-b border-[#d9d5cc] py-7 last:border-b-0 lg:grid-cols-[1fr_0.92fr] lg:items-center"
          key={row.question}
        >
          <p className="[font-family:Georgia,ui-serif,serif] text-5xl leading-none text-[#070807] sm:text-6xl lg:text-7xl">
            {row.question}
          </p>
          <div className="grid gap-4 sm:grid-cols-[auto_72px_auto] sm:items-center lg:justify-end">
            <StatusPill state="before">{row.before}</StatusPill>
            <ArrowRight
              className="hidden size-8 justify-self-center text-[#aaa59a] sm:block"
              strokeWidth={1.4}
              aria-hidden="true"
            />
            <StatusPill state="after">{row.after}</StatusPill>
          </div>
        </div>
      ))}
    </div>
  );
}

function ManifestoHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#d9d5cc] bg-[#f7f4ed] px-5 py-8 sm:px-8 lg:min-h-[900px] lg:px-10">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="absolute left-[-88px] top-[47%] hidden size-[180px] rounded-full border border-[#d9d5cc] lg:block" />
        <span className="absolute right-[7%] top-0 hidden h-full w-px bg-[#ddd8cf] lg:block" />
        <span className="absolute right-0 top-[29%] hidden h-px w-[31%] bg-[#ddd8cf] lg:block" />
        <span className="absolute right-[12%] top-[29%] hidden size-11 -translate-y-1/2 rounded-full border border-[#d9d5cc] lg:block" />
        <span className="absolute right-[12%] top-[29%] hidden size-2 -translate-y-1/2 rounded-full bg-[#236b26] lg:block" />
        <span className="absolute bottom-[46%] right-[-80px] hidden size-[280px] rounded-full border border-[#d9d5cc] lg:block" />
      </div>

      <div className="relative mx-auto max-w-[1320px]">
        <header className="flex items-center justify-between gap-5">
          <Wordmark />
          <a
            className="hidden text-sm font-medium text-[#2e6d35] transition-colors hover:text-[#16481d] sm:inline-flex"
            href={WAITLIST_URL}
          >
            Join waitlist
          </a>
        </header>

        <div className="max-w-[1060px] pt-20 sm:pt-24 lg:pt-28">
          <h1 className="[font-family:Georgia,ui-serif,serif] text-6xl leading-[1.06] text-[#070807] sm:text-7xl lg:text-8xl">
            Your books should not become someone else&apos;s moat.
          </h1>
          <p className="mt-8 max-w-[900px] [font-family:Georgia,ui-serif,serif] text-2xl leading-9 text-[#5c5a55] sm:text-3xl">
            Every year you stay in a closed accounting system, your evidence,
            rules, decisions, and history get harder to move. That dependency is
            the business model.
          </p>
          <p className="mt-6 max-w-[900px] text-xl font-semibold leading-8 text-[#282621]">
            KansoBooks is built against that model: open books format, visible
            proof, local records, accountant-ready packages, and AI agents that
            can help without begging for vendor API access.
          </p>
        </div>

        <div className="mt-16">
          <p className="text-xs font-semibold uppercase leading-6 tracking-[0.42em] text-[#2e6d35]">
            The ownership test
          </p>
          <ThreeQuestionsVisual />
        </div>

        <div className="grid gap-5 border-t border-[#d9d5cc] py-7 sm:grid-cols-[auto_1fr] sm:items-center lg:grid-cols-[auto_1fr_auto]">
          <div className="flex items-center gap-5">
            <Image
              alt=""
              aria-hidden="true"
              className="size-8"
              height={32}
              src={TRANSPARENT_LOGO_SRC}
              width={32}
            />
            <span className="hidden h-8 w-px bg-[#cfc9be] sm:block" />
          </div>
          <p className="[font-family:Georgia,ui-serif,serif] text-lg leading-7 text-[#282621]">
            KansoBooks creates books that are owned, inspectable, and portable.
          </p>
          <p className="text-xs font-semibold uppercase leading-6 tracking-[0.34em] text-[#2e6d35]">
            Owned / Inspectable / Portable
          </p>
        </div>
      </div>
    </section>
  );
}

function AccusationSection() {
  return (
    <section className="border-b border-[#272a27] bg-[#111411] px-5 py-20 text-[#f7f4ed] sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.86fr_1fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase leading-6 tracking-[0.34em] text-[#9abf92]">
            The old bargain
          </p>
          <h2 className="mt-6 [font-family:Georgia,ui-serif,serif] text-5xl leading-[1.08] text-white sm:text-6xl">
            Every workflow becomes another switching cost.
          </h2>
        </div>

        <div className="grid gap-7 text-xl leading-9 text-[#d9d4ca]">
          <p>
            The old model turns your own financial history into leverage against
            you.
          </p>
          <p>
            Receipts, categories, evidence links, rules, decisions, accountant
            workflows, and integrations all become harder to move the longer
            the record lives inside one vendor&apos;s system.
          </p>
          <p>
            Your books are not just rows in someone else&apos;s database. They
            are the record of what your business earned, spent, owed, collected,
            built, and survived.
          </p>
          <div className="grid gap-4 border-l border-[#556153] pl-6 text-[#f7f4ed]">
            <p>They should not require a subscription to remain useful.</p>
            <p>They should not require a gated API to be improved.</p>
            <p>They should not become a vendor&apos;s retention strategy.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BoundarySection() {
  return (
    <section className="border-b border-[#d9d5cc] bg-[#f7f4ed] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div>
          <p className="text-xs font-semibold uppercase leading-6 tracking-[0.34em] text-[#2e6d35]">
            AI prepares / Kanso proves / You approve
          </p>
          <h2 className="mt-6 max-w-[1060px] [font-family:Georgia,ui-serif,serif] text-5xl leading-[1.08] text-[#070807] sm:text-6xl lg:text-7xl">
            AI should draft the work. It should not decide what becomes true.
          </h2>
          <p className="mt-6 max-w-[850px] [font-family:Georgia,ui-serif,serif] text-2xl leading-9 text-[#5c5a55]">
            KansoBooks draws the boundary: AI prepares, Kanso proves, you
            approve, and the result belongs to you.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {boundaryColumns.map((column, index) => {
            const isCenter = column.tone === "prove";

            return (
              <div
                className={`rounded-lg border p-6 ${
                  isCenter
                    ? "border-[#2e6d35] bg-white/45 shadow-[0_18px_45px_rgba(20,24,20,0.08)]"
                    : "border-dashed border-[#cfc9be] bg-white/20"
                }`}
                key={column.title}
              >
                <h3 className="[font-family:Georgia,ui-serif,serif] text-3xl leading-9 text-[#070807]">
                  {column.title}
                </h3>
                <div className="mt-6 grid gap-3">
                  {column.items.map((item) => (
                    <div
                      className="flex h-14 items-center gap-4 rounded-md border border-[#d9d5cc] bg-[#fbfaf6] px-4 text-sm font-medium text-[#282621] shadow-[0_8px_18px_rgba(20,24,20,0.07)]"
                      key={item}
                    >
                      <span
                        className={`flex size-6 shrink-0 items-center justify-center rounded-full border ${
                          isCenter
                            ? "border-[#2e6d35] text-[#2e6d35]"
                            : "border-[#cfc9be] text-[#5c5a55]"
                        }`}
                      >
                        {isCenter || index === 2 ? (
                          <Check
                            className="size-3.5"
                            strokeWidth={2.2}
                            aria-hidden="true"
                          />
                        ) : null}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                {isCenter ? (
                  <div className="mt-6 rounded-full border border-[#d9e6d5] bg-[#edf4e9] px-5 py-3 text-center text-sm font-semibold text-[#2e6d35]">
                    Verified logic
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-8 border-t border-[#d9d5cc] pt-8 text-center">
          <p className="[font-family:Georgia,ui-serif,serif] text-3xl leading-[1.2] text-[#070807] sm:text-4xl">
            AI prepares. Kanso proves. You approve.
          </p>
          <p className="mt-3 text-lg leading-8 text-[#5c5a55]">
            Nothing becomes true until it is checked and approved.
          </p>
        </div>

        <div className="mt-8 grid gap-5 border-t border-[#d9d5cc] pt-7 sm:grid-cols-[auto_1fr] sm:items-center lg:grid-cols-[auto_1fr_auto]">
          <div className="flex items-center gap-5">
            <Image
              alt=""
              aria-hidden="true"
              className="size-8"
              height={32}
              src={TRANSPARENT_LOGO_SRC}
              width={32}
            />
            <span className="hidden h-8 w-px bg-[#cfc9be] sm:block" />
          </div>
          <p className="[font-family:Georgia,ui-serif,serif] text-lg leading-7 text-[#282621]">
            KansoBooks keeps AI useful, proof visible, and authority with the
            user.
          </p>
          <p className="text-xs font-semibold uppercase leading-6 tracking-[0.34em] text-[#2e6d35]">
            Useful / Visible / Accountable
          </p>
        </div>
      </div>
    </section>
  );
}

function VendorRecordCore() {
  return (
    <div
      className="relative mx-auto h-[248px] w-[260px] shrink-0"
      aria-hidden="true"
    >
      <div className="absolute bottom-7 left-[48px] h-[174px] w-[156px] -skew-y-[12deg] rounded-sm border border-white/10 bg-gradient-to-br from-[#2b2d29] via-[#111310] to-[#050605] shadow-[inset_-18px_0_34px_rgba(0,0,0,0.5)]" />
      <div className="absolute bottom-[181px] left-[65px] h-[58px] w-[169px] skew-x-[38deg] rounded-sm border border-white/10 bg-gradient-to-br from-[#4b4d46] via-[#2a2d27] to-[#10120f]" />
      <div className="absolute bottom-7 left-[96px] h-[174px] w-[150px] rounded-sm border border-white/15 bg-gradient-to-br from-[#20231f] via-[#10120f] to-[#050605] shadow-[inset_18px_18px_44px_rgba(255,255,255,0.05),inset_-22px_-24px_42px_rgba(0,0,0,0.7),0_26px_55px_rgba(0,0,0,0.34)]">
        <div className="absolute inset-4 rounded-sm border border-white/5 bg-black/20" />
        <span className="absolute left-9 top-12 text-7xl font-semibold text-white/[0.045]">
          ?
        </span>
        <span className="absolute right-8 top-7 text-6xl font-semibold text-white/[0.04]">
          ?
        </span>
        <span className="absolute bottom-8 right-8 size-16 rounded-full border-[13px] border-white/[0.04]" />
        <span className="absolute left-12 top-7 size-14 rounded-full border-[11px] border-white/[0.035]" />
        <span className="absolute inset-x-3 top-0 h-12 rounded-full bg-white/[0.035] blur-xl" />
      </div>
    </div>
  );
}

function VendorRecordPanel() {
  return (
    <div className="rounded-lg border border-white/10 bg-[#111411] p-6 text-[#f7f4ed] shadow-[0_22px_70px_rgba(20,24,20,0.16)] lg:p-8">
      <h3 className="[font-family:Georgia,ui-serif,serif] text-3xl leading-9 text-white">
        Vendor-controlled books
      </h3>

      <div className="mt-8 grid gap-8 xl:grid-cols-[184px_1fr] xl:items-center">
        <div className="grid gap-3">
          {vendorRecordInputs.map(({ label, icon: Icon }) => (
            <div
              className="flex h-14 items-center gap-4 rounded-md border border-white/10 bg-white/[0.07] px-4 text-sm font-medium text-[#e8e1d4] shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
              key={label}
            >
              <Icon
                className="size-5 shrink-0 text-[#aba79e]"
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_160px] md:items-center xl:grid-cols-1">
          <VendorRecordCore />

          <div className="grid gap-5">
            <div className="rounded-md border border-white/10 bg-white/[0.06] p-5 text-center shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
              <p className="[font-family:Georgia,ui-serif,serif] text-2xl leading-8 text-white">
                Export
              </p>
              <p className="mt-1 text-base italic leading-7 text-[#c7c0b5]">
                Partial context.
              </p>
            </div>
            <ul className="grid gap-3">
              {vendorRecordRisks.map((risk) => (
                <li
                  className="flex items-center gap-3 border-b border-white/10 pb-3 text-sm leading-6 text-[#c7c0b5] last:border-b-0"
                  key={risk}
                >
                  <CircleAlert
                    className="size-4 shrink-0 text-[#c7c0b5]"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProofRecordPanel() {
  return (
    <div className="rounded-lg border border-[#d9d5cc] bg-white/35 p-6 shadow-[0_22px_70px_rgba(20,24,20,0.08)] lg:p-8">
      <h3 className="[font-family:Georgia,ui-serif,serif] text-3xl leading-9 text-[#070807]">
        Owned Kanso <span className="italic text-[#2e6d35]">record</span>
      </h3>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_0.9fr] xl:items-center">
        <div className="grid gap-3">
          {proofRecordLayers.map(({ label, icon: Icon }) => (
            <div
              className="flex h-14 items-center gap-4 rounded-md border border-[#d9d5cc] bg-[#fbfaf6] px-4 text-sm font-medium text-[#282621] shadow-[0_8px_18px_rgba(20,24,20,0.08)]"
              key={label}
            >
              <Icon
                className="size-5 shrink-0 text-[#2e6d35]"
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-8">
          <div className="rounded-md border border-[#d9d5cc] bg-[#fbfaf6] p-6 text-center shadow-[0_10px_24px_rgba(20,24,20,0.08)]">
            <p className="[font-family:Georgia,ui-serif,serif] text-2xl leading-8 text-[#070807]">
              Profit & Loss
            </p>
            <p className="mt-1 text-base italic leading-7 text-[#2e6d35]">
              Evidence attached.
            </p>
          </div>

          <ul className="grid gap-3">
            {proofRecordChecks.map((check) => (
              <li
                className="flex items-center gap-3 border-b border-[#d9d5cc] pb-3 text-sm leading-6 text-[#34312b] last:border-b-0"
                key={check}
              >
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-[#2e6d35] text-[#2e6d35]">
                  <Check className="size-3.5" strokeWidth={2.1} aria-hidden="true" />
                </span>
                <span>{check}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ProofSection() {
  return (
    <section className="border-b border-[#d9d5cc] bg-[#f7f4ed] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div>
          <p className="text-xs font-semibold uppercase leading-6 tracking-[0.34em] text-[#2e6d35]">
            Vendor lock-in vs. owned books
          </p>
          <h2 className="mt-6 max-w-[1000px] [font-family:Georgia,ui-serif,serif] text-5xl leading-[1.08] text-[#070807] sm:text-6xl lg:text-7xl">
            Exporting your data is not the same as owning your books.
          </h2>
          <p className="mt-6 max-w-[900px] [font-family:Georgia,ui-serif,serif] text-2xl leading-9 text-[#5c5a55]">
            The old model lets your data leave. The new model lets the whole
            record travel: evidence, decisions, rules, reports, and handoff
            package.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <VendorRecordPanel />
          <ProofRecordPanel />
        </div>

        <div className="mx-auto mt-9 max-w-[940px] text-center">
          <p className="[font-family:Georgia,ui-serif,serif] text-3xl leading-[1.2] text-[#070807] sm:text-4xl">
            A CSV export is not ownership if the record falls apart when it
            leaves.
          </p>
          <p className="mt-4 text-lg leading-8 text-[#5c5a55]">
            Your books should be more than data you can download. They should be
            a complete record you can carry forward.
          </p>
        </div>

        <div className="mt-8 grid gap-5 border-t border-[#d9d5cc] pt-7 sm:grid-cols-[auto_1fr] sm:items-center lg:grid-cols-[auto_1fr_auto]">
          <div className="flex items-center gap-5">
            <Image
              alt=""
              aria-hidden="true"
              className="size-8"
              height={32}
              src={TRANSPARENT_LOGO_SRC}
              width={32}
            />
            <span className="hidden h-8 w-px bg-[#cfc9be] sm:block" />
          </div>
          <p className="[font-family:Georgia,ui-serif,serif] text-lg leading-7 text-[#282621]">
            KansoBooks turns financial outputs into records that travel with
            their evidence.
          </p>
          <p className="text-xs font-semibold uppercase leading-6 tracking-[0.34em] text-[#2e6d35]">
            Owned / Portable / Provable
          </p>
        </div>
      </div>
    </section>
  );
}

function GitMomentSection() {
  return (
    <section className="border-b border-[#d9d5cc] bg-[#f7f4ed] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div>
          <p className="text-xs font-semibold uppercase leading-6 tracking-[0.34em] text-[#2e6d35]">
            The Git moment for books
          </p>
          <h2 className="mt-6 max-w-[1060px] [font-family:Georgia,ui-serif,serif] text-5xl leading-[1.08] text-[#070807] sm:text-6xl lg:text-7xl">
            Every locked record eventually becomes portable.
          </h2>
          <p className="mt-6 max-w-[900px] [font-family:Georgia,ui-serif,serif] text-2xl leading-9 text-[#5c5a55]">
            Code did. Writing did. Data did. Your business books are next.
          </p>
        </div>

        <div className="mt-12 overflow-hidden border-y border-[#d9d5cc]">
          {gitMomentRows.map(({ record, icon: Icon, shift, before, after }) => (
            <div
              className={`grid gap-5 border-b border-[#d9d5cc] py-6 last:border-b-0 lg:grid-cols-[240px_1fr_auto_1fr] lg:items-center ${
                record === "Business books"
                  ? "rounded-lg border border-[#2e6d35] bg-white/35 px-5"
                  : ""
              }`}
              key={record}
            >
              <div className="flex items-center gap-5">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-md border border-[#d9d5cc] bg-white/45 text-[#2e6d35]">
                  <Icon className="size-7" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <p className="[font-family:Georgia,ui-serif,serif] text-3xl leading-9 text-[#070807]">
                  {record}
                </p>
              </div>
              <div className="rounded-lg border border-[#d9d5cc] bg-[#fbfaf6] p-5">
                <div className="flex gap-4">
                  <LockKeyhole
                    className="mt-1 size-5 shrink-0 text-[#6f6b63]"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="[font-family:Georgia,ui-serif,serif] text-xl leading-7 text-[#070807]">
                      Before
                    </p>
                    <p className="mt-1 text-base leading-6 text-[#34312b]">
                      {before}
                    </p>
                  </div>
                </div>
              </div>
              <ArrowRight
                className="hidden size-7 text-[#aaa59a] lg:block"
                strokeWidth={1.4}
                aria-hidden="true"
              />
              <div className="rounded-lg border border-[#d9d5cc] bg-[#fbfaf6] p-5">
                <div className="flex gap-4">
                  <CheckCircle2
                    className="mt-1 size-5 shrink-0 text-[#2e6d35]"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="[font-family:Georgia,ui-serif,serif] text-xl leading-7 text-[#2e6d35]">
                      {shift}
                    </p>
                    <p className="mt-1 text-base leading-6 text-[#34312b]">
                      {after}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9 text-center">
          <p className="[font-family:Georgia,ui-serif,serif] text-3xl leading-[1.2] text-[#070807] sm:text-4xl">
            First the record becomes portable. Then the tools compete on
            experience.
          </p>
          <p className="mx-auto mt-4 max-w-[900px] text-lg leading-8 text-[#5c5a55]">
            KansoBooks applies that shift to bookkeeping with an open books
            format: source files, evidence links, review decisions, validation
            results, reports, and accountant packages in a record you can keep.
          </p>
          <p className="mx-auto mt-4 max-w-[900px] text-lg font-semibold leading-8 text-[#282621]">
            Your receipts, expenses, statements, decisions, and financial
            history should not be turned into vendor leverage. They should be
            yours.
          </p>
        </div>

        <div className="mt-8 grid gap-5 border-t border-[#d9d5cc] pt-7 sm:grid-cols-[auto_1fr] sm:items-center lg:grid-cols-[auto_1fr_auto]">
          <div className="flex items-center gap-5">
            <Image
              alt=""
              aria-hidden="true"
              className="size-8"
              height={32}
              src={TRANSPARENT_LOGO_SRC}
              width={32}
            />
            <span className="hidden h-8 w-px bg-[#cfc9be] sm:block" />
          </div>
          <p className="[font-family:Georgia,ui-serif,serif] text-lg leading-7 text-[#282621]">
            KansoBooks turns business books into records you can own and review.
          </p>
          <p className="text-xs font-semibold uppercase leading-6 tracking-[0.34em] text-[#2e6d35]">
            Owned / Portable / Reviewable
          </p>
        </div>
      </div>
    </section>
  );
}

function FinishSection() {
  return (
    <section className="bg-[#f7f4ed] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div>
          <p className="text-xs font-semibold uppercase leading-6 tracking-[0.34em] text-[#2e6d35]">
            The clean books finish line
          </p>
          <h2 className="mt-6 max-w-[1000px] [font-family:Georgia,ui-serif,serif] text-6xl leading-[1.04] text-[#070807] sm:text-7xl lg:text-8xl">
            Done should mean done.
          </h2>
          <p className="mt-6 max-w-[900px] [font-family:Georgia,ui-serif,serif] text-2xl leading-9 text-[#5c5a55]">
            Not because the software said so. Because the evidence is there.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.5fr] lg:items-start">
          <div>
            <div className="overflow-hidden rounded-lg border border-[#d9d5cc] bg-white/35 shadow-[0_18px_45px_rgba(20,24,20,0.08)]">
              {finishLines.map((line) => (
                <div
                  className="flex items-center gap-6 border-b border-[#d9d5cc] px-6 py-6 last:border-b-0"
                  key={line.label}
                >
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-full border ${
                      line.tone === "warning"
                        ? "border-[#a87919] bg-[#f7eddb] text-[#8a650f]"
                        : "border-[#2e6d35] bg-[#edf4e9] text-[#1f6b28]"
                    }`}
                  >
                    {line.tone === "warning" ? (
                      <CircleAlert
                        className="size-7"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    ) : (
                      <Check
                        className="size-7"
                        strokeWidth={2.1}
                        aria-hidden="true"
                      />
                    )}
                  </span>
                  <p className="[font-family:Georgia,ui-serif,serif] text-3xl leading-10 text-[#070807] sm:text-4xl">
                    {line.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Review 2 items", icon: Search },
                { label: "View evidence", icon: FileText },
                { label: "Send accountant package", icon: Box },
              ].map(({ label, icon: Icon }) => (
                <div
                  className="flex min-h-20 items-center justify-between gap-4 rounded-md border border-[#d9d5cc] bg-white/35 px-5 py-4 text-[#282621]"
                  key={label}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className="size-6 shrink-0 text-[#2e6d35]"
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium leading-5">
                      {label}
                    </span>
                  </div>
                  <ArrowRight
                    className="size-5 shrink-0 text-[#6f6b63]"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[#d9d5cc] bg-white/35 p-6 shadow-[0_18px_45px_rgba(20,24,20,0.08)]">
            <div className="flex items-center gap-5 border-b border-[#d9d5cc] pb-6">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-[#d9d5cc] bg-[#fbfaf6] text-[#2e6d35]">
                <FolderOpen
                  className="size-8"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </span>
              <p className="[font-family:Georgia,ui-serif,serif] text-3xl leading-9 text-[#070807]">
                Accountant package
              </p>
            </div>
            <ul className="mt-6 grid gap-4">
              {accountantPackageItems.map((item) => (
                <li
                  className="flex items-center gap-4 border-b border-[#d9d5cc] pb-4 text-base leading-7 text-[#34312b] last:border-b-0"
                  key={item}
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-[#2e6d35] text-[#2e6d35]">
                    <Check
                      className="size-4"
                      strokeWidth={2.1}
                      aria-hidden="true"
                    />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-y border-[#d9d5cc] py-10 text-center">
          <p className="[font-family:Georgia,ui-serif,serif] text-3xl leading-[1.2] text-[#070807] sm:text-4xl">
            The goal is not better lock-in. The goal is zero vendor lock-in.
          </p>
          <p className="mx-auto mt-4 max-w-[800px] text-lg leading-8 text-[#5c5a55]">
            Portable records prevent monopolistic rent seeking and let better
            tools, accountants, and AI agents help without asking a vendor for
            permission.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center lg:grid-cols-[auto_1fr_auto]">
          <div className="flex items-center gap-5">
            <Image
              alt=""
              aria-hidden="true"
              className="size-8"
              height={32}
              src={TRANSPARENT_LOGO_SRC}
              width={32}
            />
            <span className="hidden h-8 w-px bg-[#cfc9be] sm:block" />
          </div>
          <p className="[font-family:Georgia,ui-serif,serif] text-lg leading-7 text-[#282621]">
            KansoBooks makes finished books reviewable, portable, and provable.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <p className="text-xs font-semibold uppercase leading-6 tracking-[0.34em] text-[#2e6d35]">
              Done / Portable / Provable
            </p>
            <a
              className="inline-flex h-12 items-center justify-center rounded-md bg-[#2e6d35] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#1f4f24]"
              href={WAITLIST_URL}
            >
              Join waitlist
            </a>
            <Link
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[#d9d5cc] px-6 text-sm font-semibold text-[#282621] transition-colors hover:border-[#2e6d35]"
              href="/"
            >
              Back to product
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ManifestoPage() {
  return (
    <main className="min-h-svh bg-background">
      <ManifestoHero />
      <AccusationSection />
      <BoundarySection />
      <ProofSection />
      <GitMomentSection />
      <FinishSection />
    </main>
  );
}
