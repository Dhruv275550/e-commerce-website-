import React, { useState } from 'react';
import { 
  X, User, Mail, School, Hash, Phone, MapPin, 
  ShieldCheck, Sparkles, UserPlus, Users, Trash2, 
  ArrowRight, AlertTriangle, Check, LogIn
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    userAccounts,
    userProfile,
    registerUser,
    switchUser,
    deleteUser
  } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    college: '',
    phone: '',
    campusDorm: '',
    pincode: '560100'
  });

  const [accountToDelete, setAccountToDelete] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      return;
    }

    const created = registerUser({
      name: formData.name,
      email: formData.email,
      studentId: formData.studentId,
      college: formData.college,
      phone: formData.phone,
      campusDorm: formData.campusDorm,
      pincode: formData.pincode
    });

    setSuccessMessage(`Account created for ${created.name}! Welcome to CampusMart.`);
    setTimeout(() => {
      setSuccessMessage(null);
      setIsAuthModalOpen(false);
      setFormData({
        name: '',
        email: '',
        studentId: '',
        college: '',
        phone: '',
        campusDorm: '',
        pincode: '560100'
      });
    }, 1500);
  };

  const handleConfirmDelete = (id: string) => {
    const res = deleteUser(id);
    setAccountToDelete(null);
    setSuccessMessage(res.message);
    setTimeout(() => {
      setSuccessMessage(null);
      if (userAccounts.length <= 1) {
        setIsAuthModalOpen(false);
      }
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 relative my-8">
        
        {/* Header with Modes Navigation */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
              {authModalMode === 'register' ? <UserPlus className="w-5 h-5" /> : <Users className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900">
                {authModalMode === 'register' ? 'Create Student Account' : 'Manage Student Accounts'}
              </h3>
              <p className="text-xs text-slate-500">
                {authModalMode === 'register' 
                  ? 'Get 200 Welcome Campus Coins + 10% Instant Student Off' 
                  : `Currently active: ${userProfile.name}`}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-6 text-xs font-bold">
          <button
            onClick={() => {
              setAuthModalMode('register');
              setSuccessMessage(null);
            }}
            className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              authModalMode === 'register' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create New Account</span>
          </button>

          <button
            onClick={() => {
              setAuthModalMode('manage');
              setSuccessMessage(null);
            }}
            className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              authModalMode === 'manage' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Switch / Remove ({userAccounts.length})</span>
          </button>
        </div>

        {/* Success Alert Banner */}
        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{successMessage}</span>
          </div>
        )}

        {/* Delete Confirmation Sub-Dialog */}
        {accountToDelete && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs space-y-3 animate-in fade-in">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-rose-900">Are you sure you want to remove this account?</h4>
                <p className="text-rose-700 text-[11px] mt-0.5">
                  This will permanently delete this student profile, address details, and unredeemed Campus Coins.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setAccountToDelete(null)}
                className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleConfirmDelete(accountToDelete)}
                className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete Account</span>
              </button>
            </div>
          </div>
        )}

        {/* REGISTER FORM MODE */}
        {authModalMode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Nair"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. priya.nair@campus.edu"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">College / University</label>
                <div className="relative">
                  <School className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. NIT Surathkal / IIT Delhi"
                    value={formData.college}
                    onChange={e => setFormData({ ...formData, college: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Student Roll / ID No</label>
                <div className="relative">
                  <Hash className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. 2026-CS-4190"
                    value={formData.studentId}
                    onChange={e => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Delivery Pincode</label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="560100"
                    value={formData.pincode}
                    onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 font-mono"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Hostel Dorm / Campus Address</label>
              <input
                type="text"
                placeholder="e.g. Sarojini Girls Hostel, 3rd Floor - Room 318"
                value={formData.campusDorm}
                onChange={e => setFormData({ ...formData, campusDorm: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
              />
            </div>

            {/* Perks Callout */}
            <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-2xl flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
              <div className="text-[11px] text-indigo-950">
                <span className="font-bold">Fresher Welcome Pack:</span> Get <strong>200 Campus Coins</strong> + 1-Click Hostel Gate Delivery verification enabled instantly.
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-md shadow-indigo-100 flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Student Account & Sign In</span>
              </button>
            </div>
          </form>
        )}

        {/* MANAGE / SWITCH / REMOVE ACCOUNTS MODE */}
        {authModalMode === 'manage' && (
          <div className="space-y-3 text-xs">
            <p className="text-slate-500 text-[11px]">
              Switch active session or remove accounts from this device:
            </p>

            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {userAccounts.map(account => {
                const isActive = account.id === userProfile.id;
                return (
                  <div
                    key={account.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isActive 
                        ? 'bg-indigo-50/70 border-indigo-300 ring-1 ring-indigo-200' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                        isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {account.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 truncate">{account.name}</span>
                          {isActive && (
                            <span className="text-[9px] bg-indigo-600 text-white px-1.5 py-0.5 rounded-full font-bold uppercase">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">{account.email}</div>
                        <div className="text-[10px] text-slate-400 truncate">{account.college}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {!isActive && (
                        <button
                          type="button"
                          onClick={() => {
                            switchUser(account.id);
                            setSuccessMessage(`Switched to ${account.name}`);
                            setTimeout(() => setSuccessMessage(null), 1500);
                          }}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <LogIn className="w-3 h-3" />
                          <span>Switch</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setAccountToDelete(account.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                        title="Remove / Delete Account"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setAuthModalMode('register')}
                className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Add Another Account</span>
              </button>

              <button
                type="button"
                onClick={() => setIsAuthModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
