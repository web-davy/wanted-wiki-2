function formatReward(reward) {
  return reward.replace(/\$/g, '<img src="images/cash.png" alt="$" style="height: 16px; width: auto; vertical-align: middle; margin-right: 2px;">$');
}

function renderMissions(order = "hard") {
  const sorted = [...MISSIONS_DATA].sort((a, b) => {
    // Always put Christmas items at the bottom
    const isChristmasA = a.difficulty === 'CHRISTMAS';
    const isChristmasB = b.difficulty === 'CHRISTMAS';

    if (isChristmasA && !isChristmasB) return 1;
    if (!isChristmasA && isChristmasB) return -1;
    if (isChristmasA && isChristmasB) return 0;

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

  const cards = sorted.map(item => {
    const slug = item.id;
    const formattedRewards = item.rewards.map(formatReward).join(', ');
    const content = `
      <h3>${item.title}</h3>
      ${renderStat('Location', item.location)}
      ${renderStat('Description', item.description)}
      ${renderStat('Requirements', item.requirements.join(', '))}
      ${renderStat('How', item.howToComplete)}
      ${renderStat('Reward', formattedRewards)}
    `;

    return `
      <div class="card">
        <img src="images/${slug}.jpg" alt="${item.title}" 
             style="width:100%; height:auto; margin-bottom:15px; border-radius:4px; 
                    box-shadow:0 0 10px rgba(255,255,255,0.2);">
        <div class="rarity ${DIFFICULTIES[item.difficulty].class}">${DIFFICULTIES[item.difficulty].name}</div>
        ${content}
      </div>`;
  });

  const sortButtons = renderSortButtons([
    { label: 'Hardest First', value: 'hard', onClick: "sortMissions('hard')" },
    { label: 'Easiest First', value: 'easy', onClick: "sortMissions('easy')" }
  ], order);

  return renderPage('MISSIONs', sortButtons, cards);
}

function sortMissions(order) {
  document.getElementById("page-container").innerHTML = renderMissions(order);
}
