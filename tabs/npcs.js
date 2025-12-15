const npcs = [
    { 
        name: "Erik", 
        team: "Criminal", 
        location: "Criminal Outpost", 
        desc: "Arms dealer specializing in guns, ammo, and modifications. Offers Artisan missions for testing gun mods.", 
    },
    { 
        name: "Dan", 
        team: "Neutral", 
        location: "Dans Diner", 
        desc: "Diner owner facing meat shortages. Seeks alternative supplies through the Forbidden Meat mission.", 
    },
    { 
        name: "Sir.B", 
        team: "Criminal", 
        location: "Criminal Outpost", 
        desc: "Syndicate leader directing operations against law enforcement. Assigns the Fuel Depot mission.", 
    },
    { 
        name: "Bert", 
        team: "Police", 
        location: "Police Station", 
        desc: "Officer recruiting undercover agents from criminal ranks via the Loyalty Test mission.", 
    }
];

function renderNPCs(order = "az") {
    const sorted = [...npcs].sort((a, b) =>
        order === "az" 
            ? a.name.localeCompare(b.name) 
            : b.name.localeCompare(a.name)
    );
    let html = `
        <h2>NPCs</h2>
        <div class="sort-buttons">
            <span class="sort-btn ${order === 'az' ? 'active' : ''}" onclick="sortNPCs('az')">A-Z</span>
            <span class="sort-btn ${order === 'za' ? 'active' : ''}" onclick="sortNPCs('za')">Z-A</span>
        </div>
        <div class="card-grid">
    `;
    sorted.forEach(npc => {
        const slug = npc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const safeTeam = npc.team.toLowerCase().replace(/\s+/g, "-");

        html += `
            <div class="card">
                <img src="images/${slug}.jpg" alt="${npc.name}" style="width:100%; height:auto; margin-bottom:15px; border-radius:4px; box-shadow:0 0 10px rgba(255,255,255,0.2);">
                <div class="rarity rarity-${safeTeam}">${npc.team.toUpperCase()}</div>
                <h3>${npc.name}</h3>
                <p><strong>Location:</strong> ${npc.location}</p>
                <p><strong>Description:</strong> ${npc.desc}</p>
            </div>`;
    });
    html += `</div>`;
    return html;
}

function sortNPCs(order) {
    document.getElementById("page-container").innerHTML = renderNPCs(order);
}