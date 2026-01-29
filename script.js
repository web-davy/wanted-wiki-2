document.addEventListener("DOMContentLoaded", () => {
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
                clickSfx.play().catch(() => {});
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

    function preloadImages() {
        const imageSet = new Set();
        const datasets = [
            window.VALUABLES,
            window.ATMS,
            window.WEAPONS,
            window.VEHICLES,
            window.MISSIONS,
            window.NPCS,
            window.LOCATIONS
        ];
        datasets.forEach(dataset => {
            if (!Array.isArray(dataset)) return;
            dataset.forEach(item => {
                if (item.image) imageSet.add(item.image);
                if (Array.isArray(item.images)) {
                    item.images.forEach(img => imageSet.add(img));
                }
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
            }, index * 100);
        });
        
        if (clickPrompt) {
            clickPrompt.style.opacity = '0';
            clickPrompt.style.transform = 'translateY(20px)';
        }
        
        setTimeout(() => {
            if (garageIntro) garageIntro.classList.add("open");
        }, 600);
        
        if (clickSfx) {
            clickSfx.currentTime = 0;
            clickSfx.volume = 0.5;
            clickSfx.play().catch(() => {});
        }
        
        if (bgm) {
            bgm.volume = 0;
            bgm.play().catch(() => {});
            let vol = 0;
            const fadeInterval = setInterval(() => {
                vol += 0.01;
                if (vol >= volumeSlider.value) {
                    vol = parseFloat(volumeSlider.value);
                    clearInterval(fadeInterval);
                }
                bgm.volume = vol;
            }, 50);
        }
        
        setTimeout(() => {
            if (garageIntro) garageIntro.remove();
        }, 3000);
        
        document.querySelector('.tab[data-page="home"]').classList.add("active");
        preloadImages();
        
        setTimeout(() => {
            loadPage("home");
        }, 800);
    };

    document.querySelectorAll(".tab").forEach(tab => {
        tab.addEventListener("click", () => {
            if (!audioUnlocked) return;
            if (clickSfx) {
                clickSfx.currentTime = 0;
                clickSfx.volume = 0.3;
                clickSfx.play().catch(() => {});
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
                hoverSfx.play().catch(() => {});
            }
        });
    });

    contentWrapper.addEventListener("click", e => {
        const btn = e.target.closest(".sort-btn");
        if (!btn || !audioUnlocked) return;
        if (clickSfx) {
            clickSfx.currentTime = 0;
            clickSfx.volume = 0.3;
            clickSfx.play().catch(() => {});
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
        ripple.style.marginLeft = -size/2 + 'px';
        ripple.style.marginTop = -size/2 + 'px';
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
            hoverSfx.play().catch(() => {});
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
            loadSfx.play().catch(() => {});
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
});