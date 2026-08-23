import { motion } from "framer-motion";
import { Link } from "react-router";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-slate-950 text-white"
    >
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Subtle ambient background */}
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-blue-500/[0.05] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-500/[0.05] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-lg mx-auto relative px-6 z-10 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-violet-600 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-slate-100 mb-4">Looks like you're lost in space</h2>
            <p className="text-slate-400 text-base mb-10 leading-relaxed">
              The page you're looking for doesn't exist or has been moved. Let's get you back to revising formulas.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            >
              <Home className="w-4 h-4" />
              Return Home
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
