'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import type { MT_ITEM } from '@/types/types';

interface ItemModalProps {
     item: MT_ITEM;
     onClose: () => void;
     getItemImage: (item: MT_ITEM) => string;
}

export default function ItemModal({ item, onClose, getItemImage }: ItemModalProps) {
     // Get the rarity based on conditions
     const getBlockRange = () => {
          if (!item.conditions.stoneMined) return null;
          const min = item.conditions.stoneMined.min || 0;
          const max = item.conditions.stoneMined.max;
          return { min, max };
     };

     const blockRange = getBlockRange();

     return (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
               <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
                    <div className="flex items-start justify-between mb-6 sticky top-0 bg-white dark:bg-zinc-900 pt-2 -mt-2 pb-4 border-b border-zinc-200 dark:border-zinc-700 z-10">
                         <div className="flex gap-4">
                              <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
                                   <Image
                                        src={getItemImage(item)}
                                        alt={item.name || item.type}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 object-contain"
                                   />
                              </div>
                              <div>
                                   <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                                        {item.name || item.type.replace(/_/g, ' ')}
                                   </h2>
                                   <div className="mt-1 flex items-center gap-2">
                                        {blockRange && (
                                             <span className="inline-flex items-center rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                                  {blockRange.min.toLocaleString()} - {blockRange.max?.toLocaleString()} blocks
                                             </span>
                                        )}
                                        {item.name && (
                                             <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/20 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                                                  Custom Item
                                             </span>
                                        )}
                                   </div>
                              </div>
                         </div>
                         <button
                              onClick={onClose}
                              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                         >
                              <X className="w-5 h-5" />
                         </button>
                    </div>

                    <div className="space-y-4">
                         {item.lore && item.lore.length > 0 && (
                              <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4">
                                   <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">Description</h3>
                                   <div className="text-sm text-zinc-600 dark:text-zinc-400">
                                        <p className="last:mb-0">{item.lore.join(' ')}</p>
                                   </div>
                              </div>
                         )}

                         {item.enchantments && item.enchantments.length > 0 && (
                              <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4">
                                   <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">Enchantments</h3>
                                   <div className="grid grid-cols-2 gap-2">
                                        {item.enchantments.map((ench, i) => (
                                             <div key={i} className="bg-white dark:bg-zinc-900 rounded px-3 py-2 text-sm">
                                                  <span className="font-medium text-zinc-900 dark:text-white">
                                                       {ench.type.replace(/_/g, ' ')}
                                                  </span>
                                                  <span className="text-zinc-500 dark:text-zinc-400 ml-1">
                                                       {ench.min}-{ench.max}
                                                  </span>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         )}

                         {item.components && Object.keys(item.components).length > 0 && (
                              <div className="mt-4">
                                   <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4">
                                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">Components</h3>
                                        <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg overflow-x-auto text-sm">
                                             <code>
                                                  {JSON.stringify(item.components, null, 2)}
                                             </code>
                                        </pre>
                                   </div>
                              </div>
                         )}
                    </div>
               </div>
          </div>
     );
}
