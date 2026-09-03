import React from 'react';
import { Sparkles, Zap, ShieldCheck, RefreshCw, Truck, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Banner: React.FC = () => {
  const { setSelectedCategory, setActiveView } = useShop();

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 mb-10 shadow-xl border border-indigo-900/40">
      {/* Subtle Background Elements */}
      <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute left-1/3 -top-10 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Fresher Students Welcome Edition</span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white">
          Everything You Need for Campus Life, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-amber-300">Spec-Verified</span> & Discounted.
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 max-w-2xl">
          Complete transparent specifications on every product — from 5G Snapdragon processors & 120W charging to ISO-certified sports gear, STEM robotics kits, and dermatologist-tested skincare.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
          <button
            onClick={() => {
              setSelectedCategory('mobile');
              setActiveView('category');
            }}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md hover:shadow-indigo-500/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Explore 5G Phones</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setSelectedCategory('sports');
              setActiveView('category');
            }}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer"
          >
            <span>Sports & Running Gear</span>
          </button>

          <button
            onClick={() => {
              setSelectedCategory('cosmetics');
              setActiveView('category');
            }}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer"
          >
            <span>Clean Skincare & Makeup</span>
          </button>
        </div>

        {/* Feature Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-indigo-900/60 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Truck className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="font-semibold text-white">Campus Express</div>
              <div className="text-[11px] text-slate-400">Direct to Dorm Desk</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div className="font-semibold text-white">Brand Warranty</div>
              <div className="text-[11px] text-slate-400">100% Genuine Seals</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <RefreshCw className="w-4 h-4 text-blue-400 shrink-0" />
            <div>
              <div className="font-semibold text-white">7-10 Days Return</div>
              <div className="text-[11px] text-slate-400">Hassle-Free Exchange</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <Zap className="w-4 h-4 text-purple-400 shrink-0" />
            <div>
              <div className="font-semibold text-white">Student Perks</div>
              <div className="text-[11px] text-slate-400">Coins & Instant UPI</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
