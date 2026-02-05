import { useState, useEffect } from 'react';
import { useAppStore } from '../../../store/useAppStore';
import { supabase } from '../../../lib/supabase';

export type PaymentState = 'idle' | 'auth_pending' | 'locked' | 'processing' | 'paid';

export function useVirtualPayment() {
  const { activeDeal, currentUser, updateDealStatus } = useAppStore();
  const [paymentState, setPaymentState] = useState<PaymentState>('idle');
  const [cardInfo, setCardInfo] = useState('');

  // Auto transition when deal is processing (full participants)
  useEffect(() => {
    if (activeDeal?.status === 'processing') {
      setPaymentState('processing');

      const processPayment = async () => {
        // Simulate payment gateway delay (2s)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Save order to Supabase
        if (activeDeal) {
          await supabase.from('orders').insert({
            deal_id: activeDeal.id,
            user_id: currentUser.id,
            amount: activeDeal.product.originalPrice / activeDeal.targetCount,
            payment_status: 'success',
            transaction_id: 'v_pay_' + Math.random().toString(36).substr(2, 9)
          });
        }

        setPaymentState('paid');
        updateDealStatus('completed');
      };

      processPayment();
    }
  }, [activeDeal?.status, updateDealStatus, currentUser.id]);

  const registerCard = (cardNumber: string) => {
    setCardInfo(cardNumber);
    setPaymentState('locked');
  };

  return { paymentState, registerCard, cardInfo };
}
