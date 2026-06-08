"use client";

import { useState, useEffect } from "react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Space+Mono:wght@400;700&display=swap');
`;

const C = {
  bg: "#ffffff",
  bgSecondary: "#fbfbfa",
  bgSidebar: "#f7f6f3",
  bgHover: "#efeeeb",
  bgCard: "#ffffff",
  border: "#e8e5e0",
  borderLight: "#eeece9",
  text: "#37352f",
  textSecondary: "#787774",
  textTertiary: "#a4a29e",
  accentBlue: "#2eaadc",
  accentGreen: "#0f7b6c",
  accentOrange: "#d9730d",
  accentRed: "#e03e3e",
  accentPurple: "#6940a5",
  accentPink: "#ad1a72",
};

const AGENCIES = [
  { id: "dstillery", name: "Dstillery", initials: "Ds", color: C.accentBlue },
  { id: "sokal", name: "Sokal", initials: "So", color: C.accentGreen },
  { id: "keynes", name: "Keynes", initials: "Ke", color: C.accentPurple },
];

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function DS1App() {
  const [activeView, setActiveView] = useState("home");
  const [activeAgency, setActiveAgency] = useState(AGENCIES[0]);
  const [agencyDropdownOpen, setAgencyDropdownOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: "⌂" },
    { id: "projects", label: "Audience Plan", icon: "◳" },
    { id: "library", label: "Library", icon: "◧" },
    { id: "history", label: "History", icon: "↻" },
    { id: "settings", label: "Settings", icon: "✦" },
    { id: "admin", label: "Admin", icon: "⚙" },
  ];

  return (
    <div style={s.shell}>
      <style>{FONTS}</style>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; }
      `}</style>

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
                        <span style={{ color: C.accentGreen, fontSize: "14px", marginLeft: "auto" }}>✓</span>
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
              style={{ ...s.collapseBtn, width: "100%", fontSize: "14px" }}
              title="Expand sidebar"
            >›</button>
          </div>
        )}

        {/* Sidebar footer */}
        <div style={{ ...s.sidebarFooter, justifyContent: collapsed ? "center" : "flex-start" }}>
          <div style={{ ...s.statusRow, justifyContent: collapsed ? "center" : "flex-start" }}>
            <div style={s.statusDot} />
            {!collapsed && <span style={{ fontSize: "12px", color: C.textTertiary }}>Connected</span>}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={s.main} key={`${activeAgency.id}-${activeView}`}>
        {activeView === "home" && <HomeView agency={activeAgency} onNavigate={setActiveView} />}
        {activeView === "projects" && <ProjectsView agency={activeAgency} />}
        {activeView === "discover" && <DiscoverView onNavigate={setActiveView} />}
        {activeView === "build" && <BuildView onNavigate={setActiveView} />}
        {activeView === "explorer" && <AudienceExplorerChat onBack={() => setActiveView("home")} />}
        {activeView === "domainseeded" && <DomainSeededCanvas onBack={() => setActiveView("build")} />}
        {activeView === "brief" && <AudienceBriefBuilder onBack={() => setActiveView("discover")} />}
        {activeView === "pixel" && <PixelCreator onBack={() => setActiveView("build")} />}
        {activeView === "history" && <HistoryView agency={activeAgency} />}
        {activeView === "library" && <LibraryView agency={activeAgency} />}
        {activeView === "settings" && <SettingsView />}
        {activeView === "admin" && <AdminView agency={activeAgency} />}
      </main>
    </div>
  );
}

function HomeView({ agency, onNavigate }) {
  const [hovered, setHovered] = useState(null);
  const [chatInput, setChatInput] = useState("");

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
          <div style={{ fontSize: "13px", fontWeight: 600, color: C.textTertiary, marginBottom: "6px" }}>{agency.name}</div>
          <h1 style={{ fontSize: "30px", fontWeight: 700, color: C.text, margin: 0, letterSpacing: "-0.5px" }}>What are you working on?</h1>
        </div>

        {/* Chat composer */}
        <div style={{ animation: "fadeUp 0.5s ease-out", animationDelay: "0.05s", animationFillMode: "both" }}>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: "14px", backgroundColor: C.bg, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
            <textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onNavigate("explorer"); } }}
              placeholder="Ask DS-1 anything..."
              rows={2}
              style={{ width: "100%", padding: "15px 18px 6px", border: "none", backgroundColor: "transparent", color: C.text, fontSize: "15px", fontFamily: "'DM Sans', sans-serif", outline: "none", resize: "none", lineHeight: "1.5", boxSizing: "border-box" }}
            />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px 14px" }}>
              <div style={{ display: "flex", gap: "4px" }}>
                <button style={chatS.actionBtn}>+ Files</button>
                <button style={chatS.actionBtn}>⊞ Prompts</button>
              </div>
              <button
                onClick={() => onNavigate("explorer")}
                style={{ width: "36px", height: "36px", borderRadius: "50%", border: "none", cursor: "pointer", backgroundColor: chatInput.trim() ? C.text : C.bgHover, color: chatInput.trim() ? "#fff" : C.textTertiary, fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s ease" }}
              >↑</button>
            </div>
          </div>
        </div>

        {/* Workflows grouped by Discover / Build */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "28px", animation: "fadeUp 0.5s ease-out", animationDelay: "0.1s", animationFillMode: "both" }}>
          {["Discover", "Build"].map((group) => (
            <div key={group}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <span style={{ color: group === "Discover" ? C.accentBlue : C.accentGreen, fontSize: "13px" }}>{group === "Discover" ? "◎" : "⊞"}</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: C.textTertiary, textTransform: "uppercase", letterSpacing: "0.5px" }}>{group}</span>
                </div>
                <span
                  onClick={() => onNavigate(group === "Discover" ? "discover" : "build")}
                  style={{ fontSize: "12px", color: C.textTertiary, cursor: "pointer", fontWeight: 500 }}
                >See all ›</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {workflows.filter(w => w.group === group).map((wf) => (
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
                      cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ width: "34px", height: "34px", borderRadius: "8px", backgroundColor: wf.color + "18", color: wf.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", flexShrink: 0 }}>{wf.icon}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: C.text }}>{wf.title}</div>
                      <div style={{ fontSize: "12px", color: C.textTertiary, marginTop: "1px" }}>{wf.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity, tucked low with whitespace above */}
      <div style={{ width: "100%", maxWidth: "680px", marginTop: "auto", paddingTop: "80px", animation: "fadeUp 0.5s ease-out", animationDelay: "0.2s", animationFillMode: "both" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: 600, color: C.textTertiary, textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>Needs your attention</h2>
          <span style={{ fontSize: "12px", color: C.textTertiary, cursor: "pointer" }}>View all ›</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            { dot: C.accentOrange, text: "Review and syndicate NSM-demo-6/1_Custom Built", meta: "23h ago" },
            { dot: C.accentBlue, text: "Approve New York Rangers Fans_Custom Built", meta: "2h ago" },
            { dot: C.accentGreen, text: "New York_Custom Built syndicated to The Trade Desk", meta: "1h ago" },
          ].map((row, i, arr) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 2px", borderBottom: i < arr.length - 1 ? `1px solid ${C.borderLight}` : "none", cursor: "pointer" }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: row.dot, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: "14px", color: C.text }}>{row.text}</span>
              <span style={{ fontSize: "12px", color: C.textTertiary, fontFamily: "'Space Mono', monospace", flexShrink: 0 }}>{row.meta}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const homeS = {
  compactEntry: {
    flex: 1, display: "flex", alignItems: "center", gap: "8px",
    padding: "12px 16px", borderRadius: "10px", fontSize: "13px", fontWeight: 500,
    border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.textSecondary,
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
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
        <span style={{ fontSize: "15px", fontWeight: 700, color: C.text }}>{title}</span>
        <span style={{
          fontSize: "13px", fontWeight: 600, color: color,
          marginLeft: "6px",
        }}>({count})</span>
      </div>
      <div style={{ fontSize: "13px", color: C.textTertiary, marginBottom: "12px" }}>{subtitle}</div>
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
        fontFamily: "'Space Mono', monospace", fontSize: "13px", fontWeight: 700, flexShrink: 0,
      }}>{initial}</div>
      <div>
        <h3 style={{ fontSize: "16px", fontWeight: 600, color: C.text, margin: "0 0 4px 0" }}>{name}</h3>
        <p style={{ fontSize: "13px", color: C.textSecondary, margin: 0, lineHeight: "1.5" }}>{desc}</p>
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
      marginBottom: "20px", fontSize: "13px",
      animation: "fadeUp 0.4s ease-out",
    }}>
      <button onClick={() => onNavigate && onNavigate("home")} style={{
        display: "flex", alignItems: "center", gap: "6px",
        padding: "5px 12px", borderRadius: "6px",
        border: `1px solid ${C.border}`, backgroundColor: C.bg,
        color: C.textSecondary, cursor: "pointer", fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
      }}>
        <span>⌂</span> Home
      </button>
      <span style={{ color: C.textTertiary }}>/</span>
      <span style={{ color: C.text, fontWeight: 600 }}>{current}</span>
    </div>
  );
}

function AudienceExplorerChat({ onBack }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Welcome to Audience Explorer! Start by searching a keyword or topic to search and discover audiences from Dstillery's catalog.", time: new Date(), isIntro: true },
  ]);
  const [loadingPhase, setLoadingPhase] = useState(null);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [selected, setSelected] = useState([]);

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
      intro: "Great idea. Here are some prebuilt audiences across different categories that could be a good fit for NY Knicks fans and related interests.",
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
      intro: "Here are some prebuilt audiences that match your search criteria.",
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

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header */}
      <div style={{
        padding: "14px 24px", borderBottom: `1px solid ${C.borderLight}`,
        display: "flex", alignItems: "center", gap: "12px", flexShrink: 0,
      }}>
        <button onClick={onBack} style={s.btnSecondary}>← Back</button>
        <div style={{
          width: "28px", height: "28px", borderRadius: "6px",
          backgroundColor: C.accentBlue + "18", color: C.accentBlue,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Space Mono', monospace", fontSize: "10px", fontWeight: 700,
        }}>AE</div>
        <span style={{ fontSize: "15px", fontWeight: 600, color: C.text }}>Audience Explorer</span>
      </div>

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
            fontFamily: "'Space Mono', monospace", fontSize: "16px", fontWeight: 700,
            marginBottom: "24px",
            animation: "fadeUp 0.5s ease-out",
          }}>AE</div>

          <h1 style={{
            fontSize: "28px", fontWeight: 700, color: C.text, margin: "0 0 8px 0",
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
                fontSize: "16px", fontFamily: "'DM Sans', sans-serif",
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
                  padding: "8px 16px", borderRadius: "20px", fontSize: "13px",
                  border: `1px solid ${C.border}`, backgroundColor: C.bg,
                  color: C.textSecondary, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500, transition: "all 0.15s ease",
                }}
              >{topic}</button>
            ))}
          </div>
        </div>
      ) : (
      <>
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
                            pdf: { icon: "PDF", color: "#e03e3e", bg: "#e03e3e14" },
                            pptx: { icon: "PPTX", color: "#d9730d", bg: "#d9730d14" },
                            xlsx: { icon: "XLSX", color: "#0f7b6c", bg: "#0f7b6c14" },
                            csv: { icon: "CSV", color: "#2eaadc", bg: "#2eaadc14" },
                            docx: { icon: "DOCX", color: "#6940a5", bg: "#6940a514" },
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
                                fontFamily: "'Space Mono', monospace", fontSize: "9px", fontWeight: 700,
                                flexShrink: 0,
                              }}>{ft.icon}</div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: "13px", fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{file.name}</div>
                                <div style={{ fontSize: "11px", color: C.textTertiary, marginTop: "1px" }}>{file.size}</div>
                              </div>
                              <span style={{
                                fontSize: "12px", fontWeight: 600, color: C.accentBlue,
                                fontFamily: "'Space Mono', monospace", flexShrink: 0,
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

                    {/* Reach guidance hint */}
                    {msg.groups && (
                      <div style={{
                        display: "flex", alignItems: "flex-start", gap: "8px",
                        marginTop: "14px", padding: "10px 14px", borderRadius: "8px",
                        backgroundColor: C.bgSidebar, border: `1px solid ${C.borderLight}`,
                      }}>
                        <span style={{ fontSize: "13px", flexShrink: 0 }}>ⓘ</span>
                        <span style={{ fontSize: "12px", color: C.textSecondary, lineHeight: "1.5" }}>
                          The number next to each audience is its <strong>estimated reach</strong> — how many addressable people are in that segment. The bar shows relative size within the group. Larger reach means broader targeting; smaller reach means a more focused, niche audience.
                        </span>
                      </div>
                    )}

                    {msg.groups && msg.groups.map((group, gi) => {
                      const maxReach = Math.max(...group.items.map(it => parseSize(it.size)));
                      return (
                        <div key={gi} style={{ marginTop: "24px" }}>
                          <div style={chatS.groupTitle}>{group.title}</div>
                          <div style={{ ...chatS.bodyText, marginBottom: "12px" }}>{group.desc}</div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            {group.items.map((item, ii) => {
                              const reach = parseSize(item.size);
                              const pct = maxReach > 0 ? (reach / maxReach) * 100 : 0;
                              const isSelected = selected.find(s => s.path === item.path);
                              const segName = item.path.split(" > ").pop();
                              const breadcrumb = item.path.split(" > ").slice(0, -1).join(" › ");
                              return (
                                <div
                                  key={ii}
                                  onClick={() => toggleSelect(item)}
                                  style={{
                                    display: "flex", alignItems: "center", gap: "14px",
                                    padding: "14px 16px", borderRadius: "10px",
                                    border: `1px solid ${isSelected ? C.accentBlue : C.border}`,
                                    backgroundColor: isSelected ? C.accentBlue + "08" : C.bg,
                                    cursor: "pointer", transition: "all 0.15s ease",
                                  }}
                                >
                                  {/* Checkbox */}
                                  <div style={{
                                    width: "18px", height: "18px", borderRadius: "5px",
                                    border: `1.5px solid ${isSelected ? C.accentBlue : C.border}`,
                                    backgroundColor: isSelected ? C.accentBlue : "transparent",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    flexShrink: 0, color: "#fff", fontSize: "11px",
                                  }}>{isSelected ? "✓" : ""}</div>

                                  {/* Name + breadcrumb */}
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: "14px", fontWeight: 600, color: C.text }}>{segName}</div>
                                    <div style={{ fontSize: "11px", color: C.textTertiary, marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{breadcrumb}</div>
                                  </div>

                                  {/* Reach bar + number */}
                                  <div style={{ width: "140px", flexShrink: 0 }}>
                                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "4px" }}>
                                      <span style={{ fontSize: "13px", fontWeight: 600, color: C.text, fontFamily: "'Space Mono', monospace" }}>{fmtSize(reach)}</span>
                                    </div>
                                    <div style={{ height: "5px", borderRadius: "3px", backgroundColor: C.bgHover, overflow: "hidden" }}>
                                      <div style={{ height: "100%", width: `${pct}%`, borderRadius: "3px", backgroundColor: group.items === group.items ? C.accentBlue : C.accentBlue, opacity: 0.4 + (pct / 100) * 0.6, transition: "width 0.3s ease" }} />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}

                    {/* Selection action bar */}
                    {msg.groups && selected.length > 0 && (
                      <div style={{
                        position: "sticky", bottom: "0", marginTop: "20px",
                        display: "flex", alignItems: "center", gap: "16px",
                        padding: "14px 18px", borderRadius: "12px",
                        backgroundColor: C.text, color: "#fff",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "14px", fontWeight: 600 }}>{selected.length} audience{selected.length > 1 ? "s" : ""} selected</div>
                          <div style={{ fontSize: "12px", opacity: 0.7, fontFamily: "'Space Mono', monospace" }}>{fmtSize(combinedReach)} combined reach</div>
                        </div>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button style={chatS.selActionBtnGhost}>Build Compound</button>
                          <button onClick={(e) => { e.stopPropagation(); handleSend("lets syndicate this"); }} style={chatS.selActionBtn}>Syndicate</button>
                          <button onClick={(e) => { e.stopPropagation(); setSelected([]); }} style={{ ...chatS.selActionBtnGhost, padding: "8px 10px" }}>✕</button>
                        </div>
                      </div>
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
                                padding: "8px 14px", borderRadius: "8px", fontSize: "13px",
                                fontWeight: 500, textAlign: "left",
                                border: `1px solid ${C.border}`, backgroundColor: C.bg,
                                color: C.text, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
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
        padding: "16px 32px 20px", borderTop: `1px solid ${C.borderLight}`,
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
                  padding: "4px 10px", borderRadius: "6px", fontSize: "12px",
                  backgroundColor: C.bg, border: `1px solid ${C.borderLight}`,
                  color: C.text, fontWeight: 500,
                }}>
                  <span style={{ fontSize: "10px" }}>📎</span>
                  {file}
                  <span onClick={() => setAttachedFiles(prev => prev.filter((_, fi) => fi !== i))}
                    style={{ cursor: "pointer", color: C.textTertiary, fontSize: "14px", marginLeft: "2px" }}>×</span>
                </div>
              ))}
            </div>
          )}

          {/* Textarea */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Ask DS-1 anything..."
            rows={2}
            style={{
              width: "100%", padding: "14px 16px 8px", border: "none",
              backgroundColor: "transparent", color: C.text,
              fontSize: "14px", fontFamily: "'DM Sans', sans-serif",
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
                fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.15s ease",
              }}
            >↑</button>
          </div>
        </div>

      </div>
      </>
      )}
    </div>
  );
}

