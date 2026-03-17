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
        const isExpanded = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
        const icon = navToggle.querySelector('i');
        if (isExpanded) {
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
        navToggle.setAttribute('aria-expanded', 'false');
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
        filterBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        
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
    { src: 'assets/images/gallery/photo1.webp', category: 'activities', alt: 'Şanlıurfa anaokulu müzik ve ritim aktivitesi' },
    { src: 'assets/images/gallery/photo2.webp', category: 'events', alt: 'Karaköprü anaokulu yıl sonu etkinliği' },
    { src: 'assets/images/gallery/photo3.webp', category: 'daily', alt: 'Anaokulu öğrencileri bahçede serbest oyun' },
    { src: 'assets/images/gallery/photo4.webp', category: 'activities', alt: 'Çocuklar resim ve boyama atölyesinde' },
    { src: 'assets/images/gallery/photo5.webp', category: 'events', alt: 'Aydınlık Yarınlar drama ve tiyatro gösterisi' },
    { src: 'assets/images/gallery/photo6.webp', category: 'daily', alt: 'Anaokulu öğle yemeği ve beslenme saati' },
    { src: 'assets/images/gallery/photo7.webp', category: 'activities', alt: 'Şanlıurfa anaokulunda STEM etkinliği' },
    { src: 'assets/images/gallery/photo8.webp', category: 'events', alt: 'Karaköprü anaokulu İngilizce sınıf çalışması' },
    { src: 'assets/images/gallery/photo9.webp', category: 'daily', alt: 'Çocuklar oyun alanında tırmanma parkurunda' },
    { src: 'assets/images/gallery/photo10.webp', category: 'activities', alt: 'Anaokulu el becerisi ve kesme yapıştırma çalışması' },
    { src: 'assets/images/gallery/photo11.webp', category: 'events', alt: 'Aydınlık Yarınlar 23 Nisan kutlama etkinliği' },
    { src: 'assets/images/gallery/photo12.webp', category: 'daily', alt: 'Şanlıurfa anaokulunda çocuklar oyun oynuyor' },
    { src: 'assets/images/gallery/photo13.webp', category: 'activities', alt: 'Karaköprü anaokulu hikaye dinleme saati' },
    { src: 'assets/images/gallery/photo14.webp', category: 'events', alt: 'Anaokulu mezuniyet töreni ve kep giyme' },
    { src: 'assets/images/gallery/photo15.webp', category: 'daily', alt: 'Aydınlık Yarınlar sanat ve aktivite çalışması' },
    { src: 'assets/images/gallery/photo16.webp', category: 'activities', alt: 'Çocuklar haloterapi tuz odasında terapi seansı' },
    { src: 'assets/images/gallery/photo17.webp', category: 'events', alt: 'Şanlıurfa anaokulu veli katılımlı etkinlik' },
    { src: 'assets/images/gallery/photo18.webp', category: 'daily', alt: 'Anaokulu sınıfında sabah sporu ve jimnastik' },
    { src: 'assets/images/gallery/photo19.webp', category: 'activities', alt: 'Karaköprü anaokulu bilim deneyi etkinliği' },
    { src: 'assets/images/gallery/photo20.webp', category: 'events', alt: 'Aydınlık Yarınlar doğum günü kutlaması' },
    { src: 'assets/images/gallery/photo21.webp', category: 'daily', alt: 'Çocuklar sınıfta blok ve yapı oyunları oynuyor' },
    { src: 'assets/images/gallery/photo22.webp', category: 'activities', alt: 'Şanlıurfa anaokulu müzik aleti çalma dersi' },
    { src: 'assets/images/gallery/photo23.webp', category: 'events', alt: 'Anaokulu bahar şenliği ve piknik etkinliği' },
    { src: 'assets/images/gallery/photo24.webp', category: 'daily', alt: 'Karaköprü anaokulu bahçede doğa keşfi' },
    { src: 'assets/images/gallery/photo25.webp', category: 'activities', alt: 'Aydınlık Yarınlar okuma yazmaya hazırlık çalışması' },
    { src: 'assets/images/gallery/photo26.webp', category: 'events', alt: 'Anaokulu yeni yıl kutlaması ve kostüm etkinliği' },
    { src: 'assets/images/gallery/photo27.webp', category: 'daily', alt: 'Şanlıurfa anaokulu serbest oyun ve sosyal etkileşim' },
    { src: 'assets/images/gallery/photo28.webp', category: 'activities', alt: 'Çocuklar hamur oyunu ve şekil yapma çalışması' },
    { src: 'assets/images/gallery/photo29.webp', category: 'events', alt: 'Karaköprü anaokulu Cumhuriyet Bayramı kutlaması' },
    { src: 'assets/images/gallery/photo30.webp', category: 'daily', alt: 'Anaokulu öğrencileri kahvaltı ve beslenme zamanı' },
    { src: 'assets/images/gallery/photo31.webp', category: 'activities', alt: 'Aydınlık Yarınlar parmak boyası ve sanat etkinliği' },
    { src: 'assets/images/gallery/photo32.webp', category: 'events', alt: 'Şanlıurfa anaokulu anneler günü etkinliği' },
    { src: 'assets/images/gallery/photo33.webp', category: 'daily', alt: 'Çocuklar sınıfta puzzle ve zeka oyunları oynuyor' },
    { src: 'assets/images/gallery/photo34.webp', category: 'activities', alt: 'Karaköprü anaokulu dans ve hareket etkinliği' },
    { src: 'assets/images/gallery/photo35.webp', category: 'events', alt: 'Aydınlık Yarınlar yılbaşı programı ve gösteri' },
    { src: 'assets/images/gallery/photo36.webp', category: 'daily', alt: 'Anaokulu öğrencileri sınıf içi grup etkinliği' },
    { src: 'assets/images/gallery/photo37.webp', category: 'activities', alt: 'Şanlıurfa anaokulu yaratıcı drama çalışması' },
    { src: 'assets/images/gallery/photo38.webp', category: 'events', alt: 'Karaköprü anaokulu veli bilgilendirme etkinliği' },
    { src: 'assets/images/gallery/photo39.webp', category: 'daily', alt: 'Aydınlık Yarınlar anaokulu bahçe oyun etkinliği' },
    { src: 'assets/images/gallery/photo40.webp', category: 'activities', alt: 'Çocuklar sınıfta deney ve keşif çalışması yapıyor' },
    { src: 'assets/images/gallery/photo41.webp', category: 'events', alt: 'Şanlıurfa anaokulu müzikli dans gösterisi' },
    { src: 'assets/images/gallery/photo42.webp', category: 'daily', alt: 'Karaköprü anaokulu sabah çemberi etkinliği' },
    { src: 'assets/images/gallery/photo43.webp', category: 'activities', alt: 'Anaokulu öğrencileri İngilizce oyun aktivitesi' },
    { src: 'assets/images/gallery/photo44.webp', category: 'events', alt: 'Aydınlık Yarınlar öğretmenler günü kutlaması' },
    { src: 'assets/images/gallery/photo45.webp', category: 'daily', alt: 'Çocuklar açık havada doğa gözlemi yapıyor' },
    { src: 'assets/images/gallery/photo46.webp', category: 'activities', alt: 'Şanlıurfa anaokulu matematik ve sayı oyunları' },
    { src: 'assets/images/gallery/photo47.webp', category: 'events', alt: 'Karaköprü anaokulu spor günü etkinliği' },
    { src: 'assets/images/gallery/photo48.webp', category: 'daily', alt: 'Anaokulu sınıfında kitap okuma ve hikaye saati' },
    { src: 'assets/images/gallery/photo49.webp', category: 'activities', alt: 'Aydınlık Yarınlar el işi ve kolaj çalışması' },
    { src: 'assets/images/gallery/photo50.webp', category: 'events', alt: 'Şanlıurfa anaokulu sezon sonu piknik etkinliği' },
    { src: 'assets/images/gallery/photo51.webp', category: 'daily', alt: 'Çocuklar sınıfta müzik aleti tanıma etkinliği' },
    { src: 'assets/images/gallery/photo52.webp', category: 'activities', alt: 'Karaköprü anaokulu su oyunları ve deney' },
    { src: 'assets/images/gallery/photo53.webp', category: 'events', alt: 'Aydınlık Yarınlar anaokulu bayrak töreni' }
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
                <img src="${img.src}" alt="${img.alt}" loading="lazy">
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
    modalImg.alt = galleryImages[index].alt || 'Galeri görseli';
    galleryModal.classList.add('active');
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

// Close gallery modal
function closeGalleryModal() {
    galleryModal.classList.remove('active');
    galleryModal.setAttribute('aria-hidden', 'true');
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
    modalImg.alt = galleryImages[currentImageIndex].alt || 'Galeri görseli';
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

// FAQ Toggle Functionality
const faqItems = document.querySelectorAll('.faq-item');
if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.setAttribute('role', 'button');
            question.setAttribute('tabindex', '0');
            question.setAttribute('aria-expanded', 'false');
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherQ = otherItem.querySelector('.faq-question');
                        if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
                    }
                });
                // Toggle current item
                item.classList.toggle('active');
                const isOpen = item.classList.contains('active');
                question.setAttribute('aria-expanded', isOpen);
            });
            // Keyboard support for FAQ
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        }
    });
}

// Workshop Tabs
const workshopTabs = document.querySelectorAll('.workshop-tab');
const workshopTabContents = document.querySelectorAll('.workshop-tab-content');

workshopTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Update tabs
        workshopTabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // Update content
        const targetId = 'workshop-' + tab.dataset.tab;
        workshopTabContents.forEach(content => {
            content.classList.remove('active');
        });
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        // Pause all videos when switching tabs
        document.querySelectorAll('.workshop-video-wrapper video').forEach(v => {
            v.pause();
        });
    });
});

// Workshop Photo Lightbox (reuse gallery modal)
const workshopPhotoItems = document.querySelectorAll('.workshop-photo-item');
const workshopPhotos = [];
workshopPhotoItems.forEach(item => {
    const img = item.querySelector('img');
    if (img) {
        workshopPhotos.push({ src: img.src, alt: img.alt });
    }
});

workshopPhotoItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Use gallery modal for workshop photos
        galleryImages = workshopPhotos;
        currentImageIndex = index;
        modalImg.src = workshopPhotos[index].src;
        modalImg.alt = workshopPhotos[index].alt || 'Workshop görseli';
        galleryModal.classList.add('active');
        galleryModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });
});

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
