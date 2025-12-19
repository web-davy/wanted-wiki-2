function renderHome() {
    setTimeout(() => {
        const input = document.getElementById("terminal-input");
        const history = document.getElementById("terminal-history");
        const terminal = document.querySelector(".terminal");
        if (!input || !history || !terminal) return;
        const startTime = Date.now();
        const sessionId = Math.random().toString(36).slice(2, 10);
        let cwd = "/secure";
        let commandHistory = [];
        let historyIndex = -1;
        let sudoMode = false;
        let isDead = false;
        let idleTimer;
        const typeWrite = (text, color = "#39ff14", speed = 12) => {
            return new Promise(resolve => {
                const line = document.createElement("div");
                line.style.color = color;
                line.style.textShadow = `0 0 8px ${color}`;
                line.style.minHeight = "1.2em";
                history.appendChild(line);
                let i = 0;
                const timer = setInterval(() => {
                    line.textContent = text.slice(0, ++i);
                    history.scrollTop = history.scrollHeight;
                    if (i >= text.length) {
                        clearInterval(timer);
                        resolve();
                    }
                }, speed);
            });
        };
        const instantBlock = (html, color = "#ffffff") => {
            const div = document.createElement("div");
            div.style.color = color;
            div.style.opacity = "0.9";
            div.innerHTML = html;
            history.appendChild(div);
            history.scrollTop = history.scrollHeight;
        };
        const progressBar = (label, color = "#39ff14") => {
            return new Promise(resolve => {
                let progress = 0;
                const line = document.createElement("div");
                line.style.color = color;
                line.style.textShadow = `0 0 8px ${color}`;
                history.appendChild(line);
                const timer = setInterval(() => {
                    progress += Math.random() * 16 + 10;
                    if (progress >= 100) {
                        progress = 100;
                        line.textContent = `${label} [██████████] 100%`;
                        clearInterval(timer);
                        resolve();
                    } else {
                        const filled = Math.floor(progress / 10);
                        const bar = "█".repeat(filled).padEnd(10, "░");
                        line.textContent = `${label} [${bar}] ${Math.floor(progress)}%`;
                    }
                    history.scrollTop = history.scrollHeight;
                }, 60);
            });
        };
        const resetIdleTimer = () => {
            clearTimeout(idleTimer);
            idleTimer = setTimeout(powerOffSequence, 1000 * 60 * 6);
        };
        const powerOffSequence = async () => {
            if (isDead) return;
            isDead = true;
            input.disabled = true;
            const shutdownSound = new Audio("sounds/shutdown.mp3");
            shutdownSound.volume = 0.9;
            shutdownSound.play().catch(() => {});
            const overlay = document.createElement("div");
            overlay.style.position = "fixed";
            overlay.style.inset = "0";
            overlay.style.background = "black";
            overlay.style.opacity = "0";
            overlay.style.transition = "opacity 1s linear";
            overlay.style.zIndex = "999998";
            document.body.appendChild(overlay);
            const collapseBar = document.createElement("div");
            collapseBar.style.position = "fixed";
            collapseBar.style.left = "0";
            collapseBar.style.right = "0";
            collapseBar.style.top = "50%";
            collapseBar.style.height = "2px";
            collapseBar.style.background = "white";
            collapseBar.style.boxShadow = "0 0 40px white";
            collapseBar.style.opacity = "0";
            collapseBar.style.transition = "all 0.4s ease-in";
            collapseBar.style.zIndex = "999999";
            document.body.appendChild(collapseBar);
            const powerLed = document.createElement("div");
            powerLed.style.position = "fixed";
            powerLed.style.bottom = "24px";
            powerLed.style.right = "24px";
            powerLed.style.width = "8px";
            powerLed.style.height = "8px";
            powerLed.style.borderRadius = "50%";
            powerLed.style.background = "white";
            powerLed.style.boxShadow = "0 0 12px white";
            powerLed.style.transition = "opacity 1.2s linear";
            powerLed.style.zIndex = "999999";
            document.body.appendChild(powerLed);
            setTimeout(() => {
                overlay.style.opacity = "0.5";
                terminal.style.filter = "brightness(0.7)";
            }, 200);
            let flickers = 0;
            const flickerInterval = setInterval(() => {
                overlay.style.opacity = Math.random() * 0.6 + 0.3;
                terminal.style.filter = Math.random() > 0.5 ? "brightness(0.5)" : "brightness(0.9)";
                if (++flickers > 12) clearInterval(flickerInterval);
            }, 90);
            setTimeout(() => {
                const sparks = document.createElement("div");
                sparks.style.position = "fixed";
                sparks.style.inset = "0";
                sparks.style.background = "repeating-linear-gradient(0deg, rgba(255,255,255,0.3), transparent 2px)";
                sparks.style.opacity = "0.3";
                sparks.style.pointerEvents = "none";
                sparks.style.zIndex = "999997";
                document.body.appendChild(sparks);
                setTimeout(() => sparks.remove(), 300);
            }, 800);
            setTimeout(() => collapseBar.style.opacity = "1", 1200);
            setTimeout(() => {
                collapseBar.style.height = "100vh";
                collapseBar.style.top = "0";
                overlay.style.opacity = "1";
                powerLed.style.opacity = "0";
                terminal.style.opacity = "0";
            }, 1600);
            setTimeout(() => {
                const finalSound = new Audio("sounds/final.mp3");
                finalSound.volume = 1;
                finalSound.play().catch(() => {});
                document.body.innerHTML = `
                    <div style="
                        position: fixed;
                        inset: 0;
                        background: black;
                        color: #39ff14;
                        font-family: 'Courier New', monospace;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        font-size: 1.3rem;
                        text-align: center;
                        padding: 40px;
                        box-sizing: border-box;
                        text-shadow: 0 0 8px #39ff14;
                    ">
                        <div style="margin-bottom: 40px; opacity: 0.7;">rebooting system...</div>
                        <div style="color: #ff3333; margin-bottom: 20px;">No bootable device found</div>
                        <div style="opacity: 0.5; font-size: 1rem;">Insert boot media and restart</div>
                    </div>
                `;
            }, 2100);
        };
        const commands = {
            async help() {
                await typeWrite("Available commands: help clear status uptime whoami date pwd ls echo connect scan sudo sshnuke exit");
            },
            clear() {
                history.innerHTML = "";
            },
            async status() {
                await typeWrite("system online");
                await typeWrite("threat index: CRITICAL", "#ff3333");
            },
            async uptime() {
                const seconds = Math.floor((Date.now() - startTime) / 1000);
                await typeWrite(`uptime ${seconds}s`);
            },
            async whoami() {
                await typeWrite(`ruby@node-${sessionId}`);
            },
            async date() {
                const now = new Date();
                const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ` +
                                  `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
                await typeWrite(formatted);
            },
            async pwd() {
                await typeWrite(cwd);
            },
            async ls() {
                await typeWrite("intel logs cache tmp");
            },
            async echo(args) {
                await typeWrite(args.join(" "));
            },
            async connect(args) {
                if (!args[0]) return typeWrite("usage: connect <target>", "#ff3333");
                await progressBar(`connecting ${args[0]}`);
                await typeWrite("encrypted tunnel active");
            },
            async scan(args) {
                if (!args[0]) return typeWrite("usage: scan <node>", "#ff3333");
                await typeWrite(`scanning ${args[0]} complete`);
                await typeWrite("open ports: 22 80 443");
            },
            sudo() {
                sudoMode = true;
                instantBlock("[sudo] password for ruby:", "#ffffff");
            },
            async sshnuke() {
                await progressBar("deploying payload");
                await typeWrite("Executing emergency data clear... Farewell...", "#ff3333", 40);
                const panicLines = [
                    "kernel panic — not syncing",
                    "voltage drop detected",
                    "memory overwrite",
                    "filesystem corrupted",
                    "emergency shutdown"
                ];
                for (let i = 0; i < 8; i++) {
                    const msg = panicLines[Math.floor(Math.random() * panicLines.length)];
                    await typeWrite(msg, "#ff3333", 25);
                }
                setTimeout(powerOffSequence, 800);
            },
            async exit() {
                await typeWrite("logout");
            }
        };
        const updatePrompt = () => {
            document.querySelector(".prompt-span").textContent = `ruby@wanted:${cwd}$`;
        };
        input.addEventListener("keydown", async (e) => {
            if (isDead) return;
            resetIdleTimer();
            if (e.key === "ArrowUp") {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    input.value = commandHistory[historyIndex];
                }
                return;
            }
            if (e.key === "ArrowDown") {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    input.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    input.value = "";
                }
                return;
            }
            if (e.key !== "Enter") return;
            let command = input.value.trim();
            if (!command) return;
            input.value = "";
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            instantBlock(`ruby@wanted:${cwd}$ ${command}`, "#ffffff");
            if (sudoMode) {
                sudoMode = false;
                await typeWrite("authentication failure", "#ff3333");
                return;
            }
            const [cmd, ...args] = command.split(" ");
            const handler = commands[cmd];
            if (handler) {
                await handler(args);
            } else {
                await typeWrite(`${cmd}: command not found`, "#ff3333");
            }
        });
        resetIdleTimer();
    }, 0);
    return `
        <div style="min-height: 100vh; background: black; display: flex; flex-direction: column; font-family: 'Courier New', monospace;">
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px; text-align: center; color: white; position: relative; overflow: hidden;">
                <div style="position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%); pointer-events: none;"></div>
                <h1 style="font-size: 3rem; letter-spacing: 0.6em; text-transform: uppercase; margin: 0 0 30px 0; color: white; text-shadow: 0 0 10px white, 0 0 20px white, 0 0 40px white, 0 0 80px white; animation: flicker 4s infinite alternate;">WANTED WIKI</h1>
                <p style="font-size: 1.2rem; line-height: 1.8; max-width: 800px; opacity: 0.95; text-shadow: 0 0 8px white, 0 0 16px white; color: white; margin-bottom: 40px;">
                    Welcome to our wiki,<br>
                    here we log all the info about the game <a href="https://www.roblox.com/games/14438406081/Wanted" target="_blank" style="color: white; text-shadow: 0 0 20px white; font-weight: bold; text-decoration: underline;">Wanted</a>.
                </p>
                <div style="font-size: 1rem; letter-spacing: 0.3em; opacity: 0.7; text-shadow: 0 0 10px white; animation: pulse 3s infinite;">
                    SCROLL DOWN TO ACCESS TERMINAL →
                </div>
            </div>
            <div style="padding: 30px 20px; display: flex; justify-content: center; background: black; border-top: 1px solid rgba(255,255,255,0.2);">
                <div class="terminal" style="position: relative; border-radius: 16px; background: black; border: 2px solid white; padding: 20px; font-family: 'Courier New', monospace; color: #39ff14; box-shadow: 0 0 20px rgba(255,255,255,0.6), inset 0 0 20px rgba(255,255,255,0.1); width: 100%; max-width: 900px;">
                    <div class="header" style="letter-spacing: .7em; font-size: 1.05rem; text-shadow: 0 0 12px white; text-align: center; margin-bottom: 16px; opacity: 0.9; color: white;">
                        TERMINAL v4.7 — MEEPTECH CO.
                    </div>
                    <div id="terminal-history" style="max-height: 460px; overflow-y: auto; margin-bottom: 12px; padding-right: 8px;"></div>
                    <div style="display: flex; align-items: center;">
                        <span class="prompt-span" style="text-shadow: 0 0 8px white; margin-right: 8px; color: white;">ruby@wanted:/secure$</span>
                        <input id="terminal-input" autocomplete="off" spellcheck="false" style="background: transparent; border: none; outline: none; color: #39ff14; font-family: inherit; font-size: inherit; flex: 1; caret-color: #39ff14;" />
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