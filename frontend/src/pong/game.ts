import { initSinglePlayerGame, stopSinglePlayerGame } from './singleplayer';
import { initMultiplayerGame, stopMultiplayerGame } from './multiplayer';
import { initRemoteGame, stopRemoteGame } from './remote';

let stopCurrentGame: () => void = () => {};

export function initPongGame(mode: 'singleplayer' | 'multiplayer' | 'remote-multiplayer'): void {
  stopPongGame();

  switch (mode) {
    case 'singleplayer':
      initSinglePlayerGame();
      stopCurrentGame = stopSinglePlayerGame;
      break;
    case 'multiplayer':
      initMultiplayerGame();
      stopCurrentGame = stopMultiplayerGame;
      break;
    case 'remote-multiplayer':
      initRemoteGame();
      stopCurrentGame = stopRemoteGame;
      break;
  }
}

export function stopPongGame(): void {
  stopCurrentGame();
  stopCurrentGame = () => {};
}