/**
 * StreamPulse - REST API Explorer Application
 * Integration with TVMaze Public REST API
 * Tailored for KLUsujith
 */

// Global State
let currentShows = [];
let activeGenre = 'all';
let currentQuery = 'Stranger Things';
let debounceTimer = null;

// DOM Elements
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const showsGrid = document.getElementById('showsGrid');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const emptyState = document.getElementById('emptyState');
const resultsCount = document.getElementById('resultsCount');
const retryBtn = document.getElementById('retryBtn');
const genreFilters = document.getElementById('genreFilters');
const showModal = new bootstrap.Modal(document.getElementById('showModal'));
const modalShowTitle = document.getElementById('modalShowTitle');
const modalBody = document.getElementById('modalBody');
const modalOfficialSite = document.getElementById('modalOfficialSite');

// Fallback Poster Image SVG (data URL)
const FALLBACK_POSTER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450'%3E%3Crect width='300' height='450' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='16' fill='%2364748b' dominant-baseline='middle' text-anchor='middle'%3ENo Poster Available%3C/text%3E%3C/svg%3E";

// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  fetchShows(currentQuery);
});

// ================= EVENT LISTENERS =================
function initEventListeners() {
  // Search input with Debounce (350ms)
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length > 0) {
      clearSearchBtn.classList.remove('d-none');
    } else {
      clearSearchBtn.classList.add('d-none');
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (query.length > 0) {
        currentQuery = query;
        fetchShows(query);
      } else {
        // Fallback default query
        currentQuery = 'Breaking Bad';
        fetchShows(currentQuery);
      }
    }, 350);
  });

  // Clear search button
  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.classList.add('d-none');
    currentQuery = 'Breaking Bad';
    fetchShows(currentQuery);
  });

  // Quick tag chips
  document.querySelectorAll('.quick-tag-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.query;
      searchInput.value = q;
      clearSearchBtn.classList.remove('d-none');
      currentQuery = q;
      fetchShows(q);
    });
  });

  // Genre filter tabs
  genreFilters.addEventListener('click', (e) => {
    const pill = e.target.closest('.genre-pill');
    if (!pill) return;

    genreFilters.querySelectorAll('.genre-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    activeGenre = pill.dataset.genre;
    renderShows();
  });

  // Retry Button on error
  retryBtn.addEventListener('click', () => {
    fetchShows(currentQuery);
  });
}

// ================= API FETCH FUNCTION =================
/**
 * Asynchronous fetch using TVMaze public REST API
 * Handles Loading, Error, and Success states cleanly
 */
async function fetchShows(query) {
  // UI State: Show Loading Skeleton, Hide Error & Empty
  showState({ loading: true, error: false, empty: false, content: false });
  resultsCount.textContent = `Fetching results for "${query}"...`;

  try {
    const endpoint = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Map TVMaze items to standard schema
    currentShows = data.map(item => item.show).filter(Boolean);

    if (currentShows.length === 0) {
      showState({ loading: false, error: false, empty: true, content: false });
      resultsCount.textContent = `0 shows found for "${query}"`;
      return;
    }

    // Success State
    showState({ loading: false, error: false, empty: false, content: true });
    renderShows();

  } catch (error) {
    console.error('Fetch error:', error);
    showState({ loading: false, error: true, empty: false, content: false });
    const errMessageEl = document.getElementById('errorMessage');
    if (errMessageEl) {
      errMessageEl.textContent = `Error details: ${error.message}. Please check your network and try again.`;
    }
    resultsCount.textContent = 'Failed to load results';
  }
}

// ================= UI STATE TOGGLE =================
function showState({ loading, error, empty, content }) {
  loadingState.classList.toggle('d-none', !loading);
  errorState.classList.toggle('d-none', !error);
  emptyState.classList.toggle('d-none', !empty);
  showsGrid.classList.toggle('d-none', !content);
}

