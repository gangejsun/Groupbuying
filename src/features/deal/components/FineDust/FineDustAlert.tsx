import React, { useEffect, useState } from 'react';
import { FineDustService } from '../../../../services/fineDustService';
import type { FineDustLevel } from '../../../../services/fineDustService';
import { Wind, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { cn } from '../../../../lib/utils';

interface FineDustAlertProps {
    className?: string;
    onLevelChange?: (level: FineDustLevel) => void;
}

const LEVEL_CONFIG = {
    GOOD: {
        label: '좋음',
        color: 'text-blue-500 bg-blue-50 border-blue-200',
        icon: CheckCircle,
        description: '공기가 깨끗해요! 야외 활동을 즐기기 좋습니다.',
    },
    NORMAL: {
        label: '보통',
        color: 'text-green-500 bg-green-50 border-green-200',
        icon: Info,
        description: '공기질이 보통입니다. 일상적인 활동이 가능해요.',
    },
    BAD: {
        label: '나쁨',
        color: 'text-orange-500 bg-orange-50 border-orange-200',
        icon: AlertCircle,
        description: '미세먼지가 많습니다. 마스크 착용을 권장해요.',
    },
    VERY_BAD: {
        label: '매우 나쁨',
        color: 'text-red-500 bg-red-50 border-red-200',
        icon: AlertCircle,
        description: '공기질이 매우 안 좋아요. 실내 활동을 권장합니다.',
    },
    UNKNOWN: {
        label: '정보 없음',
        color: 'text-gray-500 bg-gray-50 border-gray-200',
        icon: Wind,
        description: '현재 대기 정보를 불러올 수 없습니다.',
    },
};

export const FineDustAlert: React.FC<FineDustAlertProps> = ({ className, onLevelChange }) => {
    const [level, setLevel] = useState<FineDustLevel>('UNKNOWN');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDust = async () => {
            setLoading(true);
            const currentLevel = await FineDustService.getSidoFineDust('서울');
            setLevel(currentLevel);
            onLevelChange?.(currentLevel);
            setLoading(false);
        };

        fetchDust();
    }, [onLevelChange]);

    const config = LEVEL_CONFIG[level as keyof typeof LEVEL_CONFIG];
    const Icon = config.icon;

    if (loading) {
        return (
            <div className={cn("animate-pulse p-4 rounded-xl bg-gray-100", className)}>
                <div className="h-4 w-1/3 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            </div>
        );
    }

    return (
        <div className={cn("p-4 rounded-xl border flex items-start gap-4 transition-all duration-300", config.color, className)}>
            <div className="p-2 rounded-full bg-white shadow-sm">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold opacity-70 uppercase tracking-wider">PM 2.5 Status</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white shadow-sm">
                        {config.label}
                    </span>
                </div>
                <p className="text-sm font-medium leading-tight">
                    {config.description}
                </p>
            </div>
        </div>
    );
};
