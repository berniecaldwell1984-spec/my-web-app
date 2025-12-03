import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- CONFIGURATION ---
const API_KEY = "AIzaSyDJtsc49v4_-Ru3PoOfd-Gq6KKnsYVT9CY"; 

// --- 1. ICONS (Compacted for reliability) ---
const IconWrapper = ({ children, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>{children}</svg>
);
const Icons = {
  ClipboardCheck: (props) => <IconWrapper {...props}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></IconWrapper>,
  FlaskConical: (props) => <IconWrapper {...props}><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></IconWrapper>,
  AlertTriangle: (props) => <IconWrapper {...props}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></IconWrapper>,
  CheckCircle: (props) => <IconWrapper {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></IconWrapper>,
  Calculator: (props) => <IconWrapper {...props}><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></IconWrapper>,
  Truck: (props) => <IconWrapper {...props}><rect x="1" y="3" width="15" height="13" rx="2" ry="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></IconWrapper>,
  Calendar: (props) => <IconWrapper {...props}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></IconWrapper>,
  LayoutDashboard: (props) => <IconWrapper {...props}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></IconWrapper>,
  Bot: (props) => <IconWrapper {...props}><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></IconWrapper>,
  BookOpen: (props) => <IconWrapper {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></IconWrapper>,
  Camera: (props) => <IconWrapper {...props}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></IconWrapper>,
  X: (props) => <IconWrapper {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></IconWrapper>,
  Printer: (props) => <IconWrapper {...props}><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></IconWrapper>,
  Trash2: (props) => <IconWrapper {...props}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></IconWrapper>,
  Plus: (props) => <IconWrapper {...props}><path d="M5 12h14"/><path d="M12 5v14"/></IconWrapper>,
  ChevronRight: (props) => <IconWrapper {...props}><path d="m9 18 6-6-6-6"/></IconWrapper>,
  ExternalLink: (props) => <IconWrapper {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></IconWrapper>,
  HardHat: (props) => <IconWrapper {...props}><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6h0"/><path d="M14 6h0a6 6 0 0 1 6 6v3"/></IconWrapper>,
  Construction: (props) => <IconWrapper {...props}><rect x="2" y="6" width="20" height="8" rx="1"/><path d="M17 14v7"/><path d="M7 14v7"/><path d="M17 3v3"/><path d="M7 3v3"/><path d="M10 14 2.3 6.3"/><path d="m14 6 7.7 7.7"/><path d="m8 6 8 8"/></IconWrapper>,
  Ruler: (props) => <IconWrapper {...props}><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/></IconWrapper>,
  FileText: (props) => <IconWrapper {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></IconWrapper>
};

// --- 2. HELPERS & DATA ---
const parseStation = (val) => {
  if (!val) return 0;
  const str = val.toString().trim();
  if (str.includes('+')) {
    const parts = str.split('+');
    return (parseFloat(parts[0]) || 0) * 100 + (parseFloat(parts[1]) || 0);
  }
  return parseFloat(str) || 0;
};

const Badge = ({ status }) => (
  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${status==='Pass'?'bg-green-900/30 text-green-500 border-green-800':status==='Fail'?'bg-red-900/30 text-red-500 border-red-800':'bg-amber-900/30 text-amber-500 border-amber-800'}`}>{status}</span>
);

const DashboardCard = ({ value, label, iconName, isWarning, isSuccess }) => {
  const Icon = Icons[iconName] || Icons.CheckCircle;
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl relative overflow-hidden group hover:border-zinc-700 transition-colors h-40 flex flex-col justify-center">
      <div className="flex items-center gap-6">
        <div className={`p-4 rounded-lg bg-zinc-800 ${isWarning ? 'text-amber-500' : isSuccess ? 'text-green-500' : 'text-green-700'} bg-opacity-20`}> <Icon size={24} /> </div>
        <div><span className="text-4xl font-black text-white block">{value}</span><span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1 block">{label}</span></div>
      </div>
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${isWarning ? 'bg-amber-600' : 'bg-green-700'}`}></div>
    </div>
  );
};

const QuickActionBtn = ({ iconName, label, onClick }) => {
  const Icon = Icons[iconName] || Icons.CheckCircle;
  return (
    <button onClick={onClick} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col items-center gap-3 hover:border-green-600 transition-all group">
      <div className="text-zinc-500 group-hover:text-green-500 transition-colors"><Icon size={20} /></div>
      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wide">{label}</span>
    </button>
  );
};

const InputField = ({ label, value, onChange, type="text", readOnly, placeholder, className, ...props }) => (
  <div className={`mb-4 ${className}`}>
    <label className="text-[10px] font-bold text-zinc-500 uppercase mb-1.5 block tracking-wide">{label}</label>
    <input type={type} value={value} onChange={e => onChange && onChange(e.target.value)} readOnly={readOnly} placeholder={placeholder} className="w-full bg-white border border-gray-300 rounded-lg p-3 text-base text-black font-bold focus:border-green-600 focus:ring-2 focus:ring-green-600 focus:outline-none placeholder-gray-400 transition-colors shadow-sm" {...props} />
  </div>
);

const SelectField = ({ label, children, value, onChange }) => (
  <div className="mb-4">
    <label className="text-[10px] font-bold text-zinc-500 uppercase mb-1.5 block tracking-wide">{label}</label>
    <div className="relative">
      <select value={value} onChange={e => onChange && onChange(e.target.value)} className="w-full bg-white border border-gray-300 rounded-lg p-3 text-base text-black font-bold focus:border-green-600 focus:ring-2 focus:ring-green-600 focus:outline-none appearance-none shadow-sm">{children}</select>
      <div className="absolute right-3 top-3 text-black pointer-events-none"><Icons.ChevronRight size={16} className="rotate-90" /></div>
    </div>
  </div>
);

const MATERIAL_TEST_OPTIONS = {
  "Concrete": ["TR 226 - Specimens", "TR 230 - Curing/Capping", "TR 207 - Slump", "TR 202A - Air (Volumetric)", "TR 202B - Air (Pressure)", "TR 229 - Temperature"],
  "Soil": ["TR 418 - Standard Proctor", "TR 419 - Modified Field Proctor", "TR 415 - Classification", "TR 403 - Density"],
  "Asphalt": ["TR 304 - Specific Gravity", "TR 305 - Thickness", "TR 306 - Smoothness"],
  "Aggregates": ["TR 113 - Sieve", "TR 112 - Moisture"],
  "Steel": ["Tensile Strength", "Bend Test"]
};
const INITIAL_INSPECTIONS = [{ id: 1, title: "Foundation Concrete Pour", location: "Building A - Foundation", date: "2025-11-29", result: "Pass", inspector: "Bernie Caldwell", category: "Concrete", notes: "Concrete met all specifications.", photos: [] }];
const INITIAL_TESTS = [{ id: 1, title: "Concrete Compressive Strength", category: "Concrete", procedure: "TR 230", location: "Building A", date: "2025-11-29", result: "Pass", value: "3250", unit: "PSI", spec: "Min 3000 PSI" }];

// --- 3. MODALS ---
function InspectionModal({ onClose, onSave }) {
  const [form, setForm] = useState({ title: '', category: '', result: 'Pending', location: '', date: new Date().toISOString().split('T')[0], inspector: '', notes: '', photo: null });
  const fileInputRef = useRef(null);
  const handlePhotoSelect = (e) => { if (e.target.files?.[0]) setForm({ ...form, photo: URL.createObjectURL(e.target.files[0]) }); };
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 print:hidden">
      <div className="bg-zinc-900 w-full max-w-md rounded-xl border border-zinc-800 shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center"><h3 className="text-lg font-bold text-white uppercase tracking-wider">New Inspection</h3><button onClick={onClose}><Icons.X className="text-zinc-500 hover:text-white" /></button></div>
        <div className="p-6 overflow-y-auto space-y-4">
          <InputField label="INSPECTION TITLE" value={form.title} onChange={v => setForm({...form, title: v})} />
          <SelectField label="CATEGORY" value={form.category} onChange={v => setForm({...form, category: v})}><option value="">Select Category</option>{Object.keys(MATERIAL_TEST_OPTIONS).map(cat => <option key={cat} value={cat}>{cat}</option>)}<option value="Safety">Safety</option></SelectField>
          <SelectField label="RESULT" value={form.result} onChange={v => setForm({...form, result: v})}><option value="Pending">Pending</option><option value="Pass">Pass</option><option value="Fail">Fail</option></SelectField>
          <InputField label="LOCATION" value={form.location} onChange={v => setForm({...form, location: v})} />
          <InputField label="DATE" type="date" value={form.date} onChange={v => setForm({...form, date: v})} />
          <InputField label="INSPECTOR" value={form.inspector} onChange={v => setForm({...form, inspector: v})} />
          <div><label className="text-[10px] font-bold text-zinc-500 uppercase mb-1 block tracking-wide">NOTES</label><textarea className="w-full bg-white border border-gray-300 rounded-lg p-3 text-base text-black font-bold focus:border-green-600 focus:outline-none min-h-[80px]" placeholder="Observations..." value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} /></div>
          <div><label className="text-[10px] font-bold text-zinc-500 uppercase mb-1 block tracking-wide">PHOTO EVIDENCE</label><input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoSelect} className="hidden" /><div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed border-zinc-700 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-green-600 transition-colors h-32">{form.photo ? <img src={form.photo} alt="Preview" className="h-full object-contain" /> : <div className="text-center text-zinc-500"><Icons.Camera className="mx-auto mb-2" size={24} /><span className="text-xs font-bold uppercase">Tap to Capture</span></div>}</div></div>
        </div>
        <div className="p-4 border-t border-zinc-800 flex gap-3"><button onClick={onClose} className="flex-1 py-3 text-xs font-bold uppercase text-zinc-500 hover:text-white hover:bg-zinc-800 rounded transition-colors">Cancel</button><button onClick={() => onSave(form)} className="flex-1 py-3 bg-green-600 text-white text-xs font-bold uppercase rounded hover:bg-green-500 transition-colors">Save Inspection</button></div>
      </div>
    </div>
  );
}

function TestModal({ onClose, onSave }) {
  const [form, setForm] = useState({ title: '', category: '', procedure: '', location: '', date: new Date().toISOString().split('T')[0], value: '', unit: '', result: 'Pass' });
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 print:hidden">
      <div className="bg-zinc-900 w-full max-w-md rounded-xl border border-zinc-800 shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center"><h3 className="text-lg font-bold text-white uppercase tracking-wider">New Material Test</h3><button onClick={onClose}><Icons.X className="text-zinc-500 hover:text-white" /></button></div>
        <div className="p-6 overflow-y-auto space-y-4">
          <InputField label="TEST TITLE" value={form.title} onChange={v => setForm({...form, title: v})} />
          <SelectField label="MATERIAL CATEGORY" value={form.category} onChange={v => setForm({...form, category: v, procedure: ''})}><option value="">Select Category</option>{Object.keys(MATERIAL_TEST_OPTIONS).map(mat => <option key={mat} value={mat}>{mat}</option>)}</SelectField>
          <SelectField label="TEST PROCEDURE" value={form.procedure} onChange={v => setForm({...form, procedure: v})}><option value="">Select Procedure</option>{(MATERIAL_TEST_OPTIONS[form.category]||[]).map(proc => <option key={proc} value={proc}>{proc}</option>)}</SelectField>
          <InputField label="LOCATION" value={form.location} onChange={v => setForm({...form, location: v})} />
          <InputField label="DATE" type="date" value={form.date} onChange={v => setForm({...form, date: v})} />
          <div className="grid grid-cols-2 gap-4"><InputField label="VALUE" value={form.value} onChange={v => setForm({...form, value: v})} /><SelectField label="UNIT" value={form.unit} onChange={v => setForm({...form, unit: v})}><option value="">Select Unit</option><option value="PSI">PSI</option><option value="%">%</option><option value="in">in</option><option value="pcf">pcf</option></SelectField></div>
          <SelectField label="RESULT" value={form.result} onChange={v => setForm({...form, result: v})}><option value="Pass">Pass</option><option value="Fail">Fail</option></SelectField>
        </div>
        <div className="p-4 border-t border-zinc-800 flex gap-3"><button onClick={onClose} className="flex-1 py-3 text-xs font-bold uppercase text-zinc-500 hover:text-white hover:bg-zinc-800 rounded transition-colors">Cancel</button><button onClick={() => onSave(form)} className="flex-1 py-3 bg-green-600 text-white text-xs font-bold uppercase rounded hover:bg-green-500 transition-colors">Save Test</button></div>
      </div>
    </div>
  );
}

