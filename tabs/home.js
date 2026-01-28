const UPDATES = [
    { version: "v39878", description: "Removed Christmass Event", color: "#ff3333" },
    { version: "v39877", description: "Added Christmass Event", color: "#39ff14" }
];

function renderHome() {
    const updatesHTML = UPDATES.map(update => `
        <div style="display: flex; gap: 10px; padding: 8px 0;">
            <div style="width: 6px; height: 6px; background: ${update.color}; border-radius: 50%; margin-top: 5px; flex-shrink: 0; box-shadow: 0 0 6px ${update.color};"></div>
            <div>
                <div style="color: ${update.color}; font-weight: bold; font-size: 0.95rem;">${update.version}</div>
                <div style="color: #ccc; font-size: 0.8rem; margin-top: 3px;">${update.description}</div>
            </div>
        </div>
    `).join('');

    return `
        <div style="min-height: 100vh; background: transparent; display: flex; flex-direction: column; font-family: 'Courier New', monospace;">
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px; text-align: center; color: white; position: relative; overflow: hidden;">
                <div style="position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%); pointer-events: none;"></div>
                <h1 style="font-size: 3rem; letter-spacing: 0.6em; text-transform: uppercase; margin: 0 0 30px 0; color: white; text-shadow: 0 0 10px white, 0 0 20px white, 0 0 40px white, 0 0 80px white; animation: flicker 4s infinite alternate;">WANTED WIKI</h1>
                <p style="font-size: 1.2rem; line-height: 1.8; max-width: 800px; opacity: 0.95; text-shadow: 0 0 8px white, 0 0 16px white; color: white; margin-bottom: 40px;">
                    Welcome to our wiki,<br>
                    here we log all the info about the game Wanted.
                </p>
                <div style="font-size: 1rem; letter-spacing: 0.3em; opacity: 0.7; text-shadow: 0 0 10px white; animation: pulse 3s infinite;">
                    <a href="https://www.roblox.com/games/14438406081/Wanted" target="_blank" style="color: white; text-shadow: 0 0 20px white; font-weight: bold; text-decoration: underline;">PLAY HERE</a>
                </div>
            </div>

            <div style="padding: 20px; display: flex; justify-content: center; background: transparent;">
                <div style="width: 100%; max-width: 900px;">
                    <div style="background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 16px; box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                            <span style="font-size: 1rem;">⏰</span>
                            <h3 style="font-size: 1rem; letter-spacing: 0.1em; color: white; margin: 0; text-shadow: 0 0 5px white;">RECENT UPDATES</h3>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            ${updatesHTML}
                        </div>
                    </div>
                </div>
            </div>

            <div style="background: transparent; padding: 60px 20px; color: white; position: relative; overflow: hidden;">
                <div style="position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%); pointer-events: none;"></div>
                <div style="max-width: 1000px; margin: 0 auto; text-align: center; position: relative; z-index: 1;">
                    <div style="margin-bottom: 20px; opacity: 0.8;">
                         <img src="images/wikiadmin.png" alt="Wiki Icon" style="width:100%; max-width:150px; height:auto; margin-bottom:15px; border-radius:4px; box-shadow:0 0 10px rgba(255,255,255,0.2); filter: grayscale(1) invert(1);">
                    </div>
                    <h2 style="font-size: 2rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 10px; text-shadow: 0 0 10px white;">Administration and Management</h2>
                    <p style="font-size: 1rem; color: #ccc; margin-bottom: 40px; font-family: sans-serif;">Our wiki is currently managed by 1 Manager.</p>
                    
                    <div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin-bottom: 20px;">
                        <div style="flex: 1; min-width: 280px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(10px); padding: 30px 20px; border-radius: 4px; box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.3);">
                            <h3 style="font-size: 0.9rem; letter-spacing: 0.1em; color: white; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 10px;">WIKI MANAGER</h3>
                            <div style="font-size: 1.2rem; font-weight: bold;">DavyDevv</div>
                        </div>
                        <div style="flex: 1; min-width: 280px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(10px); padding: 30px 20px; border-radius: 4px; box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.3);">
                            <h3 style="font-size: 0.9rem; letter-spacing: 0.1em; color: white; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 10px;">WIKI STAFF</h3>
                            <ul style="list-style: none; padding: 0; margin: 0; font-size: 1.1rem; line-height: 1.6;">
                                <li> </li>
                            </ul>
                        </div>
                    </div>

                    <div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
                        <div style="flex: 1; max-width: 350px; min-width: 280px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(10px); padding: 30px 20px; border-radius: 4px; box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.3);">
                            <h3 style="font-size: 0.9rem; letter-spacing: 0.1em; color: white; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 10px;">WIKI CONTRIBUTORS</h3>
                            <ul style="list-style: none; padding: 0; margin: 0; font-size: 1rem; line-height: 1.6;">
                                <li> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <style>
            @keyframes flicker {
                0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
                20%, 24%, 55% { opacity: 0.8; }
            }
            @keyframes pulse {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 0.9; }
            }
        </style>
    `;
}