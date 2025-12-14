document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("page-container");
    const garageIntro = document.getElementById("garage-intro");
    const clickPrompt = document.getElementById("click-prompt"); 
    const bgm = document.getElementById("bgm");
    const clickSfx = document.getElementById("sfx-click");
    const hoverSfx = document.getElementById("sfx-hover");
    const loadSfx = document.getElementById("sfx-load");
    const volumeSlider = document.getElementById("bgm-volume");
    let audioUnlocked = false;
    const contentWrapper = document.querySelector(".content");

    const openGarage = () => {
        if (audioUnlocked) return;
        audioUnlocked = true;

        if (clickPrompt) {
            clickPrompt.classList.add("hidden");
        }

        garageIntro.classList.add("open");
        
        if (clickSfx) {
            clickSfx.currentTime = 0;
            clickSfx.play().catch(() => {});
        }
        if (bgm) {
            bgm.volume = volumeSlider.value;
            bgm.play().catch(() => {});
        }
        
        setTimeout(() => {
            setTimeout(() => {
                if (garageIntro) garageIntro.remove();
            }, 500);

        }, 2800);

        document.querySelector('.tab[data-page="home"]').classList.add("active");
        loadPage("home");
    };

    if (garageIntro) {
        garageIntro.addEventListener("click", openGarage);
    }

    document.querySelectorAll(".tab").forEach(tab => {
        tab.addEventListener("click", () => {
            if (!audioUnlocked) return;
            if (clickSfx) {
                clickSfx.currentTime = 0;
                clickSfx.play().catch(() => {});
            }
            document.querySelector(".tab.active")?.classList.remove("active");
            tab.classList.add("active");
            loadPage(tab.dataset.page);
        });
        tab.addEventListener("mouseenter", () => {
            if (!audioUnlocked) return;
            if (hoverSfx) {
                hoverSfx.currentTime = 0;
                hoverSfx.play().catch(() => {});
            }
        });
    });

    contentWrapper.addEventListener("click", (e) => {
        const btn = e.target.closest(".sort-btn");
        if (!btn) return;
        if (!audioUnlocked) return;
        if (clickSfx) {
            clickSfx.currentTime = 0;
            clickSfx.play().catch(() => {});
        }
        document.querySelector(".sort-btn.active")?.classList.remove("active");
        btn.classList.add("active");
    });

    contentWrapper.addEventListener("mouseenter", (e) => {
        const btn = e.target.closest(".sort-btn");
        if (!btn) return;
        if (!audioUnlocked) return;
        if (hoverSfx) {
            hoverSfx.currentTime = 0;
            hoverSfx.play().catch(() => {});
        }
    }, true);

    if (volumeSlider && bgm) {
        volumeSlider.addEventListener("input", () => {
            bgm.volume = volumeSlider.value;
        });
    }

    function loadPage(page) {
        container.innerHTML = '<div class="loading glitch">LOADING...</div>';
        if (audioUnlocked && loadSfx) {
            loadSfx.currentTime = 0;
            loadSfx.play().catch(() => {});
        }
        let content = "";
        if (page === "home") {
            content = `<h2>WANTED WIKI</h2>
            <p style="text-align:center;line-height:2.2;font-size:1.4rem;opacity:0.9;">
                Welcome, operative.<br>All known criminals, weapons, and missions are logged here.<br>Proceed with caution.
            </p>`;
        } else if (page === "valuables" && typeof renderValuables === "function") content = renderValuables();
        else if (page === "atms" && typeof renderATMs === "function") content = renderATMs();
        else if (page === "weapons" && typeof renderWeapons === "function") content = renderWeapons();
        else if (page === "vehicles" && typeof renderVehicles === "function") content = renderVehicles();
        else if (page === "missions" && typeof renderMissions === "function") content = renderMissions();
        else if (page === "npcs" && typeof renderNPCs === "function") content = renderNPCs();
        else if (page === "locations" && typeof renderLocations === "function") content = renderLocations();
        else content = `<h2>Work In Progress</h2><p>Under contruction...</p>`;
        container.innerHTML = content;
    }
});