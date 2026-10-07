import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_URL = 'https://express-api-vercel-phi.vercel.app/api/health';

  useEffect(() => {
    fetch(BACKEND_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl p-8 text-center">
        
        {/* Header */}
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-3">
          Multi-Repo Full-Stack Dashboard
        </h1>
        <p className="text-slate-400 text-sm mb-8">
          Frontend (React + Vite + Tailwind) seamlessly connected to Express.js Backend on Vercel
        </p>

        {/* Status Box */}
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-6 text-left shadow-inner">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <span className="font-semibold text-slate-300 flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : error ? 'bg-red-500' : 'bg-emerald-500 shadow-lg shadow-emerald-500/50'}`}></span>
              Backend API Status
            </span>
            <span className="text-xs uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 font-mono">
              Live Production
            </span>
          </div>

          {loading && (
            <div className="py-8 text-center text-slate-400 animate-pulse">
              Fetching data from server...
            </div>
          )}

          {error && (
            <div className="p-4 rounded-lg bg-red-950/50 border border-red-800/50 text-red-300 text-sm">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          {data && (
            <pre className="bg-slate-950 text-cyan-300 font-mono text-xs sm:text-sm p-4 rounded-lg overflow-x-auto border border-slate-800/80 shadow">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-8 text-xs text-slate-500">
          Cloud Engineering Course Assignment • Built with Bun & Vercel
        </div>

      </div>
    </div>
  );
}

export default App;