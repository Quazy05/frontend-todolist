export function renderOnboardingScreens(app, onFinish) {
  const screens = [
    {
      image: './assets/control.png',
      title: 'Kendalikan Harimu',
      text: 'Mulai atur prioritas dan wujudkan rencana secara terstruktur',
    },
    {
      image: './assets/routine.png',
      title: 'Bangun Rutinitasmu',
      text: 'Susun jadwal harian agar lebih fokus dan produktif',
    },
    {
      image: './assets/organized.png',
      title: 'Tugas Lebih Tertata',
      text: 'Kelompokkan aktivitasmu ke dalam kategori',
    },
  ];

  let index = 0;
  renderScreen();

  function renderScreen() {
    const screen = screens[index];
    app.innerHTML = `
      <div class="screen">
        <img src="${screen.image}" alt="${screen.title}" class="center-img"/>
        <h2>${screen.title}</h2>
        <p>${screen.text}</p>
        <div class="nav-buttons">
          ${index > 0 ? '<button id="backBtn" class="outline">BACK</button>' : ''}
            <button id="nextBtn" class="primary">${index === screens.length - 1 ? 'GET STARTED' : 'NEXT'}</button>
            <button id="skipBtn" class="outline">SKIP</button>
        </div>
      </div>
    `;

    document.getElementById('skipBtn').addEventListener('click', onFinish);
    if (index > 0) {
      document.getElementById('backBtn').addEventListener('click', () => {
        index--;
        renderScreen();
      });
    }
    document.getElementById('nextBtn').addEventListener('click', () => {
      if (index < screens.length - 1) {
        index++;
        renderScreen();
      } else {
        onFinish();
      }
    });
  }
}
