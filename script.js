/**
 * Data for the Gallery
 * Using high-quality placeholder images of nature.
 */
const images = [
  "https://picsum.photos/1200/800?random=1",
  "https://picsum.photos/1200/800?random=2",
  "https://picsum.photos/1200/800?random=3",
  "https://picsum.photos/1200/800?random=4",
  "https://picsum.photos/1200/800?random=5",
  "https://picsum.photos/1200/800?random=6",
  "https://picsum.photos/1200/800?random=7",
  "https://picsum.photos/1200/800?random=8"
];

let currentIndex = 0;

// === Elements ===
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const clockElement = document.getElementById('clock');
const countdownElement = document.getElementById('countdown');

// === Initialization ===
function initGallery() {
  // Loop through images and create img elements dynamically
  images.forEach((src, index) => {
    const imgElement = document.createElement('img');
    imgElement.src = src;
    imgElement.alt = `Nature Gallery Image ${index + 1}`;
    
    // Add referrer policy to handle iframe permissions
    imgElement.referrerPolicy = 'no-referrer';
    
    // Open lightbox specifically for the clicked image
    imgElement.addEventListener('click', () => openLightbox(index));
    galleryGrid.appendChild(imgElement);
  });
}

// === Lightbox Logic ===
function openLightbox(index) {
  currentIndex = index;
  updateLightboxImage();
  // Use flex to display and center content
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent page scrolling
}

function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.style.overflow = 'auto'; // Restore scrolling
}

function updateLightboxImage() {
  lightboxImg.src = images[currentIndex];
}

function showNextImage(e) {
  if (e) e.stopPropagation(); // Don't trigger the background click event
  currentIndex = (currentIndex + 1) % images.length;
  updateLightboxImage();
}

function showPrevImage(e) {
  if (e) e.stopPropagation();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightboxImage();
}

// === Event Listeners for Lightbox ===
closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNextImage);
prevBtn.addEventListener('click', showPrevImage);

// Close lightbox when clicking on the dark background (outside the image)
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard accessibility for Lightbox
document.addEventListener('keydown', (e) => {
  // Only handle keys if the lightbox is actually open
  if (lightbox.style.display === 'flex') {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
  }
});

// === Live Digital Clock ===
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}
// Start clock immediately and update every 1 second
setInterval(updateClock, 1000);
updateClock(); 

// === Countdown to Next New Year ===
function updateCountdown() {
  const now = new Date();
  const currentYear = now.getFullYear();
  
  // Create a date object for January 1st of the NEXT year
  const nextNewYear = new Date(`January 1, ${currentYear + 1} 00:00:00`);
  
  // Calculate difference in milliseconds
  const diffTime = nextNewYear - now;
  
  // Convert milliseconds into readable time units
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffTime / 1000 / 60) % 60);
  const seconds = Math.floor((diffTime / 1000) % 60);
  
  countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
// Start countdown immediately and update every 1 second
setInterval(updateCountdown, 1000);
updateCountdown();

// Initialize the gallery when script loads
initGallery();
