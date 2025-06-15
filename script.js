document.addEventListener('DOMContentLoaded', () => {

  // GSAP Animations
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
    scale: 0.5,
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
    const maxOffset = 40;

    const baseRotation = (index - 1) * 8;
    const baseTranslateX = (index - 1) * 30;

    card.dataset.baseRotation = baseRotation;
    card.dataset.baseTranslateX = baseTranslateX;

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

  toggle?.addEventListener("click", () => {
    menu?.classList.toggle("show");
  });

  // Card Carousel (Swiper)
  const swiper = new Swiper('.mySwiper', {
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      renderBullet: function (index, className) {
        return `<span class="${className}"><span class="progress-bar"></span></span>`;
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // Resume Download
  document.getElementById('resumeBtn')?.addEventListener('click', function () {
    window.open('resources/docs/kd_resume.pdf', '_blank');
  });

  // Work Section
  const workcard = document.querySelectorAll('.card');
  const wrapper = document.querySelector('.cards-wrapper');

  function activateCard(index) {
    workcard.forEach((c, i) => {
      c.classList.toggle('active', i === index);
    });
    wrapper?.classList.remove('shift-0', 'shift-1', 'shift-2');
    wrapper?.classList.add(`shift-${index}`);
    updateToggleSymbols();
  }

  function deactivateCards() {
    workcard.forEach(c => c.classList.remove('active'));
    wrapper?.classList.remove('shift-0', 'shift-1', 'shift-2');
    updateToggleSymbols();
  }

  function updateToggleSymbols() {
    workcard.forEach(card => {
      const toggle = card.querySelector('.toggle-indicator');
      if (toggle) {
        toggle.textContent = card.classList.contains('active') ? '–' : '+';
      }
    });
  }

  workcard.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('toggle-indicator') ||
        e.target.classList.contains('close-btn')
      ) return;

      activateCard(index);
    });

    const toggle = card.querySelector('.toggle-indicator');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (card.classList.contains('active')) {
          deactivateCards();
        } else {
          activateCard(index);
        }
      });
    }

    const close = card.querySelector('.close-btn');
    if (close) {
      close.addEventListener('click', (e) => {
        e.stopPropagation();
        deactivateCards();
      });
    }
  });

  updateToggleSymbols();

});

function validateFooterForm() {
  const name = document.getElementById("footer-name").value.trim();
  const email = document.getElementById("footer-email").value.trim();
  const nameErr = document.getElementById("footer-name-error");
  const emailErr = document.getElementById("footer-email-error");

  nameErr.textContent = "";
  emailErr.textContent = "";

  let isValid = true;

  if (name === "") {
    nameErr.textContent = "Name is required.";
    isValid = false;
  }

  if (email === "" || !email.includes("@") || !email.includes(".")) {
    emailErr.textContent = "Valid email required.";
    isValid = false;
  }

  if (isValid) {
    alert("Thank you! Your message has been sent.");
    return true;
  } else {
    return false;
  }
}

function resetFooterErrors() {
  document.getElementById("footer-name-error").textContent = "";
  document.getElementById("footer-email-error").textContent = "";
}