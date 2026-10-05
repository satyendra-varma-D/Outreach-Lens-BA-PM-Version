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

function AppShell({ page, setPage, onSignOut, children }: { page: Page; setPage: (p: Page) => void; onSignOut: () => void; children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [profile, setProfile] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [search, setSearch] = useState("");
  const [signout, setSignout] = useState(false);
  const nav = [
    { label: "Dashboard", icon: "home" as IconName, page: "dashboard" as Page, group: "Overview" },
    { label: "Campaigns", icon: "campaign" as IconName, page: "campaigns" as Page, group: "Research" },
    { label: "Accounts", icon: "accounts" as IconName, page: "accounts" as Page, group: "" },
  ];
  return <div className={`app-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
    <aside className="sidebar">
      <div className="sidebar-head"><Logo compact={collapsed} /><Button variant="icon" icon="menu" onClick={() => setCollapsed(!collapsed)} /></div>
      {!collapsed && <div className="workspace-label"><span>Workspace</span><strong>Life Sciences Workspace</strong></div>}
      <nav className="sidebar-nav">
        {nav.map((item) => <div key={item.label}>{item.group && !collapsed && <div className="nav-group">{item.group}</div>}<button title={collapsed ? item.label : undefined} className={`nav-item ${page === item.page || (item.page === "accounts" && ["run-research", "running", "results", "report"].includes(page)) || (item.page === "campaigns" && page === "create-campaign") ? "active" : ""}`} onClick={() => setPage(item.page)}><Icon name={item.icon} size={18} />{!collapsed && <span>{item.label}</span>}{item.label === "Accounts" && !collapsed && <Badge tone="orange">50</Badge>}</button></div>)}
      </nav>
    </aside>
    <div className="app-area">
      <header className="topbar">
        <div className="global-search"><Icon name="search" size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search accounts, campaigns, reports..." /><kbd>⌘ K</kbd>{search && <div className="search-results"><small>ACCOUNTS</small><button onClick={() => { setPage("report"); setSearch(""); }}><Icon name="briefcase" /> <span><strong>Cleveland Clinic</strong><small>Health System · Cleveland, OH</small></span></button><small>RESEARCH</small><button onClick={() => { setPage("results"); setSearch(""); }}><Icon name="activity" /> <span><strong>US Oncology Account Discovery</strong><small>Completed · 50 accounts</small></span></button><small>CAMPAIGNS</small><button onClick={() => { setPage("campaigns"); setSearch(""); }}><Icon name="campaign" /><span><strong>Oncology Expansion</strong><small>Active research campaign</small></span></button></div>}</div>
        <div className="top-actions"><Button variant="icon" icon="help" /><div className="menu-anchor"><Button variant="icon" icon="bell" onClick={() => setNotifications(!notifications)} /><span className="notification-dot" />{notifications && <div className="popover notification-pop"><div className="popover-head"><strong>Notifications</strong><Badge tone="orange">3 new</Badge></div>{["Research completed — 50 accounts analyzed.", "New high-priority account detected.", "3 research gaps identified."].map((x, i) => <button key={x}><span className={`notif-icon n${i}`}><Icon name={i === 0 ? "check" : i === 1 ? "spark" : "help"} size={15} /></span><span><strong>{x}</strong><small>{i + 1}h ago</small></span></button>)}</div>}</div>
          <div className="menu-anchor"><button className="user-button" onClick={() => setProfile(!profile)}><span className="avatar">P</span><span className="user-copy"><strong>Priya Mehta</strong><small>Commercial Strategy</small></span><Icon name="chevron" size={15} /></button>{profile && <div className="popover profile-pop"><button className="danger-text" onClick={() => { setProfile(false); setSignout(true); }}><Icon name="arrow" /> Sign out</button></div>}</div>
        </div>
      </header>
      <main className="main-content">{children}</main>
    </div>
    {signout && <div className="modal-backdrop"><div className="dialog"><div className="dialog-icon"><Icon name="arrow" /></div><h2>Sign out of OutreachLens?</h2><p>You can sign back in at any time.</p><div className="dialog-actions"><Button variant="secondary" onClick={() => setSignout(false)}>Cancel</Button><Button onClick={onSignOut}>Sign out</Button></div></div></div>}
  </div>;
}

function MetricCard({ icon, value, label, trend, tone = "" }: { icon: IconName; value: string; label: string; trend: string; tone?: string }) {
  return <Card className="metric-card"><div className={`metric-icon ${tone}`}><Icon name={icon} /></div><div className="metric-copy"><small>{label}</small><strong>{value}</strong><span><Icon name="trend" size={13} /> {trend}</span></div><button className="info-dot" title={`Tracks ${label.toLowerCase()} within the selected period`}>i</button></Card>;
}

function Dashboard({ setPage }: { setPage: (p: Page) => void }) {
  return <div className="page">
    <PageHeader title="Life Sciences Workspace" subtitle="Account intelligence and research overview"><Button variant="secondary" icon="calendar">Last 30 days</Button><Button variant="secondary" icon="refresh">Refresh</Button><Button icon="plus" onClick={() => setPage("run-research")}>Run research</Button></PageHeader>
    <div className="metrics-grid"><MetricCard icon="campaign" value="12" label="Active Research Campaigns" trend="2 added this month" tone="blue" /><MetricCard icon="activity" value="28" label="Research Runs" trend="12.5% vs last month" tone="orange" /><MetricCard icon="accounts" value="1,240" label="Accounts Researched" trend="184 this month" tone="emerald" /><MetricCard icon="spark" value="84" label="High-Priority Accounts" trend="6.8% of researched" tone="violet" /></div>
    <div className="dashboard-grid">
      <Card className="chart-card"><div className="card-heading"><div><h2>Research Activity</h2><p>Research runs and accounts analyzed</p></div><SelectField value="8 weeks"><option>8 weeks</option><option>12 weeks</option></SelectField></div><div className="chart-legend"><span><i className="legend-orange" /> Research runs</span><span><i className="legend-blue" /> Accounts analyzed</span></div><div className="line-chart"><div className="y-labels"><span>200</span><span>150</span><span>100</span><span>50</span><span>0</span></div><svg viewBox="0 0 700 220" preserveAspectRatio="none"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2563EB" stopOpacity=".18" /><stop offset="1" stopColor="#2563EB" stopOpacity="0" /></linearGradient></defs><path className="grid-line" d="M0 20h700M0 70h700M0 120h700M0 170h700M0 219h700" /><path className="area" d="M0 184L100 160 200 170 300 115 400 130 500 75 600 95 700 35V220H0Z" /><path className="line blue-line" d="M0 184L100 160 200 170 300 115 400 130 500 75 600 95 700 35" /><path className="line orange-line" d="M0 205L100 185 200 192 300 172 400 180 500 145 600 153 700 125" /></svg><div className="x-labels"><span>Aug 12</span><span>Aug 26</span><span>Sep 09</span><span>Sep 23</span><span>Oct 07</span></div></div></Card>
      <Card className="priority-card"><div className="card-heading"><div><h2>Account Priority</h2><p>Distribution across all results</p></div><Button variant="icon" icon="more" /></div><div className="donut-wrap"><div className="donut"><div><strong>1,240</strong><small>Total accounts</small></div></div></div><div className="priority-list"><div><span><i className="dot high" /> High priority</span><strong>84 <small>7%</small></strong></div><div><span><i className="dot medium" /> Medium priority</span><strong>682 <small>55%</small></strong></div><div><span><i className="dot low" /> Low priority</span><strong>474 <small>38%</small></strong></div></div></Card>
    </div>
    <Card className="table-card"><div className="card-heading"><div><h2>Recent Research Runs</h2><p>Latest intelligence activity across your workspace</p></div><Button variant="ghost" onClick={() => setPage("accounts")}>View all <Icon name="arrow" /></Button></div><div className="table-scroll"><table><thead><tr><th>Research name</th><th>Campaign</th><th>Requested</th><th>Found</th><th>High priority</th><th>Status</th><th>Created</th><th /></tr></thead><tbody>{[
      ["Oncology Account Discovery", "US Oncology Hospital Expansion", "50", "50", "18", "Completed", "Oct 04, 2026"],
      ["HER2 Provider Research", "HER2 Market Opportunity", "100", "84", "24", "Partial Results", "Oct 02, 2026"],
      ["Specialty Pharmacy Scan", "Specialty Pharmacy Expansion", "75", "—", "—", "Running", "Oct 01, 2026"],
    ].map((r) => <tr key={r[0]}><td><button className="table-link" onClick={() => setPage("results")}>{r[0]}</button></td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td><strong>{r[4]}</strong></td><td><Badge tone={r[5] === "Completed" ? "success" : r[5] === "Running" ? "blue" : "warning"}>{r[5]}</Badge></td><td>{r[6]}</td><td><Button variant="icon" icon="arrow" onClick={() => setPage("results")} /></td></tr>)}</tbody></table></div></Card>
    <Card className="signals-card"><div className="card-heading"><div><h2>Recent Intelligence Signals</h2><p>Evidence-backed changes with potential commercial relevance</p></div><Button variant="ghost">View signal library</Button></div><div className="signal-grid">{[
      ["Clinical development", "Cleveland Clinic", "New oncology treatment center expansion announced", "Official company", "High", "Oct 04"],
      ["Executive appointment", "Mayo Clinic", "New chair appointed to oncology department", "Professional", "Medium", "Oct 03"],
      ["Procurement signal", "Mass General Brigham", "Specialty pharmacy vendor review detected", "Industry", "Medium", "Oct 02"],
    ].map((s, i) => <div className="signal-item" key={s[0]}><div className={`signal-icon s${i}`}><Icon name={i === 0 ? "activity" : i === 1 ? "users" : "briefcase"} /></div><div><span className="signal-meta">{s[5]} · {s[0]}</span><strong>{s[1]}</strong><p>{s[2]}</p><span className="source-chip"><Icon name="shield" size={12} /> {s[3]}</span></div><Badge tone={s[4] === "High" ? "success" : "warning"}>{s[4]} confidence</Badge></div>)}</div></Card>
  </div>;
}

function FilterBar({ placeholder = "Search..." }: { placeholder?: string }) {
  return <div className="filter-bar"><div className="filter-search"><Icon name="search" /><input placeholder={placeholder} /></div><Button variant="secondary" icon="filter">Filters <Badge tone="orange">2</Badge></Button><Button variant="secondary">Status <Icon name="chevron" size={14} /></Button><Button variant="secondary">Therapeutic Area <Icon name="chevron" size={14} /></Button><Button variant="ghost">Clear all</Button><div className="spacer" /><Button variant="secondary">Save view</Button></div>;
}

function Campaigns({ setPage, campaigns = campaignRows, successMessage, onClearSuccess }: { setPage: (p: Page) => void; campaigns?: string[][]; successMessage?: string | null; onClearSuccess?: () => void }) {
  return <div className="page">
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
    <PageHeader title="Research Campaigns" subtitle="Define and preserve the research context used by the Intelligence Engine."><Button icon="plus" onClick={() => setPage("create-campaign")}>Create Campaign</Button></PageHeader><div className="context-banner"><Icon name="shield" /><div><strong>Campaigns preserve research context — they do not execute outreach.</strong><span>Accounts and intelligence reports are created through a Research Run.</span></div><button>Learn more</button></div><FilterBar placeholder="Search campaigns..." /><Card className="table-card campaign-table"><div className="table-scroll"><table><thead><tr><th>Campaign name</th><th>Research purpose</th><th>Product / solution</th><th>Target account type</th><th>Therapeutic area</th><th>Geography</th><th>Runs</th><th>Created</th><th>Status</th><th /></tr></thead><tbody>{campaigns.map((r) => <tr key={r[0]}><td><button className="table-link">{r[0]}</button></td><td className="purpose-cell">{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td>{r[5]}</td><td><strong>{r[6]}</strong></td><td>{r[7]}</td><td><Badge tone={r[8] === "Active" ? "success" : "neutral"}>{r[8]}</Badge></td><td><Button variant="icon" icon="more" /></td></tr>)}</tbody></table></div><div className="table-footer"><span>Showing {campaigns.length} of {campaigns.length} campaigns</span><div><Button variant="secondary">Previous</Button><Button variant="secondary">Next</Button></div></div></Card></div>;
}

const wizardSteps = ["Research Context", "Product Context", "Target Account", "Research Parameters", "Supporting Documents", "Review"];
function CreateCampaign({ setPage, onSave }: { setPage: (p: Page) => void; onSave: (campaign: string[]) => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("US Oncology Hospital Expansion");
  const [objective, setObjective] = useState("Identify high-potential US oncology health systems with relevant treatment capacity for Product X.");
  const [product, setProduct] = useState("OncoNova X");
  const [therapy, setTherapy] = useState("Oncology");
  const [accountType, setAccountType] = useState("Hospital / Health System");
  const [geography, setGeography] = useState("United States");

  const handleSave = () => {
    const newCampaign = [
      name || "New Research Campaign",
      objective || "Identify high-potential target accounts.",
      product || "OncoNova X",
      accountType || "Hospital / Health System",
      therapy || "Oncology",
      geography || "United States",
      "0",
      "Today",
      "Active"
    ];
    onSave(newCampaign);
  };

  return <div className="page wizard-page"><div className="back-link" onClick={() => setPage("campaigns")}><Icon name="arrow" /> Back to Campaigns</div><PageHeader title="Create Research Campaign" subtitle="Build a reusable research configuration for account discovery." /><div className="wizard-layout"><aside className="wizard-steps">{wizardSteps.map((s, i) => <button key={s} className={`${i === step ? "active" : ""} ${i < step ? "complete" : ""}`} onClick={() => setStep(i)}><span>{i < step ? <Icon name="check" size={14} /> : i + 1}</span><div><strong>{s}</strong><small>{["Define objectives", "Describe your product", "Choose organization types", "Set discovery criteria", "Add internal context", "Confirm configuration"][i]}</small></div></button>)}</aside><Card className="wizard-card">
    <div className="wizard-top"><div><span>STEP {step + 1} OF 6</span><h2>{wizardSteps[step]}</h2><p>{["Tell the Intelligence Engine what you are trying to learn and why.", "Provide factual product context to assess account relevance.", "Select the organization type this research should discover.", "Define where and how the Intelligence Engine should search.", "Provide approved materials and internal research context.", "Review the complete research configuration before saving."][step]}</p></div><span className="autosave"><Icon name="check" size={13} /> Draft saved</span></div>
    {step === 0 && <div className="form-stack"><div className="form-grid"><Field label="Campaign name" value={name} onChange={setName} /><SelectField label="Sales objective"><option>New Customer Acquisition</option><option>Product Launch</option><option>Competitive Displacement</option><option>Market Expansion</option></SelectField></div><TextArea label="Research objective" placeholder="Identify high-potential US oncology health systems with relevant treatment capacity..." /><TextArea label="Business purpose" placeholder="Explain how this research will support the commercial team..." /><TextArea label="What are we trying to learn?" placeholder="Describe the specific account characteristics, signals, and evidence needed." /></div>}
    {step === 1 && <div className="form-stack"><div className="form-grid"><Field label="Product / brand" value={product} onChange={setProduct} /><Field label="Generic name" placeholder="Enter generic name" /><SelectField label="Therapeutic area" value={therapy} onChange={setTherapy}><option>Oncology</option><option>Immunology</option><option>Rare Disease</option></SelectField><Field label="Indication" value="HER2-positive breast cancer" /><SelectField label="Modality"><option>Monoclonal antibody</option><option>Small molecule</option></SelectField><SelectField label="Product stage"><option>Commercial</option><option>Phase III</option><option>Pre-launch</option></SelectField></div><TextArea label="Product value proposition" /><TextArea label="Key differentiators" /><div className="info-box"><Icon name="shield" /><p><strong>Evidence and claims policy</strong>These materials provide context to the Intelligence Engine. AI-generated insights must remain evidence-backed and must not invent product claims.</p></div></div>}
    {step === 2 && <div className="account-type-grid">{["Hospital / Health System", "IDN", "Specialty Clinic", "Physician / HCP", "Payer", "PBM", "Specialty Pharmacy", "GPO", "Distributor", "Government / Institutional", "Other"].map((x) => <button className={accountType === x ? "selected" : ""} key={x} onClick={() => setAccountType(x)}><span><Icon name="activity" /></span><strong>{x}</strong>{accountType === x && <Icon name="check" size={15} />}</button>)}</div>}
    {step === 3 && <div className="form-stack"><div className="form-grid"><SelectField label="Geography" value={geography} onChange={setGeography}><option>United States</option><option>Canada</option><option>United States & Canada</option></SelectField><Field label="State / province" value="Ohio, New York, California, Texas" /><Field label="Company size" value="1,000+ employees" /><Field label="Revenue range" placeholder="Optional" /><Field label="Therapeutic area" value={therapy} /><Field label="Specialty" value="Medical Oncology, Surgical Oncology" /></div><TextArea label="Relevant business characteristics" placeholder="Academic medical center, active clinical research, specialty expansion..." /><details className="advanced"><summary>Advanced Research Criteria <Icon name="chevron" /></summary><div className="form-grid"><Field label="Minimum facilities" placeholder="e.g. 5" /><Field label="Signal recency" value="Last 12 months" /></div></details></div>}
    {step === 4 && <div className="form-stack"><div className="upload-zone"><div className="upload-icon"><Icon name="upload" /></div><h3>Upload supporting documents</h3><p>Drag and drop or browse PDF, DOCX, PPTX, or XLSX files.</p><Button variant="secondary">Browse files</Button><small>Maximum file size: 25 MB</small></div><div className="file-card"><span className="pdf-icon">PDF</span><div><strong>OncoNova_Product_Profile.pdf</strong><small>2.4 MB · Upload complete</small></div><Badge tone="success"><Icon name="check" size={12} /> Ready</Badge><Button variant="icon" icon="close" /></div><TextArea label="Why are these documents being provided?" placeholder="Add optional notes for the research team..." /><div className="info-box neutral"><Icon name="help" /><p>Supporting documents are used as research context and are not automatically treated as verified external evidence.</p></div></div>}
    {step === 5 && <div className="review-grid">{[
      ["Research Purpose", objective, "Sales Objective", "New Customer Acquisition"],
      ["Product", `${product} · HER2-positive breast cancer`, "Therapeutic Area", therapy],
      ["Target Account Type", accountType, "Geography", geography],
      ["Research Criteria", "1,000+ employees · Oncology centers · Active clinical programs", "Documents", "1 supporting document"],
    ].map((r) => <div className="review-card" key={r[0]}><span>{r[0]}</span><strong>{r[1]}</strong><span>{r[2]}</span><strong>{r[3]}</strong></div>)}</div>}
    <div className="wizard-actions"><Button variant="secondary" onClick={() => step === 0 ? setPage("campaigns") : setStep(step - 1)}>{step === 0 ? "Cancel" : "Back"}</Button><span /><Button onClick={() => step === 5 ? handleSave() : setStep(step + 1)}>{step === 5 ? "Save Campaign" : "Continue"} <Icon name="arrow" /></Button></div>
  </Card></div></div>;
}

function Accounts({ setPage }: { setPage: (p: Page) => void }) {
  const rows = [
    ["Oncology Account Discovery", "US Oncology Hospital Expansion", "50", "50", "18", "21", "11", "Oct 04, 2026", "Completed"],
    ["HER2 Provider Research", "HER2 Market Opportunity", "100", "84", "24", "41", "19", "Oct 02, 2026", "Partial Results"],
    ["Specialty Pharmacy Scan", "Specialty Pharmacy Expansion", "75", "—", "—", "—", "—", "Oct 01, 2026", "Running"],
    ["Ontario IDN Discovery", "Canadian Market Expansion", "40", "0", "0", "0", "0", "Sep 28, 2026", "Failed"],
  ];
  return <div className="page"><PageHeader title="Account Intelligence" subtitle="Discover, research and prioritize high-value pharmaceutical accounts."><Button icon="plus" onClick={() => setPage("run-research")}>Add New</Button></PageHeader><div className="module-summary"><div className="module-icon"><Icon name="spark" /></div><div><strong>Intelligence Engine</strong><p>Discover relevant accounts, validate product fit, detect commercial signals and build evidence-backed intelligence reports.</p></div><span><Icon name="shield" /> Evidence-backed</span></div><div className="section-heading"><div><h2>Previous Research</h2><p>Research runs preserve the account discovery and analysis history.</p></div></div><FilterBar placeholder="Search research runs..." /><Card className="table-card"><div className="table-scroll"><table><thead><tr><th>Research run</th><th>Campaign</th><th>Requested</th><th>Found</th><th>High</th><th>Medium</th><th>Low</th><th>Created</th><th>Status</th><th>Action</th></tr></thead><tbody>{rows.map((r) => <tr key={r[0]}><td><button className="table-link" onClick={() => setPage("results")}>{r[0]}</button></td><td>{r[1]}</td><td>{r[2]}</td><td><strong>{r[3]}</strong></td><td className="high-text">{r[4]}</td><td className="amber-text">{r[5]}</td><td>{r[6]}</td><td>{r[7]}</td><td><Badge tone={r[8] === "Completed" ? "success" : r[8] === "Running" ? "blue" : r[8] === "Failed" ? "danger" : "warning"}>{r[8] === "Running" && <span className="mini-spinner" />}{r[8]}</Badge></td><td><Button variant="secondary" onClick={() => setPage(r[8] === "Running" ? "running" : "results")}>{r[8] === "Running" ? "View Progress" : "View Results"}</Button></td></tr>)}</tbody></table></div><div className="table-footer"><span>Showing 4 of 28 research runs</span><div><Button variant="secondary">Previous</Button><Button variant="secondary">Next</Button></div></div></Card></div>;
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
            <strong>OutreachLens_Sutro_Biopharma_Intelligence_Report.pdf</strong>
            <span>Preview Mode · 21 Sections</span>
          </div>
          <div className="pdf-modal-actions">
            <Button variant="secondary" icon="download" onClick={onDownload}>Download PDF / Print</Button>
            <Button variant="icon" icon="close" onClick={onClose} />
          </div>
        </div>
        <div className="pdf-modal-body">
          {/* Sheet 1: Executive Brief & Profile */}
          <div className="pdf-page-sheet">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #0f2b48", paddingBottom: "16px", marginBottom: "20px" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#ea580c", textTransform: "uppercase", letterSpacing: "0.1em" }}>OUTREACHLENS ACCOUNT INTELLIGENCE REPORT</span>
                <h1 style={{ margin: "4px 0 2px", fontSize: "24px" }}>{d.account} ({d.ticker})</h1>
                <p style={{ margin: 0, color: "#64748b", fontSize: "12px" }}>{d.location} · Research date: {d.date}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ background: "#ecfdf5", color: "#065f46", padding: "4px 10px", borderRadius: "20px", fontWeight: "700", fontSize: "12px", border: "1px solid #a7f3d0" }}>DECISION: {d.decision}</span>
                <div style={{ marginTop: "6px", fontSize: "11px", color: "#64748b" }}>Opportunity Score: <strong>65/100 (Medium)</strong></div>
              </div>
            </div>

            <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "8px", padding: "10px 14px", fontSize: "11.5px", color: "#9a3412", marginBottom: "20px" }}>
              <strong>DEMO RUN — ASSUMED SELLER: </strong>{d.demoNotice}
            </div>

            <h2 style={{ fontSize: "16px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px", marginTop: "16px" }}>01. Executive Sales Brief</h2>
            <p><strong>Decision:</strong> {d.decision}. {d.decisionSubtitle}</p>
            <table className="pdf-doc-table">
              <thead><tr><th>Item</th><th>Value</th></tr></thead>
              <tbody>
                <tr><td>Account</td><td>{d.account}</td></tr>
                <tr><td>Account type</td><td>Biotech, clinical-stage oncology (ADC modality). Archetype confidence: High</td></tr>
                <tr><td>Location</td><td>{d.location} [E01][E06]</td></tr>
                <tr><td>Parent / ownership</td><td>Public company, Nasdaq: STRO; incorporated in Delaware in 2003 [E06]</td></tr>
                <tr><td>Opportunity score</td><td>65 / 100, Medium priority (Fit 7.7, Urgency 8.5, Deal 5.4 = 21.6/30)</td></tr>
                <tr><td>Intelligence confidence</td><td>68%, Moderate (Completeness: 76% - 19 of 25 elements)</td></tr>
              </tbody>
            </table>

            <h3 style={{ fontSize: "13px", color: "#0f2b48", marginTop: "14px" }}>Why this account?</h3>
            <ul style={{ margin: "4px 0 12px", paddingLeft: "20px", fontSize: "12px" }}>
              {d.whyThisAccount.map((item, idx) => (
                <li key={idx}><strong>{item.label}:</strong> {item.text}</li>
              ))}
            </ul>

            <h3 style={{ fontSize: "13px", color: "#0f2b48", marginTop: "10px" }}>Why now?</h3>
            <ul style={{ margin: "4px 0 12px", paddingLeft: "20px", fontSize: "12px" }}>
              {d.whyNow.map((item, idx) => (
                <li key={idx}><strong>{item.label}:</strong> {item.text}</li>
              ))}
            </ul>
          </div>

          {/* Sheet 2: Pipeline, Funding & Buying Committee */}
          <div className="pdf-page-sheet">
            <h2 style={{ fontSize: "16px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px" }}>04. Pipeline & Service Fit (A)</h2>
            <table className="pdf-doc-table">
              <thead><tr><th>Program</th><th>Target and design</th><th>Stage (as of 5 Oct 2026)</th><th>Next milestone</th><th>Evidence</th></tr></thead>
              <tbody>
                {d.pipelineTable.map((row, idx) => (
                  <tr key={idx}>
                    <td><strong>{row[0]}</strong></td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                    <td>{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 style={{ fontSize: "16px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px", marginTop: "24px" }}>06. Funding & Runway</h2>
            <p style={{ fontSize: "12px", margin: "4px 0 8px" }}><strong>Company guidance:</strong> Cash was $164.3M at 30 Jun 2026; runway into at least Q2 2028, excluding anticipated partner milestones [E01].</p>
            <table className="pdf-doc-table">
              <thead><tr><th>Date</th><th>Cash, equivalents and marketable securities</th><th>Evidence</th></tr></thead>
              <tbody>
                {d.fundingTable.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row[0]}</td>
                    <td><strong>{row[1]}</strong></td>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 style={{ fontSize: "16px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px", marginTop: "24px" }}>11. Buying Committee</h2>
            <table className="pdf-doc-table">
              <thead><tr><th>Role (AI-assessed)</th><th>Name and title</th><th>Basis</th><th>Confidence</th><th>Influence</th></tr></thead>
              <tbody>
                {d.buyingCommittee.map((row, idx) => (
                  <tr key={idx}>
                    <td><strong>{row.role}</strong></td>
                    <td>{row.name}, {row.title}</td>
                    <td>{row.basis}</td>
                    <td>{row.confidence}</td>
                    <td>{row.influence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sheet 3: Outreach Messages, Evidence Ledger & Scoring */}
          <div className="pdf-page-sheet">
            <h2 style={{ fontSize: "16px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px" }}>18. Outreach Messages</h2>
            {d.outreachMessages.slice(0, 2).map((msg, idx) => (
              <div key={idx} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "12px", marginBottom: "12px", fontSize: "12px" }}>
                <strong style={{ color: "#0f2b48" }}>{msg.title}</strong>
                <div style={{ color: "#64748b", margin: "3px 0 6px" }}>Subject: {msg.subject}</div>
                <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", margin: 0, color: "#334155" }}>{msg.body}</pre>
              </div>
            ))}

            <h2 style={{ fontSize: "16px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px", marginTop: "20px" }}>20. Evidence & Source Ledger (E01–E21)</h2>
            <table className="pdf-doc-table" style={{ fontSize: "11px" }}>
              <thead><tr><th>ID</th><th>Claim</th><th>Source</th><th>Type</th><th>Confidence</th></tr></thead>
              <tbody>
                {sutroEvidenceLedger.slice(0, 8).map((ev) => (
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
            <p style={{ fontSize: "11px", color: "#64748b", margin: "4px 0 0" }}>+ 13 more verified evidence records (E09 to E21) available in full digital report.</p>

            <h2 style={{ fontSize: "16px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px", marginTop: "20px" }}>21. Scoring & Methodology (100 Points)</h2>
            <table className="pdf-doc-table" style={{ fontSize: "11.5px" }}>
              <thead><tr><th>Dimension</th><th>Score</th><th>Reason</th><th>Confidence</th></tr></thead>
              <tbody>
                {d.scoringBreakdown.map((row, idx) => (
                  <tr key={idx}>
                    <td><strong>{row[0]}</strong></td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Report({ setPage }: { setPage: (p: Page) => void }) {
  const [activeEvidence, setActiveEvidence] = useState<EvidenceItem | null>(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
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
    document.title = "Sutro_Biopharma_Account_Intelligence_Report_OutreachLens";
    notify("Opening Save as PDF / Print preview dialog...");
    setTimeout(() => {
      window.print();
      document.title = prevTitle;
    }, 150);
  };

  const d = sutroAccountData;

  return <div className="report-page"><div className="report-crumbs"><button onClick={() => setPage("results")}>Account Results</button><Icon name="arrow" size={13} /><span>{d.account}</span></div>
    <header className="report-hero">
      <div className="report-title-row">
        <div className="account-logo" style={{ background: "var(--navy-950)", color: "white", fontSize: "16px", fontWeight: "700" }}>STRO</div>
        <div>
          <span className="report-kicker">ACCOUNT INTELLIGENCE REPORT • LIFE SCIENCES</span>
          <h1>{d.account} <small style={{ fontSize: "16px", color: "var(--slate-500)", fontWeight: "500" }}>({d.ticker})</small></h1>
          <p>
            <a href="https://www.sutrobio.com" target="_blank" rel="noreferrer">sutrobio.com <Icon name="external" size={12} /></a>
            <span>{d.location}</span>
            <span>Biotech (ADC Oncology)</span>
            <span>Research date: {d.date}</span>
          </p>
        </div>
        <div className="report-actions">
          <Button variant="secondary" icon="eye" onClick={() => setShowPdfPreview(true)}>PDF Preview</Button>
          <Button variant="secondary" icon="download" onClick={handleDownloadPDF}>Download PDF</Button>
          <Button variant="secondary" icon="print" onClick={handleDownloadPDF}>Print</Button>
          <Button variant="secondary" icon="share" onClick={() => notify("Report link copied to clipboard")}>Share</Button>
          <Button icon="refresh" onClick={() => notify("Refreshing live account intelligence...")}>Refresh</Button>
        </div>
      </div>

      <div className="report-meta-grid">
        <div><span>Decision</span><Badge tone="warning">{d.decision}</Badge></div>
        <div><span>Opportunity Score</span><strong>{d.scores.opportunityScore} <small>/ 100</small></strong></div>
        <div><span>Intelligence Confidence</span><strong>{d.scores.confidence}% <small>(Moderate)</small></strong></div>
        <div><span>Research Completeness</span><strong>{d.scores.completeness}% <small>({d.scores.completenessCount})</small></strong></div>
        <div><span>Compact Score View</span><strong>Fit {d.scores.fitScore} · Urg {d.scores.urgencyScore} · Deal {d.scores.dealScore} = {d.scores.totalCompact}/30</strong></div>
      </div>

      <div style={{ marginTop: "12px", padding: "10px 14px", background: "var(--orange-50)", border: "1px solid #fed7aa", borderRadius: "8px", fontSize: "12.5px", color: "#9a3412" }}>
        <strong>DEMO RUN — ASSUMED SELLER: </strong>{d.demoNotice}
      </div>

      <div className="report-legend" style={{ marginTop: "12px" }}>
        <span><i className="verified-dot" /> VF = Verified fact</span>
        <span><i className="ai-dot" /> DI = Derived insight</span>
        <span><i className="hypothesis-dot" /> SH = Sales hypothesis</span>
        <span><Badge tone="success" style={{ padding: "1px 6px" }}>REC</Badge> Recommendation</span>
        <span><Badge tone="neutral" style={{ padding: "1px 6px" }}>UV</Badge> Unverified</span>
        <span><Icon name="shield" size={14} /> 21 re-checkable sources [E01–E21]</span>
      </div>
    </header>

    <div className="report-layout">
      <aside className="report-nav">
        <span>REPORT CONTENTS</span>
        {reportNav.map((x, i) => <a href={`#section-${i + 1}`} key={x}><b>{String(i + 1).padStart(2, "0")}</b>{x.replace(/^\d+\.\s*/, "")}</a>)}
      </aside>

      <main className="report-content">
        {/* 01. Executive Sales Brief */}
        <ReportSection n={1} title="Executive Sales Brief" subtitle="Decision: PURSUE WITH VALIDATION. Several time-sensitive triggers are public and funded.">
          <div className="executive-grid">
            <div className="exec-card verified">
              <span>WHY THIS ACCOUNT?</span>
              <p>Three programs are moving into or toward the clinic at once (STRO-004 Phase 1, STRO-006 Phase 1 entry, STRO-227 IND), with funding into at least Q2 2028. Manufacturing fully outsourced.</p>
              <small>VERIFIED FACT · <Evidence id="E01" onClick={handleEvidenceClick} /> <Evidence id="E03" onClick={handleEvidenceClick} /> <Evidence id="E07" onClick={handleEvidenceClick} /></small>
            </div>
            <div className="exec-card verified">
              <span>WHY NOW?</span>
              <p>STRO-006 first-in-human start was guided for Q3 2026. STRO-227 IND filing guided for later in 2026 with CMC underway. STRO-004 is actively in dose optimization (4–5 mg/kg).</p>
              <small>VERIFIED FACT · <Evidence id="E01" onClick={handleEvidenceClick} /> <Evidence id="E02" onClick={handleEvidenceClick} /></small>
            </div>
            <div className="exec-card ai">
              <span>WHY WE COULD WIN</span>
              <p>Parallel programs create concurrent start-up and CMC workload for a lean team after ~50% restructuring. 10-K explicitly relies on third-party CROs and CDMOs.</p>
              <small>DERIVED INSIGHT · <Evidence id="E07" onClick={handleEvidenceClick} /> <Evidence id="E08" onClick={handleEvidenceClick} /></small>
            </div>
            <div className="exec-card hypothesis">
              <span>WHY WE COULD LOSE</span>
              <p>Incumbent CRO/CDMO vendor relationships are unknown. Cost discipline after two restructurings; quarterly revenue dropped following partner exit.</p>
              <small>SALES HYPOTHESIS & UNVERIFIED · <Evidence id="E15" onClick={handleEvidenceClick} /> <Evidence id="E16" onClick={handleEvidenceClick} /></small>
            </div>
            <div className="exec-card recommendation">
              <span>RECOMMENDED NEXT ACTION</span>
              <p>{d.recommendedAction}</p>
              <small>RECOMMENDATION · <Evidence id="E01" onClick={handleEvidenceClick} /> <Evidence id="E14" onClick={handleEvidenceClick} /></small>
            </div>
          </div>
        </ReportSection>

        {/* 02. Account Profile */}
        <ReportSection n={2} title="Account Profile" subtitle="Public corporate details, clinical modality, revenue and facility structure.">
          <div className="table-scroll">
            <table>
              <thead><tr><th>Field</th><th>Value</th><th>Evidence</th></tr></thead>
              <tbody>
                {d.accountProfileTable.map((r, i) => (
                  <tr key={i}>
                    <td><strong>{r[0]}</strong></td>
                    <td>{r[1]}</td>
                    <td>{r[2] !== "—" ? <Evidence id={r[2].replace(/[\[\]]/g, "")} onClick={handleEvidenceClick} /> : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ReportSection>

        {/* 03. Customer / ICP Fit */}
        <ReportSection n={3} title="Customer / ICP Fit" subtitle="Score: 13 / 15. Clinical-stage oncology biotech with outsourced manufacturing.">
          <div className="table-scroll">
            <table>
              <thead><tr><th>Dimension</th><th>Assessment</th><th>Reason</th><th>Evidence</th><th>Confidence</th><th>Gap</th></tr></thead>
              <tbody>
                {d.icpFitTable.map((r, i) => (
                  <tr key={i}>
                    <td><strong>{r[0]}</strong></td>
                    <td><Badge tone={r[1] === "High" ? "success" : "warning"}>{r[1]}</Badge></td>
                    <td>{r[2]}</td>
                    <td><Evidence id={r[3].replace(/[\[\]]/g, "")} onClick={handleEvidenceClick} /></td>
                    <td><Badge tone="blue">{r[4]}</Badge></td>
                    <td>{r[5]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ReportSection>

        {/* 04. Pipeline & Service Fit */}
        <ReportSection n={4} title="Pipeline & Service Fit (A)" subtitle="Score: 10 / 15. Provisional because seller is assumed as an early-phase oncology CRO/CMC partner.">
          <div className="table-scroll">
            <table>
              <thead><tr><th>Program</th><th>Target and design</th><th>Stage (as of 5 Oct 2026)</th><th>Next milestone</th><th>Evidence</th></tr></thead>
              <tbody>
                {d.pipelineTable.map((r, i) => (
                  <tr key={i}>
                    <td><strong>{r[0]}</strong></td>
                    <td>{r[1]}</td>
                    <td><Badge tone="blue">{r[2]}</Badge></td>
                    <td>{r[3]}</td>
                    <td><Evidence id={r[4].replace(/[\[\]]/g, "").split("][")[0]} onClick={handleEvidenceClick} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="product-fit-callout" style={{ marginTop: "14px" }}>
            <Badge tone="warning">Service-fit assessment (A)</Badge>
            <p><strong>Three live workloads visible from public evidence:</strong> Site & CRO start-up for STRO-006 first-in-human; CMC and analytical support for exatecan DAR8 ADCs + IND work on STRO-227; Possible expansion of STRO-004 after dose selection.</p>
          </div>
        </ReportSection>

        {/* 05. Clinical / Pipeline Intelligence */}
        <ReportSection n={5} title="Clinical / Pipeline Intelligence" subtitle="Trial NCT07227168 (STRIVE-01) details and preclinical disclosures.">
          <div className="table-scroll">
            <table>
              <thead><tr><th>Signal</th><th>Date</th><th>Evidence</th><th>Confidence</th><th>Implication</th></tr></thead>
              <tbody>
                {d.clinicalSignals.map((r, i) => (
                  <tr key={i}>
                    <td><strong>{r[0]}</strong></td>
                    <td>{r[1]}</td>
                    <td><Evidence id={r[2].replace(/[\[\]]/g, "").split("][")[0]} onClick={handleEvidenceClick} /></td>
                    <td><Badge tone={r[3].includes("High") ? "success" : "warning"}>{r[3]}</Badge></td>
                    <td>{r[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ReportSection>

        {/* 06. Funding & Runway */}
        <ReportSection n={6} title="Funding & Runway" subtitle="Spending capacity: $164.3M cash as of 30 Jun 2026 with runway into at least Q2 2028.">
          <div className="table-scroll">
            <table>
              <thead><tr><th>Date</th><th>Cash, equivalents and marketable securities</th><th>Evidence</th></tr></thead>
              <tbody>
                {d.fundingTable.map((r, i) => (
                  <tr key={i}>
                    <td>{r[0]}</td>
                    <td><strong>{r[1]}</strong></td>
                    <td><Evidence id={r[2].replace(/[\[\]]/g, "")} onClick={handleEvidenceClick} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: "12px", color: "var(--slate-500)", marginTop: "8px" }}>Note: Milestones from Astellas ($10M + $7.5M triggered) provide non-dilutive upside. Spending capacity is a demand indicator, not a buying signal.</p>
        </ReportSection>

        {/* 07. Demand & Buying Intent */}
        <ReportSection n={7} title="Demand & Buying Intent" subtitle="Demand signals are strong, but no public RFP or verified vendor search exists.">
          <div className="two-col">
            <SignalList title="Demand Signals (Strong)" items={["STRO-006 first-in-human guided for Q3 2026 — Start-up work due now", "STRO-227 IND filing in late 2026 — IND-enabling & CMC demand", "STRO-004 dose optimization in progress — Potential expansion cohorts", "Funded $110M raise & $164.3M cash — Financial capacity to spend"]} />
            <SignalList title="Buying Signals (None Verified)" items={["RFP or CDMO tender — Not found in public sources", "New CRO vendor announcement — Not found for current programs", "Procurement leadership change — Not retrieved", "Reliance on outsourced CROs/CDMOs — Stated in 10-K risk factor"]} />
          </div>
        </ReportSection>

        {/* 08. Market & Competitive Intelligence */}
        <ReportSection n={8} title="Market & Competitive Intelligence" subtitle="TF-targeted ADC landscape (Adcendo ADCE-T02, Lepu, Evopoint) and CDMO history.">
          <div className="section-callout warning">
            <Icon name="help" />
            <p><strong>Incumbent vendor relationships unknown:</strong> Boehringer Ingelheim scaled luvelta at 4,500L in Vienna historically [E16], but luvelta is closed. Current vendors for STRO-004/006/227 are unverified.</p>
          </div>
          <div className="table-scroll">
            <table>
              <thead><tr><th>Competitor / Target</th><th>Modality / Stage</th><th>Account Evidence</th><th>Market Context</th></tr></thead>
              <tbody>
                <tr><td><strong>Adcendo (ADCE-T02)</strong></td><td>Tissue Factor ADC, Phase 1 (NCT06597721)</td><td><Evidence id="E19" onClick={handleEvidenceClick} /></td><td>Recruiting since Nov 2024; active competition in TF space</td></tr>
                <tr><td><strong>Lepu / Evopoint</strong></td><td>TF ADCs in development</td><td><Evidence id="E18" onClick={handleEvidenceClick} /></td><td>Crowded target accelerates need for Sutro speed & clean CMC</td></tr>
                <tr><td><strong>Incumbent CRO / CDMO</strong></td><td>Unknown for active clinical assets</td><td><Evidence id="E08" onClick={handleEvidenceClick} /></td><td>Outsourced model confirmed, specific partners unverified</td></tr>
              </tbody>
            </table>
          </div>
        </ReportSection>

        {/* 09. Regulatory, Manufacturing & Supply */}
        <ReportSection n={9} title="Regulatory, Manufacturing & Supply" subtitle="Replaces Access & Reimbursement (points reassigned to funding & regulatory readiness).">
          <div className="status-grid">
            {[
              ["Approved Products", "None", "Clinical-stage biotech [E01]"],
              ["IND Status", "Verified", "STRO-004 cleared; STRO-006/227 guided for 2026 [E12][E01]"],
              ["Manufacturing Model", "Verified", "San Carlos GMP closed; 100% outsourced to CDMOs [E07][E08]"],
              ["Named CDMO (Current)", "Unverified", "Historical Boehringer Ingelheim for luvelta only [E16]"],
              ["Canada / Reimbursement", "Not Applicable", "Pre-approval clinical stage"],
              ["Patents / USPTO", "Unchecked", "USPTO not queried in this run"]
            ].map((x) => (
              <div key={x[0]}>
                <span>{x[0]}</span>
                <Badge tone={x[1] === "Verified" ? "success" : x[1] === "None" ? "neutral" : "warning"}>{x[1]}</Badge>
                <p>{x[2]}</p>
              </div>
            ))}
          </div>
        </ReportSection>

        {/* 10. Procurement / Vendor Intelligence */}
        <ReportSection n={10} title="Procurement / Vendor Intelligence" subtitle="Vendor selection pathway, cost commitments and alliance leadership.">
          <div className="procure-summary">
            <div><span>Vendor Model</span><strong>Fully outsourced CROs & CMOs</strong><Badge tone="success">Verified fact [E08]</Badge></div>
            <div><span>Vendor Commitments</span><strong>Active commitments to third-party CROs/CMOs</strong><Badge tone="blue">Historical [E17]</Badge></div>
            <div><span>Alliance Function</span><strong>Portfolio Strategy & Strategic CMO Alliances</strong><Badge tone="warning">Directory [E21]</Badge></div>
          </div>
        </ReportSection>

        {/* 11. Buying Committee */}
        <ReportSection n={11} title="Buying Committee" subtitle="Key executive officers identified from SEC proxy filings [E14] and releases.">
          <div className="table-scroll">
            <table>
              <thead><tr><th>Role (AI-assessed)</th><th>Name and title</th><th>Basis</th><th>Confidence</th><th>Influence</th></tr></thead>
              <tbody>
                {d.buyingCommittee.map((m, i) => (
                  <tr key={i}>
                    <td><strong>{m.role}</strong></td>
                    <td>{m.name} — <em>{m.title}</em></td>
                    <td>{m.basis}</td>
                    <td><Badge tone={m.confidence === "High" ? "success" : m.confidence === "Good" ? "blue" : "warning"}>{m.confidence}</Badge></td>
                    <td><strong>{m.influence}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ReportSection>

        {/* 12. Commercial Opportunity */}
        <ReportSection n={12} title="Commercial Opportunity (A)" subtitle="Moderate potential. Several concurrent programs with funded runway ($164.3M). Score: 8 / 15.">
          <div className="commercial-hero">
            <div><span>OPPORTUNITY TYPE</span><strong>New Vendor Relationship · Early-Phase CRO/CMC</strong></div>
            <div><span>COMMERCIAL POTENTIAL</span><Badge tone="warning">MODERATE (SCORE 8 / 15)</Badge></div>
          </div>
          <div className="indicator-grid">
            {["Parallel pipeline programs [E01]", "Outsourced manufacturing [E08]", "Funded runway to Q2 2028 [E01]", "STRO-006 start-up timing", "STRO-227 IND CMC demands", "Incumbent vendor contracts", "Vendor spend budget"].map((x, i) => (
              <div key={x}>
                <span>{i < 5 ? <Icon name="check" /> : "?"}</span>
                <strong>{x}</strong>
                <small>{i < 5 ? "Positive indicator" : "Requires discovery"}</small>
              </div>
            ))}
          </div>
        </ReportSection>

        {/* 13. White Space */}
        <ReportSection n={13} title="White Space" subtitle="Potential entry opportunities based on pipeline milestones and lean organizational structure.">
          <div className="white-space-map">
            <div>
              <span>CURRENT OBSERVATION</span>
              <h3>US-only STRIVE-01 & Outsourced CDMO</h3>
              <p>Internal manufacturing decommissioned; lean team executing parallel trials [E07][E10].</p>
              <Badge>Internal vendor data unavailable</Badge>
            </div>
            <Icon name="arrow" size={24} />
            <div>
              <span>POTENTIAL WHITE SPACE</span>
              <h3>STRO-006 Start-up & STRO-227 CMC</h3>
              <p>Specialist support for analytical testing, IND-enabling packages, and trial site activation.</p>
              <Badge tone="orange">Sales hypothesis</Badge>
            </div>
          </div>
        </ReportSection>

        {/* 14. Risks & Deal Blockers */}
        <ReportSection n={14} title="Risks & Deal Blockers" subtitle="7 identified risks, severity assessments and suggested validation steps.">
          <div className="risk-table">
            {d.risks.map((r, i) => (
              <div key={i}>
                <div>
                  <Badge tone={r[1].includes("High") ? "danger" : r[1].includes("Medium") ? "warning" : "neutral"}>{r[1]}</Badge>
                  <strong>{r[0]}</strong>
                </div>
                <p><span>Evidence:</span> {r[2]}</p>
                <p><span>Impact:</span> {r[3]}</p>
                <p><span>Mitigation:</span> {r[4]}</p>
              </div>
            ))}
          </div>
        </ReportSection>

        {/* 15. Account Timeline */}
        <ReportSection n={15} title="Account Timeline" subtitle="Chronology of corporate restructuring, clinical milestones and financing events.">
          <div className="timeline">
            {d.timeline.map((item, i) => (
              <div className={item.highlight ? "highlight" : ""} key={i}>
                <span className="timeline-dot" />
                <time>{item.date}</time>
                <div>
                  <Badge tone={item.highlight ? "orange" : "neutral"}>{item.type}</Badge>
                  <h3>{item.event}</h3>
                  <p>Evidence: <Evidence id={item.evidence.replace(/[\[\]]/g, "").split("][")[0]} onClick={handleEvidenceClick} /> · Confidence: {item.confidence}</p>
                </div>
              </div>
            ))}
          </div>
        </ReportSection>

        {/* 16. Sales Strategy */}
        <ReportSection n={16} title="Sales Strategy" subtitle="Recommended entry points: CTO (CMC angle) and CMO (Clinical Ops angle).">
          <div className="strategy-card">
            <div className="strategy-main">
              <span>RECOMMENDED VALUE PROPOSITION (CONDITIONAL)</span>
              <h3>Help a lean team execute STRO-006 & STRO-227 faster with predictable timelines.</h3>
              <p>Make no unsupported claims regarding Sutro drug quality or arbitrary cost savings. Lead with lean team operational bandwidth.</p>
              <div className="strategy-people">
                <div><span>Primary Entry (CMC)</span><strong>Venkatesh Srinivasan (CTO)</strong></div>
                <div><span>Primary Entry (Clin Ops)</span><strong>Anne Borgman, MD (CMO)</strong></div>
                <div><span>Secondary Stakeholder</span><strong>Greg Chow (CFO)</strong></div>
              </div>
            </div>
          </div>
          <div className="strategy-columns" style={{ marginTop: "14px" }}>
            <div>
              <h3>Key Talking Points</h3>
              <ul>
                <li>Three parallel programs moving to clinic in short window [E01][E03]</li>
                <li>Lean team execution: how internal vs vendor work is divided [E07]</li>
                <li>Externalized manufacturing: capacity & analytical support bottlenecks [E08]</li>
                <li>Dose optimization at STRO-004 and future expansion cohorts [E02]</li>
              </ul>
            </div>
            <div>
              <h3>Discovery Questions</h3>
              <ul>
                <li>How are CROs/CDMOs selected for new programs, and who signs off?</li>
                <li>Is STRO-006 start-up already staffed, and what gaps remain?</li>
                <li>What is the plan for STRO-227 CMC and IND-enabling work?</li>
                <li>Where does the team feel stretched following the restructuring?</li>
              </ul>
            </div>
            <div>
              <h3>Anticipated Objections</h3>
              <ul>
                <li>"We already have vendors in place." → Ask which phases remain open.</li>
                <li>"Budget is tight after restructuring." → Emphasize milestone predictability.</li>
                <li>"We prefer vendor consolidation." → Validate current supplier scope.</li>
              </ul>
            </div>
          </div>
        </ReportSection>

        {/* 17. Next Best Action */}
        <ReportSection n={17} title="Next Best Action" subtitle="Primary: Confirm STRO-006 first patient dosed, then send tailored outreach to CTO & CMO.">
          <div className="nba-card">
            <div className="nba-icon"><Icon name="arrow" size={24} /></div>
            <div>
              <span>NEXT BEST ACTION (NBA)</span>
              <h2>Confirm STRO-006 status, then message Chief Technical Officer & Chief Medical Officer.</h2>
              <p>Start-up and IND triggers are active in Q4 2026. Target discovery call to reveal vendor decision owners and open gaps.</p>
              <div className="nba-meta">
                <span><small>Confidence</small><strong>Medium</strong></span>
                <span><small>Evidence</small><Evidence id="E01" onClick={handleEvidenceClick} /> <Evidence id="E03" onClick={handleEvidenceClick} /> <Evidence id="E14" onClick={handleEvidenceClick} /></span>
              </div>
            </div>
          </div>
          <ol className="action-steps" style={{ marginTop: "14px" }}>
            {[
              "Check ClinicalTrials.gov & PRs to confirm if STRO-006 has dosed its first patient.",
              "Send short tailored CMC email to CTO Venkatesh Srinivasan.",
              "Send clinical ops introduction email to CMO Dr. Anne Borgman.",
              "Pull NCT07227168 trial record for site and investigator details.",
              "Monitor Q3 2026 financial release for updated cash burn and timeline guidance."
            ].map((x, i) => <li key={i}><span>{i + 1}</span>{x}</li>)}
          </ol>
        </ReportSection>

        {/* 18. Outreach Messages */}
        <ReportSection n={18} title="Outreach Messages" subtitle="Custom human-reviewed drafts grounded strictly in public research (no invented data).">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {d.outreachMessages.map((msg, i) => (
              <div key={i} className="card" style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <strong style={{ color: "var(--navy-950)", fontSize: "14px" }}>{msg.title}</strong>
                  <Button variant="secondary" icon="share" onClick={() => { navigator.clipboard?.writeText(msg.body); notify("Draft copied to clipboard"); }}>Copy text</Button>
                </div>
                <div style={{ fontSize: "12px", color: "var(--slate-500)", marginBottom: "8px" }}>
                  <span>Recipient: <strong>{msg.recipient}</strong></span> · <span>Subject: <strong>{msg.subject}</strong></span>
                </div>
                <pre style={{ background: "var(--slate-50)", border: "1px solid var(--slate-200)", padding: "14px", borderRadius: "8px", fontSize: "12.5px", whiteSpace: "pre-wrap", fontFamily: "inherit", color: "var(--navy-950)", margin: 0 }}>
                  {msg.body}
                </pre>
              </div>
            ))}
          </div>
        </ReportSection>

        {/* 19. Research Gaps */}
        <ReportSection n={19} title="Research Gaps" subtitle="9 verified gaps to resolve during discovery or follow-up intelligence scans.">
          <div className="gap-grid">
            {d.researchGaps.map((g, i) => (
              <div key={i}>
                <span>?</span>
                <div>
                  <strong>{g[1]}</strong>
                  <p>Category: {g[0]} · Action: {g[3]}</p>
                </div>
                <Badge tone={g[4] === "High" ? "danger" : "warning"}>{g[4]} Priority</Badge>
              </div>
            ))}
          </div>
        </ReportSection>

        {/* 20. Evidence & Source Ledger */}
        <ReportSection n={20} title="Evidence & Source Ledger" subtitle="Traceable ledger of all 21 sources [E01 to E21] retrieved 5 Oct 2026.">
          <div className="ledger-summary">
            <div><strong>21</strong><span>Total citations</span></div>
            <div><strong>8</strong><span>SEC filings</span></div>
            <div><strong>68%</strong><span>Avg confidence</span></div>
            <div><strong>5 Oct 2026</strong><span>Research date</span></div>
          </div>
          <div className="table-scroll">
            <table>
              <thead><tr><th>ID</th><th>Claim</th><th>Source</th><th>Type</th><th>Published</th><th>Confidence</th><th>Action</th></tr></thead>
              <tbody>
                {sutroEvidenceLedger.map((ev) => (
                  <tr key={ev.id}>
                    <td><button className="evidence-marker" onClick={() => setActiveEvidence(ev)}>[{ev.id}]</button></td>
                    <td>{ev.claim}</td>
                    <td>{ev.source}</td>
                    <td><Badge tone="blue">{ev.type}</Badge></td>
                    <td>{ev.published}</td>
                    <td><Badge tone={ev.confidence.includes("High") ? "success" : ev.confidence.includes("Good") ? "blue" : "warning"}>{ev.confidence}</Badge></td>
                    <td>
                      <a href={ev.url} target="_blank" rel="noreferrer" className="btn btn-icon" title="Open source URL">
                        <Icon name="external" size={14} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ReportSection>

        {/* 21. Methodology / Trust */}
        <ReportSection n={21} title="Methodology / Trust" subtitle="100-Point Scoring Model adapted for clinical-stage biotechnology.">
          <div className="table-scroll">
            <table>
              <thead><tr><th>Dimension</th><th>Score</th><th>Reason</th><th>Confidence</th></tr></thead>
              <tbody>
                {d.scoringBreakdown.map((row, i) => (
                  <tr key={i} style={i === d.scoringBreakdown.length - 1 ? { fontWeight: "bold", background: "var(--slate-50)" } : {}}>
                    <td>{row[0]}</td>
                    <td><strong>{row[1]}</strong></td>
                    <td>{row[2]}</td>
                    <td><Badge tone={row[3].includes("High") ? "success" : row[3].includes("Moderate") ? "blue" : "warning"}>{row[3]}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="method-copy" style={{ marginTop: "16px" }}>
            <div>
              <strong>Compliance & Claim Controls</strong>
              <p>• No invented contacts, emails, vendors or revenue.<br />• Company statements labeled as company claims.<br />• Funding & trial starts treated as demand signals, never buying intent.<br />• Unknown values never replaced with plausible text.</p>
            </div>
            <div>
              <strong>Research Completeness (76%)</strong>
              <p>14 elements complete (including access & reimbursement as N/A), 10 partial, 1 not researched (white space CRM data).</p>
            </div>
            <div>
              <strong>Confidence Assessment (68%)</strong>
              <p>Strong source authority for pipeline and SEC filings, reduced by assumed seller, unknown incumbent vendors, and unverified STRO-006 dosing start.</p>
            </div>
          </div>
        </ReportSection>
      </main>
    </div>

    {/* PDF Preview Modal */}
    {showPdfPreview && <PdfPreviewModal onClose={() => setShowPdfPreview(false)} onDownload={handleDownloadPDF} />}

    {/* Evidence Detail Drawer */}
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
          <blockquote style={{ margin: "14px 0", fontSize: "13px", fontStyle: "italic", borderLeft: "3px solid var(--orange-500)", paddingLeft: "12px", color: "var(--slate-700)" }}>
            “{activeEvidence.claim}”
          </blockquote>
          <div className="source-fields">
            <div><span>Source</span><strong>{activeEvidence.source}</strong></div>
            <div><span>Source type</span><strong>{activeEvidence.type}</strong></div>
            <div><span>Published</span><strong>{activeEvidence.published}</strong></div>
            <div><span>Retrieved</span><strong>{activeEvidence.retrieved}</strong></div>
            <div><span>Verification Status</span><strong>{activeEvidence.verification}</strong></div>
          </div>
          <Button className="full-width" icon="external" onClick={() => window.open(activeEvidence.url, "_blank")}>
            Open official source link
          </Button>
          <div className="source-method" style={{ marginTop: "14px" }}>
            <Icon name="shield" />
            <p><strong>Traceability Guarantee:</strong> Official government SEC filings and company releases provide primary evidence for this claim.</p>
          </div>
        </aside>
      </>
    )}

    {toast && <div className="toast"><Icon name="check" />{toast}</div>}
  </div>;
}

function SignalList({ title, items }: { title: string; items: string[] }) { 
  return <div className="signal-list"><h3>{title}</h3>{items.map((x, i) => <div key={x}><span className={i < 2 ? "positive" : "unknown"}>{i < 2 ? <Icon name="trend" /> : "?"}</span><p><strong>{x.split(" — ")[0]}</strong><small>{x.split(" — ")[1]}</small></p><Evidence id={`E0${i + 1}`} /></div>)}</div>; 
}

function Settings() {
  return <div className="page"><PageHeader title="Settings" subtitle="Manage your profile, workspace and intelligence preferences."><Button>Save changes</Button></PageHeader><div className="settings-layout"><aside>{["Profile", "Workspace", "Research Preferences", "Source Preferences", "Notification Preferences", "Security", "Data & Privacy"].map((x, i) => <button className={i === 3 ? "active" : ""} key={x}>{x}</button>)}</aside><Card className="settings-card"><div className="card-heading"><div><h2>Source Preferences</h2><p>Configure how the Intelligence Engine prioritizes sources during research.</p></div></div><div className="info-box"><Icon name="shield" /><p><strong>Source authority matters</strong>Higher-priority sources are used first for verification. Signals from lower-priority sources should be corroborated.</p></div><div className="source-order"><span>PRIORITY ORDER</span>{["Government / Regulatory", "Official Company", "Clinical", "Professional", "Financial", "Industry", "Social"].map((x, i) => <div key={x}><b>{i + 1}</b><Icon name={i < 3 ? "shield" : "briefcase"} /><div><strong>{x}</strong><small>{i < 3 ? "Primary authority for verification" : i < 5 ? "Supporting professional evidence" : "Signal source — corroboration preferred"}</small></div><Badge tone={i < 3 ? "success" : i < 5 ? "blue" : "warning"}>{i < 3 ? "Highest" : i < 5 ? "Standard" : "Signal only"}</Badge><Icon name="menu" /></div>)}</div><div className="settings-options"><label><span><strong>Require primary-source corroboration</strong><small>Flag material insights not supported by a primary source.</small></span><input type="checkbox" defaultChecked /><i /></label><label><span><strong>Show social signals</strong><small>Allow qualified social sources as non-authoritative signals.</small></span><input type="checkbox" /><i /></label></div></Card></div></div>;
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");
  const [campaigns, setCampaigns] = useState<string[][]>(campaignRows);
  const [campaignSuccess, setCampaignSuccess] = useState<string | null>(null);

  const handleSaveCampaign = (newCamp: string[]) => {
    setCampaigns((prev) => [newCamp, ...prev]);
    setCampaignSuccess(`"${newCamp[0]}" has been saved and added to your campaigns list.`);
    setPage("campaigns");
  };

  if (!authenticated) return <Login onLogin={() => setAuthenticated(true)} />;
  let content: ReactNode;
  if (page === "dashboard") content = <Dashboard setPage={setPage} />;
  else if (page === "campaigns") content = <Campaigns setPage={setPage} campaigns={campaigns} successMessage={campaignSuccess} onClearSuccess={() => setCampaignSuccess(null)} />;
  else if (page === "create-campaign") content = <CreateCampaign setPage={setPage} onSave={handleSaveCampaign} />;
  else if (page === "accounts") content = <Accounts setPage={setPage} />;
  else if (page === "run-research") content = <RunResearch setPage={setPage} />;
  else if (page === "running") content = <Running setPage={setPage} />;
  else if (page === "results") content = <Results setPage={setPage} />;
  else if (page === "report") content = <Report setPage={setPage} />;
  else content = <Settings />;
  if (page === "running") return content;
  return <AppShell page={page} setPage={setPage} onSignOut={() => { setAuthenticated(false); setPage("dashboard"); }}>{content}</AppShell>;
}
