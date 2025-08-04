// script.js

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.pageYOffset > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 25px rgba(0,0,0,0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    }
});

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

// Form submission with enhanced validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(this);
    const projectData = {
        name: formData.get('name'),
        email: formData.get('email'),
        company: formData.get('company'),
        service: formData.get('service'),
        budget: formData.get('budget'),
        timeline: formData.get('timeline'),
        message: formData.get('message')
    };
    
    // Simulate form processing (replace with actual form submission)
    setTimeout(() => {
        // Reset button state
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
        
        // Show success message
        alert(`Thank you ${projectData.name}! Your project inquiry has been received. We'll review your requirements and get back to you within 24 hours to discuss your ${getServiceName(formData.get('service'))} project.`);
        
        // Reset form
        this.reset();
        
        // Log project data for development (remove in production)
        console.log('Project Inquiry Submitted:', projectData);
    }, 2000);
});

// Helper function to get readable service names
function getServiceName(serviceValue) {
    const serviceNames = {
        '3d-modeling': '3D Modeling & Animation',
        'vr-ar': 'VR/AR/MR Development',
        'game-dev': 'Game Development',
        'metaverse': 'Metaverse Solutions',
        'plugins': 'Plugin Development',
        'consultation': 'Consultation & Strategy'
    };
    return serviceNames[serviceValue] || 'selected';
}

// Service cards animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Animate client cards
document.querySelectorAll('.client-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.5s ease ${index * 0.15}s`;
    observer.observe(card);
});

// Stats counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const finalNumber = statNumber.textContent;
            const isPercentage = finalNumber.includes('%');
            const isPlus = finalNumber.includes('+');
            const isSlash = finalNumber.includes('/');
            
            let numericValue;
            if (isSlash) {
                // Handle "24/7" case
                numericValue = 24;
            } else {
                numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
            }
            
            let currentNumber = 0;
            const increment = numericValue / 50;
            
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= numericValue) {
                    statNumber.textContent = finalNumber;
                    clearInterval(timer);
                } else {
                    let displayNumber = Math.floor(currentNumber);
                    if (isSlash) {
                        displayNumber = displayNumber + '/7';
                    } else if (isPercentage) {
                        displayNumber += '%';
                    } else if (isPlus && currentNumber >= numericValue * 0.8) {
                        displayNumber += '+';
                    }
                    statNumber.textContent = displayNumber;
                }
            }, 50);
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Enhanced form validation
const inputs = document.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
    
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateField(this);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            field.style.borderColor = '#ff6b6b';
            return false;
        }
    }
    
    // Required field validation
    if (field.required && !value) {
        field.classList.add('error');
        field.style.borderColor = '#ff6b6b';
        return false;
    }
    
    // Reset styling for valid fields
    field.style.borderColor = 'rgba(255,255,255,0.2)';
    return true;
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero::before');
    if (heroBackground) {
        const speed = scrolled * 0.5;
        // Note: This effect is subtle and may not be visible in all browsers
    }
});

// Add loading states for better UX
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger any initial animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});

// Performance optimization: Lazy load images if any were added
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Smooth reveal animations for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Observe all major sections
document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Add click tracking for analytics (optional)
document.querySelectorAll('.cta-button, .service-card, .client-card').forEach(element => {
    element.addEventListener('click', function() {
        // Add your analytics tracking here
        console.log('Element clicked:', this.className);
    });
});

// Keyboard navigation improvements
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Prevent form submission on Enter in non-textarea fields (except submit button)
document.querySelectorAll('input:not([type="submit"])').forEach(input => {
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Move to next field or submit if it's the last field
            const fields = Array.from(document.querySelectorAll('input, select, textarea'));
            const currentIndex = fields.indexOf(this);
            if (currentIndex < fields.length - 1) {
                fields[currentIndex + 1].focus();
            } else {
                document.querySelector('.submit-btn').click();
            }
        }
    });
});

// Add visual feedback for form interactions
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
        if (!this.value.trim()) {
            this.parentElement.classList.remove('filled');
        } else {
            this.parentElement.classList.add('filled');
        }
    });
});

// Initialize tooltips or help text (if needed)
document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', function() {
        // Add tooltip functionality if needed
    });
});

console.log('AAA Digital Works website loaded successfully!');