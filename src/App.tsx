import { useEffect, useMemo, useState, type ReactNode } from "react";

type Page =
  | "dashboard"
  | "campaigns"
  | "create-campaign"
  | "accounts"
  | "run-research"
  | "running"
  | "results"
  | "report"
  | "settings";

type IconName =
  | "activity"
  | "accounts"
  | "archive"
  | "arrow"
  | "bell"
  | "briefcase"
  | "calendar"
  | "campaign"
  | "check"
  | "chevron"
  | "clock"
  | "close"
  | "download"
  | "external"
  | "eye"
  | "filter"
  | "help"
  | "home"
  | "menu"
  | "more"
  | "plus"
  | "print"
  | "refresh"
  | "search"
  | "settings"
  | "share"
  | "shield"
  | "spark"
  | "trend"
  | "upload"
  | "users";

const iconPaths: Record<IconName, ReactNode> = {
  activity: <><path d="M4 12h3l2-7 4 14 2-7h5" /></>,
  accounts: <><circle cx="9" cy="8" r="3" /><path d="M3 20c0-4 2-6 6-6s6 2 6 6M16 7h5M18.5 4.5v5" /></>,
  archive: <><path d="M4 7h16v13H4zM3 4h18v3H3zM9 11h6" /></>,
  arrow: <><path d="m9 18 6-6-6-6" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18" /></>,
  campaign: <><path d="M4 4h16v16H4zM8 15l3-4 3 2 3-5" /></>,
  check: <><path d="m5 12 4 4L19 6" /></>,
  chevron: <><path d="m8 10 4 4 4-4" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  download: <><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14" /></>,
  external: <><path d="M14 4h6v6M20 4l-9 9M18 13v7H4V6h7" /></>,
  eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12" /><circle cx="12" cy="12" r="3" /></>,
  filter: <><path d="M3 5h18l-7 8v6l-4 2v-8z" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.6 2.6 0 1 1 4 2.2c-1 .7-1.5 1.1-1.5 2.3M12 17h.01" /></>,
  home: <><path d="m3 11 9-8 9 8v10h-6v-7H9v7H3z" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  print: <><path d="M7 8V3h10v5M7 17H4V9h16v8h-3M7 14h10v7H7z" /></>,
  refresh: <><path d="M20 7v5h-5M4 17v-5h5M18 10a7 7 0 0 0-12-3L4 12m16 0-2 5a7 7 0 0 1-12 0" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19 13.5V10.5l2-1.5-2-3.5-2.5 1A8 8 0 0 0 14 5V2h-4v3a8 8 0 0 0-2.5 1.5l-2.5-1L3 9l2 1.5v3L3 15l2 3.5 2.5-1A8 8 0 0 0 10 19v3h4v-3a8 8 0 0 0 2.5-1.5l2.5 1 2-3.5z" /></>,
  share: <><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5" /></>,
  shield: <><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
  spark: <><path d="m12 2 1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5zM19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7z" /></>,
  trend: <><path d="m4 17 5-5 4 3 7-9M15 6h5v5" /></>,
  upload: <><path d="M12 16V4m0 0L8 8m4-4 4 4M4 15v5h16v-5" /></>,
  users: <><circle cx="9" cy="8" r="3" /><path d="M3 20c0-4 2-6 6-6s6 2 6 6M16 11a3 3 0 1 0 0-6M16 14c3.3 0 5 2 5 5" /></>,
};

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}

function Button({ children, variant = "primary", icon, onClick, type = "button", disabled = false, className = "" }: {
  children?: ReactNode; variant?: "primary" | "secondary" | "ghost" | "danger" | "icon"; icon?: IconName; onClick?: () => void; type?: "button" | "submit"; disabled?: boolean; className?: string;
}) {
  return <button className={`btn btn-${variant} ${className}`} onClick={onClick} type={type} disabled={disabled}>{icon && <Icon name={icon} size={16} />}{children}</button>;
}

function Field({ label, placeholder, value, onChange, type = "text", hint, error }: {
  label?: string; placeholder?: string; value?: string; onChange?: (v: string) => void; type?: string; hint?: string; error?: string;
}) {
  return <label className="field">{label && <span className="field-label">{label}</span>}<input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange?.(e.target.value)} />{hint && <span className="field-hint">{hint}</span>}{error && <span className="field-error">{error}</span>}</label>;
}

function SelectField({ label, children, value, onChange }: { label?: string; children: ReactNode; value?: string; onChange?: (v: string) => void }) {
  return <label className="field">{label && <span className="field-label">{label}</span>}<select value={value} onChange={(e) => onChange?.(e.target.value)}>{children}</select></label>;
}

function TextArea({ label, placeholder, rows = 4 }: { label: string; placeholder?: string; rows?: number }) {
  return <label className="field"><span className="field-label">{label}</span><textarea placeholder={placeholder} rows={rows} /></label>;
}

function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "success" | "warning" | "danger" | "blue" | "orange" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function Logo({ compact = false }: { compact?: boolean }) {
  return <div className="logo"><div className="logo-mark"><span /><span /><span /></div>{!compact && <div><strong>OutreachLens</strong><small>Life Sciences</small></div>}</div>;
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`card ${className}`}>{children}</section>;
}

function PageHeader({ title, subtitle, children }: { title: string; subtitle: string; children?: ReactNode }) {
  return <div className="page-header"><div><div className="eyebrow">Life Sciences Intelligence</div><h1>{title}</h1><p>{subtitle}</p></div><div className="page-actions">{children}</div></div>;
}

import { sutroAccountData, sutroEvidenceLedger, type EvidenceItem } from "./sutroReportData";

const campaignRows = [
  ["Life Sciences • ADC Oncology Commercial Run", "Specialist provider of early-phase oncology clinical-operations and CMC services.", "ADC Clinical & CMC Ops", "Biotech", "Oncology / ADCs", "United States", "5", "Oct 05, 2026", "Active"],
  ["US Oncology Hospital Expansion", "Identify high-potential US oncology accounts for Product X.", "OncoNova X", "Health System", "Oncology", "United States", "6", "Oct 01, 2026", "Active"],
  ["HER2 Market Opportunity", "Identify organizations with strong HER2 treatment activity.", "TheraMab", "Specialty Clinic", "Oncology", "US & Canada", "4", "Sep 22, 2026", "Active"],
  ["Specialty Pharmacy Expansion", "Identify specialty pharmacies relevant to Product Y.", "Immunexa", "Specialty Pharmacy", "Immunology", "United States", "2", "Sep 12, 2026", "Draft"],
];

const accountRows = [
  { name: "Sutro Biopharma, Inc.", type: "Biotech (ADC Oncology)", location: "South San Francisco, CA", fit: 7.7, demand: 8.5, intent: 5.4, commercial: 6.5, score: 65, confidence: 68, priority: "Medium" },
  { name: "Cleveland Clinic", type: "Health System", location: "Cleveland, OH", fit: 9, demand: 8, intent: 8, commercial: 9, score: 88, confidence: 91, priority: "High" },
  { name: "Mayo Clinic", type: "Health System", location: "Rochester, MN", fit: 9, demand: 7, intent: 7, commercial: 9, score: 84, confidence: 89, priority: "High" },
  { name: "Mass General Brigham", type: "IDN", location: "Boston, MA", fit: 8, demand: 8, intent: 6, commercial: 8, score: 79, confidence: 86, priority: "Medium" },
  { name: "City of Hope", type: "Cancer Center", location: "Duarte, CA", fit: 9, demand: 7, intent: 5, commercial: 8, score: 77, confidence: 82, priority: "Medium" },
  { name: "Northwell Health", type: "Health System", location: "New Hyde Park, NY", fit: 7, demand: 6, intent: 5, commercial: 7, score: 68, confidence: 78, priority: "Low" },
];

function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("priya@novapharm.com");
  const [password, setPassword] = useState("password");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || password.length < 4) {
      setError("Enter a valid work email and password.");
      return;
    }
    setLoading(true);
    setTimeout(onLogin, 700);
  };
  return <div className="login-page">
    <div className="login-orb login-orb-one" /><div className="login-orb login-orb-two" />
    <header className="login-nav"><Logo /><div className="login-help"><Icon name="help" size={16} /> Need help? <strong>Contact support</strong></div></header>
    <main className="login-main">
      <div className="login-intro"><Badge tone="orange"><Icon name="spark" size={13} /> Evidence-backed account intelligence</Badge><h2>Research the right accounts.<br />Understand <em>why now.</em></h2><p>AI-powered pharmaceutical account intelligence built for modern commercial teams.</p><div className="trust-row"><span><Icon name="shield" size={16} /> Evidence visible</span><span><Icon name="check" size={16} /> Insights explainable</span></div></div>
      <Card className="login-card">
        <div className="mobile-logo"><Logo /></div>
        <div className="login-heading"><h1>Welcome back</h1><p>Sign in to your OutreachLens account.</p></div>
        <Button variant="secondary" className="google-btn" onClick={onLogin}><span className="google-g">G</span> Continue with Google</Button>
        <div className="divider"><span>Or continue with email</span></div>
        <form onSubmit={submit}>
          <Field label="Work email" type="email" value={email} onChange={setEmail} placeholder="name@company.com" />
          <div className="password-wrap"><Field label="Password" type={show ? "text" : "password"} value={password} onChange={setPassword} placeholder="Enter your password" /><button type="button" className="password-toggle" onClick={() => setShow(!show)} aria-label="Toggle password visibility"><Icon name="eye" size={17} /></button></div>
          <div className="form-meta"><label className="check-label"><input type="checkbox" defaultChecked /> Keep me signed in</label><button type="button" className="link-btn">Forgot password?</button></div>
          {error && <div className="inline-error">{error}</div>}
          <Button type="submit" className="full-width" disabled={loading}>{loading ? <><span className="spinner" /> Signing in...</> : "Sign in"}</Button>
        </form>
        <p className="signup-copy">New to OutreachLens? <button className="link-btn" onClick={onLogin}>Create an account</button></p>
        <div className="secure-note"><Icon name="shield" size={15} /> Secure access for authorized users</div>
      </Card>
    </main>
    <footer className="login-footer">© 2026 OutreachLens <span>Privacy</span><span>Terms</span></footer>
  </div>;
}

