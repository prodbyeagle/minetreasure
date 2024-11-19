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
                         <div className="text-center mb-16">
                              <h1 className="text-4xl font-bold mb-4">Download Mine Treasure</h1>
                              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                                   Choose your preferred platform to download Mine Treasure. Make sure to read the installation
                                   instructions for your specific platform.
                              </p>
                         </div>

                         <div className="mb-8">
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

                         <div className="bg-zinc-50 dark:bg-zinc-800/50 p-8 rounded-xl mb-16">
                              <h2 className="text-2xl font-semibold mb-6">Installation Instructions</h2>

                              <div className="space-y-8">
                                   <div>
                                        <h3 className="text-xl font-medium mb-4">For New Worlds</h3>
                                        <ol className="list-decimal list-inside space-y-3 text-zinc-600 dark:text-zinc-400">
                                             <li>Download the data pack from Modrinth</li>
                                             <li>Open Minecraft Java Edition</li>
                                             <li>Click &quot;Singleplayer&quot; → &quot;Create New World&quot;</li>
                                             <li>Configure your world settings as desired</li>
                                             <li>Click the &quot;More&quot; tab at the top</li>
                                             <li>Click &quot;Data Packs&quot; button</li>
                                             <li>Drag and drop the downloaded data pack into the Minecraft window</li>
                                             <li>Click &quot;Yes&quot; to confirm the pack</li>
                                             <li>The pack should now appear in the &quot;Available&quot; column</li>
                                             <li>Click the arrow to move it to the &quot;Selected&quot; column</li>
                                             <li>Click &quot;Done&quot; and then &quot;Create New World&quot;</li>
                                        </ol>
                                   </div>

                                   <div>
                                        <h3 className="text-xl font-medium mb-4">For Existing Worlds</h3>
                                        <div className="space-y-4">
                                             <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                                                  Important: Always backup your world before adding data packs!
                                             </p>
                                             <ol className="list-decimal list-inside space-y-3 text-zinc-600 dark:text-zinc-400">
                                                  <li>Download the data pack from Modrinth</li>
                                                  <li>Open Minecraft and select your world</li>
                                                  <li>Click &quot;Edit&quot; button</li>
                                                  <li>Click &quot;Open World Folder&quot;</li>
                                                  <li>Open the &quot;datapacks&quot; folder (create it if it doesn&apos;t exist)</li>
                                                  <li>Copy the downloaded data pack into this folder</li>
                                                  <li>Return to Minecraft</li>
                                                  <li>Load your world</li>
                                                  <li className="pl-8">
                                                       If the pack isn&apos;t automatically enabled:
                                                       <ul className="list-disc mt-2 space-y-2 pl-4">
                                                            <li>Type <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">/datapack list</code> to see all packs</li>
                                                            <li>Type <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">/datapack enable &quot;file/mine_treasure-[version_number]&quot;</code> to enable it</li>
                                                       </ul>
                                                  </li>
                                             </ol>
                                             <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4">
                                                  Tip: You can also use <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">/reload</code> to refresh data packs without restarting the world.
                                             </p>
                                        </div>
                                   </div>

                                   <div>
                                        <h3 className="text-xl font-medium mb-4">Server Installation</h3>
                                        <ol className="list-decimal list-inside space-y-3 text-zinc-600 dark:text-zinc-400">
                                             <li>Download the data pack from Modrinth</li>
                                             <li>Navigate to your server&apos;s main directory</li>
                                             <li>Go to your world folder (usually named &quot;world&quot;)</li>
                                             <li>Open or create the &quot;datapacks&quot; folder</li>
                                             <li>Copy the downloaded data pack into this folder</li>
                                             <li>Restart your server or use the /reload command</li>
                                             <li>Verify installation by typing /datapack list</li>
                                        </ol>
                                        <p className="mt-4 text-sm text-amber-600 dark:text-amber-400">
                                             Note: For servers, make sure you have appropriate permissions to add data packs!
                                        </p>
                                   </div>
                              </div>
                         </div>

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