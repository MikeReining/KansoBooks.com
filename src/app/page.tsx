import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Banknote,
  Box,
  Briefcase,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  CircleHelp,
  CreditCard,
  DollarSign,
  Eye,
  FileText,
  House,
  Landmark,
  Laptop,
  Link2,
  ListChecks,
  LockKeyhole,
  Monitor,
  Package,
  PlaySquare,
  Quote,
  ReceiptText,
  RotateCw,
  Scale,
  Send,
  ShieldCheck,
  Sparkles,
  Tag,
  TriangleAlert,
  Upload,
  User,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const WAITLIST_URL = "https://tally.so/r/pb4O9P";

const navLinks = [
  {
    label: "Demo",
    href: "#demo",
  },
  {
    label: "Who it's for",
    href: "#who-its-for",
  },
  {
    label: "QuickBooks",
    href: "#quickbooks",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
];

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Demo", href: "#demo" },
      { label: "Pricing", href: "#pricing" },
      { label: "QuickBooks migration", href: "#quickbooks" },
      { label: "Privacy", href: "#privacy" },
    ],
  },
  {
    title: "Who it's for",
    links: [
      { label: "Consultants", href: "#who-its-for" },
      { label: "Agencies", href: "#who-its-for" },
      { label: "Creators / 1099s", href: "#who-its-for" },
      { label: "Real estate operators", href: "#who-its-for" },
      { label: "Small SaaS", href: "#who-its-for" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Manifesto", href: "/manifesto" },
      { label: "Join waitlist", href: WAITLIST_URL },
      { label: "X", href: "https://x.com/kansobooks" },
    ],
  },
];

const intakeSources = [
  { label: "Bank", icon: Landmark },
  { label: "Card", icon: CreditCard },
  { label: "Stripe", icon: DollarSign },
  { label: "Receipts", icon: ReceiptText },
  { label: "Invoices", icon: FileText },
];

const eveTasks = [
  "482 transactions organized",
  "38 transfers paired",
  "22 receipts matched",
];

const kansoChecks = [
  "Bank balances match",
  "Trial balance balances",
  "Evidence linked",
  "Audit trail written",
];

const proofItems = [
  {
    label: "10x faster",
    icon: Zap,
  },
  {
    label: "80% less than QuickBooks",
    icon: Banknote,
  },
  {
    label: "Bookkeeper-quality output",
    icon: ShieldCheck,
  },
];

const userWorkflowSteps = [
  {
    label: "Add monthly statements and receipts",
    icon: FileText,
  },
  {
    label: "Review the few items that need you",
    icon: Eye,
  },
  {
    label: "Share reports or the year-end package",
    icon: Send,
  },
];

const handledWorkflowSteps = [
  {
    label: "Eve organizes transactions, receipts, transfers, and categories",
    icon: "eve",
  },
  {
    label: "Kanso checks matches, balances, and issues every month",
    icon: "kanso",
  },
  {
    label: "Clean financial statements plus tax & audit ready books",
    icon: "package",
  },
] satisfies Array<{
  label: string;
  icon: "eve" | "kanso" | "package";
}>;

const workflowRowsClass = "mt-9 divide-y divide-border";
const workflowRowClass = "h-[132px] py-5";

const proofTrustItems = [
  "Every transaction links back to evidence",
  "Every issue is explained before you review it",
  "Every finished package includes an audit trail",
];

const proofTrailSteps = [
  {
    title: "Bank transaction",
    detail: "Stripe payout - $4,820.14",
    icon: Landmark,
  },
  {
    title: "Eve matches",
    detail: "bank.csv + stripe.csv",
    type: "eve-thinking",
  },
  {
    title: "Reviewed as",
    detail: "Revenue payout, fees separated",
    icon: Eye,
  },
] satisfies Array<{
  title: string;
  detail: string;
  icon?: LucideIcon;
  type?: "eve" | "eve-thinking" | "kanso";
}>;

const accountantOutputItems = [
  {
    label: "Profit & Loss and core financial reports",
    icon: BarChart3,
  },
  {
    label: "Linked receipts, statements, and source evidence",
    icon: Link2,
  },
  {
    label: "A clear audit trail of what was checked and decided",
    icon: ShieldCheck,
  },
  {
    label: "A finished package ready to export or share",
    icon: Box,
  },
];

const kansoDifferenceCards = [
  {
    title: "Cloud accounting software",
    summary: "Tools for doing the bookkeeping yourself.",
    points: [
      "You learn the system",
      "You categorize and clean up",
      "You still wonder if it's right",
    ],
    costLabel: "Free to paid SaaS",
    outcome: "More effort. More uncertainty.",
    tone: "old-software",
  },
  {
    title: "Traditional bookkeeping",
    summary: "Relief from the work, but at service pricing.",
    points: [
      "Human help",
      "Higher service cost",
      "Slower handoff and follow-up",
    ],
    costLabel: "Hundreds per month",
    outcome: "Less work. Higher price.",
    tone: "bookkeeping-service",
  },
  {
    title: "KansoBooks",
    summary: "Finished books with proof behind the numbers.",
    points: [
      "Eve drafts, Kanso proves, you review",
      "Monthly reports with proof trail",
      "Tax and audit ready books",
    ],
    costLabel: "Kanso Core included",
    outcome: "Bookkeeper-level confidence.",
    tone: "kanso",
  },
] satisfies Array<{
  title: string;
  summary: string;
  points: string[];
  costLabel: string;
  outcome: string;
  tone: "old-software" | "bookkeeping-service" | "kanso";
}>;

const privacyBullets = [
  "Your books are stored locally on your computer",
  "Eve only reads what you explicitly allow",
  "Kanso records what was shared and why",
  "You choose when to export or send the package",
];

const localDataItems = [
  {
    label: "Statements",
    icon: FileText,
  },
  {
    label: "Receipts",
    icon: ReceiptText,
  },
  {
    label: "Decisions",
    icon: CheckCircle2,
  },
  {
    label: "Audit trail",
    icon: Clock,
  },
  {
    label: "Reports",
    icon: BarChart3,
  },
];

const eveAccessRows = [
  {
    label: "Transaction summaries",
    status: "Allowed",
    state: "allowed",
  },
  {
    label: "Receipt contents",
    status: "Ask first",
    state: "ask",
  },
  {
    label: "Statement files",
    status: "Ask first",
    state: "ask",
  },
] satisfies Array<{
  label: string;
  status: string;
  state: "allowed" | "ask";
}>;

const demoReviewItems = [
  {
    title: "Uncategorized expense",
    meta: "$142.50 - 5/14",
    reason: "Choose a category before export.",
    tone: "destructive",
  },
  {
    title: "Missing receipt",
    meta: "$995.00 - 5/07",
    reason: "Receipt required above $100.",
    tone: "warning",
  },
  {
    title: "Missing vendor",
    meta: "$320.00 - 5/03",
    reason: "Vendor helps with classification.",
    tone: "info",
  },
] satisfies Array<{
  title: string;
  meta: string;
  reason: string;
  tone: "destructive" | "warning" | "info";
}>;

const fitCards = [
  {
    title: "Consultants & freelancers",
    description:
      "Client income, software, travel, contractors, and simple expenses.",
    icon: User,
  },
  {
    title: "Agencies & studios",
    description:
      "Project income, contractor payments, subscriptions, and client-related costs.",
    icon: Briefcase,
  },
  {
    title: "Creators & 1099 operators",
    description:
      "Platform income, sponsorships, receipts, and business expenses.",
    icon: PlaySquare,
  },
  {
    title: "Real estate operators",
    description:
      "Property income, repairs, mortgage statements, cards, and vendor receipts.",
    icon: House,
  },
  {
    title: "Indie SaaS / online businesses",
    description:
      "Bank, card, Stripe-style payouts, software, tools, and contractors.",
    icon: Laptop,
  },
];

const migrationMetaItems = [
  {
    label: "Categories",
    icon: Tag,
  },
  {
    label: "Balances",
    icon: DollarSign,
  },
  {
    label: "History",
    icon: Clock,
  },
];

const packageMetaItems = [
  {
    label: "Complete",
    icon: CheckCircle2,
  },
  {
    label: "Organized",
    icon: ListChecks,
  },
  {
    label: "Audit-ready",
    icon: ShieldCheck,
  },
];

