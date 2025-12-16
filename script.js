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
        container.innerHTML = '<div class="loading">ACCESSING...</div>';
        
        if (loadSfx && audioUnlocked) {
            loadSfx.currentTime = 0;
            loadSfx.play().catch(() => {});
        }

        setTimeout(() => {
            let content = "";
            try {
                if (page === "home" && typeof renderHome === "function") content = renderHome();
                else if (page === "valuables" && typeof renderValuables === "function") content = renderValuables();
                else if (page === "atms" && typeof renderATMs === "function") content = renderATMs();
                else if (page === "weapons" && typeof renderWeapons === "function") content = renderWeapons();
                else if (page === "vehicles" && typeof renderVehicles === "function") content = renderVehicles();
                else if (page === "locations" && typeof renderLocations === "function") content = renderLocations();
                else if (page === "npcs" && typeof renderNPCs === "function") content = renderNPCs();
                else if (page === "missions" && typeof renderMissions === "function") content = renderMissions();
                else content = `<h2>NOT FOUND</h2>`;
            } catch (err) {
                content = `<h2>ERROR</h2>`;
            }
            container.innerHTML = content;
        }, 400);
    }
});
