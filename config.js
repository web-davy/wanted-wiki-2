const RARITIES = {
  COMMON: { name: "Common", class: "rarity-common", color: "#999" },
  UNCOMMON: { name: "Uncommon", class: "rarity-uncommon", color: "#0f0" },
  EPIC: { name: "Epic", class: "rarity-epic", color: "#c0f" },
  LEGENDARY: { name: "Legendary", class: "rarity-legendary", color: "#ff0" },
  MYTHIC: { name: "Mythic", class: "rarity-mythic", color: "#f00" },
  CHRISTMAS: { name: "Christmas-Limited", class: "rarity-christmas-limited", color: "#0f0" }
};

const DIFFICULTIES = {
  EASY: { name: "Easy", class: "rarity-easy", order: 1 },
  MEDIUM: { name: "Medium", class: "rarity-medium", order: 2 },
  HARD: { name: "Hard", class: "rarity-hard", order: 3 },
  CHRISTMAS: { name: "Christmas-Limited", class: "rarity-christmas-limited", order: 0 }
};

const TEAMS = {
  NEUTRAL: { name: "Neutral", class: "rarity-neutral", color: "#0f0" },
  POLICE: { name: "Police", class: "rarity-police", color: "#00f" },
  CRIMINAL: { name: "Criminal", class: "rarity-criminal", color: "#f00" }
};

const generateSlug = (name) => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

const formatPrice = (price) => {
  return `<img src="images/cash.png" alt="$" style="height: 16px; width: auto; vertical-align: middle; margin-right: 2px;">${price.toLocaleString()}`;
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RARITIES, DIFFICULTIES, TEAMS, generateSlug, formatPrice };
}
