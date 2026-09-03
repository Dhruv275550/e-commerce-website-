import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, CartItem, Order, CategoryType, UserProfile, UserAddress } from '../types/product';
import { MOCK_PRODUCTS, INITIAL_ORDERS } from '../data/mockProducts';

const DEFAULT_ACCOUNTS: UserProfile[] = [
  {
    id: 'usr-rahul-1',
    name: 'Rahul Tomar',
    email: 'tomarrahu96@gmail.com',
    phone: '+91 98765 43210',
    studentId: 'UNI-2026-ENG-4912',
    college: 'Indian Institute of Information Technology & Management',
    department: 'Computer Science & Engineering',
    year: '3rd Year (Batch 2023-2027)',
    loyaltyCoins: 350,
    isStudentVerified: true,
    joinedDate: 'August 2025',
    savedAddresses: [
      {
        id: 'addr-1',
        label: 'Campus Hostel (Primary)',
        fullName: 'Rahul Tomar',
        campusDorm: 'Aryabhatta Boys Hostel, Block C - Room 314',
        street: 'University Central Avenue, Tech Zone',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560100',
        phone: '+91 98765 43210',
        isDefault: true
      },
      {
        id: 'addr-2',
        label: 'Home Address',
        fullName: 'Rahul Tomar',
        campusDorm: 'House 42-B, Green Meadows',
        street: 'Main Ring Road',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302017',
        phone: '+91 98765 43210',
        isDefault: false
      }
    ]
  },
  {
    id: 'usr-sneha-2',
    name: 'Sneha Roy',
    email: 'sneha.roy@campus.edu.in',
    phone: '+91 98451 23456',
    studentId: 'UNI-2026-DES-8812',
    college: 'National Institute of Design & Tech',
    department: 'Industrial & UX Product Design',
    year: '2nd Year',
    loyaltyCoins: 120,
    isStudentVerified: true,
    joinedDate: 'January 2026',
    savedAddresses: [
      {
        id: 'addr-3',
        label: 'Gargi Girls Hostel',
        fullName: 'Sneha Roy',
        campusDorm: 'Gargi Girls Hostel, 2nd Floor, Room 204',
        street: 'Design Campus Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560100',
        phone: '+91 98451 23456',
        isDefault: true
      }
    ]
  }
];

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'discount' | 'stock';
}

interface PincodeStatus {
  pincode: string;
  city: string;
  estimatedDays: number;
  deliveryDateStr: string;
  codAvailable: boolean;
  isFreeDelivery: boolean;
  fastDeliveryCampus: boolean;
}

interface ShopContextType {
  products: Product[];
  activeView: 'home' | 'category' | 'product_detail' | 'dashboard' | 'admin' | 'ar_tryon';
  setActiveView: (view: 'home' | 'category' | 'product_detail' | 'dashboard' | 'admin' | 'ar_tryon') => void;
  selectedCategory: CategoryType | 'all';
  setSelectedCategory: (cat: CategoryType | 'all') => void;
  selectedProduct: Product | null;
  setSelectedProduct: (prod: Product | null) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartMRP: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Student Discount & Coupon
  appliedCoupon: string | null;
  studentDiscountApplied: boolean;
  applyCoupon: (code: string) => { success: boolean; message: string; discount: number };
  removeCoupon: () => void;
  useLoyaltyCoins: boolean;
  setUseLoyaltyCoins: (use: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Compare
  compareList: string[];
  toggleCompare: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  isCompared: (productId: string) => boolean;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;

  // Recently Viewed
  recentlyViewed: string[];
  addRecentlyViewed: (productId: string) => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Orders & Tracking
  orders: Order[];
  placeOrder: (orderDetails: Omit<Order, 'id' | 'date' | 'deliveryStatus' | 'trackingSteps' | 'returnEligibleUntil'>) => Order;
  requestReturn: (orderId: string, reason: string) => boolean;
  cancelOrder: (orderId: string, reason: string) => { success: boolean; message: string };
  trackedOrder: Order | null;
  setTrackedOrder: (order: Order | null) => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;

  // Pincode Verification
  pincode: string;
  pincodeStatus: PincodeStatus | null;
  checkPincode: (pin: string) => PincodeStatus | null;

  // User Accounts & Lifecycle
  userProfile: UserProfile;
  userAccounts: UserProfile[];
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  registerUser: (newUserData: { name: string; email: string; studentId: string; college: string; phone?: string; campusDorm?: string; pincode?: string }) => UserProfile;
  switchUser: (userId: string) => void;
  deleteUser: (userId: string) => { success: boolean; message: string };
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register' | 'manage';
  setAuthModalMode: (mode: 'login' | 'register' | 'manage') => void;

  // AR Try-On
  activeARProduct: Product | null;
  setActiveARProduct: (prod: Product | null) => void;
  isAROpen: boolean;
  setIsAROpen: (open: boolean) => void;

  // SEO Inspector & Support Chat
  isSEOOpen: boolean;
  setIsSEOOpen: (open: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Notifications
  notifications: NotificationItem[];
  markAllNotificationsRead: () => void;

  // Admin Controls
  updateProductStock: (productId: string, newStock: number) => void;
  updateProductPrice: (productId: string, newPrice: number) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('campusmart_products_v2');
    return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
  });

