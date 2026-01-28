/* =============================================
   AYDLINLIK YARINLAR ANAOKULU - JAVASCRIPT
   ============================================= */

// EmailJS Configuration
(function() {
    emailjs.init("vEYZ3-5mFBQpKt_RF");
})();

// Current gallery image index
let currentImageIndex = 0;
let galleryImages = [];

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
// DOM Elements
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const loadMoreBtn = document.getElementById('load-more-btn');
const galleryModal = document.getElementById('gallery-modal');
const modalImg = document.getElementById('modal-img');
const modalClose = document.querySelector('.modal-close');
const modalPrev = document.querySelector('.modal-prev');
const modalNext = document.querySelector('.modal-next');
const appointmentForm = document.getElementById('appointment-form');
const guideTabs = document.querySelectorAll('.guide-tab');
const guidePanels = document.querySelectorAll('.guide-panel');

// Header scroll effect
window.addEventListener('scroll', () => {
    if (header && window.scrollY > 100) {
        header.classList.add('scrolled');
    } else if (header) {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
});

// Gallery filters
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// All gallery images (35 photos)
const allGalleryImages = [
    { src: 'assets/images/gallery/photo1.jpg', category: 'activities', alt: 'Aktivite' },
    { src: 'assets/images/gallery/photo2.jpg', category: 'events', alt: 'Etkinlik' },
    { src: 'assets/images/gallery/photo3.jpg', category: 'daily', alt: 'Günlük Yaşam' },
    { src: 'assets/images/gallery/photo4.jpg', category: 'activities', alt: 'Aktivite' },
    { src: 'assets/images/gallery/photo5.jpg', category: 'events', alt: 'Etkinlik' },
    { src: 'assets/images/gallery/photo6.jpg', category: 'daily', alt: 'Günlük Yaşam' },
    { src: 'assets/images/gallery/photo7.jpg', category: 'activities', alt: 'Aktivite' },
    { src: 'assets/images/gallery/photo8.jpg', category: 'events', alt: 'Etkinlik' },
    { src: 'assets/images/gallery/photo9.jpg', category: 'daily', alt: 'Günlük Yaşam' },
    { src: 'assets/images/gallery/photo10.jpg', category: 'activities', alt: 'Aktivite' },
    { src: 'assets/images/gallery/photo11.jpg', category: 'events', alt: 'Etkinlik' },
    { src: 'assets/images/gallery/photo12.jpg', category: 'daily', alt: 'Günlük Yaşam' },
    { src: 'assets/images/gallery/photo13.jpg', category: 'activities', alt: 'Aktivite' },
    { src: 'assets/images/gallery/photo14.jpg', category: 'events', alt: 'Etkinlik' },
    { src: 'assets/images/gallery/photo15.jpg', category: 'daily', alt: 'Günlük Yaşam' },
    { src: 'assets/images/gallery/photo16.jpg', category: 'activities', alt: 'Aktivite' },
    { src: 'assets/images/gallery/photo17.jpg', category: 'events', alt: 'Etkinlik' },
    { src: 'assets/images/gallery/photo18.jpg', category: 'daily', alt: 'Günlük Yaşam' },
    { src: 'assets/images/gallery/photo19.jpg', category: 'activities', alt: 'Aktivite' },
    { src: 'assets/images/gallery/photo20.jpg', category: 'events', alt: 'Etkinlik' },
    { src: 'assets/images/gallery/photo21.jpg', category: 'daily', alt: 'Günlük Yaşam' },
    { src: 'assets/images/gallery/photo22.jpg', category: 'activities', alt: 'Aktivite' },
    { src: 'assets/images/gallery/photo23.jpg', category: 'events', alt: 'Etkinlik' },
    { src: 'assets/images/gallery/photo24.jpg', category: 'daily', alt: 'Günlük Yaşam' },
    { src: 'assets/images/gallery/photo25.jpg', category: 'activities', alt: 'Aktivite' },
    { src: 'assets/images/gallery/photo26.jpg', category: 'events', alt: 'Etkinlik' },
    { src: 'assets/images/gallery/photo27.jpg', category: 'daily', alt: 'Günlük Yaşam' },
    { src: 'assets/images/gallery/photo28.jpg', category: 'activities', alt: 'Aktivite' },
    { src: 'assets/images/gallery/photo29.jpg', category: 'events', alt: 'Etkinlik' },
    { src: 'assets/images/gallery/photo30.jpg', category: 'daily', alt: 'Günlük Yaşam' },
    { src: 'assets/images/gallery/photo31.jpg', category: 'activities', alt: 'Aktivite' },
    { src: 'assets/images/gallery/photo32.jpg', category: 'events', alt: 'Etkinlik' },
    { src: 'assets/images/gallery/photo33.jpg', category: 'daily', alt: 'Günlük Yaşam' },
    { src: 'assets/images/gallery/photo34.jpg', category: 'activities', alt: 'Aktivite' },
    { src: 'assets/images/gallery/photo35.jpg', category: 'events', alt: 'Etkinlik' }
];

let currentDisplayedCount = 6;

// Load more gallery images
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        const galleryGrid = document.getElementById('gallery-grid');
        const nextCount = Math.min(currentDisplayedCount + 6, allGalleryImages.length);
        
        for (let i = currentDisplayedCount; i < nextCount; i++) {
            const img = allGalleryImages[i];
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.dataset.category = img.category;
            item.innerHTML = `
                <img src="${img.src}" alt="${img.alt}">
                <div class="gallery-overlay"><i class="fas fa-search-plus"></i></div>
            `;
            item.addEventListener('click', () => openGalleryModal(i));
            galleryGrid.appendChild(item);
        }
        
        currentDisplayedCount = nextCount;
        
        if (currentDisplayedCount >= allGalleryImages.length) {
            loadMoreBtn.style.display = 'none';
        }
        
        // Re-attach event listeners
        updateGalleryEventListeners();
    });
}

