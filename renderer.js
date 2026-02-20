function renderCard(item, rarityKey, content, folder = null) {
  const name = item.name || item.title || "";
  const slug = item.id || generateSlug(name);
  const rarity = RARITIES[rarityKey] || DIFFICULTIES[rarityKey] || TEAMS[rarityKey];
  const rarityClass = rarity ? rarity.class : '';
  const rarityName = rarity ? rarity.name : '';
  const imagePath = folder ? `images/${folder}/${slug}.png` : `images/${slug}.png`;

  return `
    <div class="card">
      <img src="${imagePath}" alt="${name}" 
           style="width:100%; height:auto; margin-bottom:15px; border-radius:4px; 
                  box-shadow:0 0 10px rgba(255,255,255,0.2);">
      ${rarityName ? `<div class="rarity ${rarityClass}">${rarityName}</div>` : ''}
      ${content}
    </div>`;
}

function renderCardJPG(item, rarityKey, content, folder = null) {
  const name = item.name || item.title || "";
  const slug = item.id || generateSlug(name);
  const rarity = RARITIES[rarityKey] || DIFFICULTIES[rarityKey] || TEAMS[rarityKey];
  const rarityClass = rarity ? rarity.class : '';
  const rarityName = rarity ? rarity.name : '';
  const imagePath = folder ? `images/${folder}/${slug}.jpg` : `images/${slug}.jpg`;

  return `
    <div class="card">
      <img src="${imagePath}" alt="${name}" 
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

function renderPage(title, sortButtons, cards, disclaimer = null) {
  return `
    <h2>${title}</h2>
    ${disclaimer ? `<div class="page-disclaimer">${disclaimer}</div>` : ''}
    ${sortButtons}
    <div class="card-grid">
      ${cards.join('')}
    </div>`;
}

function renderStat(label, value) {
  if (value === undefined || value === null || value === '' || value === '?' || value === '? - ?') return '';
  return `<p><strong>${label}:</strong> ${value}</p>`;
}

function renderExpandableCard(item, rarityKey, visibleContent, hiddenContent, ext = 'jpg', folder = null) {
  const name = item.name || item.title || "";
  const slug = item.id || generateSlug(name);
  const rarity = RARITIES[rarityKey] || DIFFICULTIES[rarityKey] || TEAMS[rarityKey];
  const rarityClass = rarity ? rarity.class : '';
  const rarityName = rarity ? rarity.name : '';
  const cardId = `card-${slug}-${Math.random().toString(36).substr(2, 9)}`;
  const showButton = item.showMoreButton !== false && hiddenContent && hiddenContent.trim() !== '';
  const imagePath = folder ? `images/${folder}/${slug}.${ext}` : `images/${slug}.${ext}`;

  return `
    <div class="card">
      <img src="${imagePath}" alt="${item.name}" 
           style="width:100%; height:auto; margin-bottom:15px; border-radius:4px; 
                  box-shadow:0 0 10px rgba(255,255,255,0.2);">
      ${rarityName ? `<div class="rarity ${rarityClass}">${rarityName}</div>` : ''}
      ${visibleContent}
      ${hiddenContent && hiddenContent.trim() !== '' ? `
      <div class="card-details ${showButton ? 'collapsed' : ''}" id="${cardId}-details">
        ${hiddenContent}
      </div>` : ''}
      ${showButton ? `
      <button class="card-details-toggle" onclick="toggleCardDetails('${cardId}')">
        Show more...
      </button>` : ''}
    </div>`;
}

function renderExpandableCardJPG(item, rarityKey, visibleContent, hiddenContent, folder = null) {
  return renderExpandableCard(item, rarityKey, visibleContent, hiddenContent, 'jpg', folder);
}

function renderExpandableCardPNG(item, rarityKey, visibleContent, hiddenContent, folder = null) {
  return renderExpandableCard(item, rarityKey, visibleContent, hiddenContent, 'png', folder);
}
