/* =========================== PAGE LOAD =========================== */
document.addEventListener("DOMContentLoaded", () => {

  /* ================= HERO SLIDER ================= */
  const heroSlides = document.querySelectorAll(".hero-slide");
  let heroIndex = 0;
  const desktopInterval = 4000;
  const mobileInterval = 4000;

  if (heroSlides.length > 0) {
    // Activate first slide
    heroSlides[0].classList.add("active");

    setInterval(() => {
      heroSlides.forEach(slide => slide.classList.remove("active"));
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add("active");
    }, window.innerWidth <= 768 ? mobileInterval : desktopInterval);
  }

  /* ================= VIDEO CONTROLS ================= */
  document.querySelectorAll(".video-box").forEach(box => {

  const video = box.querySelector("video");
  const playBtn = box.querySelector(".video-play-btn");
  const controls = box.querySelector(".video-controls");
  const timeline = box.querySelector("input[type='range']");

  if (!video || !playBtn || !controls || !timeline) return;

  let hideTimer;

  function showControls() {
    controls.style.opacity = "1";
    playBtn.style.opacity = "1"; // always show button
    if (!video.paused) {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        controls.style.opacity = "0";
        playBtn.style.opacity = "0";
      }, 3000);
    }
  }

  /* PLAY / PAUSE */
  function togglePlay() {
    if (video.paused) {
      video.play();
      playBtn.textContent = "⏸"; // show pause icon
    } else {
      video.pause();
      playBtn.textContent = "▶"; // show play icon
    }
    showControls();
  }

  playBtn.addEventListener("click", togglePlay);

  /* CLICK VIDEO TO TOGGLE */
  video.addEventListener("click", togglePlay);

  /* TIMELINE UPDATE */
  video.addEventListener("timeupdate", () => {
    if (video.duration) {
      timeline.value = (video.currentTime / video.duration) * 100;
    }
  });

  /* SEEK */
  timeline.addEventListener("input", () => {
    if (video.duration) {
      video.currentTime = (timeline.value / 100) * video.duration;
    }
  });

  /* INTERACTION SHOW CONTROLS */
  box.addEventListener("mousemove", showControls);
  box.addEventListener("touchstart", showControls);

  /* ON END */
  video.addEventListener("ended", () => {
    playBtn.textContent = "▶"; // reset to play
    controls.style.opacity = "1";
    playBtn.style.opacity = "1";
  });

});

  /* ================= HAMBURGER MOBILE MENU ================= */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-item");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  /* ================= MOBILE DROPDOWN ================= */
  navItems.forEach(item => {
    const link = item.querySelector("a");
    const dropdown = item.querySelector(".dropdown");
    if (!link || !dropdown) return;

    link.addEventListener("click", e => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        item.classList.toggle("open");
      }
    });
  });

  /* ================= CLOSE MENU ON LINK CLICK ================= */
  const navAnchors = document.querySelectorAll(".nav-links a");
  navAnchors.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900 && navLinks) {
        navLinks.classList.remove("show");
        navItems.forEach(i => i.classList.remove("open"));
      }
    });
  });

  /* ================= MOBILE BOTTOM NAV ACTIVE + DROPDOWN ================= */
  const productPages = [
    "masjid-clock.html",
    "azan-home.html",
    "other-products.html"
  ];
  const currentPage = window.location.pathname.split("/").pop();

  const bnHome = document.getElementById("bn-home");
  const bnProducts = document.getElementById("bn-products");
  const bnTrack = document.getElementById("bn-track");
  const bnContact = document.getElementById("bn-contact");

  if (currentPage === "index.html") bnHome?.classList.add("active");
  else if (productPages.includes(currentPage)) bnProducts?.classList.add("active");
  else if (currentPage === "tracking.html") bnTrack?.classList.add("active");
  else if (currentPage === "contact.html") bnContact?.classList.add("active");

  /* Toggle products dropdown on bottom nav */
  bnProducts?.addEventListener("click", () => {
    bnProducts.classList.toggle("active");
  });

});
