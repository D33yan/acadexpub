# AcadExpub — Academic Journal & Manuscript Publishing Platform
## Master Design Standards & Full Implementation Prompt

---

## PLATFORM OVERVIEW

**AcadExpub** is a professional academic publishing platform for peer-reviewed journals, manuscript submissions, and scholarly communication. It serves three primary audiences:

- **Authors** — Submitting, tracking, and revising manuscripts
- **Reviewers** — Accessing assigned papers, submitting reviews
- **Readers/Subscribers** — Browsing, searching, and reading published articles
- **Editors** — Managing submission pipelines and publication workflows

---

## I. DESIGN PHILOSOPHY & AESTHETIC STANDARDS

### Core Aesthetic Direction
> **"Scholarly Refinement"** — The platform must feel authoritative, trustworthy, and intellectually serious without being cold or intimidating. Think the visual language of *Nature*, *The Lancet*, or *Oxford Academic* elevated with modern UX sensibility.

- **Tone:** Editorial/magazine meets institutional gravitas. Restrained, not sterile.
- **Mood:** Deep navy + warm ivory + a single strong accent (forest green or burgundy). Never tech-startup purple gradients.
- **Differentiator:** Generous white space, exceptional typography hierarchy, and a sense that every element earns its place on the page.

### Typography
```
Display / Headings:    "Playfair Display" or "EB Garamond" (serif — conveys scholarly weight)
Body Text:             "Source Serif 4" or "Lora" (optimized for long-form reading)
UI / Labels / Nav:     "DM Sans" or "Neue Haas Grotesk" (clean, not Inter/Roboto)
Code / DOI:            "JetBrains Mono" (monospaced for identifiers)

Base size:             16–18px body, 1.7–1.8 line-height for article body
Article reading width: max 680px column, centered
Scale (Major Third):   13 / 16 / 20 / 25 / 31 / 39 / 49px
```

### Color System
```css
:root {
  /* Primary */
  --color-navy:       #0D2340;   /* primary brand, headers */
  --color-navy-mid:   #1A3A5C;   /* nav backgrounds */
  --color-navy-light: #2E5481;   /* interactive states */

  /* Accent */
  --color-accent:     #1D6A4A;   /* forest green — CTAs, links, tags */
  --color-accent-alt: #8B1A2B;   /* burgundy — alerts, featured labels */

  /* Neutrals */
  --color-ivory:      #FAF8F4;   /* page background */
  --color-paper:      #F3EFE8;   /* card backgrounds */
  --color-rule:       #D9D0C3;   /* dividers, borders */
  --color-muted:      #6B6560;   /* secondary text, metadata */
  --color-body:       #2C2820;   /* primary body text */

  /* Feedback */
  --color-success:    #1D6A4A;
  --color-warning:    #A0630A;
  --color-error:      #8B1A2B;
  --color-info:       #1A4A7A;

  /* Dark mode variants */
  --color-dark-bg:    #0A1520;
  --color-dark-surface: #111E2D;
  --color-dark-border:  #1E3350;
}
```

### Spacing Scale (8px base)
```
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128px
Section padding: 80–120px vertical
Card padding: 24–32px
```

### Motion Principles
- Transitions: `200ms ease` for hover, `300ms ease-out` for page elements
- No decorative animation for article reading views (distraction-free)
- Subtle fade-in stagger on search results / article grids
- Smooth scroll-anchoring for in-article navigation

---

## II. INFORMATION ARCHITECTURE

```
/ (Home)
├── /journals                    — Browse all journals
│   └── /journals/[slug]         — Individual journal homepage
├── /articles                    — Search & browse all articles
│   └── /articles/[doi-or-id]    — Full article view
├── /submit                      — Author submission portal
│   ├── /submit/new              — New manuscript submission
│   └── /submit/track            — Track submission status
├── /review                      — Reviewer portal (authenticated)
│   ├── /review/queue            — Assigned manuscripts
│   └── /review/[id]             — Review workspace
├── /editorial                   — Editor dashboard (authenticated)
├── /account                     — User profile, preferences
├── /about                       — About, editorial board, policies
│   ├── /about/policies          — Publication ethics, open access
│   ├── /about/board             — Editorial board members
│   └── /about/contact           — Contact editorial team
└── /search                      — Full-text search
```

---

## III. PAGE-BY-PAGE DESIGN SPECIFICATIONS

---

### 3.1 GLOBAL NAVIGATION

**Top Bar (ultra-slim, 36px)**
```
[ISSN badge] [Impact Factor badge]  ·  Open Access  ·  Publication Ethics  |  Sign In  Register
```
Background: `var(--color-navy)` | Text: rgba(255,255,255,0.7) | 12px DM Sans

