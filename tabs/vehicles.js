const vehicles = [
    { name:"Cruiser", price:0, priceContract:0, topSpeed:130, acceleration:38, braking:52, maxHealth:"200 - 100 - 100", armor:0 },
    { name:"Nomad", price:600, priceContract:24000, topSpeed:109, acceleration:31, braking:47, maxHealth:"250 - 100 - 100", armor:1 },
    { name:"G-Cruiser", price:1500, priceContract:240000, topSpeed:144, acceleration:35, braking:47, maxHealth:"400 - 100 - 100", armor:2 },
    { name:"Vanguard", price:3000, priceContract:750000, topSpeed:201, acceleration:45, braking:52, maxHealth:"200 - 100 - 100", armor:0 },
    { name:"Pulse 477", price:"?", priceContract:2400000, topSpeed:205, acceleration:52, braking:62, maxHealth:"200 - 100 - 100", armor:0 },
    { name:"Razor", price:"?", priceContract:3500000, topSpeed:222, acceleration:58, braking:68, maxHealth:"200 - 100 - 100", armor:0 },
    { name:"Spectre", price:15000, priceContract:4800000, topSpeed:263, acceleration:69, braking:80, maxHealth:"250 - 100 - 100", armor:0 },

    { name:"Mini Bird", price:0, priceContract:1400000, topSpeedFlying:92, handling:50, spoolTime:3, maxHealthFlying:"250", armorFlying:0 },
    { name:"Scout", price:0, priceContract:3200000, topSpeedFlying:159, handling:100, spoolTime:5, maxHealthFlying:"400", armorFlying:1 },
];

function renderVehicles(sort = "high") {
    const sorted = [...vehicles].sort((a, b) =>
        sort === "high" ? b.priceContract - a.priceContract : a.priceContract - b.priceContract
    );

    let html = `
        <h2>VEHICLEs</h2>
        <div class="sort-buttons">
            <span class="sort-btn ${sort === 'high' ? 'active' : ''}" onclick="sortVehicles('high')">Expensive to Cheap</span>
            <span class="sort-btn ${sort === 'low' ? 'active' : ''}" onclick="sortVehicles('low')">Cheap to Expensive</span>
        </div>
        <div class="card-grid">
    `;

    sorted.forEach(v => {
        const slug = v.name.toLowerCase().replace(/\s+/g, '-');

        html += `<div class="card">
                    <img src="images/${slug}.jpg" alt="${v.name}" style="width:100%; height:auto; margin-bottom:15px; border-radius:4px; box-shadow:0 0 10px rgba(255,255,255,0.2);">
                    <div class="price-tag">$${(v.priceContract || 0).toLocaleString()}</div>
                    <h3>${v.name}</h3>
                    <p><strong>Repair (fully destroyed):</strong> $${(v.price || 0).toLocaleString()}</p>`;

        // Car stats
        if (v.topSpeed !== undefined) {
            html += `
                <p><strong>Top Speed:</strong> ${v.topSpeed} MPH</p>
                <p><strong>Acceleration:</strong> ${v.acceleration}%</p>
                <p><strong>Braking:</strong> ${v.braking}%</p>
                <p><strong>Max Health:</strong> ${v.maxHealth}</p>
                <p><strong>Armor:</strong> ${v.armor}</p>`;
        }

        // Flying vehicle stats
        if (v.topSpeedFlying !== undefined) {
            html += `
                <p><strong>Top Speed:</strong> ${v.topSpeedFlying} Knots</p>
                <p><strong>Handling:</strong> ${v.handling}%</p>
                <p><strong>Spool Time:</strong> ${v.spoolTime}s</p>
                <p><strong>Max Health:</strong> ${v.maxHealthFlying}</p>
                <p><strong>Armor:</strong> ${v.armorFlying}</p>`;
        }

        html += `</div>`;
    });

    html += `</div>`;
    return html;
}

function sortVehicles(order) {
    document.getElementById("page-container").innerHTML = renderVehicles(order);
}
