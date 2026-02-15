function renderATMs(sort = "high") {
  const sortedATMs = [...ATMS_DATA].sort((a, b) =>
    sort === "high" ? b.price - a.price : a.price - b.price
  );

  const sortedVaults = [...VAULTS_DATA].sort((a, b) => {
    const avgA = (typeof a.priceMin === 'number' && typeof a.priceMax === 'number') ? (a.priceMin + a.priceMax) / 2 : 0;
    const avgB = (typeof b.priceMin === 'number' && typeof b.priceMax === 'number') ? (b.priceMin + b.priceMax) / 2 : 0;
    return sort === "high" ? avgB - avgA : avgA - avgB;
  });

  const atmCards = sortedATMs.map(item => {
    const content = `
      <h3>${item.name}</h3>
      ${renderStat('Rarity', item.rarityPercent)}
      ${renderStat('Cash', formatPrice(item.price))}
    `;
    return renderCardJPG(item, item.rarity, content);
  });

  const vaultCards = sortedVaults.map(item => {
    const priceDisplay = (typeof item.priceMin === 'number' && typeof item.priceMax === 'number')
      ? `${formatPrice(item.priceMin)} - ${formatPrice(item.priceMax)}`
      : '? - ?';
    const content = `
      <h3>${item.name}</h3>
      ${renderStat('Rarity', item.rarityPercent)}
      ${renderStat('Cash', priceDisplay)}
    `;
    return renderCardJPG(item, item.rarity, content);
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