// --- 4. VIEWS ---
function SoilCalcView({ segments, addSegment, removeSegment, current, setCurrent }) {
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (current.startStation && current.endStation) {
      const dist = Math.abs(parseStation(current.endStation) - parseStation(current.startStation));
      if (!isNaN(dist)) setCurrent(prev => ({ ...prev, length: dist }));
    }
  }, [current.startStation, current.endStation]);
  const handlePhotoSelect = (e) => { if (e.target.files?.[0]) setCurrent({ ...current, photo: URL.createObjectURL(e.target.files[0]) }); };
  const calculate = (seg) => {
    const l = parseFloat(seg.length)||0; const w = parseFloat(seg.width)||0; const d = parseFloat(seg.depth)||0; const rho = parseFloat(seg.density)||0; const pct = parseFloat(seg.percent)||0;
    const areaSqYd = (l * w) / 9; const volumeCF = (l * w * (d / 12)); const totalLbs = volumeCF * rho * (pct / 100); const tons = totalLbs / 2000;
    return { areaSqYd, volumeCF, totalLbs, tons, spreadRate: areaSqYd > 0 ? (totalLbs / areaSqYd) : 0 };
  };
  const totalTons = segments.reduce((acc, s) => acc + calculate(s).tons, 0);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4">
       <style>{`@media print { body, html, #root { background-color: #000 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; color: white !important; } .print\\:hidden { display: none !important; } .print\\:block { display: block !important; } .print\\:bg-black { background-color: #000 !important; } .print\\:text-white { color: #fff !important; } }`}</style>
       <div className="print:hidden"><div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-4"><h2 className="text-3xl font-black text-white uppercase tracking-tighter">Soil Cement & Lime</h2><div className="text-xs bg-zinc-900 border border-zinc-800 px-3 py-1 rounded text-zinc-500 font-mono">Factors: Cement 94lb | Lime 35lb</div></div><div className="grid grid-cols-2 gap-4"><InputField label="JOB NAME / NUMBER" placeholder="e.g. I-49 Rehabilitation" /><InputField label="DATE" type="date" /></div></div>
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg print:hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div><label className="text-[10px] font-bold text-zinc-500 uppercase mb-1.5 block tracking-wide">MATERIAL</label><div className="flex border border-gray-300 rounded-lg overflow-hidden h-[46px]"><button onClick={() => setCurrent({...current, material: 'Cement', density: 94})} className={`flex-1 text-sm font-black uppercase transition-colors ${current.material === 'Cement' ? 'bg-green-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>Cement</button><button onClick={() => setCurrent({...current, material: 'Lime', density: 35})} className={`flex-1 text-sm font-black uppercase transition-colors ${current.material === 'Lime' ? 'bg-green-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>Lime</button></div></div>
            <SelectField label="PERCENTAGE" value={current.percent} onChange={(v) => setCurrent({...current, percent: parseFloat(v)})}>{[3,4,5,6,7,8,9].map(n => <option key={n} value={n}>{n}%</option>)}</SelectField>
            <InputField label="DRY DENSITY (PCF)" value={current.density} onChange={(v) => setCurrent({...current, density: v})} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-black rounded-lg border border-zinc-800"><InputField label="START STATION" placeholder="100+00" value={current.startStation || ''} onChange={(v) => setCurrent({...current, startStation: v})} /><InputField label="END STATION" placeholder="105+00" value={current.endStation || ''} onChange={(v) => setCurrent({...current, endStation: v})} /><InputField label="CALC LENGTH (FT)" value={current.length} onChange={(v) => setCurrent({...current, length: v})} readOnly className="opacity-75" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><InputField label="WIDTH (FT)" value={current.width} onChange={(v) => setCurrent({...current, width: v})} /><InputField label="DEPTH (IN)" value={current.depth} onChange={(v) => setCurrent({...current, depth: v})} /></div>
        <div className="mb-4"><input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoSelect} className="hidden" /><button onClick={() => fileInputRef.current.click()} className={`w-full py-3 rounded-lg border-2 border-dashed flex items-center justify-center gap-2 transition-colors ${current.photo ? 'border-green-600 text-green-500 bg-green-900/20' : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'}`}><Icons.Camera size={20} /><span className="font-bold text-xs uppercase">{current.photo ? "Photo Attached" : "Attach Photo"}</span></button></div>
        <button onClick={addSegment} className="w-full bg-green-600 hover:bg-green-500 text-white font-black uppercase text-sm py-4 rounded-lg mt-4 transition-all shadow-lg transform active:scale-95">Add to List</button>
      </div>
      {segments.length > 0 && (
         <div className="bg-black border-2 border-green-600 rounded-xl overflow-hidden shadow-2xl print:w-full print:absolute print:top-0 print:left-0 print:z-50">
            <div className="p-6 border-b-2 border-green-600 bg-black flex justify-between items-center"><div className="flex items-center gap-4"><img src="/Gilchrist_Logo.png" alt="GILCHRIST" className="h-12 object-contain" onError={(e) => e.target.style.display='none'}/><div><h3 className="font-black text-white text-xl uppercase tracking-tighter leading-none">Soil & Lime Report</h3><p className="text-green-500 text-xs font-bold uppercase tracking-widest mt-1">Material Stabilization</p></div></div><div className="print:hidden"><button onClick={() => window.print()} className="flex items-center gap-2 text-[10px] font-bold uppercase text-black bg-white px-4 py-2 rounded hover:bg-gray-200 transition-colors"><Icons.Printer size={14}/> Print Report</button></div></div>
            {segments.map(seg => {
                const res = calculate(seg);
                return (
                    <div key={seg.id} className="p-6 border-b border-zinc-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-black">
                        <div className="md:col-span-4"><span className="block font-black text-2xl text-white uppercase mb-1">{seg.material} {seg.percent}%</span><span className="inline-block text-[10px] bg-green-900/30 text-green-400 px-2 py-1 rounded border border-green-900 uppercase font-bold tracking-wider">Station {seg.startStation || '0'} to {seg.endStation || '0'}</span>{seg.photo && <img src={seg.photo} className="mt-2 h-16 w-16 object-cover rounded border border-green-900" />}</div>
                        <div className="md:col-span-5"><p className="text-sm text-zinc-300 font-bold font-mono mb-2">Dims: {seg.length}'(L) x {seg.width}'(W) x {seg.depth}"(D)</p><p className="text-sm text-zinc-500 font-mono font-bold"><span className="text-zinc-600">Formula:</span> {res.volumeCF.toFixed(1)}cf × {seg.density}pcf × {seg.percent/100} = <span className="text-white font-black text-lg">{Math.round(res.totalLbs).toLocaleString()} lbs</span></p></div>
                        <div className="md:col-span-2 text-right"><p className="font-black text-4xl text-green-500 leading-none tracking-tighter">{res.tons.toFixed(2)}</p><p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">TONS</p><p className="text-[10px] text-zinc-400 mt-1">Rate: <span className="text-white font-bold">{res.spreadRate.toFixed(1)}</span> lb/sy</p></div>
                        <div className="md:col-span-1 text-right print:hidden"><button onClick={() => removeSegment(seg.id)} className="p-2 text-zinc-600 hover:text-red-500 transition-colors"><Icons.Trash2 size={20}/></button></div>
                    </div>
                )
            })}
            <div className="p-8 bg-zinc-900 border-t-2 border-green-600 flex justify-between items-center"><span className="text-green-500 font-black uppercase text-sm tracking-widest">Job Total Requirement</span><span className="text-5xl font-black text-white tracking-tighter">{totalTons.toFixed(2)} <span className="text-2xl text-zinc-500">TONS</span></span></div>
         </div>
      )}
    </div>
  );
}