**Main Navigation (64px)**
```
[AcadExpub Logo + Wordmark]   Journals   Articles   Submit   For Reviewers   About        [🔍 Search]  [Sign In ▾]
```
- Logo: Geometric serif "A" mark + "AcadExpub" wordmark
- Active state: bottom border 2px accent green
- Sticky on scroll with backdrop blur: `backdrop-filter: blur(12px)`
- Mobile: hamburger → full-screen overlay menu

**Breadcrumb** (appears on inner pages)
```
Home > Journals > Journal of Computational Biology > Vol. 12, Issue 3 > Article
```
Font: 13px DM Sans | Color: muted | Separator: `/`

---

### 3.2 HOME PAGE

**Hero Section (100vh)**
- Background: Deep navy gradient with subtle topographic/grid texture overlay
- Headline: 64px Playfair Display, ivory, max 2 lines
  - e.g. *"Advancing Knowledge Through Rigorous Peer Review"*
- Subheadline: 20px Source Serif 4, muted ivory, max 2 lines
- CTA buttons:
  - Primary: `Browse Journals` — filled accent green, 48px height
  - Secondary: `Submit Manuscript` — outlined white, 48px height
- Stats ticker below CTAs: `[1,247 Articles] · [34 Journals] · [12,000+ Reviewers]`

**Featured Journals Strip**
- 4-column grid of journal cards
- Each card: Cover thumbnail, journal name (Playfair Display), discipline tag, article count
- Hover: card lifts 4px, accent underline appears on title

**Latest Articles Section**
- 3-column grid, card layout:
  - Article title (18px, serif, 2-line clamp)
  - Journal name + volume/issue
  - Authors (truncated to 3 + "et al.")
  - Abstract snippet (3-line clamp)
  - Tags: [Open Access] [Peer-Reviewed] [discipline]
  - Publication date + DOI

**Call to Action — Authors**
- Full-width section, paper background
- Split: 60% editorial text + 40% submission steps visual
- Steps: `Prepare → Submit → Review → Publish`

**Recent Issue Highlights**
- Horizontal scrollable strip of journal issue covers

**Footer**
```
[Logo]  [Journal Index]  [Submission Guidelines]  [Editorial Policies]  [Contact]
[ISSN: xxxx-xxxx]  [DOI Prefix: 10.xxxxx]  [Indexed in: PubMed | Scopus | Web of Science]
© 2025 AcadExpub. All rights reserved.  |  Privacy Policy  |  Terms of Use
```

---

### 3.3 JOURNAL HOMEPAGE (`/journals/[slug]`)

**Journal Header**
- Full-width banner: journal cover art (abstract/field-relevant illustration), overlay gradient
- Journal title: 48px Playfair Display
- ISSN (Print + Online) | Impact Factor | Publisher | Frequency
- Quick links: [Aims & Scope] [Editorial Board] [Submit] [Current Issue]

**Navigation Tabs**
```
Current Issue  |  Archive  |  Aims & Scope  |  Editorial Board  |  Instructions for Authors  |  Submit
```
Underline tab style, sticky below journal header on scroll

**Current Issue Panel**
- Volume, Issue number, Publication date
- Cover image (if applicable)
- Table of contents: article list with title, authors, page range, abstract toggle, PDF link
- Section headers: Reviews / Original Research / Letters / Commentary

**Archive Grid**
- Year-grouped accordion
- Each issue: compact card with cover, volume/issue, article count, date

**Editorial Board**
- Grid of board member cards: photo/avatar, name, institution, role, specialty

---

### 3.4 ARTICLE VIEW (`/articles/[id]`)

This is the **most critical page** — readers spend the most time here.

**Article Header**
```
[Journal Name]  ›  [Volume X, Issue Y]
─────────────────────────────────────────────────────
[Section Badge: ORIGINAL RESEARCH]   [Open Access 🔓]

Title: 36–42px Playfair Display, max 3 lines
Authors: Author 1¹, Author 2¹², Author 3²  (superscript affiliations)
Affiliations: numbered list, 14px muted
Received: DD Mon YYYY  |  Accepted: DD Mon YYYY  |  Published: DD Mon YYYY
DOI: 10.xxxxx/xxxxxxxx    [Copy DOI] [Cite] [Share]
```

**Reading Layout — 3-Column**
```
[Sticky TOC sidebar 220px] | [Article body 680px] | [Tools/meta sidebar 260px]
```

Left Sidebar (Table of Contents):
- Section anchors auto-generated from H2/H3
- Highlight active section on scroll
- Collapse on mobile

