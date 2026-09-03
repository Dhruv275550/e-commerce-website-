import React, { useState } from 'react';
import { 
  User, Package, Heart, Award, MapPin, 
  ShieldCheck, Sparkles, Truck, Check, Trash2, 
  ArrowRight, Ban, UserPlus, Users, AlertTriangle, 
  RotateCcw, RefreshCw, Home, ArrowLeft, ChevronRight 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const UserDashboard: React.FC = () => {
  const {
    userProfile,
    userAccounts,
    updateUserProfile,
    deleteUser,
    orders,
    wishlist,
    products,
    removeFromWishlist,
    addToCart,
    setTrackedOrder,
    setIsTrackingOpen,
    setSelectedProduct,
    setSelectedCategory,
    setActiveView,
    cancelOrder,
    setIsAuthModalOpen,
    setAuthModalMode
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'wishlist' | 'rewards'>('orders');
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('Ordered by mistake');
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleConfirmCancelOrder = (orderId: string) => {
    const res = cancelOrder(orderId, cancelReason);
    setCancellingOrderId(null);
    setActionMessage(res.message);
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleConfirmDeleteAccount = () => {
    const res = deleteUser(userProfile.id);
    setIsDeletingAccount(false);
    setActionMessage(res.message);
    setTimeout(() => setActionMessage(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Breadcrumbs & Back to Home Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 mb-6 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            id="dashboard-back-to-home-btn"
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
            <span>Back to Home Store</span>
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
            <span className="font-bold text-slate-800">Student Account & Orders</span>
          </div>
        </div>

        <div className="text-xs text-indigo-600 font-semibold flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Verified Student Portal</span>
        </div>
      </div>

      {/* Action Notification Alert Banner */}
      {actionMessage && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-xs animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Student Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-md border border-indigo-900/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
              {userProfile.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                  {userProfile.name}
                </h1>
                {userProfile.isStudentVerified && (
                  <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified Student ID</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {userProfile.college} • Roll No: <span className="font-mono">{userProfile.studentId || userProfile.rollNumber}</span>
              </p>
            </div>
          </div>

          {/* Account Actions & Campus Coins */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white/10 backdrop-blur-xs border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <div>
                <div className="text-[10px] text-slate-300 uppercase font-semibold">Campus Coins</div>
                <div className="font-bold text-amber-300 font-mono text-base">{userProfile.loyaltyCoins} Pts</div>
              </div>
            </div>

            <button
              onClick={() => {
                setAuthModalMode('register');
                setIsAuthModalOpen(true);
              }}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ New Account</span>
            </button>

            <button
              onClick={() => {
                setAuthModalMode('manage');
                setIsAuthModalOpen(true);
              }}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Accounts ({userAccounts.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Tabs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-1">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-colors ${
              activeTab === 'orders' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4" />
              <span>My Orders & Cancellation</span>
            </div>
            <span className="font-mono text-[11px]">{orders.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-colors ${
              activeTab === 'wishlist' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Heart className="w-4 h-4" />
              <span>Saved Wishlist</span>
            </div>
            <span className="font-mono text-[11px]">{wishlist.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-colors ${
              activeTab === 'rewards' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4" />
              <span>Fresher Student Perks</span>
            </div>
            <span className="font-mono text-[11px]">{userProfile.loyaltyCoins}</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-colors ${
              activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4" />
              <span>Student Profile & Account</span>
            </div>
          </button>
        </div>

        {/* Tab Content (3 cols) */}
        <div className="lg:col-span-3">
          
          {/* Orders Tab with Live Cancel Action */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-extrabold text-lg text-slate-900">
                  Order History & Deliveries ({orders.length})
                </h2>
                <span className="text-xs text-slate-500">Live Campus Dispatch tracking & instant cancellation</span>
              </div>

              {/* In-tab Order Cancellation Sub-dialog */}
              {cancellingOrderId && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-3xl text-xs space-y-3 animate-in fade-in">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-rose-900">Cancel Delivery for {cancellingOrderId}?</h4>
                      <p className="text-rose-700 text-[11px] mt-0.5">
                        Please confirm your reason. Once cancelled, fulfillment is immediately stopped and 100% refund is initiated.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Reason for cancellation:</label>
                    <select
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      className="w-full p-2 bg-white border border-rose-200 rounded-xl font-medium"
                    >
                      <option value="Ordered by mistake">Ordered by mistake</option>
                      <option value="Found cheaper alternative on campus">Found cheaper alternative on campus</option>
                      <option value="Delivery time is too long">Delivery time is too long</option>
                      <option value="Incorrect Hostel Room specified">Incorrect Hostel Room specified</option>
                      <option value="Need to change variant or color">Need to change variant or color</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => setCancellingOrderId(null)}
                      className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold"
                    >
                      Keep Order
                    </button>
                    <button
                      onClick={() => handleConfirmCancelOrder(cancellingOrderId)}
                      className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-sm"
                    >
                      <Ban className="w-3.5 h-3.5" />
                      <span>Confirm Cancel Delivery</span>
                    </button>
                  </div>
                </div>
              )}

              {orders.length > 0 ? (
                orders.map(order => {
                  const isEligibleToCancel = !order.isCancelled && order.deliveryStatus !== 'Delivered' && order.deliveryStatus !== 'Returned';
                  
                  return (
                    <div key={order.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-900 text-sm">{order.id}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                              order.isCancelled
                                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                : order.deliveryStatus === 'Delivered'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : order.deliveryStatus === 'Returned'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-indigo-100 text-indigo-800'
                            }`}>
                              {order.deliveryStatus}
                            </span>
                          </div>
                          <span className="text-slate-400 text-[11px]">Placed on {order.date || order.createdAt}</span>
                        </div>

                        <div className="text-right font-mono-num">
                          <div className="font-extrabold text-sm text-slate-900">₹{order.totalAmount.toLocaleString()}</div>
                          <div className="text-[10px] text-slate-500">{order.paymentMethod} • {order.paymentStatus}</div>
                        </div>
                      </div>

                      {/* Cancelled Banner */}
                      {order.isCancelled && (
                        <div className="p-3 bg-rose-50 rounded-2xl border border-rose-100 text-[11px] text-rose-800 flex items-center justify-between">
                          <span>Delivery Cancelled ({order.cancellationReason || 'User Request'}). Refund initiated.</span>
                          <span className="font-bold text-rose-900">{order.cancellationRefundStatus}</span>
                        </div>
                      )}

                      {/* Order items */}
                      <div className="space-y-2">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded-xl">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img src={it.product.images[0]} alt={it.product.name} className="w-10 h-10 rounded-lg object-cover bg-white" />
                              <div className="truncate">
                                <span className="font-semibold text-slate-900 block truncate">{it.product.name}</span>
                                <span className="text-slate-400 text-[10px]">
                                  {it.selectedVariant ? `${it.selectedVariant.name} • ` : ''}Qty: {it.quantity}
                                </span>
                              </div>
                            </div>
                            <span className="font-mono font-bold text-slate-800">
                              ₹{((it.selectedVariant?.price || it.product.sellingPrice) * it.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Delivery & Tracking CTA */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Deliver to: {order.shippingAddress.campusDorm}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {isEligibleToCancel && (
                            <button
                              onClick={() => setCancellingOrderId(order.id)}
                              className="px-3 py-2 border border-rose-200 hover:bg-rose-50 text-rose-700 rounded-xl font-bold flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <Ban className="w-3.5 h-3.5" />
                              <span>Cancel Order</span>
                            </button>
                          )}

                          <button
                            onClick={() => {
                              setTrackedOrder(order);
                              setIsTrackingOpen(true);
                            }}
                            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                          >
                            <Truck className="w-3.5 h-3.5 text-amber-400" />
                            <span>Track Live Route</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400">
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p className="font-semibold text-slate-700 text-sm">No orders placed yet</p>
                </div>
              )}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <h2 className="font-heading font-extrabold text-lg text-slate-900">
                My Saved Wishlist ({wishlistProducts.length})
              </h2>

              {wishlistProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistProducts.map(prod => (
                    <div key={prod.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex gap-3 text-xs">
                      <img src={prod.images[0]} alt={prod.name} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] text-indigo-600 font-bold uppercase">{prod.brand}</div>
                          <h4 
                            onClick={() => {
                              setSelectedProduct(prod);
                              setActiveView('product_detail');
                            }}
                            className="font-bold text-slate-900 truncate hover:text-indigo-600 cursor-pointer"
                          >
                            {prod.name}
                          </h4>
                          <div className="font-mono-num font-bold text-slate-900 mt-1">₹{prod.sellingPrice.toLocaleString()}</div>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => addToCart(prod)}
                            className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-[11px] cursor-pointer"
                          >
                            Move to Cart
                          </button>
                          <button
                            onClick={() => removeFromWishlist(prod.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400">
                  <Heart className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p className="font-semibold text-slate-700 text-sm">Your wishlist is empty</p>
                  <p className="text-xs text-slate-400 mt-1">Click the heart icon on items you want to buy later.</p>
                </div>
              )}
            </div>
          )}

          {/* Rewards Tab */}
          {activeTab === 'rewards' && (
            <div className="space-y-4">
              <h2 className="font-heading font-extrabold text-lg text-slate-900">
                Fresher Student Rewards & Campus Coins
              </h2>

              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-3xl p-6 shadow-md flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold opacity-90">Available Campus Coins</div>
                  <div className="text-3xl font-extrabold font-mono mt-1">{userProfile.loyaltyCoins} Coins</div>
                  <p className="text-xs mt-2 opacity-95">Worth ₹{Math.round(userProfile.loyaltyCoins * 0.5)} off on any gadget or study gear.</p>
                </div>
                <Award className="w-16 h-16 opacity-30 stroke-1" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900">Student Referral Bonus</div>
                  <p className="text-slate-500">Earn 100 Campus Coins whenever a dorm roommate places their first order with your code.</p>
                  <span className="font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold inline-block mt-1">
                    REFER-{userProfile.studentId || userProfile.rollNumber}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900">Semester High Scorer Discount</div>
                  <p className="text-slate-500">Upload your grade card to unlock an extra 15% flat off on high-performance laptops & tablets.</p>
                  <span className="text-emerald-700 font-bold text-[11px] block mt-1">Unlocked for Fall Semester</span>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab & Account Removal Options */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading font-extrabold text-lg text-slate-900">
                    Student Profile Settings
                  </h2>
                  <span className="text-slate-400 font-mono text-[11px]">User ID: {userProfile.id}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={userProfile.name}
                      onChange={(e) => updateUserProfile({ name: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Campus Email Address</label>
                    <input
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => updateUserProfile({ email: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">University / Institute</label>
                    <input
                      type="text"
                      value={userProfile.college}
                      onChange={(e) => updateUserProfile({ college: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Student Roll / Enrollment No</label>
                    <input
                      type="text"
                      value={userProfile.studentId || userProfile.rollNumber}
                      onChange={(e) => updateUserProfile({ studentId: e.target.value, rollNumber: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={userProfile.phone || ''}
                      onChange={(e) => updateUserProfile({ phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Department / Branch</label>
                    <input
                      type="text"
                      value={userProfile.department || ''}
                      onChange={(e) => updateUserProfile({ department: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <button
                    onClick={() => {
                      setActionMessage('Profile updated successfully.');
                      setTimeout(() => setActionMessage(null), 2500);
                    }}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 cursor-pointer shadow-xs"
                  >
                    Save Profile Changes
                  </button>

                  <button
                    onClick={() => {
                      setAuthModalMode('register');
                      setIsAuthModalOpen(true);
                    }}
                    className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Create Another Account</span>
                  </button>
                </div>
              </div>

              {/* Danger Zone: Account Deletion / Removal */}
              <div className="bg-rose-50/50 rounded-3xl p-6 border border-rose-200 text-xs space-y-4">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Account Management & Removal</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  You can permanently remove or delete your student profile from CampusMart. This will erase saved hostel addresses, coin balance, and active session history on this device.
                </p>

                {isDeletingAccount ? (
                  <div className="p-4 bg-white rounded-2xl border border-rose-300 space-y-3 animate-in fade-in">
                    <p className="font-bold text-rose-800">
                      Are you completely sure you want to permanently delete the account for "{userProfile.name}"?
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsDeletingAccount(false)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmDeleteAccount}
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-sm"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Yes, Permanently Delete My Account</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsDeletingAccount(true)}
                    className="px-4 py-2 bg-white border border-rose-300 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove / Delete Student Account</span>
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