function AsphaltCalcView({ segments, addSegment, removeSegment, current, setCurrent }) {
    const fileInputRef = useRef(null);
    useEffect(() => {
        if (current.startStation && current.endStation) {
            const dist = Math.abs(parseStation(current.endStation) - parseStation(current.startStation));
            if (!isNaN(dist)) setCurrent(prev => ({ ...prev, length: dist }));
        }
    }, [current.startStation, current.endStation]);
    const handlePhotoSelect = (e) => { if (e.target.files?.[0]) setCurrent({ ...current, photo: URL.createObjectURL(e.target.files[0]) }); };
    const calculate = (seg) => {
        const l = parseFloat(seg.length)||0; const w = parseFloat(seg.width)||0; const t = parseFloat(seg.thickness)||0; const rate = parseFloat(seg.density)||110;
        const sy = (l * w) / 9; const totalLbs = sy * t * rate; const tons = totalLbs / 2000;
        return { sy, tons, totalLbs };
    };
    const totalTons = segments.reduce((acc, s) => acc + calculate(s).tons, 0);

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4 print:hidden"><h2 className="text-3xl font-black text-white uppercase tracking-tighter">Asphalt Yield</h2><div className="text-xs bg-zinc-900 border border-zinc-800 px-3 py-1 rounded text-zinc-500 font-mono">Factor: 110 lb/sy-in</div></div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg print:hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                         <div className="grid grid-cols-2 gap-4 bg-black p-4 rounded-lg border border-zinc-800"><InputField label="START STATION" placeholder="100+00" value={current.startStation || ''} onChange={(v) => setCurrent({...current, startStation: v})} /><InputField label="END STATION" placeholder="110+00" value={current.endStation || ''} onChange={(v) => setCurrent({...current, endStation: v})} /></div>
                        <InputField label="CALCULATED LENGTH (FT)" value={current.length} onChange={(v) => setCurrent({...current, length: v})} />
                        <InputField label="WIDTH (FT)" value={current.width} onChange={(v) => setCurrent({...current, width: v})} />
                        <InputField label="THICKNESS (IN)" value={current.thickness} onChange={(v) => setCurrent({...current, thickness: v})} />
                    </div>
                    <div>
                        <InputField label="YIELD (LBS/SY-IN)" value={current.density} onChange={(v) => setCurrent({...current, density: v})} />
                        <div className="mt-4 p-8 bg-black rounded-xl text-center border border-zinc-800 h-64 flex flex-col justify-center"><p className="text-xs font-bold text-zinc-500 uppercase mb-2 tracking-widest">Estimated Tonnage</p><p className="text-5xl font-black text-white">{calculate(current).tons.toFixed(2)}</p><p className="text-sm text-zinc-500 mt-4 font-bold">Trucks ({current.truckCapacity}t): <span className="text-white">{Math.ceil(calculate(current).tons / current.truckCapacity)}</span></p></div>
                    </div>
                </div>
                <div className="mb-4 mt-4"><input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoSelect} className="hidden" /><button onClick={() => fileInputRef.current.click()} className={`w-full py-3 rounded-lg border-2 border-dashed flex items-center justify-center gap-2 transition-colors ${current.photo ? 'border-green-600 text-green-500 bg-green-900/20' : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'}`}><Icons.Camera size={20} /><span className="font-bold text-xs uppercase">{current.photo ? "Photo Attached" : "Attach Photo"}</span></button></div>
                <button onClick={addSegment} className="w-full bg-green-600 hover:bg-green-500 text-white font-black uppercase text-sm py-4 rounded-lg mt-4 transition-all shadow-lg transform active:scale-95">Add Pull to List</button>
            </div>
            {segments.length > 0 && (
                <div className="bg-black border-2 border-green-600 rounded-xl overflow-hidden shadow-2xl print:w-full print:absolute print:top-0 print:left-0 print:z-50">
                   <div className="p-6 border-b-2 border-green-600 bg-black flex justify-between items-center"><div className="flex items-center gap-4"><img src="/Gilchrist_Logo.png" alt="GILCHRIST" className="h-12 object-contain" onError={(e) => e.target.style.display='none'}/><div><h3 className="font-black text-white text-xl uppercase tracking-tighter leading-none">Paving Schedule</h3><p className="text-green-500 text-xs font-bold uppercase tracking-widest mt-1">Asphalt Yield Report</p></div></div><div className="print:hidden"><button onClick={() => window.print()} className="flex items-center gap-2 text-[10px] font-bold uppercase text-black bg-white px-4 py-2 rounded hover:bg-gray-200 transition-colors"><Icons.Printer size={14}/> Print Report</button></div></div>
                   {segments.map(seg => {
                       const res = calculate(seg);
                       return (
                           <div key={seg.id} className="p-6 border-b border-zinc-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-black">
                               <div className="md:col-span-4"><span className="block font-black text-2xl text-white uppercase mb-1">HMA Paving</span><span className="inline-block text-[10px] bg-green-900/30 text-green-400 px-2 py-1 rounded border border-green-900 uppercase font-bold tracking-wider">Station {seg.startStation || '0'} to {seg.endStation || '0'}</span>{seg.photo && <img src={seg.photo} className="mt-2 h-16 w-16 object-cover rounded border border-green-900" />}</div>
                               <div className="md:col-span-5"><p className="text-sm text-zinc-300 font-bold font-mono mb-2">Dims: {seg.length}'(L) x {seg.width}'(W) x {seg.thickness}"(T)</p><p className="text-sm text-zinc-500 font-mono font-bold"><span className="text-zinc-600">Formula:</span> {res.sy.toFixed(1)}sy × {seg.thickness}" × {seg.density} = <span className="text-white font-black text-lg">{Math.round(res.totalLbs).toLocaleString()} lbs</span></p></div>
                               <div className="md:col-span-2 text-right"><p className="font-black text-4xl text-green-500 leading-none tracking-tighter">{res.tons.toFixed(2)}</p><p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">TONS</p></div>
                               <div className="md:col-span-1 text-right print:hidden"><button onClick={() => removeSegment(seg.id)} className="p-2 text-zinc-600 hover:text-red-500 transition-colors"><Icons.Trash2 size={20}/></button></div>
                           </div>
                       )
                   })}
                   <div className="p-8 bg-zinc-900 border-t-2 border-green-600 flex justify-between items-center"><span className="text-green-500 font-black uppercase text-sm tracking-widest">Total Tonnage</span><span className="text-5xl font-black text-white tracking-tighter">{totalTons.toFixed(2)} <span className="text-2xl text-zinc-500">TONS</span></span></div>
                </div>
            )}
        </div>
    );
}

