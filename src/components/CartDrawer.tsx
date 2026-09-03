import React, { useState } from 'react';
import { 
  ShoppingBag, X, Trash2, Plus, Minus, ArrowRight, 
  Sparkles, ShieldCheck, Tag, Check, Truck 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartMRP,
    appliedCoupon,
    studentDiscountApplied,
    applyCoupon,
    removeCoupon,
    useLoyaltyCoins,
    setUseLoyaltyCoins,
    userProfile,
    setIsCheckoutOpen,
    setSelectedProduct,
    setActiveView
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const totalDiscount = cartMRP - cartTotal;
  const studentDiscountAmount = studentDiscountApplied ? Math.round(cartTotal * 0.1) : 0;
  const loyaltyCoinsAmount = useLoyaltyCoins ? Math.min(Math.round(userProfile.loyaltyCoins * 0.5), 250) : 0;
  
  const finalPayable = Math.max(0, cartTotal - studentDiscountAmount - loyaltyCoinsAmount);

  const freeDeliveryThreshold = 499;
  const progressToFree = Math.min(100, (cartTotal / freeDeliveryThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponMsg({ text: res.message, isError: !res.success });
    if (res.success) setCouponInput('');
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-sm text-slate-900">Your Campus Cart</h2>
                <p className="text-[11px] text-slate-500">{cart.length} item(s) selected</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-indigo-50/60 px-5 py-2.5 border-b border-indigo-100 text-xs">
            <div className="flex items-center justify-between text-indigo-950 font-semibold mb-1">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-indigo-600" />
                {cartTotal >= freeDeliveryThreshold 
                  ? '🎉 You unlocked Free Campus Dorm Delivery!' 
                  : `Add ₹${(freeDeliveryThreshold - cartTotal).toLocaleString()} more for Free Delivery`}
              </span>
            </div>
            <div className="w-full h-1.5 bg-indigo-200/70 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${progressToFree}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length > 0 ? (
              cart.map((item, idx) => {
                const price = item.selectedVariant?.price || item.product.sellingPrice;
                const mrp = item.selectedVariant?.mrp || item.product.mrp;
                const image = item.selectedVariant?.image || item.product.images[0];

                return (
                  <div 
                    key={idx}
                    className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex gap-3 text-xs"
                  >
                    <img 
                      src={image} 
                      alt={item.product.name}
                      className="w-18 h-18 object-cover rounded-xl bg-white border border-slate-200 shrink-0" 
                    />
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide truncate">
                          {item.product.brand}
                        </div>
                        <h4 
                          onClick={() => {
                            setSelectedProduct(item.product);
                            setActiveView('product_detail');
                            setIsCartOpen(false);
                          }}
                          className="font-bold text-slate-900 truncate hover:text-indigo-600 cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        {item.selectedVariant && (
                          <div className="text-[10px] text-slate-500 truncate mt-0.5">
                            Variant: {item.selectedVariant.name}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-baseline gap-1.5 font-mono-num">
                          <span className="font-bold text-slate-900 text-sm">
                            {item.product.currency}{price.toLocaleString()}
                          </span>
                          <span className="text-slate-400 line-through text-[11px]">
                            {item.product.currency}{mrp.toLocaleString()}
                          </span>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedVariant?.id, item.quantity - 1)}
                            className="p-1 text-slate-600 hover:bg-slate-100 rounded-l"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-mono font-bold text-slate-900 text-xs">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedVariant?.id, item.quantity + 1)}
                            className="p-1 text-slate-600 hover:bg-slate-100 rounded-r"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Delete */}
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-16 text-center text-slate-400">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-40 text-slate-400" />
                <p className="font-semibold text-slate-700 text-sm">Your cart is empty</p>
                <p className="text-xs text-slate-400 mt-1">Add gadgets, sports shoes, or dorm essentials to begin.</p>
              </div>
            )}
          </div>

          {/* Cart Footer & Calculations */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3.5 text-xs">
              
              {/* Coupon Code Input */}
              <div className="space-y-1.5">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 font-semibold">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Coupon <strong>{appliedCoupon}</strong> Applied (-10%)</span>
                    </div>
                    <button 
                      onClick={removeCoupon}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Enter code (e.g. FRESHER10)"
                      className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl uppercase font-mono text-xs outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponMsg && (
                  <div className={`text-[11px] ${couponMsg.isError ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {couponMsg.text}
                  </div>
                )}
              </div>

              {/* Loyalty Coins Checkbox */}
              {userProfile.loyaltyCoins > 0 && (
                <label className="flex items-center justify-between p-2.5 bg-amber-50/80 rounded-xl border border-amber-200 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span className="font-medium text-amber-950">
                      Redeem <strong>{userProfile.loyaltyCoins} Campus Coins</strong> (Save ₹175)
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={useLoyaltyCoins}
                    onChange={(e) => setUseLoyaltyCoins(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                </label>
              )}

              {/* Price Calculation Matrix */}
              <div className="space-y-1.5 text-slate-600 pt-1 font-mono-num">
                <div className="flex justify-between">
                  <span>Total MRP:</span>
                  <span className="line-through text-slate-400">₹{cartMRP.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Catalog Discount:</span>
                  <span>- ₹{totalDiscount.toLocaleString()}</span>
                </div>
                {studentDiscountApplied && (
                  <div className="flex justify-between text-indigo-600 font-semibold">
                    <span>Fresher Student Perk:</span>
                    <span>- ₹{studentDiscountAmount.toLocaleString()}</span>
                  </div>
                )}
                {useLoyaltyCoins && (
                  <div className="flex justify-between text-amber-700 font-semibold">
                    <span>Campus Coins Redeemed:</span>
                    <span>- ₹{loyaltyCoinsAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Dorm Shipping:</span>
                  <span className="text-emerald-700 font-semibold">FREE</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                  <span>Net Payable Amount:</span>
                  <span className="text-base text-indigo-700">₹{finalPayable.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                id="cart-checkout-proceed-btn"
                onClick={handleProceedCheckout}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Campus Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit Encrypted Secure Student Checkout</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
