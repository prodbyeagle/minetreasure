import type { MT_DATA, MT_ITEM } from '@/types/types';

export const RARITIES = ['common', 'rare', 'epic', 'legendary'];

interface FilterItemsParams {
    data: MT_DATA;
    searchQuery: string;
    selectedRarities: string[];
    selectedBiomes: string[];
    blockRange: number;
    customItemsOnly: boolean;
    viewAllItems: boolean;
}

export function filterItems({
    data,
    searchQuery,
    selectedRarities,
    selectedBiomes,
    blockRange,
    customItemsOnly,
    viewAllItems
}: FilterItemsParams): MT_DATA {
    const filtered: MT_DATA = {};
    const searchLower = searchQuery.toLowerCase();
    const biomesToShow = selectedBiomes.length > 0 ? selectedBiomes : Object.keys(data);
    const raritiesToShow = selectedRarities.length > 0 ? selectedRarities : RARITIES;
    const relevantBiomes = biomesToShow.filter(biome => data[biome as keyof typeof data]);

    relevantBiomes.forEach(biome => {
        const biomeData = data[biome as keyof typeof data];
        filtered[biome] = {};
    
        raritiesToShow.forEach(rarity => {
            const rarityData = biomeData[rarity as keyof typeof biomeData];
            if (!rarityData) return;

            filtered[biome][rarity] = rarityData.reduce((acc: MT_ITEM[], item: MT_ITEM) => {
                if (customItemsOnly && !item.name) return acc;
                if (!viewAllItems) {
                    const stoneMined = item.conditions.stoneMined;
                    if (stoneMined) {
                        const min = stoneMined.min || 0;
                        if (min > blockRange) return acc;
                    }
                }

                const searchString = item.name?.toLowerCase() || item.type.replace(/_/g, ' ').toLowerCase();
                if (!searchString.includes(searchLower)) return acc;
                acc.push(item);
                return acc;
            }, []);
        });
    });

    return filtered;
}
