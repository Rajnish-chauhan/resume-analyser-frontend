import { CheckCircle2, XCircle, FileText, Target, AlertTriangle, Lightbulb } from 'lucide-react';

export default function ResultsBoard({ data }) {
  const { atsScore, matchedKeyword, missingKeywords, summary, issue, suggestion } = data;

  const getScoreColor = (score) => {
    if (score >= 75) return 'bg-green-100 text-green-700 border-green-200';
    if (score >= 50) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-100">
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-100 pb-6 mb-6 gap-4">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Target className="text-fuchsia-600" /> ATS Analysis Report
        </h2>
        <div className={`text-3xl font-extrabold px-6 py-2 rounded-xl border ${getScoreColor(atsScore)}`}>
          Score: {atsScore}%
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-slate-400" /> Executive Summary
        </h3>
        <p className="text-slate-600 leading-relaxed bg-slate-50 p-5 rounded-xl border border-slate-200">
          {summary || "No summary provided by AI."}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
          <h3 className="text-orange-800 font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" /> Key Issues
          </h3>
          <p className="text-orange-700/80 text-sm leading-relaxed">
            {issue || "No major issues found."}
          </p>
        </div>

        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
          <h3 className="text-blue-800 font-semibold mb-2 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-blue-600" /> Suggestions to Improve
          </h3>
          <p className="text-blue-700/80 text-sm leading-relaxed">
            {suggestion || "Resume looks good, keep it up!"}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50/50 p-6 rounded-xl border border-green-100">
          <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" /> Matched Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {matchedKeyword && matchedKeyword.length > 0 ? (
              matchedKeyword.map((kw, i) => (
                <span key={i} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium shadow-sm">
                  {kw}
                </span>
              ))
            ) : (
              <span className="text-sm text-green-600/70 italic">No matches found.</span>
            )}
          </div>
        </div>

        <div className="bg-red-50/50 p-6 rounded-xl border border-red-100">
          <h3 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" /> Missing Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {missingKeywords && missingKeywords.length > 0 ? (
              missingKeywords.map((kw, i) => (
                <span key={i} className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium shadow-sm">
                  {kw}
                </span>
              ))
            ) : (
              <span className="text-sm text-red-600/70 italic">No missing keywords!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}