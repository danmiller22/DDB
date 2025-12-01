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
  // Здесь сейчас демо-данные.
  // Твои ключи SAMSARA и SKYBITZ будут лежать в переменных окружения на Vercel
  // и могут использоваться здесь для реальных запросов к их API.
  const data: FleetSummaryResponse = {
    repairsOpen: 12,
    repairsDelta: "+3 today",
    expensesThisMonth: 48200,
    expensesDelta: "-8% vs last month",
    trucks: { active: 27, inShop: 3, offline: 1 },
    trailers: { tracked: 41, idle48: 5, atYard: 12 },
  };

  res.status(200).json(data);
}