function ConnectionLines() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
      viewBox="0 0 900 620"
    >
      <path
        d="M145 102 C178 102 172 205 210 205"
        stroke="var(--primary-soft)"
        strokeWidth="2"
      />
      <path
        d="M145 178 C180 178 175 222 210 222"
        stroke="var(--primary-soft)"
        strokeWidth="2"
      />
      <path
        d="M145 254 C185 254 180 242 210 242"
        stroke="var(--primary-soft)"
        strokeWidth="2"
      />
      <path
        d="M145 330 C180 330 175 262 210 262"
        stroke="var(--primary-soft)"
        strokeWidth="2"
      />
      <path
        d="M145 406 C175 406 172 282 210 282"
        stroke="var(--primary-soft)"
        strokeWidth="2"
      />
      <path
        d="M695 318 C695 346 672 360 690 394"
        stroke="var(--primary-soft)"
        strokeWidth="2"
      />
      <path
        d="M520 492 C552 492 548 472 588 472"
        stroke="var(--primary-soft)"
        strokeWidth="2"
      />
    </svg>
  );
}

function ComparisonIcon({ type }: { type: "quickbooks" | "bench" }) {
  if (type === "quickbooks") {
    return (
      <span className="flex size-14 items-center justify-center rounded-full border border-border bg-card shadow-sm">
        <span className="flex size-10 items-center justify-center rounded-full bg-[#2ca01c] text-lg font-semibold text-white">
          qb
        </span>
      </span>
    );
  }

  return (
    <span className="flex size-14 items-center justify-center rounded-full border border-border bg-card shadow-sm">
      <Image
        alt=""
        aria-hidden="true"
        className="size-10"
        height={40}
        src="/brand/bench-logo.png"
        width={40}
      />
    </span>
  );
}

function DifferenceOldSoftwareIcon() {
  return (
    <div className="relative mx-auto flex size-24 items-center justify-center text-muted-foreground">
      <div className="relative h-[62px] w-[76px] rounded border-2 border-muted-foreground/70 bg-card">
        <div className="flex h-3 items-center gap-1 border-b-2 border-muted-foreground/60 px-2">
          <span className="size-1.5 rounded-full bg-muted-foreground/70" />
          <span className="size-1.5 rounded-full bg-muted-foreground/70" />
          <span className="size-1.5 rounded-full bg-muted-foreground/70" />
        </div>
        <div className="grid grid-cols-2 gap-px p-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <span
              className="h-3 border border-muted-foreground/35"
              key={index}
            />
          ))}
        </div>
      </div>
      <DollarSign
        className="absolute right-2 top-9 size-7 text-muted-foreground"
        strokeWidth={1.7}
        aria-hidden="true"
      />
    </div>
  );
}

function DifferenceBookkeepingIcon() {
  return (
    <div className="relative mx-auto flex size-24 items-center justify-center text-foreground">
      <User
        className="absolute left-3 top-2 size-16"
        strokeWidth={1.6}
        aria-hidden="true"
      />
      <Briefcase
        className="absolute bottom-5 right-5 size-12 bg-card"
        strokeWidth={1.6}
        aria-hidden="true"
      />
      <span className="absolute bottom-3 right-2 flex size-8 items-center justify-center rounded-full border-2 border-card bg-info-soft text-info">
        <Check className="size-5" strokeWidth={2.4} aria-hidden="true" />
      </span>
    </div>
  );
}

function DifferenceKansoIcon() {
  return (
    <div className="mx-auto flex size-24 items-center justify-center">
      <Image
        alt=""
        aria-hidden="true"
        className="size-20"
        height={80}
        src="/brand/kanso-logo.png"
        width={80}
      />
    </div>
  );
}

function KansoDifferenceIcon({
  tone,
}: {
  tone: (typeof kansoDifferenceCards)[number]["tone"];
}) {
  if (tone === "old-software") {
    return <DifferenceOldSoftwareIcon />;
  }

  if (tone === "bookkeeping-service") {
    return <DifferenceBookkeepingIcon />;
  }

  return <DifferenceKansoIcon />;
}

function KansoDifferencePoint({
  children,
  featured,
}: {
  children: React.ReactNode;
  featured: boolean;
}) {
  if (featured) {
    return (
      <li className="flex items-center gap-4 text-base leading-6 text-foreground">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
          <Check className="size-5" strokeWidth={3} aria-hidden="true" />
        </span>
        <span>{children}</span>
      </li>
    );
  }

  return (
    <li className="flex items-center gap-4 text-base leading-6 text-foreground">
      <span className="ml-1 size-2 shrink-0 rounded-full bg-muted-foreground/65" />
      <span>{children}</span>
    </li>
  );
}

function KansoDifferenceCard({
  title,
  summary,
  points,
  costLabel,
  outcome,
  tone,
}: (typeof kansoDifferenceCards)[number]) {
  const featured = tone === "kanso";

  return (
    <article
      className={`relative grid grid-rows-[84px_96px_164px_82px_52px] rounded-lg border bg-card p-5 text-center shadow-[0_16px_45px_rgba(15,23,42,0.06)] ${
        featured
          ? "border-2 border-info shadow-[0_0_0_5px_rgba(20,70,130,0.06),0_20px_55px_rgba(20,70,130,0.14)]"
          : "border-border"
      }`}
    >
      <div className="flex items-center justify-center gap-4">
        {featured ? (
          <Image
            alt=""
            aria-hidden="true"
            className="size-12 shrink-0"
            height={48}
            src="/brand/kanso-logo.png"
            width={48}
          />
        ) : (
          <div className="shrink-0 scale-[0.52]">
            <KansoDifferenceIcon tone={tone} />
          </div>
        )}
        <h3 className="text-left text-2xl font-semibold leading-8 tracking-normal text-foreground">
          {featured ? (
            <>
              Kanso<span className="font-normal">Books</span>
            </>
          ) : (
            title
          )}
        </h3>
      </div>

      <p className="mx-auto flex max-w-[290px] items-center justify-center px-2 text-lg leading-7 text-muted-foreground">
        {summary}
      </p>

      <div className="border-t border-border pt-6 text-left">
        <ul className="grid gap-4">
          {points.map((point) => (
            <KansoDifferencePoint featured={featured} key={point}>
              {point}
            </KansoDifferencePoint>
          ))}
        </ul>
      </div>

      <div className="border-t border-border pt-6">
        {featured ? (
          <div className="grid grid-cols-2 gap-5 text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-info">
                Kanso Core
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-normal text-foreground">
                Included
              </p>
            </div>
            <div className="border-l border-border pl-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-info">
                Eve + Automation
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-normal text-info">
                $99/year
              </p>
            </div>
          </div>
        ) : (
          <p className="text-2xl font-semibold leading-8 tracking-normal text-foreground">
            {costLabel}
          </p>
        )}
      </div>

      <p
        className={`border-t border-border pt-5 text-base font-semibold leading-7 ${
          featured ? "text-info" : "text-muted-foreground"
        }`}
      >
        {outcome}
      </p>
    </article>
  );
}

function KansoDifferenceSection() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-b border-border bg-card px-6 py-14 sm:px-10 lg:py-18"
    >
      <span id="kanso-difference" className="sr-only" aria-hidden="true" />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-6 hidden h-[420px] w-[420px] text-info/10 lg:block"
        fill="none"
        viewBox="0 0 420 420"
      >
        <circle cx="210" cy="210" r="198" stroke="currentColor" />
        <circle cx="210" cy="210" r="178" stroke="currentColor" />
        <circle cx="210" cy="210" r="158" stroke="currentColor" />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-8 hidden h-[460px] w-[460px] text-info/10 lg:block"
        fill="none"
        viewBox="0 0 460 460"
      >
        <circle cx="230" cy="230" r="216" stroke="currentColor" />
        <circle cx="230" cy="230" r="194" stroke="currentColor" />
        <circle cx="230" cy="230" r="172" stroke="currentColor" />
      </svg>

      <div className="relative mx-auto max-w-[1320px] text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-info">
          The Kanso Difference
        </p>
        <h2 className="mx-auto mt-6 max-w-[900px] text-4xl font-semibold leading-[1.12] tracking-normal text-foreground sm:text-5xl lg:text-6xl">
          Why Kanso feels different.
        </h2>
        <p className="mx-auto mt-7 max-w-[820px] text-lg leading-8 text-muted-foreground">
          QuickBooks and Wave give you tools. Bookkeepers give you relief.
          KansoBooks gives you a third path: finished books you can verify, at a
          price small businesses can actually afford.
        </p>
        <p className="mx-auto mt-5 max-w-[760px] text-lg font-semibold leading-8 text-foreground">
          Eve prepares the work. Kanso proves the numbers. You review what needs
          you.
        </p>

        <div className="mt-10 grid gap-6 text-left lg:grid-cols-3">
          {kansoDifferenceCards.map((card) => (
            <KansoDifferenceCard key={card.title} {...card} />
          ))}
        </div>

        <div className="mx-auto mt-7 grid max-w-[1120px] gap-6 rounded-lg border border-info/25 bg-info-soft/25 px-6 py-5 text-left shadow-sm lg:grid-cols-[0.9fr_1.35fr_auto] lg:items-center">
          <div className="flex items-center gap-5">
            <ShieldCheck
              className="size-12 shrink-0 text-info"
              strokeWidth={1.7}
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-info">
                Kanso Core
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-normal text-foreground">
                Included
              </p>
              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                Download and try it.
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-info">
              Eve + Automation
            </p>
            <p className="mt-2 text-xl font-semibold leading-8 text-foreground">
              Bookkeeper-quality AI + automations for $99/year.
              <br />
              Easy to Demo and Try.
            </p>
          </div>

          <Button
            asChild
            className="h-14 px-7 text-base shadow-[0_12px_25px_rgba(20,70,130,0.18)]"
          >
            <a href={WAITLIST_URL}>
              Join Waitlist
              <ArrowRight className="size-5" aria-hidden="true" />
            </a>
          </Button>
        </div>

        <Button
          asChild
          className="mt-8 h-12 px-0 text-lg text-info hover:text-info"
          variant="ghost"
        >
          <a href="#workflow">
            See how Kanso works
            <ArrowRight className="size-6" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </section>
  );
}

