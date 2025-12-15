const atms = [
    { name: "Green ATM", rarity: "Common", price: 200},
    { name: "Blue ATM", rarity: "Common", price: 300},
    { name: "Purple ATM", rarity: "Uncommon", price: 500},
    { name: "Red ATM", rarity: "Epic", price: 3000},
    { name: "Gold ATM", rarity: "Mythic", price: 5000},
    { name: "Diamond ATM", rarity: "Legendary", price: 100000},
    { name: "Void ATM", rarity: "Legendary", price: 500000},
];

function renderATMs(sort = "high") {
    const sorted = [...atms].sort((a, b) =>
        sort === "high" ? b.price - a.price : a.price - b.price
    );

    let html = `
        <h2>ATMs</h2>
        <div class="sort-buttons">
            <span class="sort-btn ${sort === 'high' ? 'active' : ''}" onclick="sortATMs('high')">High to Low</span>
            <span class="sort-btn ${sort === 'low' ? 'active' : ''}" onclick="sortATMs('low')">Low to High</span>
        </div>
        <div class="card-grid">
    `;

    sorted.forEach(a => {
        const slug = a.name.toLowerCase().replace(/\s+/g, '-').replace(/\(|\)/g, ''); // remove parentheses for filenames
        const safeRarity = a.rarity.toLowerCase().replace(/\s+/g, "-");

        html += `
            <div class="card">
                <img src="images/${slug}.jpg" alt="${a.name}" style="width:100%; height:auto; margin-bottom:15px; border-radius:4px; box-shadow:0 0 10px rgba(255,255,255,0.2);">
                <div class="rarity rarity-${safeRarity}">${a.rarity}</div>
                <h3>${a.name}</h3>
                <p><strong>Cash:</strong> $${a.price.toLocaleString()}</p>
            </div>`;
    });

    html += `</div>`;
    return html;
}

function sortATMs(order) {
    document.getElementById("page-container").innerHTML = renderATMs(order);
}
