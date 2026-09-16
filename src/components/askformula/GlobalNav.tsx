import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center w-full max-w-4xl mx-auto px-4 sm:px-0">
      <nav className="px-5 lg:px-8 py-3 flex items-center justify-between gap-4 md:gap-16 bg-white/[0.02] backdrop-blur-[40px] rounded-[30px] border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] w-full relative z-50">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/assets/logo-new.png"
            alt="AskFormula"
            className="h-6 sm:h-7 object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-semibold text-base sm:text-lg tracking-tight text-white/90">
            AskFormula
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-zinc-300">
          <Link to="/" className={`transition-colors ${isHome ? 'text-white' : 'hover:text-white'}`}>Home</Link>
          <Link to="/quiz" className={`transition-colors font-semibold ${location.pathname.startsWith('/quiz') ? 'text-white' : 'text-white hover:text-white'}`}>
            Quiz
          </Link>
          <Link to="/build" className={`transition-colors ${location.pathname === '/build' ? 'text-white' : 'hover:text-white'}`}>Builder</Link>
          {isHome && <a href="#faq" className="hover:text-white transition-colors">FAQ</a>}
        </div>

        {/* Desktop CTA / Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
             {location.pathname !== "/build" && (
                <Button
                  asChild
                  className="h-8 px-4 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/10 text-sm font-medium transition-colors active:scale-95 shadow-none"
                >
                  <Link to="/build">Get started</Link>
                </Button>
             )}
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/10 rounded-full">
                  {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-[#1a1e28]/95 backdrop-blur-xl border-white/10 text-white/90 rounded-2xl mt-2 p-2 shadow-2xl z-[100]">
                <DropdownMenuItem asChild className="rounded-xl focus:bg-white/10 focus:text-white cursor-pointer py-2.5">
                   <Link to="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl focus:bg-white/10 focus:text-white cursor-pointer py-2.5">
                   <Link to="/quiz" className="text-white">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                     </svg>
                     Quiz
                   </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl focus:bg-white focus:text-white cursor-pointer py-2.5">
                   <Link to="/build">Builder</Link>
                </DropdownMenuItem>
                {isHome && (
                  <DropdownMenuItem asChild className="rounded-xl focus:bg-white focus:text-white cursor-pointer py-2.5">
                    <a href="#faq">FAQ</a>
                  </DropdownMenuItem>
                )}
                <div className="px-2 pt-2 pb-1 mt-1 border-t border-white/10">
                   <Button asChild className="w-full h-8 rounded-full bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 text-xs shadow-none">
                      <Link to="/build">Get started</Link>
                   </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </div>
  );
}
