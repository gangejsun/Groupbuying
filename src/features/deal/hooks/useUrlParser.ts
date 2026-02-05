import { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import type { Product } from '../../../mocks/types';

export function useUrlParser() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseUrl = async (url: string) => {
    setLoading(true);
    setError(null);
    setProduct(null);

    try {
      // Call the scraping Edge Function
      const { data, error: fnError } = await supabase.functions.invoke('scrape-product', {
        body: { url }
      });

      if (fnError || !data) {
        throw new Error(fnError?.message || '상품 정보를 가져오는 데 실패했습니다.');
      }

      setProduct({
        id: crypto.randomUUID(), // Generate a temporary ID for the preview
        urlKeyword: 'external',
        name: data.name,
        originalPrice: Number(data.originalPrice),
        imageUrl: data.imageUrl || '',
        category: (data.brand || '기타') as any, // Use brand as category for now, or fallback
        unit: '1개' // Default unit
      });
    } catch (e) {
      console.error(e);
      setError('상품 정보를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const resetProduct = () => {
    setProduct(null);
    setError(null);
  };

  return { product, loading, error, parseUrl, resetProduct };
}
