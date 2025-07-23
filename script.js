document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll
    // Select all anchor links that start with '#'
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior

            // Get the target element's ID from the href attribute
            const targetId = this.getAttribute('href');
            // Select the target element
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll to the target element with smooth behavior
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky Menu
    const header = document.querySelector('.header');
    // Add a scroll event listener to the window
    window.addEventListener('scroll', () => {
        // If the scroll position is greater than 50px, add the 'sticky' class to the header
        // Otherwise, remove it
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Scroll Animations (Fade-in and Slide-up)
    // Create a new IntersectionObserver instance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible in viewport)
            if (entry.isIntersecting) {
                // Add the 'is-visible' class to trigger the CSS animation
                entry.target.classList.add('is-visible');
                // Stop observing once the animation is triggered to avoid re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust the viewport margin
    });

    // Select all elements with animation classes and observe them
    document.querySelectorAll('.animate-fade-in, .animate-slide-up').forEach(element => {
        observer.observe(element);
    });

    // Horizontal Film Slider
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Scroll amount for each click
    const scrollAmount = 300; // Adjust based on movie card width + margin

    // Event listener for the 'Previous' button
    prevBtn.addEventListener('click', () => {
        sliderWrapper.scrollBy({
            left: -scrollAmount, // Scroll left by the defined amount
            behavior: 'smooth' // Smooth scrolling
        });
    });

    // Event listener for the 'Next' button
    nextBtn.addEventListener('click', () => {
        sliderWrapper.scrollBy({
            left: scrollAmount, // Scroll right by the defined amount
            behavior: 'smooth' // Smooth scrolling
        });
    });

    // Parallax Effect on Hero Section
    const heroSection = document.getElementById('hero');
    // Add a scroll event listener to the window
    window.addEventListener('scroll', () => {
        // Calculate the scroll position
        const scrollPosition = window.scrollY;
        // Apply a translateY transformation to the hero section's background
        // This creates the parallax effect by moving the background slower than the foreground
        heroSection.style.backgroundPositionY = -scrollPosition * 0.5 + 'px';
    });

    // FAQ Accordion
    // Select all FAQ question elements
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Toggle the 'active' class on the clicked question
            question.classList.toggle('active');
            // Select the corresponding answer element
            const answer = question.nextElementSibling;
            // Toggle the 'active' class on the answer to show/hide it
            answer.classList.toggle('active');
        });
    });

    // Subscription Plan Selection and Order Summary Display
    const subscribeButtons = document.querySelectorAll('.btn-subscribe');
    const orderSummary = document.getElementById('order-summary');
    const selectedPlanSpan = document.getElementById('selected-plan');
    const selectedPriceSpan = document.getElementById('selected-price');
    const totalPriceSpan = document.getElementById('total-price');

    subscribeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get plan data from data attributes
            const planName = button.dataset.plan;
            const planPrice = parseFloat(button.dataset.price);

            // Update order summary details
            selectedPlanSpan.textContent = planName;
            selectedPriceSpan.textContent = `${planPrice.toFixed(2)}€/mois`;
            totalPriceSpan.textContent = `${planPrice.toFixed(2)}€`; // For simplicity, total is just monthly price

            // Show the order summary section
            orderSummary.classList.remove('hidden');
            // Scroll to the order summary for better UX
            orderSummary.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Payment Form Submission (Placeholder)
    const paymentForm = document.querySelector('.payment-form');
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual form submission

        // In a real application, you would send payment details to a backend server here.
        // For this front-end only example, we'll just show a confirmation message.
        alert('Paiement simulé réussi ! Votre abonnement est activé.');
        // You might clear the form or redirect the user after a real payment.
        paymentForm.reset();
        orderSummary.classList.add('hidden'); // Hide summary after "payment"
    });

    // Category Film Display Logic
    const categoryCards = document.querySelectorAll('.category-card');
    const categoryFilmsDisplaySection = document.getElementById('category-films-display');
    const categoryDisplayTitle = document.getElementById('category-display-title');
    const categoryMoviesContainer = document.getElementById('category-movies-container');

    // Mock data for films by category
    const moviesByCategory = {
        "Action": [
            { title: "Le Dernier Combat", description: "Un agent secret doit empêcher une catastrophe mondiale en affrontant des forces obscures.", imageFileName: "action1.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" },
            { title: "Course Contre la Montre", description: "Un flic solitaire poursuit un criminel insaisissable à travers une ville sous tension.", imageFileName: "action2.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" },
            { title: "Explosion Finale", description: "Une équipe d'élite doit désamorcer une bombe avant qu'elle ne détruise la capitale.", imageFileName: "action3.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" },
            { title: "L'Assaut", description: "Un commando est envoyé en mission suicide pour libérer des otages.", imageFileName: "action4.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" }
        ],
        "Science-Fiction": [
            { title: "L'Odyssée Spatiale", description: "Un voyage épique à travers la galaxie pour découvrir les origines de l'humanité.", imageFileName: "sf1.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" },
            { title: "Le Dernier Humain", description: "Dans un futur dystopique, la survie de l'humanité est en jeu face à une intelligence artificielle.", imageFileName: "sf2.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" },
            { title: "Chroniques du Futur", description: "Des voyageurs temporels tentent de modifier le passé pour sauver l'avenir.", imageFileName: "sf3.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" },
            { title: "Monde Virtuel", description: "Un programmeur découvre que sa réalité n'est qu'une simulation complexe.", imageFileName: "sf4.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" }
        ],
        "Comédie": [
            { title: "Le Grand Fiasco", description: "Une série de malentendus hilarants bouleverse la vie d'un homme ordinaire.", imageFileName: "comedie1.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" },
            { title: "Vacances Imprévues", description: "Deux amis se retrouvent dans des situations loufoques lors de leurs vacances.", imageFileName: "comedie2.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" },
            { title: "Mariage Explosif", description: "Un mariage tourne au chaos avec des invités plus excentriques les uns que les autres.", imageFileName: "comedie3.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" }
        ],
        "Drame": [
            { title: "Les Larmes du Passé", description: "Un homme tente de reconstruire sa vie après une tragédie personnelle.", imageFileName: "drame1.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" },
            { title: "Au Nom de la Justice", description: "L'histoire poignante d'une avocate luttant pour la vérité dans un procès difficile.", imageFileName: "drame2.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" },
            { title: "Le Secret des Vignes", description: "Une saga familiale riche en émotions et en rebondissements.", imageFileName: "drame3.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" }
        ],
        "Horreur": [
            { title: "La Maison Hantée", description: "Un groupe d'amis passe la nuit dans une maison réputée hantée, avec des conséquences terrifiantes.", imageFileName: "horreur1.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" },
            { title: "L'Écho des Ténèbres", description: "Une entité maléfique traque les habitants d'un petit village isolé.", imageFileName: "horreur2.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" },
            // Film "The Nun's Curse" avec un nom de fichier d'image
            { title: "The Nun's Curse - Full Movie in English - Horror - HD", description: "Un film d'horreur intense sur une malédiction monacale.", imageFileName: "The Nun's Curse.jpg", videoUrl: "https://www.youtube.com/embed/doSBRtKDP5s?autoplay=1" }
        ],
        "Romance": [
            { title: "Un Amour d'Été", description: "Une rencontre inattendue pendant les vacances qui change deux vies à jamais.", imageFileName: "romance1.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" },
            { title: "Sous les Étoiles", description: "Deux âmes solitaires trouvent le réconfort et l'amour sous le ciel nocturne.", imageFileName: "romance2.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" },
            { title: "Le Serment Oublié", description: "Une femme découvre une vieille lettre d'amour qui la mène sur les traces d'un passé romantique.", imageFileName: "romance3.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" },
            // Film "Mon étoile solaire" avec un nom de fichier d'image
            {
                title: "Mon étoile solaire en streaming complet gratuit en français",
                description: "Une histoire d'amour touchante et lumineuse qui réchauffe les cœurs.",
                imageFileName: "mon_etoile_solaire.jpg",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" // Lien YouTube de remplacement
            }
        ],
        "Thriller": [
            { title: "Le Piège", description: "Un homme se réveille piégé dans un endroit inconnu et doit résoudre des énigmes pour survivre.", imageFileName: "thriller1.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" },
            { title: "Conspiration Silencieuse", description: "Une journaliste découvre un complot gouvernemental et sa vie est en danger.", imageFileName: "thriller2.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" },
            { title: "L'Inconnu Parfait", description: "Une femme est hantée par un inconnu qui semble tout savoir d'elle.", imageFileName: "thriller3.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" }
        ],
        "Animation": [
            { title: "Le Royaume Enchanté", description: "Une jeune princesse part à l'aventure pour sauver son royaume magique.", imageFileName: "animation1.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" },
            { title: "Robots en Folie", description: "Des robots dotés d'une conscience tentent de s'intégrer dans le monde des humains.", imageFileName: "animation2.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" }
        ],
        "Documentaire": [
            { title: "Les Mystères des Abysses", description: "Une exploration fascinante des profondeurs océaniques et de ses créatures.", imageFileName: "doc1.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" },
            { title: "Sur les Traces des Géants", description: "Un documentaire sur les animaux les plus grands de la planète et leur habitat.", imageFileName: "doc2.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" }
        ],
        "Humour": [
            { title: "Témoin à louer Film complet VF (a mourir de rire)", description: "Une comédie hilarante où un homme loue un faux témoin pour son mariage, entraînant une série de quiproquos.", imageFileName: "humour1.jpg", videoUrl: "https://www.youtube.com/embed/goY_YQxYN0Y?autoplay=1" }
        ]
    };

    // Function to create a movie card HTML element
    function createMovieCard(movie) {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card'); // Reuse existing movie-card styles

        // Construire le chemin de l'image à partir du nom du fichier
        const imagePath = movie.imageFileName ? `./images/${movie.imageFileName}` : 'https://placehold.co/300x450/1F1F1F/FFFFFF?text=Affiche+Manquante';

        movieCard.innerHTML = `
            <img src="${imagePath}" alt="Affiche ${movie.title}" class="movie-poster">
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-description">${movie.description}</p>
            <button class="btn btn-small watch-btn" data-title="${movie.title}" data-videourl="${movie.videoUrl}">Regarder</button>
        `;
        return movieCard;
    }

    // Add event listeners to each category card
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category; // Get the category name from data-category attribute
            categoryDisplayTitle.textContent = `Films et Séries : ${category}`; // Update title

            // Clear previous movies
            categoryMoviesContainer.innerHTML = '';

            // Get movies for the selected category
            const films = moviesByCategory[category] || [];

            // Populate the container with movie cards
            if (films.length > 0) {
                films.forEach(movie => {
                    categoryMoviesContainer.appendChild(createMovieCard(movie));
                });
            } else {
                categoryMoviesContainer.innerHTML = `<p class="text-white-70 text-center">Aucun film trouvé pour cette catégorie pour le moment.</p>`;
            }

            // Show the category films display section
            categoryFilmsDisplaySection.classList.remove('hidden');
            // Scroll to the new section
            categoryFilmsDisplaySection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Re-attach watch button listeners after new cards are added
            attachWatchButtonListeners();
        });
    });

    // Video Modal Logic
    const videoModal = document.getElementById('video-modal');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const modalVideoTitle = document.getElementById('modal-video-title');
    const videoPlayerPlaceholder = document.querySelector('.video-player-placeholder'); // Get the placeholder div

    // Function to attach event listeners to all "Regarder" buttons
    function attachWatchButtonListeners() {
        document.querySelectorAll('.watch-btn').forEach(button => {
            button.removeEventListener('click', handleWatchButtonClick); // Prevent duplicate listeners
            button.addEventListener('click', handleWatchButtonClick);
        });
    }

    // Handler for "Regarder" button clicks
    function handleWatchButtonClick(e) {
        const movieTitle = e.target.dataset.title;
        const videoUrl = e.target.dataset.videourl; // Get the video URL from data-videourl

        modalVideoTitle.textContent = movieTitle;

        // Clear previous content in the placeholder
        videoPlayerPlaceholder.innerHTML = '';

        if (videoUrl) {
            // Create an iframe for the video
            const iframe = document.createElement('iframe');
            iframe.src = videoUrl;
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', '');
            iframe.classList.add('simulated-video-img'); // Reuse the styling for responsiveness
            videoPlayerPlaceholder.appendChild(iframe);
        } else {
            // Fallback to placeholder image if no video URL is provided
            videoPlayerPlaceholder.innerHTML = `
                <p>Ceci est un lecteur vidéo simulé pour : <span id="simulated-movie-title">${movieTitle}</span></p>
                <p>Imaginez votre film ou série préféré ici !</p>
                <img src="https://placehold.co/640x360/000000/E50914?text=LECTEUR+VIDEO+SIMULE" alt="Lecteur vidéo simulé" class="simulated-video-img">
            `;
        }

        videoModal.classList.add('visible'); // Show the modal
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }

    // Close modal when close button is clicked
    closeModalBtn.addEventListener('click', () => {
        videoModal.classList.remove('visible'); // Hide the modal
        document.body.style.overflow = ''; // Re-enable scrolling
        // Stop the video when modal is closed (important for iframes)
        videoPlayerPlaceholder.innerHTML = ''; // Clear iframe content
    });

    // Close modal when clicking outside the content
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) { // Only close if clicking on the overlay itself, not the content
            videoModal.classList.remove('visible');
            document.body.style.overflow = '';
            // Stop the video when modal is closed
            videoPlayerPlaceholder.innerHTML = ''; // Clear iframe content
        }
    });

    // Initial attachment of watch button listeners for popular movies
    attachWatchButtonListeners();
});
