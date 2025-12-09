import React, { useState, useEffect } from "react";
import { load, save } from "../data/storage.js";

export default function DailyQCLogView() {
  const [logs, setLogs] = useState(() => load("dailyLogs", []));
  const [entry, setEntry] = useState("");

  useEffect(() => {
    save("dailyLogs", logs);
  }, [logs]);

  const addEntry = () => {
    if (!entry.trim()) return;
    const newLog = {
      id: Date.now(),
      text: entry.trim(),
      createdAt: new Date().toISOString(),
    };
    setLogs((s) => [newLog, ...s]);
    setEntry("");
  };

  const deleteEntry = (id) => {
    setLogs((s) => s.filter((l) => l.id !== id));
  };

  return (
    <div className="p-4 bg-black rounded-xl border border-zinc-800 text-white min-h-[60vh]">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Daily QC Log</h2>
        <div className="text-sm text-zinc-400">
          Entries: <span className="font-mono">{logs.length}</span>
        </div>
      </header>

      <div className="mb-4 flex gap-2">
        <input
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write a quick log entry..."
          className="flex-1 p-2 rounded bg-zinc-900 border border-zinc-700 text-white outline-none"
        />
        <button
          onClick={addEntry}
          className="bg-green-600 px-4 py-2 rounded font-bold"
          type="button"
        >
          Add
        </button>
      </div>

      <div className="space-y-3 max-h-[55vh] overflow-y-auto">
        {logs.length === 0 ? (
          <div className="text-zinc-500">No entries yet.</div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="p-3 bg-zinc-900 border border-zinc-700 rounded flex items-start justify-between"
            >
              <div className="max-w-[85%]">
                <div className="text-sm text-zinc-400 mb-1">
                  {new Date(log.createdAt).toLocaleString()}
                </div>
                <div className="text-white">{log.text}</div>
              </div>

              <div className="ml-3 flex flex-col gap-2">
                <button
                  onClick={() => deleteEntry(log.id)}
                  className="text-xs bg-red-600 px-3 py-1 rounded"
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
