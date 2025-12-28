/* ================= PRODUCT DATA ================= */
const products = [
  { id:1, category:"masjid", name:"Masjid Clock P3-i15", img:"images/masjid1.jpg", desc:"Automatic Salah Time LED Display for Masjid", url:"product-details/masjid-clock.html" },
  { id:2, category:"masjid", name:"Masjid Clock P4-i15", img:"images/masjid2.jpg", desc:"High visibility digital display", url:"product-details/masjid-clock.html" },
  { id:3, category:"azan-home", name:"Azan Home Clock A1", img:"images/azan1.jpg", desc:"Compact Azan + Quran player", url:"product-details/azan-home.html" },
  { id:4, category:"azan-home", name:"Azan Home Clock B2", img:"images/azan2.jpg", desc:"Elegant home clock with Azan", url:"product-details/azan-home.html" },
  { id:5, category:"ajanta", name:"Ajanta Digital Clock 12inch", img:"images/ajanta1.jpg", desc:"Wall clock for home and office", url:"product-details/other-products.html" },
  { id:6, category:"ajanta", name:"Ajanta Digital Clock 18inch", img:"images/ajanta2.jpg", desc:"Large LED wall clock with clear display", url:"product-details/other-products.html" },
  { id:7, category:"other", name:"Gold Rate Display", img:"images/other1.jpg", desc:"Digital display for gold rates", url:"product-details/other-products.html" }
];

/* ================= RENDER PRODUCTS ================= */
function renderProducts(categoryId, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  grid.innerHTML = "";

  const filtered = categoryId
    ? products.filter(p => p.category === categoryId)
    : products;

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card auto-fade";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
    `;
    card.addEventListener("click", () => window.location.href = p.url);
    grid.appendChild(card);
  });
}

/* ================= FEATURED SCROLL ================= */
const featuredScroll = document.getElementById("featured-scroll");
if (featuredScroll) {
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card auto-fade";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
    `;
    card.addEventListener("click", () => window.location.href = p.url);
    featuredScroll.appendChild(card);
  });
}

/* ================= AUTO FADE-IN ================= */
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    "section, .product-card, .category-card, .video-row, footer, .about-box"
  );
  elements.forEach(el => el.classList.add("auto-fade"));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  elements.forEach(el => observer.observe(el));
});
