# Free Tools SEO Strategy

**Status:** Active ideation.
**First build:** One ACB Calculator.
**Target hub:** `/Free-Tools/`.
**Snapshot date:** 2026-06-05.

## Thesis

KansoBooks should build a library of free, single-purpose tax and bookkeeping
tools that solve painful jobs people already search for, then use the content
engine to publish long-tail articles that link back to those tools.

For the investment-tax cluster, start with one calculator only:

```text
ACB Calculator
```

Do not create separate calculators for average cost basis, adjusted cost basis,
broker ACB, DRIP ACB, T5008 ACB, or superficial-loss-adjacent phrasing. Those
should be articles, modes, examples, or input templates that point back to the
same canonical ACB calculator.

This is a loss-leader strategy:

- the tool earns trust before the product asks for anything
- each tool page can rank for a precise query
- each supporting article can rank for a related problem query
- backlinks are more likely when the page gives readers a real utility, not
  just advice
- the product wedge is accountant-ready records, source-of-truth bookkeeping,
  and tax-time confidence

The model is close to the free-tools hub pattern used by aiCarousels:
one clear index page, many narrow tools, each tool named after the query.

## Free Tool Doctrine

The ACB calculator should be genuinely free:

- no login required
- no payment required
- no account wall before results
- no email capture before export
- no teaser calculation that hides the useful answer
- no artificial portfolio or transaction limit in the browser version
- no paywall for basic CSV import or export

The user should land on the page, enter transactions, see the answer, and export
their worksheet. Trust comes from usefulness, not from gating.

Offer three ways to use the tool:

- use the web calculator for quick, no-login calculations
- download an Excel workbook for people who want a local saved file
- copy the Google Sheets template for people who want autosave in Drive

Google Sheets copy URL:

```text
https://docs.google.com/spreadsheets/d/1kovHZbl-xfIgDNtptMGjti6BefufwlifA5rYA4sYG70/copy
```

Google Sheets compatibility:

- avoid old Excel-only array tricks like `LOOKUP(2,1/(condition),range)`
- prefer formulas that survive import into Sheets, such as `XLOOKUP` with
  `search_mode = -1` for latest-row lookups
- when updating the hosted Google Sheets version, import the Excel workbook into
  Drive, verify the Summary tab, then keep using the `/copy` URL pattern for
  the public CTA

Acceptable conversion paths:

- optional "save this permanently" after the result
- optional "turn this into an accountant-ready package" after export
- optional KansoBooks CTA below the tool and in supporting articles
- optional newsletter/content CTA, never required for the calculation

## Competitive Signal

MyACB's pricing page is a useful map of what Canadian investors already value.
They charge for or package around:

- portfolio limits
- import and export
- exchange rates
- superficial loss detection
- tax factor sync
- Schedule 3 preparation
- T1135 reporting
- T3 slip validation
- priority support

Sources:

- `https://myacb.ca/plans`
- `https://www.adjustedcostbase.ca/`
- `https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/personal-income/line-12700-capital-gains/calculating-reporting-your-capital-gains-losses/adjusted-cost-base.html`

The core insight: do not merely copy a paid ACB tracker. Build the useful
front-door pieces for free, make them extremely clear, and let KansoBooks become
the trusted tax-time utility brand.

AdjustedCostBase.ca is also a useful content map. Its public homepage lists
many ACB-related blog topics, including DRIPs, return of capital, stock splits,
bonds, registered accounts, brokerage reliability, phantom distributions,
foreign currency securities, multiple brokerage accounts, negative ACB, prior
year capital losses, transaction ordering, superficial loss rules, in-kind
contributions, trade date vs settlement date, incomplete records, and charitable
donations of securities.

Use those topics as competitive proof of demand, not as copy targets. KansoBooks
should write clearer, more workpaper-oriented versions that always link back to
the free calculator.

AdjustedCostBase.ca's public pricing split is also instructive. Its basic plan
includes spreadsheet export, while premium includes importing transactions from
a spreadsheet and streamlined ETF/fund tax data import. That implies import is
one of the power features users value.

KansoBooks should make simple CSV import free, but avoid promising full broker
automation in the first version.

Their import flow is also a UX opportunity. Import should not feel like a
configuration project. It should start with dead-simple downloadable templates,
plain examples, and forgiving column mapping.

## Search Signal Snapshot

No paid keyword database was used for this pass. The signal below comes from
Google autocomplete in Canada plus live SERP inspection. Treat it as directional,
not exact volume.

