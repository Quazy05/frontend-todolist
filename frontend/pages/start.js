export function renderStartScreen(app, renderLogin, renderRegister) {
  app.innerHTML = `
    <div class="screen">
      <h2>Siap Jadi Lebih Teratur?</h2>
      <p>Silakan masuk atau daftar akun baru untuk mulai menggunakan List-iN</p>
      <button class="primary" id="loginBtn">LOGIN</button>
      <button class="outline" id="registerBtn">CREATE ACCOUNT</button>
    </div>
  `;

  document.getElementById('loginBtn').addEventListener('click', () => renderLogin(app, renderStartScreen, renderRegister));
  document.getElementById('registerBtn').addEventListener('click', () => renderRegister(app, renderStartScreen, renderLogin));
}
