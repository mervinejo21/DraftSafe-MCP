"use client";
import { useState, useEffect } from "react";

export default function DraftSafe() {
  const [content, setContent] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Idle");

  // Typewriter Effect logic
  useEffect(() => {
    if (result) {
      setDisplayedText("");
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + result.charAt(i));
        i++;
        if (i >= result.length) clearInterval(interval);
      }, 20);
      return () => clearInterval(interval);
    }
  }, [result]);

  const handleCheck = async () => {
    setLoading(true);
    setResult(null);
    setDisplayedText("");
    setStatus("Reading Draft...");
    
    try {
      const res = await fetch("http://127.0.0.1:8000/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      
      setStatus("Analyzing Patterns...");
      const data = await res.json();
      
      setTimeout(() => {
        setResult(data.result);
        setStatus("Analysis Complete");
        setLoading(false);
      }, 800); // Small delay to show the "thinking" state
      
    } catch (err) {
      setResult("❌ Connection Error: Is the Python API running?");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-primaryForeground p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center space-x-4 mb-10">
          <h1 className="text-3xl font-black italic tracking-tighter text-primary">DRAFT.SAFE</h1>
          <div className="h-px flex-1 bg-card/60"></div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-twilight/50">Version 2.0 Alpha</span>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Side: Input */}
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-twilight rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-card border border-card/60 rounded-2xl overflow-hidden">
                <textarea 
                  className="w-full h-[500px] p-6 text-lg outline-none resize-none bg-transparent font-light leading-relaxed"
                  placeholder="Paste your draft here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <div className="p-4 bg-background/50 border-t border-card/60 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Input Stream</span>
                  <button 
                    onClick={handleCheck}
                    disabled={loading || !content}
                    className="bg-primary hover:bg-violet-600 text-white px-8 py-2 rounded-lg font-bold transition-all active:scale-95 disabled:opacity-30"
                  >
                    {loading ? "PROCESSING..." : "RUN ANALYSIS"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: AI Thinking & Result */}
          <div className="space-y-4 sticky top-12">
            <div className={`relative h-[556px] bg-card/30 border border-primary/20 rounded-2xl p-8 transition-all duration-500 ${loading ? 'animate-pulse-glow border-primary/50' : ''}`}>
              
              {/* AI Status Indicator */}
              <div className="flex items-center space-x-3 mb-8">
                <div className={`h-2 w-2 rounded-full ${loading ? 'bg-primary animate-ping' : 'bg-twilight/30'}`}></div>
                <span className="text-xs font-mono text-twilight uppercase tracking-widest">{status}</span>
              </div>

              {/* Terminal Style Output */}
              <div className="font-mono text-sm leading-7">
                {!result && !loading && (
                  <p className="text-slate-600 italic mt-20 text-center">Awaiting data stream for validation...</p>
                )}
                
                {loading && (
                  <div className="space-y-2">
                    <div className="h-2 w-3/4 bg-primary/10 rounded animate-pulse"></div>
                    <div className="h-2 w-1/2 bg-primary/10 rounded animate-pulse delay-75"></div>
                    <div className="h-2 w-2/3 bg-primary/10 rounded animate-pulse delay-150"></div>
                  </div>
                )}

                {displayedText && (
                  <div className={`p-6 rounded-lg border-l-4 ${displayedText.includes('🚨') ? 'border-red-500 bg-red-500/5' : 'border-green-500 bg-green-500/5'}`}>
                    <p className="text-primaryForeground/90 whitespace-pre-wrap">{displayedText}</p>
                    <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse"></span>
                  </div>
                )}
              </div>

              {/* Decorative scan line (Right side only) */}
              {loading && <div className="absolute inset-0 bg-primary/5 animate-scan-line pointer-events-none"></div>}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}