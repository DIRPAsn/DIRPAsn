 // ===== CONFIGURATION GLOBALE =====
class DIRPAWebsite {
    constructor() {
        this.init();
    }

    // ===== INITIALISATION =====
    init() {
        this.setupLoadingScreen();
        this.setupNavigation();
        this.setupHeroSlider();
        this.setupAnimations();
        this.setupSearch();
        this.setupNewsletter();
        this.setupScrollEffects();
        this.setupImageLazyLoading();
        this.setupPerformanceOptimizations();
        
        console.log('🚀 DIRPA Website - Version Sophistiquée initialisée');
    }

    // ===== LOADING SCREEN ANIMÉ =====
    setupLoadingScreen() {
        const loadingScreen = document.querySelector('.loading-screen');
        
        // Simuler le chargement
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            
            setTimeout(() => {
                loadingScreen.remove();
                this.triggerInitialAnimations();
            }, 500);
        }, 2000);
    }

    // ===== NAVIGATION AVANCÉE =====
    setupNavigation() {
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.querySelector('.nav-menu');
        const dropdowns = document.querySelectorAll('.dropdown');

        // Toggle mobile menu
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Dropdown menus avec animation
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });

        // Fermer le menu en cliquant à l'extérieur
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });

        // Navigation sticky avec effet de rétrécissement
        this.setupStickyHeader();
    }

    // ===== HEADER STICKY AVEC EFFET =====
    setupStickyHeader() {
        const header = document.querySelector('.header-sophistique');
        const headerMain = document.querySelector('.header-main');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Effet de rétrécissement
            if (currentScrollY > 100) {
                headerMain.style.padding = '10px 0';
                header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            } else {
                headerMain.style.padding = '15px 0';
                header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }

            // Hide/show on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        });
    }

    // ===== HERO SLIDER AVANCÉ =====
    setupHeroSlider() {
        const slides = document.querySelectorAll('.hero-slide');
        let currentSlide = 0;
        let slideInterval;

        // Fonction pour changer de slide
        const goToSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        // Slider automatique
        const startSlider = () => {
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
        }

        // Arrêter au survol
        const hero = document.querySelector('.hero');
        hero.addEventListener('mouseenter', () => clearInterval(slideInterval));
        hero.addEventListener('mouseleave', startSlider);

        // Navigation clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
            if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
        });

        // Swipe sur mobile
        this.setupTouchSwipe();

        startSlider();
    }

    // ===== SUPPORT SWIPE MOBILE =====
    setupTouchSwipe() {
        const hero = document.querySelector('.hero');
        let touchStartX = 0;
        let touchEndX = 0;

        hero.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        hero.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }

    handleSwipe(startX, endX) {
        const slides = document.querySelectorAll('.hero-slide');
        let currentSlide = Array.from(slides).findIndex(slide => slide.classList.contains('active'));

        if (startX > endX + 50) {
            // Swipe gauche
            this.goToSlide(currentSlide + 1);
        } else if (startX < endX - 50) {
            // Swipe droite
            this.goToSlide(currentSlide - 1);
        }
    }

    // ===== ANIMATIONS SCROLL =====
    setupAnimations() {
        // Observer pour les animations d'apparition
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    
                    // Animation spécifique selon la classe
                    if (entry.target.classList.contains('news-card')) {
                        entry.target.style.animationDelay = `${entry.target.dataset.delay || '0ms'}`;
                    }
                }
            });
        }, observerOptions);

        // Observer les éléments à animer
        document.querySelectorAll('.news-card, .discover-card, .section-title').forEach((el, index) => {
            el.dataset.delay = `${index * 100}ms`;
            observer.observe(el);
        });

        // Compteur animé (exemple pour les statistiques)
        this.setupCounters();
    }

    // ===== COMPTEURS ANIMÉS =====
    setupCounters() {
        const counters = document.querySelectorAll('.counter');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    // ===== RECHERCHE INTELLIGENTE =====
    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        const searchResults = this.createSearchResultsPanel();

        // Recherche en temps réel
        searchInput.addEventListener('input', this.debounce((e) => {
            this.handleSearch(e.target.value, searchResults);
        }, 300));

        // Recherche au clic
        searchBtn.addEventListener('click', () => {
            this.performSearch(searchInput.value);
        });

        // Recherche avec Enter
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch(searchInput.value);
            }
        });
    }

    // ===== FONCTION DE DÉBOUNCE =====
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ===== PANEL DE RÉSULTATS DE RECHERCHE =====
    createSearchResultsPanel() {
        const panel = document.createElement('div');
        panel.className = 'search-results-panel';
        document.querySelector('.search-box').appendChild(panel);
        return panel;
    }

    async handleSearch(query, resultsPanel) {
        if (query.length < 2) {
            resultsPanel.style.display = 'none';
            return;
        }

        // Simulation de recherche (remplacer par appel API réel)
        const results = await this.simulateSearch(query);
        this.displaySearchResults(results, resultsPanel);
    }

    async simulateSearch(query) {
        // Simulation de délai réseau
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Données simulées (remplacer par vraies données)
        return [
            { title: 'Visite du Général Mbaye Cissé', url: 'visit du cemga.html', category: 'Actualité' },
            { title: 'Sécurisation des frontières', url: 'zoneN4.html', category: 'Reportage' },
            { title: 'Biographie du CEMGA', url: 'cemga.html', category: 'Documentation' }
        ].filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase())
        );
    }

    displaySearchResults(results, panel) {
        if (results.length === 0) {
            panel.innerHTML = '<div class="no-results">Aucun résultat trouvé</div>';
        } else {
            panel.innerHTML = results.map(result => `
                <a href="${result.url}" class="search-result">
                    <span class="result-category">${result.category}</span>
                    <span class="result-title">${result.title}</span>
                </a>
            `).join('');
        }
        panel.style.display = 'block';
    }

    performSearch(query) {
        if (query.trim()) {
            // Redirection vers page de recherche ou affichage des résultats
            alert(`Recherche pour: ${query}`);
            // window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    }

    // ===== NEWSLETTER AVEC VALIDATION =====
    setupNewsletter() {
        const form = document.querySelector('.newsletter-form');
        const input = form.querySelector('input[type="email"]');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = input.value.trim();
            
            if (this.validateEmail(email)) {
                await this.subscribeNewsletter(email);
                this.showNotification('Inscription réussie !', 'success');
                input.value = '';
            } else {
                this.showNotification('Veuillez entrer un email valide', 'error');
            }
        });
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    async subscribeNewsletter(email) {
        // Simulation d'envoi à l'API
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Email inscrit:', email);
    }

    // ===== EFFETS DE SCROLL =====
    setupScrollEffects() {
        // Parallax pour l'hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Bouton back to top
        this.setupBackToTop();
    }

    setupBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
        document.body.appendChild(backToTop);

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', () => {
            backToTop.style.display = window.scrollY > 500 ? 'block' : 'none';
        });
    }

    // ===== LAZY LOADING DES IMAGES =====
    setupImageLazyLoading() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== OPTIMISATIONS PERFORMANCE =====
    setupPerformanceOptimizations() {
        // Préchargement des images critiques
        this.preloadCriticalImages();
        
        // Gestion de la mémoire
        this.setupMemoryManagement();
    }

    preloadCriticalImages() {
        const criticalImages = [
            'MEDIA/GARDE.jpeg',
            'MEDIA/LOGODIRPA_3798 copie.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    setupMemoryManagement() {
        // Nettoyage des event listeners quand nécessaire
        window.addEventListener('beforeunload', () => {
            // Cleanup si nécessaire
        });
    }

    // ===== NOTIFICATIONS =====
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;

        document.body.appendChild(notification);

        // Animation d'entrée
        setTimeout(() => notification.classList.add('show'), 100);

        // Fermeture automatique
        setTimeout(() => {
            this.hideNotification(notification);
        }, 5000);

        // Fermeture manuelle
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.hideNotification(notification);
        });
    }

    hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }

    // ===== ANIMATIONS INITIALES =====
    triggerInitialAnimations() {
        // Animation d'entrée des éléments principaux
        document.querySelectorAll('.hero-content, .section-header').forEach((el, index) => {
            el.style.animationDelay = `${index * 200}ms`;
            el.classList.add('fade-in');
        });
    }
}

