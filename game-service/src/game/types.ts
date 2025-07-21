import { WebSocket } from 'ws';

export interface Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
  score: number;
  lost: boolean;
}

export interface Ball {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
}

export interface GameState {
  ball: Ball;
  paddles: Paddle[];
}

export interface PlayerInputs {
  [key: string]: boolean;
}

export interface ClientData {
  ws: WebSocket;
  username: string;
  inputs: PlayerInputs;
  id: string;
  profilePic: string;
}

export interface Game {
  playerIds: string[];
  gameState: GameState;
  gameLoopInterval: NodeJS.Timeout | null;
  speedUpInterval: NodeJS.Timeout | null;
}