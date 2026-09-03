import React, { useState } from 'react';
import { 
  X, Check, ShieldCheck, CreditCard, QrCode, 
  Wallet, Banknote, Building2, Truck, Sparkles, 
  ArrowLeft, ArrowRight, Download, Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import { Order } from '../types/product';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    cartMRP,
    studentDiscountApplied,
    useLoyaltyCoins,
    userProfile,
    placeOrder,
    setTrackedOrder,
    setIsTrackingOpen
  } = useShop();

  // Multi-step: 1 = Address, 2 = Payment, 3 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Address State
  const [address, setAddress] = useState({
    fullName: userProfile.name || 'Rahul Tomar',
    campusDorm: 'Aryabhatta Boys Hostel - Block C, Room 314',
    street: 'University Central Avenue, Tech Zone',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560100',
    phone: '+91 98765 43210'
  });

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD' | 'BNPL' | 'NetBanking'>('UPI');
  const [upiId, setUpiId] = useState('rahultomar@okhdfcbank');
  const [cardData, setCardData] = useState({
    number: '•••• •••• •••• 4242',
    name: 'RAHUL TOMAR',
    expiry: '08/29',
    cvv: '•••'
  });

  if (!isCheckoutOpen) return null;

  const studentDiscountAmount = studentDiscountApplied ? Math.round(cartTotal * 0.1) : 0;
  const loyaltyCoinsAmount = useLoyaltyCoins ? Math.min(Math.round(userProfile.loyaltyCoins * 0.5), 250) : 0;
  const finalPayable = Math.max(0, cartTotal - studentDiscountAmount - loyaltyCoinsAmount);

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newOrder = placeOrder({
        items: [...cart],
        totalAmount: finalPayable,
        discountAmount: cartMRP - cartTotal,
        studentSavings: studentDiscountAmount + loyaltyCoinsAmount,
        shippingAddress: { ...address },
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'Pending COD' : 'Paid',
        expectedDelivery: 'Tomorrow, by 2:00 PM'
      });

      setConfirmedOrder(newOrder);
      setIsProcessing(false);
      setStep(3);

      // Trigger Celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }, 1200);
  };

  const handleTrackLive = () => {
    if (confirmedOrder) {
      setTrackedOrder(confirmedOrder);
      setIsCheckoutOpen(false);
      setIsTrackingOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 relative my-8">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div>
            <h2 className="font-heading font-extrabold text-xl text-slate-900">
              {step === 1 && '1. Campus Delivery Address'}
              {step === 2 && '2. Select Payment Method'}
              {step === 3 && '🎉 Order Placed Successfully!'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {step === 1 && 'Direct to hostel room or campus reception'}
              {step === 2 && 'Multiple student payment modes (UPI, Card, BNPL, COD)'}
              {step === 3 && `Order ID: ${confirmedOrder?.id}`}
            </p>
          </div>

          {step !== 3 && (
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step 1: Address Details */}
        {step === 1 && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Student Full Name</label>
                <input
                  type="text"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Phone Number</label>
                <input
                  type="text"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Campus Hostel / Dorm / Room Details</label>
              <input
                type="text"
                value={address.campusDorm}
                onChange={(e) => setAddress({ ...address, campusDorm: e.target.value })}
                placeholder="e.g. Aryabhatta Boys Hostel - Block C, Room 314"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">College Campus Street Address</label>
              <input
                type="text"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-500 font-medium"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">State</label>
                <input
                  type="text"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-500 font-medium"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Pincode</label>
                <input
                  type="text"
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-500 font-mono font-bold"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Payment Methods */}
        {step === 2 && (
          <div className="space-y-5 text-xs">
            
            {/* Payment Method Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              
              {/* UPI */}
              <button
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'UPI' 
                    ? 'bg-indigo-50 border-indigo-600 text-indigo-700 font-bold ring-2 ring-indigo-200' 
                    : 'bg-slate-50 border-slate-200 hover:bg-white text-slate-700'
                }`}
              >
                <QrCode className="w-5 h-5" />
                <span>UPI / QR</span>
              </button>

              {/* Cards */}
              <button
                onClick={() => setPaymentMethod('Card')}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'Card' 
                    ? 'bg-indigo-50 border-indigo-600 text-indigo-700 font-bold ring-2 ring-indigo-200' 
                    : 'bg-slate-50 border-slate-200 hover:bg-white text-slate-700'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Cards</span>
              </button>

              {/* BNPL / Student EMI */}
              <button
                onClick={() => setPaymentMethod('BNPL')}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'BNPL' 
                    ? 'bg-indigo-50 border-indigo-600 text-indigo-700 font-bold ring-2 ring-indigo-200' 
                    : 'bg-slate-50 border-slate-200 hover:bg-white text-slate-700'
                }`}
              >
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Student EMI</span>
              </button>

              {/* Net Banking */}
              <button
                onClick={() => setPaymentMethod('NetBanking')}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'NetBanking' 
                    ? 'bg-indigo-50 border-indigo-600 text-indigo-700 font-bold ring-2 ring-indigo-200' 
                    : 'bg-slate-50 border-slate-200 hover:bg-white text-slate-700'
                }`}
              >
                <Building2 className="w-5 h-5" />
                <span>NetBanking</span>
              </button>

              {/* COD */}
              <button
                onClick={() => setPaymentMethod('COD')}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'COD' 
                    ? 'bg-indigo-50 border-indigo-600 text-indigo-700 font-bold ring-2 ring-indigo-200' 
                    : 'bg-slate-50 border-slate-200 hover:bg-white text-slate-700'
                }`}
              >
                <Banknote className="w-5 h-5" />
                <span>Cash on Delivery</span>
              </button>

            </div>

            {/* Payment Method Details Panel */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              {paymentMethod === 'UPI' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Instant UPI (GPay, PhonePe, Paytm, BHIM)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      Zero Processing Fee
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okhdfcbank"
                      className="flex-1 p-2.5 bg-white border border-slate-300 rounded-xl outline-none font-mono"
                    />
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold">
                      Verify VPA
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    A payment request will be sent to your UPI app upon completing the order.
                  </div>
                </div>
              )}

              {paymentMethod === 'Card' && (
                <div className="space-y-3">
                  <div className="font-bold text-slate-900">Debit / Credit Card</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block text-slate-600 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1">CVV</label>
                      <input
                        type="password"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'BNPL' && (
                <div className="space-y-2">
                  <div className="font-bold text-slate-900">Student Buy Now Pay Later (3 No-Cost EMIs)</div>
                  <div className="bg-white p-3 rounded-xl border border-indigo-100 space-y-1 text-slate-700">
                    <div className="flex justify-between font-bold">
                      <span>3 Monthly Payments of:</span>
                      <span className="text-indigo-600 font-mono">₹{Math.round(finalPayable / 3).toLocaleString()}/month</span>
                    </div>
                    <p className="text-[11px] text-slate-500">0% Interest • No processing fee for verified college students.</p>
                  </div>
                </div>
              )}

              {paymentMethod === 'COD' && (
                <div className="space-y-1">
                  <div className="font-bold text-slate-900">Pay on Campus Delivery (Cash / UPI at Doorstep)</div>
                  <p className="text-slate-600">
                    You can pay the delivery rider directly via Cash or QR code when the parcel arrives at your hostel desk.
                  </p>
                </div>
              )}

              {paymentMethod === 'NetBanking' && (
                <div className="space-y-2">
                  <div className="font-bold text-slate-900">Select Net Banking</div>
                  <div className="flex gap-2">
                    {['HDFC', 'SBI', 'ICICI', 'Axis'].map(b => (
                      <button key={b} className="flex-1 py-2 bg-white border border-slate-300 rounded-xl font-semibold hover:border-indigo-500">
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Total Payable Summary Bar */}
            <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200 flex items-center justify-between font-semibold">
              <span className="text-indigo-950">Total Amount to Pay:</span>
              <span className="text-lg font-bold text-indigo-700 font-mono-num">
                ₹{finalPayable.toLocaleString()}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Address</span>
              </button>

              <button
                id="complete-order-btn"
                disabled={isProcessing}
                onClick={handleCompleteOrder}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Processing Campus Order...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Pay ₹{finalPayable.toLocaleString()} & Place Order</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

        {/* Step 3: Order Confirmation & Invoice Receipt */}
        {step === 3 && confirmedOrder && (
          <div className="space-y-5 text-xs text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <h3 className="font-heading font-extrabold text-2xl text-slate-900">
                Thank You, {confirmedOrder.shippingAddress.fullName.split(' ')[0]}!
              </h3>
              <p className="text-slate-600 mt-1">
                Your order <strong className="font-mono">{confirmedOrder.id}</strong> is confirmed and scheduled for express dispatch.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 font-mono-num">
              <div className="flex justify-between pb-2 border-b border-slate-200 text-slate-500 text-[11px]">
                <span>Delivery To:</span>
                <span className="font-semibold text-slate-900 text-right">{confirmedOrder.shippingAddress.campusDorm}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Items Count:</span>
                <span className="font-bold">{confirmedOrder.items.length} item(s)</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Payment Mode:</span>
                <span className="font-bold text-indigo-600">{confirmedOrder.paymentMethod} ({confirmedOrder.paymentStatus})</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Student Savings:</span>
                <span className="font-bold text-emerald-600">Saved ₹{confirmedOrder.studentSavings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Paid:</span>
                <span className="text-indigo-700">₹{confirmedOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Actions: Track Order & Return to Store */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleTrackLive}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Truck className="w-4 h-4 text-amber-400" />
                <span>Track Live Order & Drone/Rider Route</span>
              </button>
              
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="px-5 py-3 border border-slate-300 hover:bg-slate-100 rounded-xl font-bold text-slate-700 cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
