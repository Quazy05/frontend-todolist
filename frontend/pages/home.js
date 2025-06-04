import { renderAddTaskScreen } from './addTask.js';
import { renderTaskDetailScreen } from './taskDetail.js';
import { renderProfileScreen } from './profile.js';
import { renderPlaceholderScreen } from './placeholder.js'; // <-- tambahkan ini

export function renderHomeScreen(app) {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  app.innerHTML = `
    <div class="home-container">

      <!-- Top Bar -->
      <div class="top-bar">
        <button class="menu-btn">☰</button>
        <h2 class="home-title">Home</h2>
        <img src="./assets/profile.png" class="profile-img" onclick="openProfile()" />
      </div>

      <!-- Task List -->
      <div class="content">
        <div class="task-list">
          ${tasks.map(task => createTaskCard(task)).join('')}
        </div>
      </div>

      <!-- Bottom Navigation -->
      <div class="bottom-nav">
        <button class="nav-btn active">🏠<br>Home</button>
        <button class="nav-btn" onclick="goToCalendar()">📅<br>Calendar</button>
        <button class="plus-btn" onclick="openAddTask()">＋</button>
        <button class="nav-btn" onclick="goToFocus()">⏱<br>Focus</button>
        <button class="nav-btn" onclick="openProfile()">👤<br>Profile</button>
      </div>
    </div>
  `;

  // Navigation functions
  window.openAddTask = () => renderAddTaskScreen(app);
  window.openProfile = () => renderProfileScreen(app);
  window.goToCalendar = () => renderPlaceholderScreen(app, 'Calendar');
  window.goToFocus = () => renderPlaceholderScreen(app, 'Focus');

  // Event listener untuk checkbox completed
  app.querySelectorAll('.complete-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const id = checkbox.getAttribute('data-id');
      const index = tasks.findIndex(t => t.id == id);
      if (index !== -1) {
        tasks[index].completed = checkbox.checked;
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    });
  });

  // Event listener untuk delete button
  app.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      e.stopPropagation(); // Agar tidak trigger detail
      deleteTask(id);
    });
  });

  // Event listener untuk task card
  app.querySelectorAll('.task-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      renderTaskDetailScreen(app, id);
    });
  });

  // Helper: Buat task card
  function createTaskCard(task) {
    return `
      <div class="task-card" data-id="${task.id}">
        <div class="task-main">
          <input type="checkbox" class="complete-checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''} onclick="event.stopPropagation()" />
          <div class="task-text">
            <div class="task-title">${task.title}</div>
            <div class="task-time">${task.date ? task.date + ' at ' + task.time : task.time}</div>
          </div>
        </div>

        <div class="task-meta">
          <span class="tag category ${task.category}">
            ${formatCategory(task.category)}
          </span>
          <span class="tag priority ${task.priority}">
            🚩 ${priorityToNumber(task.priority)}
          </span>
          <button class="delete-btn" data-id="${task.id}" onclick="event.stopPropagation()">🗑</button>
        </div>
      </div>
    `;
  }

  // Helper: Hapus task
  function deleteTask(taskId) {
    const updatedTasks = tasks.filter(task => task.id != taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    renderHomeScreen(app); // Refresh
  }

  // Helper: Format kategori
  function formatCategory(category) {
    const map = {
      personal: 'Personal',
      work: 'Work',
      shopping: 'Shopping',
      wishlist: 'Wishlist',
      birthday: 'Birthday',
      university: 'University',
      home: 'Home'
    };
    return map[category] || category;
  }

  // Helper: Konversi prioritas ke angka
  function priorityToNumber(priority) {
    switch (priority) {
      case 'low': return 1;
      case 'medium': return 2;
      case 'high': return 3;
      default: return 0;
    }
  }
}
