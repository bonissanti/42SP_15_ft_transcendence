import { initSinglePlayerGame, stopSinglePlayerGame } from './singleplayer';
import { initMultiplayerGame, stopMultiplayerGame } from './multiplayer';
import { initRemoteGame, stopRemoteGame } from './remote';
import { initTournamentGame, stopTournamentGame } from './tournament';

let stopCurrentGame: () => void = () => {};

export function initPongGame(mode: 'singleplayer' | 'multiplayer' | 'remote-multiplayer' | 'tournament'): void {
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
    case 'tournament':
        initTournamentGame();
        stopCurrentGame = stopTournamentGame;
        break;
  }
}

export function stopPongGame(): void {
  stopCurrentGame();
  stopCurrentGame = () => {};
}