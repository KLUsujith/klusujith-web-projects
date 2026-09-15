# GitHub Deployment Guide for KLUsujith

This guide outlines exactly how to publish your projects to your GitHub account (**`KLUsujith`**) and host them live for free on **GitHub Pages**.

You can choose either **Option A (Single Master Repository - Recommended)** or **Option B (Separate Repositories for Each Goal)**.

---

## 🌟 Option A: Publish as One Master Repository (Easiest & Cleanest)

This hosts all 4 projects under a single live URL (`https://KLUsujith.github.io/klusujith-web-projects/`), where visitors land on your Central Showcase Portal and can click through to test any of the four live projects.

### Step 1: Create a Repository on GitHub
1. Go to [https://github.com/new](https://github.com/new).
2. Repository name: `klusujith-web-projects` (or `web-dev-projects`).
3. Set visibility to **Public**.
4. Leave "Add a README file" **unchecked** (we already created a comprehensive one).
5. Click **Create repository**.

---

### Step 2: Upload Project Files

#### Method 1: Using GitHub Desktop or Git CLI
If you have Git installed, open terminal in `C:\Users\manik\.gemini\antigravity\scratch\klusujith-web-projects`:
```bash
git init
git add .
git commit -m "feat: complete 4-project web development suite for KLUsujith"
git branch -M main
git remote add origin https://github.com/KLUsujith/klusujith-web-projects.git
git push -u origin main
```

#### Method 2: Using GitHub Web Interface (No Git installation needed!)
1. On your newly created repository page on GitHub, click **"uploading an existing file"**.
2. Drag and drop all the contents of `klusujith-web-projects` (the 4 folders: `01-personal-portfolio`, `02-interactive-task-app`, `03-rest-api-explorer`, `04-spotify-clone`, plus `index.html` and `README.md`).
3. Click **Commit changes**.

---

### Step 3: Enable GitHub Pages (Free Live Hosting)
1. On your repository page, click **Settings** (top right tab).
2. On the left sidebar, click **Pages**.
3. Under **Build and deployment** -> **Source**:
   - Select **Deploy from a branch**.
   - Branch: choose **`main`** and folder **`/(root)`**.
4. Click **Save**.
5. After ~60 seconds, your site will be live at:
   - **Central Hub**: `https://KLUsujith.github.io/klusujith-web-projects/`
   - **Portfolio**: `https://KLUsujith.github.io/klusujith-web-projects/01-personal-portfolio/`
   - **TaskFlow App**: `https://KLUsujith.github.io/klusujith-web-projects/02-interactive-task-app/`
   - **StreamPulse**: `https://KLUsujith.github.io/klusujith-web-projects/03-rest-api-explorer/`
   - **Spotify Clone**: `https://KLUsujith.github.io/klusujith-web-projects/04-spotify-clone/`

---

## 📦 Option B: Publish Each Goal as an Independent Repository

If your course, instructor, or recruiter requires 4 separate repository links:

| Goal # | Repository Name | Local Folder Path | Live URL when Pages is enabled |
|---|---|---|---|
| **Goal 1** | `personal-portfolio` | `klusujith-web-projects/01-personal-portfolio` | `https://KLUsujith.github.io/personal-portfolio/` |
| **Goal 2** | `interactive-task-app` | `klusujith-web-projects/02-interactive-task-app` | `https://KLUsujith.github.io/interactive-task-app/` |
| **Goal 3** | `rest-api-explorer` | `klusujith-web-projects/03-rest-api-explorer` | `https://KLUsujith.github.io/rest-api-explorer/` |
| **Goal 4** | `spotify-clone` | `klusujith-web-projects/04-spotify-clone` | `https://KLUsujith.github.io/spotify-clone/` |

For each repository:
1. Create a new repository on [GitHub](https://github.com/new).
2. Upload the files inside that specific goal folder.
3. In **Settings** -> **Pages**, select **Branch: main**, folder **/(root)**, and click **Save**.
4. Copy the resulting URL into your project deliverables.

---

## 📸 Capturing Screenshots for Goal 2 & Goal 4
To include screenshots in your repository documentation or submission:
1. Open the project in your browser.
2. Use **Windows + Shift + S** (Snipping Tool) to capture:
   - TaskFlow with a few completed and active tasks.
   - StreamPulse with show search results and detail modal open.
   - Spotify clone with song playing in the bottom player bar.
3. Save the images as `screenshot.png` in the respective project folder and commit to GitHub!
