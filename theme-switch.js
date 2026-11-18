(() => {
  const root = document.documentElement;
  const key = 'spencer-portfolio-theme';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const meta = document.querySelector('meta[name="theme-color"]');
  const lightChrome = meta?.content;
  let controls = [];

  function readPreference(fallback = null) {
    try {
      const saved = localStorage.getItem(key);
      return saved === 'dark' || saved === 'light' ? saved : null;
    } catch {
      return fallback;
    }
  }

  let preference = readPreference();

  function render() {
    const dark = preference ? preference === 'dark' : system.matches;
    root.dataset.theme = dark ? 'dark' : 'light';
    if (meta) meta.content = dark ? '#131c2b' : lightChrome;
    for (const control of controls) {
      control.setAttribute('aria-checked', String(dark));
    }
  }

  render();

  document.addEventListener('DOMContentLoaded', () => {
    controls = document.querySelectorAll('[data-theme-switch]');
    render();
    for (const control of controls) {
      control.addEventListener('click', () => {
        preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem(key, preference); } catch {}
        render();
      });
      control.hidden = false;
    }
  }, { once: true });

  system.addEventListener?.('change', render);
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    preference = readPreference(preference);
    render();
  });
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    preference = readPreference(preference);
    render();
  });
})();
