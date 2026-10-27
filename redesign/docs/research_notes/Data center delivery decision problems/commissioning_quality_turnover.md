# Commissioning, QA/QC, white space, prefab/modular and turnover problems in US data center delivery (2024-2026)

Method note: figures below were read in fetched pages (WebFetch), not just search snippets, unless marked "snippet only". Many sources are vendor blogs or practitioner opinion; authority is flagged per item. Several sources are undated or have future-looking dates (today is 2026-10-26, so 2026 dates are plausible). Little of this is US-specific or independent measured data; the quantitative base is thin.

## Commissioning Levels 1-5: definitions, durations, prerequisites, reasons tests slip or fail

### Takeaway
Level numbering is not standardized: two sources give different L2/L3 labels and one source uses Level 0-6. The only quantified duration found is IST of 4-6 weeks (air-cooled) vs 10-14 weeks (liquid-cooled AI hall), from one undated vendor blog. Reasons for slippage are well described qualitatively (compressed windows, controls not integrated, late equipment, scarce L4/L5 engineers, late sequence changes) but I found no independent frequency data.

### Cited Findings
- Level definitions, version A (IPS): L1 pre-delivery inspection and factory testing; L2 pre-installation verification (inspect at delivery that equipment matches approved spec); L3 pre-functional testing (on-site checks vs drawings/specs/codes, manufacturer rep verifies startup); L4 functional testing (HVAC, BAS, electrical/UPS, chillers, piping, fire, lighting; "a single point of failure, especially in automation, can significantly affect the schedule"); L5 integrated system testing (all systems together at steady state: integrated electrical testing, load bank, heat load, BAS monitoring; gives owner assurance to accept). Page has a graphic titled "7 Levels of Commissioning Data Centers"; no date (footer 2026), no durations — [IPS](https://www.ipsdb.com/happenings/insights/commissioning-data-centers)
- Level definitions, version B (DAOU Technology blog, undated, cites Bloomberg April 2026 and JLL 2026 outlook): L1 Factory Acceptance Testing (witnessed at manufacturer); L2 Installation Verification ("dead" test: unpowered inspection of wiring, piping, installation quality); L3 Startup Testing ("live" test: first energization, setpoints/config); L4 Functional Performance Testing (normal, alarm, failure modes); L5 Integrated Systems Testing (power, cooling, controls together incl. utility loss, redundancy failover, full black building test; "most time and budget") — [DAOU](https://blog.daouidc.com/en-us/blog/data-centre-commissioning)
- Numbering differs by source: Commissioning Matters (Thiago Lima, 13 Jun 2025) describes seven levels, Level 0 through Level 6, with commissioning reviews at 30%, 60%, 90% design — [Commissioning Matters](https://cxmatters.substack.com/p/racing-the-clock-the-challenges-of)
- IST duration: air-cooled hall typically 4-6 weeks; liquid-cooled AI hall 10-14 weeks (thousands of hydraulic connection points needing pressure/leak tests, staged thermal load validation). Undated vendor blog, no cited primary source — [DAOU](https://blog.daouidc.com/en-us/blog/data-centre-commissioning)
- Same source: average global equipment lead times up ~50% vs pre-2020 to ~33 weeks; transformers once 24-30 months now up to five years in some markets; crews "sometimes must redo completed FAT and installation work when gear arrives late"; experienced L4/L5 commissioning engineers hard to hire and committed to other projects; "over half" of projects tracked in 2025 slipped 3+ months; commissioning delay on a 60 MW facility ~ $14.2M/month in lost revenue and carrying cost (no primary source shown in the page; treat as unverified vendor figure) — [DAOU](https://blog.daouidc.com/en-us/blog/data-centre-commissioning)
- Reasons tests slip or fail (Commissioning Matters, 13 Jun 2025): overlapping phases and frequent design changes (building while redesigning); major equipment (chillers, generators, UPS) arriving late; QA/QC, energization, commissioning and training competing for the same window; incomplete or undocumented installations and field changes; missing startup reports, point-to-point records, wiring diagrams; "controls installed but not integrated with BAS/BMS sequences"; fire alarm cause-and-effect not fully validated; "late owner- or engineer-driven sequence changes that contradict already-tested logic"; pressure to "go green" without complete verification. Quote: "system testing expected to happen in days, not weeks"; "systems that 'pass the test' can still fail in the field." No numbers given — [Commissioning Matters](https://cxmatters.substack.com/p/racing-the-clock-the-challenges-of)
- Controls share of findings: "On data center jobs, controls issues can make up 20%-40% of commissioning findings." Author Dallas Bond, iRecruit insight page, updated 6 Aug 2026. Single-author estimate with no study cited; iRecruit is a staffing firm — [iRecruit](https://www.irecruit.co/insights/bas-commissioning-specialist-data-centers)
- Same page says the BAS specialist checks BAS data shared with BMS, SCADA, DCIM and EPMS; keywords include alarm routing — [iRecruit](https://www.irecruit.co/insights/bas-commissioning-specialist-data-centers)
- Older but relevant (CSE magazine, 1 May 2009, Vallort and Weber of ESD): fast-track projects let design/construction run long while turnover date holds; acceptance testing and commissioning get combined; late-appointed commissioning agent; SCADA not installed/tested before site acceptance forcing retests; "Sometimes, trying to compress the schedule can actually lengthen it"; a ~2 month test schedule may be cut for budget; electrical testing can take up to a month; critical systems tested at 100% — [CSE](https://www.csemag.com/commissioning-mission-critical-systems/) (2009, far outside the 2024-26 window, included for the pattern only)
- Generator effects (FacilitiesNet, date not captured): commissioning on portable generators makes it hard to separate generator symptoms from permanent equipment faults; one case had a 1.2 MW step load push a UPS to battery because the generator was less stiff than utility; re-using scripts written for a different UPS topology; repeated forced battery transfers reduce battery runtime. Snippet only, not fetched — [FacilitiesNet](https://facilitiesnet.com/datacenters/article/Understanding-Effects-Of-Generators-Is-Key-To-Successful-Data-Center-Commissioning--13800)
- Liquid cooling (Uptime Institute, J. Davis, UII Update 452, 12 Jan 2026): "Best practices for commissioning liquid-cooled mission-critical environments are still maturing"; CDUs are central to the difficulty; some CDU makers had limited experience integrating/testing CDUs in complex fluid networks and some had sold no data center products before; factory witness testing is "essential". Visible text had no figures (rest paywalled). Search snippet (not confirmed in fetched text) said liquid-cooled load banks are not standardized or widely available — [Uptime Institute](https://intelligence.uptimeinstitute.com/pdf-download/node/154022)
- OCP guidance on pre-commissioning cleaning of technology cooling system pipework (sequence: pre-hydrostatic checks, hydrostatic test, rack-loop cleaning, flushing, commissioning prep), Jan/Mar 2025. Snippet only — [OCP](https://www.opencompute.org/documents/ocp-document-submission-guidelines-for-pre-commission-preparation-of-technology-cooling-system-tcs-row-manifolds-revq-pdf-1)
- Liquid-cooling Cx steps (CxPlanner, undated vendor blog): review loops against OPR; chiller and CDU verification; inspect piping/leak detection; flush and pressure test before startup; functionally test pumps/valves/sensors/controls incl. BMS or DCIM comms; FPT under load incl. rapid load changes and faults; hand over test procedures and operator-facing descriptions. No figures — [CxPlanner](https://cxplanner.com/blog/cx-for-liquid-cooling)
- ASHRAE Guideline 0: 2013 edition supersedes 2005; Cx begins at project inception with Owner's Project Requirements (OPR); issues log is a formal ongoing record of problems and resolutions; training element gives operators the information needed. Secondary sources (UCF procedure, course materials), not the standard text — [UCF Cx procedure](https://energy.ucf.edu/wp-content/uploads/2025/02/UCF-Building-Energy-Systems-Commissioning-Procedure_2015.pdf) ; standard edition preview [ANSI](https://webstore.ansi.org/preview-pages/ASHRAE/preview_ASHRAE+Guideline+0-2013.pdf). Standards are 2013 vintage (older than window).

### Inferences
- The recurring cause pattern (controls not integrated, late sequence changes, compressed windows, specialist scarcity) maps to coordination/decision-gating problems rather than equipment defects; but the evidence is practitioner assertion, not measured frequency.
- Liquid cooling plausibly extends IST by 2-3x per one vendor blog; treat as a single-source claim.
- Revision mismatches between equipment controls firmware/logic and BMS/EPMS are implied by "controls installed but not integrated" and "late sequence changes", but no source I fetched uses that exact framing with data.

### Gaps
- No independent data on how often L4/L5 tests are rescheduled or fail, or median L1-L5 durations other than IST (searched; none found).
- No source quantifying EPMS/BMS revision-mismatch delays.
- Uptime Institute Tier certification/commissioning guidance, 7x24 Exchange, BICSI, kW Mission Critical, Hill, WSP, Jacobs white papers not substantiated (not surfaced in searches).
- Specialist-time shortage evidence is one vendor blog only.

## QA/QC and rework: rates and defect patterns

### Takeaway
General construction rework is reported mostly at ~2-10% of project cost depending on definition, with a recent field-data study (Love 2026) at under 1% as recorded but contractors under-reporting. I found no data-center-specific or mission-critical-specific rework rate. Information failures (miscommunication, bad data) are reported as large shares of rework causes.

### Cited Findings
- PlanRadar compilation (page dated 09/01/2026; vendor, secondhand): Cnudde 1991 10-20%; Love and Li 2000 2.77%; Hwang 2009 5.0%; CII 2011 2-20% range; McDonald 2013 6.44%; Dougherty and Hughes 2014 4.9%; Love 2019 0.39% mean (production phase only); Singh 2022 0.81%; Love 2026 (ASCE JCEM) 0.38% pre-completion, 0.76% including post-completion; scopes are general or residential, not data center — [PlanRadar](https://planradar.com/us/cost-of-rework-construction/)
- Same page: design-related errors 6.9% (Cnudde 1991), 9.5% (Burati 1992, industrial), 1.8% (Hwang 2009), 1.5% (Dougherty and Hughes 2014); construction-related 3.3%, 2.5% (industrial), 0.3% — [PlanRadar](https://planradar.com/us/cost-of-rework-construction/)
- Same page: rework causes by information factors: miscommunication 26% and bad/inaccurate data 22% of rework (PlanGrid and FMI 2018); bad data 14% of rework (Autodesk and FMI 2021). These are shares of rework causes, not of project cost — [PlanRadar](https://planradar.com/us/cost-of-rework-construction/)
- Same page claims Love (2026) found contractors under-reported field rework by ~300%, real cost up to 7.3% of contract value on individual projects; these figures are in prose, not the table, and I could not check the paper — [PlanRadar](https://planradar.com/us/cost-of-rework-construction/)
- PlanRadar 2025 QA/QC report (claimed on same page): 56% of firms with consistent QA/QC keep rework under 5% of budget vs 37% without standards; 43% of firms without standards do not know their rework cost. Vendor survey — [PlanRadar](https://planradar.com/us/cost-of-rework-construction/)
- Autodesk/FMI study (2021, data year 2020): bad data may have cost global construction $1.85 trillion; rework portion ~ $88.69B (14% of rework); 3,900+ respondents. Search snippet only (blog fetch returned 403) — [Autodesk](https://www.autodesk.com/blogs/construction/autodesk-fmi-study-global-construction-industry-data-strategies/); [Construction Dive](https://www.constructiondive.com/news/contractors-lost-18-trillion-globally-in-2020-due-to-bad-data-new-report/606939/)
- PlanGrid/FMI 2018: rework from miscommunication and inaccurate/inaccessible information >$31B in US 2018; $177.5B/yr US labor on non-optimal activities. Snippet only — [Autodesk](https://www.autodesk.com/blogs/construction/?p=9061)
- Build Technologies (1 May 2026, advisory firm with a stake): "On-site MEP rework is a consistent driver of commissioning delays"; factory-built assemblies tested before shipping reduce that risk. No number — [Build](https://build.inc/insights/modular-data-center-development-prefab)
- Uptime Institute Annual Outage Analysis 2025 (6 May 2025): nearly 40% of organizations had a major human-error outage in three years; of those, 85% stem from staff not following procedures or flawed procedures; failure-to-follow-procedures share rose 10 percentage points vs 2024. The Register summary reports 58% (not following) and 45% (flawed procedures), overlapping — [Uptime press release](https://uptimeinstitute.com/about-ui/press-releases/uptime-announces-annual-outage-analysis-report-2025); [The Register](https://www.theregister.com/2025/05/07/human_error_a_factor_in) (snippet only). This is operations, not construction, but relevant to handover quality (procedures/documents).

### Inferences
- Honest scope: no rework rate here is for data centers. A reasonable use is "general construction, 2-10% typical, definitions vary, recorded rework likely understated."
- The Uptime procedures finding supports the argument that documentation/procedure quality at turnover feeds operational risk, but causality to construction handover is not shown.

### Gaps
- No data center or mission-critical rework/defect rates (searched Dodge, CII, FMI; found none specific). CII 2011 appears only as a range via PlanRadar. RMIT "costs of rework" paper (403) not read.
- No punch-list volume or defect category statistics for data centers.

## Turnover / handover package problems

### Takeaway
Sources agree turnover is accepted on evidence (as-builts, test records, O&M, asset data) and that usability, version control and open punch items are the pain points. None provide measured frequency of delays to operations acceptance; sources are vendor or practitioner opinion.

### Cited Findings
- VueOps (Jan 2026, vendor, no author): problem is less missing documents than operator accessibility; handover packages (as-builts, one-lines, commissioning reports, O&M manuals, submittals) end up in PDF folders unlinked to equipment tags, with conflicting drawing revisions; engineers can spend "10-20 minutes locating the correct drawing for each corrective event"; commissioning evidence becomes disconnected ("orphaned commissioning data") — [VueOps](https://www.vueops.com/knowledge-center/the-hidden-risk-in-data-center-handover)
- Build Technologies (21 May 2026): closeout spans six evidence streams (construction completion, equipment documentation, commissioning records, controls documentation, compliance evidence, commercial closure); data center is "accepted through evidence, not just physical completion"; open punch items blocking turnover is a tracked metric; failed IST needs corrective action and retest evidence before closeout; no quantified delay — [Build](https://build.inc/insights/data-center-closeout-documentation-ai)
- Commissioning Matters (13 Jun 2025): training and turnover often run with documentation misaligned; recommends go/no-go gates and training in parallel with late Cx — [Commissioning Matters](https://cxmatters.substack.com/p/racing-the-clock-the-challenges-of)
- Reality Capture Experts (snippet only): when as-built does not match field, teams reconcile paper instead of verifying systems and schedule slips; same $14.2M/month figure with unnamed source — [Reality Capture Experts](https://realitycaptureexperts.com/as-built-data-center-commissioning/)
- Job postings (Oracle Turnover Lead etc.) list turnover deliverables: as-builts, commissioning and test records, compliance certs, O&M manuals, MOPs, emergency procedures (snippet only) — [Scoutify/Oracle](https://scoutify.com/companies/oracle/jobs/1311734/)

### Inferences
- The decision-layer opportunity is evidence-to-asset linkage and gating, but quantitative proof of delay frequency is absent.

### Gaps
- No frequency or duration data for turnover-driven delay of operations acceptance. No Uptime/7x24 turnover survey found. Training-completion data not found.

## White space: zone/hall release, ready for customer installation, partial capacity, cooling readiness

### Takeaway
Phased hall-by-hall delivery is standard in hyperscale, with isolation at circuit/breaker level, but I found no authoritative definition or checklist of "ready for customer installation" or zone cooling-readiness validation. Treat these as industry vocabulary needing primary-source confirmation (customer RFP/acceptance criteria).

### Cited Findings
- Phased energization: gradually increasing electricity available; data halls energized one at a time; example 100 MW facility starts at 10 MW; limitations: forecasting error and stranded capacity, voltage fluctuation affecting running servers when a new zone is energized, utility complexity. Christopher Tozzi, Data Center Knowledge, 28 Jul 2026 — [DCK](https://www.datacenterknowledge.com/energy-power-supply/what-is-phased-energization-and-when-should-data-centers-adopt-it-)
- Colt DCS says phased hall-by-hall capacity is the standard hyperscale model and can become a rolling process lasting years (snippet only; PDF returned 404 on fetch) — [Colt DCS](https://www.coltdatacentres.net/en-GB/lp/-/media/Files/guides/colt-dcs-hyperscale-in-action.pdf)
- Project examples (snippets): Suffolk Project A1 Virginia, 8-10 staggered phases, each hall with in-room cooling; Colt Frankfurt West 25 MW delivered in two phases to give operator early IT space — [Suffolk](https://suffolk.com/project/project-a1-virginia/); [Baxtel](https://baxtel.com/news/colt-data-centre-services-colt-dcs-finishes-fit-out-data-center-in-frankfurt-germany)
- Gate pattern (low-authority playbook, snippet): partial delivery acceptable if safety boundaries respected; commissioning failures hold the next gate; no IT install in an affected zone until re-test passes — [Skillselion playbook](https://skillselion.com/skills/daemon-blockint-tech/agentic-enteprises-skill/senior-data-center-capacity-delivery-manager)

### Inferences
- Live-adjacent construction and re-test rules are inferred from DCK's disruption-risk note plus playbook; unconfirmed by primary source.

### Gaps
- No definition source for "ready for customer installation", "hall release", or cooling readiness by zone; no data on early partial-capacity requests; no source on risks of commissioning beside active construction. Equinix/QTS/hyperscaler acceptance criteria not found. QTS "early delivery of commissioned space" result surfaced but not read.

## Prefab and modular delivery: transport, access, laydown, interfaces, schedule gains, failure modes

### Takeaway
Schedule gains of 30-50% are claimed almost entirely by vendors and advisers. Constraints (road/bridge limits, laydown, crane access, grade, interfaces to backbone) are described qualitatively. No independent project-level net-savings data; skids still need site integration commissioning.

### Cited Findings
- Build Technologies (1 May 2026, advisory): prefab compresses timelines 30-50% vs stick-built; conventional 36-48 months site control to commissioning; 20-30 MW M&E from ~18 months to 9-11; modular manufacturing 5-10% higher cost per MW; transport screen (secondary roads, low bridges, weight limits can rule out modular); laydown (level site, staging area; grade or constrained footprint "can erase the schedule advantage"); crane access, temporary easements, airport flight-path permits often missing from early schedules; modular not recommended for 100 MW+ hyperscale or complex access sites — [Build](https://build.inc/insights/modular-data-center-development-prefab)
- Datacentres.com Research (2 Sep 2026): modular components 12-20 weeks; 6-10 months order to powered rack; greenfield 50-200+ MW first phase 8-14 months vs 24-36 traditional; shipping oversized modules $15,000-50,000 per unit; "modular does not solve power procurement"; Compass 17-week hall build (company claim, undated); most cost figures lack sources; page did not address laydown or commissioning — [Datacentres.com](https://www.datacentres.com/news/factory-built-and-fast-modular-construction-cuts-data-centre-delivery-times-by-4-slot1-2026-09-02)
- ABB brochure (undated vendor): prefab skids and eHouses cut build time ~30%, pre-designed another ~20% (snippet only) — [ABB](https://library.e.abb.com/public/32c6aaf0740d4a2f927fc712518d9400/Modular%20prefabricated%20solutions%20speed%20DC%20deployment_Brochure_Final.pdf)
- Siemens/Delta press release: up to 50% faster time-to-market, up to 20% capex reduction (vendor, snippet only) — [Siemens](https://press.siemens.com/global/en/pressrelease/siemens-and-delta-power-solutions-cut-data-center-deployment-time-costs-and-carbon)
- DCD opinion "The data center is becoming a power project" (fetch 403; snippet only): lifting points, centre of gravity and transport dimensions fixed at design become physical limits; workarounds erode prefab gains — [DCD](https://datacenterdynamics.com/en/opinions/the-data-center-is-becoming-a-power-project)
- Vertiv/Compass SmartRun prefabricated overhead power, cooling, containment, network (vendor claim) — [Compass](https://www.compassdatacenters.com/in-the-news/vertiv-smartrun/)
- Uptime Jan 2026: CDU factory witness testing essential (see Cx section).

### Inferences
- Factory tests do not remove site integration risk: controls integration, interface to backbone and re-test after transport remain; no source quantifies this.
- Figures from DAOU, Build and Datacentres.com are likely partly circular (similar numbers across commercial sites); do not treat as independent corroboration.

### Gaps
- No independent schedule-gain data, no failure-mode data (transport damage, interface mismatches, post-delivery re-FAT). Schneider, Vertiv, Eaton controls integration guidance not substantiated. Remio Schneider 2.5 MW module summary is a snippet only.

## Vocabulary (one-line meanings; drawn from the sources above)
- FAT / FWT (factory acceptance / witness test): L1, witnessing manufacturer tests of switchgear, generators, UPS, chillers, CDUs.
- SAT (site acceptance test): site-level acceptance after installation (term not defined in fetched sources; common industry usage; unverified here).
- Pre-functional checklist (PFC) / installation verification / "dead" test: unpowered check of wiring, piping, install quality.
- Start-up / "live" test (L3): first energization and setpoint verification with vendor rep.
- FPT / functional performance test (L4): run each system through normal, alarm and failure modes.
- IST / integrated systems test (L5): all systems together; utility loss, failover, black building test.
- Black building test: simulated total utility loss with full-load transfer to backup (DAOU).
- Load bank / heat load testing: artificial electrical or thermal load to prove capacity; liquid-cooled load banks are scarce (Uptime snippet).
- OPR (Owner's Project Requirements): owner's stated needs that Cx tests against (ASHRAE Guideline 0).
- Issues log: formal running record of Cx problems and resolutions.
- Systems manual / training: operator documentation and instruction elements of Guideline 0.
- BAS / BMS / EPMS / SCADA / DCIM: building automation, building management, electrical power monitoring, supervisory control, data center infrastructure management; integration of their data and alarms is a common finding area (iRecruit).
- Point-to-point (checkout): verifying each controls/wiring point end to end (Commissioning Matters mentions missing point-to-point records).
- Cause-and-effect (fire alarm): matrix of inputs to required outputs, to be validated.
- Sequence of operation (SOO): defined control logic; late changes contradict tested logic.
- Punch list / punch items: open deficiencies blocking turnover.
- Closeout register / turnover package / evidence layer: tracked documentation set for acceptance (Build).
- Orphaned commissioning data; information latency; single source of truth: VueOps terms for disconnected evidence.
- Go/no-go gate; "go green": decision gates; pressure to proceed without complete verification (Commissioning Matters).
- Phased energization / hall release: bringing halls or zones live incrementally (DCK; "release" wording not defined in a source).
- CDU / TCS (technology cooling system) / hydrotest / flushing: liquid-cooling loop terms (OCP, Uptime).
- Early-life failures: failures soon after turnover, often re-diagnosed because Cx evidence is not linked (VueOps).
- Not substantiated in any fetched source: "zone release", "ready for customer installation", "cooling readiness validation by zone" as formal terms.

## Searched but not substantiated
- Dodge/CII data-center rework statistics; frequency of IST failure; BMS/EPMS revision mismatch data; Tier certification commissioning guidance; 7x24/BICSI materials; punch-item counts; turnover-delay frequency; independent prefab net-savings; formal definition of hall release/ready-for-install; Schneider/Vertiv/Eaton controls integration guidance; RMIT rework paper and Autodesk FMI blog (403); DCD article and CSE (DCD fetch 403, CSE fetched OK).
