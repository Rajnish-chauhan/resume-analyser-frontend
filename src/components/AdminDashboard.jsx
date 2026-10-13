import { useState, useEffect } from 'react';
import { FileText, Eye, AlertCircle, Briefcase, BarChart3, Lock } from 'lucide-react';
import Layout from '../components/Layout';
import ResultsBoard from '../components/ResultsBoard';
import { adminApi } from '../api/adminApi';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [resumes, setResumes] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [activeTab, setActiveTab] = useState('document');
  const [loading, setLoading] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'resume_admin' && password === 'resume123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Administrator credentials');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchResumes = async () => {
        try {
          const data = await adminApi.getAllResumes();
          setResumes([...data].reverse());
        } catch (error) {
          console.error('Error fetching resume records:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchResumes();
    }
  }, [isAuthenticated]);

  const parseAiReport = (jsonString) => {
    try {
      if (typeof jsonString === 'object') return jsonString;
      let clean = jsonString.trim();
      if (clean.startsWith('```json')) clean = clean.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      return JSON.parse(clean);
    } catch (e) {
      return null;
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[55vh]">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full text-center">
            <div className="bg-slate-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-slate-700" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">Administrative Sign-In</h2>
            <p className="text-xs text-slate-500 mb-6">Access restricted to authorized personnel only.</p>

            {loginError && (
              <div className="mb-4 p-3 bg-rose-50 text-rose-600 border border-rose-200 rounded-lg text-xs font-semibold">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none text-sm"
                  placeholder="Enter administrator username"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none text-sm"
                  placeholder="Enter administrator password"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-slate-800 transition-colors text-sm"
              >
                Authenticate
              </button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Briefcase className="text-fuchsia-600 w-6 h-6" /> Resume Audit Database
        </h2>
        <p className="text-xs text-slate-500 mt-1">Review candidate documents, JDs, and parsed evaluation reports.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[720px]">
        <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Candidate Profiles</h3>
            <span className="bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full text-xs">{resumes.length}</span>
          </div>

          <div className="p-3 overflow-y-auto grow space-y-2">
            {loading && <p className="text-slate-400 text-center text-xs mt-6">Loading submissions...</p>}

            {!loading && resumes.length === 0 && (
              <div className="text-center mt-12 text-slate-400 flex flex-col items-center">
                <AlertCircle className="w-8 h-8 mb-2 opacity-40" />
                <p className="text-xs">No records found.</p>
              </div>
            )}

            {resumes.map((doc) => (
              <div
                key={doc.id}
                onClick={() => {
                  setSelectedDoc(doc);
                  setActiveTab('document');
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedDoc?.id === doc.id
                    ? 'bg-slate-50 border-slate-900 shadow-sm ring-1 ring-slate-900'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <p className="font-semibold text-xs text-slate-800 truncate" title={doc.fileName}>
                  {doc.fileName || 'Untitled File'}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[10px] font-mono text-slate-400 truncate">
                    ID: {doc.id.substring(doc.id.length - 6)}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    <Eye className="w-3 h-3" /> Select
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="flex border-b border-slate-200 bg-slate-50">
            <button
              onClick={() => setActiveTab('document')}
              disabled={!selectedDoc}
              className={`flex-1 py-3 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'document' ? 'text-slate-900 border-b-2 border-slate-900 bg-white' : 'text-slate-500 hover:text-slate-700 disabled:opacity-40'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Resume Document
            </button>
            <button
              onClick={() => setActiveTab('jd')}
              disabled={!selectedDoc}
              className={`flex-1 py-3 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'jd' ? 'text-slate-900 border-b-2 border-slate-900 bg-white' : 'text-slate-500 hover:text-slate-700 disabled:opacity-40'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" /> Target JD
            </button>
            <button
              onClick={() => setActiveTab('report')}
              disabled={!selectedDoc}
              className={`flex-1 py-3 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'report' ? 'text-slate-900 border-b-2 border-slate-900 bg-white' : 'text-slate-500 hover:text-slate-700 disabled:opacity-40'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" /> Full Audit Report
            </button>
          </div>

          <div className="grow bg-slate-100 relative overflow-hidden">
            {!selectedDoc ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                <FileText className="w-12 h-12 mb-3 opacity-30" />
                <p className="text-sm font-medium">No Candidate Selected</p>
                <p className="text-xs mt-1 text-slate-400">Select an entry from the left column to view its details.</p>
              </div>
            ) : (
              <>
                {activeTab === 'document' && (
                  <div className="h-full w-full">
                    {selectedDoc.fileName?.toLowerCase().includes('.doc') ? (
                      <div className="flex flex-col items-center justify-center h-full bg-white p-8 text-center">
                        <FileText className="w-16 h-16 text-slate-400 mb-3" />
                        <h4 className="text-base font-bold text-slate-800">Word Processing Document</h4>
                        <p className="text-xs text-slate-500 mb-5 max-w-sm">DOC/DOCX files cannot be embedded directly in standard browser iframes.</p>
                        <a
                          href={adminApi.getPdfUrl(selectedDoc.gridFsFileId)}
                          download
                          className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-5 rounded-xl text-xs transition-colors"
                        >
                          Download Raw File
                        </a>
                      </div>
                    ) : (
                      <iframe
                        src={adminApi.getPdfUrl(selectedDoc.gridFsFileId)}
                        className="w-full h-full border-none bg-white"
                        title="Resume Viewer"
                      />
                    )}
                  </div>
                )}

                {activeTab === 'jd' && (
                  <div className="h-full w-full bg-white p-6 overflow-y-auto">
                    <h4 className="text-sm font-bold text-slate-800 mb-3">Job Description Text</h4>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 whitespace-pre-wrap text-slate-700 text-xs leading-relaxed">
                      {selectedDoc.jobDescription || 'No Job Description text was supplied.'}
                    </div>
                  </div>
                )}

                {activeTab === 'report' && (
                  <div className="h-full w-full bg-slate-50 p-6 overflow-y-auto">
                    {(() => {
                      const report = parseAiReport(selectedDoc.aiReport);
                      if (!report) {
                        return <p className="text-xs text-rose-500">Failed to deserialize JSON report.</p>;
                      }
                      return <ResultsBoard data={report} />;
                    })()}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}