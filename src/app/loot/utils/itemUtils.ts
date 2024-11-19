import type { MT_ITEM } from '@/types/types';

export const getItemImage = (item: MT_ITEM): string => {
    return `/items/${item.type}.png`;
};

export const getBlockRangeText = (item: MT_ITEM): string | null => {
    if (!item.conditions.stoneMined) return null;
    const min = item.conditions.stoneMined.min || 0;
    const max = item.conditions.stoneMined.max;
    return max ? `${min.toLocaleString()} - ${max.toLocaleString()} blocks` : `${min.toLocaleString()}+ blocks`;
};

export const hasModalData = (item: MT_ITEM): boolean => {
    return (
        (item.lore && item.lore.length > 0) ||
        (item.enchantments && item.enchantments.length > 0) ||
        (item.components && Object.keys(item.components).length > 0)
    );
};
