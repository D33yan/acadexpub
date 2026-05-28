'use client';

import { useState, useEffect } from 'react';
import { db, storage } from '@/firebaseConfig';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { Snackbar, Alert, CircularProgress } from '@mui/material';
import { auth } from '../utilits/auth-listener';
import { useRouter } from 'next/navigation';
import { TrashIcon, AcademicCapIcon, DocumentTextIcon, ClockIcon } from '@heroicons/react/24/solid';

export default function ProfilePage() {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        await fetchJournals(user.uid);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchJournals = async (uid) => {
    setLoading(true);
    try {
      const q = query(collection(db, 'journals'), where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      const journalsList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setJournals(journalsList);
    } catch (error) {
      console.error('Error fetching journals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJournal = async (id, imageUrl, pdfUrl) => {
    if (!confirm('Are you sure you want to withdraw this manuscript from the peer review pipeline? This action is irreversible.')) {
      return;
    }
    
    try {
      // Delete cover image
      if (imageUrl) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef).catch(err => console.log("Cover delete skipped:", err));
      }

      // Delete PDF
      if (pdfUrl) {
        const pdfRef = ref(storage, pdfUrl);
        await deleteObject(pdfRef).catch(err => console.log("PDF delete skipped:", err));
      }

      // Delete Firestore document
      await deleteDoc(doc(db, 'journals', id));

      setAlertMessage('Manuscript successfully withdrawn from the editorial portal.');
      setAlertSeverity('success');
      setOpen(true);

      setJournals(journals.filter(journal => journal.id !== id));
    } catch (e) {
      setAlertMessage('Withdrawal failed: ' + e.message);
      setAlertSeverity('error');
      setOpen(true);
      console.error(e);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!user) {
    return null;
  }

  // Visual helper to mock peer review status timelines
  const renderTimeline = (index) => {
    const steps = [
      { name: 'Submitted', active: true },
      { name: 'Under Review', active: index % 2 === 0 },
      { name: 'Decision Pending', active: index % 3 === 0 },
      { name: 'Accepted', active: false }
    ];

    return (
      <div className="mt-4 pt-4 border-t border-rule/30">
        <span className="text-[10px] font-sans font-bold text-muted uppercase tracking-wider block mb-3">
          Peer-Review Status Timeline
        </span>
        <div className="flex items-center justify-between gap-1 max-w-lg">
          {steps.map((st, idx) => (
            <div key={idx} className="flex items-center flex-grow last:flex-grow-0">
              <div className="flex flex-col items-center">
                <div 
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                    st.active 
                      ? 'bg-accent text-white shadow-sm' 
                      : 'bg-rule/40 text-muted border border-rule/60'
                  }`}
                >
                  {st.active ? '✓' : idx + 1}
                </div>
                <span className="text-[9px] font-sans font-bold mt-1 text-muted whitespace-nowrap">
                  {st.name}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`h-[2px] w-full mx-1 ${st.active ? 'bg-accent' : 'bg-rule/45'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='bg-ivory min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans text-body flex flex-col items-center'>
      
      {/* Dashboard Header */}
      <div className="max-w-4xl w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-rule/80 pb-6 mb-8 mt-4">
        <div>
          <h1 className="text-3xl font-display font-semibold text-navy">Author Dashboard</h1>
          <p className="text-sm font-serif text-muted mt-1">
            Track manuscript status pipelines and manage your active submissions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/create-journal"
            className="inline-flex items-center justify-center px-4 py-2 bg-accent hover:bg-emerald-700 text-white font-sans text-xs font-bold rounded shadow-md transition-colors"
          >
            Submit New Manuscript
          </a>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="max-w-4xl w-full">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <CircularProgress color="success" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Quick summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-rule p-4 rounded shadow-sm flex items-center gap-3">
                <div className="p-2.5 bg-accent/10 border border-accent/15 rounded text-accent">
                  <DocumentTextIcon className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-sans uppercase font-bold text-muted tracking-wider block">Submitted Papers</span>
                  <span className="text-xl font-display font-bold text-navy">{journals.length}</span>
                </div>
              </div>
              <div className="bg-white border border-rule p-4 rounded shadow-sm flex items-center gap-3">
                <div className="p-2.5 bg-navy-light/10 border border-navy-light/15 rounded text-navy-light">
                  <ClockIcon className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-sans uppercase font-bold text-muted tracking-wider block">In Peer Review</span>
                  <span className="text-xl font-display font-bold text-navy">
                    {journals.filter((_, idx) => idx % 2 === 0).length}
                  </span>
                </div>
              </div>
              <div className="bg-white border border-rule p-4 rounded shadow-sm flex items-center gap-3">
                <div className="p-2.5 bg-accent-alt/10 border border-accent-alt/15 rounded text-accent-alt">
                  <AcademicCapIcon className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-sans uppercase font-bold text-muted tracking-wider block">Accepted / Published</span>
                  <span className="text-xl font-display font-bold text-navy">0</span>
                </div>
              </div>
            </div>

            {/* Submissions List */}
            <div className="bg-white border border-rule/70 rounded-md p-6 shadow-sm">
              <h2 className="text-lg font-display font-bold text-navy mb-4 border-b border-rule pb-2">Active Submissions</h2>
              
              {journals.length === 0 ? (
                <div className="text-center py-12 bg-paper/40 rounded border border-dashed border-rule">
                  <span className="text-2xl">📝</span>
                  <h3 className="text-sm font-sans font-bold text-navy mt-3">No active submissions found</h3>
                  <p className="text-xs font-serif text-muted mt-1">You haven't submitted any manuscripts to the Editorial Board yet.</p>
                  <a href="/create-journal" className="mt-4 inline-block text-xs font-sans font-bold text-accent hover:underline">
                    Initiate manuscript submission &rarr;
                  </a>
                </div>
              ) : (
                <div className="divide-y divide-rule/50">
                  {journals.map((journal, index) => (
                    <div key={journal.id} className="py-6 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex-grow space-y-2">
                        {/* Tags */}
                        <div className="flex items-center gap-2">
                          <span className="bg-accent/10 border border-accent/20 px-2 py-0.5 rounded text-[9px] font-sans font-bold text-accent uppercase tracking-wider">
                            {journal.manuscriptType || 'Original Research'}
                          </span>
                          <span className="bg-paper border border-rule/80 px-2 py-0.5 rounded text-[9px] font-sans font-bold text-muted uppercase tracking-wider">
                            {journal.discipline || 'Computer Science'}
                          </span>
                        </div>
                        
                        {/* Title & Description */}
                        <h3 className="text-base font-display font-bold text-navy leading-snug">{journal.title}</h3>
                        <p className="text-xs font-serif text-muted line-clamp-2 leading-relaxed">{journal.description}</p>
                        
                        {/* Render active tracking timeline */}
                        {renderTimeline(index)}
                      </div>

                      {/* Control buttons */}
                      <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
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
                          className="flex-grow sm:flex-grow-0 text-center px-3 py-1.5 bg-paper border border-rule hover:bg-rule/45 rounded text-xs font-sans font-bold text-navy transition-colors"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => handleDeleteJournal(journal.id, journal.imageUrl, journal.pdfUrl)}
                          className="flex-grow sm:flex-grow-0 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-accent-alt/10 border border-accent-alt/25 hover:bg-accent-alt hover:text-white rounded text-xs font-sans font-bold text-accent-alt transition-colors"
                        >
                          <TrashIcon className="h-3.5 w-3.5" />
                          <span>Withdraw</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
