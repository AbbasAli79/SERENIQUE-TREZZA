// JavaScript for Serenique Trezza Website - FIXED VERSION
// ========== MINIMAL REVIEWS SLIDER ==========

// Initialize Minimal Reviews Slider
function initReviewsSwiper() {
    if (document.querySelector('.reviews-swiper')) {
        const reviewsSwiper = new Swiper('.reviews-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            speed: 500,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.review-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.review-next',
                prevEl: '.review-preview',
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
                992: {
                    slidesPerView: 1,
                    spaceBetween: 40,
                },
            },
            on: {
                init: function () {
                    console.log('Minimal Reviews Slider initialized');
                }
            }
        });
        
        return reviewsSwiper;
    }
    return null;
}

// Add keyboard navigation
function addReviewsKeyboardNav(swiper) {
    if (!swiper) return;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            swiper.slidePrev();
        } else if (e.key === 'ArrowRight') {
            swiper.slideNext();
        }
    });
}

// Add scroll animation
function animateReviewsOnScroll() {
    const reviewsSection = document.getElementById('reviews');
    if (!reviewsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const slides = entry.target.querySelectorAll('.review-slide');
                slides.forEach((slide, index) => {
                    setTimeout(() => {
                        slide.style.opacity = '1';
                        slide.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(reviewsSection);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    
    // Initialize Reviews Slider
    if (typeof Swiper !== 'undefined') {
        const reviewsSwiper = initReviewsSwiper();
        addReviewsKeyboardNav(reviewsSwiper);
        animateReviewsOnScroll();
    } else {
        // Wait for Swiper to load
        const checkSwiper = setInterval(() => {
            if (typeof Swiper !== 'undefined') {
                const reviewsSwiper = initReviewsSwiper();
                addReviewsKeyboardNav(reviewsSwiper);
                animateReviewsOnScroll();
                clearInterval(checkSwiper);
            }
        }, 100);
    }
    
    // ... existing code ...
});

// Add smooth entrance animation CSS
const style = document.createElement('style');
style.textContent = `
    .review-slide {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .reviews .review-slide:nth-child(1) { transition-delay: 0.1s; }
    .reviews .review-slide:nth-child(2) { transition-delay: 0.2s; }
    .reviews .review-slide:nth-child(3) { transition-delay: 0.3s; }
    .reviews .review-slide:nth-child(4) { transition-delay: 0.4s; }
    .reviews .review-slide:nth-child(5) { transition-delay: 0.5s; }
    .reviews .review-slide:nth-child(6) { transition-delay: 0.6s; }
    .reviews .review-slide:nth-child(7) { transition-delay: 0.7s; }
    .reviews .review-slide:nth-child(8) { transition-delay: 0.8s; }
`;
document.head.appendChild(style);
// Mobile Navigation Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.innerHTML = navLinks.classList.contains('active')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';

        // Prevent body scroll when menu is open on mobile
        if (navLinks.classList.contains('active') && window.innerWidth <= 768) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') return;

        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        if (targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileToggle) {
                        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                    document.body.style.overflow = 'auto';
                }
            }
        }
    });
});

// ========== HERO SLIDER FIXED ==========
const carouselSlides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentSlide = 0;
let slideInterval;

function showSlide(n) {
    // Hide all slides
    carouselSlides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Calculate new slide index
    currentSlide = (n + carouselSlides.length) % carouselSlides.length;

    // Show current slide and activate corresponding dot
    if (carouselSlides[currentSlide]) {
        carouselSlides[currentSlide].classList.add('active');
    }
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startCarousel() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopCarousel() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// Initialize carousel if elements exist
if (carouselSlides.length > 0) {
    // Event listeners for carousel buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopCarousel();
            startCarousel();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopCarousel();
            startCarousel();
        });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopCarousel();
            startCarousel();
        });
    });

    // Start auto-sliding
    startCarousel();

    // Pause on hover (desktop only)
    if (window.innerWidth > 768) {
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopCarousel);
            carouselContainer.addEventListener('mouseleave', startCarousel);
        }
    }
}

