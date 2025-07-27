/**
 * Professional Portfolio - Main JavaScript
 * This file contains all the main functionality for the portfolio website
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // DOM Elements
    const header = document.getElementById('header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('back-to-top');
    const skillBars = document.querySelectorAll('.skill-progress');
    const projectCards = document.querySelectorAll('.project-card');
    const filterBtns = document.querySelectorAll('.filter-btn');

    /**
     * Toggle mobile navigation menu
     */
    function toggleNavigation() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent scrolling when mobile menu is open
        document.body.classList.toggle('no-scroll');
    }

    /**
     * Close mobile navigation when a link is clicked
     */
    function closeNavOnClick() {
        if (navMenu.classList.contains('active')) {
            toggleNavigation();
        }
    }

    /**
     * Make header sticky with shadow on scroll
     */
    function handleHeaderOnScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    /**
     * Show/hide back to top button based on scroll position
     */
    function handleBackToTopVisibility() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }

    /**
     * Scroll to top of page
     */
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /**
     * Animate skill bars when they come into view
     */
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress') + '%';
            bar.style.width = progress;
        });
    }

    /**
     * Initialize skills animation with Intersection Observer
     */
    function initSkillsAnimation() {
        if ('IntersectionObserver' in window) {
            const skillsSection = document.querySelector('.skills-container');
            
            const skillsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkillBars();
                        skillsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            if (skillsSection) {
                skillsObserver.observe(skillsSection);
            }
        } else {
            // Fallback for browsers that don't support Intersection Observer
            window.addEventListener('scroll', function() {
                const skillsSection = document.querySelector('.skills-container');
                if (skillsSection) {
                    const sectionPosition = skillsSection.getBoundingClientRect();
                    if (sectionPosition.top < window.innerHeight && sectionPosition.bottom >= 0) {
                        animateSkillBars();
                        window.removeEventListener('scroll', this);
                    }
                }
            });
        }
    }

    /**
     * Filter projects by category
     */
    function filterProjects() {
        // Get the filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // Show/hide projects based on filter
        projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
            } else {
                const cardCategory = card.getAttribute('data-category');
                if (cardCategory === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }

    /**
     * Update active navigation link based on scroll position
     */
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    /**
     * Smooth scroll to section when clicking nav links
     */
    function initSmoothScroll() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const targetPosition = targetSection.offsetTop - 80;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    closeNavOnClick();
                }
            });
        });
    }

    /**
     * Initialize all event listeners
     */
    function initEventListeners() {
        // Navigation toggle
        navToggle.addEventListener('click', toggleNavigation);
        
        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', closeNavOnClick);
        });
        
        // Scroll events
        window.addEventListener('scroll', handleHeaderOnScroll);
        window.addEventListener('scroll', handleBackToTopVisibility);
        window.addEventListener('scroll', updateActiveNavLink);
        
        // Back to top button
        backToTopBtn.addEventListener('click', scrollToTop);
        
        // Project filters
        filterBtns.forEach(btn => {
            btn.addEventListener('click', filterProjects);
        });
    }

    /**
     * Initialize all animations and interactions
     */
    function init() {
        initEventListeners();
        initSkillsAnimation();
        initSmoothScroll();
        
        // Trigger scroll handlers on initial load
        handleHeaderOnScroll();
        handleBackToTopVisibility();
        updateActiveNavLink();
    }

    // Initialize everything
    init();
});
