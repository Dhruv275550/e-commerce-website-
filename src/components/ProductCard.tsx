import React, { useState } from 'react';
import { 
  Heart, ShoppingBag, Scale, Star, Eye, Zap, 
  Sparkles, Check, AlertCircle, RotateCcw
} from 'lucide-react';
import { Product } from '../types/product';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    setSelectedProduct, 
    setActiveView, 
    addToCart, 
    toggleWishlist, 
    isWishlisted,
    toggleCompare,
    isCompared,
    setActiveARProduct,
    setIsAROpen
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const isFav = isWishlisted(product.id);
  const isComp = isCompared(product.id);

  const handleCardClick = () => {
    setSelectedProduct(product);
    setActiveView('product_detail');
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.variants?.[0], 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1800);
  };

  const handleARClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveARProduct(product);
    setIsAROpen(true);
  };

  // Extract key category specs to display on card
  const getCategoryQuickSpecs = () => {
    if (product.category === 'mobile' && product.mobileSpecs) {
      return `${product.mobileSpecs.screen.refreshRate} AMOLED • ${product.mobileSpecs.processor.split(' ')[0]} • ${product.mobileSpecs.battery.chargingSpeed.split(' ')[0]}`;
    }
    if (product.category === 'sports' && product.sportsSpecs) {
      return `${product.sportsSpecs.gender} • ${product.sportsSpecs.material.split(',')[0]} • ${product.sportsSpecs.fitType}`;
    }
    if (product.category === 'toys' && product.toysSpecs) {
      return `Age ${product.toysSpecs.ageRecommendation.split(' ')[0]} • ${product.toysSpecs.safetyCertifications[0]} • Non-Toxic`;
    }
    if (product.category === 'cosmetics' && product.cosmeticsSpecs) {
      return `${product.cosmeticsSpecs.keyActives[0]?.name || 'Barrier Care'} • ${product.cosmeticsSpecs.shelfLifePAO} PAO • 100% Vegan`;
    }
    return product.subcategory;
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Image Container with Media Switcher */}
      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
        <img
          src={product.images[activeImageIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs backdrop-blur-xs uppercase tracking-wide">
              {product.badge}
            </span>
          )}
          <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
            {product.discountPercentage}% OFF
          </span>
        </div>

        {/* Action Buttons Top Right */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs ${
              isFav 
                ? 'bg-rose-50 text-rose-600 ring-1 ring-rose-300' 
                : 'bg-white/90 text-slate-600 hover:text-rose-600 hover:bg-white backdrop-blur-xs'
            }`}
            title={isFav ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
          </button>

          {/* Compare Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs ${
              isComp 
                ? 'bg-amber-50 text-amber-600 ring-1 ring-amber-300' 
                : 'bg-white/90 text-slate-600 hover:text-amber-600 hover:bg-white backdrop-blur-xs'
            }`}
            title="Compare Specifications"
          >
            <Scale className="w-4 h-4" />
          </button>

          {/* AR Try-On Button for Cosmetics or Sports */}
          {(product.category === 'cosmetics' || product.category === 'sports') && (
            <button
              onClick={handleARClick}
              className="w-8 h-8 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center transition-all shadow-xs"
              title="Virtual AR Try-on Studio"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Thumbnail Preview Dots / Switcher */}
        {product.images.length > 1 && (
          <div 
            className="absolute bottom-2 inset-x-0 flex justify-center gap-1.5 z-10 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            {product.images.slice(0, 4).map((img, idx) => (
              <button
                key={idx}
                onMouseEnter={() => setActiveImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeImageIndex === idx ? 'bg-indigo-600 w-4' : 'bg-white/80 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}

        {/* 360 Indicator */}
        {product.views360 && product.views360.length > 0 && (
          <div className="absolute bottom-2 left-2 bg-slate-900/70 text-white text-[9px] font-medium px-1.5 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
            <RotateCcw className="w-2.5 h-2.5 text-indigo-300" />
            <span>360° View</span>
          </div>
        )}
      </div>

      {/* Card Content & Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Identity: Brand & SKU */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-indigo-600 uppercase tracking-wider text-[10px]">
              {product.brand}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              SKU: {product.sku}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-sm text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug mb-1.5">
            {product.name}
          </h3>

          {/* Category-Specific Quick Spec Capsule */}
          <div className="text-[11px] font-medium text-slate-600 bg-slate-100/80 px-2 py-1 rounded-md mb-2 truncate">
            {getCategoryQuickSpecs()}
          </div>

          {/* Rating & Review Count */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center bg-amber-50 border border-amber-200/80 text-amber-800 px-1.5 py-0.5 rounded text-[11px] font-bold">
              <span>{product.rating}</span>
              <Star className="w-3 h-3 ml-0.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-[11px] text-slate-500">
              ({product.ratingCount.toLocaleString()} reviews)
            </span>
            {product.reviews.some(r => r.verifiedPurchase) && (
              <span className="text-[10px] text-emerald-600 font-semibold ml-auto flex items-center gap-0.5">
                <Check className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>
        </div>

        <div>
          {/* Pricing: MRP, Selling Price, Discount, Tax */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-extrabold text-slate-900 font-mono-num">
                {product.currency}{product.sellingPrice.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 line-through font-mono-num">
                {product.currency}{product.mrp.toLocaleString()}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 truncate mb-3">
              {product.taxInfo}
            </div>

            {/* Stock status & Quick Actions */}
            <div className="flex items-center justify-between gap-2">
              <div className="text-[10px]">
                {product.stockQuantity < 15 ? (
                  <span className="text-amber-600 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Only {product.stockQuantity} left!
                  </span>
                ) : (
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    In Stock ({product.stockQuantity})
                  </span>
                )}
              </div>

              {/* Add to Cart / View Details Button */}
              <button
                onClick={handleQuickAdd}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isAddedRecently 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white'
                }`}
              >
                {isAddedRecently ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
