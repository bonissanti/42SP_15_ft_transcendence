import { getCurrentLanguage, toggleLanguage } from '../i18n';
import { router } from '../core/router';
import { updateProfileLink } from './profileLink';

const langContainer = document.getElementById('lang-switcher-container') as HTMLDivElement;

export function updateLangSwitcher() {
  const lang = getCurrentLanguage();
  langContainer.innerHTML = `
    <button class="bg-gray-700 p-2 rounded-md border-2 border-white text-sm hover:bg-indigo-600 transition-colors">
      ${lang}
    </button>
  `;
}

export function initLangSwitcher() {
  langContainer.addEventListener('click', () => {
    toggleLanguage();
    updateLangSwitcher();
    updateProfileLink();
    router();
  });
}