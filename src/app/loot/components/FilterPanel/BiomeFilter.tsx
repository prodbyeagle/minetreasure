import { getBiomeIcon } from '../../utils/biomeIcons';

const formatBiomeName = (biome: string) => {
    return biome
        .replace('_treasure', '')
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

interface BiomeFilterProps {
    biomes: string[];
    selectedBiomes: string[];
    onToggleBiome: (biome: string) => void;
}

export default function BiomeFilter({ biomes, selectedBiomes, onToggleBiome }: BiomeFilterProps) {
    return (
        <div>
            <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Biomes</h4>
            <div className="flex flex-wrap gap-2">
                {biomes.map((biome) => {
                    const BiomeIcon = getBiomeIcon(biome);
                    const formattedName = formatBiomeName(biome);
                    const isSelected = selectedBiomes.includes(biome);

                    return (
                        <button
                            key={biome}
                            onClick={() => onToggleBiome(biome)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
                                isSelected
                                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                                    : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300'
                            } hover:opacity-80 transition-colors`}
                        >
                            <BiomeIcon />
                            <span>{formattedName}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
