export default function Header() {
  return (
    <header className="bg-gradient-to-r from-violet-900 via-fuchsia-900 to-violet-900 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          
          {/* Left-side Text Logo */}
          <span className="font-extrabold text-2xl tracking-tight text-white cursor-pointer">
            𝓡𝒶𝓳𝓃𝓲𝓈𝓱<span className="text-fuchsia-300 drop-shadow-sm">𝒮𝔂𝓈𝓽ℯ𝓶𝓈</span>
          </span>

        </div>
      </div>
    </header>
  );
}