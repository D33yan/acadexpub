'use client';

import { useState, useEffect } from 'react';
import { db, storage } from '@/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Snackbar, Alert, CircularProgress } from '@mui/material';
import { auth } from '../utilits/auth-listener';
import { useRouter } from 'next/navigation';
import { createSlug } from '../utilits/slug-generate';

export default function CreateJournal() {
  // Main form values (preserving Firestore schema)
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [description, setDescription] = useState('');

  // Extended wizard metadata
  const [manuscriptType, setManuscriptType] = useState('Original Research');
  const [discipline, setDiscipline] = useState('Computer Science');
  const [keywords, setKeywords] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [declarations, setDeclarations] = useState({
    approved: false,
    noPlagiarism: false,
    noConflict: false,
    ethicalApproval: false,
  });

  // UI state controllers
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleNextStep = () => {
    // Step validation
    if (step === 1) {
      if (!title || !author || !description) {
        setAlertMessage('Please complete all manuscript details');
        setAlertSeverity('error');
        setOpen(true);
        return;
      }
    } else if (step === 2) {
      if (!manuscriptType || !discipline || !keywords) {
        setAlertMessage('Please select manuscript classifications and keywords');
        setAlertSeverity('error');
        setOpen(true);
        return;
      }
    } else if (step === 3) {
      if (!coverImage || !pdf) {
        setAlertMessage('Please upload both cover image and PDF manuscript');
        setAlertSeverity('error');
        setOpen(true);
        return;
      }
    } else if (step === 4) {
      if (!declarations.approved || !declarations.noPlagiarism || !declarations.noConflict) {
        setAlertMessage('You must check and agree to all required publication ethics declarations');
        setAlertSeverity('error');
        setOpen(true);
        return;
      }
    }
    setStep(prev => Math.min(prev + 1, 5));
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleCreateJournal = async (e) => {
    e.preventDefault();

    if (!title || !author || !coverImage || !pdf || !description) {
      setAlertMessage('Please ensure all required files and details are loaded');
      setAlertSeverity('error');
      setOpen(true);
      return;
    }

    setLoading(true);

    try {
      // Upload cover image
      const coverImageRef = ref(storage, `images/${coverImage.name}`);
      await uploadBytes(coverImageRef, coverImage);
      const imageUrl = await getDownloadURL(coverImageRef);

      // Upload PDF
      const pdfRef = ref(storage, `pdfs/${pdf.name}`);
      await uploadBytes(pdfRef, pdf);
      const pdfUrl = await getDownloadURL(pdfRef);

      // Save data to Firestore with the uid (Preserving existing schema & adding metadata fields for richness)
      await addDoc(collection(db, 'journals'), {
        title,
        author,
        imageUrl,
        pdfUrl,
        description,
        manuscriptType,
        discipline,
        keywords,
        coverLetter,
        slug: createSlug(title),
        uid: user.uid,
        createdAt: new Date().getTime(),
      });

      setAlertMessage('Manuscript submitted successfully to the Editorial Board!');
      setAlertSeverity('success');
      setOpen(true);

      // Clear states & reset step
      setTitle('');
      setAuthor('');
      setCoverImage(null);
      setPdf(null);
      setDescription('');
      setKeywords('');
      setCoverLetter('');
      setDeclarations({
        approved: false,
        noPlagiarism: false,
        noConflict: false,
        ethicalApproval: false,
      });
      setStep(1);
      
      // Delay and redirect to author profile/dashboard to track submission status
      setTimeout(() => {
        router.push('/profile');
      }, 1500);

    } catch (e) {
      setAlertMessage('Submission failed: ' + e.message);
      setAlertSeverity('error');
      setOpen(true);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!user) {
    return null;
  }

  const stepsList = [
    { num: 1, label: 'Manuscript Details' },
    { num: 2, label: 'Classifications' },
    { num: 3, label: 'Upload Files' },
    { num: 4, label: 'Cover Letter & Ethics' },
    { num: 5, label: 'Review & Submit' }
  ];

  return (
    <div className='bg-ivory min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans text-body flex flex-col items-center justify-start'>
      {/* Page Header */}
      <div className="max-w-3xl w-full text-center mb-8 mt-4">
        <h1 className="text-3xl font-display font-semibold text-navy">Manuscript Submission Portal</h1>
        <p className="text-sm font-serif text-muted mt-2">
          Submit your research paper to the AcadExpub Editorial System for peer-review.
        </p>
      </div>

      {/* Persistent Wizard Progress Bar */}
      <div className="max-w-3xl w-full bg-white border border-rule/75 rounded-md p-6 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 w-full justify-between sm:justify-start">
            {stepsList.map((s, idx) => (
              <div key={s.num} className="flex items-center">
                <div 
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-sans transition-all duration-200 ${
                    step >= s.num 
                      ? 'bg-accent text-white ring-4 ring-accent/15' 
                      : 'bg-paper text-muted border border-rule'
                  }`}
                >
                  {s.num}
                </div>
                <span className={`text-[11px] font-sans font-bold ml-2 hidden md:inline tracking-wider uppercase ${
                  step === s.num ? 'text-navy' : 'text-muted'
                }`}>
                  {s.label}
                </span>
                {idx < stepsList.length - 1 && (
                  <div className="h-[2px] w-8 sm:w-12 bg-rule/50 mx-2 hidden sm:block"></div>
                )}
              </div>
            ))}
          </div>
          <div className="text-xs font-sans font-bold tracking-widest text-accent uppercase">
            Step {step} of 5
          </div>
        </div>
      </div>

      {/* Main Wizard Form Card */}
      <div className="max-w-3xl w-full bg-white border border-rule/70 rounded-md shadow-sm p-6 sm:p-8">
        
        {/* Step 1: Manuscript Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="border-b border-rule pb-4 mb-6">
              <h2 className="text-lg font-display font-bold text-navy">Step 1: Core Manuscript Details</h2>
              <p className="text-xs font-serif text-muted mt-0.5">Please provide the primary bibliographic information.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-xs font-sans font-bold uppercase tracking-wider text-navy mb-1.5">
                  Manuscript Title <span className="text-accent-alt">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter full descriptive manuscript title"
                  className="w-full px-3.5 py-2 border border-rule rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-xs font-sans font-bold uppercase tracking-wider text-navy mb-1.5">
                  Lead / Corresponding Author <span className="text-accent-alt">*</span>
                </label>
                <input
                  id="author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Dr. Jane Doe"
                  className="w-full px-3.5 py-2 border border-rule rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-xs font-sans font-bold uppercase tracking-wider text-navy mb-1.5">
                  Structured Abstract <span className="text-accent-alt">*</span>
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  placeholder="Summarize the background, methodology, discussion, and results (150-350 words)..."
                  className="w-full px-3.5 py-2 border border-rule rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent font-serif leading-relaxed"
                />
                <p className="text-[11px] text-muted font-serif mt-1">Abstracts will display alongside published HTML documents.</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Classifications */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="border-b border-rule pb-4 mb-6">
              <h2 className="text-lg font-display font-bold text-navy">Step 2: Manuscript Classifications</h2>
              <p className="text-xs font-serif text-muted mt-0.5">Categorize your paper to assist editorial matching.</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="type" className="block text-xs font-sans font-bold uppercase tracking-wider text-navy mb-1.5">
                    Manuscript Type <span className="text-accent-alt">*</span>
                  </label>
                  <select
                    id="type"
                    value={manuscriptType}
                    onChange={(e) => setManuscriptType(e.target.value)}
                    className="w-full px-3 py-2 border border-rule rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                  >
                    <option value="Original Research">Original Research Article</option>
                    <option value="Review Article">Comprehensive Review</option>
                    <option value="Short Communication">Short Communication</option>
                    <option value="Case Study">Case Study</option>
                    <option value="Letter to Editor">Letter to the Editor</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="discipline" className="block text-xs font-sans font-bold uppercase tracking-wider text-navy mb-1.5">
                    Discipline / Subject Field <span className="text-accent-alt">*</span>
                  </label>
                  <select
                    id="discipline"
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value)}
                    className="w-full px-3 py-2 border border-rule rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                  >
                    <option value="Computer Science">Computer Science & AI</option>
                    <option value="Computational Biology">Computational Biology</option>
                    <option value="Mathematical Sciences">Mathematical Sciences</option>
                    <option value="Environmental Studies">Environmental Studies</option>
                    <option value="Information Systems">Information Systems & Engineering</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="keywords" className="block text-xs font-sans font-bold uppercase tracking-wider text-navy mb-1.5">
                  Keywords <span className="text-accent-alt">*</span>
                </label>
                <input
                  id="keywords"
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="e.g. peer review, web accessibility, metadata mapping (comma separated)"
                  className="w-full px-3.5 py-2 border border-rule rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                />
                <p className="text-[11px] text-muted font-serif mt-1">Provide 4 to 8 controlled subject terms.</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: File Upload Zone */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="border-b border-rule pb-4 mb-6">
              <h2 className="text-lg font-display font-bold text-navy">Step 3: Document Upload</h2>
              <p className="text-xs font-serif text-muted mt-0.5">Upload figures and the primary text manuscript files.</p>
            </div>

            <div className="space-y-6">
              {/* Cover Image Upload */}
              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-navy mb-1.5">
                  Journal Cover Thumbnail Image <span className="text-accent-alt">*</span>
                </label>
                <div className="flex items-center gap-4 bg-paper p-4 rounded border border-rule">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                    className="text-xs font-sans text-body"
                  />
                  {coverImage && (
                    <span className="text-xs font-sans font-bold text-accent">
                      ✓ Loaded: {coverImage.name.substring(0, 20)}...
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted font-serif mt-1">Upload JPEG, PNG or TIF, used for article indexing mock covers.</p>
              </div>

              {/* PDF Manuscript Upload */}
              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-navy mb-1.5">
                  Manuscript PDF File <span className="text-accent-alt">*</span>
                </label>
                <div className="border-2 border-dashed border-rule rounded-lg p-8 text-center bg-paper hover:bg-[#FAF8F4] transition-colors duration-150">
                  <span className="text-3xl">📄</span>
                  <p className="text-sm font-sans font-semibold text-navy mt-3">Drag and drop your primary manuscript</p>
                  <p className="text-xs text-muted font-serif mt-1">Supported Formats: PDF format only. Maximum size: 20MB.</p>
                  
                  <label className="mt-4 inline-flex items-center justify-center px-4 py-2 border border-accent text-accent font-sans text-xs font-bold rounded cursor-pointer hover:bg-accent/10 transition-colors">
                    Browse File
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setPdf(e.target.files[0])}
                      className="sr-only"
                    />
                  </label>
                  {pdf && (
                    <div className="mt-3 text-xs font-sans font-bold text-accent bg-accent/10 border border-accent/20 py-1.5 px-3 rounded inline-block">
                      Selected Document: {pdf.name} ({(pdf.size / (1024 * 1024)).toFixed(2)} MB)
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Cover Letter & Ethics Checklist */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="border-b border-rule pb-4 mb-6">
              <h2 className="text-lg font-display font-bold text-navy">Step 4: Cover Letter & Ethical Affirmations</h2>
              <p className="text-xs font-serif text-muted mt-0.5">Affirm compliance with COPE international publications policies.</p>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="coverLetter" className="block text-xs font-sans font-bold uppercase tracking-wider text-navy mb-1.5">
                  Cover Letter (Confidential to Editor)
                </label>
                <textarea
                  id="coverLetter"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={4}
                  placeholder="Introduce your manuscript to the Chief Editor, stating significance and originality..."
                  className="w-full px-3.5 py-2 border border-rule rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent font-serif leading-relaxed"
                />
              </div>

              {/* Ethics Checkboxes */}
              <div className="bg-paper p-5 rounded-md border border-rule space-y-3">
                <h4 className="font-sans font-bold text-navy uppercase text-[10px] tracking-wider border-b border-rule pb-2 mb-2">
                  Ethical Attestation & Disclosure
                </h4>
                
                <label className="flex items-start gap-3 cursor-pointer text-xs font-serif select-none">
                  <input
                    type="checkbox"
                    checked={declarations.approved}
                    onChange={(e) => setDeclarations({ ...declarations, approved: e.target.checked })}
                    className="mt-0.5 border-rule text-accent focus:ring-accent rounded"
                  />
                  <span>All co-authors have approved the final manuscript and authorize submission. <span className="text-accent-alt">*</span></span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer text-xs font-serif select-none">
                  <input
                    type="checkbox"
                    checked={declarations.noPlagiarism}
                    onChange={(e) => setDeclarations({ ...declarations, noPlagiarism: e.target.checked })}
                    className="mt-0.5 border-rule text-accent focus:ring-accent rounded"
                  />
                  <span>No plagiarism exists in this work. All references are fully cited. <span className="text-accent-alt">*</span></span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer text-xs font-serif select-none">
                  <input
                    type="checkbox"
                    checked={declarations.noConflict}
                    onChange={(e) => setDeclarations({ ...declarations, noConflict: e.target.checked })}
                    className="mt-0.5 border-rule text-accent focus:ring-accent rounded"
                  />
                  <span>All commercial conflicts of interest are declared, or declared as none. <span className="text-accent-alt">*</span></span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer text-xs font-serif select-none">
                  <input
                    type="checkbox"
                    checked={declarations.ethicalApproval}
                    onChange={(e) => setDeclarations({ ...declarations, ethicalApproval: e.target.checked })}
                    className="mt-0.5 border-rule text-accent focus:ring-accent rounded"
                  />
                  <span>Ethical committee approval was obtained where animal or human models were explored.</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Review & Submit */}
        {step === 5 && (
          <form onSubmit={handleCreateJournal} className="space-y-6">
            <div className="border-b border-rule pb-4 mb-6">
              <h2 className="text-lg font-display font-bold text-navy">Step 5: Review & Final Submission</h2>
              <p className="text-xs font-serif text-muted mt-0.5">Verify that all data is correctly entered before uploading.</p>
            </div>

            <div className="space-y-4 bg-paper/60 border border-rule p-5 rounded-md text-xs sm:text-sm font-sans text-body">
              <div className="grid grid-cols-3 gap-2 border-b border-rule pb-2.5">
                <span className="font-bold text-navy">Manuscript Title</span>
                <span className="col-span-2 font-serif text-navy/95 italic font-medium">{title}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-rule pb-2.5">
                <span className="font-bold text-navy">Lead Author</span>
                <span className="col-span-2 font-serif">{author}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-rule pb-2.5">
                <span className="font-bold text-navy">Classification</span>
                <span className="col-span-2 bg-[#FAF8F4] px-2 py-0.5 rounded border border-rule/50 inline-block font-mono text-xs">{manuscriptType} ({discipline})</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-rule pb-2.5">
                <span className="font-bold text-navy">Abstract</span>
                <span className="col-span-2 font-serif text-xs line-clamp-3 leading-relaxed">{description}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-rule pb-2.5">
                <span className="font-bold text-navy">Keywords</span>
                <span className="col-span-2">{keywords}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-rule pb-2.5">
                <span className="font-bold text-navy">Files Attached</span>
                <span className="col-span-2 font-mono text-xs text-accent">
                  📁 Cover: {coverImage?.name.substring(0, 15)}... | 📄 MS PDF: {pdf?.name.substring(0, 15)}...
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="font-bold text-navy">Ethics Attestation</span>
                <span className="col-span-2 text-accent font-bold">✓ Approved & Attested</span>
              </div>
            </div>

            <div className="bg-accent-alt/5 border border-accent-alt/25 rounded p-4 text-xs font-serif text-accent-alt">
              ⚠️ Warning: Submitted manuscripts are immediately registered. Editing author indices after peer assignment requires editor review.
            </div>

            {/* Hidden Submit Button triggered dynamically */}
            <div className="hidden">
              <input type="submit" id="actual-submit-btn" />
            </div>
          </form>
        )}

        {/* Wizard Navigation Bar */}
        <div className="mt-8 pt-6 border-t border-rule flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={step === 1 || loading}
            className={`px-4 py-2 border rounded font-sans text-xs font-bold transition-colors ${
              step === 1 
                ? 'border-rule text-rule/50 cursor-not-allowed' 
                : 'border-navy text-navy hover:bg-navy/5'
            }`}
          >
            &larr; Previous Step
          </button>

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-5 py-2.5 bg-navy hover:bg-navy-light text-white font-sans text-xs font-bold rounded shadow-md transition-colors"
            >
              Next Step &rarr;
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                const subBtn = document.getElementById('actual-submit-btn');
                if (subBtn) subBtn.click();
              }}
              disabled={loading}
              className="px-6 py-2.5 bg-accent hover:bg-emerald-700 text-white font-sans text-xs font-bold rounded shadow-md transition-all flex items-center gap-2"
            >
              {loading ? (
                <>
                  <CircularProgress size={16} color="inherit" />
                  <span>Uploading Manuscript...</span>
                </>
              ) : (
                'Final Submit Manuscript'
              )}
            </button>
          )}
        </div>

      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
