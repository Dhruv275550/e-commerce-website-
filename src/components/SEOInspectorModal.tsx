import React, { useState } from 'react';
import { 
  X, Search, Globe, Code, Copy, Check, 
  Share2, Tag, ShieldCheck 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SEOInspectorModal: React.FC = () => {
  const { isSEOOpen, setIsSEOOpen, seoProduct } = useShop();
  const [activeTab, setActiveTab] = useState<'serp' | 'jsonld' | 'opengraph'>('serp');
  const [copied, setCopied] = useState(false);

  if (!isSEOOpen || !seoProduct) return null;

  const jsonLdData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": seoProduct.name,
    "image": seoProduct.images,
    "description": seoProduct.seo.metaDescription,
    "sku": seoProduct.sku,
    "brand": {
      "@type": "Brand",
      "name": seoProduct.brand
    },
    "offers": {
      "@type": "Offer",
      "url": `https://campusecommerce.edu/products/${seoProduct.seo.slug}`,
      "priceCurrency": seoProduct.currency === '₹' ? 'INR' : 'USD',
      "price": seoProduct.sellingPrice,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": seoProduct.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": seoProduct.trustSignals.seller.name
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": seoProduct.rating,
      "reviewCount": seoProduct.ratingCount
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonLdData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-lg text-slate-900">
                  SEO & Structured Data Inspector
                </h3>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                  Schema.org v14.0
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Inspect live search engine metadata, URL slug, and JSON-LD schema
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSEOOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 border-b border-slate-200 pb-3 mb-5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('serp')}
            className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'serp' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>SERP Google Preview</span>
          </button>
          <button
            onClick={() => setActiveTab('jsonld')}
            className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'jsonld' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>JSON-LD Schema</span>
          </button>
          <button
            onClick={() => setActiveTab('opengraph')}
            className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'opengraph' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>OpenGraph Social Preview</span>
          </button>
        </div>

        {/* Tab 1: Google SERP Preview */}
        {activeTab === 'serp' && (
          <div className="space-y-5 text-xs">
            <div className="p-4 bg-white rounded-2xl border border-slate-300 shadow-xs space-y-1 font-sans">
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-bold">C</div>
                <span>campusecommerce.edu › products › {seoProduct.seo.slug}</span>
              </div>
              <h4 className="text-base text-blue-800 hover:underline cursor-pointer font-medium leading-snug">
                {seoProduct.seo.metaTitle}
              </h4>
              <div className="flex items-center gap-2 text-slate-600 text-[11px] font-mono-num">
                <span className="text-amber-500 font-bold">Rating: {seoProduct.rating} ★</span>
                <span>• {seoProduct.ratingCount} reviews</span>
                <span>• {seoProduct.currency}{seoProduct.sellingPrice}</span>
                <span className="text-emerald-700 font-semibold">• In stock</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed pt-1">
                {seoProduct.seo.metaDescription}
              </p>
            </div>

            {/* Keyword tags */}
            <div>
              <div className="font-bold text-slate-800 uppercase text-[11px] tracking-wider mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-indigo-600" />
                <span>Indexed Keywords & URL Slug</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-500 text-[11px]">URL Slug:</span>
                  <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-300 text-indigo-700 font-bold">
                    /{seoProduct.seo.slug}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {seoProduct.seo.tags.map(t => (
                    <span key={t} className="bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-md font-mono text-[10px]">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: JSON-LD Structured Data */}
        {activeTab === 'jsonld' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 font-mono">
                &lt;script type="application/ld+json"&gt;
              </span>
              <button
                onClick={handleCopyJson}
                className="flex items-center gap-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1 rounded-lg transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>
            <pre className="p-4 bg-slate-950 text-emerald-400 font-mono text-[11px] rounded-2xl overflow-x-auto max-h-72 border border-slate-800">
              {JSON.stringify(jsonLdData, null, 2)}
            </pre>
          </div>
        )}

        {/* Tab 3: OpenGraph */}
        {activeTab === 'opengraph' && (
          <div className="space-y-4 text-xs">
            <div className="max-w-md mx-auto bg-slate-50 border border-slate-300 rounded-2xl overflow-hidden shadow-sm">
              <img src={seoProduct.images[0]} alt={seoProduct.name} className="w-full h-44 object-cover" />
              <div className="p-4 space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-400">campusecommerce.edu</div>
                <h5 className="font-bold text-slate-900 text-sm leading-tight">{seoProduct.seo.metaTitle}</h5>
                <p className="text-slate-500 text-[11px] line-clamp-2">{seoProduct.seo.metaDescription}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
