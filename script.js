const container = document.getElementById("page-container");
const garageIntro = document.getElementById("garage-intro");
const clickPrompt = document.getElementById("click-prompt");
const bgm = document.getElementById("bgm");
const clickSfx = document.getElementById("sfx-click");
const hoverSfx = document.getElementById("sfx-hover");
const loadSfx = document.getElementById("sfx-load");
const volumeSlider = document.getElementById("bgm-volume");
const sizeSlider = document.getElementById("card-size-slider");
const contentWrapper = document.querySelector(".content");
const staticOverlay = document.querySelector(".static");
const root = document.documentElement;
let audioUnlocked = false;

const DEFAULT_VOLUME = 0.1;
const DEFAULT_SIZE = 200;

const lowEndToggle = document.getElementById("low-end-toggle");
const savedLowEndMode = localStorage.getItem("lowEndMode") === "true";

if (savedLowEndMode) {
    document.body.classList.add("low-end-mode");
    if (lowEndToggle) lowEndToggle.classList.add("active");
}

if (lowEndToggle) {
    lowEndToggle.addEventListener("click", () => {
        const isLowEnd = document.body.classList.toggle("low-end-mode");
        lowEndToggle.classList.toggle("active", isLowEnd);
        localStorage.setItem("lowEndMode", isLowEnd);

        if (audioUnlocked && clickSfx) {
            clickSfx.currentTime = 0;
            clickSfx.volume = 0.3;
            clickSfx.play().catch(() => { });
        }
    });
}

const sidebarToggle = document.getElementById("sidebar-toggle");
const savedSidebarMode = localStorage.getItem("sidebarMode") === "true";

if (savedSidebarMode) {
    document.body.classList.add("left-sidebar-mode");
    if (sidebarToggle) sidebarToggle.classList.add("active");
}

if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
        const isSidebar = document.body.classList.toggle("left-sidebar-mode");
        sidebarToggle.classList.toggle("active", isSidebar);
        localStorage.setItem("sidebarMode", isSidebar);

        const header = document.querySelector('.fixed-header');
        const pageWrapper = document.querySelector('.page-wrapper');

        if (header && pageWrapper) {
            if (isSidebar) {
                header.style.height = '';
                pageWrapper.style.paddingTop = '';
                const savedWidth = localStorage.getItem('headerWidth');
                if (savedWidth) {
                    header.style.width = savedWidth + 'px';
                    pageWrapper.style.paddingLeft = (parseInt(savedWidth) + 30) + 'px';
                }
            } else {
                header.style.width = '';
                pageWrapper.style.paddingLeft = '';
                const savedHeight = localStorage.getItem('headerHeight');
                if (savedHeight) {
                    header.style.height = savedHeight + 'px';
                    pageWrapper.style.paddingTop = (parseInt(savedHeight) + 30) + 'px';
                }
            }
        }

        if (audioUnlocked && clickSfx) {
            clickSfx.currentTime = 0;
            clickSfx.volume = 0.3;
            clickSfx.play().catch(() => { });
        }
    });
}

const alwaysShowMoreToggle = document.getElementById("always-show-more-toggle");
const savedAlwaysShowMore = localStorage.getItem("alwaysShowMore") === "true";

if (savedAlwaysShowMore) {
    document.body.classList.add("always-show-more");
    if (alwaysShowMoreToggle) alwaysShowMoreToggle.classList.add("active");
}

if (alwaysShowMoreToggle) {
    alwaysShowMoreToggle.addEventListener("click", () => {
        const isAlwaysShowMore = document.body.classList.toggle("always-show-more");
        alwaysShowMoreToggle.classList.toggle("active", isAlwaysShowMore);
        localStorage.setItem("alwaysShowMore", isAlwaysShowMore);

        if (audioUnlocked && clickSfx) {
            clickSfx.currentTime = 0;
            clickSfx.volume = 0.3;
            clickSfx.play().catch(() => { });
        }
    });
}

if (volumeSlider) volumeSlider.value = DEFAULT_VOLUME;
if (bgm) bgm.volume = DEFAULT_VOLUME;

const savedVolume = localStorage.getItem("bgmVolume");
if (savedVolume !== null && volumeSlider && bgm) {
    volumeSlider.value = savedVolume;
    bgm.volume = savedVolume;
}

