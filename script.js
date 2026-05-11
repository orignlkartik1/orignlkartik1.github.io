// 1. Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// 2. Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .stat-card, .about-card').forEach(el => {
    observer.observe(el);
});

// 3. Update active nav link based on scroll position 
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#00ff41'; // Matrix Green
        } else {
            link.style.color = '#6b8f71'; // Muted Green
        }
    });
});

// 4. Add stagger animation to cards
const cards = document.querySelectorAll('.project-card, .stat-card, .about-card');
cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// 5. Typewriter Effect
const textArray = ["Software_Engineer", "Algorithm_Specialist", "Backend_Dev"];
let textIndex = 0, charIndex = 0;
const typewriterElement = document.getElementById("typewriter");

function type() {
    if (charIndex < textArray[textIndex].length) {
        typewriterElement.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typewriterElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 500);
    }
}
document.addEventListener("DOMContentLoaded", () => setTimeout(type, 1000));

// 6. Matrix Digital Rain Background (Confined to Hero Section)
const canvas = document.getElementById('matrix-bg');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;

    const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    let columns, drops;

    function initMatrix() {
        // Scopes the canvas size exactly to its parent container (.hero-visual)
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
        columns = Math.floor(width / fontSize);
        drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(3, 10, 3, 0.1)'; 
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#00ff41'; 
        ctx.font = fontSize + 'px "JetBrains Mono", monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    window.addEventListener('resize', initMatrix);
    initMatrix();
    setInterval(drawMatrix, 50); 
}