// ===== INITIALISATION AU CHARGEMENT =====
document.addEventListener('DOMContentLoaded', () => {
    new DIRPAWebsite();
});

// ===== GESTIONNAIRE D'ERREURS GLOBAL =====
window.addEventListener('error', (e) => {
    console.error('Erreur JavaScript:', e.error);
});

// ===== OFFLINE SUPPORT =====
window.addEventListener('online', () => {
    console.log('Connexion rétablie');
});

window.addEventListener('offline', () => {
    console.log('Mode hors ligne');
});

// ===== SERVICE WORKER (OPTIONNEL) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW enregistré:', registration);
            })
            .catch(error => {
                console.log('Échec enregistrement SW:', error);
            });
    });
}

// ===== API D'INTERSECTION OBSERVER POUR LES STATISTIQUES =====
class Analytics {
    constructor() {
        this.trackedElements = new Set();
        this.setupAnalytics();
    }

    setupAnalytics() {
        // Track visibility des articles
        this.trackArticleViews();
        
        // Track clicks sur les liens importants
        this.trackClicks();
    }

    trackArticleViews() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.trackedElements.has(entry.target)) {
                    this.trackView(entry.target);
                    this.trackedElements.add(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.news-card, .discover-card').forEach(card => {
            observer.observe(card);
        });
    }

    trackView(element) {
        const title = element.querySelector('h2, h3')?.textContent || 'Sans titre';
        console.log('Article vu:', title);
        // Envoyer à Google Analytics ou autre service
    }

    trackClicks() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link) {
                this.trackClick(link);
            }
        });
    }

    trackClick(link) {
        const href = link.href;
        const text = link.textContent;
        console.log('Lien cliqué:', text, href);
    }
}

// Démarrer l'analytics
new Analytics();

// ===== UTILITAIRES SUPPLEMENTAIRES =====
class Utilities {
    static formatDate(date) {
        return new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    }

    static truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }

    static getRandomColor() {
        const colors = ['#1a365d', '#2d3748', '#4a5568', '#718096'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

// Exposer les utilitaires globalement
window.DIRPAUtils = Utilities;