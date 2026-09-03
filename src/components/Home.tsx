import React from 'react';
import { 
  Smartphone, Activity, Bot, Sparkles, ArrowRight, 
  Flame, Award, ShieldCheck, Zap, Star 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Banner } from './Banner';
import { ProductCard } from './ProductCard';
import { CATEGORIES_META } from '../data/mockProducts';

export const Home: React.FC = () => {
  const { products, setSelectedCategory, setActiveView } = useShop();

  // Featured lists
  const trendingDeals = products.filter(p => p.studentDiscountEligible).slice(0, 4);
  const bestSellers = [...products].sort((a, b) => b.ratingCount - a.ratingCount).slice(0, 4);

  const handleSelectCategory = (catId: any) => {
    setSelectedCategory(catId);
    setActiveView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-10 pb-12">
      
      {/* Hero Promotional Banner with Student Discount Code & Pincode Checker */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Banner />
      </div>

      {/* 4 Core Category Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
              Browse by Campus Category
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Spec-verified items with transparent attributes & brand warranties
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setActiveView('category');
            }}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES_META.map(cat => {
            const count = products.filter(p => p.category === cat.id).length;

            return (
              <div
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className="group relative bg-white rounded-3xl p-5 border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    {cat.id === 'mobile' && <Smartphone className="w-6 h-6" />}
                    {cat.id === 'sports' && <Activity className="w-6 h-6" />}
                    {cat.id === 'toys' && <Bot className="w-6 h-6" />}
                    {cat.id === 'cosmetics' && <Sparkles className="w-6 h-6" />}
                  </div>

                  <div>
                    <h3 className="font-heading font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
                  <span className="font-mono text-slate-400 text-[11px] font-semibold">{count} Verified SKUs</span>
                  <span className="text-indigo-600 font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trending Student Deals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-extrabold text-slate-900">
                Trending Fresher Student Deals
              </h2>
              <p className="text-xs text-slate-500">
                Eligible for instant extra 10% student promo discount
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('all');
              setActiveView('category');
            }}
            className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>See All Deals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingDeals.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Student Perks Value Proposition Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white">Campus ID Verification</h3>
              <p className="text-xs text-indigo-100/80 leading-relaxed">
                Connect your .edu student ID once to unlock exclusive 10% discounts and campus coin cashback across every single category.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white">Direct-to-Dorm Logistics</h3>
              <p className="text-xs text-indigo-100/80 leading-relaxed">
                Enter your hostel block and room number for seamless handover straight to your floor reception or campus gate.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-rose-300">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white">Comprehensive Tech Specs</h3>
              <p className="text-xs text-indigo-100/80 leading-relaxed">
                Every mobile spec, sports material, STEM robotics payload, and cosmetic active is lab-verified with complete transparency.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-extrabold text-slate-900">
                Top Rated Across Campuses
              </h2>
              <p className="text-xs text-slate-500">
                Most reviewed and highest rated by university students
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

    </div>
  );
};
