import React, { useState, useEffect } from 'react';
import type { FineDustLevel } from '../../../../services/fineDustService';
import type { Product, Deal } from '../../../../mocks/types';
import { useAppStore } from '../../../../store/useAppStore';
import { supabase } from '../../../../lib/supabase';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { CreateGroupBuyModal } from './CreateGroupBuyModal';

interface RecommendedDustProductsProps {
    level: FineDustLevel;
    className?: string;
}

const CATEGORY_MAP: Record<FineDustLevel, string> = {
    GOOD: '야외 활동 활성화',
    NORMAL: '일상 생활 용품',
    BAD: '기관지 보호 & 청정',
    VERY_BAD: '실내 활동 필수템',
    UNKNOWN: '인기 공동구매 상품'
};

export const RecommendedDustProducts: React.FC<RecommendedDustProductsProps> = ({ level, className }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { currentUser, setActiveDeal } = useAppStore();

    useEffect(() => {
        async function fetchProducts() {
            let query = supabase.from('products').select('*');

            // Just for the demo, we fetch all and pick a few based on level
            const { data } = await query;

            if (data) {
                const mapped: Product[] = data.map(p => ({
                    id: p.id,
                    name: p.name,
                    originalPrice: Number(p.original_price),
                    imageUrl: p.image_url || '',
                    category: p.category_code as any,
                    urlKeyword: 'external',
                    unit: p.unit_info || ''
                }));

                // Shuffle or limit for different levels
                setProducts(mapped.slice(0, 2));
            }
        }
        fetchProducts();
    }, [level]);

    const handleCreateGroupBuy = (targetCount: number) => {
        if (!selectedProduct) return;

        const newDeal: Deal = {
            id: crypto.randomUUID(),
            hostId: currentUser.id,
            product: selectedProduct,
            targetCount,
            participants: [currentUser],
            status: 'recruiting',
            createdAt: new Date(),
        };

        setActiveDeal(newDeal);
        setSelectedProduct(null);
        alert('공구 모집이 시작되었습니다! 홈 화면에서 확인할 수 있습니다.');
    };

    return (
        <>
            <div className={cn("space-y-4", className)}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-lg font-bold text-gray-900">
                            {CATEGORY_MAP[level]} <span className="text-indigo-600">추천딜</span>
                        </h3>
                    </div>
                    <button className="text-sm font-medium text-gray-500 flex items-center hover:text-indigo-600 transition-colors">
                        전체보기 <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group cursor-pointer"
                            onClick={() => setSelectedProduct(product)}
                        >
                            <div className="relative aspect-square rounded-2xl overflow-hidden mb-2 bg-gray-100 shadow-sm border border-gray-100">
                                {product.imageUrl ? (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                        <ShoppingBag className="text-gray-400" />
                                    </div>
                                )}
                                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-indigo-600/90 text-[10px] font-bold text-white backdrop-blur-sm">
                                    N-Box 특가
                                </div>
                            </div>
                            <h4 className="text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                {product.name}
                            </h4>
                            <div className="flex items-center justify-between mt-2">
                                <div className="flex flex-col">
                                    <span className="text-indigo-600 text-[10px] font-bold">40%~</span>
                                    <p className="text-sm font-bold text-gray-900 leading-none">
                                        {product.originalPrice?.toLocaleString()}
                                        <span className="text-[10px] font-medium text-gray-500 ml-0.5">원</span>
                                    </p>
                                </div>
                                <button
                                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-[11px] font-extrabold rounded-lg shadow-sm shadow-indigo-200 transition-all flex items-center gap-1"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedProduct(product);
                                    }}
                                >
                                    그룹구매
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedProduct && (
                <CreateGroupBuyModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onConfirm={handleCreateGroupBuy}
                />
            )}
        </>
    );
};
