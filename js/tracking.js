function toggleMobileDropdown() {
  const dd = document.getElementById("mobileProductDropdown");
  dd.style.display = dd.style.display === "flex" ? "none" : "flex";
}

function detectCourier(id) {
  id = id.trim().toUpperCase();

  if (/^\d{11}$/.test(id)) return "bluedart";
  if (/^\d{12,14}$/.test(id)) return "delhivery"; // normal Delhivery tracking
  if (/^\d{9}$/.test(id)) return "delhivery-lr";   // Delhivery LR number
  if (/^[A-Z]\d{8}$/.test(id)) return "dtdc";
  if (/^XP/.test(id)) return "xpressbees";
  if (/^SF/.test(id)) return "shadowfax";

  return "unknown";
}

function trackLR() {
  const lr = document.getElementById("lrId").value.trim();
  const error = document.getElementById("errorMsg");
  error.textContent = "";

  if (!lr) {
    error.textContent = "Please enter LR number";
    return;
  }

  if (!/^\d{9}$/.test(lr)) {
    error.textContent = "Invalid LR number. It should be 9 digits.";
    return;
  }

  // Open Delhivery LR tracking page
  window.open(`https://www.delhivery.com/lr-tracking?lr=${lr}`, "_blank");


  const courier = detectCourier(id);

  const links = {
    delhivery: `https://www.delhivery.com/track/package/${id}`,          // normal tracking
    "delhivery-lr": `https://www.delhivery.com/lr-tracking?lr=${id}`,   // LR tracking
    bluedart: `https://www.bluedart.com/web/guest/trackdartresult?trackFor=0&trackNo=${id}`,
    dtdc: `https://www.dtdc.com/tracking/tracking_results.asp?strCnno=${id}`,
    xpressbees: `https://www.xpressbees.com/track?awb=${id}`,
    shadowfax: `https://www.shadowfax.in/track/${id}`
  };

  if (courier === "unknown") {
    error.textContent = "Courier not recognized. Please check ID.";
    return;
  }

  window.open(links[courier], "_blank");
}