// ========== FORM VALIDATION POPUP (NO ALERTS) ==========
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;

    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: var(--border-radius);
                box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                max-width: 400px;
                animation: slideInRight 0.3s ease-out;
                border-left: 4px solid var(--primary-purple);
            }
            .notification.error {
                border-left-color: #e74c3c;
            }
            .notification.success {
                border-left-color: #2ecc71;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
                flex: 1;
            }
            .notification i {
                font-size: 1.2rem;
            }
            .notification.error i {
                color: #e74c3c;
            }
            .notification.success i {
                color: #2ecc71;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--medium-gray);
                padding: 0 5px;
                margin-left: 10px;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @media (max-width: 768px) {
                .notification {
                    min-width: 250px;
                    max-width: 300px;
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    margin: 0 auto;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    // Add to body
    document.body.appendChild(notification);

    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// WhatsApp Form Submission (for contact page) - FIXED (Opens WhatsApp directly with message)
const whatsappForm = document.getElementById('whatsappForm');
if (whatsappForm) {
    whatsappForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('whatsappName').value.trim();
        const phone = document.getElementById('whatsappPhone').value.trim();
        const message = document.getElementById('whatsappMessage').value.trim();

        // Show notification instead of alert
        if (!name || !message) {
            showNotification('Please fill in at least your name and message.', 'error');
            return;
        }

        // Format the WhatsApp message - SIMPLIFIED FOR BETTER WHATSAPP OPENING
        let whatsappMessage = `Hello Serenique Trezza!\n\n`;
        whatsappMessage += `I'm interested in your jewelry collection.\n\n`;
        whatsappMessage += `*My Details:*\n`;
        whatsappMessage += `Name: ${name}\n`;
        if (phone) {
            whatsappMessage += `Phone: ${phone}\n`;
        }
        whatsappMessage += `\n*My Message:*\n${message}`;

        // WhatsApp number
        const whatsappNumber = '923359997124'; // Using full international format

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Create WhatsApp URL with message
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Reset form
        whatsappForm.reset();

        // Show success notification
        showNotification('Opening WhatsApp with your message...', 'success');

        // Open WhatsApp with message (not just app)
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
        }, 500);
    });
}

// REMOVE ALL UNNECESSARY FILTERS FROM IMAGES
function removeAllFilters() {
    const allImages = document.querySelectorAll('.gallery-item img, .gallery-grid img, .modal-img img, .collage-item img');

    allImages.forEach(img => {
        // Remove CSS filters
        img.style.filter = 'none';
        img.style.webkitFilter = 'none';
        img.style.opacity = '1';
        img.style.transform = 'none';
        img.style.visibility = 'visible';
        img.style.display = 'block';

        // Remove any filter classes
        img.classList.remove('blur', 'grayscale', 'sepia', 'opacity-low', 'loading');

        // Force image reload if broken
        if (img.complete && img.naturalHeight === 0) {
            const src = img.src;
            img.src = '';
            setTimeout(() => {
                img.src = src;
            }, 100);
        }
    });

    // Remove filters from parent containers
    const galleryItems = document.querySelectorAll('.gallery-item, .collage-item');
    galleryItems.forEach(item => {
        item.style.filter = 'none';
        item.style.transform = 'none';
    });
}

// Fix broken images
function fixBrokenImages() {
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function () {
            console.log('Image failed to load:', this.src);
            // Try to load placeholder or alternative
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="200" y="150" font-family="Arial" font-size="14" fill="%23666" text-anchor="middle">Image not available</text></svg>';
            this.alt = 'Image not available - ' + this.alt;
        };
    });
}

// WhatsApp Order Function - FIXED (NO IMAGE URL, just name and details)
function orderOnWhatsApp(productName, productPrice, productDescription) {
    // WhatsApp Configuration
    const whatsappNumber = '923359997124'; // Your WhatsApp number with country code
    const businessName = 'Serenique Trezza';

    // Create the WhatsApp message WITHOUT image URL
    let message = `Hello ${businessName}!\n\n`;
    message += `I want to order this product:\n\n`;
    message += `*Product Name:* ${productName}\n`;
    message += `*Price:* ${productPrice}\n`;
    message += `*Description:* ${productDescription}\n\n`;
    message += `Please confirm availability and provide payment details.`;

    // Encode the message
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Show success message
    const successMessage = document.getElementById('orderSuccess');
    if (successMessage) {
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }

    // Also show notification
    showNotification('Opening WhatsApp to place your order...', 'success');

    // Open WhatsApp in new tab WITH THE MESSAGE
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
    }, 500);

    return false;
}

