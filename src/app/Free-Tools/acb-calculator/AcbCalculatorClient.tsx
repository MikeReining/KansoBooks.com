"use client";

import {
  AlertTriangle,
  Download,
  FileDown,
  FileSpreadsheet,
  Plus,
  Printer,
  Trash2,
  Upload,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Action = "buy" | "sell" | "drip" | "return_of_capital" | "split";

type TransactionRow = {
  id: string;
  date: string;
  symbol: string;
  accountType: string;
  action: Action | "";
  quantity: string;
  price: string;
  grossAmount: string;
  commission: string;
  currency: string;
  fxRate: string;
  specifiedForeignProperty: string;
  notes: string;
};

type CanonicalColumn = keyof Omit<TransactionRow, "id">;

type ParsedRow = {
  row: TransactionRow;
  originalIndex: number;
  errors: string[];
};

type ProcessedRow = ParsedRow & {
  sharesAfter: number;
  totalAcbAfter: number;
  acbPerShareAfter: number;
  realizedGainLoss: number | null;
  log: string;
};

type Summary = {
  symbol: string;
  shares: number;
  totalAcb: number;
  acbPerShare: number;
  realizedGainLoss: number;
  currencies: string[];
  specifiedForeignProperty: boolean;
  warnings: string[];
};

const canonicalColumns: Array<{ key: CanonicalColumn; label: string }> = [
  { key: "date", label: "Date" },
  { key: "symbol", label: "Symbol" },
  { key: "accountType", label: "Account" },
  { key: "action", label: "Action" },
  { key: "quantity", label: "Quantity" },
  { key: "price", label: "Price" },
  { key: "grossAmount", label: "Gross amount" },
  { key: "commission", label: "Commission" },
  { key: "currency", label: "Currency" },
  { key: "fxRate", label: "FX rate" },
  { key: "specifiedForeignProperty", label: "T1135" },
  { key: "notes", label: "Notes" },
];

const actionOptions: Action[] = [
  "buy",
  "sell",
  "drip",
  "return_of_capital",
  "split",
];

const importSteps = [
  "Upload",
  "Map columns",
  "Fix preview",
  "Import rows",
] as const;

const googleSheetsCopyUrl =
  "https://docs.google.com/spreadsheets/d/1kovHZbl-xfIgDNtptMGjti6BefufwlifA5rYA4sYG70/copy";

const columnAliases: Record<CanonicalColumn, string[]> = {
  date: ["date", "trade date", "transaction date", "settlement date"],
  symbol: ["symbol", "ticker", "security", "security symbol", "instrument"],
  accountType: ["account_type", "account type", "account", "account name"],
  action: ["action", "type", "transaction type", "activity", "description"],
  quantity: ["quantity", "shares", "units", "qty", "share quantity"],
  price: ["price", "share price", "unit price", "price per share"],
  grossAmount: [
    "gross_amount",
    "gross amount",
    "amount",
    "total",
    "net amount",
    "proceeds",
    "cost",
  ],
  commission: ["commission", "fees", "fee", "costs", "expenses"],
  currency: ["currency", "ccy"],
  fxRate: ["fx_rate", "fx rate", "exchange rate", "cad rate"],
  specifiedForeignProperty: [
    "specified_foreign_property",
    "specified foreign property",
    "t1135",
    "foreign property",
    "sfp",
  ],
  notes: ["notes", "note", "memo", "description"],
};

const actionAliases: Record<string, Action> = {
  buy: "buy",
  bought: "buy",
  purchase: "buy",
  purchased: "buy",
  sell: "sell",
  sold: "sell",
  sale: "sell",
  drip: "drip",
  reinvest: "drip",
  reinvested: "drip",
  "reinvested distribution": "drip",
  return_of_capital: "return_of_capital",
  "return of capital": "return_of_capital",
  roc: "return_of_capital",
  split: "split",
  "stock split": "split",
};

let nextRowId = 0;

function createRowId() {
  nextRowId += 1;
  return `row-${nextRowId}`;
}

const blankRow = (): TransactionRow => ({
  id: createRowId(),
  date: "",
  symbol: "",
  accountType: "non_registered",
  action: "",
  quantity: "",
  price: "",
  grossAmount: "",
  commission: "0",
  currency: "CAD",
  fxRate: "1",
  specifiedForeignProperty: "",
  notes: "",
});

const exampleRows = (): TransactionRow[] => [
  {
    ...blankRow(),
    date: "2026-01-15",
    symbol: "XEQT",
    action: "buy",
    quantity: "100",
    price: "30.00",
    grossAmount: "3000.00",
    specifiedForeignProperty: "no",
  },
  {
    ...blankRow(),
    date: "2026-03-15",
    symbol: "XEQT",
    action: "drip",
    quantity: "2.5",
    price: "31.00",
    grossAmount: "77.50",
    specifiedForeignProperty: "no",
    notes: "Reinvested distribution",
  },
  {
    ...blankRow(),
    date: "2026-06-15",
    symbol: "XEQT",
    action: "return_of_capital",
    grossAmount: "-12.40",
    specifiedForeignProperty: "no",
    notes: "Return of capital reduces ACB",
  },
  {
    ...blankRow(),
    date: "2026-09-15",
    symbol: "XEQT",
    action: "sell",
    quantity: "40",
    price: "34.00",
    grossAmount: "1360.00",
    specifiedForeignProperty: "no",
  },
];

function normalizeHeader(value: string) {
  return value.trim().toLowerCase().replace(/[-\s]+/g, "_");
}

function normalizeAction(value: string): Action | "" {
  const normalized = value.trim().toLowerCase().replace(/[-_]+/g, " ");
  return actionAliases[normalized] ?? actionAliases[normalized.replace(/\s+/g, "_")] ?? "";
}

function parseNumber(value: string) {
  const normalized = value.replace(/[$,\s]/g, "");
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseBoolean(value: string) {
  const normalized = value.trim().toLowerCase();
  return ["1", "true", "yes", "y", "t1135"].includes(normalized);
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatNumber(value: number, digits = 4) {
  return new Intl.NumberFormat("en-CA", {
    maximumFractionDigits: digits,
  }).format(value);
}

function parseDelimited(text: string) {
  const delimiter = text.split("\n")[0]?.includes("\t") ? "\t" : ",";
  const rows: string[][] = [];
  let field = "";
  let row: string[] = [];
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const nextChar = text[index + 1];

    if (char === '"') {
      if (quoted && nextChar === '"') {
        field += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }

    if (!quoted && char === delimiter) {
      row.push(field);
      field = "";
      continue;
    }

    if (!quoted && (char === "\n" || char === "\r")) {
      if (char === "\r" && nextChar === "\n") index += 1;
      row.push(field);
      if (row.some((cell) => cell.trim() !== "")) rows.push(row);
      row = [];
      field = "";
      continue;
    }

    field += char;
  }

  row.push(field);
  if (row.some((cell) => cell.trim() !== "")) rows.push(row);
  return rows;
}

function csvEscape(value: string) {
  if (!/[",\n\r]/.test(value)) return value;
  return `"${value.replace(/"/g, '""')}"`;
}

function toCsv(rows: TransactionRow[]) {
  const header = canonicalColumns.map((column) => snakeCase(column.key));
  const body = rows.map((row) =>
    canonicalColumns
      .map((column) => csvEscape(String(row[column.key] ?? "")))
      .join(","),
  );
  return [header.join(","), ...body].join("\n");
}

function snakeCase(value: string) {
  return value.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function downloadFile(filename: string, content: string, type = "text/csv") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function isMeaningfulRow(row: TransactionRow) {
  return Boolean(
    row.date.trim() ||
      row.symbol.trim() ||
      row.action ||
      row.quantity.trim() ||
      row.price.trim() ||
      row.grossAmount.trim() ||
      row.specifiedForeignProperty.trim() ||
      row.notes.trim(),
  );
}

function validate(row: TransactionRow) {
  const errors: string[] = [];
  const action = row.action;
  const quantity = parseNumber(row.quantity);
  const price = parseNumber(row.price);
  const gross = parseNumber(row.grossAmount);
  const fxRate = parseNumber(row.fxRate) ?? 1;

  if (!row.date) errors.push("Missing date");
  if (!row.symbol) errors.push("Missing symbol");
  if (!action) errors.push("Missing action");
  if (row.currency && row.currency.toUpperCase() !== "CAD" && fxRate <= 0) {
    errors.push("FX rate must be greater than zero");
  }

  if (action === "buy" || action === "sell" || action === "drip") {
    if (!quantity || quantity <= 0) errors.push("Quantity must be greater than zero");
    if ((price === null || price <= 0) && gross === null) {
      errors.push("Enter price or gross amount");
    }
  }

  if (action === "return_of_capital" && gross === null) {
    errors.push("Enter return of capital amount");
  }

  if (action === "split" && (!quantity || quantity <= 0)) {
    errors.push("Quantity should be the share count after the split");
  }

  return errors;
}

function calculate(rows: TransactionRow[]) {
  const parsedRows: ParsedRow[] = rows
    .map((row, originalIndex) => ({
      row: { ...row, symbol: row.symbol.trim().toUpperCase() },
      originalIndex,
      errors: validate(row),
    }))
    .filter((parsed) => isMeaningfulRow(parsed.row));

  const orderedRows = [...parsedRows].sort((a, b) => {
    const dateCompare = a.row.date.localeCompare(b.row.date);
    return dateCompare || a.originalIndex - b.originalIndex;
  });

  const states = new Map<
    string,
    {
      shares: number;
      totalAcb: number;
      realizedGainLoss: number;
      currencies: Set<string>;
      specifiedForeignProperty: boolean;
      warnings: string[];
    }
  >();

  const processed: ProcessedRow[] = orderedRows.map((parsed) => {
    const symbol = parsed.row.symbol || "UNKNOWN";
    const state =
      states.get(symbol) ??
      {
        shares: 0,
        totalAcb: 0,
        realizedGainLoss: 0,
        currencies: new Set<string>(),
        specifiedForeignProperty: false,
        warnings: [],
      };
    const action = parsed.row.action;
    const quantity = parseNumber(parsed.row.quantity) ?? 0;
    const price = parseNumber(parsed.row.price) ?? 0;
    const gross = parseNumber(parsed.row.grossAmount);
    const commission = parseNumber(parsed.row.commission) ?? 0;
    const fxRate = parseNumber(parsed.row.fxRate) ?? 1;
    const grossCad = (gross ?? quantity * price) * fxRate;
    const commissionCad = commission * fxRate;
    let realizedGainLoss: number | null = null;
    let log = "Skipped until row errors are fixed.";

    if (parsed.row.currency) {
      state.currencies.add(parsed.row.currency.toUpperCase());
    }
    if (parseBoolean(parsed.row.specifiedForeignProperty)) {
      state.specifiedForeignProperty = true;
    }

    if (parsed.errors.length === 0) {
      if (action === "buy" || action === "drip") {
        const acquisitionCost = grossCad + commissionCad;
        state.totalAcb += acquisitionCost;
        state.shares += quantity;
        log = `${action === "drip" ? "DRIP" : "Buy"} added ${formatNumber(
          quantity,
        )} shares and ${formatMoney(acquisitionCost)} to ACB.`;
      }

      if (action === "sell") {
        const acbPerShare = state.shares > 0 ? state.totalAcb / state.shares : 0;
        const acbRemoved = acbPerShare * quantity;
        realizedGainLoss = grossCad - commissionCad - acbRemoved;
        state.realizedGainLoss += realizedGainLoss;
        state.totalAcb -= acbRemoved;
        state.shares -= quantity;
        if (state.shares < -0.000001) {
          state.warnings.push(`${symbol}: sold more shares than the running balance.`);
        }
        if (Math.abs(state.shares) < 0.000001) {
          state.shares = 0;
          state.totalAcb = 0;
        }
        log = `Sell removed ${formatMoney(acbRemoved)} of ACB and realized ${formatMoney(
          realizedGainLoss,
        )}.`;
      }

      if (action === "return_of_capital") {
        const reduction = Math.abs(grossCad);
        state.totalAcb -= reduction;
        if (state.totalAcb < -0.000001) {
          state.warnings.push(`${symbol}: return of capital pushed ACB below zero.`);
        }
        log = `Return of capital reduced ACB by ${formatMoney(reduction)}.`;
      }

      if (action === "split") {
        const oldShares = state.shares;
        state.shares = quantity;
        log = `Split changed shares from ${formatNumber(oldShares)} to ${formatNumber(
          quantity,
        )}; total ACB stayed the same.`;
      }
    }

    states.set(symbol, state);

    return {
      ...parsed,
      sharesAfter: state.shares,
      totalAcbAfter: state.totalAcb,
      acbPerShareAfter: state.shares > 0 ? state.totalAcb / state.shares : 0,
      realizedGainLoss,
      log,
    };
  });

  const summaries: Summary[] = [...states.entries()]
    .map(([symbol, state]) => ({
      symbol,
      shares: state.shares,
      totalAcb: state.totalAcb,
      acbPerShare: state.shares > 0 ? state.totalAcb / state.shares : 0,
      realizedGainLoss: state.realizedGainLoss,
      currencies: [...state.currencies].sort(),
      specifiedForeignProperty: state.specifiedForeignProperty,
      warnings: state.warnings,
    }))
    .sort((a, b) => a.symbol.localeCompare(b.symbol));

  return { processed, summaries };
}

function detectMapping(headers: string[]) {
  const normalizedHeaders = headers.map(normalizeHeader);
  const mapping: Record<CanonicalColumn, string> = {} as Record<
    CanonicalColumn,
    string
  >;

  canonicalColumns.forEach(({ key }) => {
    const aliases = columnAliases[key].map(normalizeHeader);
    const matchIndex = normalizedHeaders.findIndex((header) =>
      aliases.includes(header),
    );
    mapping[key] = matchIndex >= 0 ? headers[matchIndex] : "";
  });

  return mapping;
}

function buildRowsFromMapping(
  headers: string[],
  dataRows: string[][],
  mapping: Record<CanonicalColumn, string>,
) {
  const headerIndex = new Map(headers.map((header, index) => [header, index]));

  return dataRows.map((dataRow) => {
    const row = blankRow();
    canonicalColumns.forEach(({ key }) => {
      const sourceHeader = mapping[key];
      const sourceIndex = headerIndex.get(sourceHeader);
      const rawValue = sourceIndex === undefined ? "" : dataRow[sourceIndex] ?? "";
      if (key === "action") {
        row[key] = normalizeAction(rawValue);
      } else {
        row[key] = rawValue.trim();
      }
    });
    row.symbol = row.symbol.toUpperCase();
    row.currency = row.currency ? row.currency.toUpperCase() : "CAD";
    row.specifiedForeignProperty = row.specifiedForeignProperty.toLowerCase();
    row.fxRate = row.fxRate || "1";
    row.commission = row.commission || "0";
    row.accountType = row.accountType || "non_registered";
    return row;
  });
}

export function AcbCalculatorClient() {
  const [rows, setRows] = useState<TransactionRow[]>([blankRow()]);
  const [importHeaders, setImportHeaders] = useState<string[]>([]);
  const [importDataRows, setImportDataRows] = useState<string[][]>([]);
  const [mapping, setMapping] = useState<Record<CanonicalColumn, string> | null>(
    null,
  );
  const [draftRows, setDraftRows] = useState<TransactionRow[]>([]);
  const [yearFilter, setYearFilter] = useState("all");
  const [symbolFilter, setSymbolFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const result = useMemo(() => calculate(rows), [rows]);
  const draftResult = useMemo(() => calculate(draftRows), [draftRows]);
  const filterOptions = useMemo(() => {
    const years = new Set<string>();
    const symbols = new Set<string>();

    result.processed.forEach((row) => {
      const year = row.row.date.slice(0, 4);
      if (/^\d{4}$/.test(year)) years.add(year);
      if (row.row.symbol) symbols.add(row.row.symbol);
    });

    return {
      years: [...years].sort((a, b) => b.localeCompare(a)),
      symbols: [...symbols].sort(),
    };
  }, [result.processed]);
  const filteredProcessedRows = useMemo(
    () =>
      result.processed.filter((row) => {
        const year = row.row.date.slice(0, 4);
        return (
          (yearFilter === "all" || year === yearFilter) &&
          (symbolFilter === "all" || row.row.symbol === symbolFilter) &&
          (actionFilter === "all" || row.row.action === actionFilter)
        );
      }),
    [actionFilter, result.processed, symbolFilter, yearFilter],
  );
  const filteredRealizedTotal = filteredProcessedRows.reduce(
    (total, row) => total + (row.realizedGainLoss ?? 0),
    0,
  );
  const allYearsRealizedTotal = result.processed.reduce(
    (total, row) => total + (row.realizedGainLoss ?? 0),
    0,
  );
  const draftErrorCount = draftResult.processed.reduce(
    (total, row) => total + row.errors.length,
    0,
  );
  const hasImport = importHeaders.length > 0;
  const importStep = !hasImport ? 1 : draftErrorCount > 0 ? 3 : 4;

  function updateRow(id: string, key: CanonicalColumn, value: string) {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, [key]: value } : row)),
    );
  }

  function updateDraftRow(id: string, key: CanonicalColumn, value: string) {
    setDraftRows((current) =>
      current.map((row) => (row.id === id ? { ...row, [key]: value } : row)),
    );
  }

  function loadImport(text: string) {
    const parsed = parseDelimited(text);
    const [headers = [], ...dataRows] = parsed;
    const cleanHeaders = headers.map((header) => header.trim());
    const nextMapping = detectMapping(cleanHeaders);
    setImportHeaders(cleanHeaders);
    setImportDataRows(dataRows);
    setMapping(nextMapping);
    setDraftRows(buildRowsFromMapping(cleanHeaders, dataRows, nextMapping));
  }

  async function handleFile(file: File | undefined) {
    if (!file) return;
    loadImport(await file.text());
  }

  function changeMapping(key: CanonicalColumn, value: string) {
    if (!mapping) return;
    const nextMapping = { ...mapping, [key]: value };
    setMapping(nextMapping);
    setDraftRows(buildRowsFromMapping(importHeaders, importDataRows, nextMapping));
  }

  function importDraftRows() {
    if (draftErrorCount > 0) return;
    setRows((current) => [
      ...current.filter(isMeaningfulRow),
      ...draftRows,
    ]);
    setImportHeaders([]);
    setImportDataRows([]);
    setMapping(null);
    setDraftRows([]);
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-lg border border-border bg-card p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Transaction table
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter trades like a small spreadsheet. Calculations stay in your
                browser.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setRows(exampleRows())}
              >
                <FileSpreadsheet className="size-4" />
                Load example
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setRows([blankRow()])}
              >
                Clear
              </Button>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-[1180px] text-left text-sm">
              <thead className="border-y border-border bg-muted text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  {canonicalColumns.map((column) => (
                    <th key={column.key} className="px-2 py-2 font-medium">
                      {column.label}
                    </th>
                  ))}
                  <th className="w-12 px-2 py-2">
                    <span className="sr-only">Remove</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td className="px-2 py-2">
                      <input
                        className="h-10 w-[132px] rounded-md border border-input bg-background px-2 text-sm"
                        type="date"
                        value={row.date}
                        onChange={(event) =>
                          updateRow(row.id, "date", event.target.value)
                        }
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        className="h-10 w-[96px] rounded-md border border-input bg-background px-2 text-sm uppercase"
                        value={row.symbol}
                        onChange={(event) =>
                          updateRow(row.id, "symbol", event.target.value.toUpperCase())
                        }
                        placeholder="XEQT"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        className="h-10 w-[144px] rounded-md border border-input bg-background px-2 text-sm"
                        value={row.accountType}
                        onChange={(event) =>
                          updateRow(row.id, "accountType", event.target.value)
                        }
                      />
                    </td>
                    <td className="px-2 py-2">
                      <select
                        className="h-10 w-[156px] rounded-md border border-input bg-background px-2 text-sm"
                        value={row.action}
                        onChange={(event) =>
                          updateRow(row.id, "action", event.target.value)
                        }
                      >
                        <option value="">Choose</option>
                        {actionOptions.map((action) => (
                          <option key={action} value={action}>
                            {action}
                          </option>
                        ))}
                      </select>
                    </td>
                    {(["quantity", "price", "grossAmount", "commission"] as const).map(
                      (key) => (
                        <td key={key} className="px-2 py-2">
                          <input
                            className="h-10 w-[116px] rounded-md border border-input bg-background px-2 text-sm"
                            inputMode="decimal"
                            value={row[key]}
                            onChange={(event) =>
                              updateRow(row.id, key, event.target.value)
                            }
                          />
                        </td>
                      ),
                    )}
                    <td className="px-2 py-2">
                      <input
                        className="h-10 w-[84px] rounded-md border border-input bg-background px-2 text-sm uppercase"
                        value={row.currency}
                        onChange={(event) =>
                          updateRow(row.id, "currency", event.target.value.toUpperCase())
                        }
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        className="h-10 w-[92px] rounded-md border border-input bg-background px-2 text-sm"
                        inputMode="decimal"
                        value={row.fxRate}
                        onChange={(event) =>
                          updateRow(row.id, "fxRate", event.target.value)
                        }
                      />
                    </td>
                    <td className="px-2 py-2">
                      <select
                        className="h-10 w-[92px] rounded-md border border-input bg-background px-2 text-sm"
                        value={row.specifiedForeignProperty}
                        onChange={(event) =>
                          updateRow(
                            row.id,
                            "specifiedForeignProperty",
                            event.target.value,
                          )
                        }
                      >
                        <option value="">-</option>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </td>
                    <td className="px-2 py-2">
                      <input
                        className="h-10 w-[180px] rounded-md border border-input bg-background px-2 text-sm"
                        value={row.notes}
                        onChange={(event) =>
                          updateRow(row.id, "notes", event.target.value)
                        }
                      />
                    </td>
                    <td className="px-2 py-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Remove row"
                        onClick={() =>
                          setRows((current) =>
                            current.length === 1
                              ? [blankRow()]
                              : current.filter((item) => item.id !== row.id),
                          )
                        }
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setRows((current) => [...current, blankRow()])}
            >
              <Plus className="size-4" />
              Add row
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => downloadFile("kansobooks-acb-transactions.csv", toCsv(rows))}
            >
              <Download className="size-4" />
              Export CSV
            </Button>
            <Button type="button" variant="secondary" onClick={() => window.print()}>
              <Printer className="size-4" />
              Print worksheet
            </Button>
          </div>
        </div>

        <aside className="rounded-lg border border-border bg-card p-4 shadow-sm sm:p-5">
          <h2 className="text-xl font-semibold tracking-tight">Results</h2>
          <div className="mt-4 space-y-4">
            {result.summaries.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Add a transaction or import a CSV to calculate ACB.
              </p>
            ) : (
              result.summaries.map((summary) => (
                <div
                  key={summary.symbol}
                  className="rounded-lg border border-border bg-background p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold">{summary.symbol}</h3>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-medium",
                        summary.realizedGainLoss >= 0
                          ? "bg-success-soft text-success"
                          : "bg-destructive-soft text-destructive",
                      )}
                    >
                      {formatMoney(summary.realizedGainLoss)}
                    </span>
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Shares</dt>
                      <dd className="font-medium">{formatNumber(summary.shares)}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Total ACB</dt>
                      <dd className="font-medium">{formatMoney(summary.totalAcb)}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">ACB / share</dt>
                      <dd className="font-medium">
                        {formatMoney(summary.acbPerShare)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Realized</dt>
                      <dd className="font-medium">
                        {formatMoney(summary.realizedGainLoss)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Currency</dt>
                      <dd className="font-medium">
                        {summary.currencies.join(", ") || "CAD"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">T1135 flag</dt>
                      <dd className="font-medium">
                        {summary.specifiedForeignProperty ? "Yes" : "No"}
                      </dd>
                    </div>
                  </dl>
                  {summary.warnings.length > 0 && (
                    <div className="mt-3 space-y-1 text-xs text-destructive">
                      {summary.warnings.map((warning) => (
                        <p key={warning} className="flex gap-1">
                          <AlertTriangle className="mt-0.5 size-3 shrink-0" />
                          {warning}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            This is a planning worksheet, not tax advice. Review edge cases with
            your accountant before filing.
          </p>
        </aside>
      </section>

      <section className="rounded-lg border border-border bg-card p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Import a CSV
            </h2>
            <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
              Download a template, paste rows from a spreadsheet, or upload a CSV.
              You can map columns before anything enters the calculator.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="default" size="sm">
              <a
                href={googleSheetsCopyUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FileSpreadsheet className="size-4" />
                Google Sheet
              </a>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <a href="/free-tools/acb-calculator/kansobooks-acb-calculator-template.xlsx">
                <FileSpreadsheet className="size-4" />
                Excel workbook
              </a>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <a href="/free-tools/acb-calculator/kansobooks-acb-template-blank.csv">
                <FileDown className="size-4" />
                Blank template
              </a>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <a href="/free-tools/acb-calculator/kansobooks-acb-template.csv">
                <FileDown className="size-4" />
                Example CSV
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-4">
          {importSteps.map((step, index) => {
            const stepNumber = index + 1;
            const active = stepNumber <= importStep;
            return (
              <div
                key={step}
                className={cn(
                  "flex items-center gap-3 rounded-lg border px-3 py-2 text-sm",
                  active
                    ? "border-primary bg-primary-soft text-primary"
                    : "border-border bg-muted/40 text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground",
                  )}
                >
                  {stepNumber}
                </span>
                <span className="font-medium">{step}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div
            className="rounded-lg border border-dashed border-border bg-muted/40 p-4"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              void handleFile(event.dataTransfer.files[0]);
            }}
          >
            <input
              ref={fileInputRef}
              className="hidden"
              type="file"
              accept=".csv,text/csv,.txt,.tsv"
              onChange={(event) => void handleFile(event.target.files?.[0])}
            />
            <Button
              type="button"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="size-4" />
              Choose CSV
            </Button>
            <textarea
              className="mt-3 min-h-[168px] w-full resize-y rounded-md border border-input bg-background p-3 text-sm"
              placeholder="Or paste rows from Excel / Google Sheets here, including a header row."
              onBlur={(event) => {
                const value = event.target.value.trim();
                if (value) loadImport(value);
              }}
            />
          </div>

          <div className="min-h-[280px] rounded-lg border border-border bg-background p-4">
            {!hasImport || !mapping ? (
              <div className="flex h-full min-h-[248px] items-center justify-center text-center text-sm text-muted-foreground">
                CSV preview will appear here before import.
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <h3 className="font-semibold">Map columns</h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {canonicalColumns.map((column) => (
                      <label key={column.key} className="text-xs font-medium">
                        {column.label}
                        <select
                          className="mt-1 h-10 w-full rounded-md border border-input bg-background px-2 text-sm font-normal"
                          value={mapping[column.key]}
                          onChange={(event) =>
                            changeMapping(column.key, event.target.value)
                          }
                        >
                          <option value="">Do not import</option>
                          {importHeaders.map((header) => (
                            <option key={header} value={header}>
                              {header}
                            </option>
                          ))}
                        </select>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-semibold">Preview</h3>
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "text-sm",
                          draftErrorCount > 0
                            ? "text-destructive"
                            : "text-success",
                        )}
                      >
                        {draftRows.length} rows, {draftErrorCount} issues
                      </span>
                      <Button
                        type="button"
                        size="sm"
                        disabled={draftRows.length === 0 || draftErrorCount > 0}
                        onClick={importDraftRows}
                      >
                        Import rows
                      </Button>
                    </div>
                  </div>

                  <div className="mt-3 overflow-x-auto">
                    <table className="min-w-[980px] text-left text-sm">
                      <thead className="border-y border-border bg-muted text-xs uppercase tracking-wide text-muted-foreground">
                        <tr>
                          {canonicalColumns.slice(0, 11).map((column) => (
                            <th key={column.key} className="px-2 py-2 font-medium">
                              {column.label}
                            </th>
                          ))}
                          <th className="px-2 py-2 font-medium">Issues</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {draftRows.slice(0, 20).map((row) => {
                          const rowErrors = validate(row);
                          return (
                            <tr key={row.id}>
                              {canonicalColumns.slice(0, 11).map((column) => (
                                <td key={column.key} className="px-2 py-2">
                                  {column.key === "action" ? (
                                    <select
                                      className="h-9 w-[132px] rounded-md border border-input bg-background px-2 text-sm"
                                      value={row.action}
                                      onChange={(event) =>
                                        updateDraftRow(
                                          row.id,
                                          column.key,
                                          event.target.value,
                                        )
                                      }
                                    >
                                      <option value="">Choose</option>
                                      {actionOptions.map((action) => (
                                        <option key={action} value={action}>
                                          {action}
                                        </option>
                                      ))}
                                    </select>
                                  ) : column.key === "specifiedForeignProperty" ? (
                                    <select
                                      className="h-9 w-[92px] rounded-md border border-input bg-background px-2 text-sm"
                                      value={row.specifiedForeignProperty}
                                      onChange={(event) =>
                                        updateDraftRow(
                                          row.id,
                                          column.key,
                                          event.target.value,
                                        )
                                      }
                                    >
                                      <option value="">-</option>
                                      <option value="no">No</option>
                                      <option value="yes">Yes</option>
                                    </select>
                                  ) : (
                                    <input
                                      className="h-9 w-[112px] rounded-md border border-input bg-background px-2 text-sm"
                                      value={row[column.key]}
                                      onChange={(event) =>
                                        updateDraftRow(
                                          row.id,
                                          column.key,
                                          event.target.value,
                                        )
                                      }
                                    />
                                  )}
                                </td>
                              ))}
                              <td className="max-w-[220px] px-2 py-2 text-xs text-destructive">
                                {rowErrors.join(", ")}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {draftRows.length > 20 && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Showing first 20 rows. All rows will import after issues
                        are fixed.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Calculation log
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Filter the report without changing the running ACB calculation.
            </p>
          </div>
          <div className="grid gap-2 text-sm sm:grid-cols-2 lg:w-[360px]">
            <div className="rounded-lg border border-border bg-background p-3">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Filtered gain/loss
              </div>
              <div
                className={cn(
                  "mt-1 text-lg font-semibold",
                  filteredRealizedTotal >= 0 ? "text-success" : "text-destructive",
                )}
              >
                {formatMoney(filteredRealizedTotal)}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-background p-3">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                All years gain/loss
              </div>
              <div
                className={cn(
                  "mt-1 text-lg font-semibold",
                  allYearsRealizedTotal >= 0 ? "text-success" : "text-destructive",
                )}
              >
                {formatMoney(allYearsRealizedTotal)}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <label className="text-sm font-medium">
            Year
            <select
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm font-normal"
              value={yearFilter}
              onChange={(event) => setYearFilter(event.target.value)}
            >
              <option value="all">All years</option>
              {filterOptions.years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Security
            <select
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm font-normal"
              value={symbolFilter}
              onChange={(event) => setSymbolFilter(event.target.value)}
            >
              <option value="all">All securities</option>
              {filterOptions.symbols.map((symbol) => (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Type
            <select
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm font-normal"
              value={actionFilter}
              onChange={(event) => setActionFilter(event.target.value)}
            >
              <option value="all">All types</option>
              {actionOptions.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-[920px] text-left text-sm">
            <thead className="border-y border-border bg-muted text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Date</th>
                <th className="px-3 py-2 font-medium">Symbol</th>
                <th className="px-3 py-2 font-medium">Action</th>
                <th className="px-3 py-2 font-medium">Shares after</th>
                <th className="px-3 py-2 font-medium">Total ACB after</th>
                <th className="px-3 py-2 font-medium">ACB/share after</th>
                <th className="px-3 py-2 font-medium">Realized</th>
                <th className="px-3 py-2 font-medium">Log</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {result.processed.length === 0 ? (
                <tr>
                  <td className="px-3 py-5 text-muted-foreground" colSpan={8}>
                    No calculation rows yet.
                  </td>
                </tr>
              ) : filteredProcessedRows.length === 0 ? (
                <tr>
                  <td className="px-3 py-5 text-muted-foreground" colSpan={8}>
                    No rows match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredProcessedRows.map((row) => (
                  <tr key={row.row.id}>
                    <td className="px-3 py-3">{row.row.date}</td>
                    <td className="px-3 py-3 font-medium">{row.row.symbol}</td>
                    <td className="px-3 py-3">{row.row.action}</td>
                    <td className="px-3 py-3">{formatNumber(row.sharesAfter)}</td>
                    <td className="px-3 py-3">{formatMoney(row.totalAcbAfter)}</td>
                    <td className="px-3 py-3">
                      {formatMoney(row.acbPerShareAfter)}
                    </td>
                    <td className="px-3 py-3">
                      {row.realizedGainLoss === null
                        ? "-"
                        : formatMoney(row.realizedGainLoss)}
                    </td>
                    <td className="max-w-[360px] px-3 py-3">
                      {row.errors.length > 0 ? (
                        <span className="text-destructive">
                          {row.errors.join(", ")}
                        </span>
                      ) : (
                        row.log
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
