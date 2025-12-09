import React, { useState } from "react";
import jsPDF from "jspdf";

export function Report({ data, onSaveToggle }) {
  const [saveEnabled, setSaveEnabled] = useState(true);

  const handlePDF = () => {
    const doc = new jsPDF();
    let y = 10;

    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === "object") {
        doc.text(`${key.toUpperCase()}:`, 10, y);
        y += 8;
        Object.entries(value).forEach(([k, v]) => {
          doc.text(`• ${k}: ${v}`, 14, y);
          y += 8;
        });
      } else {
        doc.text(`${key.toUpperCase()}: ${value}`, 10, y);
        y += 8;
      }
    });

    doc.save(`${data.type.replace(" ", "_")}_Report.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleSave = () => {
    const newState = !saveEnabled;
    setSaveEnabled(newState);
    onSaveToggle(newState);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg space-y-4">
      <h2 className="text-xl font-bold">{data.type} REPORT</h2>

      <div className="text-sm space-y-1">
        <p><strong>Job:</strong> {data.job}</p>
        <p><strong>Date:</strong> {data.date}</p>
        <p><strong>Location:</strong> {data.location}</p>
        <p><strong>Station:</strong> {data.station}</p>
      </div>

      <div className="text-sm space-y-1">
        <p><strong>Dimensions:</strong></p>
        {Object.entries(data.dims).map(([k, v]) => (
          <p key={k}>• {k}: {v}</p>
        ))}
      </div>

      <p className="text-sm"><strong>Formula:</strong> {data.formula}</p>

      <p className="text-lg font-bold text-green-400">
        {data.tons} TONS
      </p>

      {data.rate && (
        <p className="text-sm text-zinc-400">
          Rate: {data.rate} lb/sy
        </p>
      )}

      {data.trucks && (
        <p className="text-sm text-zinc-400">
          {data.trucks} Trucks (22t)
        </p>
      )}

      <div className="flex gap-3 pt-4">
        <button
          onClick={handlePDF}
          className="bg-blue-600 px-4 py-2 rounded-lg text-sm font-bold"
        >
          Export PDF
        </button>

        <button
          onClick={handlePrint}
          className="bg-green-600 px-4 py-2 rounded-lg text-sm font-bold"
        >
          Print Report
        </button>

        <button
          onClick={toggleSave}
          className={`px-4 py-2 rounded-lg text-sm font-bold ${
            saveEnabled ? "bg-yellow-600" : "bg-zinc-700"
          }`}
        >
          {saveEnabled ? "Saved" : "Save Disabled"}
        </button>
      </div>
    </div>
  );
}
