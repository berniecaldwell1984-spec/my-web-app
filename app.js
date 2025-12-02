import React, { useState, useEffect, useRef } from 'react';// --- 1. LOCAL ICONS (No external dependencies to prevent crash) ---
const Icons = {


  ClipboardCheck: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>,
  FlaskConical: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>,
  AlertTriangle: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>,
  FileText: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>,
  BookOpen: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  Bot: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>,
  Menu: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>,
  X: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  ChevronRight: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>,
  HardHat: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6h0"/><path d="M14 6h0a6 6 0 0 1 6 6v3"/></svg>,
  Construction: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="6" width="20" height="8" rx="1"/><path d="M17 14v7"/><path d="M7 14v7"/><path d="M17 3v3"/><path d="M7 3v3"/><path d="M10 14 2.3 6.3"/><path d="m14 6 7.7 7.7"/><path d="m8 6 8 8"/></svg>,
  Ruler: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/></svg>,
  Calculator: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>,
  ExternalLink: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>,
  Download: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>,
  Search: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Filter: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Camera: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>,
  Send: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>,
  CheckCircle: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  Clock: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  LayoutDashboard: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
  Calendar: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
  Printer: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>,
  Plus: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  Trash2: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>,
  Edit2: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>,
  Mic: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="23"/><line x1="8" x2="16" y1="23" y2="23"/></svg>,
  TestTube: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2"/><path d="M8.5 2h7"/><path d="M14.5 16h-5"/></svg>
};

