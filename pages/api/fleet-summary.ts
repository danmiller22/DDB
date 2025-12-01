import type { NextApiRequest, NextApiResponse } from "next";

type FleetSummaryResponse = {
  repairsOpen: number;
  repairsDelta: string;
  expensesThisMonth: number;
  expensesDelta: string;
  trucks: { active: number; inShop: number; offline: number };
  trailers: { tracked: number; idle48: number; atYard: number };
};

// ссылки на твои готовые дашборды
const REPAIRS_URL =
  process.env.REPAIRS_DASHBOARD_URL || "https://danmiller22.github.io/BD/";
const EXPENSES_URL =
  process.env.EXPENSES_DASHBOARD_URL ||
  "https://danmiller22.github.io/us-team-fleet-dashboard/";

// утилита: скачать HTML страницы
async function fetchHtml(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

// утилита: вытащить число рядом с надписью (Jobs Open, Jobs Closed и т.п.)
function extractNumberAround(label: string, html: string | null): number | null {
  if (!html) return null;
  const idx = html.indexOf(label);
  if (idx === -1) return null;
  const snippet = html.slice(idx, idx + 200); // кусок после лейбла
  const match = snippet.match(/[-+]?[0-9][0-9,\.]*/);
  if (!match) return null;
  const raw = match[0].replace(/[^0-9\.\-]/g, "").replace(/,/g, "");
  const num = Number(raw);
  return Number.isFinite(num) ? num : null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FleetSummaryResponse>
) {
  // 1) Repairs: Jobs Open / Jobs Closed с BD-дашборда
  const repairsHtml = await fetchHtml(REPAIRS_URL);
  const jobsOpen =
    extractNumberAround("Jobs Open", repairsHtml) ??
    extractNumberAround("Open", repairsHtml) ??
    12;
  const jobsClosed =
    extractNumberAround("Jobs Closed", repairsHtml) ??
    extractNumberAround("Closed", repairsHtml) ??
    0;

  // 2) Expenses: Spend this month с другого дашборда
  const expensesHtml = await fetchHtml(EXPENSES_URL);
  const spendThisMonth =
    extractNumberAround("Spend this month", expensesHtml) ??
    extractNumberAround("Total Spend", expensesHtml) ??
    48200;

  // 3) Остальное пока оставим статикой/заглушкой —
  // потом можно тоже привязать к реальным источникам
  const data: FleetSummaryResponse = {
    repairsOpen: jobsOpen,
    repairsDelta: `Closed ${jobsClosed} total`,
    expensesThisMonth: spendThisMonth,
    expensesDelta: "", // можно потом сделать сравнение месяц к месяцу
    trucks: { active: 27, inShop: 3, offline: 1 },
    trailers: { tracked: 41, idle48: 5, atYard: 12 },
  };

  res.status(200).json(data);
}
