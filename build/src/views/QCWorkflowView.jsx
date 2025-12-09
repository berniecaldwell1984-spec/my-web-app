import React from "react";

export default function QCWorkflowView() {
  const steps = [
    "Plan sampling",
    "Collect samples",
    "Run tests",
    "Record results",
    "Generate report",
  ];

  return (
    <div className="p-4 bg-black rounded-xl border border-zinc-800 text-white min-h-[60vh]">
      <header className="mb-4">
        <h2 className="text-xl font-bold">QC Workflow</h2>
        <div className="text-sm text-zinc-400">Typical workflow steps</div>
      </header>

      <ol className="list-decimal ml-5 space-y-2">
        {steps.map((s, i) => (
          <li key={i} className="p-3 bg-zinc-900 border border-zinc-700 rounded">{s}</li>
        ))}
      </ol>
    </div>
  );
}

