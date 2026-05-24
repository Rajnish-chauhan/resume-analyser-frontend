import { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, Loader2 } from 'lucide-react';

export default function UploadForm({ onAnalyze, isLoading }) {
  const [jd, setJd] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file && jd) onAnalyze(file, jd);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-100"
    >
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <FileText className="text-fuchsia-600" /> Upload Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Paste Job Description</label>
          <textarea
            required rows={4}
            className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none resize-none"
            placeholder="Paste JD here..."
            value={jd} onChange={(e) => setJd(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Resume</label>
          <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-8 hover:border-fuchsia-500 transition-colors bg-slate-50 text-center">
            <input
              required type="file" accept=".pdf,.doc,.docx"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className={file ? "text-fuchsia-600 font-medium" : "text-slate-500"}>
              {file ? file.name : "Drag and drop or click to upload"}
            </p>
          </div>
        </div>

        <button
          type="submit" disabled={isLoading || !file || !jd}
          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-70 flex justify-center items-center gap-2 shadow-md"
        >
          {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Analysing...</> : 'Analyse Resume'}
        </button>
      </form>
    </motion.div>
  );
}