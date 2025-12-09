import React, { useState } from 'react';
import { Icons } from '../components/Icons';
import { TestWizard } from '../views/TestWizard';
import { TestForm } from '../components/TestForm';

export default function TestModal({ onClose, onSave }) {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    location: '',
    result: 'Pass',
  });

  const handleSelect = (material, test) => {
    setSelected({ material, test });
  };

  const handleSave = () => {
    onSave({
      ...form,
      material: selected.material,
      testId: selected.test.id,
      testName: selected.test.name,
      procedure: selected.test.procedure,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-zinc-900 w-full max-w-lg rounded-xl border border-zinc-800 shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">
            {selected ? selected.test.name : 'New Material Test'}
          </h3>
          <button onClick={onClose}>
            <Icons.X className="text-zinc-500 hover:text-white" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!selected && <TestWizard onSelect={handleSelect} />}

          {selected && (
            <>
              <TestForm test={selected.test} form={form} setForm={setForm} />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="bg-black border border-zinc-700 rounded-lg p-3 text-white"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="bg-black border border-zinc-700 rounded-lg p-3 text-white"
                />
              </div>
            </>
          )}
        </div>

        {/* FOOTER */}
        {selected && (
          <div className="p-4 border-t border-zinc-800 flex gap-3">
            <button
              onClick={() => setSelected(null)}
              className="flex-1 py-3 text-xs font-bold uppercase text-zinc-500 hover:text-white hover:bg-zinc-800 rounded"
            >
              Back
            </button>

            <button
              onClick={handleSave}
              className="flex-1 py-3 bg-green-600 text-white text-xs font-bold uppercase rounded hover:bg-green-500"
            >
              Save Test
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
