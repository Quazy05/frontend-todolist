import { renderOnboardingScreens } from './pages/onboarding.js';
import { renderStartScreen } from './pages/start.js';
import { renderLoginScreen } from './pages/login.js';
import { renderRegisterScreen } from './pages/register.js';
import { renderHomeScreen } from './pages/home.js';


const app = document.getElementById('app');

renderOnboardingScreens(app, () => {
  renderStartScreen(app, renderLoginScreen, renderRegisterScreen);
});

export function goToHomeScreen() {
  renderHomeScreen(app);
}
