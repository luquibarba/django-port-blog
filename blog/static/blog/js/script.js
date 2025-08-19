document.addEventListener("DOMContentLoaded", function () {
    const navDots = document.querySelectorAll('.nav-dot');
    const contentSections = document.querySelectorAll('.content-section');
    const mainContentWrapper = document.querySelector('.main-content-wrapper');
    const footer = document.querySelector('footer');
    const logoLink = document.getElementById('logo-link');
    const codeTypewriters = document.querySelector('.code-typewriters');

    let currentSectionIndex = 0;
    let isTransitioning = false;
    let touchStartY = 0;
    let touchEndY = 0;

    function showSection(index) {
        if (isTransitioning || index === currentSectionIndex) return;
        isTransitioning = true;

        contentSections[currentSectionIndex].classList.remove('active');
        navDots[currentSectionIndex].classList.remove('active');
        
        setTimeout(() => {
            currentSectionIndex = index;
            contentSections[currentSectionIndex].classList.add('active');
            navDots[currentSectionIndex].classList.add('active');

            if (index === 0) {
                footer.classList.remove('small');
                if (codeTypewriters) codeTypewriters.classList.add('show-code-typewriters');
            } else {
                footer.classList.add('small');
                if (codeTypewriters) codeTypewriters.classList.remove('show-code-typewriters');
            }

            setTimeout(() => { isTransitioning = false; }, 800);
        }, 100);
    }

    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSection(index));
        dot.addEventListener('mouseenter', () => {
            if (!dot.classList.contains('active')) {
                dot.style.transform = 'scale(1.2)';
            }
        });
        dot.addEventListener('mouseleave', () => {
            if (!dot.classList.contains('active')) {
                dot.style.transform = 'scale(1)';
            }
        });
    });

    if (logoLink) {
        logoLink.addEventListener('click', (e) => { 
            e.preventDefault(); 
            showSection(0); 
        });
    }

    let lastScrollTime = 0;
    mainContentWrapper.addEventListener('wheel', (event) => {
        if (new Date().getTime() - lastScrollTime < 700) return;
        lastScrollTime = new Date().getTime();
        
        if (event.deltaY > 0 && currentSectionIndex < contentSections.length - 1) {
            showSection(currentSectionIndex + 1);
        } else if (event.deltaY < 0 && currentSectionIndex > 0) {
            showSection(currentSectionIndex - 1);
        }
        event.preventDefault();
    }, { passive: false });

    mainContentWrapper.addEventListener('touchstart', (event) => {
        touchStartY = event.touches[0].clientY;
    });

    mainContentWrapper.addEventListener('touchend', (event) => {
        touchEndY = event.changedTouches[0].clientY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentSectionIndex < contentSections.length - 1) {
                showSection(currentSectionIndex + 1);
            } else if (diff < 0 && currentSectionIndex > 0) {
                showSection(currentSectionIndex - 1);
            }
        }
    }

    if (typeof Typed !== 'undefined') {
        new Typed("#code-typed-text-1", { 
            strings: ["const name = 'Lucas Barba';"], 
            typeSpeed: 30, 
            backSpeed: 10, 
            backDelay: 5000, 
            startDelay: 1000, 
            loop: true 
        });
        new Typed("#code-typed-text-2", { 
            strings: ["let skills = ['Python', 'HTML', 'CSS', 'JS'];"], 
            typeSpeed: 30, 
            backSpeed: 10, 
            backDelay: 6000, 
            startDelay: 1500, 
            loop: true 
        });
        new Typed("#code-typed-text-3", { 
            strings: ["function welcome() { console.log('Bienvenido'); }"], 
            typeSpeed: 20, 
            backSpeed: 10, 
            backDelay: 7000, 
            startDelay: 2000, 
            loop: true 
        });
    }

    function setupCarousel(containerSelector, wrapperSelector, itemSelector, prevBtnSelector, nextBtnSelector, dotSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const wrapper = container.querySelector(wrapperSelector);
        const items = container.querySelectorAll(itemSelector);
        const prevBtn = container.querySelector(prevBtnSelector);
        const nextBtn = container.querySelector(nextBtnSelector);
        const dots = container.querySelectorAll(dotSelector);

        let currentIndex = 0;
        const totalItems = items.length;

        function updateCarousel() {
            const translateX = -currentIndex * 100;
            wrapper.style.transform = `translateX(${translateX}%)`;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        }

        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });

        let autoSlide = setInterval(nextSlide, 5000);
        container.addEventListener('mouseenter', () => clearInterval(autoSlide));
        container.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, 5000);
        });
    }

    setupCarousel('.about-carousel-container', '.about-wrapper', '.about-item', '#prevAbout', '#nextAbout', '.about-dot');
    setupCarousel('.project-carousel-container', '.project-wrapper', '.project-item', '.project-arrow-dot.left', '.project-arrow-dot.right', '.project-dot');

    function setupModal(triggerSelector, modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        const trigger = document.querySelector(triggerSelector);
        const closeBtn = modal.querySelector('.close-button');

        const openModal = (e) => {
            e.preventDefault();
            modal.classList.add('show');
            document.body.classList.add('modal-open');
            
            setTimeout(() => {
                modal.style.backdropFilter = 'blur(15px)';
            }, 100);
        };

        const closeModal = () => {
            modal.classList.remove('show');
            document.body.classList.remove('modal-open');
            modal.style.backdropFilter = 'blur(10px)';
        };

        if (trigger) trigger.addEventListener('click', openModal);
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }

    setupModal('.wrapper ul li.google a', 'contactModal');

    const categoryContainer = document.querySelector('.blog-categories');
    const blogCards = document.querySelectorAll('.blog-card');

    if (categoryContainer && blogCards.length > 0) {
        categoryContainer.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;
            if (!target.classList.contains('category-chip')) return;

            const currentActive = categoryContainer.querySelector('.active');
            if (currentActive) currentActive.classList.remove('active');
            target.classList.add('active');

            const filter = target.dataset.filter;
            filterBlogPosts(filter);
        });
    }

    function filterBlogPosts(filter) {
        blogCards.forEach((card, index) => {
            const cardCategories = card.dataset.categories || '';
            const shouldBeVisible = (filter === 'all' || cardCategories.includes(filter));

            if (shouldBeVisible) {
                setTimeout(() => {
                    card.classList.remove('hidden');
                    card.style.display = '';
                }, index * 100);
            } else {
                card.classList.add('hidden');
                setTimeout(() => {
                    if (card.classList.contains('hidden')) {
                        card.style.display = 'none';
                    }
                }, 400);
            }
        });
    }

    const postModal = document.getElementById('postModal');
    const blogGrid = document.querySelector('.blog-grid');

    if (postModal && blogGrid) {
        const postModalCloseBtn = postModal.querySelector('.close-button');

        blogGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.blog-card');
            if (!card) return;

            const title = card.querySelector('.blog-card-title').textContent;
            const metaContent = card.querySelector('.post-meta-content').innerHTML;
            const bodyContent = card.querySelector('.post-body-content').innerHTML;
            const commentsContent = card.querySelector('.post-comments-content').innerHTML;

            postModal.querySelector('#modal-post-title').textContent = title;
            postModal.querySelector('#modal-post-meta').innerHTML = metaContent;
            postModal.querySelector('#modal-post-body').innerHTML = bodyContent;
            postModal.querySelector('#modal-post-comments').innerHTML = commentsContent;

            postModal.classList.add('show');
            document.body.classList.add('modal-open');

            const toggleBtn = postModal.querySelector('#toggle-comments-btn');
            const commentsWrapper = postModal.querySelector('#comments-wrapper');
            
            if (toggleBtn && commentsWrapper) {
                commentsWrapper.classList.remove('visible');
                toggleBtn.innerHTML = '<i class="fas fa-comments"></i> Ver Comentarios';
                
                toggleBtn.onclick = () => {
                    commentsWrapper.classList.toggle('visible');
                    if (commentsWrapper.classList.contains('visible')) {
                        toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Ocultar Comentarios';
                    } else {
                        toggleBtn.innerHTML = '<i class="fas fa-comments"></i> Ver Comentarios';
                    }
                };
            }

            setTimeout(() => {
                postModal.style.backdropFilter = 'blur(15px)';
            }, 100);
        });

        const closePostModal = () => {
            postModal.classList.remove('show');
            document.body.classList.remove('modal-open');
            postModal.style.backdropFilter = 'blur(10px)';
        };

        if (postModalCloseBtn) postModalCloseBtn.addEventListener('click', closePostModal);
        postModal.addEventListener('click', (e) => {
            if (e.target === postModal) closePostModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && postModal.classList.contains('show')) {
                closePostModal();
            }
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-button');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Enviado ✓';
                submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    
                    const modal = document.getElementById('contactModal');
                    if (modal) {
                        modal.classList.remove('show');
                        document.body.classList.remove('modal-open');
                    }
                }, 2000);
            }, 1500);
        });
    }

    function addParallaxEffect() {
        const cards = document.querySelectorAll('.card, .blog-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.05)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    function addScrollAnimations() {
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

        const animatedElements = document.querySelectorAll('.blog-card, .card, .category-chip');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    function addCategoryChipEffects() {
        const chips = document.querySelectorAll('.category-chip');
        
        chips.forEach(chip => {
            chip.addEventListener('mouseenter', () => {
                chips.forEach(otherChip => {
                    if (otherChip !== chip && !otherChip.classList.contains('active')) {
                        otherChip.style.opacity = '0.5';
                        otherChip.style.transform = 'scale(0.95)';
                    }
                });
            });
            
            chip.addEventListener('mouseleave', () => {
                chips.forEach(otherChip => {
                    if (otherChip !== chip) {
                        otherChip.style.opacity = '';
                        otherChip.style.transform = '';
                    }
                });
            });
        });
    }

    function addBlogCardAnimations() {
        const blogCards = document.querySelectorAll('.blog-card');
        
        blogCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            
            const image = card.querySelector('.blog-card-image');
            const content = card.querySelector('.blog-card-content');
            
            if (image && content) {
                card.addEventListener('mouseenter', () => {
                    image.style.transform = 'scale(1.1)';
                    content.style.transform = 'translateY(-5px)';
                });
                
                card.addEventListener('mouseleave', () => {
                    image.style.transform = 'scale(1)';
                    content.style.transform = 'translateY(0)';
                });
            }
        });
    }

    function addLoadingAnimations() {
        const elements = document.querySelectorAll('.content-section, .nav-dot, .main-header');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setTimeout(() => {
        addParallaxEffect();
        addScrollAnimations();
        addCategoryChipEffects();
        addBlogCardAnimations();
        addLoadingAnimations();
    }, 500);

    showSection(0);
    
    window.addEventListener('resize', () => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            document.body.style.fontSize = '14px';
        } else {
            document.body.style.fontSize = '';
        }
    });
});