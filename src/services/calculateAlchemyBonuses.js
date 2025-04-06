import itemData from "../../public/data/item-data.json";

const enhancementBonusTable = [
  0, 2.0, 4.2, 6.6, 9.2, 12.0, 15.0, 18.2, 21.6, 25.5,
  29.0, 33.0, 37.2, 41.6, 46.2, 51.0, 56.0, 61.2, 66.6, 72.2, 78.0
];

const toolBonuses = {
  "Cheese Alembic": { speed: 15 },
  "Verdant Alembic": { speed: 22.5 },
  "Azure Alembic": { speed: 30 },
  "Burble Alembic": { speed: 45 },
  "Crimson Alembic": { speed: 60 },
  "Rainbow Alembic": { speed: 75 },
  "Holy Alembic": { speed: 90 },
  "Celestial Alembic": { speed: 105, xp: 4 }
};

function getCommunityBuffValue(level, type) {
  if (type === "xp") return level * 1.475;
  if (type === "efficiency") return level * 0.985;
  return 0;
}

export function calculateAlchemyBonuses({
  alchemyLevel,
  labLevel,
  equipment,
  drinks,
  catalysts,
  necklace,
  communityXPBuffLevel,
  communityEfficiencyBuffLevel,
  houseXPBonus,
  tool,
  toolEnhancement
}) {
  let efficiency = 0;
  let xpBonus = 0;
  let speedBonus = 0;

    // Lab bonus
  efficiency += labLevel * 1.5;

  // Equipment
  if (equipment.includes("Alchemist's Bottoms")) {
    efficiency += 10;
    xpBonus += 4;
  }
  if (equipment.includes("Alchemist's Top")) efficiency += 10;
  if (equipment.includes("Enchanted Gloves")) efficiency += 10;

  // Drinks
  if (drinks.includes("Alchemy Tea")) {
    alchemyLevel += 3;
    efficiency += 2;
  }
  if (drinks.includes("Super Alchemy Tea")) {
    alchemyLevel += 6;
    efficiency += 4;
  }
  if (drinks.includes("Ultra Alchemy Tea")) {
    alchemyLevel += 8;
    efficiency += 6;
  }
  if (drinks.includes("Wisdom Tea")) xpBonus += 12;
  if (drinks.includes("Efficiency Tea")) efficiency += 10;

  // Community + House
  xpBonus += getCommunityBuffValue(communityXPBuffLevel, "xp") + houseXPBonus;
  efficiency += getCommunityBuffValue(communityEfficiencyBuffLevel, "efficiency");

  // Necklace
  if (necklace === "Necklace of Efficiency") efficiency += 2;
  if (necklace === "Necklace of Wisdom") xpBonus += 3;
  if (necklace === "Necklace of Speed") speedBonus += 4;
  if (necklace === "Philosopher's Necklace") {
    efficiency += 2;
    xpBonus += 3;
    speedBonus += 4;
  }

  // Tool bonuses
  const toolBase = toolBonuses[tool] || {};
  const enchMult = enhancementBonusTable[toolEnhancement] / 100;

  if (toolBase.xp) xpBonus += toolBase.xp * (1 + enchMult);
  if (toolBase.speed) speedBonus += toolBase.speed * (1 + enchMult);

  // Success multipliers
  const successMultipliers = {
    Coinify: 1,
    Decompose: 1,
    Transmute: 1
  };

  const catalystSet = new Set(catalysts);
  if (catalystSet.has("Catalyst Of Coinification")) successMultipliers.Coinify *= 1.15;
  if (catalystSet.has("Catalyst Of Decomposition")) successMultipliers.Decompose *= 1.15;
  if (catalystSet.has("Catalyst Of Transmutation")) successMultipliers.Transmute *= 1.15;
  if (catalystSet.has("Prime Catalyst")) {
    successMultipliers.Coinify *= 1.25;
    successMultipliers.Decompose *= 1.25;
    successMultipliers.Transmute *= 1.25;
  }

  const averageRepeats = 1 + efficiency / 100;
  const baseDuration = 20;
  const effectiveDuration = baseDuration / (1 + speedBonus / 100);

  const selectedItem = itemData["Amber"]; // temp
  const sellPrice = selectedItem?.sellPrice || 1;
  const profitPerAction = sellPrice * 5;

  return {
    effectiveAlchemyLevel: alchemyLevel,
    efficiency,
    xpBonus,
    speedBonus,
    averageRepeats,
    effectiveDuration,
    profitPerAction,
    successMultipliers
  };
}
