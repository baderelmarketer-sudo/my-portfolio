// =============================================================================
// MARKETING PRO WEBSITE - COMPLETE JAVASCRIPT
// =============================================================================

// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// =============================================================================
// NAVIGATION
// =============================================================================

// Sticky Navigation on Scroll
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/Show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// =============================================================================
// BACK TO TOP BUTTON
// =============================================================================

const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =============================================================================
// RIPPLE EFFECT FOR BUTTONS
// =============================================================================

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to all buttons with class 'ripple-effect'
document.querySelectorAll('.ripple-effect').forEach(button => {
    button.addEventListener('click', createRipple);
});

// =============================================================================
// BLOG PAGE - SEARCH AND FILTER FUNCTIONALITY
// =============================================================================

const blogSearch = document.getElementById('blogSearch');
const filterButtons = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-post-card');

// Filter by category
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                    // Re-trigger AOS animation
                    card.classList.add('aos-animate');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Search functionality
if (blogSearch) {
    blogSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        blogCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const category = card.querySelector('.post-category').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // If search is empty, respect the current filter
        if (searchTerm === '') {
            const activeFilter = document.querySelector('.filter-btn.active');
            if (activeFilter) {
                activeFilter.click();
            }
        }
    });
}

// =============================================================================
// PAGINATION
// =============================================================================

const paginationButtons = document.querySelectorAll('.page-btn');

if (paginationButtons.length > 0) {
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled && !this.querySelector('i')) {
                // Remove active class from all buttons
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Scroll to top of blog section
                const blogSection = document.querySelector('.blog-section');
                if (blogSection) {
                    blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// =============================================================================
// NEWSLETTER FORM
// =============================================================================

const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        // Validation
        if (!emailInput.value || !emailInput.validity.valid) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        submitButton.disabled = true;
        
        // Simulate API call (replace with actual API endpoint)
        setTimeout(() => {
            showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
            emailInput.value = '';
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// =============================================================================
// SCHEDULE PAGE - FORM HANDLING
// =============================================================================

const meetingForm = document.getElementById('meetingForm');

if (meetingForm) {
    // Add floating label effect
    const formGroups = meetingForm.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        
        if (input) {
            // Check on load if input has value
            if (input.value) {
                group.classList.add('has-value');
            }
            
            // Add event listeners
            input.addEventListener('focus', function() {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                group.classList.remove('focused');
                if (this.value) {
                    group.classList.add('has-value');
                } else {
                    group.classList.remove('has-value');
                }
            });
            
            input.addEventListener('input', function() {
                if (this.value) {
                    group.classList.add('has-value');
                } else {
                    group.classList.remove('has-value');
                }
            });
        }
    });
    
    // Form submission
    meetingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            website: document.getElementById('website').value,
            services: Array.from(document.getElementById('services').selectedOptions).map(opt => opt.value),
            budget: document.getElementById('budget').value,
            timeframe: document.getElementById('timeframe').value,
            message: document.getElementById('message').value,
            newsletter: document.getElementById('newsletter').checked
        };
        
        // Validate required fields
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.timeframe || !formData.message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate API call (replace with actual API endpoint)
        setTimeout(() => {
            showNotification('Meeting request sent successfully! I\'ll get back to you within 24 hours.', 'success');
            this.reset();
            
            // Reset form group states
            formGroups.forEach(group => {
                group.classList.remove('has-value', 'focused');
            });
            
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Switch between Calendly and Contact Form
const switchFormLinks = document.querySelectorAll('.switch-form');
const switchCalendlyLinks = document.querySelectorAll('.switch-calendly');
const calendlyOption = document.getElementById('calendlyOption');
const contactFormOption = document.getElementById('contactFormOption');

switchFormLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        if (calendlyOption && contactFormOption) {
            calendlyOption.classList.remove('active');
            contactFormOption.classList.add('active');
            contactFormOption.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

switchCalendlyLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        if (calendlyOption && contactFormOption) {
            contactFormOption.classList.remove('active');
            calendlyOption.classList.add('active');
            calendlyOption.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// =============================================================================
// FAQ ACCORDION
// =============================================================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// =============================================================================
// BLOG POST - SHARE FUNCTIONALITY
// =============================================================================

const shareButtons = document.querySelectorAll('.share-button, .share-btn');

shareButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const url = window.location.href;
        const title = document.title;
        
        if (this.classList.contains('linkedin')) {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        } else if (this.classList.contains('twitter')) {
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        } else if (this.classList.contains('facebook')) {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        } else if (this.classList.contains('email')) {
            window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
        } else {
            // Generic share button
            if (navigator.share) {
                navigator.share({
                    title: title,
                    url: url
                }).catch(err => console.log('Error sharing:', err));
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(url).then(() => {
                    showNotification('Link copied to clipboard!', 'success');
                });
            }
        }
    });
});

// =============================================================================
// NOTIFICATION SYSTEM
// =============================================================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set icon based on type
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.classList.contains('show')) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// =============================================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =============================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just '#' or if it's a data attribute action
        if (href === '#' || this.hasAttribute('data-filter')) {
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =============================================================================
// LAZY LOADING IMAGES
// =============================================================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// =============================================================================
// ANIMATED COUNTERS (FOR STATISTICS)
// =============================================================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Trigger counter animation when elements come into view
if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('[data-count]').forEach(counter => {
        counterObserver.observe(counter);
    });
}

// =============================================================================
// TYPING EFFECT (IF NEEDED FOR HERO SECTION)
// =============================================================================

function typeWriter(element, texts, speed = 100, deleteSpeed = 50, pauseTime = 2000) {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? deleteSpeed : speed;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Initialize typing effect if element exists
const typingElement = document.querySelector('[data-typing]');
if (typingElement) {
    const texts = JSON.parse(typingElement.getAttribute('data-typing'));
    typeWriter(typingElement, texts);
}

// =============================================================================
// PROGRESS BAR (FOR BLOG POST READING PROGRESS)
// =============================================================================

if (document.querySelector('.blog-post-page')) {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / documentHeight) * 100;
        
        progressBar.style.width = progress + '%';
    });
}

