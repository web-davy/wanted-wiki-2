function formatReward(reward) {
  return reward.replace(/\$/g, '<img src="images/cash.png" alt="$" style="height: 16px; width: auto; vertical-align: middle; margin-right: 2px;">');
}

function renderMissions(order = "hard") {
  const allMissions = [...MISSIONS_DATA];

  const sortMissionsList = (list) => {
    return [...list].sort((a, b) => {
      const diffA = DIFFICULTIES[a.difficulty];
      const diffB = DIFFICULTIES[b.difficulty];

      if (diffA.order === diffB.order) {
        const numA = parseInt(a.title) || 0;
        const numB = parseInt(b.title) || 0;
        if (numA !== 0 || numB !== 0) {
          return order === "hard" ? numB - numA : numA - numB;
        }
      }

      return order === "hard" ? diffB.order - diffA.order : diffA.order - diffB.order;
    });
  };

  const makeMissionCards = (list) => {
    return list.map(item => {
      const slug = item.id;
      const formattedRewards = (item.rewards || []).map(formatReward).join(', ');

      const visibleContent = `<h3>${item.title}</h3>`;
      const hiddenContent = `
        ${renderStat('Location', item.location)}
        ${renderStat('Description', item.description)}
        ${renderStat('How', item.howToComplete)}
        ${renderStat('Reward', formattedRewards)}
      `;

      return renderExpandableCardJPG(item, item.difficulty, visibleContent, hiddenContent, 'missions');
    });
  };

  const categories = [
    { type: 'Game', label: 'Game Missions' },
    { type: 'Erik', label: 'Erik Missions' },
    { type: 'Dan', label: 'Dan Missions' },
    { type: 'Sir. B', label: 'Sir. B Missions' },
    { type: 'Bert', label: 'Bert Missions' },
    { type: 'Christmas', label: 'Christmas Missions' }
  ];

  const sections = categories.map((cat, index) => {
    const missionsInCategory = allMissions.filter(m => m.missionType === cat.type);
    if (missionsInCategory.length === 0) return '';

    const sortedMissions = sortMissionsList(missionsInCategory);
    const cards = makeMissionCards(sortedMissions);

    const divider = index > 0 ? '<div style="margin: 40px 0; border-bottom: 2px solid #fff; opacity: 0.3;"></div>' : '';

    return `
      ${divider}
      <h3 style="margin: 20px 0 10px;">${cat.label}</h3>
      <div class="card-grid">
        ${cards.join('')}
      </div>
    `;
  }).join('');

  const sortButtons = renderSortButtons([
    { label: 'Hardest First', value: 'hard', onClick: "sortMissions('hard')" },
    { label: 'Easiest First', value: 'easy', onClick: "sortMissions('easy')" }
  ], order);

  return `
    <h2>MISSIONs</h2>
    <div class="page-disclaimer">This page is curently unfinished and being worked on</div>
    ${sortButtons}
    ${sections}
  `;
}

function sortMissions(order) {
  document.getElementById("page-container").innerHTML = renderMissions(order);
}