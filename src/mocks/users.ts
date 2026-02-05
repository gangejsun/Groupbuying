import type { User } from "./types";

export const MOCK_USERS: User[] = [
  {
    id: "u1",
    nickname: "역삼동불주먹",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    location: "역삼동",
  },
  {
    id: "u2",
    nickname: "자취10년차",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
    location: "역삼동",
  },
  {
    id: "u3",
    nickname: "강남큰손",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe",
    location: "역삼동",
  },
  {
    id: "u4",
    nickname: "빵순이",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Spooky",
    location: "역삼동",
  },
  {
    id: "u5",
    nickname: "헬창",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abby",
    location: "역삼동",
  },
  {
    id: "u6",
    nickname: "고양이집사",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Simba",
    location: "역삼동",
  },
  {
    id: "u7",
    nickname: "카페인중독",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Coffee",
    location: "역삼동",
  },
  {
    id: "u8",
    nickname: "퇴근하고싶다",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Work",
    location: "역삼동",
  },
  {
    id: "u9",
    nickname: "배고픈영혼",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hungry",
    location: "역삼동",
  },
  {
    id: "u10",
    nickname: "미니멀리스트",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mini",
    location: "역삼동",
  }
];

// Helper to get random nearby users
export const getRandomNearbyUsers = (count: number, excludeId?: string): User[] => {
  const candidates = excludeId 
    ? MOCK_USERS.filter(u => u.id !== excludeId)
    : MOCK_USERS;
    
  return candidates
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
};
