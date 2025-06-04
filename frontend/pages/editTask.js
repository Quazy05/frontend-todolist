import { renderHomeScreen } from './home.js';

// Fungsi utama untuk merender halaman Edit Task
export function renderEditTaskScreen(app) {
  const taskId = sessionStorage.getItem('editTaskId');
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const task = tasks.find(t => t.id == taskId);

  if (!task) {
    alert('Task not found.');
    renderHomeScreen(app);
    return;
  }

  app.innerHTML = `
    <div class="screen">
      <h2 style="margin-top: 60px;">Edit Task</h2>
      <form class="edit-task-form">
        <div class="form-group">
          <input type="text" id="taskTitle" value="${task.title}" required />
        </div>

        <div class="form-group">
          <textarea id="taskDescription" rows="3">${task.description}</textarea>
        </div>

        <div class="form-row">
          <div class="form-group half">
            <label>Date</label>
            <input type="text" id="taskDate" value="${task.date}" />
          </div>
          <div class="form-group half">
            <label>Time</label>
            <input type="text" id="taskTime" value="${task.time}" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group half">
            <label>Category</label>
            <select id="taskCategory">
              ${generateOptions(['personal', 'work', 'shopping', 'wishlist', 'birthday'], task.category)}
            </select>
          </div>
          <div class="form-group half">
            <label>Priority</label>
            <select id="taskPriority">
              ${generateOptions(['low', 'medium', 'high'], task.priority)}
            </select>
          </div>
        </div>

        <button type="submit" class="primary">Save Changes</button>
      </form>
    </div>
  `;

  // Event listener untuk submit form edit
  document.querySelector('.edit-task-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Perbarui data task berdasarkan input terbaru
    task.title = document.getElementById('taskTitle').value;
    task.description = document.getElementById('taskDescription').value;
    task.date = document.getElementById('taskDate').value;
    task.time = document.getElementById('taskTime').value;
    task.category = document.getElementById('taskCategory').value;
    task.priority = document.getElementById('taskPriority').value;

    // Simpan kembali ke localStorage
    const updatedTasks = tasks.map(t => t.id == task.id ? task : t);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Bersihkan session dan kembali ke home
    sessionStorage.removeItem('editTaskId');
    alert('Task updated successfully!');
    renderHomeScreen(app);
  });
}

// Utility: Generate HTML <option> tag dari array
function generateOptions(options, selected) {
  return options
    .map(opt => `<option value="${opt}" ${opt === selected ? 'selected' : ''}>${capitalize(opt)}</option>`)
    .join('');
}

// Utility: Kapitalisasi huruf pertama string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
