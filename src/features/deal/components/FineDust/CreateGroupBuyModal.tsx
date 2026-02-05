import React, { useState } from 'react';
import { X, Users, Clock, Tag } from 'lucide-react';
import type { Product } from '../../../../mocks/types';

interface CreateGroupBuyModalProps {
    product: Product;
    onClose: () => void;
    onConfirm: (targetCount: number) => void;
}

export const CreateGroupBuyModal: React.FC<CreateGroupBuyModalProps> = ({ product, onClose, onConfirm }) => {
    const [targetCount, setTargetCount] = useState(3);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            
            <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 overflow-hidden animate-in fade-in zoom-in duration-200">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="mb-6">
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-full">
                        미세먼지 대비 공구
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 leading-tight">
                        공구 모집 시작하기
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        이웃들과 함께 구매하여 배송비를 아끼세요!
                    </p>
                </div>

                <div className="flex gap-4 p-4 mb-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shadow-sm shrink-0">
                        <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                            {product.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                            <Tag className="w-3.5 h-3.5" />
                            {product.category === 'food' ? '식품' : product.category === 'living' ? '생활' : '주방'}
                        </div>
                        <p className="text-base font-bold text-indigo-600">
                            {product.originalPrice.toLocaleString()}원
                        </p>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                            모집 인원 설정
                        </label>
                        <div className="flex gap-2">
                            {[2, 3, 5, 10].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setTargetCount(num)}
                                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                        targetCount === num
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 ring-2 ring-indigo-600 ring-offset-1'
                                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {num}명
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-xl text-xs font-medium">
                        <Clock className="w-4 h-4 shrink-0" />
                        24시간 동안 모집하지 못하면 자동 취소됩니다.
                    </div>
                </div>

                <button
                    onClick={() => onConfirm(targetCount)}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    <Users className="w-5 h-5" />
                    {targetCount}명 모집 시작하기
                </button>
            </div>
        </div>
    );
};
