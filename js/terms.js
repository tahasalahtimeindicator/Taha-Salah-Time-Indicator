// ================= REVEAL TERMS ON SCROLL =================
const items = document.querySelectorAll('.term-item');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

items.forEach(item => observer.observe(item));

// ================= TOP NAVBAR MOBILE =================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Top navbar "Products" dropdown (mobile)
const topNavItem = document.querySelector('.navbar .nav-item');
const topDropdownToggle = topNavItem.querySelector('a');

topDropdownToggle.addEventListener('click', e => {
  if (window.innerWidth <= 768) {
    e.preventDefault(); // Prevent page jump
    topNavItem.classList.toggle('open'); // Toggle dropdown
  }
});

// Close top dropdown when clicking outside
document.addEventListener('click', e => {
  if (!topNavItem.contains(e.target)) {
    topNavItem.classList.remove('open');
  }
});


