import React from 'react';

export function Badge({ status }) {
  const styles = {
    Pass: 'bg-green-900/30 text-green-500 border-green-800',
    Fail: 'bg-red-900/30 text-red-500 border-red-800',
    Pending: 'bg-amber-900/30 text-amber-500 border-amber-800',
    Open: 'bg-red-600 text-white border-red-600',
    Resolved: 'bg-green-600 text-white border-green-600',
    'In Progress': 'bg-green-600 text-white border-green-600',
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${styles[status] || styles.Pending} uppercase tracking-wider`}>
      {status}
    </span>
  );
}

