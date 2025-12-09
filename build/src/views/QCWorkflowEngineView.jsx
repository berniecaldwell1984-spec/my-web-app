import React, { useState } from "react";
import { qcWorkflows } from "../data/qcWorkflows";
import { testingProcedures } from "../data/testingProcedures";
import { samplingProcedures } from "../data/samplingProcedures";
import { InputField, SelectField } from "../components/Inputs";

export function QCWorkflowEngineView() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = qcWorkflows.filter((wf) =>
    wf.name.toLowerCase().includes(search.toLowerCase())
  );

  const getTestDetails = (ids) =>
    testingProcedures.filter((t) => ids.includes(t.id));

  const getSamplingDetails = (ids) =>
    samplingProcedures.filter((s) => ids.includes(s.id));

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4">
      <h1 className="text-3xl font-black uppercase tracking-tight text-white">
        QC Workflow Engine
      </h1>

      <InputField
        label="Search Workflows"
        value={search}
        onChange={setSearch}
      />

      {/* Workflow List */}
      <div className="space-y-4">
        {filtered.map((wf) => (
          <button
            key={wf.id}
            onClick={() => setSelected(wf)}
            className="w-full text-left bg-zinc-900 border border-zinc-800 p-4 rounded-lg hover:bg-zinc-800 transition-all"
          >
            <p className="text-white font-bold">{wf.name}</p>
            <p className="text-xs text-zinc-500 mt-1">
              {wf.materials.join(", ")}
            </p>
          </button>
        ))}
      </div>

      {/* Detail Panel */}
      {selected && (
        <div className="mt-6 border border-green-600 rounded-xl p-6 bg-black shadow-lg">
          <h2 className="text-xl font-bold text-white mb-2">
            {selected.name}
          </h2>

          <p className="text-sm text-zinc-400 mb-4">
            {selected.description}
          </p>

          {/* Required Sampling */}
          <h3 className="text-lg font-bold text-green-400 mt-4 mb-2">
            Required Sampling
          </h3>
          {getSamplingDetails(selected.requiredSampling).map((s) => (
            <div key={s.id} className="mb-3">
              <p className="text-white font-bold">{s.id}</p>
              <p className="text-xs text-zinc-500">{s.material}</p>
            </div>
          ))}

          {/* Required Tests */}
          <h3 className="text-lg font-bold text-green-400 mt-6 mb-2">
            Required Tests
          </h3>
          {getTestDetails(selected.requiredTests).map((t) => (
            <div key={t.id} className="mb-3">
              <p className="text-white font-bold">{t.id} – {t.title}</p>
              <p className="text-xs text-zinc-500">{t.materialGroup}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
