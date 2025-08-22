// Policy Compass Landing Page JavaScript
// Interactive functionality and user experience enhancements

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initSmoothScrolling();
    initNavbarEffects();
    initAnimationObserver();
    
    console.log('Policy Compass Landing Page initialized successfully');
});

// Countdown Timer for Application Deadline
function initCountdown() {
    // Set target date to August 30th, 2024 (can be updated for actual deadline)
    const targetDate = new Date('August 30, 2024 23:59:59').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        // Calculate time components
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        // Update display
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        
        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        
        // Handle expired countdown
        if (distance < 0) {
            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            
            // Show expired message
            const countdownTimer = document.getElementById('countdown');
            if (countdownTimer) {
                countdownTimer.innerHTML = '<div class="countdown-expired">Registration Deadline Passed</div>';
            }
        }
    }
    
    // Update countdown immediately and then every minute
    updateCountdown();
    setInterval(updateCountdown, 60000);
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Registration Button Handlers
function initRegistrationHandlers() {
    // Handle registration clicks - placeholder for actual registration system
    window.handleRegistration = function(type) {
        const programType = type === 'group' ? 'Group Program' : 'Private 1-to-1 Sessions';
        const price = type === 'group' ? '€99' : '€500';
        
        // Show confirmation dialog
        const confirmed = confirm(
            `Ready to register for ${programType} (${price})?\n\n` +
            'You will be redirected to the registration form.\n\n' +
            'Click OK to continue or Cancel to return.'
        );
        
        if (confirmed) {
            // In a real application, this would redirect to a payment/registration page
            alert(
                `Registration for ${programType} initiated!\n\n` +
                'In a live version, you would be redirected to:\n' +
                '• Secure payment processing\n' +
                '• Registration form\n' +
                '• Account creation\n\n' +
                'For now, this is a demo placeholder.'
            );
            
            // Track registration attempt (analytics placeholder)
            trackEvent('registration_attempt', {
                program_type: type,
                price: price
            });
        }
    };
}

// Navbar Scroll Effects
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Add scrolled class styles via CSS if not already present
    if (!document.querySelector('#navbar-scroll-styles')) {
        const style = document.createElement('style');
        style.id = 'navbar-scroll-styles';
        style.textContent = `
            .navbar.scrolled {
                background-color: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border-bottom: 1px solid var(--border-color);
            }
        `;
        document.head.appendChild(style);
    }
}

// Animation Observer for Section Reveals
function initAnimationObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for grid items
                const gridItems = entry.target.querySelectorAll(
                    '.benefit-card, .module-card, .reason-item, .audience-card, .pricing-card'
                );
                
                gridItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add animation styles
    if (!document.querySelector('#animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            section {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            section.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .benefit-card, .module-card, .reason-item, .audience-card, .pricing-card {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.4s ease;
            }
            
            .benefit-card.animate-in, 
            .module-card.animate-in, 
            .reason-item.animate-in, 
            .audience-card.animate-in, 
            .pricing-card.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Prevent animation on reduced motion preference */
            @media (prefers-reduced-motion: reduce) {
                section,
                .benefit-card, .module-card, .reason-item, .audience-card, .pricing-card {
                    opacity: 1;
                    transform: none;
                    transition: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Immediately show first section (hero)
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.add('animate-in');
    }
}

// Analytics Tracking (Placeholder)
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
    
    // In a real application, this would send data to analytics services like:
    // - Google Analytics 4
    // - Facebook Pixel
    // - Custom analytics backend
    
    /* Example implementation:
    gtag('event', eventName, {
        ...eventData,
        event_category: 'policy_compass',
        event_label: window.location.pathname
    });
    */
}

// Newsletter/Contact Form Handler (if needed for future enhancements)
function handleNewsletterSignup(email) {
    if (!email || !isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    // Placeholder for newsletter signup
    console.log('Newsletter signup:', email);
    trackEvent('newsletter_signup', { email: email });
    
    alert('Thank you for your interest! You\'ll be notified about Policy Compass updates.');
    return true;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mobile Menu Toggle (for future mobile navigation enhancements)
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-open');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuButton.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('mobile-open');
                mobileMenuButton.classList.remove('active');
            }
        });
    }
}

// Utility function for handling external links
function handleExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        // Add external link indicator
        if (!link.querySelector('.external-icon')) {
            const icon = document.createElement('i');
            icon.className = 'fas fa-external-link-alt external-icon';
            icon.style.fontSize = '0.8em';
            icon.style.marginLeft = '0.5rem';
            link.appendChild(icon);
        }
        
        // Open external links in new tab
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
}

// Initialize external links handling when DOM is ready
document.addEventListener('DOMContentLoaded', handleExternalLinks);

// Performance optimization: Lazy load non-critical features
setTimeout(() => {
    initMobileMenu();
    handleExternalLinks();
}, 1000);