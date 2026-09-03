import React, { useState } from 'react';
import { 
  X, Eye, Sparkles, Smartphone, RotateCcw, 
  Check, Layers, Sliders, Maximize2 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ARTryOnModal: React.FC = () => {
  const { isAROpen, setIsAROpen, arProduct } = useShop();

  const [selectedShade, setSelectedShade] = useState('#B85D5D');
  const [skinTone, setSkinTone] = useState<'fair' | 'medium' | 'deep'>('medium');
  const [scaleSize, setScaleSize] = useState<number>(100);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isRotating, setIsRotating] = useState(false);

  if (!isAROpen || !arProduct) return null;

  const handleRotate = () => {
    setRotationAngle((prev) => (prev + 45) % 360);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-lg text-slate-900">
                  Virtual 3D & Try-On Studio
                </h3>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded">
                  Web-AR Interactive
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Interactive preview for {arProduct.name}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAROpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Interactive AR Viewport */}
          <div className="relative aspect-square bg-gradient-to-b from-slate-100 to-slate-200 rounded-2xl border border-slate-300 flex items-center justify-center overflow-hidden p-6 shadow-inner">
            
            {/* Grid Overlay to simulate 3D Stage */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Virtual Try-on Canvas Visual */}
            <div 
              className="relative transition-transform duration-300 flex items-center justify-center"
              style={{
                transform: `rotate(${rotationAngle}deg) scale(${scaleSize / 100})`,
              }}
            >
              <img 
                src={arProduct.images[0]} 
                alt={arProduct.name}
                className="max-h-56 max-w-56 object-contain filter drop-shadow-2xl"
              />

              {/* Cosmetics Swatch Layer Effect */}
              {arProduct.category === 'cosmetics' && (
                <div 
                  className="absolute inset-0 opacity-35 mix-blend-color rounded-full blur-md"
                  style={{ backgroundColor: selectedShade }}
                />
              )}
            </div>

            {/* Viewport Control Badges */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-xl text-[11px] font-mono font-semibold text-slate-700 shadow-xs border border-slate-200 flex items-center gap-1.5">
              <span>Stage: {rotationAngle}°</span>
              <span>• Zoom: {scaleSize}%</span>
            </div>

            <button
              onClick={handleRotate}
              className="absolute bottom-3 right-3 bg-slate-900 hover:bg-slate-800 text-white p-2.5 rounded-xl shadow-md cursor-pointer transition-colors"
              title="Rotate 45°"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* AR Controls & Calibration Panel */}
          <div className="space-y-5 text-xs">
            
            {/* Category-Specific AR Mode */}
            {arProduct.category === 'cosmetics' && (
              <div>
                <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-2.5">
                  Virtual Skin Shade Simulator
                </h4>
                
                <div className="mb-3">
                  <div className="text-[11px] text-slate-600 mb-1.5 font-medium">Select Skin Tone Undertone:</div>
                  <div className="flex gap-2">
                    {(['fair', 'medium', 'deep'] as const).map(tone => (
                      <button
                        key={tone}
                        onClick={() => setSkinTone(tone)}
                        className={`flex-1 py-1.5 rounded-xl font-bold capitalize border transition-all ${
                          skinTone === tone ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-600 mb-1.5 font-medium">Select Active Shade:</div>
                  <div className="flex gap-2">
                    {['#B85D5D', '#D97706', '#9333EA', '#E11D48', '#BE185D'].map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedShade(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform ${
                          selectedShade === color ? 'scale-110 border-indigo-600 ring-2 ring-indigo-300' : 'border-white'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Shoe / Gadget Scale Calibration */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">
                  Scale & Dimensions Adjustment
                </h4>
                <span className="font-mono text-indigo-600 font-bold">{scaleSize}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={150}
                value={scaleSize}
                onChange={(e) => setScaleSize(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>50% (Desk size)</span>
                <span>100% (1:1 True Size)</span>
                <span>150% (Zoom Fit)</span>
              </div>
            </div>

            {/* AR Sensor Instructions */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
                <span>Camera AR Instant Placement</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Scan with any smartphone camera to project this item in your hostel room or on your desk using USDZ / GLTF web anchors.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  alert('AR Room Anchor calibrated. Place object on a flat, well-lit surface.');
                  setIsAROpen(false);
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Confirm Fit & Return to Catalog</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
