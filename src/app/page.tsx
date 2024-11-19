'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import Review from '../components/Review';
import StatisticsChart from '../components/StatisticsChart';
import { ArrowRight, AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function Home() {
  const whySectionRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <Navbar />
      <div className="pt-16">
        <section className="relative h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="grid lg:grid-cols-2 gap-8 h-full items-center">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
                  Make mining enjoyable again
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl">
                  Ever gotten tired of mining endlessly with no goal in mind? No motivation to go strip-mining?
                  No means to go on this repetitive task for ores? Well, this data pack aims to change exactly that.
                </p>
                <div className="space-x-4">
                  <button
                    onClick={() => scrollTo(whySectionRef)}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  >
                    Read more...
                  </button>
                </div>
                <Link
                  href="/download"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                >
                  Start playing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div className="hidden lg:block">
                <Image
                  src="/images/treasure.svg"
                  alt="Treasure illustration"
                  width={500}
                  height={500}
                  priority
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="py-24 bg-zinc-50 dark:bg-zinc-800/50" ref={whySectionRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">
              Why this datapack?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl">
                <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
                  <Image
                    src="/images/treeasure-tiers.gif"
                    alt="Different treasure tiers"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4">Custom treasures</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  This data pack introduces a whole new way of approaching mining with a huge reward system.
                  Treasure has a chance to spawn when mining a stone-related block. These treasures are divided
                  into several different tiers: Common, Rare, Epic and Legendary.
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl">
                <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
                  <Image
                    src="/images/biomes.jpg"
                    alt="Biome specific treasures"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4">Biome specific</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  There are biome-specific treasures depending on which biome the player is in,
                  which also motivates different bases in different biomes.
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl">
                <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
                  <Image
                    src="/images/items.png"
                    alt="Custom items showcase"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4">Custom items</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  This data pack includes over 80+ loot tables with custom armor, custom weapons,
                  custom food, custom advancements and custom utility items and randomized stats,
                  making many items feel unique.
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl">
                <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
                  <Image
                    src="/images/advancements.png"
                    alt="Custom advancements system"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4">Advancements</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  There is a custom advancement system with 201 new advancements! This data pack
                  introduces an insane addition of new achievements designed around the new custom
                  features this data pack provides.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">
              What players say
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Review
                text="So much content, I can tell a lot of work went into this, very impressive!"
                username="Kefaku"
              />
              <Review
                text="I love this pack so much. Mining is one of those grindy things in minecraft I used to hate so much but now it's got such an allure!"
                username="ThatwitchyPlayr"
              />
            </div>
          </div>
        </section>
        <section className="py-24 bg-zinc-50 dark:bg-zinc-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">
              Our daily statistics
            </h2>
            <StatisticsChart />
          </div>
        </section>
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">
              Compatibility
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-800">
                  <tr>
                    <th className="p-4">Software</th>
                    <th className="p-4">Compatible</th>
                    <th className="p-4">Extra</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  <tr>
                    <td className="p-4 font-medium">Realms</td>
                    <td className="p-4">
                      <AlertCircle className="text-yellow-400 h-5 w-5" />
                    </td>
                    <td className="p-4 text-zinc-600 dark:text-zinc-400">
                      If you have the data pack on realms you may notice that the overworld treasure are not working sometimes.
                      This is due to Realms renaming every folder containing &quot;World&quot; to match the Realm&apos;s name, affecting data pack folders.
                      The overworld folder gets renamed to over(REALMS NAME). We hope Mojang patches this in a future update.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Spigot</td>
                    <td className="p-4">
                      <AlertCircle className="text-yellow-400 h-5 w-5" />
                    </td>
                    <td className="p-4 text-zinc-600 dark:text-zinc-400">
                      Not recommended for multiple data packs. Due to Spigot&apos;s NBT placement blocking, containers with NBTs
                      (like chests with loot) won&apos;t contain loot when placed. For other issues, please join our Discord.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">PaperMC</td>
                    <td className="p-4">
                      <CheckCircle2 className="text-green-400 h-5 w-5" />
                    </td>
                    <td className="p-4 text-zinc-600 dark:text-zinc-400">
                      No inconsistencies as of yet. However, if there are, please report it on our Discord.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Fabric</td>
                    <td className="p-4">
                      <CheckCircle2 className="text-green-400 h-5 w-5" />
                    </td>
                    <td className="p-4 text-zinc-600 dark:text-zinc-400">
                      Personally recommended for data packs as it performs very similar to Vanilla.
                      Report any issues on our Discord.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Forge</td>
                    <td className="p-4">
                      <CheckCircle2 className="text-green-400 h-5 w-5" />
                    </td>
                    <td className="p-4 text-zinc-600 dark:text-zinc-400">
                      Limited testing done, but no issues discovered so far.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Quilt</td>
                    <td className="p-4">
                      <HelpCircle className="text-blue-400 h-5 w-5" />
                    </td>
                    <td className="p-4 text-zinc-600 dark:text-zinc-400">
                      Similar to Fabric. Limited testing, but due to Fabric-like architecture,
                      we expect good compatibility.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Other</td>
                    <td className="p-4">
                      <HelpCircle className="text-blue-400 h-5 w-5" />
                    </td>
                    <td className="p-4 text-zinc-600 dark:text-zinc-400">
                      For any other plugin/mod-related compatibility issues, please report them on our Discord
                      for potential resolution in future updates.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section className="py-24 bg-zinc-50 dark:bg-zinc-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link
              href="/download"
              className="inline-flex items-center px-8 py-4 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors text-lg"
            >
              Start playing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
