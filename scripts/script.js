// Variables globales
const githubUsername = 'git-devtest'; // Reemplaza con tu nombre de usuario de GitHub
const githubApiUrl = `https://api.github.com/users/${githubUsername}/repos`;
        
// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS
    emailjs.init("n6d4Vs-91RMbxMJ4X");

    // Crear partículas animadas
    createParticles();
           
    // Cargar repositorios de GitHub
    loadGitHubRepositories();
           
    // Configurar navegación
    setupNavigation();
            
    // Configurar formulario de contacto
    setupContactForm();
            
    // Configurar scroll suave
    setupSmoothScroll();
            
    // Configurar animaciones al hacer scroll
    setupScrollAnimations();
});
        
// Crear partículas animadas
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
            
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        particlesContainer.appendChild(particle);
    }
}
        
// Cargar repositorios de GitHub
async function loadGitHubRepositories() {
    const repositoriesContainer = document.getElementById('repositoriesContainer');
    let allRepos = []; // Variable para almacenar todos los repositorios
            
    try {
        const response = await fetch(githubApiUrl);
        if (!response.ok) throw new Error('No se pudieron cargar los repositorios');
                
        const repositories = await response.json();

        // Guardar todos los repositorios
        allRepos = repositories;
                
        // Ordenar repositorios por estrellas (descendente)
        //repositories.sort((a, b) => b.stargazers_count - a.stargazers_count);
                
        // Limitar a 6 repositorios
        //const limitedRepos = repositories.slice(0, 6);
        
        // Limpiar el contenedor
        repositoriesContainer.innerHTML = '';
                
        // Mostrar los repositorios
        repositories.forEach(repo => {
            const card = createRepositoryCard(repo);
            repositoriesContainer.appendChild(card);
        });
                
        /*limitedRepos.forEach(repo => {
            const repoCard = createRepositoryCard(repo);
            repositoriesContainer.appendChild(repoCard);
        });*/

        // Configurar filtros de repositorios
        setupRepositoryFilters(allRepos, repositoriesContainer);
        
    } catch (error) {
        console.error('Error al cargar repositorios:', error);
        repositoriesContainer.innerHTML = `
            <div class="error-message">
                <p>No se pudieron cargar los repositorios. Por favor, verifica tu conexión o el nombre de usuario de GitHub.</p>
            </div>
        `;
    }
}

// Agregar nueva función para manejar los filtros
function setupRepositoryFilters(allRepos, container) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            button.classList.add('active');
            
            const selectedLanguage = button.getAttribute('data-language');
            
            // Filtrar repositorios
            filterRepositories(selectedLanguage, allRepos, container);
        });
    });
}

// Filtrar repositorios
function filterRepositories(language, allRepos, container) {
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Filtrar repositorios según el lenguaje seleccionado
    const filteredRepos = language === 'all' 
        ? allRepos 
        : allRepos.filter(repo => repo.language === language);
    
    // Mostrar repositorios filtrados
    if (filteredRepos.length === 0) {
        container.innerHTML = '<p class="no-results">No se encontraron repositorios con este lenguaje</p>';
    } else {
        filteredRepos.forEach(repo => {
            const card = createRepositoryCard(repo);
            container.appendChild(card);
        });
    }
}
        
// Crear tarjeta de repositorio
function createRepositoryCard(repo) {
    const card = document.createElement('div');
    card.classList.add('repo-card');
            
    // Obtener color del lenguaje
    const languageColor = getLanguageColor(repo.language);
            
    card.innerHTML = `
        <div class="repo-header">
            <h3 class="repo-name">${repo.name}</h3>
            <div class="repo-language">
                <span class="language-dot" style="background-color: ${languageColor}"></span>
                <span>${repo.language || 'N/A'}</span>
            </div>
        </div>
        <p class="repo-description">${repo.description || 'Sin descripción disponible'}</p>
            <div class="repo-stats">
                <div class="repo-stat">
                    <i class="fas fa-star"></i>
                    <span>${repo.stargazers_count}</span>
                </div>
                <div class="repo-stat">
                    <i class="fas fa-code-branch"></i>
                    <span>${repo.forks_count}</span>
                </div>
                <div class="repo-stat">
                    <i class="fas fa-eye"></i>
                    <span>${repo.watchers_count}</span>
                </div>
            </div>
            <a href="${repo.html_url}" target="_blank" class="repo-link">
                Ver en GitHub <i class="fas fa-arrow-right"></i>
            </a>
        `;
            
    return card;
}

// Obtener color del lenguaje de programación
function getLanguageColor(language) {
    const colors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C#': '#178600',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'Go': '#00ADD8',
    'Swift': '#ffac45',
    'Kotlin': '#F18E33',
    'Rust': '#dea584',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Vue': '#41b883',
    'Angular': '#dd0031',
    'React': '#61dafb',
    'Node.js': '#339933',
    'Docker': '#384d54',
    'Shell': '#89e051',
    'Markdown': '#083fa1',
    'ML': '#ff6f61'
    };

    return colors[language] || '#858585';
}
        
// Configurar navegación
function setupNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
            
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
                    
        // Animar hamburguesa
        const spans = menuToggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
            
    // Cerrar menú al hacer clic en un enlace
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
            
    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 14, 39, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 14, 39, 0.9)';
            header.style.boxShadow = 'none';
        }
    });
}
        
// Configurar formulario de contacto
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
            
    if (!contactForm) {
        console.error('Formulario de contacto no encontrado');
        return;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Verificar que todos los campos existan
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        if (!nameInput?.value || !emailInput?.value || !subjectInput?.value || !messageInput?.value) {
            showNotification('Por favor, completa todos los campos', 'error');
            return;
        }

        // Mostrar estado de carga
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
                        
        // Obtener datos del formulario
        const templateParams = {
            name: nameInput.value,
            email: emailInput.value,
            title: subjectInput.value,
            message: messageInput.value
        };

        //console.log('Enviando email con params:', templateParams); // Para debugging
                
        // Enviar email usando EmailJS
        emailjs.send('service_jdp3ohg', 'template_1hzdeek', templateParams)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                showNotification('¡Mensaje enviado con éxito!', 'success');
                contactForm.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                showNotification('Error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}
        
// Mostrar notificación
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
            
    // Agregar clase para animación
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Remover notificación después de 5 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.style.display = 'none';
        }, 300);
    }, 5000);
}
        
// Configurar scroll suave
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
                    
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
                    
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}
        
// Configurar animaciones al hacer scroll
function setupScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
            
    // Observar elementos para animar
    const animateElements = document.querySelectorAll('.timeline-item, .experience-card, .repo-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}