function DemoStepNumber({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-info-soft text-3xl font-normal text-info">
      {children}
    </span>
  );
}

function DemoSectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-[0_14px_35px_rgba(15,23,42,0.06)]">
      {children}
    </div>
  );
}

function DemoFileCard({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className="mt-3 flex items-center gap-3">
        <span className="flex size-6 items-center justify-center rounded border border-success/40 bg-success-soft text-[10px] font-semibold text-success">
          CSV
        </span>
        <div className="grid flex-1 gap-2">
          <span className="h-2 rounded-full bg-info-soft" />
          <span className="h-2 w-3/4 rounded-full bg-info-soft" />
        </div>
      </div>
    </div>
  );
}

function DemoSection() {
  return (
    <section
      id="demo"
      className="border-b border-border bg-card px-6 py-16 sm:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-[1320px] text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Interactive Demo
        </p>
        <h2 className="mx-auto mt-6 max-w-[860px] text-4xl font-semibold leading-[1.12] tracking-normal text-foreground sm:text-5xl lg:text-6xl">
          Try Eve on sample books.
          <br />
          No signup. No real financial data.
        </h2>
        <p className="mx-auto mt-7 max-w-[850px] text-lg leading-8 text-muted-foreground">
          See how Kanso turns a messy month into a short review list and an
          accountant-ready package.
        </p>

        <div className="mt-12 grid gap-7 text-left lg:grid-cols-3">
          <DemoSectionCard>
            <div className="flex items-start gap-4">
              <DemoStepNumber>1</DemoStepNumber>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Open a sample month
                </h3>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  Start with fake statements, receipts, and transactions.
                </p>
              </div>
            </div>

            <div className="relative mt-9 min-h-[280px]">
              <div className="absolute left-0 top-0 grid w-[68%] gap-3">
                <DemoFileCard label="Bank_Statements_May.csv" />
                <DemoFileCard label="Credit_Card_May.csv" />
                <DemoFileCard label="Stripe_Payouts_May.csv" />
              </div>
              <div className="absolute right-0 top-0 w-[34%] rounded-lg border border-border bg-card p-4 shadow-sm">
                <p className="text-xs font-medium text-muted-foreground">
                  Receipt_0421.pdf
                </p>
                <div className="mt-5 grid gap-3">
                  <span className="h-2 rounded-full bg-info-soft" />
                  <span className="h-2 w-2/3 rounded-full bg-info-soft" />
                  <span className="h-2 w-4/5 rounded-full bg-info-soft" />
                </div>
                <div className="mt-6 flex justify-between text-xs text-foreground">
                  <span>Total</span>
                  <span className="font-semibold">$142.50</span>
                </div>
              </div>
              <div className="absolute bottom-2 right-12 flex size-24 items-center justify-center rounded-lg border-2 border-info bg-info-soft/70 text-info shadow-sm">
                <FolderOpenIcon />
                <Sparkles className="absolute -right-4 top-0 size-5 text-info" aria-hidden="true" />
              </div>
            </div>
          </DemoSectionCard>

          <DemoSectionCard>
            <div className="flex items-start gap-4">
              <DemoStepNumber>2</DemoStepNumber>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Review what Eve found
                </h3>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  Resolve a few flagged items and see Kanso explain why they
                  matter.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <span className="relative flex size-16 shrink-0 items-center justify-center rounded-full bg-info-soft">
                <Image
                  alt=""
                  aria-hidden="true"
                  className="size-14 rounded-full object-cover"
                  height={56}
                  src="/brand/eve.png"
                  width={56}
                />
                <Sparkles className="absolute -right-3 top-1 size-5 text-info" aria-hidden="true" />
              </span>
              <div className="rounded-lg border border-border bg-info-soft/35 px-5 py-4 text-sm font-semibold leading-6 text-foreground">
                Eve flagged a few items that need your review.
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-lg border border-border">
              <div className="grid grid-cols-[1fr_1.25fr_40px] bg-muted px-4 py-3 text-xs font-semibold text-muted-foreground">
                <span>Issue</span>
                <span>Why it matters</span>
                <span />
              </div>
              {demoReviewItems.map(({ title, meta, reason, tone }) => (
                <div
                  className={`grid grid-cols-[1fr_1.25fr_40px] items-center gap-3 border-t border-border px-4 py-4 text-sm leading-5 ${
                    tone === "destructive"
                      ? "bg-destructive-soft/55"
                      : tone === "warning"
                        ? "bg-warning-soft/55"
                        : "bg-card"
                  }`}
                  key={title}
                >
                  <div>
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="mt-1 text-muted-foreground">{meta}</p>
                  </div>
                  <p className="text-foreground">{reason}</p>
                  <CircleHelp className="size-6 text-info" aria-hidden="true" />
                </div>
              ))}
            </div>

            <p className="mt-5 text-center text-sm font-semibold text-info">
              3 items need your review
              <ArrowRight className="ml-1 inline size-4" aria-hidden="true" />
            </p>
          </DemoSectionCard>

          <DemoSectionCard>
            <div className="flex items-start gap-4">
              <DemoStepNumber>3</DemoStepNumber>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Preview the package
                </h3>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  See the Profit &amp; Loss, evidence index, audit trail, and
                  accountant package.
                </p>
              </div>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-[1fr_0.9fr]">
              <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
                <h4 className="font-semibold text-foreground">Profit &amp; Loss</h4>
                <p className="mt-1 text-xs text-muted-foreground">May 2024</p>
                <svg
                  aria-hidden="true"
                  className="mt-5 h-20 w-full"
                  fill="none"
                  viewBox="0 0 210 90"
                >
                  <path
                    d="M8 70 L34 60 L58 66 L84 48 L112 56 L142 30 L164 38 L188 18 L204 12"
                    stroke="var(--info)"
                    strokeWidth="3"
                  />
                </svg>
                <div className="mt-4 grid gap-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue</span>
                    <span className="font-medium">$24,780</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Expenses</span>
                    <span className="font-medium">(15,640)</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3 font-semibold text-info">
                    <span>Net Profit</span>
                    <span>$9,140</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-4">
                    <FileText className="size-7 text-info" aria-hidden="true" />
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Evidence Index
                      </h4>
                      <p className="text-xs text-muted-foreground">142 items</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-4">
                    <ShieldCheck className="size-7 text-success" aria-hidden="true" />
                    <div>
                      <h4 className="font-semibold text-foreground">Audit Trail</h4>
                      <p className="text-xs text-muted-foreground">Complete</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-4">
                    <Package className="size-7 text-success" aria-hidden="true" />
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Accountant Package
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Ready to share
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DemoSectionCard>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Button
            className="h-14 min-w-[280px] px-8 text-lg shadow-[0_12px_25px_rgba(20,70,130,0.18)]"
            disabled
          >
            Demo coming soon
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>
          <Button
            asChild
            className="h-14 px-6 text-lg text-info hover:text-info"
            variant="ghost"
          >
            <a href="#workflow">
              Watch 90-second walkthrough
              <PlaySquare className="size-6" aria-hidden="true" />
            </a>
          </Button>
        </div>

        <div className="mx-auto mt-8 flex max-w-[760px] items-center justify-center gap-5 rounded-lg border border-info/20 bg-info-soft/25 px-6 py-4 text-base leading-7 text-muted-foreground">
          <ShieldCheck className="size-9 shrink-0 text-info" aria-hidden="true" />
          <p>
            <span className="font-semibold text-info">Fake data only.</span> The
            demo never asks you to upload real financial data.
          </p>
        </div>
      </div>
    </section>
  );
}

function FolderOpenIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-20"
      fill="none"
      viewBox="0 0 88 72"
    >
      <path
        d="M8 22h24l8 9h40v29a8 8 0 0 1-8 8H16a8 8 0 0 1-8-8V22Z"
        fill="var(--primary-soft)"
        stroke="var(--info)"
        strokeWidth="3"
      />
      <path
        d="M8 31h72"
        stroke="var(--info)"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}

function FitCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-7 text-left shadow-[0_14px_35px_rgba(15,23,42,0.06)]">
      <span className="flex size-16 items-center justify-center rounded-lg bg-info-soft text-info">
        <Icon className="size-10" strokeWidth={1.8} aria-hidden="true" />
      </span>
      <h3 className="mt-6 text-xl font-semibold tracking-normal text-foreground">
        {title}
      </h3>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function WhoThisIsForSection() {
  return (
    <section
      id="who-its-for"
      className="border-b border-border bg-background px-6 py-16 sm:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-[1120px] text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-info">
          Built For
        </p>
        <h2 className="mx-auto mt-6 max-w-[900px] text-4xl font-semibold leading-[1.12] tracking-normal text-foreground sm:text-5xl lg:text-6xl">
          Ideal for Simple Small Businesses
        </h2>
        <p className="mx-auto mt-7 max-w-[770px] text-lg leading-8 text-muted-foreground">
          KansoBooks is built for businesses where most of the bookkeeping lives
          in bank accounts, credit cards, receipts, invoices, and simple
          processor exports.
        </p>

        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {fitCards.slice(0, 3).map((card) => (
            <FitCard key={card.title} {...card} />
          ))}
        </div>

        <div className="mx-auto mt-7 grid max-w-[880px] gap-7 md:grid-cols-2">
          {fitCards.slice(3).map((card) => (
            <FitCard key={card.title} {...card} />
          ))}
        </div>

        <div className="mt-10 flex items-center gap-6 rounded-lg border border-info/20 bg-info-soft/25 px-7 py-5 text-left shadow-sm">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-info-soft text-info">
            <TriangleAlert className="size-9" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-info">
              Not a fit yet
            </p>
            <p className="mt-2 text-lg leading-8 text-foreground">
              Payroll-heavy businesses, inventory-heavy ecommerce, sales tax
              filing, multi-entity consolidation, and complex marketplace
              settlement accounting.
            </p>
          </div>
        </div>

        <p className="mx-auto mt-9 max-w-[760px] text-xl font-semibold leading-8 text-foreground">
          If your books are mostly statements, cards, and receipts, Kanso was
          built for you.
        </p>
      </div>
    </section>
  );
}

