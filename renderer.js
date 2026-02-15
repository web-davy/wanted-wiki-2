function renderCard(item, rarityKey, content) {
  const slug = generateSlug(item.name);
  const rarity = RARITIES[rarityKey] || DIFFICULTIES[rarityKey] || TEAMS[rarityKey];
  const rarityClass = rarity ? rarity.class : '';
  const rarityName = rarity ? rarity.name : '';

  return `
    <div class="card">
      <img src="images/${slug}.png" alt="${item.name}" 
           style="width:100%; height:auto; margin-bottom:15px; border-radius:4px; 
                  box-shadow:0 0 10px rgba(255,255,255,0.2);">
      ${rarityName ? `<div class="rarity ${rarityClass}">${rarityName}</div>` : ''}
      ${content}
    </div>`;
}

function renderPriceTag(price) {
  return `<div class="price-tag">${formatPrice(price)}</div>`;
}

function renderSortButtons(buttons, activeSort) {
  return `
    <div class="sort-buttons">
      ${buttons.map(btn => `
        <span class="sort-btn ${activeSort === btn.value ? 'active' : ''}" 
              onclick="${btn.onClick}">
          ${btn.label}
        </span>
      `).join('')}
    </div>`;
}

function renderPage(title, sortButtons, cards) {
  return `
    <h2>${title}</h2>
    ${sortButtons}
    <div class="card-grid">
      ${cards.join('')}
    </div>`;
}

function renderStat(label, value) {
  return `<p><strong>${label}:</strong> ${value}</p>`;
}