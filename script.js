// Fonction pour faire "vibrer" le texte
function makeTextShake(element) {
    const originalText = element.textContent;
    setInterval(() => {
        element.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px) rotate(${Math.random() * 4 - 2}deg)`;
    }, 100);
}

// Fonction pour faire "arc-en-ciel" le texte
function makeRainbowText(element) {
    const text = element.textContent;
    element.innerHTML = text.split('').map(char => 
        `<span class="rainbow-letter">${char}</span>`
    ).join('');
    
    const letters = element.querySelectorAll('.rainbow-letter');
    letters.forEach((letter, i) => {
        letter.style.animationDelay = `${i * 0.1}s`;
    });
}

// Fonction pour faire "rebondir" les lettres au survol
function makeBouncyHover(element) {
    const letters = element.textContent.split('');
    element.innerHTML = letters.map(letter => 
        `<span class="bouncy-letter">${letter}</span>`
    ).join('');

    element.querySelectorAll('.bouncy-letter').forEach(span => {
        span.addEventListener('mouseover', () => {
            span.style.animation = 'none';
            span.offsetHeight; // Force reflow
            span.style.animation = 'letterPop 0.5s ease';
        });
    });
}

// Fonction pour créer un effet de "vague" sur le texte
function makeWaveEffect(element) {
    const text = element.textContent;
    element.innerHTML = text.split('').map(char => 
        `<span class="wave-letter">${char}</span>`
    ).join('');
    
    const letters = element.querySelectorAll('.wave-letter');
    letters.forEach((letter, i) => {
        letter.style.animationDelay = `${i * 0.1}s`;
        letter.style.display = 'inline-block';
    });
}

// Fonction pour faire "tourner" le texte en 3D
function make3DSpinning(element) {
    element.classList.add('spin-3d');
    element.style.transformStyle = 'preserve-3d';
    element.style.perspective = '1000px';
}

// Effet disco sur le texte
function makeDiscoText(element) {
    setInterval(() => {
        const hue = Math.random() * 360;
        const size = 1 + Math.random() * 0.2;
        element.style.filter = `hue-rotate(${hue}deg)`;
        element.style.transform = `scale(${size})`;
    }, 200);
}

// Effet de rotation folle
function makeCrazyRotation(element) {
    let angle = 0;
    setInterval(() => {
        angle += Math.random() * 10 - 5;
        element.style.transform = `rotate(${angle}deg)`;
    }, 100);
}

// Effet de danse
function makeDanceText(element) {
    setInterval(() => {
        const x = Math.random() * 10 - 5;
        const y = Math.random() * 10 - 5;
        const rotation = Math.random() * 20 - 10;
        element.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
    }, 150);
}

// Fonction pour ajouter des emojis volants
function addFloatingEmojis() {
    const emojis = ['🎯', '😅', '🎨', '✨', '🚀', '🌈'];
    const container = document.querySelector('.container');
    
    setInterval(() => {
        const emoji = document.createElement('span');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.className = 'floating-emoji';
        emoji.style.left = Math.random() * 100 + 'vw';
        container.appendChild(emoji);
        
        setTimeout(() => emoji.remove(), 5000);
    }, 2000);
}

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    // Effet arc-en-ciel sur la question uniquement (pas la punchline)
    const joke = document.querySelector('.joke');
    if (joke) makeRainbowText(joke);

    // Effet global sur la punchline pour garder les espaces
    const punchline = document.querySelector('.punchline');
    if (punchline) punchline.classList.add('move-text');

    // Effet de danse sur le tagline
    const tagline = document.querySelector('.tagline');
    makeDanceText(tagline);

    // Effet disco sur la construction text
    const constructionText = document.querySelector('.construction-text .text');
    makeDiscoText(constructionText);

    // Effet de translation douce sur le petit texte (préserver les espaces et ne pas transformer en spans)
    const smallText = document.querySelector('.small-text');
    if (smallText) {
        smallText.classList.add('move-text');
    }

    // Effet 3D sur le titre principal avec lettres individuelles
    const titleLetters = document.querySelectorAll('h1 span');
    titleLetters.forEach((letter, index) => {
        letter.style.display = 'inline-block';
        letter.style.animation = `spin3D 2s infinite ${index * 0.1}s`;
    });

    // Ajouter des emojis flottants
    addFloatingEmojis();

    // Ajouter des effets de survol sur tous les textes sauf .small-text
    document.querySelectorAll('p, span, h1').forEach(element => {
        if (!element.classList.contains('small-text')) {
            element.addEventListener('mouseover', () => {
                element.style.animation = 'none';
                element.offsetHeight;
                element.style.animation = 'letterPop 0.5s ease';
            });
        }
    });
});