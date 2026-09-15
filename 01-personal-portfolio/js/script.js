/**
 * Portfolio JavaScript - KLUsujith
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Current Year
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 2. Navbar Scroll Style
  const navbar = document.getElementById('mainNavbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // 3. Auto-close mobile navbar on link click
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
  const navbarCollapse = document.getElementById('navbarResponsive');
  if (navbarCollapse) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      });
    });
  }

  // 4. Hero Subtitle Typing Animation Effect
  const typedTextSpan = document.getElementById('typed-text');
  if (typedTextSpan) {
    const roles = [
      'Frontend & Web Developer',
      'UI/UX & Responsive Designer',
      'JavaScript & REST API Enthusiast',
      'Continuous Problem Solver'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    const typeEffect = () => {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at end of word
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
      }

      setTimeout(typeEffect, typingSpeed);
    };

    setTimeout(typeEffect, 800);
  }

  // 5. Contact Form Client-Side Validation & Simulated Submission
  const contactForm = document.getElementById('portfolioContactForm');
  const contactAlert = document.getElementById('contactAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }

      // Successful simulated submission
      contactForm.classList.remove('was-validated');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        contactAlert.classList.remove('d-none');
        contactForm.reset();

        // Auto-hide alert after 6 seconds
        setTimeout(() => {
          contactAlert.classList.add('d-none');
        }, 6000);
      }, 1000);
    });
  }
});
