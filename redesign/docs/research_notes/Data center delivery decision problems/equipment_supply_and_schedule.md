# Equipment supply and schedule slips in US data center construction (2024-2026)

Research date: 2026-10-26. Figures below were read in fetched pages unless marked "search snippet only". Several fetches returned 403/404 (CBRE report page, DCD "Every day counts", DCD Uptime geopolitics piece, Turner & Townsend index page, Uptime Data Report 189 PDF); those are listed under Gaps rather than reported.

## Lead times for long-lead electrical and mechanical equipment (2022 to 2026)

### Takeaway
Transformers have the best-documented numbers (Wood Mackenzie: roughly 50 weeks in 2021 to about 120 in 2024; 128 for power and 144 for GSU in Q2 2025). Switchgear is quoted at 40 to 80+ weeks in trade sources, with one concrete example of about 60 weeks. Generators are quoted at 12 to 24 months. I found no citable lead time for UPS, chillers, CDUs or busway, and no primary OEM lead-time notices.

### Cited Findings
- Average transformer lead time about 50 weeks in 2021, rising to about 120 weeks in 2024; large substation power and GSU transformers 80 to 210 weeks. US domestic supply meets only about 20% of demand. Transformer prices up 60-80% since Jan 2020. (Wood Mackenzie, 2 Apr 2024) — [WoodMac](https://www.woodmac.com/es/news/opinion/supply-shortages-and-an-inflexible-market-give-rise-to-high-power-transformer-lead-times/)
- Power transformers 128 weeks, GSU 144 weeks (Wood Mackenzie Q2 2025 survey); 2025 supply deficits of 30% (power transformers) and 10% (distribution), per WoodMac Aug 2025 analysis; distribution lead-time figure not stated; a broker claimed 12-14 months for a standard substation transformer after engineering approval (unverified by the article). Article dated 2 Jan 2026. — [POWER Magazine](https://www.powermag.com/transformers-in-2026-shortage-scramble-or-self-inflicted-crisis)
- JLL 2026 Outlook (as relayed by NextMSC, data cut-off 9 Oct 2026): average equipment lead time 33 weeks globally (about 50% above pre-2020) and 42 weeks in the US (83% above 2019). Chart reads (approximate): transformers about 43 weeks in the Americas; generators about 51 weeks in the Americas. Secondary source, chart-read values. Note these Americas transformer figures are far below WoodMac's 128 weeks, so definitions clearly differ (likely distribution/padmount class vs large power). — [NextMSC](https://www.nextmsc.com/industry-deep-dive/tariffs-vs-component-shortages)
- Switchgear: 15 kV metal-clad "routinely run 60 weeks or longer from purchase order to ship date"; 60 MVA-class transformers "60-week factory lead". Much of the quoted lead is factory-slot queue time plus submittal and decision delays, not manufacturing time. (Archdesk, published 26 Jun 2026, updated 9 Aug 2026; vendor blog) — [Archdesk](https://archdesk.com/blog/guide-to-long-lead-data-center-equipment)
- "Transformers, switchgear, and breakers are now seeing lead times of 40-80+ weeks from OEMs" (single shared range, no source cited). 22 Jul 2026. — [IPS](https://www.ips.co/news/the-hidden-risk-in-data-center-growth-power-equipment-lead-times)
- Large diesel and natural gas generators: "delivery timelines of 12 to 24 months for certain models"; smaller generators and UPS once available in weeks now often need months of planning; switchgear assemblies named as constrained (no figure). 10 Nov 2025. Vendor blog. — [Global Power](https://www.globalpwr.com/blog/why-planning-ahead-for-backup-power-equipment-matters/)
- Fluor's James Brown said turbines are "sold out into 2029" (sidebar teaser only). — [Power Engineering, 26 Mar 2026](https://www.power-eng.com/business/data-centers-shattered-records-in-2025-so-why-is-construction-slowing-down/)
- Vertiv backlog $15.0B at end 2025 (up 109% YoY), Q4 2025 book-to-bill about 2.9x, deferred revenue $1,814.7M vs $1,063.3M a year earlier; the release discloses no lead-time data. 11 Feb 2026. — [Vertiv 8-K Ex. 99.1](https://www.sec.gov/Archives/edgar/data/1674101/000167410126000006/exhibit991vrt02112026.htm)
- Slot-reservation practice: reserving manufacturing slots with non-refundable deposits before permits are granted; ordering electrical hardware after financial close and after the system impact study "no longer works"; a composite example has a delivery window two years past rent commencement under a lease with no relief clause for equipment delay. Opinion newsletter, no primary sources. 10 Sep 2026. — [Global Data Center Hub](https://www.globaldatacenterhub.com/p/order-the-transformer-before-you)
- Uptime Institute 2025 Data Center Spending and Supply Chain Survey (fielded Sep-Oct 2025, more than 400 operators per search snippet): operators reported fewer supply chain disruptions than in any of the previous five years, but "delays remain a persistent challenge." Public page is a teaser with no figures. Dec 2025. — [Uptime Data Report 189](https://intelligence.uptimeinstitute.com/resource/supply-chains-show-signs-stability-delays-persist)
- Older Uptime data: about one-fifth of operators reported major disruptions such as long equipment delays; disruption/delay share up about 60% in a year (cited in a 16 Mar 2023 article; older figure, 2022 survey). — [Data Center Knowledge](https://www.datacenterknowledge.com/supply-chain/the-state-of-data-center-supply-chains)

### Inferences
- The 2022 to 2026 trend for large transformers is clearly up (about 50 to 120 to 128-144 weeks). For switchgear and generators I have only 2025-2026 point estimates, so a 2022 comparison is not substantiated.
- Wide ranges across sources (43 vs 128 weeks for "transformers") reflect equipment class; a coordination product should track lead time per SKU and class, not per category.
- Archdesk's remark that quoted lead time is mostly slot queue plus submittal/decision delay implies owner and EPC decision latency is a controllable part of lead time.

### Gaps
- No citable lead time for UPS, chillers, CDUs or busway (searched; only generic "months" statements).
- No OEM (Schneider, Eaton, Siemens, ABB, Cummins, Caterpillar) lead-time notices or earnings-call lead-time figures found; Eaton/Schneider/Siemens results were seen only in aggregator snippets (not reported here).
- A Datacentres.com piece (Sep 2026) was reported in a search snippet as saying 18-24 month waits for >2.5 MW diesel units; when fetched, the article contained no such figure, so I excluded it.
- Full Uptime 2025 report is gated; no delay percentages obtained.

## Share of projects delivering late and by how long

### Takeaway
Multiple 2025-2026 sources say roughly a quarter to over half of projects slip, with three months a common threshold: Sightline/Currence 26% late in 2025 and 30-50% of 2026 capacity expected late; JLL 57% had a delay of 3+ months in 2025 (secondary relay); nPlan history says 60% slip more than three months.

### Cited Findings
- 26% of 110 projects expected online in 2025 were delayed; 30-50% of large data centers scheduled for 2026 expected to slip. 140 projects planned for 2026; at least 16 GW planned globally, only 5 GW under construction (mainly US); 777 projects over 50 MW tracked; causes: power constraints, equipment shortages, local opposition, labor, permitting. (Sightline Climate, via Latitude Media, 24 Feb 2026) — [Latitude Media](https://www.latitudemedia.com/news/up-to-half-of-the-worlds-data-centers-may-be-delayed-this-year/)
- Same study attributed to Currence: more than a quarter of expected 2025 capacity missed completion dates and another 10% quietly postponed commercial operation dates; typical build timelines 12-18 months; about 190 GW announced since 2024, about 16 GW scheduled for 2026, only about 5 GW under construction, about 11 GW with no visible construction progress. Note: Latitude attributes the research to Sightline Climate and Network World to Currence; the numbers are identical, so likely the same dataset under different names (unresolved). (Network World, 27 Jul 2026) — [Network World](https://www.networkworld.com/article/4201941/up-to-50-of-data-center-capacity-slated-for-2026-could-be-delayed.html)
- JLL: 57% of data center projects had a construction delay of three months or more in 2025 (JLL 2026 Outlook, relayed by NextMSC; cause not identified; NextMSC notes no public source separates delay days by cause). — [NextMSC](https://www.nextmsc.com/industry-deep-dive/tariffs-vs-component-shortages)
- nPlan analysis of 750,000 past project schedules (all sectors, not data-center-specific by the page's wording): "88% of data center projects face delays before they've even laid the foundations" and "60% slip by more than three months"; 2026 data center pipeline value $811B; "A $1 billion facility routinely becomes a $1.3 billion one." Vendor marketing; page date unclear (possibly Apr 2026). — [nPlan](https://www.nplan.io/white-papers/nplan-executive-briefing-the-data-center-delivery-problem)
- CBRE: "Many planned projects remain delayed due to ongoing permitting, zoning and power procurement hurdles"; power in most markets largely committed through 2030; best sites offer power in 18-36 months. (CBRE H2 2025 via Power Engineering, 26 Mar 2026) — [Power Engineering](https://www.power-eng.com/business/data-centers-shattered-records-in-2025-so-why-is-construction-slowing-down/)
- Bloomberg headline (not fetched): "US Data Center Construction Fell Amid Permit and Power Delays", 25 Feb 2026 (search result title only).

### Inferences
- The definitions differ (project count vs MW; delayed vs missed; global vs US), so ranges of 26% to 57% should be presented as a band, not one number.
- Equipment shortage is one of several named causes; no source apportions delay days by cause (NextMSC explicitly says none is public). This is a gap a decision layer could fill with its own data.

### Gaps
- Uptime regional delay percentages (only Latin America 71% seen in a search snippet; not verified in a fetched page).
- No survey figures found from Turner & Townsend, Cushman, DC Byte, Synergy or McKinsey on share late/duration.

## OFCI handling and why it creates schedule risk

### Takeaway
No analytical source found; evidence is job postings showing the coordination burden. OFCI equipment (UPS, generators, switchgear, chillers, CDUs) is bought by the owner, delivered to the contractor, and gated into commissioning.

### Cited Findings
- OFCI Integration Lead role: "responsible for the end to end technical and commissioning lifecycle of owner furnished, contractor installed (OFCI) equipment on major mission critical data centre projects"; align FAT (L1) and SAT (L2) with commissioning; embed OFCI milestones and readiness gates in the schedule including prerequisites for L3, L4, L5 and IST. — [Bird Construction posting](https://www.careerbeacon.com/en/job-22/3512297/bird-construction/ofci-integration-lead)
- Mortenson OFCI role tracks long-lead items (generators, UPS, switchgear, PDUs, chillers, CRAHs, controls) tied to construction sequencing and commissioning milestones (search snippet). — [Mortenson posting](https://www.mortenson.com/careers/data-center-group/assistant-project-manager-ofci-22167)
- Owner/EPC contract context: liquidated damages are a daily rate times days of delay; rates "can range from thousands to tens of thousands of dollars per day"; supply chain disruption is not automatically force majeure; owners may face customer SLA penalties; contractors seek liability caps and grace periods. 3 Dec 2025. The article does not address owner-furnished equipment. — [Bracewell](https://www.bracewell.com/resources/managing-contractual-risk-in-data-center-construction/)

### Inferences
- Where the owner buys and the contractor installs, delay liability sits in a seam: the contractor typically cannot be charged LDs for late owner-supplied gear, so the owner carries the risk (my inference; no fetched source states it).

### Gaps
- No source on contract-level allocation of OFCI delay risk, or on OFCI share of project cost; follow-up with AIA/ConsensusDocs, law firm notes is needed.

## Cost of a late megawatt

### Takeaway
Asking wholesale rent is about $196/kW-month (about $196k per MW-month) for small requirements, so each MW-month of delay is roughly $0.1-0.2M of deferred revenue; nPlan puts a 3-month slip on 100 MW at $27-65M. Construction cost is $9.5-17.6M per MW depending on scope.

### Cited Findings
- CBRE H2 2025 asking rate for 250-500 kW requirements in primary North American markets: record $196.25/kW/month (+6.6% YoY); 3-10 MW requirements up 12.5% YoY; Hillsboro 3-10 MW up 46% from $115.00 to $167.50/kW/month. Search snippet only (CBRE page returned 403); another source cites $195.94. — [CBRE H2 2025](https://www.cbre.co.uk/insights/books/north-america-data-center-trends-h2-2025)
- nPlan: "The maths on a 100MW build: $27-65m of deferred revenue before liquidated damages or a broken SLA" for a three-month slip (method not shown; vendor marketing). — [nPlan](https://www.nplan.io/white-papers/nplan-executive-briefing-the-data-center-delivery-problem)
- LD rate: thousands to tens of thousands of dollars per day on large projects. — [Bracewell](https://www.bracewell.com/resources/managing-contractual-risk-in-data-center-construction/)
- Hyperscalers typically want LDs based on rent paid and a termination right if energy is not supplied by a date; lenders often push back on termination (search snippet from Troutman, not fetched). — [Troutman](https://www.troutman.com/insights/how-energy-scarcity-is-changing-data-center-deals/)
- Cost per MW (US$M): C&W 2026 guide, US and Canada all-in greenfield excluding chips and GPUs about 17.6 (secondary; C&W reported costs up 21% per MW since Q4 2024 edition, Aug 2026); Turner & Townsend 2025-26 Silicon Valley $13.3/W (verified by that page), New Jersey 12.9 and Charlotte 9.5 (secondary); JLL shell-and-core 2026: Chicago 11-14 (mid 13.0), N. Virginia 11-12 (mid 11.5), Phoenix/Dallas/Atlanta 10-11 each. $1/W = $1M/MW. Scopes differ; do not mix. Turner & Townsend US liquid-cooled/AI premium 7-10%. — [NextMSC](https://www.nextmsc.com/industry-deep-dive/data-centre-cost-per-mw-by-region); [IREI on C&W](https://irei.com/news/cushman-wakefield-releases-2026-data-center-development-cost-guide-citing-21-rise-in-per-mw-construction-costs/)
- Turner & Townsend: cost inflation about 5.5% in 2025 vs 9.0% in 2024 (search snippet only; T&T page 404). — [T&T](https://www.turnerandtownsend.com/insights-old/data-centre-construction-cost-index-2025-2026/)
- Financing and yield context: Digital Realty reported about 10.6% stabilized yield on 437 MW under construction globally and about 12.3% on 178 MW in the Americas as of 31 Mar 2024 (older figure, search snippet of 8-K). — [DLR 8-K](https://www.sec.gov/Archives/edgar/data/0001297996/000119312524133294/d831183d8k.htm)

### Inferences
- Simple arithmetic (mine, not sourced): $196.25/kW-month x 1,000 = about $196k per MW-month asking rent; 100 MW slipping 3 months at that rate = about $59M, inside nPlan's $27-65M band. Actual hyperscale contract rents are lower than small-requirement asking rates (Hillsboro 3-10 MW $167.50), so $0.1-0.2M per MW-month is a defensible band.
- Financing carry is not quantified by any source I fetched; at $10-17M/MW capex, carry is material but I will not state a rate.

### Gaps
- No public per-day LD figure from a filing; no hyperscale contract rent per kW (only CBRE asking rates); no developer/REIT delay-penalty disclosure (Equinix, Digital Realty 10-K searches returned only yield definitions).
- Financing carry and interest during construction per MW not found.

## US pipeline under construction and capex

### Takeaway
CBRE counts 5,994.4 MW under construction in eight primary markets at end-2025 (down from 6,350.1 MW), while Census-based private data center construction spending is reported at $50.7B annualized (Apr 2026) and about $75B (Jul 2026, secondary).

### Cited Findings
- 5,994.4 MW under construction end 2025 vs 6,350.1 MW end 2024; vacancy 1.4%. (CBRE H2 2025, via Power Engineering, 26 Mar 2026) — [Power Engineering](https://www.power-eng.com/business/data-centers-shattered-records-in-2025-so-why-is-construction-slowing-down/)
- JLL midyear 2025: North American inventory 15.5 GW, vacancy 2.3%, 2.2 GW absorbed in H1 (search snippet). — [BD+C](https://www.bdcnetwork.com/building-sector-reports/data-centers/news/55310772/data-center-availability-crisis-deepens-as-vacancy-hits-historic-low-says-jll)
- ConstructConnect (28 Aug 2026): YTD 2026 data center starts $84.1B across 136 projects (nearly 3x a year earlier); July spending $2.7B across 23 projects; average cost $818.20 per sq ft (+57%); planned starts through year-end 85 projects, $78.7B; largest July project a $1.5B CyrusOne campus in Texas; power infrastructure spending $9B in 2021 to $37B in 2025. — [ConstructConnect](https://news.constructconnect.com/september-2026-data-center-report-year-to-date-spending-nearly-three-times-a-year-ago)
- Census-based spending: over $50B annualized in Apr 2026 (Bloomberg Law); about $75B annualized in Jul 2026 (secondary, cryptobriefing, unverified). The jump from $50.7B to $75B in three months looks large; verify against Census. — [Bloomberg Law](https://news.bloomberglaw.com/new-york-brief/us-construction-spending-on-data-centers-eclipses-50-billion)
- Currence/Sightline: about 5 GW under construction globally (mainly US) vs 16 GW scheduled for 2026. — [Network World](https://www.networkworld.com/article/4201941/up-to-50-of-data-center-capacity-slated-for-2026-could-be-delayed.html)

### Inferences
- CBRE (primary markets only) and Sightline (global, projects over 50 MW) measure different universes; present as a 5-6 GW band under active construction, with far more announced than building.

### Gaps
- No single authoritative US-wide GW-under-construction figure; no 2026 mid-year CBRE/JLL under-construction figure read in a fetched page.

## Industry vocabulary (one-line meanings)

### Takeaway
Definitions below come from job postings and one vendor guide; critical path, float, laydown, expedite and reallocation were not defined in any fetched source and are given as general-practice definitions (marked).

### Cited Findings
- OFCI: owner-furnished, contractor-installed equipment such as UPS, generators, chillers, CDUs. — [Bird Construction](https://www.careerbeacon.com/en/job-22/3512297/bird-construction/ofci-integration-lead)
- FAT / FWT (factory acceptance / witness test): witnessed factory test that confirms equipment meets spec before shipment; tied to commissioning Level 1. — [Archdesk](https://archdesk.com/blog/guide-to-long-lead-data-center-equipment); [Bird Construction](https://www.careerbeacon.com/en/job-22/3512297/bird-construction/ofci-integration-lead)
- SAT (site acceptance test): on-site re-verification, tied to Level 2. L3/L4/L5: later commissioning levels; IST: integrated systems test. — [Bird Construction](https://www.careerbeacon.com/en/job-22/3512297/bird-construction/ofci-integration-lead)
- Factory slot: reserved production date at the manufacturer, ideally confirmed in writing. Split release: lock critical decisions at PO award, hold others to later hold points. Hold point: dated decision milestone with owner and pricing method. Submittal: vendor drawings reviewed by the Engineer of Record before manufacturing. VCO: vendor change order (does not change owner contract). Buy-ready sheet: technical inputs completed before RFP. EoR, RFI, RFP also defined. — [Archdesk](https://archdesk.com/blog/guide-to-long-lead-data-center-equipment)
- Long-lead item: equipment (generators, UPS, switchgear, PDUs, chillers, CRAHs) procured early in design to hold the schedule. — [Mortenson](https://www.mortenson.com/careers/data-center-group/assistant-project-manager-ofci-22167)
- Primavera P6 is the scheduling tool OFCI milestones are built into; "recovery plan" is the response to procurement or logistics delay. — [Insight Global posting](https://insightglobal.com/jobs/find_a_job/california/redwood-city/lead-ofci-al-ms/job-543269/) (search snippet)
- Liquidated damages (LDs): daily rate times days of delay, set as a reasonable pre-estimate of loss. Force majeure, price escalation clause, SLA penalty also discussed. — [Bracewell](https://www.bracewell.com/resources/managing-contractual-risk-in-data-center-construction/)

### Inferences
- General-practice definitions, not from fetched sources: critical path (longest chain of dependent tasks setting the finish date); float (slack a task can slip without moving the finish); expedite (pay or push to accelerate a delivery); split shipment (deliver an order in parts); reallocation (move a reserved factory slot or unit between projects/customers); laydown (staging area on site for received equipment); commissioning "energization" (first power-on). Verify with practitioners before publishing.

### Gaps
- No glossary source covering critical path, float, laydown, expedite, reallocation, split shipment; follow up with practitioner interviews.

## Searched but not substantiated
- Chiller, CDU, busway, UPS lead times in weeks.
- OEM lead-time notices (Schneider, Eaton, Siemens, ABB, Cummins, Caterpillar).
- DC Byte, Synergy, McKinsey, Turner & Townsend, Cushman delay-share surveys.
- Public per-day LD benchmarks, lease delay-remedy numbers, financing carry per MW.
- Equinix/CyrusOne/Vantage/QTS/Aligned/Compass cost-per-MW disclosures (CyrusOne only appeared as a $1.5B Texas project in ConstructConnect).
