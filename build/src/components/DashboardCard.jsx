import React from 'react';
import { Icons } from './Icons';

export function DashboardCard({ value, label, iconName, isWarning, isSuccess }) {
  const Icon = Icons[iconName] || Icons.CheckCircle;
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl relative overflow-hidden group hover:border-zinc-700 transition-colors h-40 flex flex-col justify-center">
      <div className="flex items-center gap-6">
        <div className={`p-4 rounded-lg bg-zinc-800 ${isWarning ? 'text-amber-500' : isSuccess ? 'text-green-500' : 'text-green-700'} bg-opacity-20`}>
          <Icon size={24} />
        </div>
        <div>
          <span className="text-4xl font-black text-white block">{value}</span>
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1 block">{label}</span>
        </div>
      </div>
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${isWarning ? 'bg-amber-600' : 'bg-green-700'}`}></div>
    </div>
  );
}
