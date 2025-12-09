import React from "react";

export default function SafetyBriefingView() {
  return (
    <div className="p-4 bg-black rounded-xl border border-zinc-800 text-white min-h-[60vh]">
      <header className="mb-4">
        <h2 className="text-xl font-bold">Safety Briefing</h2>
        <div className="text-sm text-zinc-400">Site safety notes and checklists</div>
      </header>

      <section className="space-y-4">
        <div className="p-3 bg-zinc-900 border border-zinc-700 rounded">
          <div className="text-sm text-zinc-400">PPE</div>
          <div className="text-white">Hard hats, high-visibility vests, safety boots, and eye protection required on site.</div>
        </div>

        <div className="p-3 bg-zinc-900 border border-zinc-700 rounded">
          <div className="text-sm text-zinc-400">Hazard Communication</div>
          <div className="text-white">All crews must review SDS for materials on site and follow handling instructions.</div>
        </div>

        <div className="p-3 bg-zinc-900 border border-zinc-700 rounded">
          <div className="text-sm text-zinc-400">Traffic Control</div>
          <div className="text-white">Follow the approved TCP; flaggers and signage must be in place before work begins.</div>
        </div>

        <div className="p-3 bg-zinc-900 border border-zinc-700 rounded">
          <div className="text-sm text-zinc-400">Emergency</div>
          <div className="text-white">Know the site emergency plan, nearest hospital, and location of first aid kits and fire extinguishers.</div>
        </div>
      </section>

      <footer className="mt-6 text-sm text-zinc-500">
        <div>Last reviewed: <span className="font-mono">—</span></div>
      </footer>
    </div>
  );
}
