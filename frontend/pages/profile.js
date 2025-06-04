export function renderProfileScreen(app) {
  // Get tasks data for statistics
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const userName = localStorage.getItem('userName') || 'Kelompok 1';

  app.innerHTML = `
    <div class="profile-container">
      <!-- Header -->
      <div class="profile-header">
        <h2 class="profile-title">Profile</h2>
        
        <!-- Profile Info -->
        <div class="profile-info">
          <div class="profile-avatar">
            <div class="avatar-placeholder">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="30" fill="#333"/>
                <circle cx="30" cy="20" r="8" fill="white"/>
                <path d="M12 50c0-10 8-18 18-18s18 8 18 18" fill="white"/>
              </svg>
            </div>
          </div>
          <h3 class="profile-name" id="profileName">${userName}</h3>
          
          <div class="stats-container">
            <div class="stat-item">
              <div class="stat-number">${pendingTasks}</div>
              <div class="stat-label">Task left</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">${completedTasks}</div>
              <div class="stat-label">Task done</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Sections -->
      <div class="profile-content">
        <!-- Settings Section -->
        <div class="settings-section">
          <div class="section-title">Settings</div>
          <div class="menu-items">
            <div class="settings-item" onclick="openAppSettings()">
              <div class="settings-item-content">
                <span class="settings-icon">⚙️</span>
                <span class="settings-text">App Settings</span>
              </div>
              <span class="chevron">›</span>
            </div>
          </div>
        </div>

        <!-- Account Section -->
        <div class="account-section">
          <div class="section-title">Account</div>
          <div class="menu-items">
            <div class="settings-item" onclick="changeAccountName()">
              <div class="settings-item-content">
                <span class="settings-icon">👤</span>
                <span class="settings-text">Change account name</span>
              </div>
              <span class="chevron">›</span>
            </div>

            <div class="settings-item" onclick="changePassword()">
              <div class="settings-item-content">
                <span class="settings-icon">🔒</span>
                <span class="settings-text">Change account password</span>
              </div>
              <span class="chevron">›</span>
            </div>

            <div class="settings-item" onclick="changeAccountImage()">
              <div class="settings-item-content">
                <span class="settings-icon">🖼️</span>
                <span class="settings-text">Change account image</span>
              </div>
              <span class="chevron">›</span>
            </div>
          </div>
        </div>

        <!-- More Section -->
        <div class="more-section">
          <div class="section-title">More</div>
          <div class="menu-items">
            <div class="settings-item" onclick="aboutUs()">
              <div class="settings-item-content">
                <span class="settings-icon">ℹ️</span>
                <span class="settings-text">About US</span>
              </div>
              <span class="chevron">›</span>
            </div>

            <div class="settings-item" onclick="faq()">
              <div class="settings-item-content">
                <span class="settings-icon">❓</span>
                <span class="settings-text">FAQ</span>
              </div>
              <span class="chevron">›</span>
            </div>

            <div class="settings-item" onclick="helpFeedback()">
              <div class="settings-item-content">
                <span class="settings-icon">💬</span>
                <span class="settings-text">Help & Feedback</span>
              </div>
              <span class="chevron">›</span>
            </div>

            <div class="settings-item" onclick="supportUs()">
              <div class="settings-item-content">
                <span class="settings-icon">💝</span>
                <span class="settings-text">Support US</span>
              </div>
              <span class="chevron">›</span>
            </div>

            <div class="settings-item logout" onclick="logout()">
              <div class="settings-item-content">
                <span class="settings-icon">🚪</span>
                <span class="settings-text">Log out</span>
              </div>
              <span class="chevron">›</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Navigation -->
      <div class="bottom-nav">
        <button class="nav-btn" onclick="goToHome()">🏠<br>Home</button>
        <button class="nav-btn" onclick="goToCalendar()">📅<br>Calendar</button>
        <button class="plus-btn" onclick="openAddTask()">＋</button>
        <button class="nav-btn" onclick="goToFocus()">⏱<br>Focus</button>
        <button class="nav-btn active">👤<br>Profile</button>
      </div>
    </div>
  `;

  // Navigation functions
  window.goToHome = () => {
    import('./home.js').then(module => {
      module.renderHomeScreen(app);
    });
  };

  window.goToCalendar = () => {
    // TODO: Implement calendar screen
    console.log('Calendar clicked');
  };

  window.goToFocus = () => {
    // TODO: Implement focus screen
    console.log('Focus clicked');
  };

  window.openAddTask = () => {
    import('./addTask.js').then(module => {
      module.renderAddTaskScreen(app);
    });
  };

  // Settings functions
  window.openAppSettings = () => {
    alert('App Settings clicked');
  };

  window.changeAccountName = () => {
    const newName = prompt('Enter new account name:');
    if (newName) {
      localStorage.setItem('userName', newName); // Simpan ke localStorage
      document.getElementById('profileName').textContent = newName; // Update tampilan langsung
    }
  };

  window.changePassword = () => {
    alert('Fitur belum tersedia!');
  };

  window.changeAccountImage = () => {
    alert('Fitur belum tersedia!');
  };

  window.aboutUs = () => {
    alert('Fitur belum tersedia!');
  };

  window.faq = () => {
    alert('Fitur belum tersedia!');
  };

  window.helpFeedback = () => {
    alert('Fitur belum tersedia!');
  };

  window.supportUs = () => {
    alert('Fitur belum tersedia!');
  };

  window.logout = () => {
    if (confirm('Are you sure you want to log out?')) {
      // TODO: Clear user data and redirect to login
      alert('Logged out successfully');
    }
  };
}