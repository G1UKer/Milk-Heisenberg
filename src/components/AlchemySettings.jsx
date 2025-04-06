import React, { useState } from "react";
import { calculateAlchemyBonuses } from "../services/calculateAlchemyBonuses";
import itemData from "../../public/data/item-data.json";

const equipmentOptions = [
  "Alchemist's Bottoms",
  "Alchemist's Top",
  "Enchanted Gloves"
];

const drinkOptions = [
  "Alchemy Tea",
  "Super Alchemy Tea",
  "Ultra Alchemy Tea",
  "Wisdom Tea",
  "Efficiency Tea",
  "Catalytic Tea"
];

const catalystOptions = [
  "Catalyst Of Coinification",
  "Catalyst Of Decomposition",
  "Catalyst Of Transmutation",
  "Prime Catalyst"
];

const necklaceOptions = [
  "None",
  "Necklace of Efficiency",
  "Necklace of Wisdom",
  "Necklace of Speed",
  "Philosopher's Necklace"
];

const toolOptions = [
  "No tool",
  "Cheese Alembic",
  "Verdant Alembic",
  "Azure Alembic",
  "Burble Alembic",
  "Crimson Alembic",
  "Rainbow Alembic",
  "Holy Alembic",
  "Celestial Alembic"
];

export default function AlchemySettings() {
  const [alchemyLevel, setAlchemyLevel] = useState(1);
  const [labLevel, setLabLevel] = useState(0);
  const [equipment, setEquipment] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [catalysts, setCatalysts] = useState([]);
  const [necklace, setNecklace] = useState("None");
  const [communityXPBuffLevel, setCommunityXPBuffLevel] = useState(0);
  const [communityEfficiencyBuffLevel, setCommunityEfficiencyBuffLevel] = useState(0);
  const [houseXPBonus, setHouseXPBonus] = useState(0);
  const [tool, setTool] = useState("No tool");
  const [toolEnhancement, setToolEnhancement] = useState(0);

  const toggleSelection = (item, setState, state) => {
    if (state.includes(item)) {
      setState(state.filter(i => i !== item));
    } else {
      if (item === "Prime Catalyst") {
        setState(["Prime Catalyst"]);
      } else {
        setState(state.filter(i => i !== "Prime Catalyst").concat(item));
      }
    }
  };

  const bonuses = calculateAlchemyBonuses({
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
  });

  const selectedItem = itemData["Amber"]; // временно захардкожено

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem", color: "#fff" }}>
      <h2>Alchemy Parameters</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>Alchemy Level:</label>
        <input
          type="number"
          min="1"
          max="200"
          value={alchemyLevel}
          onChange={(e) => setAlchemyLevel(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Lab Level:</label>
        <input
          type="number"
          min="0"
          max="8"
          value={labLevel}
          onChange={(e) => setLabLevel(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Community Buffs (Levels 0–20):</label>
        <div>
          <label>Experience Level:</label>
          <input
            type="number"
            min="0"
            max="20"
            value={communityXPBuffLevel}
            onChange={(e) => setCommunityXPBuffLevel(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Production Efficiency Level:</label>
          <input
            type="number"
            min="0"
            max="20"
            value={communityEfficiencyBuffLevel}
            onChange={(e) => setCommunityEfficiencyBuffLevel(Number(e.target.value))}
          />
        </div>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>House XP Bonus (%):</label>
        <input
          type="number"
          min="0"
          max="100"
          value={houseXPBonus}
          onChange={(e) => setHouseXPBonus(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Tool:</label>
        <select value={tool} onChange={(e) => setTool(e.target.value)}>
          {toolOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <div>
          <label>Enhancement Level:</label>
          <input
            type="number"
            min="0"
            max="20"
            value={toolEnhancement}
            onChange={(e) => setToolEnhancement(Number(e.target.value))}
          />
        </div>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Equipment:</label>
        {equipmentOptions.map(item => (
          <div key={item}>
            <label>
              <input
                type="checkbox"
                checked={equipment.includes(item)}
                onChange={() => toggleSelection(item, setEquipment, equipment)}
              /> {item}
            </label>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Drinks:</label>
        {drinkOptions.map(item => (
          <div key={item}>
            <label>
              <input
                type="checkbox"
                checked={drinks.includes(item)}
                onChange={() => toggleSelection(item, setDrinks, drinks)}
              /> {item}
            </label>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Catalysts:</label>
        {catalystOptions.map(item => (
          <div key={item}>
            <label>
              <input
                type="checkbox"
                checked={catalysts.includes(item)}
                onChange={() => toggleSelection(item, setCatalysts, catalysts)}
              /> {item}
            </label>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Necklace:</label>
        {necklaceOptions.map(option => (
          <div key={option}>
            <label>
              <input
                type="radio"
                name="necklace"
                value={option}
                checked={necklace === option}
                onChange={() => setNecklace(option)}
              /> {option}
            </label>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: "2rem",
        padding: "1rem",
        background: "#222",
        color: "#fff",
        border: "1px solid #555",
        borderRadius: "6px"
      }}>
        <h3>Computed Bonuses</h3>
        <p><strong>Effective Alchemy Level:</strong> {bonuses.effectiveAlchemyLevel}</p>
        <p><strong>Efficiency Bonus:</strong> {bonuses.efficiency.toFixed(2)}%</p>
        <p><strong>XP Bonus:</strong> {bonuses.xpBonus.toFixed(2)}%</p>
        <p><strong>Speed Bonus:</strong> {bonuses.speedBonus.toFixed(2)}%</p>
        <p><strong>Average Repeats:</strong> ×{bonuses.averageRepeats.toFixed(2)}</p>
        <p><strong>Action Duration:</strong> {bonuses.effectiveDuration.toFixed(2)}s</p>
        <p><strong>Coinify Profit per Action:</strong> {bonuses.profitPerAction.toFixed(2)}</p>

        <div style={{
          marginTop: "1rem",
          background: "#333",
          color: "#fff",
          padding: "1rem",
          border: "1px solid #666",
          borderRadius: "6px"
        }}>
          <strong>Success Multipliers:</strong>
          <p>Coinify: ×{bonuses.successMultipliers.Coinify.toFixed(2)}</p>
          <p>Decompose: ×{bonuses.successMultipliers.Decompose.toFixed(2)}</p>
          <p>Transmute: ×{bonuses.successMultipliers.Transmute.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
