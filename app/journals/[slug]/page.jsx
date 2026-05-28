'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function JournalDetail(context) {
  const params = context.searchParams || {};
  const [activeTab, setActiveTab] = useState('issue');
  const [citationCopied, setCitationCopied] = useState(false);

  // Generate citation formats dynamically
  const title = params.title || 'Scholarly Journal Article';
  const author = params.author || 'Anonymous';
  const year = params.createdAt ? new Date(Number(params.createdAt)).getFullYear() : '2026';
  const doi = `10.5842/acadexpub.res.${year}.${Math.floor(100000 + Math.random() * 900000)}`;

  const citations = {
    bibtex: `@article{${author.split(' ').pop()}${year},\n  title={${title}},\n  author={${author}},\n  journal={AcadExpub Research},\n  year={${year}},\n  doi={${doi}}\n}`,
    ris: `TY  - JOUR\nTI  - ${title}\nAU  - ${author}\nJO  - AcadExpub Research\nPY  - ${year}\nDO  - ${doi}\nER  -`,
    apa: `${author} (${year}). ${title}. *AcadExpub Research*. https://doi.org/${doi}`
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCitationCopied(true);
    setTimeout(() => setCitationCopied(false), 2000);
  };

  return (
    <div className="bg-ivory min-h-screen text-body font-sans">
      {/* Journal Header Banner */}
      <div className="relative bg-gradient-to-r from-navy via-navy-mid to-navy text-white py-12 border-b border-rule/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="text-xs text-white/50 mb-4 flex items-center gap-1.5 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-accent">Journals</span>
            <span>/</span>
            <span className="text-white/80 truncate max-w-xs">{title}</span>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="max-w-4xl">
              <span className="bg-accent/20 border border-accent/30 text-accent font-sans text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded mb-3 inline-block">
                Original Research Paper
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-white leading-tight">
                {title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs sm:text-sm text-white/80 font-serif">
                <span>By <strong className="text-white font-medium">{author}</strong></span>
                <span className="text-white/30">•</span>
                <span>Divine Academic Publications</span>
                <span className="text-white/30">•</span>
                <span>DOI: <span className="font-mono text-white/90 text-xs">{doi}</span></span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3 bg-navy-mid/60 border border-white/10 rounded-md p-4 text-xs">
              <div className="text-center px-3">
                <span className="block text-white font-mono text-lg font-bold">1.2k</span>
                <span className="text-white/40 uppercase tracking-widest text-[9px]">Views</span>
              </div>
              <div className="border-l border-white/10 h-8"></div>
              <div className="text-center px-3">
                <span className="block text-accent font-mono text-lg font-bold">342</span>
                <span className="text-white/40 uppercase tracking-widest text-[9px]">Downloads</span>
              </div>
              <div className="border-l border-white/10 h-8"></div>
              <div className="text-center px-3">
                <span className="block text-white font-mono text-lg font-bold">8</span>
                <span className="text-white/40 uppercase tracking-widest text-[9px]">Citations</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Journal Navigation Tabs */}
      <div className="bg-white border-b border-rule sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-6 text-sm font-sans font-medium overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => setActiveTab('issue')}
              className={`py-4 border-b-2 transition-all ${
                activeTab === 'issue'
                  ? 'border-accent text-accent font-bold'
                  : 'border-transparent text-muted hover:text-navy hover:border-rule'
              }`}
            >
              Current Abstract
            </button>
            <button
              onClick={() => setActiveTab('scope')}
              className={`py-4 border-b-2 transition-all ${
                activeTab === 'scope'
                  ? 'border-accent text-accent font-bold'
                  : 'border-transparent text-muted hover:text-navy hover:border-rule'
              }`}
            >
              Aims & Scope
            </button>
            <button
              onClick={() => setActiveTab('instructions')}
              className={`py-4 border-b-2 transition-all ${
                activeTab === 'instructions'
                  ? 'border-accent text-accent font-bold'
                  : 'border-transparent text-muted hover:text-navy hover:border-rule'
              }`}
            >
              Instructions for Authors
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout (3-Column layout structured for professional reading) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Outline or Table of contents (3-cols) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-36 space-y-4 bg-paper border border-rule/70 rounded-md p-5 text-sm">
              <h3 className="font-sans font-bold text-navy uppercase tracking-wider text-[11px] mb-3 border-b border-rule pb-2">
                Manuscript Sections
              </h3>
              <ul className="space-y-3 font-serif text-muted">
                <li><a href="#abstract" className="hover:text-accent font-medium text-accent">Abstract</a></li>
                <li><a href="#introduction" className="hover:text-accent">1. Introduction</a></li>
                <li><a href="#methodology" className="hover:text-accent">2. Methodology</a></li>
                <li><a href="#results" className="hover:text-accent">3. Discussion & Results</a></li>
                <li><a href="#funding" className="hover:text-accent">Funding Acknowledgement</a></li>
                <li><a href="#citation" className="hover:text-accent">Export Citations</a></li>
              </ul>
            </div>
          </div>

          {/* Middle Column: Major Content details (6-cols) */}
          <div className="lg:col-span-6 bg-white border border-rule/70 rounded-md p-6 sm:p-8 shadow-sm">
            {activeTab === 'issue' && (
              <article className="space-y-8">
                {/* Abstract Section */}
                <div id="abstract" className="scroll-mt-36">
                  <div className="bg-paper border-l-4 border-accent p-6 rounded-r-md">
                    <h3 className="font-display font-semibold text-navy text-lg mb-3">Structured Abstract</h3>
                    <p className="font-serif text-body text-sm sm:text-base leading-relaxed">
                      {params.description || 'No structured abstract has been registered for this article. Please check the linked PDF manuscript for full metadata details.'}
                    </p>
                  </div>
                </div>

                {/* Cover Preview Image */}
                {params.image && (
                  <div className="border border-rule rounded overflow-hidden shadow-inner my-6 bg-paper">
                    <img 
                      src={params.image} 
                      alt={title} 
                      className="w-full h-80 object-cover" 
                    />
                    <div className="bg-paper p-3 text-[11px] font-serif text-muted text-center border-t border-rule">
                      Figure 1: Conceptual cover schematic rendering associated with manuscript: <em>"{title}"</em>.
                    </div>
                  </div>
                )}

                {/* Mock Scholarly details */}
                <div id="introduction" className="scroll-mt-36">
                  <h2 className="text-xl font-display font-semibold text-navy mb-3 border-b border-rule pb-2">1. Introduction</h2>
                  <p className="font-serif text-body/90 text-sm sm:text-base leading-relaxed">
                    Scholarly review demands rigorous analytical alignment, context scoping, and structural verification. 
                    In this paper, we assess the contribution of the peer-reviewed processes in promoting academic transparency. 
                    Universal accessibility remains critical for indexing, global dissemination, and secondary computational evaluation.
                  </p>
                </div>

                <div id="methodology" className="scroll-mt-36">
                  <h2 className="text-xl font-display font-semibold text-navy mb-3 border-b border-rule pb-2">2. Methodology</h2>
                  <p className="font-serif text-body/90 text-sm sm:text-base leading-relaxed">
                    By evaluating structured metadata, indexing speeds, and color contrast adherence, we construct an optimal academic standard rendering template. 
                    Data models undergo verification under the Committee on Publication Ethics (COPE) code framework guidelines.
                  </p>
                </div>

                <div id="results" className="scroll-mt-36">
                  <h2 className="text-xl font-display font-semibold text-navy mb-3 border-b border-rule pb-2">3. Discussion & Results</h2>
                  <p className="font-serif text-body/90 text-sm sm:text-base leading-relaxed">
                    Our template provides visual contrast ratios exceeding 4.5:1, ensuring compliant WCAG accessibility while preserving the editorial gravity of serious research materials.
                  </p>
                </div>

                <div id="funding" className="bg-paper/40 border border-rule/50 rounded p-4 text-xs font-serif text-muted scroll-mt-36">
                  <h4 className="font-sans font-bold text-navy uppercase text-[10px] tracking-wider mb-1">Funding & Disclosures</h4>
                  No commercial funding was received for this academic compilation. Lead authors declare no conflicting interest.
                </div>
              </article>
            )}

            {activeTab === 'scope' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-display font-semibold text-navy border-b border-rule pb-3">Aims & Scope</h2>
                <p className="font-serif text-body leading-relaxed">
                  This publication stands to promote exceptional peer-reviewed research papers, letters, and comments in modern scientific disciplines.
                </p>
                <h3 className="text-base font-sans font-bold text-navy uppercase tracking-wider text-[11px] mt-6">Core Areas of Focus</h3>
                <ul className="list-disc list-inside font-serif text-body/90 space-y-2 mt-2">
                  <li>Theoretical and computational advances</li>
                  <li>Structural optimization algorithms</li>
                  <li>Ethical research workflows and indexing</li>
                  <li>Open-source academic frameworks</li>
                </ul>
              </div>
            )}

            {activeTab === 'instructions' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-display font-semibold text-navy border-b border-rule pb-3">Instructions for Authors</h2>
                <h3 className="text-base font-sans font-semibold text-navy">Submission Formats</h3>
                <p className="font-serif text-body/90 leading-relaxed text-sm">
                  Manuscripts must be submitted in clear <strong>PDF</strong> or <strong>DOCX</strong> format, with standard citations (BibTeX or APA). Abstract lengths should remain strictly between 150 and 350 words.
                </p>
                <div className="bg-accent/5 border border-accent/20 rounded p-4 text-sm font-sans text-accent">
                  Ready to submit your own research? Visit our <Link href="/create-journal" className="font-bold underline">Manuscript Submission Portal</Link> to initiate submission workflows.
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Actions / PDF triggers / Citations (3-cols) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Core PDF Downloader Widget */}
            {params.pdf && (
              <div className="bg-paper border border-rule p-5 rounded-md text-center">
                <h4 className="font-sans font-bold text-navy uppercase tracking-wider text-[11px] mb-3">
                  Document Options
                </h4>
                <a
                  href={params.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-accent hover:bg-emerald-700 text-white font-sans text-sm font-semibold rounded shadow-md transition-colors"
                >
                  <span>📥</span> Download Full PDF
                </a>
                <p className="text-[10px] text-muted mt-2 font-serif">
                  Open-Access article distributed under standard CC-BY 4.0 terms.
                </p>
              </div>
            )}

            {/* Citation Exporter */}
            <div id="citation" className="bg-paper border border-rule/70 p-5 rounded-md scroll-mt-36">
              <h4 className="font-sans font-bold text-navy uppercase tracking-wider text-[11px] mb-3">
                Export Citation
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-muted mb-1">APA 7th Edition</label>
                  <div className="bg-white border border-rule text-[11px] p-2.5 font-serif rounded leading-relaxed select-all">
                    {citations.apa}
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(citations.apa)}
                  className="w-full text-center text-xs font-sans font-bold text-accent hover:underline py-1"
                >
                  {citationCopied ? '✓ Copied to clipboard' : '📋 Copy APA Citation'}
                </button>
              </div>
            </div>

            {/* Indexing / Licensing */}
            <div className="bg-[#FAF8F4] border border-rule/50 p-5 rounded text-xs font-sans text-muted space-y-3">
              <h4 className="font-bold text-navy uppercase tracking-wider text-[10px]">
                Article Metadata
              </h4>
              <p>Publisher: <strong className="text-navy">Divine Academic House</strong></p>
              <p>Publication Date: <strong>{params.createdAt ? new Date(Number(params.createdAt)).toLocaleDateString() : 'May 28, 2026'}</strong></p>
              <p>Journal System: <strong>AcadExpub Research</strong></p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
