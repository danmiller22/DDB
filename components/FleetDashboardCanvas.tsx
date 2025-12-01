"use client";

import { useEffect, useState } from "react";

type FleetSummary = {
  repairsOpen: number;
  repairsDelta: string;
  expensesThisMonth: number;
  expensesDelta: string;
  trucks: { active: number; inShop: number; offline: number };
  trailers: { tracked: number; idle48: number; atYard: number };
};

export default function FleetDashboardCanvas() {
  const [summary, setSummary] = useState<FleetSummary | null>(null);

  useEffect(() => {
    fetch("/api/fleet-summary")
      .then((r) => r.json())
      .then((data) => setSummary(data))
      .catch(() => {
        setSummary(null);
      });
  }, []);

  const handleCardClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    card: { href: string }
  ) => {
    if (card.href.startsWith("http")) return;
    e.preventDefault();
    const id = card.href.replace("#", "");
    if (typeof document !== "undefined") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const cards = [
    {
      title: "Repairs",
      subtitle: "Open & closed work orders",
      href: "https://danmiller22.github.io/BD/",
      kpi: summary ? `${summary.repairsOpen} open` : "12 open",
      trend: summary ? summary.repairsDelta : "+3 today",
      accent: "from-rose-500/80 to-red-500/90",
    },
    {
      title: "Expenses",
      subtitle: "Monthly maintenance spend",
      href: "https://danmiller22.github.io/us-team-fleet-dashboard/",
      kpi: summary
        ? `$${summary.expensesThisMonth.toLocaleString()}`
        : "$48.2k",
      trend: summary ? summary.expensesDelta : "↓ 8% vs last month",
      accent: "from-sky-500/70 to-emerald-500/80",
    },
    {
      title: "Trucks",
      subtitle: "Fleet status snapshot",
      href: "#trucks",
      kpi: summary ? `${summary.trucks.active} active` : "27 active",
      trend: summary ? `${summary.trucks.inShop} in shop` : "3 in shop",
      accent: "from-red-500/80 to-amber-500/80",
    },
    {
      title: "Trailers",
      subtitle: "Idle time & location",
      href: "#trailers",
      kpi: summary ? `${summary.trailers.tracked} tracked` : "41 tracked",
      trend: summary
        ? `${summary.trailers.idle48} idle > 48h`
        : "5 idle > 48h",
      accent: "from-fuchsia-500/80 to-rose-500/90",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-slate-950 to-zinc-950 text-slate-50 p-4 sm:p-8">
      <div className="w-full h-full rounded-[32px] bg-white/5 border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.85)] backdrop-blur-2xl px-6 sm:px-10 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 shadow-[0_0_40px_rgba(248,113,113,0.8)] flex items-center justify-center text-xs font-semibold tracking-tight">
              FM
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                UTCN
              </span>
              <span className="text-sm sm:text-base text-slate-200/90">
                Fleet Dashboard
              </span>
            </div>
          </div>
        </div>

        {/* Heading & primary CTA row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              UTCN Fleet Dashboard
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://danmiller22.github.io/BD/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-sm font-medium shadow-[0_0_40px_rgba(248,113,113,0.7)] hover:brightness-110 transition"
            >
              Open repairs board
            </a>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          {cards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noreferrer" : undefined}
              onClick={(e) => handleCardClick(e, card)}
              className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_24px_70px_rgba(0,0,0,0.8)] hover:border-white/30 hover:bg-white/10 transition"
            >
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${card.accent} opacity-60 blur-3xl group-hover:opacity-90 group-hover:scale-110 transition`}
              />

              <div className="flex items-center justify-between gap-2 mb-6">
                <div>
                  <p className="text-lg sm:text-xl font-medium tracking-tight text-slate-50">
                    {card.title}
                  </p>
                </div>
                <div className="h-9 w-9 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-xs text-slate-100 group-hover:bg-white/20 transition">
                  ↗
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
                  {card.kpi}
                </p>
                <p className="text-xs text-slate-400">{card.subtitle}</p>
                <p className="text-xs font-medium text-emerald-300/90">
                  {card.trend}
                </p>
              </div>

              <div className="mt-5 h-[3px] w-full rounded-full bg-gradient-to-r from-white/10 via-white/30 to-white/5" />
            </a>
          ))}
        </div>

        {/* Detail sections */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          <section
            id="trucks"
            className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl p-4 sm:p-5 shadow-[0_24px_70px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-lg font-semibold tracking-tight text-slate-50">
                  Trucks
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3 flex flex-col gap-1">
                <span className="text-slate-400">Active</span>
                <span className="text-xl font-semibold">
                  {summary ? summary.trucks.active : 27}
                </span>
                <span className="text-[11px] text-emerald-300/90">
                  +2 vs yesterday
                </span>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3 flex flex-col gap-1">
                <span className="text-slate-400">In shop</span>
                <span className="text-xl font-semibold">
                  {summary ? summary.trucks.inShop : 3}
                </span>
                <span className="text-[11px] text-amber-300/90">
                  2 waiting parts
                </span>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3 flex flex-col gap-1">
                <span className="text-slate-400">Offline</span>
                <span className="text-xl font-semibold">
                  {summary ? summary.trucks.offline : 1}
                </span>
                <span className="text-[11px] text-rose-300/90">no signal 4h</span>
              </div>
            </div>
          </section>

          <section
            id="trailers"
            className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl p-4 sm:p-5 shadow-[0_24px_70px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-lg font-semibold tracking-tight text-slate-50">
                  Trailers
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3 flex flex-col gap-1">
                <span className="text-slate-400">Tracked</span>
                <span className="text-xl font-semibold">
                  {summary ? summary.trailers.tracked : 41}
                </span>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3 flex flex-col gap-1">
                <span className="text-slate-400">Idle &gt; 48h</span>
                <span className="text-xl font-semibold">
                  {summary ? summary.trailers.idle48 : 5}
                </span>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3 flex flex-col gap-1">
                <span className="text-slate-400">At yard</span>
                <span className="text-xl font-semibold">
                  {summary ? summary.trailers.atYard : 12}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom strip: live status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-3 py-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.95)]" />
            <span className="text-slate-200">
              {summary
                ? `${summary.trucks.active} trucks online · ${summary.trucks.inShop} in shop · ${summary.trucks.offline} offline`
                : "27 trucks online · 3 in shop · 1 offline"}
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-3 py-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-400 shadow-[0_0_12px_rgba(248,113,113,0.95)]" />
            <span className="text-slate-200">
              {summary
                ? `${summary.trailers.idle48} trailers idle > 48h · SkyBitz feed ok`
                : "5 trailers idle > 48h · SkyBitz feed synced"}
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-3 py-2 justify-between">
            <span className="text-slate-200">
              Next PM due in 3 days · 4 units
            </span>
            <span className="hidden sm:inline text-[10px] tracking-[0.22em] uppercase text-slate-500">
              Maintenance Overview
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
