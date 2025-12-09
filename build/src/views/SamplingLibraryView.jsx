import React from "react";

export default function SamplingLibraryView() {
  const samples = [
    { id: 1, name: "Asphalt Core" },
    { id: 2, name: "Concrete Cylinder" },
    { id: 3, name: "Soil Sample" },
  ];

  return (
    <div className="p-4 bg-black rounded-xl border border-zinc-800 text-white min-h-[60vh]">
      <header className="mb-4">
        <h2 className="text-xl font-bold">Sampling Library</h2>
        <div className="text-sm text-zinc-400">Common sample types and collection notes</div>
      </header>

      <div className="space-y-3">
        {samples.map((s) => (
          <div key={s.id} className="p-3 bg-zinc-900 border border-zinc-700 rounded">
            <div className="text-white font-medium">{s.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
