// Image Popup System
(function() {
  'use strict';

  let currentImageIndex = 0;
  let images = [];

  // Create popup HTML
  function createPopup() {
    const popupHTML = `
      <div class="image-popup-overlay" id="imagePopup">
        <div class="image-popup-content">
          <button class="popup-close" id="popupClose">×</button>
          <button class="popup-nav prev" id="popupPrev">‹</button>
          <button class="popup-nav next" id="popupNext">›</button>
          <img src="" alt="" id="popupImage">
          <div class="image-popup-caption" id="popupCaption">
            <h3 id="popupTitle"></h3>
            <p id="popupDescription"></p>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // Add event listeners
    document.getElementById('popupClose').addEventListener('click', closePopup);
    document.getElementById('popupPrev').addEventListener('click', showPrevImage);
    document.getElementById('popupNext').addEventListener('click', showNextImage);
    document.getElementById('imagePopup').addEventListener('click', function(e) {
      if (e.target.id === 'imagePopup') {
        closePopup();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      const popup = document.getElementById('imagePopup');
      if (popup && popup.classList.contains('active')) {
        if (e.key === 'Escape') closePopup();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
      }
    });
  }

  // Open popup
  function openPopup(imageData, allImages, index) {
    images = allImages;
    currentImageIndex = index;

    const popup = document.getElementById('imagePopup');
    const popupImage = document.getElementById('popupImage');
    const popupTitle = document.getElementById('popupTitle');
    const popupDescription = document.getElementById('popupDescription');
    const popupCaption = document.getElementById('popupCaption');

    popupImage.src = imageData.src;
    popupImage.alt = imageData.title || '';
    popupTitle.textContent = imageData.title || '';
    popupDescription.textContent = imageData.description || '';

    // Hide caption if no title or description
    if (!imageData.title && !imageData.description) {
      popupCaption.style.display = 'none';
    } else {
      popupCaption.style.display = 'block';
    }

    // Show/hide navigation arrows
    const prevBtn = document.getElementById('popupPrev');
    const nextBtn = document.getElementById('popupNext');
    
    if (images.length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
    }

    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close popup
  function closePopup() {
    const popup = document.getElementById('imagePopup');
    popup.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Show previous image
  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updatePopupImage();
  }

  // Show next image
  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updatePopupImage();
  }

  // Update popup image
  function updatePopupImage() {
    const imageData = images[currentImageIndex];
    const popupImage = document.getElementById('popupImage');
    const popupTitle = document.getElementById('popupTitle');
    const popupDescription = document.getElementById('popupDescription');
    const popupCaption = document.getElementById('popupCaption');

    popupImage.src = imageData.src;
    popupImage.alt = imageData.title || '';
    popupTitle.textContent = imageData.title || '';
    popupDescription.textContent = imageData.description || '';

    if (!imageData.title && !imageData.description) {
      popupCaption.style.display = 'none';
    } else {
      popupCaption.style.display = 'block';
    }
  }

  // Initialize popup for a gallery
  function initializeGallery(selector, imageSelector) {
    const galleryItems = document.querySelectorAll(selector);
    const allImages = [];

    galleryItems.forEach((item, index) => {
      const img = item.querySelector(imageSelector);
      if (img) {
        const imageData = {
          src: img.src,
          title: item.querySelector('h3')?.textContent || item.querySelector('strong')?.textContent || '',
          description: item.querySelector('p')?.textContent || ''
        };
        allImages.push(imageData);

        item.addEventListener('click', function(e) {
          if (!e.target.closest('a')) {
            openPopup(imageData, allImages, index);
          }
        });
      }
    });
  }

  // Initialize on page load
  window.addEventListener('DOMContentLoaded', function() {
    createPopup();

    // Initialize for different galleries
    setTimeout(() => {
      initializeGallery('.promotion-item', '.promotion-image');
      initializeGallery('.card', 'img');
    }, 500);
  });

  // Export for external use
  window.imagePopup = {
    open: openPopup,
    close: closePopup,
    init: initializeGallery
  };
})();