const chatS = {
  ds1Tag: {
    fontSize: "11px",
    fontWeight: 700,
    color: C.accentBlue,
    backgroundColor: C.accentBlue + "14",
    padding: "4px 10px",
    borderRadius: "6px",
    fontFamily: "'Space Mono', monospace",
    letterSpacing: "0.3px",
    flexShrink: 0,
    marginTop: "2px",
  },
  introBox: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: C.text,
    backgroundColor: C.bgSidebar,
    border: `1px solid ${C.borderLight}`,
    padding: "12px 16px",
    borderRadius: "8px",
    fontWeight: 500,
  },
  userTag: {
    fontSize: "11px",
    fontWeight: 700,
    color: C.accentBlue,
    backgroundColor: C.accentBlue + "14",
    padding: "4px 10px",
    borderRadius: "6px",
    fontFamily: "'Space Mono', monospace",
    letterSpacing: "0.3px",
    flexShrink: 0,
    marginTop: "2px",
  },
  userBubble: {
    backgroundColor: C.bgSidebar,
    border: `1px solid ${C.borderLight}`,
    borderRadius: "12px 12px 4px 12px",
    padding: "10px 16px",
    fontSize: "14px",
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
    fontSize: "14px",
    lineHeight: "1.65",
    color: C.text,
  },
  thinkingBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    fontSize: "13px",
    color: C.textTertiary,
    marginBottom: "14px",
    paddingLeft: "12px",
    borderLeft: `2px solid ${C.borderLight}`,
    fontStyle: "italic",
  },
  groupTitle: {
    fontSize: "15px",
    fontWeight: 700,
    color: C.text,
    marginBottom: "4px",
  },
  audienceList: {
    marginTop: "8px",
  },
  audienceRow: {
    display: "flex",
    gap: "6px",
    fontSize: "14px",
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
    fontSize: "14px",
    lineHeight: "1.7",
    color: C.text,
    paddingLeft: "4px",
  },
  platformRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    lineHeight: "2",
    color: C.text,
  },
  actionBtn: {
    padding: "5px 12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "transparent",
    color: C.textTertiary,
    fontSize: "12px",
    fontWeight: 500,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    transition: "color 0.15s ease, background-color 0.15s ease",
  },
  selActionBtn: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#fff",
    color: C.text,
    fontSize: "13px",
    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
  },
  selActionBtnGhost: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.2)",
    backgroundColor: "transparent",
    color: "#fff",
    fontSize: "13px",
    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
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
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [seeds, setSeeds] = useState([]);
  const [building, setBuilding] = useState(false);
  const [built, setBuilt] = useState(false);

  const MAX_SEEDS = 3;

  const ALL_DOMAINS = [
    { domain: "nypost.com", reach: 96.7, status: "in_system", tags: ["news", "sports", "ny", "new york", "tabloid"] },
    { domain: "espn.com", reach: 62.8, status: "in_system", tags: ["sports", "basketball", "nba", "football", "fans"] },
    { domain: "si.com", reach: 61.6, status: "in_system", tags: ["sports", "sports illustrated", "fans", "basketball"] },
    { domain: "nytimes.com", reach: 59.7, status: "in_system", tags: ["news", "ny", "new york", "politics"] },
    { domain: "cbssports.com", reach: 56.2, status: "in_system", tags: ["sports", "fans", "basketball", "nba"] },
    { domain: "sportingnews.com", reach: 51.1, status: "in_system", tags: ["sports", "news", "fans"] },
    { domain: "yahoo.com/sports", reach: 44.1, status: "in_system", tags: ["sports", "news", "fans"] },
    { domain: "basketball-reference.com", reach: 33.9, status: "in_system", tags: ["sports", "basketball", "nba", "stats"] },
    { domain: "clutchpoints.com", reach: 22.2, status: "in_system", tags: ["sports", "basketball", "nba", "fans"] },
    { domain: "bleacherreport.com", reach: 18.4, status: "in_system", tags: ["sports", "fans", "basketball", "nba"] },
    { domain: "foxsports.com", reach: 12.7, status: "in_system", tags: ["sports", "fans", "news"] },
    { domain: "nbcsports.com", reach: 11.6, status: "in_system", tags: ["sports", "fans", "news"] },
    { domain: "theathletic.com", reach: 9.3, status: "in_system", tags: ["sports", "news", "basketball", "premium"] },
    { domain: "nba.com", reach: 2.7, status: "in_system", tags: ["sports", "basketball", "nba", "fans"] },
    { domain: "dailynews.com", reach: 2.6, status: "in_system", tags: ["news", "ny", "new york"] },
  ];

  const matchDomain = (d, q) => {
    const query = q.toLowerCase().trim();
    if (!query) return false;
    if (d.domain.toLowerCase().includes(query)) return true;
    return d.tags.some(t => t.includes(query) || query.includes(t));
  };

  const maxReach = Math.max(...ALL_DOMAINS.map(d => d.reach));
  const minReach = Math.min(...ALL_DOMAINS.map(d => d.reach));
  const filtered = search.trim() ? ALL_DOMAINS : [];
  const inSystemCount = ALL_DOMAINS.filter(d => d.status === "in_system").length;
  const atMax = seeds.length >= MAX_SEEDS;

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
    setTimeout(() => { setBuilding(false); setBuilt(true); }, 2000);
  };

  const seededReach = seeds.reduce((sum, s) => {
    const d = ALL_DOMAINS.find(x => x.domain === s);
    return sum + (d ? d.reach : 0);
  }, 0);
  const modeledReach = (seededReach * 3.2).toFixed(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header */}
      <div style={{
        padding: "14px 24px", borderBottom: `1px solid ${C.borderLight}`,
        display: "flex", alignItems: "center", gap: "12px", flexShrink: 0,
      }}>
        <button onClick={onBack} style={s.btnSecondary}>← Back</button>
        <div style={{
          width: "28px", height: "28px", borderRadius: "6px",
          backgroundColor: C.accentGreen + "18", color: C.accentGreen,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Space Mono', monospace", fontSize: "10px", fontWeight: 700,
        }}>DS</div>
        <span style={{ fontSize: "15px", fontWeight: 600, color: C.text, flex: 1 }}>Domain Seeded Canvas</span>
      </div>

      {/* Search */}
      <div style={{ padding: "20px 32px 0", flexShrink: 0 }}>
        <div style={{ position: "relative" }}>
          <span
            onClick={() => setSearch(query)}
            style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: C.textTertiary, fontSize: "14px", cursor: "pointer" }}
          >⌕</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") setSearch(query); }}
            placeholder="Find domains: a topic, keyword, or seed domain — then press Enter"
            style={{
              width: "100%", padding: "12px 16px 12px 40px", borderRadius: "10px",
              border: `1px solid ${C.border}`, backgroundColor: C.bg,
              color: C.text, fontSize: "14px", fontFamily: "'DM Sans', sans-serif",
              outline: "none", boxSizing: "border-box",
            }}
          />
        </div>

        {/* Info explanation */}
        <div style={{
          display: "flex", alignItems: "flex-start", gap: "8px",
          marginTop: "12px", padding: "10px 14px", borderRadius: "8px",
          backgroundColor: C.bgSidebar, border: `1px solid ${C.borderLight}`,
        }}>
          <span style={{ fontSize: "13px", flexShrink: 0 }}>ⓘ</span>
          <span style={{ fontSize: "12px", color: C.textSecondary, lineHeight: "1.5" }}>
            Each domain shows its <strong>estimated reach</strong> — how many people in Dstillery's graph regularly visit it. Longer bars mean broader reach. Pick up to <strong>{MAX_SEEDS} seed domains</strong>, and DS-1 will model a new audience from the shared behaviors of people who visit them.
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px" }}>
          <div style={{ display: "flex", gap: "16px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: C.textSecondary }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: C.accentGreen }} /> in our system
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: C.textSecondary }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: C.textTertiary }} /> not found
            </span>
          </div>
          <span style={{ fontSize: "12px", color: C.textTertiary, fontFamily: "'Space Mono', monospace" }}>
            {search.trim() ? `${filtered.length} shown` : `${inSystemCount} domains in system`}
          </span>
        </div>
      </div>

      {/* Domain display */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 32px" }}>
        {!search.trim() ? (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            height: "100%", textAlign: "center", padding: "32px",
          }}>
            <div style={{
              width: "52px", height: "52px", borderRadius: "13px",
              backgroundColor: C.accentGreen + "14", color: C.accentGreen,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "22px", marginBottom: "18px",
            }}>⊞</div>
            <div style={{ fontSize: "17px", fontWeight: 600, color: C.text, marginBottom: "6px" }}>Search for domains to get started</div>
            <div style={{ fontSize: "14px", color: C.textTertiary, maxWidth: "380px", lineHeight: "1.5", marginBottom: "20px" }}>
              Enter a topic, a brief, or a specific seed domain above. DS-1 will surface relevant domains you can pick from.
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
              {["sports", "basketball", "nypost.com", "ny news"].map(ex => (
                <button key={ex} onClick={() => { setQuery(ex); setSearch(ex); }} style={{
                  padding: "7px 14px", borderRadius: "20px", fontSize: "13px",
                  border: `1px solid ${C.border}`, backgroundColor: C.bg,
                  color: C.textSecondary, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                }}>{ex}</button>
              ))}
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "24px", textAlign: "center", fontSize: "14px", color: C.textTertiary, fontStyle: "italic" }}>
            No domains match "{search}". Try a different topic or seed domain.
          </div>
        ) : (
          // DOMAIN GRID
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {filtered.map((d) => {
              const isSeeded = seeds.includes(d.domain);
              const pct = (d.reach / maxReach) * 100;
              const disabled = atMax && !isSeeded;
              return (
                <div
                  key={d.domain}
                  onClick={() => toggleSeed(d.domain)}
                  style={{
                    padding: "14px 16px", borderRadius: "10px",
                    border: `1px solid ${isSeeded ? C.accentGreen : C.border}`,
                    backgroundColor: isSeeded ? C.accentGreen + "08" : C.bg,
                    cursor: disabled ? "not-allowed" : "pointer",
                    opacity: disabled ? 0.45 : 1,
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: d.status === "in_system" ? C.accentGreen : C.textTertiary, flexShrink: 0 }} />
                    <span style={{ fontSize: "14px", fontWeight: 600, color: C.text, flex: 1 }}>{d.domain}</span>
                    <span style={{
                      width: "22px", height: "22px", borderRadius: "6px",
                      border: `1px solid ${isSeeded ? C.accentGreen : C.border}`,
                      backgroundColor: isSeeded ? C.accentGreen : "transparent",
                      color: isSeeded ? "#fff" : C.textTertiary,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "14px", flexShrink: 0,
                    }}>{isSeeded ? "✓" : "+"}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ flex: 1, height: "5px", borderRadius: "3px", backgroundColor: C.bgHover, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, borderRadius: "3px", backgroundColor: C.accentBlue, opacity: 0.4 + (pct / 100) * 0.6 }} />
                    </div>
                    <span style={{ fontSize: "12px", color: C.textTertiary, fontFamily: "'Space Mono', monospace", flexShrink: 0 }}>{d.reach}M</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Seeds tray */}
      <div style={{
        borderTop: `1px solid ${C.borderLight}`, padding: "16px 32px",
        flexShrink: 0, backgroundColor: C.bgSecondary,
      }}>
        {built ? (
          <div style={{
            display: "flex", alignItems: "center", gap: "14px",
            padding: "14px 18px", borderRadius: "10px",
            backgroundColor: C.accentGreen + "12", border: `1px solid ${C.accentGreen}40`,
          }}>
            <span style={{ fontSize: "18px" }}>✓</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: C.text }}>Audience modeled from {seeds.length} seed domain{seeds.length > 1 ? "s" : ""}</div>
              <div style={{ fontSize: "12px", color: C.textSecondary, marginTop: "2px", fontFamily: "'Space Mono', monospace" }}>~{modeledReach}M modeled reach · ID-Based</div>
            </div>
            <button onClick={() => { setBuilt(false); setSeeds([]); }} style={s.btnSecondary}>Start over</button>
            <button style={{ ...s.btnPrimary, backgroundColor: C.text }}>Syndicate →</button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: seeds.length > 0 ? "12px" : "0" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: atMax ? C.accentGreen : C.textSecondary, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Seeds ({seeds.length}/{MAX_SEEDS})
              </span>
              {seeds.length > 0 && (
                <span style={{ fontSize: "12px", color: C.textTertiary, fontFamily: "'Space Mono', monospace" }}>
                  {seededReach.toFixed(1)}M combined seed reach
                </span>
              )}
            </div>
            {seeds.length === 0 ? (
              <div style={{ fontSize: "13px", color: C.textTertiary, fontStyle: "italic" }}>
                Click domains above to add up to {MAX_SEEDS} seeds. DS-1 will model an audience from the behavioral patterns of people who visit them.
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", flex: 1 }}>
                  {seeds.map((s2) => (
                    <span key={s2} style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      padding: "5px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 500,
                      backgroundColor: C.bg, border: `1px solid ${C.border}`, color: C.text,
                    }}>
                      {s2}
                      <span onClick={() => toggleSeed(s2)} style={{ cursor: "pointer", color: C.textTertiary, fontSize: "14px" }}>×</span>
                    </span>
                  ))}
                </div>
                <button
                  onClick={handleBuild}
                  disabled={building}
                  style={{
                    ...s.btnPrimary, backgroundColor: C.accentGreen, flexShrink: 0,
                    opacity: building ? 0.6 : 1,
                  }}
                >{building ? "Modeling..." : "Build Audience →"}</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function PixelCreator({ onBack }) {
  const [stage, setStage] = useState("form"); // form | creating | created
  const [marketer, setMarketer] = useState("");
  const [audienceCode, setAudienceCode] = useState("");
  const [description, setDescription] = useState("");
  const [pixelType, setPixelType] = useState("Site Visitor");
  const [agreed, setAgreed] = useState(false);
  const [copied, setCopied] = useState(null);
  const [excelDone, setExcelDone] = useState(false);

  const canCreate = marketer.trim() && audienceCode.trim() && description.trim() && agreed;
  const pixelId = "874787";
  const brand = marketer.trim() || "your brand";

  const htmlTag = `<img width="1" height="1" src="//action.dstillery.com/orbserv/nspix?adv=cl161902600414132&ns=5973&nc=${audienceCode || "audience-code"}&ncv=64&dstOrderId=[OrderId]&dstOrderAmount=[OrderAmount]" />`;
  const jsTag = `<script src="//action.dstillery.com/orbserv/nsjs?adv=cl161902600414132&ns=5973&nc=${audienceCode || "audience-code"}&ncv=64&dstOrderId=[OrderId]&dstOrderAmount=[OrderAmount]" type="text/javascript"></script>`;

  const handleCreate = () => {
    setStage("creating");
    setTimeout(() => setStage("created"), 1800);
  };

  const copy = (text, key) => {
    try { navigator.clipboard && navigator.clipboard.writeText(text); } catch (e) {}
    setCopied(key); setTimeout(() => setCopied(null), 1600);
  };

  const PIXEL_TYPES = [
    { value: "Site Visitor", desc: "tracks website visitors" },
    { value: "Conversion", desc: "tracks completed actions" },
    { value: "Ad Viewer", desc: "tracks ad impressions" },
  ];

  const PREVIOUS_PIXELS = [
    { code: "fjallraven-homepage-2026", type: "SITE", id: "874203", date: "2 days ago", loads: 8420 },
    { code: "fjallraven-checkout-conv", type: "CONV", id: "873991", date: "May 28, 2026", loads: 612 },
    { code: "fjallraven-spring-display", type: "AD", id: "873544", date: "May 20, 2026", loads: 1340 },
  ];

  const labelStyle = { fontSize: "13px", fontWeight: 600, color: C.text, marginBottom: "6px" };
  const hintStyle = { fontSize: "12px", color: C.textTertiary, marginTop: "6px", lineHeight: "1.4" };
  const inputStyle = { width: "100%", padding: "11px 14px", borderRadius: "8px", border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.text, fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" };

  // CREATING
  if (stage === "creating") {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <div style={briefHeaderStyle}>
          <button onClick={onBack} style={s.btnSecondary}>← Back</button>
          <div style={{ ...briefBadge, backgroundColor: C.accentPink + "18", color: C.accentPink }}>PX</div>
          <span style={{ fontSize: "15px", fontWeight: 600, color: C.text }}>Create Pixel</span>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <div style={{ fontSize: "14px", color: C.textSecondary, fontStyle: "italic" }}>Creating pixel...</div>
        </div>
      </div>
    );
  }

  // CREATED
  if (stage === "created") {
    const CodeBlock = ({ label, code, ckey }) => (
      <div style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
          <span style={{ fontSize: "13px", fontWeight: 600, color: C.text }}>{label}</span>
          <button onClick={() => copy(code, ckey)} style={{ padding: "4px 12px", borderRadius: "6px", border: `1px solid ${C.border}`, backgroundColor: C.bg, color: copied === ckey ? C.accentGreen : C.textSecondary, fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>{copied === ckey ? "✓ Copied" : "Copy"}</button>
        </div>
        <div style={{ padding: "14px 16px", borderRadius: "8px", backgroundColor: "#2b2926", border: `1px solid ${C.border}`, overflowX: "auto" }}>
          <code style={{ fontSize: "12px", fontFamily: "'Space Mono', monospace", color: "#e8e5e0", lineHeight: "1.6", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{code}</code>
        </div>
      </div>
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <div style={briefHeaderStyle}>
          <button onClick={onBack} style={s.btnSecondary}>← Back</button>
          <div style={{ ...briefBadge, backgroundColor: C.accentPink + "18", color: C.accentPink }}>PX</div>
          <span style={{ fontSize: "15px", fontWeight: 600, color: C.text }}>Create Pixel</span>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "28px clamp(20px, 5vw, 48px)" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            {/* Success */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 18px", borderRadius: "10px", backgroundColor: C.accentGreen + "12", border: `1px solid ${C.accentGreen}40`, marginBottom: "24px" }}>
              <span style={{ fontSize: "18px" }}>✓</span>
              <span style={{ fontSize: "14px", fontWeight: 600, color: C.text }}>Successfully created the {pixelType} pixel for {brand}</span>
            </div>

            {/* Details */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: C.text, marginBottom: "10px" }}>Pixel Details</div>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: "10px", overflow: "hidden" }}>
                {[["ID", pixelId], ["Description", `${brand} - ${pixelType.toUpperCase()}`], ["Audience Code", audienceCode]].map(([k, v], i) => (
                  <div key={k} style={{ display: "flex", padding: "11px 16px", borderBottom: i < 2 ? `1px solid ${C.borderLight}` : "none", fontSize: "13px" }}>
                    <span style={{ width: "120px", color: C.textTertiary, flexShrink: 0 }}>{k}</span>
                    <span style={{ color: C.text, fontWeight: 500, fontFamily: "'Space Mono', monospace" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <CodeBlock label="HTML Image Tag" code={htmlTag} ckey="html" />
            <CodeBlock label="JavaScript Tag" code={jsTag} ckey="js" />

            {/* Info */}
            <div style={{ padding: "14px 16px", borderRadius: "10px", backgroundColor: C.bgSidebar, border: `1px solid ${C.borderLight}`, fontSize: "13px", color: C.textSecondary, lineHeight: "1.6", marginBottom: "20px" }}>
              Dstillery will start building a unique lookalike model for {brand} as soon as your pixel is placed and reaches <strong>1,000 loads</strong>. Place the tag on every page you want to track.
            </div>

            {/* Excel offer */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", borderRadius: "10px", border: `1px solid ${C.border}`, marginBottom: "28px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: 600, color: C.text }}>Generate an Excel template</div>
                <div style={{ fontSize: "12px", color: C.textTertiary, marginTop: "2px" }}>All tracking codes and pixel info in a shareable spreadsheet for your dev team.</div>
              </div>
              {excelDone ? (
                <span style={{ fontSize: "13px", fontWeight: 600, color: C.accentGreen }}>✓ Generated</span>
              ) : (
                <button onClick={() => setExcelDone(true)} style={{ ...s.btnSecondary, flexShrink: 0 }}>Generate</button>
              )}
            </div>

            {/* Previously created pixels */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: C.text }}>All pixels for {brand}</div>
              <span style={{ fontSize: "12px", color: C.textTertiary }}>{PREVIOUS_PIXELS.length + 1} total</span>
            </div>
            <div style={{
              display: "flex", alignItems: "flex-start", gap: "8px",
              padding: "10px 14px", borderRadius: "8px",
              backgroundColor: C.bgSidebar, border: `1px solid ${C.borderLight}`, marginBottom: "12px",
            }}>
              <span style={{ fontSize: "13px", flexShrink: 0 }}>ⓘ</span>
              <span style={{ fontSize: "12px", color: C.textSecondary, lineHeight: "1.5" }}>
                Each pixel needs <strong>1,000 loads</strong> before Dstillery can build segments and unlock SegRank data. The bar shows progress toward that threshold.
              </span>
            </div>
            <div style={{ border: `1px solid ${C.border}`, borderRadius: "10px", overflow: "hidden" }}>
              {[{ code: audienceCode, type: pixelType.toUpperCase().split(" ")[0], id: pixelId, date: "just now", loads: 0, isNew: true }, ...PREVIOUS_PIXELS].map((px, i, arr) => {
                const reached = px.loads >= 1000;
                const pct = Math.min(100, (px.loads / 1000) * 100);
                return (
                  <div key={i} style={{ padding: "14px 16px", borderBottom: i < arr.length - 1 ? `1px solid ${C.borderLight}` : "none", backgroundColor: px.isNew ? C.accentGreen + "0c" : C.bg, cursor: px.isNew ? "default" : "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: px.isNew ? C.accentPink : C.textSecondary, backgroundColor: px.isNew ? C.accentPink + "16" : C.bgHover, padding: "2px 8px", borderRadius: "4px", fontFamily: "'Space Mono', monospace", flexShrink: 0 }}>{px.type}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "13px", fontWeight: 600, color: C.text }}>{px.code}</div>
                        <div style={{ fontSize: "11px", color: C.textTertiary, fontFamily: "'Space Mono', monospace" }}>ID {px.id} · {px.date}</div>
                      </div>
                      {reached ? (
                        <span style={{ fontSize: "11px", fontWeight: 600, color: C.accentGreen, backgroundColor: C.accentGreen + "14", padding: "3px 10px", borderRadius: "5px", flexShrink: 0 }}>✓ Segments active</span>
                      ) : px.isNew ? (
                        <span style={{ fontSize: "11px", fontWeight: 600, color: C.textTertiary, flexShrink: 0 }}>Collecting…</span>
                      ) : (
                        <span style={{ fontSize: "11px", fontWeight: 600, color: C.accentOrange, flexShrink: 0 }}>{(1000 - px.loads).toLocaleString()} to go</span>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ flex: 1, height: "6px", borderRadius: "3px", backgroundColor: C.bgHover, overflow: "hidden", position: "relative" }}>
                        <div style={{ height: "100%", width: `${pct}%`, borderRadius: "3px", backgroundColor: reached ? C.accentGreen : C.accentPink, transition: "width 0.4s ease" }} />
                      </div>
                      <span style={{ fontSize: "11px", color: C.textTertiary, fontFamily: "'Space Mono', monospace", flexShrink: 0, minWidth: "92px", textAlign: "right" }}>
                        {px.loads.toLocaleString()} / 1,000
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // FORM
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={briefHeaderStyle}>
        <button onClick={onBack} style={s.btnSecondary}>← Back</button>
        <div style={{ ...briefBadge, backgroundColor: C.accentPink + "18", color: C.accentPink }}>PX</div>
        <span style={{ fontSize: "15px", fontWeight: 600, color: C.text }}>Create Pixel</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "28px clamp(20px, 5vw, 48px)" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: C.text, margin: "0 0 6px 0" }}>Create a tracking pixel</h1>
            <p style={{ fontSize: "14px", color: C.textSecondary, margin: 0, lineHeight: "1.5" }}>Generate a Dstillery pixel and its tags to drop on your site.</p>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <div style={labelStyle}>Marketer</div>
            <input style={inputStyle} value={marketer} onChange={(e) => setMarketer(e.target.value)} placeholder="e.g. cl12345 or Acme Corp" />
            <div style={hintStyle}>Enter a CL ID (e.g. cl12345) to use directly, or a marketer name to search.</div>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <div style={labelStyle}>Audience Code</div>
            <input style={inputStyle} value={audienceCode} onChange={(e) => setAudienceCode(e.target.value.toLowerCase().replace(/\s+/g, "-"))} placeholder="e.g. acme-homepage-2024" />
            <div style={hintStyle}>A unique identifier for the audience. Lowercase with hyphens, no spaces.</div>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <div style={labelStyle}>Description</div>
            <input style={inputStyle} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Homepage visitors for Q1 2024 campaign" />
            <div style={hintStyle}>A human-readable description of what this pixel tracks.</div>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <div style={labelStyle}>Pixel Type</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {PIXEL_TYPES.map(pt => (
                <div key={pt.value} onClick={() => setPixelType(pt.value)} style={{
                  display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px",
                  borderRadius: "8px", cursor: "pointer",
                  border: `1px solid ${pixelType === pt.value ? C.accentPink : C.border}`,
                  backgroundColor: pixelType === pt.value ? C.accentPink + "0a" : C.bg,
                }}>
                  <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: `1.5px solid ${pixelType === pt.value ? C.accentPink : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {pixelType === pt.value && <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: C.accentPink }} />}
                  </div>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: C.text }}>{pt.value}</span>
                  <span style={{ fontSize: "12px", color: C.textTertiary }}>{pt.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div onClick={() => setAgreed(!agreed)} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "14px 0", cursor: "pointer", marginBottom: "8px" }}>
            <div style={{ width: "18px", height: "18px", borderRadius: "5px", marginTop: "1px", border: `1.5px solid ${agreed ? C.accentPink : C.border}`, backgroundColor: agreed ? C.accentPink : "transparent", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", flexShrink: 0 }}>{agreed ? "✓" : ""}</div>
            <span style={{ fontSize: "13px", color: C.textSecondary, lineHeight: "1.5" }}>By selecting here and having DS-1 generate the pixel, you agree to Dstillery's Terms and Conditions.</span>
          </div>

          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "12px" }}>
            <button onClick={onBack} style={s.btnSecondary}>Cancel</button>
            <button onClick={handleCreate} disabled={!canCreate} style={{ padding: "10px 22px", borderRadius: "8px", border: "none", backgroundColor: canCreate ? C.accentPink : C.bgHover, color: canCreate ? "#fff" : C.textTertiary, fontSize: "14px", fontWeight: 600, cursor: canCreate ? "pointer" : "default", fontFamily: "'DM Sans', sans-serif" }}>Create pixel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AudienceBriefBuilder({ onBack }) {
  const [stage, setStage] = useState("entry"); // entry | generating | draft
  const [input, setInput] = useState("");
  const [brandName, setBrandName] = useState("Matchaful");
  const [genPhase, setGenPhase] = useState(null);
  const [sections, setSections] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [exported, setExported] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const DRAFT_SECTIONS = [
    { id: "prebuilt", product: "Pre-built Audiences", desc: "10,000+ precise, ready-to-activate off-the-shelf audiences powered by event-level data. Identifies the inventory or devices with the highest behavioral intent for your target.", itemType: "bullet", items: ["Coffee Lovers", "Tea Drinkers", "Coffee & Tea", "Indie Coffee Shoppers", "Home Coffee Makers"] },
    { id: "custombuilt", product: "Custom Built Audiences", desc: "Customized targeting that reaches prospects without first-party data, using unique combinations of 10,000+ pre-built audiences with and/or/not boolean logic.", itemType: "bullet", items: ["Coffee Lovers", "Tea Drinkers", "Coffee & Tea", "Indie Coffee Shoppers", "Home Coffee Makers"] },
    { id: "customurl", product: "Custom Built URL Audiences", desc: "URL-seeded product that identifies users going to selected web pages and uses predictive modeling to find similar users. Available as ID-based or ID-free.", itemType: "url", items: ["www.bonappetit.com", "www.buzzfeed.com", "www.eater.com"] },
    { id: "searchlookalike", product: "Custom Search Lookalikes", desc: "Finds the best opportunities to reach people actively searching for your or your competitor's brand keywords, using search data from a 2M+ opted-in panel.", itemType: "bullet", items: ["matcha latte", "oat milk matcha", "ceremonial matcha", "coffee alternatives", "matchaful"] },
    { id: "customai", product: "Custom AI Audiences", desc: "Our lookalike solution harnesses your brand's first-party data, machine learning, and predictive targeting — refreshing every user every 24 hours.", itemType: "numbered", items: ["Dstillery pixel(s) placed on any active page", "One-time pull of a Trade Desk Conversion Details Report", "CRM list(s) sent over via LiveRamp"] },
    { id: "predictivettd", product: "Predictive Contextual via The Trade Desk", desc: "First-to-market contextual integration powered by ID-free technology — privacy-safe behavioral targeting available in the public taxonomy.", itemType: "path", items: ["ID-free > Consumer > CPG > Food > Coffee Chain Shoppers", "ID-free > Consumer > CPG > Food > Soda Drinkers", "ID-free > Consumer > CPG > Food > Coffee Bean Shoppers"] },
    { id: "partnership", product: "Partnership Audiences", desc: "Through business development partners, we access unique data sets around Auto, Entertainment, and CPG. Ready to activate in The Trade Desk or LiveRamp marketplaces.", itemType: "bullet", items: ["NIQ Dstillery CPG — Coffee Shoppers", "NIQ Dstillery CPG — Specialty Beverage Buyers"] },
    { id: "all", product: "All Audiences", desc: "The full set of matched audiences across every product, ready to review.", itemType: "path", items: ["NIQ Dstillery CPG > Coffee Shoppers > Coffee Shopper", "NIQ Dstillery CPG > Coffee Shoppers > Dunkin Donuts Coffee Shopper", "NIQ Dstillery CPG > Coffee Shoppers > Starbucks Coffee Shopper", "NIQ Dstillery CPG > Coffee Shoppers > Green Mountain Coffee Shopper", "NIQ Dstillery CPG > Coffee Shoppers > Peets Coffee Shopper"] },
  ];

  const ADDABLE = [
    { id: "geo", product: "Custom Geo Audiences", desc: "Audiences built from location signals, geo-fencing, and point-of-interest visits.", itemType: "bullet", items: ["Specialty Coffee Shop Visitors", "Wellness Studio Visitors"] },
    { id: "retarget", product: "Retargeting Pools", desc: "Audience pools built from pixel and site-activity data for retargeting.", itemType: "bullet", items: ["Site Visitors — 30 day", "Cart Abandoners"] },
    { id: "seasonal", product: "Seasonal Intent Audiences", desc: "Time-sensitive audiences modeled around seasonal purchase behavior.", itemType: "bullet", items: ["Summer Iced Beverage Intenders", "Back-to-Routine Shoppers"] },
  ];

  const handleGenerate = (q) => {
    const raw = typeof q === "string" ? q : input;
    if (!raw.trim()) return;
    // crude brand extraction for the mock
    const m = raw.match(/brand is (\w+)/i);
    if (m) setBrandName(m[1].charAt(0).toUpperCase() + m[1].slice(1));
    setStage("generating");
    setGenPhase("thinking");
    setTimeout(() => setGenPhase("generating"), 900);
    setTimeout(() => {
      setSelectedProducts(DRAFT_SECTIONS.map(s => s.id));
      setStage("select");
      setGenPhase(null);
    }, 2400);
  };

  const toggleProduct = (id) => setSelectedProducts(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const confirmSelection = () => {
    setSections(DRAFT_SECTIONS.filter(s => selectedProducts.includes(s.id)));
    setStage("draft");
  };

  const move = (idx, dir) => {
    setSections(prev => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };
  const removeSection = (id) => setSections(prev => prev.filter(s => s.id !== id));
  const addSection = (sec) => { setSections(prev => [...prev, sec]); setShowAdd(false); };
  const updateDesc = (id, val) => setSections(prev => prev.map(s => s.id === id ? { ...s, desc: val } : s));

  const handleExport = () => { setExported(true); setTimeout(() => setExported(false), 2500); };

  // Natural-language reorder/edit command
  const [command, setCommand] = useState("");
  const [cmdResult, setCmdResult] = useState(null);
  const [cmdLog, setCmdLog] = useState([]);

  const findSectionId = (text, exclude = []) => {
    const t = text.toLowerCase();
    const priority = [
      ["all", ["all audiences"]],
      ["partnership", ["partnership"]],
      ["predictivettd", ["predictive", "contextual", "trade desk"]],
      ["customai", ["custom ai", " ai ", "ai audience"]],
      ["searchlookalike", ["search", "lookalike"]],
      ["customurl", ["url"]],
      ["custombuilt", ["custom built"]],
      ["prebuilt", ["prebuilt", "pre-built", "pre built", "off-the-shelf", "off the shelf"]],
    ];
    for (const [id, kws] of priority) {
      if (exclude.includes(id)) continue;
      if (!sections.find(s => s.id === id)) continue;
      if (kws.some(k => t.includes(k.trim()))) return id;
    }
    return null;
  };

  const runCommand = (raw) => {
    const text = (typeof raw === "string" ? raw : command).trim();
    if (!text) return;
    const say = (ok, msg) => { setCmdResult({ ok, msg }); setCmdLog(prev => [...prev, { role: "user", text }, { role: "ds1", ok, text: msg }]); };
    const t = text.toLowerCase();
    const idA = findSectionId(t);
    if (!idA) {
      say(false, "I couldn't tell which section you meant. Try naming it, e.g. \"move Custom AI to the top\".");
      setCommand("");
      return;
    }
    const nameA = sections.find(s => s.id === idA).product;

    setSections(prev => {
      const arr = [...prev];
      const from = arr.findIndex(s => s.id === idA);
      const [item] = arr.splice(from, 1);

      if (/\b(remove|delete|drop|take out)\b/.test(t)) {
        say(true, `Removed ${nameA}.`);
        return arr;
      }
      if (/\b(after|below|under)\b/.test(t)) {
        const idB = findSectionId(t, [idA]);
        if (idB) { const bi = arr.findIndex(s => s.id === idB); arr.splice(bi + 1, 0, item); say(true, `Moved ${nameA} after ${sections.find(s=>s.id===idB).product}.`); return arr; }
      }
      if (/\b(before|above|over)\b/.test(t)) {
        const idB = findSectionId(t, [idA]);
        if (idB) { const bi = arr.findIndex(s => s.id === idB); arr.splice(bi, 0, item); say(true, `Moved ${nameA} before ${sections.find(s=>s.id===idB).product}.`); return arr; }
      }
      if (/\b(top|first|beginning|start)\b/.test(t)) { arr.unshift(item); say(true, `Moved ${nameA} to the top.`); return arr; }
      if (/\b(bottom|last|end)\b/.test(t)) { arr.push(item); say(true, `Moved ${nameA} to the bottom.`); return arr; }
      if (/\bup\b/.test(t)) { arr.splice(Math.max(0, from - 1), 0, item); say(true, `Moved ${nameA} up.`); return arr; }
      if (/\bdown\b/.test(t)) { arr.splice(Math.min(arr.length, from + 1), 0, item); say(true, `Moved ${nameA} down.`); return arr; }
      arr.splice(from, 0, item);
      say(false, `Got the section (${nameA}) but not the action. Try "to the top", "to the bottom", or "after Partnership".`);
      return arr;
    });
    setCommand("");
  };

  // ENTRY
  if (stage === "entry") {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <div style={briefHeaderStyle}>
          <button onClick={onBack} style={s.btnSecondary}>← Back</button>
          <div style={{ ...briefBadge, backgroundColor: C.accentOrange + "18", color: C.accentOrange }}>AB</div>
          <span style={{ fontSize: "15px", fontWeight: 600, color: C.text }}>Audience Brief</span>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "13px", backgroundColor: C.accentOrange + "14", color: C.accentOrange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", marginBottom: "20px", animation: "fadeUp 0.5s ease-out" }}>◫</div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, color: C.text, margin: "0 0 8px 0", textAlign: "center", animation: "fadeUp 0.5s ease-out", animationDelay: "0.05s", animationFillMode: "both" }}>Generate an audience brief</h1>
          <p style={{ fontSize: "15px", color: C.textSecondary, margin: "0 0 28px 0", textAlign: "center", maxWidth: "440px", lineHeight: "1.5", animation: "fadeUp 0.5s ease-out", animationDelay: "0.1s", animationFillMode: "both" }}>
            Describe your campaign — brand, target audience, and KPI. DS-1 will draft a brief with recommended products you can edit, reorder, and export.
          </p>
          <div style={{ width: "100%", maxWidth: "560px", animation: "fadeUp 0.5s ease-out", animationDelay: "0.15s", animationFillMode: "both" }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleGenerate(); } }}
              placeholder="e.g. I want to target people 25–35 who drink coffee and matcha. My brand is Matchaful and my KPI is reach."
              rows={3}
              style={{ width: "100%", padding: "16px 18px", borderRadius: "12px", border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.text, fontSize: "15px", fontFamily: "'DM Sans', sans-serif", outline: "none", resize: "none", lineHeight: "1.5", boxSizing: "border-box", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
            />
            <button onClick={() => handleGenerate()} style={{ marginTop: "12px", width: "100%", padding: "13px", borderRadius: "10px", border: "none", backgroundColor: input.trim() ? C.text : C.bgHover, color: input.trim() ? "#fff" : C.textTertiary, fontSize: "14px", fontWeight: 600, cursor: input.trim() ? "pointer" : "default", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s ease" }}>Generate brief</button>
          </div>
        </div>
      </div>
    );
  }

  // GENERATING
  if (stage === "generating") {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <div style={briefHeaderStyle}>
          <button onClick={onBack} style={s.btnSecondary}>← Back</button>
          <div style={{ ...briefBadge, backgroundColor: C.accentOrange + "18", color: C.accentOrange }}>AB</div>
          <span style={{ fontSize: "15px", fontWeight: 600, color: C.text }}>Audience Brief</span>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <div style={{ fontSize: "14px", color: C.textSecondary, fontStyle: "italic" }}>Thinking...</div>
          {genPhase === "generating" && <div style={{ fontSize: "14px", color: C.textSecondary, fontStyle: "italic" }}>Generating your brief...</div>}
        </div>
      </div>
    );
  }

  // SELECT (product recommendation checklist)
  if (stage === "select") {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <div style={briefHeaderStyle}>
          <button onClick={onBack} style={s.btnSecondary}>← Back</button>
          <div style={{ ...briefBadge, backgroundColor: C.accentOrange + "18", color: C.accentOrange }}>AB</div>
          <span style={{ fontSize: "15px", fontWeight: 600, color: C.text }}>Audience Brief</span>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", backgroundColor: "rgba(0,0,0,0.02)" }}>
          <div style={{
            width: "100%", maxWidth: "480px", backgroundColor: C.bg,
            borderRadius: "16px", border: `1px solid ${C.border}`,
            boxShadow: "0 12px 48px rgba(0,0,0,0.12)", overflow: "hidden",
            animation: "popIn 0.25s cubic-bezier(0.4,0,0.2,1)",
          }}>
            <style>{`@keyframes popIn { from { opacity: 0; transform: scale(0.97) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }`}</style>
            <div style={{ padding: "20px 22px 16px" }}>
              <div style={{ fontSize: "17px", fontWeight: 700, color: C.text }}>Recommended products</div>
              <div style={{ fontSize: "13px", color: C.textSecondary, marginTop: "4px", lineHeight: "1.5" }}>
                Based on your campaign, here's what I recommend including. Select or deselect any before building your brief.
              </div>
            </div>
            <div style={{ maxHeight: "44vh", overflowY: "auto", padding: "0 12px" }}>
              {DRAFT_SECTIONS.map(sec => {
                const on = selectedProducts.includes(sec.id);
                return (
                  <div key={sec.id} onClick={() => toggleProduct(sec.id)} style={{
                    display: "flex", alignItems: "flex-start", gap: "12px",
                    padding: "12px 10px", borderRadius: "8px", cursor: "pointer",
                  }}>
                    <div style={{
                      width: "18px", height: "18px", borderRadius: "5px", marginTop: "1px",
                      border: `1.5px solid ${on ? C.accentOrange : C.border}`,
                      backgroundColor: on ? C.accentOrange : "transparent",
                      color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "11px", flexShrink: 0,
                    }}>{on ? "✓" : ""}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: on ? C.text : C.textTertiary }}>{sec.product}</div>
                      <div style={{ fontSize: "12px", color: C.textTertiary, marginTop: "1px" }}>{sec.items.length} recommended audiences</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: "16px 22px", borderTop: `1px solid ${C.borderLight}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "12px", color: C.textTertiary }}>{selectedProducts.length} of {DRAFT_SECTIONS.length} selected</span>
              <button onClick={confirmSelection} disabled={selectedProducts.length === 0} style={{
                padding: "10px 20px", borderRadius: "8px", border: "none",
                backgroundColor: selectedProducts.length ? C.text : C.bgHover,
                color: selectedProducts.length ? "#fff" : C.textTertiary,
                fontSize: "14px", fontWeight: 600, cursor: selectedProducts.length ? "pointer" : "default",
                fontFamily: "'DM Sans', sans-serif",
              }}>Build brief →</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DRAFT
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={briefHeaderStyle}>
        <button onClick={onBack} style={s.btnSecondary}>← Back</button>
        <div style={{ ...briefBadge, backgroundColor: C.accentOrange + "18", color: C.accentOrange }}>AB</div>
        <span style={{ fontSize: "15px", fontWeight: 600, color: C.text, flex: 1 }}>Audience Brief</span>
        {exported ? (
          <span style={{ fontSize: "13px", fontWeight: 600, color: C.accentGreen }}>✓ Exported as PDF</span>
        ) : (
          <button onClick={handleExport} style={{ ...s.btnPrimary, backgroundColor: C.text }}>↓ Download PDF</button>
        )}
      </div>

      {/* Split: chat left, document right */}
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>

        {/* LEFT — chat / edit panel */}
        <div style={{ width: "380px", flexShrink: 0, borderRight: `1px solid ${C.borderLight}`, display: "flex", flexDirection: "column", backgroundColor: C.bgSecondary }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
            {/* the user's original request */}
            <div style={{ fontSize: "11px", fontWeight: 600, color: C.textTertiary, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>Your request</div>
            <div style={{ fontSize: "13px", color: C.text, lineHeight: "1.6", padding: "12px 14px", borderRadius: "10px", backgroundColor: C.bg, border: `1px solid ${C.border}`, marginBottom: "20px" }}>
              {input || "Generate an audience brief for this campaign."}
            </div>

            {/* DS-1 generated confirmation */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: C.accentOrange, fontFamily: "'Space Mono', monospace", flexShrink: 0, marginTop: "2px" }}>DS-1</span>
              <div style={{ fontSize: "13px", color: C.textSecondary, lineHeight: "1.6" }}>
                I drafted your <strong>{brandName} x Dstillery</strong> brief with {sections.length} product{sections.length !== 1 ? "s" : ""}. Tell me to reorder, edit, or add products and you'll see it update on the right.
              </div>
            </div>

            {/* conversation log */}
            {cmdLog.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: "10px" }}>
                {m.role === "user" ? (
                  <div style={{ maxWidth: "85%", fontSize: "13px", color: "#fff", backgroundColor: C.text, padding: "8px 12px", borderRadius: "12px 12px 2px 12px", lineHeight: "1.5" }}>{m.text}</div>
                ) : (
                  <div style={{ display: "flex", gap: "8px", maxWidth: "90%" }}>
                    <span style={{ fontSize: "11px", flexShrink: 0, marginTop: "2px", color: m.ok ? C.accentGreen : C.textTertiary }}>{m.ok ? "✓" : "ⓘ"}</span>
                    <div style={{ fontSize: "13px", color: C.textSecondary, lineHeight: "1.5" }}>{m.text}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* composer */}
          <div style={{ padding: "14px", borderTop: `1px solid ${C.borderLight}` }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "flex-end", padding: "6px 6px 6px 12px", borderRadius: "12px", border: `1px solid ${C.border}`, backgroundColor: C.bg }}>
              <textarea
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); runCommand(); } }}
                placeholder="Ask DS-1 to edit, reorder, or add a product…"
                rows={2}
                style={{ flex: 1, border: "none", outline: "none", backgroundColor: "transparent", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", color: C.text, resize: "none", lineHeight: "1.5", padding: "4px 0" }}
              />
              <button onClick={() => runCommand()} style={{ width: "30px", height: "30px", borderRadius: "8px", border: "none", cursor: "pointer", backgroundColor: command.trim() ? C.text : C.bgHover, color: command.trim() ? "#fff" : C.textTertiary, fontSize: "14px", flexShrink: 0 }}>↑</button>
            </div>
            <div style={{ display: "flex", gap: "6px", marginTop: "8px", flexWrap: "wrap" }}>
              {["Move Custom AI to the top", "Remove Predictive Contextual"].map(ex => (
                <button key={ex} onClick={() => runCommand(ex)} style={{ padding: "4px 10px", borderRadius: "14px", fontSize: "11px", border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.textTertiary, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>{ex}</button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — live document */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px clamp(20px, 4vw, 56px)", minWidth: 0 }}>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "12px", fontWeight: 600, color: C.textTertiary, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Audience Brief</div>
              <h1 style={{ fontSize: "26px", fontWeight: 700, color: C.text, margin: 0 }}>{brandName} x Dstillery</h1>
            </div>

            {sections.map((sec) => (
              <div key={sec.id} style={{ marginBottom: "12px", border: `1px solid ${C.border}`, borderRadius: "12px", backgroundColor: C.bg, overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 16px", borderBottom: `1px solid ${C.borderLight}`, backgroundColor: C.bgSecondary }}>
                  <span style={{ fontSize: "15px", fontWeight: 700, color: C.text, flex: 1 }}>{sec.product}</span>
                  <button onClick={() => setEditingId(editingId === sec.id ? null : sec.id)} style={{ display: "flex", alignItems: "center", gap: "5px", padding: "6px 12px", borderRadius: "7px", cursor: "pointer", border: `1px solid ${editingId === sec.id ? C.accentBlue : C.border}`, backgroundColor: editingId === sec.id ? C.accentBlue : C.bg, color: editingId === sec.id ? "#fff" : C.textSecondary, fontSize: "12px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>✎ {editingId === sec.id ? "Done" : "Edit"}</button>
                  <button onClick={() => removeSection(sec.id)} style={{ display: "flex", alignItems: "center", gap: "5px", padding: "6px 12px", borderRadius: "7px", cursor: "pointer", border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.accentRed, fontSize: "12px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>✕ Remove</button>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  {editingId === sec.id ? (
                    <textarea value={sec.desc} onChange={(e) => updateDesc(sec.id, e.target.value)} rows={3} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: `1px solid ${C.accentBlue}`, backgroundColor: C.bg, color: C.text, fontSize: "13px", fontFamily: "'DM Sans', sans-serif", outline: "none", resize: "vertical", lineHeight: "1.6", boxSizing: "border-box", marginBottom: "12px" }} />
                  ) : (
                    <div style={{ fontSize: "13px", color: C.textSecondary, lineHeight: "1.6", marginBottom: "12px" }}>{sec.desc}</div>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {sec.items.map((it, ii) => (
                      <div key={ii} style={{ display: "flex", gap: "8px", fontSize: "13px", color: C.text, lineHeight: "1.5" }}>
                        <span style={{ color: C.textTertiary, flexShrink: 0, fontFamily: sec.itemType === "path" ? "'Space Mono', monospace" : "inherit" }}>{sec.itemType === "numbered" ? `${ii + 1}.` : "•"}</span>
                        <span style={{ fontFamily: (sec.itemType === "path" || sec.itemType === "url") ? "'Space Mono', monospace" : "inherit", fontSize: (sec.itemType === "path" || sec.itemType === "url") ? "12px" : "13px", color: sec.itemType === "url" ? C.accentBlue : C.text }}>{it}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Add product */}
            <div style={{ position: "relative", marginTop: "4px" }}>
              <button onClick={() => setShowAdd(!showAdd)} style={{ width: "100%", padding: "12px", borderRadius: "10px", border: `1px dashed ${C.border}`, backgroundColor: "transparent", color: C.textSecondary, cursor: "pointer", fontSize: "13px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
                + Ask DS-1 to recommend another product
              </button>
              {showAdd && (
                <div style={{ marginTop: "8px", border: `1px solid ${C.border}`, borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                  {ADDABLE.filter(a => !sections.find(s2 => s2.id === a.id)).map(a => (
                    <div key={a.id} onClick={() => addSection(a)} style={{ padding: "12px 16px", borderBottom: `1px solid ${C.borderLight}`, cursor: "pointer", backgroundColor: C.bg }}>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: C.text }}>{a.product}</div>
                      <div style={{ fontSize: "12px", color: C.textTertiary, marginTop: "2px" }}>{a.desc}</div>
                    </div>
                  ))}
                  {ADDABLE.filter(a => !sections.find(s2 => s2.id === a.id)).length === 0 && (
                    <div style={{ padding: "14px 16px", fontSize: "13px", color: C.textTertiary, fontStyle: "italic", backgroundColor: C.bg }}>All recommended products are already in the brief.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const briefHeaderStyle = { padding: "14px 24px", borderBottom: `1px solid ${C.borderLight}`, display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 };
const briefBadge = { width: "28px", height: "28px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono', monospace", fontSize: "10px", fontWeight: 700 };
const briefIconBtn = { width: "26px", height: "26px", borderRadius: "6px", border: "none", backgroundColor: "transparent", color: C.textTertiary, cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" };

function ProjectsView({ agency }) {
  const [openProject, setOpenProject] = useState(null);
  const [showNew, setShowNew] = useState(false);

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
            cursor: "pointer", fontWeight: 500, fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
          }}>← Audience Plans</button>
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
            border: "none", backgroundColor: C.text, color: "#fff",
            fontSize: "14px", fontWeight: 600, cursor: "pointer", textAlign: "left",
            fontFamily: "'DM Sans', sans-serif", animation: "fadeUp 0.5s ease-out", animationDelay: "0.05s", animationFillMode: "both",
          }}>+ New chat in this plan</button>

          {/* Project instructions */}
          <div style={projS.section}>
            <div style={projS.sectionTitle}>Plan Instructions</div>
            <div style={projS.sectionDesc}>DS-1 applies these to every conversation in this plan</div>
            <div style={{
              marginTop: "12px", padding: "14px 16px", borderRadius: "10px",
              backgroundColor: C.bgSidebar, border: `1px solid ${C.borderLight}`,
              fontSize: "13px", color: C.text, lineHeight: "1.6",
            }}>{p.instructions}</div>
          </div>

          {/* Project knowledge */}
          <div style={projS.section}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={projS.sectionTitle}>Plan Knowledge</div>
                <div style={projS.sectionDesc}>{p.files} files scoped to this plan</div>
              </div>
              <button style={{
                padding: "6px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: 600,
                border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.text,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
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
                    fontFamily: "'Space Mono', monospace", fontSize: "8px", fontWeight: 700,
                  }}>{f.type}</div>
                  <span style={{ fontSize: "14px", fontWeight: 500, color: C.text }}>{f.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project conversations */}
          <div style={projS.section}>
            <div style={projS.sectionTitle}>Conversations</div>
            <div style={projS.sectionDesc}>{p.convos} chats in this plan</div>
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
                  <span style={{ flex: 1, fontSize: "14px", fontWeight: 500, color: C.text }}>{c.title}</span>
                  <span style={{ fontSize: "12px", color: C.textTertiary, fontFamily: "'Space Mono', monospace" }}>{c.time}</span>
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
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px", maxWidth: "720px", animation: "fadeUp 0.5s ease-out" }}>
        <div>
          <h1 style={s.heading}>Audience Plans</h1>
          <p style={s.subheading}>Organize campaigns and initiatives with their own context, files, and chats</p>
        </div>
        <button onClick={() => setShowNew(true)} style={{
          padding: "9px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
          border: "none", backgroundColor: C.text, color: "#fff",
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif", flexShrink: 0,
        }}>+ New plan</button>
      </div>

      {showNew && <NewProjectModal onClose={() => setShowNew(false)} />}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", maxWidth: "720px" }}>
        {projects.map((p, i) => (
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
            <div style={{ fontSize: "15px", fontWeight: 600, color: C.text, marginBottom: "4px" }}>{p.name}</div>
            <div style={{ fontSize: "13px", color: C.textSecondary, lineHeight: "1.5", marginBottom: "16px" }}>{p.desc}</div>
            <div style={{ display: "flex", gap: "14px", fontSize: "12px", color: C.textTertiary, fontFamily: "'Space Mono', monospace" }}>
              <span>{p.convos} chats</span>
              <span>{p.files} files</span>
              <span>{p.audiences} audiences</span>
            </div>
            <div style={{ fontSize: "11px", color: C.textTertiary, marginTop: "10px" }}>Updated {p.updated}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const projS = {
  section: { marginBottom: "28px", animation: "fadeUp 0.5s ease-out", animationFillMode: "both" },
  sectionTitle: { fontSize: "15px", fontWeight: 700, color: C.text },
  sectionDesc: { fontSize: "13px", color: C.textTertiary, marginTop: "2px" },
};

function NewProjectModal({ onClose }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [marketer, setMarketer] = useState("");
  const [color, setColor] = useState(C.accentBlue);
  const [instructions, setInstructions] = useState("");
  const [dsp, setDsp] = useState("ttd");
  const [audType, setAudType] = useState("id_based");
  const [scalePerf, setScalePerf] = useState("scale");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const colors = [C.accentBlue, C.accentGreen, C.accentOrange, C.accentPurple, C.accentPink, C.accentRed];
  const canCreate = name.trim() && desc.trim() && marketer;

  const Field = ({ label, hint, required, children }) => (
    <div style={{ marginBottom: "18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
        <span style={{ fontSize: "13px", fontWeight: 600, color: C.text }}>{label}</span>
        {required && <span style={{ fontSize: "11px", color: C.accentRed }}>required</span>}
      </div>
      {hint && <div style={{ fontSize: "12px", color: C.textTertiary, marginBottom: "8px", lineHeight: "1.5" }}>{hint}</div>}
      {children}
    </div>
  );

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: "8px",
    border: `1px solid ${C.border}`, backgroundColor: C.bg,
    color: C.text, fontSize: "14px", fontFamily: "'DM Sans', sans-serif",
    outline: "none", boxSizing: "border-box",
  };

  const Pills = ({ options, value, onChange }) => (
    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
      {options.map(opt => (
        <button key={opt.value} onClick={() => onChange(opt.value)} style={{
          padding: "7px 14px", borderRadius: "7px", fontSize: "12px", fontWeight: 600,
          border: `1px solid ${value === opt.value ? C.text : C.border}`,
          backgroundColor: value === opt.value ? C.text : C.bg,
          color: value === opt.value ? "#fff" : C.textSecondary,
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s ease",
        }}>{opt.label}</button>
      ))}
    </div>
  );

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
          width: "100%", maxWidth: "560px", maxHeight: "85vh", overflowY: "auto",
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
            <div style={{ fontSize: "17px", fontWeight: 700, color: C.text }}>New Audience Plan</div>
            <div style={{ fontSize: "13px", color: C.textTertiary, marginTop: "2px" }}>Set up context and defaults for a campaign or initiative</div>
          </div>
          <button onClick={onClose} style={{
            width: "30px", height: "30px", borderRadius: "8px", border: "none",
            backgroundColor: C.bgHover, color: C.textSecondary, cursor: "pointer", fontSize: "16px",
          }}>×</button>
        </div>

        {/* Body */}
        <div style={{ padding: "22px 24px" }}>
          <Field label="Plan name" required>
            <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. SafeGuard Q3 Auto Campaign" />
          </Field>

          <Field label="Description" required>
            <input style={inputStyle} value={desc} onChange={e => setDesc(e.target.value)} placeholder="What is this plan for?" />
          </Field>

          <Field label="Marketer" required hint="Links the plan to a marketer account so syndication is pre-wired.">
            <select style={inputStyle} value={marketer} onChange={e => setMarketer(e.target.value)}>
              <option value="">Select a marketer...</option>
              <option>SafeGuard Auto Insurance</option>
              <option>Microsoft Surface</option>
              <option>Esther Test Marketer</option>
              <option>+ Add new marketer</option>
            </select>
          </Field>

          <Field label="Color">
            <div style={{ display: "flex", gap: "8px" }}>
              {colors.map(c => (
                <button key={c} onClick={() => setColor(c)} style={{
                  width: "28px", height: "28px", borderRadius: "8px", backgroundColor: c,
                  border: color === c ? `2px solid ${C.text}` : "2px solid transparent",
                  cursor: "pointer", padding: 0,
                }} />
              ))}
            </div>
          </Field>

          <div style={{ height: "1px", backgroundColor: C.borderLight, margin: "4px 0 20px" }} />

          <Field label="Plan instructions" hint="Persistent guidance DS-1 follows in every chat in this plan — tone, rules, things to avoid.">
            <textarea
              style={{ ...inputStyle, height: "80px", resize: "vertical", lineHeight: "1.5" }}
              value={instructions} onChange={e => setInstructions(e.target.value)}
              placeholder="e.g. Always exclude current policyholders. Keep reports client-ready and free of internal segment IDs."
            />
          </Field>

          <Field label="Default DSP" hint="Pre-selected when syndicating from this plan.">
            <Pills value={dsp} onChange={setDsp} options={[
              { value: "ttd", label: "The Trade Desk" }, { value: "dv360", label: "DV360" },
              { value: "amazon", label: "Amazon" }, { value: "ask", label: "Ask each time" },
            ]} />
          </Field>

          <Field label="Audience type">
            <Pills value={audType} onChange={setAudType} options={[
              { value: "id_based", label: "ID-Based" }, { value: "id_free", label: "ID-Free" }, { value: "ask", label: "Ask each time" },
            ]} />
          </Field>

          {/* Advanced */}
          <button onClick={() => setShowAdvanced(!showAdvanced)} style={{
            display: "flex", alignItems: "center", gap: "6px", marginTop: "6px", marginBottom: showAdvanced ? "18px" : "0",
            background: "none", border: "none", cursor: "pointer", color: C.textSecondary,
            fontSize: "13px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", padding: 0,
          }}>
            <span style={{ transform: showAdvanced ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.2s", display: "inline-block" }}>›</span>
            Advanced — knowledge, guardrails, timeline
          </button>

          {showAdvanced && (
            <div style={{ animation: "fadeIn 0.2s ease-out" }}>
              <Field label="Plan knowledge" hint="Upload briefs, strategy docs, or exclusion lists scoped to this plan.">
                <button style={{ ...inputStyle, textAlign: "left", color: C.textTertiary, cursor: "pointer", borderStyle: "dashed" }}>+ Upload files</button>
              </Field>
              <Field label="Exclusion rules" hint="Audiences, domains, or customer lists DS-1 should never target here.">
                <input style={inputStyle} placeholder="e.g. current policyholders, competitor domains" />
              </Field>
              <Field label="Scale vs Performance">
                <Pills value={scalePerf} onChange={setScalePerf} options={[
                  { value: "scale", label: "Scale" }, { value: "performance", label: "Performance" }, { value: "ask", label: "Ask each time" },
                ]} />
              </Field>
              <div style={{ display: "flex", gap: "12px" }}>
                <Field label="Flight start"><input type="text" style={inputStyle} placeholder="Jul 1, 2026" /></Field>
                <Field label="Flight end"><input type="text" style={inputStyle} placeholder="Sep 30, 2026" /></Field>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: "16px 24px", borderTop: `1px solid ${C.borderLight}`,
          display: "flex", justifyContent: "flex-end", gap: "10px",
          position: "sticky", bottom: 0, backgroundColor: C.bg, borderRadius: "0 0 16px 16px",
        }}>
          <button onClick={onClose} style={{
            padding: "10px 18px", borderRadius: "8px", fontSize: "14px", fontWeight: 600,
            border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.text,
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          }}>Cancel</button>
          <button onClick={onClose} disabled={!canCreate} style={{
            padding: "10px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: 600,
            border: "none", backgroundColor: C.text, color: "#fff",
            cursor: canCreate ? "pointer" : "not-allowed", opacity: canCreate ? 1 : 0.4,
            fontFamily: "'DM Sans', sans-serif",
          }}>Create plan</button>
        </div>
      </div>
    </div>
  );
}

function HistoryView({ agency }) {
  const conversations = [
    { id: 1, title: "NY Knicks audience search & syndication", tool: "Audience Explorer", messages: 12, date: "Jun 3, 2026", status: "Syndicated", statusColor: C.accentGreen },
    { id: 2, title: "Auto Insurance Intenders — compound build", tool: "Build Compound Audience", messages: 8, date: "Jun 2, 2026", status: "Completed", statusColor: C.accentGreen },
    { id: 3, title: "CPG Health & Wellness — domain seeded", tool: "Build Domain Seeded", messages: 6, date: "Jun 1, 2026", status: "In Progress", statusColor: C.accentOrange },
  ];

  return (
    <div style={s.content}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{ animation: "fadeUp 0.5s ease-out", marginBottom: "28px" }}>
        <h1 style={s.heading}>History</h1>
        <p style={s.subheading}>All past conversations with DS-1 for <strong>{agency.name}</strong></p>
      </div>

      <div style={{
        maxWidth: "720px", display: "flex", flexDirection: "column", gap: "8px",
        animation: "fadeUp 0.5s ease-out", animationDelay: "0.05s", animationFillMode: "both",
      }}>
        {conversations.map((conv) => (
          <div key={conv.id} style={{
            display: "flex", alignItems: "center", gap: "16px",
            padding: "16px 20px", borderRadius: "10px",
            border: `1px solid ${C.border}`, backgroundColor: C.bg,
            cursor: "pointer", transition: "background-color 0.15s ease",
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: C.text }}>{conv.title}</div>
              <div style={{ fontSize: "12px", color: C.textTertiary, marginTop: "3px", display: "flex", gap: "12px", alignItems: "center" }}>
                <span>{conv.tool}</span>
                <span>·</span>
                <span>{conv.messages} messages</span>
                <span>·</span>
                <span>{conv.date}</span>
              </div>
            </div>
            <span style={{
              fontSize: "11px", fontWeight: 600, fontFamily: "'Space Mono', monospace",
              color: conv.statusColor, backgroundColor: conv.statusColor + "14",
              padding: "3px 10px", borderRadius: "4px", flexShrink: 0,
            }}>{conv.status}</span>
            <span style={{ color: C.textTertiary, fontSize: "16px", flexShrink: 0 }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LibraryView({ agency }) {
  const [filter, setFilter] = useState("all");

  const FILE_TYPES = {
    pdf: { icon: "PDF", color: "#e03e3e", bg: "#e03e3e14" },
    pptx: { icon: "PPTX", color: "#d9730d", bg: "#d9730d14" },
    xlsx: { icon: "XLSX", color: "#0f7b6c", bg: "#0f7b6c14" },
    csv: { icon: "CSV", color: "#2eaadc", bg: "#2eaadc14" },
    docx: { icon: "DOCX", color: "#6940a5", bg: "#6940a514" },
  };

  const files = [
    { name: "Q3 2026 Audience Strategy", type: "docx", addedBy: "Esther K.", date: "Jun 1, 2026", size: "1.2 MB", tag: "Strategy" },
    { name: "Ideal Customer Profile — Auto Insurance", type: "pdf", addedBy: "Esther K.", date: "May 28, 2026", size: "640 KB", tag: "ICP" },
    { name: "Brand Guidelines — SafeGuard", type: "pdf", addedBy: "Paul M.", date: "May 20, 2026", size: "3.8 MB", tag: "Brand" },
    { name: "Approved Verticals & Exclusion List", type: "xlsx", addedBy: "Esther K.", date: "May 15, 2026", size: "92 KB", tag: "Rules" },
    { name: "Historical Campaign Performance — 2025", type: "xlsx", addedBy: "Paul M.", date: "Apr 10, 2026", size: "1.8 MB", tag: "Performance" },
    { name: "Competitor Audience Landscape", type: "pptx", addedBy: "Esther K.", date: "Mar 22, 2026", size: "5.1 MB", tag: "Research" },
  ];

  const types = ["all", "pdf", "pptx", "xlsx", "csv", "docx"];
  const filtered = filter === "all" ? files : files.filter(f => f.type === filter);

  return (
    <div style={s.content}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{ animation: "fadeUp 0.5s ease-out", marginBottom: "28px" }}>
        <h1 style={s.heading}>Library</h1>
        <p style={s.subheading}>Reference docs and files that DS-1 uses as context for <strong>{agency.name}</strong></p>
      </div>

      {/* Info box */}
      <div style={{
        padding: "14px 18px", borderRadius: "10px",
        backgroundColor: C.bgSidebar, border: `1px solid ${C.borderLight}`,
        marginBottom: "24px", maxWidth: "720px", fontSize: "13px", color: C.textSecondary, lineHeight: "1.6",
        animation: "fadeUp 0.5s ease-out", animationDelay: "0.03s", animationFillMode: "both",
      }}>
        Files in the library are available to DS-1 across all conversations. Upload audience strategies, ICPs, brand guidelines, or any reference material to give DS-1 persistent context for this workspace.
      </div>

      {/* Actions + filter */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "16px", maxWidth: "720px",
        animation: "fadeUp 0.5s ease-out", animationDelay: "0.05s", animationFillMode: "both",
      }}>
        <div style={{ display: "flex", gap: "6px" }}>
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{
              padding: "5px 12px", borderRadius: "6px", fontSize: "11px", fontWeight: 600,
              fontFamily: t === "all" ? "'DM Sans', sans-serif" : "'Space Mono', monospace",
              border: `1px solid ${filter === t ? C.text : C.border}`,
              backgroundColor: filter === t ? C.text : C.bg,
              color: filter === t ? "#fff" : C.textSecondary,
              cursor: "pointer", transition: "all 0.15s ease",
              textTransform: t === "all" ? "none" : "uppercase",
            }}>{t === "all" ? "All" : t}</button>
          ))}
        </div>
        <button style={{
          padding: "7px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
          border: "none", backgroundColor: C.text, color: "#fff",
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
        }}>+ Upload file</button>
      </div>

      {/* File list */}
      <div style={{
        maxWidth: "720px", border: `1px solid ${C.border}`, borderRadius: "12px", overflow: "hidden",
        animation: "fadeUp 0.5s ease-out", animationDelay: "0.08s", animationFillMode: "both",
      }}>
        {filtered.length === 0 ? (
          <div style={{ padding: "24px 20px", fontSize: "14px", color: C.textTertiary, fontStyle: "italic", textAlign: "center" }}>
            No files match this filter.
          </div>
        ) : (
          filtered.map((file, i) => {
            const ft = FILE_TYPES[file.type];
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "14px 20px", borderBottom: `1px solid ${C.borderLight}`,
                backgroundColor: C.bg, cursor: "pointer",
              }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "6px",
                  backgroundColor: ft.bg, color: ft.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Space Mono', monospace", fontSize: "9px", fontWeight: 700,
                  flexShrink: 0,
                }}>{ft.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: C.text }}>{file.name}</div>
                  <div style={{ fontSize: "11px", color: C.textTertiary, marginTop: "2px", display: "flex", gap: "8px", alignItems: "center" }}>
                    <span>{file.addedBy}</span>
                    <span style={{
                      fontSize: "10px", fontWeight: 600,
                      padding: "1px 6px", borderRadius: "3px",
                      backgroundColor: C.bgHover, color: C.textSecondary,
                    }}>{file.tag}</span>
                  </div>
                </div>
                <div style={{ fontSize: "12px", color: C.textTertiary, fontFamily: "'Space Mono', monospace", flexShrink: 0 }}>{file.date}</div>
                <div style={{ fontSize: "12px", color: C.textTertiary, fontFamily: "'Space Mono', monospace", width: "60px", textAlign: "right", flexShrink: 0 }}>{file.size}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function SettingsView() {
  const [voiceMode, setVoiceMode] = useState("professional");
  const [customExample, setCustomExample] = useState("");
  const [defaultDsp, setDefaultDsp] = useState("ttd");
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
    <div style={{ display: "flex", gap: "4px" }}>
      {options.map(opt => (
        <button key={opt.value} onClick={() => onChange(opt.value)} style={{
          padding: "6px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: 600,
          border: `1px solid ${value === opt.value ? C.text : C.border}`,
          backgroundColor: value === opt.value ? C.text : C.bg,
          color: value === opt.value ? "#fff" : C.textSecondary,
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          transition: "all 0.15s ease",
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
                padding: "8px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
                border: `1px solid ${voiceMode === opt.value ? C.text : C.border}`,
                backgroundColor: voiceMode === opt.value ? C.text : C.bg,
                color: voiceMode === opt.value ? "#fff" : C.textSecondary,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
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
              <div style={{ fontSize: "13px", color: C.textSecondary, marginBottom: "8px" }}>
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
                  color: C.text, fontSize: "13px", fontFamily: "'DM Sans', sans-serif",
                  outline: "none", resize: "vertical", lineHeight: "1.6",
                  boxSizing: "border-box",
                }}
              />
              {customExample.trim() && (
                <button style={{
                  marginTop: "8px", padding: "7px 16px", borderRadius: "6px",
                  fontSize: "12px", fontWeight: 600, border: "none",
                  backgroundColor: C.text, color: "#fff", cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}>Save style</button>
              )}
            </div>
          )}
        </div>

        {/* Saved Prompts */}
        <div style={setS.section}>
          <div style={setS.sectionTitle}>Saved Prompts</div>
          <div style={setS.sectionDesc}>Persistent instructions that DS-1 follows across all conversations</div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
            {prompts.map((p) => (
              <div key={p.id} style={setS.promptCard}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: C.text }}>{p.label}</div>
                  <div style={{ fontSize: "12px", color: C.textTertiary, marginTop: "2px", lineHeight: "1.5" }}>{p.prompt}</div>
                </div>
                <span onClick={() => setPrompts(prev => prev.filter(x => x.id !== p.id))}
                  style={{ color: C.textTertiary, cursor: "pointer", fontSize: "14px", flexShrink: 0 }}>×</span>
              </div>
            ))}
            <button style={{
              padding: "12px", borderRadius: "8px", fontSize: "13px",
              border: `1px dashed ${C.border}`, backgroundColor: "transparent",
              color: C.textTertiary, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              transition: "border-color 0.15s ease",
            }}>+ Add prompt</button>
          </div>
        </div>

        {/* Workflow Defaults */}
        <div style={setS.section}>
          <div style={setS.sectionTitle}>Workflow Defaults</div>
          <div style={setS.sectionDesc}>Pre-fill common selections so DS-1 skips the questions</div>

          <div style={{ marginTop: "16px" }}>
            <div style={setS.row}>
              <div style={setS.rowLabel}>
                <div style={setS.label}>Default DSP</div>
                <div style={setS.labelDesc}>Pre-selected platform when syndicating</div>
              </div>
              <OptionPill value={defaultDsp} onChange={setDefaultDsp} options={[
                { value: "ttd", label: "The Trade Desk" },
                { value: "dv360", label: "DV360" },
                { value: "amazon", label: "Amazon" },
                { value: "none", label: "Ask me" },
              ]} />
            </div>
            <div style={setS.row}>
              <div style={setS.rowLabel}>
                <div style={setS.label}>Scale vs Performance</div>
                <div style={setS.labelDesc}>Default optimization when syndicating</div>
              </div>
              <OptionPill value={scalePerf} onChange={setScalePerf} options={[
                { value: "scale", label: "Scale" },
                { value: "performance", label: "Performance" },
                { value: "ask", label: "Ask me" },
              ]} />
            </div>
          </div>
        </div>

        {/* Output Preferences */}
        <div style={setS.section}>
          <div style={setS.sectionTitle}>Output Preferences</div>
          <div style={setS.sectionDesc}>Control how DS-1 generates and delivers files</div>

          <div style={{ marginTop: "16px" }}>
            <div style={setS.row}>
              <div style={setS.rowLabel}>
                <div style={setS.label}>Default Report Format</div>
                <div style={setS.labelDesc}>Preferred format for generated reports and briefs</div>
              </div>
              <OptionPill value={outputFormat} onChange={setOutputFormat} options={[
                { value: "pdf", label: "PDF" },
                { value: "pptx", label: "PPTX" },
                { value: "docx", label: "DOCX" },
              ]} />
            </div>
            <div style={setS.row}>
              <div style={setS.rowLabel}>
                <div style={setS.label}>Auto-attach Exports</div>
                <div style={setS.labelDesc}>Automatically generate a CSV export with audience results</div>
              </div>
              <Toggle on={autoExport} onToggle={() => setAutoExport(!autoExport)} />
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
            <div style={setS.row}>
              <div style={setS.rowLabel}>
                <div style={setS.label}>Weekly Digest</div>
                <div style={setS.labelDesc}>Get a summary of all DS-1 activity every Monday</div>
              </div>
              <Toggle on={weeklyDigest} onToggle={() => setWeeklyDigest(!weeklyDigest)} />
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
    fontWeight: 700,
    color: C.text,
  },
  sectionDesc: {
    fontSize: "13px",
    color: C.textTertiary,
    marginTop: "2px",
  },
  voicePreview: {
    marginTop: "14px",
    padding: "12px 16px",
    borderRadius: "8px",
    backgroundColor: C.bgSidebar,
    border: `1px solid ${C.borderLight}`,
    fontSize: "13px",
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
    fontSize: "14px",
    fontWeight: 600,
    color: C.text,
  },
  labelDesc: {
    fontSize: "12px",
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

function AdminView({ agency }) {
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
        { id: "reach_forecasting", name: "Reach Forecasting", desc: "Estimate addressable reach before syndicating an audience to a platform." },
      ],
    },
    {
      category: "Workspace Management",
      icon: "☰",
      tools: [
        { id: "ooo", name: "Out of Office", desc: "Set coverage persons and auto-expiration for team member OOO periods." },
        { id: "notifications", name: "Notifications", desc: "Configure alerts for build completions, syndication status, and action items." },
        { id: "user_management", name: "User Management", desc: "Manage workspace members, roles, and permissions." },
        { id: "marketer_management", name: "Marketer Management", desc: "Configure and manage marketer accounts and destination mappings." },
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
        <span style={{ fontSize: "12px", color: C.textTertiary, fontWeight: 600 }}>TEAM ACCESS:</span>
        <div style={{ display: "flex", gap: "8px" }}>
          <span style={{ ...adminS.teamBadge, backgroundColor: C.accentPurple + "14", color: C.accentPurple }}>CS</span>
          <span style={{ ...adminS.teamBadge, backgroundColor: C.accentBlue + "14", color: C.accentBlue }}>General</span>
        </div>
        <span style={{ fontSize: "11px", color: C.textTertiary, fontStyle: "italic" }}>Click badges to assign</span>
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
          <div style={{ fontSize: "14px", fontWeight: 600, color: C.text }}>{agency.name}</div>
          <div style={{ fontSize: "12px", color: C.textTertiary }}>{enabledCount} of {totalCount} capabilities enabled</div>
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
        <div style={{ fontSize: "13px", color: C.textTertiary, marginBottom: "12px", paddingLeft: "4px" }}>
          Control which data sources appear in audience results for this workspace
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {/* Dstillery */}
          <div style={adminS.provCard}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ ...adminS.provBadge, backgroundColor: C.accentBlue + "18", color: C.accentBlue }}>Ds</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: 600, color: C.text }}>Dstillery Audiences <span style={{ fontSize: "11px", fontWeight: 600, color: C.accentGreen, backgroundColor: C.accentGreen + "14", padding: "1px 7px", borderRadius: "4px", marginLeft: "4px" }}>Default</span></div>
                <div style={{ fontSize: "12px", color: C.textTertiary, marginTop: "2px" }}>Dstillery's full first-party behavioral catalog</div>
              </div>
              <ProvToggle on={providers.dstillery} onToggle={() => toggleProvider("dstillery")} />
            </div>
          </div>

          {/* LiveRamp */}
          <div style={adminS.provCard}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ ...adminS.provBadge, backgroundColor: C.accentGreen + "18", color: C.accentGreen }}>LR</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: 600, color: C.text }}>LiveRamp Marketplace</div>
                <div style={{ fontSize: "12px", color: C.textTertiary, marginTop: "2px" }}>Pulls third-party providers via the LiveRamp connector</div>
              </div>
              <ProvToggle on={providers.liveramp} onToggle={() => toggleProvider("liveramp")} />
            </div>

            {providers.liveramp && (
              <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: `1px solid ${C.borderLight}` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: C.textSecondary }}>
                    Marketplace providers
                    <span style={{ fontSize: "10px", fontWeight: 600, color: C.textTertiary, backgroundColor: C.bgHover, padding: "1px 6px", borderRadius: "3px", marginLeft: "6px", fontFamily: "'Space Mono', monospace" }}>via LiveRamp MCP</span>
                  </span>
                  <span style={{ fontSize: "11px", color: C.textTertiary }}>{lrSelected.length} of {LIVERAMP_PROVIDERS.length} selected</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {LIVERAMP_PROVIDERS.map(p => {
                    const on = lrSelected.includes(p);
                    return (
                      <button key={p} onClick={() => toggleLr(p)} style={{
                        display: "flex", alignItems: "center", gap: "6px",
                        padding: "6px 12px", borderRadius: "7px", fontSize: "12px", fontWeight: 500,
                        border: `1px solid ${on ? C.accentGreen : C.border}`,
                        backgroundColor: on ? C.accentGreen + "10" : C.bg,
                        color: on ? C.text : C.textTertiary, cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s ease",
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
                <div style={{ fontSize: "14px", fontWeight: 600, color: C.text }}>Upload Your Own Taxonomy</div>
                <div style={{ fontSize: "12px", color: C.textTertiary, marginTop: "2px" }}>Bring a custom segment taxonomy to surface in results</div>
              </div>
              <ProvToggle on={providers.taxonomy} onToggle={() => toggleProvider("taxonomy")} />
            </div>

            {providers.taxonomy && (
              <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: `1px solid ${C.borderLight}` }}>
                <button style={{
                  width: "100%", padding: "16px", borderRadius: "8px",
                  border: `1px dashed ${C.border}`, backgroundColor: "transparent",
                  color: C.textTertiary, cursor: "pointer", fontSize: "13px",
                  fontFamily: "'DM Sans', sans-serif",
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
                  return (
                    <div key={tool.id} style={adminS.toolRow}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "14px", fontWeight: 600, color: isOn ? C.text : C.textTertiary }}>{tool.name}</span>
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
                        </div>
                        <div style={{ fontSize: "12px", color: C.textTertiary, lineHeight: "1.5", marginTop: "2px" }}>{tool.desc}</div>
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
    fontFamily: "'Space Mono', monospace", fontSize: "12px", fontWeight: 700,
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
    fontSize: "13px", fontWeight: 700, color: C.text,
    textTransform: "uppercase", letterSpacing: "0.5px",
  },
  catCount: {
    fontSize: "12px", color: C.textTertiary,
    fontFamily: "'Space Mono', monospace",
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
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: "4px",
    fontFamily: "'Space Mono', monospace",
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
    fontFamily: "'Space Mono', monospace", fontSize: "13px", fontWeight: 700,
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
    fontSize: "14px",
    color: C.textTertiary,
    width: "20px",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "14px",
    fontWeight: 700,
    color: C.text,
  },
  cardContext: {
    fontSize: "13px",
    color: C.textTertiary,
  },
  reviewLink: {
    fontSize: "13px",
    fontWeight: 600,
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
    fontSize: "14px",
    color: C.text,
    flex: 1,
  },
  fileBadge: {
    fontSize: "12px",
    color: C.textTertiary,
    backgroundColor: C.bgSidebar,
    border: `1px solid ${C.borderLight}`,
    padding: "4px 10px",
    borderRadius: "6px",
    fontFamily: "'Space Mono', monospace",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
};

const s = {
  shell: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
    color: C.text,
    backgroundColor: C.bg,
  },

  // Sidebar
  sidebar: {
    width: "260px",
    minWidth: "260px",
    backgroundColor: C.bgSidebar,
    borderRight: `1px solid ${C.borderLight}`,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "sticky",
    top: 0,
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
    fontFamily: "'Space Mono', monospace",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
    margin: "0 auto",
  },
  logoMark: {
    backgroundColor: C.text,
    borderRadius: "8px",
    padding: "5px 10px",
  },
  logoText: {
    fontFamily: "'Space Mono', monospace",
    fontWeight: 700,
    fontSize: "14px",
    color: "#fff",
    letterSpacing: "-0.5px",
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
    fontFamily: "'Space Mono', monospace",
    fontSize: "11px",
    fontWeight: 700,
    flexShrink: 0,
  },
  agencyName: {
    fontSize: "13px",
    fontWeight: 600,
    color: C.text,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  agencyLabel: {
    fontSize: "11px",
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
    fontSize: "11px",
    color: C.textTertiary,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    padding: "10px 14px 6px",
    fontWeight: 600,
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
    fontFamily: "'Space Mono', monospace",
    fontSize: "10px",
    fontWeight: 700,
    flexShrink: 0,
  },
  dropdownItemText: {
    fontSize: "13px",
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
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
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
    backgroundColor: C.accentGreen,
  },

  // Main area
  main: {
    flex: 1,
    minWidth: 0,
    overflowY: "auto",
    height: "100vh",
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
    fontWeight: 700,
    color: C.text,
    margin: 0,
    letterSpacing: "-0.5px",
  },
  subheading: {
    fontSize: "15px",
    color: C.textSecondary,
    marginTop: "8px",
    fontWeight: 400,
  },
  sectionLabel: {
    fontSize: "12px",
    color: C.textTertiary,
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: 600,
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
    fontSize: "20px", fontWeight: 600, margin: "0 0 8px 0", letterSpacing: "-0.2px", color: C.text,
  },
  cardDesc: {
    fontSize: "14px", color: C.textSecondary, lineHeight: "1.6", margin: 0, flex: 1,
  },
  cardFooter: {
    marginTop: "24px", paddingTop: "16px", borderTop: `1px solid ${C.borderLight}`,
  },
  cardAction: (color) => ({
    fontSize: "13px", fontWeight: 600, color: color, fontFamily: "'Space Mono', monospace",
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
    fontSize: "14px", fontWeight: 500, display: "block", color: C.text,
  },
  recentMeta: {
    fontSize: "12px", color: C.textTertiary, display: "block", marginTop: "2px",
  },
  recentTime: {
    fontSize: "12px", color: C.textTertiary, fontFamily: "'Space Mono', monospace", flexShrink: 0,
  },

  // Notification styles
  notifCard: {
    padding: "16px 18px",
    backgroundColor: C.bg,
  },
  notifName: {
    fontSize: "14px",
    fontWeight: 600,
    color: C.text,
  },
  notifMeta: {
    fontSize: "12px",
    color: C.textTertiary,
    marginTop: "3px",
    fontFamily: "'Space Mono', monospace",
  },
  statusBadge: (bg, color) => ({
    display: "inline-block",
    fontSize: "12px",
    fontWeight: 500,
    color: color,
    backgroundColor: bg,
    padding: "2px 8px",
    borderRadius: "4px",
    fontFamily: "'Space Mono', monospace",
  }),
  btnPrimary: {
    padding: "6px 16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: C.accentGreen,
    color: "#fff",
    fontSize: "13px",
    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
  },
  btnSecondary: {
    padding: "6px 16px",
    borderRadius: "6px",
    border: `1px solid ${C.border}`,
    backgroundColor: C.bg,
    color: C.text,
    fontSize: "13px",
    fontWeight: 500,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
  },
  emptyState: {
    padding: "16px 18px",
    fontSize: "14px",
    color: C.textTertiary,
    fontStyle: "italic",
    backgroundColor: C.bg,
  },
};
