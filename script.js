const container = document.getElementById('bubble-container');
const popSounds = {
  blue: document.getElementById('pop-blue'),
  pink: document.getElementById('pop-pink'),
  green: document.getElementById('pop-green'),
  yellow: document.getElementById('pop-yellow'),
};

const bubbleTypes = [
  {
    color: 'blue',
    gradient: 'radial-gradient(circle at 30% 30%, #fff 0%, #a0e7e5 70%, #0099ff 100%)',
  },
  {
    color: 'pink',
    gradient: 'radial-gradient(circle at 30% 30%, #fff 0%, #ffb6e6 70%, #ff69b4 100%)',
  },
  {
    color: 'green',
    gradient: 'radial-gradient(circle at 30% 30%, #fff 0%, #b4f8c8 70%, #00cc66 100%)',
  },
  {
    color: 'yellow',
    gradient: 'radial-gradient(circle at 30% 30%, #fff 0%, #fff6b7 70%, #ffe066 100%)',
  },
];

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

  // Pick a random bubble type
  const type = bubbleTypes[Math.floor(Math.random() * bubbleTypes.length)];
  bubble.style.background = type.gradient;
  bubble.dataset.color = type.color;

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
    const color = bubble.dataset.color;
    const sound = popSounds[color];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
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