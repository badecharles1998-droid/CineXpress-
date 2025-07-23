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
});
