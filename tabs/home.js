const UPDATES = [
    { version: "20/02/2026", description: "Major Content Update", color: "#39ff14" },
    { version: "27/12/2025", description: "Removed Christmass Event", color: "#ff3333" },
    { version: "12/12/2025", description: "Added Christmass Event", color: "#39ff14" }
];

const COUNTDOWN_TARGET = new Date('2026-02-20T17:00:00Z');
window.COUNTDOWN_TARGET = COUNTDOWN_TARGET;


function renderHome() {
    const updatesHTML = UPDATES.map(update => `
        <div class="update-row">
            <div class="update-dot" style="background: ${update.color}; box-shadow: 0 0 6px ${update.color};"></div>
            <div>
                <div class="update-version" style="color: ${update.color};">${update.version}</div>
                <div class="update-desc">${update.description}</div>
            </div>
        </div>
    `).join('');

    const managersHTML = (window.CONTRIBUTORS_DATA?.managers || CONTRIBUTORS_DATA?.managers || []).map(m => `
        <div class="staff-card">
            <h3 class="staff-card-title">${m.title.toUpperCase()}</h3>
            <div class="staff-name">${m.name}</div>
        </div>
    `).join('');

    const staffHTML = (window.CONTRIBUTORS_DATA?.staff || CONTRIBUTORS_DATA?.staff || []).map(s => `
        <li><strong>${s.name}</strong> - ${s.title}</li>
    `).join('');

    const contributorsHTML = (window.CONTRIBUTORS_DATA?.contributors || CONTRIBUTORS_DATA?.contributors || []).map(c => `
        <li><strong>${c.name}</strong> - ${c.contributions}</li>
    `).join('');


    return `
        <div class="home-container">
            <div class="hero-section">
                <div class="hero-bg"></div>
                <h1 class="hero-title">WANTED WIKI</h1>
                <p class="hero-text">
                    Welcome to our wiki,<br>
                    here we log all the info about the game Wanted.
                </p>
                <div class="play-btn-container">
                    <a href="https://www.roblox.com/games/14438406081/Wanted" target="_blank" class="play-btn">PLAY HERE</a>
                </div>
            </div>

            <div class="updates-section">
                <div class="updates-wrapper">
                    <div class="updates-box">
                        <div class="updates-header">
                            <span class="updates-icon">ⴵ</span>
                            <h3 class="updates-title">RECENT UPDATES</h3>
                        </div>
                        <div class="updates-list">
                            ${updatesHTML}
                        </div>
                    </div>
                    <div class="countdown-box">
                        <div class="countdown-header">
                            <span class="countdown-icon">⏱</span>
                            <h3 class="countdown-title">NEXT UPDATE</h3>
                        </div>
                        <div id="countdown-display" class="countdown-display">
                            <div class="countdown-time">Calculating...</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="admin-section">
                <div class="admin-bg"></div>
                <div class="admin-content">
                    <div class="admin-icon-container">
                         <img src="images/wikiadmin.png" alt="Wiki Icon" class="admin-icon">
                    </div>
                    <h2 class="admin-title">Administration and Management</h2>
                    <p class="admin-text">Information about the team behind the Wanted Wiki.</p>
                    
                    <div class="staff-grid">
                        ${managersHTML}
                        <div class="staff-card">
                            <h3 class="staff-card-title">WIKI STAFF</h3>
                            <ul class="staff-list">
                                ${staffHTML || '<li>No staff listed.</li>'}
                            </ul>
                        </div>
                    </div>

                    <div class="contributors-grid">
                        <div class="contributor-card">
                            <h3 class="staff-card-title">WIKI CONTRIBUTORS</h3>
                            <ul class="contributor-list">
                                ${contributorsHTML || '<li>No contributors listed.</li>'}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}