// Product Data - COMPLETE UPDATED VERSION WITH ALL PRODUCTS (PRICES UPDATED)
const productData = {
    // Original products - PRICES UPDATED
    1: {
        title: "Soul Magnet",
        image: "imgaes/28soul-magnet.jpeg",
        price: "PKR 370",
        description: "Bold, dramatic, and undeniably luxurious. This statement piece features a striking zig-zag architecture of jet-black faceted crystals encased in a rich border of shimmering gold-tone beads. It is designed for the woman who wants her jewelry to command the room with a blend of mystery and opulence."
    },
    2: {
        title: "Monarch Whisper",
        image: "imgaes/1monarch.jpeg",
        price: "PKR 250",
        description: "A beautiful gold-tone bracelet that symbolizes enduring love and life. Each piece features a delicate chain accented with a heart charm flowing into a smooth heartbeat line. Perfect for couples, best friends, simply for individuals or as a thoughtful appreciation gift for a medical professional."
    },
    3: {
        title: "Monarch Whisper - Variation 2",
        image: "imgaes/2monarch.jpeg",
        price: "PKR 250",
        description: "A beautiful gold-tone bracelet that symbolizes enduring love and life. Each piece features a delicate chain accented with a heart charm flowing into a smooth heartbeat line. Perfect for couples, best friends, simply for individuals or as a thoughtful appreciation gift for a medical professional."
    },
    4: {
        title: "Monarch Whisper - Variation 3",
        image: "imgaes/3monarch.jpeg",
        price: "PKR 250",
        description: "A beautiful gold-tone bracelet that symbolizes enduring love and life. Each piece features a delicate chain accented with a heart charm flowing into a smooth heartbeat line. Perfect for couples, best friends, simply for individuals or as a thoughtful appreciation gift for a medical professional."
    },
    5: {
        title: "Monarch Whisper - Variation 4",
        image: "imgaes/4monarch.jpeg",
        price: "PKR 250",
        description: "A beautiful gold-tone bracelet that symbolizes enduring love and life. Each piece features a delicate chain accented with a heart charm flowing into a smooth heartbeat line. Perfect for couples, best friends, simply for individuals or as a thoughtful appreciation gift for a medical professional."
    },
    6: {
        title: "The Heartline Rhythm",
        image: "imgaes/5heartline.jpeg",
        price: "PKR 250",
        description: "A beautiful gold-tone bracelet that symbolizes enduring love and life. Each piece features a delicate chain accented with a heart charm flowing into a smooth heartbeat line. Perfect for couples, best friends, simply for individuals or as a thoughtful appreciation gift for a medical professional."
    },
    7: {
        title: "The Crystal Whisper",
        image: "imgaes/6crystal-whis.jpeg",
        price: "PKR 270",
        description: "A delicate and luminous bracelet featuring shimmering pink crystal beads hand-strung along a fine silver-tone chain. It is finished with a charming, dangling cherry blossom charm and a crystal tassel, perfect for adding a touch of ethereal sparkle to your wrist."
    },
    8: {
        title: "Lumina Duo",
        image: "imgaes/7lumina-duo.jpeg",
        price: "PKR 250",
        description: "A dreamy pair of pearl bracelets featuring translucent butterfly charms and delicate silver chains. The set includes two styles: one with soft lilac accents and one with fresh mint accents. Designed to be stacked together, shared with a friend, or worn individually for a sweet, cottagecore touch."
    },
    9: {
        title: "Pastel Cascade",
        image: "imgaes/8pastel-cas.jpeg",
        price: "PKR 250",
        description: "A delightful beaded bracelet featuring a charming spectrum of soft, translucent pastel hues. Finished with a delicate silver four-leaf clover charm for a touch of luck and everyday joy."
    },
    10: {
        title: "Classic Gem Link",
        image: "imgaes/10classic-gem.jpeg",
        price: "PKR 250",
        description: "A refined, minimalist bracelet featuring a continuous line of vibrant, perfectly polished beads connected by a delicate round rings. Choose your hue to add a subtle, endless glimmer to your wrist."
    },
    11: {
        title: "Stardust Stream",
        image: "imgaes/11stardust-stre.jpeg",
        price: "PKR 260",
        description: "A whimsical gold bracelet featuring sparkling pink gemstone beads and a playful fringe of dangling gold star charms. An elegant and dreamy piece that captures the light of the night sky."
    },
    12: {
        title: "Heartstring Pastel",
        image: "imgaes/12heartstring-pas.jpeg",
        price: "PKR 200",
        description: "A charming pastel beaded bracelet finished with a soft heart accent, designed to bring joy, color, and gentle elegance to your everyday look."
    },
    13: {
        title: "Duo Serenity Stretch",
        image: "imgaes/13duo sernity-str.jpeg",
        price: "PKR 250",
        description: "An effortlessly chic stretch bracelet featuring a harmonious rhythm of soft celestial beads. Finished with a delicate charm cluster, this comfortable piece symbolizes peace and perfect balance."
    },
    14: {
        title: "Duo Serenity Stretch - Variation",
        image: "imgaes/14duo sernity-str.jpeg",
        price: "PKR 250",
        description: "Another beautiful variation of this serene bracelet featuring a harmonious rhythm of soft celestial beads. Finished with a delicate charm cluster, this comfortable piece symbolizes peace and perfect balance."
    },
    15: {
        title: "Ameline Serenity",
        image: "imgaes/15ameline-ser.jpeg",
        price: "PKR 320",
        description: "A graceful blend of pastel beads and delicate charms, the Ameline Serenity Bracelet is designed to reflect softness, elegance, and timeless beauty. Perfect for everyday wear or special moments, it adds a gentle touch of charm to any look."
    },
    16: {
        title: "Aurora Whisper",
        image: "imgaes/16aurora-whi.jpeg",
        price: "PKR 270",
        description: "A delicate gold chain bracelet adorned with luminous opal-like beads, exuding timeless elegance and subtle charm."
    },
    17: {
        title: "Celestial Kitty",
        image: "imgaes/17calestial-kit.jpeg",
        price: "PKR 250",
        description: "Embrace a touch of whimsical nostalgia with our Celestial Kitty. Featuring a delicate blend of pastel star charms, iridescent pearls, and a signature enamel kitty pendant, this piece is handcrafted on a silver-tone equipment's to add a soft, dreamy sparkle to your everyday style."
    },
    18: {
        title: "Emerald Mist",
        image: "imgaes/18emerald-mis.jpeg",
        price: "PKR 250",
        description: "Capture the essence of a hidden forest with our Emerald Mist. Featuring artisan-crafted cracked glass beads in a soothing sage green, each bead is delicately linked by hand with gold-tone hardware for a look that is both earthy and refined."
    },
    19: {
        title: "Meadow and Mist",
        image: "imgaes/19meadow-mis.jpeg",
        price: "PKR 300",
        description: "Celebrate harmony with our Meadow and Mist. This exquisite pair features hand-selected cracked-glass beads in refreshing lime green and tranquil sky blue, woven together with lustrous faux pearls and radiant gold-toned accents for a timeless, elegant finish."
    },
    20: {
        title: "Starlight Filigree",
        image: "imgaes/20starlight-fil.jpeg",
        price: "PKR 260",
        description: "Capture the magic of a clear night sky with our Starlight Filigree. This delicate silver-toned bracelet features a constellation of dainty star charms that dance along a fine link chain, offering a subtle yet enchanting sparkle to your wrist."
    },
    21: {
        title: "Pearlescent Petal",
        image: "imgaes/21pearlescent-pet.jpeg",
        price: "PKR 200",
        description: "Exude timeless grace with our Pearlescent Petal. Featuring a seamless strand of lustrous white pearls and a delicate enamel flower charm with a crystal heart, this piece is a classic staple for the modern romantic."
    },
    22: {
        title: "Ethereal Heart Link",
        image: "imgaes/22ethereal-hea.jpeg",
        price: "PKR 250",
        description: "Celebrate a spectrum of joy with our Ethereal Heart Link. A vibrant dance of colorful cracked-glass beads meets a dazzling crystal heart centerpiece, hand-linked on a polished silver-tone chain for a playful yet sophisticated finish."
    },
    23: {
        title: "Scarlet Dreamscape",
        image: "imgaes/23scarlet-dre.jpeg",
        price: "PKR 300",
        description: "Make a romantic statement with our Scarlet Dreamscape. Featuring a striking half-and-half design of vibrant scarlet crystals and frosted white beads, this piece is finished with a charming red enamel heart for a touch of classic elegance."
    },
    24: {
        title: "Signature Petal",
        image: "imgaes/24signature-pet.jpeg",
        price: "PKR 270",
        description: "A poetic symbol of trust and devotion. This duo features one bracelet of translucent sea-foam blue and another of soft rose-quartz pink. Adorned with a vintage-inspired silver key and a matching heart-engraved lock, these pieces represent the one person who holds the key to your heart. Elegant, sentimental, and perfectly paired."
    },
    25: {
        title: "Winter Willow",
        image: "imgaes/25winter-willow.jpeg",
        price: "PKR 320",
        description: "A sophisticated play of cool tones, this piece features alternating clusters of soft sky-blue and charcoal-grey faceted beads. Accented with polished silver-tone spacers, the fluid, organic silhouette mimics the gentle movement of waves. It's a modern statement of calm and confidence, perfect for elevating a minimalist look."
    },
    26: {
        title: "Moonblush Strand",
        image: "imgaes/26moonblush-str.jpeg",
        price: "PKR 350",
        description: "Elevate your everyday stack with this intricate woven design. Combining the soft glow of glass pearls with the brilliant sparkle of champagne bicone crystals, this bracelet offers a modern twist on classic elegance. Finished with an adjustable silver chain for the perfect fit."
    },
    27: {
        title: "Unlocked Soul",
        image: "imgaes/27unlocked-soul.jpeg",
        price: "PKR 390",
        description: "A poetic symbol of trust and devotion. This duo features one bracelet of translucent sea-foam blue and another of soft rose-quartz pink. Adorned with a vintage-inspired silver key and a matching heart-engraved lock, these pieces represent the one person who holds the key to your heart. Elegant, sentimental, and perfectly paired."
    },
    
    // New combined products from gallery - PRICES UPDATED
    "monarch-whisper": {
        title: "Monarch Whisper Bracelet Collection",
        images: [
            "imgaes/2monarch.jpeg",
            "imgaes/1monarch.jpeg", 
            "imgaes/4monarch.jpeg",
            "imgaes/3monarch.jpeg"
        ],
        price: "PKR 250",
        description: "A beautiful gold-tone bracelet that symbolizes enduring love and life. Each piece features a delicate chain accented with a heart charm flowing into a smooth heartbeat line. Perfect for couples, best friends, simply for individuals or as a thoughtful appreciation gift for a medical professional. Available in 4 stylish variations."
    },
    
    "duo-serenity": {
        title: "Duo Serenity Stretch Bracelet Collection",
        images: [
            "imgaes/13duo sernity-str.jpeg",
            "imgaes/14duo sernity-str.jpeg"
        ],
        price: "PKR 250",
        description: "An effortlessly chic stretch bracelet featuring a harmonious rhythm of soft celestial beads. Finished with a delicate charm cluster, this comfortable piece symbolizes peace and perfect balance. Available in 2 beautiful variations."
    },
    
    "dewdrop-spritz": {
        title: "Dewdrop Spritz Bracelet",
        image: "imgaes/9dewdrop-spr.jpeg",
        price: "PKR 260",
        description: "A whisper-light gold chain adorned with delicate, multi-colored gemstone drops that sparkle like scattered dewdrops. This delicate piece adds a subtle, luminous touch to any ensemble, perfect for day-to-night elegance."
    },
    
    "eclipse-weave": {
        title: "Eclipse Weave Bracelet",
        image: "imgaes/eclipse-weave.jpeg",
        price: "PKR 250",
        description: "Bold, dramatic, and undeniably luxurious statement piece with jet-black faceted crystals and gold-tone beads. This piece makes a powerful statement while maintaining an elegant sophistication."
    },
    
    "marigold": {
        title: "Marigold Bracelet",
        image: "imgaes/marigold-bracelet.jpeg",
        price: "PKR 300",
        description: "A delicate, scalloped-style bracelet featuring creamy white pearls and vibrant orange crystal accents. The warm, sunny tones evoke the joy of a summer garden, while the elegant design ensures timeless appeal."
    },
    
    // Earrings - PRICES UPDATED
    "amore-heartlets": {
        title: "The Amore Heartlets Earrings Collection",
        images: [
            "imgaes/The amore heartlets1.jpeg",
            "imgaes/The amore heartlets2.jpeg",
            "imgaes/The amore heartlets3.jpeg",
            "imgaes/The amore heartlets4.jpeg"
        ],
        price: "PKR 200",
        description: "Simple, sweet, and radiating love. These charming drop earrings feature translucent, ruby-red heart charms with a subtle crystalline shimmer. Suspended from elegant gold-toned French hooks, they are designed to add a playful yet sophisticated pop of color to your look. Whether it's a gift for a loved one or a treat for yourself, these hearts are a wearable reminder of passion and joy. Available in 4 stunning color variations."
    },
    
    "lunar-dangle": {
        title: "Lunar Dangle Earrings",
        image: "imgaes/Lunar dangle6.jpeg",
        price: "PKR 320",
        description: "These exquisite drop earrings feature a spiraling staircase of lustrous white pearls that gracefully wind around a delicate gold-toned chain. Finished with a dainty pearl terminal, they offer a sophisticated vertical silhouette that catches the light with every turn. A timeless choice for brides, evening galas, or adding a touch of classic luxury to your daily ensemble."
    },
    
    "royal-periwinkle": {
        title: "Royal Periwinkle Earrings",
        image: "imgaes/Royal periwinkle8.jpeg",
        price: "PKR 300",
        description: "Add a touch of floral elegance to your look with these handcrafted woven earrings. Featuring a soft periwinkle blue beadwork base, shimmering gold accents, and a delicate pearl topper, these lightweight hoops are finished with gold-toned hooks for a timeless, romantic aesthetic."
    },
    
    "sorbet-halo": {
        title: "Sorbet Halo Earrings",
        image: "imgaes/Sorbet halo7.jpeg",
        price: "PKR 290",
        description: "A radiant cascade of pastel-hued beads in soft pink, lavender, and mint arranged in a mesmerizing gradient. These delicate drop earrings are finished with a luminous crystal teardrop and suspended from a dainty gold hook, offering a dreamy, ethereal sparkle that's perfect for spring and summer."
    },
    
    "alabaster-belle": {
        title: "The Alabaster Belle Earrings",
        image: "imgaes/The alabaster belle9.jpeg",
        price: "PKR 300",
        description: "Pure, playful, and perfectly poised. These whimsical drop earrings feature a matte white coquette bow that suspends two delicate lily-of-the-valley bell charms. Strung on slender silver-tone chains, they offer a graceful, dancing movement that captures a soft, cottagecore aesthetic."
    },
    
    "zephyr-leaf": {
        title: "The Zephyr Leaf Earrings",
        image: "imgaes/Zephyr leaf5.jpeg",
        price: "PKR 280",
        description: "Embrace the beauty of nature with these delicate golden leaf drops. Each earring features a finely detailed, filigree leaf charm suspended from a gold-toned chain, finished with a tiny, lustrous pearl terminal. These lightweight earrings offer a whimsical yet sophisticated aesthetic, making them the perfect accessory for a sun-drenched afternoon or an ethereal evening look."
    }
};

