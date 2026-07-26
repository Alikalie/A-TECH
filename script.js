// A-TECH TRAINING - Complete Interactive Script

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. MOBILE NAVIGATION TOGGLE
       ========================================================================== */
    const navToggle = document.getElementById('navToggle') || document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('navMenu') || document.querySelector('.nav-menu');
    const navLinksList = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!isExpanded));

            // Toggle visibility classes for container or list
            if (navMenu) navMenu.classList.toggle('active');
            if (navLinksList) navLinksList.classList.toggle('show');
        });
    }

    // Close mobile menu when clicking any nav link
    const allNavLinks = document.querySelectorAll('.nav-links a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
            if (navMenu) navMenu.classList.remove('active');
            if (navLinksList) navLinksList.classList.remove('show');
        });
    });

    /* ==========================================================================
       2. SMOOTH SCROLLING FOR ANCHOR LINKS
       ========================================================================== */
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Skip empty or generic hash links
            if (!targetId || targetId === '#') return;

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                e.preventDefault();
                // Calculate sticky navbar height offset
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================================================
       3. INTERSECTION OBSERVER (SECTION REVEAL)
       ========================================================================== */
    const revealSections = document.querySelectorAll('.section-reveal');

    if (revealSections.length > 0 && 'IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            threshold: 0.12,
            rootMargin: '0px'
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealSections.forEach(section => revealObserver.observe(section));
    } else {
        // Fallback for older browsers
        revealSections.forEach(section => section.classList.add('visible'));
    }

    /* ==========================================================================
       4. FAQ ACCORDION HANDLER
       ========================================================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            if (!faqItem) return;

            const answer = faqItem.querySelector('.faq-answer');
            const icon = question.querySelector('.faq-icon');
            const isOpen = faqItem.classList.contains('open') || faqItem.classList.contains('active');

            // Close all other open FAQ items (Accordion style)
            faqQuestions.forEach(otherQuestion => {
                const otherItem = otherQuestion.closest('.faq-item');
                if (otherItem && otherItem !== faqItem) {
                    otherItem.classList.remove('open', 'active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherQuestion.querySelector('.faq-icon');

                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                    if (otherIcon) otherIcon.textContent = '+';
                }
            });

            // Toggle current item
            if (isOpen) {
                faqItem.classList.remove('open', 'active');
                if (answer) answer.style.maxHeight = null;
                if (icon) icon.textContent = '+';
            } else {
                faqItem.classList.add('open', 'active');
                if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
                if (icon) icon.textContent = '−';
            }
        });
    });

    /* ==========================================================================
       5. SCROLL-TO-TOP BUTTON
       ========================================================================== */
    let scrollTopBtn = document.querySelector('.scroll-top');

    // Create scroll button dynamically if it doesn't exist in HTML
    if (!scrollTopBtn) {
        scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-top';
        scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
        scrollTopBtn.innerHTML = '↑';
        document.body.appendChild(scrollTopBtn);
    }

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});