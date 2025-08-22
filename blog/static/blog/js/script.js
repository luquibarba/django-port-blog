document.addEventListener("DOMContentLoaded", function () {
    // --- Lógica de navegación principal (entre secciones) ---
    document.body.classList.add('loaded');

    const navDots = document.querySelectorAll('.nav-dot');
    const contentSections = document.querySelectorAll('.content-section');
    const mainContentWrapper = document.querySelector('.main-content-wrapper');
    const footer = document.querySelector('footer');
    const codeTypewriters = document.querySelector('.code-typewriters');

    let currentSectionIndex = 0;
    let isTransitioning = false;

    function showSection(index) {
        if (isTransitioning || index === currentSectionIndex) {
            return;
        }

        isTransitioning = true;

        contentSections[currentSectionIndex].classList.remove('active');
        navDots[currentSectionIndex].classList.remove('active');

        if (index === 0) {
            footer.classList.remove('small');
            if (codeTypewriters) {
                codeTypewriters.classList.add('show-code-typewriters');
            }
        } else {
            footer.classList.add('small');
            if (codeTypewriters) {
                codeTypewriters.classList.remove('show-code-typewriters');
            }
        }

        currentSectionIndex = index;

        contentSections[currentSectionIndex].classList.add('active');
        navDots[currentSectionIndex].classList.add('active');

        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }

    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSection(index);
        });
    });

    let lastScrollTime = 0;
    const scrollThreshold = 700;

    mainContentWrapper.addEventListener('wheel', (event) => {
        const currentTime = new Date().getTime();

        if (currentTime - lastScrollTime < scrollThreshold) {
            return;
        }

        lastScrollTime = currentTime;

        if (event.deltaY > 0) {
            if (currentSectionIndex < contentSections.length - 1) {
                showSection(currentSectionIndex + 1);
            }
        } else {
            if (currentSectionIndex > 0) {
                showSection(currentSectionIndex - 1);
            }
        }

        event.preventDefault();
    }, { passive: false });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown' || event.key === 'PageDown') {
            if (currentSectionIndex < contentSections.length - 1) {
                showSection(currentSectionIndex + 1);
                event.preventDefault();
            }
        } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
            if (currentSectionIndex > 0) {
                showSection(currentSectionIndex - 1);
                event.preventDefault();
            }
        }
    });

    showSection(0);

    // --- Lógica para el carrusel de "Sobre mi" (section2) ---
    const aboutWrapper = document.querySelector('.about-wrapper');
    const aboutItems = document.querySelectorAll('.about-item');
    const prevAboutBtn = document.getElementById('prevAbout');
    const nextAboutBtn = document.getElementById('nextAbout');
    const aboutDots = document.querySelectorAll('.about-dot');

    let currentAboutIndex = 0;

    function showAboutSlide(index) {
        if (aboutItems.length === 0) return;

        // Normalizar índice
        if (index < 0) {
            currentAboutIndex = aboutItems.length - 1;
        } else if (index >= aboutItems.length) {
            currentAboutIndex = 0;
        } else {
            currentAboutIndex = index;
        }

        // Calcular el offset
        const aboutWidth = aboutItems[0] ? aboutItems[0].offsetWidth : 0;
        const offset = -currentAboutIndex * aboutWidth;
        
        if (aboutWrapper) {
            aboutWrapper.style.transform = `translateX(${offset}px)`;
        }

        // Actualizar dots
        aboutDots.forEach((dot, idx) => {
            if (idx === currentAboutIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    if (prevAboutBtn) {
        prevAboutBtn.addEventListener('click', () => {
            showAboutSlide(currentAboutIndex - 1);
        });
    }

    if (nextAboutBtn) {
        nextAboutBtn.addEventListener('click', () => {
            showAboutSlide(currentAboutIndex + 1);
        });
    }

    aboutDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showAboutSlide(index);
        });
    });

    if (aboutItems.length > 0) {
        showAboutSlide(0);

        window.addEventListener('resize', () => {
            showAboutSlide(currentAboutIndex);
        });
    }

    // --- Lógica para el carrusel de "Proyectos Destacados" (section4) ---
    const projectWrapper = document.querySelector('.project-wrapper');
    const projectItems = document.querySelectorAll('.project-item');
    const prevProjectBtn = document.getElementById('prevProject');
    const nextProjectBtn = document.getElementById('nextProject');
    const projectDots = document.querySelectorAll('.project-dot');

    let currentProjectIndex = 0;

    function showProject(index) {
        if (projectItems.length === 0) return;

        // Normalizar índice
        if (index < 0) {
            currentProjectIndex = projectItems.length - 1;
        } else if (index >= projectItems.length) {
            currentProjectIndex = 0;
        } else {
            currentProjectIndex = index;
        }

        // Calcular el offset
        const projectItemWidth = projectItems[0] ? projectItems[0].offsetWidth : 0;
        const offset = -currentProjectIndex * projectItemWidth;
        
        if (projectWrapper) {
            projectWrapper.style.transform = `translateX(${offset}px)`;
        }

        // Actualizar dots
        projectDots.forEach((dot, idx) => {
            if (idx === currentProjectIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    if (prevProjectBtn) {
        prevProjectBtn.addEventListener('click', () => {
            showProject(currentProjectIndex - 1);
        });
    }

    if (nextProjectBtn) {
        nextProjectBtn.addEventListener('click', () => {
            showProject(currentProjectIndex + 1);
        });
    }

    projectDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showProject(index);
        });
    });

    if (projectItems.length > 0) {
        showProject(0);

        window.addEventListener('resize', () => {
            showProject(currentProjectIndex);
        });
    }

    // --- Lógica para el logoLink (desplazamiento al inicio) ---
    const logoLink = document.getElementById('logo-link');

    if (logoLink) {
        logoLink.addEventListener('click', function(event) {
            event.preventDefault();
            showSection(0);
        });
    }

    // --- Lógica para el Modal de Contacto ---
    const googleButton = document.querySelector('.wrapper ul li.google a');
    const contactModal = document.getElementById('contactModal');
    const closeButtons = document.querySelectorAll('.close-button');

    if (googleButton && contactModal) {
        googleButton.addEventListener('click', function(event) {
            event.preventDefault();
            contactModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Cerrar cualquier modal abierto
            const modals = document.querySelectorAll('.modal-backdrop');
            modals.forEach(modal => {
                modal.classList.remove('show');
            });
            document.body.style.overflow = '';
        });
    });

    // Cerrar modal haciendo clic fuera
    const modals = document.querySelectorAll('.modal-backdrop');
    modals.forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    });

    // --- Lógica del formulario de contacto ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Validación básica
            if (!name || !email || !message) {
                alert('Por favor, completa todos los campos.');
                return;
            }
            
            alert('¡Formulario enviado correctamente! Gracias por tu mensaje, ' + name + '.');
            contactModal.classList.remove('show');
            document.body.style.overflow = '';
            contactForm.reset();
        });
    }

    // --- Lógica para filtros de categorías del blog (section5) ---
    const categoryChips = document.querySelectorAll('.category-chip');
    const blogCards = document.querySelectorAll('.blog-card');

    categoryChips.forEach(chip => {
        chip.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Remover active de todos los chips
            categoryChips.forEach(c => c.classList.remove('active'));
            
            // Agregar active al chip clickeado
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            blogCards.forEach(card => {
                const cardCategories = card.dataset.categories || '';
                
                if (filter === 'all' || cardCategories.includes(filter)) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    setTimeout(() => {
                        if (card.classList.contains('hidden')) {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });

    // --- Lógica para el modal de posts del blog ---
    const postModal = document.getElementById('postModal');
    const postModalTitle = document.getElementById('modal-post-title');
    const postModalMeta = document.getElementById('modal-post-meta');
    const postModalBody = document.getElementById('modal-post-body');
    const postModalComments = document.getElementById('modal-post-comments');
    const toggleCommentsBtn = document.getElementById('toggle-comments-btn');
    const commentsWrapper = document.getElementById('comments-wrapper');

    let currentPostId = null;

    // Función para obtener el token CSRF
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Función para cargar datos del post desde el servidor
    async function loadPostData(postId) {
        try {
            const response = await fetch(`/blog/ajax/post/${postId}/`);
            const data = await response.json();
            
            if (response.ok) {
                return data;
            } else {
                throw new Error(data.error || 'Error al cargar el post');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al cargar los datos del post');
            return null;
        }
    }

    // Función para enviar comentario al servidor
    async function submitComment(postId, author, body) {
        try {
            const response = await fetch('/blog/ajax/add-comment/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({
                    post_id: postId,
                    author: author,
                    body: body
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                return data;
            } else {
                throw new Error(data.error || 'Error al enviar el comentario');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al enviar el comentario: ' + error.message);
            return null;
        }
    }

    // Evento para abrir modal de post
    blogCards.forEach(card => {
        const readMoreBtn = card.querySelector('.blog-card-link');
        if (readMoreBtn) {
            readMoreBtn.addEventListener('click', async function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                const postId = card.dataset.postId;
                currentPostId = postId;
                
                // Mostrar loading
                if (postModal) {
                    postModalTitle.textContent = 'Cargando...';
                    postModalBody.innerHTML = '<p>Cargando contenido del post...</p>';
                    postModal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
                
                // Cargar datos del servidor
                const postData = await loadPostData(postId);
                
                if (postData) {
                    postModalTitle.textContent = postData.title;
                    postModalMeta.innerHTML = `
                        <span><i class="fas fa-calendar"></i> ${postData.date}</span>
                        <span class="divider">|</span>
                        <span><i class="fas fa-tags"></i> Categorías: ${postData.categories}</span>
                    `;
                    
                    // Incluir imagen si existe
                    let bodyContent = postData.body;
                    if (postData.image) {
                        bodyContent = `<img src="${postData.image}" alt="${postData.title}" style="max-width: 100%; height: auto; border-radius: 10px; margin-bottom: 20px;">` + bodyContent;
                    }
                    
                    postModalBody.innerHTML = bodyContent.replace(/\n/g, '<br>');
                    
                    updateCommentsDisplay(postData.comments);
                }
            });
        }
        
        // También permitir click en toda la card
        card.addEventListener('click', function(event) {
            if (!event.target.closest('.blog-card-link')) {
                const readMoreBtn = card.querySelector('.blog-card-link');
                if (readMoreBtn) {
                    readMoreBtn.click();
                }
            }
        });
    });

    // Toggle para mostrar/ocultar comentarios
    if (toggleCommentsBtn && commentsWrapper) {
        toggleCommentsBtn.addEventListener('click', function() {
            const isVisible = commentsWrapper.classList.contains('visible');
            
            if (isVisible) {
                commentsWrapper.classList.remove('visible');
                this.innerHTML = '<i class="fas fa-comments"></i> Ver Comentarios';
                this.setAttribute('aria-expanded', 'false');
            } else {
                commentsWrapper.classList.add('visible');
                this.innerHTML = '<i class="fas fa-comments"></i> Ocultar Comentarios';
                this.setAttribute('aria-expanded', 'true');
            }
        });
    }

    // Función para actualizar la visualización de comentarios
    function updateCommentsDisplay(comments = []) {
        if (!postModalComments) return;
        
        const commentsHtml = `
            <div class="comment-form-container">
                <h3><i class="fas fa-comment-dots"></i> Deja tu comentario:</h3>
                <form class="comment-form" id="server-comment-form">
                    <div class="form-group">
                        <label>Nombre:</label>
                        <input type="text" name="author" required placeholder="Tu nombre">
                    </div>
                    <div class="form-group">
                        <label>Comentario:</label>
                        <textarea name="body" rows="4" required placeholder="Escribe tu comentario aquí..."></textarea>
                    </div>
                    <button type="submit" class="submit-comment-btn">
                        <i class="fas fa-paper-plane"></i> Enviar Comentario
                    </button>
                </form>
            </div>
            <div class="comments-list-container">
                <h3 class="comments-title">
                    <i class="fas fa-comments"></i> 
                    Comentarios (${comments.length})
                </h3>
                <div class="comments-list">
                    ${comments.length > 0 ? 
                        comments.map(comment => `
                            <div class="comment">
                                <div class="comment-header">
                                    <p class="comment-author">
                                        <i class="fas fa-user"></i>
                                        <strong>${comment.author}</strong>
                                    </p>
                                    <span class="comment-date">
                                        <i class="fas fa-clock"></i>
                                        ${comment.date}
                                    </span>
                                </div>
                                <p class="comment-body">${comment.body}</p>
                            </div>
                        `).join('') :
                        `<div class="no-comments">
                            <i class="fas fa-comment-slash"></i>
                            <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
                        </div>`
                    }
                </div>
            </div>
        `;
        
        postModalComments.innerHTML = commentsHtml;
        
        // Agregar evento al formulario de comentarios del servidor
        const serverCommentForm = document.getElementById('server-comment-form');
        if (serverCommentForm) {
            serverCommentForm.addEventListener('submit', async function(event) {
                event.preventDefault();
                
                const formData = new FormData(serverCommentForm);
                const author = formData.get('author');
                const body = formData.get('body');
                
                if (author && body && currentPostId) {
                    // Deshabilitar el botón mientras se envía
                    const submitBtn = serverCommentForm.querySelector('.submit-comment-btn');
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                    submitBtn.disabled = true;
                    
                    const result = await submitComment(currentPostId, author, body);
                    
                    if (result && result.success) {
                        // Recargar los datos del post para mostrar el nuevo comentario
                        const updatedPostData = await loadPostData(currentPostId);
                        if (updatedPostData) {
                            updateCommentsDisplay(updatedPostData.comments);
                        }
                        
                        // Mostrar mensaje de éxito
                        alert('¡Comentario agregado exitosamente!');
                    }
                    
                    // Restaurar el botón
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            });
        }
    }
});