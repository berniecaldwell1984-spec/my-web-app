import React, { useState } from "react";
import { load, save } from "../utils/storage";
import { InputField, TextAreaField } from "../components/Inputs";
import { Icons } from "../components/Icons";

export function SafetyTopicManagerView() {
  const [topics, setTopics] = useState(() => load("safetyTopics") || [
    "PPE Compliance – Hard hats, vests, gloves, eye protection.",
    "Heat Stress – Hydration, shade, rotation, early reporting.",
    "Equipment Blind Spots – Maintain eye contact with operators.",
    "Traffic Control – Stay inside protected zones at all times.",
    "Slips, Trips, Falls – Watch uneven ground and loose material.",
    "Line of Fire – Never stand between equipment and fixed objects.",
    "Dust & Air Quality – Use masks when cutting, sawing, or mixing.",
    "Weather Hazards – Wet ground, lightning, reduced visibility.",
    "Material Handling – Lift with legs, not back; team lifts for heavy loads.",
    "Chemical Safety – Lime, cement, asphalt fumes; avoid skin contact.",
  ]);

  const [newTopic, setNewTopic] = useState("");

  const addTopic = () => {
    if (!newTopic.trim()) return;
    const updated = [...topics, newTopic.trim()];
    setTopics(updated);
    save("safetyTopics", updated);
    setNewTopic("");
  };

  const deleteTopic = (index) => {
    const updated = topics.filter((_, i) => i !== index);
    setTopics(updated);
    save("safetyTopics", updated);
  };

  const rotateTopic = () => {
    if (topics.length === 0) return "";
    const index = Math.floor(Math.random() * topics.length);
    return topics[index];
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4">
      <h1 className="text-3xl font-black uppercase tracking-tight text-white">
        Safety Topic Manager
      </h1>

      {/* Add New Topic */}
      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg space-y-4">
        <InputField
          label="Add New Safety Topic"
          placeholder="Enter a new safety topic..."
          value={newTopic}
          onChange={(v) => setNewTopic(v)}
        />

        <button
          onClick={addTopic}
          className="bg-green-600 px-4 py-2 rounded-lg text-sm font-bold text-white"
        >
          Add Topic
        </button>
      </div>

      {/* Topic List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Current Topics</h2>

        {topics.length === 0 ? (
          <p className="text-zinc-500">No topics added yet.</p>
        ) : (
          <div className="space-y-3">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg flex justify-between items-center"
              >
                <p className="text-white text-sm">{topic}</p>

                <button
                  onClick={() => deleteTopic(index)}
                  className="text-red-500 hover:text-red-400"
                >
                  <Icons.Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rotation Preview */}
      <div className="bg-black border border-zinc-800 p-4 rounded-lg mt-6">
        <p className="text-xs text-zinc-500 uppercase font-bold mb-1">
          Random Rotation Preview
        </p>
        <p className="text-green-400 font-bold">
          {rotateTopic()}
        </p>
      </div>
    </div>
  );
}