// ================= RENDER SHOW CARDS =================
function renderShows() {
  // 1. Filter by Genre if not 'all'
  let filtered = currentShows;
  if (activeGenre !== 'all') {
    filtered = currentShows.filter(show => 
      show.genres && show.genres.some(g => g.toLowerCase() === activeGenre.toLowerCase())
    );
  }

  resultsCount.textContent = `Showing ${filtered.length} of ${currentShows.length} titles`;

  if (filtered.length === 0) {
    showState({ loading: false, error: false, empty: true, content: false });
    document.getElementById('emptyMessage').textContent = `No shows match the "${activeGenre}" genre for "${currentQuery}". Try selecting "All Genres".`;
    return;
  }

  showState({ loading: false, error: false, empty: false, content: true });
  showsGrid.innerHTML = '';

  const fragment = document.createDocumentFragment();

  filtered.forEach(show => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4 col-lg-3';

    const posterUrl = show.image?.medium || show.image?.original || FALLBACK_POSTER;
    const rating = show.rating?.average ? `${show.rating.average}` : 'N/A';
    const year = show.premiered ? show.premiered.substring(0, 4) : 'TBA';
    const genres = show.genres && show.genres.length > 0 
      ? show.genres.slice(0, 2).map(g => `<span class="genre-tag">${escapeHTML(g)}</span>`).join('')
      : '<span class="genre-tag">General</span>';

    col.innerHTML = `
      <div class="show-card" data-show-id="${show.id}">
        <div class="poster-wrapper">
          <img src="${posterUrl}" alt="${escapeHTML(show.name)}" class="poster-img" loading="lazy" onerror="this.src='${FALLBACK_POSTER}'">
          <div class="card-rating-badge">
            <i class="bi bi-star-fill"></i> ${rating}
          </div>
        </div>
        <div class="show-info">
          <h2 class="show-title text-truncate" title="${escapeHTML(show.name)}">${escapeHTML(show.name)}</h2>
          <div class="show-meta">
            <span><i class="bi bi-calendar3 me-1"></i>${year}</span>
            <span>•</span>
            <span>${show.status || 'Active'}</span>
          </div>
          <div class="show-genres">
            ${genres}
          </div>
        </div>
      </div>
    `;

    // Click to open Modal
    col.querySelector('.show-card').addEventListener('click', () => openShowModal(show));

    fragment.appendChild(col);
  });

  showsGrid.appendChild(fragment);
}

// ================= MODAL DETAILS POPUP =================
function openShowModal(show) {
  modalShowTitle.textContent = show.name;

  const posterUrl = show.image?.original || show.image?.medium || FALLBACK_POSTER;
  const rating = show.rating?.average ? `${show.rating.average} / 10` : 'Not Rated';
  const genres = show.genres && show.genres.length > 0 ? show.genres.join(', ') : 'Not specified';
  const network = show.network?.name || show.webChannel?.name || 'Various / Online';
  const summary = show.summary || '<p>No description provided for this show.</p>';

  modalBody.innerHTML = `
    <div class="row g-4 align-items-center">
      <div class="col-md-5 text-center">
        <img src="${posterUrl}" alt="${escapeHTML(show.name)}" class="img-fluid rounded-3 shadow" style="max-height: 380px; object-fit: cover;" onerror="this.src='${FALLBACK_POSTER}'">
      </div>
      <div class="col-md-7">
        <div class="d-flex align-items-center gap-2 mb-2">
          <span class="badge bg-warning text-dark fw-bold"><i class="bi bi-star-fill me-1"></i>${rating}</span>
          <span class="badge bg-secondary">${show.premiered ? show.premiered.substring(0, 4) : 'TBA'}</span>
          <span class="badge bg-info text-dark">${show.status || 'Unknown'}</span>
        </div>
        <h3 class="h4 fw-bold mb-2">${escapeHTML(show.name)}</h3>
        <p class="small text-muted mb-2"><strong>Network:</strong> ${escapeHTML(network)}</p>
        <p class="small text-muted mb-3"><strong>Genres:</strong> ${escapeHTML(genres)}</p>
        <div class="show-summary small text-light-50 mb-3" style="max-height: 180px; overflow-y: auto; padding-right: 8px;">
          ${summary}
        </div>
        <div class="small text-secondary">
          <i class="bi bi-clock me-1"></i> Average Runtime: ${show.averageRuntime || show.runtime || '45'} mins
        </div>
      </div>
    </div>
  `;

  if (show.officialSite) {
    modalOfficialSite.href = show.officialSite;
    modalOfficialSite.classList.remove('d-none');
  } else if (show.url) {
    modalOfficialSite.href = show.url;
    modalOfficialSite.classList.remove('d-none');
  } else {
    modalOfficialSite.classList.add('d-none');
  }

  showModal.show();
}

// Utility: Escape HTML
function escapeHTML(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
