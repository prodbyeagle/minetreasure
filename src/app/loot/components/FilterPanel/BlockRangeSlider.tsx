import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import type { BlockRangeSliderProps } from '@/types/types';

export default function BlockRangeSlider({ value, onChange, displayBlockCount }: BlockRangeSliderProps) {
    const [localValue, setLocalValue] = useState(value);
    const debouncedValue = useDebounce(localValue, 400);

    useEffect(() => {
        onChange(debouncedValue);
    }, [debouncedValue, onChange]);

    return (
        <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-900 dark:text-white">
                    Blocks Mined
                </label>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {displayBlockCount.toLocaleString()}
                </span>
            </div>
            <input
                type="range"
                min="0"
                max="500000"
                step="1000"
                value={localValue}
                onChange={(e) => setLocalValue(parseInt(e.target.value))}
                className="w-full"
            />
        </div>
    );
}