function InspectionsView({ data, onDelete, onGenerateReport, onOpenModal }) {
  const [filter, setFilter] = useState('ALL');
  const filteredData = filter === 'ALL' ? data : data.filter(i => i.category.toUpperCase().includes(filter));
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4">
      <style>{`@media print { body, html, #root { background-color: #000 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; color: white !important; } .print\\:hidden { display: none !important; } .print\\:block { display: block !important; } .print\\:bg-black { background-color: #000 !important; } .print\\:text-white { color: #fff !important; } }`}</style>
      <div className="flex justify-between items-center border-b border-zinc-800 pb-4 print:hidden"><h2 className="text-2xl font-black text-white uppercase tracking-tighter">Quality Inspections</h2><button onClick={onOpenModal} className="bg-green-600 text-white px-4 py-2 rounded font-bold text-xs hover:bg-green-500 flex items-center gap-2 uppercase tracking-wide transition-colors"><Icons.Plus size={16} /> New Inspection</button></div>
      <div className="space-y-4 mt-6 print:hidden">
        <button onClick={() => window.print()} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-center gap-3 hover:border-green-600 transition-all text-zinc-400 hover:text-white font-bold uppercase"><Icons.Printer size={20}/> Print Full Report</button>
        {filteredData.map((insp) => (
          <div key={insp.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden p-6 hover:border-zinc-700 transition-colors">
            <div className="flex justify-between items-start mb-2"><div><h3 className="text-lg font-bold text-white">{insp.title}</h3><p className="text-xs text-zinc-500 font-bold mt-1 uppercase">{insp.location} • {insp.date}</p></div><Badge status={insp.result} /></div>
            <p className="text-sm text-zinc-400 italic mb-4">"{insp.notes}"</p>
            {insp.photo && <img src={insp.photo} className="h-20 object-contain rounded border border-zinc-700 mb-4" />}
            <div className="flex gap-3 pt-4 border-t border-zinc-800"><button onClick={() => onDelete(insp.id)} className="text-red-500 text-xs font-bold uppercase flex items-center gap-2 hover:text-red-400"><Icons.Trash2 size={14} /> Delete</button></div>
          </div>
        ))}
      </div>
      <div className="hidden print:block bg-black border-2 border-green-600 rounded-xl overflow-hidden print:w-full print:absolute print:top-0 print:left-0 print:z-50">
          <div className="p-6 border-b-2 border-green-600 bg-black flex justify-between items-center"><div className="flex items-center gap-4"><img src="/Gilchrist_Logo.png" alt="GILCHRIST" className="h-12 object-contain" onError={(e) => e.target.style.display='none'}/><div><h3 className="font-black text-white text-xl uppercase tracking-tighter leading-none">Inspection Report</h3><p className="text-green-500 text-xs font-bold uppercase tracking-widest mt-1">Quality Control Log</p></div></div></div>
          {filteredData.map((insp) => (
             <div key={insp.id} className="p-6 border-b border-zinc-800 bg-black">
                <div className="flex justify-between items-start mb-2"><div><h3 className="text-xl font-black text-white uppercase">{insp.title}</h3><p className="text-sm text-zinc-400 font-bold mt-1 uppercase">{insp.location} | {insp.date}</p></div><div className="text-right"><span className={`px-3 py-1 rounded text-sm font-bold border uppercase ${insp.result === 'Pass' ? 'text-green-500 border-green-600' : 'text-red-500 border-red-600'}`}>{insp.result}</span></div></div>
                <div className="mt-4 p-4 border border-zinc-800 rounded bg-zinc-900/50"><p className="text-sm text-white italic">"{insp.notes}"</p></div>
                {insp.photo && (<div className="mt-4"><img src={insp.photo} className="h-32 object-contain rounded border border-green-900" /><p className="text-[10px] text-zinc-500 uppercase mt-1">Attached Evidence</p></div>)}
             </div>
          ))}
          <div className="p-8 bg-zinc-900 border-t-2 border-green-600 flex justify-between items-center"><span className="text-xs text-zinc-500">Generated by Gilchrist QC App</span><span className="text-white font-bold uppercase">Total Items: {filteredData.length}</span></div>
      </div>
    </div>
  );
}

