// A-TECH TRAINING Landing Page Scripts

document.addEventListener('DOMContentLoaded', () => {
    /* MOBILE NAV TOGGLE */
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            navLinks.classList.toggle('show');
        });
    }

    /* COMPONENT: Navigation Smooth Scrolling */
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* COMPONENT: Section Reveal / Animation */
    const revealSections = document.querySelectorAll('.section-reveal');
    const observerOptions = {
        threshold: 0.15
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

    /* COMPONENT: FAQ Accordion */
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');
            const icon = question.querySelector('.faq-icon');
            const isOpen = faqItem.classList.contains('open');

            faqQuestions.forEach(otherQuestion => {
                const otherItem = otherQuestion.closest('.faq-item');
                if (otherItem !== faqItem) {
                    otherItem.classList.remove('open');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherQuestion.querySelector('.faq-icon');
                    otherAnswer.style.maxHeight = '0';
                    otherIcon.textContent = '+';
                }
            });

            if (isOpen) {
                faqItem.classList.remove('open');
                answer.style.maxHeight = '0';
                icon.textContent = '+';
            } else {
                faqItem.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.textContent = '−';
            }
        });
    });

});