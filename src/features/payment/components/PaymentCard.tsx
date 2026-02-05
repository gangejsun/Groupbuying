import React, { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface PaymentCardProps {
  onRegister: (cardNumber: string) => void;
  isLocked?: boolean;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({ onRegister, isLocked = false }) => {
  const [number, setNumber] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLocked) return;
    // Allow only numbers
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    setNumber(val);
  };

  const handleRegister = () => {
    if (number.length === 16) {
      onRegister(number);
    }
  };

  return (
    <div className={cn(
      "relative bg-gradient-to-br from-gray-800 to-black rounded-xl p-6 text-white shadow-lg transition-all overflow-hidden",
      isLocked && "opacity-90"
    )}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />

      <div className="flex justify-between items-start mb-8 relative z-10">
        <CreditCard className="text-gray-400" />
        {isLocked && (
            <div className="flex items-center gap-1 text-accent-success text-xs font-bold bg-white/10 px-2 py-1 rounded-full border border-white/20">
                <Lock size={10} /> 안전결제 대기중
            </div>
        )}
      </div>
      
      <div className="space-y-4 relative z-10">
        <div>
            <label className="text-xs text-gray-400 mb-1 block">Card Number</label>
            <input
                type="text"
                value={isLocked ? "•••• •••• •••• " + number.slice(12) : number}
                onChange={handleChange}
                disabled={isLocked}
                placeholder="0000 0000 0000 0000"
                className="w-full bg-transparent text-xl font-mono tracking-wider placeholder:text-gray-600 focus:outline-none"
            />
        </div>
        
        {!isLocked ? (
            <button
                onClick={handleRegister}
                disabled={number.length < 16}
                className="w-full py-2 bg-primary hover:bg-red-700 text-white rounded-lg font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                결제 수단 등록하기
            </button>
        ) : (
             <p className="text-xs text-gray-400 text-center">
                 모든 인원이 모이면 자동으로 결제됩니다.
             </p>
        )}
      </div>
    </div>
  );
};
