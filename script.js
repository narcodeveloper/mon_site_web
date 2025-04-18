// Attend que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    // Sélectionne les éléments nécessaires
    const navLinks = document.querySelectorAll('.nav-links li');
    const tabContents = document.querySelectorAll('.tab-content');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');
    const newsletterForm = document.querySelector('.newsletter-form');
    const ctaButton = document.querySelector('.cta-button');

    // Fonction pour la navigation par onglets
    function switchTab(tabId) {
        // Cache tous les contenus d'onglets
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active');
        });

        // Désactive tous les liens de navigation
        navLinks.forEach(navLink => {
            navLink.classList.remove('active');
        });

        // Affiche le contenu de l'onglet sélectionné
        document.getElementById(tabId).classList.add('active');

        // Active le lien de navigation correspondant
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

        // Ferme le menu mobile si ouvert
        if (nav.classList.contains('nav-active')) {
            toggleNav();
        }

        // Animation spécifique pour certains onglets
        if (tabId === 'auteurs') {
            animateTeamMembers();
        }

        // Réinitialise les animations au changement d'onglet
        initializeAnimations();
    }

    // Ajoute les écouteurs d'événements aux liens de navigation
    navLinks.forEach(navLink => {
        navLink.addEventListener('click', () => {
            const tabId = navLink.getAttribute('data-tab');
            switchTab(tabId);
            
            // Fait défiler jusqu'au début de la section
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Navigation Mobile avec Menu Burger
    function toggleNav() {
        // Bascule l'état du menu
        nav.classList.toggle('nav-active');
        
        // Animation des liens
        navLinksItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Animation du burger
        burger.classList.toggle('toggle');
    }

    // Écouteur d'événement pour le menu burger
    burger.addEventListener('click', toggleNav);

    // Animation spécifique pour la section équipe
    function animateTeamMembers() {
        const teamMembers = document.querySelectorAll('.team-member');
        
        teamMembers.forEach((member, index) => {
            member.style.opacity = '0';
            member.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                member.style.opacity = '1';
                member.style.transform = 'translateY(0)';
            }, 300 + (index * 150));
        });
    }

    // Gestion du formulaire de newsletter
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            
            if (!emailInput.value) {
                alert('Veuillez entrer votre adresse email.');
                return;
            }
            
            // Simulation d'abonnement à la newsletter
            alert('Vous êtes maintenant abonné à notre newsletter !');
            newsletterForm.reset();
        });
    }

    // Gestion du bouton CTA (Call-to-Action)
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            // Action du bouton CTA - redirection vers la section "Mathématiques"
            switchTab('mathematiques');
            
            // Scroll doux vers cette section
            document.getElementById('mathematiques').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }

    // Vérification des ancres dans l'URL pour la navigation directe
    function checkUrlHash() {
        const hash = window.location.hash;
        if (hash) {
            const tabId = hash.substring(1); // Enlève le # du hash
            const tabExists = document.getElementById(tabId);
            
            if (tabExists) {
                switchTab(tabId);
            }
        }
    }

    // Vérifie les ancres dans l'URL lors du chargement initial
    checkUrlHash();
    
    // Écoute les changements de hash dans l'URL
    window.addEventListener('hashchange', checkUrlHash);

    // Animation des éléments au scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .app-card, .resource-category, .team-member, .project-details, .content-grid');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialisation des animations
    const initializeAnimations = () => {
        const animatedElements = document.querySelectorAll('.feature-card, .app-card, .resource-category, .team-member, .project-details, .content-grid');
        
        animatedElements.forEach(element => {
            // Évite de réinitialiser les éléments déjà animés
            if (!element.classList.contains('animated')) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            }
        });
        
        // Déclenche l'animation au chargement initial
        animateOnScroll();
    };

    // Initialise les animations
    initializeAnimations();
    
    // Écoute le scroll pour animer les éléments
    window.addEventListener('scroll', animateOnScroll);

    // Marque les éléments comme animés après le défilement
    window.addEventListener('scroll', () => {
        const elements = document.querySelectorAll('.feature-card, .app-card, .resource-category, .team-member, .project-details, .content-grid');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    });
}); 