// --- 2. HELPER COMPONENTS ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const Badge = ({ status }) => {
  const styles = {
    Pass: 'bg-green-900/30 text-green-500 border-green-800',
    Fail: 'bg-red-900/30 text-red-500 border-red-800',
    Pending: 'bg-amber-900/30 text-amber-500 border-amber-800',
    Open: 'bg-red-600 text-white border-red-600',
    Resolved: 'bg-green-600 text-white border-green-600',
    "In Progress": 'bg-blue-600 text-white border-blue-600'
  };
  
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${styles[status] || styles.Pending} uppercase tracking-wider`}>
      {status}
    </span>
  );
};

const DashboardCard = ({ value, label, iconName, isWarning, isSuccess }) => {
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
};

const QuickActionBtn = ({ iconName, label, onClick }) => {
  const Icon = Icons[iconName] || Icons.CheckCircle;
  return (
    <button onClick={onClick} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col items-center gap-3 hover:border-green-600 transition-all group">
      <div className="text-zinc-500 group-hover:text-green-500 transition-colors">
        <Icon size={20} />
      </div>
      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wide">{label}</span>
    </button>
  );
};

const ActivityItem = ({ title, time, status, user, date, result, inspector }) => {
  const displayTime = time || date;
  const displayStatus = status || result || "Pending";
  const displayUser = user || inspector || "System";
  const Icon = Icons.ClipboardCheck;
  
  const statusStyles = {
    Pass: 'text-green-500 bg-green-900/20 border-green-800',
    Passed: 'text-green-500 bg-green-900/20 border-green-800',
    Pending: 'text-amber-500 bg-amber-900/20 border-amber-800',
    Fail: 'text-red-500 bg-red-900/20 border-red-800',
    Failed: 'text-red-500 bg-red-900/20 border-red-800',
    Open: 'text-red-500 bg-red-900/20 border-red-800',
  };
  
  return (
    <div className="flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors border-b border-zinc-800 last:border-0">
      <div className="flex items-center gap-4">
        <div className="p-2.5 rounded-full bg-black border border-zinc-800 text-zinc-500">
          <Icon size={18} />
        </div>
        <div>
          <p className="font-bold text-white text-sm">{title}</p>
          <p className="text-xs text-zinc-500 font-medium mt-0.5">{displayUser} • {displayTime}</p>
        </div>
      </div>
      <span className={`px-3 py-1 rounded text-xs font-bold border ${statusStyles[displayStatus] || 'text-zinc-500'}`}>{displayStatus}</span>
    </div>
  );
};

const InputField = ({ label, value, onChange, type="text", readOnly, placeholder }) => {
  const Icon = Icons.Mic;
  return (
    <div className="mb-4">
      <label className="text-[10px] font-bold text-zinc-500 uppercase mb-1.5 block tracking-wide">{label}</label>
      <div className="relative">
        <input 
          type={type} 
          value={value} 
          onChange={e => onChange && onChange(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-green-600 focus:outline-none placeholder-zinc-700 transition-colors"
        />
        {!readOnly && <button className="absolute right-3 top-3 text-zinc-600 hover:text-white"><Icon size={16} /></button>}
      </div>
    </div>
  );
};

const SelectField = ({ label, children, value, onChange }) => {
  const Icon = Icons.ChevronRight;
  return (
    <div className="mb-4">
      <label className="text-[10px] font-bold text-zinc-500 uppercase mb-1.5 block tracking-wide">{label}</label>
      <div className="relative">
        <select 
          value={value} 
          onChange={e => onChange && onChange(e.target.value)} 
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-green-600 focus:outline-none appearance-none"
        >
          {children}
        </select>
        <div className="absolute right-3 top-3 text-zinc-600 pointer-events-none"><Icon size={16} className="rotate-90" /></div>
      </div>
    </div>
  );
};

// --- 3. CONSTANTS ---

const MATERIAL_TEST_OPTIONS = {
  "Concrete (Section 502)": [
    "TR 226 - Making, Field Curing, and Transporting Specimens",
    "TR 230 - Curing, Capping, and Compressive Strength",
    "TR 207 - Slump of Portland Cement Concrete",
    "TR 202A - Air Content (Method A)",
    "TR 229 - Temperature of Concrete"
  ],
  "Soil/Embankment (Section 203)": [
    "TR 418 - Moisture-Density Relationship (Standard Proctor)",
    "TR 419 - Moisture-Density Relationship (Field Modified Proctor)",
    "TR 415 - Field Classification of Soils",
    "TR 403 - Determination of In-Place Density",
    "TR 423 - pH of Soil"
  ],
  "Asphalt (Section 501/502)": [
    "TR 304 - Determination of Specific Gravity",
    "TR 305 - Thickness of Asphaltic Concrete",
    "TR 306 - Surface Smoothness",
    "TR 309 - Asphalt Content"
  ],
  "Aggregates": [
    "TR 113 - Sieve Analysis",
    "TR 112 - Moisture Content",
    "TR 106 - Clay Lumps and Friable Particles"
  ],
  "Steel/Rebar (Section 701)": [
    "Tensile Strength Verification",
    "Bend Test",
    "Coating Thickness"
  ]
};

const INITIAL_INSPECTIONS = [
  {
    id: 1, title: "Foundation Concrete Pour", location: "Building A - Foundation", date: "2025-11-29", 
    result: "Pass", inspector: "Bernie Caldwell", category: "Concrete (Section 502)",
    notes: "Concrete met all specifications. Slump: 3\", Air: 6%, Temp: 75°F. All LADOTD Section 601 requirements satisfied.",
    photos: []
  }
];

const INITIAL_TESTS = [
  {
    id: 101, title: "Concrete Compressive Strength", category: "Concrete (Section 502)", 
    procedure: "TR 230", location: "Building A", date: "2025-11-29", 
    result: "Pass", value: "3250", unit: "PSI", spec: "Min 3000 PSI"
  }
];

const INITIAL_ISSUES = [
  {
    id: 201, title: "Improper Concrete Finish", location: "Building C - Slab", date: "2025-11-27",
    priority: "Medium", status: "Open", description: "Surface finish does not meet specification requirements.",
    reportedBy: "Mike Johnson", assignedTo: "Construction Crew A", dueDate: "2025-12-03"
  }
];

// --- 4. VIEWS ---

function DashboardView({ stats, recentActivity, setActiveTab, openModal }) {
  const CalendarIcon = Icons.Calendar;
  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-zinc-800 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Quality Control Dashboard</h2>
          <p className="text-zinc-500 text-sm">Gilchrist Construction Company</p>
        </div>
        <div className="flex items-center gap-2 text-zinc-400 mt-4 md:mt-0 bg-zinc-900 px-3 py-1 rounded border border-zinc-800">
          <CalendarIcon size={16} />
          <span className="text-xs font-bold uppercase tracking-wide">{new Date().toLocaleDateString(undefined, {weekday:'long', month:'long', day:'numeric', year:'numeric'})}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard value={stats.total} label="Total Inspections" iconName="ClipboardCheck" />
        <DashboardCard value={stats.tests} label="Tests Completed" iconName="FlaskConical" />
        <DashboardCard value={stats.issues} label="Open Issues" iconName="AlertTriangle" isWarning={stats.issues > 0} />
        <DashboardCard value={`${stats.passRate}%`} label="Pass Rate" iconName="CheckCircle" isSuccess={stats.passRate >= 90} />
      </div>

      <div>
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Quick Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionBtn iconName="Calculator" label="Area & Volume Calculator" onClick={() => setActiveTab('tests')} />
          <QuickActionBtn iconName="Camera" label="Camera Distance Measure" onClick={() => alert("Camera tool active")} />
          <QuickActionBtn iconName="ClipboardCheck" label="Quick Inspection" onClick={() => openModal('inspection')} />
          <QuickActionBtn iconName="FlaskConical" label="Material Test" onClick={() => openModal('test')} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Recent Activity</h3>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            {recentActivity.map((item, idx) => <ActivityItem key={idx} {...item} />)}
          </div>
        </div>
        <div>
           <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Pending Items</h3>
           <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center flex flex-col items-center justify-center h-48">
             <Icons.CheckCircle className="text-zinc-700 mb-2" size={32} />
             <p className="text-zinc-500 text-sm">All pending items cleared.</p>
           </div>
        </div>
      </div>
    </div>
  );
}

function InspectionsView({ data, onDelete, onGenerateReport, onOpenModal }) {
  const [filter, setFilter] = useState('ALL');
  const filteredData = filter === 'ALL' ? data : data.filter(i => i.category.toUpperCase().includes(filter));
  const Plus = Icons.Plus;
  const FileText = Icons.FileText;
  const Edit2 = Icons.Edit2;
  const Trash2 = Icons.Trash2;

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
        <h2 className="text-2xl font-bold text-white">Quality Inspections</h2>
        <button onClick={onOpenModal} className="bg-green-700 text-white px-4 py-2 rounded font-bold text-xs hover:bg-green-600 flex items-center gap-2 uppercase tracking-wide transition-colors">
          <Plus size={16} /> New Inspection
        </button>
      </div>

      <div className="flex flex-col space-y-2">
        <button className="w-full bg-green-900/20 border border-green-900 text-green-500 py-3 text-xs font-bold uppercase tracking-widest hover:bg-green-900/30 transition-colors">ALL</button>
        <button className="w-full bg-zinc-900 border border-zinc-800 text-zinc-500 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 hover:text-white transition-colors">CONCRETE/ASPHALT</button>
        <button className="w-full bg-zinc-900 border border-zinc-800 text-zinc-500 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 hover:text-white transition-colors">STEEL/REBAR</button>
        <button className="w-full bg-zinc-900 border border-zinc-800 text-zinc-500 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 hover:text-white transition-colors">EARTHWORK</button>
        <button className="w-full bg-zinc-900 border border-zinc-800 text-zinc-500 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 hover:text-white transition-colors">SAFETY</button>
      </div>

      <div className="space-y-4 mt-6">
        {filteredData.map((insp) => (
          <div key={insp.id} className="bg-black border border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-white">{insp.title}</h3>
                  <p className="text-xs text-zinc-500 font-medium mt-1">{insp.location} • {insp.date}</p>
                </div>
                <div className="flex gap-2">
                   <Badge status={insp.result} />
                   <button onClick={() => onGenerateReport(insp)} className="bg-green-900/20 text-green-500 border border-green-900/50 px-3 py-1 rounded text-[10px] font-bold uppercase flex items-center gap-1 hover:bg-green-900/30"><FileText size={12}/> Report</button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-1 my-3 text-sm">
                <p><span className="text-zinc-500 font-bold text-xs uppercase">Inspector:</span> <span className="text-zinc-300">{insp.inspector}</span></p>
                <p><span className="text-zinc-500 font-bold text-xs uppercase">Category:</span> <span className="text-zinc-300">{insp.category}</span></p>
              </div>

              <div className="bg-zinc-900 p-3 rounded border border-zinc-800 mb-4">
                <p className="text-xs text-zinc-400 italic">"{insp.notes}"</p>
              </div>

              {insp.photos && insp.photos.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {insp.photos.map((p, i) => (
                    <img key={i} src={p} className="w-20 h-14 object-cover rounded border border-zinc-700" />
                  ))}
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-zinc-900">
                <button className="bg-zinc-900 text-zinc-400 px-4 py-2 rounded text-xs font-bold uppercase hover:text-white flex items-center gap-2 border border-zinc-800"><Edit2 size={14} /> Edit</button>
                <button onClick={() => onDelete(insp.id)} className="bg-red-900/10 text-red-500 border border-red-900/30 px-4 py-2 rounded text-xs font-bold uppercase hover:bg-red-900/20 flex items-center gap-2"><Trash2 size={14} /> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MaterialTestsView({ data, onDelete, onOpenModal }) {
  const Plus = Icons.Plus;
  const Edit2 = Icons.Edit2;
  const Trash2 = Icons.Trash2;
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
        <h2 className="text-2xl font-bold text-white">Material Tests</h2>
        <button onClick={onOpenModal} className="bg-green-700 text-white px-4 py-2 rounded font-bold text-xs hover:bg-green-600 flex items-center gap-2 uppercase tracking-wide transition-colors">
          <Plus size={16} /> New Test
        </button>
      </div>

      <div className="flex flex-col space-y-2">
        <button className="w-full bg-green-900/20 border border-green-900 text-green-500 py-3 text-xs font-bold uppercase tracking-widest hover:bg-green-900/30 transition-colors">ALL TESTS</button>
        <button className="w-full bg-zinc-900 border border-zinc-800 text-zinc-500 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 hover:text-white transition-colors">CONCRETE</button>
        <button className="w-full bg-zinc-900 border border-zinc-800 text-zinc-500 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 hover:text-white transition-colors">ASPHALT</button>
        <button className="w-full bg-zinc-900 border border-zinc-800 text-zinc-500 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 hover:text-white transition-colors">SOIL</button>
        <button className="w-full bg-zinc-900 border border-zinc-800 text-zinc-500 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 hover:text-white transition-colors">STEEL</button>
      </div>

      <div className="space-y-4 mt-6">
        {data.map((test) => (
          <div key={test.id} className="bg-black border border-zinc-800 rounded-xl p-5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-white text-base">{test.title}</h3>
                <p className="text-xs text-zinc-500 mt-1">{test.location} • {test.date}</p>
              </div>
              <Badge status={test.result} />
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <p className="flex border-b border-zinc-900 pb-2"><span className="text-zinc-500 font-bold text-xs uppercase w-32 inline-block">Test Type:</span> <span className="text-zinc-300">{test.procedure}</span></p>
              <p className="flex border-b border-zinc-900 pb-2"><span className="text-zinc-500 font-bold text-xs uppercase w-32 inline-block">Specification:</span> <span className="text-zinc-300">{test.spec || "Standard Spec"}</span></p>
              <p className="flex"><span className="text-zinc-500 font-bold text-xs uppercase w-32 inline-block">Result:</span> <span className="text-white font-bold">{test.value} {test.unit}</span></p>
            </div>
            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-zinc-900 border border-zinc-800 py-2.5 rounded text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 flex justify-center items-center gap-2"><Edit2 size={14} /> Edit</button>
              <button onClick={() => onDelete(test.id)} className="flex-1 bg-red-900/10 border border-red-900/30 py-2.5 rounded text-xs font-bold text-red-500 hover:bg-red-900/20 flex justify-center items-center gap-2"><Trash2 size={14} /> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IssuesView({ data, onDelete, onOpenModal }) {
  const Plus = Icons.Plus;
  const Edit2 = Icons.Edit2;
  const Trash2 = Icons.Trash2;
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
        <h2 className="text-2xl font-bold text-white">Issues & Deficiencies</h2>
        <button onClick={onOpenModal} className="bg-green-700 text-white px-4 py-2 rounded font-bold text-xs hover:bg-green-600 flex items-center gap-2 uppercase tracking-wide transition-colors">
          <Plus size={16} /> Report Issue
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <select className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase rounded p-2 outline-none focus:border-zinc-600"><option>All Status</option></select>
        <select className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase rounded p-2 outline-none focus:border-zinc-600"><option>All Priorities</option></select>
      </div>

      <div className="space-y-4">
        {data.map((issue) => (
          <div key={issue.id} className="bg-black border border-zinc-800 rounded-xl p-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-lg font-bold text-white">{issue.title}</h4>
                <p className="text-xs text-zinc-500 mt-1">{issue.location} • {issue.date}</p>
              </div>
              <div className="flex gap-2">
                <Badge status={issue.status} />
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-green-600 text-white border border-green-600`}>{issue.priority}</span>
              </div>
            </div>
            
            <div className="my-4 text-sm text-zinc-300 space-y-1">
               <p><span className="font-bold text-zinc-500">Description:</span> {issue.description}</p>
               <p><span className="font-bold text-zinc-500">Reported by:</span> {issue.reportedBy}</p>
               <p><span className="font-bold text-zinc-500">Assigned to:</span> {issue.assignedTo}</p>
               <p><span className="font-bold text-zinc-500">Due Date:</span> {issue.dueDate}</p>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-zinc-900">
               <button className="bg-zinc-900 text-zinc-400 px-4 py-2 rounded text-xs font-bold uppercase hover:text-white flex items-center gap-2 border border-zinc-800"><Edit2 size={14}/> Edit</button>
               <button onClick={() => onDelete(issue.id)} className="bg-red-900/10 text-red-500 border border-red-900/30 px-4 py-2 rounded text-xs font-bold uppercase hover:bg-red-900/20 flex items-center gap-2"><Trash2 size={14}/> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsView({ inspections, tests, issues }) {
  const FileText = Icons.FileText;
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
        <h2 className="text-2xl font-bold text-white">Quality Control Reports</h2>
        <button className="bg-green-700 text-white px-4 py-2 rounded font-bold text-xs hover:bg-green-600 flex items-center gap-2 uppercase tracking-wide transition-colors">
          <FileText size={16} /> Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-black border border-zinc-800 p-6 rounded-xl flex flex-col items-center text-center hover:border-zinc-700 transition-colors">
           <h3 className="text-lg font-bold text-white mb-2">Daily QC Report</h3>
           <p className="text-xs text-zinc-500 mb-6">Summary of today's inspections, tests, and issues</p>
           <button className="bg-green-900/20 text-green-500 border border-green-900 px-8 py-3 rounded text-xs font-bold uppercase hover:bg-green-900/40">GENERATE</button>
        </div>
        <div className="bg-black border border-zinc-800 p-6 rounded-xl flex flex-col items-center text-center hover:border-zinc-700 transition-colors">
           <h3 className="text-lg font-bold text-white mb-2">Weekly Summary</h3>
           <p className="text-xs text-zinc-500 mb-6">Comprehensive weekly quality control summary</p>
           <button className="bg-green-900/20 text-green-500 border border-green-900 px-8 py-3 rounded text-xs font-bold uppercase hover:bg-green-900/40">GENERATE</button>
        </div>
        <div className="bg-black border border-zinc-800 p-6 rounded-xl flex flex-col items-center text-center hover:border-zinc-700 transition-colors">
           <h3 className="text-lg font-bold text-white mb-2">Project Report</h3>
           <p className="text-xs text-zinc-500 mb-6">Complete project quality documentation</p>
           <button className="bg-green-900/20 text-green-500 border border-green-900 px-8 py-3 rounded text-xs font-bold uppercase hover:bg-green-900/40">GENERATE</button>
        </div>
      </div>

      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-8 mb-4">EXPORT DATA</h3>
      <div className="grid grid-cols-1 gap-2">
        <button className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-lg flex items-center justify-center gap-2 text-zinc-400 hover:text-white hover:border-zinc-700 font-bold text-xs uppercase"><FileText size={16}/> Export to Excel</button>
        <button className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-lg flex items-center justify-center gap-2 text-zinc-400 hover:text-white hover:border-zinc-700 font-bold text-xs uppercase"><FileText size={16}/> Export to PDF</button>
        <button className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-lg flex items-center justify-center gap-2 text-zinc-400 hover:text-white hover:border-zinc-700 font-bold text-xs uppercase"><FileText size={16}/> Export to CSV</button>
      </div>
    </div>
  );
}