Article Body:
- Font: Source Serif 4, 17px, 1.75 line-height
- H2: 24px Playfair Display | H3: 19px DM Sans semibold
- Figures: full column width, numbered, captioned below in 13px italic
- Tables: styled, zebra striped, caption above
- Equations: MathJax rendered
- Inline citations: bracketed numbers [1], clickable → reference below
- Code blocks (if applicable): JetBrains Mono, syntax highlighted
- Footnotes: bottom of section or end of document
- Pull quotes for key findings

Right Sidebar (Sticky):
```
[Download PDF]
[Export Citation ▾]  — BibTeX / RIS / APA / MLA
[Share ▾]  — Email / Twitter / LinkedIn / Copy Link
─────────────────
Article Metrics
Views: 1,247
Downloads: 342
Citations: 8
Altmetric Score: [badge]
─────────────────
Related Articles
[3 article cards]
─────────────────
Funding & Conflicts
[Expand]
```

**Abstract**
- Visually separated box: `var(--color-paper)` background, 1px rule border left accent
- Structured abstract headers if applicable: Background / Methods / Results / Conclusions
- Keywords: pill tags below abstract

**References Section**
- Numbered list, hanging indent
- DOI links for each reference
- "Cited by" count per reference where available

**Author Information**
- Expandable author cards: photo, institution, ORCID link, email (if public)

---

### 3.5 MANUSCRIPT SUBMISSION PORTAL (`/submit`)

**Layout:** Clean, step-by-step wizard with progress tracker

**Progress Bar (top of page)**
```
① Manuscript Details → ② Authors → ③ Upload Files → ④ Cover Letter → ⑤ Review & Submit
```
- Steps: circle numbered, filled accent on complete, active ring, grey future
- Persistent across all steps

**Step 1 — Manuscript Details**
```
Journal Selection*          [Dropdown — searchable]
Manuscript Type*            [Original Research | Review | Short Communication | Letter | Case Study]
Title*                      [Textarea, char count: 0/250]
Running Title               [Input, max 60 chars]
Abstract*                   [Textarea, 150–350 words counter, live word count]
Keywords*                   [Tag input, 4–8 keywords, autocomplete]
Field / Discipline*         [Hierarchical dropdown]
Suggested Reviewers         [+ Add Reviewer — Name, Email, Institution — up to 5]
Opposed Reviewers           [+ Add — with reason field]
```

**Step 2 — Authors**
```
Corresponding Author (pre-filled from account)
[+ Add Co-author]
  → Name, Email, Institution, ORCID (optional), Contribution (CRediT taxonomy checkboxes)
[Drag to reorder author list]
```

**Step 3 — Upload Files**
```
Manuscript File*        [Drag & drop zone — .docx / .tex / .pdf]
Figures                 [Multi-upload — .tif / .eps / .png — individual captions]
Supplementary Files     [Optional multi-upload]
Cover Image             [Optional — for potential journal cover]
Data Availability       [Statement textarea + Dataset DOI link]
```
File requirements shown: resolution, format, size limits

**Step 4 — Cover Letter**
```
[Rich text editor — formatting toolbar]
[Word count: 0/600]
[Template: "Use suggested structure" link]
```

**Step 5 — Review & Submit**
- Full summary of all entered data
- Inline edit links for each section
- Ethics & Declarations checklist:
  - [ ] All authors have approved the manuscript
  - [ ] No plagiarism / proper attribution
  - [ ] Conflicts of interest disclosed
  - [ ] Ethical approval obtained (if applicable)
  - [ ] Data sharing statement included
- [Submit Manuscript] — primary CTA, accent green
- Submission confirmation → email + dashboard tracking number

---

### 3.6 AUTHOR DASHBOARD (`/submit/track`)

**Submission Status Cards**
```
[Manuscript Title truncated]
Status badge: Under Review | With Editor | Revisions Required | Accepted | Published | Rejected
Journal name  |  Submitted: DD Mon YYYY  |  Last updated: X days ago
[View Details]  [Upload Revision]  [Withdraw]
```

**Status Timeline (inside detail view)**
```
✓ Submitted          Apr 2, 2025
✓ Editor Assigned    Apr 4, 2025
✓ Peer Review        Apr 10, 2025
◉ Decision Pending   (current)
○ Author Response
○ Final Decision
○ Production
```

**Reviewer Comments Panel**
- Reviewer 1 / Reviewer 2 expandable sections
- Comment text + response textarea (for revisions)
- "Reply to Reviewer" structured response form

---

### 3.7 REVIEWER PORTAL (`/review`)