const savedSize = localStorage.getItem("cardSize");
if (savedSize !== null && sizeSlider) {
    sizeSlider.value = savedSize;
    root.style.setProperty('--card-min-size', `${savedSize}px`);
} else {
    root.style.setProperty('--card-min-size', `${DEFAULT_SIZE}px`);
}

const skipGarageIntro = localStorage.getItem("skipGarageIntro") === "true";

if (skipGarageIntro && garageIntro) {
    garageIntro.remove();
    audioUnlocked = true;
    if (bgm) {
        bgm.volume = volumeSlider ? volumeSlider.value : DEFAULT_VOLUME;
        bgm.play().catch(() => { });
    }
    document.querySelector('.tab[data-page="home"]')?.classList.add("active");
    setTimeout(() => {
        loadPage("home");
        preloadImages();
    }, 100);
}

function preloadImages() {
    const imageSet = new Set();
    const getFolder = (item) => {
        if (datasets[0] === item) return 'valuables'; // This logic is tricky, better to explicitly pass
        // Actually it's easier to just map them
        return null;
    };

    const datasetFolders = [
        { data: window.VALUABLES_DATA || window.VALUABLES, folder: 'valuables' },
        { data: window.CHRISTMAS_VALUABLES_DATA, folder: 'valuables' },
        { data: window.ATMS_DATA || window.ATMS, folder: 'atms&vaults' },
        { data: window.VAULTS_DATA, folder: 'atms&vaults' },
        { data: window.GUNS_DATA, folder: 'weapons' },
        { data: window.EXPLOSIVES_DATA, folder: 'weapons' },
        { data: window.TOOLS_DATA, folder: 'weapons' },
        { data: window.VEHICLES_DATA || window.VEHICLES, folder: 'vehicles' },
        { data: window.MISSIONS_DATA || window.MISSIONS, folder: 'missions' },
        { data: window.CHRISTMAS_MISSIONS_DATA, folder: 'missions' },
        { data: window.NPCS_DATA || window.NPCS, folder: 'npcs' },
        { data: window.LOCATIONS_DATA || window.LOCATIONS, folder: 'locations' },
        { data: window.GUN_CRATES_DATA || window.GUN_CRATES, folder: 'crates' }
    ];

    datasetFolders.forEach(entry => {
        if (!Array.isArray(entry.data)) return;
        entry.data.forEach(item => {
            const name = item.name || item.title || "";
            const slug = item.id || (typeof generateSlug === 'function' ? generateSlug(name) : name.toLowerCase().replace(/\s+/g, '-'));
            const ext = entry.folder === 'npcs' ? 'png' : 'jpg';
            imageSet.add(`images/${entry.folder}/${slug}.${ext}`);
        });
    });

    const images = Array.from(imageSet);
    const batchSize = 5;
    let index = 0;

    const loadBatch = () => {
        const batch = images.slice(index, index + batchSize);
        batch.forEach(src => {
            const img = new Image();
            img.src = src;
        });
        index += batchSize;

        if (index < images.length) {
            if ('requestIdleCallback' in window) {
                requestIdleCallback(loadBatch);
            } else {
                setTimeout(loadBatch, 100);
            }
        }
    };

    loadBatch();
}

window.openGarage = () => {
    if (audioUnlocked) return;
    audioUnlocked = true;

    const neverShowCheckbox = document.getElementById("never-show-garage");
    if (neverShowCheckbox && neverShowCheckbox.checked) {
        localStorage.setItem("skipGarageIntro", "true");
    }

    const scanner = document.querySelector('.hand-scanner');
    if (scanner) {
        scanner.style.transform = 'scale(0.95)';
        scanner.style.borderColor = '#0f0';
        scanner.style.boxShadow = '0 0 40px rgba(0,255,65,0.5), inset 0 0 20px rgba(0,255,65,0.2)';
    }

    const statusDots = document.querySelectorAll('.status-dot');
    statusDots.forEach((dot, index) => {
        setTimeout(() => {
            dot.style.background = '#0f0';
            dot.style.boxShadow = '0 0 10px #0f0';
        }, index * 50);
    });

    if (clickPrompt) {
        clickPrompt.style.opacity = '0';
        clickPrompt.style.transform = 'translateY(20px)';
    }

    setTimeout(() => {
        if (garageIntro) garageIntro.classList.add("open");
    }, 300);

    if (clickSfx) {
        clickSfx.currentTime = 0;
        clickSfx.volume = 0.5;
        clickSfx.play().catch(() => { });
    }

    if (bgm) {
        bgm.volume = 0;
        bgm.play().catch(() => { });
        let vol = 0;
        const fadeInterval = setInterval(() => {
            vol += 0.01;
            if (vol >= volumeSlider.value) {
                vol = parseFloat(volumeSlider.value);
                clearInterval(fadeInterval);
            }
            bgm.volume = vol;
        }, 30);
    }

    setTimeout(() => {
        if (garageIntro) garageIntro.remove();
    }, 1500);

    document.querySelector('.tab[data-page="home"]').classList.add("active");
    preloadImages();

    setTimeout(() => {
        loadPage("home");
    }, 400);
};

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('top-tabs');
    const tabs = document.querySelectorAll('.tab');

    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
    });
}