function MigrationMetaList({
  items,
}: {
  items: Array<{ label: string; icon: LucideIcon }>;
}) {
  return (
    <div className="mt-7 rounded-lg bg-info-soft/55 px-5 py-4">
      <div className="grid gap-3">
        {items.map(({ label, icon: Icon }) => (
          <div
            className="flex items-center gap-3 text-sm font-medium leading-5 text-foreground"
            key={label}
          >
            <Icon
              className="size-5 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MigrationStepCard({
  children,
  featured = false,
}: {
  children: React.ReactNode;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative rounded-lg border bg-card p-7 text-center shadow-[0_14px_35px_rgba(15,23,42,0.07)] ${
        featured ? "border-info shadow-[0_18px_45px_rgba(20,70,130,0.12)]" : "border-border"
      }`}
    >
      {children}
    </div>
  );
}

function QuickBooksMigrationVisual() {
  return (
    <div className="relative grid gap-6 lg:grid-cols-3">
      <MigrationStepCard>
        <div className="mx-auto flex size-40 items-center justify-center rounded-full bg-info-soft/45">
          <div className="relative flex size-24 items-center justify-center rounded-lg bg-info-soft text-info">
            <FileText className="absolute -top-4 right-4 size-11 rotate-6 text-info/25" />
            <FileText className="absolute -top-2 right-8 size-11 rotate-2 text-info/35" />
            <div className="flex size-20 items-center justify-center rounded-lg bg-info/15">
              <ComparisonIcon type="quickbooks" />
            </div>
            <span className="absolute -bottom-2 -right-2 flex size-9 items-center justify-center rounded-full bg-info text-primary-foreground">
              <Upload className="size-5" aria-hidden="true" />
            </span>
          </div>
        </div>
        <h3 className="mt-7 text-2xl font-semibold leading-8 text-foreground">
          1. Export what you have
        </h3>
        <p className="mx-auto mt-4 max-w-[240px] text-base leading-7 text-muted-foreground">
          Bring over useful history, categories, balances, and notes.
        </p>
        <MigrationMetaList items={migrationMetaItems} />
      </MigrationStepCard>

      <MigrationStepCard featured>
        <span className="absolute -left-6 top-[42%] hidden size-12 items-center justify-center rounded-full border border-border bg-card text-info shadow-sm lg:flex">
          <ArrowRight className="size-7" aria-hidden="true" />
        </span>
        <span className="absolute -right-6 top-[42%] hidden size-12 items-center justify-center rounded-full border border-border bg-card text-info shadow-sm lg:flex">
          <ArrowRight className="size-7" aria-hidden="true" />
        </span>

        <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-border bg-card shadow-[0_12px_30px_rgba(20,70,130,0.14)]">
          <Image
            alt=""
            aria-hidden="true"
            className="size-11"
            height={44}
            src="/brand/kanso-logo.png"
            width={44}
          />
          <Sparkles className="absolute right-[34%] top-9 size-5 text-info/40" aria-hidden="true" />
        </div>

        <div className="mx-auto mt-8 grid max-w-[240px] grid-cols-3 gap-5">
          {["Bank statement", "Receipt", "Invoice"].map((label) => (
            <div
              className="rotate-[-3deg] rounded-lg border border-border bg-card px-2 py-4 text-center text-[10px] font-medium uppercase leading-4 text-muted-foreground shadow-sm even:rotate-0 last:rotate-[5deg]"
              key={label}
            >
              <FileText className="mx-auto mb-2 size-5 text-info/60" aria-hidden="true" />
              {label}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 flex size-20 items-center justify-center rounded-lg border border-info/35 bg-info-soft text-success">
          <ShieldCheck className="size-14" strokeWidth={1.5} aria-hidden="true" />
        </div>

        <h3 className="mt-8 text-2xl font-semibold leading-8 text-foreground">
          2. Kanso rebuilds confidence
        </h3>
        <p className="mx-auto mt-4 max-w-[270px] text-base leading-7 text-muted-foreground">
          Statements, receipts, and evidence become the{" "}
          <span className="text-info">source of truth.</span>
        </p>
        <div className="mt-7 rounded-lg bg-success-soft px-4 py-3 text-sm font-medium text-foreground">
          <span className="inline-flex items-center gap-2">
            <Check className="size-5 text-success" aria-hidden="true" />
            Proven. Reconciled. Documented.
          </span>
        </div>
      </MigrationStepCard>

      <MigrationStepCard>
        <div className="mx-auto flex size-40 items-center justify-center rounded-full bg-info-soft/45">
          <div className="flex size-28 items-center justify-center rounded-lg bg-info/15 text-info">
            <Package className="size-20" strokeWidth={1.5} aria-hidden="true" />
            <span className="absolute flex size-10 translate-x-10 translate-y-9 items-center justify-center rounded-full bg-success text-primary-foreground">
              <Check className="size-6" aria-hidden="true" />
            </span>
          </div>
        </div>
        <h3 className="mt-7 text-2xl font-semibold leading-8 text-foreground">
          3. Send clean books forward
        </h3>
        <p className="mx-auto mt-4 max-w-[250px] text-base leading-7 text-muted-foreground">
          Your accountant gets a finished package, not a QuickBooks mess.
        </p>
        <MigrationMetaList items={packageMetaItems} />
      </MigrationStepCard>
    </div>
  );
}

function QuickBooksMigrationSection() {
  return (
    <section
      id="quickbooks"
      className="border-b border-border bg-card px-6 py-16 sm:px-10 lg:py-20"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[0.64fr_1.36fr] lg:gap-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-info">
            QuickBooks Migration
          </p>
          <h2 className="mt-8 max-w-[520px] text-4xl font-semibold leading-[1.12] tracking-normal text-foreground sm:text-5xl lg:text-6xl">
            Leave QuickBooks without starting from zero.
          </h2>
          <p className="mt-8 max-w-[500px] text-lg leading-8 text-muted-foreground">
            Kanso helps you bring forward the useful parts of your old setup,
            then proves the current books from statements, receipts, and source
            evidence.
          </p>
          <p className="mt-8 max-w-[500px] text-base leading-8 text-muted-foreground">
            We do not blindly trust old QuickBooks data. Kanso treats prior
            categories, balances, and history as starting context, then checks
            the current period from real source files.
          </p>

          <Button
            asChild
            className="mt-9 h-14 px-7 text-base shadow-[0_12px_25px_rgba(20,70,130,0.18)]"
          >
            <a href={WAITLIST_URL}>
              Join the QuickBooks migration waitlist
              <ArrowRight className="size-5" aria-hidden="true" />
            </a>
          </Button>

          <Button
            asChild
            className="mt-4 h-12 px-0 text-base text-info hover:text-info"
            variant="ghost"
          >
            <a href="#workflow">
              <FileText className="size-5" aria-hidden="true" />
              Get the migration guide
              <ArrowRight className="size-5" aria-hidden="true" />
            </a>
          </Button>
        </div>

        <QuickBooksMigrationVisual />
      </div>

      <div className="mx-auto mt-14 max-w-[1320px] rounded-lg bg-info-soft/45 px-6 py-10 text-center">
        <div className="mx-auto -mt-16 flex size-14 items-center justify-center rounded-full border border-border bg-card text-info shadow-sm">
          <RotateCw className="size-7" aria-hidden="true" />
        </div>
        <p className="mx-auto mt-6 max-w-[720px] text-2xl font-semibold leading-9 text-foreground">
          Keep what helps. Leave the rent behind.
        </p>
      </div>
    </section>
  );
}

function DataControlDiagram() {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-8">
      <h3 className="text-center text-2xl font-semibold tracking-normal text-foreground">
        Data Control
      </h3>

      <div className="relative mt-8 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-10">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
          fill="none"
          viewBox="0 0 660 500"
        >
          <path
            d="M290 195 C345 195 315 110 374 110"
            stroke="var(--info)"
            strokeDasharray="4 5"
            strokeLinecap="round"
            strokeWidth="1.6"
            opacity="0.75"
          />
          <path
            d="M290 305 C345 305 315 386 374 386"
            stroke="var(--info)"
            strokeDasharray="4 5"
            strokeLinecap="round"
            strokeWidth="1.6"
            opacity="0.75"
          />
          <path
            d="m368 104 10 6-10 6"
            stroke="var(--info)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            opacity="0.75"
          />
          <path
            d="m368 380 10 6-10 6"
            stroke="var(--info)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            opacity="0.75"
          />
        </svg>

        <div className="relative z-10 rounded-lg border border-border bg-card p-7 shadow-sm">
          <div className="flex items-center gap-4 text-info">
            <Monitor className="size-7" aria-hidden="true" />
            <p className="text-base font-semibold">1. On your computer</p>
          </div>

          <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <Image
                alt=""
                aria-hidden="true"
                className="size-9"
                height={36}
                src="/brand/kanso-logo.png"
                width={36}
              />
              <h4 className="text-xl font-semibold text-foreground">
                Kanso<span className="font-normal">Books</span>
              </h4>
            </div>

            <div className="mt-7 grid gap-5">
              {localDataItems.map(({ label, icon: Icon }) => (
                <div
                  className="flex items-center gap-4 text-base text-foreground"
                  key={label}
                >
                  <Icon className="size-6 text-muted-foreground" aria-hidden="true" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="mx-auto mt-7 max-w-[210px] text-center text-sm leading-6 text-muted-foreground">
            Lives on your machine. Under your control.
          </p>
        </div>

        <div className="relative z-10 grid gap-6">
          <div className="rounded-lg border border-info/20 bg-info-soft p-6 shadow-sm">
            <div className="flex items-center gap-4 text-info">
              <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-card">
                <Image
                  alt=""
                  aria-hidden="true"
                  className="size-11 rounded-full object-cover"
                  height={44}
                  src="/brand/eve.png"
                  width={44}
                />
                <span className="absolute right-0 top-0 size-4 rounded-full border-2 border-card bg-info" />
              </span>
              <p className="text-base font-semibold">2. Eve access</p>
            </div>

            <div className="mt-6 divide-y divide-border">
              {eveAccessRows.map(({ label, status, state }) => (
                <div
                  className="flex items-center justify-between gap-4 py-3 text-sm leading-5 text-foreground"
                  key={label}
                >
                  <span>{label}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      state === "allowed"
                        ? "bg-success-soft text-success"
                        : "bg-card text-info"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-5 max-w-[220px] text-center text-sm leading-6 text-muted-foreground">
              Eve only sees what you allow. You&apos;re always in control.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 text-center shadow-sm">
            <div className="flex items-center gap-4 text-info">
              <Package className="size-7" aria-hidden="true" />
              <p className="text-base font-semibold">3. Accountant package</p>
            </div>
            <div className="mx-auto mt-7 flex size-20 items-center justify-center rounded-full bg-info-soft text-info">
              <Package className="size-11" strokeWidth={1.7} aria-hidden="true" />
            </div>
            <p className="mx-auto mt-6 max-w-[260px] text-sm leading-6 text-foreground">
              Created only when you export. Ready when you choose to share.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-info-soft text-info">
          <LockKeyhole className="size-5" aria-hidden="true" />
        </span>
        <p>You decide what leaves your computer, and when.</p>
      </div>
    </div>
  );
}

function PrivacyOwnershipSection() {
  return (
    <section
      id="privacy"
      className="border-b border-border bg-background px-6 py-16 sm:px-10 lg:py-20"
    >
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[0.82fr_1.08fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-info">
            Privacy &amp; Ownership
          </p>
          <h2 className="mt-8 max-w-[600px] text-4xl font-semibold leading-[1.12] tracking-normal text-foreground sm:text-5xl lg:text-6xl">
            Your books stay yours.
          </h2>
          <p className="mt-8 max-w-[600px] text-lg leading-8 text-muted-foreground">
            KansoBooks is local desktop software. Your statements, receipts,
            decisions, reports, and audit trail stay on your machine unless you
            choose to share them.
          </p>
          <p className="mt-8 max-w-[600px] text-lg leading-8 text-muted-foreground">
            Use Eve when you want AI help. She only sees the context you allow.
            Prefer not to use Eve? Kanso still checks your books, explains
            issues, and prepares the accountant package.
          </p>

          <div className="mt-10 grid gap-5">
            {privacyBullets.map((item) => (
              <CheckBullet key={item}>{item}</CheckBullet>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-5 rounded-lg border border-info/20 bg-card px-6 py-4 text-base leading-7 text-foreground shadow-sm">
            <ShieldCheck className="size-9 shrink-0 text-info" aria-hidden="true" />
            <p>No hidden cloud database. No surprise syncing. No vendor lock-in.</p>
          </div>

          <Button
            asChild
            className="mt-8 h-12 px-0 text-lg text-info hover:text-info"
            variant="ghost"
          >
            <a href="#workflow">
              See how data control works
              <ArrowRight className="size-6" aria-hidden="true" />
            </a>
          </Button>
        </div>

        <DataControlDiagram />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-card px-6 py-12 sm:px-10">
      <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <a className="flex items-center gap-3" href="#" aria-label="KansoBooks">
            <Image
              alt=""
              aria-hidden="true"
              className="size-9"
              height={36}
              src="/brand/kanso-logo.png"
              width={36}
            />
            <span className="text-2xl font-semibold text-foreground">
              Kanso<span className="font-normal">Books</span>
            </span>
          </a>
          <p className="mt-5 max-w-[360px] text-base leading-7 text-muted-foreground">
            Eve drafts. Kanso proves. You stay in control of the books.
          </p>
          <p className="mt-8 text-sm text-muted-foreground">
            © 2026 KansoBooks.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {footerColumns.map(({ title, links }) => (
            <div key={title}>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                {title}
              </h2>
              <div className="mt-5 grid gap-3">
                {links.map(({ label, href }) => (
                  <a
                    className="text-base leading-6 text-muted-foreground transition-colors hover:text-info"
                    href={href}
                    key={`${title}-${label}`}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

function SmallCheckLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-sm leading-5 text-foreground">
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
        <Check className="size-3.5" aria-hidden="true" />
      </span>
      <span>{children}</span>
    </div>
  );
}

function CheckBullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-6 text-lg leading-7 text-foreground">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
        <Check className="size-6" aria-hidden="true" />
      </span>
      <span>{children}</span>
    </div>
  );
}

function AccountantOutputBullet({
  label,
  icon: Icon,
}: {
  label: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex items-center gap-5 text-base leading-7 text-foreground">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-info-soft text-info">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span>{label}</span>
    </div>
  );
}

function FinancialLine({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-5 border-t border-border px-4 py-3 text-sm leading-5 ${
        emphasis ? "bg-info-soft/55 font-semibold" : ""
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function BalanceLine({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 px-3 py-1.5 text-xs leading-4 ${
        emphasis ? "bg-info-soft/60 font-semibold" : ""
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function AccountantOutputVisual() {
  return (
    <>
      <div className="mx-auto grid w-full max-w-[430px] gap-4 xl:hidden">
        <div className="rounded-lg border border-border bg-card p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
          <div className="flex items-start gap-4">
            <FileText className="mt-1 size-7 text-info" aria-hidden="true" />
            <div>
              <h3 className="text-lg font-semibold leading-6 text-foreground">
                Profit &amp; Loss
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">
                Jan 1 - Dec 31, 2025
              </p>
            </div>
          </div>
          <div className="mt-5">
            <FinancialLine label="Gross Profit" value="$156,080" emphasis />
            <FinancialLine label="Net Income" value="$111,340" emphasis />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <Scale className="size-5 text-info" aria-hidden="true" />
              <h3 className="font-semibold text-foreground">Balance Sheet</h3>
            </div>
            <div className="mt-4">
              <BalanceLine label="Cash" value="$72,430" />
              <BalanceLine label="Total Equity" value="$99,820" emphasis />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <ReceiptText className="size-5 text-info" aria-hidden="true" />
              <h3 className="font-semibold text-foreground">
                End of Year Journal
              </h3>
            </div>
            <div className="mt-4 grid gap-3">
              <SmallCheckLine>Owner draws reviewed</SmallCheckLine>
              <SmallCheckLine>Cleanup entries prepared</SmallCheckLine>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-info/35 bg-info-soft/40 p-6 text-center shadow-sm">
          <Package
            className="mx-auto size-12 text-info"
            strokeWidth={1.7}
            aria-hidden="true"
          />
          <h3 className="mt-4 text-lg font-semibold text-foreground">
            Ready to send
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            PDF reports + CSV exports + linked evidence
          </p>
        </div>
      </div>

      <div className="relative mx-auto hidden min-h-[900px] w-[620px] xl:block">
        <div className="absolute left-0 top-0 z-20 w-[340px] rounded-lg border border-border bg-card p-5 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
          <div className="flex items-start gap-4">
            <FileText className="mt-1 size-7 text-info" aria-hidden="true" />
            <div>
              <h3 className="text-lg font-semibold leading-6 text-foreground">
                Profit &amp; Loss
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">
                Jan 1 - Dec 31, 2025
              </p>
            </div>
          </div>
          <div className="mt-8">
            <FinancialLine label="Revenue" value="$184,220" />
            <FinancialLine label="Cost of Goods Sold" value="$28,140" />
            <FinancialLine label="Gross Profit" value="$156,080" emphasis />
            <p className="px-4 pb-3 pt-6 text-sm font-semibold text-muted-foreground">
              Operating Expenses
            </p>
            <FinancialLine label="Software" value="$4,220" />
            <FinancialLine label="Travel" value="$2,880" />
            <FinancialLine label="Meals" value="$1,140" />
            <FinancialLine label="Contractors" value="$36,500" />
            <FinancialLine label="Net Income" value="$111,340" emphasis />
          </div>
        </div>

        <div className="absolute left-[370px] top-[36px] z-30 w-[238px] rounded-lg border border-border bg-card p-5 shadow-[0_16px_36px_rgba(15,23,42,0.12)]">
          <div className="flex items-start gap-3">
            <Scale className="size-6 text-info" aria-hidden="true" />
            <div>
              <h3 className="text-base font-semibold leading-5 text-foreground">
                Balance Sheet
              </h3>
              <p className="text-xs leading-5 text-muted-foreground">
                As of Dec 31, 2025
              </p>
            </div>
          </div>
          <div className="mt-4 border-t border-border pt-3">
            <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
              Assets
            </p>
            <BalanceLine label="Cash" value="$72,430" />
            <BalanceLine label="Accounts Receivable" value="$18,250" />
            <BalanceLine label="Other Assets" value="$9,140" />
            <p className="mt-3 border-t border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
              Liabilities
            </p>
            <BalanceLine label="Accounts Payable" value="$12,340" />
            <BalanceLine label="Credit Cards" value="$3,210" />
            <BalanceLine label="Other Liabilities" value="$2,850" />
            <p className="mt-3 border-t border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
              Equity
            </p>
            <BalanceLine label="Owner's Equity" value="$81,420" />
            <BalanceLine
              label="Total Liabilities & Equity"
              value="$99,820"
              emphasis
            />
          </div>
        </div>

        <div className="absolute left-[370px] top-[430px] z-50 w-[250px] rounded-lg border border-border bg-card p-5 shadow-[0_16px_36px_rgba(15,23,42,0.14)]">
          <div className="flex items-center gap-4">
            <ReceiptText className="size-6 text-info" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-foreground">
              End of Year Journal
            </h3>
          </div>
          <div className="mt-6 grid gap-4">
            <SmallCheckLine>Owner draws reviewed</SmallCheckLine>
            <SmallCheckLine>Depreciation notes added</SmallCheckLine>
            <SmallCheckLine>Cleanup entries prepared</SmallCheckLine>
            <SmallCheckLine>Accountant notes included</SmallCheckLine>
          </div>
        </div>

        <div className="absolute left-[36px] top-[560px] z-30 w-[238px] rounded-lg border border-border bg-card p-5 shadow-[0_16px_36px_rgba(15,23,42,0.10)]">
          <div className="flex items-center gap-4">
            <ShieldCheck className="size-6 text-info" aria-hidden="true" />
            <h3 className="text-base font-semibold text-foreground">
              Audit Trail
            </h3>
          </div>
          <div className="mt-6 grid gap-4">
            <SmallCheckLine>14 recommendations accepted</SmallCheckLine>
            <SmallCheckLine>3 items manually reviewed</SmallCheckLine>
            <SmallCheckLine>2 notes added</SmallCheckLine>
            <SmallCheckLine>Final package generated</SmallCheckLine>
          </div>
        </div>

        <div className="absolute left-[332px] top-[610px] z-40 w-[268px] rounded-lg border border-info/35 bg-info-soft/75 p-6 text-center shadow-[0_16px_36px_rgba(15,23,42,0.10)]">
          <div className="relative mx-auto flex size-20 items-center justify-center text-info">
            <Package className="size-16" strokeWidth={1.6} aria-hidden="true" />
            <span className="absolute bottom-1 right-1 flex size-10 items-center justify-center rounded-full bg-success text-primary-foreground">
              <Check className="size-6" aria-hidden="true" />
            </span>
          </div>
          <h3 className="mt-5 text-xl font-semibold text-foreground">
            Ready to send
          </h3>
          <p className="mx-auto mt-3 max-w-[210px] text-sm leading-6 text-muted-foreground">
            PDF reports + CSV exports + linked evidence
          </p>
          <div className="mt-5 rounded-lg border border-info/30 bg-card px-4 py-2 text-sm font-semibold text-info">
            Ready for your accountant
          </div>
        </div>
      </div>
    </>
  );
}

function AccountantReadyOutputSection() {
  return (
    <section className="border-b border-border bg-background px-6 py-16 sm:px-10 lg:py-20">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-none">
          <AccountantOutputVisual />
        </div>

        <div className="order-1 lg:order-last">
          <p className="text-sm font-semibold uppercase tracking-normal text-info">
            Accountant-Ready Output
          </p>
          <h2 className="mt-8 max-w-[600px] text-4xl font-semibold leading-[1.15] tracking-normal text-foreground sm:text-5xl lg:text-6xl">
            Everything your accountant needs.
            <br />
            Tax &amp; audit ready.
          </h2>
          <p className="mt-7 max-w-[590px] text-lg leading-8 text-muted-foreground">
            Kanso does not leave you guessing how to finish your books. It gives
            you complete confidence and peace of mind that your books are ready
            for your accountant.
          </p>

          <div className="mt-10 grid gap-5">
            {accountantOutputItems.map((item) => (
              <AccountantOutputBullet key={item.label} {...item} />
            ))}
          </div>

          <div className="mt-10 flex items-center gap-5 border-t border-border pt-7 text-base leading-7 text-muted-foreground">
            <ShieldCheck className="size-9 shrink-0 text-info" aria-hidden="true" />
            <p>No messy handoff. No mystery entries. No year-end scramble.</p>
          </div>

          <Button
            asChild
            className="mt-8 h-12 px-0 text-lg text-info hover:text-info"
            variant="ghost"
          >
            <a href="#workflow">
              See a sample package
              <ArrowRight className="size-6" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ProofStepIcon({
  type,
  icon: Icon,
}: {
  type?: "eve" | "eve-thinking" | "kanso";
  icon?: LucideIcon;
}) {
  if (type === "eve-thinking") {
    return (
      <span className="relative flex size-[72px] shrink-0 items-center justify-center rounded-lg border border-border bg-card shadow-sm">
        <Image
          alt=""
          aria-hidden="true"
          className="size-12 rounded-full object-cover"
          height={48}
          src="/brand/eve-thinking.png"
          width={48}
        />
      </span>
    );
  }

  if (type === "kanso") {
    return (
      <span className="flex size-[72px] shrink-0 items-center justify-center rounded-lg border border-border bg-card shadow-sm">
        <Image
          alt=""
          aria-hidden="true"
          className="size-12"
          height={48}
          src="/brand/kanso-logo.png"
          width={48}
        />
      </span>
    );
  }

  if (type === "eve") {
    return (
      <span className="relative flex size-[72px] shrink-0 items-center justify-center rounded-lg border border-border bg-card shadow-sm">
        <Image
          alt=""
          aria-hidden="true"
          className="size-12 rounded-full object-cover"
          height={48}
          src="/brand/eve.png"
          width={48}
        />
        <Sparkles
          className="absolute right-3 top-2 size-4 text-info"
          aria-hidden="true"
        />
      </span>
    );
  }

  if (!Icon) {
    return null;
  }

  return (
    <span className="flex size-[72px] shrink-0 items-center justify-center rounded-lg border border-border bg-info-soft/55 text-info shadow-sm">
      <Icon className="size-10" strokeWidth={1.9} aria-hidden="true" />
    </span>
  );
}

function ProofTrailDivider() {
  return (
    <div className="grid grid-cols-[1fr_24px_1fr] items-center gap-2 pl-[154px]">
      <span className="h-px bg-border" />
      <ArrowDown className="size-5 text-muted-foreground" aria-hidden="true" />
      <span className="h-px bg-border" />
    </div>
  );
}

function ProofTrailCard() {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-[0_18px_45px_rgba(15,23,42,0.10)] sm:p-8 lg:p-10">
      <h3 className="text-2xl font-semibold tracking-normal text-foreground">
        Proof Trail
      </h3>

      <div className="mt-6 overflow-hidden rounded-lg border border-border">
        <div className="px-5 py-6 sm:px-6">
          {proofTrailSteps.map(({ title, detail, icon, type }, index) => (
            <div key={title}>
              <div className="grid grid-cols-[42px_72px_minmax(0,1fr)] items-center gap-5 py-2">
                <span className="flex size-10 items-center justify-center rounded-full bg-info-soft text-base text-foreground">
                  {index + 1}
                </span>
                <ProofStepIcon icon={icon} type={type} />
                <div>
                  <p className="font-semibold leading-6 text-foreground">{title}</p>
                  <p className="mt-2 text-base leading-7 text-foreground">
                    {detail}
                  </p>
                </div>
              </div>
              <ProofTrailDivider />
            </div>
          ))}

          <div className="grid grid-cols-[42px_72px_minmax(0,1fr)] items-start gap-5 py-2">
            <span className="flex size-10 items-center justify-center rounded-full bg-info-soft text-base text-foreground">
              4
            </span>
            <ProofStepIcon type="kanso" />
            <div>
              <p className="font-semibold leading-6 text-foreground">
                Kanso checks
              </p>
              <div className="mt-5 grid gap-4">
                {kansoChecks.map((check) => (
                  <div
                    className="flex items-center gap-4 text-sm text-foreground"
                    key={check}
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
                      <Check className="size-5" aria-hidden="true" />
                    </span>
                    <span>{check}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 border-t border-border bg-info-soft/55 px-6 py-6 text-sm font-semibold uppercase tracking-[0.22em] text-info">
          <ShieldCheck className="size-8 shrink-0" strokeWidth={1.9} aria-hidden="true" />
          <span>Ready for your accountant</span>
        </div>
      </div>
    </div>
  );
}

function ProofGradeTrustSection() {
  return (
    <section className="border-b border-border bg-card px-6 py-16 sm:px-10 lg:py-20">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[0.92fr_0.98fr] lg:gap-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Proof-Grade Trust
          </p>
          <h2 className="mt-8 max-w-[620px] text-4xl font-semibold leading-[1.15] tracking-normal text-foreground sm:text-5xl lg:text-6xl">
            Books you can prove.
            <br />
            Not just books AI guessed.
          </h2>
          <p className="mt-9 max-w-[600px] text-xl leading-9 text-muted-foreground">
            Eve prepares the work. Kanso checks every match, balance, and issue
            before your books are marked ready.
          </p>
          <p className="mt-8 max-w-[560px] text-lg leading-8 text-foreground">
            Kanso does not ask you to trust a black box. Every match, warning,
            and recommendation is explained. Every accepted decision is
            recorded. Every final package can be traced back to the source
            files.
          </p>

          <div className="mt-10 grid gap-7">
            {proofTrustItems.map((item) => (
              <CheckBullet key={item}>{item}</CheckBullet>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-5 border-t border-border pt-7 text-base leading-7 text-muted-foreground">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-info-soft text-info">
              <LockKeyhole className="size-6" aria-hidden="true" />
            </span>
            <p>Your books stay on your machine unless you choose to share them.</p>
          </div>
        </div>

        <ProofTrailCard />
      </div>
    </section>
  );
}

function WorkflowIcon({
  type,
  icon: Icon,
}: {
  type?: "eve" | "kanso" | "package";
  icon?: LucideIcon;
}) {
  if (type === "eve") {
    return (
      <span className="relative flex size-[86px] shrink-0 items-center justify-center rounded-lg border border-border bg-card shadow-[0_8px_18px_rgba(15,23,42,0.08)]">
        <Image
          alt=""
          aria-hidden="true"
          className="size-14 rounded-full object-cover"
          height={56}
          src="/brand/eve.png"
          width={56}
        />
        <Sparkles
          className="absolute right-4 top-3 size-4 text-info"
          aria-hidden="true"
        />
      </span>
    );
  }

  if (type === "kanso") {
    return (
      <span className="flex size-[86px] shrink-0 items-center justify-center rounded-lg border border-border bg-card shadow-[0_8px_18px_rgba(15,23,42,0.08)]">
        <Image
          alt=""
          aria-hidden="true"
          className="size-14"
          height={56}
          src="/brand/kanso-logo.png"
          width={56}
        />
      </span>
    );
  }

  if (type === "package") {
    return (
      <span className="flex size-[86px] shrink-0 items-center justify-center rounded-lg border border-border bg-card text-info shadow-[0_8px_18px_rgba(15,23,42,0.08)]">
        <Package className="size-12" strokeWidth={1.8} aria-hidden="true" />
      </span>
    );
  }

  if (!Icon) {
    return null;
  }

  return (
    <span className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-info shadow-sm">
      <Icon className="size-8" strokeWidth={1.9} aria-hidden="true" />
    </span>
  );
}

function SimpleWorkflowSection() {
  return (
    <section
      id="workflow"
      className="border-b border-border bg-background px-6 py-16 text-center sm:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-[1320px]">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          Simple Workflow
        </p>
        <h2 className="mx-auto mt-7 max-w-[980px] text-4xl font-semibold leading-[1.08] tracking-normal text-foreground sm:text-5xl lg:text-6xl">
          Get clean monthly financial statements plus tax &amp; audit ready
          books.
        </h2>
        <p className="mx-auto mt-6 max-w-[960px] text-lg leading-8 text-muted-foreground sm:text-xl">
          Eve handles the monthly cleanup. Kanso checks the numbers and evidence.
          You review the few things that need you, then year-end is already in
          shape.
        </p>

        <div className="mt-9 overflow-hidden rounded-lg border border-border bg-card text-left shadow-[0_20px_55px_rgba(15,23,42,0.08)]">
          <div className="grid lg:grid-cols-2">
            <div className="px-6 py-10 sm:px-12 lg:px-16">
              <h3 className="text-2xl font-semibold tracking-normal text-foreground">
                What you do
              </h3>
              <div className={workflowRowsClass}>
                {userWorkflowSteps.map(({ label, icon }, index) => (
                  <div
                    className={`flex items-center gap-7 ${workflowRowClass}`}
                    key={label}
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-base text-foreground">
                      {index + 1}
                    </span>
                    <WorkflowIcon icon={icon} />
                    <p className="text-lg leading-7 text-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border bg-info-soft/45 px-6 py-10 sm:px-12 lg:border-l lg:border-t-0 lg:px-16">
              <h3 className="text-2xl font-semibold tracking-normal text-foreground">
                What happens for you
              </h3>
              <div className={workflowRowsClass}>
                {handledWorkflowSteps.map(({ label, icon }) => (
                  <div
                    className={`grid grid-cols-[86px_minmax(0,1fr)_44px] items-center gap-7 ${workflowRowClass}`}
                    key={label}
                  >
                    <WorkflowIcon type={icon} />
                    <p className="max-w-[390px] text-lg leading-8 text-foreground">
                      {label}
                    </p>
                    <span className="flex size-10 justify-self-end rounded-full bg-success-soft text-success">
                      <Check className="m-auto size-6" aria-hidden="true" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-7 flex max-w-[960px] items-center justify-center gap-5 rounded-lg border border-border bg-card px-6 py-4 text-center text-lg leading-7 text-muted-foreground shadow-sm">
          <ShieldCheck
            className="size-9 shrink-0 text-info"
            strokeWidth={1.9}
            aria-hidden="true"
          />
          <p>
            Monthly statements stay clean. Year-end books are ready without a
            scramble.
          </p>
        </div>

        <Button
          asChild
          className="mt-8 h-12 px-4 text-lg text-info hover:text-info"
          variant="ghost"
        >
          <a href="#workflow">
            See how Kanso works
            <ArrowRight className="size-6" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </section>
  );
}

function SourceCard({
  label,
  icon: Icon,
}: {
  label: string;
  icon: typeof Landmark;
}) {
  return (
    <div className="flex h-[60px] w-[142px] items-center gap-3 rounded-lg border border-border bg-card px-4 text-sm text-foreground shadow-sm">
      <span className="flex size-8 items-center justify-center rounded-md bg-info-soft text-info">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span>{label}</span>
    </div>
  );
}

function EveCard() {
  return (
    <div className="relative z-20 w-full rounded-lg border border-border bg-card p-7 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="relative flex size-14 items-center justify-center rounded-full bg-info-soft text-info">
            <Image
              alt=""
              aria-hidden="true"
              className="size-11 rounded-full object-cover"
              height={44}
              src="/brand/eve.png"
              width={44}
            />
            <Sparkles
              className="absolute -right-2 -top-1 size-4 text-info"
              aria-hidden="true"
            />
          </span>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground">
          <span className="size-2 rounded-full bg-success" />
          Working for you
        </span>
      </div>

      <h2 className="mt-7 max-w-[240px] text-xl font-semibold leading-7 tracking-normal text-foreground">
        Eve is working on May books
      </h2>

      <div className="mt-6 border-t border-border pt-5">
        <div className="space-y-4">
          {eveTasks.map((task) => (
            <div className="flex items-center gap-3 text-sm text-foreground" key={task}>
              <CheckCircle2 className="size-6 text-success" aria-hidden="true" />
              <span>{task}</span>
            </div>
          ))}
          <div className="flex items-center gap-3 text-sm text-foreground">
            <CircleHelp className="size-6 text-info" aria-hidden="true" />
            <span>7 questions found</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function KansoCheckCard() {
  return (
    <div className="relative z-10 w-full rounded-lg border border-border bg-card p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
      <Image
        alt=""
        aria-hidden="true"
        className="size-7"
        height={28}
        src="/brand/kanso-logo.png"
        width={28}
      />
      <h3 className="mt-4 text-base font-medium leading-5 text-foreground">
        Kanso checked the work
      </h3>
      <div className="mt-5 space-y-3">
        {kansoChecks.map((check) => (
          <div className="flex items-center gap-3 text-xs text-foreground" key={check}>
            <span className="flex size-5 items-center justify-center rounded-full bg-success-soft text-success">
              <Check className="size-3.5" aria-hidden="true" />
            </span>
            <span>{check}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReadyCard() {
  return (
    <div className="relative z-30 w-full rounded-lg border border-border bg-card p-7 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
      <div className="flex items-start justify-between gap-4">
        <p className="max-w-[180px] text-sm font-semibold uppercase leading-5 text-info">
          Monthly reports ready
        </p>
        <span className="flex size-10 items-center justify-center rounded-full bg-success text-primary-foreground">
          <Check className="size-6" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-5 border-t border-border pt-5">
        <div className="space-y-5">
          <div className="flex items-center gap-4 text-sm text-foreground">
            <BarChart3 className="size-5 text-info" aria-hidden="true" />
            <span>Profit &amp; Loss updated</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-foreground">
            <CheckCircle2 className="size-6 text-success" aria-hidden="true" />
            <span>Balance Sheet reconciled</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-foreground">
            <CalendarDays className="size-5 text-info" aria-hidden="true" />
            <span>Always tax &amp; audit ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroWorkflow() {
  return (
    <div className="relative mx-auto w-full max-w-[900px]">
      <div className="hidden h-[620px] lg:block">
        <ConnectionLines />

        <div className="absolute left-0 top-[72px] z-10 grid gap-4">
          {intakeSources.map((source) => (
            <SourceCard key={source.label} {...source} />
          ))}
        </div>

        <div className="absolute left-[210px] top-[36px] z-20 w-[310px]">
          <EveCard />
        </div>

        <div
          aria-hidden="true"
          className="absolute left-[520px] top-[218px] z-10 h-0 w-[50px] border-t-2 border-info-soft"
        />

        <div className="absolute left-[570px] top-[96px] z-10 w-[250px]">
          <KansoCheckCard />
        </div>

        <div className="absolute left-[588px] top-[394px] z-30 w-[292px]">
          <ReadyCard />
        </div>

        <div className="absolute left-[190px] top-[440px] z-20 w-[370px] rounded-lg border border-info/20 bg-info-soft px-6 py-5 text-center shadow-sm">
          <Quote className="mx-auto size-5 text-info" aria-hidden="true" />
          <p className="mt-2 text-sm leading-6 text-info">
            Eve turned a messy month into clean, reliable books I can stand
            behind.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Jessica M., Controller
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:hidden">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {intakeSources.map((source) => (
            <SourceCard key={source.label} {...source} />
          ))}
        </div>
        <EveCard />
        <KansoCheckCard />
        <ReadyCard />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-svh bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-[88px] max-w-[1500px] items-center justify-between px-6 sm:px-10">
          <a className="flex items-center gap-3" href="#" aria-label="KansoBooks">
            <Image
              alt=""
              aria-hidden="true"
              className="size-9"
              height={36}
              priority
              src="/brand/kanso-logo.png"
              width={36}
            />
            <span className="text-2xl font-semibold text-foreground">
              Kanso<span className="font-normal">Books</span>
            </span>
          </a>

          <div className="flex items-center gap-5">
            <nav
              aria-label="Primary navigation"
              className="hidden items-center gap-6 lg:flex"
            >
              {navLinks.map(({ label, href }) => (
                <a
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-info"
                  href={href}
                  key={href}
                >
                  {label}
                </a>
              ))}
            </nav>
            <Button asChild className="h-12 px-6 text-base">
              <a href={WAITLIST_URL}>Join Waitlist</a>
            </Button>
          </div>
        </div>
      </header>

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-[1500px] items-center gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[0.7fr_1fr] lg:py-14 xl:gap-8">
          <div className="max-w-[560px]">
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-normal text-foreground sm:text-5xl lg:text-[3.35rem] xl:text-[3.75rem]">
              Finally, books you can trust without doing the bookkeeping.
            </h1>

            <p className="mt-8 max-w-[560px] text-xl leading-8 text-muted-foreground">
              Kanso keeps your books organized, checked, and current, so you can
              stop second-guessing your numbers and get back to running your
              business.
            </p>

            <p className="mt-7 max-w-[500px] text-lg leading-8 text-muted-foreground">
              No QuickBooks rent. No bookkeeping trap. No wondering if your
              books are right.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                className="h-16 px-8 text-base shadow-[0_12px_25px_rgba(20,70,130,0.18)]"
              >
                <a href={WAITLIST_URL}>
                  Join Waitlist
                  <ArrowRight className="size-5" aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                className="h-16 px-8 text-base text-info hover:text-info"
                variant="ghost"
              >
                <a href="#workflow">
                  See Eve in action
                  <ArrowRight className="size-5" aria-hidden="true" />
                </a>
              </Button>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {proofItems.map(({ label, icon: Icon }) => (
                <div
                  className="flex min-h-16 items-center gap-3 rounded-lg border border-border bg-card px-5 text-sm font-medium text-info shadow-sm"
                  key={label}
                >
                  <Icon className="size-6 shrink-0 text-success" aria-hidden="true" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <HeroWorkflow />
        </div>
      </section>

      <SimpleWorkflowSection />
      <DemoSection />
      <ProofGradeTrustSection />
      <AccountantReadyOutputSection />
      <KansoDifferenceSection />
      <WhoThisIsForSection />
      <QuickBooksMigrationSection />
      <PrivacyOwnershipSection />
      <Footer />
    </main>
  );
}
