/**
 * TaskFlow - Interactive DOM App Logic
 * Designed for KLUsujith
 */

// Initial Seed Tasks if localStorage is empty
const DEFAULT_TASKS = [
  {
    id: 'task-1',
    title: 'Complete Personal Portfolio with Bootstrap 5 and Smooth Scroll',
    category: 'Work',
    priority: 'high',
    dueDate: new Date().toISOString().split('T')[0],
    completed: true,
    createdAt: Date.now() - 3600000
  },
  {
    id: 'task-2',
    title: 'Build Interactive DOM Task Manager with localStorage and Filters',
    category: 'Study',
    priority: 'high',
    dueDate: new Date().toISOString().split('T')[0],
    completed: true,
    createdAt: Date.now() - 1800000
  },
  {
    id: 'task-3',
    title: 'Integrate TVMaze REST API with Async/Await, Loading Skeletons & Modal',
    category: 'Work',
    priority: 'high',
    dueDate: '',
    completed: false,
    createdAt: Date.now() - 900000
  },
  {
    id: 'task-4',
    title: 'Clone Spotify Web Player UI with Responsive Sidebar & Audio Bar',
    category: 'Personal',
    priority: 'medium',
    dueDate: '',
    completed: false,
    createdAt: Date.now()
  }
];

// App State
let tasks = [];
let currentFilter = 'all'; // 'all' | 'active' | 'completed'
let searchQuery = '';

// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const categorySelect = document.getElementById('categorySelect');
const prioritySelect = document.getElementById('prioritySelect');
const dueDateInput = document.getElementById('dueDateInput');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const emptyTitle = document.getElementById('emptyTitle');
const emptySubtitle = document.getElementById('emptySubtitle');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const filterTabs = document.getElementById('filterTabs');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

// Stats Elements
const totalCountSpan = document.getElementById('totalCount');
const completedCountSpan = document.getElementById('completedCount');
const percentPill = document.getElementById('percentPill');
const progressFill = document.getElementById('progressFill');
const badgeAll = document.getElementById('badgeAll');
const badgeActive = document.getElementById('badgeActive');
const badgeCompleted = document.getElementById('badgeCompleted');
const currentDateBadge = document.getElementById('currentDateBadge');

// ================= INITIALIZATION =================
function initApp() {
  // Load tasks from localStorage or initialize with defaults
  const stored = localStorage.getItem('taskflow_tasks_klusujith');
  if (stored) {
    try {
      tasks = JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse localStorage data', e);
      tasks = [...DEFAULT_TASKS];
    }
  } else {
    tasks = [...DEFAULT_TASKS];
    saveToStorage();
  }

  // Set today's date badge
  if (currentDateBadge) {
    const today = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    currentDateBadge.innerHTML = `<i class="fa-regular fa-calendar"></i> ${today.toLocaleDateString('en-US', options)}`;
  }

  // Set default due date min to today
  if (dueDateInput) {
    const todayISO = new Date().toISOString().split('T')[0];
    dueDateInput.min = todayISO;
  }

  // Bind Event Listeners
  bindEvents();

  // Initial Render
  render();
}

// ================= STORAGE =================
function saveToStorage() {
  localStorage.setItem('taskflow_tasks_klusujith', JSON.stringify(tasks));
}

// ================= EVENT BINDINGS =================
function bindEvents() {
  // Task Form Submission
  taskForm.addEventListener('submit', handleAddTask);

  // Search Input with Live Filter
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    if (searchQuery.length > 0) {
      clearSearchBtn.classList.add('show');
    } else {
      clearSearchBtn.classList.remove('show');
    }
    renderTaskList();
  });

  // Clear Search Button
  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.classList.remove('show');
    renderTaskList();
  });

  // Filter Tabs
  filterTabs.addEventListener('click', (e) => {
    const tabBtn = e.target.closest('.filter-tab');
    if (!tabBtn) return;

    filterTabs.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
    tabBtn.classList.add('active');
    currentFilter = tabBtn.dataset.filter;
    renderTaskList();
  });

  // Clear Completed Tasks
  clearCompletedBtn.addEventListener('click', () => {
    const completedTasks = tasks.filter(t => t.completed);
    if (completedTasks.length === 0) return;

    if (confirm(`Remove ${completedTasks.length} completed task(s)?`)) {
      tasks = tasks.filter(t => !t.completed);
      saveToStorage();
      render();
    }
  });

  // Task List Event Delegation (Click, Delete, Edit, Toggle)
  taskList.addEventListener('click', handleTaskListClick);
}

// ================= DOM MANIPULATION HANDLERS =================

// 1. Add Task
function handleAddTask(e) {
  e.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;

  const newTask = {
    id: 'task-' + Date.now(),
    title: title,
    category: categorySelect.value,
    priority: prioritySelect.value,
    dueDate: dueDateInput.value || '',
    completed: false,
    createdAt: Date.now()
  };

  tasks.unshift(newTask);
  saveToStorage();

  // Reset form inputs
  taskForm.reset();
  prioritySelect.value = 'medium';
  categorySelect.value = 'Work';

  render();
}