function MaterialTestsView({ data, onDelete, onOpenModal }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4">
      <style>{`@media print { body, html, #root { background-color: #000 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; color: white !important; } .print\\:hidden { display: none !important; } .print\\:block { display: block !important; } .print\\:bg-black { background-color: #000 !important; } .print\\:text-white { color: #fff !important; } }`}</style>
      <div className="flex justify-between items-center border-b border-zinc-800 pb-4 print:hidden"><h2 className="text-2xl font-black text-white uppercase tracking-tighter">Material Tests</h2><button onClick={onOpenModal} className="bg-green-600 text-white px-4 py-2 rounded font-bold text-xs hover:bg-green-500 flex items-center gap-2 uppercase tracking-wide transition-colors"><Icons.Plus size={16} /> New Test</button></div>
      <div className="space-y-4 mt-6 print:hidden">
        <button onClick={() => window.print()} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-center gap-3 hover:border-green-600 transition-all text-zinc-400 hover:text-white font-bold uppercase"><Icons.Printer size={20}/> Print Test Report</button>
        {data.map((test) => (
          <div key={test.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden p-6 hover:border-zinc-700 transition-colors">
            <div className="flex justify-between items-start mb-2"><div><h3 className="text-lg font-bold text-white">{test.title}</h3><p className="text-xs text-zinc-500 font-bold mt-1 uppercase">{test.procedure} • {test.date}</p></div><Badge status={test.result} /></div>
            <div className="flex justify-between items-center bg-black p-3 rounded border border-zinc-800 mb-4"><span className="text-xs font-bold text-zinc-500 uppercase">Result Value</span><span className="text-xl font-black text-white">{test.value} <span className="text-sm text-green-500">{test.unit}</span></span></div>
            <div className="flex gap-3 pt-4 border-t border-zinc-800"><button onClick={() => onDelete(test.id)} className="text-red-500 text-xs font-bold uppercase flex items-center gap-2 hover:text-red-400"><Icons.Trash2 size={14} /> Delete</button></div>
          </div>
        ))}
      </div>
      <div className="hidden print:block bg-black border-2 border-green-600 rounded-xl overflow-hidden print:w-full print:absolute print:top-0 print:left-0 print:z-50">
          <div className="p-6 border-b-2 border-green-600 bg-black flex justify-between items-center"><div className="flex items-center gap-4"><img src="/Gilchrist_Logo.png" alt="GILCHRIST" className="h-12 object-contain" onError={(e) => e.target.style.display='none'}/><div><h3 className="font-black text-white text-xl uppercase tracking-tighter leading-none">Material Test Report</h3><p className="text-green-500 text-xs font-bold uppercase tracking-widest mt-1">Laboratory & Field Data</p></div></div></div>
          {data.map((test) => (
             <div key={test.id} className="p-6 border-b border-zinc-800 bg-black grid grid-cols-2 items-center">
                <div><h3 className="text-xl font-black text-white uppercase">{test.title}</h3><p className="text-sm text-zinc-400 font-bold mt-1 uppercase">{test.procedure} | {test.location}</p></div>
                <div className="text-right"><span className="block text-4xl font-black text-white">{test.value} <span className="text-lg text-green-500">{test.unit}</span></span><span className={`inline-block mt-2 px-3 py-1 rounded text-xs font-bold border uppercase ${test.result === 'Pass' ? 'text-green-500 border-green-600' : 'text-red-500 border-red-600'}`}>{test.result}</span></div>
             </div>
          ))}
          <div className="p-8 bg-zinc-900 border-t-2 border-green-600 flex justify-between items-center"><span className="text-xs text-zinc-500">Generated by Gilchrist QC App</span><span className="text-white font-bold uppercase">Total Tests: {data.length}</span></div>
      </div>
    </div>
  );
}