// Gallery Filter and Modal Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const viewButtons = document.querySelectorAll('.view-btn');
const orderButtons = document.querySelectorAll('.order-btn');
const modal = document.getElementById('productModal');
const closeModalBtn = document.getElementById('closeModal');
const closeModalBtn2 = document.querySelector('.close-modal-btn');
const modalTitle = document.getElementById('modalTitle');
const modalProductName = document.getElementById('modalProductName');
const modalDescription = document.getElementById('modalDescription');
const modalPrice = document.getElementById('modalPrice');
const modalImage = document.getElementById('modalImage');
const whatsappOrderBtn = document.getElementById('whatsappOrderBtn');

// Filter functionality
if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    // Add animation class
                    item.classList.add('filter-show');
                    // Trigger reflow for animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    item.classList.remove('filter-show');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Swiper instance
let productSwiper = null;

// Initialize Swiper
function initSwiper() {
    if (document.getElementById('productSwiper')) {
        productSwiper = new Swiper('#productSwiper', {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: false,
            speed: 400,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 1,
                    spaceBetween: 40,
                },
            }
        });
    }
}

// Modal functionality - FIXED VERSION
function openModal(productId) {
    const product = productData[productId];
    
    if (!product) {
        console.error(`Product with ID "${productId}" not found in productData`);
        showNotification('Product details not available at the moment.', 'error');
        return;
    }
    
    if (modal) {
        // Set modal content
        modalTitle.textContent = product.title;
        modalProductName.textContent = product.title;
        modalDescription.textContent = product.description;
        modalPrice.textContent = `Price: ${product.price}`;
        
        // Clear existing slides
        const swiperWrapper = document.getElementById('swiperWrapper');
        if (swiperWrapper) {
            swiperWrapper.innerHTML = '';
        }
        
        // Destroy existing Swiper instance
        if (productSwiper) {
            productSwiper.destroy();
            productSwiper = null;
        }
        
        // Check if product has multiple images
        const hasMultipleImages = product.images && product.images.length > 1;
        
        // Get or create slider container
        let sliderContainer = document.querySelector('.modal-img-slider');
        if (!sliderContainer) {
            sliderContainer = document.createElement('div');
            sliderContainer.className = 'modal-img-slider';
            sliderContainer.innerHTML = `
                <div class="swiper" id="productSwiper">
                    <div class="swiper-wrapper" id="swiperWrapper"></div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-pagination"></div>
                </div>
            `;
            
            // Insert before modal text
            const modalBody = document.querySelector('.modal-body');
            const modalImg = document.querySelector('.modal-img');
            if (modalImg) {
                modalBody.insertBefore(sliderContainer, modalImg.nextSibling);
            }
        }
        
        if (hasMultipleImages) {
            // Show slider and hide regular image
            sliderContainer.classList.add('active');
            if (modalImage) {
                modalImage.style.display = 'none';
            }
            
            // Create slides
            product.images.forEach((imageSrc, index) => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                
                const img = document.createElement('img');
                img.src = imageSrc;
                img.alt = `${product.title} - Variation ${index + 1}`;
                img.loading = 'lazy';
                
                img.onerror = function() {
                    this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="200" y="150" font-family="Arial" font-size="14" fill="%23666" text-anchor="middle">Product Image</text></svg>';
                };
                
                slide.appendChild(img);
                if (swiperWrapper) {
                    swiperWrapper.appendChild(slide);
                }
            });

            // Initialize Swiper
            setTimeout(() => {
                initSwiper();
            }, 100);
            
            // Add has-slider class to modal body
            document.querySelector('.modal-body').classList.add('has-slider');
        } else {
            // Use single image
            if (modalImage) {
                const imageSrc = product.image || (product.images && product.images[0]) || '';
                modalImage.src = imageSrc;
                modalImage.alt = product.title;
                modalImage.style.display = 'block';
                
                modalImage.onerror = function() {
                    this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="200" y="150" font-family="Arial" font-size="14" fill="%23666" text-anchor="middle">Product Image</text></svg>';
                };
            }
            
            // Hide slider if it exists
            sliderContainer.classList.remove('active');
            
            // Remove has-slider class
            document.querySelector('.modal-body').classList.remove('has-slider');
        }

        // Set WhatsApp link for ordering
        const whatsappMessage = `Hello Serenique Trezza!\n\nI want to order this product:\n\n*Product Name:* ${product.title}\n*Price:* ${product.price}\n*Description:* ${product.description}\n\nPlease confirm availability and provide payment details.`;

        if (whatsappOrderBtn) {
            const encodedMessage = encodeURIComponent(whatsappMessage);
            whatsappOrderBtn.href = `https://wa.me/923359997124?text=${encodedMessage}`;
            whatsappOrderBtn.onclick = function (e) {
                e.preventDefault();
                orderOnWhatsApp(product.title, product.price, product.description);
                closeModal();
                return false;
            };
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    }
}

