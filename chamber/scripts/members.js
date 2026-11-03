const TIERS = {
  1: { label: 'Member', cls: 'np' },
  2: { label: 'Silver', cls: 'silver' },
  3: { label: 'Gold', cls: 'gold' },
};

export function tierOf(level) {
  return TIERS[level] ?? TIERS[1];
}

export function esc(value) {
  const el = document.createElement('div');
  el.textContent = value;
  return el.innerHTML.replaceAll('"', '&quot;');
}

export async function loadMembers() {
  const response = await fetch('data/members.json');
  if (!response.ok) throw new Error(`members.json responded ${response.status}`);
  return response.json();
}
