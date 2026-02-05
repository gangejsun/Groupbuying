import React from 'react';
import { motion } from 'framer-motion';
import type { User } from '../../../mocks/types';

interface RadarScannerProps {
    participants: User[];
    targetCount: number;
}

export const RadarScanner: React.FC<RadarScannerProps> = ({ participants, targetCount }) => {
    return (
        <div className="relative w-full aspect-square max-w-[300px] mx-auto flex items-center justify-center">
            {/* Radar Pulses */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0.1, opacity: 0.5 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 1,
                        ease: "easeOut"
                    }}
                    className="absolute w-full h-full border-2 border-primary/20 rounded-full"
                />
            ))}

            {/* Main Radar Circle */}
            <div className="relative w-full h-full rounded-full border border-primary/10 bg-primary/5 flex items-center justify-center overflow-hidden">
                {/* Radar Line */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 origin-center bg-gradient-to-tr from-primary/20 to-transparent"
                    style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)' }}
                />

                {/* Center Pin */}
                <div className="relative z-20">
                    <div className="w-10 h-10 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=me"
                            alt="Me"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -inset-2 bg-primary/30 rounded-full -z-10"
                    />
                </div>

                {/* Participant Dots */}
                {participants.slice(1).map((participant, idx) => {
                    // Semi-random positions for mock effect
                    const angle = (idx * 137.5) % 360;
                    const distance = 35 + (idx * 10);
                    return (
                        <motion.div
                            key={participant.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute z-30"
                            style={{
                                transform: `rotate(${angle}deg) translateY(-${distance}%) rotate(-${angle}deg)`
                            }}
                        >
                            <div className="w-8 h-8 rounded-full border-2 border-white shadow-md bg-secondary flex items-center justify-center overflow-hidden">
                                <img src={participant.avatar} alt={participant.nickname} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 bg-text-primary text-text-inverse text-[8px] font-bold rounded whitespace-nowrap shadow-sm">
                                {participant.nickname}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Stats overlay */}
            <div className="absolute -bottom-8 left-0 right-0 text-center">
                <p className="text-caption font-heavy text-text-secondary animate-pulse">
                    {participants.length === targetCount
                        ? "🙌 모든 인원이 모집되었습니다!"
                        : `${targetCount - participants.length}명 더 모집 중...`}
                </p>
            </div>
        </div>
    );
};
