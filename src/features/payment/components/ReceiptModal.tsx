import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../../lib/utils';
import type { Deal } from '../../../mocks/types';

interface ReceiptModalProps {
  deal: Deal;
  isOpen: boolean;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ deal, isOpen, onClose }) => {
  const discountedPrice = Math.floor(deal.product.originalPrice / deal.targetCount);
  const savings = Math.floor(deal.product.originalPrice - discountedPrice);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-surface w-full max-w-sm rounded-2xl shadow-floating p-6 overflow-hidden"
          >
            {/* Confetti Effect Placeholder */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 animate-pulse" />
            
            <div className="text-center mb-6">
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-16 h-16 bg-accent-success/10 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                    <CheckCircle className="text-accent-success w-8 h-8" />
                </motion.div>
                <h2 className="text-h2 font-heavy text-text-primary mb-1">결제 성공!</h2>
                <p className="text-body-md text-text-secondary">공동구매가 성공적으로 완료되었습니다.</p>
            </div>

            <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-border-light">
                    <span className="text-text-secondary">상품명</span>
                    <span className="font-bold text-text-primary text-right w-1/2 truncate">{deal.product.name}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border-light">
                    <span className="text-text-secondary">참여 인원</span>
                    <span className="font-bold text-text-primary">{deal.targetCount}명</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border-light">
                    <span className="text-text-secondary">결제 금액</span>
                    <span className="font-heavy text-primary text-lg">{formatCurrency(discountedPrice)}</span>
                </div>
                 <div className="flex justify-between items-center py-3 bg-accent-promo-green/20 px-3 rounded-lg">
                    <span className="text-accent-success font-bold text-sm">총 절약 금액</span>
                    <span className="font-heavy text-accent-success">+ {formatCurrency(savings)}</span>
                </div>
            </div>

            <button
                onClick={onClose}
                className="w-full py-3 bg-primary text-text-inverse rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
                확인
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
