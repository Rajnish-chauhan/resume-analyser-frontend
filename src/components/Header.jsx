import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" className="flex items-center gap-3.5 group select-none">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-fuchsia-600 to-indigo-700 p-0.5 shadow-md shadow-indigo-950/40 group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 3.5C6 2.67157 6.67157 2 7.5 2H13.5L18 6.5V20.5C18 21.3284 17.3284 22 16.5 22H7.5C6.67157 22 6 21.3284 6 20.5V3.5Z"
                    stroke="url(#docGrad)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-90"
                  />
                  <path
                    d="M13.5 2V6.5H18"
                    stroke="url(#docGrad)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 13.5L11.5 16L16 10.5"
                    stroke="#38BDF8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="docGrad" x1="6" y1="2" x2="18" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#A855F7" />
                      <stop offset="1" stopColor="#6366F1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight text-white flex items-center">
                  ScoreMy<span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">CV</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/30">
                  ATS Pro
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 -mt-0.5 tracking-normal">
                Enterprise AI Resume Benchmark
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 hover:border-emerald-500/60 hover:bg-emerald-900/40 transition-all flex items-center gap-1.5 shadow-sm"
              title="Verified System"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}