// =============================================================================
// FORM VALIDATION HELPERS
// =============================================================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\(\)\+]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function validateURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// =============================================================================
// PERFORMANCE OPTIMIZATION
// =============================================================================

// Debounce function for scroll and resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// =============================================================================
// FOOTER LINKS FUNCTIONALITY
// =============================================================================

document.querySelectorAll('.footer-section a[data-filter]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const filterValue = this.getAttribute('data-filter');
        
        // Navigate to blog page with filter
        if (window.location.pathname.includes('blog.html')) {
            // Already on blog page, just filter
            const filterBtn = document.querySelector(`.filter-btn[data-filter="${filterValue}"]`);
            if (filterBtn) {
                filterBtn.click();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            // Navigate to blog page
            window.location.href = `blog.html#${filterValue}`;
        }
    });
});

// Check for filter hash on blog page load
if (window.location.pathname.includes('blog.html') && window.location.hash) {
    const filterValue = window.location.hash.substring(1);
    const filterBtn = document.querySelector(`.filter-btn[data-filter="${filterValue}"]`);
    if (filterBtn) {
        setTimeout(() => {
            filterBtn.click();
        }, 500);
    }
}

// =============================================================================
// CONSOLE EASTER EGG (OPTIONAL)
// =============================================================================

console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold; color: #4F46E5;');
console.log('%cLooking for something? Let\'s chat!', 'font-size: 14px; color: #6B7280;');
console.log('%cSchedule a meeting: ' + window.location.origin + '/schedule.html', 'font-size: 12px; color: #10B981;');

// =============================================================================
// INITIALIZATION
// =============================================================================

console.log('✅ Marketing Pro Website Scripts Loaded');
