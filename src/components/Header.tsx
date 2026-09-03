import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingBag, Heart, Search, Scale, User, ShieldCheck, 
  Sparkles, Bell, Layers, HelpCircle, ChevronDown, Check,
  Smartphone, Activity, Bot, Tag, MapPin, X, UserPlus, Users, Trash2, Home
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CategoryType } from '../types/product';
import { CATEGORIES_META } from '../data/mockProducts';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    selectedCategory,
    setSelectedCategory,
    cartCount,
    setIsCartOpen,
    wishlist,
    compareList,
    setIsCompareOpen,
    searchQuery,
    setSearchQuery,
    products,
    setSelectedProduct,
    userProfile,
    userAccounts,
    notifications,
    markAllNotificationsRead,
    pincodeStatus,
    setIsChatOpen,
    setIsAuthModalOpen,
    setAuthModalMode
  } = useShop();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close popups on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadNotifs = notifications.filter(n => !n.read).length;

  const searchSuggestions = searchQuery.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5);

  const handleSelectProduct = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setActiveView('product_detail');
    setIsSearchFocused(false);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Notification Bar for Fresher Students */}
      <div className="bg-slate-900 text-white text-xs font-medium py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase">
              Fresher Student Deal
            </span>
            <span className="hidden sm:inline text-slate-300">
              Get flat 10% instant off on all electronics, sports & essentials with code:
            </span>
            <span className="font-mono-num font-bold text-amber-400">FRESHER10</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 text-xs shrink-0">
            <button 
              onClick={() => setIsChatOpen(true)}
              className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden md:inline">24/7 Campus Support</span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Verified Brand Genuine</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-6">
            <button 
              id="brand-logo-btn"
              onClick={() => {
                setActiveView('home');
                setSelectedCategory('all');
                setSelectedProduct(null);
              }}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900">
                    Campus<span className="text-indigo-600">Mart</span>
                  </span>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200/60 font-semibold px-1.5 py-0.5 rounded-md">
                    Student Store
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 hidden md:block">
                  Curated Specs & Authentic Products
                </p>
              </div>
            </button>

            {/* Category Dropdown Pill */}
            <div className="relative hidden lg:block">
              <button
                id="header-category-menu-btn"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-100/80 transition-colors cursor-pointer"
              >
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isCategoryMenuOpen && (
                <div 
                  className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setIsCategoryMenuOpen(false)}
                >
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setActiveView('category');
                      setIsCategoryMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hover:bg-slate-50 flex items-center justify-between"
                  >
                    <span>All Products ({products.length})</span>
                    {selectedCategory === 'all' && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>
                  <div className="h-px bg-slate-100 my-1"></div>
                  {CATEGORIES_META.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setActiveView('category');
                        setIsCategoryMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-indigo-50/70 transition-colors ${
                        selectedCategory === cat.id ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                        {cat.id === 'mobile' && <Smartphone className="w-4 h-4 text-blue-600" />}
                        {cat.id === 'sports' && <Activity className="w-4 h-4 text-emerald-600" />}
                        {cat.id === 'toys' && <Bot className="w-4 h-4 text-amber-600" />}
                        {cat.id === 'cosmetics' && <Sparkles className="w-4 h-4 text-rose-600" />}
                      </div>
                      <div>
                        <div className="font-medium text-xs">{cat.name}</div>
                        <div className="text-[10px] text-slate-500">{cat.count}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Smart Autocomplete Search Bar */}
          <div ref={searchRef} className="relative flex-1 max-w-lg">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search phones (5G, RAM), running shoes, STEM kits, serums..."
                className="w-full pl-10 pr-9 py-2 bg-slate-100 hover:bg-slate-100/90 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 rounded-xl border border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {isSearchFocused && searchQuery.trim() !== '' && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 max-h-96 overflow-y-auto">
                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
                  Matching Products & Specifications
                </div>
                {searchSuggestions.length > 0 ? (
                  searchSuggestions.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod)}
                      className="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center gap-3 transition-colors cursor-pointer border-b border-slate-50 last:border-0"
                    >
                      <img 
                        src={prod.images[0]} 
                        alt={prod.name}
                        className="w-10 h-10 object-cover rounded-lg bg-slate-100 shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-slate-800 truncate">{prod.name}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2">
                          <span className="font-medium text-indigo-600 uppercase text-[10px]">{prod.category}</span>
                          <span>•</span>
                          <span>SKU: {prod.sku}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-bold text-slate-900 font-mono-num">{prod.currency}{prod.sellingPrice.toLocaleString()}</div>
                        <div className="text-[10px] text-emerald-600 font-semibold">{prod.discountPercentage}% OFF</div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-4 text-center text-xs text-slate-500">
                    No products found matching "{searchQuery}". Try searching for "Snapdragon", "5G", "Shoes", or "Serum".
                  </div>
                )}
                
                <div className="p-2 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[11px] text-slate-600">
                  <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono">ESC</kbd> to dismiss</span>
                  <button 
                    onClick={() => {
                      setActiveView('category');
                      setIsSearchFocused(false);
                    }}
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    View All Matching Results →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User & Store Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Campus Pincode Quick Status (Desktop) */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-lg text-xs text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="font-medium">Dorm Hub:</span>
              <span className="font-mono-num font-bold text-slate-900">{pincodeStatus?.pincode || '560100'}</span>
            </div>

            {/* Compare Drawer Trigger */}
            <button
              id="compare-btn"
              onClick={() => setIsCompareOpen(true)}
              className="relative p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Compare Products Specs"
            >
              <Scale className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist Trigger */}
            <button
              id="wishlist-btn"
              onClick={() => {
                setActiveView('dashboard');
              }}
              className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Wishlist Items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Notifications Popover */}
            <div ref={notifRef} className="relative">
              <button
                id="notifications-btn"
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-indigo-600 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-heading font-bold text-sm text-slate-900">Notifications</span>
                    <button 
                      onClick={markAllNotificationsRead}
                      className="text-xs text-indigo-600 hover:underline font-medium"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-3.5 text-xs hover:bg-slate-50 transition-colors ${!n.read ? 'bg-indigo-50/40' : ''}`}>
                        <div className="font-semibold text-slate-900 flex items-center justify-between">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                        </div>
                        <p className="text-slate-600 text-[11px] mt-1">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Drawer Trigger */}
            <button
              id="cart-trigger-btn"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-900 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-mono-num font-bold">Cart</span>
            </button>

            {/* Student Account Menu */}
            <div ref={userMenuRef} className="relative">
              <button
                id="user-profile-menu-btn"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  {userProfile.name.charAt(0)}
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-xs font-semibold text-slate-900 truncate max-w-[100px]">
                    {userProfile.name.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                    <Tag className="w-2.5 h-2.5" />
                    <span>{userProfile.loyaltyCoins} Coins</span>
                  </div>
                </div>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <div className="text-xs font-bold text-slate-900">{userProfile.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{userProfile.email}</div>
                    <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Student ID</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveView('dashboard');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>My Student Dashboard & Orders</span>
                  </button>

                  <button
                    onClick={() => {
                      setAuthModalMode('register');
                      setIsAuthModalOpen(true);
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-indigo-600 hover:bg-indigo-50 flex items-center gap-2 cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Create New Student Account</span>
                  </button>

                  <button
                    onClick={() => {
                      setAuthModalMode('manage');
                      setIsAuthModalOpen(true);
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-slate-500" />
                      <span>Switch / Delete Accounts</span>
                    </div>
                    <span className="bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-md font-mono text-[10px]">
                      {userAccounts.length}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveView('admin');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-slate-500" />
                    <span>Store Admin & Schema Inspector</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Category Quick Bar */}
      <div className="bg-slate-50 border-t border-slate-200/60 overflow-x-auto scrollbar-none py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs">
          {/* Home Store Button */}
          <button
            id="nav-quick-home-btn"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedProduct(null);
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'home' 
                ? 'bg-slate-900 text-white shadow-xs' 
                : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-indigo-400" />
            <span>Home</span>
          </button>

          {/* All Catalog Button */}
          <button
            id="nav-quick-all-products-btn"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedProduct(null);
              setActiveView('category');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all cursor-pointer ${
              activeView === 'category' && selectedCategory === 'all' 
                ? 'bg-indigo-600 text-white shadow-xs font-bold' 
                : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            All Products ({products.length})
          </button>
          {CATEGORIES_META.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedProduct(null);
                setActiveView('category');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'category' && selectedCategory === cat.id 
                  ? 'bg-indigo-600 text-white shadow-xs font-bold' 
                  : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              {cat.id === 'mobile' && <Smartphone className="w-3.5 h-3.5" />}
              {cat.id === 'sports' && <Activity className="w-3.5 h-3.5" />}
              {cat.id === 'toys' && <Bot className="w-3.5 h-3.5" />}
              {cat.id === 'cosmetics' && <Sparkles className="w-3.5 h-3.5" />}
              <span>{cat.name}</span>
            </button>
          ))}

          <div className="ml-auto hidden md:flex items-center gap-4 text-slate-500 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Stock Verified
            </span>
            <span>•</span>
            <span>Easy 7-10 Days Return</span>
          </div>
        </div>
      </div>
    </header>
  );
};
