import { renderDatePicker } from './datePicker.js';
import { renderTimePicker } from './timePicker.js';
import { renderHomeScreen } from './home.js';

export function renderAddTaskScreen(app) {
  app.innerHTML = `
    <div class="screen">

      <!-- Tombol Kembali -->
      <div class="back-container">
        <button class="back-btn" onclick="goBackToHome()">←</button>
      </div>

      <h2 class="title">Add Task</h2>

      <form class="add-task-form">
        <!-- Judul Tugas -->
        <div class="form-group">
          <input type="text" id="taskTitle" placeholder="Task title" required />
        </div>

        <!-- Deskripsi Tugas -->
        <div class="form-group">
          <textarea id="taskDescription" placeholder="Task description" rows="3"></textarea>
        </div>

        <!-- Tanggal & Waktu -->
        <div class="form-row">
          <div class="form-group half">
            <label>Date</label>
            <div class="input-with-icon" onclick="openDatePicker()">
              <input type="text" id="taskDate" placeholder="Select date" readonly />
              <span class="icon">📅</span>
            </div>
          </div>

          <div class="form-group half">
            <label>Time</label>
            <div class="input-with-icon" onclick="openTimePicker()">
              <input type="text" id="taskTime" placeholder="Select time" readonly />
              <span class="icon">🕐</span>
            </div>
          </div>
        </div>

        <!-- Kategori & Prioritas -->
        <div class="form-row">
          <div class="form-group half">
            <label>Category</label>
            <select id="taskCategory">
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="shopping">Shopping</option>
              <option value="wishlist">Wishlist</option>
              <option value="birthday">Birthday</option>
            </select>
          </div>

          <div class="form-group half">
            <label>Priority</label>
            <select id="taskPriority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <!-- Tombol Submit -->
        <button type="submit" class="primary create-task-btn">Create Task</button>
      </form>
    </div>
  `;

  // Restore data form (jika ada)
  restoreFormFromSession();

  // Tambahkan event listener form submit
  const form = document.querySelector('.add-task-form');
  form.addEventListener('submit', handleTaskSubmit);

  // Fungsi global navigasi
  window.goBackToHome = () => renderHomeScreen(app);

  window.openDatePicker = () => {
    saveFormToSession();
    renderDatePicker(app, renderAddTaskScreen);
  };

  window.openTimePicker = () => {
    saveFormToSession();
    renderTimePicker(app, renderAddTaskScreen);
  };
}

// ⬇️ Handle submit form tugas
function handleTaskSubmit(e) {
  e.preventDefault();

  const task = {
    id: Date.now(),
    title: document.getElementById('taskTitle').value,
    description: document.getElementById('taskDescription').value,
    date: document.getElementById('taskDate').value,
    time: document.getElementById('taskTime').value,
    category: document.getElementById('taskCategory').value,
    priority: document.getElementById('taskPriority').value,
    completed: false,
    createdAt: new Date().toISOString()
  };

  // Simpan ke localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Hapus cache form
  sessionStorage.removeItem('taskFormData');

  alert('Task created successfully!');
  renderHomeScreen(document.getElementById('app'));
}

// ⬇️ Ambil data dari form
function getFormData() {
  return {
    title: document.getElementById('taskTitle')?.value || '',
    description: document.getElementById('taskDescription')?.value || '',
    date: document.getElementById('taskDate')?.value || '',
    time: document.getElementById('taskTime')?.value || '',
    category: document.getElementById('taskCategory')?.value || 'personal',
    priority: document.getElementById('taskPriority')?.value || 'low'
  };
}

// ⬇️ Simpan form sementara ke session
function saveFormToSession() {
  const data = getFormData();
  sessionStorage.setItem('taskFormData', JSON.stringify(data));
}

// ⬇️ Muat kembali form dari session (jika ada)
function restoreFormFromSession() {
  const saved = JSON.parse(sessionStorage.getItem('taskFormData') || '{}');
  document.getElementById('taskTitle').value = saved.title || '';
  document.getElementById('taskDescription').value = saved.description || '';
  document.getElementById('taskDate').value = saved.date || '';
  document.getElementById('taskTime').value = saved.time || '';
  document.getElementById('taskCategory').value = saved.category || 'personal';
  document.getElementById('taskPriority').value = saved.priority || 'low';
}