// 2. Task Item Click Delegation (Toggle Checkbox, Delete, Edit)
function handleTaskListClick(e) {
  const taskItem = e.target.closest('.task-item');
  if (!taskItem) return;
  const taskId = taskItem.dataset.id;
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  // Toggle Checkbox
  if (e.target.closest('.custom-checkbox')) {
    task.completed = !task.completed;
    saveToStorage();
    render();
    return;
  }

  // Delete Task
  if (e.target.closest('.delete-btn')) {
    taskItem.style.opacity = '0';
    taskItem.style.transform = 'translateX(20px)';
    setTimeout(() => {
      tasks = tasks.filter(t => t.id !== taskId);
      saveToStorage();
      render();
    }, 200);
    return;
  }

  // Inline Edit Task Title
  if (e.target.closest('.edit-btn')) {
    const titleEl = taskItem.querySelector('.task-title');
    const isEditing = titleEl.isContentEditable;

    if (!isEditing) {
      titleEl.contentEditable = 'true';
      titleEl.focus();
      
      // Select all text
      const range = document.createRange();
      range.selectNodeContents(titleEl);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);

      const saveEdit = () => {
        titleEl.contentEditable = 'false';
        const updatedTitle = titleEl.textContent.trim();
        if (updatedTitle) {
          task.title = updatedTitle;
          saveToStorage();
          renderStats();
        } else {
          titleEl.textContent = task.title;
        }
      };

      titleEl.addEventListener('blur', saveEdit, { once: true });
      titleEl.addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter') {
          evt.preventDefault();
          titleEl.blur();
        }
        if (evt.key === 'Escape') {
          titleEl.textContent = task.title;
          titleEl.contentEditable = 'false';
        }
      });
    }
    return;
  }
}

// ================= RENDER FUNCTIONS =================

function render() {
  renderStats();
  renderTaskList();
}

// Update Badges, Counters and Progress Bar
function renderStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  totalCountSpan.textContent = total;
  completedCountSpan.textContent = completed;
  percentPill.textContent = `${pct}%`;
  progressFill.style.width = `${pct}%`;

  badgeAll.textContent = total;
  badgeActive.textContent = active;
  badgeCompleted.textContent = completed;
}

// Filter and Render Task Items into the DOM
function renderTaskList() {
  // 1. Filter by tab status
  let filtered = tasks.filter(task => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  // 2. Filter by search query
  if (searchQuery) {
    filtered = filtered.filter(task => {
      return task.title.toLowerCase().includes(searchQuery) ||
             task.category.toLowerCase().includes(searchQuery);
    });
  }

  // Clear list
  taskList.innerHTML = '';

  // Show Empty State if no tasks match
  if (filtered.length === 0) {
    emptyState.classList.remove('d-none');
    if (searchQuery) {
      emptyTitle.textContent = 'No matching tasks found';
      emptySubtitle.textContent = `No results match "${searchQuery}". Try a different term.`;
    } else if (currentFilter === 'active') {
      emptyTitle.textContent = 'All caught up!';
      emptySubtitle.textContent = 'No active tasks pending. Great work!';
    } else if (currentFilter === 'completed') {
      emptyTitle.textContent = 'No completed tasks yet';
      emptySubtitle.textContent = 'Finish a task to see it marked here.';
    } else {
      emptyTitle.textContent = 'Your task list is empty';
      emptySubtitle.textContent = 'Add your first task above to get started!';
    }
    return;
  }

  emptyState.classList.add('d-none');

  // Build and append DOM elements
  const fragment = document.createDocumentFragment();

  filtered.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;

    // Date formatting
    let dueTagHTML = '';
    if (task.dueDate) {
      const today = new Date().toISOString().split('T')[0];
      const isDueToday = task.dueDate === today;
      dueTagHTML = `
        <span class="due-tag ${isDueToday ? 'text-warning fw-bold' : ''}" title="Due Date">
          <i class="fa-regular fa-clock"></i> ${isDueToday ? 'Today' : task.dueDate}
        </span>
      `;
    }

    li.innerHTML = `
      <div class="task-left">
        <button class="custom-checkbox" aria-label="Toggle completed state">
          <i class="fa-solid fa-check"></i>
        </button>
        <div class="task-content">
          <span class="task-title">${escapeHTML(task.title)}</span>
          <div class="task-meta">
            <span class="category-tag">${escapeHTML(task.category)}</span>
            <span class="priority-tag priority-${task.priority}">${task.priority}</span>
            ${dueTagHTML}
          </div>
        </div>
      </div>
      <div class="task-actions">
        <button class="btn-icon edit-btn" title="Edit task title" aria-label="Edit title">
          <i class="fa-regular fa-pen-to-square"></i>
        </button>
        <button class="btn-icon delete-btn" title="Delete task" aria-label="Delete task">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    `;

    fragment.appendChild(li);
  });

  taskList.appendChild(fragment);
}

// Helper: Escape HTML to prevent XSS
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Run on load
document.addEventListener('DOMContentLoaded', initApp);
