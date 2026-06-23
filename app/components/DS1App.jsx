"use client";

import { useState, useEffect } from "react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600&family=Source+Sans+3:wght@400;500;600&display=swap');
`;

const C = {
  bg: "#FEFCFA",          // warm white — not pure #FFF
  bgSecondary: "#F5F4F1",
  bgSidebar: "#F0EEE9",
  bgHover: "#EBE9E5",
  bgCard: "#FEFCFA",
  border: "#D6D4D1",
  borderLight: "#E7E5E1",
  text: "#1C1A17",        // warm near-black — not pure #000
  textSecondary: "#5D5B58",
  textTertiary: "#8A8884",
  // brand primary
  accentOrange: "#FF8B2C",
  accentOrangeDark: "#CC6F23",
  accentRed: "#FF2A1D",
  accentRedDark: "#CC2217",
  accentAmaranth: "#AA004E",
  accentCrimson: "#6B0031",
  // action button
  actionBg: "#181817",
  // spectrum gradient
  spectrum: "linear-gradient(90deg, #FFFFFF 0%, #FF8B2C 28%, #FF2A1D 50%, #AA004E 75%, #6B0031 100%)",
  // map old accent names → new palette so nothing breaks
  accentBlue: "#FF8B2C",
  accentGreen: "#CC6F23",
  accentPurple: "#AA004E",
  accentPink: "#AA004E",
};

const AGENCIES = [
  { id: "dstillery", name: "Dstillery", initials: "Ds", color: C.accentOrange, parent: "Dstillery", marketers: ["NSM Demo", "Esther Test Marketer", "Fjällräven", "Matchaful"] },
  { id: "360i", name: "360i NY", initials: "36", color: C.accentRed, parent: "360i NY", marketers: ["360i NY", "American Eagle Outfitters", "DKNY", "Pirates Booty", "Purell"] },
  { id: "keynes", name: "Keynes", initials: "Ke", color: C.accentAmaranth, parent: "Keynes", marketers: ["Keynes CPG", "Keynes Travel & Hospitality", "Keynes Retail"] },
];

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SUBAGENT_VIEWS = ["explorer", "domainseeded", "brief", "pixel"];

function MarketerBar({ agency, marketer, onSelect }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", height: "36px", borderBottom: `1px solid ${C.border}`, backgroundColor: C.bgSecondary, display: "flex", alignItems: "center", paddingLeft: "20px", gap: "8px", flexShrink: 0 }}>
      <span style={{ fontSize: "12px", color: C.textTertiary, fontWeight: 500, letterSpacing: "0.3px", textTransform: "uppercase" }}>Marketer</span>
      <button
        onClick={() => setOpen(!open)}
        style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 10px", borderRadius: "6px", border: `1px solid ${C.border}`, backgroundColor: C.bg, cursor: "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif", fontSize: "13px", fontWeight: 500, color: C.text }}
      >
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: agency.color, flexShrink: 0 }} />
        {marketer}
        <span style={{ fontSize: "10px", color: C.textTertiary, marginLeft: "2px" }}>▾</span>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: "100px", backgroundColor: C.bg, border: `1px solid ${C.border}`, borderRadius: "10px", boxShadow: "0 6px 24px rgba(0,0,0,0.1)", zIndex: 100, minWidth: "200px", overflow: "hidden" }}>
          <div style={{ padding: "8px 14px 6px", fontSize: "11px", fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: `1px solid ${C.borderLight}` }}>{agency.name}</div>
          {[agency.parent, ...agency.marketers].filter((m, i, arr) => arr.indexOf(m) === i).map(m => (
            <div key={m} onClick={() => { onSelect(m); setOpen(false); }} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 14px", cursor: "pointer", fontSize: "14px", color: C.text, backgroundColor: m === marketer ? C.bgHover : "transparent" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: m === marketer ? agency.color : C.border, flexShrink: 0 }} />
              {m}
              {m === marketer && <span style={{ color: C.accentOrangeDark, fontSize: "13px", marginLeft: "auto" }}>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DS1App() {
  const [activeView, setActiveView] = useState("home");
  const [activeAgency, setActiveAgency] = useState(AGENCIES[0]);
  const [selectedMarketer, setSelectedMarketer] = useState(AGENCIES[0].parent);
  const [agencyDropdownOpen, setAgencyDropdownOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [navPayload, setNavPayload] = useState(null);

  const navigate = (view, payload = null) => { setNavPayload(payload); setActiveView(view); };

  const navItems = [
    { id: "home", label: "Home", icon: "⌂" },
    { id: "agents", label: "Agents", icon: "◇" },
    { id: "projects", label: "Projects", icon: "◳" },
    { id: "history", label: "History", icon: "↻" },
    { id: "settings", label: "Settings", icon: "✦" },
    ...(activeAgency.id === "dstillery" ? [{ id: "admin", label: "Admin", icon: "⚙" }] : []),
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <style>{FONTS}</style>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spectrumSlide {
          from { background-position: 200% center; }
          to { background-position: -200% center; }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 999px; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.textTertiary}; }
        body {
          font-family: 'Source Sans 3', Helvetica, sans-serif;
          font-size: 15px;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Urbanist', Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .spectrum-bar {
          height: 3px;
          flex-shrink: 0;
          background: linear-gradient(90deg, #FFFFFF 0%, #FF8B2C 28%, #FF2A1D 50%, #AA004E 75%, #6B0031 100%);
        }
        .spectrum-bar.active {
          background-size: 200% 100%;
          animation: spectrumSlide 1.8s linear infinite;
        }
      `}</style>

      {/* Spectrum brand bar */}
      <div className="spectrum-bar" />

      <div style={{ ...s.shell, flex: 1, height: 0 }}>
      {/* Sidebar */}
      <aside style={{ ...s.sidebar, width: collapsed ? "60px" : "260px", minWidth: collapsed ? "60px" : "260px" }}>
        {/* Logo + collapse toggle */}
        <div style={{ ...s.sidebarLogo, justifyContent: collapsed ? "center" : "space-between" }}>
          <div style={s.logoMark}><span style={s.logoText}>{collapsed ? "D" : "DS-1"}</span></div>
          {!collapsed && (
            <button
              onClick={() => { setCollapsed(true); setAgencyDropdownOpen(false); }}
              style={s.collapseBtn}
              title="Collapse sidebar"
            >‹</button>
          )}
        </div>

        {/* Agency Switcher */}
        <div style={{ padding: collapsed ? "0 8px" : "0 12px", marginBottom: "24px" }}>
          {collapsed ? (
            <div
              style={{ ...s.agencyAvatarCollapsed, backgroundColor: activeAgency.color + "18", color: activeAgency.color }}
              onClick={() => setCollapsed(false)}
              title={activeAgency.name}
            >
              {activeAgency.initials}
            </div>
          ) : (
            <>
              <div
                style={s.agencySwitcher}
                onClick={() => setAgencyDropdownOpen(!agencyDropdownOpen)}
              >
                <div style={{
                  ...s.agencyAvatar,
                  backgroundColor: activeAgency.color + "18",
                  color: activeAgency.color,
                }}>
                  {activeAgency.initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={s.agencyName}>{activeAgency.name}</div>
                  <div style={s.agencyLabel}>Workspace</div>
                </div>
                <span style={{ color: C.textTertiary, transition: "transform 0.2s", transform: agencyDropdownOpen ? "rotate(180deg)" : "rotate(0)" }}>
                  <ChevronDown />
                </span>
              </div>

              {agencyDropdownOpen && (
                <div style={s.dropdown}>
                  <div style={s.dropdownHeader}>Switch workspace</div>
                  {AGENCIES.map((agency) => (
                    <div
                      key={agency.id}
                      style={{
                        ...s.dropdownItem,
                        backgroundColor: agency.id === activeAgency.id ? C.bgHover : "transparent",
                      }}
                      onClick={() => {
                        setActiveAgency(agency);
                        setSelectedMarketer(agency.marketers[0]);
                        setAgencyDropdownOpen(false);
                        setActiveView("home");
                      }}
                    >
                      <div style={{
                        ...s.agencyAvatarSmall,
                        backgroundColor: agency.color + "18",
                        color: agency.color,
                      }}>
                        {agency.initials}
                      </div>
                      <span style={s.dropdownItemText}>{agency.name}</span>
                      {agency.id === activeAgency.id && (
                        <span style={{ color: C.accentOrangeDark, fontSize: "15px", marginLeft: "auto" }}>✓</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Nav */}
        <nav style={{ ...s.nav, padding: collapsed ? "0 8px" : "0 12px" }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              style={{
                ...s.navItem,
                justifyContent: collapsed ? "center" : "flex-start",
                padding: collapsed ? "8px" : "8px 12px",
                backgroundColor: activeView === item.id ? C.bgHover : hoveredNav === item.id ? C.bgHover + "88" : "transparent",
                color: activeView === item.id ? C.text : C.textSecondary,
                fontWeight: activeView === item.id ? 600 : 400,
              }}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
              onClick={() => setActiveView(item.id)}
              title={collapsed ? item.label : undefined}
            >
              <span style={{ fontSize: "16px", width: "24px", textAlign: "center" }}>{item.icon}</span>
              {!collapsed && item.label}
            </button>
          ))}
        </nav>

        {/* Expand button when collapsed */}
        {collapsed && (
          <div style={{ padding: "12px 8px" }}>
            <button
              onClick={() => setCollapsed(false)}
              style={{ ...s.collapseBtn, width: "100%", fontSize: "15px" }}
              title="Expand sidebar"
            >›</button>
          </div>
        )}

        {/* Sidebar footer */}
        <div style={{ ...s.sidebarFooter, justifyContent: collapsed ? "center" : "flex-start" }}>
          <div style={{ ...s.statusRow, justifyContent: collapsed ? "center" : "flex-start" }}>
            <div style={s.statusDot} />
            {!collapsed && <span style={{ fontSize: "13px", color: C.textTertiary }}>Connected</span>}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={s.main} key={`${activeAgency.id}-${activeView}`}>
        {SUBAGENT_VIEWS.includes(activeView) && (
          <MarketerBar agency={activeAgency} marketer={selectedMarketer} onSelect={setSelectedMarketer} />
        )}
        {activeView === "home" && <HomeView agency={activeAgency} onNavigate={navigate} />}
        {activeView === "agents" && <AgentsLibrary onNavigate={navigate} />}
        {activeView === "tasks" && <TasksPage onNavigate={navigate} />}
        {activeView === "projects" && <ProjectsView agency={activeAgency} onNavigate={navigate} />}
        {activeView === "discover" && <DiscoverView onNavigate={navigate} />}
        {activeView === "build" && <BuildView onNavigate={navigate} />}
        {activeView === "explorer" && <AudienceExplorerChat onBack={() => setActiveView("home")} initialQuery={navPayload} marketer={selectedMarketer} />}
        {activeView === "domainseeded" && <DomainSeededCanvas onBack={() => setActiveView("home")} marketer={selectedMarketer} />}
        {activeView === "brief" && <AudienceBriefBuilder onBack={() => setActiveView("home")} marketer={selectedMarketer} />}
        {activeView === "pixel" && <PixelCreator onBack={() => setActiveView("home")} marketer={selectedMarketer} />}
        {activeView === "history" && <HistoryView agency={activeAgency} onNavigate={navigate} />}
        {activeView === "settings" && <SettingsView onNavigate={navigate} />}
        {activeView === "admin" && <AdminView agency={activeAgency} onNavigate={navigate} />}
      </main>
      </div>
    </div>
  );
}

function AgentsLibrary({ onNavigate }) {
  const [search, setSearch] = useState("");
  const [customAgents, setCustomAgents] = useState([]);
  const [showBuilder, setShowBuilder] = useState(false);

  const AGENTS = [
    { id: "explore", title: "Find prebuilt audiences", desc: "Search Dstillery's catalog of 10,000+ ready-to-activate audiences by topic, vertical, or behavior.", icon: "◎", color: C.accentBlue, group: "Discover", route: "explorer" },
    { id: "brief", title: "Generate an audience brief", desc: "Draft a client-ready brief with recommended products you can edit, reorder, and export.", icon: "◫", color: C.accentOrange, group: "Discover", route: "brief" },
    { id: "segrank", title: "SegRank", desc: "Rank and compare audience segments by reach, relevance, and performance potential.", icon: "▦", color: C.accentPurple, group: "Discover" },
    { id: "persona", title: "Persona Insights Deck", desc: "Generate a client-ready deck profiling an audience's demographics and top behaviors.", icon: "◰", color: C.accentBlue, group: "Discover" },
    { id: "lift", title: "Predictive Lift Analysis", desc: "Estimate the incremental lift a Dstillery audience would drive for your campaign.", icon: "↗", color: C.accentPurple, group: "Discover" },
    { id: "domainseeded", title: "Build a domain seeded audience", desc: "Pick seed domains and let DS-1 model an audience from shared visitor behavior.", icon: "⊞", color: C.accentGreen, group: "Build", route: "domainseeded" },
    { id: "pixel", title: "Create a pixel", desc: "Generate a tracking pixel and its HTML/JS tags to build first-party audiences.", icon: "◈", color: C.accentPink, group: "Build", route: "pixel" },
    { id: "search", title: "Search Audience", desc: "Describe your ideal audience in plain language and get matched segments to refine.", icon: "⌕", color: C.accentBlue, group: "Build" },
    { id: "compound", title: "Build a compound audience", desc: "Combine segments with and/or/not boolean logic into one custom audience.", icon: "⊕", color: C.accentGreen, group: "Build" },
    { id: "partnership", title: "Partnership Audience Search", desc: "Search partner data sets across Auto, Entertainment, and CPG to reach niche users.", icon: "⊟", color: C.accentOrange, group: "Build" },
    { id: "syndicate", title: "Syndicate", desc: "Push an audience to The Trade Desk, DV360, Amazon, or the LiveRamp marketplace.", icon: "↗", color: C.accentPink, group: "Activate" },
    { id: "report", title: "Daily Client Activity Report", desc: "Pull a daily report of audience activity, syndications, and campaign performance.", icon: "▤", color: C.accentPurple, group: "Activate" },
  ];

  const allAgents = [...customAgents, ...AGENTS];
  const q = search.toLowerCase().trim();
  const filtered = q ? allAgents.filter(a => a.title.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q)) : allAgents;

  return (
    <div style={s.content}>
      <Breadcrumb onNavigate={onNavigate} current="Agents" />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", maxWidth: "720px", animation: "fadeUp 0.5s ease-out", marginBottom: "20px" }}>
        <div style={{ flex: "1 1 240px" }}>
          <h1 style={s.heading}>All agents</h1>
          <p style={s.subheading}>Every DS-1 agent, plus any workflows you build yourself.</p>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "flex-end", marginLeft: "auto" }}>
          <button disabled style={{ whiteSpace: "nowrap", padding: "9px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: 500, border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.textTertiary, cursor: "not-allowed", fontFamily: "'Source Sans 3', Helvetica, sans-serif" }}>Build your own (coming soon)</button>
          <a href="https://dstillery.com" target="_blank" rel="noopener noreferrer" style={{ whiteSpace: "nowrap", padding: "9px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: 500, border: "none", backgroundColor: C.actionBg, color: "#fff", cursor: "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif", textDecoration: "none" }}>MCP Connection</a>
        </div>
      </div>

      {/* Search */}
      <div style={{ position: "relative", maxWidth: "720px", marginBottom: "24px", animation: "fadeUp 0.5s ease-out", animationDelay: "0.04s", animationFillMode: "both" }}>
        <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: C.textTertiary, fontSize: "15px" }}>⌕</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search agents by name or what they do..."
          style={{ width: "100%", padding: "12px 16px 12px 40px", borderRadius: "10px", border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.text, fontSize: "15px", fontFamily: "'Source Sans 3', Helvetica, sans-serif", outline: "none", boxSizing: "border-box" }}
        />
      </div>

      {filtered.length === 0 ? (
        <div style={{ maxWidth: "720px", padding: "24px", textAlign: "center", fontSize: "15px", color: C.textTertiary, fontStyle: "italic" }}>
          No agents match "{search}".
        </div>
      ) : (
        <div style={{ maxWidth: "720px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", animation: "fadeUp 0.5s ease-out", animationDelay: "0.08s", animationFillMode: "both" }}>
          {filtered.map((a) => (
            <button
              key={a.id}
              onClick={() => a.route && onNavigate(a.route)}
              style={{
                display: "flex", alignItems: "flex-start", gap: "12px",
                padding: "16px", borderRadius: "10px", textAlign: "left",
                border: `1px solid ${C.border}`, backgroundColor: C.bg,
                cursor: a.route ? "pointer" : "default", fontFamily: "'Source Sans 3', Helvetica, sans-serif",
                transition: "all 0.15s ease", opacity: a.route || a.custom ? 1 : 0.7,
              }}
              onMouseEnter={(e) => { if (a.route || a.custom) e.currentTarget.style.backgroundColor = C.bgSecondary; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = C.bg; }}
            >
              <div style={{ width: "34px", height: "34px", borderRadius: "8px", backgroundColor: a.color + "18", color: a.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", flexShrink: 0 }}>{a.icon}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: "15px", fontWeight: 500, color: C.text, display: "flex", alignItems: "center", gap: "6px" }}>
                  {a.title}
                  {a.custom && <span style={{ fontSize: "10px", fontWeight: 500, color: C.accentPurple, backgroundColor: C.accentPurple + "16", padding: "1px 6px", borderRadius: "3px" }}>Custom</span>}
                  {!a.route && !a.custom && <span style={{ fontSize: "10px", fontWeight: 500, color: C.textTertiary, backgroundColor: C.bgHover, padding: "1px 6px", borderRadius: "3px" }}>Soon</span>}
                </div>
                <div style={{ fontSize: "13px", color: C.textTertiary, marginTop: "3px", lineHeight: "1.5" }}>{a.desc}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {showBuilder && <WorkflowBuilderModal agents={AGENTS} onClose={() => setShowBuilder(false)} onCreate={(wf) => { setCustomAgents(prev => [wf, ...prev]); setShowBuilder(false); }} />}
    </div>
  );
}

function WorkflowBuilderModal({ agents, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [steps, setSteps] = useState([]);
  const [color, setColor] = useState(C.accentPurple);

  const colors = [C.accentPurple, C.accentBlue, C.accentGreen, C.accentOrange, C.accentPink, C.accentRed];
  const canCreate = name.trim() && steps.length > 0;

  const toggleStep = (id) => setSteps(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const moveStep = (idx, dir) => setSteps(prev => { const a = [...prev]; const t = idx + dir; if (t < 0 || t >= a.length) return prev; [a[idx], a[t]] = [a[t], a[idx]]; return a; });

  const create = () => {
    onCreate({
      id: "custom-" + Date.now(),
      title: name.trim(),
      desc: desc.trim() || `Custom workflow: ${steps.map(id => agents.find(a => a.id === id)?.title).filter(Boolean).join(" → ")}`,
      icon: "✦", color, custom: true, route: null,
    });
  };

  const inputStyle = { width: "100%", padding: "10px 14px", borderRadius: "8px", border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.text, fontSize: "15px", fontFamily: "'Source Sans 3', Helvetica, sans-serif", outline: "none", boxSizing: "border-box" };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "24px", animation: "fadeIn 0.2s ease-out" }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes popIn { from { opacity: 0; transform: scale(0.97) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }`}</style>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: "540px", maxHeight: "85vh", overflowY: "auto", backgroundColor: C.bg, borderRadius: "16px", boxShadow: "0 12px 48px rgba(0,0,0,0.18)", animation: "popIn 0.25s cubic-bezier(0.4,0,0.2,1)" }}>
        <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${C.borderLight}`, position: "sticky", top: 0, backgroundColor: C.bg, borderRadius: "16px 16px 0 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "17px", fontWeight: 500, color: C.text }}>Build your own agent</div>
            <div style={{ fontSize: "14px", color: C.textTertiary, marginTop: "2px" }}>Chain existing agents into a custom workflow.</div>
          </div>
          <button onClick={onClose} style={{ width: "30px", height: "30px", borderRadius: "8px", border: "none", backgroundColor: C.bgHover, color: C.textSecondary, cursor: "pointer", fontSize: "16px" }}>×</button>
        </div>

        <div style={{ padding: "22px 24px" }}>
          <div style={{ marginBottom: "18px" }}>
            <div style={{ fontSize: "14px", fontWeight: 500, color: C.text, marginBottom: "6px" }}>Name</div>
            <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sports campaign launcher" />
          </div>
          <div style={{ marginBottom: "18px" }}>
            <div style={{ fontSize: "14px", fontWeight: 500, color: C.text, marginBottom: "6px" }}>Description <span style={{ fontWeight: 400, color: C.textTertiary }}>(optional)</span></div>
            <input style={inputStyle} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="What does this workflow do?" />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <div style={{ fontSize: "14px", fontWeight: 500, color: C.text, marginBottom: "2px" }}>Steps</div>
            <div style={{ fontSize: "13px", color: C.textTertiary, marginBottom: "10px" }}>Pick the agents this workflow runs, in order.</div>

            {/* selected ordered steps */}
            {steps.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
                {steps.map((id, idx) => {
                  const a = agents.find(x => x.id === id);
                  return (
                    <div key={id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px", borderRadius: "8px", border: `1px solid ${C.border}`, backgroundColor: C.bgSecondary }}>
                      <span style={{ fontSize: "13px", fontWeight: 500, color: C.textTertiary, fontFamily: "Menlo, 'SF Mono', monospace", flexShrink: 0 }}>{idx + 1}</span>
                      <span style={{ flex: 1, fontSize: "14px", fontWeight: 500, color: C.text }}>{a?.title}</span>
                      <button onClick={() => moveStep(idx, -1)} disabled={idx === 0} style={{ ...miniBtn, opacity: idx === 0 ? 0.3 : 1 }}>↑</button>
                      <button onClick={() => moveStep(idx, 1)} disabled={idx === steps.length - 1} style={{ ...miniBtn, opacity: idx === steps.length - 1 ? 0.3 : 1 }}>↓</button>
                      <button onClick={() => toggleStep(id)} style={miniBtn}>×</button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* available agents to add */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {agents.filter(a => !steps.includes(a.id)).map(a => (
                <button key={a.id} onClick={() => toggleStep(a.id)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "16px", fontSize: "13px", fontWeight: 500, border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.textSecondary, cursor: "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif" }}>
                  <span style={{ color: a.color }}>+</span> {a.title}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "4px" }}>
            <div style={{ fontSize: "14px", fontWeight: 500, color: C.text, marginBottom: "8px" }}>Color</div>
            <div style={{ display: "flex", gap: "8px" }}>
              {colors.map(c => (
                <button key={c} onClick={() => setColor(c)} style={{ width: "28px", height: "28px", borderRadius: "8px", backgroundColor: c, border: color === c ? `2px solid ${C.text}` : "2px solid transparent", cursor: "pointer", padding: 0 }} />
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: "16px 24px", borderTop: `1px solid ${C.borderLight}`, display: "flex", justifyContent: "flex-end", gap: "10px", position: "sticky", bottom: 0, backgroundColor: C.bg, borderRadius: "0 0 16px 16px" }}>
          <button onClick={onClose} style={{ padding: "10px 18px", borderRadius: "8px", fontSize: "15px", fontWeight: 500, border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.text, cursor: "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif" }}>Cancel</button>
          <button onClick={create} disabled={!canCreate} style={{ padding: "10px 20px", borderRadius: "8px", fontSize: "15px", fontWeight: 500, border: "none", backgroundColor: canCreate ? C.text : C.bgHover, color: canCreate ? "#fff" : C.textTertiary, cursor: canCreate ? "pointer" : "not-allowed", fontFamily: "'Source Sans 3', Helvetica, sans-serif" }}>Create agent</button>
        </div>
      </div>
    </div>
  );
}

const miniBtn = { width: "24px", height: "24px", borderRadius: "6px", border: "none", backgroundColor: "transparent", color: C.textTertiary, cursor: "pointer", fontSize: "14px", flexShrink: 0 };

function HomeView({ agency, onNavigate }) {
  const [hovered, setHovered] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [showProjects, setShowProjects] = useState(false);
  const [attachedProject, setAttachedProject] = useState(null);
  const [openTask, setOpenTask] = useState(null);
  const [openChat, setOpenChat] = useState(null);

  const visibleTasks = [...TASKS].sort((a, b) => b.mins - a.mins).slice(0, 3);

  const startChat = () => {
    if (!chatInput.trim()) return;
    setOpenChat({ text: chatInput.trim(), project: attachedProject });
    setChatInput("");
  };

  if (openTask) return <TaskChat task={openTask} onBack={() => setOpenTask(null)} />;
  if (openChat) return <GeneralChat seed={openChat} onBack={() => setOpenChat(null)} onNavigate={onNavigate} />;

  const PROJECTS = [
    { name: "SafeGuard Q3 Auto Campaign", color: C.accentBlue },
    { name: "NY Sports Fans Initiative", color: C.accentGreen },
    { name: "CPG Health & Wellness", color: C.accentOrange },
  ];

  const workflows = [
    { id: "explore", title: "Find prebuilt audiences", desc: "Search Dstillery's catalog by topic", icon: "◎", color: C.accentBlue, group: "Discover" },
    { id: "brief", title: "Generate an audience brief", desc: "Draft a client-ready brief you can export", icon: "◫", color: C.accentOrange, group: "Discover" },
    { id: "domainseeded", title: "Build a domain seeded audience", desc: "Pick seed domains and model an audience", icon: "⊞", color: C.accentGreen, group: "Build" },
    { id: "pixel", title: "Create a pixel", desc: "Generate a tracking pixel and its tags", icon: "◈", color: C.accentPink, group: "Build" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "clamp(20px, 5vw, 48px)", boxSizing: "border-box" }}>
      {/* Hero block, centered */}
      <div style={{ width: "100%", maxWidth: "680px", marginTop: "12vh" }}>
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "28px", animation: "fadeUp 0.5s ease-out" }}>
          <div style={{ fontSize: "14px", fontWeight: 500, color: C.textTertiary, marginBottom: "6px" }}>{agency.name}</div>
          <h1 style={{ fontSize: "30px", fontWeight: 500, color: C.text, margin: 0, letterSpacing: "-0.5px" }}>What are you working on?</h1>
        </div>

        {/* Chat composer */}
        <div style={{ animation: "fadeUp 0.5s ease-out", animationDelay: "0.05s", animationFillMode: "both" }}>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: "14px", backgroundColor: C.bg, overflow: "visible", boxShadow: "0 2px 16px rgba(0,0,0,0.04)", position: "relative" }}>
            {/* Attached project chip */}
            {attachedProject && (
              <div style={{ padding: "12px 14px 0" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 10px", borderRadius: "8px", backgroundColor: attachedProject.color + "14", border: `1px solid ${attachedProject.color}40`, fontSize: "13px", fontWeight: 500, color: C.text }}>
                  <span style={{ color: attachedProject.color }}>◳</span>
                  {attachedProject.name}
                  <span onClick={() => setAttachedProject(null)} style={{ cursor: "pointer", color: C.textTertiary, fontSize: "15px" }}>×</span>
                </span>
              </div>
            )}
            <textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); startChat(); } }}
              placeholder={attachedProject ? `Ask anything within ${attachedProject.name}…` : "Ask DS-1 anything..."}
              rows={2}
              style={{ width: "100%", padding: "15px 18px 6px", border: "none", backgroundColor: "transparent", color: C.text, fontSize: "15px", fontFamily: "'Source Sans 3', Helvetica, sans-serif", outline: "none", resize: "none", lineHeight: "1.5", boxSizing: "border-box" }}
            />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px 14px" }}>
              <div style={{ display: "flex", gap: "4px", position: "relative" }}>
                <button style={chatS.actionBtn}>+ Files</button>
                <button onClick={() => setShowProjects(!showProjects)} style={{ ...chatS.actionBtn, color: attachedProject ? C.text : C.textTertiary }}>◳ Projects</button>
                {showProjects && (
                  <div style={{ position: "absolute", bottom: "38px", left: 0, width: "260px", backgroundColor: C.bg, borderRadius: "10px", border: `1px solid ${C.border}`, boxShadow: "0 6px 24px rgba(0,0,0,0.1)", overflow: "hidden", zIndex: 10 }}>
                    <div style={{ padding: "10px 14px", fontSize: "13px", fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: `1px solid ${C.borderLight}` }}>Attach a project</div>
                    {PROJECTS.map((p) => (
                      <div key={p.name} onClick={() => { setAttachedProject(p); setShowProjects(false); }} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", cursor: "pointer", fontSize: "14px", color: C.text }}>
                        <span style={{ color: p.color }}>◳</span> {p.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={startChat}
                style={{ width: "36px", height: "36px", borderRadius: "50%", border: "none", cursor: "pointer", backgroundColor: chatInput.trim() ? C.text : C.bgHover, color: chatInput.trim() ? "#fff" : C.textTertiary, fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s ease" }}
              >↑</button>
            </div>
          </div>
          {attachedProject && (
            <div style={{ fontSize: "13px", color: C.textTertiary, marginTop: "8px", textAlign: "center" }}>
              DS-1 will answer using only the context, files, and audiences inside <strong>{attachedProject.name}</strong>.
            </div>
          )}
        </div>

        {/* Recommended agents */}
        <div style={{ marginTop: "28px", animation: "fadeUp 0.5s ease-out", animationDelay: "0.1s", animationFillMode: "both" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: "15px", fontWeight: 500, color: C.text }}>
              Recommended agents
            </span>
            <span onClick={() => onNavigate("agents")} style={{ fontSize: "14px", color: C.text, cursor: "pointer", fontWeight: 500 }}>See all ›</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {workflows.map((wf) => (
              <button
                key={wf.id}
                onMouseEnter={() => setHovered(wf.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onNavigate(wf.id === "explore" ? "explorer" : wf.id)}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "14px", borderRadius: "10px", textAlign: "left",
                  border: `1px solid ${hovered === wf.id ? "#d3d1cb" : C.border}`,
                  backgroundColor: hovered === wf.id ? C.bgSecondary : C.bg,
                  cursor: "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif",
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{ width: "34px", height: "34px", borderRadius: "8px", backgroundColor: wf.color + "18", color: wf.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", flexShrink: 0 }}>{wf.icon}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "15px", fontWeight: 500, color: C.text }}>{wf.title}</div>
                  <div style={{ fontSize: "13px", color: C.textTertiary, marginTop: "1px" }}>{wf.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activity, tucked low with whitespace above */}
      <div style={{ width: "100%", maxWidth: "680px", marginTop: "auto", paddingTop: "80px", animation: "fadeUp 0.5s ease-out", animationDelay: "0.2s", animationFillMode: "both" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 500, color: C.text, margin: 0 }}>You have {TASKS.length} tasks from an agent to review</h2>
          <span onClick={() => onNavigate("tasks")} style={{ fontSize: "14px", color: C.text, cursor: "pointer", fontWeight: 500 }}>View all ›</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {visibleTasks.map((row, i, arr) => (
            <div key={row.text} onClick={() => setOpenTask(row)} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "13px 2px", borderBottom: i < arr.length - 1 ? `1px solid ${C.borderLight}` : "none", cursor: "pointer" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "15px", color: C.text }}>{row.text}</div>
                <div style={{ fontSize: "13px", color: C.textTertiary, marginTop: "1px" }}>{row.agent}</div>
              </div>
              <span style={{ fontSize: "13px", color: C.textTertiary, fontFamily: "Menlo, 'SF Mono', monospace", flexShrink: 0 }}>{row.meta}</span>
              <span style={{ fontSize: "15px", color: C.textTertiary, flexShrink: 0 }}>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TaskChat({ task, onBack }) {
  const [messages, setMessages] = useState([{ role: "ds1", text: task.context }]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "ds1", text: "Got it — I'll take care of that and keep this task updated. Anything else you'd like me to adjust before I proceed?" }]);
    }, 700);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, overflow: "hidden" }}>
      <div style={briefHeaderStyle}>
        <button onClick={onBack} style={s.btnSecondary}>← Home</button>
        <div style={{ ...briefBadge, backgroundColor: task.dot + "18", color: task.dot }}>◷</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "15px", fontWeight: 500, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{task.text}</div>
          <div style={{ fontSize: "13px", color: C.textTertiary }}>{task.agent}</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px clamp(20px, 5vw, 48px)" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
          {messages.map((m, i) => (
            m.role === "user" ? (
              <div key={i} style={{ alignSelf: "flex-end", maxWidth: "80%", fontSize: "15px", color: "#fff", backgroundColor: C.text, padding: "10px 14px", borderRadius: "14px 14px 2px 14px", lineHeight: "1.5" }}>{m.text}</div>
            ) : (
              <div key={i} style={{ display: "flex", gap: "10px", maxWidth: "90%" }}>
                <span style={{ fontSize: "13px", fontWeight: 500, color: C.accentBlue, fontFamily: "Menlo, 'SF Mono', monospace", flexShrink: 0, marginTop: "3px" }}>DS-1</span>
                <div style={{ fontSize: "15px", color: C.text, lineHeight: "1.6", backgroundColor: C.bgSecondary, border: `1px solid ${C.borderLight}`, padding: "12px 14px", borderRadius: "2px 14px 14px 14px" }}>{m.text}</div>
              </div>
            )
          ))}
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.borderLight}`, padding: "14px clamp(20px, 5vw, 48px)", flexShrink: 0, backgroundColor: C.bgSecondary }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", gap: "8px", alignItems: "flex-end", padding: "6px 6px 6px 14px", borderRadius: "12px", border: `1px solid ${C.border}`, backgroundColor: C.bg }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Continue the conversation…"
            rows={1}
            style={{ flex: 1, border: "none", outline: "none", backgroundColor: "transparent", fontSize: "15px", fontFamily: "'Source Sans 3', Helvetica, sans-serif", color: C.text, resize: "none", lineHeight: "1.5", padding: "7px 0" }}
          />
          <button onClick={send} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "none", cursor: "pointer", backgroundColor: input.trim() ? C.text : C.bgHover, color: input.trim() ? "#fff" : C.textTertiary, fontSize: "15px", flexShrink: 0 }}>↑</button>
        </div>
      </div>
    </div>
  );
}

const WF_INTENTS = [
  { test: /pixel|tag|tracking/, route: "pixel", name: "Create a pixel", reply: "Got it — sounds like you want to set up a tracking pixel. I can generate the pixel and its HTML/JS tags for you." },
  { test: /domain|seed|url|website/, route: "domainseeded", name: "Build a domain seeded audience", reply: "I can build a domain seeded audience for that. Pick a few seed domains and I'll model an audience from their shared visitors." },
  { test: /brief|recommend|deck|proposal/, route: "brief", name: "Generate an audience brief", reply: "I can put together a client-ready audience brief with recommended products you can edit and export." },
  { test: /audience|segment|fans|intender|reach|find|explore|target|prebuilt/, route: "explorer", name: "Find prebuilt audiences", reply: "I can search Dstillery's catalog for audiences that match that. Let me pull the strongest matches." },
];

function GeneralChat({ seed, onBack, onNavigate }) {
  const [messages, setMessages] = useState([{ role: "user", text: seed.text }]);
  const [input, setInput] = useState("");

  const respondTo = (text) => {
    const wf = WF_INTENTS.find(w => w.test.test(text.toLowerCase()));
    if (wf) {
      const topic = text.replace(/^(can you |please |i want to |i'd like to |help me |find( me)?|show me|get me|search for|build|create|generate|make)\s+/i, "").replace(/\b(an? )?(audience|audiences|segment|segments)\b/gi, "").replace(/\bprebuilt\b/gi, "").replace(/\s+/g, " ").trim();
      setMessages(prev => [...prev, { role: "ds1", text: wf.reply, action: { route: wf.route, label: `Open ${wf.name}`, topic: topic || text } }]);
    } else {
      setMessages(prev => [...prev, { role: "ds1", text: "Happy to help with that. Tell me a bit more about what you're trying to do, or kick off one of the workflows — finding audiences, building a domain seeded audience, generating a brief, or creating a pixel." }]);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => respondTo(seed.text), 600);
    return () => clearTimeout(t);
  // eslint-disable-next-line
  }, []);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => respondTo(userMsg), 600);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, overflow: "hidden" }}>
      <div style={briefHeaderStyle}>
        <button onClick={onBack} style={s.btnSecondary}>← Home</button>
        <div style={{ ...briefBadge, backgroundColor: C.accentBlue + "18", color: C.accentBlue }}>◎</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "15px", fontWeight: 500, color: C.text }}>New chat</div>
          {seed.project && <div style={{ fontSize: "13px", color: C.textTertiary, display: "flex", alignItems: "center", gap: "5px" }}><span style={{ color: seed.project.color }}>◳</span>{seed.project.name}</div>}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px clamp(20px, 5vw, 48px)" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
          {messages.map((m, i) => (
            m.role === "user" ? (
              <div key={i} style={{ alignSelf: "flex-end", maxWidth: "80%", fontSize: "15px", color: "#fff", backgroundColor: C.text, padding: "10px 14px", borderRadius: "14px 14px 2px 14px", lineHeight: "1.5" }}>{m.text}</div>
            ) : (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "90%" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: C.accentBlue, fontFamily: "Menlo, 'SF Mono', monospace", flexShrink: 0, marginTop: "3px" }}>DS-1</span>
                  <div style={{ fontSize: "15px", color: C.text, lineHeight: "1.6", backgroundColor: C.bgSecondary, border: `1px solid ${C.borderLight}`, padding: "12px 14px", borderRadius: "2px 14px 14px 14px" }}>{m.text}</div>
                </div>
                {m.action && (
                  <button onClick={() => onNavigate(m.action.route, m.action.route === "explorer" ? m.action.topic : null)} style={{ alignSelf: "flex-start", marginLeft: "34px", padding: "9px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: 500, border: "none", backgroundColor: C.actionBg, color: "#fff", cursor: "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif" }}>{m.action.label} →</button>
                )}
              </div>
            )
          ))}
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.borderLight}`, padding: "14px clamp(20px, 5vw, 48px)", flexShrink: 0, backgroundColor: C.bgSecondary }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", gap: "8px", alignItems: "flex-end", padding: "6px 6px 6px 14px", borderRadius: "12px", border: `1px solid ${C.border}`, backgroundColor: C.bg }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder={seed.project ? `Ask anything within ${seed.project.name}…` : "Ask DS-1 anything…"}
            rows={1}
            style={{ flex: 1, border: "none", outline: "none", backgroundColor: "transparent", fontSize: "15px", fontFamily: "'Source Sans 3', Helvetica, sans-serif", color: C.text, resize: "none", lineHeight: "1.5", padding: "7px 0" }}
          />
          <button onClick={send} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "none", cursor: "pointer", backgroundColor: input.trim() ? C.text : C.bgHover, color: input.trim() ? "#fff" : C.textTertiary, fontSize: "15px", flexShrink: 0 }}>↑</button>
        </div>
      </div>
    </div>
  );
}

const TASKS = [
  { agent: "Syndication Agent", text: "New York_Custom Built syndicated to The Trade Desk", meta: "1h ago", mins: 60, month: "June 2026", context: "New York_Custom Built was successfully syndicated to The Trade Desk a moment ago. It's now active in your AdGroup. Want me to set up a reach forecast or pull a daily activity report on it?" },
  { agent: "Compound Audience Agent", text: "Approve New York Rangers Fans_Custom Built", meta: "2h ago", mins: 120, month: "June 2026", context: "New York Rangers Fans_Custom Built is modeled and waiting on your approval. Estimated reach is 1.9M with an ID-based build. Should I finalize it or would you like to adjust the seed segments first?" },
  { agent: "Pixel Agent", text: "fjallraven-checkout-conv reached 1,000 loads", meta: "4h ago", mins: 240, month: "June 2026", context: "Your pixel fjallraven-checkout-conv just crossed 1,000 loads, so segments and SegRank data are now available for it. Want me to generate a SegRank report or start a lookalike model?" },
  { agent: "Compound Audience Agent", text: "Review and syndicate NSM-demo-6/1_Custom Built", meta: "23h ago", mins: 1380, month: "June 2026", context: "I finished building the compound audience NSM-demo-6/1_Custom Built (combining NY sports fans + recent ticket purchasers). It has a combined reach of 4.2M and is ready for your review before syndication. Want me to push it to The Trade Desk?" },
  { agent: "Audience Brief Agent", text: "Matchaful x Dstillery brief ready for export", meta: "May 30", mins: 14400, month: "May 2026", context: "The Matchaful x Dstillery brief is complete with 7 products. It's ready to export as a PDF whenever you'd like, or I can adjust the product mix first." },
  { agent: "SegRank Agent", text: "SegRank report ready for CPG Health audiences", meta: "May 28", mins: 17280, month: "May 2026", context: "I ranked the CPG Health & Wellness segments by reach and relevance. The top performer is Wellness Intenders with a 3.4x relevance index. Want me to walk through the full ranking?" },
  { agent: "Domain Seeded Agent", text: "Sports fans domain seeded audience modeled", meta: "May 22", mins: 25920, month: "May 2026", context: "Your domain seeded audience from nypost.com, espn.com, and si.com is modeled with ~640M reach. Ready to syndicate or refine the seed list?" },
];

function TasksPage({ onNavigate }) {
  const [tasks, setTasks] = useState(TASKS);
  const [search, setSearch] = useState("");
  const [openTask, setOpenTask] = useState(null);

  if (openTask) return <TaskChat task={openTask} onBack={() => setOpenTask(null)} />;

  const q = search.toLowerCase().trim();
  const filtered = q ? tasks.filter(t => t.text.toLowerCase().includes(q) || t.agent.toLowerCase().includes(q)) : tasks;
  const months = [...new Set(filtered.map(t => t.month))];

  return (
    <div style={s.content}>
      <Breadcrumb onNavigate={onNavigate} current="Tasks" />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", maxWidth: "720px", animation: "fadeUp 0.5s ease-out", marginBottom: "20px" }}>
        <div>
          <h1 style={s.heading}>Tasks to review</h1>
          <p style={s.subheading}>Everything your agents need you to look at.</p>
        </div>
        {tasks.length > 0 && (
          <button onClick={() => setTasks([])} style={{ padding: "9px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: 500, border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.textSecondary, cursor: "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif", flexShrink: 0 }}>Clear all</button>
        )}
      </div>

      {/* Search */}
      <div style={{ position: "relative", maxWidth: "720px", marginBottom: "28px", animation: "fadeUp 0.5s ease-out", animationDelay: "0.04s", animationFillMode: "both" }}>
        <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: C.textTertiary, fontSize: "15px" }}>⌕</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks by name or agent..."
          style={{ width: "100%", padding: "12px 16px 12px 40px", borderRadius: "10px", border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.text, fontSize: "15px", fontFamily: "'Source Sans 3', Helvetica, sans-serif", outline: "none", boxSizing: "border-box" }}
        />
      </div>

      {tasks.length === 0 ? (
        <div style={{ maxWidth: "720px", padding: "24px 2px", fontSize: "15px", color: C.textTertiary, fontStyle: "italic" }}>You're all caught up — no tasks to review.</div>
      ) : filtered.length === 0 ? (
        <div style={{ maxWidth: "720px", padding: "24px 2px", fontSize: "15px", color: C.textTertiary, fontStyle: "italic" }}>No tasks match "{search}".</div>
      ) : (
        months.map((month) => (
          <div key={month} style={{ maxWidth: "720px", marginBottom: "24px", animation: "fadeUp 0.5s ease-out", animationFillMode: "both" }}>
            <div style={{ fontSize: "13px", fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>{month}</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {filtered.filter(t => t.month === month).map((row, i, arr) => (
                <div key={row.text} onClick={() => setOpenTask(row)} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "13px 2px", borderBottom: i < arr.length - 1 ? `1px solid ${C.borderLight}` : "none", cursor: "pointer" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "15px", color: C.text }}>{row.text}</div>
                    <div style={{ fontSize: "13px", color: C.textTertiary, marginTop: "1px" }}>{row.agent}</div>
                  </div>
                  <span style={{ fontSize: "13px", color: C.textTertiary, fontFamily: "Menlo, 'SF Mono', monospace", flexShrink: 0 }}>{row.meta}</span>
                  <span style={{ fontSize: "15px", color: C.textTertiary, flexShrink: 0 }}>›</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const homeS = {
  compactEntry: {
    flex: 1, display: "flex", alignItems: "center", gap: "8px",
    padding: "12px 16px", borderRadius: "10px", fontSize: "14px", fontWeight: 500,
    border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.textSecondary,
    cursor: "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif",
    transition: "all 0.15s ease", justifyContent: "center",
  },
  compactEntryHover: {
    backgroundColor: C.bgSecondary, borderColor: "#d3d1cb",
  },
};

function NotificationSection({ title, count, subtitle, color, children }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <div style={{ marginBottom: "4px" }}>
        <span style={{ fontSize: "15px", fontWeight: 500, color: C.text }}>{title}</span>
        <span style={{
          fontSize: "14px", fontWeight: 500, color: color,
          marginLeft: "6px",
        }}>({count})</span>
      </div>
      <div style={{ fontSize: "14px", color: C.textTertiary, marginBottom: "12px" }}>{subtitle}</div>
      <div style={{
        border: `1px solid ${C.border}`, borderRadius: "10px", overflow: "hidden",
      }}>
        {children}
      </div>
    </div>
  );
}

function CapCard({ name, initial, color, desc, delay, onClick }) {
  return (
    <div onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: "20px", padding: "24px",
      background: C.bg, border: `1px solid ${C.border}`, borderRadius: "12px",
      cursor: "pointer", transition: "background-color 0.15s ease",
      animation: "fadeUp 0.4s ease-out", animationDelay: `${delay}s`, animationFillMode: "both",
    }}>
      <div style={{
        width: "40px", height: "40px", borderRadius: "8px",
        backgroundColor: color + "18", color: color,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "Menlo, 'SF Mono', monospace", fontSize: "14px", fontWeight: 500, flexShrink: 0,
      }}>{initial}</div>
      <div>
        <h3 style={{ fontSize: "16px", fontWeight: 500, color: C.text, margin: "0 0 4px 0" }}>{name}</h3>
        <p style={{ fontSize: "14px", color: C.textSecondary, margin: 0, lineHeight: "1.5" }}>{desc}</p>
      </div>
      <span style={{ fontSize: "18px", color: C.textTertiary, marginLeft: "auto", flexShrink: 0 }}>→</span>
    </div>
  );
}

function DiscoverView({ onNavigate }) {
  const caps = [
    { name: "Audience Explorer", color: C.accentBlue, initial: "AE", desc: "Browse and search Dstillery's full audience library by vertical, behavior, or keyword.", key: "explorer" },
    { name: "SegRank", color: C.accentPurple, initial: "SR", desc: "Rank and compare audience segments by reach, relevance, and performance potential.", key: "segrank" },
    { name: "Audience Brief", color: C.accentOrange, initial: "AB", desc: "Generate a detailed profile of any audience — demographics, interests, and top indexing behaviors.", key: "brief" },
  ];

  return (
    <div style={s.content}>
      <Breadcrumb onNavigate={onNavigate} current="Discover" />
      <div style={{ animation: "fadeUp 0.5s ease-out", marginBottom: "36px" }}>
        <h1 style={s.heading}>Discover</h1>
        <p style={s.subheading}>Explore existing audiences, rank segments, and generate audience insights.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "640px" }}>
        {caps.map((cap, i) => (
          <CapCard key={cap.name} {...cap} delay={i * 0.08} onClick={() => {
            if (cap.key === "explorer") onNavigate("explorer");
            if (cap.key === "brief") onNavigate("brief");
          }} />
        ))}
      </div>
    </div>
  );
}

function Breadcrumb({ onNavigate, current }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "8px",
      marginBottom: "20px", fontSize: "14px",
      animation: "fadeUp 0.4s ease-out",
    }}>
      <button onClick={() => onNavigate && onNavigate("home")} style={{
        display: "flex", alignItems: "center", gap: "6px",
        padding: "5px 12px", borderRadius: "6px",
        border: `1px solid ${C.border}`, backgroundColor: C.bg,
        color: C.textSecondary, cursor: "pointer", fontWeight: 500,
        fontFamily: "'Source Sans 3', Helvetica, sans-serif", fontSize: "14px",
      }}>
        <span>⌂</span> Home
      </button>
      <span style={{ color: C.textTertiary }}>/</span>
      <span style={{ color: C.text, fontWeight: 500 }}>{current}</span>
    </div>
  );
}

function AudienceExplorerChat({ onBack, initialQuery }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "I'm your Audience Explorer. Search Dstillery's catalog of 10,000+ pre-built audiences by keyword, topic, or vertical — then select and syndicate directly from here.", time: new Date(), isIntro: true },
    { role: "user", text: "Find prebuilt audiences for NY Knicks fans", time: new Date() },
    { role: "assistant", time: new Date(), thinkTime: 11,
      intro: "Here are the strongest matches from Dstillery's catalog for NY Knicks fans.",
      groups: [
        { label: "Sports & Entertainment", items: [
          { path: "Sports > Basketball > NBA > NY Knicks Fans", size: "1,200,000", cpm: "$4.50" },
          { path: "Sports > Basketball > NBA > NY Knicks Fans - Extended Scale", size: "4,800,000", cpm: "$3.80" },
          { path: "Sports > Basketball > NBA Fans", size: "12,400,000", cpm: "$2.90" },
        ]},
        { label: "NY Sports & Local", items: [
          { path: "Sports > NY Sports Fans", size: "8,200,000", cpm: "$3.20" },
          { path: "Sports > Basketball > NBA > NY Knicks Fans - In-Market", size: "680,000", cpm: "$5.10" },
        ]},
      ],
      summary: "5 audiences found. The Extended Scale segment offers the best reach at 4.8M. Ready to syndicate or refine?",
      nextSteps: ["Syndicate NY Knicks Fans - Extended Scale", "Find similar audiences", "Build a compound audience"],
      loadingSteps: ["Thinking...", "Finding prebuilt audiences..."],
    },
  ]);
  const [loadingPhase, setLoadingPhase] = useState(null);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [selected, setSelected] = useState([]);
  const [canvasOpen, setCanvasOpen] = useState(true);

  const parseSize = (s) => parseInt(s.replace(/,/g, ""), 10) || 0;
  const fmtSize = (n) => n >= 1000000 ? (n / 1000000).toFixed(1) + "M" : n >= 1000 ? (n / 1000).toFixed(0) + "K" : n.toString();

  const toggleSelect = (item) => {
    setSelected(prev => {
      const exists = prev.find(p => p.path === item.path);
      return exists ? prev.filter(p => p.path !== item.path) : [...prev, item];
    });
  };

  const combinedReach = selected.reduce((sum, a) => sum + parseSize(a.size), 0);

  const EXAMPLE_TOPICS = ["NY Knicks fans", "auto insurance intenders", "luxury travel planners", "health & wellness shoppers", "EV considerers"];
  const hasStarted = messages.some(m => m.role === "user");

  useEffect(() => {
    if (hasStarted) return;
    const t = setInterval(() => setPlaceholderIdx(i => (i + 1) % EXAMPLE_TOPICS.length), 2200);
    return () => clearInterval(t);
  }, [hasStarted]);

  const MOCK_RESPONSES = {
    knicks: {
      query: "NY Knicks",
      intro: "Here's what matched in the catalog. Select audiences on the canvas and I can group, syndicate, or push them to The Trade Desk.",
      summary: "This mix targets core basketball fans as well as broader New York sports and lifestyle segments. Feel free to ask if you'd like more context on why these audience categories align.",
      nextSteps: [
        "Find more audiences similar to these",
        "Syndicate one or more individual audiences for activation",
        "Group these audiences for syndication",
        "Create audiences as Ad Groups in The Trade Desk",
        "See results from another data provider (e.g. Amazon, LiveRamp)",
        "Switch/replace a category (single & multiple compatible)",
      ],
      groups: [
        {
          title: "New York Basketball & Sports Fans",
          desc: "These audiences directly target fans of the New York Knicks, the Brooklyn Nets, and general NBA enthusiasts. They are ideal for reaching people who actively engage with professional basketball content and team news.",
          items: [
            { path: "Dstillery > Consumer > Media > Sports Fans > New York Knicks Fans", size: "34,489,050" },
            { path: "Dstillery > Consumer > Media > Sports Fans > Brooklyn Nets Fans", size: "32,913,450" },
            { path: "Dstillery > Consumer > Media > Sports > NBA Fans", size: "30,084,740" },
            { path: "Dstillery > Lifestyle > Activities > Sports > Basketball Enthusiasts", size: "34,447,725" },
          ],
        },
        {
          title: "New York Local & Variety",
          desc: "These audiences capture a broader set of individuals interested in New York City life, including local news, sports, and culture. They are useful for targeting consumers who have a strong connection to the NYC area and its local community resources.",
          items: [
            { path: "Dstillery > Behavioral AI > Local > USA > New York", size: "52,980,200" },
            { path: "Dstillery > Behavioral AI > Local > USA > New York Recreation", size: "48,084,000" },
            { path: "Dstillery > Behavioral AI > Local > USA > New York Variety", size: "27,867,900" },
            { path: "Dstillery > Clusters > Locations > New York City Education & News Cluster", size: "61,598,200" },
          ],
        },
        {
          title: "Multi-Sport Enthusiasts",
          desc: "Knicks fans often follow other major New York teams. These categories cover fans of the Rangers, Yankees, Mets, Giants, and Jets, allowing for a comprehensive reach across the New York sports landscape.",
          items: [
            { path: "Dstillery > Consumer > Media > Sports Fans > New York Rangers Fans", size: "66,897,500" },
            { path: "Dstillery > Consumer > Media > Sports Fans > New York Yankees Fans", size: "20,270,200" },
            { path: "Dstillery > Consumer > Media > Sports Fans > New York Mets Fans", size: "35,554,700" },
            { path: "Dstillery > Consumer > Media > Sports Fans > New York Giants Fans", size: "15,251,275" },
            { path: "Dstillery > Consumer > Media > Sports Fans > New York Jets Fans", size: "34,240,350" },
          ],
        },
      ],
    },
    default: {
      query: "your search",
      intro: "Here's what matched in the catalog. Select audiences on the canvas and I can group, syndicate, or push them to The Trade Desk.",
      summary: "These segments cover both high-intent and broader behavioral signals related to your search. Feel free to ask if you'd like more context on why these audience categories align.",
      nextSteps: [
        "Find more audiences similar to these",
        "Syndicate one or more individual audiences for activation",
        "Group these audiences for syndication",
        "Create audiences as Ad Groups in The Trade Desk",
        "See results from another data provider (e.g. Amazon, LiveRamp)",
        "Switch/replace a category (single & multiple compatible)",
      ],
      groups: [
        {
          title: "Core Audience Segments",
          desc: "These audiences are directly aligned with your search and represent high-intent consumers actively engaging with related content.",
          items: [
            { path: "Dstillery > Consumer > Media > Auto > Auto Insurance Intenders", size: "14,200,000" },
            { path: "Dstillery > Behavioral AI > In-Market > Auto > New Vehicle Shoppers", size: "8,700,000" },
            { path: "Dstillery > Consumer > Lifestyle > Auto > Luxury Auto Enthusiasts", size: "3,100,000" },
          ],
        },
        {
          title: "Related Interest Segments",
          desc: "Broader audiences that show behavioral overlap with your target. Good for extending reach while maintaining relevance.",
          items: [
            { path: "Dstillery > Behavioral AI > In-Market > Auto > EV Considerers", size: "5,400,000" },
            { path: "Dstillery > Consumer > Finance > Auto Loan Researchers", size: "12,300,000" },
            { path: "Dstillery > Clusters > Lifestyle > Weekend Road Trippers", size: "28,750,000" },
          ],
        },
      ],
    },
  };

  const getConversationPhase = (msgs) => {
    const assistantMsgs = msgs.filter(m => m.role === "assistant" && !m.isIntro);
    const userMsgs = msgs.filter(m => m.role === "user");
    const lastUser = userMsgs[userMsgs.length - 1]?.text?.toLowerCase() || "";
    const lastAssistant = assistantMsgs[assistantMsgs.length - 1];
    
    if (assistantMsgs.length === 0) return "search";
    if (lastAssistant?.followUp?.includes("customize the display name")) return "syndicate_execute";
    if (lastAssistant?.followUp?.includes("Which platform")) return "syndicate_confirm";
    if (lastAssistant?.platforms) return "syndicate_pick_platform";
    if (lastAssistant?.followUp?.includes("provide the name of the marketer")) return "syndicate_find_marketer";
    if (lastAssistant?.text?.includes("scale or performance")) return "syndicate_ask_marketer";
    if (lastUser.includes("syndicate")) return "syndicate_ask_scale";
    return "search";
  };

  const LOADING_SEQUENCES = {
    search: ["thinking", "finding"],
    syndicate_ask_scale: ["thinking"],
    syndicate_ask_marketer: ["thinking", "checking", "searching"],
    syndicate_find_marketer: ["thinking", "searching", "saving", "retrieving"],
    syndicate_pick_platform: ["thinking", "segments"],
    syndicate_confirm: ["thinking", "segments"],
    syndicate_execute: ["thinking", "deploying"],
  };

  const LOADING_LABELS = {
    thinking: "Thinking...",
    finding: "Finding prebuilt audiences...",
    checking: "Checking for active marketer...",
    searching: "Searching for marketers...",
    saving: "Saving active marketer...",
    retrieving: "Retrieving marketer remote destinations...",
    segments: "Looking up segments...",
    deploying: "Deploying syndication...",
  };

  const handleSend = (overrideQuery) => {
    const raw = typeof overrideQuery === "string" ? overrideQuery : input;
    if (!raw.trim() || loadingPhase) return;
    const query = raw.trim();
    const newMessages = [...messages, { role: "user", text: query, time: new Date() }];
    setMessages(newMessages);
    setInput("");

    const phase = getConversationPhase(newMessages);
    const sequence = LOADING_SEQUENCES[phase] || ["thinking"];
    
    let delay = 0;
    sequence.forEach((step, i) => {
      delay += i === 0 ? 0 : 700;
      setTimeout(() => setLoadingPhase(step), delay);
    });

    const totalDelay = delay + 1200;
    setTimeout(() => {
      setLoadingPhase(null);

      if (phase === "syndicate_ask_scale") {
        setMessages(prev => [...prev, {
          role: "assistant", time: new Date(), thinkTime: 2,
          text: "Great! Are you looking to target scale or performance?",
          loadingSteps: ["Thinking..."],
        }]);
      } else if (phase === "syndicate_ask_marketer") {
        const scaleType = query.toLowerCase() === "scale" ? "Extended Scale" : "High Performance";
        setMessages(prev => [...prev, {
          role: "assistant", time: new Date(), thinkTime: 9,
          richText: [
            { text: "I'll help you syndicate the " },
            { text: `New York Knicks Fans - ${scaleType}`, bold: true },
            { text: " audience for ID-based targeting." },
          ],
          followUp: "To get started, I need to know which marketer you are syndicating for. Please provide the name of the marketer (advertiser) you'd like to use.",
          loadingSteps: ["Thinking...", "Checking for active marketer...", "Searching for marketers..."],
        }]);
      } else if (phase === "syndicate_find_marketer") {
        const marketerName = query.charAt(0).toUpperCase() + query.slice(1);
        setMessages(prev => [...prev, {
          role: "assistant", time: new Date(), thinkTime: 6,
          richText: [
            { text: `I found the following marketer for "${query}": ` },
            { text: `${marketerName} Test Marketer`, bold: true },
            { text: "." },
          ],
          followUp: "This marketer has these destination platforms available:",
          platforms: [
            "The Trade Desk",
            "A4 Media",
            "DV360 (Google Data Marketplace)",
          ],
          platformPrompt: "Which platform would you like to syndicate to? You can respond with the name or number.",
          loadingSteps: ["Thinking...", "Searching for marketers...", "Saving active marketer...", "Retrieving marketer remote destinations..."],
        }]);
      } else if (phase === "syndicate_pick_platform") {
        const platformMap = { "1": "The Trade Desk", "2": "A4 Media", "3": "DV360 (Google Data Marketplace)" };
        const platform = platformMap[query] || query;
        const segName = "New York Knicks Fans - Extended Scale";
        const dspPath = `Custom Segment > Esther Test Marketer - Pre-Built > ${segName}`;
        setMessages(prev => [...prev, {
          role: "assistant", time: new Date(), thinkTime: 25,
          text: `Here's the default DSP path for this segment in ${platform}:`,
          dspPathLine: { name: segName, path: dspPath },
          confirmDetails: [
            { label: "Marketer Name", value: "Esther Test Marketer" },
            { label: "Destination Platform", value: platform },
            { label: "Segment Name", value: segName },
            { label: "DSP Path", value: dspPath },
            { label: "Display Name", value: segName },
          ],
          followUp: "Would you like to customize the display name, or proceed with syndication?",
          loadingSteps: ["Thinking...", "Looking up segments..."],
        }]);
      } else if (phase === "syndicate_execute") {
        setMessages(prev => [...prev, {
          role: "assistant", time: new Date(), thinkTime: 59,
          richText: [
            { text: "This audience has already been syndicated. The " },
            { text: "New York Knicks Fans - Extended Scale", bold: true },
            { text: " audience (ID: 1125363) is already active on The Trade Desk for Esther Test Marketer. No additional action is needed." },
          ],
          dspNote: "It will appear in the DSP at: Custom Segment > Esther Test Marketer - Pre-Built > New York Knicks Fans - Extended Scale",
          files: [
            { name: "Syndication Confirmation — NY Knicks Fans Extended Scale.pdf", type: "pdf", size: "840 KB" },
            { name: "NY Knicks Fans — Audience Segment Export.csv", type: "csv", size: "156 KB" },
          ],
          nextSteps: [
            "Check the approval status on The Trade Desk",
            "Target a similar pre-built audience right now while waiting for approval",
            "Do something else",
          ],
          loadingSteps: ["Thinking...", "Deploying syndication..."],
        }]);
      } else {
        const key = query.toLowerCase().includes("knick") ? "knicks" : "default";
        const resp = MOCK_RESPONSES[key];
        setMessages(prev => [...prev, {
          role: "assistant", time: new Date(), thinkTime: 11,
          intro: resp.intro, groups: resp.groups,
          summary: resp.summary, nextSteps: resp.nextSteps,
          loadingSteps: ["Thinking...", "Finding prebuilt audiences..."],
        }]);
      }
    }, totalDelay);
  };

  const formatTime = (d) => {
    if (!d) return "";
    const h = d.getHours();
    const m = d.getMinutes().toString().padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    return `${h % 12 || 12}:${m} ${ampm}`;
  };

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) handleSend(initialQuery);
  // eslint-disable-next-line
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, overflow: "hidden" }}>
      <AgentHeader onBack={onBack} badge="AE" color={C.accentBlue} name="Audience explorer" canvasOpen={canvasOpen} onToggleCanvas={() => setCanvasOpen(!canvasOpen)} hasCanvas={hasStarted} />

      {/* Entry hero (before first search) */}
      {!hasStarted ? (
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", padding: "32px",
        }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "14px",
            backgroundColor: C.accentBlue + "14", color: C.accentBlue,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Menlo, 'SF Mono', monospace", fontSize: "16px", fontWeight: 500,
            marginBottom: "24px",
            animation: "fadeUp 0.5s ease-out",
          }}>AE</div>

          <h1 style={{
            fontSize: "28px", fontWeight: 500, color: C.text, margin: "0 0 8px 0",
            letterSpacing: "-0.5px", textAlign: "center",
            animation: "fadeUp 0.5s ease-out", animationDelay: "0.05s", animationFillMode: "both",
          }}>What audience are you looking for?</h1>
          <p style={{
            fontSize: "15px", color: C.textSecondary, margin: "0 0 32px 0", textAlign: "center",
            animation: "fadeUp 0.5s ease-out", animationDelay: "0.1s", animationFillMode: "both",
          }}>Search Dstillery's catalog by keyword, topic, or vertical</p>

          {/* Big search input */}
          <div style={{
            width: "100%", maxWidth: "560px", position: "relative",
            animation: "fadeUp 0.5s ease-out", animationDelay: "0.15s", animationFillMode: "both",
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              style={{
                width: "100%", padding: "18px 60px 18px 22px",
                borderRadius: "14px", border: `1px solid ${C.border}`,
                backgroundColor: C.bg, color: C.text,
                fontSize: "16px", fontFamily: "'Source Sans 3', Helvetica, sans-serif",
                outline: "none", boxSizing: "border-box",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            />
            {/* Animated placeholder */}
            {!input && (
              <div style={{
                position: "absolute", left: "22px", top: "50%", transform: "translateY(-50%)",
                fontSize: "16px", color: C.textTertiary, pointerEvents: "none",
                display: "flex", gap: "6px",
              }}>
                <span>Try</span>
                <span key={placeholderIdx} style={{
                  color: C.accentBlue, fontWeight: 500,
                  animation: "fadeUp 0.4s ease-out",
                }}>"{EXAMPLE_TOPICS[placeholderIdx]}"</span>
              </div>
            )}
            <button
              onClick={handleSend}
              style={{
                position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
                width: "38px", height: "38px", borderRadius: "10px",
                border: "none", cursor: "pointer",
                backgroundColor: input.trim() ? C.text : C.bgHover,
                color: input.trim() ? "#fff" : C.textTertiary,
                fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.15s ease",
              }}
            >↑</button>
          </div>

          {/* Suggestion chips */}
          <div style={{
            display: "flex", gap: "8px", marginTop: "20px", flexWrap: "wrap", justifyContent: "center",
            maxWidth: "560px",
            animation: "fadeUp 0.5s ease-out", animationDelay: "0.2s", animationFillMode: "both",
          }}>
            {EXAMPLE_TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => handleSend(topic)}
                style={{
                  padding: "8px 16px", borderRadius: "20px", fontSize: "14px",
                  border: `1px solid ${C.border}`, backgroundColor: C.bg,
                  color: C.textSecondary, cursor: "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif",
                  fontWeight: 500, transition: "all 0.15s ease",
                }}
              >{topic}</button>
            ))}
          </div>
        </div>
      ) : (
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
      <div style={{ width: canvasOpen ? "380px" : "100%", flexShrink: 0, borderRight: canvasOpen ? `1px solid ${C.borderLight}` : "none", display: "flex", flexDirection: "column", minWidth: 0 }}>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: "24px" }}>
            {msg.role === "user" && (
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", alignItems: "flex-start" }}>
                <div style={chatS.userBubble}>{msg.text}</div>
                <div style={chatS.userTag}>You</div>
              </div>
            )}

            {msg.role === "assistant" && (
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div style={chatS.ds1Tag}>DS-1</div>
                <div style={{ flex: 1, minWidth: 0 }}>

                  {msg.isIntro && (
                    <div style={chatS.introBox}>{msg.text}</div>
                  )}

                  {!msg.isIntro && (
                    <div style={chatS.assistantCard}>
                    <div style={chatS.thinkingBlock}>
                      {(msg.loadingSteps || ["Thinking..."]).map((step, si) => (
                        <span key={si}>{step}</span>
                      ))}
                      <span>Thought for {msg.thinkTime}s</span>
                    </div>

                    {/* Simple text response */}
                    {msg.text && !msg.richText && (
                      <div style={chatS.bodyText}>{msg.text}</div>
                    )}

                    {/* Rich text with bold */}
                    {msg.richText && (
                      <div style={chatS.bodyText}>
                        {msg.richText.map((seg, si) => (
                          seg.bold
                            ? <strong key={si}>{seg.text}</strong>
                            : <span key={si}>{seg.text}</span>
                        ))}
                      </div>
                    )}

                    {/* Follow-up paragraph */}
                    {msg.followUp && !msg.platforms && !msg.confirmDetails && (
                      <div style={{ ...chatS.bodyText, marginTop: "12px" }}>{msg.followUp}</div>
                    )}

                    {/* Destination platforms as numbered list */}
                    {msg.platforms && (
                      <div style={{ marginTop: "12px" }}>
                        {msg.platforms.map((p, pi) => (
                          <div key={pi} style={chatS.stepRow}>{pi + 1}. {p}</div>
                        ))}
                        {msg.platformPrompt && (
                          <div style={{ ...chatS.bodyText, marginTop: "12px" }}>{msg.platformPrompt}</div>
                        )}
                      </div>
                    )}

                    {/* DSP path line */}
                    {msg.dspPathLine && (
                      <div style={{ ...chatS.bodyText, marginTop: "12px" }}>
                        <strong>{msg.dspPathLine.name}</strong>: {msg.dspPathLine.path}
                      </div>
                    )}

                    {/* Confirmation details */}
                    {msg.confirmDetails && (
                      <div style={{ marginTop: "12px" }}>
                        {msg.dspPathLine && (
                          <div style={{ ...chatS.bodyText, marginBottom: "8px" }}>
                            Please confirm these details before I syndicate the ID-based audience:
                          </div>
                        )}
                        {msg.confirmDetails.map((d, di) => (
                          <div key={di} style={chatS.audienceRow}>
                            <span style={chatS.bullet}>•</span>
                            <span><strong>{d.label}</strong>: {d.value}</span>
                          </div>
                        ))}
                        {msg.followUp && (
                          <div style={{ ...chatS.bodyText, marginTop: "12px" }}>{msg.followUp}</div>
                        )}
                      </div>
                    )}

                    {/* DSP note */}
                    {msg.dspNote && (
                      <div style={{ ...chatS.bodyText, marginTop: "12px" }}>{msg.dspNote}</div>
                    )}

                    {/* Inline file cards */}
                    {msg.files && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                        {msg.files.map((file, fi) => {
                          const ftColors = {
                            pdf: { icon: "PDF", color: "#FF2A1D", bg: "#e03e3e14" },
                            pptx: { icon: "PPTX", color: "#FF8B2C", bg: "#d9730d14" },
                            xlsx: { icon: "XLSX", color: "#CC6F23", bg: "#0f7b6c14" },
                            csv: { icon: "CSV", color: "#FF8B2C", bg: "#2eaadc14" },
                            docx: { icon: "DOCX", color: "#AA004E", bg: "#6940a514" },
                          };
                          const ft = ftColors[file.type] || ftColors.pdf;
                          return (
                            <div key={fi} style={{
                              display: "flex", alignItems: "center", gap: "12px",
                              padding: "12px 16px", borderRadius: "8px",
                              border: `1px solid ${C.border}`, backgroundColor: C.bg,
                              cursor: "pointer", transition: "background-color 0.15s ease",
                            }}>
                              <div style={{
                                width: "36px", height: "36px", borderRadius: "6px",
                                backgroundColor: ft.bg, color: ft.color,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontFamily: "Menlo, 'SF Mono', monospace", fontSize: "9px", fontWeight: 500,
                                flexShrink: 0,
                              }}>{ft.icon}</div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: "14px", fontWeight: 500, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{file.name}</div>
                                <div style={{ fontSize: "13px", color: C.textTertiary, marginTop: "1px" }}>{file.size}</div>
                              </div>
                              <span style={{
                                fontSize: "13px", fontWeight: 500, color: C.accentBlue,
                                fontFamily: "Menlo, 'SF Mono', monospace", flexShrink: 0,
                              }}>↓ Download</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Grouped audience results */}
                    {msg.intro && (
                      <div style={chatS.bodyText}>{msg.intro}</div>
                    )}

                    {msg.summary && (
                      <div style={{ ...chatS.bodyText, marginTop: "20px" }}>{msg.summary}</div>
                    )}

                    {msg.nextSteps && (
                      <div style={{ marginTop: "20px" }}>
                        <div style={{ ...chatS.bodyText, marginBottom: "10px" }}>From here, you can:</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                          {msg.nextSteps.map((step, si) => (
                            <button
                              key={si}
                              onClick={() => handleSend(step)}
                              style={{
                                padding: "8px 14px", borderRadius: "8px", fontSize: "14px",
                                fontWeight: 500, textAlign: "left",
                                border: `1px solid ${C.border}`, backgroundColor: C.bg,
                                color: C.text, cursor: "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif",
                                transition: "all 0.15s ease",
                              }}
                            >{step}</button>
                          ))}
                        </div>
                      </div>
                    )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Loading */}
        {loadingPhase && (
          <div style={{ marginBottom: "24px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={chatS.ds1Tag}>DS-1</div>
            <div style={chatS.thinkingBlock}>
              <span>{LOADING_LABELS[loadingPhase] || "Thinking..."}</span>
            </div>
          </div>
        )}
      </div>

      {/* Rich Input */}
      <div style={{
        padding: "12px 32px 16px", borderTop: `1px solid ${C.borderLight}`,
        flexShrink: 0, backgroundColor: C.bg,
      }}>
        <div style={{
          border: `1px solid ${C.border}`, borderRadius: "12px",
          backgroundColor: C.bgSecondary, overflow: "hidden",
        }}>
          {/* Attached files */}
          {attachedFiles.length > 0 && (
            <div style={{ display: "flex", gap: "6px", padding: "10px 14px 0", flexWrap: "wrap" }}>
              {attachedFiles.map((file, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "4px 10px", borderRadius: "6px", fontSize: "13px",
                  backgroundColor: C.bg, border: `1px solid ${C.borderLight}`,
                  color: C.text, fontWeight: 500,
                }}>
                  <span style={{ fontSize: "10px" }}>📎</span>
                  {file}
                  <span onClick={() => setAttachedFiles(prev => prev.filter((_, fi) => fi !== i))}
                    style={{ cursor: "pointer", color: C.textTertiary, fontSize: "15px", marginLeft: "2px" }}>×</span>
                </div>
              ))}
            </div>
          )}

          {/* Textarea */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Message audience explorer…"
            rows={1}
            style={{
              width: "100%", padding: "10px 14px 4px", border: "none",
              backgroundColor: "transparent", color: C.text,
              fontSize: "15px", fontFamily: "'Source Sans 3', Helvetica, sans-serif",
              outline: "none", resize: "none", lineHeight: "1.5",
            }}
          />

          {/* Action bar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "6px 10px 10px",
          }}>
            <div style={{ display: "flex", gap: "4px" }}>
              <button onClick={() => setAttachedFiles(prev => [...prev, "audience_export.csv"])} style={chatS.actionBtn}>+ Files</button>
              <button style={chatS.actionBtn}>⊞ Prompts</button>
            </div>
            <button
              onClick={handleSend}
              style={{
                width: "32px", height: "32px", borderRadius: "50%",
                border: "none", cursor: "pointer",
                backgroundColor: input.trim() || attachedFiles.length > 0 ? C.text : C.bgHover,
                color: input.trim() || attachedFiles.length > 0 ? "#fff" : C.textTertiary,
                fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.15s ease",
              }}
            >↑</button>
          </div>
        </div>

      </div>
      </div>
      {/* RIGHT — matching audiences canvas */}
      {canvasOpen && (
      <div style={{ flex: 1, overflowY: "auto", padding: "24px clamp(20px,4vw,40px)", backgroundColor: C.bg, minWidth: 0 }}>
        {(() => {
          let groups = null;
          for (let gi = messages.length - 1; gi >= 0; gi--) { if (messages[gi].groups) { groups = messages[gi].groups; break; } }
          if (!groups) return (
            <div style={{ color: C.textTertiary, fontSize: "15px", marginTop: "8px" }}>Audiences you find will appear here. Search from the chat to get matches.</div>
          );
          return (
            <div style={{ maxWidth: "760px" }}>
              <h2 style={{ fontSize: "17px", fontWeight: 500, color: C.text, margin: "0 0 2px" }}>Matching audiences</h2>
              <p style={{ fontSize: "14px", color: C.textTertiary, margin: "0 0 22px" }}>Select rows to act on them from the chat.</p>
              {groups.map((group, gi) => (
                <div key={gi} style={{ marginBottom: "26px" }}>
                  <div style={{ fontSize: "15px", fontWeight: 500, color: C.text, marginBottom: "2px" }}>{group.title}</div>
                  <div style={{ fontSize: "14px", color: C.textTertiary, marginBottom: "12px", lineHeight: "1.5" }}>{group.desc}</div>
                  <div style={{ border: `1px solid ${C.border}`, borderRadius: "10px", overflow: "hidden" }}>
                    {group.items.map((item, ii) => {
                      const isSelected = selected.find(sx => sx.path === item.path);
                      const label = item.path.replace(/^Dstillery > /, "").split(" > ").join(" › ");
                      return (
                        <div key={ii} onClick={() => toggleSelect(item)} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "13px 16px", borderBottom: ii < group.items.length - 1 ? `1px solid ${C.borderLight}` : "none", cursor: "pointer", backgroundColor: isSelected ? C.accentBlue + "0a" : C.bg, transition: "background-color 0.15s ease" }}>
                          <div style={{ width: "18px", height: "18px", borderRadius: "5px", border: `1.5px solid ${isSelected ? C.accentBlue : C.border}`, backgroundColor: isSelected ? C.accentBlue : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff", fontSize: "13px" }}>{isSelected ? "✓" : ""}</div>
                          <span style={{ flex: 1, fontSize: "14px", color: C.text, minWidth: 0 }}>{label}</span>
                          <span style={{ fontSize: "14px", color: C.textTertiary, fontFamily: "Menlo, 'SF Mono', monospace", flexShrink: 0 }}>{fmtSize(parseSize(item.size))}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              {selected.length > 0 && (
                <div style={{ position: "sticky", bottom: 0, display: "flex", alignItems: "center", gap: "10px", padding: "14px 18px", borderRadius: "12px", backgroundColor: C.actionBg, color: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "15px", fontWeight: 500 }}>{selected.length} selected</div>
                    <div style={{ fontSize: "13px", opacity: 0.7, fontFamily: "Menlo, 'SF Mono', monospace" }}>{fmtSize(combinedReach)} combined reach</div>
                  </div>
                  <button onClick={() => setSelected([])} style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.25)", background: "transparent", color: "#fff", fontSize: "14px", fontWeight: 500, cursor: "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif" }}>Clear</button>
                  <button onClick={() => handleSend("group these into a compound audience")} style={{ padding: "8px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.25)", background: "transparent", color: "#fff", fontSize: "14px", fontWeight: 500, cursor: "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif" }}>Group</button>
                  <button onClick={() => handleSend("lets syndicate this")} style={{ padding: "8px 14px", borderRadius: "8px", border: "none", background: "#fff", color: C.text, fontSize: "14px", fontWeight: 500, cursor: "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif" }}>Syndicate →</button>
                </div>
              )}
            </div>
          );
        })()}
      </div>
      )}
      </div>
      )}
    </div>
  );
}

const chatS = {
  ds1Tag: {
    fontSize: "13px",
    fontWeight: 500,
    color: C.accentBlue,
    backgroundColor: C.accentBlue + "14",
    padding: "4px 10px",
    borderRadius: "6px",
    fontFamily: "Menlo, 'SF Mono', monospace",
    letterSpacing: "0.3px",
    flexShrink: 0,
    marginTop: "2px",
  },
  introBox: {
    fontSize: "15px",
    lineHeight: "1.6",
    color: C.text,
    backgroundColor: C.bgSidebar,
    border: `1px solid ${C.borderLight}`,
    padding: "12px 16px",
    borderRadius: "8px",
    fontWeight: 500,
  },
  userTag: {
    fontSize: "13px",
    fontWeight: 500,
    color: C.accentBlue,
    backgroundColor: C.accentBlue + "14",
    padding: "4px 10px",
    borderRadius: "6px",
    fontFamily: "Menlo, 'SF Mono', monospace",
    letterSpacing: "0.3px",
    flexShrink: 0,
    marginTop: "2px",
  },
  userBubble: {
    backgroundColor: C.bgSidebar,
    border: `1px solid ${C.borderLight}`,
    borderRadius: "12px 12px 4px 12px",
    padding: "10px 16px",
    fontSize: "15px",
    color: C.text,
    maxWidth: "65%",
    lineHeight: "1.5",
  },
  assistantCard: {
    backgroundColor: C.bgSecondary,
    border: `1px solid ${C.borderLight}`,
    borderRadius: "10px",
    padding: "20px",
  },
  bodyText: {
    fontSize: "15px",
    lineHeight: "1.65",
    color: C.text,
  },
  thinkingBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    fontSize: "14px",
    color: C.textTertiary,
    marginBottom: "14px",
    paddingLeft: "12px",
    borderLeft: `2px solid ${C.borderLight}`,
    fontStyle: "italic",
  },
  groupTitle: {
    fontSize: "15px",
    fontWeight: 500,
    color: C.text,
    marginBottom: "4px",
  },
  audienceList: {
    marginTop: "8px",
  },
  audienceRow: {
    display: "flex",
    gap: "6px",
    fontSize: "15px",
    lineHeight: "1.7",
    color: C.text,
  },
  bullet: {
    color: C.textTertiary,
    flexShrink: 0,
  },
  estSize: {
    color: C.textTertiary,
  },
  stepRow: {
    fontSize: "15px",
    lineHeight: "1.7",
    color: C.text,
    paddingLeft: "4px",
  },
  platformRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "15px",
    lineHeight: "2",
    color: C.text,
  },
  actionBtn: {
    padding: "5px 12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "transparent",
    color: C.textTertiary,
    fontSize: "13px",
    fontWeight: 500,
    fontFamily: "'Source Sans 3', Helvetica, sans-serif",
    cursor: "pointer",
    transition: "color 0.15s ease, background-color 0.15s ease",
  },
  selActionBtn: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#fff",
    color: C.text,
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "'Source Sans 3', Helvetica, sans-serif",
    cursor: "pointer",
  },
  selActionBtnGhost: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.2)",
    backgroundColor: "transparent",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "'Source Sans 3', Helvetica, sans-serif",
    cursor: "pointer",
  },
};

function BuildView({ onNavigate }) {
  const caps = [
    { name: "Domain Seeded", color: C.accentGreen, initial: "DS", desc: "Build a custom audience from seed domains. Provide URLs and let Dstillery model the behavioral patterns.", key: "domainseeded" },
    { name: "Search Audience", color: C.accentBlue, initial: "SA", desc: "Describe your ideal audience in plain language and get matched segments you can refine and combine.", key: "search" },
    { name: "Pixel Creation", color: C.accentPink, initial: "PX", desc: "Generate and deploy tracking pixels to build first-party audience segments from your own site traffic.", key: "pixel" },
  ];

  return (
    <div style={s.content}>
      <Breadcrumb onNavigate={onNavigate} current="Build" />
      <div style={{ animation: "fadeUp 0.5s ease-out", marginBottom: "36px" }}>
        <h1 style={s.heading}>Build</h1>
        <p style={s.subheading}>Create custom audiences, generate pixels, and prepare segments for syndication.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "640px" }}>
        {caps.map((cap, i) => (
          <CapCard key={cap.name} {...cap} delay={i * 0.08} onClick={() => {
            if (cap.key === "domainseeded") onNavigate("domainseeded");
            if (cap.key === "pixel") onNavigate("pixel");
          }} />
        ))}
      </div>
    </div>
  );
}


function DomainSeededCanvas({ onBack }) {
  const [query, setQuery] = useState("");
  const [seeds, setSeeds] = useState([]);
  const [building, setBuilding] = useState(false);
  const [built, setBuilt] = useState(false);
  const [canvasOpen, setCanvasOpen] = useState(true);
  const [log, setLog] = useState([
    { role: "ds1", text: "I'm your Domain Seeded audience builder. Tell me a topic or brand, pick up to 3 seed domains from the canvas, and I'll model a custom audience from their shared visitors." },
    { role: "user", text: "Build a domain seeded audience for sports fans" },
    { role: "ds1", text: "I can build a domain seeded audience. I've pulled matching domains onto the canvas — pick up to 3 seeds." },
  ]);
  const [domainsVisible, setDomainsVisible] = useState(true);

  const MAX_SEEDS = 3;

  const ALL_DOMAINS = [
    { domain: "nypost.com", reach: 96.7 },
    { domain: "espn.com", reach: 62.8 },
    { domain: "si.com", reach: 61.6 },
    { domain: "cbssports.com", reach: 56.2 },
    { domain: "sportingnews.com", reach: 51.1 },
    { domain: "basketball-reference.com", reach: 33.9 },
    { domain: "clutchpoints.com", reach: 22.2 },
    { domain: "bleacherreport.com", reach: 18.4 },
    { domain: "foxsports.com", reach: 12.7 },
    { domain: "nba.com", reach: 2.7 },
  ];

  const maxReach = Math.max(...ALL_DOMAINS.map(d => d.reach));
  const atMax = seeds.length >= MAX_SEEDS;

  const say = (text) => setLog(prev => [...prev, { role: "ds1", text }]);

  const runSearch = () => {
    if (!query.trim()) return;
    setLog(prev => [...prev, { role: "user", text: query.trim() }]);
    setDomainsVisible(true);
    setTimeout(() => say(`I've pulled matching domains onto the canvas — pick up to ${MAX_SEEDS} seeds.`), 400);
    setQuery("");
  };

  const toggleSeed = (domain) => {
    setSeeds(prev => {
      if (prev.includes(domain)) return prev.filter(s => s !== domain);
      if (prev.length >= MAX_SEEDS) return prev;
      return [...prev, domain];
    });
    setBuilt(false);
  };

  const handleBuild = () => {
    setBuilding(true);
    say("Modeling an audience from the shared behaviors of people who visit your seed domains…");
    const seededReach = seeds.reduce((sum, s) => { const d = ALL_DOMAINS.find(x => x.domain === s); return sum + (d ? d.reach : 0); }, 0);
    const modeledReach = (seededReach * 3.2).toFixed(1);
    setTimeout(() => { setBuilding(false); setBuilt(true); say(`Done. I modeled a ~${modeledReach}M ID-based audience from your ${seeds.length} seed${seeds.length > 1 ? "s" : ""}. Ready to syndicate.`); }, 2000);
  };

  const seededReach = seeds.reduce((sum, s) => { const d = ALL_DOMAINS.find(x => x.domain === s); return sum + (d ? d.reach : 0); }, 0);
  const modeledReach = (seededReach * 3.2).toFixed(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, overflow: "hidden" }}>
      <AgentHeader onBack={onBack} badge="DS" color={C.accentGreen} name="Domain seeded" canvasOpen={canvasOpen} onToggleCanvas={() => setCanvasOpen(!canvasOpen)} />

      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* LEFT — chat */}
        <div style={{ width: canvasOpen ? "380px" : "100%", flexShrink: 0, borderRight: canvasOpen ? `1px solid ${C.borderLight}` : "none", display: "flex", flexDirection: "column", backgroundColor: canvasOpen ? C.bgSecondary : C.bg }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px", boxSizing: "border-box" }}>
            {log.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: "12px" }}>
                {m.role === "user" ? (
                  <div style={{ maxWidth: "85%", fontSize: "14px", color: C.text, backgroundColor: C.bgHover, padding: "10px 14px", borderRadius: "14px 14px 2px 14px", lineHeight: "1.5" }}>{m.text}</div>
                ) : (
                  <div style={{ maxWidth: "88%", fontSize: "14px", color: C.text, backgroundColor: C.bg, border: `1px solid ${C.borderLight}`, padding: "10px 14px", borderRadius: "2px 14px 14px 14px", lineHeight: "1.5" }}>{m.text}</div>
                )}
              </div>
            ))}

            {/* Seeds summary + build button */}
            {seeds.length > 0 && !built && (
              <div style={{ marginTop: "4px", padding: "12px 14px", borderRadius: "10px", border: `1px solid ${C.border}`, backgroundColor: C.bg }}>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "10px" }}>
                  {seeds.map((s2) => (
                    <span key={s2} style={{ display: "flex", alignItems: "center", gap: "5px", padding: "4px 10px", borderRadius: "6px", fontSize: "13px", fontWeight: 500, backgroundColor: C.bgSecondary, border: `1px solid ${C.border}`, color: C.text }}>
                      {s2}<span onClick={() => toggleSeed(s2)} style={{ cursor: "pointer", color: C.textTertiary, fontSize: "14px", lineHeight: 1 }}>×</span>
                    </span>
                  ))}
                </div>
                <button onClick={handleBuild} disabled={building} style={{ width: "100%", padding: "9px", borderRadius: "8px", border: "none", backgroundColor: C.actionBg, color: "#fff", fontSize: "14px", fontWeight: 500, cursor: building ? "default" : "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif", opacity: building ? 0.6 : 1 }}>{building ? "Modeling…" : "Build Audience →"}</button>
              </div>
            )}
            {built && (
              <div style={{ marginTop: "4px", padding: "12px 14px", borderRadius: "10px", border: `1px solid ${C.accentGreen}40`, backgroundColor: C.accentGreen + "08" }}>
                <div style={{ fontSize: "14px", fontWeight: 500, color: C.text, marginBottom: "4px" }}>✓ ~{modeledReach}M modeled · ID-Based</div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => { setBuilt(false); setSeeds([]); }} style={{ ...s.btnSecondary, fontSize: "13px", padding: "5px 12px" }}>Start over</button>
                  <button style={{ ...s.btnPrimary, backgroundColor: C.text, fontSize: "13px", padding: "5px 12px" }}>Syndicate →</button>
                </div>
              </div>
            )}
          </div>

          {/* composer */}
          <div style={{ padding: "14px", borderTop: `1px solid ${C.borderLight}` }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "flex-end", padding: "6px 6px 6px 12px", borderRadius: "12px", border: `1px solid ${C.border}`, backgroundColor: C.bg }}>
              <textarea value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); runSearch(); } }} placeholder="Message domain seeded…" rows={1} style={{ flex: 1, border: "none", outline: "none", backgroundColor: "transparent", fontSize: "14px", fontFamily: "'Source Sans 3', Helvetica, sans-serif", color: C.text, resize: "none", lineHeight: "1.5", padding: "4px 0" }} />
              <button onClick={runSearch} style={{ width: "30px", height: "30px", borderRadius: "8px", border: "none", cursor: "pointer", backgroundColor: query.trim() ? C.text : C.bgHover, color: query.trim() ? "#fff" : C.textTertiary, fontSize: "15px", flexShrink: 0 }}>↑</button>
            </div>
          </div>
        </div>

        {/* RIGHT — domain list */}
        {canvasOpen && (
          <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px", minWidth: 0, backgroundColor: C.bg }}>
            <h2 style={{ fontSize: "18px", fontWeight: 500, color: C.text, margin: "0 0 4px" }}>Seed domains</h2>
            <p style={{ fontSize: "14px", color: C.textTertiary, margin: "0 0 20px" }}>Pick up to {MAX_SEEDS} — bars show monthly device reach (M).</p>

            {built && (
              <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 18px", borderRadius: "10px", backgroundColor: C.accentGreen + "12", border: `1px solid ${C.accentGreen}40`, marginBottom: "20px" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "15px", fontWeight: 500, color: C.text }}>Audience modeled from {seeds.length} seed{seeds.length > 1 ? "s" : ""}</div>
                  <div style={{ fontSize: "13px", color: C.textSecondary, marginTop: "2px", fontFamily: "Menlo, 'SF Mono', monospace" }}>~{modeledReach}M modeled reach · ID-Based</div>
                </div>
                <button onClick={() => { setBuilt(false); setSeeds([]); }} style={s.btnSecondary}>Start over</button>
                <button style={{ ...s.btnPrimary, backgroundColor: C.text }}>Syndicate →</button>
              </div>
            )}

            <div style={{ border: `1px solid ${C.border}`, borderRadius: "10px", overflow: "hidden" }}>
              {ALL_DOMAINS.map((d, i) => {
                const isSeeded = seeds.includes(d.domain);
                const pct = (d.reach / maxReach) * 100;
                const disabled = atMax && !isSeeded;
                return (
                  <div
                    key={d.domain}
                    onClick={() => !disabled && toggleSeed(d.domain)}
                    style={{
                      display: "flex", alignItems: "center", gap: "14px",
                      padding: "13px 16px",
                      borderBottom: i < ALL_DOMAINS.length - 1 ? `1px solid ${C.borderLight}` : "none",
                      backgroundColor: isSeeded ? C.accentGreen + "08" : C.bg,
                      cursor: disabled ? "not-allowed" : "pointer",
                      opacity: disabled ? 0.45 : 1,
                      transition: "background-color 0.1s ease",
                    }}
                  >
                    {/* Checkbox */}
                    <div style={{
                      width: "16px", height: "16px", borderRadius: "3px", flexShrink: 0,
                      border: `1.5px solid ${isSeeded ? C.accentGreen : C.border}`,
                      backgroundColor: isSeeded ? C.accentGreen : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {isSeeded && <span style={{ color: "#fff", fontSize: "10px", lineHeight: 1 }}>✓</span>}
                    </div>

                    {/* Domain name */}
                    <span style={{ fontSize: "15px", color: C.text, width: "180px", flexShrink: 0 }}>{d.domain}</span>

                    {/* Reach bar */}
                    <div style={{ flex: 1, height: "6px", borderRadius: "3px", backgroundColor: C.bgHover, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, borderRadius: "3px", backgroundColor: "#c8c4bc" }} />
                    </div>

                    {/* Reach number */}
                    <span style={{ fontSize: "13px", color: C.textSecondary, fontFamily: "Menlo, 'SF Mono', monospace", flexShrink: 0, width: "36px", textAlign: "right" }}>{d.reach}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


function PixelCreator({ onBack, marketer }) {
  const [pixelType, setPixelType] = useState("Site Visitor");
  const [chips, setChips] = useState([]); // { key, label, code, desc, editing }
  const [agreed, setAgreed] = useState(false);
  const [created, setCreated] = useState([]);
  const [copied, setCopied] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [canvasOpen, setCanvasOpen] = useState(true);
  const [log, setLog] = useState([
    { role: "ds1", text: "I'm your Pixel Creator. Tell me what you want to track — pages, events, placements — and I'll generate the audience codes and descriptions. You just pick the pixel type and agree to the terms." },
  ]);
  const [input, setInput] = useState("");
  const [generating, setGenerating] = useState(false);

  const PIXEL_TYPES = ["Site Visitor", "Conversion", "Ad Viewer"];

  const tagFor = (code, kind) => kind === "js"
    ? `<script src="//action.dstillery.com/orbserv/nsjs?adv=cl161902600414132&ns=5973&nc=${code}&ncv=64" type="text/javascript"></script>`
    : `<img width="1" height="1" src="//action.dstillery.com/orbserv/nspix?adv=cl161902600414132&ns=5973&nc=${code}&ncv=64" />`;

  const slugify = s => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const say = text => setLog(prev => [...prev, { role: "ds1", text }]);

  // DS-1 generates code + description from a label
  const generateChip = (label) => {
    const code = slugify(label);
    const typeMap = { "Site Visitor": "visitors to", "Conversion": "conversions on", "Ad Viewer": "ad impressions for" };
    const desc = `Tracks ${typeMap[pixelType]} ${label.toLowerCase()}.`;
    return { key: Date.now() + Math.random(), label, code, desc, editing: false };
  };

  const addChip = (raw) => {
    const label = raw.trim();
    if (!label) return;
    const chip = generateChip(label);
    setChips(prev => [...prev, chip]);
    setTagInput("");
  };

  const removeChip = key => setChips(prev => prev.filter(c => c.key !== key));

  const updateChip = (key, field, val) => setChips(prev => prev.map(c => c.key === key ? { ...c, [field]: val } : c));

  const handleCreate = () => {
    if (!agreed || chips.length === 0) return;
    const now = Date.now();
    const newPixels = chips.map((c, i) => ({ ...c, id: String(874790 + i + now % 1000), status: "created" }));
    setCreated(prev => [...prev, ...newPixels]);
    setChips([]);
    setAgreed(false);
    say(`Created ${newPixels.length} ${pixelType} pixel${newPixels.length !== 1 ? "s" : ""}. Tags are on the canvas — want to change any codes or descriptions before deploying?`);
  };

  const copy = (text, key) => {
    try { navigator.clipboard && navigator.clipboard.writeText(text); } catch (e) {}
    setCopied(key); setTimeout(() => setCopied(null), 1600);
  };

  const runInput = () => {
    const raw = input.trim();
    if (!raw) return;
    setLog(prev => [...prev, { role: "user", text: raw }]);
    setInput("");
    setGenerating(true);
    // Detect type override from message
    const t = raw.toLowerCase();
    const detectedType = /conversion|convert|checkout|purchase/.test(t) ? "Conversion" : /ad.?viewer|impression/.test(t) ? "Ad Viewer" : pixelType;
    if (detectedType !== pixelType) setPixelType(detectedType);
    // Extract things to track — split by commas, "and", or newlines
    const things = raw.split(/,|\band\b|\n/).map(s => s.replace(/^(create|track|pixel|for|a|an|the|me)\s+/gi, "").trim()).filter(Boolean);
    setTimeout(() => {
      setGenerating(false);
      const newChips = things.map(generateChip);
      setChips(prev => [...prev, ...newChips]);
      say(`Generated ${newChips.length} ${detectedType} pixel${newChips.length !== 1 ? "s" : ""}. Review the codes and descriptions on the right — edit anything that looks off, then agree to the terms and create.`);
    }, 900);
  };

  const typeColor = C.accentAmaranth;

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, overflow: "hidden" }}>
      <AgentHeader onBack={onBack} badge="PX" color={typeColor} name="Pixel creator" canvasOpen={canvasOpen} onToggleCanvas={() => setCanvasOpen(!canvasOpen)} />

      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* LEFT — chat */}
        <div style={{ width: canvasOpen ? "380px" : "100%", flexShrink: 0, borderRight: canvasOpen ? `1px solid ${C.borderLight}` : "none", display: "flex", flexDirection: "column", backgroundColor: C.bgSecondary }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px", boxSizing: "border-box" }}>
            {log.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: "12px" }}>
                {m.role === "user"
                  ? <div style={{ maxWidth: "85%", fontSize: "14px", color: C.text, backgroundColor: C.bgHover, padding: "10px 14px", borderRadius: "14px 14px 2px 14px", lineHeight: "1.5" }}>{m.text}</div>
                  : <div style={{ maxWidth: "88%", fontSize: "14px", color: C.text, backgroundColor: C.bg, border: `1px solid ${C.borderLight}`, padding: "10px 14px", borderRadius: "2px 14px 14px 14px", lineHeight: "1.6" }}>{m.text}</div>
                }
              </div>
            ))}
            {generating && (
              <div style={{ fontSize: "13px", color: C.textTertiary, fontStyle: "italic", paddingLeft: "4px" }}>Generating codes…</div>
            )}
          </div>
          <div style={{ padding: "14px", borderTop: `1px solid ${C.borderLight}` }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "flex-end", padding: "6px 6px 6px 12px", borderRadius: "12px", border: `1px solid ${C.border}`, backgroundColor: C.bg }}>
              <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); runInput(); } }} placeholder="e.g. homepage, checkout, spring campaign…" rows={1} style={{ flex: 1, border: "none", outline: "none", backgroundColor: "transparent", fontSize: "14px", fontFamily: "'Source Sans 3', Helvetica, sans-serif", color: C.text, resize: "none", lineHeight: "1.5", padding: "4px 0" }} />
              <button onClick={runInput} style={{ width: "30px", height: "30px", borderRadius: "8px", border: "none", cursor: "pointer", backgroundColor: input.trim() ? C.actionBg : C.bgHover, color: input.trim() ? "#fff" : C.textTertiary, fontSize: "15px", flexShrink: 0 }}>↑</button>
            </div>
          </div>
        </div>

        {/* RIGHT — canvas */}
        {canvasOpen && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, backgroundColor: C.bg }}>
            {/* scrollable content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 500, color: C.text, margin: "0 0 4px", fontFamily: "'Urbanist', Arial, sans-serif" }}>Pixel batch</h2>
            <p style={{ fontSize: "14px", color: C.textTertiary, margin: "0 0 24px" }}>DS-1 generates codes and descriptions — you review, then create.</p>

            {/* Step 1 — pixel type */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "13px", fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>Pixel type</div>
              <div style={{ display: "flex", gap: "8px" }}>
                {PIXEL_TYPES.map(pt => (
                  <button key={pt} onClick={() => setPixelType(pt)} style={{ padding: "7px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: 500, border: `1px solid ${pixelType === pt ? typeColor : C.border}`, backgroundColor: pixelType === pt ? typeColor + "12" : "transparent", color: pixelType === pt ? typeColor : C.textSecondary, cursor: "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif", transition: "all 0.12s ease" }}>{pt}</button>
                ))}
              </div>
            </div>

            {/* Step 2 — chip list */}
            {(chips.length > 0 || true) && (
              <div style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: "13px", fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>
                  Pixels to create {chips.length > 0 && <span style={{ color: typeColor, fontFamily: "Menlo, 'SF Mono', monospace", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>· {chips.length}</span>}
                </div>

                {/* Tag input */}
                <div style={{ display: "flex", gap: "8px", marginBottom: chips.length > 0 ? "14px" : "0" }}>
                  <input
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addChip(tagInput); } }}
                    placeholder="Type a page or placement, press Enter…"
                    style={{ flex: 1, padding: "9px 12px", borderRadius: "8px", border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.text, fontSize: "14px", fontFamily: "'Source Sans 3', Helvetica, sans-serif", outline: "none" }}
                  />
                  <button onClick={() => addChip(tagInput)} disabled={!tagInput.trim()} style={{ padding: "9px 14px", borderRadius: "8px", border: `1px solid ${C.border}`, backgroundColor: C.bg, color: tagInput.trim() ? C.text : C.textTertiary, fontSize: "14px", cursor: tagInput.trim() ? "pointer" : "default", fontFamily: "'Source Sans 3', Helvetica, sans-serif" }}>Add</button>
                </div>

                {/* Chips with inline edit */}
                {chips.length > 0 && (
                  <div style={{ border: `1px solid ${C.border}`, borderRadius: "10px", overflow: "hidden" }}>
                    {chips.map((chip, i) => (
                      <div key={chip.key} style={{ padding: "12px 14px", borderBottom: i < chips.length - 1 ? `1px solid ${C.borderLight}` : "none", backgroundColor: C.bg }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                          {/* Type badge */}
                          <span style={{ fontSize: "10px", fontWeight: 500, color: typeColor, backgroundColor: typeColor + "14", padding: "3px 8px", borderRadius: "4px", fontFamily: "Menlo, 'SF Mono', monospace", flexShrink: 0, marginTop: "3px" }}>{pixelType.split(" ")[0].toUpperCase()}</span>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            {/* Code — inline editable */}
                            <input
                              value={chip.code}
                              onChange={e => updateChip(chip.key, "code", slugify(e.target.value))}
                              style={{ width: "100%", fontSize: "14px", fontFamily: "Menlo, 'SF Mono', monospace", color: C.text, border: "none", outline: "none", backgroundColor: "transparent", padding: 0, marginBottom: "3px" }}
                            />
                            {/* Description — inline editable */}
                            <input
                              value={chip.desc}
                              onChange={e => updateChip(chip.key, "desc", e.target.value)}
                              style={{ width: "100%", fontSize: "13px", color: C.textSecondary, border: "none", outline: "none", backgroundColor: "transparent", padding: 0, fontFamily: "'Source Sans 3', Helvetica, sans-serif" }}
                            />
                          </div>

                          <button onClick={() => removeChip(chip.key)} style={{ background: "none", border: "none", color: C.textTertiary, cursor: "pointer", fontSize: "16px", lineHeight: 1, padding: "2px", flexShrink: 0 }}>×</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {chips.length === 0 && (
                  <div style={{ padding: "24px", border: `1px dashed ${C.border}`, borderRadius: "10px", textAlign: "center", color: C.textTertiary, fontSize: "14px" }}>
                    Describe what to track in the chat, or add items above
                  </div>
                )}
              </div>
            )}

            {/* Create button */}
            {chips.length > 0 && (
              <div style={{ marginBottom: "24px" }}>
                <button onClick={handleCreate} disabled={!agreed} style={{ width: "100%", padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: agreed ? C.actionBg : C.bgHover, color: agreed ? "#fff" : C.textTertiary, fontSize: "14px", fontWeight: 500, cursor: agreed ? "pointer" : "default", fontFamily: "'Source Sans 3', Helvetica, sans-serif", transition: "all 0.12s ease" }}>
                  {agreed ? `Create ${chips.length} pixel${chips.length !== 1 ? "s" : ""} →` : `Agree to terms in the chat to create ${chips.length} pixel${chips.length !== 1 ? "s" : ""}`}
                </button>
              </div>
            )}

            {/* Created pixels */}
            {created.length > 0 && (
              <div style={{ marginTop: "28px" }}>
                <div style={{ fontSize: "13px", fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>Created · {created.length}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {created.map(p => (
                    <div key={p.key} style={{ border: `1px solid ${C.border}`, borderRadius: "10px", overflow: "hidden" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px", backgroundColor: C.bgSecondary, borderBottom: `1px solid ${C.borderLight}` }}>
                        <span style={{ fontSize: "10px", fontWeight: 500, color: typeColor, backgroundColor: typeColor + "14", padding: "2px 8px", borderRadius: "4px", fontFamily: "Menlo, 'SF Mono', monospace" }}>{p.type ? p.type.split(" ")[0].toUpperCase() : pixelType.split(" ")[0].toUpperCase()}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: "14px", fontFamily: "Menlo, 'SF Mono', monospace", color: C.text }}>{p.code}</div>
                          <div style={{ fontSize: "13px", color: C.textTertiary }}>{p.desc}</div>
                        </div>
                        <span style={{ fontSize: "13px", color: C.accentOrangeDark, flexShrink: 0 }}>✓ ID {p.id}</span>
                      </div>
                      <div style={{ padding: "10px 14px", backgroundColor: "#1A1917" }}>
                        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "6px" }}>
                          <button onClick={() => copy(tagFor(p.code, "img") + "\n" + tagFor(p.code, "js"), p.key)} style={{ padding: "2px 10px", borderRadius: "5px", border: "1px solid rgba(255,255,255,0.15)", backgroundColor: "transparent", color: copied === p.key ? C.accentOrange : "rgba(255,255,255,0.5)", fontSize: "12px", cursor: "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif" }}>{copied === p.key ? "✓ Copied" : "Copy tags"}</button>
                        </div>
                        <code style={{ fontSize: "12px", fontFamily: "Menlo, 'SF Mono', monospace", color: "#e8e5e0", lineHeight: "1.6", display: "block", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{tagFor(p.code, "img")}{"\n"}{tagFor(p.code, "js")}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            </div>{/* end scrollable */}

            {/* Pinned footer — terms + create */}
            <div style={{ flexShrink: 0, padding: "14px 32px", borderTop: `1px solid ${C.borderLight}`, backgroundColor: C.bg, display: "flex", alignItems: "center", gap: "12px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, cursor: "pointer" }}>
                <div onClick={() => setAgreed(!agreed)} style={{ width: "15px", height: "15px", borderRadius: "3px", flexShrink: 0, border: `1.5px solid ${agreed ? typeColor : C.border}`, backgroundColor: agreed ? typeColor : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.12s ease" }}>
                  {agreed && <span style={{ color: "#fff", fontSize: "9px", lineHeight: 1 }}>✓</span>}
                </div>
                <span style={{ fontSize: "13px", color: C.textSecondary }}>I agree to Dstillery's pixel placement terms</span>
              </label>
              <button onClick={handleCreate} disabled={!agreed || chips.length === 0} style={{ padding: "9px 20px", borderRadius: "8px", border: "none", backgroundColor: (agreed && chips.length > 0) ? C.actionBg : C.bgHover, color: (agreed && chips.length > 0) ? "#fff" : C.textTertiary, fontSize: "14px", fontWeight: 500, cursor: (agreed && chips.length > 0) ? "pointer" : "default", fontFamily: "'Source Sans 3', Helvetica, sans-serif", flexShrink: 0, whiteSpace: "nowrap", transition: "all 0.12s ease" }}>
                {chips.length > 0 ? `Create ${chips.length} pixel${chips.length !== 1 ? "s" : ""} →` : "Create →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const BriefChevron = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ transition: "transform 0.18s ease", transform: open ? "rotate(180deg)" : "rotate(0)" }}>
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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

function AudienceBriefBuilder({ onBack, marketer }) {
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
  const [expanded, setExpanded] = useState({});
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
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, overflow: "hidden" }}>
      <style>{`.brief-card:hover .grip { color: ${C.textSecondary}; } .card-body { animation: expandIn 0.18s ease-out; } @keyframes expandIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <AgentHeader onBack={onBack} badge="AB" color={C.accentOrange} name="Audience brief" canvasOpen={canvasOpen} onToggleCanvas={() => setCanvasOpen(!canvasOpen)} onReset={reset} />

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
                    <div onClick={() => toggle(sec.id)} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 16px", cursor: "pointer" }}>
                      <span className="grip" title="Drag to reorder" onClick={(e) => e.stopPropagation()} style={{ cursor: "grab", color: C.textTertiary, fontSize: "15px", userSelect: "none", flexShrink: 0 }}>⠿</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "15px", fontWeight: 600, color: C.text, fontFamily: "'Urbanist', Arial, sans-serif" }}>{sec.product}</div>
                        <div style={{ fontSize: "13px", color: C.textSecondary, marginTop: "3px", lineHeight: "1.45" }}>{sec.targets}</div>
                      </div>
                      <span style={{ color: C.textTertiary, display: "flex", alignItems: "center", flexShrink: 0 }}><BriefChevron open={isOpen} /></span>
                      <button onClick={(e) => { e.stopPropagation(); removeSection(sec.id); }} title="Remove" style={{ width: "28px", height: "26px", borderRadius: "7px", border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.textSecondary, cursor: "pointer", fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>×</button>
                    </div>
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

const briefHeaderStyle = { padding: "14px 24px", borderBottom: `1px solid ${C.borderLight}`, display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 };
const briefBadge = { width: "28px", height: "28px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Menlo, 'SF Mono', monospace", fontSize: "10px", fontWeight: 500 };
const briefIconBtn = { width: "26px", height: "26px", borderRadius: "6px", border: "none", backgroundColor: "transparent", color: C.textTertiary, cursor: "pointer", fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Source Sans 3', Helvetica, sans-serif" };

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

function ProjectsView({ agency, onNavigate }) {
  const [openProject, setOpenProject] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [search, setSearch] = useState("");

  const projects = [
    {
      id: 1, name: "SafeGuard Q3 Auto Campaign", color: C.accentBlue,
      desc: "Customer acquisition for auto insurance, July–Sept 2026",
      convos: 8, files: 4, audiences: 5, updated: "2h ago",
      instructions: "Focus on auto insurance intenders and recent vehicle purchasers. Always exclude current policyholders. Syndicate to The Trade Desk. Reports should be client-ready and exclude internal segment IDs.",
    },
    {
      id: 2, name: "NY Sports Fans Initiative", color: C.accentGreen,
      desc: "Multi-team sports audience program for regional advertisers",
      convos: 12, files: 6, audiences: 9, updated: "Yesterday",
      instructions: "Build compound audiences combining NBA, NHL, MLB, and NFL fan segments in the NY DMA. Prioritize scale over precision. Default to ID-based targeting.",
    },
    {
      id: 3, name: "CPG Health & Wellness", color: C.accentOrange,
      desc: "Q3 launch for a wellness CPG brand across retail + DTC",
      convos: 5, files: 3, audiences: 4, updated: "3 days ago",
      instructions: "Domain-seeded audiences from wellness and fitness publishers. Combine with purchase intent signals. LiveRamp distribution preferred.",
    },
  ];

  if (openProject) {
    const p = openProject;
    return (
      <div style={s.content}>
        <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", animation: "fadeUp 0.4s ease-out" }}>
          <button onClick={() => setOpenProject(null)} style={{
            display: "flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "6px",
            border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.textSecondary,
            cursor: "pointer", fontWeight: 500, fontFamily: "'Source Sans 3', Helvetica, sans-serif", fontSize: "14px",
          }}>← Projects</button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px", maxWidth: "720px", animation: "fadeUp 0.5s ease-out" }}>
          <div style={{
            width: "44px", height: "44px", borderRadius: "10px",
            backgroundColor: p.color + "18", color: p.color,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0,
          }}>◳</div>
          <div>
            <h1 style={{ ...s.heading, fontSize: "26px" }}>{p.name}</h1>
            <p style={{ ...s.subheading, marginTop: "4px" }}>{p.desc}</p>
          </div>
        </div>

        <div style={{ maxWidth: "720px" }}>
          {/* New chat in project */}
          <button style={{
            width: "100%", padding: "14px 18px", borderRadius: "10px", marginBottom: "24px",
            border: "none", backgroundColor: C.actionBg, color: "#fff",
            fontSize: "15px", fontWeight: 500, cursor: "pointer", textAlign: "left",
            fontFamily: "'Source Sans 3', Helvetica, sans-serif", animation: "fadeUp 0.5s ease-out", animationDelay: "0.05s", animationFillMode: "both",
          }}>+ New chat in this project</button>

          {/* Project instructions */}
          <div style={projS.section}>
            <div style={projS.sectionTitle}>Project description</div>
            <div style={projS.sectionDesc}>What this project is for and how DS-1 should approach it</div>
            <div style={{
              marginTop: "12px", padding: "14px 16px", borderRadius: "10px",
              backgroundColor: C.bgSidebar, border: `1px solid ${C.borderLight}`,
              fontSize: "14px", color: C.text, lineHeight: "1.6",
            }}>{p.instructions}</div>
          </div>

          {/* Project knowledge */}
          <div style={projS.section}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={projS.sectionTitle}>Relevant files</div>
                <div style={projS.sectionDesc}>{p.files} files DS-1 uses as context in this project</div>
              </div>
              <button style={{
                padding: "6px 14px", borderRadius: "6px", fontSize: "13px", fontWeight: 500,
                border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.text,
                cursor: "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif",
              }}>+ Add</button>
            </div>
            <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { name: "Campaign Brief", type: "PDF", color: C.accentRed },
                { name: "Audience Strategy", type: "DOCX", color: C.accentPurple },
                { name: "Approved Exclusions", type: "XLSX", color: C.accentGreen },
              ].map((f, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "12px 16px", borderRadius: "8px",
                  border: `1px solid ${C.border}`, backgroundColor: C.bg,
                }}>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "6px",
                    backgroundColor: f.color + "14", color: f.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "Menlo, 'SF Mono', monospace", fontSize: "8px", fontWeight: 500,
                  }}>{f.type}</div>
                  <span style={{ fontSize: "15px", fontWeight: 500, color: C.text }}>{f.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project conversations */}
          <div style={projS.section}>
            <div style={projS.sectionTitle}>Conversations</div>
            <div style={projS.sectionDesc}>{p.convos} chats in this project</div>
            <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { title: "Auto insurance intenders search", time: "2h ago" },
                { title: "Compound build — intenders + recent buyers", time: "Yesterday" },
                { title: "Syndication to The Trade Desk", time: "2 days ago" },
              ].map((c, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "12px 16px", borderRadius: "8px",
                  border: `1px solid ${C.border}`, backgroundColor: C.bg, cursor: "pointer",
                }}>
                  <span style={{ flex: 1, fontSize: "15px", fontWeight: 500, color: C.text }}>{c.title}</span>
                  <span style={{ fontSize: "13px", color: C.textTertiary, fontFamily: "Menlo, 'SF Mono', monospace" }}>{c.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.content}>
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <Breadcrumb onNavigate={onNavigate} current="Projects" />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px", maxWidth: "720px", animation: "fadeUp 0.5s ease-out" }}>
        <div>
          <h1 style={s.heading}>Projects</h1>
          <p style={s.subheading}>Organize campaigns and initiatives with their own context, files, and chats</p>
        </div>
        <button onClick={() => setShowNew(true)} style={{
          padding: "9px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: 500,
          border: "none", backgroundColor: C.actionBg, color: "#fff",
          cursor: "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif", flexShrink: 0,
        }}>+ New project</button>
      </div>

      {showNew && <NewProjectModal onClose={() => setShowNew(false)} />}

      {/* Search */}
      <div style={{ position: "relative", maxWidth: "720px", marginBottom: "20px" }}>
        <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: C.textTertiary, fontSize: "15px" }}>⌕</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          style={{ width: "100%", padding: "12px 16px 12px 40px", borderRadius: "10px", border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.text, fontSize: "15px", fontFamily: "'Source Sans 3', Helvetica, sans-serif", outline: "none", boxSizing: "border-box" }}
        />
      </div>

      {(() => {
        const q = search.toLowerCase().trim();
        const shown = q ? projects.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)) : projects;
        if (shown.length === 0) return <div style={{ maxWidth: "720px", padding: "24px 2px", fontSize: "15px", color: C.textTertiary, fontStyle: "italic" }}>No projects match "{search}".</div>;
        return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", maxWidth: "720px" }}>
        {shown.map((p, i) => (
          <div
            key={p.id}
            onClick={() => setOpenProject(p)}
            style={{
              padding: "20px", borderRadius: "12px",
              border: `1px solid ${C.border}`, backgroundColor: C.bg, cursor: "pointer",
              transition: "all 0.15s ease",
              animation: "fadeUp 0.4s ease-out", animationDelay: `${i * 0.06}s`, animationFillMode: "both",
            }}
          >
            <div style={{
              width: "40px", height: "40px", borderRadius: "10px",
              backgroundColor: p.color + "18", color: p.color,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", marginBottom: "14px",
            }}>◳</div>
            <div style={{ fontSize: "15px", fontWeight: 500, color: C.text, marginBottom: "4px" }}>{p.name}</div>
            <div style={{ fontSize: "14px", color: C.textSecondary, lineHeight: "1.5", marginBottom: "16px" }}>{p.desc}</div>
            <div style={{ display: "flex", gap: "14px", fontSize: "13px", color: C.textTertiary, fontFamily: "Menlo, 'SF Mono', monospace" }}>
              <span>{p.convos} chats</span>
              <span>{p.files} files</span>
              <span>{p.audiences} audiences</span>
            </div>
            <div style={{ fontSize: "13px", color: C.textTertiary, marginTop: "10px" }}>Updated {p.updated}</div>
          </div>
        ))}
      </div>
        );
      })()}
    </div>
  );
}

const projS = {
  section: { marginBottom: "28px", animation: "fadeUp 0.5s ease-out", animationFillMode: "both" },
  sectionTitle: { fontSize: "15px", fontWeight: 500, color: C.text },
  sectionDesc: { fontSize: "14px", color: C.textTertiary, marginTop: "2px" },
};

function NewProjectModal({ onClose }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [marketer, setMarketer] = useState("");

  const canCreate = name.trim();

  const Field = ({ label, hint, required, children }) => (
    <div style={{ marginBottom: "18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
        <span style={{ fontSize: "14px", fontWeight: 500, color: C.text }}>{label}</span>
        {required && <span style={{ fontSize: "13px", color: C.accentRed }}>required</span>}
      </div>
      {hint && <div style={{ fontSize: "13px", color: C.textTertiary, marginBottom: "8px", lineHeight: "1.5" }}>{hint}</div>}
      {children}
    </div>
  );

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: "8px",
    border: `1px solid ${C.border}`, backgroundColor: C.bg,
    color: C.text, fontSize: "15px", fontFamily: "'Source Sans 3', Helvetica, sans-serif",
    outline: "none", boxSizing: "border-box",
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: "24px",
        animation: "fadeIn 0.2s ease-out",
      }}
    >
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes popIn { from { opacity: 0; transform: scale(0.97) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }`}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: "520px", maxHeight: "85vh", overflowY: "auto",
          backgroundColor: C.bg, borderRadius: "16px",
          boxShadow: "0 12px 48px rgba(0,0,0,0.18)",
          animation: "popIn 0.25s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "20px 24px", borderBottom: `1px solid ${C.borderLight}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, backgroundColor: C.bg, borderRadius: "16px 16px 0 0",
        }}>
          <div>
            <div style={{ fontSize: "17px", fontWeight: 500, color: C.text }}>New Project</div>
            <div style={{ fontSize: "14px", color: C.textTertiary, marginTop: "2px" }}>Create a siloed workspace for a campaign or initiative</div>
          </div>
          <button onClick={onClose} style={{
            width: "30px", height: "30px", borderRadius: "8px", border: "none",
            backgroundColor: C.bgHover, color: C.textSecondary, cursor: "pointer", fontSize: "16px",
          }}>×</button>
        </div>

        {/* Body */}
        <div style={{ padding: "22px 24px" }}>
          <Field label="Project name" required>
            <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. SafeGuard Q3 Auto Campaign" />
          </Field>

          <Field label="Description">
            <input style={inputStyle} value={desc} onChange={e => setDesc(e.target.value)} placeholder="What is this project for?" />
          </Field>

          <Field label="Marketer" hint="Links the project to a marketer account so syndication is pre-wired.">
            <select style={inputStyle} value={marketer} onChange={e => setMarketer(e.target.value)}>
              <option value="">Select a marketer...</option>
              <option>SafeGuard Auto Insurance</option>
              <option>Microsoft Surface</option>
              <option>Esther Test Marketer</option>
              <option>+ Add new marketer</option>
            </select>
          </Field>

          <Field label="Relevant files" hint="Add briefs, strategy docs, or any reference material DS-1 should use as context in this project.">
            <button style={{ ...inputStyle, textAlign: "left", color: C.textTertiary, cursor: "pointer", borderStyle: "dashed" }}>+ Add files</button>
          </Field>
        </div>

        {/* Footer */}
        <div style={{
          padding: "16px 24px", borderTop: `1px solid ${C.borderLight}`,
          display: "flex", justifyContent: "flex-end", gap: "10px",
          position: "sticky", bottom: 0, backgroundColor: C.bg, borderRadius: "0 0 16px 16px",
        }}>
          <button onClick={onClose} style={{
            padding: "10px 18px", borderRadius: "8px", fontSize: "15px", fontWeight: 500,
            border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.text,
            cursor: "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif",
          }}>Cancel</button>
          <button onClick={onClose} disabled={!canCreate} style={{
            padding: "10px 20px", borderRadius: "8px", fontSize: "15px", fontWeight: 500,
            border: "none", backgroundColor: C.actionBg, color: "#fff",
            cursor: canCreate ? "pointer" : "not-allowed", opacity: canCreate ? 1 : 0.4,
            fontFamily: "'Source Sans 3', Helvetica, sans-serif",
          }}>Create project</button>
        </div>
      </div>
    </div>
  );
}

function HistoryView({ agency, onNavigate }) {
  const PROJECT_OPTIONS = ["SafeGuard Q3 Auto Campaign", "NY Sports Fans Initiative", "CPG Health & Wellness"];

  const [conversations, setConversations] = useState([
    { id: 1, title: "NY Knicks audience search & syndication", messages: 12, date: "Jun 3, 2026", project: "NY Sports Fans Initiative", transcript: [
      { role: "user", text: "Find audiences of NY Knicks fans" },
      { role: "ds1", text: "I found several prebuilt audiences for NY Knicks fans. The strongest matches are NBA > Knicks Fans (8.2M), Sports > NY Basketball Enthusiasts (14.1M), and Ticketed Event Attendees > MSG (2.3M). Want me to combine these or syndicate one?" },
      { role: "user", text: "Syndicate the Knicks Fans one to The Trade Desk" },
      { role: "ds1", text: "Done — NBA > Knicks Fans (8.2M) was syndicated to The Trade Desk and is now active in your AdGroup. Want a reach forecast on it?" },
    ] },
    { id: 2, title: "Auto Insurance Intenders — compound build", messages: 8, date: "Jun 2, 2026", project: null, transcript: [
      { role: "user", text: "Build a compound audience of auto insurance intenders who are also recent new movers" },
      { role: "ds1", text: "I built a compound audience combining Auto Insurance Intenders AND Recent New Movers using an AND rule. Combined reach is 2.6M. Should I exclude current policyholders before you syndicate?" },
      { role: "user", text: "Yes exclude current policyholders" },
      { role: "ds1", text: "Updated — current policyholders are now excluded. Final reach is 2.1M and the audience is ready to syndicate." },
    ] },
    { id: 3, title: "CPG Health & Wellness — domain seeded", messages: 6, date: "Jun 1, 2026", project: null, transcript: [
      { role: "user", text: "Build a domain seeded audience from health and wellness sites" },
      { role: "ds1", text: "I modeled a domain seeded audience from wellness seeds like healthline.com, mindbodygreen.com, and goop.com. Modeled reach is ~410M. Want to refine the seed list or syndicate?" },
    ] },
  ]);

  const [openConv, setOpenConv] = useState(null);
  const [assigningId, setAssigningId] = useState(null);
  const [draft, setDraft] = useState("");

  const sendInHistory = () => {
    if (!draft.trim()) return;
    const userMsg = draft.trim();
    const reply = { role: "ds1", text: "Picking up right where we left off — I'll take care of that and keep this conversation going. Anything else you'd like me to adjust?" };
    setOpenConv(prev => ({ ...prev, transcript: [...prev.transcript, { role: "user", text: userMsg }], messages: prev.messages + 1 }));
    setDraft("");
    setTimeout(() => setOpenConv(prev => ({ ...prev, transcript: [...prev.transcript, reply], messages: prev.messages + 1 })), 700);
  };

  const assign = (id, project) => {
    setConversations(prev => prev.map(c => c.id === id ? { ...c, project } : c));
    setAssigningId(null);
    setOpenConv(prev => prev && prev.id === id ? { ...prev, project } : prev);
  };

  // Transcript detail view
  if (openConv) {
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, overflow: "hidden" }}>
        <div style={briefHeaderStyle}>
          <button onClick={() => setOpenConv(null)} style={s.btnSecondary}>← History</button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "15px", fontWeight: 500, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{openConv.title}</div>
            <div style={{ fontSize: "13px", color: C.textTertiary }}>{openConv.messages} messages · {openConv.date}</div>
          </div>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <button onClick={() => setAssigningId(assigningId === openConv.id ? null : openConv.id)} style={{
              display: "flex", alignItems: "center", gap: "6px", padding: "7px 12px", borderRadius: "8px",
              border: `1px solid ${C.border}`, backgroundColor: openConv.project ? C.accentBlue + "14" : C.bg,
              color: openConv.project ? C.accentBlue : C.textSecondary, cursor: "pointer", fontSize: "13px", fontWeight: 500, fontFamily: "'Source Sans 3', Helvetica, sans-serif",
            }}>◳ {openConv.project || "Assign to project"} <span style={{ fontSize: "10px" }}>▾</span></button>
            {assigningId === openConv.id && <AssignMenu current={openConv.project} options={PROJECT_OPTIONS} onPick={(p) => assign(openConv.id, p)} />}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "24px clamp(20px, 5vw, 48px)" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
            {openConv.transcript.map((m, i) => (
              m.role === "user" ? (
                <div key={i} style={{ alignSelf: "flex-end", maxWidth: "80%", fontSize: "15px", color: "#fff", backgroundColor: C.text, padding: "10px 14px", borderRadius: "14px 14px 2px 14px", lineHeight: "1.5" }}>{m.text}</div>
              ) : (
                <div key={i} style={{ display: "flex", gap: "10px", maxWidth: "90%" }}>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: C.accentBlue, fontFamily: "Menlo, 'SF Mono', monospace", flexShrink: 0, marginTop: "3px" }}>DS-1</span>
                  <div style={{ fontSize: "15px", color: C.text, lineHeight: "1.6", backgroundColor: C.bgSecondary, border: `1px solid ${C.borderLight}`, padding: "12px 14px", borderRadius: "2px 14px 14px 14px" }}>{m.text}</div>
                </div>
              )
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.borderLight}`, padding: "14px clamp(20px, 5vw, 48px)", flexShrink: 0, backgroundColor: C.bgSecondary }}>
          <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", gap: "8px", alignItems: "flex-end", padding: "6px 6px 6px 14px", borderRadius: "12px", border: `1px solid ${C.border}`, backgroundColor: C.bg }}>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendInHistory(); } }}
              placeholder="Continue this conversation…"
              rows={1}
              style={{ flex: 1, border: "none", outline: "none", backgroundColor: "transparent", fontSize: "15px", fontFamily: "'Source Sans 3', Helvetica, sans-serif", color: C.text, resize: "none", lineHeight: "1.5", padding: "7px 0" }}
            />
            <button onClick={sendInHistory} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "none", cursor: "pointer", backgroundColor: draft.trim() ? C.text : C.bgHover, color: draft.trim() ? "#fff" : C.textTertiary, fontSize: "15px", flexShrink: 0 }}>↑</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.content}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <Breadcrumb onNavigate={onNavigate} current="History" />
      <div style={{ animation: "fadeUp 0.5s ease-out", marginBottom: "28px" }}>
        <h1 style={s.heading}>History</h1>
        <p style={s.subheading}>All past conversations with DS-1 for <strong>{agency.name}</strong></p>
      </div>

      <div style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "8px", animation: "fadeUp 0.5s ease-out", animationDelay: "0.05s", animationFillMode: "both" }}>
        {conversations.map((conv) => (
          <div key={conv.id} onClick={() => setOpenConv(conv)} style={{
            display: "flex", alignItems: "center", gap: "16px",
            padding: "16px 20px", borderRadius: "10px",
            border: `1px solid ${C.border}`, backgroundColor: C.bg,
            cursor: "pointer", transition: "background-color 0.15s ease",
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "15px", fontWeight: 500, color: C.text }}>{conv.title}</div>
              <div style={{ fontSize: "13px", color: C.textTertiary, marginTop: "3px", display: "flex", gap: "12px", alignItems: "center" }}>
                <span>{conv.messages} messages</span>
                <span>·</span>
                <span>{conv.date}</span>
              </div>
            </div>
            <div style={{ position: "relative", flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setAssigningId(assigningId === conv.id ? null : conv.id)} style={{
                display: "flex", alignItems: "center", gap: "6px",
                fontSize: "13px", fontWeight: 500, cursor: "pointer",
                padding: "4px 10px", borderRadius: "6px", fontFamily: "'Source Sans 3', Helvetica, sans-serif",
                border: `1px solid ${conv.project ? "transparent" : C.border}`,
                color: conv.project ? C.accentBlue : C.textTertiary,
                backgroundColor: conv.project ? C.accentBlue + "14" : C.bg,
              }}>
                {conv.project ? <><span>◳</span>{conv.project}</> : "Assign to project"}
                <span style={{ fontSize: "10px" }}>▾</span>
              </button>
              {assigningId === conv.id && <AssignMenu current={conv.project} options={PROJECT_OPTIONS} onPick={(p) => assign(conv.id, p)} />}
            </div>
            <span style={{ color: C.textTertiary, fontSize: "16px", flexShrink: 0 }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssignMenu({ current, options, onPick }) {
  return (
    <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, width: "240px", backgroundColor: C.bg, borderRadius: "10px", border: `1px solid ${C.border}`, boxShadow: "0 6px 24px rgba(0,0,0,0.12)", overflow: "hidden", zIndex: 20 }}>
      <div style={{ padding: "9px 14px", fontSize: "13px", fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: `1px solid ${C.borderLight}` }}>Assign to project</div>
      {options.map((p) => (
        <div key={p} onClick={() => onPick(p)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", cursor: "pointer", fontSize: "14px", color: C.text }}>
          <span style={{ color: C.accentBlue }}>◳</span>
          <span style={{ flex: 1 }}>{p}</span>
          {current === p && <span style={{ color: C.accentGreen, fontSize: "14px" }}>✓</span>}
        </div>
      ))}
      {current && (
        <div onClick={() => onPick(null)} style={{ padding: "10px 14px", cursor: "pointer", fontSize: "14px", color: C.accentRed, borderTop: `1px solid ${C.borderLight}` }}>Remove from project</div>
      )}
    </div>
  );
}

function SettingsView({ onNavigate }) {
  const [voiceMode, setVoiceMode] = useState("professional");
  const [customExample, setCustomExample] = useState("");
  const [defaultDsp, setDefaultDsp] = useState("ttd");
  const [defaultSsp, setDefaultSsp] = useState("indexexchange");
  const [scalePerf, setScalePerf] = useState("scale");
  const [outputFormat, setOutputFormat] = useState("pdf");
  const [autoExport, setAutoExport] = useState(false);
  const [autoNextSteps, setAutoNextSteps] = useState(true);
  const [showThinking, setShowThinking] = useState(true);
  const [confirmSyndication, setConfirmSyndication] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  const [prompts, setPrompts] = useState([
    { id: 1, label: "Trade Desk brief rules", prompt: "For Trade Desk audience briefs, only recommend 3 products and never show prebuilts" },
  ]);

  const OptionPill = ({ options, value, onChange }) => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {options.map(opt => (
        <button key={opt.value} onClick={() => onChange(opt.value)} style={{
          padding: "8px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: 500,
          border: `1px solid ${value === opt.value ? C.text : C.border}`,
          backgroundColor: value === opt.value ? C.text : C.bg,
          color: value === opt.value ? "#fff" : C.textSecondary,
          cursor: "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif",
          transition: "all 0.15s ease", whiteSpace: "nowrap",
        }}>{opt.label}</button>
      ))}
    </div>
  );

  const Toggle = ({ on, onToggle }) => (
    <button onClick={onToggle} style={{
      width: "44px", height: "24px", borderRadius: "12px",
      border: "none", cursor: "pointer",
      display: "flex", alignItems: "center",
      padding: "2px", flexShrink: 0,
      backgroundColor: on ? C.accentGreen : C.bgHover,
      justifyContent: on ? "flex-end" : "flex-start",
      transition: "background-color 0.2s ease",
    }}>
      <div style={{
        width: "20px", height: "20px", borderRadius: "50%",
        backgroundColor: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
      }} />
    </button>
  );

  return (
    <div style={s.content}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <Breadcrumb onNavigate={onNavigate} current="Settings" />
      <div style={{ animation: "fadeUp 0.5s ease-out", marginBottom: "36px" }}>
        <h1 style={s.heading}>Settings</h1>
        <p style={s.subheading}>Customize how DS-1 works for you</p>
      </div>

      <div style={{ maxWidth: "640px" }}>

        {/* Response Style */}
        <div style={setS.section}>
          <div style={setS.sectionTitle}>Response Style</div>
          <div style={setS.sectionDesc}>Control how DS-1 communicates with you</div>

          <div style={{ display: "flex", gap: "4px", marginTop: "16px" }}>
            {[
              { value: "casual", label: "Casual" },
              { value: "professional", label: "Professional" },
              { value: "custom", label: "Custom" },
            ].map(opt => (
              <button key={opt.value} onClick={() => setVoiceMode(opt.value)} style={{
                padding: "8px 18px", borderRadius: "8px", fontSize: "14px", fontWeight: 500,
                border: `1px solid ${voiceMode === opt.value ? C.text : C.border}`,
                backgroundColor: voiceMode === opt.value ? C.text : C.bg,
                color: voiceMode === opt.value ? "#fff" : C.textSecondary,
                cursor: "pointer", fontFamily: "'Source Sans 3', Helvetica, sans-serif",
                transition: "all 0.15s ease",
              }}>{opt.label}</button>
            ))}
          </div>

          {voiceMode === "casual" && (
            <div style={setS.voicePreview}>
              DS-1 will use a relaxed, conversational tone — shorter sentences, less jargon, more direct.
            </div>
          )}
          {voiceMode === "professional" && (
            <div style={setS.voicePreview}>
              DS-1 will use a clear, professional tone — structured responses, industry terminology where appropriate.
            </div>
          )}
          {voiceMode === "custom" && (
            <div style={{ marginTop: "14px" }}>
              <div style={{ fontSize: "14px", color: C.textSecondary, marginBottom: "8px" }}>
                Paste an example of how you'd like DS-1 to communicate. It will learn from the style, tone, and structure.
              </div>
              <textarea
                value={customExample}
                onChange={(e) => setCustomExample(e.target.value)}
                placeholder="e.g. 'Here are your top 3 audience picks for this campaign. Each one is ranked by estimated reach. Let me know which one to syndicate and I'll handle the rest.'"
                rows={4}
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: "8px",
                  border: `1px solid ${C.border}`, backgroundColor: C.bg,
                  color: C.text, fontSize: "14px", fontFamily: "'Source Sans 3', Helvetica, sans-serif",
                  outline: "none", resize: "vertical", lineHeight: "1.6",
                  boxSizing: "border-box",
                }}
              />
              {customExample.trim() && (
                <button style={{
                  marginTop: "8px", padding: "7px 16px", borderRadius: "6px",
                  fontSize: "13px", fontWeight: 500, border: "none",
                  backgroundColor: C.actionBg, color: "#fff", cursor: "pointer",
                  fontFamily: "'Source Sans 3', Helvetica, sans-serif",
                }}>Save style</button>
              )}
            </div>
          )}
        </div>

        {/* Workflow Defaults */}
        <div style={setS.section}>
          <div style={setS.sectionTitle}>Workflow Defaults</div>
          <div style={setS.sectionDesc}>Pre-fill common selections so DS-1 skips the questions</div>

          <div style={{ marginTop: "16px" }}>
            <div style={{ padding: "14px 0", borderBottom: `1px solid ${C.borderLight}` }}>
              <div style={setS.label}>Default DSP</div>
              <div style={setS.labelDesc}>Pre-selected demand-side platform when syndicating</div>
              <div style={{ marginTop: "12px" }}>
                <OptionPill value={defaultDsp} onChange={setDefaultDsp} options={[
                  { value: "ttd", label: "TTD" },
                  { value: "yahoo", label: "Yahoo" },
                  { value: "liveramp", label: "LiveRamp" },
                  { value: "none", label: "Ask me" },
                ]} />
              </div>
            </div>
            <div style={{ padding: "14px 0", borderBottom: `1px solid ${C.borderLight}` }}>
              <div style={setS.label}>Default SSP</div>
              <div style={setS.labelDesc}>Pre-selected supply-side platform when syndicating</div>
              <div style={{ marginTop: "12px" }}>
                <OptionPill value={defaultSsp} onChange={setDefaultSsp} options={[
                  { value: "indexexchange", label: "Index Exchange" },
                  { value: "openx", label: "OpenX" },
                  { value: "pubmatic", label: "PubMatic" },
                  { value: "microsoft_curate", label: "Microsoft Curate" },
                ]} />
              </div>
            </div>
            <div style={{ padding: "14px 0" }}>
              <div style={setS.label}>Scale vs Performance</div>
              <div style={setS.labelDesc}>Default optimization when syndicating</div>
              <div style={{ marginTop: "12px" }}>
                <OptionPill value={scalePerf} onChange={setScalePerf} options={[
                  { value: "scale", label: "Scale" },
                  { value: "performance", label: "Performance" },
                  { value: "ask", label: "Ask me" },
                ]} />
              </div>
            </div>
          </div>
        </div>

        {/* Agent Behavior */}
        <div style={setS.section}>
          <div style={setS.sectionTitle}>Agent Behavior</div>
          <div style={setS.sectionDesc}>Fine-tune how DS-1 acts during workflows</div>

          <div style={{ marginTop: "16px" }}>
            <div style={setS.row}>
              <div style={setS.rowLabel}>
                <div style={setS.label}>Auto-suggest Next Steps</div>
                <div style={setS.labelDesc}>Show numbered options after each action</div>
              </div>
              <Toggle on={autoNextSteps} onToggle={() => setAutoNextSteps(!autoNextSteps)} />
            </div>
            <div style={setS.row}>
              <div style={setS.rowLabel}>
                <div style={setS.label}>Show Thinking Steps</div>
                <div style={setS.labelDesc}>Display what DS-1 is doing while processing</div>
              </div>
              <Toggle on={showThinking} onToggle={() => setShowThinking(!showThinking)} />
            </div>
            <div style={setS.row}>
              <div style={setS.rowLabel}>
                <div style={setS.label}>Confirm Before Syndication</div>
                <div style={setS.labelDesc}>Always ask for confirmation before pushing to a DSP</div>
              </div>
              <Toggle on={confirmSyndication} onToggle={() => setConfirmSyndication(!confirmSyndication)} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const setS = {
  section: {
    marginBottom: "36px",
    animation: "fadeUp 0.4s ease-out",
    animationFillMode: "both",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: 500,
    color: C.text,
  },
  sectionDesc: {
    fontSize: "14px",
    color: C.textTertiary,
    marginTop: "2px",
  },
  voicePreview: {
    marginTop: "14px",
    padding: "12px 16px",
    borderRadius: "8px",
    backgroundColor: C.bgSidebar,
    border: `1px solid ${C.borderLight}`,
    fontSize: "14px",
    color: C.textSecondary,
    lineHeight: "1.6",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    padding: "14px 0",
    borderBottom: `1px solid ${C.borderLight}`,
  },
  rowLabel: {
    flex: 1,
    minWidth: 0,
  },
  label: {
    fontSize: "15px",
    fontWeight: 500,
    color: C.text,
  },
  labelDesc: {
    fontSize: "13px",
    color: C.textTertiary,
    marginTop: "2px",
  },
  promptCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 16px",
    borderRadius: "8px",
    border: `1px solid ${C.border}`,
    backgroundColor: C.bg,
  },
};

function AdminView({ agency, onNavigate }) {
  const ALL_CAPABILITIES = [
    {
      category: "Audience Explorer & Insights",
      icon: "◎",
      tools: [
        { id: "explore_prebuilt", name: "Explore Prebuilt Audiences", desc: "Search and discover audiences from Dstillery's catalog." },
        { id: "partnership_search", name: "Partnership Audience Search", desc: "Search for audiences from partnership data providers (NIQ, Emporia, Screen Engine)." },
        { id: "predictive_lift", name: "Run Predictive Lift Analysis", desc: "Find high-performing audiences based on your first-party data." },
        { id: "persona_deck", name: "Persona Insights Deck", desc: "Generate a client-ready insights deck for an existing ID-free audience." },
      ],
    },
    {
      category: "Audience Development & Modeling",
      icon: "⊞",
      tools: [
        { id: "build_search", name: "Build Search Audience", desc: "Create keyword-based search audiences (ID-Based or ID-Free)." },
        { id: "build_purchase_intent", name: "Build Purchase Intent Audience", desc: "Target users researching or shopping (ID-Based or ID-Free)." },
        { id: "build_domain_seeded", name: "Build Domain Seeded Audience", desc: "Create custom audiences from topics or your own domains." },
        { id: "build_compound", name: "Build Compound Audience", desc: "Combine prebuilt audiences based on a topic." },
        { id: "create_pixel", name: "Create Pixel", desc: "Set up tracking pixels for site visitors, conversions, or ad viewers." },
      ],
    },
    {
      category: "Syndication & Distribution",
      icon: "↗",
      tools: [
        { id: "syndication", name: "Syndicate Audience", desc: "Push audiences to DSPs including The Trade Desk, DV360, and Amazon DSP." },
        { id: "liveramp", name: "LiveRamp Distribution", desc: "Syndicate audiences via LiveRamp for cross-platform identity resolution." },
        { id: "index_exchange", name: "Index Exchange Deals", desc: "Create and manage deal IDs for programmatic activation on Index Exchange." },
        { id: "ad_groups", name: "Create Ad Groups in TTD", desc: "Create audiences as ad groups directly within The Trade Desk." },
      ],
    },
    {
      category: "Reporting & Measurement",
      icon: "◫",
      tools: [
        { id: "daily_activity", name: "Daily Client Activity Report", desc: "Summary of all client audience activity across builds, syndications, and usage." },
        { id: "segrank", name: "SegRank", desc: "Rank and compare audience segments by reach, relevance, and performance potential." },
      ],
    },
    {
      category: "Workspace Management",
      icon: "☰",
      tools: [
        { id: "ooo", name: "Out of Office", desc: "Set coverage persons and auto-expiration for team member OOO periods." },
        { id: "notifications", name: "Notifications", desc: "Configure alerts for build completions, syndication status, and action items." },
      ],
    },
  ];

  const DEFAULT_ENABLED = {
    dstillery: ["explore_prebuilt", "partnership_search", "predictive_lift", "persona_deck", "build_search", "build_purchase_intent", "build_domain_seeded", "build_compound", "create_pixel", "syndication", "liveramp", "index_exchange", "ad_groups", "daily_activity", "segrank", "reach_forecasting", "ooo", "notifications", "user_management", "marketer_management"],
    sokal: ["explore_prebuilt", "partnership_search", "build_search", "build_domain_seeded", "build_compound", "create_pixel", "syndication", "liveramp", "index_exchange", "daily_activity", "segrank", "ooo", "notifications"],
    keynes: ["explore_prebuilt", "build_search", "build_compound", "syndication", "index_exchange", "daily_activity", "notifications"],
  };

  const [enabled, setEnabled] = useState(DEFAULT_ENABLED[agency.id] || []);

  const DEFAULT_TEAMS = {
    ooo: ["cs"],
    notifications: ["cs"],
    daily_activity: ["cs"],
    user_management: ["cs"],
    marketer_management: ["cs"],
    explore_prebuilt: ["general"],
    partnership_search: ["general"],
    predictive_lift: ["general"],
    persona_deck: ["general"],
    build_search: ["general"],
    build_purchase_intent: ["general"],
    build_domain_seeded: ["general"],
    build_compound: ["general"],
    create_pixel: ["general"],
    syndication: ["general"],
    liveramp: ["general"],
    index_exchange: ["general"],
    ad_groups: ["general"],
    segrank: ["general"],
    reach_forecasting: ["general"],
  };

  const [teamAssignments, setTeamAssignments] = useState(DEFAULT_TEAMS);

  const toggleTeam = (toolId, team) => {
    setTeamAssignments(prev => {
      const current = prev[toolId] || [];
      const has = current.includes(team);
      return {
        ...prev,
        [toolId]: has ? current.filter(t => t !== team) : [...current, team],
      };
    });
  };

  const toggle = (id) => {
    setEnabled(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // Data providers
  const [providers, setProviders] = useState({ dstillery: true, liveramp: true, taxonomy: false });
  const LIVERAMP_PROVIDERS = ["NIQ", "Oracle Data Cloud", "Experian", "Adstra", "Alliant", "Stirista", "Screen Engine", "Emporia"];
  const [lrSelected, setLrSelected] = useState(["NIQ", "Experian", "Screen Engine"]);

  const toggleProvider = (key) => setProviders(prev => ({ ...prev, [key]: !prev[key] }));
  const toggleLr = (p) => setLrSelected(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

  const ProvToggle = ({ on, onToggle }) => (
    <button onClick={onToggle} style={{
      width: "44px", height: "24px", borderRadius: "12px", border: "none", cursor: "pointer",
      display: "flex", alignItems: "center", padding: "2px", flexShrink: 0,
      backgroundColor: on ? C.accentGreen : C.bgHover,
      justifyContent: on ? "flex-end" : "flex-start", transition: "background-color 0.2s ease",
    }}>
      <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
    </button>
  );

  const enabledCount = enabled.length;
  const totalCount = ALL_CAPABILITIES.reduce((sum, cat) => sum + cat.tools.length, 0);

  return (
    <div style={s.content}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <Breadcrumb onNavigate={onNavigate} current="Admin" />
      <div style={{ animation: "fadeUp 0.5s ease-out", marginBottom: "36px" }}>
        <h1 style={s.heading}>Workspace Admin</h1>
        <p style={s.subheading}>
          Configure which capabilities are enabled for <strong>{agency.name}</strong> and assign team access.
        </p>
      </div>

      {/* Legend */}
      <div style={{
        display: "flex", gap: "16px", alignItems: "center",
        marginBottom: "20px", maxWidth: "720px",
        animation: "fadeUp 0.5s ease-out", animationDelay: "0.02s", animationFillMode: "both",
      }}>
        <span style={{ fontSize: "13px", color: C.textTertiary, fontWeight: 500 }}>TEAM ACCESS:</span>
        <div style={{ display: "flex", gap: "8px" }}>
          <span style={{ ...adminS.teamBadge, backgroundColor: C.accentPurple + "14", color: C.accentPurple }}>CS</span>
          <span style={{ ...adminS.teamBadge, backgroundColor: C.accentBlue + "14", color: C.accentBlue }}>General</span>
        </div>
        <span style={{ fontSize: "13px", color: C.textTertiary, fontStyle: "italic" }}>Click badges to assign</span>
      </div>

      {/* Summary bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: "16px",
        padding: "14px 20px", borderRadius: "10px",
        backgroundColor: C.bgSidebar, border: `1px solid ${C.borderLight}`,
        marginBottom: "32px", maxWidth: "720px",
        animation: "fadeUp 0.5s ease-out", animationDelay: "0.05s", animationFillMode: "both",
      }}>
        <div style={{
          ...adminS.agencyDot,
          backgroundColor: agency.color + "18", color: agency.color,
        }}>{agency.initials}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "15px", fontWeight: 500, color: C.text }}>{agency.name}</div>
          <div style={{ fontSize: "13px", color: C.textTertiary }}>{enabledCount} of {totalCount} capabilities enabled</div>
        </div>
        <div style={adminS.progressBar}>
          <div style={{ ...adminS.progressFill, width: `${(enabledCount / totalCount) * 100}%` }} />
        </div>
      </div>

      {/* Data Providers */}
      <div style={{ maxWidth: "720px", marginBottom: "36px", animation: "fadeUp 0.5s ease-out", animationDelay: "0.08s", animationFillMode: "both" }}>
        <div style={adminS.catHeader}>
          <span style={adminS.catIcon}>⊟</span>
          <span style={adminS.catTitle}>Data Providers</span>
        </div>
        <div style={{ fontSize: "14px", color: C.textTertiary, marginBottom: "12px", paddingLeft: "4px" }}>
          Control which data sources appear in audience results for this workspace
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {/* Dstillery */}
          <div style={adminS.provCard}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ ...adminS.provBadge, backgroundColor: C.accentBlue + "18", color: C.accentBlue }}>Ds</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "15px", fontWeight: 500, color: C.text }}>Dstillery Audiences <span style={{ fontSize: "13px", fontWeight: 500, color: C.accentGreen, backgroundColor: C.accentGreen + "14", padding: "1px 7px", borderRadius: "4px", marginLeft: "4px" }}>Default</span></div>
                <div style={{ fontSize: "13px", color: C.textTertiary, marginTop: "2px" }}>Dstillery's full first-party behavioral catalog</div>
              </div>
              <ProvToggle on={providers.dstillery} onToggle={() => toggleProvider("dstillery")} />
            </div>
          </div>

          {/* LiveRamp */}
          <div style={adminS.provCard}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ ...adminS.provBadge, backgroundColor: C.accentGreen + "18", color: C.accentGreen }}>LR</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "15px", fontWeight: 500, color: C.text }}>LiveRamp Marketplace</div>
                <div style={{ fontSize: "13px", color: C.textTertiary, marginTop: "2px" }}>Pulls third-party providers via the LiveRamp connector</div>
              </div>
              <ProvToggle on={providers.liveramp} onToggle={() => toggleProvider("liveramp")} />
            </div>

            {providers.liveramp && (
              <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: `1px solid ${C.borderLight}` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: C.textSecondary }}>
                    Marketplace providers
                    <span style={{ fontSize: "10px", fontWeight: 500, color: C.textTertiary, backgroundColor: C.bgHover, padding: "1px 6px", borderRadius: "3px", marginLeft: "6px", fontFamily: "Menlo, 'SF Mono', monospace" }}>via LiveRamp MCP</span>
                  </span>
                  <span style={{ fontSize: "13px", color: C.textTertiary }}>{lrSelected.length} of {LIVERAMP_PROVIDERS.length} selected</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {LIVERAMP_PROVIDERS.map(p => {
                    const on = lrSelected.includes(p);
                    return (
                      <button key={p} onClick={() => toggleLr(p)} style={{
                        display: "flex", alignItems: "center", gap: "6px",
                        padding: "6px 12px", borderRadius: "7px", fontSize: "13px", fontWeight: 500,
                        border: `1px solid ${on ? C.accentGreen : C.border}`,
                        backgroundColor: on ? C.accentGreen + "10" : C.bg,
                        color: on ? C.text : C.textTertiary, cursor: "pointer",
                        fontFamily: "'Source Sans 3', Helvetica, sans-serif", transition: "all 0.15s ease",
                      }}>
                        <span style={{ color: on ? C.accentGreen : C.textTertiary }}>{on ? "✓" : "+"}</span>
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Upload taxonomy */}
          <div style={adminS.provCard}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ ...adminS.provBadge, backgroundColor: C.accentPurple + "18", color: C.accentPurple }}>⇡</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "15px", fontWeight: 500, color: C.text }}>Upload Your Own Taxonomy</div>
                <div style={{ fontSize: "13px", color: C.textTertiary, marginTop: "2px" }}>Bring a custom segment taxonomy to surface in results</div>
              </div>
              <ProvToggle on={providers.taxonomy} onToggle={() => toggleProvider("taxonomy")} />
            </div>

            {providers.taxonomy && (
              <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: `1px solid ${C.borderLight}` }}>
                <button style={{
                  width: "100%", padding: "16px", borderRadius: "8px",
                  border: `1px dashed ${C.border}`, backgroundColor: "transparent",
                  color: C.textTertiary, cursor: "pointer", fontSize: "14px",
                  fontFamily: "'Source Sans 3', Helvetica, sans-serif",
                }}>+ Upload taxonomy file (CSV, XLSX)</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Capability categories */}
      <div style={{ maxWidth: "720px" }}>
        {ALL_CAPABILITIES.map((cat, ci) => {
          const catEnabled = cat.tools.filter(t => enabled.includes(t.id)).length;
          return (
            <div key={cat.category} style={{
              marginBottom: "28px",
              animation: "fadeUp 0.4s ease-out",
              animationDelay: `${0.1 + ci * 0.06}s`,
              animationFillMode: "both",
            }}>
              <div style={adminS.catHeader}>
                <span style={adminS.catIcon}>{cat.icon}</span>
                <span style={adminS.catTitle}>{cat.category}</span>
                <span style={adminS.catCount}>{catEnabled}/{cat.tools.length}</span>
              </div>

              <div style={adminS.toolList}>
                {cat.tools.map((tool) => {
                  const isOn = enabled.includes(tool.id);
                  const teams = teamAssignments[tool.id] || [];
                  const showsTeams = ["ooo", "notifications", "daily_activity"].includes(tool.id);
                  return (
                    <div key={tool.id} style={adminS.toolRow}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "15px", fontWeight: 500, color: isOn ? C.text : C.textTertiary }}>{tool.name}</span>
                          {showsTeams && (
                          <div style={{ display: "flex", gap: "4px" }}>
                            <button
                              onClick={() => isOn && toggleTeam(tool.id, "cs")}
                              style={{
                                ...adminS.teamBadge,
                                backgroundColor: teams.includes("cs") ? C.accentPurple + "14" : "transparent",
                                color: teams.includes("cs") ? C.accentPurple : C.borderLight,
                                border: `1px solid ${teams.includes("cs") ? C.accentPurple + "30" : C.borderLight}`,
                                cursor: isOn ? "pointer" : "default",
                                opacity: isOn ? 1 : 0.4,
                              }}
                            >CS</button>
                            <button
                              onClick={() => isOn && toggleTeam(tool.id, "general")}
                              style={{
                                ...adminS.teamBadge,
                                backgroundColor: teams.includes("general") ? C.accentBlue + "14" : "transparent",
                                color: teams.includes("general") ? C.accentBlue : C.borderLight,
                                border: `1px solid ${teams.includes("general") ? C.accentBlue + "30" : C.borderLight}`,
                                cursor: isOn ? "pointer" : "default",
                                opacity: isOn ? 1 : 0.4,
                              }}
                            >General</button>
                          </div>
                          )}
                        </div>
                        <div style={{ fontSize: "13px", color: C.textTertiary, lineHeight: "1.5", marginTop: "2px" }}>{tool.desc}</div>
                      </div>
                      <button
                        onClick={() => toggle(tool.id)}
                        style={{
                          ...adminS.toggle,
                          backgroundColor: isOn ? C.accentGreen : C.bgHover,
                          justifyContent: isOn ? "flex-end" : "flex-start",
                        }}
                      >
                        <div style={adminS.toggleKnob} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const adminS = {
  agencyDot: {
    width: "36px", height: "36px", borderRadius: "8px",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "Menlo, 'SF Mono', monospace", fontSize: "13px", fontWeight: 500,
    flexShrink: 0,
  },
  progressBar: {
    width: "120px", height: "6px", borderRadius: "3px",
    backgroundColor: C.bgHover, overflow: "hidden", flexShrink: 0,
  },
  progressFill: {
    height: "100%", borderRadius: "3px",
    backgroundColor: C.accentGreen,
    transition: "width 0.3s ease",
  },
  catHeader: {
    display: "flex", alignItems: "center", gap: "8px",
    marginBottom: "8px", padding: "0 4px",
  },
  catIcon: {
    fontSize: "16px", color: C.textTertiary, width: "24px", textAlign: "center",
  },
  catTitle: {
    fontSize: "14px", fontWeight: 500, color: C.text,
    textTransform: "uppercase", letterSpacing: "0.5px",
  },
  catCount: {
    fontSize: "13px", color: C.textTertiary,
    fontFamily: "Menlo, 'SF Mono', monospace",
    marginLeft: "auto",
  },
  toolList: {
    border: `1px solid ${C.border}`, borderRadius: "10px",
    overflow: "hidden",
  },
  toolRow: {
    display: "flex", alignItems: "center", gap: "16px",
    padding: "14px 18px",
    borderBottom: `1px solid ${C.borderLight}`,
    backgroundColor: C.bg,
  },
  toggle: {
    width: "44px", height: "24px", borderRadius: "12px",
    border: "none", cursor: "pointer",
    display: "flex", alignItems: "center",
    padding: "2px", flexShrink: 0,
    transition: "background-color 0.2s ease",
  },
  toggleKnob: {
    width: "20px", height: "20px", borderRadius: "50%",
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
    transition: "transform 0.2s ease",
  },
  teamBadge: {
    fontSize: "10px",
    fontWeight: 500,
    padding: "2px 8px",
    borderRadius: "4px",
    fontFamily: "Menlo, 'SF Mono', monospace",
    letterSpacing: "0.3px",
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
  provCard: {
    padding: "16px 18px",
    borderRadius: "10px",
    border: `1px solid ${C.border}`,
    backgroundColor: C.bg,
  },
  provBadge: {
    width: "36px", height: "36px", borderRadius: "8px",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "Menlo, 'SF Mono', monospace", fontSize: "14px", fontWeight: 500,
    flexShrink: 0,
  },
};

const actS = {
  heading: {
    fontSize: "22px",
    fontWeight: 400,
    color: C.textSecondary,
    margin: "0 0 24px 0",
    letterSpacing: "-0.3px",
  },
  card: {
    border: `1px solid ${C.border}`,
    borderRadius: "12px",
    overflow: "hidden",
    marginBottom: "16px",
    backgroundColor: C.bg,
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 20px",
    borderBottom: `1px solid ${C.borderLight}`,
  },
  cardIcon: {
    fontSize: "15px",
    color: C.textTertiary,
    width: "20px",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "15px",
    fontWeight: 500,
    color: C.text,
  },
  cardContext: {
    fontSize: "14px",
    color: C.textTertiary,
  },
  reviewLink: {
    fontSize: "14px",
    fontWeight: 500,
    color: C.text,
    marginLeft: "auto",
    cursor: "pointer",
  },
  cardBody: {
    padding: "4px 0",
  },
  taskRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px 20px",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  taskText: {
    fontSize: "15px",
    color: C.text,
    flex: 1,
  },
  fileBadge: {
    fontSize: "13px",
    color: C.textTertiary,
    backgroundColor: C.bgSidebar,
    border: `1px solid ${C.borderLight}`,
    padding: "4px 10px",
    borderRadius: "6px",
    fontFamily: "Menlo, 'SF Mono', monospace",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
};

const s = {
  shell: {
    display: "flex",
    width: "100%",
    fontFamily: "'Source Sans 3', Helvetica, sans-serif",
    color: C.text,
    backgroundColor: C.bg,
    overflow: "hidden",
  },

  // Sidebar
  sidebar: {
    width: "260px",
    minWidth: "260px",
    backgroundColor: C.bgSidebar,
    borderRight: `1px solid ${C.borderLight}`,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    flexShrink: 0,
    transition: "width 0.2s ease, min-width 0.2s ease",
    overflow: "hidden",
  },
  sidebarLogo: {
    padding: "20px 16px 16px",
    display: "flex",
    alignItems: "center",
  },
  collapseBtn: {
    background: "none",
    border: `1px solid ${C.border}`,
    borderRadius: "6px",
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: C.textTertiary,
    fontSize: "16px",
    fontFamily: "inherit",
    transition: "background-color 0.15s ease",
  },
  agencyAvatarCollapsed: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Menlo, 'SF Mono', monospace",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    margin: "0 auto",
  },
  logoMark: {
    backgroundColor: C.actionBg,
    borderRadius: "8px",
    padding: "5px 10px",
  },
  logoText: {
    fontFamily: "'Urbanist', Arial, sans-serif",
    fontWeight: 500,
    fontSize: "15px",
    color: "#fff",
    letterSpacing: "0.5px",
  },

  // Agency switcher
  agencySwitcher: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.15s ease",
    border: `1px solid ${C.border}`,
    backgroundColor: C.bg,
  },
  agencyAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Menlo, 'SF Mono', monospace",
    fontSize: "13px",
    fontWeight: 500,
    flexShrink: 0,
  },
  agencyName: {
    fontSize: "14px",
    fontWeight: 500,
    color: C.text,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  agencyLabel: {
    fontSize: "13px",
    color: C.textTertiary,
  },
  dropdown: {
    marginTop: "4px",
    backgroundColor: C.bg,
    border: `1px solid ${C.border}`,
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  },
  dropdownHeader: {
    fontSize: "13px",
    color: C.textTertiary,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    padding: "10px 14px 6px",
    fontWeight: 500,
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 14px",
    cursor: "pointer",
    transition: "background-color 0.1s ease",
  },
  agencyAvatarSmall: {
    width: "26px",
    height: "26px",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Menlo, 'SF Mono', monospace",
    fontSize: "10px",
    fontWeight: 500,
    flexShrink: 0,
  },
  dropdownItemText: {
    fontSize: "14px",
    color: C.text,
  },

  // Nav
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    padding: "0 12px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Source Sans 3', Helvetica, sans-serif",
    fontSize: "15px",
    transition: "all 0.15s ease",
    textAlign: "left",
    width: "100%",
  },

  // Sidebar footer
  sidebarFooter: {
    marginTop: "auto",
    padding: "16px 24px",
    borderTop: `1px solid ${C.borderLight}`,
  },
  statusRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  statusDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    backgroundColor: C.accentOrangeDark,
  },

  // Main area
  main: {
    flex: 1,
    minWidth: 0,
    overflowY: "auto",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    padding: "48px clamp(20px, 5vw, 64px)",
    maxWidth: "920px",
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box",
  },

  // Typography
  heading: {
    fontSize: "30px",
    fontWeight: 500,
    color: C.text,
    margin: 0,
    letterSpacing: "-0.5px",
    fontFamily: "'Urbanist', Arial, sans-serif",
  },
  subheading: {
    fontSize: "15px",
    color: C.textSecondary,
    marginTop: "8px",
    fontWeight: 400,
  },
  sectionLabel: {
    fontSize: "13px",
    color: C.textTertiary,
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: 500,
  },

  // Home cards
  cardGrid: {
    display: "flex",
    gap: "20px",
    width: "100%",
    maxWidth: "720px",
    animation: "fadeUp 0.5s ease-out",
    animationFillMode: "both",
  },
  card: {
    flex: 1,
    background: C.bgCard,
    border: `1px solid ${C.border}`,
    borderRadius: "12px",
    padding: "32px 24px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    outline: "none",
    fontFamily: "inherit",
    color: C.text,
  },
  cardHovered: {
    backgroundColor: C.bgSecondary,
    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
    borderColor: "#d3d1cb",
  },
  cardIconWrap: (bg, color) => ({
    width: "48px", height: "48px", borderRadius: "10px",
    backgroundColor: bg, color: color,
    display: "flex", alignItems: "center", justifyContent: "center",
    marginBottom: "18px",
  }),
  cardTitle: {
    fontSize: "20px", fontWeight: 500, margin: "0 0 8px 0", letterSpacing: "-0.2px", color: C.text,
  },
  cardDesc: {
    fontSize: "15px", color: C.textSecondary, lineHeight: "1.6", margin: 0, flex: 1,
  },
  cardFooter: {
    marginTop: "24px", paddingTop: "16px", borderTop: `1px solid ${C.borderLight}`,
  },
  cardAction: (color) => ({
    fontSize: "14px", fontWeight: 500, color: color, fontFamily: "Menlo, 'SF Mono', monospace",
  }),

  // Recent activity
  recentList: {
    display: "flex", flexDirection: "column", borderRadius: "10px",
    overflow: "hidden", border: `1px solid ${C.border}`,
  },
  recentItem: {
    display: "flex", alignItems: "center", gap: "14px",
    padding: "14px 18px", borderBottom: `1px solid ${C.borderLight}`, backgroundColor: C.bg,
  },
  recentName: {
    fontSize: "15px", fontWeight: 500, display: "block", color: C.text,
  },
  recentMeta: {
    fontSize: "13px", color: C.textTertiary, display: "block", marginTop: "2px",
  },
  recentTime: {
    fontSize: "13px", color: C.textTertiary, fontFamily: "Menlo, 'SF Mono', monospace", flexShrink: 0,
  },

  // Notification styles
  notifCard: {
    padding: "16px 18px",
    backgroundColor: C.bg,
  },
  notifName: {
    fontSize: "15px",
    fontWeight: 500,
    color: C.text,
  },
  notifMeta: {
    fontSize: "13px",
    color: C.textTertiary,
    marginTop: "3px",
    fontFamily: "Menlo, 'SF Mono', monospace",
  },
  statusBadge: (bg, color) => ({
    display: "inline-block",
    fontSize: "13px",
    fontWeight: 500,
    color: color,
    backgroundColor: bg,
    padding: "2px 8px",
    borderRadius: "4px",
    fontFamily: "Menlo, 'SF Mono', monospace",
  }),
  btnPrimary: {
    padding: "6px 16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: C.actionBg,
    color: "#fff",
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "'Source Sans 3', Helvetica, sans-serif",
    cursor: "pointer",
  },
  btnSecondary: {
    padding: "6px 16px",
    borderRadius: "6px",
    border: `1px solid ${C.border}`,
    backgroundColor: C.bg,
    color: C.text,
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "'Source Sans 3', Helvetica, sans-serif",
    cursor: "pointer",
  },
  emptyState: {
    padding: "16px 18px",
    fontSize: "15px",
    color: C.textTertiary,
    fontStyle: "italic",
    backgroundColor: C.bg,
  },
};