function AppShell({ page, setPage, onSignOut, activeCampaign, setActiveCampaign, campaigns, children }: { 
  page: Page; 
  setPage: (p: Page) => void; 
  onSignOut: () => void; 
  activeCampaign: string;
  setActiveCampaign: (c: string) => void;
  campaigns: string[][];
  children: ReactNode 
}) {
  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = [
    { label: "Home", icon: "home" as IconName, page: "dashboard" as Page },
    { label: "Campaigns", icon: "campaign" as IconName, page: "campaigns" as Page, count: campaigns.length },
    { label: "Accounts", icon: "accounts" as IconName, page: "accounts" as Page, count: 1 },
    { label: "Pipeline", icon: "trend" as IconName, page: "dashboard" as Page },
    { label: "Outreach", icon: "spark" as IconName, page: "dashboard" as Page },
    { label: "Settings", icon: "settings" as IconName, page: "settings" as Page },
  ];

  return (
    <div className="lens-app-shell">
      {/* DARK NAVY LEFT SIDEBAR */}
      <aside className="lens-sidebar">
        <div className="lens-brand-header">
          <div className="lens-logo-badge" style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)", display: "grid", placeItems: "center", boxShadow: "0 0 12px rgba(56, 189, 248, 0.5)" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#05050d" }} />
            </div>
            <div className="lens-logo-text">
              <strong style={{ fontSize: "14px", fontWeight: "800", letterSpacing: "-0.02em", color: "#ffffff" }}>Outreach</strong>
              <small style={{ display: "inline-block", marginLeft: "4px", fontSize: "9.5px", color: "#818cf8", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em" }}>LENS</small>
            </div>
          </div>
        </div>

        {/* WORKSPACE SELECTOR */}
        <div className="lens-sidebar-section">
          <div className="lens-section-label">WORKSPACE</div>
          <div className="lens-workspace-box">
            <span>Pavan Varma's Workspace</span>
            <Icon name="chevron" size={14} />
          </div>
        </div>

        {/* ACTIVE CAMPAIGN SELECTOR */}
        <div className="lens-sidebar-section">
          <div className="lens-section-label">ACTIVE CAMPAIGN</div>
          <div className="lens-active-campaign-select">
            <select value={activeCampaign} onChange={(e) => setActiveCampaign(e.target.value)}>
              {campaigns.map((c) => (
                <option key={c[0]} value={c[0]}>{c[0].slice(0, 24)}...</option>
              ))}
            </select>
            <Icon name="chevron" size={14} />
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="lens-nav-list">
          {navItems.map((item) => {
            const isActive = page === item.page || (item.page === "campaigns" && page === "create-campaign") || (item.page === "accounts" && ["run-research", "running", "results", "report"].includes(page));
            return (
              <button
                key={item.label}
                className={`lens-nav-btn ${isActive ? "active" : ""}`}
                onClick={() => setPage(item.page)}
              >
                <div className="lens-nav-left">
                  <Icon name={item.icon} size={17} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className={`lens-nav-badge ${isActive ? "active-badge" : ""}`}>{item.count}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* AGENTIC AI LIVE STATUS CHIP */}
        <div className="lens-sidebar-agent-card">
          <div className="lens-agent-dot-pulse" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span>Agentic Engine</span>
              <span style={{ fontSize: "9px", color: "#34d399", background: "rgba(52, 211, 153, 0.12)", padding: "1px 6px", borderRadius: "10px" }}>ONLINE</span>
            </div>
            <span style={{ fontSize: "10px", color: "#818cf8", display: "block", marginTop: "1px" }}>Autonomous account sync</span>
          </div>
        </div>

        {/* USER PROFILE BOTTOM */}
        <div className="lens-sidebar-footer">
          <div className="lens-user-row" onClick={() => setProfileOpen(!profileOpen)}>
            <div className="lens-user-avatar">P</div>
            <div className="lens-user-info">
              <strong>Pavan Dantuluri</strong>
              <small>prabha44556@gmail.c...</small>
            </div>
            <Icon name="chevron" size={14} />
          </div>
          {profileOpen && (
            <div className="lens-profile-menu">
              <button onClick={() => { setProfileOpen(false); setPage("settings"); }}>
                <Icon name="settings" size={14} /> Workspace Settings
              </button>
              <button className="lens-danger-btn" onClick={onSignOut}>
                <Icon name="arrow" size={14} /> Sign out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* RIGHT MAIN WORKSPACE */}
      <div className="lens-main-wrapper">
        {/* TOP BAR WITH SEARCH & ASK LENS ANYTHING */}
        <header className="lens-topbar">
          <div className="lens-topbar-left">
            {/* Title / Breadcrumbs */}
            <div className="lens-breadcrumb-trail">
              <strong style={{ textTransform: "capitalize", fontSize: "14px", color: "#1e293b" }}>
                {page === "create-campaign" ? "Create Campaign" : page === "report" ? "Company Intelligence" : page}
              </strong>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                Home &nbsp;/&nbsp; <span style={{ textTransform: "capitalize" }}>{page}</span>
              </div>
            </div>
          </div>

          <div className="lens-topbar-right">
            <div className="lens-ai-searchbox">
              <span className="lens-sparkle-dot">✨</span>
              <input 
                placeholder="Ask Lens anything..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
              />
              <kbd>⌘K</kbd>
            </div>
            <button className="lens-icon-btn" onClick={() => setPage("settings")} title="Settings">
              <Icon name="settings" size={17} />
            </button>
          </div>
        </header>

        {/* MAIN BODY AREA */}
        <main className="lens-content-area">
          {children}
        </main>

        {/* FLOATING LENS CO-PILOT WIDGET */}
        <div className="lens-copilot-widget" title="Open Lens Co-Pilot" onClick={() => alert("Lens AI Co-Pilot ready to assist with account research & outreach generation.")}>
          <div className="lens-copilot-orb">
            <span className="lens-copilot-spark" />
            <Icon name="activity" size={18} />
          </div>
          <span className="lens-copilot-label">LENS CO-PILOT</span>
        </div>
      </div>
    </div>
  );
}

function Campaigns({ 
  setPage, 
  campaigns = campaignRows, 
  successMessage, 
  onClearSuccess,
  onUseCampaign 
}: { 
  setPage: (p: Page) => void; 
  campaigns?: string[][]; 
  successMessage?: string | null; 
  onClearSuccess?: () => void;
  onUseCampaign?: (name: string) => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = campaigns.filter(c => 
    c[0].toLowerCase().includes(search.toLowerCase()) || 
    c[1].toLowerCase().includes(search.toLowerCase()) ||
    c[2].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="lens-page-body">
      {successMessage && (
        <div className="success-banner" style={{ marginBottom: "18px", padding: "12px 18px", background: "var(--emerald-50)", border: "1px solid #a7f3d0", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "space-between", color: "#065f46" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--emerald-500)", color: "white", display: "grid", placeItems: "center" }}><Icon name="check" size={14} /></span>
            <div>
              <strong style={{ display: "block", fontSize: "13px" }}>Campaign created successfully!</strong>
              <span style={{ fontSize: "12px", color: "#047857" }}>{successMessage}</span>
            </div>
          </div>
          {onClearSuccess && <button onClick={onClearSuccess} style={{ border: 0, background: "transparent", cursor: "pointer", color: "#047857" }}><Icon name="close" size={16} /></button>}
        </div>
      )}

      <div className="lens-page-header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "12px", marginTop: "4px" }}>
        <div>
          <h1 className="lens-page-title" style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: "0 0 2px" }}>Campaigns</h1>
          <p className="lens-page-subtitle" style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>Define what you sell, to whom, and how. Every research is anchored to a campaign.</p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Button 
            variant="primary" 
            onClick={() => setPage("create-campaign")}
            style={{ background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)", color: "white", borderRadius: "8px", fontWeight: "600", fontSize: "12.5px", height: "36px", padding: "0 14px", boxShadow: "0 2px 8px rgba(79, 70, 229, 0.3)" }}
          >
            <Icon name="plus" size={14} /> + New Campaign
          </Button>
        </div>
      </div>

      <Card className="lens-table-card">
        <div className="table-scroll">
          <table className="lens-table">
            <thead>
              <tr>
                <th>CAMPAIGN</th>
                <th>PRODUCT</th>
                <th>INDUSTRY PACK</th>
                <th>TARGET INDUSTRY</th>
                <th>GEOGRAPHY</th>
                <th>STATUS</th>
                <th style={{ textAlign: "right" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, idx) => (
                <tr key={idx}>
                  <td>
                    <div style={{ fontWeight: "600", color: "#0f172a", fontSize: "13px" }}>{r[0]}</div>
                    <span className="badge badge-orange" style={{ fontSize: "10px", marginTop: "3px", padding: "1px 6px" }}>Active</span>
                  </td>
                  <td style={{ color: "#475569", fontSize: "12.5px" }}>{r[2] || "Early-Phase Oncology Support"}</td>
                  <td style={{ color: "#64748b", fontSize: "12px" }}>Standard B2B</td>
                  <td style={{ color: "#475569", fontSize: "12px", maxWidth: "260px", whiteSpace: "normal" }}>
                    Biotechnology, Pharmaceutical Manufacturing, Oncology Drug Development
                  </td>
                  <td style={{ color: "#475569", fontSize: "12px" }}>{r[5] || "North America, Western Europe"}</td>
                  <td>
                    <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 8px", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", borderRadius: "99px", fontSize: "10.5px", fontWeight: "700", letterSpacing: ".04em" }}>
                      LIVE
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "6px" }}>
                      <button 
                        className="lens-action-btn"
                        onClick={() => {
                          onUseCampaign?.(r[0]);
                          setPage("accounts");
                        }}
                      >
                        Use
                      </button>
                      <button 
                        className="lens-action-btn"
                        onClick={() => setPage("create-campaign")}
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BOTTOM ATTACHED PAGINATION BAR */}
        <div className="lens-pagination-bar">
          <div>
            Showing <strong>1–{filtered.length}</strong> of <strong>{campaigns.length}</strong> campaigns
          </div>
          <div className="lens-pagination-controls">
            <button className="lens-pagination-btn" disabled>
              <Icon name="arrow" size={12} style={{ transform: "rotate(180deg)" }} /> Previous
            </button>
            <button className="lens-pagination-btn active">1</button>
            <button className="lens-pagination-btn" disabled>
              Next <Icon name="arrow" size={12} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}


// ----------------------------------------------------
// CREATE CAMPAIGN - STRUCTURED 4-STEP WIZARD
// ----------------------------------------------------

export interface CampaignProfile {
  campaign_name: string;
  product_service: string;
  website?: string;
  use_cases: string[];
  problems_solved: string[];
  differentiator?: string;
  industries: string[];
  company_types: string[];
  geographies: string[];
  company_size: string[];
  company_stage: string[];
  revenue_range: string[];
  exclusions: string[];
  primary_research_focus: string[];
  secondary_research_focus: string[];
  primary_roles: string[];
  secondary_roles: string[];
  contact_requirements: {
    currentlyInRole: boolean;
    publiclyVerifiable: boolean;
    relevantToOpportunity: boolean;
    recentActivityPreferred: boolean;
  };
  sales_motion: string;
  channels: string[];
  tone: string;
  objective: string;
  sender_name: string;
}

const USE_CASE_OPTIONS = [
  "Clinical Trial Execution",
  "CRO Management",
  "Clinical Operations Scaling",
  "CMC Support",
  "Manufacturing Support",
  "Regulatory Support",
  "Analytical Development",
  "Technology Implementation",
  "Consulting",
  "Managed Services",
];

const PROBLEM_OPTIONS = [
  "Limited Internal Capacity",
  "High Operational Complexity",
  "Vendor Coordination",
  "Slow Execution",
  "Cost Pressure",
  "Regulatory Complexity",
  "Scaling Challenges",
  "Data / Visibility Gaps",
  "Resource Constraints",
  "Technology Gaps",
];

const INDUSTRY_OPTIONS = [
  "Biotechnology",
  "Pharmaceutical",
  "Medical Devices",
  "CRO",
  "CDMO",
  "Healthcare",
  "Clinical Research",
  "Software / Technology",
  "Manufacturing",
  "Financial Services",
];

const COMPANY_TYPE_OPTIONS = [
  "Startup",
  "Growth-stage company",
  "Public company",
  "Private company",
  "Enterprise",
  "Drug Developer",
  "Specialty Pharma",
  "Research Organization",
  "Service Provider",
];

const GEOGRAPHY_OPTIONS = [
  "North America",
  "United States",
  "Canada",
  "Western Europe",
  "UK",
  "Europe",
  "Asia Pacific",
  "India",
];

const COMPANY_SIZE_OPTIONS = [
  "1–50",
  "50–250",
  "250–500",
  "500–1,000",
  "1,000–5,000",
  "5,000+",
];

const COMPANY_STAGE_OPTIONS = [
  "Pre-discovery",
  "Preclinical",
  "Clinical-stage",
  "Commercial-stage",
  "Growth-stage",
  "Mature / Established",
];

const REVENUE_OPTIONS = [
  "<$10M",
  "$10M–$50M",
  "$50M–$100M",
  "$100M–$500M",
  "$500M+",
];

const EXCLUSION_OPTIONS = [
  "Pre-discovery companies",
  "Companies outside target geography",
  "Below minimum company size",
  "No relevant product/program",
  "Government organizations",
  "Competitors",
  "Existing customers",
];

const RESEARCH_FOCUS_OPTIONS = [
  { id: "Clinical & Pipeline", label: "Clinical & Pipeline", desc: "Clinical programs, development stages, milestones and upcoming events." },
  { id: "Buying & Demand Signals", label: "Buying & Demand Signals", desc: "Signals indicating potential business need or purchasing activity." },
  { id: "Funding & Financial", label: "Funding & Financial", desc: "Capital raises, runway status, public offerings, and financial health." },
  { id: "CMC & Manufacturing", label: "CMC & Manufacturing", desc: "Manufacturing strategy, CMC activity, facilities and external manufacturing." },
  { id: "Regulatory", label: "Regulatory", desc: "FDA/EMA filings, orphan designations, IND approvals and meeting updates." },
  { id: "Partnerships & Licensing", label: "Partnerships & Licensing", desc: "Co-development deals, in/out-licensing agreements, and M&A activity." },
  { id: "Procurement & Vendor Activity", label: "Procurement & Vendor Activity", desc: "RFP releases, vendor evaluations, and supply chain contract changes." },
  { id: "Market & Competitive", label: "Market & Competitive", desc: "Competitive positioning, market entry, and commercial differentiation." },
  { id: "Hiring & Workforce", label: "Hiring & Workforce", desc: "Department expansions, key technical hires, and headcount growth." },
  { id: "Leadership Changes", label: "Leadership Changes", desc: "C-suite appointments, board changes, and committee transitions." },
  { id: "Expansion / Facilities", label: "Expansion / Facilities", desc: "New labs, clinical sites, cleanrooms, and regional footprints." },
  { id: "Technology / R&D", label: "Technology / R&D", desc: "New patent grants, technological platforms, and novel assays." },
];

const ROLE_CATEGORIES = [
  {
    category: "Executive",
    roles: ["CEO / Founder", "COO", "CFO"],
  },
  {
    category: "Clinical",
    roles: ["CMO", "VP Clinical Development", "VP Clinical Operations"],
  },
  {
    category: "Technical",
    roles: ["CTO", "VP CMC", "VP Manufacturing"],
  },
  {
    category: "Scientific",
    roles: ["CSO", "VP Research"],
  },
  {
    category: "Commercial",
    roles: ["VP Business Development", "Strategic Partnerships"],
  },
  {
    category: "Procurement",
    roles: ["Head of Procurement", "Vendor Management"],
  },
];

const SECONDARY_ROLE_OPTIONS = [
  "Director Clinical Operations",
  "Director CMC",
  "Director Manufacturing",
  "Director Regulatory",
  "Director Business Development",
  "Program Director",
  "Procurement Manager",
];

const EXISTING_PRODUCTS = [
  "Clinical Operations Support",
  "OncoNova X",
  "ADC Clinical & CMC Ops",
  "TheraMab Platform",
  "Immunexa Solutions",
  "Regulatory Submissions Suite",
];

function CreateCampaign({ setPage, onSave }: { setPage: (p: Page) => void; onSave: (campaign: string[], profile: CampaignProfile) => void }) {
  const [step, setStep] = useState<number>(0);
  const [showReview, setShowReview] = useState<boolean>(false);

  // STEP 1 State
  const [name, setName] = useState<string>("North America Oncology ADC Growth 2026");
  const [product, setProduct] = useState<string>("Clinical Operations Support");
  const [customProductInput, setCustomProductInput] = useState<string>("");
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState<boolean>(false);
  const [website, setWebsite] = useState<string>("https://clinicalops-solutions.io");
  const [useCases, setUseCases] = useState<string[]>(["Clinical Trial Execution", "CRO Management"]);
  const [problems, setProblems] = useState<string[]>(["Limited Internal Capacity", "Vendor Coordination", "Slow Execution"]);
  const [differentiator, setDifferentiator] = useState<string>("Dedicated oncology project teams with 48-hour site initiation speed.");

  // STEP 2 State
  const [industries, setIndustries] = useState<string[]>(["Biotechnology", "Pharmaceutical"]);
  const [companyTypes, setCompanyTypes] = useState<string[]>(["Growth-stage company", "Drug Developer"]);
  const [geographies, setGeographies] = useState<string[]>(["North America", "United States"]);
  const [companySizes, setCompanySizes] = useState<string[]>(["50–250", "250–500"]);
  const [companyStages, setCompanyStages] = useState<string[]>(["Clinical-stage"]);
  const [revenueRanges, setRevenueRanges] = useState<string[]>(["$10M–$50M"]);
  const [exclusions, setExclusions] = useState<string[]>(["Pre-discovery companies", "Government organizations"]);
  const [customExclusionInput, setCustomExclusionInput] = useState<string>("");
  const [showCustomExclusion, setShowCustomExclusion] = useState<boolean>(false);

  // Research Focus State
  const [primaryFocus, setPrimaryFocus] = useState<string[]>(["Clinical & Pipeline", "CMC & Manufacturing"]);
  const [secondaryFocus, setSecondaryFocus] = useState<string[]>(["Funding & Financial", "Regulatory"]);

  // STEP 3 State
  const [primaryRoles, setPrimaryRoles] = useState<string[]>(["CMO", "VP Clinical Operations", "VP CMC"]);
  const [secondaryRoles, setSecondaryRoles] = useState<string[]>(["Director Clinical Operations", "Director CMC"]);
  const [contactReqs, setContactReqs] = useState({
    currentlyInRole: true,
    publiclyVerifiable: true,
    relevantToOpportunity: true,
    recentActivityPreferred: true,
  });

  // STEP 4 State
  const [salesMotion, setSalesMotion] = useState<string>("Enterprise / Consultative");
  const [channels, setChannels] = useState<string[]>(["Email", "LinkedIn"]);
  const [tone, setTone] = useState<string>("Consultative");
  const [goal, setGoal] = useState<string>("Book Discovery Meeting");
  const [senderName, setSenderName] = useState<string>("Priya Mehta");

  // Validation States
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Helper toggle functions
  const toggleItem = (list: string[], setList: (l: string[]) => void, item: string, max?: number) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      if (max && list.length >= max) return;
      setList([...list, item]);
    }
  };

  const setResearchSignal = (id: string, priority: "primary" | "secondary" | "none") => {
    const totalSelected = (primaryFocus.includes(id) ? 0 : 1) + (secondaryFocus.includes(id) ? 0 : 1) + primaryFocus.length + secondaryFocus.length - (primaryFocus.includes(id) || secondaryFocus.includes(id) ? 1 : 0);
    
    if (priority === "none") {
      setPrimaryFocus(primaryFocus.filter((x) => x !== id));
      setSecondaryFocus(secondaryFocus.filter((x) => x !== id));
      return;
    }

    if (totalSelected > 6 && !primaryFocus.includes(id) && !secondaryFocus.includes(id)) {
      return; // Max 6 total research focuses
    }

    if (priority === "primary") {
      setSecondaryFocus(secondaryFocus.filter((x) => x !== id));
      if (!primaryFocus.includes(id)) setPrimaryFocus([...primaryFocus, id]);
    } else if (priority === "secondary") {
      setPrimaryFocus(primaryFocus.filter((x) => x !== id));
      if (!secondaryFocus.includes(id)) setSecondaryFocus([...secondaryFocus, id]);
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 0) {
      if (!name.trim() || name.trim().length < 3) newErrors.name = "Campaign name is required (min 3 characters).";
      if (!product.trim()) newErrors.product = "Product / Service is required.";
      if (useCases.length === 0) newErrors.useCases = "Select at least 1 primary use case (max 3).";
      if (problems.length === 0) newErrors.problems = "Select at least 1 problem solved (max 5).";
    } else if (currentStep === 1) {
      if (industries.length === 0) newErrors.industries = "Select at least 1 primary industry.";
      if (companyTypes.length === 0) newErrors.companyTypes = "Select at least 1 company type.";
      if (geographies.length === 0) newErrors.geographies = "Select at least 1 geography.";
      if (companySizes.length === 0) newErrors.companySizes = "Select at least 1 company size range.";
      if (primaryFocus.length === 0 && secondaryFocus.length === 0) newErrors.researchFocus = "Select at least 1 research focus signal.";
    } else if (currentStep === 2) {
      if (primaryRoles.length === 0) newErrors.primaryRoles = "Select at least 1 primary contact role.";
    } else if (currentStep === 3) {
      if (!salesMotion) newErrors.salesMotion = "Select a sales motion.";
      if (channels.length === 0) newErrors.channels = "Select at least 1 primary channel.";
      if (!goal) newErrors.goal = "Select an outreach goal.";
      if (!senderName.trim()) newErrors.senderName = "Sender name is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 3) {
        setStep(step + 1);
      } else {
        setShowReview(true);
      }
    }
  };

  const handleFinalSave = () => {
    const structuredProfile: CampaignProfile = {
      campaign_name: name,
      product_service: product,
      website: website || undefined,
      use_cases: useCases,
      problems_solved: problems,
      differentiator: differentiator || undefined,
      industries,
      company_types: companyTypes,
      geographies,
      company_size: companySizes,
      company_stage: companyStages,
      revenue_range: revenueRanges,
      exclusions,
      primary_research_focus: primaryFocus,
      secondary_research_focus: secondaryFocus,
      primary_roles: primaryRoles,
      secondary_roles: secondaryRoles,
      contact_requirements: contactReqs,
      sales_motion: salesMotion,
      channels,
      tone,
      objective: goal,
      sender_name: senderName,
    };

    const campaignRow = [
      name || "New Campaign",
      `${product} • ${useCases.slice(0, 2).join(", ")}`,
      product || "Custom Solution",
      companyTypes[0] || industries[0] || "Target Enterprise",
      industries[0] || "Biotechnology",
      geographies.join(", ") || "North America",
      "0",
      "Today",
      "Active",
    ];

    onSave(campaignRow, structuredProfile);
  };

  const stepsList = [
    { title: "What you sell", desc: "Offering & problems solved" },
    { title: "Who you sell to", desc: "ICP & research focus" },
    { title: "Who to contact", desc: "Roles & contact criteria" },
    { title: "How to reach out", desc: "Sales motion & channel" },
  ];

  return (
    <div className="page wizard-page">
      <div className="back-link" onClick={() => setPage("campaigns")}>
        <Icon name="arrow" /> Back to Campaigns
      </div>

      <PageHeader
        title="Create Campaign"
        subtitle="Define research context and buyer intent for OutreachLens account discovery."
      />

      <div className="wizard-layout">
        {/* TOP PROGRESS STEPPER */}
        <div className="wizard-stepper-header">
          <div className="stepper-track">
            {stepsList.map((s, idx) => {
              const isActive = !showReview && step === idx;
              const isCompleted = showReview || step > idx;
              return (
                <div key={s.title} style={{ display: "contents" }}>
                  <button
                    type="button"
                    className={`stepper-step ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
                    onClick={() => {
                      if (showReview) {
                        setShowReview(false);
                        setStep(idx);
                      } else if (idx <= step || validateStep(step)) {
                        setStep(idx);
                      }
                    }}
                  >
                    <span className="stepper-num">
                      {isCompleted ? <Icon name="check" size={14} /> : idx + 1}
                    </span>
                    <div className="stepper-labels">
                      <span className="stepper-step-title">{s.title}</span>
                      <span className="stepper-step-desc">{s.desc}</span>
                    </div>
                  </button>
                  {idx < stepsList.length - 1 && (
                    <div className={`stepper-divider ${step > idx || showReview ? "completed" : ""}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* MAIN CARD CONTAINER */}
        <Card className="wizard-card">
          {/* ========================================================= */}
          {/* STEP 1: WHAT YOU SELL */}
          {/* ========================================================= */}
          {!showReview && step === 0 && (
            <div className="form-stack">
              <div className="wizard-top">
                <div>
                  <span className="step-pill">Step 1 of 4 • Offering & Solutions</span>
                  <h2>What you sell</h2>
                  <p>Define the offering and the business problems it solves.</p>
                </div>
                <span className="autosave"><Icon name="check" size={13} /> Draft active</span>
              </div>

              <div className="form-grid">
                <Field
                  label="Campaign Name *"
                  placeholder="e.g. North America Oncology ADC Growth 2026"
                  value={name}
                  onChange={(v) => { setName(v); if (errors.name) setErrors({ ...errors, name: "" }); }}
                  error={errors.name}
                  hint="Required. Give this campaign a clear descriptive name."
                />

                <div className="field">
                  <span className="field-label">Product / Service *</span>
                  <div className="searchable-select-wrap">
                    <div style={{ display: "flex", gap: "6px" }}>
                      <input
                        type="text"
                        value={product}
                        placeholder="Select or type offering name..."
                        onChange={(e) => {
                          setProduct(e.target.value);
                          setIsProductDropdownOpen(true);
                          if (errors.product) setErrors({ ...errors, product: "" });
                        }}
                        onFocus={() => setIsProductDropdownOpen(true)}
                        style={{
                          width: "100%",
                          border: "1px solid var(--slate-300)",
                          borderRadius: "9px",
                          padding: "10px 12px",
                          height: "42px",
                          background: "white",
                        }}
                      />
                      <Button
                        variant="secondary"
                        style={{ height: "42px", minWidth: "42px", padding: 0 }}
                        onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                      >
                        <Icon name="chevron" size={15} />
                      </Button>
                    </div>

                    {isProductDropdownOpen && (
                      <div className="searchable-dropdown-list">
                        <div style={{ padding: "4px 8px", fontSize: "10px", color: "var(--slate-400)", fontWeight: 700 }}>
                          SUGGESTED OFFERINGS
                        </div>
                        {EXISTING_PRODUCTS.map((prod) => (
                          <button
                            key={prod}
                            type="button"
                            className={`searchable-option ${product === prod ? "highlighted" : ""}`}
                            onClick={() => {
                              setProduct(prod);
                              setIsProductDropdownOpen(false);
                            }}
                          >
                            <span>{prod}</span>
                            {product === prod && <Icon name="check" size={14} />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.product && <span className="field-error">{errors.product}</span>}
                </div>
              </div>

              <div className="form-grid">
                <Field
                  label="Product Website"
                  placeholder="https://yourcompany.com/product"
                  value={website}
                  onChange={setWebsite}
                  hint="Optional URL for product specifications or service overview."
                />
                <Field
                  label="Key Differentiator"
                  placeholder="What makes your solution different? (Max 120 chars)"
                  value={differentiator}
                  onChange={(v) => setDifferentiator(v.slice(0, 140))}
                  hint={`${differentiator.length}/120 characters max`}
                />
              </div>

              <div>
                <div className="form-section-title">
                  <span>Primary Use Cases * <small>(Select up to 3)</small></span>
                  <Badge tone={useCases.length === 3 ? "warning" : "blue"}>{useCases.length}/3 selected</Badge>
                </div>
                <div className="chip-grid">
                  {USE_CASE_OPTIONS.map((uc) => {
                    const isSelected = useCases.includes(uc);
                    const isDisabled = !isSelected && useCases.length >= 3;
                    return (
                      <div
                        key={uc}
                        className={`chip-item ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
                        onClick={() => toggleItem(useCases, setUseCases, uc, 3)}
                      >
                        {isSelected && <Icon name="check" size={14} />}
                        <span>{uc}</span>
                      </div>
                    );
                  })}
                </div>
                {errors.useCases && <span className="field-error" style={{ display: "block", marginTop: "4px" }}>{errors.useCases}</span>}
              </div>

              <div>
                <div className="form-section-title">
                  <span>Problems We Solve * <small>(Select up to 5)</small></span>
                  <Badge tone={problems.length === 5 ? "warning" : "blue"}>{problems.length}/5 selected</Badge>
                </div>
                <div className="chip-grid">
                  {PROBLEM_OPTIONS.map((prob) => {
                    const isSelected = problems.includes(prob);
                    const isDisabled = !isSelected && problems.length >= 5;
                    return (
                      <div
                        key={prob}
                        className={`chip-item ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
                        onClick={() => toggleItem(problems, setProblems, prob, 5)}
                      >
                        {isSelected && <Icon name="check" size={14} />}
                        <span>{prob}</span>
                      </div>
                    );
                  })}
                </div>
                {errors.problems && <span className="field-error" style={{ display: "block", marginTop: "4px" }}>{errors.problems}</span>}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 2: WHO YOU SELL TO & RESEARCH FOCUS */}
          {/* ========================================================= */}
          {!showReview && step === 1 && (
            <div className="form-stack">
              <div className="wizard-top">
                <div>
                  <span className="step-pill">Step 2 of 4 • ICP & Research Intelligence</span>
                  <h2>Who you sell to</h2>
                  <p>Define the companies and intelligence signals OutreachLens should prioritize.</p>
                </div>
                <span className="autosave"><Icon name="check" size={13} /> Draft active</span>
              </div>

              {/* Primary Industry */}
              <div>
                <div className="form-section-title">
                  <span>Primary Industry *</span>
                </div>
                <div className="chip-grid">
                  {INDUSTRY_OPTIONS.map((ind) => {
                    const isSelected = industries.includes(ind);
                    return (
                      <div
                        key={ind}
                        className={`chip-item ${isSelected ? "selected" : ""}`}
                        onClick={() => toggleItem(industries, setIndustries, ind)}
                      >
                        {isSelected && <Icon name="check" size={14} />}
                        <span>{ind}</span>
                      </div>
                    );
                  })}
                </div>
                {errors.industries && <span className="field-error" style={{ display: "block", marginTop: "4px" }}>{errors.industries}</span>}
              </div>

              {/* Company Type */}
              <div>
                <div className="form-section-title">
                  <span>Company Type *</span>
                </div>
                <div className="chip-grid">
                  {COMPANY_TYPE_OPTIONS.map((ct) => {
                    const isSelected = companyTypes.includes(ct);
                    return (
                      <div
                        key={ct}
                        className={`chip-item ${isSelected ? "selected" : ""}`}
                        onClick={() => toggleItem(companyTypes, setCompanyTypes, ct)}
                      >
                        {isSelected && <Icon name="check" size={14} />}
                        <span>{ct}</span>
                      </div>
                    );
                  })}
                </div>
                {errors.companyTypes && <span className="field-error" style={{ display: "block", marginTop: "4px" }}>{errors.companyTypes}</span>}
              </div>

              {/* Geography */}
              <div>
                <div className="form-section-title">
                  <span>Geography *</span>
                </div>
                <div className="chip-grid">
                  {GEOGRAPHY_OPTIONS.map((geo) => {
                    const isSelected = geographies.includes(geo);
                    return (
                      <div
                        key={geo}
                        className={`chip-item ${isSelected ? "selected" : ""}`}
                        onClick={() => toggleItem(geographies, setGeographies, geo)}
                      >
                        {isSelected && <Icon name="check" size={14} />}
                        <span>{geo}</span>
                      </div>
                    );
                  })}
                </div>
                {errors.geographies && <span className="field-error" style={{ display: "block", marginTop: "4px" }}>{errors.geographies}</span>}
              </div>

              {/* Company Size */}
              <div>
                <div className="form-section-title">
                  <span>Company Size (Employees) *</span>
                </div>
                <div className="chip-grid">
                  {COMPANY_SIZE_OPTIONS.map((size) => {
                    const isSelected = companySizes.includes(size);
                    return (
                      <div
                        key={size}
                        className={`chip-item ${isSelected ? "selected" : ""}`}
                        onClick={() => toggleItem(companySizes, setCompanySizes, size)}
                      >
                        {isSelected && <Icon name="check" size={14} />}
                        <span>{size}</span>
                      </div>
                    );
                  })}
                </div>
                {errors.companySizes && <span className="field-error" style={{ display: "block", marginTop: "4px" }}>{errors.companySizes}</span>}
              </div>

              <div className="form-grid">
                {/* Company Stage */}
                <div>
                  <div className="form-section-title">
                    <span>Company Stage <small>(Optional)</small></span>
                  </div>
                  <div className="chip-grid">
                    {COMPANY_STAGE_OPTIONS.map((stage) => {
                      const isSelected = companyStages.includes(stage);
                      return (
                        <div
                          key={stage}
                          className={`chip-item ${isSelected ? "selected" : ""}`}
                          onClick={() => toggleItem(companyStages, setCompanyStages, stage)}
                        >
                          {isSelected && <Icon name="check" size={14} />}
                          <span>{stage}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Revenue Range */}
                <div>
                  <div className="form-section-title">
                    <span>Revenue Range <small>(Optional)</small></span>
                  </div>
                  <div className="chip-grid">
                    {REVENUE_OPTIONS.map((rev) => {
                      const isSelected = revenueRanges.includes(rev);
                      return (
                        <div
                          key={rev}
                          className={`chip-item ${isSelected ? "selected" : ""}`}
                          onClick={() => toggleItem(revenueRanges, setRevenueRanges, rev)}
                        >
                          {isSelected && <Icon name="check" size={14} />}
                          <span>{rev}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Exclusions / Disqualifiers */}
              <div>
                <div className="form-section-title">
                  <span>Exclusions / Disqualifiers <small>(Optional)</small></span>
                  {!showCustomExclusion && (
                    <button
                      type="button"
                      className="link-btn"
                      style={{ fontSize: "11px" }}
                      onClick={() => setShowCustomExclusion(true)}
                    >
                      + Add custom exclusion
                    </button>
                  )}
                </div>
                <div className="chip-grid">
                  {EXCLUSION_OPTIONS.map((ex) => {
                    const isSelected = exclusions.includes(ex);
                    return (
                      <div
                        key={ex}
                        className={`chip-item ${isSelected ? "selected" : ""}`}
                        style={{ borderStyle: isSelected ? "solid" : "dashed" }}
                        onClick={() => toggleItem(exclusions, setExclusions, ex)}
                      >
                        {isSelected ? <Icon name="close" size={13} /> : <Icon name="plus" size={13} />}
                        <span>{ex}</span>
                      </div>
                    );
                  })}
                  {exclusions
                    .filter((x) => !EXCLUSION_OPTIONS.includes(x))
                    .map((customEx) => (
                      <div
                        key={customEx}
                        className="chip-item selected"
                        onClick={() => setExclusions(exclusions.filter((x) => x !== customEx))}
                      >
                        <Icon name="close" size={13} />
                        <span>{customEx}</span>
                      </div>
                    ))}
                </div>

                {showCustomExclusion && (
                  <div style={{ display: "flex", gap: "8px", marginTop: "10px", maxWidth: "450px" }}>
                    <input
                      type="text"
                      placeholder="e.g. Companies under bankruptcy review..."
                      value={customExclusionInput}
                      onChange={(e) => setCustomExclusionInput(e.target.value)}
                      style={{
                        flex: 1,
                        border: "1px solid var(--slate-300)",
                        borderRadius: "8px",
                        padding: "6px 10px",
                        fontSize: "12px",
                      }}
                    />
                    <Button
                      variant="primary"
                      style={{ minHeight: "34px", padding: "0 12px", fontSize: "11px" }}
                      onClick={() => {
                        if (customExclusionInput.trim()) {
                          setExclusions([...exclusions, customExclusionInput.trim()]);
                          setCustomExclusionInput("");
                          setShowCustomExclusion(false);
                        }
                      }}
                    >
                      Add
                    </Button>
                    <Button
                      variant="ghost"
                      style={{ minHeight: "34px", padding: "0 8px", fontSize: "11px" }}
                      onClick={() => setShowCustomExclusion(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              {/* RESEARCH FOCUS SECTION */}
              <div style={{ borderTop: "1px solid var(--slate-100)", paddingTop: "16px", marginTop: "6px" }}>
                <div className="form-section-title">
                  <div>
                    <span style={{ fontSize: "14px", color: "var(--navy-950)" }}>Research Focus</span>
                    <p style={{ margin: "2px 0 0", color: "var(--slate-500)", fontSize: "11px", fontWeight: 400 }}>
                      Choose the signals OutreachLens should prioritize when evaluating accounts (up to 6 total). Mark as <strong>Primary</strong> or <strong>Secondary</strong> priority.
                    </p>
                  </div>
                  <Badge tone={primaryFocus.length + secondaryFocus.length >= 6 ? "warning" : "blue"}>
                    {primaryFocus.length + secondaryFocus.length}/6 selected
                  </Badge>
                </div>

                <div className="research-card-grid" style={{ marginTop: "12px" }}>
                  {RESEARCH_FOCUS_OPTIONS.map((item) => {
                    const isPrimary = primaryFocus.includes(item.id);
                    const isSecondary = secondaryFocus.includes(item.id);
                    const isSelected = isPrimary || isSecondary;
                    const totalSelected = primaryFocus.length + secondaryFocus.length;
                    const isAtMax = totalSelected >= 6 && !isSelected;

                    return (
                      <div
                        key={item.id}
                        className={`research-signal-card ${isSelected ? "is-selected" : ""} ${isPrimary ? "is-primary" : ""}`}
                      >
                        <div className="signal-card-header">
                          <div className="signal-title-wrap">
                            <strong>{item.label}</strong>
                            <p>{item.desc}</p>
                          </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
                          <div className="priority-toggle-group">
                            <button
                              type="button"
                              className={`priority-toggle-btn ${isPrimary ? "active-primary" : ""}`}
                              disabled={isAtMax && !isPrimary}
                              onClick={() => setResearchSignal(item.id, isPrimary ? "none" : "primary")}
                              title="Mark as primary research priority"
                            >
                              Primary
                            </button>
                            <button
                              type="button"
                              className={`priority-toggle-btn ${isSecondary ? "active-secondary" : ""}`}
                              disabled={isAtMax && !isSecondary}
                              onClick={() => setResearchSignal(item.id, isSecondary ? "none" : "secondary")}
                              title="Mark as secondary research priority"
                            >
                              Secondary
                            </button>
                            {isSelected && (
                              <button
                                type="button"
                                className="priority-toggle-btn"
                                onClick={() => setResearchSignal(item.id, "none")}
                                style={{ color: "var(--slate-400)", borderLeft: "1px solid var(--slate-100)" }}
                              >
                                ✕
                              </button>
                            )}
                          </div>

                          {isPrimary && <Badge tone="orange">Primary Focus</Badge>}
                          {isSecondary && <Badge tone="blue">Secondary</Badge>}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {errors.researchFocus && <span className="field-error" style={{ display: "block", marginTop: "6px" }}>{errors.researchFocus}</span>}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 3: WHO TO CONTACT */}
          {/* ========================================================= */}
          {!showReview && step === 2 && (
            <div className="form-stack">
              <div className="wizard-top">
                <div>
                  <span className="step-pill">Step 3 of 4 • Stakeholders & Committee</span>
                  <h2>Who to contact</h2>
                  <p>Choose the people and decision-makers most relevant to your sales opportunity.</p>
                </div>
                <span className="autosave"><Icon name="check" size={13} /> Draft active</span>
              </div>

              {/* Primary Contacts */}
              <div>
                <div className="form-section-title">
                  <span>Primary Contacts * <small>(Select up to 6 key decision-maker roles)</small></span>
                  <Badge tone={primaryRoles.length === 6 ? "warning" : "blue"}>{primaryRoles.length}/6 selected</Badge>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", marginTop: "10px" }}>
                  {ROLE_CATEGORIES.map((cat) => (
                    <div key={cat.category} className="role-group-box">
                      <div className="role-group-header">
                        <span>{cat.category}</span>
                      </div>
                      <div className="chip-grid">
                        {cat.roles.map((r) => {
                          const isSelected = primaryRoles.includes(r);
                          const isDisabled = !isSelected && primaryRoles.length >= 6;
                          return (
                            <div
                              key={r}
                              className={`chip-item ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
                              onClick={() => toggleItem(primaryRoles, setPrimaryRoles, r, 6)}
                            >
                              {isSelected && <Icon name="check" size={14} />}
                              <span>{r}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                {errors.primaryRoles && <span className="field-error" style={{ display: "block", marginTop: "4px" }}>{errors.primaryRoles}</span>}
              </div>

              {/* Secondary Contacts */}
              <div style={{ marginTop: "4px" }}>
                <div className="form-section-title">
                  <span>Secondary / Influencer Contacts <small>(Optional, select up to 6)</small></span>
                  <Badge tone={secondaryRoles.length === 6 ? "warning" : "neutral"}>{secondaryRoles.length}/6 selected</Badge>
                </div>
                <div className="chip-grid" style={{ marginTop: "8px" }}>
                  {SECONDARY_ROLE_OPTIONS.map((sr) => {
                    const isSelected = secondaryRoles.includes(sr);
                    const isDisabled = !isSelected && secondaryRoles.length >= 6;
                    return (
                      <div
                        key={sr}
                        className={`chip-item ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
                        onClick={() => toggleItem(secondaryRoles, setSecondaryRoles, sr, 6)}
                      >
                        {isSelected && <Icon name="check" size={14} />}
                        <span>{sr}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Contact Requirements */}
              <div style={{ borderTop: "1px solid var(--slate-100)", paddingTop: "16px", marginTop: "8px" }}>
                <div className="form-section-title">
                  <span>Contact Quality & Verification Requirements</span>
                  <small>Pre-selected best practices for account intelligence discovery</small>
                </div>
                <div className="checkbox-card-grid" style={{ marginTop: "10px" }}>
                  <label className={`checkbox-card ${contactReqs.currentlyInRole ? "checked" : ""}`}>
                    <input
                      type="checkbox"
                      checked={contactReqs.currentlyInRole}
                      onChange={(e) => setContactReqs({ ...contactReqs, currentlyInRole: e.target.checked })}
                    />
                    <span>Currently active in confirmed role</span>
                  </label>

                  <label className={`checkbox-card ${contactReqs.publiclyVerifiable ? "checked" : ""}`}>
                    <input
                      type="checkbox"
                      checked={contactReqs.publiclyVerifiable}
                      onChange={(e) => setContactReqs({ ...contactReqs, publiclyVerifiable: e.target.checked })}
                    />
                    <span>Publicly verifiable with external record</span>
                  </label>

                  <label className={`checkbox-card ${contactReqs.relevantToOpportunity ? "checked" : ""}`}>
                    <input
                      type="checkbox"
                      checked={contactReqs.relevantToOpportunity}
                      onChange={(e) => setContactReqs({ ...contactReqs, relevantToOpportunity: e.target.checked })}
                    />
                    <span>Relevant to selected opportunity & use case</span>
                  </label>

                  <label className={`checkbox-card ${contactReqs.recentActivityPreferred ? "checked" : ""}`}>
                    <input
                      type="checkbox"
                      checked={contactReqs.recentActivityPreferred}
                      onChange={(e) => setContactReqs({ ...contactReqs, recentActivityPreferred: e.target.checked })}
                    />
                    <span>Prefer contacts with recent relevant activity</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 4: HOW TO REACH OUT */}
          {/* ========================================================= */}
          {!showReview && step === 3 && (
            <div className="form-stack">
              <div className="wizard-top">
                <div>
                  <span className="step-pill">Step 4 of 4 • Sales Motion & Approach</span>
                  <h2>How to reach out</h2>
                  <p>Set the preferred sales approach, tone, and delivery channel.</p>
                </div>
                <span className="autosave"><Icon name="check" size={13} /> Draft active</span>
              </div>

              <div className="form-grid">
                <SelectField
                  label="Sales Motion *"
                  value={salesMotion}
                  onChange={(v) => setSalesMotion(v)}
                >
                  <option value="Enterprise / Consultative">Enterprise / Consultative</option>
                  <option value="Consultative">Consultative</option>
                  <option value="Transactional">Transactional</option>
                  <option value="Account-Based">Account-Based (ABM)</option>
                  <option value="Relationship-led">Relationship-led</option>
                </SelectField>

                <SelectField
                  label="Email Tone *"
                  value={tone}
                  onChange={(v) => setTone(v)}
                >
                  <option value="Consultative">Consultative (Peer-to-peer advisor)</option>
                  <option value="Executive">Executive (Concise, strategic ROI)</option>
                  <option value="Technical">Technical (Evidence & specification focused)</option>
                  <option value="Direct">Direct (Action-oriented, brief)</option>
                  <option value="Professional">Professional (Formal enterprise tone)</option>
                </SelectField>
              </div>

              <div className="form-grid">
                <SelectField
                  label="Outreach Goal *"
                  value={goal}
                  onChange={(v) => setGoal(v)}
                >
                  <option value="Book Discovery Meeting">Book Discovery Meeting</option>
                  <option value="Start Conversation">Start Conversation</option>
                  <option value="Qualify Opportunity">Qualify Opportunity</option>
                  <option value="Introduce Solution">Introduce Solution</option>
                  <option value="Expand Existing Account">Expand Existing Account</option>
                </SelectField>

                <Field
                  label="Sender Name *"
                  placeholder="e.g. Pavan Dantuluri"
                  value={senderName}
                  onChange={(v) => { setSenderName(v); if (errors.senderName) setErrors({ ...errors, senderName: "" }); }}
                  error={errors.senderName}
                  hint="Used in signature and outbound communication personalization."
                />
              </div>

              <div>
                <div className="form-section-title">
                  <span>Primary Channel * <small>(Select one or multiple)</small></span>
                </div>
                <div className="chip-grid">
                  {["Email", "LinkedIn", "Phone", "Multi-channel"].map((ch) => {
                    const isSelected = channels.includes(ch);
                    return (
                      <div
                        key={ch}
                        className={`chip-item ${isSelected ? "selected" : ""}`}
                        onClick={() => toggleItem(channels, setChannels, ch)}
                      >
                        {isSelected && <Icon name="check" size={14} />}
                        <span>{ch}</span>
                      </div>
                    );
                  })}
                </div>
                {errors.channels && <span className="field-error" style={{ display: "block", marginTop: "4px" }}>{errors.channels}</span>}
              </div>

              <div className="info-box" style={{ marginTop: "10px" }}>
                <Icon name="spark" size={18} />
                <p>
                  <strong>Automated Outreach Synthesis</strong>
                  OutreachLens will synthesize value propositions, research focus signals, and contact intelligence into tailored messaging automatically during account execution.
                </p>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 5: COMPACT REVIEW STATE */}
          {/* ========================================================= */}
          {showReview && (
            <div className="form-stack">
              <div className="wizard-top">
                <div>
                  <span className="step-pill">Final Review • Ready to Create</span>
                  <h2>Review Campaign Configuration</h2>
                  <p>Confirm your business intent before saving the campaign profile.</p>
                </div>
                <Badge tone="success"><Icon name="check" size={13} /> Complete & Verified</Badge>
              </div>

              <div className="review-summary-grid">
                {/* Box 1: Selling */}
                <div className="review-box">
                  <div className="review-box-header">
                    <strong>1. What You Sell</strong>
                    <button type="button" onClick={() => { setShowReview(false); setStep(0); }}>Edit</button>
                  </div>
                  <div className="review-row">
                    <span>Campaign</span>
                    <div><strong>{name}</strong></div>
                  </div>
                  <div className="review-row">
                    <span>Product / Offering</span>
                    <div>{product}</div>
                  </div>
                  <div className="review-row">
                    <span>Primary Use Cases</span>
                    <div className="tag-pill-list">
                      {useCases.map((u) => <span key={u} className="tag-pill">{u}</span>)}
                    </div>
                  </div>
                  <div className="review-row">
                    <span>Problems Solved</span>
                    <div className="tag-pill-list">
                      {problems.map((p) => <span key={p} className="tag-pill">{p}</span>)}
                    </div>
                  </div>
                  {differentiator && (
                    <div className="review-row">
                      <span>Differentiator</span>
                      <div style={{ color: "var(--slate-600)", fontSize: "11px" }}>{differentiator}</div>
                    </div>
                  )}
                </div>

                {/* Box 2: ICP */}
                <div className="review-box">
                  <div className="review-box-header">
                    <strong>2. Who You Sell To</strong>
                    <button type="button" onClick={() => { setShowReview(false); setStep(1); }}>Edit</button>
                  </div>
                  <div className="review-row">
                    <span>Industry & Company Types</span>
                    <div className="tag-pill-list">
                      {industries.map((ind) => <span key={ind} className="tag-pill">{ind}</span>)}
                      {companyTypes.map((ct) => <span key={ct} className="tag-pill">{ct}</span>)}
                    </div>
                  </div>
                  <div className="review-row">
                    <span>Geography</span>
                    <div className="tag-pill-list">
                      {geographies.map((g) => <span key={g} className="tag-pill">{g}</span>)}
                    </div>
                  </div>
                  <div className="review-row">
                    <span>Company Size & Stage</span>
                    <div className="tag-pill-list">
                      {companySizes.map((s) => <span key={s} className="tag-pill">{s} emp</span>)}
                      {companyStages.map((st) => <span key={st} className="tag-pill">{st}</span>)}
                    </div>
                  </div>
                  {exclusions.length > 0 && (
                    <div className="review-row">
                      <span>Disqualifiers</span>
                      <div className="tag-pill-list">
                        {exclusions.map((ex) => <span key={ex} className="tag-pill" style={{ background: "var(--red-50)", color: "#b91c1c" }}>✕ {ex}</span>)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Box 3: Research Focus */}
                <div className="review-box">
                  <div className="review-box-header">
                    <strong>3. Research Focus Signals</strong>
                    <button type="button" onClick={() => { setShowReview(false); setStep(1); }}>Edit</button>
                  </div>
                  <div className="review-row">
                    <span>Primary Focus</span>
                    <div className="tag-pill-list">
                      {primaryFocus.map((pf) => <span key={pf} className="tag-pill primary"><Icon name="spark" size={11} /> {pf}</span>)}
                    </div>
                  </div>
                  <div className="review-row">
                    <span>Secondary Focus</span>
                    <div className="tag-pill-list">
                      {secondaryFocus.map((sf) => <span key={sf} className="tag-pill secondary">{sf}</span>)}
                    </div>
                  </div>
                  <div className="review-row" style={{ marginTop: "8px", paddingTop: "8px", borderTop: "1px solid var(--slate-100)" }}>
                    <span>Inferred Research Strategy</span>
                    <div style={{ fontSize: "11px", color: "var(--slate-500)", lineHeight: 1.4 }}>
                      Prioritizing accounts where {primaryFocus.join(" and ")} indicate active business need for {product}.
                    </div>
                  </div>
                </div>

                {/* Box 4: Contacts & Outreach */}
                <div className="review-box">
                  <div className="review-box-header">
                    <strong>4. Contacts & Outreach</strong>
                    <button type="button" onClick={() => { setShowReview(false); setStep(2); }}>Edit</button>
                  </div>
                  <div className="review-row">
                    <span>Target Roles</span>
                    <div className="tag-pill-list">
                      {primaryRoles.map((pr) => <span key={pr} className="tag-pill primary">{pr}</span>)}
                      {secondaryRoles.map((sr) => <span key={sr} className="tag-pill">{sr}</span>)}
                    </div>
                  </div>
                  <div className="review-row">
                    <span>Sales Motion & Tone</span>
                    <div>{salesMotion} • {tone} Tone</div>
                  </div>
                  <div className="review-row">
                    <span>Channels & Objective</span>
                    <div>{channels.join(", ")} → <strong>{goal}</strong></div>
                  </div>
                  <div className="review-row">
                    <span>Sender Name</span>
                    <div>{senderName}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FOOTER ACTIONS */}
          <div className="wizard-actions">
            <Button
              variant="secondary"
              onClick={() => {
                if (showReview) {
                  setShowReview(false);
                  setStep(3);
                } else if (step === 0) {
                  setPage("campaigns");
                } else {
                  setStep(step - 1);
                }
              }}
            >
              {step === 0 && !showReview ? "Cancel" : "← Back"}
            </Button>

            <span />

            {!showReview ? (
              <Button onClick={handleNext}>
                {step === 3 ? "Review Campaign" : "Next →"}
              </Button>
            ) : (
              <Button onClick={handleFinalSave}>
                <Icon name="check" size={16} /> Create Campaign
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}


function Accounts({ setPage, activeCampaign = "North America Oncology ADC Growth Campaign 2026" }: { setPage: (p: Page) => void; activeCampaign?: string }) {
  const [tab, setTab] = useState<"find" | "researched" | "favourites">("researched");
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");
  const [stageFilter, setStageFilter] = useState("All Stages");
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const accountsList = [
    {
      name: "Sutro Biopharma",
      category: "Biotechnology / Oncology Drug Development",
      domain: "sutrobio.com",
      campaign: "North America Oncology ADC Growth Campaign 2026",
      score: 78,
      priority: "HIGH PRIORITY",
      stage: "New (Discovered)",
      researched: "Oct 6, 2026",
      location: "South San Francisco, CA",
      badgeTone: "success"
    },
    {
      name: "Adcendo ApS",
      category: "Biotechnology / TF ADC Oncology",
      domain: "adcendo.com",
      campaign: "North America Oncology ADC Growth Campaign 2026",
      score: 84,
      priority: "HIGH PRIORITY",
      stage: "In Progress",
      researched: "Oct 5, 2026",
      location: "Copenhagen / Boston",
      badgeTone: "success"
    },
    {
      name: "Mersana Therapeutics",
      category: "Biopharmaceuticals / ADC Platform",
      domain: "mersana.com",
      campaign: "North America Oncology ADC Growth Campaign 2026",
      score: 71,
      priority: "MEDIUM PRIORITY",
      stage: "New (Discovered)",
      researched: "Oct 4, 2026",
      location: "Cambridge, MA",
      badgeTone: "warning"
    },
    {
      name: "ImmunoGen (AbbVie)",
      category: "Commercial Oncology / Solid Tumors",
      domain: "immunogen.com",
      campaign: "North America Oncology ADC Growth Campaign 2026",
      score: 64,
      priority: "MEDIUM PRIORITY",
      stage: "Contacted",
      researched: "Oct 2, 2026",
      location: "Waltham, MA",
      badgeTone: "warning"
    },
    {
      name: "Tubulis GmbH",
      category: "Preclinical ADC Platform & Linkers",
      domain: "tubulis.com",
      campaign: "North America Oncology ADC Growth Campaign 2026",
      score: 52,
      priority: "LOW PRIORITY",
      stage: "New (Discovered)",
      researched: "Sep 28, 2026",
      location: "Munich, Germany",
      badgeTone: "neutral"
    }
  ];

  const filteredAccounts = accountsList.filter((acc) => {
    const matchesSearch = search === "" || 
      acc.name.toLowerCase().includes(search.toLowerCase()) || 
      acc.domain.toLowerCase().includes(search.toLowerCase()) ||
      acc.category.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter === "All Priorities" || acc.priority.toLowerCase().includes(priorityFilter.toLowerCase());
    const matchesStage = stageFilter === "All Stages" || acc.stage.toLowerCase().includes(stageFilter.toLowerCase());
    return matchesSearch && matchesPriority && matchesStage;
  });

  const toggleSelect = (name: string) => {
    if (selectedRows.includes(name)) {
      setSelectedRows(selectedRows.filter(x => x !== name));
    } else {
      setSelectedRows([...selectedRows, name]);
    }
  };

  return (
    <div className="lens-page-body" style={{ padding: "20px 28px", maxWidth: "1600px", margin: "0 auto" }}>
      {/* TOP HEADER */}
      <div className="lens-page-header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "16px" }}>
        <div>
          <h1 className="lens-page-title" style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: "0 0 3px", letterSpacing: "-0.02em" }}>
            Accounts
          </h1>
          <p className="lens-page-subtitle" style={{ fontSize: "12.5px", color: "#64748b", margin: 0 }}>
            Discover, research, and manage high-priority accounts across your active campaigns and sales pipeline.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Button 
            variant="secondary" 
            style={{ borderRadius: "8px", fontWeight: "600", fontSize: "12.5px", height: "36px", padding: "0 14px" }}
            onClick={() => alert("Import Companies file (CSV/XLSX)")}
          >
            <Icon name="upload" size={14} /> Import Companies
          </Button>
          <Button 
            variant="primary" 
            style={{ background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)", color: "white", borderRadius: "8px", fontWeight: "600", fontSize: "12.5px", height: "36px", padding: "0 16px", boxShadow: "0 3px 10px rgba(79, 70, 229, 0.3)" }}
            onClick={() => setPage("run-research")}
          >
            <Icon name="search" size={14} /> Quick Research
          </Button>
        </div>
      </div>

      {/* TABS: Find / Researched (5) / Favourites (0) */}
      <div className="lens-tab-bar" style={{ display: "flex", gap: "24px", borderBottom: "1px solid #e2e8f0", marginBottom: "16px" }}>
        <button 
          className={`lens-tab-btn ${tab === "find" ? "active" : ""}`}
          onClick={() => setTab("find")}
          style={{ padding: "10px 4px 12px", background: "none", border: "none", borderBottom: tab === "find" ? "2px solid #4f46e5" : "2px solid transparent", color: tab === "find" ? "#4f46e5" : "#64748b", fontWeight: tab === "find" ? "700" : "500", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13.5px" }}
        >
          <span style={{ fontSize: "14px" }}>🎯</span> Discover New
        </button>
        <button 
          className={`lens-tab-btn ${tab === "researched" ? "active" : ""}`}
          onClick={() => setTab("researched")}
          style={{ padding: "10px 4px 12px", background: "none", border: "none", borderBottom: tab === "researched" ? "2px solid #4f46e5" : "2px solid transparent", color: tab === "researched" ? "#4f46e5" : "#64748b", fontWeight: tab === "researched" ? "700" : "500", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13.5px" }}
        >
          <span style={{ fontSize: "14px" }}>📊</span> Researched Accounts <span style={{ background: "#eef2ff", color: "#4f46e5", padding: "1px 7px", borderRadius: "10px", fontSize: "11.5px", fontWeight: "750" }}>{accountsList.length}</span>
        </button>
        <button 
          className={`lens-tab-btn ${tab === "favourites" ? "active" : ""}`}
          onClick={() => setTab("favourites")}
          style={{ padding: "10px 4px 12px", background: "none", border: "none", borderBottom: tab === "favourites" ? "2px solid #4f46e5" : "2px solid transparent", color: tab === "favourites" ? "#4f46e5" : "#64748b", fontWeight: tab === "favourites" ? "700" : "500", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13.5px" }}
        >
          <span>★</span> Favourites <span style={{ color: "#94a3b8", fontSize: "11.5px" }}>0</span>
        </button>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="lens-filter-row" style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
          <Icon name="search" size={14} style={{ position: "absolute", left: "12px", top: "12px", color: "#94a3b8" }} />
          <input 
            type="text" 
            placeholder="Search by company name, domain, or modality..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", height: "38px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "0 12px 0 34px", fontSize: "12.5px", outline: "none", color: "#0f172a" }}
          />
        </div>

        <div style={{ minWidth: "200px" }}>
          <select 
            value={activeCampaign} 
            disabled 
            style={{ width: "100%", height: "38px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "0 10px", fontSize: "12px", color: "#475569" }}
          >
            <option>{activeCampaign.slice(0, 28)}...</option>
          </select>
        </div>

        <div style={{ minWidth: "140px" }}>
          <select 
            value={priorityFilter} 
            onChange={(e) => setPriorityFilter(e.target.value)}
            style={{ width: "100%", height: "38px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "0 10px", fontSize: "12px", color: "#0f172a", cursor: "pointer" }}
          >
            <option>All Priorities</option>
            <option>High Priority</option>
            <option>Medium Priority</option>
            <option>Low Priority</option>
          </select>
        </div>

        <div style={{ minWidth: "130px" }}>
          <select 
            value={stageFilter} 
            onChange={(e) => setStageFilter(e.target.value)}
            style={{ width: "100%", height: "38px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "0 10px", fontSize: "12px", color: "#0f172a", cursor: "pointer" }}
          >
            <option>All Stages</option>
            <option>New</option>
            <option>In Progress</option>
            <option>Contacted</option>
          </select>
        </div>

        <button 
          className="lens-reset-btn"
          onClick={() => {
            setSearch("");
            setPriorityFilter("All Priorities");
            setStageFilter("All Stages");
          }}
          style={{ height: "38px", padding: "0 14px", border: "1px solid #e2e8f0", background: "#ffffff", borderRadius: "8px", fontSize: "12px", fontWeight: "600", color: "#64748b", cursor: "pointer" }}
        >
          Reset
        </button>
      </div>

      {/* ACCOUNTS TABLE CARD */}
      <Card className="lens-table-card" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", overflow: "hidden", boxShadow: "0 2px 10px rgba(15, 23, 42, 0.03)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: "1px solid #f1f5f9", background: "#ffffff" }}>
          <span style={{ fontSize: "12.5px", color: "#334155" }}>
            Showing <strong>1–{filteredAccounts.length}</strong> of <strong>{filteredAccounts.length}</strong> accounts
          </span>
          <span style={{ color: "#4f46e5", fontSize: "12px", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <Icon name="spark" size={13} /> Click any row to open Sales Decision Report
          </span>
        </div>

        <div className="table-scroll" style={{ overflowX: "auto" }}>
          <table className="lens-table" style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <th style={{ width: "40px", padding: "12px 16px" }}>
                  <input 
                    type="checkbox" 
                    checked={selectedAll} 
                    onChange={(e) => {
                      setSelectedAll(e.target.checked);
                      setSelectedRows(e.target.checked ? filteredAccounts.map(a => a.name) : []);
                    }} 
                  />
                </th>
                <th style={{ padding: "12px 16px", fontSize: "11px", fontWeight: "800", color: "#64748b", letterSpacing: "0.06em" }}>COMPANY</th>
                <th style={{ padding: "12px 16px", fontSize: "11px", fontWeight: "800", color: "#64748b", letterSpacing: "0.06em" }}>DOMAIN</th>
                <th style={{ padding: "12px 16px", fontSize: "11px", fontWeight: "800", color: "#64748b", letterSpacing: "0.06em" }}>CAMPAIGN</th>
                <th style={{ padding: "12px 16px", fontSize: "11px", fontWeight: "800", color: "#64748b", letterSpacing: "0.06em" }}>OPPORTUNITY SCORE</th>
                <th style={{ padding: "12px 16px", fontSize: "11px", fontWeight: "800", color: "#64748b", letterSpacing: "0.06em" }}>SALES PRIORITY</th>
                <th style={{ padding: "12px 16px", fontSize: "11px", fontWeight: "800", color: "#64748b", letterSpacing: "0.06em" }}>STAGE</th>
                <th style={{ padding: "12px 16px", fontSize: "11px", fontWeight: "800", color: "#64748b", letterSpacing: "0.06em" }}>RESEARCHED</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontSize: "11px", fontWeight: "800", color: "#64748b", letterSpacing: "0.06em" }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((row) => (
                <tr 
                  key={row.name} 
                  style={{ cursor: "pointer", borderBottom: "1px solid #f1f5f9", transition: "background 0.15s" }} 
                  onClick={() => setPage("report")}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#fbfbfe")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "14px 16px" }} onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={selectedRows.includes(row.name)} 
                      onChange={() => toggleSelect(row.name)} 
                    />
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)", color: "white", fontSize: "13px", fontWeight: "800", display: "grid", placeItems: "center", flexShrink: 0 }}>
                        {row.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: "750", color: "#0f172a", fontSize: "13.5px" }}>{row.name}</div>
                        <div style={{ color: "#64748b", fontSize: "11.5px", marginTop: "1px" }}>{row.category} · <span style={{ color: "#94a3b8" }}>{row.location}</span></div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <a 
                      href={`https://${row.domain}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      style={{ color: "#4f46e5", fontSize: "12.5px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px", fontWeight: "600" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {row.domain} <span style={{ fontSize: "10px", color: "#818cf8" }}>↗</span>
                    </a>
                  </td>
                  <td style={{ padding: "14px 16px", color: "#475569", fontSize: "12px", maxWidth: "220px" }}>
                    {row.campaign.slice(0, 32)}...
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontWeight: "850", color: "#4f46e5", fontSize: "14px" }}>{row.score}</span>
                      <small style={{ color: "#64748b", fontSize: "11px" }}>/ 100</small>
                      <div style={{ width: "40px", height: "5px", background: "#e2e8f0", borderRadius: "3px", overflow: "hidden" }}>
                        <div style={{ width: `${row.score}%`, height: "100%", background: row.score >= 75 ? "#4f46e5" : row.score >= 60 ? "#6366f1" : "#94a3b8" }} />
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span 
                      style={{ 
                        fontSize: "10.5px", 
                        fontWeight: "800", 
                        padding: "3px 8px", 
                        borderRadius: "6px",
                        background: row.priority.includes("HIGH") ? "#ecfdf5" : row.priority.includes("MEDIUM") ? "#fffbeb" : "#f1f5f9",
                        color: row.priority.includes("HIGH") ? "#047857" : row.priority.includes("MEDIUM") ? "#b45309" : "#475569",
                        border: row.priority.includes("HIGH") ? "1px solid #a7f3d0" : row.priority.includes("MEDIUM") ? "1px solid #fde68a" : "1px solid #cbd5e1"
                      }}
                    >
                      {row.priority}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", color: "#334155", fontSize: "12px", fontWeight: "500" }}>{row.stage}</td>
                  <td style={{ padding: "14px 16px", color: "#64748b", fontSize: "12px" }}>{row.researched}</td>
                  <td style={{ padding: "14px 16px", textAlign: "right" }}>
                    <Button 
                      variant="primary" 
                      style={{ height: "30px", fontSize: "12px", padding: "0 14px", borderRadius: "6px", background: "#4f46e5", fontWeight: "600" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPage("report");
                      }}
                    >
                      View Report →
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BOTTOM ATTACHED PAGINATION BAR */}
        <div className="lens-pagination-bar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderTop: "1px solid #f1f5f9", background: "#ffffff", fontSize: "12px", color: "#64748b" }}>
          <div>
            Showing <strong>1–{filteredAccounts.length}</strong> of <strong>{filteredAccounts.length}</strong> accounts
          </div>
          <div className="lens-pagination-controls" style={{ display: "flex", gap: "6px" }}>
            <button className="lens-pagination-btn" disabled style={{ padding: "4px 10px", border: "1px solid #e2e8f0", background: "#ffffff", borderRadius: "6px", cursor: "not-allowed", opacity: 0.5 }}>
              Previous
            </button>
            <button className="lens-pagination-btn active" style={{ padding: "4px 10px", border: "1px solid #4f46e5", background: "#4f46e5", color: "white", borderRadius: "6px", fontWeight: "700" }}>
              1
            </button>
            <button className="lens-pagination-btn" disabled style={{ padding: "4px 10px", border: "1px solid #e2e8f0", background: "#ffffff", borderRadius: "6px", cursor: "not-allowed", opacity: 0.5 }}>
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}


function RunResearch({ setPage }: { setPage: (p: Page) => void }) {
  const [quantity, setQuantity] = useState("50");
  return <div className="page"><div className="back-link" onClick={() => setPage("accounts")}><Icon name="arrow" /> Back to Account Intelligence</div><PageHeader title="Run New Account Intelligence" subtitle="Configure an Intelligence Engine run using an existing Research Campaign." /><div className="run-layout"><Card className="run-card"><div className="step-label"><span>1</span><div><strong>Select Research Campaign</strong><p>Research context and parameters are inherited from the campaign.</p></div></div><SelectField label="Research campaign"><option>US Oncology Hospital Expansion</option><option>HER2 Market Opportunity</option></SelectField><div className="inherited-box"><div className="inherited-head"><span><Icon name="check" /> Research context inherited from campaign</span><Badge tone="blue">Read only</Badge></div><div className="inherited-grid"><div><span>Research Purpose</span><strong>Identify high-potential US oncology accounts for Product X.</strong></div><div><span>Product</span><strong>OncoNova X</strong></div><div><span>Therapeutic Area</span><strong>Oncology</strong></div><div><span>Target Account Type</span><strong>Hospital / Health System</strong></div><div><span>Geography</span><strong>United States · 4 priority states</strong></div><div><span>Research Parameters</span><strong>1,000+ employees · Oncology facilities</strong></div></div></div><div className="step-divider" /><div className="step-label"><span>2</span><div><strong>Target Account Quantity</strong><p>Choose how many relevant accounts the Intelligence Engine should identify and evaluate.</p></div></div><div className="quantity-row"><Field label="How many accounts do you want to research?" type="number" value={quantity} onChange={setQuantity} hint="Recommended range: 25–100 accounts per run" /><div className="quick-qty">{["25", "50", "100"].map((x) => <button className={quantity === x ? "active" : ""} onClick={() => setQuantity(x)} key={x}>{x}</button>)}</div></div><div className="form-grid"><SelectField label="Minimum confidence"><option>70% — Recommended</option><option>80% — High confidence</option></SelectField><label className="toggle-row"><span><strong>Prioritize recent signals</strong><small>Weight intelligence signals from the last 12 months.</small></span><input type="checkbox" defaultChecked /><i /></label></div><div className="run-callout"><Icon name="spark" /><p><strong>What happens next?</strong>The Intelligence Engine will discover accounts, validate relevance, collect evidence, evaluate product fit, identify stakeholders and generate individual intelligence reports.</p></div><div className="wizard-actions"><Button variant="secondary" onClick={() => setPage("accounts")}>Cancel</Button><span /><Button icon="spark" onClick={() => setPage("running")}>Run Intelligence Engine</Button></div></Card><aside className="run-aside"><div><Icon name="shield" /><strong>Evidence-first research</strong><p>Every material insight is linked to a source and confidence assessment.</p></div><div><Icon name="clock" /><strong>Estimated duration</strong><p>Approximately 8–12 minutes for 50 accounts. You can run this in the background.</p></div><div><Icon name="help" /><strong>Unknown remains unknown</strong><p>Missing information is clearly identified as a research gap, never fabricated.</p></div></aside></div></div>;
}

function Running({ setPage }: { setPage: (p: Page) => void }) {
  const [progress, setProgress] = useState(25);
  const stages = [
    "Loading Research Context",
    "Understanding Target Criteria",
    "Discovering Candidate Accounts",
    "Validating Account Relevance",
    "Collecting Account Intelligence",
    "Detecting Commercial Signals",
    "Evaluating Product Fit",
    "Identifying Buying Stakeholders",
    "Calculating Opportunity Score",
    "Generating Intelligence Reports"
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setTimeout(() => setPage("results"), 600);
          return 100;
        }
        return Math.min(100, p + 15);
      });
    }, 250);
    return () => clearInterval(id);
  }, [setPage]);

  const analyzed = Math.min(50, Math.round((progress / 100) * 50));
  const currentStageIndex = Math.min(stages.length - 1, Math.floor((progress / 100) * stages.length));

  return <div className="engine-page"><div className="engine-top"><Logo /><Badge tone={progress === 100 ? "success" : "blue"}><span className={progress === 100 ? "" : "mini-spinner"} /> {progress === 100 ? "Research complete!" : "Research in progress"}</Badge></div><div className="engine-content"><div className="engine-hero"><div className="engine-mark"><Icon name="spark" size={28} /></div><span>ACCOUNT INTELLIGENCE ENGINE</span><h1>{progress === 100 ? "Research completed successfully" : "Researching high-potential accounts"}</h1><p>US Oncology Hospital Expansion</p></div><Card className="progress-card"><div className="progress-summary"><div><strong>{analyzed} <span>/ 50</span></strong><small>accounts analyzed</small></div><div><strong>{progress}%</strong><small>overall progress</small></div></div><div className="progress-track"><i style={{ width: `${progress}%` }} /></div><div className="progress-columns"><div className="stage-list"><h3>Research stages</h3>{stages.map((s, i) => <div key={s} className={i < currentStageIndex ? "done" : i === currentStageIndex ? "current" : ""}><span>{i < currentStageIndex ? <Icon name="check" size={13} /> : i === currentStageIndex ? <span className="stage-pulse" /> : null}</span><p>{s}{i === currentStageIndex && <small>Analyzing account {analyzed} of 50</small>}</p></div>)}</div><div className="activity-feed"><h3>Live research activity <span>Live</span></h3>{[
    ["Evidence validation completed", "Cleveland Clinic", "Just now"],
    ["Decision maker identified", "Mass General Brigham", "Just now"],
    ["Product fit analysis completed", "Mayo Clinic", "Just now"],
    ["Clinical signal detected", "City of Hope", "Just now"],
    ["Account discovered", "Northwell Health", "Just now"],
  ].map((a, i) => <div key={a[0]}><span className={`feed-icon f${i}`}><Icon name={i === 0 ? "shield" : i === 1 ? "users" : i === 2 ? "spark" : "activity"} size={14} /></span><p><strong>{a[0]}</strong><span>{a[1]}</span></p><small>{a[2]}</small></div>)}</div></div><div className="engine-actions"><span><Icon name="shield" size={15} /> Sources are being verified as research progresses</span><div><Button variant="secondary" onClick={() => setPage("accounts")}>Run in background</Button><Button onClick={() => setPage("results")}>View Results →</Button></div></div></Card><p className="engine-note">You can safely leave this page. We’ll notify you when the research is complete.</p></div></div>;
}

function Results({ setPage }: { setPage: (p: Page) => void }) {
  const [drawer, setDrawer] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  const handleExportCSV = () => {
    const headers = ["Account Name", "Account Type", "Location", "Product Fit", "Demand", "Buying Intent", "Commercial", "Opportunity Score", "Confidence", "Priority"];
    const rows = accountRows.map(a => [
      `"${a.name}"`,
      `"${a.type}"`,
      `"${a.location}"`,
      `${a.fit}/10`,
      `${a.demand}/10`,
      `${a.intent}/10`,
      `${a.commercial}/10`,
      `${a.score}/100`,
      `${a.confidence}%`,
      `"${a.priority}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "OutreachLens_Account_Intelligence_Results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return <div className="page results-page"><div className="breadcrumbs"><button onClick={() => setPage("accounts")}>Account Intelligence</button><Icon name="arrow" size={13} /><span>Oncology Account Discovery</span></div><PageHeader title="Account Intelligence Results" subtitle="US Oncology Hospital Expansion · Completed Oct 04, 2026"><Button variant="secondary" icon="download" onClick={handleExportCSV}>Export CSV</Button><Button variant="secondary" icon="share">Share</Button></PageHeader><div className="result-trust"><Badge tone="success"><Icon name="check" size={13} /> Research completed</Badge><span><Icon name="shield" size={15} /> 91% average intelligence confidence</span><span>Last researched: Oct 04, 2026 at 2:36 PM</span></div><div className="metrics-grid results-metrics"><MetricCard icon="accounts" value="50" label="Accounts Found" trend="of 50 requested" /><MetricCard icon="spark" value="18" label="High Priority" trend="36% of results" tone="emerald" /><MetricCard icon="activity" value="21" label="Medium Priority" trend="42% of results" tone="orange" /><MetricCard icon="archive" value="11" label="Low Priority" trend="22% of results" /><MetricCard icon="shield" value="91%" label="Research Completeness" trend="High coverage" tone="blue" /></div><FilterBar placeholder="Search accounts..." />{selected.length > 0 && <div className="selection-bar"><strong>{selected.length} accounts selected</strong><Button variant="secondary">Compare selected</Button><Button variant="ghost" onClick={() => setSelected([])}>Clear</Button></div>}<Card className="table-card results-table"><div className="table-toolbar"><span>50 accounts</span><div><Button variant="secondary" icon="filter">Advanced filters</Button><Button variant="secondary" icon="settings">Columns</Button></div></div><div className="table-scroll"><table><thead><tr><th><input type="checkbox" /></th><th>Account</th><th>Account type</th><th>Location</th><th>Product fit</th><th>Demand</th><th>Buying intent</th><th>Commercial</th><th>Opportunity score</th><th>Confidence</th><th>Priority</th><th>Action</th></tr></thead><tbody>{accountRows.map((a, i) => <tr key={a.name}><td><input type="checkbox" checked={selected.includes(i)} onChange={() => setSelected((x) => x.includes(i) ? x.filter((n) => n !== i) : [...x, i])} /></td><td><button className="account-cell" onClick={() => setDrawer(true)}><span>{a.name.split(" ").map((x) => x[0]).join("").slice(0, 2)}</span><div><strong>{a.name}</strong><small>ol-{12084 + i}</small></div></button></td><td>{a.type}</td><td>{a.location}</td><td><Score value={a.fit} /></td><td><Score value={a.demand} /></td><td><Score value={a.intent} /></td><td><Score value={a.commercial} /></td><td><div className="opportunity-score"><strong>{a.score}</strong><span>/100</span><i><b style={{ width: `${a.score}%` }} /></i></div></td><td><span className="confidence"><Icon name="shield" size={13} /> {a.confidence}%</span></td><td><Badge tone={a.priority === "High" ? "success" : a.priority === "Medium" ? "warning" : "danger"}>{a.priority === "High" ? "↑" : a.priority === "Medium" ? "—" : "↓"} {a.priority}</Badge></td><td><Button variant="secondary" onClick={() => setPage("report")}>View Report</Button></td></tr>)}</tbody></table></div><div className="table-footer"><span>Showing 1–5 of 50 accounts</span><div><Button variant="secondary">Previous</Button><Button variant="secondary">1</Button><Button variant="secondary">2</Button><Button variant="secondary">Next</Button></div></div></Card>{drawer && <><div className="drawer-overlay" onClick={() => setDrawer(false)} /><aside className="quick-drawer"><div className="drawer-head"><div><span>ACCOUNT QUICK VIEW</span><h2>Cleveland Clinic</h2><p>Health System · Cleveland, OH</p></div><Button variant="icon" icon="close" onClick={() => setDrawer(false)} /></div><div className="drawer-score"><div><span>Priority</span><Badge tone="success">↑ High Priority</Badge></div><div><span>Opportunity Score</span><strong>88 <small>/100</small></strong></div><div><span>Confidence</span><strong>91%</strong></div></div><DrawerSection title="Why this account?">{["Strong alignment with the target oncology portfolio.", "Significant relevant clinical footprint across 12 centers.", "Recent evidence of active specialty expansion."].map((x, i) => <p className="insight-bullet" key={x}><span>{i + 1}</span>{x} <Evidence id={`E0${i + 1}`} /></p>)}</DrawerSection><DrawerSection title="Why now?">{["Oncology treatment center expansion announced", "New clinical leadership appointment", "Active specialist recruitment"].map((x) => <div className="mini-signal" key={x}><i /><span><strong>{x}</strong><small>Within the last 90 days</small></span></div>)}</DrawerSection><DrawerSection title="Key stakeholders">{["Dr. Elena Warren — Oncology Chair", "Michael Chen — VP, Pharmacy Services", "Sarah Kendall — Director, Strategic Sourcing"].map((x) => <p className="person-row" key={x}><span>{x.split(" ").slice(0, 2).map((n) => n[0]).join("")}</span>{x}</p>)}</DrawerSection><DrawerSection title="Top risks"><p className="risk-row"><Badge tone="warning">Medium</Badge> Existing competitor presence requires validation.</p><p className="risk-row"><Badge tone="neutral">Unknown</Badge> Procurement renewal date not found.</p></DrawerSection><Button className="full-width" onClick={() => setPage("report")}>Open Full Intelligence Report <Icon name="arrow" /></Button></aside></>}</div>;
}

function Score({ value }: { value: number }) { return <span className={`score score-${value >= 8 ? "high" : value >= 6 ? "medium" : "low"}`}><i>{value}</i>/10</span>; }
function Evidence({ id, onClick }: { id: string; onClick?: (id: string) => void }) { 
  return <button className="evidence-marker" onClick={(e) => { e.stopPropagation(); onClick?.(id); }} title={`Open source evidence [${id}]`}>[{id}]</button>; 
}
function DrawerSection({ title, children }: { title: string; children: ReactNode }) { return <section className="drawer-section"><h3>{title}</h3>{children}</section>; }

const reportNav = [
  "01. Executive Sales Brief",
  "02. Account Profile",
  "03. Customer / ICP Fit",
  "04. Pipeline & Service Fit",
  "05. Clinical Intelligence",
  "06. Funding & Runway",
  "07. Demand & Buying Intent",
  "08. Market & Competition",
  "09. Regulatory & Supply",
  "10. Procurement Intelligence",
  "11. Buying Committee",
  "12. Commercial Opportunity",
  "13. White Space",
  "14. Risks & Deal Blockers",
  "15. Account Timeline",
  "16. Sales Strategy",
  "17. Next Best Action",
  "18. Outreach Messages",
  "19. Research Gaps",
  "20. Evidence & Source Ledger",
  "21. Methodology / Trust"
];

function ReportSection({ n, title, subtitle, children }: { n: number; title: string; subtitle?: string; children: ReactNode }) {
  return <section className="report-section" id={`section-${n}`}><div className="report-section-head"><span>{String(n).padStart(2, "0")}</span><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><Button variant="icon" icon="chevron" /></div><div className="report-section-body">{children}</div></section>;
}

/* PDF Preview Modal */
function PdfPreviewModal({ onClose, onDownload }: { onClose: () => void; onDownload: () => void }) {
  const d = sutroAccountData;
  return (
    <div className="pdf-modal-backdrop" onClick={onClose}>
      <div className="pdf-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pdf-modal-header">
          <div className="pdf-modal-title">
            <Icon name="briefcase" size={18} />
            <strong>OutreachLens_Sutro_Biopharma_Opportunity_Intelligence_Report.pdf</strong>
            <span>Sales Decision Mode · 19 Sections</span>
          </div>
          <div className="pdf-modal-actions">
            <Button variant="secondary" icon="download" onClick={onDownload}>Download PDF / Print</Button>
            <Button variant="icon" icon="close" onClick={onClose} />
          </div>
        </div>
        <div className="pdf-modal-body">
          {/* Sheet 1: Executive Brief & Profile */}
          <div className="pdf-page-sheet">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #312e81", paddingBottom: "16px", marginBottom: "20px" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: "800", color: "#4f46e5", textTransform: "uppercase", letterSpacing: "0.1em" }}>OUTREACHLENS SALES DECISION & OPPORTUNITY REPORT</span>
                <h1 style={{ margin: "4px 0 2px", fontSize: "24px" }}>{d.account} ({d.ticker})</h1>
                <p style={{ margin: 0, color: "#64748b", fontSize: "12px" }}>{d.location} · Researched: {d.date}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ background: "#ecfdf5", color: "#065f46", padding: "4px 10px", borderRadius: "20px", fontWeight: "700", fontSize: "12px", border: "1px solid #a7f3d0" }}>DECISION: {d.decision}</span>
                <div style={{ marginTop: "6px", fontSize: "11px", color: "#64748b" }}>Opportunity Score: <strong style={{ color: "#4f46e5", fontSize: "13px" }}>{d.opportunityScore}/100</strong> (Demand: High · Buying Intent: Unverified)</div>
              </div>
            </div>

            <h2 style={{ fontSize: "15px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px", marginTop: "16px" }}>01. Company Snapshot</h2>
            <p style={{ fontSize: "12px", color: "#334155", lineHeight: 1.6 }}>{d.companyOverview.summary}</p>
            <table className="pdf-doc-table">
              <thead><tr><th>Field</th><th>Verified Account Reality</th></tr></thead>
              <tbody>
                <tr><td>Industry / Sector</td><td>{d.companyOverview.snapshot.industry}</td></tr>
                <tr><td>Development Stage</td><td>{d.companyOverview.snapshot.companyStage}</td></tr>
                <tr><td>Location & HQ</td><td>{d.companyOverview.snapshot.headquarters} [E06]</td></tr>
                <tr><td>Employees & Model</td><td>{d.companyOverview.snapshot.employees} · 100% Externalized Manufacturing [E07][E08]</td></tr>
                <tr><td>Financial Period Revenue</td><td>{d.companyOverview.snapshot.revenue} ({d.companyOverview.snapshot.revenuePeriod}) [E15]</td></tr>
                <tr><td>Cash & Liquidity Runway</td><td>{d.financialData.cashPosition} ({d.financialData.cashPeriod}) — Runway into at least Q2 2028 [E01]</td></tr>
              </tbody>
            </table>

            <h2 style={{ fontSize: "15px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px", marginTop: "20px" }}>02. Executive Sales Brief</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", margin: "10px 0" }}>
              <div style={{ background: "#f8fafc", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                <strong style={{ fontSize: "11px", color: "#1e1b4b" }}>WHY THIS ACCOUNT?</strong>
                <p style={{ fontSize: "11px", margin: "4px 0 0", color: "#475569" }}>{d.executiveBrief.whyThisAccount}</p>
              </div>
              <div style={{ background: "#f8fafc", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                <strong style={{ fontSize: "11px", color: "#1e1b4b" }}>WHY CONTACT NOW?</strong>
                <p style={{ fontSize: "11px", margin: "4px 0 0", color: "#475569" }}>{d.executiveBrief.whyContactNow}</p>
              </div>
              <div style={{ background: "#f8fafc", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                <strong style={{ fontSize: "11px", color: "#1e1b4b" }}>WHO TO CONTACT?</strong>
                <p style={{ fontSize: "11px", margin: "4px 0 0", color: "#475569" }}>{d.executiveBrief.whoToContact}</p>
              </div>
            </div>
            <div style={{ background: "#eef2ff", border: "1px solid #c7d2fe", padding: "8px 12px", borderRadius: "6px", fontSize: "11.5px", color: "#312e81" }}>
              <strong>Sales Takeaway: </strong>{d.executiveBrief.salesTakeaway}
            </div>
          </div>

          {/* Sheet 2: Pipeline, Competitive & Commercial Opportunity */}
          <div className="pdf-page-sheet">
            <h2 style={{ fontSize: "15px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px" }}>04. Clinical & Pipeline Intelligence</h2>
            <table className="pdf-doc-table">
              <thead><tr><th>Program</th><th>Target & Modality</th><th>Stage</th><th>Current Status / Next Milestone</th><th>Sales Relevance</th></tr></thead>
              <tbody>
                {d.pipelinePrograms.map((p, idx) => (
                  <tr key={idx}>
                    <td><strong>{p.name}</strong></td>
                    <td>{p.target} · {p.modality}</td>
                    <td>{p.stage}</td>
                    <td>{p.status} → {p.nextMilestone}</td>
                    <td><span className="badge badge-success">{p.salesRelevance}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 style={{ fontSize: "15px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px", marginTop: "20px" }}>09. Competitive Landscape Deep-Dive</h2>
            <table className="pdf-doc-table">
              <thead><tr><th>Competitor Asset</th><th>Technical Focus</th><th>Relevance & Impact on Sutro</th><th>Sales Urgency</th></tr></thead>
              <tbody>
                {d.topCompetitors.map((c, idx) => (
                  <tr key={idx}>
                    <td><strong>{c.name}</strong></td>
                    <td>{c.technicalFocus}</td>
                    <td>{c.effectOnAccount}</td>
                    <td>{c.salesRelevance}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 style={{ fontSize: "15px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px", marginTop: "20px" }}>11. Commercial Opportunities (Hypotheses)</h2>
            <table className="pdf-doc-table">
              <thead><tr><th>Potential Opportunity</th><th>Driver / Signal</th><th>Confidence</th><th>Status</th><th>Validation Needed</th></tr></thead>
              <tbody>
                {d.commercialOpportunities.map((op, idx) => (
                  <tr key={idx}>
                    <td><strong>{op.title}</strong></td>
                    <td>{op.whyWeSeeIt}</td>
                    <td>{op.confidence}</td>
                    <td><span className="badge badge-warning">{op.status}</span></td>
                    <td>{op.validationRequired}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sheet 3: Contacts, Next Best Action & Evidence */}
          <div className="pdf-page-sheet">
            <h2 style={{ fontSize: "15px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px" }}>10. Key Contacts & Buying Committee</h2>
            <table className="pdf-doc-table">
              <thead><tr><th>Contact & Title</th><th>Buying Role</th><th>Why Relevant</th><th>Verified Email</th></tr></thead>
              <tbody>
                {d.contacts.map((ct, idx) => (
                  <tr key={idx}>
                    <td><strong>{ct.name}</strong><br /><small style={{ color: "#64748b" }}>{ct.title}</small></td>
                    <td>{ct.buyingRole}</td>
                    <td>{ct.whyRelevant}</td>
                    <td><code>{ct.email}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 style={{ fontSize: "15px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px", marginTop: "20px" }}>15. Next Best Action Playbook</h2>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px", fontSize: "11.5px" }}>
              <p style={{ margin: "0 0 6px" }}><strong>PRIMARY ACTION: </strong>{d.nextBestAction.primaryAction}</p>
              <p style={{ margin: "0 0 6px" }}><strong>WHO & WHY NOW: </strong>{d.nextBestAction.who} — {d.nextBestAction.whyNow}</p>
              <p style={{ margin: "0 0 6px" }}><strong>DISCOVERY ANGLE: </strong>{d.nextBestAction.conversationAngle}</p>
              <p style={{ margin: 0 }}><strong>DESIRED OUTCOME: </strong>{d.nextBestAction.desiredOutcome}</p>
            </div>

            <h2 style={{ fontSize: "15px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px", marginTop: "20px" }}>18. Evidence Ledger (E01–E21)</h2>
            <table className="pdf-doc-table" style={{ fontSize: "10.5px" }}>
              <thead><tr><th>ID</th><th>Verified Claim</th><th>Source</th><th>Type</th><th>Confidence</th></tr></thead>
              <tbody>
                {sutroEvidenceLedger.slice(0, 7).map((ev) => (
                  <tr key={ev.id}>
                    <td><strong>[{ev.id}]</strong></td>
                    <td>{ev.claim}</td>
                    <td>{ev.source}</td>
                    <td>{ev.type}</td>
                    <td>{ev.confidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontSize: "10px", color: "#64748b", margin: "4px 0 0" }}>+ 14 more verified primary evidence records available in interactive OutreachLens platform.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Report({ setPage, activeCampaign = "North America Oncology ADC Growth Campaign 2026" }: { setPage: (p: Page) => void; activeCampaign?: string }) {
  const [activeEvidence, setActiveEvidence] = useState<EvidenceItem | null>(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "SCORE" | "INTELLIGENCE" | "CONTACTS" | "STRATEGY" | "OUTREACH" | "EVIDENCE">("OVERVIEW");
  const [expandedProgram, setExpandedProgram] = useState<string | null>("STRO-004 (Lead Asset)");
  const [toast, setToast] = useState("");
  const notify = (x: string) => { setToast(x); setTimeout(() => setToast(""), 2400); };

  const handleEvidenceClick = (id: string) => {
    const cleanId = id.replace(/[\[\]]/g, "").trim();
    const found = sutroEvidenceLedger.find(e => e.id === cleanId);
    if (found) {
      setActiveEvidence(found);
    } else {
      notify(`Evidence source ${id} opened`);
    }
  };

  const handleDownloadPDF = () => {
    const prevTitle = document.title;
    document.title = "Sutro_Biopharma_Sales_Decision_Report_OutreachLens";
    notify("Opening Save as PDF / Print preview dialog...");
    setTimeout(() => {
      window.print();
      document.title = prevTitle;
    }, 150);
  };

  const d = sutroAccountData;

  const classificationBadge = (type: string) => {
    switch (type) {
      case "VERIFIED FACT":
        return <span className="lens-class-badge fact">VERIFIED FACT</span>;
      case "DERIVED INSIGHT":
        return <span className="lens-class-badge insight">DERIVED INSIGHT</span>;
      case "SALES HYPOTHESIS":
        return <span className="lens-class-badge hypothesis">SALES HYPOTHESIS</span>;
      case "RECOMMENDATION":
        return <span className="lens-class-badge recommendation">RECOMMENDATION</span>;
      default:
        return <span className="lens-class-badge unverified">UNVERIFIED / UNKNOWN</span>;
    }
  };

  return (
    <div className="lens-page-body report-page">
      {/* 5. REDESIGNED ACCOUNT HEADER (Consistent Qualification & No Contradictory Badges) */}
      <div className="lens-account-header-hero">
        <div className="lens-header-top-row">
          <div className="lens-company-title-area">
            <div className="lens-company-logo-avatar">S</div>
            <div>
              <div className="lens-company-title-wrap">
                <h1>{d.account}</h1>
                <span className="badge badge-success"><Icon name="check" size={11} /> VERIFIED ACCOUNT</span>
                <span className="lens-badge-public">{d.ticker}</span>
              </div>
              <div className="lens-company-meta-strip">
                <span>{d.sector}</span>
                <span>•</span>
                <span>{d.location}</span>
                <span>•</span>
                <a href={`https://${d.companyOverview.snapshot.website}`} target="_blank" rel="noreferrer">
                  {d.companyOverview.snapshot.website} ↗
                </a>
              </div>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="lens-header-cta-group">
            <Button variant="secondary" icon="download" onClick={handleDownloadPDF}>
              Export PDF
            </Button>
            <Button variant="primary" icon="spark" onClick={() => setActiveTab("OUTREACH")}>
              Generate Outreach
            </Button>
          </div>
        </div>

        {/* 6 STANDARDIZED QUALIFICATION CARDS */}
        <div className="lens-qualification-cards-grid">
          <div className="lens-qual-card score-card">
            <span className="qual-label">OPPORTUNITY SCORE</span>
            <div className="qual-value">
              <strong>{d.opportunityScore}</strong>
              <small>/ 100</small>
            </div>
            <div className="qual-sub">Prioritization score, not win prob.</div>
          </div>

          <div className="lens-qual-card">
            <span className="qual-label">ICP FIT</span>
            <div className="qual-status-chip strong">
              <Icon name="check" size={12} /> {d.icpFit}
            </div>
            <div className="qual-sub">Matched to active campaign</div>
          </div>

          <div className="lens-qual-card">
            <span className="qual-label">DEMAND STRENGTH</span>
            <div className="qual-status-chip high">
              <Icon name="trend" size={12} /> {d.demandStrength}
            </div>
            <div className="qual-sub">3 parallel ADC clinical triggers</div>
          </div>

          <div className="lens-qual-card">
            <span className="qual-label">BUYING INTENT</span>
            <div className="qual-status-chip unverified">
              <Icon name="help" size={12} /> {d.buyingIntent}
            </div>
            <div className="qual-sub">No active public RFP identified</div>
          </div>

          <div className="lens-qual-card">
            <span className="qual-label">CONFIDENCE</span>
            <div className="qual-status-chip moderate">
              <Icon name="shield" size={12} /> {d.opportunityConfidence}
            </div>
            <div className="qual-sub">SEC & official trial disclosures</div>
          </div>

          <div className="lens-qual-card">
            <span className="qual-label">COMPLETENESS</span>
            <div className="qual-status-chip completeness">
              <strong>{d.researchCompleteness}%</strong>
            </div>
            <div className="qual-sub">{d.completenessCount}</div>
          </div>
        </div>

        {/* 60-SECOND EXECUTIVE DECISION SUMMARY BANNER */}
        <div className="lens-decision-banner">
          <div className="decision-flag">
            <span>DECISION STRATEGY</span>
            <strong>{d.decision}</strong>
          </div>
          <p>{d.decisionSubtitle}</p>
        </div>
      </div>

      {/* 4. PRIMARY REPORT NAVIGATION TABS */}
      <div className="lens-primary-report-tabs">
        {[
          { id: "OVERVIEW", label: "OVERVIEW", icon: "briefcase" as IconName, desc: "Company & Brief" },
          { id: "SCORE", label: "SCORE", icon: "activity" as IconName, desc: "100-Pt Breakdown" },
          { id: "INTELLIGENCE", label: "INTELLIGENCE", icon: "spark" as IconName, desc: "Clinical, CMC & Competition" },
          { id: "CONTACTS", label: "CONTACTS", icon: "users" as IconName, desc: "Buying Committee" },
          { id: "STRATEGY", label: "STRATEGY", icon: "trend" as IconName, desc: "Opportunities & Playbook" },
          { id: "OUTREACH", label: "OUTREACH", icon: "campaign" as IconName, desc: "Multi-Channel Drafts" },
          { id: "EVIDENCE", label: "EVIDENCE", icon: "shield" as IconName, desc: "Ledger & Gaps (21)" },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`lens-primary-tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            <Icon name={tab.icon} size={15} />
            <div className="tab-btn-text">
              <strong>{tab.label}</strong>
              <small>{tab.desc}</small>
            </div>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: OVERVIEW (01. Company Overview, 02. Executive Brief, 03. ICP Fit) */}
      {/* ========================================================================= */}
      {activeTab === "OVERVIEW" && (
        <div className="lens-tab-content-pane">
          {/* SECTION 01: COMPANY OVERVIEW */}
          <Card className="lens-section-card">
            <div className="lens-card-header-bar">
              <div>
                <span className="section-number-pill">01</span>
                <strong style={{ fontSize: "16px", color: "#0f172a", marginLeft: "8px" }}>Company Overview & Commercial Profile</strong>
              </div>
              <span className="lens-source-trigger" onClick={() => handleEvidenceClick("E06")}>
                Evidence · 3 sources <Icon name="shield" size={12} />
              </span>
            </div>

            {/* AI Summary */}
            <div className="lens-concise-summary-box">
              <p>{d.companyOverview.summary}</p>
            </div>

            {/* Structured Company Snapshot Grid */}
            <div className="lens-structured-field-grid">
              <div className="field-cell">
                <small>INDUSTRY</small>
                <strong>{d.companyOverview.snapshot.industry}</strong>
              </div>
              <div className="field-cell">
                <small>DEVELOPMENT STAGE</small>
                <strong>{d.companyOverview.snapshot.companyStage}</strong>
              </div>
              <div className="field-cell">
                <small>HEADQUARTERS</small>
                <strong>{d.companyOverview.snapshot.headquarters}</strong>
              </div>
              <div className="field-cell">
                <small>EMPLOYEES (VERIFIED)</small>
                <strong>{d.companyOverview.snapshot.employees}</strong>
              </div>
              <div className="field-cell">
                <small>REPORTED REVENUE & PERIOD</small>
                <strong>{d.companyOverview.snapshot.revenue} ({d.companyOverview.snapshot.revenuePeriod})</strong>
              </div>
              <div className="field-cell">
                <small>CASH POSITION & RUNWAY</small>
                <strong>{d.financialData.cashPosition} ({d.financialData.runwayHorizon})</strong>
              </div>
              <div className="field-cell">
                <small>PUBLIC / TICKER</small>
                <strong>{d.companyOverview.snapshot.publicPrivate} · {d.companyOverview.snapshot.exchangeTicker}</strong>
              </div>
              <div className="field-cell">
                <small>CORE MODALITY / TECH</small>
                <strong>{d.companyOverview.snapshot.coreTechnology}</strong>
              </div>
            </div>

            {/* Business & Commercial Profile Sub-section */}
            <div className="lens-sub-profile-card">
              <strong style={{ fontSize: "13px", color: "#1e1b4b", display: "block", marginBottom: "10px" }}>
                BUSINESS & COMMERCIAL OPERATING PROFILE
              </strong>
              <div className="profile-grid">
                <div><span>What They Do:</span> <p>{d.companyOverview.commercialProfile.whatTheyDo}</p></div>
                <div><span>Pipeline Depth:</span> <p>{d.companyOverview.commercialProfile.pipelineDepth}</p></div>
                <div><span>Externalization Model:</span> <p>{d.companyOverview.commercialProfile.externalizationModel}</p></div>
                <div><span>Current Strategic Focus:</span> <p>{d.companyOverview.commercialProfile.strategicFocus}</p></div>
              </div>
            </div>
          </Card>

          {/* SECTION 02: EXECUTIVE SALES BRIEF */}
          <Card className="lens-section-card">
            <div className="lens-card-header-bar">
              <div>
                <span className="section-number-pill">02</span>
                <strong style={{ fontSize: "16px", color: "#0f172a", marginLeft: "8px" }}>Executive Sales Brief</strong>
              </div>
              <span className="lens-source-trigger" onClick={() => handleEvidenceClick("E01")}>
                Evidence: [E01][E07][E14] <Icon name="shield" size={12} />
              </span>
            </div>

            <div className="lens-three-questions-grid">
              <div className="brief-question-col">
                <div className="question-header">
                  <span className="num-circle">1</span>
                  <strong>WHY THIS ACCOUNT?</strong>
                </div>
                <p>{d.executiveBrief.whyThisAccount}</p>
              </div>

              <div className="brief-question-col highlight">
                <div className="question-header">
                  <span className="num-circle">2</span>
                  <strong>WHY CONTACT NOW?</strong>
                </div>
                <p>{d.executiveBrief.whyContactNow}</p>
              </div>

              <div className="brief-question-col">
                <div className="question-header">
                  <span className="num-circle">3</span>
                  <strong>WHO TO CONTACT?</strong>
                </div>
                <p>{d.executiveBrief.whoToContact}</p>
              </div>
            </div>

            <div className="lens-sales-takeaway-bar">
              <Icon name="spark" size={16} />
              <div>
                <strong>SALES TAKEAWAY: </strong>
                <span>{d.executiveBrief.salesTakeaway}</span>
              </div>
            </div>
          </Card>

          {/* SECTION 03: ICP & CAMPAIGN FIT */}
          <Card className="lens-section-card">
            <div className="lens-card-header-bar">
              <div>
                <span className="section-number-pill">03</span>
                <strong style={{ fontSize: "16px", color: "#0f172a", marginLeft: "8px" }}>ICP & Campaign Fit Evaluation</strong>
              </div>
              <div className="campaign-context-badge">
                <small>Active Campaign:</small> <strong>{activeCampaign}</strong>
              </div>
            </div>

            <div className="lens-table-wrap">
              <table className="lens-clean-table">
                <thead>
                  <tr>
                    <th>Criterion</th>
                    <th>Campaign Requirement</th>
                    <th>Actual Account Reality</th>
                    <th>Classification</th>
                    <th>Fit Assessment</th>
                    <th>Evidence</th>
                  </tr>
                </thead>
                <tbody>
                  {d.icpFitMatrix.map((row, idx) => (
                    <tr key={idx}>
                      <td><strong>{row.criterion}</strong></td>
                      <td style={{ color: "#475569" }}>{row.requirement}</td>
                      <td><strong>{row.reality}</strong></td>
                      <td>{classificationBadge(row.classification)}</td>
                      <td>
                        <span className={`lens-fit-pill ${row.fit === "Strong" || row.fit === "Pass" ? "strong" : "moderate"}`}>
                          {row.fit}
                        </span>
                      </td>
                      <td>
                        <button className="lens-evidence-tag-btn" onClick={() => handleEvidenceClick(row.evidenceId)}>
                          [{row.evidenceId}]
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SCORE (Opportunity Score /100, Breakdown, Completeness) */}
      {/* ========================================================================= */}
      {activeTab === "SCORE" && (
        <div className="lens-tab-content-pane">
          <Card className="lens-section-card">
            <div className="lens-card-header-bar">
              <div>
                <span className="section-number-pill">19</span>
                <strong style={{ fontSize: "16px", color: "#0f172a", marginLeft: "8px" }}>Opportunity Score & Scoring Methodology (100 Points Model)</strong>
              </div>
              <div style={{ fontSize: "12px", color: "#64748b" }}>
                Scoring Rule: <em>Sales prioritization index, not probability of winning.</em>
              </div>
            </div>

            {/* Score Big Hero Box */}
            <div className="lens-score-hero-container">
              <div className="score-dial-box">
                <div className="score-big-number">{d.opportunityScore}</div>
                <div className="score-scale">out of 100</div>
                <span className="badge badge-success">High Priority Account</span>
              </div>
              <div className="score-dial-explainer">
                <h3>Priority Recommendation: Immediate Discovery Track</h3>
                <p>
                  Sutro scores 78/100 due to exceptional Operating Model Fit (15/15), Product Fit (13/15), and Demand Strength (14/15) driven by 3 active clinical/IND transitions. Buying Intent is scored at 4/15 because no open public RFP is verified—maintaining analytical integrity.
                </p>
                <div className="score-metrics-row">
                  <div><span>Intelligence Confidence:</span> <strong>{d.opportunityConfidence} (SEC backed)</strong></div>
                  <div><span>Research Completeness:</span> <strong>{d.researchCompleteness}% ({d.completenessCount})</strong></div>
                  <div><span>Last Research Update:</span> <strong>{d.date}</strong></div>
                </div>
              </div>
            </div>

            {/* Detailed 100-Point Scoring Breakdown Table */}
            <div className="lens-table-wrap" style={{ marginTop: "20px" }}>
              <table className="lens-clean-table">
                <thead>
                  <tr>
                    <th>Scoring Dimension</th>
                    <th>Score Awarded</th>
                    <th>Scoring Rationale & Evidence Basis</th>
                    <th>Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {d.scoringBreakdown.map((row, idx) => (
                    <tr key={idx}>
                      <td><strong>{row.dimension}</strong></td>
                      <td>
                        <div className="score-bar-inline">
                          <strong>{row.score}</strong>
                          <div className="score-track-mini">
                            <i style={{ width: `${(parseInt(row.score) / row.max) * 100}%` }} />
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize: "12.5px", color: "#334155" }}>{row.basis}</td>
                      <td>
                        <span className={`badge ${row.confidence === "High" ? "badge-success" : row.confidence === "Moderate" ? "badge-blue" : "badge-warning"}`}>
                          {row.confidence}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: INTELLIGENCE (04. Pipeline, 05. Signals, 06. Finance, 07. CMC, 08. Reg, 09. Competitors) */}
      {/* ========================================================================= */}
      {activeTab === "INTELLIGENCE" && (
        <div className="lens-tab-content-pane">
          {/* SECTION 04: CLINICAL & PIPELINE INTELLIGENCE */}
          <Card className="lens-section-card">
            <div className="lens-card-header-bar">
              <div>
                <span className="section-number-pill">04</span>
                <strong style={{ fontSize: "16px", color: "#0f172a", marginLeft: "8px" }}>Clinical & Pipeline Intelligence</strong>
              </div>
              <span className="lens-source-trigger" onClick={() => handleEvidenceClick("E09")}>
                Evidence: [E01][E06][E09][E10] <Icon name="shield" size={12} />
              </span>
            </div>

            <div className="lens-table-wrap">
              <table className="lens-clean-table">
                <thead>
                  <tr>
                    <th>Program</th>
                    <th>Target / Modality</th>
                    <th>Indication</th>
                    <th>Stage</th>
                    <th>Current Status</th>
                    <th>Next Milestone</th>
                    <th>Sales Relevance</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {d.pipelinePrograms.map((p, idx) => {
                    const isExpanded = expandedProgram === p.name;
                    return (
                      <>
                        <tr key={idx} className={isExpanded ? "row-expanded" : ""} onClick={() => setExpandedProgram(isExpanded ? null : p.name)} style={{ cursor: "pointer" }}>
                          <td><strong style={{ color: "#1e1b4b" }}>{p.name}</strong></td>
                          <td>{p.target} · <small>{p.modality}</small></td>
                          <td style={{ color: "#475569" }}>{p.indication}</td>
                          <td><span className="lens-stage-tag">{p.stage}</span></td>
                          <td style={{ fontSize: "12px" }}>{p.status}</td>
                          <td style={{ fontWeight: "600", color: "#4f46e5" }}>{p.nextMilestone}</td>
                          <td><span className={`badge ${p.salesRelevance === "High" ? "badge-success" : "badge-blue"}`}>{p.salesRelevance}</span></td>
                          <td>
                            <button className="lens-expand-btn">
                              {isExpanded ? "Close ▲" : "View ▼"}
                            </button>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr className="expansion-row">
                            <td colSpan={8}>
                              <div className="lens-program-detail-panel">
                                <div className="detail-grid">
                                  <div>
                                    <small>RECENT DEVELOPMENT</small>
                                    <p>{p.details.recentDev}</p>
                                  </div>
                                  <div>
                                    <small>EXPECTED TIMELINE</small>
                                    <p>{p.details.timing}</p>
                                  </div>
                                  <div>
                                    <small>PARTNER / SPONSORSHIP</small>
                                    <p>{p.details.partner}</p>
                                  </div>
                                  <div>
                                    <small>REGULATORY STATUS</small>
                                    <p>{p.details.regulatoryStatus}</p>
                                  </div>
                                </div>
                                <div className="business-impact-box">
                                  <strong>POTENTIAL COMMERCIAL & SERVICE IMPACT: </strong>
                                  <span>{p.details.businessImpact}</span>
                                  <button className="lens-evidence-tag-btn" style={{ marginLeft: "8px" }} onClick={(e) => { e.stopPropagation(); handleEvidenceClick(p.details.evidenceId); }}>
                                    Source [{p.details.evidenceId}]
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Sales Interpretation & Validation Checklist */}
            <div className="lens-two-col-callout">
              <div className="callout-box interpretation">
                <strong><Icon name="spark" size={14} /> SALES INTERPRETATION</strong>
                <p>
                  Multiple programs progressing concurrently into clinical trials with a lean 130-FTE structure creates acute demand for trial management, patient recruitment predictability, and regulatory CMC support.
                </p>
              </div>
              <div className="callout-box validation">
                <strong><Icon name="help" size={14} /> WHAT SALES MUST VALIDATE</strong>
                <p>
                  Confirm current CRO supporting STRO-004, whether STRO-006 Phase 1 start-up is already locked, and internal clinical operations capacity.
                </p>
              </div>
            </div>
          </Card>

          {/* SECTION 05: BUYING & DEMAND INTELLIGENCE (Strict Fact vs Intent Distinction) */}
          <Card className="lens-section-card">
            <div className="lens-card-header-bar">
              <div>
                <span className="section-number-pill">05</span>
                <strong style={{ fontSize: "16px", color: "#0f172a", marginLeft: "8px" }}>Buying & Demand Intelligence</strong>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <span className="badge badge-success">Demand: HIGH</span>
                <span className="badge badge-warning">Buying Intent: UNVERIFIED</span>
              </div>
            </div>

            <div className="lens-table-wrap">
              <table className="lens-clean-table">
                <thead>
                  <tr>
                    <th>Verified Signal & Event</th>
                    <th>Signal Type</th>
                    <th>Derived Business Insight</th>
                    <th>Buying Intent</th>
                    <th>Sales Priority</th>
                    <th>Evidence</th>
                  </tr>
                </thead>
                <tbody>
                  {d.buyingSignals.map((sig, idx) => (
                    <tr key={idx}>
                      <td><strong>{sig.signal}</strong></td>
                      <td><span className="lens-signal-type-pill">{sig.type}</span></td>
                      <td style={{ fontSize: "12.5px", color: "#334155" }}>{sig.derivedInsight}</td>
                      <td>
                        <span className={`lens-intent-badge ${sig.buyingIntent.includes("Indicated") ? "indicated" : "unverified"}`}>
                          {sig.buyingIntent}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${sig.salesPriority === "HIGH" ? "badge-danger" : "badge-warning"}`}>
                          {sig.salesPriority}
                        </span>
                      </td>
                      <td>
                        <button className="lens-evidence-tag-btn" onClick={() => handleEvidenceClick(sig.evidenceId)}>
                          [{sig.evidenceId}]
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lens-negative-warning-box">
              <Icon name="shield" size={16} />
              <div>
                <strong>DATA INTEGRITY RULE: </strong>
                <span>
                  Hiring activity and leadership changes indicate internal development capacity, NOT confirmed vendor buying intent. No public RFP or vendor replacement process is currently verified.
                </span>
              </div>
            </div>
          </Card>

          {/* SECTION 06: FUNDING & FINANCIAL INTELLIGENCE */}
          <Card className="lens-section-card">
            <div className="lens-card-header-bar">
              <div>
                <span className="section-number-pill">06</span>
                <strong style={{ fontSize: "16px", color: "#0f172a", marginLeft: "8px" }}>Funding & Financial Intelligence</strong>
              </div>
              <span className="lens-source-trigger" onClick={() => handleEvidenceClick("E01")}>
                Evidence: [E01][E04][E05][E15] <Icon name="shield" size={12} />
              </span>
            </div>

            <div className="lens-four-metrics-grid">
              <div className="lens-metric-box">
                <span style={{ fontSize: "18px" }}>💵</span>
                <strong>{d.financialData.cashPosition}</strong>
                <small>{d.financialData.cashPeriod}</small>
              </div>
              <div className="lens-metric-box">
                <span style={{ fontSize: "18px" }}>📈</span>
                <strong>{d.financialData.revenue}</strong>
                <small>{d.financialData.revenuePeriod}</small>
              </div>
              <div className="lens-metric-box">
                <span style={{ fontSize: "18px" }}>⏳</span>
                <strong>Into at least Q2 2028</strong>
                <small>Company Guided Runway</small>
              </div>
              <div className="lens-metric-box">
                <span style={{ fontSize: "18px" }}>🏦</span>
                <strong>$110.0M Raised</strong>
                <small>February 2026 Offering ($13.98/sh)</small>
              </div>
            </div>

            {/* Financial Trend Table */}
            <div className="lens-table-wrap" style={{ marginTop: "14px" }}>
              <table className="lens-clean-table">
                <thead>
                  <tr>
                    <th>Reporting Period</th>
                    <th>Cash & Marketable Securities</th>
                    <th>Material Financial Context & Guidance</th>
                  </tr>
                </thead>
                <tbody>
                  {d.financialData.fundingHistory.map((item, idx) => (
                    <tr key={idx}>
                      <td><strong>{item.period}</strong></td>
                      <td style={{ color: "#4f46e5", fontWeight: "700" }}>{item.cash}</td>
                      <td style={{ color: "#475569" }}>{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lens-sales-takeaway-bar" style={{ marginTop: "14px" }}>
              <Icon name="trend" size={16} />
              <div>
                <strong>FINANCIAL SALES IMPLICATION: </strong>
                <span>{d.financialData.salesImplication}</span>
              </div>
            </div>
          </Card>

          {/* SECTION 07 & 08: CMC & REGULATORY INTELLIGENCE (2 Column Layout) */}
          <div className="lens-two-col-grid">
            {/* SECTION 07: CMC & MANUFACTURING */}
            <Card className="lens-section-card">
              <div className="lens-card-header-bar">
                <div>
                  <span className="section-number-pill">07</span>
                  <strong style={{ fontSize: "15px", color: "#0f172a", marginLeft: "6px" }}>CMC & Manufacturing</strong>
                </div>
                <span className="badge badge-success">Relevance: HIGH</span>
              </div>
              <div className="lens-data-list">
                <div><span>Model:</span> <strong>{d.cmcData.manufacturingModel}</strong></div>
                <div><span>Facilities:</span> <strong>{d.cmcData.facilities}</strong></div>
                <div><span>Upcoming Need:</span> <strong>{d.cmcData.upcomingRequirements}</strong></div>
              </div>
              <div className="validation-sub-card">
                <small>WHAT SALES SHOULD VALIDATE:</small>
                <ul>
                  {d.cmcData.validationChecklist.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            </Card>

            {/* SECTION 08: REGULATORY INTELLIGENCE */}
            <Card className="lens-section-card">
              <div className="lens-card-header-bar">
                <div>
                  <span className="section-number-pill">08</span>
                  <strong style={{ fontSize: "15px", color: "#0f172a", marginLeft: "6px" }}>Regulatory Milestones</strong>
                </div>
                <span className="badge badge-blue">4 Verified Events</span>
              </div>
              <div className="lens-table-wrap">
                <table className="lens-clean-table" style={{ fontSize: "12px" }}>
                  <thead>
                    <tr>
                      <th>Program</th>
                      <th>Regulatory Event</th>
                      <th>Next Event / Timing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.regulatoryEvents.map((r, idx) => (
                      <tr key={idx}>
                        <td><strong>{r.program}</strong></td>
                        <td>{r.event} <small style={{ color: "#64748b" }}>({r.date})</small></td>
                        <td><strong>{r.nextEvent}</strong> ({r.timing})</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* SECTION 09: COMPETITIVE LANDSCAPE & TOP 3 DEEP DIVE */}
          <Card className="lens-section-card">
            <div className="lens-card-header-bar">
              <div>
                <span className="section-number-pill">09</span>
                <strong style={{ fontSize: "16px", color: "#0f172a", marginLeft: "8px" }}>Competitive Landscape & Top 3 Competitor Impact</strong>
              </div>
              <span className="lens-source-trigger" onClick={() => handleEvidenceClick("E18")}>
                Evidence: [E18][E19] <Icon name="shield" size={12} />
              </span>
            </div>

            {/* Top 3 Competitors Cards */}
            <div className="lens-competitors-grid">
              {d.topCompetitors.map((comp, idx) => (
                <div key={idx} className="competitor-card">
                  <div className="comp-header">
                    <strong>{comp.name}</strong>
                    <span className={`badge ${comp.salesRelevance === "High" ? "badge-danger" : "badge-warning"}`}>
                      {comp.salesRelevance} Relevance
                    </span>
                  </div>
                  <div className="comp-body">
                    <div><span>Target & Arena:</span> <p>{comp.competitiveArea}</p></div>
                    <div><span>Recent Action:</span> <p>{comp.recentlyDid}</p></div>
                    <div><span>Technical Focus:</span> <p>{comp.technicalFocus}</p></div>
                    <div className="impact-box">
                      <span>IMPACT ON SUTRO:</span>
                      <p>{comp.effectOnAccount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* General Landscape Strip */}
            <div className="landscape-summary-strip">
              <small>ADDITIONAL PEER LANDSCAPE:</small>
              <div className="landscape-pill-row">
                {d.competitiveLandscape.map((c, i) => (
                  <span key={i} className="landscape-pill">
                    <strong>{c.name}:</strong> {c.relevance}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: CONTACTS (10. Key Contact Information & Buying Committee) */}
      {/* ========================================================================= */}
      {activeTab === "CONTACTS" && (
        <div className="lens-tab-content-pane">
          <Card className="lens-section-card">
            <div className="lens-card-header-bar">
              <div>
                <span className="section-number-pill">10</span>
                <strong style={{ fontSize: "16px", color: "#0f172a", marginLeft: "8px" }}>Key Contact Information & Buying Committee Coverage</strong>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <span className="badge badge-success">6 Verified Stakeholders</span>
                <span className="badge badge-blue">85% Buying Committee Covered</span>
              </div>
            </div>

            <div className="lens-table-wrap">
              <table className="lens-clean-table">
                <thead>
                  <tr>
                    <th>Contact & Verified Info</th>
                    <th>Buying Committee Role</th>
                    <th>What They Do & Why Relevant</th>
                    <th>Recent Corporate Context</th>
                    <th>Recommended Angle</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {d.contacts.map((ct, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="lens-contact-cell-layout">
                          <div className="avatar-chip">{ct.name.split(" ").map(n => n[0]).join("")}</div>
                          <div>
                            <strong>{ct.name}</strong>
                            <small>{ct.title}</small>
                            <div className="contact-email">
                              <code>{ct.email}</code>
                              <button className="copy-btn" onClick={() => { navigator.clipboard.writeText(ct.email); notify(`Copied ${ct.email}`); }}>Copy</button>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="lens-buying-role-pill">{ct.buyingRole}</span>
                        <div style={{ fontSize: "10px", color: "#64748b", marginTop: "4px" }}>{ct.function}</div>
                      </td>
                      <td style={{ fontSize: "12px", color: "#334155", maxWidth: "240px" }}>
                        <p style={{ margin: "0 0 4px" }}><strong>Role:</strong> {ct.whatTheyDo}</p>
                        <p style={{ margin: 0, color: "#4f46e5" }}><strong>Relevance:</strong> {ct.whyRelevant}</p>
                      </td>
                      <td style={{ fontSize: "11.5px", color: "#475569", maxWidth: "200px" }}>
                        {ct.recentContext}
                      </td>
                      <td style={{ fontSize: "11.5px", color: "#1e1b4b", maxWidth: "220px", background: "#f8fafc", padding: "8px", borderRadius: "6px" }}>
                        💡 {ct.recommendedAngle}
                      </td>
                      <td>
                        <Button variant="primary" style={{ height: "30px", fontSize: "11.5px" }} onClick={() => setActiveTab("OUTREACH")}>
                          Draft Message
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Buying Committee Role Coverage Summary */}
            <div className="lens-committee-coverage-bar">
              <div className="role-chip verified"><Icon name="check" size={12} /> Clinical Decision Maker (CMO Anne Borgman)</div>
              <div className="role-chip verified"><Icon name="check" size={12} /> Technical / CMC Decision Maker (CTO Venkatesh Srinivasan)</div>
              <div className="role-chip verified"><Icon name="check" size={12} /> Economic Approver (CFO Greg Chow / CEO Jane Chung)</div>
              <div className="role-chip verified"><Icon name="check" size={12} /> Operational Evaluator (Director ClinOps Mark Baczkowski)</div>
              <div className="role-chip gap"><Icon name="help" size={12} /> Vendor / Procurement Owner (Not Publicly Verified)</div>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: STRATEGY (11. Opportunity, 12. Risks, 13. Timeline, 14. Strategy, 15. Next Best Action) */}
      {/* ========================================================================= */}
      {activeTab === "STRATEGY" && (
        <div className="lens-tab-content-pane">
          {/* SECTION 15: NEXT BEST ACTION (Promoted to Top of Strategy) */}
          <Card className="lens-section-card hero-action-card">
            <div className="lens-card-header-bar">
              <div>
                <span className="section-number-pill active">15</span>
                <strong style={{ fontSize: "17px", color: "#0f172a", marginLeft: "8px" }}>Next Best Action Playbook</strong>
              </div>
              <span className="badge badge-success">Recommended Immediate Motion</span>
            </div>

            <div className="lens-nba-container">
              <div className="nba-primary-action-box">
                <div className="nba-flag">PRIMARY SALES MOTION</div>
                <h2>{d.nextBestAction.primaryAction}</h2>
                <p>{d.nextBestAction.whyThisAction}</p>
              </div>

              <div className="nba-grid-details">
                <div className="nba-card">
                  <small>WHO & WHY THEM</small>
                  <strong>{d.nextBestAction.who}</strong>
                  <p>{d.nextBestAction.whyThem}</p>
                </div>
                <div className="nba-card">
                  <small>WHY NOW</small>
                  <strong>Active Transition Window</strong>
                  <p>{d.nextBestAction.whyNow}</p>
                </div>
                <div className="nba-card">
                  <small>CONVERSATION ANGLE</small>
                  <strong>Milestone Predictability</strong>
                  <p>{d.nextBestAction.conversationAngle}</p>
                </div>
                <div className="nba-card">
                  <small>DESIRED OUTCOME</small>
                  <strong>20-Minute Exploratory Call</strong>
                  <p>{d.nextBestAction.desiredOutcome}</p>
                </div>
              </div>

              <div className="nba-discovery-box">
                <strong><Icon name="spark" size={14} /> SUGGESTED DISCOVERY QUESTIONS:</strong>
                <ul>
                  {d.nextBestAction.discoveryQuestions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>

              <div className="nba-footer-row">
                <div><span>Do Not Assume:</span> {d.nextBestAction.doNotAssume}</div>
                <div><span>Fallback Action:</span> {d.nextBestAction.fallbackAction}</div>
              </div>
            </div>
          </Card>

          {/* SECTION 11: COMMERCIAL OPPORTUNITY (Hypotheses) */}
          <Card className="lens-section-card">
            <div className="lens-card-header-bar">
              <div>
                <span className="section-number-pill">11</span>
                <strong style={{ fontSize: "16px", color: "#0f172a", marginLeft: "8px" }}>Commercial Opportunity Hypotheses</strong>
              </div>
              <div style={{ fontSize: "12px", color: "#64748b" }}>
                Strict Rule: <em>Presented as potential opportunities requiring discovery validation.</em>
              </div>
            </div>

            <div className="lens-table-wrap">
              <table className="lens-clean-table">
                <thead>
                  <tr>
                    <th>Potential Service Opportunity</th>
                    <th>Why We See It (Intelligence Basis)</th>
                    <th>Confidence</th>
                    <th>Status</th>
                    <th>What Sales Needs to Validate</th>
                  </tr>
                </thead>
                <tbody>
                  {d.commercialOpportunities.map((op, idx) => (
                    <tr key={idx}>
                      <td><strong style={{ color: "#1e1b4b" }}>{op.title}</strong></td>
                      <td style={{ fontSize: "12.5px", color: "#334155" }}>{op.whyWeSeeIt}</td>
                      <td><span className="badge badge-blue">{op.confidence}</span></td>
                      <td>
                        <span className="lens-opportunity-status-pill discovery">
                          {op.status}
                        </span>
                      </td>
                      <td style={{ fontSize: "12px", color: "#475569" }}>{op.validationRequired}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* SECTION 12 & 13: RISKS & ACCOUNT TIMELINE (2 Column Grid) */}
          <div className="lens-two-col-grid">
            {/* SECTION 12: RISKS & DEAL BLOCKERS */}
            <Card className="lens-section-card">
              <div className="lens-card-header-bar">
                <div>
                  <span className="section-number-pill">12</span>
                  <strong style={{ fontSize: "15px", color: "#0f172a", marginLeft: "6px" }}>Risks & Deal Blockers</strong>
                </div>
                <span className="badge badge-warning">4 Identified</span>
              </div>
              <div className="lens-risks-list">
                {d.risks.map((r, i) => (
                  <div key={i} className="risk-item">
                    <div className="risk-head">
                      <strong>{r.risk}</strong>
                      <span className={`badge ${r.severity === "High" ? "badge-danger" : "badge-warning"}`}>{r.severity} Severity</span>
                    </div>
                    <p style={{ margin: "4px 0", fontSize: "11.5px", color: "#475569" }}>{r.whyItMatters}</p>
                    <div className="risk-response">
                      <span>Sales Response: </span>{r.response}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* SECTION 13: ACCOUNT TIMELINE */}
            <Card className="lens-section-card">
              <div className="lens-card-header-bar">
                <div>
                  <span className="section-number-pill">13</span>
                  <strong style={{ fontSize: "15px", color: "#0f172a", marginLeft: "6px" }}>Commercial Account Timeline</strong>
                </div>
                <span className="lens-source-trigger" onClick={() => handleEvidenceClick("E01")}>
                  Traceable [E01-E13] <Icon name="shield" size={12} />
                </span>
              </div>
              <div className="lens-timeline-stream">
                {d.accountTimeline.map((item, i) => (
                  <div key={i} className="timeline-event-row">
                    <div className="timeline-date">{item.date}</div>
                    <div className="timeline-node" />
                    <div className="timeline-content">
                      <strong>{item.event}</strong>
                      <p>{item.whyItMatters}</p>
                      <button className="lens-evidence-tag-btn" onClick={() => handleEvidenceClick(item.evidenceId)}>
                        [{item.evidenceId}]
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* SECTION 14: SALES STRATEGY & POSITIONING */}
          <Card className="lens-section-card">
            <div className="lens-card-header-bar">
              <div>
                <span className="section-number-pill">14</span>
                <strong style={{ fontSize: "16px", color: "#0f172a", marginLeft: "8px" }}>Sales Strategy & Positioning Framework</strong>
              </div>
              <span className="badge badge-blue">Executive Playbook</span>
            </div>
            <div className="lens-strategy-matrix">
              <div><span>Recommended Entry Point:</span> <strong>{d.salesStrategy.recommendedEntryPoint}</strong></div>
              <div><span>Primary Persona:</span> <strong>{d.salesStrategy.primaryPersona}</strong></div>
              <div><span>Secondary Persona:</span> <strong>{d.salesStrategy.secondaryPersona}</strong></div>
              <div><span>Core Conversation Theme:</span> <strong>{d.salesStrategy.conversationTheme}</strong></div>
              <div><span>Positioning Statement:</span> <strong>{d.salesStrategy.positioning}</strong></div>
              <div><span>Do Not Assume:</span> <strong style={{ color: "#b91c1c" }}>{d.salesStrategy.doNotAssume}</strong></div>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: OUTREACH (16. Multi-Channel Evidence-Grounded Outreach) */}
      {/* ========================================================================= */}
      {activeTab === "OUTREACH" && (
        <div className="lens-tab-content-pane">
          <Card className="lens-section-card">
            <div className="lens-card-header-bar">
              <div>
                <span className="section-number-pill">16</span>
                <strong style={{ fontSize: "16px", color: "#0f172a", marginLeft: "8px" }}>Personalized Outreach Sequences (Evidence Grounded)</strong>
              </div>
              <div style={{ fontSize: "12px", color: "#64748b" }}>
                Quality Standard: <em>Zero unverified assumptions · Professional peer tone</em>
              </div>
            </div>

            <div className="lens-outreach-drafts-grid">
              {d.outreachDrafts.map((draft, idx) => (
                <div key={idx} className="outreach-draft-card">
                  <div className="draft-header">
                    <div>
                      <span className="channel-tag">{draft.channel}</span>
                      <strong>{draft.contactName}</strong> <small>({draft.title})</small>
                    </div>
                    <Button variant="secondary" style={{ height: "28px", fontSize: "11px" }} onClick={() => { navigator.clipboard.writeText(draft.body); notify("Copied message to clipboard!"); }}>
                      Copy Draft
                    </Button>
                  </div>
                  <div className="draft-subject">
                    <small>Subject: </small><strong>{draft.subject}</strong>
                  </div>
                  <pre className="draft-body">{draft.body}</pre>
                  <div className="draft-footer">
                    <div><span>Confidence: </span><span className="badge badge-success" style={{ fontSize: "10px" }}>{draft.confidence}</span></div>
                    <div className="claims-to-avoid"><span>Claims to Avoid: </span>{draft.claimsToAvoid}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: EVIDENCE (17. Research Gaps, 18. Evidence Ledger, 19. Quality) */}
      {/* ========================================================================= */}
      {activeTab === "EVIDENCE" && (
        <div className="lens-tab-content-pane">
          {/* SECTION 17: RESEARCH GAPS & DISCOVERY CHECKLIST */}
          <Card className="lens-section-card">
            <div className="lens-card-header-bar">
              <div>
                <span className="section-number-pill">17</span>
                <strong style={{ fontSize: "16px", color: "#0f172a", marginLeft: "8px" }}>Research Gaps & Discovery Checklist</strong>
              </div>
              <span className="badge badge-warning">5 Strategic Gaps Identified</span>
            </div>
            <div className="lens-table-wrap">
              <table className="lens-clean-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Identified Research Gap / Unknown</th>
                    <th>Priority</th>
                    <th>How Sales Can Validate</th>
                  </tr>
                </thead>
                <tbody>
                  {d.researchGaps.map((gap, idx) => (
                    <tr key={idx}>
                      <td><strong>{gap.category}</strong></td>
                      <td style={{ color: "#334155", fontWeight: "600" }}>{gap.gap}</td>
                      <td>
                        <span className={`badge ${gap.priority === "High" ? "badge-danger" : "badge-warning"}`}>
                          {gap.priority}
                        </span>
                      </td>
                      <td style={{ fontSize: "12px", color: "#475569" }}>{gap.validationAction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* SECTION 18: EVIDENCE & SOURCE LEDGER */}
          <Card className="lens-section-card">
            <div className="lens-card-header-bar">
              <div>
                <span className="section-number-pill">18</span>
                <strong style={{ fontSize: "16px", color: "#0f172a", marginLeft: "8px" }}>Evidence & Source Ledger (Complete Audit Trail)</strong>
              </div>
              <span className="badge badge-success">21 Verified Sources</span>
            </div>

            <div className="lens-table-wrap">
              <table className="lens-clean-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Verified Claim & Fact</th>
                    <th>Source Name</th>
                    <th>Source Type</th>
                    <th>Published</th>
                    <th>Confidence</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sutroEvidenceLedger.map((ev) => (
                    <tr key={ev.id} onClick={() => setActiveEvidence(ev)} style={{ cursor: "pointer" }}>
                      <td><strong style={{ color: "#4f46e5" }}>[{ev.id}]</strong></td>
                      <td style={{ fontSize: "12px", color: "#334155", maxWidth: "340px" }}>{ev.claim}</td>
                      <td><strong>{ev.source}</strong></td>
                      <td><span className="lens-source-type-pill">{ev.type}</span></td>
                      <td style={{ color: "#64748b", fontSize: "11.5px" }}>{ev.published}</td>
                      <td><span className="badge badge-success">{ev.confidence}</span></td>
                      <td>
                        <Button variant="secondary" style={{ height: "26px", fontSize: "11px", padding: "0 8px" }} onClick={(e) => { e.stopPropagation(); setActiveEvidence(ev); }}>
                          Inspect
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* PDF PREVIEW MODAL */}
      {showPdfPreview && <PdfPreviewModal onClose={() => setShowPdfPreview(false)} onDownload={handleDownloadPDF} />}

      {/* EVIDENCE DETAIL DRAWER (No Raw URL Clutter in Text) */}
      {activeEvidence && (
        <>
          <div className="drawer-overlay" onClick={() => setActiveEvidence(null)} />
          <aside className="source-drawer">
            <div className="drawer-head">
              <div>
                <span>EVIDENCE RECORD</span>
                <h2>Evidence [{activeEvidence.id}]</h2>
              </div>
              <Button variant="icon" icon="close" onClick={() => setActiveEvidence(null)} />
            </div>
            <Badge tone={activeEvidence.confidence.includes("High") ? "success" : "warning"}>
              <Icon name="shield" size={12} /> {activeEvidence.confidence} confidence
            </Badge>
            <blockquote style={{ margin: "14px 0", fontSize: "13px", fontStyle: "italic", borderLeft: "3px solid #4f46e5", paddingLeft: "12px", color: "var(--slate-700)", background: "#f8fafc", padding: "10px 12px", borderRadius: "0 8px 8px 0" }}>
              “{activeEvidence.claim}”
            </blockquote>
            <div className="source-fields">
              <div><span>Primary Source</span><strong>{activeEvidence.source}</strong></div>
              <div><span>Source Type</span><strong>{activeEvidence.type}</strong></div>
              <div><span>Published Date</span><strong>{activeEvidence.published}</strong></div>
              <div><span>Retrieved / Verified Date</span><strong>{activeEvidence.retrieved}</strong></div>
              <div><span>Verification Status</span><strong>{activeEvidence.verification}</strong></div>
            </div>
            <Button className="full-width" icon="external" onClick={() => window.open(activeEvidence.url, "_blank")}>
              Open Official Source Link ↗
            </Button>
          </aside>
        </>
      )}

      {toast && <div className="toast"><Icon name="check" />{toast}</div>}
    </div>
  );
}

function SignalList({ title, items }: { title: string; items: string[] }) { 
  return <div className="signal-list"><h3>{title}</h3>{items.map((x, i) => <div key={x}><span className={i < 2 ? "positive" : "unknown"}>{i < 2 ? <Icon name="trend" /> : "?"}</span><p><strong>{x.split(" — ")[0]}</strong><small>{x.split(" — ")[1]}</small></p><Evidence id={`E0${i + 1}`} /></div>)}</div>; 
}

function Settings() {
  return <div className="page"><PageHeader title="Settings" subtitle="Manage your profile, workspace and intelligence preferences."><Button>Save changes</Button></PageHeader><div className="settings-layout"><aside>{["Profile", "Workspace", "Research Preferences", "Source Preferences", "Notification Preferences", "Security", "Data & Privacy"].map((x, i) => <button className={i === 3 ? "active" : ""} key={x}>{x}</button>)}</aside><Card className="settings-card"><div className="card-heading"><div><h2>Source Preferences</h2><p>Configure how the Intelligence Engine prioritizes sources during research.</p></div></div><div className="info-box"><Icon name="shield" /><p><strong>Source authority matters</strong>Higher-priority sources are used first for verification. Signals from lower-priority sources should be corroborated.</p></div><div className="source-order"><span>PRIORITY ORDER</span>{["Government / Regulatory", "Official Company", "Clinical", "Professional", "Financial", "Industry", "Social"].map((x, i) => <div key={x}><b>{i + 1}</b><Icon name={i < 3 ? "shield" : "briefcase"} /><div><strong>{x}</strong><small>{i < 3 ? "Primary authority for verification" : i < 5 ? "Supporting professional evidence" : "Signal source — corroboration preferred"}</small></div><Badge tone={i < 3 ? "success" : i < 5 ? "blue" : "warning"}>{i < 3 ? "Highest" : i < 5 ? "Standard" : "Signal only"}</Badge><Icon name="menu" /></div>)}</div><div className="settings-options"><label><span><strong>Require primary-source corroboration</strong><small>Flag material insights not supported by a primary source.</small></span><input type="checkbox" defaultChecked /><i /></label><label><span><strong>Show social signals</strong><small>Allow qualified social sources as non-authoritative signals.</small></span><input type="checkbox" /><i /></label></div></Card></div></div>;
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(true);
  const [page, setPage] = useState<Page>("campaigns");
  const [campaigns, setCampaigns] = useState<string[][]>(campaignRows);
  const [activeCampaign, setActiveCampaign] = useState<string>("North America Oncology ADC Growth Campaign 2026");
  const [campaignSuccess, setCampaignSuccess] = useState<string | null>(null);

  const handleSaveCampaign = (newCamp: string[]) => {
    setCampaigns((prev) => [newCamp, ...prev]);
    setActiveCampaign(newCamp[0]);
    setCampaignSuccess(`"${newCamp[0]}" has been saved and added to your campaigns list.`);
    setPage("campaigns");
  };

  if (!authenticated) return <Login onLogin={() => setAuthenticated(true)} />;
  
  let content: ReactNode;
  if (page === "campaigns" || page === "dashboard") {
    content = (
      <Campaigns 
        setPage={setPage} 
        campaigns={campaigns} 
        successMessage={campaignSuccess} 
        onClearSuccess={() => setCampaignSuccess(null)}
        onUseCampaign={(name) => {
          setActiveCampaign(name);
          setPage("accounts");
        }}
      />
    );
  } else if (page === "create-campaign") {
    content = <CreateCampaign setPage={setPage} onSave={handleSaveCampaign} />;
  } else if (page === "accounts") {
    content = <Accounts setPage={setPage} activeCampaign={activeCampaign} />;
  } else if (page === "report") {
    content = <Report setPage={setPage} activeCampaign={activeCampaign} />;
  } else {
    content = <Settings />;
  }

  return (
    <AppShell 
      page={page} 
      setPage={setPage} 
      activeCampaign={activeCampaign}
      setActiveCampaign={setActiveCampaign}
      campaigns={campaigns}
      onSignOut={() => { setAuthenticated(false); setPage("campaigns"); }}
    >
      {content}
    </AppShell>
  );
}
