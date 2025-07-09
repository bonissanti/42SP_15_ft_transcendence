import { initPongGame } from '../pong/game';
import { initRpsGame } from '../rps/game';
import { showProfile } from '../pages/profile';

export const routes = [
  { path: '/login', view: 'login' },
  { path: '/', view: 'mainMenu' },
  { path: '/pong', view: 'pongModeSelection' },
  { path: '/pong/singleplayer', view: 'pongGame', action: () => initPongGame('singleplayer') },
  { path: '/pong/multiplayer', view: 'pongGame', action: () => initPongGame('multiplayer') },
  { path: '/rps', view: 'rps', action: initRpsGame },
  { path: '/creators', view: 'creators' },
  { path: '/profile', view: 'profile', action: showProfile },
];