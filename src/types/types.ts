/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Represents the data for a given biome.
 */
export type MT_DATA = {
     [key: string]: {
          [key: string]: MT_ITEM[];
     };
};

/**
 * Represents a single treasure.
 */
export type MT_ITEM = {
     type: string;
     name?: string;
     unbreakable?: boolean;
     enchantWithLevel?: number;
     lore?: string[];
     nbt?: object;
     components?: any;
     enchantments?: MT_ENCHANTMENT[];
     attributes?: MT_ATTRIBUTE[];
     chances?: number[];
     conditions: {
          stoneMined?: {
               min?: number;
               max?: number;
          };
     };
};

/**
 * Represents an attribute of a treasure.
 */
export type MT_ATTRIBUTE = {
     name: string;
     type: string;
     min: number;
     max: number;
     slot?: string;
};

/**
 * Represents an enchantment of a treasure.
 */
export type MT_ENCHANTMENT = {
     type: string;
     min: number;
     max: number;
};

/**
 * Represents the chances of a treasure dropping.
 */
export type MT_CHANCE = {
     common: number;
     rare: number;
     epic: number;
     legendary: number;
};

/**
 * Represents the chances of a treasure dropping, keyed by biome.
 */
export type MT_CHANCES = {
     [key: string]: MT_CHANCE;
};

/**
 * The data returned from the GitHub API.
 */
export interface GitHubData {
     repo_owner: string;
     repo_name: string;
     commit_sha: string;
     commit_ref: string;
     commit_msg: string;
}

export interface Chances {
     common: number;
     rare: number;
     epic: number;
     legendary: number;
}

export interface BlockChance {
     blockName: string;
     chances: Chances;
}

export interface SearchBarProps {
     value: string;
     onChange: (value: string) => void;
}

export type ViewMode = 'standard' | 'grid' | 'list';

export interface ViewButtonProps {
     mode: ViewMode;
     currentMode: ViewMode;
     onClick: () => void;
     icon: React.ReactNode;
     title: string;
}

export interface ViewModeSelectorProps {
     viewMode: ViewMode;
     onViewModeChange: (mode: ViewMode) => void;
}

export interface BiomeFilterProps {
     biomes: string[];
     selectedBiomes: string[];
     onToggleBiome: (biome: string) => void;
}

export interface FilterPanelProps {
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


export interface BlockRangeSliderProps {
     value: number;
     onChange: (value: number) => void;
     displayBlockCount: number;
}

export interface RarityFilterProps {
     selectedRarities: string[];
     onToggleRarity: (rarity: string) => void;
}

export interface RarityInputsProps {
     values: {
          common: number;
          rare: number;
          epic: number;
          legendary: number;
     };
     onChange: (values: {
          common: number;
          rare: number;
          epic: number;
          legendary: number;
     }) => void;
}

export interface GridViewProps {
     data: MT_DATA;
     getItemImage: (item: MT_ITEM) => string;
     onItemClick: (item: MT_ITEM) => void;
     collapsedRarities: Record<string, Record<string, boolean>>;
     onToggleCollapse: (biome: string, rarity: string) => void;
     collapsedBiomes: Record<string, boolean>;
     onToggleBiomeCollapse: (biome: string) => void;
}

export interface LootDisplayProps {
     data: MT_DATA;
     viewMode: 'standard' | 'grid' | 'list';
     getItemImage: (item: MT_ITEM) => string;
     onItemClick: (item: MT_ITEM) => void;
     collapsedRarities: Record<string, Record<string, boolean>>;
     onToggleCollapse: (biome: string, rarity: string) => void;
     collapsedBiomes: Record<string, boolean>;
     onToggleBiomeCollapse: (biome: string) => void;
}
export interface ItemCardProps {
     item: MT_ITEM;
     getItemImage: (item: MT_ITEM) => string;
     onClick: () => void;
}

export interface ListViewProps {
     data: MT_DATA;
     getItemImage: (item: MT_ITEM) => string;
     onItemClick: (item: MT_ITEM) => void;
     collapsedRarities: Record<string, Record<string, boolean>>;
     onToggleCollapse: (biome: string, rarity: string) => void;
     collapsedBiomes: Record<string, boolean>;
     onToggleBiomeCollapse: (biome: string) => void;
}

export interface StandardViewProps {
     data: MT_DATA;
     getItemImage: (item: MT_ITEM) => string;
     onItemClick: (item: MT_ITEM) => void;
}

export interface StatData {
     downloads: number;
     mrdownloads: number;
     views: number;
     date: string;
     id: number;
}

export interface ReviewProps {
     text: string;
     username: string;
}

export interface FilterItemsParams {
     data: MT_DATA;
     searchQuery: string;
     selectedRarities: string[];
     selectedBiomes: string[];
     blockRange: number;
     customItemsOnly: boolean;
     viewAllItems: boolean;
}

export interface ItemModalProps {
     item: MT_ITEM;
     onClose: () => void;
     getItemImage: (item: MT_ITEM) => string;
}

export interface BlockChance {
     blockName: string;
     chances: {
          common: number;
          rare: number;
          epic: number;
          legendary: number;
     };
}
