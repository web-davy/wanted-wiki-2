const missions = [
    { 
        title: "Forbidden Meat", 
        location: "Dans Diner – Talk to Dan", 
        desc: "Business has been rough lately: meat prices have skyrocketed. If you can help find an alternative supply, we'll be able to stay open. Find a good meat source, and use the grinder in the back room to see if it makes for good burger meat.", 
        req: ["Criminal/Syndicate team"], 
        how: "Put a player inside the meat grinder to make them into burgers", 
        difficulty: "Medium", 
        reward: "$20,000 and Meat Grinder Furniture" 
    },

    { 
        title: "Artisan 1", 
        location: "Criminal Outpost – Talk to Erik", 
        desc: "I've been brainstorming some ideas for gun modifications, but I'm too busy to test them myself. I want you to follow these instructions exactly, test them out, and then get back to me: Mod UMP 45 with Holographic Sight and a Tactical Laser.", 
        req: ["Criminal/Syndicate team"], 
        how: "Mod the UMP 45 with Holographic Sight and a Tactical Laser", 
        difficulty: "Easy", 
        reward: "$20,000" 
    },

    { 
        title: "Artisan 2", 
        location: "Criminal Outpost – Talk to Erik", 
        desc: "Back for more? Let's get to it. Same as last time: set up the gun, test it out, and head back here. Mod the Model 870 with 12 Gauge Slugs and Vertical Foregrip.", 
        req: ["Criminal/Syndicate team"], 
        how: "Mod the Model 870 with 12 Gauge Slugs and Vertical Foregrip", 
        difficulty: "Easy", 
        reward: "$25,000" 
    },

    { 
        title: "Artisan 3", 
        location: "Criminal Outpost – Talk to Erik", 
        desc: "Let's get right into it. Set up the gun, test it out, and come back: Mod Uzi with Mono Suppressor and Uzi Stock.", 
        req: ["Criminal/Syndicate team"], 
        how: "Mod Uzi with Mono Suppressor and Uzi Stock", 
        difficulty: "Medium", 
        reward: "$40,000" 
    },

    { 
        title: "Artisan 4", 
        location: "Criminal Outpost – Talk to Erik", 
        desc: "Let's get right into it. Set up the gun, test it out, and come back: Bring me a modded AK-47 with Mono Suppressor, Tactical Laser, and Horizontal Foregrip.", 
        req: ["Criminal/Syndicate team"], 
        how: "Mod the AK-47 with Mono Suppressor, Tactical Laser, and Horizontal Foregrip.", 
        difficulty: "Hard", 
        reward: "$60,000" 
    },

    { 
        title: "Artisan 5", 
        location: "Criminal Outpost – Talk to Erik", 
        desc: "Let's get right into it. Set up the gun, test it out, and come back: Bring me a modded Glock 18c with Pistol Suppressor, Reflex Sight and Glock Stock.", 
        req: ["Criminal/Syndicate team"], 
        how: "Mod the Glock 18c with Pistol Suppressor, Reflex Sight and Glock Stock", 
        difficulty: "Hard", 
        reward: "$75,000" 
    },


    { 
        title: "Fuel Depot", 
        location: "Criminal Outpost – Talk to Sir.B", 
        desc: "We've been in the shadows for far too long. I think it's time we come out of hiding. I want to put a real scare into those cops, so let's make some fireworks. Fuel Tankers are the target. You'll need explosives to really make them go boom. Find 3 different tankers and light them up.", 
        req: ["Criminal/Syndicate team"], 
        how: "Destroy 3 of the 5 tankers located at Bank, Military, Airport, Gas Station near Pawn Shop, and near Crystal Resort", 
        difficulty: "Easy", 
        reward: "$25,000" 
    },

    { 
        title: "Loyalty Test", 
        location: "Police Station – Talk to Bert", 
        desc: "If you want to move up in the police force, you'll need to prove your loyalty. There have been reports of new underground criminal activity, and we could use an undercover. Maybe we can use your connections to our advantage...", 
        req: ["Criminal/Syndicate team"], 
        how: "Locate the Criminal Hideout at the Badlands", 
        difficulty: "Easy", 
        reward: "$25,000 and access to the Police Team" 
    },






    { 
        title: "Santas Helper", 
        location: "Park", 
        desc: "I was flying over the mountains into the city and a gust of wind knocked my sleigh and presents out of the sky! Please, help me find them! Christmas depends on it!", 
        req: ["Criminal/Syndicate/Police team"], 
        how: "Give Santa 1 small/big/huge present", 
        difficulty: "Christmas-Limited", 
        reward: "$25.000" 
    },

    { 
        title: "Toy Drive", 
        location: "Park", 
        desc: "It turns out there were some priceless toys in this year's presents that I can't afford to lose. Bring them back to me and I'll make it worth your while!", 
        req: ["Criminal/Syndicate/Police team"], 
        how: "Give Santa 1 nutcracker/candycane/", 
        difficulty: "Christmas-Limited", 
        reward: "$60.000 and LED Reindeer Furniture" 
    },

    { 
        title: "Toy Drive 2", 
        location: "Park", 
        desc: "Kids are getting more and more spoiled every year! These toys will be harder to find, but I'll put in a good word for you with the Easter Bunny if you succeed!", 
        req: ["Criminal/Syndicate/Police team"], 
        how: "Give Santa 1 GPU/Goldbook/Snowglobe", 
        difficulty: "Christmas-Limited", 
        reward: "$100.000 and Snowflake Rims" 
    },




];


const difficultyOrder = { "Easy": 1, "Medium": 2, "Hard": 3, "Extreme": 4 };

function renderMissions(order = "hard") {
    const sorted = [...missions].sort((a, b) =>
        order === "hard"
            ? difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]
            : difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
    );
    let html = `
        <h2>MISSIONs</h2>
        <div class="sort-buttons">
            <span class="sort-btn ${order === 'hard' ? 'active' : ''}" onclick="sortMissions('hard')">Hardest First</span>
            <span class="sort-btn ${order !== 'hard' ? 'active' : ''}" onclick="sortMissions('easy')">Easiest First</span>
        </div>
        <div class="card-grid">
    `;
    sorted.forEach(m => {
        const diff = m.difficulty.toLowerCase();
        const slug = m.title.toLowerCase().replace(/\s+/g, '-'); // Slugify title for image filename
        html += `
            <div class="card">
                <img src="images/${slug}.jpg" alt="${m.title}" style="width:100%; height:auto; margin-bottom:15px; border-radius:4px; box-shadow:0 0 10px rgba(255,255,255,0.2);">
                <div class="rarity rarity-${diff}">${m.difficulty}</div>
                <h3>${m.title}</h3>
                <p><strong>Location:</strong> ${m.location}</p>
                <p><strong>Description:</strong> ${m.desc}</p>
                <p><strong>Requirements:</strong> ${m.req.join(", ")}</p>
                <p><strong>How:</strong> ${m.how}</p>
                <p><strong>Reward:</strong> ${m.reward}</p>
            </div>`;
    });
    html += `</div>`;
    return html;
}
function sortMissions(order) {
    document.getElementById("page-container").innerHTML = renderMissions(order);
}