function LADOTDResources() {
  const categories = [
    { title: "Materials & Testing", desc: "TR Procedures Manual", url: "https://dotd.la.gov/about/office-of-project-delivery/engineering/materials-and-testing/testing-procedure-manual/", icon: <Icons.FlaskConical className="text-green-500" size={24} /> },
    { title: "Construction", desc: "Specs & Manuals", url: "https://dotd.la.gov/about/office-of-project-delivery/engineering/construction/", icon: <Icons.HardHat className="text-green-500" size={24} /> },
    { title: "Embankment & Basecourse", desc: "Geotechnical Manuals", url: "https://dotd.la.gov/about/office-of-project-delivery/engineering/materials-and-testing/quality-assurance-manuals/", icon: <Icons.Construction className="text-green-500" size={24} /> },
    { title: "Bridge Design", desc: "Design Documents", url: "https://dotd.la.gov/about/office-of-project-delivery/engineering/bridge-and-structural-design/bridge-design-documents/", icon: <Icons.Ruler className="text-green-500" size={24} /> },
    { title: "Asphalt Pavements", desc: "QA Manual (2018)", url: "https://dotd.la.gov/media/gaeknov2/qa-manual-for-asphalt-pavements-2018-spec-revision.pdf", icon: <Icons.LayoutDashboard className="text-green-500" size={24} /> }
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter">LADOTD Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat, idx) => (
          <a key={idx} href={cat.url} target="_blank" rel="noreferrer" className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 flex items-center gap-5 hover:border-green-600 transition-colors cursor-pointer group"><div className="p-3 bg-black rounded-lg group-hover:bg-green-900/20 transition-colors">{cat.icon}</div><div><h3 className="font-bold text-white text-base">{cat.title}</h3><p className="text-sm text-zinc-500 font-bold">{cat.desc}</p></div><Icons.ExternalLink className="ml-auto text-zinc-600 group-hover:text-white" size={16}/></a>
        ))}
      </div>
    </div>
  );
}

