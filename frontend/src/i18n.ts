type Language = 'pt-BR' | 'en' | 'es' | 'fr';

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
    profileTitle: 'Nome',
    profileText: 'Informações básicas do usuário.',
    matchesPlayed: 'Partidas jogadas',
    wins: 'Vitórias',
    loses: 'Derrotas',
    lastLogin: 'Último login',

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
    matchesPlayed: 'Matches Played',
    wins: 'Wins',
    loses: 'Defeats',
    lastLogin: 'Last login',

    // Creators Page
    creatorsTitle: 'Creators',
    creatorsText: 'This project was created by...',
  },
  'es': {
    // Menú Principal
    mainMenuTitle: 'TRANSCENDENCE',
    playPongButton: 'Jugar Pong',
    playRpsButton: 'Piedra, Papel, Tijeras',
    profileLink: 'Perfil',
    creatorsLink: '¡Conoce a nuestros creadores!',

    // Selección Pong
    pongTitle: 'PONG',
    selectMode: 'Selecciona el modo de juego:',
    singlePlayer: 'Un jugador',
    multiplayer: 'Multijugador',
    backToMenu: 'Volver al menú',

    // Juego Pong
    pongInstructions: 'P1: W/S | P2: ↑/↓',

    // Juego RPS
    rpsTitle: 'Piedra, Papel y Tijeras',
    player: 'Tú',
    cpu: 'CPU',
    yourTurn: 'Haz tu jugada:',
    win: '¡Ganaste!',
    lose: '¡Perdiste!',
    draw: '¡Empate!',

    // Página de Perfil
    profileTitle: 'Perfil',
    profileText: 'Información básica del usuario.',
    matchesPlayed: 'Partidas jugadas',
    wins: 'Victorias',
    loses: 'Derrotas',
    lastLogin: 'Último inicio de sesión',

    // Página de Creadores
    creatorsTitle: 'Creadores',
    creatorsText: 'Este proyecto fue creado por...',
  },
  'fr': {
    // Menu Principal
    mainMenuTitle: 'TRANSCENDENCE',
    playPongButton: 'Jouer au Pong',
    playRpsButton: 'Pierre, Papier, Ciseaux',
    profileLink: 'Profil',
    creatorsLink: 'Rencontrez nos créateurs !',

    // Sélection Pong
    pongTitle: 'PONG',
    selectMode: 'Sélectionnez le mode de jeu :',
    singlePlayer: 'Un joueur',
    multiplayer: 'Multijoueur',
    backToMenu: 'Retour au menu',

    // Jeu Pong
    pongInstructions: 'J1 : W/S | J2 : ↑/↓',

    // Jeu RPS
    rpsTitle: 'Pierre, Papier & Ciseaux',
    player: 'Vous',
    cpu: 'CPU',
    yourTurn: 'Faites votre choix :',
    win: 'Vous avez gagné !',
    lose: 'Vous avez perdu !',
    draw: 'Égalité !',

    // Page de Profil
    profileTitle: 'Profil',
    profileText: 'Informations de base sur l’utilisateur.',
    matchesPlayed: 'Parties jouées',
    wins: 'Victoires',
    loses: 'Défaites',
    lastLogin: 'Dernière connexion',

    // Page des Créateurs
    creatorsTitle: 'Créateurs',
    creatorsText: 'Ce projet a été créé par...',
  }
};

let currentLanguage: Language = 'pt-BR';

export function toggleLanguage(): void {
  const langs: Language[] = ['pt-BR', 'en', 'es', 'fr'];
  const nextIndex = (langs.indexOf(currentLanguage) + 1) % langs.length;
  currentLanguage = langs[nextIndex];
}

export function getCurrentLanguage(): Language {
  return currentLanguage;
}

export function t() {
  return translations[currentLanguage];
}
