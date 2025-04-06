import React, { useState } from "react";
import itemData from "../data/item-data.json";
import { calculateAlchemyBonuses } from "../services/calculateAlchemyBonuses";

const columnStyle = {
  backgroundColor: "#162821",
  border: "1px solid #2a4437",
  padding: "1rem",
  borderRadius: "6px",
  margin: "0.5rem",
  boxShadow: "0 0 8px #0f2d24",
  flex: 1,
  minWidth: "250px"
};

const AlchemySettings = () => {
  const [settings, setSettings] = useState({
    alchemyLevel: 1,
    labLevel: 0,
    communityXP: 0,
    communityEfficiency: 0,
    toolXP: 0,
    toolEfficiency: 0,
    enhancementLevel: 0,
    equipment: [],
    drinks: [],
    catalyst: "",
    necklace: ""
  });

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const handleCatalystChange = (value) => {
    setSettings(prev => ({
      ...prev,
      catalyst: prev.catalyst === value ? "" : value
    }));
  };

  const bonuses = calculateAlchemyBonuses(settings, itemData["Amber"]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {/* Столбец 1 */}
      <div style={columnStyle}>
        <h3>Base Settings</h3>
        <label>Alchemy Level:
          <input
            type="number"
            min={1}
            value={settings.alchemyLevel}
            onChange={e => handleChange("alchemyLevel", Number(e.target.value))}
          />
        </label>
        <label>Lab Level:
          <input
            type="number"
            min={0}
            value={settings.labLevel}
            onChange={e => handleChange("labLevel", Number(e.target.value))}
          />
        </label>
        <label>Community Buff - XP:
          <input
            type="number"
            min={0}
            max={20}
            value={settings.communityXP}
            onChange={e => handleChange("communityXP", Number(e.target.value))}
          />
        </label>
        <label>Community Buff - Efficiency:
          <input
            type="number"
            min={0}
            max={20}
            value={settings.communityEfficiency}
            onChange={e => handleChange("communityEfficiency", Number(e.target.value))}
          />
        </label>
        <label>Tool XP %:
          <input
            type="number"
            min={0}
            value={settings.toolXP}
            onChange={e => handleChange("toolXP", Number(e.target.value))}
          />
        </label>
        <label>Tool Efficiency %:
          <input
            type="number"
            min={0}
            value={settings.toolEfficiency}
            onChange={e => handleChange("toolEfficiency", Number(e.target.value))}
          />
        </label>
        <label>Enhancement Level:
          <input
            type="number"
            min={0}
            max={20}
            value={settings.enhancementLevel}
            onChange={e => handleChange("enhancementLevel", Number(e.target.value))}
          />
        </label>
      </div>

      {/* Столбец 2 */}
      <div style={columnStyle}>
        <h3>Equipment</h3>
        {["Alchemist's Bottoms", "Alchemist's Top"].map(equip => (
          <label key={equip}>
            <input
              type="checkbox"
              checked={settings.equipment.includes(equip)}
              onChange={() => handleCheckboxChange("equipment", equip)}
            />
            {equip}
          </label>
        ))}
        <h3>Drinks</h3>
        {["Alchemy Tea", "Artisan Tea", "Magic Coffee"].map(drink => (
          <label key={drink}>
            <input
              type="checkbox"
              checked={settings.drinks.includes(drink)}
              onChange={() => handleCheckboxChange("drinks", drink)}
            />
            {drink}
          </label>
        ))}
      </div>

      {/* Столбец 3 */}
      <div style={columnStyle}>
        <h3>Catalyst</h3>
        {["Coinification", "Decomposition", "Transmutation", "Prime"].map(cat => (
          <label key={cat}>
            <input
              type="checkbox"
              checked={settings.catalyst === cat}
              onChange={() => handleCatalystChange(cat)}
            />
            Catalyst of {cat}
          </label>
        ))}
        <h3>Necklace</h3>
        {["None", "Necklace of Efficiency", "Necklace of Wisdom", "Necklace of Speed", "Philosopher's Necklace"].map(n => (
          <label key={n}>
            <input
              type="radio"
              checked={settings.necklace === n}
              onChange={() => handleChange("necklace", n)}
            />
            {n}
          </label>
        ))}
      </div>

      {/* Столбец 4 */}
      <div className="computed-block" style={{ ...columnStyle, flexBasis: "100%" }}>
        <h3>Computed Bonuses</h3>
        <p><strong>XP Bonus:</strong> {bonuses.xpBonus.toFixed(2)}%</p>
        <p><strong>Efficiency Bonus:</strong> {bonuses.efficiencyBonus.toFixed(2)}%</p>
        <p><strong>Speed Bonus:</strong> {bonuses.speedBonus.toFixed(2)}%</p>
        <p><strong>Action Duration:</strong> {bonuses.effectiveDuration.toFixed(2)}s</p>
        <p><strong>Average Repeats:</strong> ×{bonuses.repeats.toFixed(2)}</p>
        <p><strong>Coinify Profit per Action:</strong> {bonuses.coinifyProfit.toFixed(2)}</p>
        <div style={{
          backgroundColor: "#101e17",
          border: "1px solid #2c4b3d",
          borderRadius: "6px",
          padding: "0.5rem",
          marginTop: "0.5rem"
        }}>
          <strong>Success Multipliers:</strong><br />
          Coinify: ×{bonuses.successMultipliers.coinify.toFixed(3)}<br />
          Decompose: ×{bonuses.successMultipliers.decompose.toFixed(3)}<br />
          Transmute: ×{bonuses.successMultipliers.transmute.toFixed(3)}
        </div>
      </div>
    </div>
  );
};

export default AlchemySettings;
