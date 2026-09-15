/**
 * Spotify Web Player UI Clone Logic
 * Built for KLUsujith
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Time-Sensitive Dynamic Greeting
  const greetingEl = document.getElementById('greetingText');
  if (greetingEl) {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      greetingEl.textContent = 'Good morning';
    } else if (currentHour < 18) {
      greetingEl.textContent = 'Good afternoon';
    } else {
      greetingEl.textContent = 'Good evening';
    }
  }

  // 2. Playback State
  let isPlaying = false;
  let trackDuration = 230; // 3 mins 50 secs in seconds
  let currentSecs = 65;    // 1 min 05 secs in seconds
  let playInterval = null;
  let isMuted = false;
  let currentVolume = 0.7;

  // DOM Elements
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playPauseIcon = document.getElementById('playPauseIcon');
  const currentTimeEl = document.getElementById('currentTime');
  const totalDurationEl = document.getElementById('totalDuration');
  const playerProgress = document.getElementById('playerProgress');
  const progressContainer = document.getElementById('progressContainer');

  const playerTitle = document.getElementById('playerTitle');
  const playerArtist = document.getElementById('playerArtist');
  const playerCover = document.getElementById('playerCover');
  const likeBtn = document.getElementById('likeBtn');

  const shuffleBtn = document.getElementById('shuffleBtn');
  const repeatBtn = document.getElementById('repeatBtn');
  const muteBtn = document.getElementById('muteBtn');
  const volumeIcon = document.getElementById('volumeIcon');
  const volumeContainer = document.getElementById('volumeContainer');
  const volumeFill = document.getElementById('volumeFill');

  // Format seconds to mm:ss
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function updateProgressUI() {
    currentTimeEl.textContent = formatTime(currentSecs);
    totalDurationEl.textContent = formatTime(trackDuration);
    const pct = (currentSecs / trackDuration) * 100;
    playerProgress.style.width = `${pct}%`;
  }

  // Toggle Play / Pause
  function togglePlayPause() {
    isPlaying = !isPlaying;

    if (isPlaying) {
      playPauseIcon.classList.remove('fa-play');
      playPauseIcon.classList.add('fa-pause');

      playInterval = setInterval(() => {
        if (currentSecs < trackDuration) {
          currentSecs++;
          updateProgressUI();
        } else {
          currentSecs = 0;
          togglePlayPause();
        }
      }, 1000);
    } else {
      playPauseIcon.classList.remove('fa-pause');
      playPauseIcon.classList.add('fa-play');
      clearInterval(playInterval);
    }
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', togglePlayPause);
  }

  // Seek bar scrubber click
  if (progressContainer) {
    progressContainer.addEventListener('click', (e) => {
      const rect = progressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const pct = Math.max(0, Math.min(1, clickX / width));
      currentSecs = Math.floor(pct * trackDuration);
      updateProgressUI();
    });
  }

  // Like Track Heart Toggle
  if (likeBtn) {
    likeBtn.addEventListener('click', () => {
      likeBtn.classList.toggle('liked');
      const icon = likeBtn.querySelector('i');
      if (likeBtn.classList.contains('liked')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
      } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
      }
    });
  }

  // Shuffle & Repeat Toggle
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => shuffleBtn.classList.toggle('active'));
  }
  if (repeatBtn) {
    repeatBtn.addEventListener('click', () => repeatBtn.classList.toggle('active'));
  }

  // Volume Bar & Mute Toggle
  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      isMuted = !isMuted;
      if (isMuted) {
        volumeFill.style.width = '0%';
        volumeIcon.className = 'fa-solid fa-volume-xmark';
      } else {
        volumeFill.style.width = `${currentVolume * 100}%`;
        volumeIcon.className = currentVolume > 0.5 ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-low';
      }
    });
  }

  if (volumeContainer) {
    volumeContainer.addEventListener('click', (e) => {
      const rect = volumeContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      currentVolume = Math.max(0, Math.min(1, clickX / width));
      volumeFill.style.width = `${currentVolume * 100}%`;
      isMuted = false;
      volumeIcon.className = currentVolume > 0.5 ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-low';
    });
  }

  // Click Cards & Tiles to Play Song
  function attachPlayableListeners() {
    const playableItems = document.querySelectorAll('.tile-card, .music-card, .playlist-item');

    playableItems.forEach(item => {
      item.addEventListener('click', (e) => {
        // Prevent default navigation
        e.preventDefault();

        const title = item.dataset.title;
        const artist = item.dataset.artist;
        const cover = item.dataset.cover;

        if (title && playerTitle) playerTitle.textContent = title;
        if (artist && playerArtist) playerArtist.textContent = artist;
        if (cover && playerCover) playerCover.src = cover;

        // Reset and play
        currentSecs = 0;
        updateProgressUI();

        if (!isPlaying) {
          togglePlayPause();
        }
      });
    });
  }

  attachPlayableListeners();
  updateProgressUI();
});
