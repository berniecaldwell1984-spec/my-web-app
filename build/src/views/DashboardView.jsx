import React from "react";

export default function DashboardView({ setView }) {
  return (
    <div className="p-6 bg-black rounded-xl border border-zinc-800 text-white min-h-[60vh]">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setView && setView("daily")}
            className="bg-zinc-900 px-3 py-2 rounded text-sm border border-zinc-700"
            type="button"
          >
            Daily Log
          </button>
          <button
            onClick={() => setView && setView("tests")}
            className="bg-green-600 px-3 py-2 rounded text-sm font-bold"
            type="button"
          >
            Material Tests
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-zinc-900 rounded border border-zinc-700">
          <div className="text-sm text-zinc-400">Active Projects</div>
          <div className="text-xl font-bold mt-2">3</div>
        </div>

        <div className="p-4 bg-zinc-900 rounded border border-zinc-700">
          <div className="text-sm text-zinc-400">Open Inspections</div>
          <div className="text-xl font-bold mt-2">7</div>
        </div>

        <div className="p-4 bg-zinc-900 rounded border border-zinc-700">
          <div className="text-sm text-zinc-400">Pending Tests</div>
          <div className="text-xl font-bold mt-2">5</div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setView && setView("asphalt")}
            className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded"
            type="button"
          >
            Manage Asphalt Lots
          </button>
          <button
            onClick={() => setView && setView("concrete")}
            className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded"
            type="button"
          >
            Concrete Pours
          </button>
          <button
            onClick={() => setView && setView("inspections")}
            className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded"
            type="button"
          >
            Inspections
          </button>
        </div>
      </section>
    </div>
  );
}
