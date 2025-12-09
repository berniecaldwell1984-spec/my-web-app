import React, { useState } from "react";
import { buildTR415Curve } from "../utils/tr415Curve";
import { CurveChart } from "../components/CurveChart";
import { Icons } from "../components/Icons";

export function TR415CurveView() {
  const [points, setPoints] = useState([]);
  const [form, setForm] = useState({
    moisture: "",
    wetWeight: "",
    dryWeight: "",
    moldVolume: "",
  });

  const addPoint = () => {
    setPoints((prev) => [...prev, { ...form, id: crypto.randomUUID() }]);
    setForm({ moisture: "", wetWeight: "", dryWeight: "", moldVolume: "" });
  };

  const removePoint = (id) => {
    setPoints((prev) => prev.filter((p) => p.id !== id));
  };

  const { curve, maxDryDensity, omc } = buildTR415Curve(points);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4">
      <h1 className="text-2xl font-black uppercase tracking-tight">
        TR‑415 Field Curve
      </h1>

      {/* Input Form */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["moisture", "wetWeight", "dryWeight", "moldVolume"].map((key) => (
          <input
            key={key}
            type="number"
            placeholder={key}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="bg-black border border-zinc-700 rounded-lg p-3 text-white"
          />
        ))}
      </div>

      <button
        onClick={addPoint}
        className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold uppercase text-xs"
      >
        Add Point
      </button>

      {/* Points Table */}
      <div className="space-y-2">
        {points.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-3 rounded-lg"
          >
            <span className="text-sm text-zinc-300">
              Moisture: {p.moisture}% — Dry Weight: {p.dryWeight}g — Mold Vol:{" "}
              {p.moldVolume}
            </span>
            <button onClick={() => removePoint(p.id)}>
              <Icons.X className="text-red-500" />
            </button>
          </div>
        ))}
      </div>

      {/* Results */}
      {curve.length > 0 && (
        <div className="space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
            <p className="text-sm text-zinc-300">
              <strong>OMC:</strong> {omc}%
            </p>
            <p className="text-sm text-zinc-300">
              <strong>Max Dry Density:</strong> {maxDryDensity.toFixed(2)} pcf
            </p>
          </div>

          <CurveChart data={curve} />
        </div>
      )}
    </div>
  );
}
