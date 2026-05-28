import Link from "next/link";

const navLinks = [
  { href: "/", text: "Home" },
  { href: "/create-journal", text: "Manuscript Portal" },
  { href: "/about", text: "Editorial Policies" },
  { href: "/contact", text: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-navy border-t border-rule/20 py-12 mt-16 text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-rule/10 pb-8 mb-8 gap-6">
          {/* Logo Brand */}
          <div className="flex items-center space-x-2.5">
            <div className="h-8 w-8 rounded bg-accent flex items-center justify-center text-white font-display text-lg font-bold shadow-inner">
              A
            </div>
            <span className="text-white font-display text-base tracking-wide font-semibold">
              AcadEx<span className="text-accent">pub</span>
            </span>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-sans font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors duration-150"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>

        {/* Indexing and Metadata Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-sans text-white/50 mb-8">
          <div className="space-y-2">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[10px]">Registry & Prefix</h4>
            <p>ISSN: <span className="font-mono text-white/70">2944-1290 (Online)</span> | DOI Prefix: <span className="font-mono text-white/70">10.5842</span></p>
            <p>Registered Publisher: <span className="text-white/70">Divine Academic Publishing House Ltd.</span></p>
          </div>
          <div className="space-y-2 md:text-right">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[10px] md:text-right">Abstracting & Indexing</h4>
            <p className="flex flex-wrap md:justify-end gap-2 text-[11px] mt-1">
              <span className="bg-navy-mid border border-rule/10 px-2 py-0.5 rounded text-white/80">PubMed Central</span>
              <span className="bg-navy-mid border border-rule/10 px-2 py-0.5 rounded text-white/80">Scopus (Elsevier)</span>
              <span className="bg-navy-mid border border-rule/10 px-2 py-0.5 rounded text-white/80">Web of Science</span>
              <span className="bg-navy-mid border border-rule/10 px-2 py-0.5 rounded text-white/80">DOAJ</span>
            </p>
          </div>
        </div>

        {/* Copyright and Bottom Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 border-t border-rule/5 pt-6 gap-4">
          <p>&copy; {new Date().getFullYear()} AcadExpub. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/about" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/about" className="hover:text-white/70 transition-colors">Terms of Service</Link>
            <span>·</span>
            <Link href="/about" className="hover:text-white/70 transition-colors">Open Access (CC-BY 4.0)</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}