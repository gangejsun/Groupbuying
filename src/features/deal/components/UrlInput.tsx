import React, { useState } from 'react';
import { Link2, ArrowRight } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface UrlInputProps {
    onParse: (url: string) => void;
    isLoading?: boolean;
}

export const UrlInput: React.FC<UrlInputProps> = ({ onParse, isLoading }) => {
    const [url, setUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url.trim()) {
            onParse(url.trim());
        }
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setUrl(text);
        } catch (err) {
            console.error('Failed to read clipboard', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="relative group">
                <label className="block text-caption font-medium text-text-secondary mb-2">
                    공구하고 싶은 상품 URL을 붙여넣으세요
                </label>
                <div className="relative flex items-center">
                    <div className="absolute left-3 text-text-tertiary">
                        <Link2 size={20} />
                    </div>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="쿠팡 또는 네이버 상품 URL"
                        className={cn(
                            "w-full h-12 pl-10 pr-24 bg-surface border border-border-light rounded-lg",
                            "focus:outline-none focus:border-border-active transition-colors",
                            "text-body-md placeholder:text-text-tertiary"
                        )}
                    />
                    <button
                        type="button"
                        onClick={handlePaste}
                        className="absolute right-2 px-3 py-1.5 bg-input-bg text-text-secondary text-caption font-semibold rounded-md hover:bg-border-light transition-colors"
                    >
                        붙여넣기
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={!url.trim() || isLoading}
                className={cn(
                    "w-full h-12 bg-primary text-text-inverse rounded-lg font-bold flex items-center justify-center gap-2",
                    "hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all",
                    isLoading && "animate-pulse"
                )}
            >
                {isLoading ? "분석 중..." : "상품 정보 불러오기"}
                {!isLoading && <ArrowRight size={18} />}
            </button>
        </form>
    );
};
