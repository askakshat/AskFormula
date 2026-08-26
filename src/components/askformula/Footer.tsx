import React from 'react';
import { Twitter, Instagram, Youtube, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#32353c] bg-[#0b0e15] py-12 px-6 md:px-12 mt-auto">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <h3 className="font-bold text-lg text-[#e1e2ec]">AskFormula <span className="text-sm font-normal text-[#aec6ff]">by AskAkshat (Akshat Agarwal)</span></h3>
          <p className="text-sm text-[#e1e2ec]/60">Your ultimate academic reference tool for JEE, NEET, and NCERT.</p>
        </div>

        <div className="flex items-center gap-4 text-[#e1e2ec]/60">
          <a href="https://twitter.com/askakshat" target="_blank" rel="noopener noreferrer" className="hover:text-[#aec6ff] transition-colors" aria-label="Twitter">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="https://instagram.com/askakshat" target="_blank" rel="noopener noreferrer" className="hover:text-[#aec6ff] transition-colors" aria-label="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="https://youtube.com/@askakshat" target="_blank" rel="noopener noreferrer" className="hover:text-[#aec6ff] transition-colors" aria-label="YouTube">
            <Youtube className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/in/askakshat" target="_blank" rel="noopener noreferrer" className="hover:text-[#aec6ff] transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://facebook.com/askakshat" target="_blank" rel="noopener noreferrer" className="hover:text-[#aec6ff] transition-colors" aria-label="Facebook">
            <Facebook className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-8 pt-8 border-t border-[#32353c]/50 text-center text-xs text-[#e1e2ec]/40">
        &copy; {new Date().getFullYear()} AskFormula by AskAkshat. All rights reserved.
      </div>
    </footer>
  );
}
