gsap.from(".hero-title", {
    y: -100,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out"
  });
  
  gsap.from(".hero-subtitle", {
    y: 50,
    opacity: 0,
    delay: 0.5,
    duration: 1.2,
    ease: "power3.out"
  });
  
  gsap.from(".stack-card", {
    opacity: 0,
    scale:0.5,
    y: 100,
    stagger: 0.2,
    delay: 1,
    duration: 1,
    ease: "power3.out"
  });

const heroSection = document.querySelector('.hero');
const cards = document.querySelectorAll('.stack-card');

cards.forEach((card, index) => {
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let vx = 0, vy = 0;

  const friction = 0.12;
  const stiffness = 0.12;
  const maxOffset = 40; // make motion more noticeable

  // Spread cards like a fanned-out deck
  const baseRotation = (index - 1) * 8; // -8, 0, 8 for 3 cards
  const baseTranslateX = (index - 1) * 30; // -30px, 0, +30px

  // Save base values
  card.dataset.baseRotation = baseRotation;
  card.dataset.baseTranslateX = baseTranslateX;

  // Fly-in animation
  gsap.fromTo(card,
    { opacity: 0, y: 100 },
    { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 1 + index * 0.1 }
  );

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    targetX = relX * maxOffset;
    targetY = relY * maxOffset;
  });

  heroSection.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });

  function animate() {
    const dx = targetX - currentX;
    const dy = targetY - currentY;

    vx += dx * stiffness;
    vy += dy * stiffness;

    vx *= (1 - friction);
    vy *= (1 - friction);

    currentX += vx;
    currentY += vy;

    const finalTransform = `
      translate(${currentX + baseTranslateX}px, ${currentY}px)
      rotateZ(${baseRotation}deg)
    `;

    card.style.transform = finalTransform;
    requestAnimationFrame(animate);
  }

  animate();
});

// Menu toggle logic
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("show");
});

// Wait for the DOM content to load
/*document.addEventListener("DOMContentLoaded", function () {
  // Select all the about sections
  const aboutSections = document.querySelectorAll('.about-section');

  // Use GSAP to animate the sections with a delay
  gsap.fromTo(aboutSections, {
    opacity: 0,
    y: 20, // Start slightly below
  }, {
    opacity: 1,           // Fade in
    y: 0,                 // Move to original position
    delay: 1,             // Delay before starting animation
    duration: 1,          // Duration of the fade-in
    stagger: 0.5,         // Stagger animation for each section
    ease: "power3.out",   // Smooth ease effect
    repeat: -1,           // Repeat infinitely
    yoyo: true,           // Make the sections roll back and forth
    yoyoEase: "power3.inOut", // Ensure smooth rolling effect
  });
});*/






  