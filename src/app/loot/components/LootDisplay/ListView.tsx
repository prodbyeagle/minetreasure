import { ChevronDown, ChevronRight } from 'lucide-react';
import type { ListViewProps } from '@/types/types';
import ItemCard from './ItemCard';
import { RARITIES } from '../../utils/filterUtils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getBiomeIcon } from '../../utils/biomeIcons';

const formatBiomeName = (biome: string) => {
    return biome
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export default function ListView({
    data,
    getItemImage,
    onItemClick,
    collapsedRarities,
    onToggleCollapse,
    collapsedBiomes,
    onToggleBiomeCollapse
}: ListViewProps) {
    const router = useRouter();

    const handleHashClick = (biome: string, e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`#${biome}`);
    };

    useEffect(() => {
        const handleHash = () => {
            const hash = window.location.hash.slice(1);
            if (hash) {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        handleHash();
        window.addEventListener('hashchange', handleHash);
        return () => window.removeEventListener('hashchange', handleHash);
    }, []);

    return (
        <div className="space-y-6">
            {Object.entries(data).map(([biome, rarities]) => {
                const hasItems = Object.values(rarities).some(items => items.length > 0);
                if (!hasItems) return null;

                const isCollapsed = collapsedBiomes[biome];
                const formattedBiomeName = formatBiomeName(biome);
                const BiomeIcon = getBiomeIcon(biome);

                return (
                    <div key={biome} id={biome} className="space-y-2">
                        <div
                            className="flex items-center gap-2 cursor-pointer bg-zinc-800 p-4 rounded-xl"
                            onClick={() => onToggleBiomeCollapse(biome)}
                        >
                            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            <BiomeIcon />
                            <h2 className="text-xl font-bold">{formattedBiomeName}</h2>
                            <button
                                onClick={(e) => handleHashClick(biome, e)}
                                className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white focus:text-white ml-2 rounded-lg hover:bg-zinc-700 transition-all duration-200 transform hover:scale-110"
                                title="Copy link to section"
                            >
                                #
                            </button>
                        </div>

                        {!isCollapsed && (
                            <div className="space-y-4">
                                {RARITIES.map(rarity => {
                                    const items = rarities[rarity] || [];
                                    if (items.length === 0) return null;

                                    const isRarityCollapsed = collapsedRarities[biome]?.[rarity];

                                    return (
                                        <div key={rarity} className="space-y-2">
                                            <div
                                                className="flex items-center gap-2 cursor-pointer hover:bg-zinc-700 duration-100 transition-all p-2 rounded-lg"
                                                onClick={() => onToggleCollapse(biome, rarity)}
                                            >
                                                {isRarityCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                <h3 className={`text-lg font-semibold capitalize ${rarity === 'common' ? 'text-zinc-600 dark:text-zinc-400' :
                                                    rarity === 'rare' ? 'text-blue-500 dark:text-blue-400' :
                                                        rarity === 'epic' ? 'text-purple-500 dark:text-purple-400' :
                                                            'text-yellow-500 dark:text-yellow-400'
                                                    }`}>
                                                    {rarity} ({items.length})
                                                </h3>
                                            </div>

                                            {!isRarityCollapsed && (
                                                <div className="space-y-2">
                                                    {items.map((item, index) => (
                                                        <ItemCard
                                                            key={`${item.type}-${index}`}
                                                            item={item}
                                                            getItemImage={getItemImage}
                                                            onClick={() => onItemClick(item)}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
