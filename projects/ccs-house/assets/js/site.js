const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Portfolio copy: show feedback without opening a checkout.
document.querySelectorAll('[data-demo-order]').forEach((button) => {
  button.addEventListener('click', () => {
    const status = document.getElementById(button.getAttribute('aria-controls'));
    if (status) status.textContent = 'Demo complete! No order was placed and no payment was taken.';
  });
});

// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      toggle.click();
      toggle.focus();
    }
  });
}

// Product gallery: thumbnails swap the main photo with a quick fade
document.querySelectorAll('[data-gallery]').forEach((gallery) => {
  const main = gallery.querySelector('.gallery-main img');
  const thumbs = gallery.querySelectorAll('.thumbs button');
  thumbs.forEach((btn) => {
    btn.addEventListener('click', () => {
      thumbs.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      if (main.getAttribute('src') === btn.dataset.full) return;
      const show = () => { main.style.opacity = '1'; };
      main.style.opacity = '0';
      setTimeout(() => {
        main.addEventListener('load', show, { once: true });
        main.addEventListener('error', show, { once: true });
        main.src = btn.dataset.full;
        main.alt = btn.querySelector('img').alt;
      }, reduceMotion ? 0 : 180);
    });
  });
});

// Night-sky touches: twinkling stars, a shooting star, and the glowing window
function addDecor(el, className) {
  const d = document.createElement('div');
  d.className = className;
  d.setAttribute('aria-hidden', 'true');
  el.prepend(d);
  return d;
}
// Position of a child inside `root`, ignoring any slide-in animation (offsets skip transforms)
function boxIn(node, root) {
  if (!(node instanceof HTMLElement)) { // drawings (svg) have no offsets; measure them on screen instead
    const r = node.getBoundingClientRect(), b = root.getBoundingClientRect();
    return { l: r.left - b.left, t: r.top - b.top, r: r.right - b.left, b: r.bottom - b.top };
  }
  let x = 0, y = 0, n = node;
  while (n && n !== root) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
  return n === root ? { l: x, t: y, r: x + node.offsetWidth, b: y + node.offsetHeight } : null;
}
function addTwinkles(el, count, maxTop) {
  el.querySelectorAll(':scope > .twinkles').forEach((old) => old.remove());
  const layer = addDecor(el, 'twinkles');
  const W = el.clientWidth, H = el.clientHeight;
  // keep stars off the words, buttons and pictures
  const avoid = [...el.querySelectorAll('h1, h2, h3, p, .eyebrow, .btn, .hero-art, .soon-tile, .page-moon')]
    .map((n) => boxIn(n, el)).filter(Boolean);
  const pad = 16;
  for (let i = 0; i < count; i++) {
    const size = 6 + Math.random() * 10;
    let x, y, tries = 0, hit;
    do {
      x = Math.random() * (W - size);
      y = Math.random() * H * (maxTop / 100);
      hit = avoid.some((r) => x + size > r.l - pad && x < r.r + pad && y + size > r.t - pad && y < r.b + pad);
    } while (hit && ++tries < 30);
    if (hit) continue;
    const s = document.createElement('span');
    s.style.left = (x / W * 100).toFixed(2) + '%';
    s.style.top = (y / H * 100).toFixed(2) + '%';
    s.style.width = size.toFixed(1) + 'px';
    s.style.height = size.toFixed(1) + 'px';
    s.style.animationDelay = (Math.random() * 5).toFixed(2) + 's';
    s.style.animationDuration = (2.8 + Math.random() * 3).toFixed(2) + 's';
    layer.appendChild(s);
  }
}
function placeTwinkles() {
  document.querySelectorAll('.hero').forEach((el) => addTwinkles(el, 14, 70));
  document.querySelectorAll('.page-hero').forEach((el) => addTwinkles(el, 10, 90));
  document.querySelectorAll('.band').forEach((el) => addTwinkles(el, 10, 95));
  document.querySelectorAll('.footer-sky').forEach((el) => addTwinkles(el, 6, 55));
}
document.querySelectorAll('.hero, .footer-sky').forEach((el) => addDecor(el, 'window-glow'));
if (!reduceMotion) {
  document.querySelectorAll('.hero, .page-hero').forEach((el) => addDecor(el, 'shooting-star'));
  // wait for the fonts so the text is its final size before stars are placed around it
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(placeTwinkles);
  let lastWidth = window.innerWidth, timer;
  window.addEventListener('resize', () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    clearTimeout(timer);
    timer = setTimeout(placeTwinkles, 250);
  });
}

// Sections fade up as they scroll into view
if (!reduceMotion && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      io.unobserve(el);
      el.addEventListener('transitionend', function done(e) {
        if (e.target !== el) return;
        el.removeEventListener('transitionend', done);
        el.classList.remove('reveal', 'in');
        el.style.transitionDelay = '';
      });
      el.classList.add('in');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.section-head, .grid-products > *, .split:not(.panel) > *, .band-grid > *, .info-card, .panel, .features-row > li')
    .forEach((el) => {
      const i = [...el.parentElement.children].indexOf(el);
      el.style.transitionDelay = Math.min(i, 4) * 90 + 'ms';
      el.classList.add('reveal');
      io.observe(el);
    });
}
