document.addEventListener("DOMContentLoaded", () => {
  // ✅ Load user profile from localStorage
  const userData = JSON.parse(localStorage.getItem("loggedInUser"));
  if (userData) {
    document.getElementById("loggedUsername").innerText = userData.username || "Unknown";
  }

  // ✅ Sidebar Navigation
  document.getElementById("dashboard-link")?.addEventListener("click", () => window.location.href = "dashboard.html");
  document.getElementById("profile-link")?.addEventListener("click", () => window.location.href = "profile.html");
  document.getElementById("reservation-link")?.addEventListener("click", () => window.location.href = "reservation.html");
  document.getElementById("settings-link")?.addEventListener("click", () => window.location.href = "settings.html");
  document.getElementById("faq-link")?.addEventListener("click", () => window.location.href = "faq.html");

  // ✅ Logout
  document.getElementById("logout-link")?.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("lastLogin");
    window.location.href = "index.html";
  });

  // ✅ Notification Toggle
  const bell = document.getElementById("notification-icon");
  const panel = document.getElementById("notification-panel");
  const list = document.getElementById("notification-list");
  const closeBtn = document.getElementById("close-notif");

  if (bell && panel && list) {
    bell.addEventListener("click", () => {
      panel.style.display = panel.style.display === "none" ? "block" : "none";
    });

    closeBtn?.addEventListener("click", () => {
      panel.style.display = "none";
    });

    const notifications = [
      "Reservation confirmed for Oct 2",
      "New event: 3v3 Tournament this weekend",
      "Court maintenance on Oct 5"
    ];

    list.innerHTML = notifications.map(note => `<li>${note}</li>`).join("");
  }
});
