'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { Snackbar, Alert } from '@mui/material';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAlertMessage('Sign in successful. Redirecting to Submission Portal...');
      setAlertSeverity('success');
      setOpen(true);
      router.push('/create-journal');
    } catch (error) {
      setAlertMessage('Sign in failed: ' + error.message);
      setAlertSeverity('error');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-ivory py-12 px-4 sm:px-6 lg:px-8 font-sans text-body'>
      <div className='bg-white border border-rule/75 p-8 rounded-md shadow-md mx-auto w-full max-w-[500px]'>
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="h-11 w-11 rounded-md bg-accent flex items-center justify-center text-white font-display text-2xl font-bold shadow-md mx-auto mb-3">
            A
          </div>
          <h2 className='text-2xl font-display font-semibold text-navy'>Sign In to AcadExpub</h2>
          <p className="text-xs font-serif text-muted mt-1">Access the manuscript submissions and tracking dashboard.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor='email' className='block text-xs font-sans font-bold uppercase tracking-wider text-navy mb-1.5'>
              Institutional Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='yourname@institution.edu'
              required
              className='w-full px-3 py-2 border border-rule rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent'
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-xs font-sans font-bold uppercase tracking-wider text-navy mb-1.5'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='••••••••'
              required
              className='w-full px-3 py-2 border border-rule rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent'
            />
          </div>

          <div className='pt-2'>
            <button
              type='submit'
              className='w-full py-2.5 px-4 bg-accent hover:bg-emerald-700 text-white font-sans text-sm font-semibold rounded shadow-md transition-colors duration-150'
            >
              Sign In
            </button>
            <p className='text-xs font-serif text-muted text-center mt-5'>
              New author to the platform?{' '}
              <Link href="/sign-up" className='text-accent hover:underline font-bold font-sans'>
                Register Account
              </Link>
            </p>
          </div>
        </form>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
