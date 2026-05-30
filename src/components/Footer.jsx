import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom'; // Make sure you import Link!

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-fuchsia-900/30 relative overflow-hidden mt-auto">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-between items-center">
        
        <p className="text-sm text-slate-400 font-medium">
          &copy; {new Date().getFullYear()} <a href="https://rajnishsystems.in" className="text-fuchsia-400 hover:text-fuchsia-300 hover:underline underline-offset-4 transition-all">rajnishsystems.in</a>. All rights reserved.
        </p>

        {/* SECRET ADMIN LINK */}
        <Link 
          to="/admin" 
          className="text-slate-700 hover:text-fuchsia-500 transition-colors"
          title="Admin Access"
        >
          <Lock className="w-4 h-4" />
        </Link>
        
      </div>
    </footer>
  );
}