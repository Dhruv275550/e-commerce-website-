export type CategoryType = 'mobile' | 'sports' | 'toys' | 'cosmetics';

export interface UserAddress {
  id: string;
  label: string;
  fullName: string;
  campusDorm: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  studentId: string;
  college: string;
  department?: string;
  year?: string;
  loyaltyCoins: number;
  isStudentVerified: boolean;
  avatar?: string;
  joinedDate?: string;
  savedAddresses: UserAddress[];
}

export interface ProductVariant {
  id: string;
  name: string; // e.g. "Space Black - 256GB" or "Matte Ruby 04" or "Large - Navy"
  sku: string;
  colorName?: string;
  colorHex?: string;
  storage?: string;
  ram?: string;
  size?: string;
  price: number;
  mrp: number;
  stock: number;
  image: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  userType?: string; // e.g. "Fresher Student - Tech Major"
  helpfulCount: number;
  images?: string[];
}

export interface QAItem {
  id: string;
  question: string;
  askedBy: string;
  date: string;
  answer: string;
  answeredBy: string;
  isSellerAnswer: boolean;
  votes: number;
}

export interface MobileSpecs {
  ramOptions: string[];
  storageOptions: string[];
  processor: string;
  camera: {
    rear: string;
    front: string;
    features: string[];
  };
  battery: {
    capacity: string;
    chargingSpeed: string;
    type: string;
  };
  screen: {
    size: string;
    resolution: string;
    panelType: string;
    refreshRate: string;
    brightness: string;
  };
  os: string;
  updatePolicy: string;
  networkBands: string[];
  simType: string;
  imeiWarranty: string;
}

export interface SportsSpecs {
  sportType: string;
  gender: 'Men' | 'Women' | 'Unisex';
  material: string;
  suitableAgeGroup: string;
  sizeChart: {
    size: string;
    chest: string;
    waist: string;
    length: string;
  }[];
  fitType: string;
  careInstructions: string;
  gripFlexSpecs?: string;
}

export interface ToysSpecs {
  ageRecommendation: string;
  safetyCertifications: string[]; // e.g. ["ASTM F963", "CE Certified", "BIS Approved"]
  material: string; // e.g. "BPA-Free Non-Toxic High-Grade ABS"
  chokingHazardWarning: string; // e.g. "Warning: Small parts. Not suitable for children under 3 years."
  batteryRequirement: string; // e.g. "Requires 2x AA Batteries (Included)"
  assemblyRequired: boolean;
  educationalFocus?: string;
}

export interface CosmeticsSpecs {
  ingredientsList: string[];
  keyActives: { name: string; percentage?: string; benefit: string }[];
  skinSuitability: string[]; // e.g. ["All Skin Types", "Sensitive", "Oily/Acne-Prone"]
  expiryDate: string;
  batchNumber: string;
  shelfLifePAO: string; // Period After Opening e.g. "12M"
  dermatologicallyTested: boolean;
  certifications: string[]; // ["100% Vegan", "Cruelty-Free (PETA)", "Paraben-Free", "Non-Comedogenic"]
  usageInstructions: string;
  shadeHex?: string;
}

export interface ProductTrustSignals {
  returnPolicy: string; // "7 Days Easy Replacement"
  warranty: string; // "1 Year Manufacturer Brand Warranty"
  seller: {
    name: string;
    rating: number;
    salesCount: string;
    isVerified: boolean;
    shipsFrom: string;
    gstin: string;
  };
  certifications: string[];
}

export interface ProductSEO {
  metaTitle: string;
  metaDescription: string;
  urlSlug: string;
  canonicalUrl: string;
  keywords: string[];
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: CategoryType;
  subcategory: string;
  mrp: number;
  sellingPrice: number;
  discountPercentage: number;
  currency: string;
  taxInfo: string;
  inStock: boolean;
  stockQuantity: number;
  badge?: string; // e.g. "Student Bestseller", "Trending Deal"
  studentDiscountEligible: boolean;
  
  // Media
  images: string[];
  views360?: string[]; // 360 degree frame snapshots
  videoUrl?: string;
  
  // Descriptions
  shortSummary: string;
  detailedDescription: string;
  bulletHighlights: string[];
  
  // Category specific specs
  mobileSpecs?: MobileSpecs;
  sportsSpecs?: SportsSpecs;
  toysSpecs?: ToysSpecs;
  cosmeticsSpecs?: CosmeticsSpecs;
  
  // Variants
  hasVariants: boolean;
  variantType?: 'storage_color' | 'size_color' | 'shade' | 'color';
  variants: ProductVariant[];
  
  // Reviews & QA
  rating: number;
  ratingCount: number;
  ratingBreakdown: { 5: number; 4: number; 3: number; 2: number; 1: number };
  reviews: ReviewItem[];
  qaList: QAItem[];
  
  // Trust & SEO
  trustSignals: ProductTrustSignals;
  seo: ProductSEO;
  
  // Cross-sell & recommendations
  crossSellIds: string[];
  tags: string[];
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export interface OrderTrackingStep {
  title: string;
  location: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  studentSavings: number;
  shippingAddress: {
    fullName: string;
    campusDorm: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  paymentMethod: 'UPI' | 'Card' | 'COD' | 'BNPL' | 'NetBanking';
  paymentStatus: 'Paid' | 'Pending COD' | 'Refunded';
  deliveryStatus: 'Processing' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Returned' | 'Cancelled';
  expectedDelivery: string;
  trackingSteps: OrderTrackingStep[];
  returnEligibleUntil: string;
  isReturned?: boolean;
  isCancelled?: boolean;
  cancellationReason?: string;
  cancellationDate?: string;
  cancellationRefundStatus?: string;
}
