export interface EvidenceItem {
  id: string;
  claim: string;
  source: string;
  type: string;
  published: string;
  retrieved: string;
  confidence: string;
  verification: string;
  url: string;
}

export const sutroEvidenceLedger: EvidenceItem[] = [
  {
    id: "E01",
    claim: "Q2 2026: cash $164.3M at 30 Jun; runway into at least Q2 2028; STRO-006 on track for clinic in Q3 2026; STRO-227 IND later in 2026",
    source: "Sutro 8-K Exhibit 99.1",
    type: "Government (SEC)",
    published: "2026-08-12",
    retrieved: "2026-10-05",
    confidence: "High",
    verification: "Verified",
    url: "https://www.sec.gov/Archives/edgar/data/0001382101/000119312526345733/stro-ex99_1.htm"
  },
  {
    id: "E02",
    claim: "STRO-004 early activity, enrollment in 7 months, dose optimization at 4-5 mg/kg, second Astellas iADC in clinic 2H 2026, company comparison claims",
    source: "Sutro Q2 2026 press release (Yahoo Finance copy)",
    type: "Primary account",
    published: "2026-08-12",
    retrieved: "2026-10-05",
    confidence: "High (company statements)",
    verification: "Verified",
    url: "https://finance.yahoo.com/healthcare/articles/sutro-biopharma-reports-second-quarter-110000778.html"
  },
  {
    id: "E03",
    claim: "Q2 2026 corporate presentation: STRO-006 Phase 1 expected 3Q 2026; STRO-227 IND 2026; preclinical data",
    source: "Sutro 8-K Exhibit 99.2",
    type: "Government (SEC)",
    published: "2026-08",
    retrieved: "2026-10-05",
    confidence: "High",
    verification: "Verified",
    url: "https://www.sec.gov/Archives/edgar/data/1382101/000119312526345733/stro-ex99_2.htm"
  },
  {
    id: "E04",
    claim: "Q1 2026: cash $202.6M at 31 Mar; $110.0M offering at $13.98; luvelta closed; runway to Q2 2028",
    source: "Sutro 8-K Exhibit 99.1",
    type: "Government (SEC)",
    published: "2026-05",
    retrieved: "2026-10-05",
    confidence: "High",
    verification: "Verified",
    url: "https://www.sec.gov/Archives/edgar/data/0001382101/000119312526224065/stro-ex99_1.htm"
  },
  {
    id: "E05",
    claim: "Cash $141.4M at 31 Dec 2025; Astellas TROP2 iADC in clinic ($10M milestone); second program in IND-enabling tox ($7.5M)",
    source: "Sutro 8-K Exhibit 99.1 (FY2025 results)",
    type: "Government (SEC)",
    published: "2026-03-23",
    retrieved: "2026-10-05",
    confidence: "High",
    verification: "Verified",
    url: "https://ir.sutrobio.com/financials/sec-filings/content/0001193125-26-119844/stro-ex99_1.htm"
  },
  {
    id: "E06",
    claim: "STRO-006 and STRO-227 plans; CMC for STRO-227 started; incorporated 2003; Nasdaq: STRO; Oyster Point address",
    source: "Sutro Form 424B5",
    type: "Government (SEC)",
    published: "2026-02",
    retrieved: "2026-10-05",
    confidence: "High",
    verification: "Verified",
    url: "https://www.sec.gov/Archives/edgar/data/1382101/000119312526044923/d72308d424b5.htm"
  },
  {
    id: "E07",
    claim: "Mar 2025 portfolio review: luvelta deprioritized, nearly 50% headcount cut, CEO succession, exit of internal GMP facility, manufacturing externalized; cash $316.9M at 31 Dec 2024",
    source: "Sutro press release",
    type: "Primary account",
    published: "2025-03",
    retrieved: "2026-10-05",
    confidence: "High",
    verification: "Verified, historical",
    url: "https://www.sutrobio.com/sutro-biopharma-announces-strategic-portfolio-review-resulting-in-the-prioritization-of-its-next-generation-adc-pipeline/"
  },
  {
    id: "E08",
    claim: "Relies on third-party CROs and, since winding down internal manufacturing, on contract manufacturers",
    source: "Sutro FY2025 Form 10-K",
    type: "Government (SEC)",
    published: "2026-03",
    retrieved: "2026-10-05",
    confidence: "High",
    verification: "Verified (generic risk language)",
    url: "https://www.sec.gov/Archives/edgar/data/1382101/000119312526119873/stro-20251231.htm"
  },
  {
    id: "E09",
    claim: "STRO-004 first cohort dosed; trial NCT07227168; tumor types",
    source: "Sutro press release",
    type: "Primary account",
    published: "about 2025-12",
    retrieved: "2026-10-05",
    confidence: "High",
    verification: "Verified",
    url: "https://www.sutrobio.com/sutro-biopharma-announces-first-cohort-of-patients-dosed-in-phase-1-trial-of-stro-004-a-next-generation-tissue-factor-adc-in-tf-expressing-solid-tumors/"
  },
  {
    id: "E10",
    claim: "STRIVE-01 is US-only, began Nov 2025; MTD not defined; adverse events mostly low grade",
    source: "OncoDaily",
    type: "Reputable secondary",
    published: "2026-08",
    retrieved: "2026-10-05",
    confidence: "Good",
    verification: "Verified",
    url: "https://oncodaily.com/industry/sutro-564813"
  },
  {
    id: "E11",
    claim: "STRO-004 design: Fc-silent antibody, site-specific cleavable linker, exatecan, DAR8",
    source: "Sutro programs page",
    type: "Primary account",
    published: "n/d",
    retrieved: "2026-10-05",
    confidence: "High",
    verification: "Verified",
    url: "https://www.sutrobio.com/our-programs/"
  },
  {
    id: "E12",
    claim: "Q3 2025: STRO-004 IND cleared; cash $167.6M at 30 Sep 2025 vs $388.3M a year earlier; Sep 2025 restructuring; R&D plus G&A $48.6M",
    source: "Sutro Q3 2025 results (Barchart)",
    type: "Reputable secondary",
    published: "2025-11",
    retrieved: "2026-10-05",
    confidence: "Good",
    verification: "Verified",
    url: "https://www.barchart.com/story/news/35967871/sutro-biopharma-reports-third-quarter-2025-financial-results-and-business-highlights"
  },
  {
    id: "E13",
    claim: "Greg Chow appointed CFO effective 2 Jun 2025",
    source: "Sutro press release",
    type: "Primary account",
    published: "2025-05",
    retrieved: "2026-10-05",
    confidence: "High",
    verification: "Verified",
    url: "https://www.sutrobio.com/sutro-biopharma-appoints-greg-chow-as-chief-financial-officer/"
  },
  {
    id: "E14",
    claim: "Executive officers: Chung (CEO), Gerber (CSO), Srinivasan (CTO), Borgman (CMO), Leyman (CBDO)",
    source: "Sutro proxy statement",
    type: "Government (SEC)",
    published: "2025-04",
    retrieved: "2026-10-05",
    confidence: "Good",
    verification: "Verify currency",
    url: "https://www.sec.gov/Archives/edgar/data/1382101/000095017025053739/stro-20250414.htm"
  },
  {
    id: "E15",
    claim: "Q2 2026 revenue $9.84M vs $63.75M; net loss $38.53M; Ipsen exited STRO-003; Astellas and Vaxcyte collaborators",
    source: "10-Q summary (TradingView)",
    type: "Secondary summary",
    published: "2026-08",
    retrieved: "2026-10-05",
    confidence: "Moderate",
    verification: "Cross-check with 10-Q",
    url: "https://www.tradingview.com/news/tradingview:b4f133d70974f:0-sutro-biopharma-inc-2q-2026-revenue-9-84m-eps-2-33-10-q-summary/"
  },
  {
    id: "E16",
    claim: "Boehringer Ingelheim's CDMO unit scaled luvelta cell-free production to 4,500 L in Vienna",
    source: "Bioprocess International",
    type: "Reputable secondary",
    published: "about 2024",
    retrieved: "2026-10-05",
    confidence: "Moderate",
    verification: "Historical",
    url: "https://www.bioprocessintl.com/deal-making/contract-catch-up-the-latest-cross-modality-cdmo-deals"
  },
  {
    id: "E17",
    claim: "Cash $249.0M at 31 Mar 2025; cost commitments to third-party CROs and CMOs",
    source: "Sutro Q1 2025 results (BioSpace)",
    type: "Reputable secondary",
    published: "2025-05",
    retrieved: "2026-10-05",
    confidence: "Good",
    verification: "Verified, historical",
    url: "https://www.biospace.com/press-releases/sutro-biopharma-reports-first-quarter-2025-financial-results-and-business-highlights"
  },
  {
    id: "E18",
    claim: "TF ADC competition: an approved TF ADC in cervical cancer; Lepu, Evopoint, Adcendo in development",
    source: "ApexOnco",
    type: "Reputable secondary",
    published: "n/d",
    retrieved: "2026-10-05",
    confidence: "Moderate",
    verification: "Market context",
    url: "https://www.oncologypipeline.com/apexonco/sutro-calls-time-folate"
  },
  {
    id: "E19",
    claim: "Adcendo ADCE-T02, Phase 1 TF ADC, recruiting, started Nov 2024 (NCT06597721)",
    source: "ClinicalTrials.gov",
    type: "Government",
    published: "updated 2026-07",
    retrieved: "2026-10-05",
    confidence: "High",
    verification: "Verified",
    url: "https://clinicaltrials.gov/study/NCT06597721"
  },
  {
    id: "E20",
    claim: "Commentary on pulmonary and ocular liabilities and biomarker cutoff for STRO-004",
    source: "Clinical Trial Vanguard",
    type: "Secondary commentary",
    published: "2026",
    retrieved: "2026-10-05",
    confidence: "Low",
    verification: "Commentary",
    url: "https://www.clinicaltrialvanguard.com/news/sutros-emerging-adc-pipeline-shows-promising-preclinical-data/"
  },
  {
    id: "E21",
    claim: "Directory listing of Sutro leaders (CMO, SVPs of quality and manufacturing, alliance roles)",
    source: "TheOrg",
    type: "Aggregator",
    published: "n/d",
    retrieved: "2026-10-05",
    confidence: "Low",
    verification: "Verify",
    url: "https://theorg.com/org/sutro-biopharma/teams/leadership-team-1"
  }
];

