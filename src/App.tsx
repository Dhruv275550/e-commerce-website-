import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { CategoryView } from './components/CategoryView';
import { ProductDetail } from './components/ProductDetail';
import { UserDashboard } from './components/UserDashboard';
import { AdminPanel } from './components/AdminPanel';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { CompareModal } from './components/CompareModal';
import { ARTryOnModal } from './components/ARTryOnModal';
import { SEOInspectorModal } from './components/SEOInspectorModal';
import { AuthModal } from './components/AuthModal';
import { FloatingBackHome } from './components/FloatingBackHome';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeView } = useShop();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Main Viewport */}
      <main className="flex-1">
        {activeView === 'home' && <Home />}
        {activeView === 'category' && <CategoryView />}
        {activeView === 'product_detail' && <ProductDetail />}
        {activeView === 'dashboard' && <UserDashboard />}
        {activeView === 'admin' && <AdminPanel />}
      </main>

      {/* Quick Navigation Floating Helper */}
      <FloatingBackHome />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackingModal />
      <CompareModal />
      <ARTryOnModal />
      <SEOInspectorModal />
      <AuthModal />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

export default App;
