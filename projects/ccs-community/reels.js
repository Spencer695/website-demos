(() => {
  const videos = [...document.querySelectorAll('.reel-phone video')];
  const toggle = document.querySelector('[data-reel-toggle]');
  if (!videos.length || !toggle) return;
  const visible = new Set();
  let userPaused = false;
  let generation = 0;

  function hydrate(video) {
    if (video.dataset.hydrated) return;
    video.querySelectorAll('source[data-src]').forEach(source => {
      source.src = source.dataset.src;
      delete source.dataset.src;
    });
    video.dataset.hydrated = 'true';
    video.load();
  }

  async function syncPlayback() {
    const request = ++generation;
    const active = videos.filter(video => visible.has(video) && !userPaused && !document.hidden);
    videos.forEach(video => { if (!active.includes(video)) video.pause(); });
    toggle.textContent = userPaused ? 'Resume animations' : 'Pause animations';
    const results = await Promise.allSettled(active.map(video => {
      hydrate(video);
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
      return video.play();
    }));
    if (request === generation && active.length && !userPaused && !document.hidden && results.every(result => result.status === 'rejected')) {
      toggle.textContent = 'Play animations';
    }
  }

  toggle.addEventListener('click', () => {
    const active = videos.filter(video => visible.has(video));
    const blocked = active.length > 0 && active.every(video => video.paused);
    userPaused = !(userPaused || blocked);
    syncPlayback();
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      syncPlayback();
    }, { threshold: [0, 0.15], rootMargin: '0px 0px 60px 0px' });
    videos.forEach(video => observer.observe(video));
  } else {
    videos.forEach(video => visible.add(video));
    syncPlayback();
  }
  document.addEventListener('visibilitychange', syncPlayback);
  window.addEventListener('pagehide', () => videos.forEach(video => video.pause()));
  window.addEventListener('pageshow', syncPlayback);
})();
