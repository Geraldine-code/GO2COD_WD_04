document.addEventListener("DOMContentLoaded", function () {
	const galleryItems = document.querySelectorAll(".gallery-item img");
	const lightbox = document.querySelector(".lightbox");
	const lightboxImage = document.querySelector(".lightbox-image");
	const closeButton = document.querySelector(".lightbox .close");
	const zoomInButton = document.querySelector(".zoom-in");
	const zoomOutButton = document.querySelector(".zoom-out");
	const prevButton = document.querySelector(".prev");
	const nextButton = document.querySelector(".next");
  
	let scale = 1;
	let currentImageIndex = 0;
  
	// Handle menu navigation
	document.querySelectorAll('.menu').forEach(menuItem => {
	  menuItem.addEventListener('click', function (e) {
		e.preventDefault();
		const page = this.getAttribute('data-page');
		document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  
		const selectedPage = document.querySelector(`#page${page}`);
		if (selectedPage) {
		  selectedPage.classList.remove('hidden');
		}
	  });
	});
  
	// Open lightbox with clicked image
	galleryItems.forEach((item, index) => {
	  item.addEventListener("click", () => {
		currentImageIndex = index;
		openLightbox(item.src);
	  });
	});
  
	function openLightbox(src) {
	  lightbox.style.display = "flex";
	  lightboxImage.src = src;
	  scale = 1; // Reset scale
	  lightboxImage.style.transform = `scale(${scale})`;
	}
  
	// Close lightbox
	closeButton.addEventListener("click", closeLightbox);
  
	function closeLightbox() {
	  lightbox.style.display = "none";
	  lightboxImage.src = "";
	}
  
	// Close lightbox on outside click
	lightbox.addEventListener("click", (e) => {
	  if (!e.target.closest(".lightbox-image") && !e.target.closest(".zoom-controls") && !e.target.closest(".prev") && !e.target.closest(".next")) {
		closeLightbox();
	  }
	});
  
	// Navigate to next image
	nextButton.addEventListener("click", () => {
	  currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
	  openLightbox(galleryItems[currentImageIndex].src);
	});
  
	// Navigate to previous image
	prevButton.addEventListener("click", () => {
	  currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
	  openLightbox(galleryItems[currentImageIndex].src);
	});
  
	// Zoom in
	zoomInButton.addEventListener("click", (e) => {
	  e.stopPropagation();
	  scale += 0.2;
	  if (scale > 3) scale = 3; // Limit maximum zoom scale
	  lightboxImage.style.transform = `scale(${scale})`;
	});
  
	// Zoom out
	zoomOutButton.addEventListener("click", (e) => {
	  e.stopPropagation();
	  if (scale > 0.4) {
		scale -= 0.2;
		lightboxImage.style.transform = `scale(${scale})`;
	  }
	});
  
	// Mouse wheel zoom
	lightboxImage.addEventListener("wheel", (e) => {
	  e.preventDefault();
	  scale += e.deltaY * -0.001;
	  scale = Math.min(Math.max(0.4, scale), 3);
	  lightboxImage.style.transform = `scale(${scale})`;
	});
  
	// Add keyboard navigation
	document.addEventListener("keydown", (e) => {
	  if (lightbox.style.display === "flex") {
		switch (e.key) {
		  case "Escape": // Close lightbox
			closeLightbox();
			break;
		  case "ArrowRight": // Next image
			nextButton.click();
			break;
		  case "ArrowLeft": // Previous image
			prevButton.click();
			break;
		}
	  }
	});
  });

  $(window).load(function(){

	adjustHeightOfPage(1); // Adjust page height

	$(".gee-copyright-year").text(new Date().getFullYear());
                           
});