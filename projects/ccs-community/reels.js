(() => {
  const videos = [...document.querySelectorAll('.reel-phone video')];
  const toggle = document.querySelector('[data-reel-toggle]');
  let userPaused = false;

  async function start() {
    const results = await Promise.allSettled(videos.map(video => {
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
      return video.play();
    }));
    if (!userPaused && results.every(result => result.status === 'rejected')) {
      toggle.textContent = 'Play animations';
    }
  }

  toggle.addEventListener('click', () => {
    const shouldPlay = userPaused || videos.every(video => video.paused);
    userPaused = !shouldPlay;
    if (shouldPlay) {
      toggle.textContent = 'Pause animations';
      start();
    } else {
      videos.forEach(video => video.pause());
      toggle.textContent = 'Resume animations';
    }
  });

  start();
})();
