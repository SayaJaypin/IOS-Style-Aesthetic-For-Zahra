/**
 * LOVEU MORE, ZAHRA
 * Core JavaScript Logic
 * Features: Numpad Lock, Particles, Music Player, Parallax, Interactive Games
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Lock Screen Logic ---
    const TARGET_PIN = "07052009";
    let currentInput = "";
    let wrongAttempts = 0;

    const keys = document.querySelectorAll('.key');
    const dots = document.querySelectorAll('.dot');
    const pinMessage = document.getElementById('pin-message');
    const lockScreen = document.getElementById('lock-screen');
    const mainExperience = document.getElementById('main-experience');

    function updateDots() {
        dots.forEach((dot, index) => {
            if (index < currentInput.length) {
                dot.classList.add('filled');
            } else {
                dot.classList.remove('filled');
            }
        });
    }

    function checkPin() {
        if (currentInput === TARGET_PIN) {
            pinMessage.style.color = "#4CAF50";
            pinMessage.innerText = "Akses diberikan.";
            unlockExperience();
        } else {
            wrongAttempts++;
            currentInput = "";
            updateDots();
            
            if (wrongAttempts === 1) {
                pinMessage.innerText = "Hmm, sepertinya belum tepat.";
            } else if (wrongAttempts === 2) {
                pinMessage.innerText = "Petunjuk: hari pertama aku hadir di dunia.";
            } else {
                pinMessage.innerText = "Coba sekali lagi. Kamu pasti tahu jawabannya.";
            }

            // Shake effect
            document.querySelector('.pin-display').animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(0)' }
            ], { duration: 300 });
        }
    }

    keys.forEach(key => {
        key.addEventListener('click', () => {
            const num = key.getAttribute('data-num');
            const action = key.getAttribute('data-action');

            if (num && currentInput.length < 8) {
                currentInput += num;
                pinMessage.innerText = "";
            } else if (action === 'clear') {
                currentInput = "";
            } else if (action === 'delete') {
                currentInput = currentInput.slice(0, -1);
            }

            updateDots();

            if (currentInput.length === 8) {
                setTimeout(checkPin, 300);
            }
        });
    });

    function unlockExperience() {
        // Cinematic unlock animation
        lockScreen.style.backdropFilter = "blur(30px) brightness(1.5)";
        lockScreen.style.opacity = "0";
        
        setTimeout(() => {
            lockScreen.classList.add('hidden');
            mainExperience.classList.remove('hidden');
            initExperience();
        }, 1500);
    }

    // --- 2. Main Experience Initialization ---
    function initExperience() {
        initParticles();
        initGSAP();
        initAudio();
        initGame();
        
        // Auto play music attempt (browsers might block this without explicit user interaction)
        const audio = document.getElementById('bg-music');
        const playBtn = document.getElementById('play-pause-btn');
        audio.play().then(() => {
            playBtn.innerText = "⏸";
            document.getElementById('music-player').classList.add('playing');
        }).catch(e => console.log("Auto-play prevented by browser."));
    }

    // --- 3. Background Particles ---
    function initParticles() {
        const canvas = document.getElementById('particle-canvas');
        const colors = ['#FCE4EC', '#E3F2FD', '#FFFFFF'];
        const shapes = ['🌸', '✨', '✦', '🤍'];
        
        for (let i = 0; i < 40; i++) {
            let particle = document.createElement('div');
            particle.classList.add('particle');
            particle.innerText = shapes[Math.floor(Math.random() * shapes.length)];
            
            // Random properties
            let size = Math.random() * 15 + 10;
            let left = Math.random() * 100;
            let duration = Math.random() * 10 + 10;
            let delay = Math.random() * 5;
            
            particle.style.fontSize = `${size}px`;
            particle.style.left = `${left}vw`;
            particle.style.color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `-${delay}s`;
            
            canvas.appendChild(particle);
        }
    }

    // --- 4. Music Player Logic ---
    function initAudio() {
        const audio = document.getElementById('bg-music');
        const playBtn = document.getElementById('play-pause-btn');
        const progress = document.querySelector('.progress');
        const player = document.getElementById('music-player');

        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playBtn.innerText = "⏸";
                player.classList.add('playing');
            } else {
                audio.pause();
                playBtn.innerText = "▶";
                player.classList.remove('playing');
            }
        });

        audio.addEventListener('timeupdate', () => {
            const percent = (audio.currentTime / audio.duration) * 100;
            progress.style.width = `${percent}%`;
        });
    }

    // --- 5. GSAP Animations & Parallax ---
    function initGSAP() {
        gsap.registerPlugin(ScrollTrigger);

        // Initials Parallax effect
        document.addEventListener('mousemove', (e) => {
            const letters = document.querySelectorAll('.initial-letter');
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            letters.forEach(letter => {
                const speed = parseFloat(letter.getAttribute('data-speed'));
                gsap.to(letter, {
                    x: x * 30 * speed,
                    y: y * 30 * speed,
                    duration: 1,
                    ease: "power2.out"
                });
            });
        });

        // Chapters Fade In
        const chapters = document.querySelectorAll('.chapter');
        chapters.forEach(chap => {
            gsap.fromTo(chap, 
                { opacity: 0, y: 50 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1.5, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: chap,
                        start: "top 80%",
                    }
                }
            );
        });
    }

    // --- 6. Interactions (Gift & Wish) ---
    const giftBox = document.getElementById('gift-box');
    const giftMessage = document.getElementById('gift-message');
    
    giftBox.addEventListener('click', () => {
        giftBox.classList.add('opened');
        giftMessage.classList.remove('hidden');
        
        // Spawn extra particles around gift
        for(let i=0; i<15; i++) {
            let spark = document.createElement('div');
            spark.innerText = "✨";
            spark.style.position = "absolute";
            spark.style.left = "50%";
            spark.style.top = "50%";
            spark.style.fontSize = "20px";
            spark.style.pointerEvents = "none";
            spark.style.transition = "all 1s ease-out";
            giftBox.appendChild(spark);
            
            setTimeout(() => {
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * 100 + 50;
                spark.style.transform = `translate(${Math.cos(angle)*radius}px, ${Math.sin(angle)*radius}px)`;
                spark.style.opacity = "0";
            }, 50);
            
            setTimeout(() => spark.remove(), 1050);
        }
    }, { once: true });

    const btnWish = document.getElementById('btn-wish');
    const wishResponse = document.getElementById('wish-response');
    
    btnWish.addEventListener('click', () => {
        btnWish.style.display = "none";
        wishResponse.classList.remove('hidden');
        wishResponse.animate([{opacity: 0}, {opacity: 1}], {duration: 1000, fill: "forwards"});
    });

    // --- 7. Love Game Logic ---
    function initGame() {
        const board = document.getElementById('game-board');
        const scoreSpan = document.getElementById('game-score');
        const modalFail = document.getElementById('game-fail');
        const modalSuccess = document.getElementById('game-success');
        const btnRetry = document.getElementById('btn-retry');
        const btnUnlock = document.getElementById('btn-unlock-final');
        const finalChapter = document.getElementById('final-chapter');

        let score = 0;
        let gameActive = true;
        let spawnInterval;

        function spawnHeart() {
            if (!gameActive) return;

            const heart = document.createElement('div');
            const isCracked = Math.random() > 0.7; // 30% chance cracked
            
            heart.classList.add('game-heart');
            heart.classList.add(isCracked ? 'cracked' : 'healthy');
            
            // Random position inside board bounds (padding 40px)
            const x = Math.random() * (board.clientWidth - 80) + 20;
            const y = Math.random() * (board.clientHeight - 80) + 20;
            
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            
            // Random floating animation
            heart.animate([
                { transform: 'translateY(0) scale(0)', opacity: 0 },
                { transform: 'translateY(-20px) scale(1)', opacity: 1, offset: 0.2 },
                { transform: 'translateY(-40px) scale(1)', opacity: 1, offset: 0.8 },
                { transform: 'translateY(-60px) scale(0)', opacity: 0 }
            ], {
                duration: 3000 + Math.random() * 2000,
                easing: 'ease-in-out'
            }).onfinish = () => heart.remove();

            heart.addEventListener('click', () => {
                if (!gameActive) return;
                
                if (isCracked) {
                    gameOver();
                } else {
                    score++;
                    scoreSpan.innerText = score;
                    heart.remove();
                    
                    if (score >= 7) {
                        gameWin();
                    }
                }
            });

            board.appendChild(heart);
        }

        function startGame() {
            score = 0;
            scoreSpan.innerText = score;
            gameActive = true;
            modalFail.classList.add('hidden');
            board.innerHTML = ""; // Clear board
            spawnInterval = setInterval(spawnHeart, 800);
        }

        function gameOver() {
            gameActive = false;
            clearInterval(spawnInterval);
            modalFail.classList.remove('hidden');
        }

        function gameWin() {
            gameActive = false;
            clearInterval(spawnInterval);
            modalSuccess.classList.remove('hidden');
        }

        btnRetry.addEventListener('click', startGame);
        
        btnUnlock.addEventListener('click', () => {
            modalSuccess.classList.add('hidden');
            board.style.display = 'none';
            finalChapter.classList.remove('hidden');
            
            // Scroll to final chapter
            setTimeout(() => {
                finalChapter.scrollIntoView({ behavior: 'smooth' });
                
                // Cinematic Text Reveal
                gsap.to(".final-title", { opacity: 1, y: -20, duration: 2, delay: 0.5 });
                gsap.to(".final-text", { opacity: 1, y: -20, duration: 2, delay: 1.5 });
                
                // Sakura storm
                const sakuraContainer = document.querySelector('.sakura-storm');
                for(let i=0; i<50; i++) {
                    let petal = document.createElement('div');
                    petal.innerText = "🌸";
                    petal.style.position = "absolute";
                    petal.style.left = `${Math.random() * 100}%`;
                    petal.style.top = `-10%`;
                    petal.style.opacity = Math.random();
                    petal.style.transform = `scale(${Math.random() + 0.5})`;
                    petal.style.animation = `floatParticle ${Math.random() * 5 + 5}s linear infinite`;
                    sakuraContainer.appendChild(petal);
                }
            }, 500);
        });

        // Start game logic on load
        // intersection observer to only start game when scrolled to it
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && score === 0 && gameActive) {
                startGame();
                observer.disconnect();
            }
        });
        observer.observe(document.getElementById('game-section'));
    }
});
