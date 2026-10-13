import { useState } from 'react';
import { UploadCloud, FileText, Loader2, CheckCircle2 } from 'lucide-react';

export default function UploadForm({ onAnalyze, isLoading }) {
  const [jd, setJd] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file && jd.trim()) {
      onAnalyze(file, jd);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FileText className="text-fuchsia-600 w-5 h-5" /> Target Role & Resume Submission
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Provide the official job specification along with your resume in PDF or Word format.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Target Job Description (JD) <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={5}
            className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none resize-none text-sm leading-relaxed"
            placeholder="Paste complete Job Description here (Role summary, required skills, qualifications, responsibilities)..."
            value={jd}
            onChange={(e) => setJd(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Candidate Resume (PDF, DOC, DOCX) <span className="text-red-500">*</span>
          </label>
          <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-8 hover:border-fuchsia-500 transition-colors bg-slate-50/50 text-center cursor-pointer group">
            <input
              required
              type="file"
              accept=".pdf,.doc,.docx"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file ? (
              <div className="flex flex-col items-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mb-2" />
                <p className="text-slate-800 font-semibold text-sm">{file.name}</p>
                <p className="text-slate-400 text-xs mt-1">{(file.size / 1024).toFixed(1)} KB • Click or drag to replace</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-fuchsia-600 transition-colors mb-2" />
                <p className="text-slate-700 font-medium text-sm">Click to browse or drop resume file</p>
                <p className="text-slate-400 text-xs mt-1">Supports PDF, DOC, and DOCX (Up to 15MB)</p>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !file || !jd.trim()}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-50 flex justify-center items-center gap-2 shadow-sm"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-fuchsia-400" />
              <span>Auditing Resume Match & ATS Compliance...</span>
            </>
          ) : (
            'Generate ATS Analysis Report'
          )}
        </button>
      </form>
    </div>
  );
}