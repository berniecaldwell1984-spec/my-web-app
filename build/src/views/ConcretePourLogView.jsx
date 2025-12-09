import React, { useState, useEffect } from "react";
import { load, save } from "../data/storage.js";

export default function ConcretePourLogView() {
  const [pours, setPours] = useState(() => load("concretePours", []));
  const [desc, setDesc] = useState("");

  useEffect(() => {
    save("concretePours", pours);
  }, [pours]);

  const addPour = () => {
    if (!desc.trim()) return;
    const newPour = { id: Date.now(), desc: desc.trim(), time: new Date().toISOString() };
    setPours((s) => [newPour, ...s]);
    setDesc("");
  };

  const deletePour = (id) => setPours((s) => s.filter((p) => p.id !== id));

  return (
    <div className="p-4 bg-black rounded-xl border border-zinc-800 text-white min-h-[60vh]">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Concrete Pours</h2>
        <div className="text-sm text-zinc-400">Records: <span className="font-mono">{pours.length}</span></div>
      </header>

      <div className="mb-4 flex gap-2">
        <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Pour description / notes" className="flex-1 p-2 rounded bg-zinc-900 border border-zinc-700 text-white outline-none" />
        <button onClick={addPour} className="bg-green-600 px-4 py-2 rounded font-bold" type="button">Log</button>
      </div>

      <div className="space-y-3">
        {pours.length === 0 ? (
          <div className="text-zinc-500">No pours logged.</div>
        ) : (
          pours.map((p) => (
            <div key={p.id} className="p-3 bg-zinc-900 border border-zinc-700 rounded">
              <div className="text-sm text-zinc-400 mb-1">{new Date(p.time).toLocaleString()}</div>
              <div className="text-white">{p.desc}</div>
              <div className="mt-2">
                <button onClick={() => deletePour(p.id)} className="text-xs bg-red-600 px-3 py-1 rounded" type="button">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
