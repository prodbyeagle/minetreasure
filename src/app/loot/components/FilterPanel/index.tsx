import { Filter } from 'lucide-react';
import RarityFilter from './RarityFilter';
import BiomeFilter from './BiomeFilter';
import BlockRangeSlider from './BlockRangeSlider';

interface FilterPanelProps {
    showFilters: boolean;
    onToggleFilters: () => void;
    selectedRarities: string[];
    onToggleRarity: (rarity: string) => void;
    biomes: string[];
    selectedBiomes: string[];
    onToggleBiome: (biome: string) => void;
    blockRangeValue: number;
    onBlockRangeChange: (value: number) => void;
    displayBlockCount: number;
    onClearFilters: () => void;
    viewAllItems: boolean;
}

export default function FilterPanel({
    showFilters,
    onToggleFilters,
    selectedRarities,
    onToggleRarity,
    biomes,
    selectedBiomes,
    onToggleBiome,
    blockRangeValue,
    onBlockRangeChange,
    displayBlockCount,
    onClearFilters,
    viewAllItems,
}: FilterPanelProps) {
    return (
        <>
            <button
                onClick={onToggleFilters}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${
                    showFilters
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                        : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300'
                } hover:opacity-80 transition-colors`}
            >
                <Filter className="h-4 w-4" />
                <span className="text-sm">Filters</span>
            </button>

            {showFilters && (
                <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-zinc-900 dark:text-white">Filters</h3>
                        <button
                            onClick={onClearFilters}
                            className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                        >
                            Clear all
                        </button>
                    </div>

                    <RarityFilter
                        selectedRarities={selectedRarities}
                        onToggleRarity={onToggleRarity}
                    />

                    <BiomeFilter
                        biomes={biomes}
                        selectedBiomes={selectedBiomes}
                        onToggleBiome={onToggleBiome}
                    />

                    {!viewAllItems && (
                        <div className="mt-8">
                            <BlockRangeSlider
                                value={blockRangeValue}
                                onChange={onBlockRangeChange}
                                displayBlockCount={displayBlockCount}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
