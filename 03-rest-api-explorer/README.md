# StreamPulse - REST API Movie & TV Explorer

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-brightgreen?style=for-the-badge&logo=github)](https://KLUsujith.github.io/rest-api-explorer/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-KLUsujith-181717?style=for-the-badge&logo=github)](https://github.com/KLUsujith/rest-api-explorer)
[![API](https://img.shields.io/badge/API-TVMaze_REST_API-0ea5e9?style=for-the-badge)](https://www.tvmaze.com/api)

A dynamic web application fetching real-time TV shows, movies, ratings, and genre metadata via the public **TVMaze REST API** using the modern asynchronous **Fetch API** (`async/await`).

---

## 🚀 Live Demo & Source Code
- **Live Hosted Project**: [https://KLUsujith.github.io/rest-api-explorer/](https://KLUsujith.github.io/rest-api-explorer/)
- **GitHub Repository**: [https://github.com/KLUsujith/rest-api-explorer](https://github.com/KLUsujith/rest-api-explorer)

---

## 📖 API Write-Up & Technical Documentation

### 1. About the API
- **API Provider**: [TVMaze REST API](https://www.tvmaze.com/api)
- **Endpoint Used**: `GET https://api.tvmaze.com/search/shows?q={query}`
- **Authentication**: Free, Open Access (No API key or token required, eliminating rate-limit dropouts and key expiration issues).
- **Data Format**: JSON (`application/json`)

### 2. Schema Returned by API
Each record returned contains:
- `show.id`: Unique integer identifier.
- `show.name`: Series or film title.
- `show.genres`: Array of genre strings (e.g. `["Drama", "Sci-Fi", "Action"]`).
- `show.rating.average`: Decimal rating score out of 10.
- `show.premiered`: Premiere release date (YYYY-MM-DD).
- `show.image`: High-res poster URLs (`medium` & `original`).
- `show.summary`: Formatted HTML synopsis and story arc.
- `show.officialSite`: Direct URL to broadcaster or streaming service.

### 3. Asynchronous Data Handling & UI States
- **Debounced Search**: Text inputs trigger an asynchronous fetch with a 350ms debounce window to prevent redundant network requests.
- **Loading State**: Animated CSS shimmer skeleton cards display while the HTTP promise is pending.
- **Error State**: Caught fetch rejections or non-200 HTTP statuses trigger a user-friendly error banner with an interactive **"Try Again"** retry button.
- **Empty State**: Displays contextual feedback if no records match the query or selected genre filter.
- **Genre Filter (Bonus)**: Client-side filtering across Action, Drama, Comedy, Sci-Fi, Crime, Thriller, and Animation.
- **Modal Popup**: Shows comprehensive overview details, networks, runtimes, and links.

---

## 🛠️ Tech Stack
- **HTML5 & CSS3**: Modern dark streaming palette with glassmorphism and custom scrollbars.
- **Bootstrap 5.3**: Responsive container grid, modal system, and utility classes.
- **Fetch API (ES6+)**: `async/await`, `try/catch/finally` error boundaries, and debounce timers.

---

## 📂 Project Structure
```
03-rest-api-explorer/
├── index.html          # Semantic layout, search bar, filter pills, modal
├── css/
│   └── style.css       # Dark streaming theme, skeleton shimmer animations
├── js/
│   └── app.js          # Fetch API integration, error state, genre filter
└── README.md           # API write-up, data schema, and demo links
```

---

## ⚡ Quick Start
1. Clone the repository:
   ```bash
   git clone https://github.com/KLUsujith/rest-api-explorer.git
   ```
2. Open `index.html` in your browser. No build tools or Node server required!