**Queue Dashboard**
- Pending invitations (Accept / Decline with reason)
- Active assignments with deadlines
- Completed reviews history

**Review Workspace (`/review/[id]`)**
- Split-view: article PDF (left iframe) + review form (right panel)
- Review form sections:
  - Overall Recommendation: [Accept | Minor Revision | Major Revision | Reject]
  - Confidential comments to editor (textarea)
  - Comments to authors (rich text, numbered/section by section)
  - Specific criteria scoring sliders (Originality / Methodology / Clarity / Impact): 1–10
  - Suggested references (optional)
- [Submit Review] | [Save Draft]

---

### 3.8 SEARCH PAGE (`/search`)

**Search Bar**
- Prominent, full-width, 56px input
- Placeholder: *"Search articles, authors, journals, keywords..."*
- Filters row below: Date range | Journal | Article type | Open Access only | Field

**Results Layout**
- Left: filter sidebar (collapsible on mobile)
- Right: results list

**Each Result Card**
```
[Article type badge]  [Open Access badge if applicable]
Title (20px, serif, clickable)
Authors · Journal Name · Vol. X No. Y · Year
Abstract snippet with keyword highlighting
DOI  |  Cited by X  |  Views: X  |  [Save] [Cite]
```

**Sort:** Relevance | Most Recent | Most Cited | Most Downloaded

---

## IV. COMPONENT LIBRARY STANDARDS

### Buttons
```
Primary:    bg accent-green, white text, 4px radius, 14px DM Sans semibold, 44px height
Secondary:  border 1.5px accent-green, accent text, transparent bg
Ghost:      no border, body text, underline on hover
Danger:     bg burgundy, white text (withdraw, delete actions)
Disabled:   40% opacity, not-allowed cursor
```

### Form Elements
```
Input height:    44px
Border:          1px solid var(--color-rule)
Border radius:   4px
Focus ring:      2px solid var(--color-accent), 2px offset
Error state:     border burgundy, error message 13px below
Label:           12px DM Sans semibold, uppercase, letter-spacing 0.06em
Required:        asterisk in accent color, visually placed after label
```

### Cards
```
Background:      var(--color-paper)
Border:          1px solid var(--color-rule)
Border radius:   6px
Padding:         24px
Hover shadow:    0 4px 20px rgba(13,35,64,0.10)
Hover transform: translateY(-2px)
Transition:      200ms ease
```

### Badges / Tags
```
Open Access:     green bg light, green text, lock-open icon
Peer Reviewed:   navy bg light, navy text, checkmark icon
Discipline:      paper bg, muted text, pill shape
Volume/Issue:    small pill, rule border
```

### Tables (data-dense)
```
Header row:      navy bg, white text, 13px DM Sans uppercase
Body rows:       alternating ivory / paper, 13px Source Serif
Border:          1px rule between rows only (no vertical lines)
Sticky header:   on scroll within table container
```

### Modals
```
Overlay:         rgba(0,0,0,0.5) backdrop
Panel:           white, 6px radius, max 640px wide, 80vh max-height
Header:          24px Playfair + [X] close button
Scroll:          panel body scrollable, header/footer sticky
Focus trap:      keyboard accessible
```

### Notification Toasts
```
Position:        bottom-right, stacked
Width:           360px
Types:           success (green), error (burgundy), info (navy), warning (amber)
Auto-dismiss:    5s (closable)
```

---

## V. CONTENT STANDARDS

### Article Metadata Required Fields
```
- Title (max 250 chars)
- Abstract (150–350 words for research; 100–250 for others)
- Keywords (4–8 terms)
- Subject classification (up to 3 from controlled vocabulary)
- Author names + affiliations + ORCID
- Corresponding author email
- Funding acknowledgment
- Conflict of interest statement
- Data availability statement
- Received / Accepted / Published dates
- DOI (auto-assigned on acceptance)
- License (CC BY 4.0 default for open access)
```

### Citation Export Formats
Support all of: BibTeX, RIS, APA 7th, MLA 9th, Chicago 17th, Vancouver, Harvard

### DOI Structure
`10.[prefix]/acadexpub.[journal-code].[year].[article-id]`

---

## VI. ACCESSIBILITY STANDARDS (WCAG 2.1 AA)

- All color contrast ratios ≥ 4.5:1 (body text), ≥ 3:1 (large text)
- All interactive elements keyboard navigable (Tab order logical)
- ARIA labels on all icon-only buttons
- Focus rings visible at all times (never `outline: none` without replacement)
- Alt text required on all figures; captions required on all tables
- PDF downloads must have accessible PDF tags
- Screen reader announcements for dynamic content (form validation, toast messages)
- Skip-to-content link as first focusable element
- Semantic HTML: `<article>`, `<nav>`, `<aside>`, `<main>`, `<section>` properly used
- Form labels associated to inputs with `for`/`id` or `aria-labelledby`
- Reading mode: user-toggleable high contrast and dyslexia-friendly font (OpenDyslexic)

