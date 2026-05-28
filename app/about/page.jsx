'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  AcademicCapIcon, 
  GlobeAltIcon, 
  ShieldCheckIcon, 
  UsersIcon, 
  DocumentTextIcon, 
  ScaleIcon 
} from '@heroicons/react/24/outline';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Platform Overview' },
    { id: 'uniabuja', name: 'Uniabuja Collaboration' },
    { id: 'policies', name: 'Editorial Policies' },
    { id: 'ethics', name: 'Publication Ethics' },
  ];

  return (
    <div className="bg-ivory min-h-screen text-body font-sans">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-navy via-navy-mid to-navy text-white py-16 border-b border-rule/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="bg-accent/20 border border-accent/30 text-accent font-sans text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded mb-4 inline-block">
            About the Platform
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-white leading-tight">
            Scholarly Integrity & Educational Access
          </h1>
          <p className="mt-4 text-base md:text-lg font-serif text-white/80 max-w-2xl mx-auto leading-relaxed">
            Welcome to AcadExpub, a premium academic publishing and repository portal designed to streamline discovery, submissions, and peer-reviewed collaboration.
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-rule sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-6 text-sm font-sans font-medium overflow-x-auto whitespace-nowrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-accent text-accent font-bold'
                    : 'border-transparent text-muted hover:text-navy hover:border-rule'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-rule/70 rounded-md p-6 sm:p-10 shadow-sm">
          
          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-display font-semibold text-navy mb-4 border-b border-rule pb-2 flex items-center gap-2">
                  <DocumentTextIcon className="h-6 w-6 text-accent" /> Platform Overview
                </h2>
                <p className="font-serif text-body/90 text-base leading-relaxed mb-4">
                  AcadExpub serves as a high-end scholarly hub for academic research and publication workflows. Built upon strict peer-reviewed standards, our primary aim is to democratize scholarly literature by making open-access articles globally searchable and immediately readable.
                </p>
                <p className="font-serif text-body/90 text-base leading-relaxed">
                  We empower three vital scholarly communities:
                </p>
                <ul className="list-disc list-inside font-serif text-body/80 space-y-2 mt-3 ml-4">
                  <li><strong>Authors:</strong> Streamlined multi-step manuscript submission and progress-pipeline tracking.</li>
                  <li><strong>Reviewers:</strong> Dedicated review dashboard to provide expert discipline feedback securely.</li>
                  <li><strong>Readers:</strong> Seamless full-text discovery, advanced sorting, and dynamic citation exports (APA, BibTeX, RIS).</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-[#FAF8F4] border border-rule/60 p-6 rounded-md">
                  <h3 className="font-display font-bold text-navy text-lg mb-2">Our Vision</h3>
                  <p className="font-serif text-sm text-body/90 leading-relaxed">
                    To construct a bridge between developing academic communities and global indexing indexes, ensuring local scientific contributions receive the visibility they merit.
                  </p>
                </div>
                <div className="bg-[#FAF8F4] border border-rule/60 p-6 rounded-md">
                  <h3 className="font-display font-bold text-navy text-lg mb-2">Core Specifications</h3>
                  <p className="font-serif text-sm text-body/90 leading-relaxed">
                    Licensed fully under the Creative Commons Attribution 4.0 International License (CC BY 4.0), allowing immediate sharing with proper author citation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Uniabuja Collaboration */}
          {activeTab === 'uniabuja' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-display font-semibold text-navy mb-4 border-b border-rule pb-2 flex items-center gap-2">
                  <UsersIcon className="h-6 w-6 text-accent" /> Uniabuja Student Collaboration
                </h2>
                <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-md mb-6">
                  <h3 className="font-sans font-bold text-accent text-sm uppercase tracking-wider mb-2">Collaborative Academic Milestone</h3>
                  <p className="font-serif text-body text-base leading-relaxed">
                    "This website and platform represents a fully functional fullStack publishing workspace developed through the joint effort of <strong>35 dedicated University of Abuja (Uniabuja) students</strong>. It was built specifically to lower academic barriers and make scientific publishing and learning easier within the school and the wider intellectual region."
                  </p>
                </div>

                <p className="font-serif text-body/90 text-base leading-relaxed mb-4">
                  The creation of AcadExpub honors the collaborative spirit of peer-to-peer student research. Under supervision, this cohort combined database optimization, Next.js routing, and modern academic layout strategies to construct a scholarly framework capable of competing with commercial publisher software.
                </p>

                <h3 className="font-sans font-bold text-navy uppercase tracking-wider text-[11px] mt-6 mb-3">Project Impact Areas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-xs">
                  <div className="border border-rule/60 p-4 rounded text-center">
                    <span className="text-lg block mb-1">📚</span>
                    <strong className="text-navy block mb-1">Educational Resource</strong>
                    <span className="text-muted">Direct institutional resource access for researchers</span>
                  </div>
                  <div className="border border-rule/60 p-4 rounded text-center">
                    <span className="text-lg block mb-1">💻</span>
                    <strong className="text-navy block mb-1">Open Technology</strong>
                    <span className="text-muted">Built using open-source web technologies</span>
                  </div>
                  <div className="border border-rule/60 p-4 rounded text-center">
                    <span className="text-lg block mb-1">🤝</span>
                    <strong className="text-navy block mb-1">Collaborative Unity</strong>
                    <span className="text-muted">Designed, tested, and validated by 35 students</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Editorial Policies */}
          {activeTab === 'policies' && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-display font-semibold text-navy mb-4 border-b border-rule pb-2 flex items-center gap-2">
                <ScaleIcon className="h-6 w-6 text-accent" /> Editorial Policies
              </h2>
              <div className="space-y-4 font-serif text-body/90 text-base leading-relaxed">
                <div>
                  <h3 className="font-sans font-bold text-navy text-sm uppercase tracking-wider mb-1">1. Peer Review Process</h3>
                  <p>
                    All submissions undergo a thorough peer review overseen by competent editors. The review system follows single-blind or double-blind guidelines depending on the specific journal classification, selecting at least two peer reviewers with matching expertise.
                  </p>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-navy text-sm uppercase tracking-wider mb-1">2. Conflict of Interest</h3>
                  <p>
                    Authors, reviewers, and editors are required to disclose any potential conflict of interest (financial, institutional, or collaborative) during the manuscript submission or evaluation stages.
                  </p>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-navy text-sm uppercase tracking-wider mb-1">3. Archiving and Repository</h3>
                  <p>
                    Published articles are archived via our institutional repository systems to ensure long-term availability and search index robustness. All digital objects are registered with DOIs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Publication Ethics */}
          {activeTab === 'ethics' && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-display font-semibold text-navy mb-4 border-b border-rule pb-2 flex items-center gap-2">
                <ShieldCheckIcon className="h-6 w-6 text-accent" /> Publication Ethics (COPE)
              </h2>
              <div className="space-y-4 font-serif text-body/90 text-base leading-relaxed">
                <p>
                  AcadExpub aligns closely with the principles of the <strong>Committee on Publication Ethics (COPE)</strong>. We adhere strictly to ethical guidelines on authorship, data fabrication, plagiarism, and redundancy.
                </p>
                <div className="bg-[#FAF8F4] border border-rule p-5 rounded">
                  <h3 className="font-sans font-bold text-navy text-xs uppercase tracking-wider mb-2">Ethics Checklist</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-body/80 ml-2">
                    <li>Strict screening for plagiarism (iThenticate/CrossRef similarity check).</li>
                    <li>Requirement of institutional ethics approval for trials/human-subject studies.</li>
                    <li>Transparent corrections, retractions, and errata management guidelines.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
