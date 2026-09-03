import React from 'react';
import { 
  ShieldCheck, Truck, RotateCcw, Headphones, 
  CreditCard, Award, Heart, CheckCircle2 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setSelectedCategory, setActiveView } = useShop();

  const handleCategoryClick = (cat: any) => {
    setSelectedCategory(cat);
    setActiveView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-20">
      
      {/* 4 Trust Pillars Bar */}
      <div className="border-b border-slate-800 py-8 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Free Campus Dorm Delivery</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Express same-day delivery direct to hostel reception.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">100% Genuine & Brand Warranty</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Authorized brand warranty on all electronics & gadgets.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">7-Day Easy Doorstep Returns</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Hassle-free pickup from hostel desk with instant refund.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Fresher Student Discount</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Verified 10% instant off on all student essentials with ID.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Links Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm">
                🎓
              </div>
              <span className="font-heading font-extrabold text-base text-white tracking-tight">
                CAMPUS<span className="text-indigo-400">MART</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The premier e-commerce platform curated exclusively for university students. Complete technical specifications, 360° product previews, and hostel doorstep fulfillment.
            </p>
            <div className="pt-2 text-[11px] text-slate-500">
              <span>GSTIN: <strong>29AAACC1206D1ZM</strong></span>
              <span className="mx-2">•</span>
              <span>BIS Certified Catalog</span>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2.5">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">Product Categories</h5>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => handleCategoryClick('mobile')} className="hover:text-indigo-400 transition-colors">
                  Mobile Phones & 5G
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('sports')} className="hover:text-indigo-400 transition-colors">
                  Sports & Fitness Footwear
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('toys')} className="hover:text-indigo-400 transition-colors">
                  STEM Robotics & Tech Toys
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('cosmetics')} className="hover:text-indigo-400 transition-colors">
                  Dermatologist Skincare & Beauty
                </button>
              </li>
            </ul>
          </div>

          {/* Student Support */}
          <div className="space-y-2.5">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">Campus Services</h5>
            <ul className="space-y-1.5 text-[11px]">
              <li><a href="#pincode" className="hover:text-indigo-400">Hostel Pincode Verification</a></li>
              <li><a href="#returns" className="hover:text-indigo-400">Doorstep Return Policy</a></li>
              <li><a href="#id-verify" className="hover:text-indigo-400">Student ID Verification</a></li>
              <li><a href="#coins" className="hover:text-indigo-400">Campus Coins Program</a></li>
            </ul>
          </div>

          {/* Trust & Security */}
          <div className="space-y-2.5">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">Security & Payments</h5>
            <div className="space-y-1 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>256-Bit SSL Encrypted</span>
              </div>
              <p className="text-[10px] text-slate-500 pt-1">
                Supports UPI (GPay, PhonePe), Visa, Mastercard, RuPay, NetBanking & Cash on Campus Delivery.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} CampusMart E-Commerce Platform. Built for University Students.
          </div>
          <div className="flex gap-4">
            <a href="#terms" className="hover:text-slate-400">Terms of Service</a>
            <a href="#privacy" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#warranty" className="hover:text-slate-400">Warranty Policy</a>
          </div>
        </div>

      </div>

    </footer>
  );
};