function ReportPreview({ data, onClose }) {
  const X = Icons.X;
  const Printer = Icons.Printer;
  
  return (
    <div className="fixed inset-0 bg-black/90 z-[200] overflow-y-auto">
      <div className="min-h-screen p-8 flex justify-center">
        <div className="w-full max-w-4xl bg-white text-black shadow-2xl p-10 animate-in zoom-in-95 relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
          
          {/* Branding */}
          <div className="flex justify-between items-start border-b-2 border-black pb-6 mb-8">
            <div className="flex items-center gap-4">
              <img src="Gilchrist Logo.gif" alt="Gilchrist" className="h-16 object-contain" onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='block'}} />
              <div className="hidden">
                <h1 className="text-2xl font-black uppercase">GILCHRIST</h1>
                <p className="text-xs font-bold text-gray-500 tracking-widest">CONSTRUCTION COMPANY</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-black uppercase tracking-tighter">QC Report</h2>
              <p className="text-sm font-bold text-gray-500">REPORT ID: {data.id + 2024000}</p>
              <p className="text-sm text-gray-500">{data.date}</p>
            </div>
          </div>

          {/* Status */}
          <div className={`p-4 mb-8 text-center uppercase font-black text-xl tracking-widest border-4 ${data.result === 'Pass' ? 'border-green-600 text-green-700 bg-green-50' : 'border-red-600 text-red-700 bg-red-50'}`}>
            Inspection Result: {data.result}
          </div>

          {/* Content */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-8 mb-8">
            <div><p className="text-xs font-bold text-gray-400 uppercase mb-1">Project Location</p><p className="font-bold text-lg">{data.location}</p></div>
            <div><p className="text-xs font-bold text-gray-400 uppercase mb-1">Inspection Title</p><p className="font-bold text-lg">{data.title}</p></div>
            <div><p className="text-xs font-bold text-gray-400 uppercase mb-1">Inspector</p><p className="font-bold text-lg">{data.inspector}</p></div>
            <div><p className="text-xs font-bold text-gray-400 uppercase mb-1">Category</p><p className="font-bold text-lg">{data.category}</p></div>
          </div>

          <div className="mb-8">
            <p className="text-xs font-bold text-gray-400 uppercase mb-2">Field Notes</p>
            <div className="p-6 bg-gray-100 border border-gray-200 text-sm font-medium leading-relaxed">
              {data.notes}
            </div>
          </div>

          {(data.photos && data.photos.length > 0) && (
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-4">Attached Evidence</p>
              <div className="grid grid-cols-2 gap-4">
                {data.photos.map((p, i) => (
                  <div key={i} className="border border-gray-200 p-2 bg-gray-50">
                    <img src={p} className="w-full h-64 object-cover" />
                    <p className="text-[10px] text-gray-400 mt-2 uppercase text-center font-bold">Photo Evidence #{i+1}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 pt-6 border-t border-gray-200 flex justify-end gap-4 print:hidden">
            <button onClick={onClose} className="px-6 py-3 font-bold uppercase text-xs text-gray-500 hover:bg-gray-100 rounded">Close</button>
            <button onClick={() => window.print()} className="px-6 py-3 bg-black text-white font-bold uppercase text-xs rounded hover:bg-gray-800 flex items-center gap-2">
              <Printer size={16} /> Print PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 5. MODALS ---

function InspectionModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    title: '', category: '', result: 'Pending', location: '', 
    date: new Date().toISOString().split('T')[0], 
    inspector: '', notes: '', photos: []
  });
  const fileInputRef = useRef(null);
  const X = Icons.X;
  const Camera = Icons.Camera;

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setForm(prev => ({ ...prev, photos: [...prev.photos, URL.createObjectURL(e.target.files[0])] }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-zinc-950 w-full max-w-md rounded-xl border border-zinc-800 shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">New Inspection</h3>
          <button onClick={onClose}><X className="text-zinc-500 hover:text-white" /></button>
        </div>
        <div className="p-6 overflow-y-auto space-y-5">
          <InputField label="INSPECTION TITLE *" value={form.title} onChange={v => setForm({...form, title: v})} />
          <SelectField label="CATEGORY *" value={form.category} onChange={v => setForm({...form, category: v})}>
            <option value="">Select Category</option>
            {Object.keys(MATERIAL_TEST_OPTIONS).map(cat => <option key={cat} value={cat}>{cat}</option>)}
            <option value="Safety Compliance">Safety Compliance</option>
          </SelectField>
          <SelectField label="RESULT *" value={form.result} onChange={v => setForm({...form, result: v})}>
            <option value="Pending">Pending</option>
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
          </SelectField>
          <InputField label="LOCATION *" value={form.location} onChange={v => setForm({...form, location: v})} />
          <InputField label="DATE *" type="date" value={form.date} onChange={v => setForm({...form, date: v})} />
          <InputField label="INSPECTOR *" value={form.inspector} onChange={v => setForm({...form, inspector: v})} />
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase mb-1 block">NOTES</label>
            <textarea 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-green-600 focus:outline-none min-h-[80px]"
              placeholder="Additional notes or observations..."
              value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
            />
          </div>
          <div>
             <label className="text-[10px] font-bold text-zinc-500 uppercase mb-2 block">PHOTOS</label>
             <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 flex flex-col items-center gap-4 cursor-pointer hover:border-zinc-700 transition-colors" onClick={() => fileInputRef.current.click()}>
                <div className="flex gap-2 flex-wrap justify-center w-full">
                  {form.photos.map((p, i) => <img key={i} src={p} className="w-16 h-16 rounded object-cover border border-zinc-700" />)}
                </div>
                <input type="file" accept="image/*" capture="environment" ref={fileInputRef} className="hidden" onChange={handlePhotoUpload} />
                <div className="flex flex-col items-center gap-2">
                   <Camera size={24} className="text-zinc-500" />
                   <span className="text-xs font-bold text-zinc-500 uppercase">Tap to Add Photo</span>
                </div>
                <button className="bg-green-700 text-white px-4 py-2 rounded text-xs font-bold uppercase mt-2">Add Photo</button>
             </div>
          </div>
        </div>
        <div className="p-4 border-t border-zinc-800 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 text-xs font-bold uppercase text-zinc-500 hover:text-white hover:bg-zinc-900 rounded">Cancel</button>
          <button onClick={() => onSave(form)} className="flex-1 py-3 bg-green-700 text-white text-xs font-bold uppercase rounded hover:bg-green-600">Save Inspection</button>
        </div>
      </div>
    </div>
  );
}

function TestModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    title: '', category: '', procedure: '', location: '', date: new Date().toISOString().split('T')[0], value: '', unit: '', result: 'Pass'
  });
  const X = Icons.X;
  
  // Dynamic Test Procedures
  const availableProcedures = MATERIAL_TEST_OPTIONS[form.category] || [];

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-zinc-950 w-full max-w-md rounded-xl border border-zinc-800 shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">New LADOTD Test</h3>
          <button onClick={onClose}><X className="text-zinc-500 hover:text-white" /></button>
        </div>
        <div className="p-6 overflow-y-auto space-y-5">
          <InputField label="TEST TITLE *" value={form.title} onChange={v => setForm({...form, title: v})} />
          
          <SelectField label="MATERIAL CATEGORY *" value={form.category} onChange={v => setForm({...form, category: v, procedure: ''})}>
            <option value="">Select Category</option>
            {Object.keys(MATERIAL_TEST_OPTIONS).map(mat => <option key={mat} value={mat}>{mat}</option>)}
          </SelectField>
          
          <SelectField label="LADOTD TEST PROCEDURE *" value={form.procedure} onChange={v => setForm({...form, procedure: v})}>
            <option value="">Select Test Type</option>
            {availableProcedures.map(proc => <option key={proc} value={proc}>{proc}</option>)}
          </SelectField>

          <InputField label="LOCATION *" value={form.location} onChange={v => setForm({...form, location: v})} />
          <InputField label="DATE *" type="date" value={form.date} onChange={v => setForm({...form, date: v})} />
          <InputField label="DOTD PROCEDURE" placeholder="e.g. TR 418" />
          <InputField label="TEST FREQUENCY" placeholder="e.g. 1 per 1000 CY" />
          
          <div className="opacity-50 pointer-events-none">
             <InputField label="LADOTD SPECIFICATION *" placeholder="Auto-populated from LADOTD" readOnly />
          </div>

          <InputField label="ACTUAL VALUE *" value={form.value} onChange={v => setForm({...form, value: v})} />
          <SelectField label="UNIT *" value={form.unit} onChange={v => setForm({...form, unit: v})}>
            <option value="">Select Unit</option>
            <option value="PSI">PSI</option>
            <option value="%">%</option>
            <option value="in">Inches</option>
          </SelectField>
          
          <SelectField label="RESULT *" value={form.result} onChange={v => setForm({...form, result: v})}>
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
          </SelectField>

          <div className="bg-zinc-900 rounded p-4 border border-zinc-800">
            <p className="text-[10px] font-bold text-zinc-500 uppercase mb-2">LADOTD Reference Links</p>
            <div className="space-y-1 text-xs">
              <a href="#" className="block text-blue-500 hover:underline">2026 LSSRB: Standard Specifications</a>
              <a href="#" className="block text-blue-500 hover:underline">QA Manuals: Quality Assurance</a>
              <a href="#" className="block text-blue-500 hover:underline">Test Procedures: DOTD TR Manual</a>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-zinc-800 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 text-xs font-bold uppercase text-zinc-500 hover:text-white hover:bg-zinc-900 rounded">Cancel</button>
          <button onClick={() => onSave(form)} className="flex-1 py-3 bg-green-700 text-white text-xs font-bold uppercase rounded hover:bg-green-600">Save Test</button>
        </div>
      </div>
    </div>
  );
}

function IssueModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    title: '', location: '', date: new Date().toISOString().split('T')[0], 
    priority: 'Medium', status: 'Open', description: '', reportedBy: '', assignedTo: '', dueDate: ''
  });
  const X = Icons.X;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-zinc-950 w-full max-w-md rounded-xl border border-zinc-800 shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Report Issue</h3>
          <button onClick={onClose}><X className="text-zinc-500 hover:text-white" /></button>
        </div>
        <div className="p-6 overflow-y-auto space-y-5">
          <InputField label="ISSUE TITLE *" value={form.title} onChange={v => setForm({...form, title: v})} />
          <div>
             <label className="text-[10px] font-bold text-zinc-500 uppercase mb-1.5 block">DESCRIPTION *</label>
             <textarea 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-green-600 focus:outline-none min-h-[80px]"
                value={form.description} onChange={e => setForm({...form, description: e.target.value})}
             />
          </div>
          <InputField label="LOCATION *" value={form.location} onChange={v => setForm({...form, location: v})} />
          <InputField label="DATE REPORTED *" type="date" value={form.date} onChange={v => setForm({...form, date: v})} />
          <SelectField label="PRIORITY *" value={form.priority} onChange={v => setForm({...form, priority: v})}>
            <option value="Low">Low</option><option value="Medium">Medium</option><option value="High">High</option><option value="Critical">Critical</option>
          </SelectField>
          <SelectField label="STATUS *" value={form.status} onChange={v => setForm({...form, status: v})}>
            <option value="Open">Open</option><option value="In Progress">In Progress</option><option value="Resolved">Resolved</option>
          </SelectField>
          <InputField label="REPORTED BY *" value={form.reportedBy} onChange={v => setForm({...form, reportedBy: v})} />
          <InputField label="ASSIGNED TO" value={form.assignedTo} onChange={v => setForm({...form, assignedTo: v})} />
          <InputField label="DUE DATE" type="date" value={form.dueDate} onChange={v => setForm({...form, dueDate: v})} />
        </div>
        <div className="p-4 border-t border-zinc-800 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 text-xs font-bold uppercase text-zinc-500 hover:text-white hover:bg-zinc-900 rounded">Cancel</button>
          <button onClick={() => onSave(form)} className="flex-1 py-3 bg-green-700 text-white text-xs font-bold uppercase rounded hover:bg-green-600">Report Issue</button>
        </div>
      </div>
    </div>
  );
}