| Seed | Autocomplete / SERP signal | Takeaway |
|---|---|---|
| `acb calculator canada` | `acb calculator canada`, `adjusted cost base calculator canada`, `acb spreadsheet canada`, `free acb calculator canada` | ACB is the first build. Users explicitly want free calculators and spreadsheets. |
| `adjusted cost base calculator` | `adjusted cost base calculator`, `adjusted cost base calculator canada`, `adjusted cost base calculator excel`, `adjusted cost base calculator real estate`, `adjusted cost base stocks calculator` | Build an ACB tool with stock-first UX, then expand into real estate and spreadsheet export content. |
| `average cost basis calculator canada` | no strong autocomplete completions in the Canada check | Do not name the Canadian tool this way. Use it as explanatory copy only. |
| `average cost basis canada` | `average cost basis canada`, `average cost base canada`, `what is average cost basis` | Useful educational synonym. Better for articles explaining Canada vs U.S. wording. |
| `average cost basis calculator` | `average cost basis calculator`, `average cost basis calculator excel`, `stock average cost basis calculator`, `crypto average cost basis calculator`, `weighted average cost method calculator` | Broader and likely less Canada-specific. Good secondary copy, not the primary page title. |
| `cost basis calculator canada` | `cost basis calculator canada`, `adjusted cost basis calculator canada`, `average cost basis canada` | Include cost-basis language in the page body for users using U.S.-style wording. |
| `capital gains calculator canada` | `capital gains calculator canada`, `capital gains calculator canada real estate`, `capital gains calculator canada stocks`, `capital gains calculator canada 2025`, `capital gains calculator canada crypto`, province variants | Bigger keyword class than ACB, but more competitive and tax-rate-maintenance heavy. |
| `superficial loss calculator` | `superficial loss calculator`, `superficial loss calculator canada`, `superficial loss calculation example`, `superficial loss formula` | High-pain adjunct to ACB. Good second or third tool. |
| `t5008 adjusted cost base` | `t5008 adjusted cost base`, `how to calculate adjusted cost base`, `does t5008 include commissions` | Strong article/tool hybrid: reconcile broker slips against calculated ACB. |
| `wealthsimple acb` | `wealthsimple acb tracking`, `wealthsimple acb`, `wealthsimple acb reddit`, `is wealthsimple acb accurate` | Broker-specific pages can feed the generic ACB tool. |
| `questrade acb` | `questrade acb`, `questrade update acb`, `does questrade track acb` | Same as above. Broker-specific import guides are likely useful. |
| `tfsa overcontribution calculator` | `tfsa overcontribution calculator`, `tfsa over contribution penalty calculator`, `tfsa over contribution tax calculator` | Strong non-ACB calculator candidate. |
| `rrsp contribution calculator canada` | refund, tax, deduction, limit, optimal contribution, withdrawal, withholding variants | Strong but more crowded. Build after ACB cluster unless tied to a product moment. |
| `gst hst quick method calculator` | quick method calculator, online calculator, remittance rates, Ontario quick method examples | Good small-business tax utility. Fits KansoBooks audience directly. |
| `home office deduction calculator canada` | CRA calculator, self-employed home office deduction, work-from-home claim variants | Good self-employed tool, simpler than ACB. |

## Build Order

### 1. ACB Calculator

Target URL:

```text
/Free-Tools/acb-calculator/
```

Primary query:

```text
ACB calculator Canada
```

Secondary queries:

```text
adjusted cost base calculator
adjusted cost base calculator Canada
free ACB calculator Canada
ACB spreadsheet Canada
adjusted cost base stocks calculator
how to calculate adjusted cost base
cost basis calculator Canada
average cost basis Canada
average cost base Canada
```

Naming recommendation:

```text
H1: ACB Calculator Canada
Title: ACB Calculator Canada | Free Adjusted Cost Base Calculator
Intro copy: Also called cost basis or average cost basis in some investing
contexts, adjusted cost base is the Canadian tax term.
```

Minimum useful version:

- add buy, sell, DRIP, return of capital, commission, and stock split rows
- calculate running shares, total ACB, ACB per share, realized gain/loss
- support CAD amounts first
- import a simple CSV with column mapping
- export CSV
- export a printable worksheet / tax workpaper
- show a plain-English calculation log
- include a warning that registered-account transactions generally do not need
  ACB tracking for normal tax reporting
- require no login, payment, email, or account creation

Version 2:

- USD/CAD transaction conversion
- superficial loss warning
- annual Schedule 3 summary
- permalink-free local browser storage
- broker CSV import templates for the most common platforms

Version 3:

- tax factor sync workflow for ETF return of capital and reinvested capital
  gains distributions
- T5008 reconciliation helper
- T1135 summary support
- broker-specific import pages for Wealthsimple, Questrade, IBKR, RBC Direct
  Investing, TD Direct Investing, and National Bank Direct Brokerage

