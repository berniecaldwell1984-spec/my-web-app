import React, { useState } from "react";

export default function InspectionsView() {
  const [inspections, setInspections] = useState([
    { id: 1, title: "Site Safety Check", status: "Open" },
    { id: 2, title: "Paving Inspection", status: "Closed" },
  ]);

  const closeInspection = (id) => setInspections((s) => s.map((i) => (i.id === id ? { ...i, status: "Closed" } : i)));

  return (
    <div className="p-4 bg-black rounded-xl border border-zinc-800 text-white min-h-[60vh]">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Inspections</h2>
        <div className="text-sm text-zinc-400">Open: <span className="font-mono">{inspections.filter(i => i.status === "Open").length}</span></div>
      </header>

      <div className="space-y-3">
        {inspections.map((ins) => (
          <div key={ins.id} className="p-3 bg-zinc-900 border border-zinc-700 rounded flex items-center justify-between">
            <div>
              <div className="text-white font-medium">{ins.title}</div>
              <div className="text-sm text-zinc-400">{ins.status}</div>
            </div>
            {ins.status === "Open" && (
              <button onClick={() => closeInspection(ins.id)} className="text-xs bg-green-600 px-3 py-1 rounded" type="button">Close</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
