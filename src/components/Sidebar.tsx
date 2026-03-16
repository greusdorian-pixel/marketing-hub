
"use client";

import { motion } from "framer-motion";
import { 
  LineChart, 
  Target, 
  Search, 
  BarChart3, 
  Clock, 
  Zap, 
  Users, 
  Settings,
  ShieldCheck
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const categories = [
  { name: "All Skills", icon: Zap },
  { name: "Conversion Optimization", icon: Target },
  { name: "Content & Copy", icon: Users },
  { name: "SEO & Discovery", icon: Search },
  { name: "Testing & Experimentation", icon: BarChart3 },
  { name: "Paid & Distribution", icon: LineChart },
  { name: "Growth Engineering", icon: Zap },
  { name: "Retention", icon: Clock },
  { name: "Strategy & Monetization", icon: ShieldCheck },
];

interface SidebarProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export default function Sidebar({ activeCategory, setActiveCategory }: SidebarProps) {
  return (
    <div className="w-72 h-screen border-r border-slate-800 bg-slate-950/50 flex flex-col p-6 sticky top-0">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Zap className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Mkt-Skills</h1>
      </div>
      
      <nav className="flex-1 space-y-1">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
              activeCategory === cat.name 
                ? "bg-blue-600 shadow-lg shadow-blue-600/20 text-white" 
                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
            )}
          >
            <cat.icon className={cn(
              "w-4 h-4 transition-transform group-hover:scale-110",
              activeCategory === cat.name ? "text-white" : "text-slate-500"
            )} />
            {cat.name}
          </button>
        ))}
      </nav>
      
      <div className="mt-auto pt-6 border-t border-slate-800">
        <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800/50">
          <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-slate-300">Live & Synchronized</span>
          </div>
        </div>
      </div>
    </div>
  );
}
