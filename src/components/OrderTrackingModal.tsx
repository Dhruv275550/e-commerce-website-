import React, { useState } from 'react';
import { 
  X, Check, Truck, MapPin, Package, RefreshCw, 
  Phone, ShieldCheck, Download, AlertCircle, Clock, 
  Ban, AlertTriangle, ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderTrackingModal: React.FC = () => {
  const {
    isTrackingOpen,
    setIsTrackingOpen,
    trackedOrder,
    requestReturn,
    cancelOrder
  } = useShop();

  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnReason, setReturnReason] = useState('Size or Spec Mismatch');
  const [returnSuccess, setReturnSuccess] = useState(false);

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('Ordered by mistake');
  const [cancelFeedback, setCancelFeedback] = useState<string | null>(null);

  if (!isTrackingOpen || !trackedOrder) return null;

  const isOrderActive = !trackedOrder.isCancelled && trackedOrder.deliveryStatus !== 'Delivered' && trackedOrder.deliveryStatus !== 'Returned';

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestReturn(trackedOrder.id, returnReason);
    setReturnSuccess(true);
    setTimeout(() => {
      setReturnSuccess(false);
      setIsReturnModalOpen(false);
    }, 2000);
  };

  const handleCancelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = cancelOrder(trackedOrder.id, cancelReason);
    setCancelFeedback(res.message);
    setTimeout(() => {
      setCancelFeedback(null);
      setIsCancelModalOpen(false);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              trackedOrder.isCancelled 
                ? 'bg-rose-50 border border-rose-200 text-rose-600'
                : 'bg-indigo-50 border border-indigo-200 text-indigo-600'
            }`}>
              {trackedOrder.isCancelled ? <Ban className="w-5 h-5" /> : <Truck className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-lg text-slate-900">
                  Live Order Tracker
                </h3>
                <span className="font-mono text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                  {trackedOrder.id}
                </span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                  trackedOrder.isCancelled
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : trackedOrder.deliveryStatus === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : trackedOrder.deliveryStatus === 'Returned'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                }`}>
                  {trackedOrder.deliveryStatus}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {trackedOrder.isCancelled ? (
                  <span className="text-rose-600 font-semibold">Delivery Cancelled • 100% Refund Initiated</span>
                ) : (
                  <>Expected Delivery: <strong className="text-indigo-600">{trackedOrder.expectedDelivery}</strong></>
                )}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTrackingOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cancelled Banner Notification */}
        {trackedOrder.isCancelled && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs space-y-1.5 text-rose-900">
            <div className="font-bold flex items-center gap-1.5 text-rose-700">
              <Ban className="w-4 h-4" />
              <span>This order's campus delivery was cancelled</span>
            </div>
            <p className="text-rose-700 text-[11px]">
              Reason: <strong>{trackedOrder.cancellationReason || 'Requested by customer'}</strong>. Total amount of ₹{trackedOrder.totalAmount.toLocaleString()} has been queued for instant refund ({trackedOrder.paymentStatus}).
            </p>
          </div>
        )}

        {/* Real-time Visual Timeline */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-6">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-5 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>Fulfillment & Dispatch Milestones</span>
          </h4>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-200">
            {trackedOrder.trackingSteps.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Node Icon */}
                <div 
                  className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-slate-50 ${
                    step.completed 
                      ? (trackedOrder.isCancelled && idx >= trackedOrder.trackingSteps.length - 2 ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white')
                      : step.current 
                        ? 'bg-indigo-600 text-white animate-pulse' 
                        : 'bg-slate-300 text-white'
                  }`}
                >
                  {step.completed ? <Check className="w-3 h-3 stroke-[3]" /> : <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${step.current ? 'text-indigo-600' : 'text-slate-800'}`}>
                      {step.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{step.timestamp}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{step.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Rider & Dorm Desk Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
          <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100">
            <div className="font-bold text-indigo-950 mb-1">Assigned Campus Courier Rider</div>
            <div className="text-slate-700 font-medium">Amit Sharma (Rider ID: CM-BLR-89)</div>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">4.9 ★ Rating</span>
              <span>• On Electric EV Bike</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="font-bold text-slate-900 mb-1">Destination Address</div>
            <div className="text-slate-700 font-medium truncate">{trackedOrder.shippingAddress.campusDorm}</div>
            <div className="text-[11px] text-slate-500 truncate">{trackedOrder.shippingAddress.city}, {trackedOrder.shippingAddress.pincode}</div>
          </div>
        </div>

        {/* Ordered Items Summary */}
        <div className="border-t border-slate-200 pt-4 mb-6">
          <div className="font-bold text-slate-900 text-xs mb-3">Order Items ({trackedOrder.items.length})</div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {trackedOrder.items.map((it, i) => (
              <div key={i} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50">
                <div className="flex items-center gap-2 min-w-0">
                  <img src={it.product.images[0]} alt={it.product.name} className="w-8 h-8 rounded-lg object-cover" />
                  <div className="truncate">
                    <span className="font-semibold text-slate-800">{it.product.name}</span>
                    <span className="text-slate-400 ml-1">x{it.quantity}</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-900">
                  ₹{((it.selectedVariant?.price || it.product.sellingPrice) * it.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls: Cancel Delivery / Return / Download Invoice */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            {/* Cancel Order Button */}
            {isOrderActive && (
              <button
                onClick={() => setIsCancelModalOpen(true)}
                className="px-4 py-2 border border-rose-300 hover:bg-rose-50 text-rose-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Ban className="w-3.5 h-3.5" />
                <span>Cancel Delivery</span>
              </button>
            )}

            {/* Request Return / Replacement (For delivered orders) */}
            {trackedOrder.deliveryStatus === 'Delivered' && !trackedOrder.isReturned && (
              <button
                onClick={() => setIsReturnModalOpen(true)}
                className="px-4 py-2 border border-slate-300 hover:border-rose-400 hover:bg-rose-50 text-slate-700 hover:text-rose-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Request Return / Replacement</span>
              </button>
            )}

            {trackedOrder.isReturned && (
              <div className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 font-semibold">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Return Pickup Scheduled</span>
              </div>
            )}
          </div>

          <button
            onClick={() => alert(`Tax Invoice for ${trackedOrder.id} downloaded successfully (GSTIN Verified).`)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download GST Invoice</span>
          </button>
        </div>

        {/* Cancellation Flow Dialog */}
        {isCancelModalOpen && (
          <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2 text-rose-600">
                  <Ban className="w-5 h-5" />
                  <h4 className="font-heading font-bold text-base text-slate-900">Cancel Order Delivery</h4>
                </div>
                <button onClick={() => setIsCancelModalOpen(false)} className="p-1 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cancelFeedback ? (
                <div className="text-center py-6 text-emerald-600 font-bold text-xs space-y-2">
                  <Check className="w-10 h-10 mx-auto" />
                  <p>{cancelFeedback}</p>
                </div>
              ) : (
                <form onSubmit={handleCancelSubmit} className="space-y-4 text-xs">
                  <p className="text-slate-600 text-[11px]">
                    Are you sure you want to cancel the delivery of <strong>{trackedOrder.id}</strong>? If already dispatched, courier will be notified to halt route.
                  </p>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Reason for Delivery Cancellation *</label>
                    <select
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium outline-none focus:ring-2 focus:ring-rose-200"
                    >
                      <option value="Ordered by mistake">Ordered by mistake</option>
                      <option value="Found cheaper alternative on campus">Found cheaper alternative on campus</option>
                      <option value="Delivery time is too long">Delivery time is too long</option>
                      <option value="Incorrect Hostel Dorm / Room entered">Incorrect Hostel Dorm / Room entered</option>
                      <option value="Need to change product variant / color">Need to change product variant / color</option>
                      <option value="Other personal reasons">Other personal reasons</option>
                    </select>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Instant Refund Guarantee:</strong> Paid amount of ₹{trackedOrder.totalAmount.toLocaleString()} will be refunded to your {trackedOrder.paymentMethod} within 2-5 minutes.
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCancelModalOpen(false)}
                      className="px-4 py-2 border border-slate-300 rounded-xl font-semibold"
                    >
                      Keep Delivery
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-md cursor-pointer"
                    >
                      Confirm Cancel Order
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Return Flow Modal Sub-Dialog */}
        {isReturnModalOpen && (
          <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <h4 className="font-heading font-bold text-base text-slate-900">Easy Campus Return</h4>
                <button onClick={() => setIsReturnModalOpen(false)} className="p-1 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {returnSuccess ? (
                <div className="text-center py-6 text-emerald-600 font-bold text-xs space-y-2">
                  <Check className="w-10 h-10 mx-auto" />
                  <p>Return pickup scheduled for tomorrow at your hostel desk. Full refund will be credited instantly to original source.</p>
                </div>
              ) : (
                <form onSubmit={handleReturnSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Reason for Return / Exchange</label>
                    <select
                      value={returnReason}
                      onChange={(e) => setReturnReason(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
                    >
                      <option value="Size or Spec Mismatch">Size or Spec Mismatch (Too small / large)</option>
                      <option value="Defective / Damaged Piece">Defective / Damaged Piece</option>
                      <option value="Item not as described">Item not as described in catalog</option>
                      <option value="Ordered by mistake">Ordered by mistake</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Pickup Location</label>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                      {trackedOrder.shippingAddress.campusDorm}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsReturnModalOpen(false)}
                      className="px-4 py-2 border border-slate-300 rounded-xl font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-md"
                    >
                      Confirm Free Return Pickup
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
