import React from 'react';
import type { User } from '../../../mocks/types';

interface NeighborListProps {
  participants: User[];
  targetCount: number;
}

export const NeighborList: React.FC<NeighborListProps> = ({ participants, targetCount }) => {
  const remaining = Math.max(0, targetCount - participants.length);
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex -space-x-3 mb-2">
        {participants.map((user, i) => (
          <div 
            key={user.id} 
            className="w-10 h-10 rounded-full border-2 border-white bg-surface overflow-hidden shadow-sm"
            style={{ zIndex: participants.length - i }}
          >
            <img src={user.avatar} alt={user.nickname} className="w-full h-full object-cover" />
          </div>
        ))}
        {remaining > 0 && Array.from({ length: remaining }).map((_, i) => (
           <div 
            key={`placeholder-${i}`}
            className="w-10 h-10 rounded-full border-2 border-dashed border-border-default bg-input-bg flex items-center justify-center text-text-tertiary text-xs z-0"
           >
             ?
           </div>
        ))}
      </div>
      <p className="text-caption text-text-secondary">
        {remaining === 0 
          ? <span className="text-accent-success font-bold">전원 모집 완료!</span>
          : <span className="animate-pulse font-medium">{remaining}명 기다리는 중...</span>
        }
      </p>
    </div>
  );
};
