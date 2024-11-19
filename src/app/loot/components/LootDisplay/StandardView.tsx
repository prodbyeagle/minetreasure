import type { MT_DATA, MT_ITEM } from '@/types/types';
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

interface StandardViewProps {
    data: MT_DATA;
    getItemImage: (item: MT_ITEM) => string;
    onItemClick: (item: MT_ITEM) => void;
}

export default function StandardView({
    data,
    getItemImage,
    onItemClick,
}: StandardViewProps) {
    const router = useRouter();

    const handleHashClick = (biome: string, e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`#${biome}`);
    };

    // Handle hash navigation on load and hash changes
    useEffect(() => {
        const handleHash = () => {
            const hash = window.location.hash.slice(1); // Remove the # symbol
            if (hash) {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        handleHash(); // Handle initial hash
        window.addEventListener('hashchange', handleHash);
        return () => window.removeEventListener('hashchange', handleHash);
    }, []);

    return (
        <div className="space-y-8">
            {Object.entries(data).map(([biome, rarities]) => {
                const hasItems = Object.values(rarities).some(items => items.length > 0);
                if (!hasItems) return null;

                const formattedBiomeName = formatBiomeName(biome);
                const BiomeIcon = getBiomeIcon(biome);

                return (
                    <div key={biome} id={biome} className="space-y-4">
                        <div className="flex items-center gap-2 bg-zinc-800 p-4 rounded-xl">
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {RARITIES.map(rarity => {
                                const items = rarities[rarity] || [];
                                if (items.length === 0) return null;

                                return (
                                    <div key={rarity} className="space-y-2">
                                        <h3 className={`text-lg font-semibold capitalize ${rarity === 'common' ? 'text-zinc-600 dark:text-zinc-400' :
                                                rarity === 'rare' ? 'text-blue-500 dark:text-blue-400' :
                                                    rarity === 'epic' ? 'text-purple-500 dark:text-purple-400' :
                                                        'text-yellow-500 dark:text-yellow-400'
                                            }`}>
                                            {rarity} ({items.length})
                                        </h3>
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
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
