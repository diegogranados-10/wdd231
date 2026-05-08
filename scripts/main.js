import { courses } from "./courses.js";

/* ---------- Responsive nav toggle ---------- */
const toggleBtn = document.querySelector(".menu-toggle");
const primaryNav = document.getElementById("primary-nav");

if (toggleBtn && primaryNav) {
    toggleBtn.addEventListener("click", () => {
        const isOpen = primaryNav.classList.toggle("is-open");
        toggleBtn.setAttribute("aria-expanded", String(isOpen));
        toggleBtn.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    // Close menu after a link is tapped on small screens
    primaryNav.addEventListener("click", (e) => {
        if (e.target.tagName === "A" && window.matchMedia("(max-width: 879px)").matches) {
            primaryNav.classList.remove("is-open");
            toggleBtn.setAttribute("aria-expanded", "false");
        }
    });
}

/* ---------- Course rendering ---------- */
const courseList = document.getElementById("course-list");
const creditsTotalEl = document.getElementById("credits-total");
const creditsCountEl = document.getElementById("credits-count");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderCourses(filter = "all") {
    const filtered = courses.filter((c) => {
        if (filter === "all") return true;
        return c.subject.toLowerCase() === filter.toLowerCase();
    });

    courseList.innerHTML = filtered
        .map((c) => {
            const code = `${c.subject} ${c.number}`;
            const completedClass = c.completed ? " is-completed" : "";
            const completedLabel = c.completed
                ? `<span class="visually-hidden">(completed)</span>`
                : "";
            return `
                <li class="course-card${completedClass}" aria-label="${code}${c.completed ? ", completed" : ""}">
                    <span class="course-code">${code}</span>
                    <span class="course-credits">${c.credits} cr</span>
                    ${completedLabel}
                </li>
            `;
        })
        .join("");

    const totalCredits = filtered.reduce((sum, c) => sum + c.credits, 0);
    creditsTotalEl.textContent = String(totalCredits);
    creditsCountEl.textContent = String(filtered.length);
}

filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        renderCourses(btn.dataset.filter);
    });
});

renderCourses("all");

/* ---------- Footer dynamic content ---------- */
const yearEl = document.getElementById("copyright-year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const lastModEl = document.getElementById("lastModified");
if (lastModEl) lastModEl.textContent = `Last Modification: ${document.lastModified}`;
