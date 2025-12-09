import React from "react";

export default function TestLibraryView() {
  const tests = [
    { id: 1, name: "Marshall Stability" },
    { id: 2, name: "Compressive Strength" },
    { id: 3, name: "Gradation" },
  ];

  return (
    <div className="p-4 bg-black rounded-xl border border-zinc-800 text-white min-h-[60vh]">
      <header className="mb-4">
        <h2 className="text-xl font-bold">Test Library</h2>
        <div className="text-sm text-zinc-400">Standard tests and brief descriptions</div>
      </header>

      <div className="space-y-3">
        {tests.map((t) => (
          <div key={t.id} className="p-3 bg-zinc-900 border border-zinc-700 rounded">
            <div className="text-white font-medium">{t.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
