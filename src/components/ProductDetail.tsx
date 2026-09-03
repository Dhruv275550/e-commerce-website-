import React, { useState, useEffect } from 'react';
import { 
  Star, Heart, Scale, ShoppingBag, Truck, ShieldCheck, RefreshCw, 
  MapPin, Check, ChevronRight, ChevronLeft, Share2, Sparkles, AlertTriangle, 
  Eye, Award, ThumbsUp, MessageSquare, Plus, CheckCircle2,
  Cpu, Battery, Camera, Smartphone, Layers, HelpCircle,
  FileText, RotateCw, Play, X, Home, ArrowLeft
} from 'lucide-react';
import { Product, ProductVariant, ReviewItem, QAItem } from '../types/product';
import { useShop } from '../context/ShopContext';

export const ProductDetail: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    setActiveView, 
    setSelectedCategory,
    addToCart, 
    toggleWishlist, 
    isWishlisted,
    toggleCompare,
    isCompared,
    pincode,
    pincodeStatus,
    checkPincode,
    products,
    addRecentlyViewed,
    setActiveARProduct,
    setIsAROpen,
    setIsSEOOpen
  } = useShop();

  if (!selectedProduct) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-500 mb-4">No product selected</p>
        <button 
          onClick={() => setActiveView('home')} 
          className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold"
        >
          Return to Store
        </button>
      </div>
    );
  }

  // Record recently viewed
  useEffect(() => {
    if (selectedProduct) {
      addRecentlyViewed(selectedProduct.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedProduct.id]);

  // Variant selection
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    selectedProduct.variants?.[0]
  );
  
  // Media view: main image or 360 mode
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [is360Mode, setIs360Mode] = useState(false);
  const [frame360Index, setFrame360Index] = useState(0);

  // Quantity
  const [quantity, setQuantity] = useState(1);

  // Pincode input
  const [pincodeInput, setPincodeInput] = useState(pincode || '560100');
  const [pincodeFeedback, setPincodeFeedback] = useState<string | null>(null);

  // Modals inside details: Size chart, Write Review, Ask Question
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [isAskQAOpen, setIsAskQAOpen] = useState(false);

  // Local reviews & QA state for immediate user interactivity
  const [localReviews, setLocalReviews] = useState<ReviewItem[]>(selectedProduct.reviews);
  const [localQA, setLocalQA] = useState<QAItem[]>(selectedProduct.qaList);
  
  // New review form
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    comment: '',
    author: 'Student Reviewer'
  });

  // New QA form
  const [questionText, setQuestionText] = useState('');

  // Active tab in specs/info
  const [activeTab, setActiveTab] = useState<'specs' | 'highlights' | 'ingredients' | 'seller' | 'shipping'>('specs');

  // Selected variant attributes
  const currentPrice = selectedVariant ? selectedVariant.price : selectedProduct.sellingPrice;
  const currentMRP = selectedVariant ? selectedVariant.mrp : selectedProduct.mrp;
  const currentStock = selectedVariant ? selectedVariant.stock : selectedProduct.stockQuantity;
  const currentImage = selectedVariant?.image || selectedProduct.images[selectedImageIndex] || selectedProduct.images[0];

  const handleVariantChange = (v: ProductVariant) => {
    setSelectedVariant(v);
    if (v.image) {
      const idx = selectedProduct.images.findIndex(img => img === v.image);
      if (idx !== -1) setSelectedImageIndex(idx);
    }
  };

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkPincode(pincodeInput);
    if (result) {
      setPincodeFeedback(`Delivery available in ${result.city} (${result.deliveryDateStr})`);
    } else {
      setPincodeFeedback('Please enter a valid 6-digit postal pincode');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.title || !reviewForm.comment) return;
    const newRev: ReviewItem = {
      id: `rev-user-${Date.now()}`,
      author: reviewForm.author || 'Fresher Student',
      rating: reviewForm.rating,
      date: 'Today',
      title: reviewForm.title,
      comment: reviewForm.comment,
      verifiedPurchase: true,
      userType: 'Campus Verified Student',
      helpfulCount: 1
    };
    setLocalReviews([newRev, ...localReviews]);
    setIsWriteReviewOpen(false);
    setReviewForm({ rating: 5, title: '', comment: '', author: '' });
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    const newQA: QAItem = {
      id: `qa-user-${Date.now()}`,
      question: questionText,
      askedBy: 'Campus Student',
      date: 'Just now',
      answer: 'Thank you for your question. The seller has received your inquiry and usually responds within 2 hours.',
      answeredBy: selectedProduct.trustSignals.seller.name,
      isSellerAnswer: true,
      votes: 1
    };
    setLocalQA([newQA, ...localQA]);
    setIsAskQAOpen(false);
    setQuestionText('');
  };

  const crossSellProducts = products.filter(p => selectedProduct.crossSellIds?.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Back Navigation Bar & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 mb-6 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick Back to Home Button */}
          <button 
            id="product-back-to-home-btn"
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

          {/* Quick Back to Category Button */}
          <button 
            id="product-back-to-category-btn"
            onClick={() => {
              setSelectedCategory(selectedProduct.category);
              setSelectedProduct(null);
              setActiveView('category');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors cursor-pointer capitalize"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Back to {selectedProduct.category} Catalog</span>
          </button>

          <span className="text-slate-300 hidden sm:inline">|</span>

          {/* Breadcrumb Trail */}
          <div className="flex items-center gap-1.5 text-slate-600 hidden md:flex">
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
            <button 
              onClick={() => {
                setSelectedCategory(selectedProduct.category);
                setActiveView('category');
                setSelectedProduct(null);
              }}
              className="hover:text-indigo-600 cursor-pointer uppercase font-bold text-indigo-600"
            >
              {selectedProduct.category}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-700 font-medium">{selectedProduct.subcategory}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 truncate max-w-xs">{selectedProduct.name}</span>
          </div>
        </div>

        {/* Quick Schema & SEO Inspector Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSEOOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors text-xs cursor-pointer"
            title="Inspect Product SEO Meta & JSON-LD"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span>SEO & Schema Info</span>
          </button>
        </div>
      </div>

      {/* Primary 2-Column Product Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
        
        {/* Left Column: Media Gallery & 360 View (5 cols on lg) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          
          {/* Main Visual Display */}
          <div className="relative aspect-square w-full bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex items-center justify-center">
            
            {is360Mode ? (
              // Interactive 360 turntable preview simulator
              <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-slate-900 text-white">
                <img
                  src={selectedProduct.views360?.[frame360Index] || currentImage}
                  alt="360 View"
                  className="max-h-72 object-contain transition-all"
                />
                <div className="absolute bottom-4 inset-x-6 bg-slate-800/90 backdrop-blur-md rounded-xl p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-indigo-300 font-semibold">
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>360° Rotational Angle: {frame360Index * 90}°</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[0, 1, 2, 3].map((f) => (
                      <button
                        key={f}
                        onClick={() => setFrame360Index(f)}
                        className={`w-6 h-6 rounded-md text-[10px] font-bold ${
                          frame360Index === f ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {f + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <img
                src={currentImage}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-center"
              />
            )}

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {selectedProduct.badge && (
                <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-md uppercase tracking-wider">
                  {selectedProduct.badge}
                </span>
              )}
              <span className="bg-emerald-600 text-white text-xs font-extrabold px-3 py-1 rounded-lg shadow-md">
                {selectedProduct.discountPercentage}% Instant Discount
              </span>
            </div>

            {/* Visual Mode Switchers */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              {/* 360 Toggle Button */}
              {selectedProduct.views360 && (
                <button
                  onClick={() => setIs360Mode(!is360Mode)}
                  className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md backdrop-blur-md transition-all cursor-pointer ${
                    is360Mode ? 'bg-indigo-600 text-white' : 'bg-white/90 text-slate-800 hover:bg-white'
                  }`}
                  title="Toggle 360 Degree View"
                >
                  <RotateCw className="w-4 h-4" />
                  <span className="hidden sm:inline">360°</span>
                </button>
              )}

              {/* AR Try-On Studio (for cosmetics & sports) */}
              {(selectedProduct.category === 'cosmetics' || selectedProduct.category === 'sports') && (
                <button
                  onClick={() => {
                    setActiveARProduct(selectedProduct);
                    setIsAROpen(true);
                  }}
                  className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                  title="Virtual AR Try-on Studio"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span className="hidden sm:inline">AR Try-on</span>
                </button>
              )}
            </div>

          </div>

          {/* Thumbnail Strip */}
          {!is360Mode && selectedProduct.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {selectedProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImageIndex(idx);
                    setIs360Mode(false);
                  }}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer bg-slate-50 ${
                    selectedImageIndex === idx 
                      ? 'border-indigo-600 ring-2 ring-indigo-200' 
                      : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Trust Seals Below Gallery */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block">Warranty</span>
                <span className="text-[11px] text-slate-500">100% Genuine Brand</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-indigo-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block">Return Policy</span>
                <span className="text-[11px] text-slate-500">{selectedProduct.trustSignals.returnPolicy.split(' ')[0]} Days Easy Return</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-indigo-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block">Free Shipping</span>
                <span className="text-[11px] text-slate-500">Campus Dorm Express</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Identity, Pricing, Variants, Availability, CTAs (6 cols on lg) */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            
            {/* Identity: Brand & SKU */}
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span className="font-bold text-indigo-600 tracking-wider uppercase text-xs">
                {selectedProduct.brand}
              </span>
              <span className="font-mono text-slate-400">
                SKU: {selectedVariant?.sku || selectedProduct.sku}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-3">
              {selectedProduct.name}
            </h1>

            {/* Rating Bar & Reviews Summary */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
              <div className="flex items-center bg-amber-50 border border-amber-200 text-amber-900 px-2.5 py-1 rounded-lg text-xs font-bold">
                <span>{selectedProduct.rating}</span>
                <Star className="w-3.5 h-3.5 ml-1 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-xs text-slate-600 font-medium">
                {selectedProduct.ratingCount.toLocaleString()} Ratings & {localReviews.length} Verified Reviews
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-indigo-600 font-medium">
                {localQA.length} Q&As
              </span>
            </div>

            {/* Pricing Matrix */}
            <div className="py-4 border-b border-slate-200">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono-num">
                  {selectedProduct.currency}{currentPrice.toLocaleString()}
                </span>
                <span className="text-lg text-slate-400 line-through font-mono-num">
                  {selectedProduct.currency}{currentMRP.toLocaleString()}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2.5 py-1 rounded-md">
                  Save {selectedProduct.currency}{(currentMRP - currentPrice).toLocaleString()} ({selectedProduct.discountPercentage}% off)
                </span>
              </div>
              
              <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                <span>{selectedProduct.taxInfo}</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">Student discount coupon applicable</span>
              </div>

              {/* Fresher Student Deal Banner */}
              {selectedProduct.studentDiscountEligible && (
                <div className="mt-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-indigo-950 font-medium">
                    <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Special Student Price: Extra 10% off at checkout with <strong>FRESHER10</strong></span>
                  </div>
                  <span className="font-mono-num font-bold text-indigo-700 shrink-0">
                    Net: {selectedProduct.currency}{Math.round(currentPrice * 0.9).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Variants Matrix */}
            {selectedProduct.hasVariants && selectedProduct.variants && selectedProduct.variants.length > 0 && (
              <div className="py-4 border-b border-slate-200">
                
                {/* Size / Shade / Storage Variant Title */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Select Variant: <span className="text-indigo-600 font-medium">{selectedVariant?.name}</span>
                  </span>

                  {/* Size Chart Trigger for Sports */}
                  {selectedProduct.category === 'sports' && (
                    <button
                      onClick={() => setIsSizeChartOpen(true)}
                      className="text-xs text-indigo-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>📏 View Size Chart</span>
                    </button>
                  )}
                </div>

                {/* Variant Chips */}
                <div className="flex flex-wrap gap-2.5">
                  {selectedProduct.variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => handleVariantChange(v)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-2 ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-indigo-200'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                        }`}
                      >
                        {v.colorHex && (
                          <span 
                            className="w-3.5 h-3.5 rounded-full border border-white/50 shrink-0" 
                            style={{ backgroundColor: v.colorHex }}
                          />
                        )}
                        <span>{v.name}</span>
                        <span className="font-mono-num text-[11px] opacity-80">
                          {selectedProduct.currency}{v.price.toLocaleString()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Availability & Pincode Checker */}
            <div className="py-4 border-b border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs">
                  {currentStock > 0 ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      In Stock ({currentStock} available in nearest hub)
                    </span>
                  ) : (
                    <span className="text-rose-600 font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      Currently Out of Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Interactive Pincode Form */}
              <form onSubmit={handlePincodeSubmit} className="flex items-center gap-2 max-w-md">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value)}
                    placeholder="Enter 6-digit Pincode"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Check Delivery
                </button>
              </form>

              {pincodeStatus && (
                <div className="mt-2.5 text-xs text-slate-600 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Estimated Arrival: {pincodeStatus.deliveryDateStr}</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    Delivering to {pincodeStatus.city} • Cash on Delivery & Free Campus Return Available
                  </div>
                </div>
              )}
            </div>

            {/* Short Summary & Bullet Highlights */}
            <div className="py-4 border-b border-slate-200">
              <p className="text-sm text-slate-700 leading-relaxed mb-3">
                {selectedProduct.shortSummary}
              </p>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {selectedProduct.bulletHighlights.slice(0, 4).map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Purchase Actions & Quantity */}
          <div className="pt-5">
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Quantity Counter */}
              <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
                >
                  -
                </button>
                <span className="w-10 text-center font-mono-num font-bold text-sm text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  className="w-8 h-8 rounded-lg bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
                >
                  +
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                id="pdp-add-to-cart-btn"
                onClick={() => addToCart(selectedProduct, selectedVariant, quantity)}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart ({selectedProduct.currency}{(currentPrice * quantity).toLocaleString()})</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isWishlisted(selectedProduct.id)
                    ? 'bg-rose-50 border-rose-300 text-rose-600'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted(selectedProduct.id) ? 'fill-rose-500' : ''}`} />
              </button>

              {/* Compare Button */}
              <button
                onClick={() => toggleCompare(selectedProduct.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isCompared(selectedProduct.id)
                    ? 'bg-amber-50 border-amber-300 text-amber-600'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
                title="Compare"
              >
                <Scale className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Category-Specific Specifications & Comprehensive Information Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-12 shadow-xs">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-4 border-b border-slate-200 pb-4 overflow-x-auto scrollbar-none mb-6">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-2 text-sm font-bold tracking-tight whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'specs' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('highlights')}
            className={`pb-2 text-sm font-bold tracking-tight whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'highlights' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Detailed Overview & Highlights
          </button>
          {selectedProduct.category === 'cosmetics' && (
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`pb-2 text-sm font-bold tracking-tight whitespace-nowrap transition-all border-b-2 ${
                activeTab === 'ingredients' 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Ingredients & Dermatology
            </button>
          )}
          <button
            onClick={() => setActiveTab('seller')}
            className={`pb-2 text-sm font-bold tracking-tight whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'seller' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Seller & Trust Signals
          </button>
        </div>

        {/* Tab 1: Category-Specific Specifications Table */}
        {activeTab === 'specs' && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-slate-900">
                {selectedProduct.category === 'mobile' && 'Mobile Hardware & Network Specifications'}
                {selectedProduct.category === 'sports' && 'Athletic Performance & Sizing Attributes'}
                {selectedProduct.category === 'toys' && 'STEM Engineering & Child Safety Standards'}
                {selectedProduct.category === 'cosmetics' && 'Cosmetic Formula & Skin Compatibility'}
              </h3>
            </div>

            {/* Mobile Category Table */}
            {selectedProduct.category === 'mobile' && selectedProduct.mobileSpecs && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-2 text-indigo-600 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Processor & Storage</span>
                  </div>
                  <table className="w-full text-left">
                    <tbody>
                      <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5 w-1/3">Processor:</td><td className="font-semibold text-slate-800">{selectedProduct.mobileSpecs.processor}</td></tr>
                      <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5">RAM Configurations:</td><td className="font-semibold text-slate-800">{selectedProduct.mobileSpecs.ramOptions.join(' / ')}</td></tr>
                      <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5">Storage Standard:</td><td className="font-semibold text-slate-800">{selectedProduct.mobileSpecs.storageOptions.join(' / ')}</td></tr>
                      <tr className="py-1.5"><td className="text-slate-500 py-1.5">OS & Updates:</td><td className="font-semibold text-slate-800">{selectedProduct.mobileSpecs.os} ({selectedProduct.mobileSpecs.updatePolicy})</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-2 text-indigo-600 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Display & Panel</span>
                  </div>
                  <table className="w-full text-left">
                    <tbody>
                      <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5 w-1/3">Screen Size:</td><td className="font-semibold text-slate-800">{selectedProduct.mobileSpecs.screen.size}</td></tr>
                      <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5">Resolution:</td><td className="font-semibold text-slate-800">{selectedProduct.mobileSpecs.screen.resolution}</td></tr>
                      <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5">Refresh Rate:</td><td className="font-semibold text-slate-800">{selectedProduct.mobileSpecs.screen.refreshRate}</td></tr>
                      <tr className="py-1.5"><td className="text-slate-500 py-1.5">Brightness:</td><td className="font-semibold text-slate-800">{selectedProduct.mobileSpecs.screen.brightness}</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-2 text-indigo-600 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Camera System</span>
                  </div>
                  <table className="w-full text-left">
                    <tbody>
                      <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5 w-1/3">Rear Setup:</td><td className="font-semibold text-slate-800">{selectedProduct.mobileSpecs.camera.rear}</td></tr>
                      <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5">Front Camera:</td><td className="font-semibold text-slate-800">{selectedProduct.mobileSpecs.camera.front}</td></tr>
                      <tr className="py-1.5"><td className="text-slate-500 py-1.5">Camera Modes:</td><td className="font-semibold text-slate-800">{selectedProduct.mobileSpecs.camera.features.join(', ')}</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-2 text-indigo-600 flex items-center gap-1.5">
                    <Battery className="w-3.5 h-3.5" />
                    <span>Battery, Charging & Connectivity</span>
                  </div>
                  <table className="w-full text-left">
                    <tbody>
                      <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5 w-1/3">Battery Capacity:</td><td className="font-semibold text-slate-800">{selectedProduct.mobileSpecs.battery.capacity}</td></tr>
                      <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5">Charging Speed:</td><td className="font-semibold text-slate-800">{selectedProduct.mobileSpecs.battery.chargingSpeed}</td></tr>
                      <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5">Network & 5G:</td><td className="font-semibold text-slate-800">{selectedProduct.mobileSpecs.networkBands[0]}</td></tr>
                      <tr className="py-1.5"><td className="text-slate-500 py-1.5">IMEI & Warranty:</td><td className="font-semibold text-slate-800">{selectedProduct.mobileSpecs.imeiWarranty}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sports Category Table */}
            {selectedProduct.category === 'sports' && selectedProduct.sportsSpecs && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="font-bold text-indigo-600 uppercase text-[11px] mb-2">Material & Construction</div>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5">Sport Type:</td><td className="font-semibold text-slate-800">{selectedProduct.sportsSpecs.sportType}</td></tr>
                        <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5">Gender Fit:</td><td className="font-semibold text-slate-800">{selectedProduct.sportsSpecs.gender}</td></tr>
                        <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5">Composition:</td><td className="font-semibold text-slate-800">{selectedProduct.sportsSpecs.material}</td></tr>
                        <tr className="py-1.5"><td className="text-slate-500 py-1.5">Suitable Age:</td><td className="font-semibold text-slate-800">{selectedProduct.sportsSpecs.suitableAgeGroup}</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="font-bold text-indigo-600 uppercase text-[11px] mb-2">Performance & Care</div>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5">Fit Type:</td><td className="font-semibold text-slate-800">{selectedProduct.sportsSpecs.fitType}</td></tr>
                        <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5">Grip & Flex:</td><td className="font-semibold text-slate-800">{selectedProduct.sportsSpecs.gripFlexSpecs || 'Engineered multi-directional flex'}</td></tr>
                        <tr className="py-1.5"><td className="text-slate-500 py-1.5">Care Instructions:</td><td className="font-semibold text-slate-800">{selectedProduct.sportsSpecs.careInstructions}</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Size Chart Table */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs mb-2 flex items-center justify-between">
                    <span>Standard Sizing Measurement Matrix</span>
                    <span className="text-[11px] text-slate-500 font-normal">All measurements in cm & inches</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-100/80">
                          <th className="p-2 font-bold text-slate-700">Size</th>
                          <th className="p-2 font-bold text-slate-700">Chest / Foot Width</th>
                          <th className="p-2 font-bold text-slate-700">Waist / Arch</th>
                          <th className="p-2 font-bold text-slate-700">Length / Dimension</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProduct.sportsSpecs.sizeChart.map((row, idx) => (
                          <tr key={idx} className="border-b border-slate-200/60">
                            <td className="p-2 font-bold text-indigo-700">{row.size}</td>
                            <td className="p-2 text-slate-700">{row.chest}</td>
                            <td className="p-2 text-slate-700">{row.waist}</td>
                            <td className="p-2 text-slate-700">{row.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Toys Category Table */}
            {selectedProduct.category === 'toys' && selectedProduct.toysSpecs && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="font-bold text-indigo-600 uppercase text-[11px] mb-2">Age & Material Safety</div>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5">Age Recommendation:</td><td className="font-semibold text-slate-800">{selectedProduct.toysSpecs.ageRecommendation}</td></tr>
                      <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5">Material Composition:</td><td className="font-semibold text-slate-800">{selectedProduct.toysSpecs.material}</td></tr>
                      <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5">Battery Requirements:</td><td className="font-semibold text-slate-800">{selectedProduct.toysSpecs.batteryRequirement}</td></tr>
                      <tr className="py-1.5"><td className="text-slate-500 py-1.5">Assembly:</td><td className="font-semibold text-slate-800">{selectedProduct.toysSpecs.assemblyRequired ? 'Modular Snap-fit Assembly' : 'Ready to Play'}</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-amber-900 uppercase text-[11px] mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Safety Certifications & Hazards</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-amber-200 text-amber-900 font-semibold mb-3">
                      {selectedProduct.toysSpecs.chokingHazardWarning}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.toysSpecs.safetyCertifications.map((cert, cIdx) => (
                        <span key={cIdx} className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[10px] font-bold">
                          ✓ {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cosmetics Category Table */}
            {selectedProduct.category === 'cosmetics' && selectedProduct.cosmeticsSpecs && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="font-bold text-indigo-600 uppercase text-[11px] mb-2">Shelf Life & Formula Compliance</div>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5">Skin Compatibility:</td><td className="font-semibold text-slate-800">{selectedProduct.cosmeticsSpecs.skinSuitability.join(', ')}</td></tr>
                      <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5">Expiry Date:</td><td className="font-semibold text-slate-800">{selectedProduct.cosmeticsSpecs.expiryDate}</td></tr>
                      <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5">Batch Number:</td><td className="font-mono text-slate-800">{selectedProduct.cosmeticsSpecs.batchNumber}</td></tr>
                      <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5">PAO (Period After Opening):</td><td className="font-semibold text-slate-800">{selectedProduct.cosmeticsSpecs.shelfLifePAO}</td></tr>
                      <tr className="py-1.5"><td className="text-slate-500 py-1.5">Dermatologist Tested:</td><td className="font-semibold text-emerald-700">✓ Clinically Tested & Certified Safe</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-200">
                  <div className="font-bold text-rose-900 uppercase text-[11px] mb-2">Key Active Ingredients & Usage</div>
                  <div className="space-y-2 mb-3">
                    {selectedProduct.cosmeticsSpecs.keyActives.map((act, aIdx) => (
                      <div key={aIdx} className="bg-white p-2.5 rounded-xl border border-rose-100">
                        <div className="font-bold text-slate-900 flex justify-between">
                          <span>{act.name}</span>
                          {act.percentage && <span className="text-indigo-600 font-mono">{act.percentage}</span>}
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">{act.benefit}</p>
                      </div>
                    ))}
                  </div>
                  <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-rose-100">
                    <span className="font-bold text-slate-800">How to Apply: </span>
                    {selectedProduct.cosmeticsSpecs.usageInstructions}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Tab 2: Detailed Highlights */}
        {activeTab === 'highlights' && (
          <div className="text-sm text-slate-700 space-y-4">
            <p className="leading-relaxed font-normal">{selectedProduct.detailedDescription}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
              {selectedProduct.bulletHighlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-800 font-medium">{hl}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Cosmetics Full Ingredients List */}
        {activeTab === 'ingredients' && selectedProduct.cosmeticsSpecs && (
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 text-xs mb-2">Full International Nomenclature (INCI) Ingredients</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-mono bg-white p-3 rounded-xl border border-slate-200">
                {selectedProduct.cosmeticsSpecs.ingredientsList.join(', ')}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedProduct.cosmeticsSpecs.certifications.map((cert, idx) => (
                <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs px-3 py-1 rounded-full font-semibold">
                  🌿 {cert}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Seller Information & Trust Signals */}
        {activeTab === 'seller' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="font-bold text-slate-900 text-sm mb-2 flex items-center justify-between">
                <span>{selectedProduct.trustSignals.seller.name}</span>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">
                  {selectedProduct.trustSignals.seller.rating} ★ Verified Seller
                </span>
              </div>
              <table className="w-full text-left">
                <tbody>
                  <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5">Fulfillment Center:</td><td className="font-semibold text-slate-800">{selectedProduct.trustSignals.seller.shipsFrom}</td></tr>
                  <tr className="border-b border-slate-200/60 py-1.5"><td className="text-slate-500 py-1.5">Orders Delivered:</td><td className="font-semibold text-slate-800">{selectedProduct.trustSignals.seller.salesCount}</td></tr>
                  <tr className="py-1.5"><td className="text-slate-500 py-1.5">Registered GSTIN:</td><td className="font-mono text-slate-800">{selectedProduct.trustSignals.seller.gstin}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="font-bold text-slate-900 text-sm mb-2">Accreditations & Certifications</div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {selectedProduct.trustSignals.certifications.map((c, i) => (
                    <span key={i} className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 text-xs font-semibold">
                      🛡️ {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-slate-500 text-[11px] bg-white p-2.5 rounded-xl border border-slate-200">
                100% money back guarantee backed by CampusMart Buyer Protection.
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Customer Reviews & Rating Breakdown Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-12 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
          <div>
            <h3 className="font-heading font-bold text-xl text-slate-900">Customer Ratings & Verified Feedback</h3>
            <p className="text-xs text-slate-500 mt-0.5">Real verified student experiences from campus campuses</p>
          </div>
          <button
            onClick={() => setIsWriteReviewOpen(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write a Student Review</span>
          </button>
        </div>

        {/* Rating Score Breakdown Bars */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-8">
          
          {/* Average Box */}
          <div className="md:col-span-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
            <div className="text-4xl font-extrabold text-slate-900 font-mono-num">{selectedProduct.rating}</div>
            <div className="flex justify-center gap-1 my-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star 
                  key={s} 
                  className={`w-4 h-4 ${s <= Math.floor(selectedProduct.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                />
              ))}
            </div>
            <div className="text-xs text-slate-500 font-medium">Based on {selectedProduct.ratingCount.toLocaleString()} ratings</div>
          </div>

          {/* Star Distribution Progress Bars */}
          <div className="md:col-span-8 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = selectedProduct.ratingBreakdown[stars as keyof typeof selectedProduct.ratingBreakdown] || 0;
              const total = selectedProduct.ratingCount || 1;
              const percentage = Math.round((count / total) * 100);
              return (
                <div key={stars} className="flex items-center gap-3 text-xs">
                  <span className="w-12 font-bold text-slate-700 flex items-center gap-1">
                    <span>{stars}</span>
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-400 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-12 text-right font-mono text-slate-500">{percentage}%</span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {localReviews.map((rev) => (
            <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{rev.author}</span>
                  {rev.userType && (
                    <span className="bg-indigo-100 text-indigo-800 text-[10px] font-semibold px-2 py-0.5 rounded">
                      {rev.userType}
                    </span>
                  )}
                  {rev.verifiedPurchase && (
                    <span className="text-emerald-700 font-semibold flex items-center gap-0.5 text-[11px]">
                      <Check className="w-3 h-3" />
                      Verified Purchase
                    </span>
                  )}
                </div>
                <span className="text-slate-400 text-[11px]">{rev.date}</span>
              </div>

              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star 
                    key={s} 
                    className={`w-3 h-3 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                  />
                ))}
              </div>

              <div className="font-bold text-slate-900 text-sm mb-1">{rev.title}</div>
              <p className="text-slate-700 leading-relaxed mb-3">{rev.comment}</p>

              <div className="flex items-center gap-4 text-slate-500 text-[11px]">
                <button className="flex items-center gap-1 hover:text-slate-900 cursor-pointer">
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful ({rev.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Community Questions & Answers Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-12 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
          <div>
            <h3 className="font-heading font-bold text-xl text-slate-900">Have a Question about this Product?</h3>
            <p className="text-xs text-slate-500 mt-0.5">Instant answers from official brand reps and fellow students</p>
          </div>
          <button
            onClick={() => setIsAskQAOpen(true)}
            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ask a Question</span>
          </button>
        </div>

        <div className="space-y-4">
          {localQA.map((qa) => (
            <div key={qa.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div className="font-bold text-slate-900 text-sm mb-1.5 flex items-start gap-2">
                <span className="text-indigo-600 font-extrabold">Q:</span>
                <span>{qa.question}</span>
              </div>
              <div className="pl-5 text-slate-700 leading-relaxed mb-2 flex items-start gap-2">
                <span className="text-emerald-600 font-extrabold">A:</span>
                <div>
                  <p>{qa.answer}</p>
                  <div className="mt-1 text-[11px] text-slate-500 flex items-center gap-2">
                    <span>Answered by <strong>{qa.answeredBy}</strong></span>
                    {qa.isSellerAnswer && (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded">
                        Official Brand Answer
                      </span>
                    )}
                    <span>• {qa.date}</span>
                  </div>
                </div>
              </div>
              <div className="pl-5 pt-1 border-t border-slate-200/50 flex items-center gap-3 text-slate-500 text-[11px]">
                <button className="flex items-center gap-1 hover:text-slate-800 cursor-pointer">
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful answer ({qa.votes})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* "Customers Also Bought" Frequently Bought Together Cross-Sell */}
      {crossSellProducts.length > 0 && (
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 mb-12 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Frequently Bought Together</span>
          </div>
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl mb-6">
            Complete Your Campus Bundle & Save an Extra 15%
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {crossSellProducts.map((cross) => (
              <div 
                key={cross.id}
                onClick={() => setSelectedProduct(cross)}
                className="bg-slate-800/80 hover:bg-slate-800 rounded-2xl p-4 border border-slate-700 transition-all cursor-pointer flex items-center gap-3"
              >
                <img src={cross.images[0]} alt={cross.name} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white truncate">{cross.name}</div>
                  <div className="text-[11px] text-slate-400">{cross.brand}</div>
                  <div className="text-xs font-extrabold text-amber-400 mt-1 font-mono-num">
                    {cross.currency}{cross.sellingPrice.toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(cross, cross.variants?.[0], 1);
                  }}
                  className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shrink-0"
                  title="Add bundle to cart"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Quick Navigation & Return to Store Banner */}
      <div className="mt-12 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-indigo-600" />
            <span>Finished checking this product?</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Return to the homepage to explore trending college deals, active category discounts, or compare other products.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            id="bottom-back-to-home-btn"
            onClick={() => {
              setSelectedProduct(null);
              setSelectedCategory('all');
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Home className="w-4 h-4 text-indigo-400" />
            <span>Return to Home Store</span>
          </button>

          <button
            id="bottom-back-to-category-btn"
            onClick={() => {
              setSelectedCategory(selectedProduct.category);
              setSelectedProduct(null);
              setActiveView('category');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition-colors cursor-pointer capitalize"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Browse More {selectedProduct.category}</span>
          </button>
        </div>
      </div>

      {/* Modal 1: Size Chart (Sports) */}
      {isSizeChartOpen && selectedProduct.sportsSpecs && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="font-heading font-bold text-lg text-slate-900">Standard Sizing Chart</h3>
              <button onClick={() => setIsSizeChartOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-2.5 font-bold text-slate-800">Size</th>
                    <th className="p-2.5 font-bold text-slate-800">Chest</th>
                    <th className="p-2.5 font-bold text-slate-800">Waist</th>
                    <th className="p-2.5 font-bold text-slate-800">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedProduct.sportsSpecs.sizeChart.map((s, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-bold text-indigo-600">{s.size}</td>
                      <td className="p-2.5">{s.chest}</td>
                      <td className="p-2.5">{s.waist}</td>
                      <td className="p-2.5">{s.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setIsSizeChartOpen(false)}
              className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold"
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* Modal 2: Write Review */}
      {isWriteReviewOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="font-heading font-bold text-lg text-slate-900">Write a Student Review</h3>
              <button onClick={() => setIsWriteReviewOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddReview} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setReviewForm({ ...reviewForm, rating: s })}
                      className="p-1 cursor-pointer"
                    >
                      <Star className={`w-6 h-6 ${s <= reviewForm.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Review Title</label>
                <input
                  type="text"
                  required
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                  placeholder="e.g. Incredible performance for college tasks"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Review Comment</label>
                <textarea
                  required
                  rows={4}
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  placeholder="Tell other students about the quality, specs, and battery life..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWriteReviewOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow-md hover:bg-indigo-700"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Ask QA Question */}
      {isAskQAOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="font-heading font-bold text-lg text-slate-900">Ask a Question to Seller</h3>
              <button onClick={() => setIsAskQAOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAskQuestion} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Question</label>
                <textarea
                  required
                  rows={4}
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Ask about specs, charger in box, hostel delivery, or warranty coverage..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAskQAOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow-md hover:bg-indigo-700"
                >
                  Post Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
