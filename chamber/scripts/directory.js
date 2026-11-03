import { loadMembers, tierOf, esc } from './members.js';

const grid = document.getElementById('directory-cards');
const gridBtn = document.getElementById('toggle-grid');
const listBtn = document.getElementById('toggle-list');

function renderCard(m) {
  const tier = tierOf(m.membership);
  return `<article class="dir-card" data-cat="${tier.cls}">
      <span class="dir-tier ${tier.cls}">${tier.label}</span>
      <div class="dir-img">
        <img src="images/${esc(m.image)}" alt="${esc(m.name)}" width="400" height="300" loading="lazy">
      </div>
      <div class="dir-cat">${esc(m.category)}</div>
      <div class="dir-meta">
        <div class="dir-name">${esc(m.name)}</div>
      </div>
      <p class="dir-desc">${esc(m.description)}</p>
      <div class="dir-contact">
        <span>${esc(m.address)}</span>
        <span>${esc(m.phone)}</span>
      </div>
      <div class="dir-foot">
        <a href="${esc(m.website)}" target="_blank" rel="noopener">Website</a>
      </div>
    </article>`;
}

function renderListItem(m) {
  const tier = tierOf(m.membership);
  return `<article class="dir-list-item" data-cat="${tier.cls}">
      <span class="dir-tier ${tier.cls}">${tier.label}</span>
      <div class="dir-list-info">
        <strong>${esc(m.name)}</strong>
        <span class="dir-cat">${esc(m.category)}</span>
        <span class="dir-desc">${esc(m.description)}</span>
      </div>
      <div class="dir-list-contact">
        <span>${esc(m.phone)}</span>
        <a href="${esc(m.website)}" target="_blank" rel="noopener">Website</a>
      </div>
    </article>`;
}

const VIEWS = {
  grid: { container: 'dir-grid full', render: renderCard, button: gridBtn, other: listBtn },
  list: { container: 'dir-list', render: renderListItem, button: listBtn, other: gridBtn },
};

let members = [];

function show(view) {
  const { container, render, button, other } = VIEWS[view];
  grid.className = container;
  grid.innerHTML = members.map(render).join('');
  button.classList.add('active');
  other.classList.remove('active');
  button.setAttribute('aria-pressed', 'true');
  other.setAttribute('aria-pressed', 'false');
}

grid.addEventListener('error', (e) => {
  if (e.target instanceof HTMLImageElement) e.target.style.display = 'none';
}, true);
gridBtn.addEventListener('click', () => show('grid'));
listBtn.addEventListener('click', () => show('list'));

try {
  members = await loadMembers();
  show('grid');
} catch (err) {
  console.error('Directory fetch failed:', err);
  grid.innerHTML = '<p class="text-soft">Could not load directory members.</p>';
}
