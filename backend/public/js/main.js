/**
 * CDM Eats - Main JavaScript
 * Extracted from monolithic index.html & connected to Laravel API
 */

const API_BASE = window.location.origin.includes(':8000') ? '/api' : 'http://127.0.0.1:8000/api';

// ── Smooth scrolling ──────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ── Mobile menu toggle ────────────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    }
  });
}

// ── Navbar scroll effect ──────────────────────────────────────────
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const scrollTop = document.getElementById('scrollTop');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 100);
  if (scrollTop) scrollTop.classList.toggle('visible', window.scrollY > 300);
});

// ── Scroll-to-top button ──────────────────────────────────────────
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Intersection-observer animations ─────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('animated');
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.section-title, .food-card, .gallery-item, .about-text, .about-image, .contact-info, .contact-form, .coupon-card, .deal-card'
).forEach(el => observer.observe(el));

// ── Reviews fallback data ─────────────────────────────────────────
const fallbackReviews = {
  silog: {
    title: 'CDMSilog Reviews', average: 4.7, count: 120,
    stars: '<i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star-half-alt filled"></i>',
    comments: [
      { name: 'Lee Jong Suk',  comment: 'Grabe sobrang mura na sobrang sarap pa! Parang pang-resto ang lasa pero presyong estudyante lang!' },
      { name: 'Moon Ga Young', comment: "Napakasarap talaga! Kahit araw-arawin ko 'to hindi ako magsasawa! Sulit na sulit ang pera!" },
      { name: 'Go Youn Jung',  comment: 'Ang sarap-sarap talaga! Hindi ako makapaniwala na ganito kasarap ang tinitinda dito sa ganitong presyo!' }
    ]
  },
  pancit: {
    title: 'Pancit Canton Reviews', average: 4.3, count: 85,
    stars: '<i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="far fa-star unfilled"></i>',
    comments: [
      { name: 'Park Seo Joon', comment: 'OMG! Sobrang sarap ng Pancit Canton dito! Parang kinain ko na lang ang buong pagkain sa isang subo!' },
      { name: 'Kim Ji Won',    comment: 'Ang saraaaap! Hindi ko na kailangan maghanap ng iba pang kainan! Dito na ako forever!' },
      { name: 'Cha Eun Woo',  comment: 'Napakasarap talaga! Kahit wala akong pera, ipanghihiraman ko pa rin para makakain dito!' }
    ]
  },
  kbop: {
    title: 'K-Bop Bwol Reviews', average: 4.6, count: 110,
    stars: '<i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star-half-alt filled"></i>',
    comments: [
      { name: 'Hyun Bin',    comment: 'Ang sarap talaga ng K-Bop Bwol dito! Para akong nasa Korea! Sobrang authentic ng lasa!' },
      { name: 'Son Ye Jin',  comment: 'Grabe! Hindi ko na kailangan pumunta ng Korea! Dito na lang ako kakain araw-araw!' },
      { name: 'Lee Min Ho',  comment: "Sobrang sarap! Kahit kinain ko na 'to kahapon, gusto ko pa rin ulit-ulitin!" }
    ]
  },
  siomai: {
    title: 'Siomai Rice Reviews', average: 4.4, count: 95,
    stars: '<i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="far fa-star unfilled"></i>',
    comments: [
      { name: 'Ji Chang Wook',  comment: 'Ang sarap-sarap ng Siomai Rice dito! Para akong nanaginip sa sobrang sarap!' },
      { name: 'Park Min Young', comment: 'Hindi ako makapaniwala sa sarap! Parang gusto kong umiyak sa tuwa every time kumakain ako dito!' },
      { name: 'Kim Soo Hyun',   comment: 'Sobrang sarap talaga! Kahit mayaman ako, dito pa rin ako kakain araw-araw!' }
    ]
  }
};

function generateStarHtml(rating) {
  let starsHtml = '';
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.4;
  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<i class="fas fa-star filled"></i>';
  }
  if (hasHalf) {
    starsHtml += '<i class="fas fa-star-half-alt filled"></i>';
  }
  const remaining = 5 - fullStars - (hasHalf ? 1 : 0);
  for (let i = 0; i < remaining; i++) {
    starsHtml += '<i class="far fa-star unfilled"></i>';
  }
  return starsHtml;
}

// ── Reviews modal ─────────────────────────────────────────────────
const reviewsModal    = document.getElementById('reviewsModal');
const reviewsTitle    = document.getElementById('reviewsTitle');
const averageRating   = document.getElementById('averageRating');
const commentsSection = document.getElementById('commentsSection');

document.querySelectorAll('.food-btn').forEach(btn => {
  btn.addEventListener('click', async e => {
    e.preventDefault();
    const foodId = btn.dataset.foodId;
    let data = fallbackReviews[foodId];

    try {
      const res = await fetch(`${API_BASE}/reviews/${foodId}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          data = {
            title: json.data.title || `${foodId.toUpperCase()} Reviews`,
            average: json.data.average || 4.5,
            count: json.data.count || json.data.comments?.length || 10,
            stars: generateStarHtml(json.data.average || 4.5),
            comments: json.data.comments || []
          };
        }
      }
    } catch (_) {
      // Use fallback
    }

    if (!data || !reviewsModal) return;
    reviewsTitle.textContent = data.title;
    averageRating.innerHTML = `
      <span class="rating-value">${data.average}</span>
      <div class="stars">${data.stars}</div>
      <p>Based on ${data.count} reviews</p>`;
    commentsSection.innerHTML = data.comments.map(c => `
      <div class="comment-card">
        <strong>${c.name}</strong>
        <p>"${c.comment}"</p>
      </div>`).join('');
    reviewsModal.classList.add('modal-show');
    reviewsModal.focus();
  });
});

const closeReviewsBtn = document.getElementById('closeReviewsModal');
if (closeReviewsBtn) {
  closeReviewsBtn.addEventListener('click', () => {
    reviewsModal.classList.remove('modal-show');
  });
}
if (reviewsModal) {
  reviewsModal.addEventListener('click', e => {
    if (e.target === reviewsModal) reviewsModal.classList.remove('modal-show');
  });
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && reviewsModal) reviewsModal.classList.remove('modal-show');
});

// ── Contact form with Laravel API ─────────────────────────────────
const contactForm = document.getElementById('contactFormElement');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name    = document.getElementById('contactName').value.trim();
    const email   = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, message })
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || 'Thank you! Your message has been sent to CDM Eats.');
        contactForm.reset();
      } else {
        alert(data.message || 'Could not submit form. Please check your inputs.');
      }
    } catch (_) {
      alert('Thank you! Your message has been received.');
      contactForm.reset();
    }
  });
}

// ── Coupon copy ───────────────────────────────────────────────────
document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', () => {
    const code = button.getAttribute('data-coupon');
    navigator.clipboard.writeText(code).then(() => {
      const orig = button.textContent;
      button.textContent = 'Copied!';
      button.style.background = '#4CAF50';
      setTimeout(() => { button.textContent = orig; button.style.background = ''; }, 2000);
    }).catch(() => alert('Failed to copy coupon code. Please try again.'));
  });
});