function initSettingsPanel() {
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsPanel = document.getElementById('settings-panel');
    const settingsClose = document.getElementById('settings-close');
    const settingsBackdrop = document.querySelector('.settings-backdrop');
    const resetGarageBtn = document.getElementById('reset-garage-intro');

    if (!settingsToggle || !settingsPanel) return;

    function openSettings() {
        settingsPanel.classList.add('active');
        if (audioUnlocked && clickSfx) {
            clickSfx.currentTime = 0;
            clickSfx.volume = 0.3;
            clickSfx.play().catch(() => { });
        }
    }

    function closeSettings() {
        settingsPanel.classList.remove('active');
        if (audioUnlocked && clickSfx) {
            clickSfx.currentTime = 0;
            clickSfx.volume = 0.3;
            clickSfx.play().catch(() => { });
        }
    }

    settingsToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        openSettings();
    });

    if (settingsClose) {
        settingsClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeSettings();
        });
    }

    if (settingsBackdrop) {
        settingsBackdrop.addEventListener('click', () => {
            closeSettings();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && settingsPanel.classList.contains('active')) {
            closeSettings();
        }
    });

    if (resetGarageBtn) {
        resetGarageBtn.addEventListener('click', () => {
            localStorage.removeItem('skipGarageIntro');

            if (audioUnlocked && clickSfx) {
                clickSfx.currentTime = 0;
                clickSfx.volume = 0.5;
                clickSfx.play().catch(() => { });
            }

            resetGarageBtn.style.background = '#fff';
            resetGarageBtn.style.borderColor = '#fff';
            resetGarageBtn.style.color = '#000';
            resetGarageBtn.innerHTML = '<span class="reset-icon">✓</span><span>Garage Intro Reset!</span>';

            setTimeout(() => {
                resetGarageBtn.style.background = '';
                resetGarageBtn.style.borderColor = '';
                resetGarageBtn.style.color = '';
                resetGarageBtn.innerHTML = '<span class="reset-icon">↻</span><span>Reset Garage Intro</span>';
            }, 2000);
        });
    }
}


