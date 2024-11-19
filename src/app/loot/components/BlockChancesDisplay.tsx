'use client';

import Image from 'next/image';
import { useBlockChances } from '@/hooks/useBlockChances';
import RarityInputs from './FilterPanel/RarityInputs';

const rarityColors = {
    "common": "#52525b",
    "rare": "#3b82f6",
    "epic": "#a855f7",
    "legendary": "#eab308"
} as const;

interface Chances {
    common: number;
    rare: number;
    epic: number;
    legendary: number;
}

interface BlockChance {
    blockName: string;
    chances: Chances;
}

export default function BlockChancesDisplay() {
    const { blockChances, rarityValues, setRarityValues } = useBlockChances(2);

    return (
        <div className="space-y-4">
            <RarityInputs values={rarityValues} onChange={setRarityValues} />

            <div className="max-h-[500px] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
                    {blockChances.map(({ blockName, chances }: BlockChance) => (
                        <div key={blockName} className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <Image
                                    src={`/items/${blockName}.png`}
                                    width={32}
                                    height={32}
                                    alt={blockName}
                                    className="rounded-sm"
                                />
                                <h3 className="font-medium">
                                    {blockName.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </h3>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span style={{ color: rarityColors.common }} className="font-medium">Common</span>
                                    <span className="text-sm text-zinc-600 dark:text-zinc-400">{chances.common}%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span style={{ color: rarityColors.rare }} className="font-medium">Rare</span>
                                    <span className="text-sm text-zinc-600 dark:text-zinc-400">{chances.rare}%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span style={{ color: rarityColors.epic }} className="font-medium">Epic</span>
                                    <span className="text-sm text-zinc-600 dark:text-zinc-400">{chances.epic}%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span style={{ color: rarityColors.legendary }} className="font-medium">Legendary</span>
                                    <span className="text-sm text-zinc-600 dark:text-zinc-400">{chances.legendary}%</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
