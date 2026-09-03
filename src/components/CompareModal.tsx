import React from 'react';
import { 
  X, Scale, Trash2, Check, Star, ShoppingBag, 
  Sparkles, AlertCircle, ArrowRight 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CompareModal: React.FC = () => {
  const {
    compareList,
    removeFromCompare,
    isCompareOpen,
    setIsCompareOpen,
    products,
    addToCart,
    setSelectedProduct,
    setActiveView
  } = useShop();

  if (!isCompareOpen) return null;

  const comparedProducts = products.filter(p => compareList.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900">
                Product Specification Comparison
              </h3>
              <p className="text-xs text-slate-500">
                Side-by-side attribute comparison ({comparedProducts.length} selected)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCompareOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {comparedProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-3 bg-slate-50 font-bold text-slate-700 w-44 rounded-l-2xl">Attributes</th>
                  {comparedProducts.map(prod => (
                    <th key={prod.id} className="p-3 bg-slate-50 font-bold text-slate-900 min-w-56 align-top">
                      <div className="relative">
                        <button
                          onClick={() => removeFromCompare(prod.id)}
                          className="absolute -top-1 -right-1 p-1 text-slate-400 hover:text-rose-600"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <img src={prod.images[0]} alt={prod.name} className="w-20 h-20 object-cover rounded-xl mb-2 mx-auto" />
                        <div className="text-[10px] text-indigo-600 font-bold uppercase">{prod.brand}</div>
                        <div className="font-bold text-slate-900 text-xs line-clamp-2">{prod.name}</div>
                        <div className="mt-1 flex items-baseline gap-1.5 font-mono-num">
                          <span className="font-extrabold text-sm text-slate-900">₹{prod.sellingPrice.toLocaleString()}</span>
                          <span className="text-[10px] text-slate-400 line-through">₹{prod.mrp.toLocaleString()}</span>
                          <span className="text-[10px] text-emerald-600 font-bold">{prod.discountPercentage}% off</span>
                        </div>
                        <button
                          onClick={() => {
                            addToCart(prod);
                            setIsCompareOpen(false);
                          }}
                          className="mt-2 w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 shadow-xs"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {/* SKU */}
                <tr>
                  <td className="p-3 font-semibold text-slate-500 bg-slate-50/50">SKU Code</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="p-3 font-mono text-slate-700">{p.sku}</td>
                  ))}
                </tr>

                {/* Rating */}
                <tr>
                  <td className="p-3 font-semibold text-slate-500 bg-slate-50/50">Rating & Reviews</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="p-3">
                      <div className="flex items-center gap-1 font-bold text-slate-800">
                        <span>{p.rating}</span>
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-slate-400 font-normal">({p.ratingCount})</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Category Spec Summary */}
                <tr>
                  <td className="p-3 font-semibold text-slate-500 bg-slate-50/50">Key Specification</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="p-3 text-slate-800 font-medium">
                      {p.category === 'mobile' && p.mobileSpecs && `${p.mobileSpecs.processor} • ${p.mobileSpecs.screen.refreshRate} • ${p.mobileSpecs.battery.chargingSpeed}`}
                      {p.category === 'sports' && p.sportsSpecs && `${p.sportsSpecs.material} • ${p.sportsSpecs.gender} • ${p.sportsSpecs.fitType}`}
                      {p.category === 'toys' && p.toysSpecs && `${p.toysSpecs.ageRecommendation} • ${p.toysSpecs.material}`}
                      {p.category === 'cosmetics' && p.cosmeticsSpecs && `${p.cosmeticsSpecs.keyActives[0]?.name} • ${p.cosmeticsSpecs.shelfLifePAO}`}
                    </td>
                  ))}
                </tr>

                {/* Stock Status */}
                <tr>
                  <td className="p-3 font-semibold text-slate-500 bg-slate-50/50">Availability</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="p-3">
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        In Stock ({p.stockQuantity} units)
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Return Policy */}
                <tr>
                  <td className="p-3 font-semibold text-slate-500 bg-slate-50/50">Return Policy</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="p-3 text-slate-700">{p.trustSignals.returnPolicy}</td>
                  ))}
                </tr>

                {/* Brand Warranty */}
                <tr>
                  <td className="p-3 font-semibold text-slate-500 bg-slate-50/50">Warranty Terms</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="p-3 text-slate-700">{p.trustSignals.warranty}</td>
                  ))}
                </tr>

                {/* Seller */}
                <tr>
                  <td className="p-3 font-semibold text-slate-500 bg-slate-50/50">Seller</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="p-3 font-semibold text-indigo-700">{p.trustSignals.seller.name}</td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400">
            <Scale className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-semibold text-slate-700 text-sm">No products selected for comparison</p>
            <p className="text-xs text-slate-400 mt-1">Click the scale icon on any product card to compare up to 4 items.</p>
          </div>
        )}

      </div>
    </div>
  );
};
