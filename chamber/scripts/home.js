// Chamber of Commerce — Home page: Weather + Spotlights

const API_KEY = "2c36c2fdfa0f16cfa293b62b24b3b416";
const LAT = 10.23;
const LON = -66.66;

// ---------- Weather ----------

async function loadWeather() {
  const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentURL),
      fetch(forecastURL),
    ]);

    if (!currentRes.ok || !forecastRes.ok) throw new Error("Weather API error");

    const current = await currentRes.json();
    const forecast = await forecastRes.json();

    displayCurrentWeather(current);
    displayForecast(forecast);
  } catch (err) {
    console.error("Weather fetch failed:", err);
  }
}

function displayCurrentWeather(data) {
  const temp = Math.round(data.main.temp);
  const high = Math.round(data.main.temp_max);
  const low = Math.round(data.main.temp_min);
  const desc = data.weather[0].description;
  const humidity = data.main.humidity;
  const wind = Math.round(data.wind.speed * 3.6); // m/s to km/h
  const icon = data.weather[0].icon;

  const tempEl = document.getElementById("w-temp");
  const hiloEl = document.getElementById("w-hilo");
  const descEl = document.getElementById("w-desc");
  const humidityEl = document.getElementById("w-humidity");
  const windEl = document.getElementById("w-wind");
  const iconEl = document.getElementById("w-icon");

  if (tempEl) tempEl.textContent = `${temp}\u00B0`;
  if (hiloEl) hiloEl.textContent = `\u2191 ${high}\u00B0  \u2193 ${low}\u00B0`;
  if (descEl) descEl.textContent = capitalize(desc);
  if (humidityEl) humidityEl.textContent = `${humidity}%`;
  if (windEl) windEl.textContent = `${wind} km/h`;
  if (iconEl) {
    iconEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" width="72" height="72">`;
  }
}

function displayForecast(data) {
  const container = document.getElementById("w-forecast");
  if (!container) return;

  // Get one forecast per day (noon entries) for the next 3 days
  const today = new Date().getDate();
  const dailyMap = new Map();

  for (const entry of data.list) {
    const date = new Date(entry.dt * 1000);
    const day = date.getDate();
    const hour = date.getHours();

    if (day === today) continue; // skip today
    if (dailyMap.size >= 3) break;

    // prefer the noon reading for each day
    if (!dailyMap.has(day) || Math.abs(hour - 12) < Math.abs(dailyMap.get(day).hour - 12)) {
      dailyMap.set(day, { ...entry, hour });
    }
  }

  const days = [...dailyMap.values()];
  container.innerHTML = days
    .map((d) => {
      const date = new Date(d.dt * 1000);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const temp = Math.round(d.main.temp);
      const icon = d.weather[0].icon;
      return `
        <li>
          <span class="lbl">${dayName}</span>
          <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${d.weather[0].description}" width="36" height="36">
          <span class="val">${temp}\u00B0</span>
        </li>`;
    })
    .join("");
}

function capitalize(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

// ---------- Spotlights ----------

async function loadSpotlights() {
  try {
    const res = await fetch("data/members.json");
    if (!res.ok) throw new Error("Members fetch error");
    const members = await res.json();

    // Filter gold (3) and silver (2) members
    const qualified = members.filter((m) => m.membership >= 2);

    // Randomly pick 2 or 3
    const count = Math.min(qualified.length, Math.random() < 0.5 ? 2 : 3);
    const shuffled = qualified.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    displaySpotlights(selected);
  } catch (err) {
    console.error("Spotlights fetch failed:", err);
  }
}

function getMembershipLabel(level) {
  switch (level) {
    case 3: return "Gold";
    case 2: return "Silver";
    default: return "Member";
  }
}

function getMembershipClass(level) {
  switch (level) {
    case 3: return "gold";
    case 2: return "silver";
    default: return "";
  }
}

function displaySpotlights(members) {
  const container = document.getElementById("spotlights");
  if (!container) return;

  container.innerHTML = members
    .map((m) => {
      const tierLabel = getMembershipLabel(m.membership);
      const tierClass = getMembershipClass(m.membership);
      return `
        <article class="dir-card">
          <span class="dir-tier ${tierClass}">${tierLabel}</span>
          <div class="dir-img">
            <img src="images/${m.image}" alt="${m.name}" loading="lazy">
          </div>
          <div class="dir-cat">${m.category}</div>
          <div class="dir-meta">
            <div class="dir-name">${m.name}</div>
          </div>
          <div class="dir-contact">
            <span>${m.phone}</span>
            <span>${m.address}</span>
            <a href="${m.website}" target="_blank" rel="noopener">${m.website.replace(/^https?:\/\//, "")}</a>
          </div>
          <div class="dir-foot">
            <span>${tierLabel} member</span>
            <a href="directory.html">Profile \u2192</a>
          </div>
        </article>`;
    })
    .join("");
}

// ---------- Init ----------
loadWeather();
loadSpotlights();