Why it should be first:

- direct autocomplete demand
- competitor pricing proves willingness to pay
- painful enough to earn links
- narrow enough to ship a useful MVP
- naturally creates many article targets
- reinforces KansoBooks' accountant-ready positioning

CSV import scope:

```text
MVP: User uploads a CSV, maps columns, previews parsed rows, fixes errors, and
imports into the transaction table.
```

Template-first UX:

- show "Download Excel workbook" as a first-class option
- show "Download blank CSV template" beside the import button
- show "Download example CSV" beside it
- allow drag-and-drop upload
- allow paste from Excel/Google Sheets into the table
- auto-detect the KansoBooks template instantly
- auto-map obvious aliases like `ticker` -> `symbol`, `type` -> `action`,
  `shares` -> `quantity`, `fees` -> `commission`
- show a clean preview before import
- let users edit invalid cells inline
- never require login to download a template or import it

Import guidance:

- use a short in-page step tracker: upload, map columns, fix preview, import
- do not make the user leave the calculator for a separate import wizard
- keep the advanced-looking parts in the background unless the CSV needs help
- save multi-step broker-specific import flows for article guides

Security workflow principle:

- do not force users to create a security before entering transactions
- infer securities from `symbol` rows
- summarize each symbol in a securities/results table
- keep currency and T1135 as row metadata that rolls up by symbol
- treat a dedicated "Add Security" modal as a paid-product workflow, not the
  free-tool default

Transaction report UX:

- include filters for year, security, and transaction type
- show filtered realized gain/loss and all-years realized gain/loss
- make filters change the report view only, not the underlying running ACB
  calculation

Draft template files:

- `docs/phrase/acb-csv-templates/kansobooks-acb-template-blank.csv`
- `docs/phrase/acb-csv-templates/kansobooks-acb-template.csv`

Recommended canonical columns:

```text
date
symbol
accountType
action
quantity
price
grossAmount
commission
currency
fxRate
specifiedForeignProperty
notes
```

Supported MVP actions:

```text
buy
sell
drip
return_of_capital
split
```

Do not promise automatic Wealthsimple/Questrade/IBKR parsing on day one. Instead:

- provide a downloadable sample CSV
- provide paste-from-spreadsheet support if easy
- allow manual column mapping
- show a validation table before import
- flag unknown actions rather than guessing
- write broker-specific import articles that explain how to export CSVs and map
  them into the free tool

### 2. Superficial Loss Mode / Article Cluster

Primary query:

```text
superficial loss calculator Canada
```

Build this as a mode inside the ACB calculator first, not a separate calculator.
If the standalone query starts ranking or the UX becomes cramped, split it later.

Key user job:

```text
Can I claim this capital loss, or did the 30-day rule deny it?
```

Content engine support:

- `superficial loss calculation example Canada`
- `superficial loss rule ETF Canada`
- `does superficial loss apply to spouse account`
- `superficial loss Wealthsimple Questrade`

### 3. Capital Gains Tax Calculator Canada

Primary query:

```text
capital gains calculator Canada
```

This likely has more search demand than ACB, but it is more rate-sensitive and
more crowded. Build after ACB so the calculator can ask for proceeds and ACB
instead of pretending to solve the recordkeeping problem.

Subpages:

- stocks
- crypto
- real estate
- province variants
- 2025 and 2026 tax-year variants where maintenance is justified

### 4. T5008 Reconciliation Mode / Article Cluster

Primary query:

```text
T5008 adjusted cost base
```

Key user job:

```text
My broker gave me a T5008. Is the cost/book value right?
```

This is highly aligned with KansoBooks because it turns messy tax slips into
accountant-ready evidence. Start as an article and worksheet-like mode inside
the ACB calculator before creating a standalone tool.

### 5. GST/HST Quick Method Calculator

Primary query:

```text
GST HST quick method calculator
```

This is likely the best small-business tax tool after the investment-tax
cluster. It fits consultants, agencies, freelancers, and small corporations.

### 6. TFSA Overcontribution Penalty Calculator

Primary query:

```text
TFSA overcontribution calculator
```

Simple tool, scary user pain, strong autocomplete signal. Less directly tied to
KansoBooks, but useful for authority and backlinks.

### 7. RRSP Contribution Optimizer

Primary query:

```text
RRSP contribution calculator Canada
```

Large demand, crowded market. Useful if positioned as "how much should I
contribute before tax time?" rather than generic retirement planning.

### 8. Home Office Deduction Calculator Canada

Primary query:

```text
home office expenses calculator Canada
```

