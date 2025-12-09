import React, { useEffect, useRef, useState } from "react";
import { InputField, SelectField } from "../components/Inputs";
import { Icons } from "../components/Icons";
import { parseStation } from "../utils/parseStation";
import { buildStabilizationReport } from "../utils/reportBuilder";
import { Report } from "../components/Report";
import { save, load } from "../utils/storage";

export function SoilCalcView() {
  const fileInputRef = useRef(null);

  const [segments, setSegments] = useState(() => load("soilSegments"));
  const [reports, setReports] = useState(() => load("reports"));

  const [current, setCurrent] = useState({
    job: "",
    location: "",
    material: "LIME",
    percent: 6,
    dryDensity: 35,
    startStation: "",
    endStation: "",
    length: "",
    width: "",
    depth: "",
    photo: null,
  });

  // Auto-calc length from station numbers
  useEffect(() => {
    if (current.startStation && current.endStation) {
      const start = parseStation(current.startStation);
      const end = parseStation(current.endStation);
      const dist = Math.abs(end - start);
      if (!isNaN(dist)) setCurrent((prev) => ({ ...prev, length: dist }));
    }
  }, [current.startStation, current.endStation]);

  const handlePhotoSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCurrent({
        ...current,
        photo: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const addSegment = () => {
    const id = crypto.randomUUID();
    const newSeg = { ...current, id };
    const updated = [...segments, newSeg];
    setSegments(updated);
    save("soilSegments", updated);

    // Build report
    const report = buildStabilizationReport({
      job: current.job,
      location: current.location,
      material: current.material,
      percent: current.percent,
      dryDensity: current.dryDensity,
      startStation: current.startStation,
      endStation: current.endStation,
      length: parseFloat(current.length),
      width: parseFloat(current.width),
      depth: parseFloat(current.depth),
    });

    const updatedReports = [...reports, report];
    setReports(updatedReports);
    save("reports", updatedReports);
  };

  const removeSegment = (id) => {
    const updated = segments.filter((s) => s.id !== id);
    setSegments(updated);
    save("soilSegments", updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-white uppercase tracking-tight">
        Soil Cement & Lime
      </h2>

      {/* Job + Location */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="JOB NAME / NUMBER"
          value={current.job}
          onChange={(v) => setCurrent({ ...current, job: v })}
        />
        <InputField
          label="LOCATION"
          value={current.location}
          onChange={(v) => setCurrent({ ...current, location: v })}
        />
      </div>

      {/* Material */}
      <SelectField
        label="MATERIAL"
        value={current.material}
        onChange={(v) => setCurrent({ ...current, material: v })}
        options={["CEMENT", "LIME"]}
      />

      {/* Percent + Density */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="PERCENTAGE"
          value={current.percent}
          onChange={(v) => setCurrent({ ...current, percent: v })}
        />
        <InputField
          label="DRY DENSITY (PCF)"
          value={current.dryDensity}
          onChange={(v) => setCurrent({ ...current, dryDensity: v })}
        />
      </div>

      {/* Stations */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="START STATION"
          value={current.startStation}
          onChange={(v) => setCurrent({ ...current, startStation: v })}
        />
        <InputField
          label="END STATION"
          value={current.endStation}
          onChange={(v) => setCurrent({ ...current, endStation: v })}
        />
      </div>

      {/* Dimensions */}
      <InputField
        label="CALCULATED LENGTH (FT)"
        value={current.length}
        onChange={(v) => setCurrent({ ...current, length: v })}
      />
      <InputField
        label="WIDTH (FT)"
        value={current.width}
        onChange={(v) => setCurrent({ ...current, width: v })}
      />
      <InputField
        label="DEPTH (IN)"
        value={current.depth}
        onChange={(v) => setCurrent({ ...current, depth: v })}
      />

      {/* Photo */}
      <button
        onClick={() => fileInputRef.current.click()}
        className="w-full py-3 border border-zinc-700 rounded-lg text-zinc-400"
      >
        <Icons.Camera size={18} /> Attach Photo
      </button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handlePhotoSelect}
      />

      {/* Add Segment */}
      <button
        onClick={addSegment}
        className="w-full bg-green-600 text-white py-4 rounded-lg font-black"
      >
        Add Section to List
      </button>

      {/* Report List */}
      {segments.length > 0 && (
        <div className="mt-6 space-y-6">
          {segments.map((seg) => {
            const report = buildStabilizationReport({
              job: seg.job,
              location: seg.location,
              material: seg.material,
              percent: seg.percent,
              dryDensity: seg.dryDensity,
              startStation: seg.startStation,
              endStation: seg.endStation,
              length: seg.length,
              width: seg.width,
              depth: seg.depth,
            });

            return (
              <div key={seg.id} className="border border-zinc-800 p-4 rounded-lg">
                <Report
                  data={report}
                  onSaveToggle={() => {}}
                />

                <button
                  onClick={() => removeSegment(seg.id)}
                  className="mt-2 text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
