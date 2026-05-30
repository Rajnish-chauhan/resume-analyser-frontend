import { useState, useEffect } from 'react';
import { FileText, Eye, AlertCircle, Briefcase, BarChart3, Lock } from 'lucide-react';
import Layout from './Layout';
import { adminApi } from './api';

export default function AdminDashboard() {
  // --- LOGIN STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // --- DASHBOARD STATE ---
  const [resumes, setResumes] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null); 
  const [activeTab, setActiveTab] = useState('document');
  const [loading, setLoading] = useState(true);

  // --- HANDLE LOGIN ---
  const handleLogin = (e) => {
    e.preventDefault();
    // Check credentials
    if (username === 'resume_admin' && password === 'resume123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Username or Password');
    }
  };

  // --- FETCH DATA ONLY IF LOGGED IN ---
  useEffect(() => {
    if (isAuthenticated) {
      const fetchResumes = async () => {
        try {
          const data = await adminApi.getAllResumes();
          setResumes(data.reverse());
        } catch (error) {
          console.error("Error fetching resumes:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchResumes();
    }
  }, [isAuthenticated]);

  const getAiReport = (jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      return null;
    }
  };

  // ==========================================
  // VIEW 1: THE LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-md w-full text-center">
            <div className="bg-fuchsia-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-fuchsia-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Admin Portal</h2>
            <p className="text-slate-500 mb-6">Enter your credentials to access the database.</p>
            
            {loginError && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-semibold">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-fuchsia-500 outline-none"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-fuchsia-500 outline-none"
                  placeholder="Enter password"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="mt-2 w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }

  // ==========================================
  // VIEW 2: THE DASHBOARD (Only shows if logged in)
  // ==========================================
  return (
    <Layout>
      <div className="max-w-7xl mx-auto mb-10 p-4">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2 flex items-center gap-3">
          <Briefcase className="text-fuchsia-600 w-8 h-8" />
          Admin Dashboard
        </h2>
        <p className="text-slate-500 mb-8">Review candidate resumes, job descriptions, and ATS scores.</p>
        
        <div className="flex flex-col lg:flex-row gap-6 h-[750px]">
          
          {/* LEFT SIDE: List of Candidates */}
          <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-700 flex items-center gap-2">
                Uploaded Profiles <span className="bg-fuchsia-100 text-fuchsia-700 px-2 py-0.5 rounded-full text-xs">{resumes.length}</span>
              </h3>
            </div>
            
            <div className="p-4 overflow-y-auto flex-grow space-y-3">
              {loading && <p className="text-slate-500 text-center mt-4 animate-pulse">Loading database...</p>}
              
              {!loading && resumes.length === 0 && (
                <div className="text-center mt-10 text-slate-400 flex flex-col items-center">
                  <AlertCircle className="w-10 h-10 mb-2 opacity-50" />
                  <p>No resumes found.</p>
                </div>
              )}

              {resumes.map((doc) => (
                <div 
                  key={doc.id} 
                  onClick={() => {
                    setSelectedDoc(doc);
                    setActiveTab('document'); 
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedDoc?.id === doc.id 
                      ? 'bg-fuchsia-50 border-fuchsia-400 shadow-md ring-1 ring-fuchsia-400' 
                      : 'bg-white border-slate-200 hover:border-fuchsia-300 hover:shadow-sm'
                  }`}
                >
                  <p className="font-semibold text-slate-800 truncate" title={doc.fileName}>
                    {doc.fileName || 'Unknown File'}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs font-mono text-slate-400 truncate w-32">
                      ID: {doc.id.substring(doc.id.length - 6)}
                    </span>
                    <button className="flex items-center gap-1 text-xs font-bold text-fuchsia-600 bg-fuchsia-100 px-2 py-1 rounded-md">
                      <Eye className="w-3 h-3" /> View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Details & Viewer */}
          <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
            
            {/* Tab Navigation */}
            <div className="flex border-b border-slate-200 bg-slate-50">
              <button 
                onClick={() => setActiveTab('document')}
                disabled={!selectedDoc}
                className={`flex-1 py-4 font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${activeTab === 'document' ? 'text-fuchsia-600 border-b-2 border-fuchsia-600 bg-white' : 'text-slate-500 hover:text-slate-700 disabled:opacity-50'}`}
              >
                <FileText className="w-4 h-4" /> Resume File
              </button>
              <button 
                onClick={() => setActiveTab('jd')}
                disabled={!selectedDoc}
                className={`flex-1 py-4 font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${activeTab === 'jd' ? 'text-fuchsia-600 border-b-2 border-fuchsia-600 bg-white' : 'text-slate-500 hover:text-slate-700 disabled:opacity-50'}`}
              >
                <Briefcase className="w-4 h-4" /> Job Description
              </button>
              <button 
                onClick={() => setActiveTab('report')}
                disabled={!selectedDoc}
                className={`flex-1 py-4 font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${activeTab === 'report' ? 'text-fuchsia-600 border-b-2 border-fuchsia-600 bg-white' : 'text-slate-500 hover:text-slate-700 disabled:opacity-50'}`}
              >
                <BarChart3 className="w-4 h-4" /> AI Report
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-grow bg-slate-100 relative overflow-hidden">
              
              {!selectedDoc ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                  <FileText className="w-16 h-16 mb-4 opacity-30" />
                  <p className="text-lg font-medium">No Profile Selected</p>
                  <p className="text-sm mt-1 opacity-70">Click a candidate on the left to review their details.</p>
                </div>
              ) : (
                <>
                  {/* TAB 1: Document Viewer */}
                  {activeTab === 'document' && (
                    <div className="h-full w-full">
                      {selectedDoc.fileName?.toLowerCase().includes('.doc') ? (
                        <div className="flex flex-col items-center justify-center h-full bg-white p-10 text-center">
                          <FileText className="w-20 h-20 text-blue-600 mb-4" />
                          <h3 className="text-xl font-bold text-slate-800 mb-2">Word Document</h3>
                          <p className="text-slate-500 mb-6">Browsers cannot display DOCX files inline.</p>
                          <a 
                            href={adminApi.getPdfUrl(selectedDoc.gridFsFileId)}
                            download
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                          >
                            Download File
                          </a>
                        </div>
                      ) : (
                        <iframe 
                          src={adminApi.getPdfUrl(selectedDoc.gridFsFileId)}
                          className="w-full h-full border-none bg-white"
                          title="Document Viewer"
                        />
                      )}
                    </div>
                  )}

                  {/* TAB 2: Job Description */}
                  {activeTab === 'jd' && (
                    <div className="h-full w-full bg-white p-8 overflow-y-auto">
                      <h3 className="text-xl font-bold text-slate-800 mb-4">Target Job Description</h3>
                      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 whitespace-pre-wrap text-slate-700 font-mono text-sm leading-relaxed">
                        {selectedDoc.jobDescription || "No JD provided."}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: AI Report */}
                  {activeTab === 'report' && (
                    <div className="h-full w-full bg-white p-8 overflow-y-auto">
                      <h3 className="text-xl font-bold text-slate-800 mb-6">ATS Analysis</h3>
                      
                      {(() => {
                        const report = getAiReport(selectedDoc.aiReport);
                        if (!report) return <p className="text-red-500">Failed to parse AI report.</p>;
                        
                        return (
                          <div className="space-y-6">
                            {/* Score Card */}
                            <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
                              <div className={`text-4xl font-extrabold px-6 py-4 rounded-xl border ${report.atsScore >= 75 ? 'bg-green-100 text-green-700 border-green-200' : report.atsScore >= 50 ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                                {report.atsScore}%
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-700 text-lg">Overall Match</h4>
                                <p className="text-slate-500 text-sm">Based on keyword overlap and context.</p>
                              </div>
                            </div>

                            {/* Summary */}
                            <div>
                              <h4 className="font-bold text-slate-800 mb-2">Executive Summary</h4>
                              <p className="bg-blue-50 p-4 rounded-lg text-blue-800 text-sm leading-relaxed">
                                {report.summary}
                              </p>
                            </div>

                            {/* Issues & Suggestions */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                                <h4 className="font-bold text-orange-800 mb-2">Issues Detected</h4>
                                <p className="text-orange-700 text-sm">{report.issue || "None"}</p>
                              </div>
                              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                <h4 className="font-bold text-green-800 mb-2">Suggestions</h4>
                                <p className="text-green-700 text-sm">{report.suggestion || "None"}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}