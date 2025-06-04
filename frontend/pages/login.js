import { goToHomeScreen } from '../app.js';

export function renderLoginScreen(app, renderStartScreen, renderRegisterScreen) {
  app.innerHTML = `
    <div class="screen">
      <div class="back-container">
        <button id="backBtn" class="back-btn">←</button>
      </div>
      <h2>Login</h2>
      <input type="text" placeholder="Enter your username" id="username" />
      <input type="password" placeholder="Password" id="password" />
      <button class="primary" id="loginBtn">Login</button>
      <button class="outline">Login with Google</button>
      <p>Don't have an account? <a href="#" id="goRegister">Register</a></p>
    </div>
  `;

  document.getElementById('backBtn').addEventListener('click', () => renderStartScreen(app));
  document.getElementById('goRegister').addEventListener('click', (e) => {
  e.preventDefault(); // Hentikan reload
  renderRegisterScreen(app, renderStartScreen, renderLoginScreen);
  });

  document.getElementById('loginBtn').addEventListener('click', () => {
    // Simulasi login berhasil (bisa diganti validasi nanti)
    goToHomeScreen();
  });
}
