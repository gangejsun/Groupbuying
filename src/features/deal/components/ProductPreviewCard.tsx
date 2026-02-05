import React from 'react';
import type { Product } from '../../../mocks/types';
import { formatCurrency } from '../../../lib/utils';

interface ProductPreviewCardProps {
    product: Product;
    targetCount: number;
}

export const ProductPreviewCard: React.FC<ProductPreviewCardProps> = ({ product, targetCount }) => {
    const discountedPrice = Math.floor(product.originalPrice / targetCount);
    const savings = Math.floor(product.originalPrice - discountedPrice);

    return (
        <div className="bg-surface rounded-xl border border-border-light overflow-hidden shadow-sm">
            <div className="flex p-4 gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-input-bg text-text-tertiary text-[10px] font-bold rounded uppercase">
                                {product.category}
                            </span>
                            <span className="text-text-tertiary text-[10px]">{product.unit}</span>
                        </div>
                        <h3 className="text-body-md font-bold text-text-primary line-clamp-2 leading-tight mb-2">
                            {product.name}
                        </h3>
                    </div>
                    
                    <div>
                         <div className="flex items-baseline gap-2">
                             <span className="text-text-tertiary line-through text-caption decoration-text-tertiary/50">
                                 {formatCurrency(product.originalPrice)}
                             </span>
                         </div>
                         <div className="flex items-center gap-2">
                            <span className="text-primary font-heavy text-price-lg tracking-tight">
                                {formatCurrency(discountedPrice)}
                            </span>
                            <span className="text-accent-success font-bold text-[10px] bg-accent-promo-green/20 text-accent-success px-1.5 py-0.5 rounded">
                                1/{targetCount}가
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-secondary/5 px-4 py-3 flex justify-between items-center border-t border-border-light/50">
                <span className="text-text-secondary text-caption font-medium">인당 절약 금액</span>
                <span className="text-secondary font-bold text-body-md">
                    + {formatCurrency(savings)} SAVE
                </span>
            </div>
        </div>
    );
};
