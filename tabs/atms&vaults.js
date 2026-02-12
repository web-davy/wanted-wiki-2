function getRarityPercentage(rarityKey, type) {
  const atmRarities = {
    'COMMON': 35,
    'UNCOMMON': 25,
    'EPIC': 20,
    'MYTHIC': 10,
    'LEGENDARY': 10
  };

  const vaultRarities = {
    'COMMON': 80,
    'UNCOMMON': 17,
    'EPIC': 2.2,
    'LEGENDARY': 0.7,
    'MYTHIC': 0.05
  };

  const rarities = type === 'vault' ? vaultRarities : atmRarities;
  return rarities[rarityKey] || 0;
}

function renderATMs(sort = "high") {
  const sortedATMs = [...ATMS_DATA].sort((a, b) =>
    sort === "high" ? b.price - a.price : a.price - b.price
  );

  const sortedVaults = [...VAULTS_DATA].sort((a, b) =>
    sort === "high" ? b.price - a.price : a.price - b.price
  );

  const atmCards = sortedATMs.map(item => {
    const rarityPercent = getRarityPercentage(item.rarity, 'atm');
    const content = `
      <h3>${item.name}</h3>
      ${renderStat('Rarity', `${rarityPercent}%`)}
      ${renderStat('Cash', formatPrice(item.price))}
    `;
    return renderCard(item, item.rarity, content);
  });

  const vaultCards = sortedVaults.map(item => {
    const rarityPercent = getRarityPercentage(item.rarity, 'vault');
    const content = `
      <h3>${item.name}</h3>
      ${renderStat('Rarity', `${rarityPercent}%`)}
      ${renderStat('Cash', formatPrice(item.price))}
    `;
    return renderCard(item, item.rarity, content);
  });

  const sortButtons = renderSortButtons([
    { label: 'High to Low', value: 'high', onClick: "sortATMs('high')" },
    { label: 'Low to High', value: 'low', onClick: "sortATMs('low')" }
  ], sort);

  const atmSection = `
    <div class="card-grid">
      ${atmCards.join('')}
    </div>
  `;

  const vaultSection = `
    <div style="margin: 40px 0; border-bottom: 2px solid #fff; opacity: 0.3;"></div>
    <div class="card-grid">
      ${vaultCards.join('')}
    </div>
  `;

  return `
    <h2>ATMs & VAULTs</h2>
    ${sortButtons}
    ${atmSection}
    ${vaultSection}
  `;
}

function sortATMs(order) {
  document.getElementById("page-container").innerHTML = renderATMs(order);
}