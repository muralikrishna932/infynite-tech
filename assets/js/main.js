(function () {

	"use strict";

	//===== Prealoder

	window.onload = function () {
		window.setTimeout(fadeout, 200);
	}

	function fadeout() {
		document.querySelector('.preloader').style.opacity = '0';
		document.querySelector('.preloader').style.display = 'none';
	}


	/*=====================================
	Sticky
	======================================= */
	window.onscroll = function () {
		var header_navbar = document.querySelector(".navbar-area");
		var sticky = header_navbar.offsetTop;

		if (window.pageYOffset > sticky) {
			header_navbar.classList.add("sticky");
		} else {
			header_navbar.classList.remove("sticky");
		}



		// show or hide the back-top-top button
		var backToTo = document.querySelector(".scroll-top");
		if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
			backToTo.style.display = "block";
		} else {
			backToTo.style.display = "none";
		}
	};




	//WOW Scroll Spy
	var wow = new WOW({
		//disabled for mobile
		mobile: false
	});
	wow.init();

	//====== counter up 
	var cu = new counterUp({
		start: 0,
		duration: 2000,
		intvalues: true,
		interval: 100,
	});
	cu.start();


	// for menu scroll 
	var pageLink = document.querySelectorAll('.page-scroll');

	pageLink.forEach(elem => {
		elem.addEventListener('click', e => {
			e.preventDefault();
			document.querySelector(elem.getAttribute('href')).scrollIntoView({
				behavior: 'smooth',
				offsetTop: 1 - 60,
			});
		});
	});

	// section menu active
	function onScroll(event) {
		var sections = document.querySelectorAll('.page-scroll');
		var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

		for (var i = 0; i < sections.length; i++) {
			var currLink = sections[i];
			var val = currLink.getAttribute('href');
			var refElement = document.querySelector(val);
			var scrollTopMinus = scrollPos + 73;
			if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
				document.querySelector('.page-scroll').classList.remove('active');
				currLink.classList.add('active');
			} else {
				currLink.classList.remove('active');
			}
		}
	};

	window.document.addEventListener('scroll', onScroll);


	//===== close navbar-collapse when a  clicked
	let navbarToggler = document.querySelector(".navbar-toggler");
	var navbarCollapse = document.querySelector(".navbar-collapse");

	document.querySelectorAll(".page-scroll").forEach(e =>
		e.addEventListener("click", () => {
			navbarToggler.classList.remove("active");
			navbarCollapse.classList.remove('show')
		})
	);
	navbarToggler.addEventListener('click', function () {
		navbarToggler.classList.toggle("active");
	}) 

	/*=====================================
	Portfolio Years Of Experiance Generator
	=======================================*/
	let baseYear = 2021; // Change this to when you started
	let today = new Date();
	let currentYear = today.getFullYear();
	let yearsOfExperience = currentYear - baseYear;

	// Update the span content
	document.getElementById('yearsOfExperience').textContent = yearsOfExperience + '+';


	/*=====================================
	Chatbot Configuration
	=======================================*/
	window.chtlConfig = { chatbotId: "4218465813" }


 /*=====================================
	Blog Slider
	=======================================*/
	document.addEventListener('DOMContentLoaded', function() {
    let currentPosition = 0;
    const slider = document.getElementById('slider');
    const items = document.querySelectorAll('.blog-item');
    const totalItems = items.length;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressFill = document.getElementById('progressFill');
    const progressInfo = document.getElementById('progressInfo');
    
    let itemsPerView = 4;

    function updateItemsPerView() {
        if (window.innerWidth <= 768) {
            itemsPerView = 1;
        } else if (window.innerWidth <= 992) {
            itemsPerView = 2;
        } else if (window.innerWidth <= 1200) {
            itemsPerView = 3;
        } else {
            itemsPerView = 4;
        }
        updateSlider();
    }

    // Make slide function global so onclick can access it
    window.slide = function(direction) {
        const maxPosition = totalItems - itemsPerView;
        currentPosition += direction;

        if (currentPosition < 0) currentPosition = 0;
        if (currentPosition > maxPosition) currentPosition = maxPosition;

        updateSlider();
    }

    function updateSlider() {
        if (items.length === 0) return;
        
        const itemWidth = items[0].offsetWidth;
        const gap = 25;
        const offset = currentPosition * (itemWidth + gap);
        
        slider.style.transform = `translateX(-${offset}px)`;

        // Update buttons
        const maxPosition = totalItems - itemsPerView;
        prevBtn.disabled = currentPosition === 0;
        nextBtn.disabled = currentPosition >= maxPosition;

        // Update progress
        const progress = maxPosition > 0 ? (currentPosition / maxPosition) * 100 : 0;
        progressFill.style.width = `${progress}%`;
        progressInfo.textContent = `${currentPosition + 1} / ${maxPosition + 1}`;
    }

    // Auto slide
    let autoSlideInterval = setInterval(() => {
        const maxPosition = totalItems - itemsPerView;
        if (currentPosition >= maxPosition) {
            currentPosition = -1;
        }
        window.slide(1);
    }, 4000);

    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            const maxPosition = totalItems - itemsPerView;
            if (currentPosition >= maxPosition) {
                currentPosition = -1;
            }
            window.slide(1);
        }, 4000);
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            window.slide(1);
        }
        if (touchEndX - touchStartX > 50) {
            window.slide(-1);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            window.slide(-1);
        } else if (e.key === 'ArrowRight') {
            window.slide(1);
        }
    });

    // Responsive
    window.addEventListener('resize', updateItemsPerView);
    
    // Initialize
    updateItemsPerView();
});

