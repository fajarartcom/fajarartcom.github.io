// gallery.js
document.addEventListener("DOMContentLoaded", () => {
    const slidesContainer = document.getElementById("gallerySlides");
    const prevBtn = document.getElementById("prevSlide");
    const nextBtn = document.getElementById("nextSlide");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxDesc = document.getElementById("lightboxDesc");
    const lightboxClose = document.getElementById("lightboxClose");
  
    let currentIndex = 0;
  
    // Render slides
    galleryPhotos.forEach((photo) => {
      const slide = document.createElement("div");
      slide.className = "min-w-full cursor-pointer hover-zoom animate-fadeIn";
      slide.innerHTML = `
        <img src="${photo.src}" alt="${photo.title}" class="w-full h-[400px] object-cover rounded-t-lg">
        <div class="bg-white p-4">
          <h3 class="text-lg font-bold">${photo.title}</h3>
          <p class="text-gray-600">${photo.description}</p>
        </div>
      `;
      slide.addEventListener("click", () => {
        lightboxImg.src = photo.src;
        lightboxTitle.textContent = photo.title;
        lightboxDesc.textContent = photo.description;
        lightbox.classList.remove("hidden");
        lightbox.classList.add("flex");
      });
      slidesContainer.appendChild(slide);
    });
  
    // Navigation
    function showSlide(index) {
      if (index < 0) index = galleryPhotos.length - 1;
      if (index >= galleryPhotos.length) index = 0;
      currentIndex = index;
      slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    }
  
    prevBtn.addEventListener("click", () => showSlide(currentIndex - 1));
    nextBtn.addEventListener("click", () => showSlide(currentIndex + 1));
  
    // Auto slide
    setInterval(() => showSlide(currentIndex + 1), 3000);
  
    // Lightbox close
    lightboxClose.addEventListener("click", () => {
      lightbox.classList.add("hidden");
      lightbox.classList.remove("flex");
    });
  });
  