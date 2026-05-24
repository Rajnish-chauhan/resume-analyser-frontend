import { useState } from 'react';
import Layout from './components/Layout';
import UploadForm from './components/UploadForm';
import ResultsBoard from './components/ResultsBoard';
import { resumeApi } from './components/api';

export default function App() {
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
      setError('Failed to analyze the resume. Ensure the Spring Boot backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-slate-800 mb-3 tracking-tight">
          AI Resume Analyser
        </h2>
        <p className="text-slate-500 text-lg">
          Compare your skills against job descriptions and beat the ATS.
        </p>
      </div>

      <UploadForm onAnalyze={handleAnalyze} isLoading={loading} />

      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {results && <ResultsBoard data={results} />}
    </Layout>
  );
}