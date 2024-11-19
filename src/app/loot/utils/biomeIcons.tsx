import Image from 'next/image';

export const getBiomeIcon = (biome: string) => {
    const icons: Record<string, string> = {
        ocean_treasure: '/items/water_bucket.png',
        ice_treasure: '/items/ice.png',
        dark_forest_treasure: '/items/dark_oak_log.png',
        nether_fortress_treasure: '/items/nether_bricks.png',
        crimson_treasure: '/items/crimson_stem.png',
        desert_treasure: '/items/sand.png',
        mine_treasure: '/items/diamond_pickaxe.png',
        dungeon_treasure: '/items/spawner.png',
        mountain_treasure: '/items/stone.png',
        jungle_treasure: '/items/jungle_log.png',
        bastion_treasure: '/items/netherrack.png',
        end_treasure: '/items/end_stone.png',
        badlands_treasure: '/items/red_sand.png',
        dripstone_treasure: '/items/dripstone_block.png',
        flower_treasure: '/items/sunflower.png',
        lush_caves_treasure: '/items/moss_block.png',
        mushroom_treasure: '/items/red_mushroom_block.png',
        nether_treasure: '/items/netherrack.png',
        savanna_treasure: '/items/acacia_log.png',
        soul_valley_treasure: '/items/soul_sand.png',
        swamp_treasure: '/items/lily_pad.png',
        taiga_treasure: '/items/spruce_log.png',
        warped_treasure: '/items/warped_stem.png',
        wind_treasure: '/items/gravel.png',
        basalt_treasure: '/items/basalt.png',
        deepdark_treasure: '/items/sculk_shrieker.png',
        default_treasure: '/items/grass_block.png'
    };

    const iconPath = icons[biome] || '/items/missing_texture_block.png';
    
    // eslint-disable-next-line react/display-name
    return () => (
        <Image
            src={iconPath}
            alt={`${biome} icon`}
            width={30}
            height={30}
            className="pixelated"
        />
    );
};
