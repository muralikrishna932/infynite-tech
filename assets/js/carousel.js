let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.dot');
        const totalSlides = slides.length;
        let autoSlideInterval;

        function showSlide(index) {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Wrap around
            if (index >= totalSlides) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = totalSlides - 1;
            } else {
                currentSlide = index;
            }

            // Add active class to current slide and dot
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function changeSlide(direction) {
            showSlide(currentSlide + direction);
            resetAutoSlide();
        }

        function goToSlide(index) {
            showSlide(index);
            resetAutoSlide();
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                changeSlide(1);
            }, 6000); // Change slide every 6 seconds
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                changeSlide(-1);
            } else if (e.key === 'ArrowRight') {
                changeSlide(1);
            }
        });

        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                changeSlide(1);
            }
            if (touchEndX - touchStartX > 50) {
                changeSlide(-1);
            }
        });

        // Initialize
        startAutoSlide();

        // Pause on hover
        const carouselWrapper = document.querySelector('.carousel-wrapper');
        
        carouselWrapper.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        carouselWrapper.addEventListener('mouseleave', () => {
            startAutoSlide();
        });