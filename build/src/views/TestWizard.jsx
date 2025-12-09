import React, { useState } from 'react';
import { TEST_LIBRARY } from '../data/testLibrary';
import { Icons } from '../components/Icons';

export function TestWizard({ onSelect }) {
  const [material, setMaterial] = useState(null);

  const materials = Object.keys(TEST_LIBRARY);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4">
      {!material && (
        <>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
            Select Material
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {materials.map((mat) => (
              <button
                key={mat}
                onClick={() => setMaterial(mat)}
                className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex items-center gap-4 hover:border-green-600 transition-colors group"
              >
                <Icons.ChevronRight className="text-green-500" size={20} />
                <span className="font-bold text-white text-lg">{mat}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {material && (
        <>
          <button
            onClick={() => setMaterial(null)}
            className="text-xs text-zinc-500 hover:text-white uppercase font-bold flex items-center gap-2"
          >
            <Icons.ChevronRight className="rotate-180" size={14} />
            Back
          </button>

          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
            {material} Tests
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TEST_LIBRARY[material].map((test) => (
              <button
                key={test.id}
                onClick={() => onSelect(material, test)}
                className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex items-center gap-4 hover:border-green-600 transition-colors group"
              >
                <Icons.FlaskConical className="text-green-500" size={20} />
                <div>
                  <h3 className="font-bold text-white">{test.name}</h3>
                  <p className="text-xs text-zinc-500 font-bold">
                    {test.procedure}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
