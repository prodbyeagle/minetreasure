'use client';

import { Download, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function DownloadPage() {
     return (
          <main>
               <Navbar />

               <div className="pt-24 min-h-screen bg-white dark:bg-zinc-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         {/* Header Section */}
                         <div className="text-center mb-16">
                              <h1 className="text-4xl font-bold mb-4">Download Mine Treasure</h1>
                              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                                   Choose your preferred platform to download Mine Treasure. Make sure to read the installation
                                   instructions for your specific platform.
                              </p>
                         </div>

                         {/* Download Options */}
                         <div className="mb-8">
                              {/* Modrinth */}
                              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-8 rounded-xl">
                                   <h2 className="text-2xl font-semibold mb-4">Modrinth</h2>
                                   <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                                        Download from Modrinth, a community-driven Minecraft mod repository.
                                   </p>
                                   <Link
                                        href="https://modrinth.com/datapack/mine-treasure"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-6 py-3 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-colors"
                                   >
                                        <Download className="mr-2 h-5 w-5" />
                                        Download from Modrinth
                                        <ExternalLink className="ml-2 h-4 w-4" />
                                   </Link>
                              </div>
                         </div>

                         {/* Installation Instructions */}
                         <div className="bg-zinc-50 dark:bg-zinc-800/50 p-8 rounded-xl mb-16">
                              <h2 className="text-2xl font-semibold mb-6">Installation Instructions</h2>

                              <div className="space-y-6">
                                   <div>
                                        <h3 className="text-xl font-medium mb-2">Single Player</h3>
                                        <ol className="list-decimal list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
                                             <li>Download the data pack from your preferred source</li>
                                             <li>Open Minecraft and create a new world or select an existing one</li>
                                             <li>Click on &quot;Data Packs&quot; in the world creation/edit screen</li>
                                             <li>Drag and drop the downloaded file into the Minecraft window</li>
                                             <li>Click &quot;Yes&quot; to confirm the data pack installation</li>
                                             <li>Move the data pack to the &quot;Selected&quot; column</li>
                                             <li>Click &quot;Done&quot; and proceed with creating/loading the world</li>
                                        </ol>
                                   </div>

                                   <div>
                                        <h3 className="text-xl font-medium mb-2">Server Installation</h3>
                                        <ol className="list-decimal list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
                                             <li>Download the data pack</li>
                                             <li>Locate your server&apos;s world folder</li>
                                             <li>Find or create the &quot;datapacks&quot; folder inside the world folder</li>
                                             <li>Place the downloaded file into the &quot;datapacks&quot; folder</li>
                                             <li>Restart your server or use the /reload command</li>
                                             <li>Verify installation with /datapack list command</li>
                                        </ol>
                                   </div>
                              </div>
                         </div>

                         {/* Support Section */}
                         <div className="text-center mb-16">
                              <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
                              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                                   Having trouble with installation or encountered a bug? Join our Discord community for support!
                              </p>
                              <Link
                                   href="https://discord.gg/ASB67acx2Y"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="inline-flex items-center px-6 py-3 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-colors"
                              >
                                   Join Discord
                                   <ExternalLink className="ml-2 h-4 w-4" />
                              </Link>
                         </div>
                    </div>
               </div>
          </main>
     );
}