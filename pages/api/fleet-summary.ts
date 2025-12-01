import type { NextApiRequest, NextApiResponse } from "next";

type FleetSummaryResponse = {
  repairsOpen: number;
  repairsDelta: string;
  expensesThisMonth: number;
  expensesDelta: string;
  trucks: { active: number; inShop: number; offline: number };
  trailers: { tracked: number; idle48: number; atYard: number };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FleetSummaryResponse>
) {
  // Читаем значения из ENV, если есть, иначе — дефолтные демо
  const repairsOpen = Number(process.env.REPAIRS_OPEN ?? 12);
  const repairsDelta = process.env.REPAIRS_DELTA ?? "+3 today";

  const expensesThisMonth = Number(process.env.EXPENSES_THIS_MONTH ?? 48200);
  const expensesDelta = process.env.EXPENSES_DELTA ?? "-8% vs last month";

  const trucksActive = Number(process.env.TRUCKS_ACTIVE ?? 27);
  const trucksInShop = Number(process.env.TRUCKS_IN_SHOP ?? 3);
  const trucksOffline = Number(process.env.TRUCKS_OFFLINE ?? 1);

  const trailersTracked = Number(process.env.TRAILERS_TRACKED ?? 41);
  const trailersIdle48 = Number(process.env.TRAILERS_IDLE_48 ?? 5);
  const trailersAtYard = Number(process.env.TRAILERS_AT_YARD ?? 12);

  const data: FleetSummaryResponse = {
    repairsOpen,
    repairsDelta,
    expensesThisMonth,
    expensesDelta,
    trucks: { active: trucksActive, inShop: trucksInShop, offline: trucksOffline },
    trailers: { tracked: trailersTracked, idle48: trailersIdle48, atYard: trailersAtYard },
  };

  res.status(200).json(data);
}