// Event listeners for view buttons
if (viewButtons.length > 0) {
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = button.getAttribute('data-id');
            openModal(productId);
        });
    });

    // Also make entire gallery item clickable on mobile
    if (window.innerWidth <= 768) {
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('view-btn') && !e.target.classList.contains('order-btn') && !e.target.closest('.variation-badge')) {
                    const viewBtn = item.querySelector('.view-btn');
                    if (viewBtn) {
                        const productId = viewBtn.getAttribute('data-id');
                        openModal(productId);
                    }
                }
            });
        });
    }
}

// Event listeners for order buttons (direct WhatsApp order)
if (orderButtons.length > 0) {
    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = button.getAttribute('data-id');
            const product = productData[productId];

            if (product) {
                // Get image element from the gallery item
                const galleryItem = button.closest('.gallery-item');
                const imgElement = galleryItem.querySelector('img');
                const productName = product.title;
                const productPrice = product.price;
                const productDescription = product.description;

                // Call function WITHOUT image parameter
                orderOnWhatsApp(productName, productPrice, productDescription);
            }
        });
    });
}

// Event listeners for closing modal
function closeModal() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        
        // Destroy Swiper instance
        if (productSwiper) {
            productSwiper.destroy();
            productSwiper = null;
        }
        
        // Remove has-slider class
        const modalBody = document.querySelector('.modal-body');
        if (modalBody) {
            modalBody.classList.remove('has-slider');
        }
        
        // Show regular image again
        if (modalImage) {
            modalImage.style.display = 'block';
        }
    }
}

