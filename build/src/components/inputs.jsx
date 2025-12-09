import React from "react";

export const InputField = ({ label, value, onChange }) => (
  <div className="mb-3">
    <label>{label}</label>
    <input
      className="w-full p-2 bg-gray-800 text-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export const SelectField = ({ label, value, onChange, options }) => (
  <div className="mb-3">
    <label>{label}</label>
    <select
      className="w-full p-2 bg-gray-800 text-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);

export const TextAreaField = ({ label, value, onChange }) => (
  <div className="mb-3">
    <label>{label}</label>
    <textarea
      className="w-full p-2 bg-gray-800 text-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
