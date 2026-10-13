import {
  CheckCircle2,
  AlertOctagon,
  FileText,
  Target,
  Sparkles,
  TrendingUp,
  Award,
  Layers
} from 'lucide-react';

export default function ResultsBoard({ data }) {
  const atsScore = data.atsScore ?? 0;
  const matchLevel = data.matchLevel || (atsScore >= 75 ? 'High Match' : atsScore >= 50 ? 'Moderate Match' : 'Low Match');
  const executiveSummary = data.executiveSummary || data.summary || 'Analysis complete.';
  const breakdown = data.scoreBreakdown || {
    skillsMatch: atsScore,
    experienceRelevance: Math.max(0, atsScore - 5),
    formattingAndStructure: 85
  };
  const matchedSkills = data.matchedSkills || data.matchedKeyword || [];
  const missingSkills = data.missingSkills || (data.missingKeywords ? data.missingKeywords.map(k => ({ skill: k, importance: 'Critical' })) : []);
  const criticalIssues = Array.isArray(data.criticalIssues)
    ? data.criticalIssues
    : data.issue ? [data.issue] : [];
  const recommendations = Array.isArray(data.actionableRecommendations)
    ? data.actionableRecommendations
    : data.suggestion ? [data.suggestion] : [];

  const getScoreBadge = (score) => {
    if (score >= 75) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 50) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  return (
    <div className="mt-10 space-y-6">
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold tracking-wider uppercase text-slate-400">Audit Status</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">Completed</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Target className="text-fuchsia-600 w-6 h-6" /> ATS Evaluation Report
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Recruiter benchmark: <span className="font-semibold text-slate-700">{matchLevel}</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className={`px-6 py-3 rounded-2xl border text-center ${getScoreBadge(atsScore)}`}>
              <div className="text-3xl font-black">{atsScore}%</div>
              <div className="text-xs font-bold uppercase tracking-wider mt-0.5">ATS Score</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-700 mb-1">
              <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-indigo-500" /> Skills Match</span>
              <span>{breakdown.skillsMatch}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: `${breakdown.skillsMatch}%` }}></div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-700 mb-1">
              <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-emerald-500" /> Experience Relevance</span>
              <span>{breakdown.experienceRelevance}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full transition-all" style={{ width: `${breakdown.experienceRelevance}%` }}></div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-700 mb-1">
              <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-fuchsia-500" /> Readability & Format</span>
              <span>{breakdown.formattingAndStructure}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-fuchsia-600 h-full rounded-full transition-all" style={{ width: `${breakdown.formattingAndStructure}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-slate-500" /> Executive Recruiter Summary
        </h3>
        <p className="text-slate-600 leading-relaxed text-sm bg-slate-50/70 p-4 rounded-xl border border-slate-200/60">
          {executiveSummary}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Detected Keywords & Skills ({matchedSkills.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {matchedSkills.length > 0 ? (
              matchedSkills.map((item, i) => (
                <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold">
                  {typeof item === 'string' ? item : item.skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">No direct matching skills detected.</span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-rose-600" />
            Missing Critical Keywords ({missingSkills.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {missingSkills.length > 0 ? (
              missingSkills.map((item, i) => {
                const name = typeof item === 'string' ? item : item.skill;
                const imp = typeof item === 'object' && item.importance ? item.importance : 'Required';
                return (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold">
                    <span>{name}</span>
                    <span className="text-[10px] uppercase font-bold text-rose-500 bg-rose-100/70 px-1 py-0.2 rounded">
                      {imp}
                    </span>
                  </span>
                );
              })
            ) : (
              <span className="text-xs text-emerald-600 font-medium">All essential skills accounted for.</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-amber-600" /> Identified Weaknesses & Gaps
          </h3>
          <ul className="space-y-2.5">
            {criticalIssues.length > 0 ? (
              criticalIssues.map((issue, idx) => (
                <li key={idx} className="text-xs text-slate-600 leading-relaxed bg-amber-50/60 p-3 rounded-xl border border-amber-100 flex items-start gap-2">
                  <span className="font-bold text-amber-700 mt-0.5">•</span>
                  <span>{issue}</span>
                </li>
              ))
            ) : (
              <li className="text-xs text-slate-400 italic">No significant issues detected.</li>
            )}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" /> Actionable Improvements
          </h3>
          <ul className="space-y-2.5">
            {recommendations.length > 0 ? (
              recommendations.map((rec, idx) => (
                <li key={idx} className="text-xs text-slate-600 leading-relaxed bg-indigo-50/60 p-3 rounded-xl border border-indigo-100 flex items-start gap-2">
                  <span className="font-bold text-indigo-700 mt-0.5">{idx + 1}.</span>
                  <span>{rec}</span>
                </li>
              ))
            ) : (
              <li className="text-xs text-slate-400 italic">Resume aligns well with standard requirements.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}