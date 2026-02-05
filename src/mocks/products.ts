import type { Product } from "./types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p-coupang-water",
    urlKeyword: "coupang",
    name: "제주 삼다수 2L",
    originalPrice: 12000,
    imageUrl: "https://images.unsplash.com/photo-1560064831-7af70eaa50ab?w=400&q=80",
    category: "food",
    unit: "12개입",
  },
  {
    id: "p-naver-tissue",
    urlKeyword: "naver",
    name: "코디 맘껏쓰는 화장지",
    originalPrice: 24000,
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80",
    category: "living",
    unit: "30롤",
  },
  {
    id: "p-default-oil",
    urlKeyword: "default",
    name: "엑스트라 버진 올리브오일",
    originalPrice: 18000,
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbacf845?w=400&q=80",
    category: "kitchen",
    unit: "1L",
  },
];

export const findProductByUrl = (url: string): Product => {
  const lowerUrl = url.toLowerCase();
  
  if (lowerUrl.includes('coupang')) {
    return MOCK_PRODUCTS.find(p => p.urlKeyword === 'coupang') || MOCK_PRODUCTS[2];
  }
  
  if (lowerUrl.includes('naver')) {
    return MOCK_PRODUCTS.find(p => p.urlKeyword === 'naver') || MOCK_PRODUCTS[2];
  }

  // Default fallback
  return MOCK_PRODUCTS.find(p => p.urlKeyword === 'default') || MOCK_PRODUCTS[2];
};
