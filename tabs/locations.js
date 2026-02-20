function renderLocations(order = "az") {
  const sorted = [...LOCATIONS_DATA].sort((a, b) =>
    order === "az"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  const cards = sorted.map(item => {
    const slug = generateSlug(item.name);

    const visibleContent = `<h3>${item.name}</h3>`;
    const hiddenContent = `<p>${item.description}</p>`;

    const cardId = `card-${slug}-${Math.random().toString(36).substr(2, 9)}`;

    return renderExpandableCardJPG(item, null, visibleContent, hiddenContent, 'locations');
  });

  const sortButtons = renderSortButtons([
    { label: 'A-Z', value: 'az', onClick: "sortLocations('az')" },
    { label: 'Z-A', value: 'za', onClick: "sortLocations('za')" }
  ], order);

  return renderPage('LOCATIONs', sortButtons, cards);
}

function sortLocations(order) {
  document.getElementById("page-container").innerHTML = renderLocations(order);
}