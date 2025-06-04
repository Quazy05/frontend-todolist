export function renderPlaceholderScreen(app, featureName) {
  app.innerHTML = `
    <div class="placeholder-screen">
      <h2>${featureName}</h2>
      <p>Maaf, fitur ini belum tersedia.</p>
      <button onclick="goBackHome()">Kembali ke Home</button>
    </div>
  `;

  window.goBackHome = () => {
    import('./home.js').then(module => module.renderHomeScreen(app));
  };
}