Directly relevant to self-employed users. Lower technical complexity.

## Content Engine Backlink Plan

Every tool gets:

- one canonical tool page
- one plain-English explainer
- one worked example article
- one mistake/checklist article
- broker-, province-, platform-, or tax-year-specific long-tail articles when
  justified by autocomplete

For the ACB Calculator, create article briefs for:

| Article | Target URL | Primary query | Tool link |
|---|---|---|---|
| How To Calculate ACB For Canadian Stocks | `/resources/how-to-calculate-acb-canadian-stocks` | how to calculate adjusted cost base | `/Free-Tools/acb-calculator/` |
| ACB Calculator Canada: Worked Example | `/resources/acb-calculator-canada-example` | ACB calculator Canada example | `/Free-Tools/acb-calculator/` |
| Is Wealthsimple ACB Accurate? | `/resources/is-wealthsimple-acb-accurate` | is Wealthsimple ACB accurate | `/Free-Tools/acb-calculator/` |
| Does Questrade Track ACB? | `/resources/does-questrade-track-acb` | does Questrade track ACB | `/Free-Tools/acb-calculator/` |
| T5008 And Adjusted Cost Base | `/resources/t5008-adjusted-cost-base` | T5008 adjusted cost base | `/Free-Tools/acb-calculator/` |
| Superficial Loss Rule Example Canada | `/resources/superficial-loss-rule-example-canada` | superficial loss calculation example | `/Free-Tools/superficial-loss-calculator/` |
| DRIP And Adjusted Cost Base | `/resources/drip-adjusted-cost-base` | DRIP adjusted cost base | `/Free-Tools/acb-calculator/` |
| Phantom Distributions And ACB | `/resources/phantom-distributions-acb` | phantom distributions ACB | `/Free-Tools/acb-calculator/` |
| Average Cost Basis Vs Adjusted Cost Base Canada | `/resources/average-cost-basis-vs-adjusted-cost-base-canada` | average cost basis Canada | `/Free-Tools/acb-calculator/` |
| Cost Basis Calculator Canada | `/resources/cost-basis-calculator-canada` | cost basis calculator Canada | `/Free-Tools/acb-calculator/` |
| Return Of Capital And ACB | `/resources/return-of-capital-acb` | return of capital adjusted cost base | `/Free-Tools/acb-calculator/` |
| Stock Splits And Adjusted Cost Base | `/resources/stock-split-adjusted-cost-base` | stock split adjusted cost base | `/Free-Tools/acb-calculator/` |
| Foreign Currency Securities And ACB | `/resources/foreign-currency-securities-acb-canada` | adjusted cost base foreign currency securities | `/Free-Tools/acb-calculator/` |
| Multiple Brokerage Accounts And ACB | `/resources/multiple-brokerage-accounts-acb` | adjusted cost base multiple brokerage accounts | `/Free-Tools/acb-calculator/` |
| Can ACB Be Negative? | `/resources/can-adjusted-cost-base-be-negative` | can adjusted cost base be negative | `/Free-Tools/acb-calculator/` |
| Trade Date Vs Settlement Date For ACB | `/resources/trade-date-vs-settlement-date-acb` | trade date settlement date ACB | `/Free-Tools/acb-calculator/` |
| Calculating ACB With Incomplete Records | `/resources/calculating-acb-incomplete-records` | calculating adjusted cost base with incomplete records | `/Free-Tools/acb-calculator/` |

Article rule:

```text
The article answers the fear. The tool completes the job.
```

## Product Positioning

Avoid sounding like tax software. The promise should be:

```text
Free calculators for tax-time clarity. KansoBooks turns the underlying records
into accountant-ready books.
```

The ACB calculator can be free forever because it creates:

- search discovery
- trust
- tax-time urgency
- accountant-facing artifact expectations
- future import/export surface area
- an obvious path from "one painful calculation" to "my records should be
  organized like this everywhere"

## Risks

- Tax tools need careful disclaimers and current-year maintenance.
- Exact tax payable calculators can become brittle when rules change.
- ACB logic must be deterministic, inspectable, and test-covered.
- Importing broker CSVs can create support load if the first version promises
  too much.
- A direct clone of MyACB is strategically less interesting than a free,
  article-backed utility ecosystem.

## Recommendation

Start with the ACB Calculator as the first `/Free-Tools/` build.

Ship a useful MVP quickly:

```text
manual transactions -> running ACB -> realized gain/loss -> CSV export ->
worked example -> article cluster
```

Then add superficial loss detection and broker-specific content. This gives
KansoBooks a focused tax utility wedge without waiting to build a full
investment-tax platform.
