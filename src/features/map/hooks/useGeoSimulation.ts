import { useEffect, useRef } from 'react';
import { useAppStore } from '../../../store/useAppStore';
import { supabase } from '../../../lib/supabase';

export function useGeoSimulation() {
  const { activeDeal, addParticipant, updateDealStatus } = useAppStore();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Only run when recruiting
    if (!activeDeal || activeDeal.status !== 'recruiting') {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const currentCount = activeDeal.participants.length;
    const targetCount = activeDeal.targetCount;

    // Check if full
    if (currentCount >= targetCount) {
      timerRef.current = setTimeout(() => {
        updateDealStatus('processing');
      }, 1000);
      return;
    }

    // Schedule next bot arrival
    const delay = Math.floor(Math.random() * 3000) + 2000;

    timerRef.current = setTimeout(async () => {
      const existingIds = new Set(activeDeal.participants.map(u => u.id));

      const { data: users } = await supabase
        .from('users')
        .select('*')
        .not('id', 'in', `(${Array.from(existingIds).map(id => `'${id}'`).join(',')})`)
        .limit(1);

      if (users && users.length > 0) {
        const dbUser = users[0];
        addParticipant({
          id: dbUser.id,
          nickname: dbUser.nickname,
          avatar: dbUser.avatar_url || '',
          location: dbUser.location || ''
        });
      }
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeDeal, addParticipant, updateDealStatus]);
}
