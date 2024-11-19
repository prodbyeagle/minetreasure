import { RARITIES } from '../../utils/filterUtils';

interface RarityFilterProps {
    selectedRarities: string[];
    onToggleRarity: (rarity: string) => void;
}

export default function RarityFilter({ selectedRarities, onToggleRarity }: RarityFilterProps) {
    return (
        <div className="mb-6">
            <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Rarity</h4>
            <div className="flex flex-wrap gap-2">
                {RARITIES.map((rarity) => (
                    <button
                        key={rarity}
                        onClick={() => onToggleRarity(rarity)}
                        className={`px-3 py-1 rounded-full text-sm capitalize ${selectedRarities.includes(rarity)
                                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                                : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300'
                            } hover:opacity-80 transition-colors`}
                    >
                        {rarity}
                    </button>
                ))}
            </div>
        </div>
    );
}
