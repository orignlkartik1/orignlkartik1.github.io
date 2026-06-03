const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const scrollTopButton = document.querySelector('.scroll-top');
const contactForm = document.querySelector('#contact-form');
const formFeedback = document.querySelector('.form-feedback');
const progressBars = document.querySelectorAll('.progress-bar span');
const revealElements = document.querySelectorAll('.section, .glass-panel, .project-card, .timeline-item');

navToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  const offsetPosition = window.pageYOffset + 160;
  const sections = document.querySelectorAll('main section[id]');
  let currentSection = 'home';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (offsetPosition >= sectionTop) {
      currentSection = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
  });

  scrollTopButton.classList.toggle('visible', window.pageYOffset > 400);
});

scrollTopButton?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

revealElements.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          const value = Number(bar.dataset.progress || 0);
          bar.style.width = `${value}%`;
        });
        skillObserver.disconnect();
      }
    });
  }, { threshold: 0.25 });
  skillObserver.observe(skillsSection);
}

const typingText = document.querySelector('.typing-text');
const roleWords = ['Backend Developer', 'Systems Thinker', 'Security Enthusiast', 'Full-Stack Builder'];
let roleIndex = 0;
let charIndex = 0;
let typingForward = true;

function updateTyping() {
  if (!typingText) return;
  const currentText = roleWords[roleIndex];
  typingText.textContent = currentText.slice(0, charIndex);

  if (typingForward) {
    if (charIndex < currentText.length) {
      charIndex += 1;
      setTimeout(updateTyping, 100);
    } else {
      typingForward = false;
      setTimeout(updateTyping, 1800);
    }
  } else {
    if (charIndex > 0) {
      charIndex -= 1;
      setTimeout(updateTyping, 50);
    } else {
      typingForward = true;
      roleIndex = (roleIndex + 1) % roleWords.length;
      setTimeout(updateTyping, 400);
    }
  }
}

window.addEventListener('load', updateTyping);

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = contactForm.querySelector('#name');
  const email = contactForm.querySelector('#email');
  const message = contactForm.querySelector('#message');

  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    formFeedback.textContent = 'Please complete all fields before sending.';
    return;
  }

  if (!email.validity.valid) {
    formFeedback.textContent = 'Please enter a valid email address.';
    return;
  }

  formFeedback.textContent = 'Thanks for reaching out! I will get back to you soon.';
  contactForm.reset();
});

const yearElement = document.getElementById('current-year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
