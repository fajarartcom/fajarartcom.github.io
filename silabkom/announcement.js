// announcement.js
document.addEventListener("DOMContentLoaded", () => {
  if (announcements && announcements.length > 0) {
    const bar = document.getElementById("announcementBar");
    const textContainer = document.getElementById("announcementText");

    // Gabungkan semua pengumuman jadi satu string
    const combinedText = announcements.map(a => a.text).join(" | ");
    textContainer.textContent = combinedText;

    // Ganti warna background sesuai tipe (pakai pengumuman pertama)
    const type = announcements[0].type;
    if (type === "danger") bar.classList.add("bg-red-600", "text-white");
    if (type === "info") bar.classList.add("bg-blue-600", "text-white");
    if (type === "success") bar.classList.add("bg-green-600", "text-white");

    // Tampilkan bar
    bar.classList.remove("hidden");
  }
});
