// Theme Toggle with Animation
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Add transition class
    body.classList.add('theme-transition');
    
    // Change theme
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icons
    const sunIcon = document.querySelector('.light-icon');
    const moonIcon = document.querySelector('.dark-icon');
    
    if (newTheme === 'dark') {
        sunIcon.style.transform = 'translateY(-100%)';
        sunIcon.style.opacity = '0';
        moonIcon.style.transform = 'translateY(0)';
        moonIcon.style.opacity = '1';
    } else {
        sunIcon.style.transform = 'translateY(0)';
        sunIcon.style.opacity = '1';
        moonIcon.style.transform = 'translateY(100%)';
        moonIcon.style.opacity = '0';
    }
    
    // Remove transition class after animation
    setTimeout(() => {
        body.classList.remove('theme-transition');
    }, 300);
}

// Initialize theme from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    // Initialize icon states
    const sunIcon = document.querySelector('.light-icon');
    const moonIcon = document.querySelector('.dark-icon');
    
    if (savedTheme === 'dark') {
        sunIcon.style.transform = 'translateY(-100%)';
        sunIcon.style.opacity = '0';
        moonIcon.style.transform = 'translateY(0)';
        moonIcon.style.opacity = '1';
    }
    
    // Add fade-in animation to elements
    const elements = document.querySelectorAll('.feature-card, .hero, .about-section, .contact-section');
    elements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Update copyright year
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Initialize intersection observer for animations
    initIntersectionObserver();
    
    // Add active class to current section in nav
    initActiveNavigation();
});

// Form submission handler
function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', Object.fromEntries(formData));
    
    // Show success message
    alert('شكراً لتواصلك معنا! سنرد عليك قريباً.');
    form.reset();
}

// Smooth scroll implementation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    document.querySelectorAll('.feature-card, .about-section, .contact-section').forEach(element => {
        observer.observe(element);
    });
}

// Mobile menu toggle with animation
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    
    // Add slide animation
    if (navLinks.classList.contains('active')) {
        navLinks.style.animation = 'slideIn 0.3s ease forwards';
    } else {
        navLinks.style.animation = 'slideOut 0.3s ease forwards';
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

// Active navigation highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}
