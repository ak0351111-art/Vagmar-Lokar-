import React, { useState } from 'react';
import { Shield, KeyRound, X, AlertCircle } from 'lucide-react';

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  expectedPin: string;
}

export const PinModal: React.FC<PinModalProps> = ({ isOpen, onClose, onSuccess, expectedPin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleDigit = (digit: string) => {
    if (pin.length < 4) {
      const next = pin + digit;
      setPin(next);
      setError(false);
      if (next.length === 4) {
        if (next === expectedPin) {
          onSuccess();
          setPin('');
        } else {
          setError(true);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  const handleClear = () => {
    setPin('');
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF6F2] border border-[#E0D2C5] rounded-2xl w-full max-w-sm p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#8C7A6D] hover:bg-[#EFE4D8] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#F4E3D7] border border-[#E5C7B2] flex items-center justify-center text-[#8C3E1F] mb-3">
            <KeyRound className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-bold text-[#3B2519] font-display">Vagmar Vault Access</h3>
          <p className="text-xs text-[#7B685B] mt-1 max-w-xs">
            Enter your 4-digit master PIN to access secret formulas, dye vats, and private patterns.
          </p>

          {/* PIN Indicators */}
          <div className="flex justify-center items-center space-x-3 my-6">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  pin.length > i
                    ? error
                      ? 'bg-red-500 border-red-600 scale-110'
                      : 'bg-[#8C3E1F] border-[#8C3E1F] scale-110'
                    : 'border-[#C8B3A4] bg-transparent'
                }`}
              />
            ))}
          </div>

          {error && (
            <div className="flex items-center space-x-1 text-red-600 text-xs mb-3 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Incorrect PIN. (Default test PIN: 1234)</span>
            </div>
          )}

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-[240px]">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
              <button
                key={num}
                onClick={() => handleDigit(num)}
                className="h-12 rounded-xl bg-white border border-[#E3D3C5] hover:bg-[#F2E5DA] active:bg-[#EAD8CA] text-lg font-semibold text-[#3B2519] shadow-2xs transition-colors"
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleClear}
              className="h-12 rounded-xl text-xs font-semibold text-[#8C7A6D] hover:bg-[#EFE4D8] transition-colors"
            >
              Clear
            </button>
            <button
              onClick={() => handleDigit('0')}
              className="h-12 rounded-xl bg-white border border-[#E3D3C5] hover:bg-[#F2E5DA] active:bg-[#EAD8CA] text-lg font-semibold text-[#3B2519] shadow-2xs transition-colors"
            >
              0
            </button>
            <button
              onClick={handleBackspace}
              className="h-12 rounded-xl text-xs font-semibold text-[#8C7A6D] hover:bg-[#EFE4D8] transition-colors"
            >
              ⌫
            </button>
          </div>

          <div className="mt-4 text-[11px] text-[#A69385]">
            Default Vault Passcode: <span className="font-mono font-bold text-[#8C3E1F]">1234</span>
          </div>
        </div>
      </div>
    </div>
  );
};
