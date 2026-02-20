function renderValuables(sort = "high") {
  const renderStatSuffix = (label, val, suffix) => val !== undefined && val !== null ? renderStat(label, `${val}${suffix}`) : '';

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

  const categories = [
    { type: 'Gems', label: 'Gems' },
    { type: 'Jewerly', label: 'Jewerly' },
    { type: 'Electronics', label: 'Electronics' },
    { type: 'Miscellaneous', label: 'Miscellaneous' },
    { type: 'Mission Items', label: 'Mission Items' }
  ];

  const sections = categories.map((cat, index) => {
    const itemsInCategory = sortedRegular.filter(item => item.category === cat.type);
    if (itemsInCategory.length === 0) return '';

    const cards = itemsInCategory.map(item => {
      const visibleContent = `
        <h3>${item.name}</h3>
        ${renderStat('Price', formatPrice(item.price))}
      `;
      const hiddenContent = renderStatSuffix('Weight', item.weight, ' kg');
      return renderExpandableCardJPG(item, item.rarity, visibleContent, hiddenContent, 'valuables');
    });

    const divider = index > 0 ? '<div style="margin: 40px 0; border-bottom: 2px solid #fff; opacity: 0.3;"></div>' : '';

    return `
      ${divider}
      <h3 style="margin: 20px 0 10px;">${cat.label}</h3>
      <div class="card-grid">
        ${cards.join('')}
      </div>
    `;
  }).join('');

  const christmasSection = `
    <div style="margin: 40px 0; border-bottom: 2px solid #fff; opacity: 0.3;"></div>
    <h3 style="margin: 20px 0 10px;">Christmas Limited</h3>
    <div class="card-grid">
      ${[...CHRISTMAS_VALUABLES_DATA].sort((a, b) => sort === "high" ? b.price - a.price : a.price - b.price).map(item => {
    const visibleContent = `
          <h3>${item.name}</h3>
          ${renderStat('Price', formatPrice(item.price))}
        `;
    const hiddenContent = renderStatSuffix('Weight', item.weight, ' kg');
    return renderExpandableCardJPG(item, item.rarity, visibleContent, hiddenContent, 'valuables');
  }).join('')}
    </div>
  `;

  const sortButtons = renderSortButtons([
    { label: 'Price High to Low', value: 'high', onClick: "sortValuables('high')" },
    { label: 'Price Low to High', value: 'low', onClick: "sortValuables('low')" }
  ], sort);

  return `
    <h2>VALUABLEs</h2>
    ${sortButtons}
    ${sections}
    ${christmasSection}
  `;
}

function sortValuables(order) {
  document.getElementById("page-container").innerHTML = renderValuables(order);
}