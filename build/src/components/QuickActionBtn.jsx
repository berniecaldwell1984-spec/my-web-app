import React from 'react';
import { Icons } from './Icons';

export function QuickActionBtn({ iconName, label, onClick }) {
  const Icon = Icons[iconName] || Icons.LayoutDashboard;

  return (
    <button
      onClick={onClick}
      className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex items-center gap-4 hover:border-green-600 transition-colors group w-full text-left"
    >
      <div className="p-3 bg-black rounded-lg group-hover:bg-green-900/20 transition-colors">
        <Icon className="text-green-500" size={22} />
      </div>

      <div>
        <h3 className="font-bold text-white text-sm uppercase tracking-wide">
          {label}
        </h3>
        <p className="text-xs text-zinc-500 font-bold">Tap to open</p>
      </div>

      <Icons.ChevronRight
        size={16}
        className="ml-auto text-zinc-600 group-hover:text-white transition-colors"
      />
    </button>
  );
}