export const sutroAccountData = {
  account: "Sutro Biopharma, Inc.",
  ticker: "NASDAQ: STRO",
  sector: "Life Sciences • Biotech, clinical-stage oncology (ADC modality)",
  location: "South San Francisco, California, US",
  date: "5 October 2026",
  reportType: "Sales Decision & Account Strategy Report (biotech account)",
  demoNotice: "DEMO RUN, ASSUMED SELLER. No client or campaign was supplied. Account chosen: Sutro Biopharma, a public clinical-stage ADC company. Assumed seller: a specialist provider of early-phase oncology clinical-operations and CMC (manufacturing and analytical) services. Items that depend on this assumption are marked (A) and must be re-scored for a real client. Everything about the account is live public research.",
  
  decision: "PURSUE WITH VALIDATION",
  decisionSubtitle: "Several time-sensitive development triggers are public, and funding is in place. No vendor-selection signal is verified and incumbent vendors are unknown, so confirm the need before pushing hard.",
  
  scores: {
    opportunityScore: 65,
    priority: "Medium",
    confidence: 68,
    completeness: 76,
    completenessCount: "19 of 25 required elements",
    fitScore: 7.7,
    urgencyScore: 8.5,
    dealScore: 5.4,
    totalCompact: 21.6
  },
  
  primaryReason: "Three programs are moving into or toward the clinic at once, with funding into at least Q2 2028 [E01][E03].",
  primaryUncertainty: "Which vendors Sutro already uses, and who decides on new ones.",
  
  whyThisAccount: [
    { label: "VF", text: "STRO-004 (tissue factor ADC) is in a US Phase 1 trial, with early partial responses reported and dose optimization under way [E02][E10]." },
    { label: "VF", text: "STRO-006 (integrin beta-6 ADC) was guided to enter the clinic in Q3 2026 and STRO-227 (dual-payload ADC) to file an IND later in 2026 [E01][E03]." },
    { label: "VF", text: "Cash was $164.3M at 30 Jun 2026 and the company expects runway into at least Q2 2028, excluding partner milestones [E01]." },
    { label: "VF", text: "Manufacturing is fully outsourced to contract manufacturers since the internal GMP site was wound down [E07][E08]." },
    { label: "VF", text: "Two Astellas-partnered dual-payload programs have reached or are due to reach the clinic [E05][E02]." },
    { label: "DI", text: "A small team running several programs in parallel after a roughly 50% headcount reduction [E07]." }
  ],
  
  whyNow: [
    { label: "VF", text: "STRO-006 first-in-human start was guided for Q3 2026, which ended on 30 Sep. Whether it has started is not confirmed in public sources [E01][E03]." },
    { label: "VF", text: "STRO-227 IND filing is guided for later in 2026, and CMC work has already begun [E01][E06]." },
    { label: "VF", text: "STRO-004 is in dose optimization between 4 and 5 mg/kg, the maximum tolerated dose is not defined, and the company has talked about future combination strategies [E02][E10]." },
    { label: "VF", text: "A second Astellas iADC program is expected to enter the clinic in 2H 2026 [E02]." }
  ],
  
  whyWeCouldWin: [
    { label: "DI", text: "Parallel programs create concurrent start-up and CMC workload for a lean team [E07][E01]." },
    { label: "VF", text: "The 10-K states the company relies on third-party CROs and contract manufacturers [E08], so outsourced capability is an accepted model." },
    { label: "VF", text: "Funding is secured for the near term [E01][E04]." },
    { label: "DI", text: "The CFO and business development leadership are relatively new, so vendor relationships may still be open [E13][E14]." }
  ],
  
  whyWeCouldLose: [
    { label: "UV", text: "Incumbent CRO and CDMO relationships are unknown. A historical large-scale batch run with Boehringer Ingelheim's CDMO unit was for the now-closed luvelta program [E16][E04]." },
    { label: "VF", text: "The company has restructured twice (Mar and Sep 2025) and is cost-conscious [E07][E12]." },
    { label: "VF", text: "Quarterly revenue fell sharply as a partner exited a program (secondary source) [E15]." },
    { label: "UV", text: "Whether the service is a fit, because the seller is assumed. (A)" }
  ],
  
  recommendedAction: "Confirm whether STRO-006 has dosed its first patient, then approach the Chief Technical Officer (CMC angle) and Chief Medical Officer (clinical operations angle) with a short, specific message tied to the STRO-006 start-up and STRO-227 IND [E01][E03][E14]. Goal: learn how Sutro selects and adds vendors, and who owns that decision.",

  accountProfileTable: [
    ["Legal name", "Sutro Biopharma, Inc. (VF)", "[E06]"],
    ["Ownership", "Public, Nasdaq Global Market, symbol STRO (VF)", "[E06]"],
    ["Founded", "Incorporated in Delaware in April 2003 under another name (VF)", "[E06]"],
    ["Headquarters", "South San Francisco, CA (111 Oyster Point Blvd) (VF)", "[E01][E06]"],
    ["Business model", "Clinical-stage oncology company, site-specific and novel-format ADCs on a cell-free manufacturing platform (VF)", "[E01][E07]"],
    ["Collaborators", "Astellas (dual-payload iADCs). Vaxcyte also named, from a secondary source only. Ipsen exited STRO-003 (secondary source)", "[E05][E15]"],
    ["Revenue", "Q2 2026 revenue of $9.84M versus $63.75M a year earlier, driven by derecognition of Ipsen revenue (moderate-confidence summary of the 10-Q). Net loss $38.5M", "[E15]"],
    ["Headcount", "UV. A reduction of nearly 50% was announced in Mar 2025, followed by a further restructuring in Sep 2025. Current headcount not verified", "[E07][E12]"],
    ["Manufacturing", "San Carlos GMP facility ceased operations by end of 2025. Now fully third-party contract manufacturing (VF)", "[E07][E08]"],
    ["Geography", "United States. Canada not applicable", "—"]
  ],

  icpFitTable: [
    ["Account type", "High", "Clinical-stage biotech with outsourced manufacturing and trials", "[E08]", "High", "None"],
    ["Geography", "High", "US-based; STRIVE-01 is US-only", "[E10]", "High", "Ex-US plans unknown"],
    ["Therapeutic area", "High", "Oncology, ADCs", "[E01]", "High", "None"],
    ["Modality", "High", "Single- and dual-payload ADCs", "[E01]", "High", "None"],
    ["Development stage", "High", "Phase 1 plus IND-stage programs; early phase suits an early-phase service (A)", "[E02][E03]", "Good", "Seller assumed"],
    ["Scale", "Medium", "Smaller team after restructuring; multiple programs", "[E07]", "Moderate", "Headcount unverified"],
    ["Business model", "High", "Relies on third-party CROs and manufacturers", "[E08]", "High", "None"],
    ["Strategic relevance", "Medium-high", "Company states 2026 as a pivotal year with several clinical entries", "[E05]", "Good", "None"]
  ],

  pipelineTable: [
    ["STRO-004 (lead)", "Tissue factor ADC, DAR8, exatecan payload, site-specific cleavable linker (VF)", "Phase 1 STRIVE-01, US only, began Nov 2025", "Dose optimization 4-5 mg/kg; combination strategies discussed", "[E09][E10][E11][E02]"],
    ["STRO-006", "Integrin beta-6 ADC, DAR8, topoisomerase 1 (exatecan) payload", "IND-enabling", "Phase 1 entry guided for Q3 2026. UV whether started", "[E01][E03]"],
    ["STRO-227", "PTK7 dual-payload ADC (tubulin and topoisomerase)", "Preclinical; CMC activities started", "IND guided for later 2026", "[E06][E01]"],
    ["Astellas iADC programs", "Dual-payload immunostimulatory ADCs", "First (TROP2 target) in clinic and dosing; second in IND-enabling toxicology (Q4 2025)", "Second expected in clinic 2H 2026", "[E05][E02]"],
    ["Luvelta", "Folate receptor alpha ADC", "Closed; no further investment", "None", "[E04]"]
  ],

  clinicalSignals: [
    ["STRO-004 IND cleared; first-in-human basket trial NCT07227168", "Nov 2025", "[E09][E12]", "High", "US multicenter Phase 1 in NSCLC, head and neck, cervical, colorectal, pancreatic and bladder cancers"],
    ["Initial dose-escalation cohorts enrolled in 7 months; confirmed/unconfirmed partial responses; favorable tolerability", "12 Aug 2026", "[E02][E10]", "High (company statements)", "Company claims differentiation (higher exposure, lower circulating payload). Company claims, not independently verified"],
    ["Maximum tolerated dose not yet defined", "Aug 2026", "[E10]", "Good", "Dose selection is still open"],
    ["Commentary notes open questions on pulmonary/ocular liabilities & biomarker cutoff", "n/d", "[E20]", "Low (commentary)", "SH. Patient-selection and safety-monitoring workload may rise"],
    ["STRO-006 and STRO-227 preclinical activity presented at AACR 2026", "2026", "[E03]", "Good", "Preclinical only"]
  ],

  fundingTable: [
    ["30 Sep 2024", "$388.3M", "[E12]"],
    ["31 Dec 2024", "$316.9M", "[E07]"],
    ["31 Mar 2025", "$249.0M", "[E17]"],
    ["30 Sep 2025", "$167.6M", "[E12]"],
    ["31 Dec 2025", "$141.4M (before the recent raise)", "[E05]"],
    ["31 Mar 2026", "$202.6M, after $110.0M gross proceeds from offering at $13.98/share", "[E04]"],
    ["30 Jun 2026", "$164.3M", "[E01]"]
  ],

  buyingCommittee: [
    { role: "Executive sponsor", name: "Jane Chung", title: "Chief Executive Officer", basis: "Quoted as CEO in the Aug 2026 release [E01][E02]", confidence: "High", influence: "High" },
    { role: "Economic approver", name: "Greg Chow", title: "Chief Financial Officer", basis: "Appointed effective 2 Jun 2025 [E13]", confidence: "Good", influence: "High" },
    { role: "CMC & technical operations owner", name: "Venkatesh Srinivasan", title: "Chief Technical Officer", basis: "Listed in 2025 proxy; CTO since May 2023 [E14]. Verify current role", confidence: "Moderate", influence: "High" },
    { role: "Clinical operations owner", name: "Anne Borgman, MD", title: "Chief Medical Officer", basis: "Listed in 2025 proxy and a directory [E14][E21]. Verify current role", confidence: "Moderate", influence: "High" },
    { role: "Science lead", name: "Hans-Peter Gerber, PhD", title: "Chief Scientific Officer", basis: "2025 proxy [E14]; quoted in the Q2 2026 release [E02]", confidence: "Good", influence: "Medium" },
    { role: "Alliance & partnering", name: "Barbara Leyman, PhD", title: "Chief Business Development Officer", basis: "2025 proxy; since Jul 2024 [E14]. Verify", confidence: "Moderate", influence: "Medium" },
    { role: "Manufacturing & quality", name: "Devendra Luhar / Carlos Lugo", title: "SVP Manufacturing / SVP Quality", basis: "Directory only [E21]", confidence: "Low", influence: "Unknown" },
    { role: "Procurement / vendor management owner", name: "Not publicly verified", title: "—", basis: "—", confidence: "n/a", influence: "n/a" }
  ],

  outreachMessages: [
    {
      title: "A. Email to the Chief Technical Officer (CMC angle) (A)",
      recipient: "Venkatesh Srinivasan, Chief Technical Officer",
      subject: "Supporting STRO-006 and STRO-227 CMC timelines",
      body: `Dr. Srinivasan,

Sutro's August update put STRO-006 on track to enter the clinic in the third quarter and STRO-227 toward an IND later this year, alongside the ongoing STRO-004 study. Running several exatecan-based programs through external manufacturers at once is a lot of coordination.

[Company] provides [service] for early-phase ADC programs. If useful, I can share how we have helped teams keep CMC and analytical timelines predictable at this stage.

Would a 20-minute conversation in the next couple of weeks be worthwhile? If another colleague owns this, I would be grateful for a pointer.

Best regards,
[Your name]`
    },
    {
      title: "B. Email to the Chief Medical Officer (clinical operations angle) (A)",
      recipient: "Anne Borgman, MD, Chief Medical Officer",
      subject: "Start-up support for STRO-006",
      body: `Dr. Borgman,

I read the early STRIVE-01 update with interest, including the speed of dose-escalation enrollment. With STRO-006 expected to enter the clinic soon, I wanted to introduce [Company].

We support early-phase oncology teams with [service], including site start-up and monitoring. I would value hearing how you plan to resource the next study and whether outside support would be useful.

Open to a brief call, or happy to send a one-page overview first.

Best regards,
[Your name]`
    },
    {
      title: "C. LinkedIn Connection Note (under 300 characters)",
      recipient: "Target Stakeholder",
      subject: "LinkedIn Connection",
      body: `Hello [Name], I follow Sutro's ADC programs and the recent STRO-004 update. I work on [service] for early-phase oncology teams and would value connecting.`
    },
    {
      title: "D. Follow-up Email (5 to 7 business days later)",
      recipient: "CTO / CMO",
      subject: "Re: Supporting STRO-006 and STRO-227 CMC timelines",
      body: `Hello [Name], following up in case my note got buried. In one line: [Company] helps early-phase ADC teams with [service]. If STRO-006 and STRO-227 are already fully covered, that is useful to know, and I will not take more of your time. Otherwise, I can share a short overview.

Best regards,
[Your name]`
    },
    {
      title: "E. Discovery Call Opener (30 seconds)",
      recipient: "Phone Outreach",
      subject: "Discovery Call Script",
      body: `"Hi [Name], this is [Your name] from [Company]. I saw Sutro is moving STRO-006 and STRO-227 forward after the STRO-004 update. I help early-phase oncology teams with [service]. I am not assuming you need anything. Could I ask how you are handling start-up and CMC for the new programs, and who I should talk to?"`
    }
  ],

  risks: [
    ["Incumbent vendors already in place", "High", "None found either way", "Hard to displace mid-program", "Ask how vendors were chosen and what is open"],
    ["Seller assumed", "High (demo)", "Not supplied", "Fit scores could change", "Re-run with a real client"],
    ["Early-stage pipeline concentration", "Medium", "STRO-004 data still early; MTD undefined [E10]", "Program or budget changes", "Track data updates"],
    ["Cost discipline after restructuring", "Medium", "Two restructurings [E07][E12]", "Slow or small purchasing", "Lead with efficiency and speed"],
    ["Revenue decline", "Low-medium", "Partner exit, Q2 2026 [E15]", "Funding pressure", "Runway guidance excludes milestones [E01]"],
    ["Unclear vendor decision owner", "Medium", "Not named", "Wrong contact", "Ask CTO and CMO who owns it"],
    ["Dated leadership data", "Low-medium", "2025 proxy [E14]", "Wrong titles", "Verify before outreach"]
  ],

  timeline: [
    { date: "Mar 2025", type: "Strategy", event: "Portfolio review: luvelta deprioritized, nearly 50% headcount reduction, Jane Chung to CEO, internal GMP facility to close", evidence: "[E07]", confidence: "High" },
    { date: "2 Jun 2025", type: "Leadership", event: "Greg Chow starts as CFO", evidence: "[E13]", confidence: "High" },
    { date: "Sep 2025", type: "Strategy", event: "Further organizational restructuring", evidence: "[E12]", confidence: "High" },
    { date: "Nov 2025", type: "Regulatory / clinical", event: "STRO-004 IND cleared; STRIVE-01 begins", evidence: "[E12][E10]", confidence: "High" },
    { date: "Q4 2025 - Q1 2026", type: "Partnership", event: "Second Astellas program enters IND-enabling toxicology; first iADC enters clinic", evidence: "[E05]", confidence: "High" },
    { date: "Q1 2026", type: "Financing", event: "$110.0M gross offering at $13.98 per share", evidence: "[E04]", confidence: "High" },
    { date: "12 Aug 2026", type: "Clinical", event: "Early STRO-004 data and Q2 results", evidence: "[E01][E02]", confidence: "High" },
    { date: "Q3 2026", type: "Clinical trigger", event: "STRO-006 first-in-human start guided. UV whether it has happened. MOST IMPORTANT CURRENT TRIGGER", evidence: "[E01][E03]", confidence: "Good", highlight: true },
    { date: "2H 2026", type: "Clinical / regulatory", event: "Second Astellas iADC to enter clinic; STRO-227 IND", evidence: "[E02][E01]", confidence: "Good" },
    { date: "Q2 2028", type: "Financial", event: "Guided runway horizon", evidence: "[E01]", confidence: "Good" }
  ],

  researchGaps: [
    ["Account", "Has STRO-006 dosed its first patient?", "The main trigger", "Company news, ClinicalTrials.gov", "High"],
    ["Competition", "Current CRO and CDMO vendors", "Main win/lose driver", "Discovery; conference remarks; filings", "High"],
    ["Seller", "Service and client not defined", "Fit and score", "Provide campaign", "High"],
    ["Stakeholder", "Current executive roles; vendor decision owner", "Right contact", "sutrobio.com, LinkedIn", "High"],
    ["Clinical", "NCT07227168 sites, targets, sponsor details", "Start-up needs", "ClinicalTrials.gov", "Medium"],
    ["Regulatory", "Designations, patents, Drugs@FDA", "Development risk", "FDA and USPTO searches", "Medium"],
    ["Account", "Current headcount", "Capacity", "Latest 10-K and 10-Q", "Medium"],
    ["Commercial", "Vendor spend", "Deal sizing", "Not public; ask in discovery", "Medium"],
    ["Partnerships", "Sutro's role in Astellas clinical work; Vaxcyte status", "Scope", "Collaboration disclosures", "Low"]
  ],

  scoringBreakdown: [
    ["Customer / ICP fit", "13 / 15", "Clinical-stage oncology biotech, outsourced model", "High"],
    ["Product / service fit (A)", "10 / 15", "Visible workloads; seller assumed", "Low"],
    ["Demand / opportunity", "13 / 15", "Several dated development triggers", "High"],
    ["Buying intent", "4 / 15", "No verified vendor-selection signal. Unknown is not scored as zero", "Low"],
    ["Commercial potential (A)", "8 / 15", "Funded but lean; spend unknown", "Moderate"],
    ["Funding and regulatory readiness", "7 / 10", "Funded to Q2 2028 per company; IND status clear", "Good"],
    ["Decision-maker accessibility", "3 / 5", "Executives public; vendor owner unknown", "Moderate"],
    ["Competitive position (A)", "3 / 5", "Incumbents unknown; partial credit", "Low"],
    ["Timing / trigger", "4 / 5", "STRO-006 and STRO-227 triggers; STRO-006 status unconfirmed", "Good"],
    ["Total Score", "65 / 100", "Medium priority (60-79). Bands are configurable", "Moderate (68%)"]
  ]
};
