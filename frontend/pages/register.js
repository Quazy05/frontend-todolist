import { goToHomeScreen } from '../app.js';

export function renderRegisterScreen(app, renderStartScreen, renderLoginScreen) {
  app.innerHTML = `
    <div class="screen">
      <div class="back-container">
        <button id="backBtn" class="back-btn">←</button>
      </div>
      <h2>Register</h2>
      <input type="text" placeholder="Enter your username" id="regUsername" />
      <input type="password" placeholder="Password" id="regPassword" />
      <input type="password" placeholder="Confirm Password" id="confirmPassword" />
      <button class="primary" id="registerBtn">Register</button>
      <button class="outline">Register with Google</button>
      <p>Already have an account? <a href="#" id="goLogin">Login</a></p>
    </div>
  `;

  document.getElementById('backBtn').addEventListener('click', () => renderStartScreen(app));
  document.getElementById('goLogin').addEventListener('click', (e) => {
  e.preventDefault();
  renderLoginScreen(app, renderStartScreen, renderRegisterScreen);
});


  document.getElementById('registerBtn').addEventListener('click', () => {
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!username || !password || !confirmPassword) {
      alert('Semua kolom wajib diisi!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Konfirmasi password tidak cocok!');
      return;
    }

    // Simulasi berhasil register → lanjut ke login atau langsung home
    alert('Registrasi berhasil!');
    renderLoginScreen(app, renderStartScreen, renderRegisterScreen);
    // atau langsung ke home: goToHomeScreen();
  });
}
