'use client';

import type { RarityInputsProps } from "@/types/types";


const rarityColors = {
    "common": "text-zinc-600 dark:text-zinc-400",
    "rare": "text-blue-500 dark:text-blue-400",
    "epic": "text-purple-500 dark:text-purple-400",
    "legendary": "text-yellow-500 dark:text-yellow-400"
};

export default function RarityInputs({ values, onChange }: RarityInputsProps) {
    const handleChange = (rarity: keyof typeof values, value: string) => {
        const numValue = parseInt(value) || 0;
        onChange({
            ...values,
            [rarity]: numValue
        });
    };

    return (
        <div className="space-y-4 p-4 bg-white dark:bg-zinc-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Rarity Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(Object.keys(values) as Array<keyof typeof values>).map((rarity) => (
                    <div key={rarity} className="space-y-2">
                        <label htmlFor={rarity} className={`block font-medium capitalize ${rarityColors[rarity]}`}>
                            {rarity}
                        </label>
                        <input
                            type="number"
                            id={rarity}
                            value={values[rarity]}
                            onChange={(e) => handleChange(rarity, e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min="1"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
