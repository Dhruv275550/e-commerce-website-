import React, { useState, useMemo } from 'react';
import { 
  Filter, SlidersHorizontal, ArrowUpDown, RotateCcw, 
  Check, Star, Smartphone, Activity, Bot, Sparkles, X,
  Home, ArrowLeft, ChevronRight 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { CategoryType } from '../types/product';
import { CATEGORIES_META } from '../data/mockProducts';

export const CategoryView: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setActiveView,
    setSelectedProduct
  } = useShop();

  // Filters State
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [studentDealsOnly, setStudentDealsOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high' | 'discount'>('popular');
  const [priceRange, setPriceRange] = useState<number>(80000);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available brands in currently selected category
  const availableBrands = useMemo(() => {
    const list = selectedCategory === 'all' 
      ? products 
      : products.filter(p => p.category === selectedCategory);
    return Array.from(new Set(list.map(p => p.brand)));
  }, [products, selectedCategory]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setMinRating(0);
    setInStockOnly(false);
    setStudentDealsOnly(false);
    setPriceRange(80000);
    setSearchQuery('');
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category match
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search query match
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const match = 
          product.name.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.subcategory.toLowerCase().includes(q) ||
          product.tags.some(t => t.toLowerCase().includes(q)) ||
          product.shortSummary.toLowerCase().includes(q);
        if (!match) return false;
      }
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      // Rating filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }
      // Stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      // Student deals only
      if (studentDealsOnly && !product.studentDiscountEligible) {
        return false;
      }
      // Price range
      if (product.sellingPrice > priceRange) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.sellingPrice - b.sellingPrice;
      if (sortBy === 'price_high') return b.sellingPrice - a.sellingPrice;
      if (sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
      return b.ratingCount - a.ratingCount; // Popular
    });
  }, [products, selectedCategory, searchQuery, selectedBrands, minRating, inStockOnly, studentDealsOnly, priceRange, sortBy]);

  const activeMeta = CATEGORIES_META.find(c => c.id === selectedCategory);

  const FilterSidebarContent = (
    <div className="space-y-6 text-xs text-slate-700">
      
      {/* Active Category Selector */}
      <div>
        <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-2.5">
          Select Category
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedBrands([]);
            }}
            className={`w-full text-left px-3 py-2 rounded-xl transition-colors font-medium flex items-center justify-between ${
              selectedCategory === 'all' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-100'
            }`}
          >
            <span>All Products</span>
            <span className="font-mono text-slate-400">{products.length}</span>
          </button>
          {CATEGORIES_META.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedBrands([]);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl transition-colors font-medium flex items-center justify-between ${
                selectedCategory === cat.id ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                {cat.id === 'mobile' && <Smartphone className="w-3.5 h-3.5 text-blue-600" />}
                {cat.id === 'sports' && <Activity className="w-3.5 h-3.5 text-emerald-600" />}
                {cat.id === 'toys' && <Bot className="w-3.5 h-3.5 text-amber-600" />}
                {cat.id === 'cosmetics' && <Sparkles className="w-3.5 h-3.5 text-rose-600" />}
                <span>{cat.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">
            Max Price
          </h4>
          <span className="font-mono-num font-bold text-indigo-600">
            ₹{priceRange.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min={500}
          max={80000}
          step={500}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-indigo-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
          <span>₹500</span>
          <span>₹80,000</span>
        </div>
      </div>

      {/* Brands Filter */}
      {availableBrands.length > 0 && (
        <div className="pt-4 border-t border-slate-200">
          <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-2.5">
            Brands
          </h4>
          <div className="space-y-1.5 max-h-40 overflow-y-auto">
            {availableBrands.map(brand => (
              <label 
                key={brand} 
                className="flex items-center gap-2 hover:bg-slate-50 p-1 rounded-lg cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                />
                <span className="text-slate-800 font-medium">{brand}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Ratings Filter */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-2.5">
          Customer Rating
        </h4>
        <div className="space-y-1.5">
          {[4, 3, 2].map(r => (
            <label 
              key={r} 
              className="flex items-center gap-2 hover:bg-slate-50 p-1 rounded-lg cursor-pointer"
            >
              <input
                type="radio"
                name="rating_filter"
                checked={minRating === r}
                onChange={() => setMinRating(r)}
                className="text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
              />
              <span className="flex items-center gap-1 font-semibold text-slate-800">
                <span>{r}★ & above</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </span>
            </label>
          ))}
          {minRating > 0 && (
            <button 
              onClick={() => setMinRating(0)}
              className="text-[11px] text-indigo-600 hover:underline font-semibold mt-1"
            >
              Clear rating filter
            </button>
          )}
        </div>
      </div>

      {/* Quick Toggles */}
      <div className="pt-4 border-t border-slate-200 space-y-2">
        <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
          <span className="font-semibold text-slate-800">In Stock Only</span>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
          />
        </label>

        <label className="flex items-center justify-between p-2 rounded-xl bg-indigo-50/60 border border-indigo-200 cursor-pointer">
          <span className="font-semibold text-indigo-950">Student Deals Only</span>
          <input
            type="checkbox"
            checked={studentDealsOnly}
            onChange={(e) => setStudentDealsOnly(e.target.checked)}
            className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
          />
        </label>
      </div>

      {/* Reset Action */}
      <button
        onClick={resetFilters}
        className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset All Filters</span>
      </button>

    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Breadcrumbs & Back to Home Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 mb-6 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            id="category-back-to-home-btn"
            onClick={() => {
              setSelectedProduct(null);
              setSelectedCategory('all');
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl transition-all cursor-pointer shadow-2xs group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <Home className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <span className="text-slate-300">|</span>

          <div className="flex items-center gap-1.5 text-slate-600">
            <button 
              onClick={() => {
                setActiveView('home');
                setSelectedProduct(null);
              }}
              className="hover:text-indigo-600 cursor-pointer font-medium"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-800 uppercase">
              {activeMeta ? activeMeta.name : 'All Categories'}
            </span>
          </div>
        </div>

        {searchQuery && (
          <div className="text-xs text-slate-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
            Search filter: <span className="font-bold text-amber-900">"{searchQuery}"</span>
          </div>
        )}
      </div>

      {/* Category Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-md border border-indigo-900/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Spec-Verified Catalog</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {activeMeta ? activeMeta.name : 'All Product Categories'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              {activeMeta ? activeMeta.desc : 'Explore verified mobile phones, athletic footwear, STEM robotics kits, and dermatologist-tested skincare.'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-white/10 text-white text-xs font-bold font-mono-num">
              {filteredProducts.length} Items Found
            </span>
          </div>
        </div>
      </div>

      {/* Grid Layout: Sidebar Filters + Main Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar (1 col) */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <span className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                <span>Filters</span>
              </span>
              {(selectedBrands.length > 0 || minRating > 0 || inStockOnly || studentDealsOnly || priceRange < 80000) && (
                <button 
                  onClick={resetFilters}
                  className="text-xs text-indigo-600 font-semibold hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            {FilterSidebarContent}
          </div>
        </div>

        {/* Mobile Filter Drawer Trigger */}
        <div className="lg:hidden col-span-1 flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 mb-4 shadow-xs">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
          >
            <Filter className="w-4 h-4" />
            <span>Filter & Categories</span>
          </button>
          
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-100 border border-slate-300 rounded-lg px-2 py-1 text-xs font-semibold outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>
        </div>

        {/* Mobile Filter Modal */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
            <div className="bg-white w-full max-w-xs h-full p-6 overflow-y-auto shadow-2xl animate-in slide-in-from-right">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <span className="font-heading font-bold text-sm text-slate-900">Filters</span>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {FilterSidebarContent}
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl font-bold text-xs shadow-md"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        )}

        {/* Main Products Grid (3 cols on lg) */}
        <div className="lg:col-span-3">
          
          {/* Top Sort & Active Filter Pills Bar */}
          <div className="hidden lg:flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200 mb-6 shadow-xs text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-500 font-medium">Showing {filteredProducts.length} products</span>
              {selectedBrands.map(b => (
                <span key={b} className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                  <span>{b}</span>
                  <button onClick={() => toggleBrand(b)} className="hover:text-indigo-900">×</button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none focus:border-indigo-500"
              >
                <option value="popular">Popularity & Rating</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="discount">Discount Percentage</option>
              </select>
            </div>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-xs">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">
                No products match these filters
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                Try widening your price range, clearing brand selections, or searching for broader terms.
              </p>
              <button
                onClick={resetFilters}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
