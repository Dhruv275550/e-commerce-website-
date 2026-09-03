import { Product } from '../types/product';

export const MOCK_PRODUCTS: Product[] = [
  // ==========================================
  // MOBILE PHONES
  // ==========================================
  {
    id: 'mob-apex-pro',
    sku: 'MOB-APEX-5G-256',
    name: 'Apex Pro 5G Flagship Edition',
    brand: 'Apex Tech',
    category: 'mobile',
    subcategory: 'Smartphones',
    mrp: 69999,
    sellingPrice: 54999,
    discountPercentage: 21,
    currency: '₹',
    taxInfo: 'Inclusive of all applicable taxes & GST invoice available',
    inStock: true,
    stockQuantity: 42,
    badge: 'Fresher Tech Pick',
    studentDiscountEligible: true,
    images: [
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1200&q=80',
    ],
    views360: [
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
    ],
    shortSummary: 'High-performance flagship with Snapdragon 8 Gen 3, 144Hz AMOLED, 50MP Sony IMX989 OIS camera, and 120W HyperCharge.',
    detailedDescription: 'Engineered for student power-users, multitaskers, and mobile gaming enthusiasts. Features a forged titanium frame with aerospace-grade cooling, ultra-responsive 144Hz HDR10+ screen, and all-day 5400mAh dual-cell battery with 120W charging that reaches 100% in just 19 minutes.',
    bulletHighlights: [
      'Snapdragon 8 Gen 3 with 4nm Architecture & 3.3GHz Cortex-X4 Prime Core',
      '6.78-inch 1.5K LTPO 4.0 Curved AMOLED Display with 4500 nits peak brightness',
      '50MP OIS Sony IMX989 (1-inch sensor) + 50MP 3x Periscope Telephoto + 50MP Ultra-wide',
      '5400mAh Battery with 120W Wired + 50W Wireless Turbo Charging',
      'IP68 Water and Dust Resistance with Corning Gorilla Glass Armor',
      '4 Years of Android OS Upgrades & 5 Years of Security Patches'
    ],
    mobileSpecs: {
      ramOptions: ['12GB LPDDR5X', '16GB LPDDR5X'],
      storageOptions: ['256GB UFS 4.0', '512GB UFS 4.0'],
      processor: 'Snapdragon 8 Gen 3 Octa-Core (3.3GHz)',
      camera: {
        rear: '50MP (OIS Sony 1-inch) + 50MP Periscope (3x-100x zoom) + 50MP 120° Ultra-wide',
        front: '32MP Sony Sensor with 4K 60fps Selfie Recording',
        features: ['Night Vision Mode 4.0', '8K 30fps Cinema Video', 'RAW HDR Plus', 'Macro 2.5cm focus']
      },
      battery: {
        capacity: '5400 mAh Dual-Cell',
        chargingSpeed: '120W Turbo Wired (0-100% in 19m) / 50W Wireless',
        type: 'Silicon-Carbon High Energy Density'
      },
      screen: {
        size: '6.78-inch (17.22 cm)',
        resolution: '1.5K (2780 x 1264 pixels, 450 ppi)',
        panelType: 'LTPO 4.0 AMOLED, 1.07B colors, HDR10+, Dolby Vision',
        refreshRate: '1Hz-144Hz Dynamic Adaptive',
        brightness: '4500 nits Peak / 1600 nits HBM'
      },
      os: 'ApexOS 15 (Based on Android 15, Clean UI, No Bloatware)',
      updatePolicy: '4 Major Android OS Upgrades + 5 Years Security Updates',
      networkBands: ['5G SA/NSA (n1, n3, n5, n8, n28, n41, n77, n78)', 'Wi-Fi 7 (802.11be)', 'Bluetooth 5.4', 'NFC'],
      simType: 'Dual Nano SIM + eSIM Support',
      imeiWarranty: 'Dual Registered IMEI with 1-Year National On-Site Warranty + 6-Month Screen Replacement'
    },
    hasVariants: true,
    variantType: 'storage_color',
    variants: [
      {
        id: 'var-apex-black-256',
        name: 'Obsidian Black / 12GB + 256GB',
        sku: 'MOB-APEX-BLK-256',
        colorName: 'Obsidian Black',
        colorHex: '#1e293b',
        ram: '12GB',
        storage: '256GB',
        price: 54999,
        mrp: 69999,
        stock: 24,
        image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'var-apex-silver-512',
        name: 'Titanium Frost / 16GB + 512GB',
        sku: 'MOB-APEX-SLV-512',
        colorName: 'Titanium Frost',
        colorHex: '#e2e8f0',
        ram: '16GB',
        storage: '512GB',
        price: 61999,
        mrp: 76999,
        stock: 18,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'var-apex-blue-256',
        name: 'Aurora Cyan / 12GB + 256GB',
        sku: 'MOB-APEX-BLU-256',
        colorName: 'Aurora Cyan',
        colorHex: '#0ea5e9',
        ram: '12GB',
        storage: '256GB',
        price: 54999,
        mrp: 69999,
        stock: 12,
        image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    rating: 4.8,
    ratingCount: 1420,
    ratingBreakdown: { 5: 1100, 4: 240, 3: 50, 2: 20, 1: 10 },
    reviews: [
      {
        id: 'rev-mob-1',
        author: 'Arjun Verma',
        rating: 5,
        date: '24 Aug 2026',
        title: 'Perfect for coding, multitasking and battery life is insane!',
        comment: 'As a computer science student, I needed a phone that could easily handle heavy campus days, hotspotting to my laptop, and testing builds. The battery easily lasts 1.5 days with 8 hours SOT, and charges up before my morning class.',
        verifiedPurchase: true,
        userType: 'Fresher Student - Engineering',
        helpfulCount: 42
      },
      {
        id: 'rev-mob-2',
        author: 'Pooja Iyer',
        rating: 5,
        date: '18 Aug 2026',
        title: 'Camera quality matches DSLRs, no bloatware',
        comment: 'The Sony 1-inch sensor takes phenomenal low-light photos during campus fests. The UI is completely clean without ads.',
        verifiedPurchase: true,
        userType: 'Verified Campus Buyer',
        helpfulCount: 29
      }
    ],
    qaList: [
      {
        id: 'qa-mob-1',
        question: 'Does it come with the 120W fast charger inside the box?',
        askedBy: 'Devansh K.',
        date: '12 Aug 2026',
        answer: 'Yes! The retail box includes the 120W GaN fast charger, 6A USB-C to C braided cable, protective TPU case, and pre-applied screen protector.',
        answeredBy: 'Apex Official Store',
        isSellerAnswer: true,
        votes: 88
      },
      {
        id: 'qa-mob-2',
        question: 'Is 5G carrier aggregation supported across Jio and Airtel in college campuses?',
        askedBy: 'Sneha R.',
        date: '08 Aug 2026',
        answer: 'Yes, full NR-CA (Carrier Aggregation) is supported on all major Indian and international 5G telecom bands.',
        answeredBy: 'Verified Tech Reviewer',
        isSellerAnswer: false,
        votes: 35
      }
    ],
    trustSignals: {
      returnPolicy: '7 Days Free Replacement Policy for hardware defects',
      warranty: '1 Year Manufacturer Brand Warranty + 6-Month Free Screen Damage Cover',
      seller: {
        name: 'Apex Official Brand Store',
        rating: 4.9,
        salesCount: '45,000+ Orders',
        isVerified: true,
        shipsFrom: 'Bengaluru Fulfillment Center 04',
        gstin: '29ABCDE1234F1Z5'
      },
      certifications: ['BIS Certified', 'SAR Compliant (< 1.6 W/kg)', 'ISO 9001:2015', 'TÜV Rheinland Low Blue Light']
    },
    seo: {
      metaTitle: 'Apex Pro 5G Flagship - Snapdragon 8 Gen 3, 144Hz AMOLED & 120W Charging',
      metaDescription: 'Buy Apex Pro 5G smartphone online at best student discount price. Features 50MP Sony OIS camera, 5400mAh battery, and 4 years OS updates.',
      urlSlug: 'apex-pro-5g-flagship-edition',
      canonicalUrl: 'https://campusmart.store/products/mobile/apex-pro-5g-flagship-edition',
      keywords: ['5G smartphone', 'Snapdragon 8 Gen 3', 'student mobile deals', '120W fast charge', '144Hz AMOLED']
    },
    crossSellIds: ['spo-shoes-aero', 'cos-serum-hydra'],
    tags: ['5G', 'Flagship', 'Student Tech', 'Gaming', 'Fast Charge']
  },

  {
    id: 'mob-stellar-note',
    sku: 'MOB-STEL-5G-128',
    name: 'Stellar Note 14 5G Student Edition',
    brand: 'Stellar Mobile',
    category: 'mobile',
    subcategory: 'Smartphones',
    mrp: 24999,
    sellingPrice: 17999,
    discountPercentage: 28,
    currency: '₹',
    taxInfo: 'Inclusive of all applicable GST & educational discount',
    inStock: true,
    stockQuantity: 78,
    badge: 'Budget Student King',
    studentDiscountEligible: true,
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1200&q=80'
    ],
    views360: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80'
    ],
    shortSummary: 'Best budget 5G phone for students with Dimensity 7200, 120Hz AMOLED, 50MP Sony Camera, and 5000mAh battery with 67W charging.',
    detailedDescription: 'Created to provide flagship-grade everyday responsiveness on a student budget. Features a smooth 120Hz Full HD+ display, dual stereo speakers with Hi-Res audio, and reliable all-day battery life.',
    bulletHighlights: [
      'MediaTek Dimensity 7200 Ultra 5G Processor (4nm)',
      '6.67" 120Hz FHD+ Super AMOLED Screen with 1800 nits brightness',
      '50MP Main OIS Camera + 8MP Ultra-Wide + 16MP Clear Selfie Camera',
      '5000mAh Long-Life Battery with 67W Flash Charge (100% in 35m)',
      'IP54 Splash Resistant Design with Dual Stereo Speakers',
      'Virtual RAM expansion up to 16GB'
    ],
    mobileSpecs: {
      ramOptions: ['8GB LPDDR4X', '12GB LPDDR4X'],
      storageOptions: ['128GB UFS 3.1', '256GB UFS 3.1'],
      processor: 'MediaTek Dimensity 7200 Ultra 5G (2.8GHz)',
      camera: {
        rear: '50MP OIS Primary + 8MP 118° Ultra-wide',
        front: '16MP Portrait Selfie',
        features: ['Document Scanner 2.0', 'Night Portrait', 'Vlog Mode']
      },
      battery: {
        capacity: '5000 mAh',
        chargingSpeed: '67W Turbo Charger Included',
        type: 'Lithium-Polymer'
      },
      screen: {
        size: '6.67-inch (16.94 cm)',
        resolution: 'FHD+ (2400 x 1080 pixels)',
        panelType: 'AMOLED, 120Hz Refresh Rate, HDR10',
        refreshRate: '120Hz Smooth',
        brightness: '1800 nits Peak'
      },
      os: 'Stellar UI 6.0 (Android 14 upgradeable to Android 16)',
      updatePolicy: '2 Major Android OS + 3 Years Security Updates',
      networkBands: ['10 5G Bands (n1/n3/n5/n8/n28/n40/n77/n78)', 'Wi-Fi 6', 'Bluetooth 5.3'],
      simType: 'Dual 5G Nano SIM',
      imeiWarranty: 'Registered Brand IMEI with 1-Year Pan-India Warranty'
    },
    hasVariants: true,
    variantType: 'storage_color',
    variants: [
      {
        id: 'var-stel-mint-128',
        name: 'Glacier Mint / 8GB + 128GB',
        sku: 'MOB-STEL-MNT-128',
        colorName: 'Glacier Mint',
        colorHex: '#a7f3d0',
        ram: '8GB',
        storage: '128GB',
        price: 17999,
        mrp: 24999,
        stock: 50,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'var-stel-charcoal-256',
        name: 'Midnight Charcoal / 12GB + 256GB',
        sku: 'MOB-STEL-CHR-256',
        colorName: 'Midnight Charcoal',
        colorHex: '#334155',
        ram: '12GB',
        storage: '256GB',
        price: 20999,
        mrp: 27999,
        stock: 28,
        image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    rating: 4.6,
    ratingCount: 890,
    ratingBreakdown: { 5: 620, 4: 210, 3: 40, 2: 12, 1: 8 },
    reviews: [
      {
        id: 'rev-stel-1',
        author: 'Rohan Sharma',
        rating: 5,
        date: '20 Aug 2026',
        title: 'Value for money is unmatched for students',
        comment: 'College presentations, Zoom classes, gaming during dorm breaks—everything runs smoothly without heating.',
        verifiedPurchase: true,
        userType: 'Student Buyer',
        helpfulCount: 19
      }
    ],
    qaList: [
      {
        id: 'qa-stel-1',
        question: 'Can I expand storage via MicroSD card?',
        askedBy: 'Ananya M.',
        date: '15 Aug 2026',
        answer: 'Yes, it features a hybrid SIM slot supporting up to 1TB MicroSD card expansion.',
        answeredBy: 'Stellar Tech Support',
        isSellerAnswer: true,
        votes: 41
      }
    ],
    trustSignals: {
      returnPolicy: '7 Days Return & Replacement Available',
      warranty: '1 Year Brand Warranty on Handset & 6 Months on Accessories',
      seller: {
        name: 'Campus Electronics Direct',
        rating: 4.7,
        salesCount: '18,200+ Sales',
        isVerified: true,
        shipsFrom: 'Mumbai SuperHub',
        gstin: '27AABCT8921B1Z2'
      },
      certifications: ['BIS Approved', 'CE Certified', 'RoHS Green Standard']
    },
    seo: {
      metaTitle: 'Stellar Note 14 5G - Dimensity 7200, 120Hz AMOLED & 5000mAh Battery',
      metaDescription: 'Order the Stellar Note 14 5G with exclusive student cashback. 50MP OIS camera, 67W fast charging, and vibrant 120Hz display.',
      urlSlug: 'stellar-note-14-5g-student-edition',
      canonicalUrl: 'https://campusmart.store/products/mobile/stellar-note-14-5g-student-edition',
      keywords: ['budget 5G phone', 'student smartphone', '120Hz AMOLED', 'Dimensity 7200']
    },
    crossSellIds: ['spo-shoes-aero', 'toy-cyberbot-3in1'],
    tags: ['5G', 'Student Budget', 'Best Seller', 'AMOLED']
  },

  // ==========================================
  // SPORTS & ATHLETICS
  // ==========================================
  {
    id: 'spo-shoes-aero',
    sku: 'SPO-AERO-RUN-01',
    name: 'ProPulse Aero Dynamic Running Shoes',
    brand: 'ProPulse Athletics',
    category: 'sports',
    subcategory: 'Footwear & Running',
    mrp: 5999,
    sellingPrice: 3499,
    discountPercentage: 42,
    currency: '₹',
    taxInfo: 'Inclusive of all taxes (GST 12% on footwear)',
    inStock: true,
    stockQuantity: 65,
    badge: 'Campus Marathon Choice',
    studentDiscountEligible: true,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80'
    ],
    views360: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80'
    ],
    shortSummary: 'Ultralight responsive road running shoe featuring NitroFoam cushioning, breathable flyknit mesh, and slip-resistant carbon rubber outsole.',
    detailedDescription: 'Designed for daily campus jogging, gym sessions, track events, and long walking commutes. Engineered with a dual-density NitroFoam midsole that absorbs impact and returns 85% kinetic energy with every stride.',
    bulletHighlights: [
      'Dual-density NitroFoam midsole for optimal shock absorption and bounce',
      'Engineered multi-zone Jacquard Flyknit upper provides high ventilation',
      'High-traction EverGrip rubber outsole with flex grooves for wet/dry stability',
      'Padded Achilles collar and ergonomic orthotic EVA footbed',
      'Reflective 3M heel accents for evening track and campus safety',
      'Ultra-lightweight: only 220g per shoe (UK Size 8)'
    ],
    sportsSpecs: {
      sportType: 'Road Running, Marathon, Gym & Cross-Training',
      gender: 'Unisex',
      material: '80% Recycled Polyester Flyknit, 20% TPU Overlays, NitroFoam Midsole',
      suitableAgeGroup: 'Teens & Adults (15 - 65 yrs)',
      sizeChart: [
        { size: 'UK 6 / US 7', chest: 'N/A', waist: 'N/A', length: 'Foot Length: 24.5 cm' },
        { size: 'UK 7 / US 8', chest: 'N/A', waist: 'N/A', length: 'Foot Length: 25.5 cm' },
        { size: 'UK 8 / US 9', chest: 'N/A', waist: 'N/A', length: 'Foot Length: 26.5 cm' },
        { size: 'UK 9 / US 10', chest: 'N/A', waist: 'N/A', length: 'Foot Length: 27.5 cm' },
        { size: 'UK 10 / US 11', chest: 'N/A', waist: 'N/A', length: 'Foot Length: 28.5 cm' }
      ],
      fitType: 'True to Size / Regular Width (D)',
      careInstructions: 'Wipe with damp cloth and mild soap. Air dry in shade. Do not machine wash.',
      gripFlexSpecs: 'Deep hexagonal lugs with 4.5mm tread depth and torsional arch shank'
    },
    hasVariants: true,
    variantType: 'size_color',
    variants: [
      {
        id: 'var-spo-red-8',
        name: 'Crimson Red / UK 8',
        sku: 'SPO-AERO-RED-8',
        colorName: 'Crimson Red',
        colorHex: '#dc2626',
        size: 'UK 8',
        price: 3499,
        mrp: 5999,
        stock: 18,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'var-spo-red-9',
        name: 'Crimson Red / UK 9',
        sku: 'SPO-AERO-RED-9',
        colorName: 'Crimson Red',
        colorHex: '#dc2626',
        size: 'UK 9',
        price: 3499,
        mrp: 5999,
        stock: 22,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'var-spo-black-8',
        name: 'Stealth Black / UK 8',
        sku: 'SPO-AERO-BLK-8',
        colorName: 'Stealth Black',
        colorHex: '#1e293b',
        size: 'UK 8',
        price: 3499,
        mrp: 5999,
        stock: 15,
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'var-spo-black-9',
        name: 'Stealth Black / UK 9',
        sku: 'SPO-AERO-BLK-9',
        colorName: 'Stealth Black',
        colorHex: '#1e293b',
        size: 'UK 9',
        price: 3499,
        mrp: 5999,
        stock: 10,
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    rating: 4.7,
    ratingCount: 650,
    ratingBreakdown: { 5: 480, 4: 120, 3: 35, 2: 10, 1: 5 },
    reviews: [
      {
        id: 'rev-spo-1',
        author: 'Kunal Singhal',
        rating: 5,
        date: '19 Aug 2026',
        title: 'Super lightweight and great arch support',
        comment: 'Ran my college 5k marathon in these straight out of the box. Zero blisters and very bouncy heel response.',
        verifiedPurchase: true,
        userType: 'Student Athlete',
        helpfulCount: 28
      }
    ],
    qaList: [
      {
        id: 'qa-spo-1',
        question: 'Should I size up if I have wider feet?',
        askedBy: 'Vikram P.',
        date: '10 Aug 2026',
        answer: 'If you have broader feet or prefer thicker running socks, we suggest choosing half a size or 1 size larger (e.g. UK 9 instead of UK 8).',
        answeredBy: 'ProPulse Sport Specialist',
        isSellerAnswer: true,
        votes: 32
      }
    ],
    trustSignals: {
      returnPolicy: '10 Days Size Exchange & Return Guarantee',
      warranty: '6 Months Manufacturer Warranty against sole separation & manufacturing defects',
      seller: {
        name: 'ProPulse Official Sport Store',
        rating: 4.8,
        salesCount: '32,000+ Orders',
        isVerified: true,
        shipsFrom: 'Gurugram Central Logistics Hub',
        gstin: '06AABCP4412K1Z9'
      },
      certifications: ['SATRA Certified Footwear', 'Eco-Friendly Recycled Upper', 'ISO 9001:2015 Quality']
    },
    seo: {
      metaTitle: 'ProPulse Aero Dynamic Running Shoes - Lightweight NitroFoam Cushioning',
      metaDescription: 'Shop ProPulse Aero Running Shoes with student discount. Ultra-breathable mesh, NitroFoam midsole, and durable traction outsole.',
      urlSlug: 'propulse-aero-dynamic-running-shoes',
      canonicalUrl: 'https://campusmart.store/products/sports/propulse-aero-dynamic-running-shoes',
      keywords: ['running shoes', 'sports footwear', 'nitro foam', 'student fitness', 'marathon shoes']
    },
    crossSellIds: ['spo-jersey-ultradri', 'mob-apex-pro'],
    tags: ['Running', 'Athletic', 'Footwear', 'Student Deal', 'Breathable']
  },

  {
    id: 'spo-jersey-ultradri',
    sku: 'SPO-JERSEY-TRI-02',
    name: 'UltraDri Breathable Athletic Training Jersey',
    brand: 'ProPulse Athletics',
    category: 'sports',
    subcategory: 'Sportswear & Apparel',
    mrp: 1999,
    sellingPrice: 899,
    discountPercentage: 55,
    currency: '₹',
    taxInfo: 'Inclusive of all taxes (GST 5%)',
    inStock: true,
    stockQuantity: 120,
    badge: 'Dorm Workout Essential',
    studentDiscountEligible: true,
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80'
    ],
    views360: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80'
    ],
    shortSummary: 'Quick-dry moisture-wicking active training jersey with 4-way stretch fabric and anti-odor silver ion technology.',
    detailedDescription: 'Constructed from lightweight poly-spandex blend that actively pulls sweat away from the skin. Flatlock anti-chafing seams ensure friction-free motion during intense football, badminton, running, or campus gym sessions.',
    bulletHighlights: [
      'UltraDri Micro-Mesh Fabric wicks sweat 3x faster than standard cotton',
      'Silver-Ion Anti-Odor Technology prevents bacteria and post-workout odor',
      '4-way ergonomic mechanical stretch for unrestricted motion',
      'Flatlock ergonomic seams eliminate underarm chafing',
      'UPF 40+ Sun Protection for outdoor campus sports'
    ],
    sportsSpecs: {
      sportType: 'Gym, Football, Cricket, Badminton, Running',
      gender: 'Unisex',
      material: '88% Recycled Hydrophobic Polyester, 12% Spandex',
      suitableAgeGroup: 'Teens & Adults (14+ yrs)',
      sizeChart: [
        { size: 'S', chest: '36 - 38 inches (91-96 cm)', waist: '30 - 32 inches', length: '27 inches (68 cm)' },
        { size: 'M', chest: '38 - 40 inches (96-101 cm)', waist: '32 - 34 inches', length: '28 inches (71 cm)' },
        { size: 'L', chest: '40 - 42 inches (101-106 cm)', waist: '34 - 36 inches', length: '29 inches (73 cm)' },
        { size: 'XL', chest: '42 - 44 inches (106-111 cm)', waist: '36 - 38 inches', length: '30 inches (76 cm)' }
      ],
      fitType: 'Athletic Slim Fit',
      careInstructions: 'Machine wash cold with like colors. Do not iron directly on graphic logos. No bleach.'
    },
    hasVariants: true,
    variantType: 'size_color',
    variants: [
      {
        id: 'var-jrs-navy-m',
        name: 'Navy Blue / Medium (M)',
        sku: 'SPO-JRS-NVY-M',
        colorName: 'Navy Blue',
        colorHex: '#1e3a8a',
        size: 'M',
        price: 899,
        mrp: 1999,
        stock: 45,
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'var-jrs-navy-l',
        name: 'Navy Blue / Large (L)',
        sku: 'SPO-JRS-NVY-L',
        colorName: 'Navy Blue',
        colorHex: '#1e3a8a',
        size: 'L',
        price: 899,
        mrp: 1999,
        stock: 35,
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'var-jrs-black-m',
        name: 'Onyx Black / Medium (M)',
        sku: 'SPO-JRS-BLK-M',
        colorName: 'Onyx Black',
        colorHex: '#0f172a',
        size: 'M',
        price: 899,
        mrp: 1999,
        stock: 40,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    rating: 4.5,
    ratingCount: 380,
    ratingBreakdown: { 5: 250, 4: 95, 3: 25, 2: 7, 1: 3 },
    reviews: [
      {
        id: 'rev-jrs-1',
        author: 'Siddharth M.',
        rating: 5,
        date: '14 Aug 2026',
        title: 'Super soft material and dries very quickly in hostel room',
        comment: 'Great fitting for daily workouts. Does not stink even after 1 hour of intense football.',
        verifiedPurchase: true,
        userType: 'College Football Team Member',
        helpfulCount: 14
      }
    ],
    qaList: [
      {
        id: 'qa-jrs-1',
        question: 'Does the color fade after washing?',
        askedBy: 'Naveen K.',
        date: '02 Aug 2026',
        answer: 'No, we use high-grade reactive dyed micro-fibers tested for 50+ wash cycles without fading.',
        answeredBy: 'ProPulse Athletics',
        isSellerAnswer: true,
        votes: 18
      }
    ],
    trustSignals: {
      returnPolicy: '7 Days Hassle-Free Exchange for Size & Fit',
      warranty: '3 Months Stitching & Seam Guarantee',
      seller: {
        name: 'ProPulse Official Sport Store',
        rating: 4.8,
        salesCount: '32,000+ Orders',
        isVerified: true,
        shipsFrom: 'Gurugram Logistics Hub',
        gstin: '06AABCP4412K1Z9'
      },
      certifications: ['OEKO-TEX Standard 100 Certified', 'Anti-Bacterial Lab Tested']
    },
    seo: {
      metaTitle: 'UltraDri Athletic Training Jersey - Quick-Dry Moisture Wicking Sportswear',
      metaDescription: 'Buy quick-dry breathable gym t-shirt online. 4-way stretch, anti-odor technology with student discount price.',
      urlSlug: 'ultradri-breathable-athletic-training-jersey',
      canonicalUrl: 'https://campusmart.store/products/sports/ultradri-breathable-athletic-training-jersey',
      keywords: ['gym jersey', 'quick dry t shirt', 'running apparel', 'student gym wear']
    },
    crossSellIds: ['spo-shoes-aero', 'mob-stellar-note'],
    tags: ['Apparel', 'Gym', 'Fitness', 'Quick Dry', 'Student Budget']
  },

  // ==========================================
  // TOYS & STEM LEARNING
  // ==========================================
  {
    id: 'toy-cyberbot-3in1',
    sku: 'TOY-CYBER-BOT-03',
    name: 'CyberBot Coding Robotics Kit 3-in-1',
    brand: 'RoboCrafters STEM',
    category: 'toys',
    subcategory: 'STEM & Educational Robotics',
    mrp: 4499,
    sellingPrice: 2799,
    discountPercentage: 38,
    currency: '₹',
    taxInfo: 'Inclusive of all educational goods taxes (GST 18%)',
    inStock: true,
    stockQuantity: 34,
    badge: 'STEM & Maker Favorite',
    studentDiscountEligible: true,
    images: [
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80'
    ],
    views360: [
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80'
    ],
    shortSummary: 'Build and code 3 modular robots: Obstacle-Avoiding Rover, Robotic Claw Arm, and Smart Line-Follower using Scratch & Python block programming.',
    detailedDescription: 'Ideal for tech-curious beginners, STEM hobbyists, and robotics school projects. Contains 240+ precision snap-together components, ultrasonic sonar distance sensor, dual high-torque DC motors, and Bluetooth wireless controller module.',
    bulletHighlights: [
      '3-in-1 Build Configurations: All-Terrain Rover, Robotic Arm, & Balance Bot',
      'Ultrasonic distance sensors & infrared line tracking sensors included',
      'Supports visual Drag-and-Drop Scratch 3.0 blocks and Python code',
      'Bluetooth BLE 5.0 wireless controller compatible with iOS, Android, and PC',
      'BPA-free non-toxic reinforced ABS modular construction with rounded safety edges',
      'Includes 18 guided step-by-step interactive coding challenges'
    ],
    toysSpecs: {
      ageRecommendation: '8 Years to 18 Years (Beginner to Intermediate STEM)',
      safetyCertifications: ['ASTM F963 US Toy Safety', 'CE Mark Certified (EN71-1, 2, 3)', 'BIS IS 9873 (Part 1, 2, 3)', 'RoHS Compliant'],
      material: '100% Non-Toxic BPA-Free Virgin ABS Polymer & Lead-Free Solder PCB',
      chokingHazardWarning: '⚠️ WARNING: CHOKING HAZARD - Small parts and mechanical screws. Not for children under 3 years of age.',
      batteryRequirement: 'Rechargeable 3.7V 1200mAh Li-Po battery pack (Included) with USB-C charging cable',
      assemblyRequired: true,
      educationalFocus: 'Robotics Engineering, Algorithmic Logic, Electronics & Spatial Physics'
    },
    hasVariants: true,
    variantType: 'color',
    variants: [
      {
        id: 'var-toy-blue',
        name: 'Cyber Cyan & White Edition',
        sku: 'TOY-CYBER-CYAN',
        colorName: 'Cyber Cyan',
        colorHex: '#06b6d4',
        price: 2799,
        mrp: 4499,
        stock: 22,
        image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'var-toy-orange',
        name: 'Solar Orange & Carbon Edition',
        sku: 'TOY-CYBER-ORG',
        colorName: 'Solar Orange',
        colorHex: '#f97316',
        price: 2799,
        mrp: 4499,
        stock: 12,
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    rating: 4.9,
    ratingCount: 420,
    ratingBreakdown: { 5: 380, 4: 30, 3: 7, 2: 2, 1: 1 },
    reviews: [
      {
        id: 'rev-toy-1',
        author: 'Prof. Anirudh Sen',
        rating: 5,
        date: '21 Aug 2026',
        title: 'Outstanding STEM teaching kit for beginner coders',
        comment: 'Purchased for our college robotics club workshop for mentoring school students. The build instructions are crystal clear and the sensors work reliably.',
        verifiedPurchase: true,
        userType: 'Robotics Mentor / Student Lead',
        helpfulCount: 31
      }
    ],
    qaList: [
      {
        id: 'qa-toy-1',
        question: 'Do I need soldering tools to assemble this kit?',
        askedBy: 'Harshita G.',
        date: '11 Aug 2026',
        answer: 'No soldering is required! All components use plug-and-play color-coded RJ11 connectors and standard thumbscrews with the included screwdriver.',
        answeredBy: 'RoboCrafters Engineer',
        isSellerAnswer: true,
        votes: 45
      }
    ],
    trustSignals: {
      returnPolicy: '10 Days Replacement for any missing or defective parts',
      warranty: '1 Year Manufacturer Technical Warranty on motors and PCB mainboard',
      seller: {
        name: 'RoboCrafters Official STEM Hub',
        rating: 4.9,
        salesCount: '15,400+ Kits Sold',
        isVerified: true,
        shipsFrom: 'Hyderabad Science Park Center',
        gstin: '36AACCR7812M1ZY'
      },
      certifications: ['BIS IS 9873 Certified', 'CE Approved', 'ASTM F963 Lab Tested']
    },
    seo: {
      metaTitle: 'CyberBot 3-in-1 Coding Robotics Kit - Scratch & Python STEM Toy',
      metaDescription: 'Order CyberBot 3-in-1 STEM robotics kit for students and kids. Ultrasonic sensors, Bluetooth wireless coding with student discount.',
      urlSlug: 'cyberbot-coding-robotics-kit-3in1',
      canonicalUrl: 'https://campusmart.store/products/toys/cyberbot-coding-robotics-kit-3in1',
      keywords: ['STEM toys', 'robotics kit', 'coding for kids', 'arduino compatible', 'educational robotics']
    },
    crossSellIds: ['mob-apex-pro', 'spo-jersey-ultradri'],
    tags: ['STEM', 'Robotics', 'Educational', 'Electronics', 'Coding']
  },

  // ==========================================
  // COSMETICS & SKINCARE
  // ==========================================
  {
    id: 'cos-serum-hydra',
    sku: 'COS-HYDRA-SER-04',
    name: 'HydraGlow 10% Niacinamide + Ceramide Barrier Serum',
    brand: 'Aura Derma Lab',
    category: 'cosmetics',
    subcategory: 'Skincare & Serums',
    mrp: 1199,
    sellingPrice: 699,
    discountPercentage: 42,
    currency: '₹',
    taxInfo: 'Inclusive of all applicable cosmetics GST (18%)',
    inStock: true,
    stockQuantity: 95,
    badge: 'Dorm Skincare Favorite',
    studentDiscountEligible: true,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1608248597359-07b97368a417?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80'
    ],
    views360: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597359-07b97368a417?auto=format&fit=crop&w=800&q=80'
    ],
    shortSummary: 'Non-sticky daily lightweight serum formulated to repair damaged skin barriers, fade acne marks, control excess sebum, and provide 72-hour deep hydration.',
    detailedDescription: 'Clinically tested for late-night college study skin fatigue, screen blue-light exposure, and hostel water-related breakout concerns. Blends 10% pure Niacinamide (Vitamin B3) with 5 Essential Ceramide complexes (EOP, NP, AP, AS, NS) and 2% multi-molecular Hyaluronic Acid for deep cellular nourishment without clogging pores.',
    bulletHighlights: [
      '10% Pure Niacinamide visibly reduces blemishes, enlarged pores & post-acne marks',
      '5 Essential Ceramide Complex strengthens lipid barrier against pollutants and hard water',
      '2% Multi-molecular Hyaluronic Acid deeply hydrates dermis without sticky residue',
      'Centella Asiatica (Cica) and Green Tea extract soothe redness and inflammation',
      '100% Fragrance-Free, Alcohol-Free, Essential Oil-Free, and Non-Comedogenic',
      'Safe for sensitive, acne-prone, oily, and dry skin types'
    ],
    cosmeticsSpecs: {
      ingredientsList: [
        'Aqua (Purified Water)',
        'Niacinamide (Vitamin B3 10%)',
        'Glycerin',
        'Ceramide NP',
        'Ceramide AP',
        'Ceramide EOP',
        'Phytosphingosine',
        'Sodium Hyaluronate (Multi-molecular 2%)',
        'Centella Asiatica (Cica) Leaf Extract',
        'Camellia Sinensis (Green Tea) Leaf Extract',
        'Zinc PCA (1%)',
        'Panthenol (Pro-Vitamin B5)',
        'Allantoin',
        'Phenoxyethanol & Ethylhexylglycerin'
      ],
      keyActives: [
        { name: 'Niacinamide (Vitamin B3)', percentage: '10.0%', benefit: 'Refines pore texture, balances sebum, and fades dark spots' },
        { name: '5x Ceramide Complex', percentage: '1.5%', benefit: 'Restores skin lipid moisture barrier and prevents transepidermal water loss' },
        { name: 'Zinc PCA', percentage: '1.0%', benefit: 'Regulates oil secretion and inhibits acne-causing bacteria' },
        { name: 'Multi-molecular Hyaluronic Acid', percentage: '2.0%', benefit: 'Penetrates multiple skin layers for bouncy, plump hydration' }
      ],
      skinSuitability: ['All Skin Types', 'Oily & Combination Skin', 'Acne-Prone & Blemish-Prone', 'Sensitive Skin'],
      expiryDate: 'October 2028 (36 Months from MFG)',
      batchNumber: 'ADL-2026-HYD089',
      shelfLifePAO: '12M (12 Months after opening)',
      dermatologicallyTested: true,
      certifications: [
        'Dermatologist Tested & Approved',
        '100% Vegan (PETA Approved)',
        'Cruelty-Free (No Animal Testing)',
        'Paraben & Sulfate Free',
        'Non-Comedogenic (Won\'t Clog Pores)'
      ],
      usageInstructions: 'After cleansing, apply 2-3 drops onto damp face and neck. Gently pat until absorbed. Follow with moisturizer and sunscreen during the day. Use morning & evening.',
      shadeHex: '#f8fafc'
    },
    hasVariants: true,
    variantType: 'size_color',
    variants: [
      {
        id: 'var-cos-30ml',
        name: 'Standard Travel Edition (30ml)',
        sku: 'COS-HYDRA-30ML',
        size: '30ml / 1.01 fl. oz',
        price: 699,
        mrp: 1199,
        stock: 60,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'var-cos-50ml',
        name: 'Super Value Dorm Edition (50ml)',
        sku: 'COS-HYDRA-50ML',
        size: '50ml / 1.69 fl. oz',
        price: 999,
        mrp: 1799,
        stock: 35,
        image: 'https://images.unsplash.com/photo-1608248597359-07b97368a417?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    rating: 4.8,
    ratingCount: 1150,
    ratingBreakdown: { 5: 920, 4: 170, 3: 40, 2: 12, 1: 8 },
    reviews: [
      {
        id: 'rev-cos-1',
        author: 'Shreya Roy',
        rating: 5,
        date: '22 Aug 2026',
        title: 'Cleared my hostel water breakouts within 2 weeks!',
        comment: 'I was getting terrible hormonal breakouts and dull skin after moving to college hostel. This serum calmed the redness without feeling greasy in hot weather.',
        verifiedPurchase: true,
        userType: 'Fresher Student - Medical Sciences',
        helpfulCount: 52
      }
    ],
    qaList: [
      {
        id: 'qa-cos-1',
        question: 'Can I use this serum with Vitamin C or Retinol?',
        askedBy: 'Tanvi S.',
        date: '16 Aug 2026',
        answer: 'Yes! Niacinamide and Ceramides are soothing barrier ingredients that pair safely with Vitamin C in the AM and Retinol in the PM.',
        answeredBy: 'Aura Derma Lab Cosmetic Scientist',
        isSellerAnswer: true,
        votes: 62
      }
    ],
    trustSignals: {
      returnPolicy: '7 Days Replacement for damaged/broken seals or incorrect item',
      warranty: '100% Authentic Product Guarantee Direct from Aura Derma Lab',
      seller: {
        name: 'Aura Derma Lab Direct',
        rating: 4.9,
        salesCount: '58,000+ Units Shipped',
        isVerified: true,
        shipsFrom: 'Ahmedabad Pharma Logistics',
        gstin: '24AACCA9910D1ZX'
      },
      certifications: ['FDA Registered Lab', 'GMP Certified Manufacturing', 'Cruelty-Free International', 'Dermatologist Certified']
    },
    seo: {
      metaTitle: 'HydraGlow 10% Niacinamide + Ceramide Barrier Serum - Aura Derma Lab',
      metaDescription: 'Shop HydraGlow 10% Niacinamide serum with student discount. Fades acne marks, repairs damaged barrier with 5 ceramides and hyaluronic acid.',
      urlSlug: 'hydraglow-10-niacinamide-ceramide-barrier-serum',
      canonicalUrl: 'https://campusmart.store/products/cosmetics/hydraglow-10-niacinamide-ceramide-barrier-serum',
      keywords: ['niacinamide serum', 'ceramide barrier', 'acne marks', 'student skincare', 'cruelty free']
    },
    crossSellIds: ['cos-lipstick-velvet', 'mob-apex-pro'],
    tags: ['Skincare', 'Niacinamide', 'Ceramides', 'Cruelty-Free', 'Derm Approved']
  },

  {
    id: 'cos-lipstick-velvet',
    sku: 'COS-LIP-VELVET-05',
    name: 'Velvet Matte Longwear Lip Crayon',
    brand: 'Aura Derma Lab',
    category: 'cosmetics',
    subcategory: 'Makeup & Lips',
    mrp: 899,
    sellingPrice: 499,
    discountPercentage: 44,
    currency: '₹',
    taxInfo: 'Inclusive of all applicable taxes',
    inStock: true,
    stockQuantity: 110,
    badge: '12H Non-Transfer',
    studentDiscountEligible: true,
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80'
    ],
    views360: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80'
    ],
    shortSummary: 'Ultra-pigmented, feather-light matte lip color infused with Vitamin E, Shea Butter, and Jojoba Oil for 12-hour comfortable transfer-proof wear.',
    detailedDescription: 'One-swipe saturated pigment that glides on like silk and sets into a non-drying, weightless velvet matte finish. Enriched with botanical oils to keep lips moisturized throughout lectures, campus outings, and club events.',
    bulletHighlights: [
      '12-Hour Transfer-Proof, Mask-Proof, and Smudge-Proof formula',
      'Infused with Vitamin E, Organic Jojoba Oil, and Shea Butter',
      'Weightless airy texture that never cracks or flakes on lips',
      'Precision crayon tip for sharp lip contouring and filling',
      'Cruelty-Free, Paraben-Free, and 100% Lead-Free safe pigments'
    ],
    cosmeticsSpecs: {
      ingredientsList: [
        'Isododecane',
        'Synthetic Wax',
        'Butyrospermum Parkii (Shea Butter)',
        'Simmondsia Chinensis (Jojoba) Seed Oil',
        'Tocopheryl Acetate (Vitamin E)',
        'Silica Dimethyl Silylate',
        'Caprylic/Capric Triglyceride',
        'CI 77491 (Iron Oxides)',
        'CI 15850 (Red 7 Lake)',
        'CI 77891 (Titanium Dioxide)'
      ],
      keyActives: [
        { name: 'Organic Jojoba Oil', benefit: 'Locks in cellular moisture and prevents chapping' },
        { name: 'Vitamin E & Shea Butter', benefit: 'Deeply conditions and provides antioxidant defense' }
      ],
      skinSuitability: ['All Skin Tones & Lip Types'],
      expiryDate: 'July 2028 (36 Months)',
      batchNumber: 'ADL-2026-LIP301',
      shelfLifePAO: '24M (24 Months after opening)',
      dermatologicallyTested: true,
      certifications: [
        '100% Vegan Formula',
        'Cruelty-Free (PETA Approved)',
        'Lead-Free & Heavy-Metal Tested',
        'Dermatologically Safe'
      ],
      usageInstructions: 'Line lips using the precision tapered tip, then fill in color with single smooth glide. Let set for 60 seconds.',
      shadeHex: '#be123c'
    },
    hasVariants: true,
    variantType: 'shade',
    variants: [
      {
        id: 'var-lip-ruby',
        name: 'Shade 01 - Campus Crimson (Ruby Red)',
        sku: 'COS-LIP-SHD-01',
        colorName: 'Campus Crimson',
        colorHex: '#be123c',
        price: 499,
        mrp: 899,
        stock: 45,
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'var-lip-nude',
        name: 'Shade 02 - Everyday Mocha (Nude Brown)',
        sku: 'COS-LIP-SHD-02',
        colorName: 'Everyday Mocha',
        colorHex: '#9a3412',
        price: 499,
        mrp: 899,
        stock: 40,
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'var-lip-berry',
        name: 'Shade 03 - Berry Bloom (Deep Plum)',
        sku: 'COS-LIP-SHD-03',
        colorName: 'Berry Bloom',
        colorHex: '#831843',
        price: 499,
        mrp: 899,
        stock: 25,
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    rating: 4.7,
    ratingCount: 520,
    ratingBreakdown: { 5: 390, 4: 95, 3: 25, 2: 7, 1: 3 },
    reviews: [
      {
        id: 'rev-lip-1',
        author: 'Meera Kapoor',
        rating: 5,
        date: '17 Aug 2026',
        title: 'Literally lasted through canteen coffee and 8 hours of class',
        comment: 'The shade Everyday Mocha is my holy grail nude. Does not dry out lips at all like other liquid lipsticks.',
        verifiedPurchase: true,
        userType: 'Fresher Student - Design',
        helpfulCount: 23
      }
    ],
    qaList: [
      {
        id: 'qa-lip-1',
        question: 'Does this require a sharpener or is it twist-up?',
        askedBy: 'Ritika B.',
        date: '05 Aug 2026',
        answer: 'It is a convenient retractable twist-up crayon with a built-in micro-sharpener at the base!',
        answeredBy: 'Aura Derma Lab Specialist',
        isSellerAnswer: true,
        votes: 38
      }
    ],
    trustSignals: {
      returnPolicy: '7 Days Return for intact hygienic seals',
      warranty: '100% Quality & Formulation Satisfaction Guarantee',
      seller: {
        name: 'Aura Derma Lab Direct',
        rating: 4.9,
        salesCount: '58,000+ Units Shipped',
        isVerified: true,
        shipsFrom: 'Ahmedabad Pharma Logistics',
        gstin: '24AACCA9910D1ZX'
      },
      certifications: ['Cruelty-Free Certified', 'Vegan Approved', 'FDA Cleared Formulation']
    },
    seo: {
      metaTitle: 'Velvet Matte Longwear Lip Crayon - Aura Derma Lab',
      metaDescription: 'Shop 12-hour transfer-proof velvet matte lip crayon with Vitamin E & Jojoba Oil. Best student beauty deal with fast delivery.',
      urlSlug: 'velvet-matte-longwear-lip-crayon',
      canonicalUrl: 'https://campusmart.store/products/cosmetics/velvet-matte-longwear-lip-crayon',
      keywords: ['matte lipstick', 'lip crayon', 'transfer proof makeup', 'student beauty']
    },
    crossSellIds: ['cos-serum-hydra', 'mob-stellar-note'],
    tags: ['Makeup', 'Lips', 'Transfer-Proof', 'Vegan', 'Student Deal']
  },

  // ==========================================
  // NEW EXPANDED PRODUCTS
  // ==========================================
  {
    id: 'mob-swift-lite',
    sku: 'MOB-SWIFT-5G-128',
    name: 'SwiftLite 5G Ultra Student Edition',
    brand: 'Velocity Mobiles',
    category: 'mobile',
    subcategory: 'Budget 5G Smartphones',
    mrp: 22999,
    sellingPrice: 16999,
    discountPercentage: 26,
    currency: '₹',
    taxInfo: 'Inclusive of 18% GST with Official Campus Warranty',
    inStock: true,
    stockQuantity: 38,
    badge: 'Best Value Under ₹18k',
    studentDiscountEligible: true,
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1200&q=80'
    ],
    views360: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
    ],
    shortSummary: 'Unbeatable student 5G smartphone featuring MediaTek Dimensity 7200, huge 6000mAh 2-day battery, and 120Hz Fluid AMOLED display.',
    detailedDescription: 'Tailored for university students who require reliable 2-day battery endurance for lecture recording, PDF reading, notes, and uninterrupted 5G hotspot tethering. Packed with stereo Dolby Atmos speakers and 45W FlashCharge.',
    bulletHighlights: [
      'MediaTek Dimensity 7200 Octa-Core 4nm 5G Processor',
      '6000mAh Mega Battery with 45W Type-C QuickCharge in box',
      '6.67-inch FHD+ 120Hz AMOLED with Eye Care Certification',
      '64MP OIS Anti-Shake Camera + 16MP Clear Video Calling Cam',
      'Expandable Storage up to 1TB via Dedicated MicroSD Slot',
      'Dual 5G SIM with 14 Global 5G Band Support'
    ],
    mobileSpecs: {
      ramOptions: ['8GB LPDDR4X', '12GB LPDDR4X'],
      storageOptions: ['128GB UFS 3.1', '256GB UFS 3.1'],
      processor: 'MediaTek Dimensity 7200 5G (2.8GHz Octa-Core)',
      camera: {
        rear: '64MP Primary with OIS + 8MP Ultra-wide 118° + 2MP Macro',
        front: '16MP HDR Center Punch-Hole Camera',
        features: ['Campus Night Mode', 'Document Scanner 2.0', '1080p 60fps Video']
      },
      battery: {
        capacity: '6000 mAh High-Capacity Li-Polymer',
        chargingSpeed: '45W FlashCharge (0-100% in 55m)',
        type: 'Dual-cell Safe Li-ion Polymer'
      },
      screen: {
        size: '6.67-inch (16.94 cm)',
        resolution: '2400 x 1080 FHD+ AMOLED',
        panelType: 'Super AMOLED 1000 nits Peak',
        refreshRate: '120Hz Adaptive',
        brightness: '1000 nits Peak / 600 nits Typical'
      },
      os: 'VelocityOS 15 (Based on Android 15, Zero Bloatware)',
      updatePolicy: '2 Major Android OS Upgrades + 3 Years Security Patches',
      networkBands: ['5G SA/NSA (n1/n3/n5/n8/n28/n77/n78)', '4G Dual VoLTE', 'Wi-Fi 6', 'Bluetooth 5.3'],
      simType: 'Dual 5G Nano-SIM + Dedicated MicroSD Slot',
      imeiWarranty: 'Dual IMEI Registered with 1 Year Manufacturer Warranty'
    },
    hasVariants: true,
    variantType: 'storage_color',
    variants: [
      {
        id: 'var-swift-8-128-cyan',
        name: 'Cosmic Cyan / 8GB + 128GB',
        sku: 'MOB-SWIFT-8-128-CYAN',
        colorName: 'Cosmic Cyan',
        colorHex: '#06b6d4',
        ram: '8GB',
        storage: '128GB',
        price: 16999,
        mrp: 22999,
        stock: 24,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'var-swift-12-256-black',
        name: 'Midnight Obsidian / 12GB + 256GB',
        sku: 'MOB-SWIFT-12-256-BLK',
        colorName: 'Midnight Obsidian',
        colorHex: '#0f172a',
        ram: '12GB',
        storage: '256GB',
        price: 19499,
        mrp: 25999,
        stock: 14,
        image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    rating: 4.8,
    ratingCount: 310,
    ratingBreakdown: { 5: 240, 4: 55, 3: 10, 2: 3, 1: 2 },
    reviews: [
      {
        id: 'rev-swift-1',
        author: 'Arjun Sen',
        rating: 5,
        date: '22 Aug 2026',
        title: '6000mAh battery easily lasts 2 full college days!',
        comment: 'I take notes in class, record audio, hotspot to my laptop, and still have 40% battery left at 10 PM. Best phone for hostellers.',
        verifiedPurchase: true,
        userType: 'Engineering Student',
        helpfulCount: 34
      }
    ],
    qaList: [
      {
        id: 'qa-swift-1',
        question: 'Does it come with a charger in the box?',
        askedBy: 'Sunil K.',
        date: '14 Aug 2026',
        answer: 'Yes, a 45W SuperFlash fast charger and braided Type-C cable are included right in the box.',
        answeredBy: 'Velocity Official Store',
        isSellerAnswer: true,
        votes: 19
      }
    ],
    trustSignals: {
      returnPolicy: '7 Days Replacement Policy for technical defects',
      warranty: '1 Year Brand Warranty + 6 Months Charger Warranty',
      seller: {
        name: 'Velocity Electronics Direct',
        rating: 4.8,
        salesCount: '19,500+ Campus Orders',
        isVerified: true,
        shipsFrom: 'Bengaluru Tech Warehouse',
        gstin: '29ABCDE1234F1Z5'
      },
      certifications: ['BIS Certified', 'TUV Rheinland Low Blue Light']
    },
    seo: {
      metaTitle: 'SwiftLite 5G Ultra - 6000mAh Student Smartphone | CampusMart',
      metaDescription: 'Buy SwiftLite 5G with Dimensity 7200, 6000mAh battery, and 120Hz AMOLED. Exclusive student discount with same-day campus delivery.',
      urlSlug: 'swiftlite-5g-ultra-student-phone',
      canonicalUrl: 'https://campusmart.store/products/mobile/swiftlite-5g-ultra',
      keywords: ['5G phone under 20000', 'student phone', 'long battery phone', '6000mah']
    },
    crossSellIds: ['mob-apex-pro', 'spo-shoes-aero'],
    tags: ['5G', '6000mAh', 'AMOLED', 'Dimensity', 'Student Budget']
  },

  {
    id: 'spo-yoga-pro',
    sku: 'SPO-YOGA-6MM-PRO',
    name: 'AeroGrip Pro Dual-Texture Eco Yoga & Fitness Mat',
    brand: 'AeroStrike',
    category: 'sports',
    subcategory: 'Fitness & Recovery',
    mrp: 2499,
    sellingPrice: 1299,
    discountPercentage: 48,
    currency: '₹',
    taxInfo: 'Inclusive of GST & Carrying Strap included',
    inStock: true,
    stockQuantity: 50,
    badge: 'Dorm Workout Essential',
    studentDiscountEligible: true,
    images: [
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80'
    ],
    views360: [
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80'
    ],
    shortSummary: '6mm high-density eco-TPE exercise mat with laser-engraved posture alignment lines, sweat-proof non-slip grip, and carry strap.',
    detailedDescription: 'Ideal for dorm room workouts, yoga sessions, HIIT, and hostel floor fitness routines. 6mm thick cushioning absorbs joint pressure without compromising balance. Includes free carrying strap for hostel-to-gym transport.',
    bulletHighlights: [
      '6mm High-Density Cushioning for Joint & Knee Protection',
      'Dual-Sided Anti-Skid Textures (Hex-Grip Base + Wave Top)',
      'Laser-Etched Alignment Lines for Perfect Pose Posture',
      '100% Eco-Friendly Non-Toxic Recyclable TPE Material',
      'Waterproof & Sweat-Resistant (Easy Wipe Clean with Towel)',
      'Complimentary Travel Shoulder Strap Included'
    ],
    sportsSpecs: {
      sportType: 'Yoga, Calisthenics, Pilates, Floor Stretches, HIIT',
      gender: 'Unisex',
      material: '100% Premium Eco TPE (Latex-Free, PVC-Free)',
      suitableAgeGroup: 'Teens & Adults (15+ yrs)',
      sizeChart: [
        { size: 'Standard (6mm)', chest: 'N/A', waist: 'N/A', length: 'Length: 183 cm (72 in) x Width: 61 cm (24 in)' }
      ],
      fitType: 'Ergonomic 6mm Shock-Absorbing Cushion',
      careInstructions: 'Wipe with damp cloth and mild cleanser; air dry completely before rolling.',
      gripFlexSpecs: 'Dual-texture non-slip grip with high rebound elasticity'
    },
    hasVariants: true,
    variantType: 'size_color',
    variants: [
      {
        id: 'var-mat-teal',
        name: 'Ocean Teal / Midnight Blue (6mm)',
        sku: 'SPO-YOGA-TEAL-6MM',
        colorName: 'Ocean Teal',
        colorHex: '#0d9488',
        size: '6mm Standard (183x61cm)',
        price: 1299,
        mrp: 2499,
        stock: 30,
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'var-mat-plum',
        name: 'Plum Purple / Slate Grey (6mm)',
        sku: 'SPO-YOGA-PLUM-6MM',
        colorName: 'Plum Purple',
        colorHex: '#701a75',
        size: '6mm Standard (183x61cm)',
        price: 1299,
        mrp: 2499,
        stock: 20,
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    rating: 4.9,
    ratingCount: 180,
    ratingBreakdown: { 5: 155, 4: 20, 3: 4, 2: 1, 1: 0 },
    reviews: [
      {
        id: 'rev-mat-1',
        author: 'Ananya Deshmukh',
        rating: 5,
        date: '19 Aug 2026',
        title: 'Zero slipping during morning workouts in my hostel',
        comment: 'The laser alignment marks really help keep squats and downward dogs straight. Rolls up super small and does not smell like rubber.',
        verifiedPurchase: true,
        userType: 'Medical College Student',
        helpfulCount: 21
      }
    ],
    qaList: [
      {
        id: 'qa-mat-1',
        question: 'Does this mat smell like cheap rubber when unpacked?',
        askedBy: 'Pooja V.',
        date: '10 Aug 2026',
        answer: 'No, this mat is made of odorless, non-toxic TPE with zero harsh chemicals or latex odors.',
        answeredBy: 'AeroStrike Fitness Gear',
        isSellerAnswer: true,
        votes: 15
      }
    ],
    trustSignals: {
      returnPolicy: '7 Days Free Replacement for manufacturing flaws',
      warranty: '1 Year Warranty against tearing and delamination',
      seller: {
        name: 'AeroStrike Fitness Equipment',
        rating: 4.9,
        salesCount: '12,000+ Units Sold',
        isVerified: true,
        shipsFrom: 'Pune Sports Distribution',
        gstin: '27AABCA1299D1ZX'
      },
      certifications: ['RoHS Certified Eco-Safe', 'CE Tested Non-Toxic']
    },
    seo: {
      metaTitle: 'AeroGrip Pro Yoga Mat 6mm Non-Slip - AeroStrike',
      metaDescription: 'Shop premium 6mm eco-TPE yoga mat with alignment guides for student workouts and gym routines. Same day campus delivery.',
      urlSlug: 'aerogrip-pro-yoga-mat-6mm',
      canonicalUrl: 'https://campusmart.store/products/sports/aerogrip-pro-yoga-mat',
      keywords: ['yoga mat', 'exercise mat', 'non-slip mat', 'hostel fitness']
    },
    crossSellIds: ['spo-shoes-aero', 'spo-jersey-apex'],
    tags: ['Fitness', 'Yoga', 'Workout', 'Hostel Gym', 'Eco Friendly']
  },

  {
    id: 'cos-sunscreen-aqua',
    sku: 'COS-AQUA-SUN-SPF50',
    name: 'AquaShield SPF 50+ PA++++ Invisible Gel Sunscreen',
    brand: 'Aura Derma Lab',
    category: 'cosmetics',
    subcategory: 'Sun Protection & Skincare',
    mrp: 899,
    sellingPrice: 599,
    discountPercentage: 33,
    currency: '₹',
    taxInfo: 'Inclusive of all taxes & Dermatologist Tested',
    inStock: true,
    stockQuantity: 65,
    badge: 'Campus Daily Must-Have',
    studentDiscountEligible: true,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80'
    ],
    views360: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    shortSummary: 'Ultra-lightweight water-gel sunscreen with SPF 50+ PA++++, Hyaluronic Acid, and Cica. Zero white cast, matte finish, and sweat-resistant.',
    detailedDescription: 'Formulated specifically for Indian student climates with intense daily sun exposure walking across college campuses. Absorbs in 3 seconds leaving zero white cast, greasy sheen, or pore clogging.',
    bulletHighlights: [
      'Broad Spectrum SPF 50+ Protection against UVA & UVB Rays',
      'PA++++ Maximum Rating against Deep Skin Aging & Pigmentation',
      'Zero White Cast: Blends completely transparent on all Indian skin tones',
      'Water-Light Gel Texture infused with Niacinamide & Centella Asiatica',
      'Sweat & Water Resistant for up to 80 minutes',
      'Non-Comedogenic: Safe for acne-prone student skin'
    ],
    cosmeticsSpecs: {
      ingredientsList: [
        'Aqua (Purified Water)',
        'Octocrylene (SPF 50+ UV Filter)',
        'Ethylhexyl Salicylate (UVB Shield)',
        'Niacinamide (Vitamin B3 2%)',
        'Centella Asiatica (Cica) Leaf Extract',
        'Sodium Hyaluronate (Hyaluronic Acid)',
        'Tocopheryl Acetate (Vitamin E)',
        'Phenoxyethanol'
      ],
      keyActives: [
        { name: 'Broad Spectrum UV Filters (SPF 50+ PA++++)', percentage: '12.0%', benefit: 'Shields skin against sunburn, tanning, and UVA/UVB cellular damage' },
        { name: 'Niacinamide', percentage: '2.0%', benefit: 'Brightens sun-exposed skin and balances midday oiliness' },
        { name: 'Centella Asiatica (Cica)', percentage: '1.0%', benefit: 'Calms redness, irritation, and soothing campus sun heat' }
      ],
      skinSuitability: ['All Skin Types', 'Acne-Prone & Oily Skin', 'Sensitive Skin', 'Normal / Dry'],
      expiryDate: 'August 2028 (36 Months from MFG)',
      batchNumber: 'ADL-2026-SUN042',
      shelfLifePAO: '12M (12 Months after opening)',
      dermatologicallyTested: true,
      certifications: [
        'Dermatologist Tested & Approved',
        '100% Vegan (PETA Approved)',
        'Zero White Cast Certified',
        'Non-Comedogenic & Oil-Free',
        'Sweat-Resistant 80 Minutes'
      ],
      usageInstructions: 'Apply generously 15 minutes before stepping out into the sun. Reapply every 3-4 hours if sweating or after sports.',
      shadeHex: '#ffffff'
    },
    hasVariants: true,
    variantType: 'size_color',
    variants: [
      {
        id: 'var-sun-50ml',
        name: 'Standard Daily Pump (50ml)',
        sku: 'COS-AQUA-SUN-50ML',
        size: '50ml / 1.7 fl. oz',
        price: 599,
        mrp: 899,
        stock: 45,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'var-sun-100ml',
        name: 'Semester Value Twin Pack (100ml)',
        sku: 'COS-AQUA-SUN-100ML',
        size: '100ml (2 x 50ml Twin)',
        price: 999,
        mrp: 1699,
        stock: 20,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    rating: 4.9,
    ratingCount: 420,
    ratingBreakdown: { 5: 380, 4: 30, 3: 8, 2: 2, 1: 0 },
    reviews: [
      {
        id: 'rev-sun-1',
        author: 'Simran Walia',
        rating: 5,
        date: '25 Aug 2026',
        title: 'Finally a sunscreen that does not make my face oily or sweaty in class',
        comment: 'Absorbs instantly like water and leaves no white patch at all. Perfect under moisturizer before heading to 9 AM lectures.',
        verifiedPurchase: true,
        userType: 'Fresher Student',
        helpfulCount: 45
      }
    ],
    qaList: [
      {
        id: 'qa-sun-1',
        question: 'Does this leave white residue on beard or darker skin tones?',
        askedBy: 'Rohan M.',
        date: '18 Aug 2026',
        answer: 'Not at all! It is a 100% transparent chemical gel that disappears completely upon application.',
        answeredBy: 'Aura Derma Lab Specialist',
        isSellerAnswer: true,
        votes: 27
      }
    ],
    trustSignals: {
      returnPolicy: '7 Days Return for intact safety seals',
      warranty: 'Dermatologically Tested & Quality Guaranteed',
      seller: {
        name: 'Aura Derma Lab Direct',
        rating: 4.9,
        salesCount: '62,000+ Units Shipped',
        isVerified: true,
        shipsFrom: 'Ahmedabad Pharma Logistics',
        gstin: '24AACCA9910D1ZX'
      },
      certifications: ['Dermatologist Approved', 'Cruelty-Free Certified', 'Non-Comedogenic']
    },
    seo: {
      metaTitle: 'AquaShield SPF 50+ Gel Sunscreen - Aura Derma Lab',
      metaDescription: 'Buy AquaShield SPF 50+ PA++++ invisible gel sunscreen with zero white cast. Student discount and rapid hostel delivery on CampusMart.',
      urlSlug: 'aquashield-spf50-gel-sunscreen',
      canonicalUrl: 'https://campusmart.store/products/cosmetics/aquashield-spf50-gel-sunscreen',
      keywords: ['gel sunscreen', 'spf 50', 'no white cast', 'student skincare']
    },
    crossSellIds: ['cos-serum-hydra', 'cos-lip-velvet'],
    tags: ['Sunscreen', 'SPF 50', 'Skincare', 'Zero White Cast', 'Vegan']
  }
];

export const CATEGORIES_META = [
  {
    id: 'mobile' as const,
    name: 'Mobile Phones',
    icon: 'Smartphone',
    count: '24+ Models',
    desc: 'Flagship 5G, Student Budgets, Fast Chargers & AMOLED Displays',
    color: 'from-blue-600 to-indigo-600',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'sports' as const,
    name: 'Sports & Athletics',
    icon: 'Activity',
    count: '60+ Gear Items',
    desc: 'NitroFoam Running Shoes, Quick-Dry Apparel & Court Equipment',
    color: 'from-emerald-600 to-teal-600',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'toys' as const,
    name: 'Toys & STEM Learning',
    icon: 'Bot',
    count: '35+ Kits',
    desc: '3-in-1 Robotics, Coding Kits, Safety-Certified STEM Projects',
    color: 'from-amber-500 to-orange-600',
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cosmetics' as const,
    name: 'Cosmetics & Skincare',
    icon: 'Sparkles',
    count: '48+ Formulations',
    desc: 'Derm-Tested Serums, 12H Matte Crayons, 100% Vegan & Clean',
    color: 'from-rose-500 to-pink-600',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_ORDERS: import('../types/product').Order[] = [
  {
    id: 'ORD-2026-8891',
    date: '28 Aug 2026',
    items: [
      {
        product: MOCK_PRODUCTS[0],
        selectedVariant: MOCK_PRODUCTS[0].variants[0],
        quantity: 1
      },
      {
        product: MOCK_PRODUCTS[4],
        selectedVariant: MOCK_PRODUCTS[4].variants[0],
        quantity: 1
      }
    ],
    totalAmount: 55498,
    discountAmount: 15400,
    studentSavings: 1200,
    shippingAddress: {
      fullName: 'Rahul Tomar',
      campusDorm: 'Aryabhatta Boys Hostel - Block C, Room 314',
      street: 'University Campus Road, Tech Zone',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560100',
      phone: '+91 98765 43210'
    },
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    deliveryStatus: 'Out for Delivery',
    expectedDelivery: 'Today, 2:30 PM',
    returnEligibleUntil: '07 Sep 2026',
    trackingSteps: [
      { title: 'Order Placed & Verified', location: 'CampusMart Cloud', timestamp: '28 Aug, 10:14 AM', completed: true, current: false },
      { title: 'Dispatched from Central Hub', location: 'Bengaluru Logistics Center', timestamp: '29 Aug, 04:30 AM', completed: true, current: false },
      { title: 'Arrived at Campus Delivery Hub', location: 'Electronic City Sub-Hub', timestamp: '30 Aug, 08:15 AM', completed: true, current: false },
      { title: 'Out for Delivery by Rider (Amit S.)', location: 'University Main Gate Area', timestamp: '30 Aug, 11:20 AM', completed: true, current: true },
      { title: 'Delivered to Student Dorm', location: 'Hostel Block C Desk', timestamp: 'Estimated Today 2:30 PM', completed: false, current: false }
    ]
  }
];