---

## VII. RESPONSIVE DESIGN BREAKPOINTS

```
Mobile:   < 640px   — single column, hamburger nav, collapsible sidebars
Tablet:   640–1024px — 2-col article grid, drawer sidebars
Desktop:  1024–1440px — full 3-col article view, fixed sidebars
Wide:     > 1440px  — max-width 1400px centered, increased whitespace
```

Article reading view on mobile:
- Body column: full width minus 32px margins
- Sidebars: converted to collapsible bottom drawers or tabs
- TOC: floating "Contents" FAB button bottom-right

---

## VIII. PERFORMANCE STANDARDS

- **Core Web Vitals:** LCP < 2.5s, CLS < 0.1, INP < 200ms
- Lazy-load images below the fold
- PDF viewer: lazy-initialize, load on demand
- Article pages: critical CSS inlined, non-critical deferred
- Search: debounced (300ms) with loading skeleton states
- Static journal/article pages: pre-rendered (SSG where possible)
- Font loading: `font-display: swap`, subset to Latin + extended
- MathJax: load only on pages containing equations

---

## IX. TECHNICAL STACK RECOMMENDATION

```
Frontend:         Next.js 14+ (App Router) — SSG for articles, SSR for auth pages
Styling:          Tailwind CSS + CSS custom properties for theme tokens
PDF Rendering:    PDF.js for in-browser reading
Equations:        MathJax 3 or KaTeX
Rich Text Editor: TipTap (submission cover letter, review forms)
Search:           Elasticsearch or Typesense (full-text + faceted)
File Upload:      Uppy.js with multipart upload to S3
Authentication:   NextAuth.js — supports ORCID OAuth, institutional SSO
Database:         PostgreSQL (article metadata) + S3 (files/PDFs)
DOI Minting:      Crossref API integration
Email:            React Email + Resend for transactional emails
Analytics:        Plausible (privacy-first) for article metrics
```

---

## X. EMAIL NOTIFICATION TEMPLATES

Design all transactional emails with:
- Header: AcadExpub logo + journal name (if applicable)
- Clean single-column layout, 600px max-width
- Font: Source Serif 4 (or fallback Georgia) body, DM Sans headings
- Primary CTA button: accent green
- Footer: unsubscribe link, platform address, ISSN

Required email types:
1. Submission confirmation (with tracking ID)
2. Review invitation (accept/decline links)
3. Reviewer reminder (7-day, 3-day before deadline)
4. Decision notification (accept / revisions / reject)
5. Revision request with editor letter attached
6. Acceptance and production update
7. Publication notification with article link + social share buttons
8. Password reset / account verification

---

## XI. EDITORIAL POLICY PAGES

Must include and clearly present:
- Aims & Scope (per journal)
- Types of Manuscripts Accepted
- Peer Review Process (single-blind / double-blind / open)
- Publication Ethics (COPE compliance)
- Author Guidelines (formatting, reference style, word limits)
- Open Access Policy + APC fees (if applicable)
- Data Sharing Policy
- Conflict of Interest Policy
- Retraction & Correction Policy
- Appeals Process

---

## XII. IMPLEMENTATION PHASES

### Phase 1 — Public-Facing (MVP)
- [ ] Home page with journal listing
- [ ] Individual journal pages
- [ ] Article reading pages (HTML + PDF)
- [ ] Basic search with filters
- [ ] About / Policy pages
- [ ] Mobile responsive

### Phase 2 — Author Portal
- [ ] Account registration (ORCID OAuth)
- [ ] Multi-step submission wizard
- [ ] Author dashboard with status tracking
- [ ] File upload (manuscript + figures)
- [ ] Revision upload workflow
- [ ] Submission confirmation emails

### Phase 3 — Review System
- [ ] Reviewer accounts and queue
- [ ] Review invitation workflow
- [ ] Split-view review workspace
- [ ] Review form + recommendation
- [ ] Editor decision tools

### Phase 4 — Advanced
- [ ] Full-text search (Elasticsearch)
- [ ] Article metrics dashboard
- [ ] Citation export (all formats)
- [ ] Institutional access management
- [ ] API for indexers (OAI-PMH compliance)
- [ ] Admin/editorial dashboard

---

*This document is the authoritative design and implementation standard for AcadExpub. All contributors must consult it before building any new feature or page.*