function initCountdownTimer() {
    const countdownDisplay = document.getElementById('countdown-display');
    if (!countdownDisplay) return;

    const targetDate = window.COUNTDOWN_TARGET || new Date('2026-02-20T17:00:00Z');

    function updateCountdown() {
        const now = new Date();
        const timeRemaining = targetDate - now;

        if (timeRemaining <= 0) {
            countdownDisplay.innerHTML = '<div class="countdown-time countdown-finished">UPDATE NOW!</div>';
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        countdownDisplay.innerHTML = `
            <div class="countdown-units">
                <div class="countdown-unit">
                    <div class="countdown-number">${days.toString().padStart(2, '0')}</div>
                    <div class="countdown-label">Days</div>
                </div>
                <div class="countdown-unit">
                    <div class="countdown-number">${hours.toString().padStart(2, '0')}</div>
                    <div class="countdown-label">Hours</div>
                </div>
                <div class="countdown-unit">
                    <div class="countdown-number">${minutes.toString().padStart(2, '0')}</div>
                    <div class="countdown-label">Mins</div>
                </div>
                <div class="countdown-unit">
                    <div class="countdown-number">${seconds.toString().padStart(2, '0')}</div>
                    <div class="countdown-label">Secs</div>
                </div>
            </div>
        `;

        setTimeout(updateCountdown, 1000);
    }

    updateCountdown();
}


function initHeaderResize() {
    const header = document.querySelector('.fixed-header');
    const resizeHandle = document.querySelector('.header-resize-handle');
    const pageWrapper = document.querySelector('.page-wrapper');

    if (!header || !resizeHandle || !pageWrapper) return;

    const BASE_HEIGHT = 180;
    const BASE_WIDTH = 250;
    const MIN_WIDTH = 150;
    const MAX_WIDTH = 600;

    // Check if sidebar mode is active
    const isSidebarMode = () => document.body.classList.contains('left-sidebar-mode');

    // Load saved dimensions
    const savedHeight = localStorage.getItem('headerHeight');
    const savedWidth = localStorage.getItem('headerWidth');

    // Update scale for top header
    function updateScale(height) {
        const scale = Math.max(0.5, Math.min(1, height / BASE_HEIGHT));
        document.documentElement.style.setProperty('--header-scale', scale);
    }

    // Update scale for sidebar
    function updateSidebarScale(width) {
        // Calculate scale based on standard 250px width
        // Allow it to go quite small (down to 0.4)
        const scale = Math.max(0.4, Math.min(1.2, width / BASE_WIDTH));
        document.documentElement.style.setProperty('--sidebar-scale', scale);
    }

    // Initialize scale
    if (isSidebarMode()) {
        const currentWidth = parseInt(header.style.width) || BASE_WIDTH;
        updateSidebarScale(currentWidth);
    }

    if (savedHeight && !isSidebarMode()) {
        const height = parseInt(savedHeight);
        header.style.height = height + 'px';
        updatePagePadding(height, false);
        updateScale(height);
    } else if (savedWidth && isSidebarMode()) {
        const width = parseInt(savedWidth);
        header.style.width = width + 'px';
        updatePagePadding(width, true);
        updateSidebarScale(width);
    }

    let isResizing = false;
    let startX = 0, startY = 0;
    let startWidth = 0, startHeight = 0;

    resizeHandle.addEventListener('mousedown', (e) => {
        if (window.innerWidth <= 1024) return;

        isResizing = true;
        const sidebar = isSidebarMode();

        if (sidebar) {
            startX = e.clientX;
            startWidth = header.offsetWidth;
            document.body.style.cursor = 'ew-resize';
        } else {
            startY = e.clientY;
            startHeight = header.offsetHeight;
            document.body.style.cursor = 'ns-resize';
        }

        document.body.style.userSelect = 'none';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;

        const sidebar = isSidebarMode();

        if (sidebar) {
            const deltaX = e.clientX - startX;
            const newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, startWidth + deltaX));
            header.style.width = newWidth + 'px';
            updatePagePadding(newWidth, true);
            updateSidebarScale(newWidth);
        } else {
            const deltaY = e.clientY - startY;
            const newHeight = Math.max(100, Math.min(600, startHeight + deltaY));
            header.style.height = newHeight + 'px';
            updatePagePadding(newHeight, false);
            updateScale(newHeight);
        }
    });

    document.addEventListener('mouseup', () => {
        if (!isResizing) return;

        isResizing = false;
        document.body.style.userSelect = '';
        document.body.style.cursor = '';

        const sidebar = isSidebarMode();

        if (sidebar) {
            const width = header.offsetWidth;
            localStorage.setItem('headerWidth', width);
            // Ensure scale is saved/updated one last time
            updateSidebarScale(width);
        } else {
            localStorage.setItem('headerHeight', header.offsetHeight);
        }
    });

    function updatePagePadding(size, isSidebar) {
        if (isSidebar) {
            pageWrapper.style.paddingLeft = (size + 30) + 'px';
            pageWrapper.style.paddingTop = '';
        } else {
            pageWrapper.style.paddingTop = (size + 30) + 'px';
            pageWrapper.style.paddingLeft = '';
        }
    }

    function updateScale(headerHeight) {
        const scale = Math.max(0.5, Math.min(2, headerHeight / BASE_HEIGHT));
        root.style.setProperty('--header-scale', scale);
    }
}


