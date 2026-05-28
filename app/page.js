'use client';
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { createSlug } from "./utilits/slug-generate";
import AboutSection from "./about-section/page";
import JournalCards from "@/components/Journals";
import { Footer } from "@/components/Footer";
import SkeletonLoader from "@/components/SkeletonLoader";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const FALLBACK_JOURNALS = [
  {
    id: "mock-1",
    title: "Quantum Telemetry & Dynamic Metric Adaptation in Decentralized Academic Repositories",
    description: "This paper introduces a robust framework for real-time indexing speed improvements in decentralized scholarly databases using state-of-the-art telemetry protocols and double-blind validator queues.",
    author: "Dr. Evelyn Vance",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    pdfUrl: "https://arxiv.org/pdf/quant-ph/0312015.pdf",
    slug: "quantum-telemetry-dynamic-metric-adaptation",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5 // 5 days ago
  },
  {
    id: "mock-2",
    title: "Evaluating Color Contrast Standards in Scholarly Digital Interfaces: Accessibility vs. Tradition",
    description: "An empirical evaluation of WCAG 2.1 AA and AAA color standards applied to traditional academic publications. We present data comparing cognitive load and reading speed in digital readers.",
    author: "Prof. Marcus Thorne",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    pdfUrl: "https://arxiv.org/pdf/cs/0111005.pdf",
    slug: "evaluating-color-contrast-standards-scholarly-digital-interfaces",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12 // 12 days ago
  },
  {
    id: "mock-3",
    title: "The Role of Peer-Review Velocities in Accelerated Scientific Dissemination Networks",
    description: "Accelerated scientific discovery demands high-velocity peer review without sacrificing rigorous validation. We study editorial cycles across 14 indexed open-access disciplines.",
    author: "Dr. Aisha Bello",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    pdfUrl: "https://arxiv.org/pdf/cs/0212048.pdf",
    slug: "role-peer-review-velocities-accelerated-scientific-dissemination",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 28 // 28 days ago
  }
];

const getJournals = async () => {
  const alljournals = [];
  try {
    const querySnapshot = await getDocs(collection(db, "journals"));
    querySnapshot.forEach((doc) => {
      alljournals.push({ 
        ...doc.data(), //spreading the journal data
        id: doc.id 
      });
    });
  } catch (error) {
    console.error("Firebase Firestore fetch error, reverting to premium fallback journals:", error);
  }

  // If Firebase is unconfigured, offline, or has 0 entries, provide high-end mock publications
  if (alljournals.length === 0) {
    return FALLBACK_JOURNALS;
  }

  return alljournals;
};

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center my-8">
      <ul className="inline-flex items-center gap-1.5">
        {pageNumbers.map(number => (
          <li key={number}>
            <a
              onClick={(e) => {
                e.preventDefault();
                paginate(number);
              }}
              href="#"
              className={`px-4 py-2 text-sm font-medium rounded border transition-all duration-150 ${
                currentPage === number
                  ? 'bg-accent border-accent text-white shadow-md'
                  : 'bg-paper hover:bg-rule/45 border-rule text-body'
              }`}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // You can adjust the number of items per page

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const journals = await getJournals();
        setPosts(journals);
        setFilteredPosts(journals);
      } catch (err) {
        console.error("Critical error fetching journals: ", err);
        setPosts(FALLBACK_JOURNALS);
        setFilteredPosts(FALLBACK_JOURNALS);
      } finally {
        setLoading(false);
      }
    };

    fetchJournals();
  }, []);


  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    const slug = createSlug(searchValue);
    const filtered = posts.filter(post => createSlug(post.title).includes(slug));
    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to the first page on search
  };

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <section className="bg-ivory min-h-screen flex flex-col">
        {/* Immersive Hero Section */}
        <div className="relative bg-gradient-to-br from-navy via-navy-mid to-navy-light text-white overflow-hidden py-20 lg:py-28 border-b border-rule/10">
          {/* Subtle Grid overlay pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs font-sans tracking-[0.15em] text-accent uppercase font-bold bg-accent/10 px-3 py-1 rounded-full mb-6 border border-accent/20"
            >
              Independent Peer-Reviewed Publishing
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight text-white mb-6 max-w-4xl leading-[1.15]"
            >
              Advancing Knowledge Through Rigorous Peer Review
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg lg:text-xl font-serif text-white/80 max-w-2xl mb-10 leading-relaxed"
            >
              Discover open-access, indexed scholarly journals, and submit your research to world-class editorial boards.
            </motion.p>
            
            {/* CTA buttons */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <a
                href="#journals-section"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-emerald-700 text-white font-sans text-sm font-semibold rounded shadow-lg transition-all duration-200"
              >
                Browse Journals
              </a>
              <a
                href="/create-journal"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/30 hover:border-white hover:bg-white/5 text-white font-sans text-sm font-semibold rounded transition-all duration-200"
              >
                Submit Manuscript
              </a>
            </motion.div>
            
            {/* Stats Ticker */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full max-w-3xl border-t border-white/10 pt-8"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl md:text-3xl font-display font-bold text-white">1,247</div>
                  <div className="text-[10px] md:text-xs font-sans tracking-widest text-white/50 uppercase mt-1">Articles Published</div>
                </div>
                <div className="border-x border-white/10">
                  <div className="text-2xl md:text-3xl font-display font-bold text-accent">34</div>
                  <div className="text-[10px] md:text-xs font-sans tracking-widest text-white/50 uppercase mt-1">Active Journals</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-display font-bold text-white">12k+</div>
                  <div className="text-[10px] md:text-xs font-sans tracking-widest text-white/50 uppercase mt-1">Expert Reviewers</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div id="journals-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-rule pb-6 mb-8 gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-navy">
                Registered Journals
              </h2>
              <p className="text-sm font-serif text-muted mt-1">
                Explore the latest publications and aims across our indexed disciplines.
              </p>
            </div>
            
            {/* Elegant Search Panel */}
            <div className="relative flex items-center max-w-sm w-full">
              <input
                type="text"
                placeholder="Search articles or journals..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-2.5 bg-white border border-rule text-body rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm"
              />
              <button
                className="absolute right-1 p-2 bg-navy text-white rounded hover:bg-navy-light transition-colors"
                onClick={() => handleSearch({ target: { value: searchTerm } })}
              >
                <MagnifyingGlassIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="py-12">
              <SkeletonLoader />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-paper border border-rule rounded-lg">
              <span className="text-3xl">🔍</span>
              <h3 className="text-lg font-display font-semibold text-navy mt-4">No Journals Found</h3>
              <p className="text-sm font-serif text-muted mt-1">We couldn't find any journals matching "{searchTerm}".</p>
            </div>
          ) : (
            <JournalCards journals={currentItems} />
          )}

          {/* Pagination */}
          {filteredPosts.length > itemsPerPage && (
            <div className="mt-12">
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredPosts.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          )}
        </div>

        <AboutSection />
      </section>
      <Footer />
    </>
  );
}
