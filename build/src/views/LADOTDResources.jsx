import React from "react";

export default function LADOTDResources() {
  return (
    <div className="p-4 bg-black rounded-xl border border-zinc-800 text-white min-h-[60vh]">
      <header className="mb-4">
        <h2 className="text-xl font-bold">LADOTD Resources</h2>
        <div className="text-sm text-zinc-400">Common specs, links, and references</div>
      </header>

      <div className="space-y-3">
        <div className="p-3 bg-zinc-900 border border-zinc-700 rounded">
          <div className="text-sm text-zinc-400">Standard Specifications</div>
          <div className="text-white font-medium">LADOTD Standard Specifications</div>
        </div>

        <div className="p-3 bg-zinc-900 border border-zinc-700 rounded">
          <div className="text-sm text-zinc-400">Testing Procedures</div>
          <div className="text-white font-medium">QC and field testing guidelines</div>
        </div>

        <div className="p-3 bg-zinc-900 border border-zinc-700 rounded">
          <div className="text-sm text-zinc-400">Forms and Templates</div>
          <div className="text-white font-medium">Inspection forms, test logs, and reports</div>
        </div>
      </div>
    </div>
  );
}