/*=====================================
	Contact Form Validation and CAPTCHA
=======================================*/
// ── CAPTCHA generator ──────────────────────────────────────────────
  function generateCaptcha() {
    const a = Math.floor(Math.random() * 12) + 1;
    const b = Math.floor(Math.random() * 12) + 1;
    const ops = ['+', '−', '×'];
    const opIdx = Math.floor(Math.random() * ops.length);
    let answer;
    if (opIdx === 0) answer = a + b;
    else if (opIdx === 1) answer = a - b;
    else answer = a * b;
    document.getElementById('captchaQ').textContent = `${a} ${ops[opIdx]} ${b}`;
    document.getElementById('captchaExpected').value = answer;
    document.getElementById('captchaAnswer').value = '';
  }

  generateCaptcha();

  // ── Alert helper ───────────────────────────────────────────────────
  function showAlert(type, message) {
    const alertEl = document.getElementById('alert');
    alertEl.className = '';
    alertEl.textContent = '';
    void alertEl.offsetWidth; // reflow to re-trigger animation
    alertEl.className = 'alert ' + type;
    alertEl.textContent = message;
    alertEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideAlert() {
    const alertEl = document.getElementById('alert');
    alertEl.className = 'alert';
    alertEl.textContent = '';
  }

  // ── AJAX form submission ───────────────────────────────────────────
  document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    hideAlert();

    // 1. Required field validation
    const required = ['first_name', 'last_name', 'email', 'subject', 'message'];
    let valid = true;
    required.forEach(id => {
      const el = document.getElementById(id);
      if (!el.value.trim()) {
        el.style.borderColor = '#c8502a';
        valid = false;
      } else {
        el.style.borderColor = '';
      }
    });

    if (!valid) {
      showAlert('error', '⚠  Please fill in all required fields.');
      return;
    }

    // 2. Email format
    const emailVal = document.getElementById('email').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      showAlert('error', '⚠  Please enter a valid email address.');
      document.getElementById('email').style.borderColor = '#c8502a';
      return;
    }

    // 3. CAPTCHA check
    const expected = parseInt(document.getElementById('captchaExpected').value);
    const given    = parseInt(document.getElementById('captchaAnswer').value);
    if (isNaN(given) || given !== expected) {
      showAlert('error', '⚠  Incorrect CAPTCHA answer. Please try again.');
      generateCaptcha();
      return;
    }

    // 4. Send via fetch (AJAX)
    const btn = document.querySelector('.btn-submit');
    btn.disabled = true;
    btn.innerHTML = 'Sending&hellip;';

    try {
      const response = await fetch('contact_process.php', {
        method: 'POST',
        body: new FormData(this)
      });
      const result = await response.json();

      if (result.status === 'success') {
        showAlert('success', '✓  ' + result.message);
        this.reset();
        generateCaptcha();
      } else {
        showAlert('error', '⚠  ' + result.message);
        generateCaptcha();
      }
    } catch (err) {
      showAlert('error', '⚠  Network error. Please check your connection and try again.');
    } finally {
      btn.disabled = false;
      btn.innerHTML = 'Send Message';
    }
  });

	
})();



  