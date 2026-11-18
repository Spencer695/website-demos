(() => {
  const filters = document.querySelector('.filters');
  const cards = [...document.querySelectorAll('.project[data-category]')];
  const count = document.querySelector('[data-result-count]');
  if (filters) {
    filters.hidden = false;
    filters.addEventListener('click', event => {
      const button = event.target.closest('[data-filter]');
      if (!button || !filters.contains(button)) return;
      const category = button.dataset.filter;
      filters.querySelectorAll('[data-filter]').forEach(item => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      let shown = 0;
      cards.forEach(card => {
        card.hidden = category !== 'all' && card.dataset.category !== category;
        if (!card.hidden) { shown++; card.classList.add('is-visible'); }
      });
      count.textContent = `${shown} ${shown === 1 ? 'project' : 'projects'} shown.`;
    });
  }
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    document.documentElement.classList.add('motion-ready');
  }
  document.querySelector('[data-back-top]')?.addEventListener('click', event => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
})();
