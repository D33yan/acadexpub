"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { UserIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);
    }).catch((error) => {
      console.error("Sign out error", error);
    });
  };

  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/create-journal", text: "Submit Manuscript" },
    { href: "/about", text: "Aims & Policies" },
    { href: "/contact", text: "Contact Editorial" },
  ];

  return (
    <header className="w-full relative z-50">
      {/* Ultra-slim Top Bar (36px) */}
      <div className="h-9 bg-navy text-white/70 border-b border-navy-light/30 flex items-center justify-between px-4 sm:px-6 lg:px-8 text-xs font-sans">
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            ISSN: <span className="text-white font-mono">2944-1290</span>
          </span>
          <span className="hidden sm:inline text-white/40">·</span>
          <span className="hidden sm:inline">
            Impact Factor: <span className="text-white font-semibold">4.82</span>
          </span>
          <span className="hidden md:inline text-white/40">·</span>
          <span className="hidden md:inline flex items-center gap-1">
            <span className="text-accent font-semibold">🔓</span> Open Access
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/about" className="hover:text-white transition-colors duration-150">Publication Ethics</Link>
          <span className="text-white/20">|</span>
          {user ? (
            <span className="text-white text-xs font-medium">Logged in as {user.email.split('@')[0]}</span>
          ) : (
            <div className="flex items-center space-x-3">
              <Link href="/login" className="hover:text-white transition-colors duration-150">Sign In</Link>
              <span className="text-white/20">/</span>
              <Link href="/sign-up" className="text-accent hover:text-emerald-400 transition-colors duration-150 font-semibold">Register</Link>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation (64px) */}
      <nav className="sticky top-0 bg-navy-mid/95 backdrop-blur-md border-b border-rule/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Wordmark */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center space-x-2.5 group">
                  <div className="h-9 w-9 rounded-md bg-accent flex items-center justify-center text-white font-display text-xl font-bold shadow-md transform group-hover:scale-105 transition-transform duration-200">
                    A
                  </div>
                  <span className="text-white font-display text-lg tracking-wide font-semibold">
                    AcadEx<span className="text-accent">pub</span>
                  </span>
                </Link>
              </div>

              {/* Desktop Nav Links */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-6">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`relative text-sm font-medium px-1 py-2 transition-colors duration-200 ${
                          isActive 
                            ? "text-white" 
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        {link.text}
                        {isActive && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent rounded-full"></span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Desktop Right Auth Actions */}
            <div className="hidden md:block">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/profile" 
                    className="p-2 rounded-full hover:bg-navy-light text-white/90 hover:text-white transition-all duration-150"
                    title="Author Dashboard"
                  >
                    <UserIcon className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="p-2 rounded-full hover:bg-accent-alt/20 text-white/90 hover:text-red-400 transition-all duration-150"
                    title="Sign Out"
                  >
                    <ArrowRightEndOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className="inline-flex items-center justify-center px-4 py-1.5 border border-accent hover:bg-accent/10 text-accent font-semibold rounded text-sm transition-all duration-200"
                >
                  Submit Portal
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="block md:hidden">
              <button
                className="flex items-center px-3 py-2 border rounded text-white/80 border-white/20 hover:text-white hover:border-white transition-colors duration-150"
                onClick={toggleMenu}
              >
                {isMenuOpen ? (
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M14.6 14.6c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4L11.42 10l4.6-4.6c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L10 8.58 5.4 3.98c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4.6 4.6-4.6 4.6c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0L10 11.42l4.6 4.6z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M2 5a1 1 0 0 1 1-1h14a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {isMenuOpen && (
          <div className="md:hidden bg-navy border-t border-rule/10 py-3 shadow-inner">
            <div className="px-2 pt-2 pb-4 space-y-2 sm:px-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-all ${
                      isActive 
                        ? "bg-accent text-white" 
                        : "text-white/80 hover:bg-navy-light hover:text-white"
                    }`}
                  >
                    {link.text}
                  </Link>
                );
              })}
              <hr className="border-white/10 my-2" />
              {user ? (
                <>
                  <Link 
                    href="/profile" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white/80 hover:bg-navy-light hover:text-white"
                  >
                    Author Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleSignOut();
                    }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-red-950/20"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link 
                  href="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center px-3 py-2 rounded-md text-base font-medium text-white bg-accent hover:bg-opacity-90"
                >
                  Submit Portal
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
