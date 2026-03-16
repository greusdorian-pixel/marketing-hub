
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Layers, Target, Terminal, Zap, Sparkles, Brain, Rocket, TrendingUp, Users, CheckCircle2 } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import SkillCard from "@/components/SkillCard";
import skillsData from "@/data/skills.json";

interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  core_principles: string[];
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All Skills");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [userContext, setUserContext] = useState("");
  const [generationResult, setGenerationResult] = useState<any | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (skill: Skill) => {
    if (!userContext.trim()) return;
    
    setIsGenerating(true);
    setGenerationResult(null);

    // Simulate deep analysis logic
    await new Promise(resolve => setTimeout(resolve, 800)); // Initial scan
    await new Promise(resolve => setTimeout(resolve, 1200)); // Strategy mapping
    
    // Keywords from user input to make it feel custom
    const inputKeywords = userContext.toLowerCase().split(' ').filter(w => w.length > 3);
    const contextTerm = inputKeywords[0] || "your specific niche";

    const result = {
      score: Math.floor(Math.random() * 25) + 70, // 70-95
      audience: `Primary focus: Users specifically looking for ${contextTerm}-related solutions.`,
      angle: `The "Unique Value Proposition" should pivot on ${skill.core_principles[0].split(':')[0].trim()} applied to ${userContext}.`,
      roadmap: skill.core_principles.map((p, i) => {
        const [title, detail] = p.split(':');
        return {
          phase: `Phase ${i + 1}`,
          title: title.trim(),
          action: `Tailored for ${contextTerm}: ${detail?.trim() || "Deep integration of industry standards."}`
        };
      }),
      tactics: [
        `Custom ${skill.title} landing page for "${contextTerm}" keywords.`,
        `Automated follow-up sequence addressing "${userContext}" pain points.`,
        `A/B Testing variables: Benefit-driven vs. Fear-of-missing-out copy.`
      ]
    };
    
    setGenerationResult(result);
    setIsGenerating(false);
  };

  const filteredSkills = useMemo(() => {
    return skillsData.filter((skill) => {
      const matchesCategory = activeCategory === "All Skills" || skill.category === activeCategory;
      const matchesSearch = skill.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             skill.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100">
      <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      
      <main className="flex-1 p-8 lg:p-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Marketing <span className="text-blue-500">Intelligence</span> Hub
            </h2>
            <p className="text-slate-400">
              Expert frameworks for CRO, copywriting, SEO, and growth engineering.
            </p>
          </div>
          
          <div className="relative group max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 group-focus-within:text-blue-400 transition-colors" />
            <input
              type="text"
              placeholder="Search skills, frameworks, principles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
            />
          </div>
        </header>

        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, index) => (
                <SkillCard 
                  key={skill.id} 
                  skill={skill} 
                  index={index}
                  onClick={(s) => setSelectedSkill(s)} 
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-4 border border-slate-800">
              <Search className="text-slate-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-1">No skills found</h3>
            <p className="text-slate-500">Try adjusting your search or category filter.</p>
          </div>
        )}
      </main>

      {/* Modal / Overlay for Skill Details */}
      <AnimatePresence>
        {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedSkill(null);
                setGenerationResult(null);
                setUserContext("");
              }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            <motion.div
              layoutId={selectedSkill.id}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-4xl glass rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)] border-t border-white/10"
            >
              <button 
                onClick={() => {
                  setSelectedSkill(null);
                  setGenerationResult(null);
                  setUserContext("");
                }}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-800 transition-colors z-10"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
              
              <div className="p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full">
                    {selectedSkill.category}
                  </span>
                </div>
                
                <h3 className="text-4xl font-bold mb-4 tracking-tight">
                  {selectedSkill.title}
                </h3>
                
                <p className="text-xl text-slate-400 leading-relaxed mb-10">
                  {selectedSkill.description}
                </p>
                
                <div className="space-y-8">
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Layers className="text-blue-400 w-4 h-4" />
                      </div>
                      <h4 className="text-lg font-bold">Core Implementation Principles</h4>
                    </div>
                    
                    <div className="grid gap-4">
                      {selectedSkill.core_principles.map((principle, i) => (
                        <div key={i} className="bg-slate-900 items-center border border-slate-800/50 p-5 rounded-2xl flex gap-4 group hover:border-blue-500/30 transition-colors">
                          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            {i + 1}
                          </div>
                          <p className="text-slate-300 font-medium">{principle}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                  
                  <section className="bg-gradient-to-br from-slate-900 to-blue-900/20 border border-blue-500/20 p-8 rounded-3xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Terminal className="text-blue-400 w-5 h-5" />
                      <h4 className="text-lg font-bold">Interactive Tool: Framework Generator</h4>
                    </div>
                    <p className="text-sm text-slate-400 mb-6">Applying {selectedSkill.title} strategy to your specific project context.</p>
                    
                    <div className="space-y-4">
                      <textarea 
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl outline-none focus:border-blue-500 transition-colors text-slate-200 min-h-[100px] resize-none"
                        placeholder="Project or company description... e.g. 'Artisan coffee shop for local delivery'"
                        value={userContext}
                        onChange={(e) => setUserContext(e.target.value)}
                      />
                      
                      {isGenerating ? (
                        <div className="flex flex-col items-center py-8 space-y-4">
                          <motion.div 
                            animate={{ 
                              scale: [1, 1.2, 1],
                              rotate: [0, 180, 360],
                              filter: ["blur(0px)", "blur(4px)", "blur(0px)"]
                            }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/50"
                          >
                            <Brain className="w-8 h-8 text-blue-400" />
                          </motion.div>
                          <div className="text-center">
                            <p className="text-blue-400 font-bold animate-pulse">Consulting Marketing Engines...</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Applying {selectedSkill.title} Framework</p>
                          </div>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleGenerate(selectedSkill)}
                          disabled={!userContext.trim()}
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 text-lg"
                        >
                          <Sparkles className="w-5 h-5" /> Generate High-Impact Strategy
                        </button>
                      )}

                      <AnimatePresence>
                        {generationResult && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-8 space-y-6"
                          >
                            {/* Market Potential Score */}
                            <div className="flex items-center gap-6 p-6 bg-slate-900/80 rounded-[2rem] border border-blue-500/30">
                              <div className="relative w-20 h-20 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                  <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-800" />
                                  <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="4" fill="transparent" 
                                    strokeDasharray={226}
                                    strokeDashoffset={226 - (226 * generationResult.score) / 100}
                                    className="text-blue-500 transition-all duration-1000"
                                  />
                                </svg>
                                <span className="absolute font-bold text-xl">{generationResult.score}%</span>
                              </div>
                              <div>
                                <h5 className="font-bold text-lg leading-tight uppercase tracking-tighter">Market Impact Score</h5>
                                <p className="text-xs text-slate-400 max-w-xs">{selectedSkill.title} could boost your performance significantly.</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800">
                                <p className="text-blue-400 font-bold mb-2 flex items-center gap-2 text-xs uppercase tracking-widest"><Users className="w-4 h-4" /> Audience Context</p>
                                <p className="text-slate-300 italic">"{generationResult.audience}"</p>
                              </div>
                              <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800">
                                <p className="text-indigo-400 font-bold mb-2 flex items-center gap-2 text-xs uppercase tracking-widest"><Target className="w-4 h-4" /> Competitive Angle</p>
                                <p className="text-slate-300 italic">"{generationResult.angle}"</p>
                              </div>
                            </div>

                            <div className="p-8 bg-slate-950/50 border border-blue-500/10 rounded-[2rem] relative overflow-hidden">
                              <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Rocket className="w-32 h-32 text-blue-500" />
                              </div>

                              <h5 className="text-blue-400 font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
                                <TrendingUp className="w-4 h-4" /> Execution Roadmap
                              </h5>
                              
                              <div className="space-y-6 relative ml-2">
                                {generationResult.roadmap.map((step: any, i: number) => (
                                  <div key={i} className="flex gap-6 group">
                                    <div className="flex flex-col items-center">
                                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-sm font-bold text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        {i + 1}
                                      </div>
                                      {i !== generationResult.roadmap.length - 1 && (
                                        <div className="w-0.5 h-full bg-slate-800/50 my-2" />
                                      )}
                                    </div>
                                    <div className="pb-4">
                                      <p className="text-sm font-bold text-slate-100 group-hover:text-blue-400 transition-colors uppercase tracking-wider">{step.title}</p>
                                      <p className="text-sm text-slate-400 mt-1 leading-relaxed max-w-xl">{step.action}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="p-6 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-2xl">
                              <h5 className="text-slate-200 font-bold mb-4 text-xs uppercase tracking-widest flex items-center gap-2">
                                <Zap className="w-4 h-4 text-blue-400" /> Tactics Checklist
                              </h5>
                              <div className="grid gap-3">
                                {generationResult.tactics.map((tactic: string, i: number) => (
                                  <div key={i} className="flex items-center gap-3 text-xs text-slate-300 bg-black/20 p-3 rounded-xl border border-white/5">
                                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                                    {tactic}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
