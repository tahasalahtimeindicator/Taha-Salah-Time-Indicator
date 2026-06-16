const categorySelect = document.getElementById("categorySelect");
const modelSelect = document.getElementById("modelSelect");
const modelSearch = document.getElementById("modelSearch");

const models = {
  "Masjid STI": [
    "LCD-24H",
    "LCD-32H",
    "LCD-24V",
    "LCD-32V",
    "LCD-24D",
    "LCD-32D",
    "P2E2C40",
    "P2E2C25",
    "P2E2C19",
    "PD2i24",
    "P2D2i10",
    "P2C1B18",

    "PT2D25",
    "P3Q2C25",
    "PD2i40",
    "P4i40",
    "P3i40",

    "PD2i24L",
    "P4i24L",
    "P3i24L",

    "PD2i24",
    "P4i24",
    "P3i24",

    "PD2i24V",
    "P4i24V",
    "P3i24V",

    "PD2i18",
    "PD2i18s",
    "PD2i18V",

    "PD2i15V",
    "P4i15V",
    "P3i15V",

    "P4i15A",
    "P3i15A",
    "P4i15B",
    "P3i15B",

    "PC3i19",

    "P4i12",
    "P3i12",

    "PC3i9V",

    "P4i12V",
    "P3i12V",

    "pi10",
    "pi10V",
    "pi10mini"
  ]
,
  "Azan Home": [
    "P3-C10",
    "P3-C8",
    "P3-B",
    "P3-A",
    "P3-C1",
    "P3-C7",
    "P3-C14",
    "P3-C9",
    "P3-C13",
    "P3-C12",
    "P3-C11",
    "P3-C2",
    "P3-C4",
    "P3-C3",
    "P3-C5",
    "P3-C6"
  ]
,
  "Gold Rate Display": ["Basic"],
  "World Clock": ["Basic"],
  "Rate Display" :["Basic"],
  "Presentation Timer" :["Basic"]
};

categorySelect.addEventListener("change", () => {
  modelSelect.innerHTML = '<option value="">Select Model</option>';
  modelSearch.value = "";

  if (models[categorySelect.value]) {
    models[categorySelect.value].forEach(model => {
      const opt = document.createElement("option");
      opt.value = model;
      opt.textContent = model;
      modelSelect.appendChild(opt);
    });
  }
});

modelSearch.addEventListener("input", () => {
  const search = modelSearch.value.toLowerCase();
  Array.from(modelSelect.options).forEach(option => {
    if (!option.value) return;
    option.style.display = option.value.toLowerCase().includes(search)
      ? "block"
      : "none";
  });
});

// Autofill from product page
const params = new URLSearchParams(window.location.search);
if (params.get("category")) categorySelect.value = params.get("category");
if (params.get("model")) {
  categorySelect.dispatchEvent(new Event("change"));
  setTimeout(() => modelSelect.value = params.get("model"), 200);
}

/* ===== SUBMIT FLOW ===== */
const form = document.getElementById("contactForm");
const loader = document.getElementById("submitOverlay");
const success = document.getElementById("successOverlay");

form.addEventListener("submit", e => {
  e.preventDefault();

  loader.classList.remove("hidden");

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { Accept: "application/json" }
  }).then(() => {
    setTimeout(() => {
      loader.classList.add("hidden");
      success.classList.remove("hidden");
      form.reset();
    }, 2000);
  }).catch(() => {
    alert("Something went wrong. Please try again.");
    loader.classList.add("hidden");
  });
});
