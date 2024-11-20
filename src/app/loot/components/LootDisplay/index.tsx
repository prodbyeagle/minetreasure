import { useMemo } from 'react';
import type { LootDisplayProps } from '@/types/types';
import StandardView from './StandardView';
import GridView from './GridView';
import ListView from './ListView';

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
