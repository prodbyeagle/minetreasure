import { useMemo, useState } from 'react';
import rarities from '@/data/rarities.json';
import initialChances from '@/data/initialChances.json';

export const useBlockChances = (decimalPlaces: number = 2) => {
  const [rarityValues, setRarityValues] = useState({
    common: initialChances.common,
    rare: initialChances.rare,
    epic: initialChances.epic,
    legendary: initialChances.legendary
  });

  const blockChances = useMemo(() => {
    return Object.entries(rarities).map(([blockName, chances]) => {
      const calculatePercent = (value: number, total: number) => {
        return Math.round(((value / total) * 100) * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
      };

      return {
        blockName,
        chances: {
          common: calculatePercent(chances.common, rarityValues.common),
          rare: calculatePercent(chances.rare, rarityValues.rare),
          epic: calculatePercent(chances.epic, rarityValues.epic),
          legendary: calculatePercent(chances.legendary, rarityValues.legendary)
        }
      };
    });
  }, [decimalPlaces, rarityValues]);

  return {
    blockChances,
    rarityValues,
    setRarityValues
  };
};
