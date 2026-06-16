/* ================= VIDEO CONTROLS WITH AUTO FADE ================= */
document.querySelectorAll(".video-media").forEach(box => {
  const video = box.querySelector("video");
  const playBtn = box.querySelector(".play");
  const timeline = box.querySelector(".timeline");

  if (!video || !playBtn || !timeline) return;

  let fadeTimeout;

  // Initialize timeline
  timeline.min = 0;
  timeline.max = 100;
  timeline.value = 0;

  // Function to show controls
  function showControls() {
    playBtn.style.opacity = "1";
    if (!video.paused) timeline.style.opacity = "1";

    clearTimeout(fadeTimeout);
    fadeTimeout = setTimeout(() => {
      if (!video.paused) {
        playBtn.style.opacity = "0";
        timeline.style.opacity = "0";
      }
    }, 3000); // 3 seconds
  }

  // Play / Pause toggle
  playBtn.addEventListener("click", async (e) => {
    e.stopPropagation();
    if (video.paused) {
      await video.play();
      playBtn.textContent = "⏸"; // pause symbol
    } else {
      video.pause();
      playBtn.textContent = "▶"; // play symbol
      timeline.style.opacity = "0";
    }
    showControls();
  });

  // Update timeline while playing
  video.addEventListener("timeupdate", () => {
    if (!isNaN(video.duration)) {
      timeline.value = (video.currentTime / video.duration) * 100;
    }
  });

  // Scrub video on timeline change
  timeline.addEventListener("input", () => {
    if (!isNaN(video.duration)) {
      video.currentTime = (timeline.value / 100) * video.duration;
    }
  });

  // Hover or tap effects
  box.addEventListener("mouseenter", showControls);
  box.addEventListener("mousemove", showControls); // hover move
  box.addEventListener("mouseleave", () => {
    if (!video.paused) fadeTimeout = setTimeout(() => {
      playBtn.style.opacity = "0";
      timeline.style.opacity = "0";
    }, 3000);
  });

  box.addEventListener("click", showControls);

  // Update play button on play / pause events
  video.addEventListener("play", () => {
    playBtn.textContent = "⏸";
    showControls();
  });
  video.addEventListener("pause", () => {
    playBtn.textContent = "▶";
    playBtn.style.opacity = "1";
    timeline.style.opacity = "0";
    clearTimeout(fadeTimeout);
  });

  // Fullscreen on double-click video
  video.addEventListener("dblclick", () => {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  });
});
