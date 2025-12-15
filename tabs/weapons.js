const weapons = [
    { name: "M9", price: 200, priceContract: 0, ammo: "15/300", ammoPrice: "150$ for 15", damage: "14/10/8", firerate: 400, reload: 2.5, accuracy: "±0.40m @ 25m" },
    { name: "Model 870", price: 2000, priceContract: 20000, ammo: "4/80", ammoPrice: "60$ for 4", damage: "7/6/4", firerate: 66, reload: 0.8, accuracy: "±0.40m @ 25m" },
    { name: "Uzi", price: 2500, priceContract: 25000, ammo: "25/250", ammoPrice: "250$ for 25", damage: "7/6/5", firerate: 1500, reload: 2.2, accuracy: "±3.50m @ 25m" },
    { name: "UMP 45", price: 3000, priceContract: 40000, ammo: "30/240", ammoPrice: "300$ for 30", damage: "10 8 6", firerate: 750, reload: 2, accuracy: "±1.70m @ 50m" },
    { name: "Benelli M1014", price: 3500, priceContract: 40000, ammo: "30/270", ammoPrice: "120$ for 6", damage: "6/4/3", firerate: 230, reload: 0.8, accuracy: "±2.60m @ 25m" },
    { name: "SPAS-12", price: 8000, priceContract: 2000000, ammo: "6/90", ammoPrice: "360$ for 6", damage: "7/6/5", firerate: 200, reload: 0.8, accuracy: "±2.60m @ 25m" },
    { name: "C4", price: 1000, priceContract: 50000, ammo: "1/10", ammoPrice: "1000$ for 1", damage: "?/?/?", firerate: 0, reload: 0, accuracy: "0" },
    { name: "AUG A1", price: 5000, priceContract: 350000, ammo: "30/270", ammoPrice: "450$ for 30", damage: "8/7/6", firerate: 681, reload: 3, accuracy: "±0.90m @ 50m" },
    { name: "RPG 7", price: 10000, priceContract: 1200000, ammo: "1/6", ammoPrice: "2000$ for 1", damage: "18/12/10", firerate: 8, reload: 7, accuracy: "±12.20m @ 200m" },
    { name: "AK-47", price: 6500, priceContract: 800000, ammo: "30/300", ammoPrice: "4500$ for 30", damage: "10/8/8", firerate: 750, reload: 2, accuracy: "±1.50m @ 50m" },
    { name: "Glock 18c", price: 3500, priceContract: 1100000, ammo: "19/285", ammoPrice: "380$ for 19", damage: "15/11/11", firerate: 750, reload: 3, accuracy: "±0.50m @ 25m" },
    { name: "ARX 160", price: 8000, priceContract: 1800000, ammo: "30/300", ammoPrice: "450$ for 30", damage: "10/8/8", firerate: 750, reload: 3, accuracy: "±1.10m @ 50m" },
    { name: "M4A1", price: 8000, priceContract: 1400000, ammo: "30/420", ammoPrice: "600$ for 30", damage: "12/10/8", firerate: 1000, reload: 2, accuracy: "±0.90m @ 50m" },
    { name: "AWM", price: 8000, priceContract: 3500000, ammo: "5/40", ammoPrice: "750$ for 5", damage: "100/65/50", firerate: 30, reload: 3.5, accuracy: "±0.40m @ 50m" },
    { name: "Kriss Vector", price: 8000, priceContract: 3600000, ammo: "30/330", ammoPrice: "450$ for 30", damage: "9/7/6", firerate: 1200, reload: 2, accuracy: "±1.30m @ 50m" },
    { name: "M60", price: 10000, priceContract: 4200000, ammo: "100/800", ammoPrice: "1000$ for 100", damage: "18/12/10", firerate: 750, reload: 5, accuracy: "±4.40m @ 50m" }
];

function renderWeapons(sort = "high") {
    const sorted = [...weapons].sort((a, b) =>
        sort === "high" ? b.priceContract - a.priceContract : a.priceContract - b.priceContract
    );

    let html = `
        <h2>WEAPONs</h2>
        <div class="sort-buttons">
            <span class="sort-btn ${sort === 'high' ? 'active' : ''}" onclick="sortWeapons('high')">Expensive to Cheap</span>
            <span class="sort-btn ${sort === 'low' ? 'active' : ''}" onclick="sortWeapons('low')">Cheap to Expensive</span>
        </div>
        <div class="card-grid">
    `;

    sorted.forEach(w => {
        const slug = w.name.toLowerCase().replace(/\s+/g, '-');

        html += `
            <div class="card">
                <img src="images/${slug}.jpg" alt="${w.name}" style="width:100%; height:auto; margin-bottom:15px; border-radius:4px; box-shadow:0 0 10px rgba(255,255,255,0.2);">
                <div class="price-tag">$${(w.priceContract||0).toLocaleString()}</div>
                <h3>${w.name}</h3>
                <p><strong>Re-buy:</strong> $${(w.price||0).toLocaleString()}</p>
                <p><strong>Ammo:</strong> ${w.ammo}</p>
                <p><strong>Ammo Cost:</strong> ${w.ammoPrice}</p>
                <p><strong>Damage:</strong> ${w.damage}</p>
                <p><strong>RPM:</strong> ${w.firerate}</p>
                <p><strong>Reload:</strong> ${w.reload}s</p>
                <p><strong>Accuracy:</strong> ${w.accuracy}</p>
            </div>`;
    });

    html += `</div>`;
    return html;
}

function sortWeapons(order) {
    document.getElementById("page-container").innerHTML = renderWeapons(order);
}
