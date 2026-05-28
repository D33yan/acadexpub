'use client';
import React from 'react';
import Link from 'next/link';

const JournalCards = ({ journals }) => {
  return (
    <div className='w-full'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {journals.map((journal, index) => (
          <article 
            className="group bg-paper border border-rule/70 rounded-md overflow-hidden hover:shadow-[0_8px_30px_rgba(13,35,64,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            key={index}
          >
            {/* Journal Cover Thumbnail */}
            <div className="relative h-56 w-full overflow-hidden bg-navy-mid border-b border-rule/50">
              <img
                alt={journal.title}
                src={journal.imageUrl}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span className="bg-[#FAF8F4]/90 backdrop-blur-sm border border-[#1D6A4A]/20 px-2 py-0.5 rounded text-[10px] font-sans font-bold text-accent uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <span>🔓</span> Open Access
                </span>
                <span className="bg-[#0D2340]/90 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded text-[10px] font-sans font-bold text-white uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <span>✓</span> Peer-Reviewed
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex flex-col flex-grow">
              {/* Discipline and Date */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-muted bg-[#E8E1D5] px-2 py-0.5 rounded">
                  Scholarly Research
                </span>
                <span className="text-white/20">|</span>
                <span className="text-[11px] font-sans text-muted">
                  {journal.createdAt ? new Date(journal.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : 'May 2026'}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-display font-semibold text-navy leading-snug line-clamp-2 mb-3 group-hover:text-accent transition-colors duration-200">
                {journal.title}
              </h3>

              {/* Description Snippet */}
              <p className="text-sm font-serif text-body/85 line-clamp-3 mb-4 flex-grow leading-relaxed">
                {journal.description}
              </p>

              {/* Authors */}
              <div className="border-t border-rule/60 pt-4 mt-auto flex items-center justify-between">
                <div className="min-w-0">
                  <span className="text-[10px] font-sans uppercase font-bold text-muted tracking-wider block">Lead Author</span>
                  <span className="text-xs font-serif text-navy font-semibold truncate block mt-0.5">{journal.author}</span>
                </div>

                <Link
                  href={{
                    pathname: `journals/${journal.slug}`,
                    query: {
                      title: journal.title,
                      author: journal.author,
                      description: journal.description,
                      image: journal.imageUrl,
                      pdf: journal.pdfUrl,
                      createdAt: journal.createdAt,
                    }
                  }}
                  className="inline-flex items-center gap-1 text-xs font-sans font-bold text-accent hover:text-emerald-700 transition-colors"
                >
                  Read Journal
                  <span aria-hidden="true" className="block transition-all group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default JournalCards;
