/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState, useMemo, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import ItemModal from '@/components/ItemModal';
import { Filter } from 'lucide-react';
import treasureData from '@/data/data.json';
import type { MT_ITEM } from '@/types/types';

// Components
import LootHeader from './components/LootHeader';
import SearchBar from './components/SearchBar';
import ViewModeSelector from './components/ViewModeSelector';
import LootDisplay from './components/LootDisplay';
import FilterPanel from './components/FilterPanel';

// Utils
import { useDebounce } from '../../hooks/useDebounce';
import { getItemImage } from './utils/itemUtils';
import { filterItems } from './utils/filterUtils';

export default function LootPage() {
     const [searchQuery, setSearchQuery] = useState('');
     const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
     const [selectedBiomes, setSelectedBiomes] = useState<string[]>([]);
     const [blockRange, setBlockRange] = useState(500000);
     const [displayBlockCount, setDisplayBlockCount] = useState(500000);
     const [showFilters, setShowFilters] = useState(false);
     const [selectedItem, setSelectedItem] = useState<MT_ITEM | null>(null);
     const [customItemsOnly, setCustomItemsOnly] = useState(false);
     const [viewAllItems, setViewAllItems] = useState(false);
     const [viewMode, setViewMode] = useState<'standard' | 'grid' | 'list'>('standard');
     const [collapsedRarities, setCollapsedRarities] = useState<Record<string, Record<string, boolean>>>({});
     const [collapsedBiomes, setCollapsedBiomes] = useState<Record<string, boolean>>({});

     const debouncedSearch = useDebounce(searchQuery, 300);
     const debouncedBlockRange = useDebounce(blockRange, 300);

     const biomes = useMemo(() => {
          return [...new Set(Object.keys(treasureData))];
     }, []);

     const filteredData = useMemo(() => {
          return filterItems({
               data: treasureData,
               searchQuery: debouncedSearch,
               selectedRarities,
               selectedBiomes,
               blockRange: debouncedBlockRange,
               customItemsOnly,
               viewAllItems
          });
     }, [debouncedSearch, selectedRarities, selectedBiomes, debouncedBlockRange, customItemsOnly, viewAllItems]);

     const handleToggleCollapse = useCallback((biome: string, rarity: string) => {
          setCollapsedRarities(prev => ({
               ...prev,
               [biome]: {
                    ...prev[biome],
                    [rarity]: !prev[biome]?.[rarity]
               }
          }));
     }, []);

     const handleToggleBiomeCollapse = useCallback((biome: string) => {
          setCollapsedBiomes(prev => ({
               ...prev,
               [biome]: !prev[biome]
          }));
     }, []);

     const handleBlockRangeChange = useCallback((value: number) => {
          setBlockRange(value);
          setDisplayBlockCount(value);
     }, []);

     const handleClearFilters = useCallback(() => {
          setSelectedRarities([]);
          setSelectedBiomes([]);
          setBlockRange(500000);
          setDisplayBlockCount(500000);
          setCustomItemsOnly(false);
          setViewAllItems(false);
     }, []);

     return (
          <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
               <Navbar />
               <main className="container mx-auto px-4 py-8 space-y-6">
                    <LootHeader />

                    <div className="flex flex-wrap gap-4">
                         <SearchBar
                              value={searchQuery}
                              onChange={setSearchQuery}
                         />

                         <ViewModeSelector
                              viewMode={viewMode}
                              onViewModeChange={setViewMode}
                         />

                         <button
                              onClick={() => setShowFilters(!showFilters)}
                              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${
                                   showFilters
                                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                                        : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300'
                              } hover:opacity-80 transition-colors`}
                         >
                              <Filter className="h-4 w-4" />
                              <span className="text-sm">Filters</span>
                         </button>
                    </div>

                    {showFilters && (
                         <FilterPanel
                              showFilters={showFilters}
                              onToggleFilters={() => setShowFilters(!showFilters)}
                              selectedRarities={selectedRarities}
                              onToggleRarity={(rarity) => {
                                   setSelectedRarities(prev =>
                                        prev.includes(rarity)
                                             ? prev.filter(r => r !== rarity)
                                             : [...prev, rarity]
                                   );
                              }}
                              biomes={biomes}
                              selectedBiomes={selectedBiomes}
                              onToggleBiome={(biome) => {
                                   setSelectedBiomes(prev =>
                                        prev.includes(biome)
                                             ? prev.filter(b => b !== biome)
                                             : [...prev, biome]
                                   );
                              }}
                              blockRangeValue={blockRange}
                              onBlockRangeChange={handleBlockRangeChange}
                              displayBlockCount={displayBlockCount}
                              onClearFilters={handleClearFilters}
                              viewAllItems={viewAllItems}
                         />
                    )}

                    <LootDisplay
                         data={filteredData}
                         viewMode={viewMode}
                         getItemImage={getItemImage}
                         onItemClick={setSelectedItem}
                         collapsedRarities={collapsedRarities}
                         collapsedBiomes={collapsedBiomes}
                         onToggleCollapse={handleToggleCollapse}
                         onToggleBiomeCollapse={handleToggleBiomeCollapse}
                    />
               </main>

               {selectedItem && (
                    <ItemModal
                         item={selectedItem}
                         onClose={() => setSelectedItem(null)}
                         getItemImage={getItemImage}
                    />
               )}
          </div>
     );
}