// Update gallery event listeners
function updateGalleryEventListeners() {
    const allItems = document.querySelectorAll('.gallery-item');
    allItems.forEach((item, index) => {
        item.onclick = () => openGalleryModal(index);
    });
}

// Initialize gallery event listeners
document.addEventListener('DOMContentLoaded', () => {
    const initialItems = document.querySelectorAll('.gallery-item');
    initialItems.forEach((item, index) => {
        item.addEventListener('click', () => openGalleryModal(index));
    });
});

// Open gallery modal
function openGalleryModal(index) {
    galleryImages = allGalleryImages.slice(0, currentDisplayedCount);
    currentImageIndex = index;
    modalImg.src = galleryImages[index].src;
    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close gallery modal
function closeGalleryModal() {
    galleryModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (modalClose) {
    modalClose.addEventListener('click', closeGalleryModal);
}

if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            closeGalleryModal();
        }
    });
}

// Navigate gallery
function navigateGallery(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    modalImg.src = galleryImages[currentImageIndex].src;
}

if (modalPrev) {
    modalPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateGallery(-1);
    });
}

if (modalNext) {
    modalNext.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateGallery(1);
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (galleryModal && galleryModal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeGalleryModal();
        } else if (e.key === 'ArrowLeft') {
            navigateGallery(-1);
        } else if (e.key === 'ArrowRight') {
            navigateGallery(1);
        }
    }
});

// Guide tabs
guideTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        guideTabs.forEach(t => t.classList.remove('active'));
        guidePanels.forEach(p => p.classList.remove('active'));
        
        tab.classList.add('active');
        const targetPanel = document.getElementById(`${tab.dataset.tab}-panel`);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    });
});

// Appointment form submission
if (appointmentForm) {
    appointmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = appointmentForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Gönderiliyor...';
        submitBtn.disabled = true;
        
        const formData = {
            parent_name: document.getElementById('parent-name').value,
            child_name: document.getElementById('child-name').value,
            child_age: document.getElementById('child-age').value,
            appointment_type: document.getElementById('appointment-type').value,
            appointment_date: document.getElementById('appointment-date').value,
            appointment_time: document.getElementById('appointment-time').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        try {
            await emailjs.send('service_xcfgdtq', 'template_6b3qhps', formData);
            
            showNotification('Randevunuz başarıyla oluşturuldu! En kısa sürede sizinle iletişime geçeceğiz.', 'success');
            appointmentForm.reset();
        } catch (error) {
            console.error('EmailJS Error:', error);
            showNotification('Bir hata oluştu. Lütfen tekrar deneyin veya bizi arayın.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#48c774' : '#ff6b6b'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 5px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 10px;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Set minimum date for appointment
const dateInput = document.getElementById('appointment-date');
if (dateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

console.log('Aydınlık Yarınlar Anaokulu - Website loaded successfully!');

}); // End of DOMContentLoaded

// Founder message toggle - global function
function toggleFounderMessage() {
    const fullMessage = document.getElementById('founder-full-message');
    const toggleBtn = document.getElementById('founder-toggle');
    
    if (fullMessage && toggleBtn) {
        fullMessage.classList.toggle('show');
        toggleBtn.classList.toggle('active');
        
        const btnText = toggleBtn.querySelector('span');
        if (fullMessage.classList.contains('show')) {
            btnText.textContent = 'Daha Az Göster';
        } else {
            btnText.textContent = 'Devamını Oku';
        }
    }
}
