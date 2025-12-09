import React from "react";

export default function MaterialTestsView({ data = [], onDelete, onOpenModal }) {
  return (
    <div className="p-4 bg-black rounded-xl border border-zinc-800 text-white min-h-[60vh]">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Material Tests</h2>
        <div className="flex gap-2">
          <button onClick={onOpenModal} className="bg-green-600 px-3 py-2 rounded text-sm font-bold" type="button">Add Test</button>
        </div>
      </header>

      <div className="space-y-3">
        {data.length === 0 ? (
          <div className="text-zinc-500">No tests recorded.</div>
        ) : (
          data.map((t) => (
            <div key={t.id} className="p-3 bg-zinc-900 border border-zinc-700 rounded flex items-center justify-between">
              <div>
                <div className="text-white font-medium">{t.name}</div>
                <div className="text-sm text-zinc-400">{t.type}</div>
              </div>
              <button onClick={() => onDelete && onDelete(t.id)} className="text-xs bg-red-600 px-3 py-1 rounded" type="button">Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