// --- 6. MAIN APP COMPONENT ---

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const [inspections, setInspections] = useState(INITIAL_INSPECTIONS);
  const [tests, setTests] = useState(INITIAL_TESTS);
  const [issues, setIssues] = useState(INITIAL_ISSUES);
  
  const [activeModal, setActiveModal] = useState(null);
  const [activeReport, setActiveReport] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDelete = (type, id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      if (type === 'inspection') setInspections(prev => prev.filter(i => i.id !== id));
      if (type === 'test') setTests(prev => prev.filter(t => t.id !== id));
      if (type === 'issue') setIssues(prev => prev.filter(i => i.id !== id));
    }
  };

  const handleSave = (type, data) => {
    const newItem = { ...data, id: Date.now() };
    if (type === 'inspection') setInspections([newItem, ...inspections]);
    if (type === 'test') setTests([newItem, ...tests]);
    if (type === 'issue') setIssues([newItem, ...issues]);
    setActiveModal(null);
  };

  const totalItems = inspections.length + tests.length;
  const passingItems = inspections.filter(i => i.result === 'Pass').length + tests.filter(t => t.result === 'Pass').length;
  const passRate = totalItems === 0 ? 0 : Math.round((passingItems / totalItems) * 100);

  const stats = { 
    total: totalItems, 
    tests: tests.length, 
    issues: issues.filter(i => i.status === 'Open').length,
    passRate: passRate,
  };

  const renderContent = () => {
    if (activeReport) return <ReportPreview data={activeReport} onClose={() => setActiveReport(null)} />;

    switch (activeTab) {
      case 'dashboard': 
        return <DashboardView 
          stats={stats} 
          recentActivity={[...inspections, ...tests].sort((a,b) => b.id - a.id).slice(0, 5)} 
          setActiveTab={setActiveTab}
          openModal={setActiveModal}
        />;
      case 'inspections': 
        return <InspectionsView 
          data={inspections} 
          onDelete={(id) => handleDelete('inspection', id)} 
          onGenerateReport={setActiveReport}
          onOpenModal={() => setActiveModal('inspection')}
        />;
      case 'tests': 
        return <MaterialTestsView 
          data={tests} 
          onDelete={(id) => handleDelete('test', id)} 
          onOpenModal={() => setActiveModal('test')}
        />;
      case 'issues': 
        return <IssuesView 
          data={issues} 
          onDelete={(id) => handleDelete('issue', id)} 
          onOpenModal={() => setActiveModal('issue')}
        />;
      case 'reports': return <ReportsView />;
      case 'forms': return <LADOTDResources />;
      case 'ai': return <AIAssistantView />;
      default: return <DashboardView stats={stats} />;
    }
  };

  const LayoutDashboard = Icons.LayoutDashboard; // Using manual SVG definition now
  
  return (
    <div className="min-h-screen bg-black font-sans text-zinc-300 selection:bg-green-900 selection:text-white pb-20 md:pb-0">
      <header className="bg-black border-b border-zinc-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
             <img src="Gilchrist Icon.png" alt="G" className="w-full h-full object-contain" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
             <span className="text-black font-black text-2xl hidden">G</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white leading-none">Quality Control</h1>
            <p className="text-xs text-zinc-500 font-bold tracking-wide mt-1">GILCHRIST CONSTRUCTION</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded border border-zinc-800">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-bold text-zinc-400 uppercase">Voice Ready</span>
        </div>
      </header>

      <div className="bg-black border-b border-zinc-800 px-4 py-2 overflow-x-auto">
        <nav className="flex gap-2 min-w-max">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <Icons.LayoutDashboard size={16} /> },
            { id: 'inspections', label: 'Inspections', icon: <Icons.ClipboardCheck size={16} /> },
            { id: 'tests', label: 'Tests', icon: <Icons.FlaskConical size={16} /> },
            { id: 'issues', label: 'Issues', icon: <Icons.AlertTriangle size={16} /> },
            { id: 'reports', label: 'Reports', icon: <Icons.FileText size={16} /> },
            { id: 'forms', label: 'LADOTD Forms', icon: <Icons.BookOpen size={16} /> },
            { id: 'ai', label: 'AI Assistant', icon: <Icons.Bot size={16} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wide transition-all ${
                activeTab === item.id 
                  ? 'bg-green-700 text-white shadow-lg shadow-green-900/20' 
                  : 'bg-zinc-900 text-zinc-500 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <main className="p-4 max-w-5xl mx-auto">
        {renderContent()}
      </main>

      {activeModal === 'inspection' && <InspectionModal onClose={() => setActiveModal(null)} onSave={(d) => handleSave('inspection', d)} />}
      {activeModal === 'test' && <TestModal onClose={() => setActiveModal(null)} onSave={(d) => handleSave('test', d)} />}
      {activeModal === 'issue' && <IssueModal onClose={() => setActiveModal(null)} onSave={(d) => handleSave('issue', d)} />}
    </div>
  );
}