// Make sure all close buttons work
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

if (closeModalBtn2) {
    closeModalBtn2.addEventListener('click', closeModal);
}

// Close modal when clicking outside content
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - initializing all features...');

    // Remove all unnecessary filters from images
    removeAllFilters();

    // Fix broken images
    fixBrokenImages();

    // Initialize animations
    const animatedElements = document.querySelectorAll('.feature, .gallery-item, .collage-item, .contact-detail');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add subtle animation to cards on page load
    setTimeout(() => {
        document.querySelectorAll('.feature, .contact-detail').forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            }, index * 100);
        });
    }, 300);

    // Force image reload after a delay to ensure they load
    setTimeout(() => {
        removeAllFilters();
    }, 1000);
    
    // Load Swiper if not already loaded
    if (typeof Swiper === 'undefined') {
        const swiperScript = document.createElement('script');
        swiperScript.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
        swiperScript.onload = function() {
            console.log('Swiper loaded successfully');
        };
        document.head.appendChild(swiperScript);
    }
});

// Handle window resize
function handleResize() {
    // Adjust gallery item clickability for mobile
    if (window.innerWidth <= 768) {
        galleryItems.forEach(item => {
            item.style.cursor = 'pointer';
        });
    } else {
        galleryItems.forEach(item => {
            item.style.cursor = 'default';
        });
    }

    // Handle carousel pause on hover for desktop
    if (carouselSlides.length > 0) {
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            // Remove existing listeners
            carouselContainer.removeEventListener('mouseenter', stopCarousel);
            carouselContainer.removeEventListener('mouseleave', startCarousel);

            // Add new listeners based on screen size
            if (window.innerWidth > 768) {
                carouselContainer.addEventListener('mouseenter', stopCarousel);
                carouselContainer.addEventListener('mouseleave', startCarousel);
            }
        }
    }
}

// Fix for mobile viewport height
function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set viewport height on load and resize
window.addEventListener('load', setViewportHeight);
window.addEventListener('resize', () => {
    setViewportHeight();
    handleResize();
});

// Initialize on load
handleResize();

// Expose functions to global scope
window.openModal = openModal;
window.closeModal = closeModal;
window.orderOnWhatsApp = orderOnWhatsApp;

function openWhatsApp() {
    const whatsappNumber = '923359997124';
    const message = encodeURIComponent("Hello Serenique Trezza! I'm interested in your beaded accessories collection. Could you please provide more information?");
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
}