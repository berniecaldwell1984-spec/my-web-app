import React, { useState, useRef } from 'react';
import { Icons } from '../components/Icons';
import { InputField, SelectField } from '../components/Inputs';

const MATERIAL_TEST_OPTIONS = {
  Concrete: [],
  Soil: [],
  Asphalt: [],
  Aggregates: [],
  Steel: [],
};

export function InspectionModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    title: '',
    category: '',
    result: 'Pending',
    location: '',
    date: new Date().toISOString().split('T')[0],
    inspector: '',
    notes: '',
    photo: null,
  });

  const fileInputRef = useRef(null);

  const handlePhotoSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, photo: URL.createObjectURL(e.target.files[0]) });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 print:hidden">
      <div className="bg-zinc-900 w-full max-w-md rounded-xl border border-zinc-800 shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">New Inspection</h3>
          <button onClick={onClose}>
            <Icons.X className="text-zinc-500 hover:text-white" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <InputField
            label="INSPECTION TITLE"
            value={form.title}
            onChange={(v) => setForm({ ...form, title: v })}
          />

          <SelectField
            label="CATEGORY"
            value={form.category}
            onChange={(v) => setForm({ ...form, category: v })}
          >
            <option value="">Select Category</option>
            {Object.keys(MATERIAL_TEST_OPTIONS).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value="Safety">Safety</option>
          </SelectField>

          <SelectField
            label="RESULT"
            value={form.result}
            onChange={(v) => setForm({ ...form, result: v })}
          >
            <option value="Pending">Pending</option>
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
          </SelectField>

          <InputField
            label="LOCATION"
            value={form.location}
            onChange={(v) => setForm({ ...form, location: v })}
          />

          <InputField
            label="DATE"
            type="date"
            value={form.date}
            onChange={(v) => setForm({ ...form, date: v })}
          />

          <InputField
            label="INSPECTOR"
            value={form.inspector}
            onChange={(v) => setForm({ ...form, inspector: v })}
          />

          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase mb-1 block tracking-wide">
              NOTES
            </label>
            <textarea
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-base text-black font-bold focus:border-green-600 focus:outline-none min-h-[80px]"
              placeholder="Observations..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase mb-1 block tracking-wide">
              PHOTO EVIDENCE
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handlePhotoSelect}
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-zinc-700 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-green-600 transition-colors h-32"
            >
              {form.photo ? (
                <img src={form.photo} alt="Preview" className="h-full object-contain" />
              ) : (
                <div className="text-center text-zinc-500">
                  <Icons.Camera className="mx-auto mb-2" size={24} />
                  <span className="text-xs font-bold uppercase">Tap to Capture</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-zinc-800 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-xs font-bold uppercase text-zinc-500 hover:text-white hover:bg-zinc-800 rounded transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(form)}
            className="flex-1 py-3 bg-green-600 text-white text-xs font-bold uppercase rounded hover:bg-green-500 transition-colors"
          >
            Save Inspection
          </button>
        </div>
      </div>
    </div>
  );
}
