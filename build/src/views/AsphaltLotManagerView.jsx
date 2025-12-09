import React, { useState, useEffect } from "react";
import { load, save } from "../data/storage.js";

export default function AsphaltLotManagerView() {
  const [lots, setLots] = useState(() => load("asphaltLots", []));
  const [name, setName] = useState("");

  useEffect(() => {
    save("asphaltLots", lots);
  }, [lots]);

  const addLot = () => {
    if (!name.trim()) return;
    const newLot = { id: Date.now(), name: name.trim(), createdAt: new Date().toISOString() };
    setLots((s) => [newLot, ...s]);
    setName("");
  };

  const removeLot = (id) => setLots((s) => s.filter((l) => l.id !== id));

  return (
    <div className="p-4 bg-black rounded-xl border border-zinc-800 text-white min-h-[60vh]">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Asphalt Lots</h2>
        <div className="text-sm text-zinc-400">Total: <span className="font-mono">{lots.length}</span></div>
      </header>

      <div className="mb-4 flex gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New lot name" className="flex-1 p-2 rounded bg-zinc-900 border border-zinc-700 text-white outline-none" />
        <button onClick={addLot} className="bg-green-600 px-4 py-2 rounded font-bold" type="button">Add</button>
      </div>

      <div className="space-y-3">
        {lots.length === 0 ? (
          <div className="text-zinc-500">No lots yet.</div>
        ) : (
          lots.map((lot) => (
            <div key={lot.id} className="p-3 bg-zinc-900 border border-zinc-700 rounded flex items-center justify-between">
              <div>
                <div className="text-white font-medium">{lot.name}</div>
                <div className="text-sm text-zinc-400">{new Date(lot.createdAt).toLocaleString()}</div>
              </div>
              <button onClick={() => removeLot(lot.id)} className="text-xs bg-red-600 px-3 py-1 rounded" type="button">Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