document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
        if (!audioUnlocked) return;
        if (clickSfx) {
            clickSfx.currentTime = 0;
            clickSfx.volume = 0.3;
            clickSfx.play().catch(() => { });
        }
        if (staticOverlay) {
            staticOverlay.style.opacity = "0.2";
            setTimeout(() => staticOverlay.style.opacity = "0", 200);
        }

        document.querySelectorAll(".tab").forEach(t => {
            t.classList.remove("active");
            t.style.transform = '';
        });

        tab.classList.add("active");

        requestAnimationFrame(() => {
            container.style.opacity = '0';
            container.style.transform = 'translateY(10px)';

            setTimeout(() => {
                requestAnimationFrame(() => {
                    loadPage(tab.dataset.page);
                    container.style.opacity = '1';
                    container.style.transform = 'translateY(0)';
                });
            }, 150);
        });
    });

    tab.addEventListener("mouseenter", () => {
        if (!audioUnlocked) return;
        if (hoverSfx) {
            hoverSfx.currentTime = 0;
            hoverSfx.volume = 0.2;
            hoverSfx.play().catch(() => { });
        }
    });
});

contentWrapper.addEventListener("click", e => {
    const btn = e.target.closest(".sort-btn");
    if (!btn || !audioUnlocked) return;
    if (clickSfx) {
        clickSfx.currentTime = 0;
        clickSfx.volume = 0.3;
        clickSfx.play().catch(() => { });
    }

    const ripple = document.createElement('span');
    ripple.style.cssText = `
            position: absolute;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.marginLeft = -size / 2 + 'px';
    ripple.style.marginTop = -size / 2 + 'px';
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    document.querySelector(".sort-btn.active")?.classList.remove("active");
    btn.classList.add("active");
});

contentWrapper.addEventListener("mouseenter", e => {
    const btn = e.target.closest(".sort-btn");
    if (!btn || !audioUnlocked) return;
    if (hoverSfx) {
        hoverSfx.currentTime = 0;
        hoverSfx.volume = 0.15;
        hoverSfx.play().catch(() => { });
    }
}, true);

if (volumeSlider && bgm) {
    volumeSlider.addEventListener("input", () => {
        bgm.volume = volumeSlider.value;
        localStorage.setItem("bgmVolume", volumeSlider.value);
    });
}

if (sizeSlider) {
    let resizeDebounce;
    sizeSlider.addEventListener("input", () => {
        root.style.setProperty('--card-min-size', `${sizeSlider.value}px`);
        localStorage.setItem("cardSize", sizeSlider.value);

        clearTimeout(resizeDebounce);
        resizeDebounce = setTimeout(() => {
            requestAnimationFrame(() => {
                const cards = document.querySelectorAll('.card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        requestAnimationFrame(() => {
                            card.style.transform = 'skew(-1deg) scale(1.02)';
                            setTimeout(() => {
                                requestAnimationFrame(() => {
                                    card.style.transform = '';
                                });
                            }, 150);
                        });
                    }, index * 15);
                });
            });
        }, 150);
    });
}

function loadPage(page) {
    container.innerHTML = '<div class="loading glitch" data-text="LOADING...">LOADING ARCHIVE...</div>';

    if (audioUnlocked && loadSfx) {
        loadSfx.currentTime = 0;
        loadSfx.volume = 0.3;
        loadSfx.play().catch(() => { });
    }

    let content = "";
    if (page === "home" && typeof renderHome === "function") {
        content = renderHome();
    } else if (page === "valuables" && typeof renderValuables === "function") {
        content = renderValuables();
    } else if (page === "atms" && typeof renderATMs === "function") {
        content = renderATMs();
    } else if (page === "weapons" && typeof renderWeapons === "function") {
        content = renderWeapons();
    } else if (page === "vehicles" && typeof renderVehicles === "function") {
        content = renderVehicles();
    } else if (page === "gun-crates" && typeof renderGunCrates === "function") {
        content = renderGunCrates();
    } else if (page === "missions" && typeof renderMissions === "function") {
        content = renderMissions();
    } else if (page === "npcs" && typeof renderNPCs === "function") {
        content = renderNPCs();
    } else if (page === "locations" && typeof renderLocations === "function") {
        content = renderLocations();
    } else {
        content = `<h2>Work In Progress</h2><p>Under construction...</p>`;
    }

    container.innerHTML = content;

    if (page === "home" && typeof initCountdownTimer === "function") {
        initCountdownTimer();
    }

    const cards = container.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) skew(-1deg)';
    });

    requestAnimationFrame(() => {
        cards.forEach((card, index) => {
            setTimeout(() => {
                requestAnimationFrame(() => {
                    card.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                    card.style.opacity = '1';
                    card.style.transform = '';
                });
            }, index * 30);
        });
    });
}

const style = document.createElement('style');
style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
document.head.appendChild(style);

const searchInput = document.getElementById("search-input");

if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (!query) {
            const activeTab = document.querySelector(".tab.active");
            if (activeTab) loadPage(activeTab.dataset.page);
            return;
        }

        container.innerHTML = '<div class="loading glitch" data-text="SEARCHING...">SEARCHING DATABASE...</div>';

        clearTimeout(window.searchTimeout);
        window.searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
}

function performSearch(query) {
    const results = [];

    const checkData = (data, searchType, categoryLabel) => {
        if (typeof data !== 'undefined' && Array.isArray(data)) {
            data.forEach(item => {
                const itemName = item.name || item.title || "";
                if (itemName.toLowerCase().includes(query)) {
                    results.push({ ...item, name: itemName, searchType, categoryLabel });
                }
            });
        }
    };

    checkData((typeof GUNS_DATA !== 'undefined' ? GUNS_DATA : []), 'weapon', 'WEAPON');
    checkData((typeof EXPLOSIVES_DATA !== 'undefined' ? EXPLOSIVES_DATA : []), 'weapon', 'WEAPON');
    checkData((typeof TOOLS_DATA !== 'undefined' ? TOOLS_DATA : []), 'weapon', 'WEAPON');
    checkData((typeof VEHICLES_DATA !== 'undefined' ? VEHICLES_DATA : window.VEHICLES), 'vehicle', 'VEHICLE');
    checkData((typeof ATMS_DATA !== 'undefined' ? ATMS_DATA : window.ATMS), 'atm', 'ATM');
    checkData((typeof GUN_CRATES_DATA !== 'undefined' ? GUN_CRATES_DATA : window.GUN_CRATES), 'guncrate', 'GUN CRATE');
    checkData((typeof VALUABLES_DATA !== 'undefined' ? VALUABLES_DATA : window.VALUABLES), 'valuable', 'VALUABLE');
    checkData((typeof MISSIONS_DATA !== 'undefined' ? MISSIONS_DATA : window.MISSIONS), 'mission', 'MISSION');
    checkData((typeof NPCS_DATA !== 'undefined' ? NPCS_DATA : window.NPCS), 'npc', 'NPC');
    checkData((typeof LOCATIONS_DATA !== 'undefined' ? LOCATIONS_DATA : window.LOCATIONS), 'location', 'LOCATION');


    if (results.length === 0) {
        container.innerHTML = `
                <h2>NO MATCHES FOUND</h2>
                <p style="text-align:center; color:#888;">No database entries match "${query}"</p>
            `;
        return;
    }

    const cardsHTML = results.map(item => renderSearchItem(item)).join('');

    container.innerHTML = `
            <h2>SEARCH RESULTS: "${query}"</h2>
            <div class="card-grid">
                ${cardsHTML}
            </div>
        `;

    const cards = container.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) skew(-1deg)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
            card.style.opacity = '1';
            card.style.transform = '';
        }, index * 30);
    });
}

function renderSearchItem(item) {
    let slug = generateSlug(item.name || item.title);
    let content = '';
    let rarityKey = null;

    if (item.searchType === 'weapon') {
        content = `
                ${renderPriceTag(item.contractPrice)}
                <h3>${item.name}</h3>
                ${renderStat('Requirements', item.requirements)}
                ${renderStat('Re-buy', formatPrice(item.reBuyPrice))}
                ${renderStat('Ammo', item.stats.ammo)}
                ${renderStat('Ammo Cost', item.stats.ammoPrice)}
                ${renderStat('Damage', item.stats.damage)}
                ${renderStat('RPM', item.stats.firerate)}
                ${renderStat('Reload', `${item.stats.reload}s`)}
                ${renderStat('Accuracy', item.stats.accuracy)}
            `;
        rarityKey = null;
    } else if (item.searchType === 'vehicle') {
        let statsHtml = '';
        if (item.type === 'ground') {
            statsHtml = `
                    ${renderStat('Top Speed', `${item.stats.topSpeed} MPH`)}
                    ${renderStat('Acceleration', `${item.stats.acceleration}%`)}
                    ${renderStat('Braking', `${item.stats.braking}%`)}
                    ${renderStat('Max Health', item.stats.maxHealth)}
                    ${renderStat('Armor', item.stats.armor)}
                `;
        } else if (item.type === 'flying') {
            statsHtml = `
                    ${renderStat('Top Speed', `${item.stats.topSpeed}%`)}
                    ${renderStat('Handling', `${item.stats.handling}%`)}
                    ${renderStat('Spool Time', `${item.stats.spoolTime}s`)}
                    ${renderStat('Max Health', item.stats.maxHealth)}
                    ${renderStat('Armor', item.stats.armor)}
                `;
        }

        content = `
                ${renderPriceTag(item.contractPrice)}
                <h3>${item.name}</h3>
                ${renderStat('Requirements', item.requirements)}
                ${renderStat('Repair (fully destroyed)', formatPrice(item.repairPrice))}
                ${statsHtml}
            `;
        rarityKey = null;
    } else if (item.searchType === 'atm') {
        content = `
              <h3>${item.name}</h3>
              ${renderStat('Cash', formatPrice(item.price))}
            `;
        rarityKey = item.rarity;
    } else if (item.searchType === 'valuable') {
        content = `
              <h3>${item.name}</h3>
              ${renderStat('Price', formatPrice(item.price))}
              ${renderStat('Weight', `${item.weight} kg`)}
            `;
        rarityKey = item.rarity;
    } else if (item.searchType === 'guncrate') {
        content = `
                <h3>${item.name}</h3>
                ${renderStat('Contains', item.gun)}
                ${renderStat('Cooldown', item.cooldown)}
                ${renderStat('Location', item.location)}
            `;
        rarityKey = null;
    } else if (item.searchType === 'mission') {
        slug = item.id;
        content = `
                <h3>${item.title}</h3>
                ${renderStat('Category', item.missionType)}
                ${renderStat('Location', item.location)}
                ${renderStat('Description', item.description)}
                ${renderStat('How', item.howToComplete)}
                ${renderStat('Reward', (item.rewards || []).join(', '))}
            `;
        rarityKey = item.difficulty;
    } else if (item.searchType === 'npc') {
        content = `
                <h3>${item.name}</h3>
                ${renderStat('Location', item.location)}
                ${renderStat('Description', item.description)}
            `;
        rarityKey = item.team;
    } else if (item.searchType === 'location') {
        content = `
                <h3>${item.name}</h3>
                ${renderStat('Description', item.description)}
             `;
        rarityKey = null;
    }

    const folderMap = {
        'weapon': 'weapons',
        'vehicle': 'vehicles',
        'atm': 'atms&vaults',
        'valuable': 'valuables',
        'guncrate': 'crates',
        'mission': 'missions',
        'npc': 'npcs',
        'location': 'locations'
    };
    const folder = folderMap[item.searchType];

    if (item.searchType === 'npc') {
        return renderCard(item, rarityKey, content, folder);
    } else {
        return renderCardJPG(item, rarityKey, content, folder);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof initMobileMenu === 'function') initMobileMenu();
    if (typeof initSettingsPanel === 'function') initSettingsPanel();
    if (typeof initHeaderResize === 'function') initHeaderResize();

    const bgm = document.getElementById('bgm');
    const volumeSlider = document.getElementById('bgm-volume');
    if (bgm && volumeSlider) {
        bgm.volume = volumeSlider.value;
    }
});

function toggleCardDetails(cardId) {
    const detailsElement = document.getElementById(`${cardId}-details`);
    const button = event.target;

    if (!detailsElement || !button) return;

    const isCollapsed = detailsElement.classList.toggle('collapsed');
    button.textContent = isCollapsed ? 'Show more...' : 'Show less...';

    if (audioUnlocked && clickSfx) {
        clickSfx.currentTime = 0;
        clickSfx.volume = 0.2;
        clickSfx.play().catch(() => { });
    }
}