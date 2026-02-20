function renderWeapons(sort = "high") {
  const sortFn = (a, b) =>
    sort === "high" ? b.contractPrice - a.contractPrice : a.contractPrice - b.contractPrice;

  const sortedGuns = [...GUNS_DATA].sort(sortFn);
  const sortedExplosives = [...EXPLOSIVES_DATA].sort(sortFn);
  const sortedTools = [...TOOLS_DATA].sort(sortFn);

  function makeCards(data) {
    return data.map(item => {
      const slug = generateSlug(item.name);
      const visibleContent = `
        ${renderPriceTag(item.contractPrice)}
        <h3>${item.name}</h3>
      `;
      const hiddenContent = `
        ${renderStat('Requirements', item.requirements)}
        ${renderStat('Location', item.location || item.stats.location)}
        ${renderStat('Re-buy', formatPrice(item.reBuyPrice))}
        ${renderStat('Ammo', item.stats.ammo)}
        ${renderStat('Ammo Cost', item.stats.ammoPrice)}
        ${renderStat('Damage', item.stats.damage)}
        ${renderStat('RPM', item.stats.firerate)}
        ${item.stats.reload ? renderStat('Reload', `${item.stats.reload}s`) : ''}
        ${renderStat('Accuracy', item.stats.accuracy)}
      `;
      const cardId = `card-${slug}-${Math.random().toString(36).substr(2, 9)}`;
      return renderExpandableCardJPG(item, null, visibleContent, hiddenContent, 'weapons');
    });
  }

  const gunCards = makeCards(sortedGuns);
  const explosiveCards = makeCards(sortedExplosives);
  const toolCards = makeCards(sortedTools);

  const sortButtons = renderSortButtons([
    { label: 'Expensive to Cheap', value: 'high', onClick: "sortWeapons('high')" },
    { label: 'Cheap to Expensive', value: 'low', onClick: "sortWeapons('low')" }
  ], sort);

  const divider = `<div style="margin: 40px 0; border-bottom: 2px solid #fff; opacity: 0.3;"></div>`;

  const gunsSection = `
    <h3 style="margin: 20px 0 10px;">Guns</h3>
    <div class="card-grid">
      ${gunCards.join('')}
    </div>
  `;

  const explosivesSection = `
    ${divider}
    <h3 style="margin: 20px 0 10px;">Explosives</h3>
    <div class="card-grid">
      ${explosiveCards.join('')}
    </div>
  `;

  const toolsSection = `
    ${divider}
    <h3 style="margin: 20px 0 10px;">Tools</h3>
    <div class="card-grid">
      ${toolCards.join('')}
    </div>
  `;

  return `
    <h2>WEAPONs</h2>
    ${sortButtons}
    ${gunsSection}
    ${explosivesSection}
    ${toolsSection}
  `;
}

function sortWeapons(order) {
  document.getElementById("page-container").innerHTML = renderWeapons(order);
}