// Directory page — fetch members from JSON, render grid/list, toggle view
(function () {
  const grid = document.getElementById('directory-cards');
  const gridBtn = document.getElementById('toggle-grid');
  const listBtn = document.getElementById('toggle-list');

  if (!grid) return;

  const membershipLabel = { 1: 'Miembro', 2: 'Silver', 3: 'Gold' };
  const membershipClass = { 1: 'np', 2: 'silver', 3: 'gold' };

  function renderCard(m) {
    const tierClass = membershipClass[m.membership];
    const tierLabel = membershipLabel[m.membership];
    return `<article class="dir-card" data-cat="${tierClass}">
      <span class="dir-tier ${tierClass}">${tierLabel}</span>
      <div class="dir-img">
        <img src="images/${m.image}" alt="${m.name}" loading="lazy" onerror="this.style.display='none'">
      </div>
      <div class="dir-cat">${m.category}</div>
      <div class="dir-meta">
        <div class="dir-name">${m.name}</div>
      </div>
      <p class="dir-desc">${m.description}</p>
      <div class="dir-contact">
        <span>${m.address}</span>
        <span>${m.phone}</span>
      </div>
      <div class="dir-foot">
        <a href="${m.website}" target="_blank" rel="noopener">Sitio web</a>
      </div>
    </article>`;
  }

  function renderList(m) {
    const tierClass = membershipClass[m.membership];
    const tierLabel = membershipLabel[m.membership];
    return `<article class="dir-list-item" data-cat="${tierClass}">
      <span class="dir-tier ${tierClass}">${tierLabel}</span>
      <div class="dir-list-info">
        <strong>${m.name}</strong>
        <span class="dir-cat">${m.category}</span>
        <span class="dir-desc">${m.description}</span>
      </div>
      <div class="dir-list-contact">
        <span>${m.phone}</span>
        <a href="${m.website}" target="_blank" rel="noopener">Sitio web</a>
      </div>
    </article>`;
  }

  let members = [];
  let currentView = 'grid';

  function display() {
    if (currentView === 'grid') {
      grid.className = 'dir-grid full';
      grid.innerHTML = members.map(renderCard).join('');
    } else {
      grid.className = 'dir-list';
      grid.innerHTML = members.map(renderList).join('');
    }
  }

  async function fetchMembers() {
    try {
      const response = await fetch('data/members.json');
      if (!response.ok) throw new Error('Failed to fetch members');
      members = await response.json();
      display();
    } catch (err) {
      grid.innerHTML = '<p class="text-soft">No se pudieron cargar los miembros del directorio.</p>';
    }
  }

  if (gridBtn && listBtn) {
    gridBtn.addEventListener('click', () => {
      currentView = 'grid';
      gridBtn.classList.add('active');
      listBtn.classList.remove('active');
      display();
    });
    listBtn.addEventListener('click', () => {
      currentView = 'list';
      listBtn.classList.add('active');
      gridBtn.classList.remove('active');
      display();
    });
  }

  fetchMembers();
})();