function LADOTDResources() {
  const FlaskConical = Icons.FlaskConical;
  const HardHat = Icons.HardHat;
  const Construction = Icons.Construction;
  const Ruler = Icons.Ruler;
  const LayoutDashboard = Icons.LayoutDashboard;
  const ExternalLink = Icons.ExternalLink;

  const categories = [
    { title: "Materials & Testing", desc: "TR Procedures Manual", url: "https://dotd.la.gov/about/office-of-project-delivery/engineering/materials-and-testing/testing-procedure-manual/", icon: <FlaskConical className="text-green-500" size={24} /> },
    { title: "Construction", desc: "Specs & Manuals", url: "https://dotd.la.gov/about/office-of-project-delivery/engineering/construction/", icon: <HardHat className="text-amber-500" size={24} /> },
    { title: "Embankment & Basecourse", desc: "Geotechnical Manuals", url: "https://dotd.la.gov/about/office-of-project-delivery/engineering/materials-and-testing/quality-assurance-manuals/", icon: <Construction className="text-blue-500" size={24} /> },
    { title: "Bridge Design", desc: "Design Documents", url: "https://dotd.la.gov/about/office-of-project-delivery/engineering/bridge-and-structural-design/bridge-design-documents/", icon: <Ruler className="text-purple-500" size={24} /> },
    { title: "Asphalt Pavements", desc: "QA Manual (2018)", url: "https://dotd.la.gov/media/gaeknov2/qa-manual-for-asphalt-pavements-2018-spec-revision.pdf", icon: <LayoutDashboard className="text-zinc-400" size={24} /> }
  ];
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-white">LADOTD Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat, idx) => (
          <a key={idx} href={cat.url} target="_blank" rel="noreferrer" className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 hover:border-zinc-600 transition-all flex items-center gap-5 group">
            <div className="p-3 bg-black rounded-lg border border-zinc-800 group-hover:border-zinc-600">{cat.icon}</div>
            <div><h3 className="font-bold text-white text-base">{cat.title}</h3><p className="text-sm text-zinc-500 font-medium">{cat.desc}</p></div>
            <ExternalLink size={18} className="ml-auto text-zinc-600 group-hover:text-white" />
          </a>
        ))}
      </div>
    </div>
  );
}

function AIAssistantView() {
  const Bot = Icons.Bot;
  const Send = Icons.Send;
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi Bernie. I am your LADOTD expert assistant. Ask me about TR procedures or specs.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const responseText = "I am currently in demo mode. Please connect your Gemini API key to enable full AI responses.";

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: responseText }]);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="h-[600px] flex flex-col bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden animate-in fade-in duration-500">
      <div className="p-4 border-b border-zinc-800 bg-zinc-900 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-zinc-800 p-2 rounded-lg">
            <Bot className="text-green-500" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">LADOTD Assistant</h3>
            <p className="text-xs text-zinc-500">AI Powered</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-green-700 text-white rounded-br-none' 
                : 'bg-zinc-800 text-zinc-300 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 p-3 rounded-2xl rounded-bl-none flex items-center gap-2">
              <span className="text-xs text-zinc-500">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t border-zinc-800 bg-zinc-900">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
            placeholder="Ask about TR 418..."
            className="flex-1 px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-green-600 placeholder-zinc-600"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="bg-green-700 text-white p-3 rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 font-bold"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}