  const [activeView, setActiveView] = useState<'home' | 'category' | 'product_detail' | 'dashboard' | 'admin' | 'ar_tryon'>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // User Accounts
  const [userAccounts, setUserAccounts] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('campusmart_accounts');
    return saved ? JSON.parse(saved) : DEFAULT_ACCOUNTS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    const saved = localStorage.getItem('campusmart_current_uid');
    return saved || 'usr-rahul-1';
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'manage'>('register');

  const userProfile: UserProfile = userAccounts.find(u => u.id === currentUserId) || userAccounts[0] || DEFAULT_ACCOUNTS[0];

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('campusmart_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('FRESHER10');
  const [studentDiscountApplied, setStudentDiscountApplied] = useState<boolean>(true);
  const [useLoyaltyCoins, setUseLoyaltyCoins] = useState<boolean>(false);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('campusmart_wishlist');
    return saved ? JSON.parse(saved) : ['mob-apex-pro', 'cos-serum-hydra'];
  });

  // Compare
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Recently Viewed
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(['mob-apex-pro', 'spo-shoes-aero']);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('campusmart_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Pincode
  const [pincode, setPincode] = useState('560100');
  const [pincodeStatus, setPincodeStatus] = useState<PincodeStatus | null>({
    pincode: '560100',
    city: 'Bengaluru (Campus Express Hub)',
    estimatedDays: 1,
    deliveryDateStr: 'Tomorrow, by 1:00 PM',
    codAvailable: true,
    isFreeDelivery: true,
    fastDeliveryCampus: true
  });

  // AR Try-on & modals
  const [activeARProduct, setActiveARProduct] = useState<Product | null>(null);
  const [isAROpen, setIsAROpen] = useState(false);
  const [isSEOOpen, setIsSEOOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Order ORD-2026-8891 Out for Delivery!',
      message: 'Your Apex Pro 5G is with rider Amit S. Expected by 2:30 PM today at Hostel Block C.',
      time: '15 mins ago',
      read: false,
      type: 'order'
    },
    {
      id: 'notif-2',
      title: 'Fresher Student Discount Active: FRESHER10',
      message: 'Enjoy an additional 10% instant off on all electronics, sport shoes, and cosmetics!',
      time: '2 hours ago',
      read: false,
      type: 'discount'
    },
    {
      id: 'notif-3',
      title: '350 Campus Coins Available',
      message: 'Redeem instant cashback on your cart during checkout.',
      time: '1 day ago',
      read: true,
      type: 'discount'
    }
  ]);

  // Persist State
  useEffect(() => {
    localStorage.setItem('campusmart_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('campusmart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('campusmart_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('campusmart_products_v2', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('campusmart_accounts', JSON.stringify(userAccounts));
  }, [userAccounts]);

  useEffect(() => {
    localStorage.setItem('campusmart_current_uid', currentUserId);
  }, [currentUserId]);

  // Cart Helpers
  const addToCart = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => {
        if (variant) {
          return item.product.id === product.id && item.selectedVariant?.id === variant.id;
        }
        return item.product.id === product.id && !item.selectedVariant;
      });

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, selectedVariant: variant || (product.variants?.[0]), quantity }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart(prev => prev.filter(item => {
      if (variantId) {
        return !(item.product.id === productId && item.selectedVariant?.id === variantId);
      }
      return item.product.id !== productId;
    }));
  };

  const updateQuantity = (productId: string, variantId: string | undefined, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart(prev => prev.map(item => {
      const match = variantId 
        ? item.product.id === productId && item.selectedVariant?.id === variantId 
        : item.product.id === productId;
      return match ? { ...item, quantity: qty } : item;
    }));
  };

  const clearCart = () => setCart([]);

  const cartMRP = cart.reduce((acc, item) => {
    const price = item.selectedVariant?.mrp || item.product.mrp;
    return acc + price * item.quantity;
  }, 0);

  const cartTotal = cart.reduce((acc, item) => {
    const price = item.selectedVariant?.price || item.product.sellingPrice;
    return acc + price * item.quantity;
  }, 0);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Coupon handling
  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FRESHER10' || clean === 'STUDENT10') {
      setAppliedCoupon(clean);
      setStudentDiscountApplied(true);
      return { success: true, message: 'Fresher Student 10% Discount Applied!', discount: 10 };
    }
    if (clean === 'CAMPUS15') {
      setAppliedCoupon(clean);
      setStudentDiscountApplied(true);
      return { success: true, message: 'Campus Special 15% Discount Applied!', discount: 15 };
    }
    return { success: false, message: 'Invalid or expired coupon code. Try FRESHER10', discount: 0 };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setStudentDiscountApplied(false);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const removeFromWishlist = (productId: string) => {
    toggleWishlist(productId);
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Compare
  const toggleCompare = (productId: string) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, productId];
    });
    setIsCompareOpen(true);
  };

  const removeFromCompare = (productId: string) => {
    setCompareList(prev => prev.filter(id => id !== productId));
  };

  const isCompared = (productId: string) => compareList.includes(productId);

  // Recently Viewed
  const addRecentlyViewed = (productId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 8);
    });
  };

  // Pincode Verification
  const checkPincode = (pin: string): PincodeStatus | null => {
    const cleanPin = pin.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      return null;
    }
    setPincode(cleanPin);
    
    let status: PincodeStatus;
    if (cleanPin.startsWith('560') || cleanPin.startsWith('110') || cleanPin.startsWith('400') || cleanPin.startsWith('500') || cleanPin.startsWith('600')) {
      status = {
        pincode: cleanPin,
        city: 'Tier 1 Metro / College Express Campus Hub',
        estimatedDays: 1,
        deliveryDateStr: 'Tomorrow by 2:00 PM',
        codAvailable: true,
        isFreeDelivery: true,
        fastDeliveryCampus: true
      };
    } else {
      status = {
        pincode: cleanPin,
        city: 'Regional Logistics Zone',
        estimatedDays: 3,
        deliveryDateStr: 'Delivery in 2-3 Days',
        codAvailable: true,
        isFreeDelivery: true,
        fastDeliveryCampus: false
      };
    }
    setPincodeStatus(status);
    return status;
  };

  // Place Order
  const placeOrder = (orderDetails: Omit<Order, 'id' | 'date' | 'deliveryStatus' | 'trackingSteps' | 'returnEligibleUntil'>): Order => {
    const newId = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const returnDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const newOrder: Order = {
      ...orderDetails,
      id: newId,
      date: 'Today, ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      deliveryStatus: 'Processing',
      returnEligibleUntil: returnDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      trackingSteps: [
        { title: 'Order Placed & Payment Verified', location: 'CampusMart Cloud', timestamp: 'Just now', completed: true, current: true },
        { title: 'Packing at Nearest Fulfillment Hub', location: 'Bengaluru Logistics Node', timestamp: 'Pending', completed: false, current: false },
        { title: 'Handed to Campus Courier Partner', location: 'Local Express Station', timestamp: 'Pending', completed: false, current: false },
        { title: 'Out for Campus Dorm Delivery', location: 'Hostel Reception / Desk', timestamp: 'Pending', completed: false, current: false },
        { title: 'Delivered', location: 'Customer Hands', timestamp: 'Pending', completed: false, current: false }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    
    // Add reward coins for placing order
    updateUserProfile({
      loyaltyCoins: userProfile.loyaltyCoins + Math.round(newOrder.totalAmount * 0.02)
    });

    // Add notification
    setNotifications(prev => [
      {
        id: `notif-order-${newId}`,
        title: `Order ${newId} Confirmed!`,
        message: `Your order of ₹${newOrder.totalAmount.toLocaleString()} is being prepared for fast delivery.`,
        time: 'Just now',
        read: false,
        type: 'order'
      },
      ...prev
    ]);

    return newOrder;
  };

  // Cancel Order & Delivery
  const cancelOrder = (orderId: string, reason: string): { success: boolean; message: string } => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) {
      return { success: false, message: 'Order not found.' };
    }

    if (targetOrder.deliveryStatus === 'Delivered') {
      return { success: false, message: 'Delivered orders cannot be cancelled. Please use the Return / Replacement option.' };
    }

    if (targetOrder.deliveryStatus === 'Cancelled') {
      return { success: false, message: 'This order is already cancelled.' };
    }

    const now = new Date();
    const timeStr = 'Today, ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        const updatedSteps = [
          ...ord.trackingSteps.map(s => ({ ...s, current: false })),
          {
            title: `Delivery Cancelled: ${reason}`,
            location: 'Campus Dispatch Terminal',
            timestamp: timeStr,
            completed: true,
            current: true
          },
          {
            title: '100% Refund Processed to Original Payment Method',
            location: 'CampusMart Instant Payment Gateway',
            timestamp: 'Within 2-5 Minutes',
            completed: true,
            current: false
          }
        ];

        const updated: Order = {
          ...ord,
          deliveryStatus: 'Cancelled',
          isCancelled: true,
          cancellationReason: reason,
          cancellationDate: timeStr,
          cancellationRefundStatus: ord.paymentMethod === 'COD' ? 'N/A (Cash on Delivery)' : 'Refund Processed',
          paymentStatus: ord.paymentMethod === 'COD' ? 'Pending COD' : 'Refunded',
          trackingSteps: updatedSteps
        };

        if (trackedOrder?.id === orderId) {
          setTrackedOrder(updated);
        }
        return updated;
      }
      return ord;
    }));

    // Add notification
    setNotifications(prev => [
      {
        id: `notif-cancel-${orderId}-${Date.now()}`,
        title: `Order ${orderId} Delivery Cancelled`,
        message: `Delivery has been cancelled for reason "${reason}". Refund of ₹${targetOrder.totalAmount.toLocaleString()} has been initiated.`,
        time: 'Just now',
        read: false,
        type: 'order'
      },
      ...prev
    ]);

    return { 
      success: true, 
      message: `Order ${orderId} delivery cancelled successfully. Refund of ₹${targetOrder.totalAmount.toLocaleString()} initiated.` 
    };
  };

  const requestReturn = (orderId: string, reason: string) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        const updated: Order = {
          ...ord,
          isReturned: true,
          deliveryStatus: 'Returned',
          trackingSteps: [
            ...ord.trackingSteps,
            { title: `Return Pickup Scheduled: ${reason}`, location: 'Hostel Room Desk', timestamp: 'Tomorrow, 10:00 AM', completed: true, current: true }
          ]
        };
        if (trackedOrder?.id === orderId) {
          setTrackedOrder(updated);
        }
        return updated;
      }
      return ord;
    }));
    return true;
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // User Accounts Lifecycle (Create / Switch / Delete / Update)
  const registerUser = (newUserData: { name: string; email: string; studentId: string; college: string; phone?: string; campusDorm?: string; pincode?: string }): UserProfile => {
    const newId = `usr-${newUserData.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-${Date.now().toString().slice(-4)}`;
    
    const newAccount: UserProfile = {
      id: newId,
      name: newUserData.name.trim(),
      email: newUserData.email.trim(),
      phone: newUserData.phone || '+91 98765 00000',
      studentId: newUserData.studentId.trim() || `CAMPUS-${Math.floor(1000 + Math.random() * 9000)}`,
      college: newUserData.college.trim() || 'University Campus Hub',
      department: 'Engineering & Technology',
      year: 'Fresher (1st Year)',
      loyaltyCoins: 200, // 200 Welcome bonus coins
      isStudentVerified: true,
      joinedDate: 'Today',
      savedAddresses: [
        {
          id: `addr-${Date.now()}`,
          label: 'Primary Campus Residence',
          fullName: newUserData.name.trim(),
          campusDorm: newUserData.campusDorm?.trim() || 'Campus Hostel Block, Room 101',
          street: 'University Campus Avenue',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: newUserData.pincode?.trim() || '560100',
          phone: newUserData.phone || '+91 98765 00000',
          isDefault: true
        }
      ]
    };

    setUserAccounts(prev => [newAccount, ...prev]);
    setCurrentUserId(newId);

    setNotifications(prev => [
      {
        id: `notif-welcome-${newId}`,
        title: `Welcome to CampusMart, ${newAccount.name.split(' ')[0]}!`,
        message: 'Your student account has been created with 200 Welcome Campus Coins and instant student discount eligibility.',
        time: 'Just now',
        read: false,
        type: 'discount'
      },
      ...prev
    ]);

    return newAccount;
  };

  const switchUser = (userId: string) => {
    const exists = userAccounts.find(u => u.id === userId);
    if (exists) {
      setCurrentUserId(userId);
    }
  };

  const deleteUser = (userId: string): { success: boolean; message: string } => {
    const remaining = userAccounts.filter(u => u.id !== userId);
    
    if (remaining.length === 0) {
      // Create a clean guest/student default account so the app stays functional
      const guestAccount: UserProfile = {
        id: 'usr-new-guest',
        name: 'New Student User',
        email: 'student@campusmart.store',
        studentId: 'UNI-2026-NEW',
        college: 'General Student Hub',
        loyaltyCoins: 100,
        isStudentVerified: false,
        savedAddresses: []
      };
      setUserAccounts([guestAccount]);
      setCurrentUserId('usr-new-guest');
    } else {
      setUserAccounts(remaining);
      if (currentUserId === userId) {
        setCurrentUserId(remaining[0].id);
      }
    }

    return { 
      success: true, 
      message: 'Your student account and all stored personal session details have been permanently deleted.' 
    };
  };

  const updateUserProfile = (updated: Partial<UserProfile>) => {
    setUserAccounts(prev => prev.map(u => u.id === currentUserId ? { ...u, ...updated } : u));
  };

  const updateProductStock = (productId: string, newStock: number) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stockQuantity: newStock, inStock: newStock > 0 } : p));
  };

  const updateProductPrice = (productId: string, newPrice: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const discount = Math.round(((p.mrp - newPrice) / p.mrp) * 100);
        return { ...p, sellingPrice: newPrice, discountPercentage: discount };
      }
      return p;
    }));
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        activeView,
        setActiveView,
        selectedCategory,
        setSelectedCategory,
        selectedProduct,
        setSelectedProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartMRP,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        studentDiscountApplied,
        applyCoupon,
        removeCoupon,
        useLoyaltyCoins,
        setUseLoyaltyCoins,
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        isWishlisted,
        compareList,
        toggleCompare,
        removeFromCompare,
        isCompared,
        isCompareOpen,
        setIsCompareOpen,
        recentlyViewed,
        addRecentlyViewed,
        searchQuery,
        setSearchQuery,
        orders,
        placeOrder,
        requestReturn,
        cancelOrder,
        trackedOrder,
        setTrackedOrder,
        isTrackingOpen,
        setIsTrackingOpen,
        pincode,
        pincodeStatus,
        checkPincode,
        userProfile,
        userAccounts,
        updateUserProfile,
        registerUser,
        switchUser,
        deleteUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        activeARProduct,
        setActiveARProduct,
        isAROpen,
        setIsAROpen,
        isSEOOpen,
        setIsSEOOpen,
        isChatOpen,
        setIsChatOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        notifications,
        markAllNotificationsRead,
        updateProductStock,
        updateProductPrice
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return ctx;
};
