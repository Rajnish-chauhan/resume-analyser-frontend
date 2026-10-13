export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-center items-center">
        <p className="text-sm font-medium text-slate-500 text-center">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-slate-300">ScoreMyCV</span> by{' '}
          <a
            href="https://rajnishsystems.in"
            target="_blank"
            rel="noreferrer"
            className="text-fuchsia-400 hover:text-fuchsia-300 hover:underline underline-offset-4 transition-all"
          >
            rajnishsystems.in
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}