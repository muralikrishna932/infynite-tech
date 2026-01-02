 let currentSlide = 0;
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');
        const totalSlides = testimonials.length;
        let autoSlideInterval;

        function showSlide(n) {
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            
            dots.forEach(dot => {
                dot.classList.remove('active');
            });

            currentSlide = (n + totalSlides) % totalSlides;
            
            testimonials[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        document.getElementById('nextBtn').addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });

        document.getElementById('prevBtn').addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideIndex = parseInt(e.target.getAttribute('data-slide'));
                showSlide(slideIndex);
                resetAutoSlide();
            });
        });

        startAutoSlide();