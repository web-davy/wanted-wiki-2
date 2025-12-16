document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("page-container");
    const garageIntro = document.getElementById("garage-intro");
    const clickPrompt = document.getElementById("click-prompt");
    const terminal = document.querySelector(".biometric-terminal");
    const bgm = document.getElementById("bgm");
    const clickSfx = document.getElementById("sfx-click");
    const hoverSfx = document.getElementById("sfx-hover");
    const loadSfx = document.getElementById("sfx-load");
    const volumeSlider = document.getElementById("bgm-volume");
    let audioUnlocked = false;

    if (volumeSlider && bgm) {
        const savedVolume = localStorage.getItem("bgmVolume");
        if (savedVolume !== null) {
            volumeSlider.value = savedVolume;
            bgm.volume = savedVolume;
        }
    }

    window.openGarage = () => {
        if (audioUnlocked) return;
        audioUnlocked = true;

        if (terminal) terminal.style.display = "none";
        if (clickPrompt) clickPrompt.style.display = "none";

        if (garageIntro) garageIntro.classList.add("open");
       
        if (clickSfx) {
            clickSfx.currentTime = 0;
            clickSfx.play().catch(() => {});
        }
        if (bgm) {
            bgm.play().catch(() => {});
        }
       
        setTimeout(() => {
            if (garageIntro) garageIntro.style.display = 'none';
        }, 3000);

        const homeTab = document.querySelector('.tab[data-page="home"]');
        if (homeTab) homeTab.classList.add("active");
        loadPage("home");
    };

    document.querySelectorAll(".tab").forEach(tab => {
        tab.addEventListener("click", () => {
            if (!audioUnlocked) return;
            document.querySelector(".tab.active")?.classList.remove("active");
            tab.classList.add("active");
            if (clickSfx) {
                clickSfx.currentTime = 0;
                clickSfx.play().catch(() => {});
            }
            loadPage(tab.dataset.page);
        });

        tab.addEventListener("mouseenter", () => {
            if (audioUnlocked && hoverSfx) {
                hoverSfx.currentTime = 0;
                hoverSfx.play().catch(() => {});
            }
        });
    });

    if (volumeSlider && bgm) {
        volumeSlider.addEventListener("input", () => {
            bgm.volume = volumeSlider.value;
            localStorage.setItem("bgmVolume", volumeSlider.value);
        });
    }

    function loadPage(page) {
        container.innerHTML = '<div class="loading glitch">ACCESSING ENCRYPTED ARCHIVE...</div>';
        
        if (loadSfx && audioUnlocked) {
            loadSfx.currentTime = 0;
            loadSfx.play().catch(() => {});
        }

        setTimeout(() => {
            let content = "";
            try {
                switch(page) {
                    case "home":
                        content = typeof renderHome === "function" ? renderHome() : defaultError(page);
                        break;
                    case "valuables":
                        content = typeof renderValuables === "function" ? renderValuables() : defaultError(page);
                        break;
                    case "atms":
                        content = typeof renderATMs === "function" ? renderATMs() : defaultError(page);
                        break;
                    case "weapons":
                        content = typeof renderWeapons === "function" ? renderWeapons() : defaultError(page);
                        break;
                    case "vehicles":
                        content = typeof renderVehicles === "function" ? renderVehicles() : defaultError(page);
                        break;
                    case "locations":
                        content = typeof renderLocations === "function" ? renderLocations() : defaultError(page);
                        break;
                    case "npcs":
                        content = typeof renderNPCs === "function" ? renderNPCs() : defaultError(page);
                        break;
                    case "missions":
                        content = typeof renderMissions === "function" ? renderMissions() : defaultError(page);
                        break;
                    default:
                        content = defaultError(page);
                }
            } catch (err) {
                content = `<div class="error-msg"><h2>DECRYPTION FAILED</h2><p>${err.message}</p></div>`;
            }
            container.innerHTML = content;
        }, 400);
    }

    function defaultError(page) {
        return `<h2>ARCHIVE NOT FOUND</h2><p>The module for [${page.toUpperCase()}] is missing or corrupted.</p>`;
    }
});
