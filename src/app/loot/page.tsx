/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ItemModal from '@/components/ItemModal';
import { Search, Filter, X, Info, HelpCircle, ChevronDown, ChevronRight } from 'lucide-react';
import treasureData from '@/data/data.json';
import initialChances from '@/data/initialChances.json';
import firstObtainAdvancements from '@/data/firstObtainAdvancements.json';
import type { MT_DATA, MT_ITEM } from '@/types/types';

// Debounce helper
const useDebounce = (value: any, delay: number) => {
     const [debouncedValue, setDebouncedValue] = useState(value);

     useEffect(() => {
          const handler = setTimeout(() => {
               setDebouncedValue(value);
          }, delay);

          return () => {
               clearTimeout(handler);
          };
     }, [value, delay]);

     return debouncedValue;
};

export default function LootPage() {
     const [searchQuery, setSearchQuery] = useState('');
     const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
     const [selectedBiomes, setSelectedBiomes] = useState<string[]>([]);
     const [blockRange, setBlockRange] = useState<[number, number]>([0, 100000]);
     const [visualBlockRange, setVisualBlockRange] = useState<[number, number]>([0, 100000]);
     const [showFilters, setShowFilters] = useState(false);
     const [selectedItem, setSelectedItem] = useState<MT_ITEM | null>(null);
     const [chanceRanges, setChanceRanges] = useState({
          common: initialChances.common,
          rare: initialChances.rare,
          epic: initialChances.epic,
          legendary: initialChances.legendary
     });
     const [customItemsOnly, setCustomItemsOnly] = useState(false);
     const [listView, setListView] = useState(false);
     const [collapsedRarities, setCollapsedRarities] = useState<Record<string, Record<string, boolean>>>({});

     // Debounce values
     const debouncedSearch = useDebounce(searchQuery, 300);
     const debouncedBlockRange = useDebounce(blockRange, 300);
     const debouncedChanceRanges = useDebounce(chanceRanges, 300);

     const handleBlockRangeChange = (value: number) => {
          const newRange: [number, number] = [0, value];
          setVisualBlockRange(newRange);
          setBlockRange(newRange);
     };

     const handleChanceRangeChange = (rarity: string, value: string) => {
          const numValue = parseInt(value) || 0;
          setChanceRanges(prev => ({
               ...prev,
               [rarity]: numValue
          }));
     };

     const RARITIES = ['common', 'rare', 'epic', 'legendary'];
     const BIOMES = useMemo(() =>
          Object.keys(treasureData).map(biome =>
               biome.replace(/_treasure$/, '').replace(/_/g, ' ')
          ), []);

     // Memoize toggle functions
     const toggleRarity = useCallback((rarity: string) => {
          setSelectedRarities(prev =>
               prev.includes(rarity)
                    ? prev.filter(r => r !== rarity)
                    : [...prev, rarity]
          );
     }, []);

     const toggleBiome = useCallback((biome: string) => {
          const formattedBiome = biome.replace(/ /g, '_') + '_treasure';
          setSelectedBiomes(prev =>
               prev.includes(formattedBiome)
                    ? prev.filter(b => b !== formattedBiome)
                    : [...prev, formattedBiome]
          );
     }, []);

     const clearFilters = useCallback(() => {
          setSelectedRarities([]);
          setSelectedBiomes([]);
          setSearchQuery('');
          setBlockRange([0, 500000]);
     }, []);

     const filteredData = useMemo(() => {
          const filtered: MT_DATA = {};
          const biomesToShow = selectedBiomes.length > 0
               ? selectedBiomes
               : Object.keys(treasureData);

          biomesToShow.forEach(biome => {
               const biomeData = treasureData[biome as keyof typeof treasureData];
               if (biomeData) {
                    filtered[biome] = {};

                    const raritiesToShow = selectedRarities.length > 0
                         ? selectedRarities
                         : RARITIES;

                    raritiesToShow.forEach(rarity => {
                         const rarityData = biomeData[rarity as keyof typeof biomeData];
                         if (rarityData) {
                              filtered[biome][rarity] = rarityData.filter((item: MT_ITEM) => {
                                   const searchString = item.name?.toLowerCase() || item.type.replace(/_/g, ' ').toLowerCase();
                                   const stoneMined = item.conditions.stoneMined;
                                   const inBlockRange = !stoneMined || (
                                        (!stoneMined.min || stoneMined.min <= debouncedBlockRange[1]) &&
                                        (!stoneMined.max || stoneMined.max >= debouncedBlockRange[0])
                                   );

                                   // Check chance ranges
                                   const itemChances = item.chances?.[0];
                                   const inChanceRange = !itemChances || (
                                        itemChances[rarity as keyof typeof itemChances] <= debouncedChanceRanges[rarity as keyof typeof debouncedChanceRanges]
                                   );

                                   // Check if custom item
                                   const isCustom = item.name !== undefined;
                                   const passesCustomFilter = !customItemsOnly || isCustom;

                                   return searchString.includes(debouncedSearch.toLowerCase()) &&
                                        inBlockRange &&
                                        inChanceRange &&
                                        passesCustomFilter;
                              });
                         }
                    });
               }
          });

          return filtered;
     }, [debouncedSearch, selectedRarities, selectedBiomes, debouncedBlockRange, debouncedChanceRanges, customItemsOnly, RARITIES]);

     const getItemImage = useCallback((item: MT_ITEM) => {
          return `/items/${item.type}.png`;
     }, []);

     // Helper function to check if item has modal-worthy data
     const hasModalData = (item: MT_ITEM) => {
          return (
               (item.lore && item.lore.length > 0) ||
               (item.enchantments && item.enchantments.length > 0) ||
               (item.components && Object.keys(item.components).length > 0)
          );
     };

     // Helper function to get block range text
     const getBlockRangeText = (item: MT_ITEM) => {
          if (!item.conditions.stoneMined) return null;
          const min = item.conditions.stoneMined.min || 0;
          const max = item.conditions.stoneMined.max;
          return `${min.toLocaleString()} - ${max?.toLocaleString()} blocks`;
     };

     return (
          <>
               <main className="min-h-screen bg-white dark:bg-zinc-900">
                    <Navbar />
                    <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                         {/* Header */}
                         <div className="text-center mb-12">
                              <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                                   Loot Tables
                              </h1>
                              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                                   Discover all possible treasures you can find while mining. Filter by biome, rarity, and search for specific items.
                              </p>
                         </div>

                         {/* Search and Filter Bar */}
                         <div className="mb-8">
                              <div className="flex gap-4 mb-4">
                                   <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                                        <input
                                             type="text"
                                             value={searchQuery}
                                             onChange={(e) => setSearchQuery(e.target.value)}
                                             placeholder="Search for items..."
                                             className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400" />
                                   </div>
                                   <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="px-4 py-2 flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors"
                                   >
                                        <Filter className="h-5 w-5" />
                                        Filters
                                   </button>
                              </div>

                              {/* Filter Panel */}
                              {showFilters && (
                                   <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
                                        <div className="flex justify-between items-center mb-4">
                                             <h3 className="font-semibold text-zinc-900 dark:text-white">Filters</h3>
                                             <button
                                                  onClick={clearFilters}
                                                  className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                                             >
                                                  Clear all
                                             </button>
                                        </div>

                                        {/* Rarity Filter */}
                                        <div className="mb-6">
                                             <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Rarity</h4>
                                             <div className="flex flex-wrap gap-2">
                                                  {RARITIES.map((rarity) => (
                                                       <button
                                                            key={rarity}
                                                            onClick={() => toggleRarity(rarity)}
                                                            className={`px-3 py-1 rounded-full text-sm capitalize ${selectedRarities.includes(rarity)
                                                                 ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                                                                 : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300'} hover:opacity-80 transition-colors`}
                                                       >
                                                            {rarity}
                                                       </button>
                                                  ))}
                                             </div>
                                        </div>

                                        {/* Biome Filter */}
                                        <div>
                                             <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Biome</h4>
                                             <div className="flex flex-wrap gap-2">
                                                  {BIOMES.map((biome) => (
                                                       <button
                                                            key={biome}
                                                            onClick={() => toggleBiome(biome)}
                                                            className={`px-3 py-1 rounded-full text-sm capitalize ${selectedBiomes.includes(biome.replace(/ /g, '_') + '_treasure')
                                                                 ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                                                                 : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300'} hover:opacity-80 transition-colors`}
                                                       >
                                                            {biome}
                                                       </button>
                                                  ))}
                                             </div>
                                        </div>

                                        <div className="p-4 mt-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
                                             <div className="mt-6">
                                                  <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Blocks Mined</h4>
                                                  <div className="px-2">
                                                       <input
                                                            type="range"
                                                            min="0"
                                                            max="500000"
                                                            value={visualBlockRange[1]}
                                                            onChange={(e) => handleBlockRangeChange(parseInt(e.target.value))}
                                                            className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-zinc-500 dark:accent-zinc-400" />
                                                       <div className="flex justify-between mt-2">
                                                            <span className="text-xs text-zinc-500 dark:text-zinc-400">0</span>
                                                            <span className="text-xs text-zinc-500 dark:text-zinc-400">{visualBlockRange[1].toLocaleString()}</span>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>

                                        {/* Chance Filters */}
                                        <div className="mt-8">
                                             <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Chance Filters</h4>
                                             <div className="grid grid-cols-4 gap-4">
                                                  {RARITIES.map(rarity => (
                                                       <div key={rarity} className="flex flex-col">
                                                            <label className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 capitalize">
                                                                 {rarity}
                                                            </label>
                                                            <input
                                                                 type="number"
                                                                 min="0"
                                                                 value={chanceRanges[rarity as keyof typeof chanceRanges]}
                                                                 onChange={(e) => handleChanceRangeChange(rarity, e.target.value)}
                                                                 className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-white" />
                                                       </div>
                                                  ))}
                                             </div>
                                        </div>

                                        {/* Custom Items Toggle */}
                                        <div className="mt-8">
                                             <label className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
                                                  <span className="text-sm font-medium text-zinc-900 dark:text-white">Custom Items Only</span>
                                                  <button
                                                       onClick={() => setCustomItemsOnly(!customItemsOnly)}
                                                       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${customItemsOnly ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                                                  >
                                                       <span
                                                            className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-zinc-900 transition-transform ${customItemsOnly ? 'translate-x-6' : 'translate-x-1'}`} />
                                                  </button>
                                             </label>
                                        </div>

                                        {/* View Toggle */}
                                        <div className="mt-4">
                                             <label className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
                                                  <span className="text-sm font-medium text-zinc-900 dark:text-white">List View</span>
                                                  <button
                                                       onClick={() => setListView(!listView)}
                                                       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${listView ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                                                  >
                                                       <span
                                                            className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-zinc-900 transition-transform ${listView ? 'translate-x-6' : 'translate-x-1'}`} />
                                                  </button>
                                             </label>
                                        </div>
                                   </div>
                              )}
                         </div>

                         {/* Active Filters */}
                         {(selectedRarities.length > 0 || selectedBiomes.length > 0) && (
                              <div className="flex flex-wrap gap-2 mb-8">
                                   {selectedRarities.map((rarity) => (
                                        <span
                                             key={rarity}
                                             className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-700 dark:text-zinc-300 capitalize"
                                        >
                                             {rarity}
                                             <button
                                                  onClick={() => toggleRarity(rarity)}
                                                  className="hover:text-zinc-900 dark:hover:text-white"
                                             >
                                                  <X className="h-4 w-4" />
                                             </button>
                                        </span>
                                   ))}
                                   {selectedBiomes.map((biome) => (
                                        <span
                                             key={biome}
                                             className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-700 dark:text-zinc-300 capitalize"
                                        >
                                             {biome.replace(/_treasure$/, '').replace(/_/g, ' ')}
                                             <button
                                                  onClick={() => toggleBiome(biome.replace(/_treasure$/, '').replace(/_/g, ' '))}
                                                  className="hover:text-zinc-900 dark:hover:text-white"
                                             >
                                                  <X className="h-4 w-4" />
                                             </button>
                                        </span>
                                   ))}
                              </div>
                         )}

                         {/* Modal */}
                         {selectedItem && (
                              <ItemModal
                                   item={selectedItem}
                                   onClose={() => setSelectedItem(null)}
                                   getItemImage={getItemImage} />
                         )}

                         {/* Loot Grid/List */}
                         {Object.entries(filteredData).map(([biome, rarities]) => {
                              if (Object.values(rarities).some(items => items.length > 0)) {
                                   const biomeAdvancement = firstObtainAdvancements[biome as keyof typeof firstObtainAdvancements];
                                   return (
                                        <div key={biome} className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-6">
                                             <div className="flex items-center gap-2 mb-4">
                                                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white capitalize">
                                                       {biome.replace(/_treasure$/, '').replace(/_/g, ' ')}
                                                  </h2>
                                                  {biomeAdvancement && (
                                                       <div className="group relative">
                                                            <HelpCircle className="w-5 h-5 text-zinc-400 cursor-help" />
                                                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 p-4 rounded-lg bg-white dark:bg-zinc-800 shadow-xl border border-zinc-200 dark:border-zinc-700 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100">
                                                                 <div className="space-y-4">
                                                                      {Object.entries(biomeAdvancement).map(([rarity, advancement]) => (
                                                                           <div key={rarity}>
                                                                                <h3 className="font-medium text-sm capitalize text-zinc-900 dark:text-white">
                                                                                     {advancement.title}
                                                                                </h3>
                                                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                                                     {advancement.description}
                                                                                </p>
                                                                           </div>
                                                                      ))}
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  )}
                                             </div>
                                             {!listView ? (
                                                  <div className="space-y-6">
                                                       {Object.entries(rarities).map(([rarity, items]) => items.length > 0 && (
                                                            <div key={`${biome}-${rarity}`} className="space-y-4">
                                                                 <button
                                                                      onClick={() => {
                                                                           setCollapsedRarities(prev => ({
                                                                                ...prev,
                                                                                [biome]: {
                                                                                     ...prev[biome],
                                                                                     [rarity]: !prev[biome]?.[rarity]
                                                                                }
                                                                           }));
                                                                      }}
                                                                      className="w-full flex items-center gap-2 group"
                                                                 >
                                                                      {collapsedRarities[biome]?.[rarity] ?
                                                                           <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 duration-100 transition-all" /> :
                                                                           <ChevronDown className="w-5 h-5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 duration-100 transition-all" />}
                                                                      <h3 className={`text-lg font-semibold capitalize ${rarity === 'common' ? 'text-zinc-600 dark:text-zinc-400' :
                                                                           rarity === 'rare' ? 'text-blue-500 dark:text-blue-400' :
                                                                                rarity === 'epic' ? 'text-purple-500 dark:text-purple-400' :
                                                                                     'text-yellow-500 dark:text-yellow-400'}`}>
                                                                           {rarity} Tier ({items.length})
                                                                      </h3>
                                                                 </button>
                                                                 {!collapsedRarities[biome]?.[rarity] && (
                                                                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                                                                           {items.map((item, index) => (
                                                                                <div
                                                                                     key={`${biome}-${rarity}-${index}`}
                                                                                     onClick={() => hasModalData(item) ? setSelectedItem(item) : null}
                                                                                     className={`flex flex-col items-center p-2 rounded-lg border border-zinc-200 dark:border-zinc-700
                                                                               } bg-white dark:bg-zinc-800 ${hasModalData(item) ? 'hover:bg-zinc-50 dark:hover:bg-zinc-700/50 cursor-pointer' : ''} relative group`}
                                                                                >
                                                                                     <div className="bg-zinc-100 dark:bg-zinc-900 p-2 rounded-lg mb-1">
                                                                                          <Image
                                                                                               src={getItemImage(item)}
                                                                                               alt={item.name || item.type}
                                                                                               width={32}
                                                                                               height={32}
                                                                                               className="pixelated" />
                                                                                     </div>
                                                                                     <span className="text-xs text-center text-zinc-900 dark:text-white font-medium line-clamp-1 w-full px-1">
                                                                                          {item.name || item.type.replace(/_/g, ' ')}
                                                                                     </span>
                                                                                     {/* Show block range if available
                                                                                     {getBlockRangeText(item) && (
                                                                                          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 line-clamp-1 w-full px-1">
                                                                                               {getBlockRangeText(item)}
                                                                                          </span>
                                                                                     )} */}
                                                                                     {(item.chances && Object.keys(item.chances[0]).length > 1 || hasModalData(item)) && (
                                                                                          <Info className='absolute top-1 right-1 w-3 h-3 text-zinc-400' />
                                                                                     )}
                                                                                </div>
                                                                           ))}
                                                                      </div>
                                                                 )}
                                                            </div>
                                                       ))}
                                                  </div>
                                             ) : (
                                                  <div className="space-y-2">
                                                       {Object.entries(rarities).map(([rarity, items]) => items.map((item, index) => (
                                                            <div
                                                                 key={`${biome}-${rarity}-${index}`}
                                                                 onClick={() => hasModalData(item) ? setSelectedItem(item) : null}
                                                                 className={`flex items-center gap-4 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 relative group ${hasModalData(item) ? 'hover:bg-zinc-50 dark:hover:bg-zinc-700/50 cursor-pointer' : ''}`}
                                                            >
                                                                 <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg">
                                                                      <Image
                                                                           src={getItemImage(item)}
                                                                           alt={item.name || item.type}
                                                                           width={48}
                                                                           height={48}
                                                                           className="w-12 h-12 object-contain" />
                                                                 </div>
                                                                 <div>
                                                                      <p className="font-medium text-zinc-900 dark:text-white">
                                                                           {item.name || item.type.replace(/_/g, ' ')}
                                                                      </p>
                                                                      <div className="flex gap-2 mt-1">
                                                                           <span className="text-xs capitalize text-zinc-600 dark:text-zinc-400">
                                                                                {rarity}
                                                                           </span>
                                                                           {getBlockRangeText(item) && (
                                                                                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                                                                     {getBlockRangeText(item)}
                                                                                </span>
                                                                           )}
                                                                           {item.chances?.[0] !== undefined && (
                                                                                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                                                                     {(Number(item.chances[0]) * 100).toFixed(2)}%
                                                                                </span>
                                                                           )}
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       ))
                                                       )}
                                                  </div>
                                             )}
                                        </div>
                                   );
                              } else {
                                   return null;
                              }
                         })}
                    </div>
               </main>
          </>
     );
}