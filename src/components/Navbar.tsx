'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Download, Menu, X } from 'lucide-react';

export default function Navbar() {
     const [isOpen, setIsOpen] = useState(false);

     return (
          <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                         <Link
                              href="/"
                              className="font-semibold text-lg hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                         >
                              Mine Treasure
                         </Link>

                         <div className="hidden md:flex items-center space-x-8">
                              <Link
                                   href="/"
                                   className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
                              >
                                   Home
                              </Link>
                              <Link
                                   href="/loot"
                                   className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
                              >
                                   Loot
                              </Link>
                              <Link
                                   href="https://discord.gg/ASB67acx2Y"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
                              >
                                   Discord
                              </Link>
                              <Link
                                   href="/download"
                                   className="inline-flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-colors"
                              >
                                   <Download className="h-4 w-4" />
                                   Download
                              </Link>
                         </div>

                         <button
                              onClick={() => setIsOpen(!isOpen)}
                              className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                              aria-label="Toggle menu"
                         >
                              {isOpen ? (
                                   <X className="h-6 w-6" />
                              ) : (
                                   <Menu className="h-6 w-6" />
                              )}
                         </button>
                    </div>
               </div>

               {isOpen && (
                    <div
                         className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm md:hidden"
                         onClick={() => setIsOpen(false)}
                    />
               )}

               <div
                    className={`absolute top-[64px] left-0 right-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 md:hidden transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'
                         }`}
               >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
                         <Link
                              href="/"
                              onClick={() => setIsOpen(false)}
                              className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                         >
                              Home
                         </Link>
                         <Link
                              href="/loot"
                              onClick={() => setIsOpen(false)}
                              className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                         >
                              Loot
                         </Link>
                         <Link
                              href="https://discord.gg/ASB67acx2Y"
                              onClick={() => setIsOpen(false)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                         >
                              Discord
                         </Link>
                         <Link
                              href="/download"
                              onClick={() => setIsOpen(false)}
                              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-base font-medium bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-colors"
                         >
                              <Download className="h-4 w-4" />
                              Download
                         </Link>
                    </div>
               </div>
          </nav>
     );
}
