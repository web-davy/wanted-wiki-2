const valuables = [
    { name: "Green Ornament", rarity: "Christmas-Limited", pricenc: 75, weight: 1 },
    { name: "Blue Ornament", rarity: "Christmas-Limited", pricenc: 100, weight: 1 },
    { name: "Red Ornament", rarity: "Christmas-Limited", pricenc: 125, weight: 1 },
    { name: "Striped Ornament", rarity: "Christmas-Limited", pricenc: 275, weight: 1 },
    { name: "Candy Cane", rarity: "Christmas-Limited", pricenc: 777, weight: 2 },
    { name: "Gold Ornament", rarity: "Christmas-Limited", pricenc: 1000, weight: 1 },
    { name: "Nutcracker", rarity: "Christmas-Limited", pricenc: 1892, weight: 3 },
    { name: "Snowglobe", rarity: "Christmas-Limited", price: 0, pricenc: 8888, weight: 6 },
    { name: "White Ornament", rarity: "Christmas-Limited", price: 0, pricenc: 15000, weight: 1 },

    { name: "Bank Cash Pile", rarity: "Common", price: 200, weight: 0 },
    { name: "Silver Bar", rarity: "Common", price: 300, weight: 2 },
    { name: "PearWatch", rarity: "Common", price: 300, weight: 2 },
    { name: "HDD", rarity: "Common", price: 400, weight: 2 },
    { name: "PearPhone", rarity: "Common", price: 400, weight: 2 },
    { name: "PearPad", rarity: "Common", price: 600, weight: 3 },
    { name: "GoldPhone", rarity: "Common", price: 700, weight: 2 },
    { name: "PSU", rarity: "Common", price: 800, weight: 6 },
    { name: "Gold Bar", rarity: "Uncommon", price: 500, weight: 2 },
    { name: "GoldWatch", rarity: "Uncommon", price: 600, weight: 2 },
    { name: "GoldPods", rarity: "Uncommon", price: 600, weight: 3 },
    { name: "PearBook", rarity: "Uncommon", price: 1000, weight: 6 },
    { name: "Flash Drive", rarity: "Uncommon", price: 1200, weight: 1 },
    { name: "GoldPad", rarity: "Epic", price: 900, weight: 3 },
    { name: "GoldBook", rarity: "Epic", price: 1500, weight: 6 },
    { name: "Military Cash Pile", rarity: "Epic", price: 2500, weight: 0 },
    { name: "Sapphire", rarity: "Epic", price: 2500, weight: 4 },
    { name: "Secret Files", rarity: "Epic", price: 5000, weight: 2 },
    { name: "GPU", rarity: "Epic", price: 9001, weight: 6 },
    { name: "Ruby", rarity: "Mythic", price: 10000, weight: 4 },
    { name: "Emerald", rarity: "Mythic", price: 25000, weight: 4 },
    { name: "Amethyst", rarity: "Legendary", price: 30000, weight: 4 },
    { name: "Diamond", rarity: "Legendary", price: 50000, weight: 4 },
    { name: "Bitcoin", rarity: "Legendary", price: 92000, weight: 1 },
];

function getSortPrice(item) {
    return item.price > 0 ? item.price : 0;
}

function getDisplayPrice(item) {
    return item.price > 0 ? item.price : item.pricenc;
}

function renderValuables(sort = "high") {
    let sorted = [...valuables];

    sorted.sort((a, b) => {
        const pa = getSortPrice(a);
        const pb = getSortPrice(b);

        if (pa > 0 && pb > 0) {
            return sort === "high" ? pb - pa : pa - pb;
        }
        if (pa > 0) return -1;
        if (pb > 0) return 1;

        return sort === "high" ? b.pricenc - a.pricenc : a.pricenc - b.pricenc;
    });

    let html = `
        <h2>VALUABLEs</h2>
        <div class="sort-buttons">
            <span class="sort-btn ${sort === 'high' ? 'active' : ''}" onclick="sortValuables('high')">Price High to Low</span>
            <span class="sort-btn ${sort === 'low' ? 'active' : ''}" onclick="sortValuables('low')">Price Low to High</span>
        </div>
        <div class="card-grid">
    `;

    sorted.forEach(v => {
        const slug = v.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const safeRarity = v.rarity.toLowerCase().replace(/[^a-z0-9]+/g, "-");

        html += `
            <div class="card">
                <img src="images/${slug}.jpg" alt="${v.name}" style="width:100%;height:auto;margin-bottom:15px;border-radius:4px;box-shadow:0 0 10px rgba(255,255,255,0.2);">
                <div class="rarity rarity-${safeRarity}">${v.rarity}</div>
                <h3>${v.name}</h3>
                <p><strong>Price:</strong> $${getDisplayPrice(v).toLocaleString()}</p>
                <p><strong>Weight:</strong> ${v.weight} kg</p>
            </div>`;
    });

    html += `</div>`;
    return html;
}

function sortValuables(order) {
    document.getElementById("page-container").innerHTML = renderValuables(order);
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("page-container").innerHTML = renderValuables("high");
});
