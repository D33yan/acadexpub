
import { 
  ShieldCheckIcon, 
  ArrowPathIcon, 
  GlobeAltIcon, 
  AcademicCapIcon 
} from '@heroicons/react/24/outline';

const pillars = [
  {
    name: 'Rigorous Peer Review',
    description: 'Every submitted manuscript undergoes single-blind or double-blind peer-review by at least two expert referees in the respective scientific discipline.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Indexed & Universal Open Access',
    description: 'Licensed under CC BY 4.0, all publications are immediately and permanently free to read, download, and index across global citation indexes.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Rapid Editorial Process',
    description: 'We respect the speed of discovery. Our streamlined editorial queues aim for a first-decision cycle within 21 days of submission.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Academic Integrity & COPE Compliance',
    description: 'Adhering to strict Committee on Publication Ethics policies, we enforce severe plagiarism checks and clear conflict of interest disclosures.',
    icon: ShieldCheckIcon,
  },
];

export default function AboutSection() {
  return (
    <div className="bg-paper border-y border-rule/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xs font-sans tracking-[0.2em] font-bold text-accent uppercase mb-3">
            Institutional Policies
          </h2>
          <p className="text-3xl font-display font-semibold tracking-tight text-navy sm:text-4xl">
            Excellence in Scholarly Communication & Research
          </p>
          <p className="mt-4 text-base font-serif text-muted max-w-2xl mx-auto leading-relaxed">
            AcadExpub supports authors, reviewers, and readers by delivering transparent, indexed, and high-impact academic publication systems.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-12 lg:max-w-none lg:grid-cols-2">
            {pillars.map((pillar) => (
              <div 
                key={pillar.name} 
                className="relative pl-16 bg-[#FAF8F4] p-6 rounded-md border border-rule/50 hover:shadow-md transition-shadow duration-200"
              >
                <dt className="text-base font-display font-bold text-navy">
                  <div className="absolute left-4 top-6 flex h-10 w-10 items-center justify-center rounded bg-accent/10 border border-accent/15">
                    <pillar.icon aria-hidden="true" className="h-5 w-5 text-accent" />
                  </div>
                  {pillar.name}
                </dt>
                <dd className="mt-2 text-sm font-serif text-body/90 leading-relaxed">
                  {pillar.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
