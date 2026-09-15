# TaskFlow - Interactive DOM Task Manager

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-brightgreen?style=for-the-badge&logo=github)](https://KLUsujith.github.io/interactive-task-app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-KLUsujith-181717?style=for-the-badge&logo=github)](https://github.com/KLUsujith/interactive-task-app)
[![JS](https://img.shields.io/badge/JavaScript-Vanilla_ES6+-yellow?style=for-the-badge&logo=javascript)](https://KLUsujith.github.io/interactive-task-app/)

A mini interactive productivity web application engineered purely with **Vanilla JavaScript DOM manipulation**, **CSS3**, and **HTML5**. All task state, categories, priorities, and filters persist seamlessly in browser **`localStorage`**.

---

## 🚀 Live Demo & Source Code
- **Live Hosted App**: [https://KLUsujith.github.io/interactive-task-app/](https://KLUsujith.github.io/interactive-task-app/)
- **GitHub Repository**: [https://github.com/KLUsujith/interactive-task-app](https://github.com/KLUsujith/interactive-task-app)

---

## 🎯 DOM Manipulation Techniques Implemented
1. **Dynamic Element Creation**:
   - Generates nested `<li>` task elements programmatically using `document.createElement` and `DocumentFragment` for batched, high-performance reflow-free DOM updates.
2. **Event Delegation**:
   - Single event listener on the parent container (`<ul>`) to handle checkbox clicks, edit button activations, and deletion events without memory leaks.
3. **Inline Title Editing**:
   - Dynamically sets `contenteditable="true"` on the title node, focuses and selects range, handling both `Enter` (save) and `Escape` (cancel) keyboard shortcuts.
4. **Live Search & Filter Operations**:
   - Intercepts input events in real time to filter and update DOM nodes dynamically with zero page reloads.
5. **Real-time Stat Calculation**:
   - Reactively computes completion percentage, updates progress bar CSS width dynamically, and updates status count badges.
6. **Persistence**:
   - Auto-synchronizes application state with browser `localStorage` on every create, edit, toggle, or delete action.

---

## 💡 Key Features
- 📝 **Create Tasks**: Title, category (Work, Personal, Study, Urgent), priority flag (High, Medium, Low), and due date.
- ✅ **Toggle Status**: Interactive checkbox with strikethrough animation and progress bar update.
- ✏️ **Inline Editing**: Click the pen icon to edit task text directly in-place.
- 🔍 **Live Search**: Instant substring filtering across task titles and categories.
- 📑 **Filter Tabs**: Toggle between All, Active, and Completed views.
- 📊 **Visual Progress Bar**: Real-time percentage tracking of completed vs. total items.
- 🗑️ **Batch Actions**: One-click "Clear Completed" button.
- 📱 **Mobile-First Responsive Layout**: Optimized for both handheld phones and desktop monitors.

---

## 📂 Project Structure
```
02-interactive-task-app/
├── index.html          # Semantic HTML structure & template elements
├── css/
│   └── style.css       # Dark modern GitHub-inspired UI theme
├── js/
│   └── app.js          # Pure Vanilla DOM manipulation & state engine
└── README.md           # Documentation, live demo & source links
```

---

## ⚡ Quick Start
1. Clone the repository:
   ```bash
   git clone https://github.com/KLUsujith/interactive-task-app.git
   ```
2. Open `index.html` in any web browser.
