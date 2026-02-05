// src/mocks/types.ts

export type ProductType = 'food' | 'living' | 'kitchen';

export interface Product {
  id: string;
  urlKeyword: string; // "coupang", "naver" 등 매핑용 키워드
  name: string;
  originalPrice: number;
  imageUrl: string;
  category: ProductType;
  unit: string; // "24개입", "30롤" 등
}

export interface User {
  id: string;
  nickname: string;
  avatar: string;
  location: string; // "역삼동", "삼성동"
}

export type DealStatus = 'recruiting' | 'processing' | 'completed';

export interface Deal {
  id: string;
  hostId: string;
  product: Product;
  targetCount: number; // 모집 인원 (N)
  participants: User[]; // 현재 참여자 목록
  status: DealStatus;
  createdAt: Date;
}
