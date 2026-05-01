import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Bot,
  CalendarDays,
  Check,
  CheckCircle2,
  CircleHelp,
  CreditCard,
  DollarSign,
  Download,
  FileText,
  Landmark,
  Quote,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

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
            <Bot className="size-8" aria-hidden="true" />
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
        Eve is working on your 2025 books
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
          Ready for your accountant
        </p>
        <span className="flex size-10 items-center justify-center rounded-full bg-success text-primary-foreground">
          <Check className="size-6" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-5 border-t border-border pt-5">
        <div className="space-y-5">
          <div className="flex items-center gap-4 text-sm text-foreground">
            <CalendarDays className="size-5 text-info" aria-hidden="true" />
            <span>Books up to date</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-foreground">
            <CheckCircle2 className="size-6 text-success" aria-hidden="true" />
            <span>Everything reconciled</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-foreground">
            <span className="flex size-7 items-center justify-center rounded-full bg-info-soft text-sm font-medium text-info">
              2
            </span>
            <span>2 items to review</span>
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

          <div className="flex items-center gap-4">
            <Button className="h-12 px-6 text-base">
              Download free trial
            </Button>
          </div>
        </div>
      </header>

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-[1500px] items-center gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[0.7fr_1fr] lg:py-14 xl:gap-8">
          <div className="max-w-[560px]">
            <h1 className="text-5xl font-semibold leading-[1.04] tracking-normal text-foreground sm:text-6xl xl:text-[4.65rem]">
              Meet Eve,
              <br />
              your AI bookkeeper.
            </h1>

            <p className="mt-8 max-w-[560px] text-xl leading-8 text-muted-foreground">
              Eve prepares your books from statements and receipts. Kanso checks
              every number. You review the few things that need you.
            </p>

            <p className="mt-7 max-w-[500px] text-lg leading-8 text-muted-foreground">
              Send your accountant a finished package without QuickBooks rent or
              manual bookkeeping.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button className="h-16 px-8 text-base shadow-[0_12px_25px_rgba(20,70,130,0.18)]">
                <Download className="size-5" aria-hidden="true" />
                Download free trial
              </Button>
              <Button
                className="h-16 px-8 text-base text-info hover:text-info"
                variant="ghost"
              >
                See Eve in action
                <ArrowRight className="size-5" aria-hidden="true" />
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

      <section className="bg-background px-6 py-16 text-center sm:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold uppercase text-info">
            <BadgeCheck className="size-4" aria-hidden="true" />
            Built for books-ready confidence
          </div>
          <h2 className="mt-8 text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
            Close your books with confidence.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            KansoBooks turns statements, receipts, validation, review, and
            accountant handoff into one calm workflow.
          </p>
        </div>
      </section>
    </main>
  );
}
