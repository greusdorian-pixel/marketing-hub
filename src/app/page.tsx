
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Layers, Target, Terminal } from "lucide-react";
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
              onClick={() => setSelectedSkill(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            <motion.div
              layoutId={selectedSkill.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl glass rounded-3xl overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedSkill(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-800 transition-colors"
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
                      <input 
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl outline-none focus:border-blue-500 transition-colors"
                        placeholder="Project or company description..."
                      />
                      <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20">
                        Generate Strategy
                      </button>
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
