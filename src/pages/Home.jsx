import { useState } from 'react';
import Layout from '../components/Layout';
import UploadForm from '../components/UploadForm';
import ResultsBoard from '../components/ResultsBoard';
import { resumeApi } from '../api/adminApi';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (file, jd) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await resumeApi.analyzeAts(file, jd);
      setResults(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to analyze resume. Please verify the backend service is operational.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-700 text-xs font-semibold mb-4">
          <span className="w-2 h-2 rounded-full bg-fuchsia-600 animate-pulse"></span>
          ScoreMyCV ATS Audit Engine v2.0
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Score Your Resume Against Top ATS Filters
        </h1>
        <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed">
          Benchmark your CV against enterprise Applicant Tracking System parsers, uncover missing keywords, and optimize for recruiter conversion.
        </p>
      </div>

      <UploadForm onAnalyze={handleAnalyze} isLoading={loading} />

      {error && (
        <div className="mt-6 p-4 bg-rose-50 text-rose-700 rounded-xl border border-rose-200 text-sm">
          {error}
        </div>
      )}

      {results && <ResultsBoard data={results} />}
    </Layout>
  );
}