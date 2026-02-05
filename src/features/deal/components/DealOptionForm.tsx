import React from 'react';
import { Users } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface DealOptionFormProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export const DealOptionForm: React.FC<DealOptionFormProps> = ({ value, onChange, max = 4 }) => {
  const options = Array.from({ length: max - 1 }, (_, i) => i + 2); // [2, 3, 4]

  return (
    <div className="space-y-3">
      <label className="text-caption font-medium text-text-secondary flex items-center gap-1">
        <Users size={14} />
        모집 인원 선택
      </label>
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "flex-1 py-3 rounded-lg font-bold text-body-md transition-all border cursor-pointer",
              value === option
                ? "bg-secondary text-text-inverse border-secondary shadow-md scale-[1.02]"
                : "bg-surface text-text-secondary border-border-light hover:bg-input-bg"
            )}
          >
            {option}명
          </button>
        ))}
      </div>
      <p className="text-caption text-text-tertiary text-center mt-2">
        {value}명이 모이면 즉시 결제가 진행됩니다.
      </p>
    </div>
  );
};
