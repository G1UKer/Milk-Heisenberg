export function calculateAlchemyBonuses(settings, item) {
  const enhancementBonusTable = [
    0, 2, 4.2, 6.6, 9.2, 12, 15, 18.2, 21.6, 25.5, 29,
    33, 37.2, 41.6, 46.2, 51, 56, 61.2, 66.6, 72.2, 78
  ];

  const xpNecklaceBonus = settings.necklace === "Necklace of Wisdom" || settings.necklace === "Philosopher's Necklace" ? 10 : 0;
  const effNecklaceBonus = settings.necklace === "Necklace of Efficiency" || settings.necklace === "Philosopher's Necklace" ? 5 : 0;
  const speedNecklaceBonus = settings.necklace === "Necklace of Speed" || settings.necklace === "Philosopher's Necklace" ? 5 : 0;

  const enhancementMultiplier = 1 + (enhancementBonusTable[settings.enhancementLevel] || 0) / 100;

  const xpBonus = (
    settings.toolXP * enhancementMultiplier +
    settings.communityXP * 1.475 +
    (settings.equipment.includes("Alchemist's Top") ? 5 : 0) +
    (settings.drinks.includes("Artisan Tea") ? 5 : 0) +
    xpNecklaceBonus
  );

  const efficiencyBonus = (
    settings.toolEfficiency * enhancementMultiplier +
    (settings.equipment.includes("Alchemist's Bottoms") ? 5 : 0) +
    (settings.drinks.includes("Alchemy Tea") ? 5 : 0) +
    settings.communityEfficiency * 0.985 +
    effNecklaceBonus
  );

  const speedBonus = (
    (settings.labLevel * 1.5) +
    (settings.drinks.includes("Magic Coffee") ? 15 : 0) +
    speedNecklaceBonus
  );

  const baseDuration = 20;
  const effectiveDuration = baseDuration / (1 + speedBonus / 100);
  const repeats = 1 + efficiencyBonus / 100;

  const catalystMultiplier = (type) => {
    const catalysts = {
      Coinification: "coinify",
      Decomposition: "decompose",
      Transmutation: "transmute",
      Prime: "prime"
    };

    const active = settings.catalyst === type || settings.catalyst === "Prime";
    return active ? 1.25 : 1.0;
  };

  const successMultipliers = {
    coinify: catalystMultiplier("Coinification"),
    decompose: catalystMultiplier("Decomposition"),
    transmute: catalystMultiplier("Transmutation")
  };

  const coinifyProfit = item && item.sellPrice ? item.sellPrice * 5 : 0;

  return {
    xpBonus,
    efficiencyBonus,
    speedBonus,
    effectiveDuration,
    repeats,
    successMultipliers,
    coinifyProfit
  };
}
