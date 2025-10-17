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
    // Effet de secousse sur le tagline
    const tagline = document.querySelector('.tagline');
    makeTextShake(tagline);

    // Effet arc-en-ciel sur la blague
    const joke = document.querySelector('.joke');
    makeRainbowText(joke);

    // Effet de rebond au survol sur la punchline
    const punchline = document.querySelector('.punchline');
    makeBouncyHover(punchline);

    // Effet de vague sur le texte de construction
    const construction = document.querySelector('.construction p');
    makeWaveEffect(construction);

    // Effet 3D sur le titre principal
    const title = document.querySelector('h1');
    make3DSpinning(title);

    // Ajouter des emojis flottants
    addFloatingEmojis();
});