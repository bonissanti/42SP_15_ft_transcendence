import './styles.css';
import { router } from './core/router';
import { initLangSwitcher, updateLangSwitcher } from './components/langSwitcher';
import { updateProfileLink } from './components/profileLink';

function initializeApp() {
  updateLangSwitcher();
  updateProfileLink();
  initLangSwitcher();
  router();
}

document.addEventListener('DOMContentLoaded', initializeApp);