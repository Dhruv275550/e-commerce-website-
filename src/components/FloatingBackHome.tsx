import React, { useState, useEffect } from 'react';
import { Home, ArrowLeft, ChevronLeft, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const FloatingBackHome: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    selectedProduct, 
    setSelectedProduct,
    setSelectedCategory 
  } = useShop();

  const [isVisible, setIsVisible] = useState(false);

  // Show floating back-to-home button when not on the homepage or when viewing a product
  useEffect(() => {
    const shouldShow = activeView !== 'home' || selectedProduct !== null;
    setIsVisible(shouldShow);
  }, [activeView, selectedProduct]);

  if (!isVisible) return null;

  const handleBackToHome = () => {
    setSelectedProduct(null);
    setSelectedCategory('all');
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCategory = () => {
    if (selectedProduct) {
      setSelectedCategory(selectedProduct.category);
    }
    setSelectedProduct(null);
    setActiveView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside 
      aria-label="Quick Navigation"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-center p-1.5 bg-slate-900/90 hover:bg-slate-950 backdrop-blur-md text-white rounded-2xl shadow-xl border border-slate-700/80 transition-all">
        {/* Primary Back to Home Button */}
        <button
          id="floating-back-to-home-btn"
          onClick={handleBackToHome}
          className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer group"
          title="Return to CampusMart Home Page"
        >
          <Home className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Home</span>
        </button>

        {/* If in Product Detail, also provide quick back to Category */}
        {activeView === 'product_detail' && selectedProduct && (
          <button
            id="floating-back-to-category-btn"
            onClick={handleBackToCategory}
            className="flex items-center gap-1.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/80 text-xs font-medium rounded-xl transition-colors cursor-pointer"
            title={`Return to ${selectedProduct.category} Catalog`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="capitalize">Back to {selectedProduct.category}</span>
          </button>
        )}

        {/* If in Category view, provide quick store overview jump */}
        {activeView === 'category' && (
          <button
            id="floating-back-to-all-products-btn"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedProduct(null);
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/80 text-xs font-medium rounded-xl transition-colors cursor-pointer"
            title="Reset Filters and View All Products"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-indigo-400" />
            <span>All Catalog</span>
          </button>
        )}
      </div>
    </aside>
  );
};
