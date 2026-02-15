function renderValuables(sort = "high") {
  const sortedRegular = [...VALUABLES_DATA].sort((a, b) => {
    const priceA = a.priceNonContract ? 0 : a.price;
    const priceB = b.priceNonContract ? 0 : b.price;

    if (priceA > 0 && priceB > 0) {
      return sort === "high" ? priceB - priceA : priceA - priceB;
    }
    if (priceA > 0) return -1;
    if (priceB > 0) return 1;

    return sort === "high" ? b.price - a.price : a.price - b.price;
  });

  const sortedChristmas = [...CHRISTMAS_VALUABLES_DATA].sort((a, b) => {
    const priceA = a.priceNonContract ? 0 : a.price;
    const priceB = b.priceNonContract ? 0 : b.price;

    if (priceA > 0 && priceB > 0) {
      return sort === "high" ? priceB - priceA : priceA - priceB;
    }
    if (priceA > 0) return -1;
    if (priceB > 0) return 1;

    return sort === "high" ? b.price - a.price : a.price - b.price;
  });

  const regularCards = sortedRegular.map(item => {
    const content = `
      <h3>${item.name}</h3>
      ${renderStat('Price', formatPrice(item.price))}
      ${renderStat('Weight', `${item.weight} kg`)}
    `;
    return renderCardJPG(item, item.rarity, content);
  });

  const christmasCards = sortedChristmas.map(item => {
    const content = `
      <h3>${item.name}</h3>
      ${renderStat('Price', formatPrice(item.price))}
      ${renderStat('Weight', `${item.weight} kg`)}
    `;
    return renderCardJPG(item, item.rarity, content);
  });

  const sortButtons = renderSortButtons([
    { label: 'Price High to Low', value: 'high', onClick: "sortValuables('high')" },
    { label: 'Price Low to High', value: 'low', onClick: "sortValuables('low')" }
  ], sort);

  const regularSection = `
    <div class="card-grid">
      ${regularCards.join('')}
    </div>
  `;

  const christmasSection = `
    <div style="margin: 40px 0; border-bottom: 2px solid #fff; opacity: 0.3;"></div>
    <div class="card-grid">
      ${christmasCards.join('')}
    </div>
  `;

  return `
    <h2>VALUABLEs</h2>
    ${sortButtons}
    ${regularSection}
    ${christmasSection}
  `;
}

function sortValuables(order) {
  document.getElementById("page-container").innerHTML = renderValuables(order);
}