function AIAssistantView({ messages, setMessages }) {
  const [input, setInput] = useState(''); const [isLoading, setIsLoading] = useState(false); const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input; setInput(''); setMessages(prev => [...prev, { role: 'user', text: userMsg }]); setIsLoading(true);
    try {
      if (!API_KEY || API_KEY.includes("PASTE")) throw new Error("API Key Missing");
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: result.response.text() }]);
    } catch (error) { setMessages(prev => [...prev, { role: 'model', text: "Connection error. Please try again." }]); } 
    finally { setIsLoading(false); }
  };
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  return (
    <div className="h-[600px] flex flex-col bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-zinc-800 bg-black"><h3 className="font-bold text-white text-sm uppercase tracking-wider">Field Engineer AI</h3></div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (<div key={idx} className={`flex ${msg.role==='user'?'justify-end':'justify-start'}`}><div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium ${msg.role==='user'?'bg-green-600 text-white':'bg-zinc-800 text-zinc-300'}`}>{msg.text}</div></div>))}
        {isLoading && <div className="text-zinc-500 text-xs p-4">Thinking...</div>} <div ref={chatEndRef} />
      </div>
      <div className="p-4 border-t border-zinc-800 bg-black flex gap-2"><input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key==='Enter'&&handleSend()} className="flex-1 px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white font-bold" placeholder="Ask AI..." /><button onClick={handleSend} disabled={isLoading} className="bg-green-600 text-white p-3 rounded-xl font-bold">SEND</button></div>
    </div>
  );
}

function DashboardView({ stats, setActiveTab, openModal }) {
  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-zinc-800 pb-6">
        <div><img src="/Gilchrist_Logo.png" alt="GILCHRIST" className="h-20 object-contain mb-2" onError={(e)=>{e.target.style.display='none'}}/><p className="text-green-600 text-sm font-black tracking-widest uppercase">Quick Reference App</p></div>
        <div className="flex items-center gap-2 text-zinc-400 mt-4 md:mt-0 bg-zinc-900 px-3 py-1 rounded border border-zinc-800"><Icons.Calendar size={16} /><span className="text-xs font-bold uppercase tracking-wide">{new Date().toLocaleDateString()}</span></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard value={stats.total} label="Total Insp." iconName="ClipboardCheck" />
        <DashboardCard value={stats.tests} label="Tests Done" iconName="FlaskConical" />
        <DashboardCard value={stats.issues} label="Open Issues" iconName="AlertTriangle" isWarning={stats.issues > 0} />
        <DashboardCard value={`${stats.passRate}%`} label="Pass Rate" iconName="CheckCircle" isSuccess={stats.passRate >= 90} />
      </div>
      <div>
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Quick Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionBtn iconName="Calculator" label="Soil Cement" onClick={() => setActiveTab('soilcalc')} />
          <QuickActionBtn iconName="Truck" label="Asphalt Yield" onClick={() => setActiveTab('asphaltcalc')} />
          <QuickActionBtn iconName="ClipboardCheck" label="Quick Inspection" onClick={() => openModal('inspection')} />
          <QuickActionBtn iconName="FlaskConical" label="Material Test" onClick={() => setActiveTab('tests')} />
        </div>
      </div>
    </div>
  );
}

// --- MAIN APP ---
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inspections, setInspections] = useState(INITIAL_INSPECTIONS);
  const [tests, setTests] = useState(INITIAL_TESTS);
  const [activeModal, setActiveModal] = useState(null);
  const [soilSegments, setSoilSegments] = useState([]);
  const [currentSoil, setCurrentSoil] = useState({ id: Date.now(), length: '', width: '', depth: '', density: 94, material: 'Cement', percent: 6, photo: null });
  const [asphaltSegments, setAsphaltSegments] = useState([]);
  const [currentAsphalt, setCurrentAsphalt] = useState({ id: Date.now(), length: '', width: '', thickness: '', density: 110, truckCapacity: 22, photo: null });
  
  // --- AI STATE (LIFTED UP) ---
  const [aiMessages, setAiMessages] = useState([{ role: 'model', text: "Ready to assist, Bernie. I'm your Senior Field Engineer assistant." }]);

  const stats = { total: inspections.length, tests: tests.length, issues: 0, passRate: 100 };
  const handleSaveInspection = (data) => { setInspections([{ ...data, id: Date.now() }, ...inspections]); setActiveModal(null); };
  const handleSaveTest = (data) => { setTests([{ ...data, id: Date.now() }, ...tests]); setActiveModal(null); };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView stats={stats} setActiveTab={setActiveTab} openModal={setActiveModal} />;
      case 'soilcalc': return <SoilCalcView segments={soilSegments} addSegment={()=>{setSoilSegments([...soilSegments,{...currentSoil,id:Date.now()}]);setCurrentSoil({...currentSoil,startStation:'',endStation:'',length:'',photo:null})}} removeSegment={(id)=>setSoilSegments(soilSegments.filter(s=>s.id!==id))} current={currentSoil} setCurrent={setCurrentSoil} />;
      case 'asphaltcalc': return <AsphaltCalcView segments={asphaltSegments} addSegment={()=>{setAsphaltSegments([...asphaltSegments,{...currentAsphalt,id:Date.now()}]);setCurrentAsphalt({...currentAsphalt,startStation:'',endStation:'',length:'',photo:null})}} removeSegment={(id)=>setAsphaltSegments(asphaltSegments.filter(s=>s.id!==id))} current={currentAsphalt} setCurrent={setCurrentAsphalt} />;
      case 'inspections': return <InspectionsView data={inspections} onDelete={(id) => setInspections(inspections.filter(i => i.id !== id))} onOpenModal={() => setActiveModal('inspection')} />;
      case 'tests': return <MaterialTestsView data={tests} onDelete={(id) => setTests(tests.filter(t => t.id !== id))} onOpenModal={() => setActiveModal('test')} />;
      case 'forms': return <LADOTDResources />;
      case 'ai': return <AIAssistantView messages={aiMessages} setMessages={setAiMessages} />;
      default: return <DashboardView stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans text-zinc-300 pb-20 md:pb-0">
      <header className="bg-black border-b border-zinc-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50 print:hidden">
        <div className="flex items-center gap-4"><img src="/Gilchrist_Logo.png" className="h-12 object-contain" /></div>
        <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded border border-zinc-800"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div><span className="text-xs font-bold text-zinc-400 uppercase">Bernie</span></div>
      </header>
      <div className="bg-black border-b border-zinc-800 px-4 py-2 overflow-x-auto print:hidden">
        <nav className="flex gap-2 min-w-max">
          {[{id:'dashboard',label:'Dash',icon:<Icons.LayoutDashboard size={16}/>},{id:'soilcalc',label:'Soil',icon:<Icons.Calculator size={16}/>},{id:'asphaltcalc',label:'Asphalt',icon:<Icons.Truck size={16}/>},{id:'inspections',label:'Insp',icon:<Icons.ClipboardCheck size={16}/>},{id:'tests',label:'Tests',icon:<Icons.FlaskConical size={16}/>},{id:'forms',label:'Forms',icon:<Icons.BookOpen size={16}/>},{id:'ai',label:'AI',icon:<Icons.Bot size={16}/>}].map(item=>(<button key={item.id} onClick={()=>setActiveTab(item.id)} className={`flex items-center gap-2 px-4 py-3 rounded text-xs font-black uppercase tracking-wide transition-all ${activeTab===item.id?'bg-green-600 text-white':'bg-zinc-900 text-zinc-500'}`}>{item.icon}{item.label}</button>))}
        </nav>
      </div>
      <main className="p-6 max-w-6xl mx-auto">{renderContent()}</main>
      {activeModal === 'inspection' && <InspectionModal onClose={() => setActiveModal(null)} onSave={handleSaveInspection} />}
      {activeModal === 'test' && <TestModal onClose={() => setActiveModal(null)} onSave={handleSaveTest} />}
    </div>
  );
}
