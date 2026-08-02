// ==========================================================================
// KARTIK GUPTA PORTFOLIO - CYBER ENGINE SCRIPT
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // 1. Navigation & Mobile Drawer
    // ----------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll Navbar effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        highlightActiveNav();
    });

    // Mobile Hamburger
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }

    // Close mobile menu on click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });

    // Active Section Scroll Highlight
    function highlightActiveNav() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // ----------------------------------------------------------------------
    // 2. Typewriter Effect
    // ----------------------------------------------------------------------
    const textArray = [
        "AI/ML Engineer", 
        "DSA & Algorithm Specialist", 
        "Backend Systems Developer", 
        "Computer Science Scholar"
    ];
    let textIndex = 0, charIndex = 0;
    const typewriterElement = document.getElementById("typewriter");

    function type() {
        if (!typewriterElement) return;
        if (charIndex < textArray[textIndex].length) {
            typewriterElement.textContent += textArray[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 80);
        } else {
            setTimeout(erase, 2200);
        }
    }

    function erase() {
        if (!typewriterElement) return;
        if (charIndex > 0) {
            typewriterElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 40);
        } else {
            textIndex = (textIndex + 1) % textArray.length;
            setTimeout(type, 400);
        }
    }

    setTimeout(type, 600);

    // ----------------------------------------------------------------------
    // 3. Project Filter Tabs
    // ----------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.classList.remove('hide');
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 4. Copy Email & Toast Notification
    // ----------------------------------------------------------------------
    const copyBtn = document.getElementById('copy-email-btn');
    const emailText = document.getElementById('email-text');
    const toast = document.getElementById('toast');

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    if (copyBtn && emailText) {
        copyBtn.addEventListener('click', () => {
            const email = emailText.textContent.trim();
            navigator.clipboard.writeText(email).then(() => {
                showToast("Email address copied to clipboard!");
            }).catch(err => {
                showToast(`Email: ${email}`);
            });
        });
    }

    // ----------------------------------------------------------------------
    // 5. Interactive Dual-Mode Canvas Background (Neural Net + Matrix Rain)
    // ----------------------------------------------------------------------
    const canvas = document.getElementById('matrix-bg');
    const modeToggleBtn = document.getElementById('canvas-mode-toggle');
    const modeLabel = document.getElementById('mode-label');

    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let visualMode = 'neural'; // 'neural' or 'matrix'

        // Neural Net Nodes
        let particles = [];
        const particleCount = 45;
        let mouse = { x: null, y: null, radius: 120 };

        // Matrix Rain Drops
        const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ';
        const fontSize = 14;
        let columns, drops;

        function resizeCanvas() {
            if (!canvas.parentElement) return;
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
            initNeural();
            initMatrix();
        }

        // Mouse interaction for Neural Net
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        canvas.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Initialize Neural Particles
        function initNeural() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 1.2,
                    vy: (Math.random() - 0.5) * 1.2,
                    radius: Math.random() * 2 + 1.5,
                    color: Math.random() > 0.5 ? '#00ff9d' : '#00e5ff'
                });
            }
        }

        // Initialize Matrix Rain
        function initMatrix() {
            columns = Math.floor(width / fontSize);
            drops = [];
            for (let x = 0; x < columns; x++) {
                drops[x] = Math.random() * -50;
            }
        }

        // Draw Neural Network
        function drawNeural() {
            ctx.clearRect(0, 0, width, height);

            // Connect particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 255, 157, ${0.35 * (1 - dist / 110)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            // Update & draw particles
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Mouse interaction
                if (mouse.x !== null && mouse.y !== null) {
                    const mdx = p.x - mouse.x;
                    const mdy = p.y - mouse.y;
                    const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                    if (mdist < mouse.radius) {
                        const angle = Math.atan2(mdy, mdx);
                        const force = (mouse.radius - mdist) / mouse.radius;
                        p.x += Math.cos(angle) * force * 3;
                        p.y += Math.sin(angle) * force * 3;
                    }
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 8;
                ctx.shadowColor = p.color;
                ctx.fill();
                ctx.shadowBlur = 0;
            });
        }

        // Draw Matrix Digital Rain
        function drawMatrix() {
            ctx.fillStyle = 'rgba(4, 8, 14, 0.12)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#00ff9d';
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

        // Animation Loop
        function animate() {
            if (visualMode === 'neural') {
                drawNeural();
            } else {
                drawMatrix();
            }
            requestAnimationFrame(animate);
        }

        // Toggle Canvas Mode
        if (modeToggleBtn && modeLabel) {
            modeToggleBtn.addEventListener('click', () => {
                if (visualMode === 'neural') {
                    visualMode = 'matrix';
                    modeLabel.textContent = 'Mode: Matrix Rain';
                } else {
                    visualMode = 'neural';
                    modeLabel.textContent = 'Mode: Neural Net';
                }
            });
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();
    }

    // ----------------------------------------------------------------------
    // 6. Interactive CLI Terminal Drawer
    // ----------------------------------------------------------------------
    const terminalModal = document.getElementById('terminal-modal');
    const terminalToggleBtn = document.getElementById('terminal-toggle-btn');
    const heroCliBtn = document.getElementById('hero-cli-btn');
    const termCloseBtn = document.getElementById('term-close-btn');
    const terminalOverlay = document.getElementById('terminal-overlay');
    const terminalForm = document.getElementById('terminal-form');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const termThemeToggle = document.getElementById('term-theme-toggle');
    const termClearBtn = document.getElementById('term-clear-btn');

    let commandHistory = [];
    let historyIndex = -1;

    function openTerminal() {
        if (!terminalModal) return;
        terminalModal.classList.add('open');
        setTimeout(() => terminalInput.focus(), 100);
    }

    function closeTerminal() {
        if (!terminalModal) return;
        terminalModal.classList.remove('open');
    }

    if (terminalToggleBtn) terminalToggleBtn.addEventListener('click', openTerminal);
    if (heroCliBtn) heroCliBtn.addEventListener('click', openTerminal);
    if (termCloseBtn) termCloseBtn.addEventListener('click', closeTerminal);
    if (terminalOverlay) terminalOverlay.addEventListener('click', closeTerminal);

    // Keyboard Shortcuts: ~ or Ctrl+K
    window.addEventListener('keydown', (e) => {
        if (e.key === '`' || (e.ctrlKey && e.key.toLowerCase() === 'k')) {
            e.preventDefault();
            if (terminalModal.classList.contains('open')) {
                closeTerminal();
            } else {
                openTerminal();
            }
        }
        if (e.key === 'Escape' && terminalModal.classList.contains('open')) {
            closeTerminal();
        }
    });

    // Clear Terminal Output
    if (termClearBtn) {
        termClearBtn.addEventListener('click', () => {
            terminalOutput.innerHTML = '';
        });
    }

    // Toggle Theme
    let themeIndex = 0;
    const themes = ['', 'theme-cyan', 'theme-amber'];
    const themeNames = ['Cyber Emerald', 'Electric Cyan', 'Solar Amber'];
    if (termThemeToggle) {
        termThemeToggle.addEventListener('click', () => {
            document.body.classList.remove('theme-cyan', 'theme-amber');
            themeIndex = (themeIndex + 1) % themes.length;
            if (themes[themeIndex]) {
                document.body.classList.add(themes[themeIndex]);
            }
            appendTerminalOutput(`Active Palette Switched to: ${themeNames[themeIndex]}`);
        });
    }

    // Terminal Commands Interpreter
    function appendTerminalOutput(content, isCommand = false) {
        const line = document.createElement('div');
        line.className = isCommand ? 'terminal-line cmd-entry' : 'terminal-line';
        line.innerHTML = content;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function processCommand(cmd) {
        const cleanCmd = cmd.trim().toLowerCase();
        appendTerminalOutput(`kartik@cyber-core:~$ ${cmd}`, true);

        if (cleanCmd === '') return;

        commandHistory.push(cmd);
        historyIndex = commandHistory.length;

        switch (cleanCmd) {
            case 'help':
                appendTerminalOutput(`
<strong>AVAILABLE COMMANDS:</strong><br>
  <span class="cmd-highlight">about</span>     - View profile summary & focus<br>
  <span class="cmd-highlight">skills</span>    - List technical stack & categories<br>
  <span class="cmd-highlight">projects</span>  - Show featured AI & system projects<br>
  <span class="cmd-highlight">profiles</span>  - Show Codolio, GitHub & Kaggle links<br>
  <span class="cmd-highlight">contact</span>   - Get email and connection handles<br>
  <span class="cmd-highlight">resume</span>    - Open resume PDF<br>
  <span class="cmd-highlight">sudo hire</span> - Special easter egg recruitment trigger!<br>
  <span class="cmd-highlight">theme</span>     - Switch UI color theme<br>
  <span class="cmd-highlight">clear</span>     - Clear terminal screen<br>
  <span class="cmd-highlight">matrix</span>    - Toggle visualizer canvas mode
                `);
                break;

            case 'about':
                appendTerminalOutput(`
<strong>ABOUT KARTIK GUPTA:</strong><br>
Computer Science Engineering Scholar focused on AI/ML development, mathematical foundations (Linear Algebra, Calculus, Probability), and high-performance Data Structures & Algorithms in Python, C++, and Java.
                `);
                break;

            case 'skills':
                appendTerminalOutput(`
<strong>TECHNICAL STACK MATRIX:</strong><br>
🤖 <strong>AI & ML:</strong> Scikit-learn, TensorFlow, Keras, Pandas, NumPy, LLM Integration, RAG Workflows<br>
⚡ <strong>Languages:</strong> Python (Expert), Java (Expert), C++ (Proficient), JavaScript, SQL<br>
📐 <strong>DSA & Math:</strong> Graph Algorithms (BFS/DFS, Dijkstra), Dynamic Programming, Linear Algebra, Calculus<br>
🛠️ <strong>Systems & Tools:</strong> Git/GitHub, Linux/Bash, Offline-First Speech NLP, CI/CD
                `);
                break;

            case 'projects':
                appendTerminalOutput(`
<strong>FEATURED REPOSITORIES & PROJECTS:</strong><br>
1. <strong>Lead OutReach AI Agent:</strong> Autonomous LLM agent automating prospect qualification & outreach.<br>
2. <strong>OffLine Voice Assistant:</strong> Privacy-first offline desktop voice command assistant.<br>
3. <strong>Algorithmic Problem Solutions:</strong> Optimized C++/Java competitive programming algorithms.
                `);
                break;

            case 'profiles':
                appendTerminalOutput(`
<strong>ONLINE PROFILES:</strong><br>
• Codolio: <a href="https://codolio.com/profile/orignlkartik1" target="_blank" style="color: var(--accent)">codolio.com/profile/orignlkartik1</a><br>
• GitHub: <a href="https://github.com/orignlkartik1" target="_blank" style="color: var(--accent)">github.com/orignlkartik1</a><br>
• Kaggle: <a href="https://www.kaggle.com/orignlkartik1" target="_blank" style="color: var(--accent)">kaggle.com/orignlkartik1</a>
                `);
                break;

            case 'contact':
                appendTerminalOutput(`
<strong>CONTACT DETAILS:</strong><br>
📧 Email: kartik964364@gmail.com<br>
💼 LinkedIn: linkedin.com/in/orignlkartik1<br>
🐙 GitHub: github.com/orignlkartik1
                `);
                break;

            case 'resume':
                appendTerminalOutput(`Opening resume.pdf in new tab...`);
                window.open('resume.pdf', '_blank');
                break;

            case 'sudo hire':
                appendTerminalOutput(`
<span style="color: #00ff9d; font-weight: bold">🎉 [ACCESS GRANTED] 🎉</span><br>
Kartik Gupta has been added to your recruitment queue! Outstanding choice for AI/ML and Engineering positions. Reach out at kartik964364@gmail.com.
                `);
                showToast("Recruitment Easter Egg Triggered! 🚀");
                break;

            case 'clear':
                terminalOutput.innerHTML = '';
                break;

            case 'theme':
                if (termThemeToggle) termThemeToggle.click();
                break;

            case 'matrix':
                if (modeToggleBtn) modeToggleBtn.click();
                appendTerminalOutput(`Visualizer canvas mode toggled!`);
                break;

            default:
                appendTerminalOutput(`Command not found: '${cmd}'. Type <span class="cmd-highlight">'help'</span> for a list of valid commands.`);
                break;
        }
    }

    if (terminalForm && terminalInput) {
        terminalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cmd = terminalInput.value;
            processCommand(cmd);
            terminalInput.value = '';
        });

        // Command history with Up / Down arrow keys
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = commandHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    terminalInput.value = '';
                }
            }
        });
    }

});
