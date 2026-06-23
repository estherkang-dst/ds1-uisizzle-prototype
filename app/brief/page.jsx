"use client";

import { useState } from "react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600&family=Source+Sans+3:wght@400;500;600&display=swap');
`;

const C = {
  bg: "#FEFCFA",
  bgSecondary: "#F5F4F1",
  bgHover: "#EBE9E5",
  border: "#D6D4D1",
  borderLight: "#E7E5E1",
  text: "#1C1A17",
  textSecondary: "#5D5B58",
  textTertiary: "#8A8884",
  accentOrange: "#FF8B2C",
  accentOrangeDark: "#CC6F23",
  actionBg: "#181817",
  accentGreen: "#CC6F23",
};

const s = {
  btnPrimary: { padding: "6px 16px", borderRadius: "6px", border: "none", backgroundColor: C.actionBg, color: "#fff", fontSize: "14px", fontWeight: 500, fontFamily: "'Source Sans 3', Helvetica, sans-serif", cursor: "pointer" },
  btnSecondary: { padding: "6px 16px", borderRadius: "6px", border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.text, fontSize: "14px", fontWeight: 500, fontFamily: "'Source Sans 3', Helvetica, sans-serif", cursor: "pointer" },
};

const briefHeaderStyle = { padding: "14px 24px", borderBottom: `1px solid ${C.borderLight}`, display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 };
const briefBadge = { width: "28px", height: "28px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Menlo, 'SF Mono', monospace", fontSize: "10px", fontWeight: 500 };

function AgentHeader({ onBack, badge, color, name, canvasOpen, onToggleCanvas, hasCanvas = true, loading = false, onReset }) {
  return (
    <>
      <div style={briefHeaderStyle}>
        <button onClick={onBack} title="Back to home" style={{ border: "none", background: "transparent", color: C.textSecondary, fontSize: "22px", lineHeight: 1, cursor: "pointer", padding: "0 4px", flexShrink: 0 }}>‹</button>
        <div style={{ ...briefBadge, backgroundColor: color + "18", color }}>{badge}</div>
        <span style={{ fontSize: "15px", fontWeight: 500, color: C.text, flex: 1, fontFamily: "'Urbanist', Arial, sans-serif" }}>DS-1 · {name}</span>
        {onReset && <button onClick={onReset} style={{ ...s.btnSecondary, color: C.textTertiary, fontSize: "13px" }}>Start over</button>}
        {hasCanvas && <button onClick={onToggleCanvas} style={s.btnSecondary}>{canvasOpen ? "Hide canvas" : "Show canvas"}</button>}
      </div>
      <div className={`spectrum-bar${loading ? " active" : ""}`} />
    </>
  );
}

function MarketerBar({ marketer }) {
  return (
    <div style={{ position: "relative", height: "36px", borderBottom: `1px solid ${C.border}`, backgroundColor: C.bgSecondary, display: "flex", alignItems: "center", paddingLeft: "20px", gap: "8px", flexShrink: 0 }}>
      <span style={{ fontSize: "12px", color: C.textTertiary, fontWeight: 500, letterSpacing: "0.3px", textTransform: "uppercase" }}>Marketer</span>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 10px", borderRadius: "6px", border: `1px solid ${C.border}`, backgroundColor: C.bg, fontFamily: "'Source Sans 3', Helvetica, sans-serif", fontSize: "13px", fontWeight: 500, color: C.text }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: C.accentOrange, flexShrink: 0 }} />
        {marketer}
        <span style={{ fontSize: "10px", color: C.textTertiary, marginLeft: "2px" }}>▾</span>
      </div>
    </div>
  );
}

const Chevron = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ transition: "transform 0.18s ease", transform: open ? "rotate(180deg)" : "rotate(0)" }}>
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// group: { label?, style: "bullet" | "numbered" | "path" | "url", items: string[] }
function GroupBlock({ group }) {
  const { label, style, items } = group;
  return (
    <div style={{ marginTop: label ? "14px" : "10px" }}>
      {label && <div style={{ fontSize: "13px", fontWeight: 600, color: C.text, marginBottom: "8px", fontFamily: "'Urbanist', Arial, sans-serif" }}>{label}</div>}
      {style === "numbered" && (
        <ol style={{ margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "5px" }}>
          {items.map((it, i) => <li key={i} style={{ fontSize: "13px", color: C.textSecondary, lineHeight: "1.5" }}>{it}</li>)}
        </ol>
      )}
      {(style === "path" || style === "url") && (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {items.map((it, i) => <div key={i} style={{ fontFamily: "Menlo, 'SF Mono', monospace", fontSize: "12.5px", color: style === "url" ? C.accentOrangeDark : C.textSecondary, padding: "7px 10px", borderRadius: "6px", border: `1px solid ${C.borderLight}`, backgroundColor: C.bgSecondary, lineHeight: "1.45", wordBreak: "break-word" }}>{it}</div>)}
        </div>
      )}
      {style === "bullet" && (
        <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
          {items.map((it, i) => <span key={i} style={{ fontFamily: "Menlo, 'SF Mono', monospace", fontSize: "12.5px", color: C.accentOrange, padding: "5px 10px", borderRadius: "6px", border: `1px solid ${C.accentOrange}40`, backgroundColor: C.accentOrange + "0a" }}>{it}</span>)}
        </div>
      )}
    </div>
  );
}

export default function AudienceBriefBuilder() {
  const DRAFT_SECTIONS = [
    {
      id: "searchlookalike", product: "Custom Search Lookalikes",
      targets: "Reaches people actively searching for matcha cafes and tennis in downtown NYC.",
      desc: "Targets people based on the brand and competitor keywords they search, drawn from a 2M+ opted-in panel across major search engines and retail search platforms.",
      groups: [
        { label: "Downtown NYC Matcha & Tennis Aficionados", style: "bullet", items: ["Matcha cafes Lower Manhattan", "Tennis clubs Downtown NYC", "Young professionals NYC wellness", "Best green tea shops Manhattan", "NYC tennis leagues under 35", "Trendy healthy spots NYC 2026", "Matcha health benefits athletes", "US Open tickets Manhattan", "Indoor tennis courts Downtown", "Organic matcha powder reviews"] },
        { label: "Manhattan Youth Wellness & Active Lifestyle", style: "bullet", items: ["Healthy living Downtown NYC", "Tennis lessons for young adults", "Matcha latte recipes 2026", "NYC fitness trends under 35", "Active social groups Manhattan", "Tennis watch parties NYC", "Japanese matcha tea brands", "Wellness activities Lower Manhattan", "Trendy sports gear NYC", "Young professionals social clubs Manhattan"] },
      ],
    },
    {
      id: "prebuilt", product: "Pre-built Audiences",
      targets: "Ready-to-activate audiences for tennis players and tea drinkers, skewing Gen Z.",
      desc: "Off-the-shelf audiences from a catalog of 10,000+, built on event-level behavioral, demographic, search, and partner data — no setup required.",
      groups: [{ label: "Recommended for this campaign", style: "bullet", items: ["Tennis Players", "Olympic Tennis Fans", "Tea Drinkers", "Gen Z Audience", "Active Lifestyle Enthusiasts"] }],
    },
    {
      id: "custombuilt", product: "Custom Built Audiences",
      targets: "A tailored Gen Z matcha-and-tennis audience built from five behavioral segments.",
      desc: "Combines existing pre-built audiences with and/or/not logic into one custom audience — no first-party data required.",
      groups: [{ label: "Custom Built Gen Z Matcha & Tennis Enthusiasts", style: "bullet", items: ["Tennis Players", "Olympic Tennis Fans", "Tea Drinkers", "Gen Z Audience", "Active Lifestyle Enthusiasts"] }],
    },
    {
      id: "customurl", product: "Custom Built URL Audiences",
      targets: "Models new users from visitors to NYC food, design, and lifestyle sites.",
      desc: "Seeds a model with the people who visit chosen web pages, then finds a new set with similar online behavior. Available ID-based or ID-free®.",
      groups: [{ label: "Custom Built Downtown NYC Matcha Tennis URLs", style: "url", items: ["www.6sqft.com", "www.bonappetit.com", "www.food52.com"] }],
    },
    {
      id: "predictivettd", product: "Predictive Contextual via The Trade Desk",
      targets: "Privacy-safe contextual placements with no user tracking, activated in TTD.",
      desc: "First-to-market ID-free® contextual via The Trade Desk. Activate by selecting 'Dstillery ID-Free' in the TTD Contextual Marketplace.",
      groups: [{ label: null, style: "path", items: ["ID-free > Consumer > Healthcare > Retired Wealthy Assisted Living Researchers", "ID-free > Lifestyle > Lifestage > Elderly > Senior Living Center Researchers", "ID-free > Consumer > Retail > Home > Home Design and Living Publication Readers"] }],
    },
    {
      id: "customai", product: "Custom AI Audiences",
      targets: "A lookalike model trained on your brand's own first-party customer data.",
      desc: "Learns your customers' DNA across thousands of behavioral attributes and refreshes every user in the audience every 24 hours.",
      groups: [{ label: "Gather your data via any of these:", style: "numbered", items: ["Dstillery pixel(s) placed on any active page", "One-time pull of a Trade Desk Conversion Details Report", "CRM list(s) sent over via LiveRamp"] }],
    },
  ];

  const DEFAULT_IDS = ["searchlookalike", "prebuilt", "custombuilt", "customurl", "predictivettd", "customai"];

  const ADDABLE = [
    { id: "geo", product: "Custom Geo Audiences", targets: "Reaches people based on the places they physically visit.", desc: "Audiences built from location signals, geo-fencing, and point-of-interest visits.", groups: [{ label: null, style: "bullet", items: ["Specialty Coffee Shop Visitors", "Wellness Studio Visitors"] }] },
    { id: "retarget", product: "Retargeting Pools", targets: "Re-engages people who already visited your site.", desc: "Audience pools built from pixel and site-activity data for retargeting.", groups: [{ label: null, style: "bullet", items: ["Site Visitors — 30 day", "Cart Abandoners"] }] },
    { id: "seasonal", product: "Seasonal Intent Audiences", targets: "Targets time-sensitive, seasonal purchase intent.", desc: "Time-sensitive audiences modeled around seasonal purchase behavior.", groups: [{ label: null, style: "bullet", items: ["Summer Iced Beverage Intenders", "Back-to-Routine Shoppers"] }] },
  ];

  const [brandName] = useState("Matcha & Tennis Campaign");
  const [sections, setSections] = useState(DRAFT_SECTIONS.filter(x => DEFAULT_IDS.includes(x.id)));
  const [showAdd, setShowAdd] = useState(false);
  const [exported, setExported] = useState(false);
  const [canvasOpen, setCanvasOpen] = useState(true);
  const [expanded, setExpanded] = useState({}); // id -> bool, default collapsed

  const [dragId, setDragId] = useState(null);
  const [overId, setOverId] = useState(null);

  const toggle = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  const setAll = (val) => setExpanded(sections.reduce((acc, sec) => { acc[sec.id] = val; return acc; }, {}));
  const allOpen = sections.length > 0 && sections.every(sec => expanded[sec.id]);

  const removeSection = (id) => setSections(prev => prev.filter(sec => sec.id !== id));
  const addSection = (sec) => { setSections(prev => [...prev, sec]); setShowAdd(false); };

  const reorder = (fromId, toId) => {
    setSections(prev => {
      const from = prev.findIndex(x => x.id === fromId);
      const to = prev.findIndex(x => x.id === toId);
      if (from < 0 || to < 0 || from === to) return prev;
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };

  const handleExport = () => { setExported(true); setTimeout(() => setExported(false), 2500); };

  const [command, setCommand] = useState("");
  const [cmdLog, setCmdLog] = useState([]);
  const reset = () => { setSections(DRAFT_SECTIONS.filter(x => DEFAULT_IDS.includes(x.id))); setCmdLog([]); setShowAdd(false); setExpanded({}); };

  const findSectionId = (text, exclude = []) => {
    const t = text.toLowerCase();
    const priority = [
      ["customurl", ["url"]],
      ["custombuilt", ["custom built", "compound", "boolean"]],
      ["predictivettd", ["predictive", "contextual", "trade desk", "ttd"]],
      ["customai", ["custom ai", " ai ", "ai audience", "first-party", "1pd"]],
      ["searchlookalike", ["search", "lookalike", "keyword"]],
      ["prebuilt", ["prebuilt", "pre-built", "pre built", "off-the-shelf", "off the shelf"]],
    ];
    for (const [id, kws] of priority) {
      if (exclude.includes(id)) continue;
      if (!sections.find(sec => sec.id === id)) continue;
      if (kws.some(k => t.includes(k.trim()))) return id;
    }
    return null;
  };

  const runCommand = (raw) => {
    const text = (typeof raw === "string" ? raw : command).trim();
    if (!text) return;
    const say = (ok, msg) => setCmdLog(prev => [...prev, { role: "user", text }, { role: "ds1", ok, text: msg }]);
    const t = text.toLowerCase();
    const idA = findSectionId(t);
    if (!idA) { say(false, "I couldn't tell which section you meant. Try naming it, e.g. \"move Custom AI to the top\"."); setCommand(""); return; }
    const nameA = sections.find(sec => sec.id === idA).product;
    setSections(prev => {
      const arr = [...prev];
      const from = arr.findIndex(sec => sec.id === idA);
      const [item] = arr.splice(from, 1);
      if (/\b(remove|delete|drop|take out)\b/.test(t)) { say(true, `Removed ${nameA}.`); return arr; }
      if (/\b(after|below|under)\b/.test(t)) { const idB = findSectionId(t, [idA]); if (idB) { const bi = arr.findIndex(sec => sec.id === idB); arr.splice(bi + 1, 0, item); say(true, `Moved ${nameA} after ${sections.find(sec => sec.id === idB).product}.`); return arr; } }
      if (/\b(before|above|over)\b/.test(t)) { const idB = findSectionId(t, [idA]); if (idB) { const bi = arr.findIndex(sec => sec.id === idB); arr.splice(bi, 0, item); say(true, `Moved ${nameA} before ${sections.find(sec => sec.id === idB).product}.`); return arr; } }
      if (/\b(top|first|beginning|start)\b/.test(t)) { arr.unshift(item); say(true, `Moved ${nameA} to the top.`); return arr; }
      if (/\b(bottom|last|end)\b/.test(t)) { arr.push(item); say(true, `Moved ${nameA} to the bottom.`); return arr; }
      if (/\bup\b/.test(t)) { arr.splice(Math.max(0, from - 1), 0, item); say(true, `Moved ${nameA} up.`); return arr; }
      if (/\bdown\b/.test(t)) { arr.splice(Math.min(arr.length, from + 1), 0, item); say(true, `Moved ${nameA} down.`); return arr; }
      arr.splice(from, 0, item);
      say(false, `Got the section (${nameA}) but not the action. Try "to the top", "to the bottom", or "after Pre-built".`);
      return arr;
    });
    setCommand("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", backgroundColor: C.bg }}>
      <style>{FONTS}</style>
      <style>{`
        * { box-sizing: border-box; }
        body { font-family: 'Source Sans 3', Helvetica, sans-serif; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 999px; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.textTertiary}; }
        @keyframes spectrumSlide { from { background-position: 200% center; } to { background-position: -200% center; } }
        @keyframes expandIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        .spectrum-bar { height: 3px; flex-shrink: 0; background: linear-gradient(90deg, #FFFFFF 0%, #FF8B2C 28%, #FF2A1D 50%, #AA004E 75%, #6B0031 100%); }
        .spectrum-bar.active { background-size: 200% 100%; animation: spectrumSlide 1.8s linear infinite; }
        .brief-card:hover .grip { color: ${C.textSecondary}; }
        .card-body { animation: expandIn 0.18s ease-out; }
      `}</style>

      <div className="spectrum-bar" />
      <AgentHeader badge="AB" color={C.accentOrange} name="Audience brief" canvasOpen={canvasOpen} onToggleCanvas={() => setCanvasOpen(!canvasOpen)} onReset={reset} onBack={() => {}} />
      <MarketerBar marketer="Matchaful" />

      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* LEFT — chat */}
        <div style={{ width: canvasOpen ? "380px" : "100%", flexShrink: 0, borderRight: canvasOpen ? `1px solid ${C.borderLight}` : "none", display: "flex", flexDirection: "column", backgroundColor: canvasOpen ? C.bgSecondary : C.bg }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px", maxWidth: canvasOpen ? "none" : "720px", width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
            <div style={{ fontSize: "14px", color: C.textSecondary, lineHeight: "1.6", padding: "12px 14px", borderRadius: "12px", backgroundColor: C.bg, border: `1px solid ${C.borderLight}`, marginBottom: "12px" }}>
              I've drafted a client-ready brief on the canvas with {sections.length} products. Click any section to expand it, drag the cards to reorder, remove what you don't need, or just tell me what to change.
            </div>
            {cmdLog.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: "10px" }}>
                {m.role === "user" ? (
                  <div style={{ maxWidth: "88%", fontSize: "14px", color: C.text, backgroundColor: C.bgHover, padding: "10px 14px", borderRadius: "14px 14px 2px 14px", lineHeight: "1.5" }}>{m.text}</div>
                ) : (
                  <div style={{ display: "flex", gap: "8px", maxWidth: "90%" }}>
                    <span style={{ fontSize: "13px", flexShrink: 0, marginTop: "2px", color: m.ok ? C.accentGreen : C.textTertiary }}>{m.ok ? "✓" : "ⓘ"}</span>
                    <div style={{ fontSize: "14px", color: C.textSecondary, lineHeight: "1.5" }}>{m.text}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ padding: "0 16px 4px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "14px", fontSize: "13px", fontWeight: 500, fontFamily: "Menlo, 'SF Mono', monospace", color: C.accentOrange, backgroundColor: C.accentOrange + "12", border: `1px solid ${C.accentOrange}40` }}>Brief · {sections.length} sections</span>
          </div>
          <div style={{ padding: "14px", borderTop: `1px solid ${C.borderLight}` }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "flex-end", padding: "6px 6px 6px 12px", borderRadius: "12px", border: `1px solid ${C.border}`, backgroundColor: C.bg }}>
              <textarea value={command} onChange={(e) => setCommand(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); runCommand(); } }} placeholder="Message audience brief…" rows={1} style={{ flex: 1, border: "none", outline: "none", backgroundColor: "transparent", fontSize: "14px", fontFamily: "'Source Sans 3', Helvetica, sans-serif", color: C.text, resize: "none", lineHeight: "1.5", padding: "4px 0" }} />
              <button onClick={() => runCommand()} style={{ width: "30px", height: "30px", borderRadius: "8px", border: "none", cursor: "pointer", backgroundColor: command.trim() ? C.text : C.bgHover, color: command.trim() ? "#fff" : C.textTertiary, fontSize: "15px", flexShrink: 0 }}>↑</button>
            </div>
          </div>
        </div>

        {/* RIGHT — live document */}
        {canvasOpen && (
          <div style={{ flex: 1, overflowY: "auto", padding: "32px clamp(20px, 4vw, 56px)", minWidth: 0 }}>
            <div style={{ maxWidth: "660px", margin: "0 auto" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "18px" }}>
                <div>
                  <h1 style={{ fontSize: "26px", fontWeight: 500, color: C.text, margin: 0, fontFamily: "'Urbanist', Arial, sans-serif" }}>{brandName} × Dstillery</h1>
                  <div style={{ fontSize: "14px", color: C.textTertiary, marginTop: "4px" }}>Audience brief · {sections.length} product{sections.length !== 1 ? "s" : ""} · drag to reorder, click to expand</div>
                </div>
                {exported ? (
                  <span style={{ fontSize: "14px", fontWeight: 500, color: C.accentGreen, flexShrink: 0 }}>✓ Exported as PDF</span>
                ) : (
                  <button onClick={handleExport} style={{ ...s.btnPrimary, backgroundColor: C.accentOrange, flexShrink: 0 }}>Export PDF</button>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "12px" }}>
                <button onClick={() => setAll(!allOpen)} style={{ border: "none", background: "transparent", color: C.textSecondary, fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif", padding: "4px 2px" }}>
                  {allOpen ? "Collapse all" : "Expand all"}
                </button>
              </div>

              {sections.map((sec) => {
                const isOpen = !!expanded[sec.id];
                const isDragging = dragId === sec.id;
                const isOver = overId === sec.id && dragId !== sec.id;
                return (
                  <div
                    key={sec.id}
                    className="brief-card"
                    draggable
                    onDragStart={(e) => { setDragId(sec.id); e.dataTransfer.effectAllowed = "move"; }}
                    onDragOver={(e) => { e.preventDefault(); if (overId !== sec.id) setOverId(sec.id); }}
                    onDrop={(e) => { e.preventDefault(); reorder(dragId, sec.id); setDragId(null); setOverId(null); }}
                    onDragEnd={() => { setDragId(null); setOverId(null); }}
                    style={{
                      marginBottom: "10px", border: `1px solid ${isOver ? C.accentOrange : C.border}`, borderRadius: "12px",
                      backgroundColor: C.bg, opacity: isDragging ? 0.4 : 1,
                      boxShadow: isOver ? `0 -2px 0 ${C.accentOrange}, 0 4px 18px rgba(0,0,0,0.06)` : "none",
                      transition: "box-shadow 0.15s ease, opacity 0.15s ease, border-color 0.15s ease",
                    }}
                  >
                    {/* Header row — click to toggle */}
                    <div onClick={() => toggle(sec.id)} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 16px", cursor: "pointer" }}>
                      <span className="grip" title="Drag to reorder" onClick={(e) => e.stopPropagation()} style={{ cursor: "grab", color: C.textTertiary, fontSize: "15px", userSelect: "none", flexShrink: 0 }}>⠿</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "15px", fontWeight: 600, color: C.text, fontFamily: "'Urbanist', Arial, sans-serif" }}>{sec.product}</div>
                        <div style={{ fontSize: "13px", color: C.textSecondary, marginTop: "3px", lineHeight: "1.45" }}>{sec.targets}</div>
                      </div>
                      <span style={{ color: C.textTertiary, display: "flex", alignItems: "center", flexShrink: 0 }}><Chevron open={isOpen} /></span>
                      <button onClick={(e) => { e.stopPropagation(); removeSection(sec.id); }} title="Remove" style={{ width: "28px", height: "26px", borderRadius: "7px", border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.textSecondary, cursor: "pointer", fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>×</button>
                    </div>

                    {/* Expanded body */}
                    {isOpen && (
                      <div className="card-body" style={{ padding: "0 18px 18px 41px" }}>
                        <div style={{ fontSize: "13px", color: C.textTertiary, lineHeight: "1.6", paddingLeft: "12px", borderLeft: `2px solid ${C.borderLight}` }}>
                          <span style={{ fontWeight: 600, color: C.textSecondary }}>How it works · </span>{sec.desc}
                        </div>
                        {sec.groups.map((g, gi) => <GroupBlock key={gi} group={g} />)}
                      </div>
                    )}
                  </div>
                );
              })}

              <div style={{ position: "relative", marginTop: "8px" }}>
                <button onClick={() => setShowAdd(!showAdd)} style={{ padding: "10px 16px", borderRadius: "8px", border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.textSecondary, cursor: "pointer", fontSize: "14px", fontWeight: 500, fontFamily: "'Source Sans 3', Helvetica, sans-serif" }}>+ Add product</button>
                {showAdd && (
                  <div style={{ marginTop: "8px", border: `1px solid ${C.border}`, borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                    {ADDABLE.filter(a => !sections.find(s2 => s2.id === a.id)).map(a => (
                      <div key={a.id} onClick={() => addSection(a)} style={{ padding: "12px 16px", borderBottom: `1px solid ${C.borderLight}`, cursor: "pointer", backgroundColor: C.bg }}>
                        <div style={{ fontSize: "14px", fontWeight: 500, color: C.text }}>{a.product}</div>
                        <div style={{ fontSize: "13px", color: C.textTertiary, marginTop: "2px" }}>{a.desc}</div>
                      </div>
                    ))}
                    {ADDABLE.filter(a => !sections.find(s2 => s2.id === a.id)).length === 0 && (
                      <div style={{ padding: "14px 16px", fontSize: "14px", color: C.textTertiary, fontStyle: "italic", backgroundColor: C.bg }}>All recommended products are already in the brief.</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
