
"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  core_principles: string[];
}

interface SkillCardProps {
  skill: Skill;
  onClick: (skill: Skill) => void;
  index: number;
}

export default function SkillCard({ skill, onClick, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => onClick(skill)}
      className="glass glass-hover p-6 rounded-2xl cursor-pointer group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight className="w-5 h-5 text-blue-400" />
      </div>
      
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 px-2 py-1 rounded">
          {skill.category}
        </span>
      </div>
      
      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
        {skill.title}
      </h3>
      
      <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
        {skill.description}
      </p>
      
      <div className="space-y-2">
        {skill.core_principles.slice(0, 2).map((p, i) => (
          <div key={i} className="flex items-start gap-2 text-xs text-slate-500">
            <CheckCircle2 className="w-3 h-3 text-blue-500/50 mt-0.5" />
            <span className="truncate">{p.split(":")[0]}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
