// Premium Policy Compass JavaScript
// Enhanced interactivity and user experience

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }
    
    // Initialize all interactive features
    initPremiumNavbar();
    initSmoothScrolling();
    initTimelineInteraction();
    // Language toggle removed - no longer needed
    initScrollAnimations();
    initMobileMenu();
    
    console.log('Premium Policy Compass initialized successfully');
});

// Premium Navbar Effects
function initPremiumNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar based on scroll direction (optional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Enhanced Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', throttle(updateActiveNavLinkOnScroll, 100));
}

// Timeline Interaction System
let currentWeek = 1;

function initTimelineInteraction() {
    // Initialize timeline navigation
    updateTimelineDisplay();
    
    // Add click handlers to weeks
    const weeks = document.querySelectorAll('.timeline-week');
    weeks.forEach((week, index) => {
        week.addEventListener('click', () => {
            setActiveWeek(index + 1);
        });
    });
    
    // Add click handlers to indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            setActiveWeek(index + 1);
        });
    });
}

function setActiveWeek(weekNumber) {
    currentWeek = weekNumber;
    updateTimelineDisplay();
    
    // Animate transition
    const activeWeek = document.querySelector(`.timeline-week[data-week="${weekNumber}"]`);
    if (activeWeek) {
        activeWeek.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

function updateTimelineDisplay() {
    // Update active week
    const weeks = document.querySelectorAll('.timeline-week');
    const indicators = document.querySelectorAll('.indicator');
    
    weeks.forEach((week, index) => {
        if (index + 1 === currentWeek) {
            week.classList.add('active');
        } else {
            week.classList.remove('active');
        }
    });
    
    indicators.forEach((indicator, index) => {
        if (index + 1 === currentWeek) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function nextWeek() {
    if (currentWeek < 4) {
        setActiveWeek(currentWeek + 1);
    }
}

function previousWeek() {
    if (currentWeek > 1) {
        setActiveWeek(currentWeek - 1);
    }
}

// Language toggle system removed - content now includes both languages natively

// Scroll Animations and Interactions
function initScrollAnimations() {
    // Parallax effect for hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
    
    // Animate statistics on scroll
    const stats = document.querySelectorAll('.stat .number, .metric-number, .achievement-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
            }
        });
    }, { threshold: 0.7 });
    
    stats.forEach(stat => observer.observe(stat));
    
    // Progress bar for reading
    createReadingProgress();
}

function animateNumber(element) {
    const finalNumber = element.textContent;
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;
    
    // Extract number from text (handle + symbols)
    const numMatch = finalNumber.match(/\d+/);
    if (!numMatch) return;
    
    const targetNumber = parseInt(numMatch[0]);
    const prefix = finalNumber.substring(0, numMatch.index);
    const suffix = finalNumber.substring(numMatch.index + numMatch[0].length);
    
    const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const currentNumber = Math.round(targetNumber * easeOutQuart(progress));
        
        element.textContent = prefix + currentNumber + suffix;
        
        if (currentStep >= steps) {
            clearInterval(interval);
            element.textContent = finalNumber;
        }
    }, stepTime);
}

function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

function createReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
    
    // Add CSS for progress bar
    const style = document.createElement('style');
    style.textContent = `
        .reading-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(124, 58, 237, 0.1);
            z-index: 9999;
        }
        .reading-progress-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--primary-purple), var(--secondary-purple));
            width: 0%;
            transition: width 0.1s ease;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(progressBar);
    
    const fill = progressBar.querySelector('.reading-progress-fill');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxScroll) * 100;
        
        fill.style.width = Math.min(progress, 100) + '%';
    });
}

// Mobile Menu System
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
            document.body.classList.toggle('mobile-menu-open');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('mobile-open');
                document.body.classList.remove('mobile-menu-open');
            }
        });
        
        // Close mobile menu when clicking on nav links
        const mobileNavLinks = navLinks.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('mobile-open');
                document.body.classList.remove('mobile-menu-open');
            });
        });
    }
}

// Active Navigation Link Management
function updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === activeId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function updateActiveNavLinkOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = document.getElementById('navbar').offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        if (sectionTop <= navbarHeight + 100 && sectionTop + sectionHeight > navbarHeight + 100) {
            current = '#' + section.getAttribute('id');
        }
    });
    
    if (current) {
        updateActiveNavLink(current);
    }
}

// Pricing Card Interactions
function initPricingInteractions() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Form Enhancement (for future forms)
function enhanceRegistrationExperience() {
    // Track registration button clicks
    const registrationButtons = document.querySelectorAll('a[href*="forms.gle"]');
    
    registrationButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            const isPremium = buttonText.toLowerCase().includes('private') || buttonText.toLowerCase().includes('mentorship');
            
            // Track the click
            trackEvent('registration_click', {
                button_text: buttonText,
                is_premium: isPremium,
                section: findParentSection(this)
            });
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

function findParentSection(element) {
    let parent = element.closest('section');
    return parent ? parent.className.split(' ')[0] : 'unknown';
}

// Analytics and Tracking
function trackEvent(eventName, eventData = {}) {
    // Enhanced analytics tracking
    const eventDetails = {
        ...eventData,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        language: 'bilingual'
    };
    
    console.log('Event tracked:', eventName, eventDetails);
    
    // Integration points for analytics services
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            ...eventDetails,
            event_category: 'policy_compass_premium'
        });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventDetails);
    }
    
    // Custom analytics endpoint (when available)
    // fetch('/api/analytics', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ event: eventName, data: eventDetails })
    // });
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Performance Monitoring
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        trackEvent('page_load_complete', {
            load_time: loadTime,
            dom_ready_time: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart
        });
    });
    
    // Monitor scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', throttle(function() {
        const scrollDepth = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
        if (scrollDepth > maxScrollDepth) {
            maxScrollDepth = scrollDepth;
            if (scrollDepth % 25 === 0) {
                trackEvent('scroll_depth', { depth: scrollDepth });
            }
        }
    }, 1000));
}

// Error Handling
window.addEventListener('error', function(e) {
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        line: e.lineno,
        column: e.colno
    });
});

// Initialize additional features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initPricingInteractions();
        enhanceRegistrationExperience();
        initPerformanceMonitoring();
    }, 1000);
});

// Expose global functions
window.nextWeek = nextWeek;
window.previousWeek = previousWeek;
// toggleLanguage function removed
window.trackEvent = trackEvent;