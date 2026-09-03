import React, { useState } from 'react';
import { 
  Database, RefreshCw, Edit3, Check, X, 
  Package, AlertTriangle, Search, Sliders,
  Home, ArrowLeft, ChevronRight 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types/product';

export const AdminPanel: React.FC = () => {
  const { 
    products, 
    updateProductStock, 
    setActiveView, 
    setSelectedProduct,
    setSelectedCategory 
  } = useShop();
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);
  const [selectedSchemaProduct, setSelectedSchemaProduct] = useState<Product | null>(null);

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.brand.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleStartEdit = (prod: Product) => {
    setEditingId(prod.id);
    setEditPrice(prod.sellingPrice);
    setEditStock(prod.stockQuantity);
  };

  const handleSaveEdit = (id: string) => {
    updateProductStock(id, editStock, editPrice);
    setEditingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Breadcrumbs & Back to Home Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 mb-6 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            id="admin-back-to-home-btn"
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
            <span className="font-bold text-slate-800">Admin SKU & Inventory Controller</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 border border-slate-800 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold">
                E-Commerce Catalog & Stock Controller
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage live SKU prices, inventory levels, and inspect schema attributes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-indigo-900/60 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1.5 rounded-xl font-mono">
              Total SKUs: {products.length}
            </span>
          </div>
        </div>
      </div>

      {/* Control Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 max-w-md bg-slate-50 px-3 py-2 rounded-xl border border-slate-300">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by SKU, Product Name, or Brand..."
            className="w-full bg-transparent text-xs outline-none"
          />
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">SKU / Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">MRP / Price</th>
                <th className="p-4">Stock Units</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(prod => {
                const isEditing = editingId === prod.id;

                return (
                  <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={prod.images[0]} alt={prod.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                        <div>
                          <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">
                            {prod.sku}
                          </span>
                          <div className="font-bold text-slate-900 text-xs mt-0.5 max-w-xs truncate">{prod.name}</div>
                          <div className="text-[10px] text-indigo-600 font-semibold">{prod.brand}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 capitalize font-semibold text-slate-700">
                      {prod.category}
                    </td>

                    <td className="p-4 font-mono">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <span className="text-slate-500">₹</span>
                          <input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(Number(e.target.value))}
                            className="w-20 p-1 bg-white border border-indigo-500 rounded text-xs font-bold"
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="font-bold text-slate-900">₹{prod.sellingPrice.toLocaleString()}</div>
                          <div className="text-[10px] text-slate-400 line-through">₹{prod.mrp.toLocaleString()}</div>
                        </div>
                      )}
                    </td>

                    <td className="p-4 font-mono">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editStock}
                          onChange={(e) => setEditStock(Number(e.target.value))}
                          className="w-16 p-1 bg-white border border-indigo-500 rounded text-xs font-bold"
                        />
                      ) : (
                        <span className="font-bold text-slate-800">{prod.stockQuantity}</span>
                      )}
                    </td>

                    <td className="p-4">
                      {prod.inStock ? (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                          In Stock
                        </span>
                      ) : (
                        <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-rose-600 rounded-full" />
                          Out of Stock
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleSaveEdit(prod.id)}
                            className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                            title="Save"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1.5 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleStartEdit(prod)}
                            className="p-1.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg"
                            title="Edit Stock & Price"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setSelectedSchemaProduct(prod)}
                            className="px-2.5 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg font-mono text-[10px] font-bold"
                          >
                            JSON Schema
                          </button>
                        </div>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schema Inspector Drawer/Modal */}
      {selectedSchemaProduct && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div>
                <h4 className="font-heading font-bold text-base text-slate-900">
                  Full Technical JSON Object
                </h4>
                <p className="text-[11px] text-slate-500">{selectedSchemaProduct.name} ({selectedSchemaProduct.sku})</p>
              </div>
              <button onClick={() => setSelectedSchemaProduct(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <pre className="p-4 bg-slate-950 text-emerald-400 font-mono text-[11px] rounded-2xl overflow-y-auto max-h-96 border border-slate-800">
              {JSON.stringify(selectedSchemaProduct, null, 2)}
            </pre>
          </div>
        </div>
      )}

    </div>
  );
};
