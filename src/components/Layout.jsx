import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Header />
      <main className="grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}