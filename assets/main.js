document.documentElement.classList.add("js");

// Однакові шапка й підвал на всіх сторінках
const PAGES = [
  ["index.html", "Головна"], ["services.html", "Послуги й ціни"], ["masters.html", "Майстри"],
  ["gallery.html", "Роботи"], ["contacts.html", "Контакти"],
];
const BOT = "https://t.me/vizytko_bot";
const here = location.pathname.split("/").pop() || "index.html";

document.getElementById("site-header").innerHTML = `
  <div class="demo-bar"><b>Демо-сайт</b> для портфоліо. Студія Liora вигадана, дані умовні.</div>
  <header id="hdr"><div class="wrap">
    <a href="index.html" class="logo">Liora<span>студія краси</span></a>
    <nav class="main" id="nav">${PAGES.map(([h, t]) => `<a href="${h}"${h === here ? ' class="active" aria-current="page"' : ""}>${t}</a>`).join("")}</nav>
    <div style="display:flex;gap:10px;align-items:center">
      <a class="btn btn-primary btn-sm head-book" href="${BOT}" target="_blank" rel="noopener">Записатися</a>
      <button class="burger" id="burger" aria-label="Меню" aria-expanded="false"><span></span></button>
    </div>
  </div></header>`;

document.getElementById("site-footer").innerHTML = `
  <footer><div class="wrap">
    <div><a href="index.html" class="logo">Liora</a><p style="margin-top:12px;max-width:34ch">Студія краси для тих, хто цінує час і якість. Запис онлайн 24/7.</p></div>
    <div><h4>Сторінки</h4><ul>${PAGES.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></div>
    <div><h4>Контакти</h4><ul><li>м. Умань (адреса умовна)</li><li>+380 00 000 00 00</li><li>Пн–Сб 9:00–20:00</li><li><a href="${BOT}" target="_blank" rel="noopener">Записатися в Telegram →</a></li></ul></div>
    <div class="copy">© 2026 Liora · демо-сайт · зроблено Візитко</div>
  </div></footer>`;

const hdr = document.getElementById("hdr");
const onScroll = () => hdr.classList.toggle("scrolled", scrollY > 10);
addEventListener("scroll", onScroll, { passive: true }); onScroll();

const nav = document.getElementById("nav"), burger = document.getElementById("burger");
burger.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Фільтр категорій у прайсі
document.querySelectorAll("[data-tab]").forEach(tab => tab.addEventListener("click", () => {
  document.querySelectorAll("[data-tab]").forEach(t => t.classList.toggle("on", t === tab));
  const cat = tab.dataset.tab;
  document.querySelectorAll("[data-cat]").forEach(g => g.hidden = cat !== "all" && g.dataset.cat !== cat);
}));

// Форма запису: у демо лише показує повідомлення. На сайті клієнта заявка йде в Telegram і Google Таблицю.
const form = document.getElementById("book");
if (form) form.addEventListener("submit", e => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  document.getElementById("form-ok").classList.add("show");
  form.querySelector("button[type=submit]").disabled = true;
});
