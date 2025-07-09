import { t } from '../i18n';

const profileContainer = document.getElementById('profile-link-container') as HTMLDivElement;

export function updateProfileLink() {
  const texts = t();
  const token = localStorage.getItem('jwtToken');
  if (token) {
    profileContainer.innerHTML = `<a href="/profile" class="text-white hover:text-indigo-400 transition-colors text-sm" data-navigate="/profile">${texts.profileLink}</a>`;
  } else {
    profileContainer.innerHTML = '';
  }
}