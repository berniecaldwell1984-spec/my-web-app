import React from "react";

export default function ReportHistoryView() {
  return (
    <div className="p-4 bg-black rounded-xl border border-zinc-800 text-white min-h-[60vh]">
      <header className="mb-4">
        <h2 className="text-xl font-bold">Report History</h2>
        <div className="text-sm text-zinc-400">Previously generated reports</div>
      </header>

      <div className="space-y-3">
        <div className="p-3 bg-zinc-900 border border-zinc-700 rounded">
          <div className="text-sm text-zinc-400">12/07/2025</div>
          <div className="text-white font-medium">Daily QC Summary</div>
        </div>

        <div className="p-3 bg-zinc-900 border border-zinc-700 rounded">
          <div className="text-sm text-zinc-400">12/06/2025</div>
          <div className="text-white font-medium">Asphalt Lot Report</div>
        </div>
      </div>
    </div>
  );
}
