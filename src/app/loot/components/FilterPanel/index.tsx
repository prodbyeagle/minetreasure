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
    customItemsOnly: boolean;
    onToggleCustomItems: () => void;
    onToggleViewAllItems: () => void;
}

export default function FilterPanel({
    showFilters,
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
    customItemsOnly,
    onToggleCustomItems,
    onToggleViewAllItems,
}: FilterPanelProps) {
    return (
        <>

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
                        <BlockRangeSlider
                            value={blockRangeValue}
                            onChange={onBlockRangeChange}
                            displayBlockCount={displayBlockCount}
                        />
                    )}

                    <div className="mt-6 space-y-4">
                        <label className="flex items-center justify-between cursor-pointer">
                            <span className="text-sm font-medium text-zinc-900 dark:text-white">Custom Items Only</span>
                            <button
                                onClick={onToggleCustomItems}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${customItemsOnly ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-zinc-900 transition-transform ${customItemsOnly ? 'translate-x-6' : 'translate-x-1'}`}
                                />
                            </button>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                            <span className="text-sm font-medium text-zinc-900 dark:text-white">Show All Items</span>
                            <button
                                onClick={onToggleViewAllItems}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${viewAllItems ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-zinc-900 transition-transform ${viewAllItems ? 'translate-x-6' : 'translate-x-1'}`}
                                />
                            </button>
                        </label>
                    </div>
                </div>
            )}
        </>
    );
}
