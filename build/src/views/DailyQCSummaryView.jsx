import React, { useState } from "react";
import { qcWorkflows } from "../data/qcWorkflows";
import { testingProcedures } from "../data/testingProcedures";
import { samplingProcedures } from "../data/samplingProcedures";
import { InputField, TextAreaField, SelectField } from "../components/Inputs";
import { getToday } from "../utils/reportBuilder";
import { save, load } from "../utils/storage";

export function DailyQCSummaryView() {
  const [workflowId, setWorkflowId] = useState("");
  const [job, setJob] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [date] = useState(getToday());

  const [savedReports, setSavedReports] = useState(
    () => load("dailyQCSummaries") || []
  );

  const workflow = qcWorkflows.find((w) => w.id === workflowId);

  const handleSave = () => {
    const report = {
      date,
      job,
      location,
      workflowId,
      notes
    };

    const updated = [...savedReports, report];
    setSavedReports(updated);
    save("dailyQCSummaries", updated);
  };

  const getTests = () =>
    workflow
      ? testingProcedures.filter((t) =>
          workflow.requiredTests.includes(t.id)
        )
      : [];

  const getSampling = () =>
    workflow
      ? samplingProcedures.filter((s) =>
          workflow.requiredSampling.includes(s.id)
        )
      : [];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4">
      <h1 className="text-3xl font-black uppercase tracking-tight text-white">
        Daily QC Summary
      </h1>

      {/* Job Info */}
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Job Name / Number" value={job} onChange={setJob} />
        <InputField label="Location" value={location} onChange={setLocation} />
      </div>

      <InputField label="Date" value={date} disabled />

      {/* Workflow Selector */}
      <SelectField
        label="QC Workflow"
        value={workflowId}
        onChange={setWorkflowId}
        options={["", ...qcWorkflows.map((w) => w.id)]}
      />

      {/* Auto‑Generated Summary */}
      {workflow && (
        <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-900 shadow-lg space-y-4">
          <h2 className="text-xl font-bold text-white">
            {workflow.name}
          </h2>

          <p className="text-zinc-400">{workflow.description}</p>

          {/* Required Sampling */}
          <div>
            <h3 className="text-lg font-bold text-green-400 mb-2">
              Required Sampling
            </h3>
            {getSampling().map((s) => (
              <p key={s.id} className="text-sm text-zinc-300">
                • {s.id} — {s.material}
              </p>
            ))}
          </div>

          {/* Required Tests */}
          <div>
            <h3 className="text-lg font-bold text-green-400 mb-2">
              Required Tests
            </h3>
            {getTests().map((t) => (
              <p key={t.id} className="text-sm text-zinc-300">
                • {t.id} — {t.title}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      <TextAreaField
        label="Additional Notes"
        value={notes}
        onChange={setNotes}
      />

      {/* Save */}
      <button
        onClick={handleSave}
        className="bg-green-600 px-4 py-2 rounded-lg text-sm font-bold"
      >
        Save Summary
      </button>
    </div>
  );
}
