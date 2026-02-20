function renderVehicles(sort = "high") {
  const renderStatSuffix = (label, val, suffix) => val !== undefined && val !== null ? renderStat(label, `${val}${suffix}`) : '';

  const groundVehicles = VEHICLES_DATA.filter(v => v.type === 'ground');
  const flyingVehicles = VEHICLES_DATA.filter(v => v.type === 'flying');

  const sortedGround = [...groundVehicles].sort((a, b) =>
    sort === "high" ? b.contractPrice - a.contractPrice : a.contractPrice - b.contractPrice
  );

  const sortedFlying = [...flyingVehicles].sort((a, b) =>
    sort === "high" ? b.contractPrice - a.contractPrice : a.contractPrice - b.contractPrice
  );

  const groundCards = sortedGround.map(item => {
    const slug = generateSlug(item.name);

    const visibleContent = `
      ${renderPriceTag(item.contractPrice)}
      <h3>${item.name}</h3>
    `;
    const hiddenContent = `
      ${renderStat('Requirements', item.requirements)}
      ${renderStat('Repair', formatPrice(item.repairPrice))}
      ${renderStatSuffix('Top Speed', item.stats.topSpeed, '%')}
      ${renderStatSuffix('Acceleration', item.stats.acceleration, '%')}
      ${renderStatSuffix('Braking', item.stats.braking, '%')}
      ${renderStat('Max Health', item.stats.maxHealth)}
      ${renderStat('Armor', item.stats.armor)}
    `;

    const cardId = `card-${slug}-${Math.random().toString(36).substr(2, 9)}`;

    return renderExpandableCardJPG(item, null, visibleContent, hiddenContent, 'vehicles');
  });

  const flyingCards = sortedFlying.map(item => {
    const slug = generateSlug(item.name);

    const visibleContent = `
      ${renderPriceTag(item.contractPrice)}
      <h3>${item.name}</h3>
    `;
    const hiddenContent = `
      ${renderStat('Requirements', item.requirements)}
      ${renderStat('Repair', formatPrice(item.repairPrice))}
      ${renderStatSuffix('Top Speed', item.stats.topSpeed, '%')}
      ${renderStatSuffix('Handling', item.stats.handling, '%')}
      ${renderStatSuffix('Spool Time', item.stats.spoolTime, 's')}
      ${renderStat('Max Health', item.stats.maxHealth)}
      ${renderStat('Armor', item.stats.armor)}
    `;

    const cardId = `card-${slug}-${Math.random().toString(36).substr(2, 9)}`;

    return renderExpandableCardJPG(item, null, visibleContent, hiddenContent, 'vehicles');
  });

  const sortButtons = renderSortButtons([
    { label: 'Expensive to Cheap', value: 'high', onClick: "sortVehicles('high')" },
    { label: 'Cheap to Expensive', value: 'low', onClick: "sortVehicles('low')" }
  ], sort);

  const groundSection = `
    <h3 style="margin: 20px 0 10px;">Ground Vehicles</h3>
    <div class="card-grid">
      ${groundCards.join('')}
    </div>
  `;

  const flyingSection = `
    <div style="margin: 40px 0; border-bottom: 2px solid #fff; opacity: 0.3;"></div>
    <h3 style="margin: 20px 0 10px;">Air Vehicles</h3>
    <div class="card-grid">
      ${flyingCards.join('')}
    </div>
  `;

  return `
    <h2>VEHICLEs</h2>
    ${sortButtons}
    ${groundSection}
    ${flyingSection}
  `;
}

function sortVehicles(order) {
  document.getElementById("page-container").innerHTML = renderVehicles(order);
}