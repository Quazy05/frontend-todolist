import { renderHomeScreen } from './home.js';
import { renderEditTaskScreen } from './editTask.js'; // Pastikan file ini sudah dibuat

// Fungsi utama untuk menampilkan detail task berdasarkan ID
export function renderTaskDetailScreen(app, taskId) {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const task = tasks.find(t => t.id == taskId);

  if (!task) {
    alert('Task not found!');
    return renderHomeScreen(app);
  }

  app.innerHTML = `
    <div class="task-detail-screen">
      <h2>Task Detail</h2>

      <div class="task-detail-card">
        <p><strong>Title:</strong> ${task.title}</p>
        <p><strong>Description:</strong> ${task.description || '-'}</p>
        <p><strong>Date:</strong> ${task.date}</p>
        <p><strong>Time:</strong> ${task.time}</p>
        <p><strong>Category:</strong> ${task.category}</p>
        <p><strong>Priority:</strong> ${task.priority}</p>
        <p><strong>Completed:</strong> ${task.completed ? 'Yes' : 'No'}</p>
      </div>

      <div class="task-detail-actions">
        <button class="primary" onclick="editTask(${task.id})">✏️ Edit</button>
        <button class="secondary" onclick="goBackToHome()">← Back</button>
      </div>
    </div>
  `;

  // Fungsi global untuk tombol edit
  window.editTask = (taskId) => {
    sessionStorage.setItem('editTaskId', taskId);
    renderEditTaskScreen(app);
  };

  // Fungsi global untuk kembali ke home
  window.goBackToHome = () => {
    renderHomeScreen(app);
  };
}
