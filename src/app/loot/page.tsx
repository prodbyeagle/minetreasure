/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { Search, Filter, X } from 'lucide-react';
import treasureData from '@/data/data.json';
import type { MT_DATA, MT_ITEM } from '@/types/types';

export default function LootPage() {
     const [searchQuery, setSearchQuery] = useState('');
     const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
     const [selectedBiomes, setSelectedBiomes] = useState<string[]>([]);
     const [showFilters, setShowFilters] = useState(false);
     const [filteredData, setFilteredData] = useState<MT_DATA>(treasureData);

     const RARITIES = ['common', 'rare', 'epic', 'legendary'];
     const BIOMES = Object.keys(treasureData).map(biome =>
          biome.replace(/_treasure$/, '').replace(/_/g, ' ')
     );

     const toggleRarity = (rarity: string) => {
          setSelectedRarities(prev =>
               prev.includes(rarity)
                    ? prev.filter(r => r !== rarity)
                    : [...prev, rarity]
          );
     };

     const toggleBiome = (biome: string) => {
          const formattedBiome = biome.replace(/ /g, '_') + '_treasure';
          setSelectedBiomes(prev =>
               prev.includes(formattedBiome)
                    ? prev.filter(b => b !== formattedBiome)
                    : [...prev, formattedBiome]
          );
     };

     const clearFilters = () => {
          setSelectedRarities([]);
          setSelectedBiomes([]);
          setSearchQuery('');
     };

     // Filter data based on search query and selected filters
     useEffect(() => {
          const filtered: MT_DATA = {};

          // Filter biomes
          const biomesToShow = selectedBiomes.length > 0
               ? selectedBiomes
               : Object.keys(treasureData);

          biomesToShow.forEach(biome => {
               const biomeData = treasureData[biome as keyof typeof treasureData];
               if (biomeData) {
                    filtered[biome] = {};

                    // Filter rarities
                    const raritiesToShow = selectedRarities.length > 0
                         ? selectedRarities
                         : RARITIES;

                    raritiesToShow.forEach(rarity => {
                         const rarityData = biomeData[rarity as keyof typeof biomeData];
                         if (rarityData) {
                              filtered[biome][rarity] = rarityData.filter((item: MT_ITEM) => {
                                   const searchString = item.name?.toLowerCase() || item.type.replace(/_/g, ' ').toLowerCase();
                                   return searchString.includes(searchQuery.toLowerCase());
                              });
                         }
                    });
               }
          });

          setFilteredData(filtered);
     }, [searchQuery, selectedRarities, selectedBiomes, RARITIES]);

     const getItemImage = (item: MT_ITEM) => {
          return `/items/${item.type}.png`;
     };

     return (
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
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400"
                                   />
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
                                                            : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300'
                                                            } hover:opacity-80 transition-colors`}
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
                                                            : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300'
                                                            } hover:opacity-80 transition-colors`}
                                                  >
                                                       {biome}
                                                  </button>
                                             ))}
                                        </div>
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

                    {/* Loot Grid */}
                    <div className="space-y-8">
                         {Object.entries(filteredData).map(([biome, rarities]) => {
                              // Skip biomes with no items
                              if (Object.values(rarities).every(items => items.length === 0)) return null;

                              return (
                                   <div key={biome} className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-6">
                                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 capitalize">
                                             {biome.replace(/_treasure$/, '').replace(/_/g, ' ')}
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                             {Object.entries(rarities).map(([rarity, items]) =>
                                                  items.map((item, index) => (
                                                       <div
                                                            key={`${biome}-${rarity}-${index}`}
                                                            className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                                                       >
                                                            <div className="aspect-square rounded-lg bg-zinc-100 dark:bg-zinc-700 mb-4 flex items-center justify-center">
                                                                 <Image
                                                                      src={getItemImage(item)}
                                                                      alt={item.name || item.type}
                                                                      width={64}
                                                                      height={64}
                                                                      className="w-16 h-16 object-contain"
                                                                 />
                                                            </div>
                                                            <h3 className="font-medium text-zinc-900 dark:text-white mb-1">
                                                                 {item.name || item.type.replace(/_/g, ' ')}
                                                            </h3>
                                                            <p className="text-sm text-zinc-500 dark:text-zinc-400 capitalize">
                                                                 {rarity} • {biome.replace(/_treasure$/, '').replace(/_/g, ' ')}
                                                            </p>
                                                            {item.conditions.stoneMined && (
                                                                 <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
                                                                      {item.conditions.stoneMined.min && `Min: ${item.conditions.stoneMined.min.toLocaleString()} blocks`}
                                                                      {item.conditions.stoneMined.max && `Max: ${item.conditions.stoneMined.max.toLocaleString()} blocks`}
                                                                 </p>
                                                            )}
                                                       </div>
                                                  ))
                                             )}
                                        </div>
                                   </div>
                              );
                         })}
                    </div>
               </div>
          </main>
     );
}