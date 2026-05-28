'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function Page() {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-ivory min-h-screen py-16 px-6 sm:py-24 lg:px-8 font-sans text-body">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <span className="text-xs font-sans tracking-[0.2em] font-bold text-accent uppercase mb-3 inline-block">
          Support Desk
        </span>
        <h2 className="text-3xl font-display font-semibold tracking-tight text-navy sm:text-4xl">
          Contact the Editorial Board
        </h2>
        <p className="mt-4 text-base font-serif text-muted leading-relaxed">
          Questions regarding manuscript statuses, fee waivers, institutional subscription access, or peer review assignation? Get in touch with our operations team.
        </p>
      </div>

      <div className="max-w-xl mx-auto bg-white border border-rule/75 rounded-md p-6 sm:p-8 shadow-sm">
        {submitted ? (
          <div className="text-center py-12">
            <span className="text-4xl">✉️</span>
            <h3 className="text-lg font-display font-bold text-navy mt-4">Inquiry Successfully Transmitted</h3>
            <p className="text-xs font-serif text-muted mt-1.5 leading-relaxed">
              We have received your editorial inquiry. A corresponding administrative officer will contact you within 48 business hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 inline-flex items-center justify-center px-4 py-2 border border-accent text-accent font-sans text-xs font-bold rounded hover:bg-accent/5 transition-colors"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label htmlFor="first-name" className="block text-xs font-sans font-bold uppercase tracking-wider text-navy mb-1.5">
                  First name <span className="text-accent-alt">*</span>
                </label>
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  required
                  autoComplete="given-name"
                  className="w-full px-3 py-2 border border-rule rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>
              
              <div>
                <label htmlFor="last-name" className="block text-xs font-sans font-bold uppercase tracking-wider text-navy mb-1.5">
                  Last name <span className="text-accent-alt">*</span>
                </label>
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  required
                  autoComplete="family-name"
                  className="w-full px-3 py-2 border border-rule rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-xs font-sans font-bold uppercase tracking-wider text-navy mb-1.5">
                Affiliated Institution / University <span className="text-accent-alt">*</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                required
                placeholder="e.g. Oxford Academic Department"
                autoComplete="organization"
                className="w-full px-3 py-2 border border-rule rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-sans font-bold uppercase tracking-wider text-navy mb-1.5">
                Institutional Email <span className="text-accent-alt">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@university.edu"
                className="w-full px-3 py-2 border border-rule rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-sans font-bold uppercase tracking-wider text-navy mb-1.5">
                Detailed Inquiry Statement <span className="text-accent-alt">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Please state manuscript tracking codes, or describe your institutional access query..."
                className="w-full px-3.5 py-2 border border-rule rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent font-serif leading-relaxed"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-accent hover:bg-emerald-700 text-white font-sans text-sm font-semibold rounded shadow-md transition-colors duration-150"
              >
                Transmit Inquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
