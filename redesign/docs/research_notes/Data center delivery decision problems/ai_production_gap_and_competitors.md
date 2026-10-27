# Enterprise AI pilot-to-production gap and decision-intelligence / construction-AI competitive landscape (2025-2026)

Evidence-quality legend: [F] = figure read on a page I fetched (WebFetch). [S] = figure appeared only in a WebSearch result summary, page not opened (treat as secondary). Today = 2026-10-26.

## (a) How few AI pilots reach production / deliver value

### Takeaway
Every major survey shows a large conversion gap, but the numbers measure different things (measurable P&L return, POC-to-production, share of pilots at scale, project cancellation forecasts) and must not be pooled. The most defensible framing: most organizations are experimenting, a minority scale, and governance maturity lags deployment plans.

### Cited Findings
- MIT NANDA, "The GenAI Divide: State of AI in Business 2025" (July 2025): "95% of organizations are seeing no business return"; "just 5% of integrated AI pilots are extracting millions in value"; enterprise spend "$30-40 billion". [F] — [Virtualization Review, 2025-08-19](https://virtualizationreview.com/articles/2025/08/19/mit-report-finds-most-ai-business-investments-fail-reveals-genai-divide.aspx)
- Same report, funnel for enterprise-grade systems: 60% evaluated, "only 20% reached pilot stage and just 5% reached production"; "only 5% of custom enterprise AI tools reach production". Mid-market pilot-to-full-implementation about 90 days vs nine months or longer for large enterprises. [F] — same URL
- MIT stated cause: "Most GenAI systems do not retain feedback, adapt to context, or improve over time"; core barrier is learning, not infrastructure, regulation or talent. [F] — same URL
- MIT method/scope: Jan-Jun 2025; 300+ public AI initiatives reviewed; 52 structured interviews; 153 senior-leader survey responses. [F] — same URL. Caveat: small, self-selected sample; "95% failure" is press framing, the report's wording is about measurable return. [S] — [WebSearch result summarizing coverage, e.g. letsdatascience.com](https://letsdatascience.com/news/mit-report-documents-genai-pilot-roi-gap-e0924d7d)
- Gartner (press release 2025-06-25): "more than 40 percent of agentic AI projects could be canceled by the end of 2027", citing rising costs, unclear business value, weak risk controls; "agent washing": only about 130 of thousands of agentic AI vendors are genuine. Basis: Jan 2025 poll of 3,412 webinar attendees (19% significant investment, 42% conservative, 8% none, 31% waiting/unsure); webinar sample may not represent the market. [F via secondary] — [w.media, 2025-06-27](https://w.media/over-40-percent-of-agentic-ai-projects-could-face-the-axe-by-end-of-2027-gartner/). Gartner's own page returned HTTP 403, not read.
- Gartner forecasts at least 15% of day-to-day work decisions made autonomously by agentic AI by 2028, and 33% of enterprise software including agentic AI by 2028. [S] — WebSearch summary of w.media/CRN coverage ([CRN](https://www.crn.in/?p=72052))
- IDC with Lenovo (CIO Playbook 2025): 88% of observed POCs don't reach wide-scale deployment; "for every 33 AI POCs launched, only four reached production". Article dated 2025-03-25; no sample size stated. [F] — [CIO.com](https://www.cio.com/article/3850763/88-of-ai-pilots-fail-to-reach-production-but-thats-not-all-on-it.html)
- IDC causes: "low level of organizational readiness in terms of data, processes and IT infrastructure"; unclear ROI; insufficient AI-ready data; lack of in-house expertise; Nadkarni: "Most of these gen AI initiatives are born at the board level" and POCs "highly underfunded or not funded at all". [F] — same CIO.com URL
- Deloitte, "State of AI in the Enterprise 2026: The Untapped Edge" (survey of 3,235 director-to-C-suite leaders, 24 countries, six industries; coverage dated 2026-01-21): about a quarter say at least 40% of AI experiments have reached production; 54% expect to by six months; projects scoped at three months can take 18+ months ("proof-of-concept trap"). [F via secondary] — [Unite.AI](https://www.unite.ai/state-of-ai-in-the-enterprise-2026-deloitte-maps-the-untapped-edge-of-enterprise-ai/)
- McKinsey State of AI 2025 (Agents, innovation, and transformation): 23% scaling an agentic system somewhere in the enterprise, 39% experimenting; no more than 10% scaling agents in any single function; 88% use AI in at least one function (78% a year earlier). [S] — WebSearch summary of [McKinsey page](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-state-of-ai-2025) (my fetch of that page timed out; page not read). A Kanerika claim (62% exploring/using agents, 39% see profit improvement) not verified.
- S&P Global Market Intelligence (451 Research) 2025: 42% of companies abandoned most of their AI initiatives in 2025 (vs 17% prior year); average 46% of POCs scrapped before implementation; about 1,006 respondents. [S] — secondary only, e.g. [thisweekhealth.com](https://thisweekhealth.com/news/ai-project-failures-surge-to-42-as-companies-struggle-to-scale/); sources disagree on whether "abandoned" means "most" or "at least one" initiative. Original not seen.
- Banks: Bank of America has deployed an Agentforce-based internal advisory platform to "around 1,000 financial advisers"; Erica handles work "equivalent to about 11,000 employees"; 18,000 developers use AI coding tools, about 20% productivity gain; article notes "ongoing concerns about accuracy and oversight". [F, secondary summary] — [NASCUS, 2026-03-26](https://www.nascus.org/2026/03/26/ai-agents-enter-banking-roles-at-bank-of-america/)
- JPMorgan: LLM Suite portal; agentic testing framework in 80 internal engineering services; "25 virtual agents serve 12,000 private banking clients" (cited to Expansion); tech budget quoted as about $18B or $19.8B in different sources. [S] — secondary blogs (ai2.work, ecosistemastartup, okoone); conflicting, unverified.

### Inferences
- "95% see no return" (MIT) and "88% of POCs never scale" (IDC) and "about a quarter have 40%+ of pilots in production" (Deloitte) are different denominators; a pitch should cite one with its scope, not blend them.
- The consistent cause across MIT, IDC and Gartner is non-model: workflow fit, data readiness, unclear value, weak risk controls. This supports Resonance's argument that the missing piece is a decision layer, not a better model.

### Gaps
- UNVERIFIED / NOT FOUND: "Bank of America built 1,900 agents, one in production" (or any similar count). A search found no source for 1,900 or "one in production". Do not use. Only the 1,000-adviser rollout above was found.
- No official JPMorgan or BofA disclosure of agents-in-production counts was found.
- Not read at primary source: Gartner press release (403), McKinsey (timeout), Fortune/Forbes MIT coverage, the MIT NANDA PDF itself (403 on computing.co.uk; PDF not attempted), S&P Global, BCG AI Radar (not searched), Deloitte original.
- Svitla claim that IDC CIO Playbook 2026 shows 46% of POCs reached production: single source, unverified. RAND "80.3% of AI projects fail": seen only in a secondary summary, unverified.

## (b) Why pilots stall, and what enterprises say they require

### Takeaway
Surveys point to governance and oversight gaps, ROI/outcome measurement, data/integration readiness and trust in vendors' hallucination protection. Agent governance maturity is low (13-21% depending on survey and wording).

### Cited Findings
- Dataiku / Harris Poll, "Global AI Confessions Report: CIO Edition", 685 CIOs in 8 countries, fieldwork 9-29 July (2026), published 2026-09-24 (per TNW): 81% lack complete oversight of agents created outside formal channels; 72% cannot consistently confirm agents deliver intended business outcomes (while 90% say they track all agents); 83% lack standardized lifecycle management; 84% say employees create agents faster than IT can govern; 60% lack a central AI governance layer; 21% have full near-real-time AI cost visibility. [F] — [The Next Web](https://thenextweb.com/news/cio-ai-agent-oversight-dataiku-survey). Vendor-sponsored survey.
- Gartner survey of 360 IT application leaders (orgs 250+ employees; fielded May-June 2025; press release 2025-09-30): 75% piloting/deploying/deployed some agents; only 15% considering fully autonomous agents; only 13% "strongly agreed" they had the right governance structures; 74% see agents as a new attack vector; only 19% have high/complete trust in vendor hallucination protection. [S] — WebSearch summary of [Gartner release](https://www.gartner.com/en/newsroom/press-releases/2025-09-30-gartner-survey-finds-just-15-percent-of-it-application-leaders-are-considering-piloting-or-deploying-fully-autonomous-ai-agents) (not fetched)
- Deloitte 2026: only 21% have "a mature governance model for autonomous agents"; 23% use agentic AI at least moderately, 74% expect to within two years; top AI risks: data privacy/security 73%, legal/regulatory compliance 50%, governance oversight 46%; production needs integration, security/compliance reviews, monitoring, maintenance. [F via secondary] — [Unite.AI, 2026-01-21](https://www.unite.ai/state-of-ai-in-the-enterprise-2026-deloitte-maps-the-untapped-edge-of-enterprise-ai/)
- EU AI Act: Art. 12 requires high-risk systems to technically allow automatic event logging over the system lifetime for traceability; Art. 14 requires human overseers who can understand capabilities and limits, monitor, intervene/override, and decline to use an output. Sources list 2 August 2026 as high-risk obligations date. [S] — WebSearch summary of [Commission AI Act Service Desk Art. 12](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-12) and commentary; the "Art. 14 needs Art. 12 records" argument is a vendor opinion ([Weilliptic](https://weilliptic.ai/blog/eu-ai-act-where-provenance-once-urged-now-decreed/)).
- Logicalis CIO survey: 66% not fully confident their AI governance model can keep pace with deployment. [S] — WebSearch summary, original not opened.

### Inferences
- The three requirements in the Resonance pitch (audit record, accountable human owner, deterministic/evidence-linked output) map directly to Art. 12 logging, Art. 14 override/oversight, and the CIO complaint that they cannot confirm outcomes (72%).
- Most CIO governance data is about agent sprawl and oversight; direct evidence on "deterministic solver" demand is thin (see Gaps).

### Gaps
- NIST AI RMF: not researched/fetched this session; no citable text captured.
- Whether EU AI Act high-risk dates changed (digital omnibus delay proposals): not checked; verify before citing 2 Aug 2026. An unverified claim of six-month log retention (Art. 19) was seen only in a vendor guide.
- No survey found specifically on CIOs of construction/capital-project owners or on determinism as a stated requirement. MintMCP "95% of IT leaders cite integration as a hurdle": vendor blog, no primary source, do not use.
- Is $500M-project-scale decision governance quantified anywhere? Not found.

## (c) Competitive landscape: how adjacent vendors describe themselves

### Takeaway
Construction vendors lead with "AI for construction", insights, agents and a unified platform; decision-intelligence vendors (Aera, Quantexa) already use "governed", "auditable", "explainable", "policies you set". Nobody fetched leads with deterministic solvers plus named human ownership plus audit record for a capital decision; Aera and Quantexa come closest on governance wording.

### Cited Findings (verbatim from fetched vendor pages, 2026-10-26 unless noted)
- nPlan: "AI FOR PROJECT CONTROLS AND DELIVERY"; "Plan. Assure. De-risk. Deliver."; "Trained on a dataset of 750,000 historical schedules representing over $2Tn of construction spend"; "Our AI has $500bn of projects under active management"; data centers a listed sector; webinar "The $811B Question - Does AI Hold the Key to Delivering the Global Data Center Project Pipeline?"; logos include Google, Shell, ExxonMobil, Skanska. — [nplan.io](https://www.nplan.io/)
- ALICE Technologies: "ALICE is AI purpose-built for construction"; "ALICE automates 'what-if' scenario exploration with AI"; "Designed for industrial construction: energy, data centers, battery plants, semifab facilities". Site shows inconsistent deployed-project value ($410B text vs $127B alt text). — [alicetechnologies.com](https://www.alicetechnologies.com/)
- Slate Technologies: "Build Smart"; "AI-enabled software designed to tackle construction's toughest problems."; "95% of construction data goes unused."; blog "Building Data Centers Faster: How Connected Intelligence Can Reduce Risk Across the Project Lifecycle". — [slate.ai](https://www.slate.ai/)
- Doxel: "Physical Intelligence for Construction"; "Automated Progress Tracking to Build Faster"; QTS Data Centers schedule coordinator testimonial: "Doxel is valuable because it's objective. It consistently gives owners confidence we can deliver on time." — [doxel.ai](https://www.doxel.ai/)
- Procore: "Construction AI built to get work done"; agents: Deep Search ("Get reliable answers across specs, drawings, RFIs, and submittals — with citations."), Submittal Review, RFI ("draft complete, pre-populated RFIs for review"), Daily Log, Contract Review. "Procore Helix" does NOT appear on the /ai page. — [procore.com/ai](https://www.procore.com/ai). Procore claims leadership in data center construction, "9 of the 10 largest North American data center sites"; NVIDIA Omniverse digital twins of data centers in Procore; Datagrid acquisition folded into Procore AI. [S] — WebSearch summary ([Procore data center page](https://www.procore.com/en-ae/blog/procore-data-center-construction), Q2 2026 transcript).
- Autodesk Construction Cloud: "Build it with Autodesk"; "Achieve results that matter—safer, faster, and with less stress—on Autodesk's leading construction management platform."; "Leverage Autodesk AI to help automate everyday construction workflows and surface insights to streamline decision making." — [construction.autodesk.com](https://construction.autodesk.com/)
- Kahua: "Know what's happening across every project and program."; "Kahua is an AI enterprise construction project management platform built for complex capital programs."; AI assistant "Noa"; "Use Kahua AI with confidence knowing project data stays inside a secure environment." — [kahua.com](https://www.kahua.com/)
- InEight: "Integrated Software for Capital Construction"; "Deliver high-stakes capital projects with certainty"; "Data for Outcome-Driven AI"; "Precise data gives you the foundation for better day-to-day decisions and the strongest possible base for AI." — [ineight.com](https://ineight.com/)
- Aera Technology: "Your Enterprise Decides Autonomously"; "Turn business challenges into intelligent decisions that execute autonomously, within the policies you set."; "Aera understands, recommends, acts, and learns"; "Decision Governance" nav item; "Aera captures the context, knowledge, and outcomes of every decision" (no explicit audit language). — [aeratechnology.com](https://www.aeratechnology.com/)
- Quantexa: "Put Context Behind Every Decision"; "The platform to automate and augment your decision-making."; "Build trust through explainable and auditable AI"; "trusted, governed layer". — [quantexa.com](https://www.quantexa.com/)
- Peak: "Agentic solutions that predict, decide and act autonomously" (page does not use "decision intelligence"; focus inventory/pricing, not construction). — [peak.ai](https://www.peak.ai/)
- Palantir: Chain Reaction launched Dec 2025 with CenterPoint Energy and NVIDIA as founding partners; uses AIP and Ontology with NVIDIA Nemotron/CUDA-X to manage supply chains for gigawatt-scale AI data center buildouts (power generation/distribution, construction, data center operations). [S] — WebSearch summary of [Business Wire, 2025-12-04](https://www.businesswire.com/news/home/20251204391468/en/Palantir-Launches-Chain-Reaction-to-Build-American-AI-Infrastructure-Founding-Partners-Include-CenterPoint-Energy-and-NVIDIA) (fetch returned 403). A MarketScale headline says McCarthy Building Cos. signed a multimillion-dollar Palantir deal; article not opened, unverified.
- Bentley: Bentley Co-pilot "context-aware AI assistant"; CEO Cumins: "At Bentley, our vision is for AI to empower infrastructure engineers, not replace them." [S] — [AI Magazine](https://aimagazine.com/news/bentley-systems-unveils-ai-powered-digital-twin-tools) (via search summary)

### Inferences
- Differentiation openings: nPlan/ALICE sell schedule forecasting/scenarios; Doxel sells progress capture; Procore/Autodesk/Kahua sell platform-plus-assistant; none (as captured) claims a named accountable owner and an audit record per recommendation. Procore's "with citations" and Aera's "policies you set" show evidence-linking and policy governance are being claimed, so Resonance should be specific about solver determinism and ownership rather than "governed AI".
- Palantir is the closest threat on the data center buildout (ontology + AIP + CenterPoint/NVIDIA) but Chain Reaction is framed at supply-chain/energy level.

### Gaps
- Palantir.com pages (home, AIP) returned only titles; Oracle Primavera Cloud (403); Trimble (404 page); Hexagon: no tagline captured; Bentley only via secondary summary. Procore Helix naming unverified.
- No data-center-specific delivery platform tied to CyrusOne, Vantage or Compass was found; ArchDesk blog on data center construction 2026 surfaced but not read.
- Autodesk Assistant description not on the fetched page.

## Generic phrases and evidence of overuse

### Takeaway
Evidence for overuse is qualitative; no source quantifies "single source of truth", "digital twin" or "copilot" specifically.

### Cited Findings
- A 2025 study of 50 startup homepages found "seamless", "scalable" and "AI-powered" in nearly every homepage; "seamless" most frequent (16 times). [S] — [techeconomy.ng](https://techeconomy.ng/overused-startup-buzzwords-2025-expert-warns-these-cliches-are-hurting-new-brands/) via search summary
- Construction-tech CMO David Horesh: AEC marketing has converged on generic ROI stats; a senior civil engineer read "AI" as a person's name. [S] — [Bricks & Bytes Bulletin](https://bricks-bytes.beehiiv.com/p/why-your-construction-marketing-looks-like-everyone-else-s-and-how-to-fix-it)
- "AI-washing" in construction: buyers stretched thin, few can test claims. [S] — [Studio Matrx, Sept 2026](https://www.studiomatrx.org/students/ai-in-construction-management/ai-washing-in-construction)
- Gartner's "agent washing" (only about 130 genuine agentic vendors) — see section (a).
- In-category usage seen on fetched pages: "AI-enabled", "AI purpose-built", "insights" (Autodesk, Slate), "assistant/agents" (Procore, Kahua Noa, Bentley Co-pilot), "unified view" (Doxel), "digital twin" (Procore/NVIDIA, Bentley), "decides/acts autonomously" (Aera, Peak). Access Group: only 15% operate from a genuinely unified system, "one live source of truth" is a product pitch. [S] — [Access Group](https://www.theaccessgroup.com/en-us/construction/resources/dashboard-fatigue-crisis-in-construction/)

### Inferences
- Avoid: "AI-powered insights", "single source of truth", "digital twin", "copilot", "intelligent automation", "agentic", "governed AI" without mechanism.

### Gaps
- No quantitative frequency study of these phrases across vendor sites; this would need a scrape.
