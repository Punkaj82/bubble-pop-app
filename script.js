const container = document.getElementById('bubble-container');
const popSound = document.getElementById('pop-sound');

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createBubble() {
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  const size = randomBetween(40, 100);
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${randomBetween(0, container.offsetWidth - size)}px`;
  bubble.style.bottom = '-100px';
  bubble.style.background = `radial-gradient(circle at 30% 30%, #fff 0%, hsl(${randomBetween(160, 300)}, 70%, 80%) 70%, hsl(${randomBetween(120, 200)}, 80%, 70%) 100%)`;

  // Animate bubble upward
  const duration = randomBetween(4000, 8000);
  bubble.animate([
    { bottom: '-100px' },
    { bottom: `${container.offsetHeight + 100}px` }
  ], {
    duration: duration,
    easing: 'linear',
    fill: 'forwards'
  });

  // Remove bubble when animation ends
  setTimeout(() => {
    if (bubble.parentNode) bubble.remove();
  }, duration);

  // Pop on click/tap
  bubble.addEventListener('pointerdown', () => {
    popSound.currentTime = 0;
    popSound.play();
    bubble.remove();
  });

  container.appendChild(bubble);
}

// Generate bubbles at intervals
setInterval(createBubble, 700);

// Responsive: update container size on resize
window.addEventListener('resize', () => {
  // No-op, but could be used for more advanced layouts
}); 