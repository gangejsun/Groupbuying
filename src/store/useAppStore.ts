import { create } from 'zustand';
import type { Deal, User } from '../mocks/types';

interface AppState {
  currentUser: User;
  activeDeal: Deal | null;

  setCurrentUser: (user: User) => void;
  setActiveDeal: (deal: Deal | null) => void;
  addParticipant: (user: User) => void;
  updateDealStatus: (status: Deal['status']) => void;
  resetDeal: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentUser: {
    id: '00000000-0000-0000-0000-000000000000', // System/Guest ID
    nickname: '나 (GUEST)',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Me',
    location: '역삼동',
  },
  activeDeal: null,

  setCurrentUser: (user) => set({ currentUser: user }),
  setActiveDeal: (deal) => set({ activeDeal: deal }),

  addParticipant: (user) => set((state) => ({
    activeDeal: state.activeDeal
      ? {
        ...state.activeDeal,
        participants: [...state.activeDeal.participants, user]
      }
      : null
  })),

  updateDealStatus: (status) => set((state) => ({
    activeDeal: state.activeDeal
      ? { ...state.activeDeal, status }
      : null
  })),

  resetDeal: () => set({ activeDeal: null }),
}));
