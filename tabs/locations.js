// locations.js
const locations = [
    {
        name: "Oasis Bank",
        desc: "The Oasis Bank is the main point of interest for criminals and syndicates, as it is the primary source of revenue for both teams."
    },
    {
        name: "Bayview Motors",
        desc: "Bayview Motors is run by Cody. He sells a variety of cars and it is the main place to obtain land vehicles."
    },
    {
        name: "Auto Shop & Repairs",
        desc: "A place where you can repair and customize your vehicle."
    },
    {
        name: "Crystal Club & Resort",
        desc: "A resort run by Ruby, possibly involved in money laundering activities. It holds the prize wheel, which can be spun once per day."
    },
    {
        name: "Davis Heliport",
        desc: "The main location where you can purchase various flying vehicles, run by Davy."
    },
    {
        name: "Fort Emberreach",
        desc: "The largest location marked on the map. Its main purpose is PvP-related; regardless of team, players can fight everyone here, and it is also one of the main ways to make quick money."
    },
    {
        name: "Harris International Airport",
        desc: "A large airport that is currently under construction."
    },
    {
        name: "Lock n' Load Armory",
        desc: "The main place to purchase guns and ammunition. PvP is disabled while inside. Run by Justin."
    },
    {
        name: "Oasis City Police Station",
        desc: "Serves as the headquarters of the police team. PvP is not allowed inside. Its current main character is Bert, though he is not the Chief."
    },
    {
        name: "Oasis City Port",
        desc: "Oasis City's main source of income, currently serving only a decorative and lore-related purpose."
    },
    {
        name: "Ofys Value Pawn",
        desc: "The main way for new players to make cash. Ofy offers lower sell prices, but payments are instant."
    },
    {
        name: "Syndicate Headquarters",
        desc: "The spawn point for the Syndicate team. Inside the hill lies a massive underground base used for various money schemes, run by Brayden."
    },
    {
        name: "Orrery Observatory",
        desc: "Currently a decorative location with no gameplay purpose."
    }
];


function renderLocations(order = "az") {
    const sorted = [...locations].sort((a, b) =>
        order === "az"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
    );
    let html = `
        <h2>LOCATIONs</h2>
        <div class="sort-buttons">
            <span class="sort-btn ${order === 'az' ? 'active' : ''}" onclick="sortLocations('az')">A-Z</span>
            <span class="sort-btn ${order === 'za' ? 'active' : ''}" onclick="sortLocations('za')">Z-A</span>
        </div>
        <div class="card-grid">
    `;
    sorted.forEach(loc => {
        const slug = loc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

        html += `
            <div class="card">
                <img src="images/${slug}.jpg" alt="${loc.name}" style="width:100%; height:auto; margin-bottom:15px; border-radius:4px; box-shadow:0 0 10px rgba(255,255,255,0.2);">
                <h3>${loc.name}</h3>
                <p>${loc.desc}</p>
            </div>`;
    });
    html += `</div>`;
    return html;
}

function sortLocations(order) {
    document.getElementById("page-container").innerHTML = renderLocations(order);
}