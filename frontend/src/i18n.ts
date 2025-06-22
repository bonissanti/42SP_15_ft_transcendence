type Language = 'pt-BR' | 'en';

const translations = {
  'pt-BR': {
    // Menu Principal
    mainMenuTitle: 'TRANSCENDENCE',
    playPongButton: 'Jogar Pong',
    playRpsButton: 'Pedra, Papel, Tesoura',
    profileLink: 'Perfil',
    creatorsLink: 'Conheça nossos criadores!',
    
    // Seleção Pong
    pongTitle: 'PONG',
    selectMode: 'Selecione o modo de jogo:',
    singlePlayer: 'Single Player',
    multiplayer: 'Multiplayer',
    backToMenu: 'Voltar ao Menu',

    // Jogo Pong
    pongInstructions: 'P1: W/S | P2: ↑/↓',

    // Jogo RPS
    rpsTitle: 'Pedra, Papel & Tesoura',
    player: 'Você',
    cpu: 'CPU',
    yourTurn: 'Faça sua jogada:',
    win: 'Você Ganhou!',
    lose: 'Você Perdeu!',
    draw: 'Empate!',

    // Página de Perfil
    profileTitle: 'Perfil',
    profileText: 'Informações básicas do usuário.',

    // Página de Criadores
    creatorsTitle: 'Criadores',
    creatorsText: 'Este projeto foi criado por...',
  },
  'en': {
    // Main Menu
    mainMenuTitle: 'TRANSCENDENCE',
    playPongButton: 'Play Pong',
    playRpsButton: 'Rock, Paper, Scissors',
    profileLink: 'Profile',
    creatorsLink: 'Meet our creators!',

    // Pong Selection
    pongTitle: 'PONG',
    selectMode: 'Select game mode:',
    singlePlayer: 'Single Player',
    multiplayer: 'Multiplayer',
    backToMenu: 'Back to Menu',

    // Pong Game
    pongInstructions: 'P1: W/S | P2: ↑/↓',

    // RPS Game
    rpsTitle: 'Rock, Paper & Scissors',
    player: 'You',
    cpu: 'CPU',
    yourTurn: 'Make your move:',
    win: 'You Win!',
    lose: 'You Lose!',
    draw: 'Draw!',

    // Profile Page
    profileTitle: 'Profile',
    profileText: 'Basic user information.',

    // Creators Page
    creatorsTitle: 'Creators',
    creatorsText: 'This project was created by...',
  }
};

let currentLanguage: Language = 'pt-BR';

export function toggleLanguage(): void {
  currentLanguage = currentLanguage === 'pt-BR' ? 'en' : 'pt-BR';
}

export function getCurrentLanguage(): Language {
  return currentLanguage;
}

export function t() {
  return translations[currentLanguage];
}