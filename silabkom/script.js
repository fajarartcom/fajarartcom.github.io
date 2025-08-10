// js/script.js

function renderRoadmap() {
    const roadmapContainer = document.getElementById("roadmap-container");
  
    let html = `<ol class="relative border-l border-gray-200 dark:border-gray-700">`;
  
    roadmapData.forEach(item => {
      let statusColor = {
        success: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
        warning: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300",
        danger: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
        info: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
      }[item.status] || "bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300";
  
      html += `
        <li class="mb-10 ml-6">
          <span class="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 ${statusColor}">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L9 14.414l-3.707-3.707a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          </span>
          <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">${item.bulan} - ${item.judul}</h3>
          <p class="text-base font-normal text-gray-500 dark:text-gray-400">${item.deskripsi}</p>
        </li>
      `;
    });
  
    html += `</ol>`;
    roadmapContainer.innerHTML = html;
  }
  
  // Panggil render roadmap saat halaman selesai load
  document.addEventListener("DOMContentLoaded", () => {
    renderRoadmap();
  });
  


