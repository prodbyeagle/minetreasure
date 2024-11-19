import { useMemo } from 'react';
import type { MT_DATA, MT_ITEM } from '@/types/types';
import StandardView from './StandardView';
import GridView from './GridView';
import ListView from './ListView';

interface LootDisplayProps {
    data: MT_DATA;
    viewMode: 'standard' | 'grid' | 'list';
    getItemImage: (item: MT_ITEM) => string;
    onItemClick: (item: MT_ITEM) => void;
    collapsedRarities: Record<string, Record<string, boolean>>;
    onToggleCollapse: (biome: string, rarity: string) => void;
    collapsedBiomes: Record<string, boolean>;
    onToggleBiomeCollapse: (biome: string) => void;
}

export default function LootDisplay({
    data,
    viewMode,
    getItemImage,
    onItemClick,
    collapsedRarities,
    onToggleCollapse,
    collapsedBiomes,
    onToggleBiomeCollapse
}: LootDisplayProps) {
    const standardData = useMemo(() => {
        return data;
    }, [data]);

    if (viewMode === 'standard') {
        return (
            <StandardView
                data={standardData}
                getItemImage={getItemImage}
                onItemClick={onItemClick}
            />
        );
    }

    if (viewMode === 'grid') {
        return (
            <GridView
                data={data}
                getItemImage={getItemImage}
                onItemClick={onItemClick}
                collapsedRarities={collapsedRarities}
                onToggleCollapse={onToggleCollapse}
                collapsedBiomes={collapsedBiomes}
                onToggleBiomeCollapse={onToggleBiomeCollapse}
            />
        );
    }

    return (
        <ListView
            data={data}
            getItemImage={getItemImage}
            onItemClick={onItemClick}
            collapsedRarities={collapsedRarities}
            onToggleCollapse={onToggleCollapse}
            collapsedBiomes={collapsedBiomes}
            onToggleBiomeCollapse={onToggleBiomeCollapse}
        />
    );
}
