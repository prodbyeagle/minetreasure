interface BlockRangeSliderProps {
    value: number;
    onChange: (value: number) => void;
    displayBlockCount: number;
}

export default function BlockRangeSlider({ value, onChange, displayBlockCount }: BlockRangeSliderProps) {
    return (
        <div className="space-y-2">
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
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="w-full"
            />
        </div>
    );
}
