# US data center power, utility interconnection, energization and permitting constraints (2024-2026)

Research date: 2026-10-26. Evidence tiers: **[F]** = I fetched the page/PDF and saw the figure. **[S]** = seen only in a search-result summary, page not fetched (treat as lower confidence; verify before use). Where a URL is a bare search hit, I say so.

## 1. Interconnection / energization wait times by market

### Takeaway
There is no single published "wait time" per market. Utilities publish process-step durations (ComEd is the best primary source) or queue sizes; wait times come from JLL/Bloomberg-type secondary reporting. Northern Virginia is the longest (about 4-7 years for 100 MW+). Phoenix (APS) has stopped committing new capacity. Texas has shifted to a batch process that was on hold as of Aug 2026. Atlanta/Georgia Power is contracting aggressively, with first large service dates around 2028.

### Cited Findings
**Northern Virginia / Dominion**
- Dominion said connection time for large data centers (over 100 MW) would rise by 1-3 years from a prior 3-4 years, to roughly 4-7 ("as long as seven years"); projects already evaluated are unaffected. Announced via a letter from Dominion's transmission arm. [F] — [Data Center Knowledge / Bloomberg, 30 Aug 2024](https://www.datacenterknowledge.com/energy-power-supply/data-centers-face-seven-year-wait-for-power-hookups-in-virginia)
- Older (2022): Dominion told data center firms in July 2022 power for some new Eastern Loudoun facilities would be delayed for years; constraints affected two-thirds of Loudoun's substations; allocations reduced through January 2026. Digital Realty said it had only 24 MW it was certain it could power in Ashburn vs. 200 MW buildable in Manassas (outside the constraint). [F] — [Data Center Frontier, 26 Sep 2022 (OLD)](https://www.datacenterfrontier.com/energy/article/11436951/dominion-resumes-new-connections-but-loudoun-faces-lengthy-power-constraints)
- JLL 2026 outlook as relayed: about 7 years for a 100 MW connection in Northern Virginia; national average about 4 years; pre-2022 utilities typically accommodated large commercial loads in 12-18 months; Dominion queue for new substation service exceeds 36 months. Secondary article, not JLL itself. [F] — [Construction Owners Club, 1 Jul 2026](https://www.constructionowners.com/insights/how-long-it-actually-takes-to-power-a-data-center-in-2026-a-u-s-market-by-market-reality-check)
- Queue claim: SCC hearing showed 111 approved projects to connect by end-2031 and 220 waiting; about 10 studied a year; Amazon estimate up to 24 years for new applications. [S, undated, likely 2025+] — [Prince William Times](https://www.princewilliamtimes.com/localnews/the-big-bottleneck-power-crunch-keeps-data-centers-in-the-dark/article_3b45f243-defa-573c-8ed1-c8709f73ce94.html)

**Dallas / Oncor / ERCOT**
- ERCOT is tracking about 474 GW of large loads seeking interconnection (as of June 2026), about 90% data centers. [F primary] — [ERCOT Senate testimony, 29 Jul 2026](https://www.ercot.com/files/docs/2026/07/29/ERCOT-Senate-July-29-Panel-1-Assessing-The-Grid.pdf)
- ERCOT Batch Study outputs: annual MW allocation per request (year-by-year 2028-2032) formalized in a Load Commissioning Plan (LCP); financial commitment requirements (CIAC, security); transmission plan. Batch Zero: LLIS study cutoff 10 Jul 2026 (no cure period); T(D)SP eligibility package due 24 Jul; classification notices by 7 Aug; study begins no later than 2 Sep 2026; financial security of $50,000/MW; ERCOT samples eligibility evidence (purchase orders for long-lead equipment, real-estate agreements, land-use approvals, end-user agreements, construction agreements) through 9 Apr 2027. [F primary] — same ERCOT PDF
- Oncor service requests rose from 289 GW (end Q1 2026) to 298 GW (Q2 2026); about 44 GW of Oncor projects qualified for Batch Zero; Oncor had submitted about 127 GW qualifying forecast to ERCOT; Batch Zero criteria (75 MW+ loads, finalized June 2026) include new financial and technical requirements. On 3 Aug 2026 (date inferred by the article's "Monday") Gov. Abbott paused new data center interconnection approvals pending a state audit; ERCOT put the Batch Zero review on hold; effect unclear. Batch-related capital not in Oncor capital plan until at least 2027. [F] — [Utility Dive, 7 Aug 2026](https://www.utilitydive.com/news/fate-of-oncors-nearly-300-gw-load-pipeline-unclear-following-texas-data-ce/827303/)
- Caution: a datacentres.com guide says average permit timelines run from 6 months (Texas) to 24+ months (some California jurisdictions) and utility queues "can extend 3-5 years" in markets like NoVA and Phoenix; undated, unsourced. [F] — [datacentres.com](https://www.datacentres.com/news/36-month-lead-times-turn-transformer-shortage-into-data-centre-site-selection-ki-slot3-2026-08-07)

**Phoenix / APS-SRP**
- APS has made no commitments to serve additional data center customers since 1 Jan 2024; says it cannot commit under current pricing; about 4,000 MW already committed to data centers; peak demand record above 9,100 MW (early Aug 2026); plans a 1,280 MW gas plant near Gila Bend; Microsoft intervened against a proposed 45% rate increase on data centers. [F] — [KJZZ, 2 Sep 2026](https://www.kjzz.org/business/2026-09-02/aps-says-it-cant-commit-to-new-data-centers-because-of-electric-grid-constraints)
- APS queue about 30 data centers / 18 GW; Desert Sun gas plant phase 1 about 2030, phase 2 (data-center subscription) 2031-2033; SRP pipeline capacity expected Q4 2029. [S] — [search hit: Power Engineering / DCD / KJZZ summary](https://www.datacenterdynamics.com/en/news/aps-plans-2gw-gas-plant-to-power-arizona-data-centers-under-subscription-model/)
- No SRP published wait time found.

**Atlanta / Georgia Power (Southern Co.)**
- Southern contracted large load: 17 GW after adding 6 GW since Q1 2026; includes Georgia Power's 3.2 GW, 25-year OpenAI contract near Savannah, service starting 2028, with 1 GW flexible demand response; further 8 GW in advanced contracting; data center load on system currently 1.2 GW; customer protections: minimum bills, long-term contracts, termination payments, high collateral. [F] — [Utility Dive, 4 Aug 2026](https://www.utilitydive.com/news/southern-co-contracted-large-load-data-centers/826919/)
- PSC fact sheet: Georgia Power forecast of data center need rose from 400 MW (2022) to 6,600 MW (2023) to 8,500 MW (2025); PSC approved rule allowing minimum billing and longer terms for new large loads. [S] — [PSC fact sheet](https://psc.ga.gov/site/downloads/datacenterfactsheet.pdf)
- No Georgia Power wait-time in years found.

**Columbus / AEP Ohio**
- AEP Ohio: inquiries from over 50 customers at over 90 sites totaling more than 30,000 MW; Central Ohio data center load about 100 MW (2020) to about 600 MW (2024); about 5 GW projected by 2030; moratorium on new data center service agreements since March 2023. [F] — [POWER, 10 Jul 2025](https://www.powermag.com/regulator-approves-aep-ohios-landmark-data-center-tariff/)
- AEP Ohio report: regional upgrades not ready until Q4 2031 at the earliest for 36 proposed sites. [S, via Bloomberg summary] — [search hit](https://www.datacenterknowledge.com/energy-power-supply/data-centers-in-nvidia-s-hometown-stand-empty-awaiting-power) (not seen in the fetched text; verify)

**Chicago / ComEd** (best primary process data)
- Large-load applications to ComEd (MW requested): 94 (2018), 80 (2019), 525 (2020), 499 (2021), 652 (2022), 2,222 (2023), 3,931 (2024), 22,673 (2025). About 100 large projects in engineering or construction with deposits paid; peak demand 23,753 MW (2011), 21,560 MW (2024), 20,714 MW (2025). Scale and pace jumped "late summer 2024". [F, chart values read from text extraction] — [ComEd/JLL deck for Metropolitan Mayors Caucus, 16 Sep 2025](https://mayorscaucus.org/wp-content/uploads/2025/09/Data-Centers-and-ComEd-Power-Overview-ComEd-JLL-9-16-25.pdf)
- Process, transmission-served (about 50 MW+): Phase 1 transmission impact cluster study and scoping engineering about 12-18+ months (cluster study new as of Q3 2024; deposit $1M+); Phase 2 detailed engineering about 12-18+ months; Phase 3 construction about 12-24+ months, "contingent on the customer having all required civil construction completed and approved." Total for on-site customer substation (ESS) projects: about 36-60+ months, driven by long-lead transformers/breakers and transmission reinforcements. Distribution-served (under about 50 MW): about 12-36+ months. Same deck.
- Deposit policy (June 2025, pending ICC approval): $1M for up to 200 MW plus $500k per additional 100 MW (1 GW = $4M). Requirements to begin: site control (LOI/PSA), engineering deposit, service application, load ramp schedule, one-line diagram, site plan. Same deck.
- Voltage tiers: 12 kV up to 10 MW; 34 kV 10-50 MW; 138 kV 50-300 MW; 345 kV above 300 MW (customer-owned switchyard; ComEd has no transformers at that voltage). Same deck.
- Interim "bridging capacity": limited, 10 MW max, where available, from the distribution system. Same deck.

**Pacific NW**
- PGE/GridCARE (company press release, self-reported): 80+ MW incremental data center capacity in 2026 within 400+ MW energized by 2029 using batteries and onsite generation. Hillsboro adopted a 120-day moratorium on new data center applications. Oregon POWER Act creates data center customer class from 20 MW. [S] — [PGE/GridCARE release, Oct 2025](https://finviz.com/news/186879/portland-general-electric-and-gridcare-accelerate-hundreds-of-megawatts-of-data-center-power-in-leading-us-market); [KATU](https://katu.com/news/local/hillsboro-pauses-new-ai-data-centers-whats-next-over-the-next-120-days-portland-oregon-big-tech-green-environment-climate-change-water-local-community-utilities-money)
- No Pacific NW wait-time figure substantiated. Bloomberg (via DCK) says Amazon alleges an Oregon utility denied power for four data centers. [F] — [Data Center Knowledge/Bloomberg, 10 Nov 2025](https://www.datacenterknowledge.com/energy-power-supply/data-centers-in-nvidia-s-hometown-stand-empty-awaiting-power)

### Inferences
- A "decision layer" must treat the utility's study phase (12-18 months), engineering phase and construction phase as separate gates; ComEd's own deck shows the customer's civil completion gates utility construction.
- Queue size numbers (474 GW ERCOT, 298 GW Oncor, 22.7 GW ComEd 2025) are mostly speculative requests; actual deliverable MW is far smaller (ERCOT Batch Zero requires purchase orders and security).

### Gaps
- No primary-source wait time in years for SRP, Georgia Power, AEP Ohio, or Pacific NW.
- Dominion's own current (2026) published timeline not found; only 2024 Bloomberg.
- CBRE/Cushman reports not accessed in full (paywalled/not fetched).

## 2. Requested vs contracted/reserved vs available vs energized capacity; phase power, staged energization, bridging power

### Takeaway
Utilities distinguish a request/application, a study result, a signed agreement with deposits/collateral, and in-service energization; ERCOT formalizes this as Base Load vs Studied Load, QSA, and an annual MW allocation in a Load Commissioning Plan. Developers' "phasing" language maps to load ramp schedules. Bridge power is behind-the-meter generation used until the grid connection arrives.

### Cited Findings
- ERCOT process terms: Large Load Interconnection Study (LLIS); Interconnecting Large Load Entity (ILLE); T(D)SP (transmission/distribution service provider); Studied Load vs Base Load; QSA (loads "already energized or included in a QSA" stay eligible); Load Commissioning Plan with year-by-year MW allocation 2028-2032. [F] — [ERCOT, 29 Jul 2026](https://www.ercot.com/files/docs/2026/07/29/ERCOT-Senate-July-29-Panel-1-Assessing-The-Grid.pdf)
- ComEd requires a "load ramp schedule" up front, and its pipeline counts only applications with deposits paid ("~100 large project requests ... all with customer deposits paid"), distinguishing applications (22,673 MW in 2025) from deposit-backed projects. [F] — [ComEd/JLL deck](https://mayorscaucus.org/wp-content/uploads/2025/09/Data-Centers-and-ComEd-Power-Overview-ComEd-JLL-9-16-25.pdf)
- Southern distinguishes "contracted" (17 GW), "advanced contracting" (8 GW) and a broader pipeline above 75 GW (the 75 GW figure is from search-summary only [S]). Contracted figure [F] — [Utility Dive, 4 Aug 2026](https://www.utilitydive.com/news/southern-co-contracted-large-load-data-centers/826919/)
- Santa Clara example of partial energization: Digital Realty (48 MW critical IT load, applied 2019, aims to secure electricity by 2028) and Stack (48 MW, 12 MW available for immediate lease, power coming online through 2027 under agreement with Silicon Valley Power). Utility is sequencing power across customers as substations/lines come online ($450M upgrades due 2028). [F] — [Data Center Knowledge/Bloomberg, 10 Nov 2025](https://www.datacenterknowledge.com/energy-power-supply/data-centers-in-nvidia-s-hometown-stand-empty-awaiting-power)
- Bridge power definition: flexible behind-the-meter solution combining gas generators, Tier 4 diesel, batteries and fuel cells to supply everyday power while the utility connection is delayed; advice to set a realistic commercial operation date. No durations or costs given. [F] — [Microgrid Knowledge, 8 Jul 2026](https://www.microgridknowledge.com/distributed-energy/article/55389629/mind-the-gap-and-beyond-why-bridge-power-is-more-than-a-stopgap-measure)
- BTM at an "80% cost premium" vs retail tariffs. [S, podcast summary, weak] — [Data Center Frontier podcast](https://www.datacenterfrontier.com/home/podcast/55290367/solving-the-power-problem-for-data-centers)
- Georgia Power OpenAI contract includes 1 GW of flexible demand response, first Southern has codified with a data center. [F] — Utility Dive 4 Aug 2026 above.

### Inferences
- The same "MW" label is used for at least five different states (inquiry, application, studied, contracted, energized). A coordination layer needs a state field per MW tranche and date.

### Gaps
- No authoritative published definition of "phase power" or "staged energization" found; the practical meaning is inferred from load ramp schedules (ComEd), ERCOT annual allocations, and Santa Clara partial availability.

## 3. Transformer and substation constraints

### Takeaway
Large power transformers about 2.5 years, GSUs about 2.8 years (Wood Mackenzie Q2 2025); utilities respond by taking customer deposits early to book factory slots. Utility-owned vs customer-owned substation choice is set by load size (ComEd). Built-but-dark buildings exist (Santa Clara).

### Cited Findings
- Wood Mackenzie Q2 2025: power transformers average 128 weeks, GSU 144 weeks, switchgear 44 weeks; supply deficit 30% (power) and 10% (distribution) in 2025; announced new plants: Siemens Energy Charlotte early 2027, Eaton SC 2027, Hitachi Energy South Boston VA 2028. One source (Bolt Electrical) claims 12-14 month delivery; article notes hard to validate. [F] — [POWER, 2 Jan 2026](https://www.powermag.com/transformers-in-2026-shortage-scramble-or-self-inflicted-crisis)
- Third-party blog claims 40+ weeks for three-phase padmount; units above 300 MVA 36-48 months; switchgear spoken for through 2028. [S, low-quality blogs] — search hits only (gigaenergy, datacentres.com); the datacentres.com page I fetched did NOT contain transformer figures, so ignore the 36-48 month claim.
- Construction Owners Club cites transformer lead times of 2-4 years. [F] — [Construction Owners Club, 1 Jul 2026](https://www.constructionowners.com/insights/how-long-it-actually-takes-to-power-a-data-center-in-2026-a-u-s-market-by-market-reality-check)
- ComEd: supply chain affects "substation transformers, circuit breakers, and switchgear control buildings"; mitigates with advanced customer deposits in Phase 1 to secure manufacturing slots. Ownership: for 50-300 MW ComEd serves from 138 kV, builds customer substation (ESS), customer does civil work and foundations, ComEd typically provides transformers/breakers, customer may own own transformers in a separate fenced yard (affects monthly bill); above 300 MW customer-owned and maintained switchyard on 345 kV. ComEd requires 6-7 (acres, unit cut off in extraction; verify) for onsite substation, separate stormwater detention, TACO Tier 1 environmental land standard. [F] — [ComEd/JLL deck](https://mayorscaucus.org/wp-content/uploads/2025/09/Data-Centers-and-ComEd-Power-Overview-ComEd-JLL-9-16-25.pdf)
- Completed buildings waiting: Digital Realty SJC37 (430,000 sq ft, vacant, 48 MW, applied 2019) and Stack Santa Clara (551,000 sq ft, empty data halls, 48 MW); Silicon Valley Power $450M upgrade due 2028; Digital Realty says typical US lead time about 3 years; 74.3% of US construction pipeline already committed to tenants (CBRE). [F] — [Data Center Knowledge/Bloomberg, 10 Nov 2025](https://www.datacenterknowledge.com/energy-power-supply/data-centers-in-nvidia-s-hometown-stand-empty-awaiting-power)

### Inferences
- Long-lead procurement timing (deposit before lease signing) is a decision point where owner, utility and EPC each hold part of the information.

### Gaps
- Digital Realty/Stack building-vs-power sequencing in their own filings not retrieved. No NoVA built-but-dark case with named project found.

## 4. Moratoria, large-load tariffs, new rules

### Takeaway
Rules now push risk onto the developer: minimum-take percentages, long terms, exit fees, collateral. These change the commercial meaning of "contracted" capacity.

### Cited Findings
- AEP Ohio (PUCO order 9 Jul 2025): loads above 25 MW pay at least 85% of subscribed capacity for up to 12 years including 4-year ramp; exit fees; financial assurance; sliding scale for smaller customers; existing facilities exempt unless expanding past 25 MW; March 2023 moratorium to be lifted in phases. [F] — [POWER, 10 Jul 2025](https://www.powermag.com/regulator-approves-aep-ohios-landmark-data-center-tariff/)
- AEP Ohio requests reportedly cut from 30 GW to 13 GW after tariff; OMA called original inflated; rehearing denied Sept 2025. [S] — [IndustrialInfo](https://www.industrialinfo.com/iirenergy/industry-news/article/new-ohio-rules-help-rein-in-power-demand-from-states-data-center-pipeline--346704)
- Dominion GS-5: class for customers above 25 MW; 14-year contracts; minimum demand 85% of contracted distribution and transmission, 60% of generation; effective January 2027; approved Nov 2025 (date from search snippet). [F] — [American Action Forum, 8 Jan 2026](https://www.americanactionforum.org/insight/virginias-new-data-center-electricity-rate-class/)
- Texas SB 6: 75 MW+ threshold, batch process, financial security $50,000/MW, ERCOT-reviewed evidence; governor's pause Aug 2026 (see section 1). [F] — ERCOT PDF and Utility Dive 7 Aug 2026
- Georgia PSC minimum billing/longer terms rule (2025). [S] — [PSC fact sheet](https://psc.ga.gov/site/downloads/datacenterfactsheet.pdf)
- Oregon POWER Act (20 MW class) and Hillsboro 120-day moratorium. [S] — KATU link above.
- PJM: 2026 forecast shows about 70 GW new large load by 2038 (board letter 27 Jul 2026 via Babst Calland); Board rejected Coalition Reliability Backstop proposal. [S] — [Babst Calland](https://www.babstcalland.com/news-article/pjms-proposal-to-ferc-targets-data-centers-and-other-large-load-customers/)
- ComEd engineering deposit policy $1M/200 MW pending ICC approval (see section 1).

### Gaps
- Final status of AEP Ohio appeal to Ohio Supreme Court not confirmed. PJM "non-capacity-backed load" / connect-and-manage status not found.

## 5. Permitting and entitlements

### Takeaway
Zoning procedure defects, generator air permits and local moratoria cause the visible delays; I found no authoritative "typical timeline" for permits.

### Cited Findings
- Prince William Digital Gateway (22M sq ft, 2,100+ acres, 37 data centers, developers H&H Capital Acquisitions and GW Acquisition Co. / QTS): rezoning approved December 2023, voided Aug 2025 by Judge Kimberly Irving because the county's advertised public notice did not comply with state or county code. [F] — [WTOP, 9 Aug 2025](https://wtop.com/prince-william-county/2025/08/judge-voids-digital-gateway-rezoning-in-prince-william-county/)
- Later: Court of Appeals ruled against rezonings (31 Mar 2026); county withdrew defense April 2026; QTS withdrew Supreme Court appeal. [S, conflicting details] — [DCD](https://www.datacenterdynamics.com/en/news/judge-rules-zoning-for-pw-digital-gateway-data-center-campus-in-virginia-voided/) and [aiweekly](https://aiweekly.co/alerts/blackstones-qts-abandons-virginia-digital-gateway-campus)
- Virginia generators: HB 507 and DEQ guidance for applications on or after 1 Jul 2026 set a presumptive limit of 0.60 g/hp-hr for large data center generators (in practice advanced NOx controls, Tier IV-class); DEQ earlier withdrew a proposed variance allowing generators to run during grid stress. [S] — [Data Center Knowledge](https://datacenterknowledge.com/build-design/virginia-deq-revises-data-center-generator-rules-as-community-pushback-builds); [Virginia Mercury](https://www.virginiamercury.com/blog-va/department-of-environmental-quality-withdraws-proposed-variance-for-data-centers/)
- Georgia EPD draft synthetic-minor permit (26 generators, Fulton County) to avoid Title V major-source status. [S] — [EPD draft](https://epd.georgia.gov/document/document/28975-draft/download)
- Items that can each add months (air permitting/noise review for gas turbines, community acceptance, zoning revisions): no durations. [F] — Construction Owners Club above.
- ComEd: construction timeline contingent on customer's civil work being complete and approved; permits must be approved before the construction phase; substation land must meet TACO Tier 1. [F] — ComEd/JLL deck.
- ERCOT eligibility evidence includes land-use approvals and construction agreements, i.e. permits become queue-eligibility gates. [F] — ERCOT PDF.

### Inferences
- A scope change (e.g., adding generators, changing MW or voltage) can reopen the utility's cluster study or air permit; ComEd's "load ramp schedule" and one-line diagram are submittal conditions, so a changed ramp or one-line plausibly restarts engineering. This is inference, not a documented rule.

### Gaps
- No documented typical permit timelines (zoning, water, noise, building) by jurisdiction; no source found tying a specific missing "submission condition" to a release delay.

## 6. How developers phrase capacity promises (vocabulary)

### Takeaway
Language is inconsistent; terms mean different things by operator.

### Cited Findings
- Powered shell: completed building not yet energized, per one article; another source (law firm) describes building envelope plus base infrastructure and secured power, with tenant doing fit-out. [F for first] — [Construction Owners Club](https://www.constructionowners.com/insights/how-long-it-actually-takes-to-power-a-data-center-in-2026-a-u-s-market-by-market-reality-check); [S for second] — [Miller Thomson](https://www.millerthomson.com/en/insights/technology-ip-and-privacy/between-dirt-and-data-centres-why-the-powered-shell-model-is-gaining-traction-in-canada/)
  (Note the contradiction: "cannot yet be energized" vs "secured power capacity".)
- Critical IT load: MW reserved for tenant's servers and required support equipment, excluding cooling, lighting and ancillary. [S] — [Law Insider](https://www.lawinsider.com/dictionary/critical-it-load)
- Time to power: elapsed time from interconnection request to utility delivering contracted MW. Power letter of intent: utility's preliminary commitment, needed before greenfield financing. Stranded power, BTM, batch study (definitions from the same article). [F] — Construction Owners Club above.
- Other vocabulary seen in sources: ESS (Electric Service Station, ComEd on-site substation); TSS (transmission substation); IFC (issued for construction); Rider DE (ComEd distribution extension tariff, 5-year revenue credit and 10-year refunds); cluster study; CIAC (contribution in aid of construction); QSA; LCP; ILLE; T(D)SP; GS-5; minimum demand charge/take-or-pay; exit fee; load ramp schedule; flexible demand response. [F] — ComEd deck, ERCOT PDF, AAF.
- Leases typically 15-25 year triple-net. [S] — [datacentres.com FAQ](https://www.datacentres.com/faq/what-is-a-powered-shell)

### Gaps
- "Ready for service (RFS) date" and "day-one power": no definitions found; no investor-material language (Digital Realty, Equinix, Vantage, Aligned, Stack, Compass, QTS) fetched. Only the Santa Clara Bloomberg example shows RFS-like slippage.

## Searched but not substantiated
- Per-market wait times in years for SRP, Georgia Power, AEP Ohio, ComEd (only process-step durations), Pacific NW/Quincy WA.
- Dominion's current official timeline and any 2026 update; Dominion's published Loudoun constraint status.
- Enverus "time to power" (HTTP 403); DCD GS-5 article (403).
- CBRE/Cushman/JLL primary reports; Grid Strategies/LBNL large-load reports; DOE.
- Typical permit durations; water-permit constraints; noise ordinance cases.
- Definitions of RFS, day-one power, phase power, staged energization; developer investor-deck language.
- NoVA named built-but-dark building.
