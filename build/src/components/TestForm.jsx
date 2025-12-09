import React from 'react';
import { InputField } from './Inputs';

export function TestForm({ test, form, setForm }) {
  return (
    <div className="space-y-4">
      {test.fields.map((field) => (
        <InputField
          key={field.key}
          label={`${field.label}${field.unit ? ` (${field.unit})` : ''}`}
          value={form[field.key] || ''}
          onChange={(v) => setForm({ ...form, [field.key]: v })}
        />
      ))}
    </div>
  );
}
