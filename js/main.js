/* ================= PAGE LOAD ================= */
document.addEventListener("DOMContentLoaded", () => {

  /* ================= NAVBAR TOGGLE ================= */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  /* ================= HERO SLIDER ================= */
  const heroSlides = document.querySelectorAll(".hero-slide");
  let heroIndex = 0;
  if (heroSlides.length > 1) {
    setInterval(() => {
      heroSlides[heroIndex]?.classList.remove("active");
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex]?.classList.add("active");
    }, 4000);
  }
});

/* ================= VIDEO CONTROLS ================= */
document.querySelectorAll(".video-media").forEach(box => {
  const video = box.querySelector("video");
  const playBtn = box.querySelector(".play");
  const timeline = box.querySelector(".timeline");
  if (!video || !playBtn || !timeline) return;

  timeline.min = 0;
  timeline.max = 100;

  playBtn.addEventListener("click", async e => {
    e.stopPropagation();
    if (video.paused) {
      await video.play();
      playBtn.innerHTML = "⏸";
    } else {
      video.pause();
      playBtn.innerHTML = "▶";
    }
  });

  video.addEventListener("timeupdate", () => {
    if (!isNaN(video.duration)) {
      timeline.value = (video.currentTime / video.duration) * 100;
    }
  });

  timeline.addEventListener("input", () => {
    if (!isNaN(video.duration)) {
      video.currentTime = (timeline.value / 100) * video.duration;
    }
  });
});

/* ================= SAFE FADE-IN ================= */
document.addEventListener("DOMContentLoaded", () => {

  const fadeItems = document.querySelectorAll(".fade-item");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeItems.forEach(item => observer.observe(item));
});

/* CLICK OUTSIDE CLOSE */
document.addEventListener("click", (e)=>{
  if(!e.target.closest(".has-dropdown")){
    dropdown.classList.remove("show");
  }
});

/* ===================== STRICT 30s TIMER + 24H VERIFICATION ===================== */
(function() {
  const VERIFIED_KEY = "taha_verified_at";
  const TIMER_KEY = "taha_timer_started";
  const VERIFY_DELAY = 30 * 1000; // 30 seconds
  const VERIFIED_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  const now = Date.now();
  const lastVerified = Number(localStorage.getItem(VERIFIED_KEY));

  // ✅ Already verified for 24 hours → allow access
  if (lastVerified && (now - lastVerified) < VERIFIED_DURATION) {
    return; // do nothing, user can access page
  }

  // ⏳ Start timer if not already started
  if (!localStorage.getItem(TIMER_KEY)) {
    localStorage.setItem(TIMER_KEY, now);
  }

  const startedAt = Number(localStorage.getItem(TIMER_KEY));
  const elapsed = now - startedAt;

  // Strict overlay creation
  function createOverlay() {
    let overlay = document.createElement("div");
    overlay.id = "verificationOverlay";
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.85)";
    overlay.style.zIndex = 99999;
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.color = "#fff";
    overlay.style.textAlign = "center";
    overlay.style.fontFamily = "sans-serif";
    overlay.innerHTML = `
      <h2 style="margin-bottom:20px">⏳ Verification Required</h2>
      <p style="margin-bottom:30px">Please verify your phone for Taha Salah Time Indicator +</p>
      <button id="goVerifyBtn" style="
        padding:12px 20px;
        border:none;
        border-radius:8px;
        background:#00ff9c;
        color:#000;
        font-weight:bold;
        cursor:pointer;
        font-size:16px;
      ">Go to Verify</button>
    `;
    document.body.appendChild(overlay);

    document.getElementById("goVerifyBtn").addEventListener("click", () => {
      const isSubfolder = location.pathname.includes("/product-details/");
      window.location.href = isSubfolder ? "../login.html" : "/login.html";
    });
  }

  // If timer already elapsed → show overlay immediately
  if (elapsed >= VERIFY_DELAY) {
    createOverlay();
  } else {
    // Start 30s timer
    setTimeout(() => {
      createOverlay();
    }, VERIFY_DELAY - elapsed);
  }

  // Optional: prevent scrolling while overlay exists
  document.addEventListener("scroll", () => {
    if (document.getElementById("verificationOverlay")) {
      window.scrollTo(0,0);
    }
  }, { passive: false });

})();
