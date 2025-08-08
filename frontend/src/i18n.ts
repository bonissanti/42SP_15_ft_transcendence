type Language = 'pt-BR' | 'en' | 'es' | 'fr';

export type ErrorKeys =
  | "Invalid email address"
  | "Wrong email address"
  | "Invalid password: must be between 8 and 30 characters long"
  | "Wrong password, try again"
  | "Username already exists"
  | "Email already exists"
  | "Points can't be negative"
  | "Invalid file extension. Only .jpeg/.jpg and .png are allowed"
  | "Invalid request from client. Sender and receiver uuid are the same"
  | "Invalid friend request status for the operation"
  | "This friendship already exists"
  | "This friendship not exists"
  | "A database constraint, like unique, was violated"
  | "Invalid token for 2FA"
  | "2FA is not enabled for this user"
  | "User(s) not found"
  | "Internal server error"
  | "Network Error"
  | "Default Error";

const translations = {
  'pt-BR': {
    // Menu Principal
    mainMenuTitle: 'TRANSCENDENCE',
    playPongButton: 'Jogar Pong',
    playRpsButton: 'Jogar Pedra, Papel e Tesoura',
    profileLink: 'Perfil',
    creatorsLink: 'Criadores',

    // Seleção de Modo Pong
    pongTitle: 'PONG',
    selectMode: 'Selecione o modo de jogo:',
    singlePlayer: 'Um Jogador',
    multiplayer: 'Dois Jogadores',
    remoteMultiplayer: 'Multiplayer Remoto',
    tournament: 'Torneio',
    backToMenu: 'Voltar ao Menu',

    // Jogo Pong
    waitingRoom: 'SALA DE ESPERA',
    tournamentWaitingRoom: 'SALA DE ESPERA DO TORNEIO',
    exitQueue: 'Sair da Fila',
    waitingOpponents: 'Aguardando oponentes...',
    waitingMorePlayers: 'Aguardando mais {{count}} jogador(es)...',
    tournamentStarting: 'O torneio vai começar!',
    waiting: 'Aguardando...',
    finalTournament: 'Final do Torneio',
    ready: 'Pronto',
    waitingOpponent: 'Aguardando oponente...',
    opponentReady: 'Oponente está pronto!',
    opponentDisconnected: 'Um oponente desconectou. O jogo terminou.',
    waitingBothPlayers: 'Aguardando ambos os jogadores',
    pongInstructions: 'P1: W/S | P2: ↑/↓| P3: A/D | P4: ←/→',

    // Jogo RPS
    rpsTitle: 'Pedra, Papel e Tesoura',
    player: 'Você',
    cpu: 'Cachorrao',
    yourTurn: 'Sua vez:',
    win: 'Você venceu!',
    lose: 'Você perdeu!',
    draw: 'Empate!',
    vs: 'vs',

    // Login
    welcome: 'Bem-vindo!',
    chooseOption: 'Escolha uma opção para continuar.',
    login: 'Entrar',
    register: 'Registrar',
    or: 'ou',
    loginTitle: 'Login',
    email: 'E-mail',
    password: 'Senha',
    back: 'Voltar',
    registerTitle: 'Registro',
    username: 'Nome de usuário',
    confirmPassword: 'Confirmar senha',
    profilePicture: 'Foto de perfil',
    choose: 'Escolher',
    twoFACode: 'Código de Verificação (2FA)',
    twoFactorVerification: 'Verificação de Dois Fatores',
    verify: 'Verificar',
    backToLogin: 'Voltar ao Login',
    shareEmail: 'Gostaria de deixar o seu e-mail oculto?',
    createAccount: 'Criar Conta',

    // Perfil
    profileTitle: 'Perfil',
    matchHistory: 'Histórico de Partidas',
    matchesPlayed: 'Partidas jogadas',
    wins: 'Vitórias',
    loses: 'Derrotas',
    noMatches: 'Nenhuma partida jogada ainda.',
    winRate: 'Taxa de vitória',
    editProfile: 'Editar Perfil',
    friends: 'Amigos',
    twoFATitle: 'Autenticação de Dois Fatores (2FA)',
    logout: 'Sair',
    deleteAccount: 'Deletar Conta',
    status: 'Status',
    lastLogin: 'Último login',
    online: 'Online',
    offline: 'Offline',
    enabled: 'Ativado',
    disabled: 'Desativado',
    never: 'Nunca',

    // Amigos
    friendsList: 'Lista de Amigos',
    addFriend: 'Adicionar Amigo',
    searchUsers: 'Buscar usuários',
    sentRequests: 'Solicitações Enviadas',
    receivedRequests: 'Solicitações Recebidas',
    addFriendButton: 'Adicionar',
    acceptRequest: 'Aceitar',
    rejectRequest: 'Rejeitar',
    cancel: 'Cancelar',
    removeFriend: 'Remover Amigo',
    confirmRemoval: 'Tem certeza de que deseja remover este amigo?',
    confirm: 'Confirmar',
    loadingFriends: 'Carregando amigos...',
    noFriends: 'Você não tem amigos ainda.',
    delete: 'Excluir',
    loadingUsers: 'Carregando usuários...',
    pending: 'Pendente',
    noSentRequests: 'Nenhuma solicitação enviada.',
    otherUsers: 'Outros Usuários',
    add: 'Adicionar',
    noNewUsers: 'Nenhum novo usuário disponível.',
    sent: 'Enviado',
    loadingRequests: 'Carregando solicitações...',
    noRequests: 'Nenhuma solicitação recebida.',
    accept: 'Aceitar',
    reject: 'Rejeitar',
    manageFriends: 'Gerenciar Amizades',
    manageFriendsTitle: 'Gerenciar Amizades',
    addFriends: 'Adicionar Amigos',
    requests: 'Solicitações',
    close: 'Fechar',
    confirmDeletion: 'Confirmar Exclusão',
    confirmDeleteFriend: 'Tem certeza de que deseja remover este amigo?',
    confirmDeleteAccount: 'Tem certeza que deseja deletar sua conta? Essa ação é irreversível.',

    // Editar Perfil
    editProfileTitle: 'Editar Perfil',
    changeProfilePic: 'Alterar Foto de Perfil',
    chooseFile: 'Escolher arquivo',
    changeUsername: 'Alterar Nome de Usuário',
    newUsername: 'Novo nome de usuário',
    changePassword: 'Alterar Senha',
    currentPassword: 'Senha atual',
    newPassword: 'Nova senha',
    confirmNewPassword: 'Confirmar nova senha',
    save: 'Salvar',
    saveChanges: 'Salvar Alterações',

    // 2FA
    setupTwoFA: 'Configurar 2FA',
    disableTwoFA: 'Desabilitar 2FA',
    scanQRCode: 'Escaneie o código QR com seu aplicativo autenticador',
    enterCode: 'Digite o código de 6 dígitos do seu aplicativo',
    enable: 'Habilitar',
    disable: 'Desabilitar',
    manage2FA: 'Gerenciar 2FA',
    manage2FATitle: 'Gerenciar 2FA',
    enterAuthCode: 'Depois, insira o código de 6 dígitos gerado pelo app.',
    toDisable2FA: 'Para desabilitar o 2FA, insira um código de verificação atual.',
    authCode: 'Código de 6 dígitos',
    disable2FA: 'Desabilitar 2FA',

    // Mensagens
    successProfileUpdate: 'Perfil atualizado com sucesso!',
    successPasswordChange: 'Senha alterada com sucesso!',
    success2FAEnabled: '2FA habilitado com sucesso!',
    success2FADisabled: '2FA desabilitado com sucesso!',
    successFriendAdded: 'Amigo adicionado com sucesso!',
    successFriendRemoved: 'Amigo removido com sucesso!',
    errorLoadingFriends: 'Erro ao carregar amigos.',
    errorLoadingUsers: 'Erro ao carregar usuários.',
    errorLoadingRequests: 'Erro ao carregar solicitações.',

    // Mensagens de alerta
    gameEndedNoWinner: 'O jogo terminou sem um vencedor claro.',
    serverError: 'Erro do servidor',
    connectionLost: 'A conexão com o servidor foi perdida.',
    connectionError: 'Ocorreu um erro na conexão com o servidor.',
    connectionLostLobby: 'A conexão com o servidor foi perdida ou não foi possível entrar no lobby.',
    errorDeletingAccount: 'Erro ao deletar a conta.',

    // Torneio
    tournamentTitle: 'TORNEIO',
    enterNickname: 'Digite seu apelido para o torneio:',
    nickname: 'Apelido',
    joinTournament: 'Entrar no Torneio',
    players: 'jogadores',
    chooseNickname: 'Escolha um apelido para o seu usuário',
    nicknameEmpty: 'O apelido não pode estar vazio',
    nicknameTaken: 'Este apelido já está sendo usado na sala. Escolha outro apelido.',

    // Modal Apelido Torneio
    nicknameModalTitle: 'Apelido já em uso',
    nicknameModalText: 'Este apelido já está sendo usado na sala. Escolha outro apelido.',
    tryAgain: 'Tentar novamente',

    // Página de Vencedor
    congratulations: 'Parabéns!',
    youWon: 'Você venceu!',

    // Página de Derrota
    youLost: 'Você perdeu!',
    dontGiveUp: 'Não desista! Tente novamente no próximo torneio.',
    backToMainMenu: 'Voltar ao Menu Principal',

    // Página 404
    pageNotFound: 'Página não encontrada',
    pageNotFoundDesc: 'A página que você está procurando não existe.',
    goHome: 'Ir para o início',

    // Criadores
    creatorsTitle: 'Criadores',
    creatorsText: 'Este projeto foi criado por...',
    errorLoadingPage: 'Erro ao carregar a página',

    // Histórico de partidas
    place: 'lugar',
    mode: 'Modo',
    points: 'pts',

    // Alt text para imagens
    profilePictureAlt: 'Foto de Perfil',
    qrCodeAlt: 'Código QR',
    winnerProfilePictureAlt: 'Foto de Perfil do Vencedor',
    congratulationsGifAlt: 'Parabéns!',

    // Nomes padrão
    defaultPlayer: 'Jogador',

    // Mensagens gerais
    loading: 'Carregando...',
    errorLoadingMatchHistory: 'Erro ao carregar o histórico de partidas.',

    // Erros
    errors: {
      "Invalid email address": "Endereço de e-mail inválido.",
      "Wrong email address": "Endereço de e-mail incorreto.",
      "Invalid password: must be between 8 and 30 characters long": "Senha inválida: deve ter entre 8 e 30 caracteres.",
      "Wrong password, try again": "Senha incorreta, tente novamente.",
      "Username already exists": "Nome de usuário já existe.",
      "Email already exists": "E-mail já existe.",
      "Points can't be negative": "Os pontos não podem ser negativos.",
      "Invalid file extension. Only .jpeg/.jpg and .png are allowed": "Extensão de arquivo inválida. Apenas .jpeg/.jpg e .png são permitidos.",
      "Invalid request from client. Sender and receiver uuid are the same": "Solicitação inválida do cliente. UUID do remetente e destinatário são iguais.",
      "Invalid friend request status for the operation": "Status de solicitação de amizade inválido para a operação.",
      "This friendship already exists": "Esta amizade já existe.",
      "This friendship not exists": "Esta amizade não existe.",
      "A database constraint, like unique, was violated": "Uma restrição do banco de dados, como exclusividade, foi violada.",
      "Invalid token for 2FA": "Token inválido para 2FA.",
      "2FA is not enabled for this user": "2FA não está habilitado para este usuário.",
      "User(s) not found": "Usuário(s) não encontrado(s).",
      "Internal server error": "Erro interno do servidor. Tente novamente mais tarde.",
      "Network Error": "Erro de rede. Verifique sua conexão e tente novamente.",
      "Default Error": "Ocorreu um erro. Tente novamente."
    }
  },

  'en': {
    // Main Menu
    mainMenuTitle: 'TRANSCENDENCE',
    playPongButton: 'Play Pong',
    playRpsButton: 'Play Rock, Paper, Scissors',
    profileLink: 'Profile',
    creatorsLink: 'Creators',

    // Pong Mode Selection
    pongTitle: 'PONG',
    selectMode: 'Select game mode:',
    singlePlayer: 'Single Player',
    multiplayer: 'Two Players',
    remoteMultiplayer: 'Remote Multiplayer',
    tournament: 'Tournament',
    backToMenu: 'Back to Menu',

    // Pong Game
    waitingRoom: 'WAITING ROOM',
    tournamentWaitingRoom: 'TOURNAMENT WAITING ROOM',
    exitQueue: 'Exit Queue',
    waitingOpponents: 'Waiting for opponents...',
    waitingMorePlayers: 'Waiting for {{count}} more player(s)...',
    tournamentStarting: 'The tournament is about to start!',
    waiting: 'Waiting...',
    finalTournament: 'Tournament Final',
    ready: 'Ready',
    waitingOpponent: 'Waiting for opponent...',
    opponentReady: 'Opponent is ready!',
    opponentDisconnected: 'An opponent disconnected. The game has ended.',
    waitingBothPlayers: 'Waiting for both players',
    pongInstructions: 'P1: W/S | P2: ↑/↓ | P3: A/D | P4: ←/→',

    // RPS Game
    rpsTitle: 'Rock, Paper, Scissors',
    player: 'You',
    cpu: 'Cachorrao',
    yourTurn: 'Your turn:',
    win: 'You won!',
    lose: 'You lost!',
    draw: 'Draw!',
    vs: 'vs',

    // Login
    welcome: 'Welcome!',
    chooseOption: 'Choose an option to continue.',
    login: 'Login',
    register: 'Register',
    or: 'or',
    loginTitle: 'Login',
    email: 'Email',
    password: 'Password',
    back: 'Back',
    registerTitle: 'Register',
    username: 'Username',
    confirmPassword: 'Confirm password',
    profilePicture: 'Profile picture',
    choose: 'Choose',
    twoFACode: 'Verification Code (2FA)',
    twoFactorVerification: 'Two-Factor Verification',
    verify: 'Verify',
    backToLogin: 'Back to Login',
    shareEmail: 'Would you like to keep your email hidden?',
    createAccount: 'Create Account',

    // Profile
    profileTitle: 'Profile',
    matchHistory: 'Match History',
    matchesPlayed: 'Matches played',
    wins: 'Wins',
    loses: 'Losses',
    noMatches: 'No matches played yet.',
    winRate: 'Win rate',
    editProfile: 'Edit Profile',
    friends: 'Friends',
    twoFATitle: 'Two-Factor Authentication (2FA)',
    logout: 'Logout',
    deleteAccount: 'Delete Account',
    status: 'Status',
    lastLogin: 'Last login',
    online: 'Online',
    offline: 'Offline',
    enabled: 'Enabled',
    disabled: 'Disabled',
    never: 'Never',

    // Friends
    friendsList: 'Friends List',
    addFriend: 'Add Friend',
    searchUsers: 'Search users',
    sentRequests: 'Sent Requests',
    receivedRequests: 'Received Requests',
    addFriendButton: 'Add',
    acceptRequest: 'Accept',
    rejectRequest: 'Reject',
    cancel: 'Cancel',
    removeFriend: 'Remove Friend',
    confirmRemoval: 'Are you sure you want to remove this friend?',
    confirm: 'Confirm',
    loadingFriends: 'Loading friends...',
    noFriends: 'You don\'t have any friends yet.',
    delete: 'Delete',
    loadingUsers: 'Loading users...',
    pending: 'Pending',
    noSentRequests: 'No sent requests.',
    otherUsers: 'Other Users',
    add: 'Add',
    noNewUsers: 'No new users available.',
    sent: 'Sent',
    loadingRequests: 'Loading requests...',
    noRequests: 'No received requests.',
    accept: 'Accept',
    reject: 'Reject',
    manageFriends: 'Manage Friends',
    manageFriendsTitle: 'Manage Friends',
    addFriends: 'Add Friends',
    requests: 'Requests',
    close: 'Close',
    confirmDeletion: 'Confirm Deletion',
    confirmDeleteFriend: 'Are you sure you want to remove this friend?',
    confirmDeleteAccount: 'Are you sure you want to delete your account? This action is irreversible.',

    // Edit Profile
    editProfileTitle: 'Edit Profile',
    changeProfilePic: 'Change Profile Picture',
    chooseFile: 'Choose file',
    changeUsername: 'Change Username',
    newUsername: 'New username',
    changePassword: 'Change Password',
    currentPassword: 'Current password',
    newPassword: 'New password',
    confirmNewPassword: 'Confirm new password',
    save: 'Save',
    saveChanges: 'Save Changes',

    // 2FA
    setupTwoFA: 'Setup 2FA',
    disableTwoFA: 'Disable 2FA',
    scanQRCode: 'Scan the QR code with your authenticator app',
    enterCode: 'Enter the 6-digit code from your app',
    enable: 'Enable',
    disable: 'Disable',
    manage2FA: 'Manage 2FA',
    manage2FATitle: 'Manage 2FA',
    enterAuthCode: 'Enter the 6-digit code from your app',
    toDisable2FA: 'To disable 2FA, enter a current verification code.',
    authCode: '6-digit code',
    disable2FA: 'Disable 2FA',

    // Messages
    successProfileUpdate: 'Profile updated successfully!',
    successPasswordChange: 'Password changed successfully!',
    success2FAEnabled: '2FA enabled successfully!',
    success2FADisabled: '2FA disabled successfully!',
    successFriendAdded: 'Friend added successfully!',
    successFriendRemoved: 'Friend removed successfully!',
    errorLoadingFriends: 'Error loading friends.',
    errorLoadingUsers: 'Error loading users.',
    errorLoadingRequests: 'Error loading requests.',

    // Alert messages
    gameEndedNoWinner: 'The game ended without a clear winner.',
    serverError: 'Server error',
    connectionLost: 'The connection to the server was lost.',
    connectionError: 'An error occurred while connecting to the server.',
    connectionLostLobby: 'The connection to the server was lost or it was not possible to enter the lobby.',
    errorDeletingAccount: 'Error deleting account.',

    // Tournament
    tournamentTitle: 'TOURNAMENT',
    enterNickname: 'Enter your nickname for the tournament:',
    nickname: 'Nickname',
    joinTournament: 'Join Tournament',
    players: 'players',
    chooseNickname: 'Choose a nickname for your user',
    nicknameEmpty: 'The nickname cannot be empty',
    nicknameTaken: 'This nickname is already being used in the room. Choose another nickname.',

    // Nickname Modal Tournament
    nicknameModalTitle: 'Nickname already in use',
    nicknameModalText: 'This nickname is already being used in the room. Choose another nickname.',
    tryAgain: 'Try again',

    // Winner Page
    congratulations: 'Congratulations!',
    youWon: 'You won!',

    // Defeat Page
    youLost: 'You lost!',
    dontGiveUp: 'Don\'t give up! Try again in the next tournament.',
    backToMainMenu: 'Back to Main Menu',

    // 404 Page
    pageNotFound: 'Page not found',
    pageNotFoundDesc: 'The page you are looking for does not exist.',
    goHome: 'Go to home',

    // Creators
    creatorsTitle: 'Creators',
    creatorsText: 'This project was created by...',
    errorLoadingPage: 'Error loading page',

    // Match history
    place: 'place',
    mode: 'Mode',
    points: 'pts',

    // Alt text for images
    profilePictureAlt: 'Profile Picture',
    qrCodeAlt: 'QR Code',
    winnerProfilePictureAlt: 'Winner Profile Picture',
    congratulationsGifAlt: 'Congratulations!',

    // Default names
    defaultPlayer: 'Player',

    // General messages
    loading: 'Loading...',
    errorLoadingMatchHistory: 'Error loading match history.',

    // Errors
    errors: {
      "Invalid email address": "Invalid email address.",
      "Wrong email address": "Wrong email address.",
      "Invalid password: must be between 8 and 30 characters long": "Invalid password: must be between 8 and 30 characters long.",
      "Wrong password, try again": "Wrong password, try again.",
      "Username already exists": "Username already exists.",
      "Email already exists": "Email already exists.",
      "Points can't be negative": "Points can't be negative.",
      "Invalid file extension. Only .jpeg/.jpg and .png are allowed": "Invalid file extension. Only .jpeg/.jpg and .png are allowed.",
      "Invalid request from client. Sender and receiver uuid are the same": "Invalid request from client. Sender and receiver uuid are the same.",
      "Invalid friend request status for the operation": "Invalid friend request status for the operation.",
      "This friendship already exists": "This friendship already exists.",
      "This friendship not exists": "This friendship does not exist.",
      "A database constraint, like unique, was violated": "A database constraint, like unique, was violated.",
      "Invalid token for 2FA": "Invalid token for 2FA.",
      "2FA is not enabled for this user": "2FA is not enabled for this user.",
      "User(s) not found": "User(s) not found.",
      "Internal server error": "Internal server error. Please try again later.",
      "Network Error": "Network error. Check your connection and try again.",
      "Default Error": "An error occurred. Please try again."
    }
  },

  'es': {
    // Menú Principal
    mainMenuTitle: 'TRANSCENDENCE',
    playPongButton: 'Jugar Pong',
    playRpsButton: 'Jugar Piedra, Papel y Tijeras',
    profileLink: 'Perfil',
    creatorsLink: 'Creadores',

    // Selección de Modo Pong
    pongTitle: 'PONG',
    selectMode: 'Selecciona el modo de juego:',
    singlePlayer: 'Un Jugador',
    multiplayer: 'Dos Jugadores',
    remoteMultiplayer: 'Multijugador Remoto',
    tournament: 'Torneo',
    backToMenu: 'Volver al Menú',

    // Juego Pong
    waitingRoom: 'SALA DE ESPERA',
    tournamentWaitingRoom: 'SALA DE ESPERA DEL TORNEO',
    exitQueue: 'Salir de la Cola',
    waitingOpponents: 'Esperando oponentes...',
    waitingMorePlayers: 'Esperando {{count}} jugador(es) más...',
    tournamentStarting: '¡El torneo está a punto de comenzar!',
    waiting: 'Esperando...',
    finalTournament: 'Final del Torneo',
    ready: 'Listo',
    waitingOpponent: 'Esperando al oponente...',
    opponentReady: '¡El oponente está listo!',
    opponentDisconnected: 'Un oponente se desconectó. El juego ha terminado.',
    waitingBothPlayers: 'Esperando a ambos jugadores',
    pongInstructions: 'P1: W/S | P2: ↑/↓ | P3: A/D | P4: ←/→',

    // Juego RPS
    rpsTitle: 'Piedra, Papel y Tijeras',
    player: 'Tú',
    cpu: 'Cachorrao',
    yourTurn: 'Tu turno:',
    win: '¡Ganaste!',
    lose: '¡Perdiste!',
    draw: '¡Empate!',
    vs: 'vs',

    // Inicio de Sesión
    welcome: '¡Bienvenido!',
    chooseOption: 'Elige una opción para continuar.',
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    or: 'o',
    loginTitle: 'Iniciar Sesión',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    back: 'Volver',
    registerTitle: 'Registro',
    username: 'Nombre de usuario',
    confirmPassword: 'Confirmar contraseña',
    profilePicture: 'Foto de perfil',
    choose: 'Elegir',
    twoFACode: 'Código de Verificación (2FA)',
    twoFactorVerification: 'Verificación de Dos Factores',
    verify: 'Verificar',
    backToLogin: 'Volver al Inicio de Sesión',
    shareEmail: '¿Le gustaría mantener su correo electrónico oculto?',
    createAccount: 'Crear Cuenta',

    // Perfil
    profileTitle: 'Perfil',
    matchHistory: 'Historial de Partidas',
    matchesPlayed: 'Partidas jugadas',
    wins: 'Victorias',
    loses: 'Derrotas',
    noMatches: 'Aún no has jugado ninguna partida.',
    winRate: 'Tasa de victoria',
    editProfile: 'Editar Perfil',
    friends: 'Amigos',
    twoFATitle: 'Autenticación de Dos Factores (2FA)',
    logout: 'Cerrar Sesión',
    deleteAccount: 'Eliminar Cuenta',
    status: 'Estado',
    lastLogin: 'Último inicio de sesión',
    online: 'En línea',
    offline: 'Desconectado',
    enabled: 'Habilitado',
    disabled: 'Deshabilitado',
    never: 'Nunca',

    // Amigos
    friendsList: 'Lista de Amigos',
    addFriend: 'Agregar Amigo',
    searchUsers: 'Buscar usuarios',
    sentRequests: 'Solicitudes Enviadas',
    receivedRequests: 'Solicitudes Recibidas',
    addFriendButton: 'Agregar',
    acceptRequest: 'Aceptar',
    rejectRequest: 'Rechazar',
    cancel: 'Cancelar',
    removeFriend: 'Eliminar Amigo',
    confirmRemoval: '¿Estás seguro de que quieres eliminar este amigo?',
    confirm: 'Confirmar',
    loadingFriends: 'Cargando amigos...',
    noFriends: 'Aún no tienes amigos.',
    delete: 'Eliminar',
    loadingUsers: 'Cargando usuarios...',
    pending: 'Pendiente',
    noSentRequests: 'No hay solicitudes enviadas.',
    otherUsers: 'Otros Usuarios',
    add: 'Agregar',
    noNewUsers: 'No hay nuevos usuarios disponibles.',
    sent: 'Enviado',
    loadingRequests: 'Cargando solicitudes...',
    noRequests: 'No hay solicitudes recibidas.',
    accept: 'Aceptar',
    reject: 'Rechazar',
    manageFriends: 'Gestionar Amigos',
    manageFriendsTitle: 'Gestionar Amigos',
    addFriends: 'Agregar Amigos',
    requests: 'Solicitudes',
    close: 'Cerrar',
    confirmDeletion: 'Confirmar Eliminación',
    confirmDeleteFriend: '¿Estás seguro de que quieres eliminar este amigo?',
    confirmDeleteAccount: '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción es irreversible.',

    // Editar Perfil
    editProfileTitle: 'Editar Perfil',
    changeProfilePic: 'Cambiar Foto de Perfil',
    chooseFile: 'Elegir archivo',
    changeUsername: 'Cambiar Nombre de Usuario',
    newUsername: 'Nuevo nombre de usuario',
    changePassword: 'Cambiar Contraseña',
    currentPassword: 'Contraseña actual',
    newPassword: 'Nueva contraseña',
    confirmNewPassword: 'Confirmar nueva contraseña',
    save: 'Guardar',
    saveChanges: 'Guardar Cambios',

    // 2FA
    setupTwoFA: 'Configurar 2FA',
    disableTwoFA: 'Deshabilitar 2FA',
    scanQRCode: 'Escanea el código QR con tu aplicación autenticadora',
    enterCode: 'Ingresa el código de 6 dígitos de tu aplicación',
    enable: 'Habilitar',
    disable: 'Deshabilitar',
    manage2FA: 'Gestionar 2FA',
    manage2FATitle: 'Gestionar 2FA',
    enterAuthCode: 'Ingresa el código de 6 dígitos de tu aplicación',
    toDisable2FA: 'Para deshabilitar 2FA, ingresa un código de verificación actual.',
    authCode: 'Código de 6 dígitos',
    disable2FA: 'Deshabilitar 2FA',

    // Mensajes
    successProfileUpdate: '¡Perfil actualizado con éxito!',
    successPasswordChange: '¡Contraseña cambiada con éxito!',
    success2FAEnabled: '¡2FA habilitado con éxito!',
    success2FADisabled: '¡2FA deshabilitado con éxito!',
    successFriendAdded: '¡Amigo agregado con éxito!',
    successFriendRemoved: '¡Amigo eliminado con éxito!',
    errorLoadingFriends: 'Error al cargar amigos.',
    errorLoadingUsers: 'Error al cargar usuarios.',
    errorLoadingRequests: 'Error al cargar solicitudes.',

    // Mensajes de alerta
    gameEndedNoWinner: 'El juego terminó sin un ganador claro.',
    serverError: 'Error del servidor',
    connectionLost: 'Se perdió la conexión con el servidor.',
    connectionError: 'Ocurrió un error al conectar con el servidor.',
    connectionLostLobby: 'Se perdió la conexión con el servidor o no fue posible entrar al lobby.',
    errorDeletingAccount: 'Error al eliminar la cuenta.',

    // Torneo
    tournamentTitle: 'TORNEO',
    enterNickname: 'Ingresa tu apodo para el torneo:',
    nickname: 'Apodo',
    joinTournament: 'Unirse al Torneo',
    players: 'jugadores',
    chooseNickname: 'Elige un apodo para tu usuario',
    nicknameEmpty: 'El apodo no puede estar vacío',
    nicknameTaken: 'Este apodo ya está siendo usado en la sala. Elige otro apodo.',

    // Modal Apodo Torneo
    nicknameModalTitle: 'Apodo ya en uso',
    nicknameModalText: 'Este apodo ya está siendo usado en la sala. Elige otro apodo.',
    tryAgain: 'Intentar de nuevo',

    // Página de Ganador
    congratulations: '¡Felicitaciones!',
    youWon: '¡Ganaste!',

    // Página de Derrota
    youLost: '¡Perdiste!',
    dontGiveUp: '¡No te rindas! Inténtalo de nuevo en el próximo torneo.',
    backToMainMenu: 'Volver al Menú Principal',

    // Página 404
    pageNotFound: 'Página no encontrada',
    pageNotFoundDesc: 'La página que buscas no existe.',
    goHome: 'Ir al inicio',

    // Creadores
    creatorsTitle: 'Creadores',
    creatorsText: 'Este proyecto fue creado por...',
    errorLoadingPage: 'Error al cargar la página',

    // Historial de partidas
    place: 'lugar',
    mode: 'Modo',
    points: 'pts',

    // Texto alternativo para imágenes
    profilePictureAlt: 'Foto de Perfil',
    qrCodeAlt: 'Código QR',
    winnerProfilePictureAlt: 'Foto de Perfil del Ganador',
    congratulationsGifAlt: '¡Felicitaciones!',

    // Nombres por defecto
    defaultPlayer: 'Jugador',

    // Mensajes generales
    loading: 'Cargando...',
    errorLoadingMatchHistory: 'Error al cargar el historial de partidas.',

    // Errores
    errors: {
      "Invalid email address": "Dirección de correo electrónico inválida.",
      "Wrong email address": "Dirección de correo electrónico incorrecta.",
      "Invalid password: must be between 8 and 30 characters long": "Contraseña inválida: debe tener entre 8 y 30 caracteres.",
      "Wrong password, try again": "Contraseña incorrecta, inténtalo de nuevo.",
      "Username already exists": "El nombre de usuario ya existe.",
      "Email already exists": "El correo electrónico ya existe.",
      "Points can't be negative": "Los puntos no pueden ser negativos.",
      "Invalid file extension. Only .jpeg/.jpg and .png are allowed": "Extensión de archivo inválida. Solo se permiten .jpeg/.jpg y .png.",
      "Invalid request from client. Sender and receiver uuid are the same": "Solicitud inválida del cliente. UUID del remitente y receptor son iguales.",
      "Invalid friend request status for the operation": "Estado de solicitud de amistad inválido para la operación.",
      "This friendship already exists": "Esta amistad ya existe.",
      "This friendship not exists": "Esta amistad no existe.",
      "A database constraint, like unique, was violated": "Se violó una restricción de la base de datos, como la unicidad.",
      "Invalid token for 2FA": "Token inválido para 2FA.",
      "2FA is not enabled for this user": "2FA no está habilitado para este usuario.",
      "User(s) not found": "Usuario(s) no encontrado(s).",
      "Internal server error": "Error interno del servidor. Inténtalo de nuevo más tarde.",
      "Network Error": "Error de red. Verifica tu conexión e inténtalo de nuevo.",
      "Default Error": "Ocurrió un error. Por favor, inténtalo de nuevo."
    }
  },

  'fr': {
    // Menu Principal
    mainMenuTitle: 'TRANSCENDENCE',
    playPongButton: 'Jouer à Pong',
    playRpsButton: 'Jouer à Pierre, Papier, Ciseaux',
    profileLink: 'Profil',
    creatorsLink: 'Créateurs',

    // Sélection de Mode Pong
    pongTitle: 'PONG',
    selectMode: 'Sélectionnez le mode de jeu :',
    singlePlayer: 'Un Joueur',
    multiplayer: 'Deux Joueurs',
    remoteMultiplayer: 'Multijoueur Distant',
    tournament: 'Tournoi',
    backToMenu: 'Retour au Menu',

    // Jeu Pong
    waitingRoom: 'SALLE D\'ATTENTE',
    tournamentWaitingRoom: 'SALLE D\'ATTENTE DU TOURNOI',
    exitQueue: 'Quitter la File',
    waitingOpponents: 'En attente d\'adversaires...',
    waitingMorePlayers: 'En attente de {{count}} joueur(s) de plus...',
    tournamentStarting: 'Le tournoi va commencer !',
    waiting: 'En attente...',
    finalTournament: 'Finale du Tournoi',
    ready: 'Prêt',
    waitingOpponent: 'En attente de l\'adversaire...',
    opponentReady: 'L\'adversaire est prêt !',
    opponentDisconnected: 'Un adversaire s\'est déconnecté. Le jeu s\'est terminé.',
    waitingBothPlayers: 'En attente des deux joueurs',
    pongInstructions: 'J1 : W/S | J2 : ↑/↓ | J3 : A/D | J4 : ←/→',

    // Jeu RPS
    rpsTitle: 'Pierre, Papier, Ciseaux',
    player: 'Vous',
    cpu: 'Cachorrao',
    yourTurn: 'Votre tour :',
    win: 'Vous avez gagné !',
    lose: 'Vous avez perdu !',
    draw: 'Égalité !',
    vs: 'vs',

    // Connexion
    welcome: 'Bienvenue !',
    chooseOption: 'Choisissez une option pour continuer.',
    login: 'Se connecter',
    register: 'S\'inscrire',
    or: 'ou',
    loginTitle: 'Connexion',
    email: 'E-mail',
    password: 'Mot de passe',
    back: 'Retour',
    registerTitle: 'Inscription',
    username: 'Nom d\'utilisateur',
    confirmPassword: 'Confirmer le mot de passe',
    profilePicture: 'Photo de profil',
    choose: 'Choisir',
    twoFACode: 'Code de Vérification (2FA)',
    twoFactorVerification: 'Vérification à Deux Facteurs',
    verify: 'Vérifier',
    backToLogin: 'Retour à la Connexion',
    shareEmail: 'Souhaitez-vous garder votre e-mail caché ?',
    createAccount: 'Créer un Compte',

    // Profil
    profileTitle: 'Profil',
    matchHistory: 'Historique des Parties',
    matchesPlayed: 'Parties jouées',
    wins: 'Victoires',
    loses: 'Défaites',
    noMatches: 'Aucune partie jouée pour le moment.',
    winRate: 'Taux de victoire',
    editProfile: 'Modifier le Profil',
    friends: 'Amis',
    twoFATitle: 'Authentification à Deux Facteurs (2FA)',
    logout: 'Se déconnecter',
    deleteAccount: 'Supprimer le Compte',
    status: 'Statut',
    lastLogin: 'Dernière connexion',
    online: 'En ligne',
    offline: 'Hors ligne',
    enabled: 'Activé',
    disabled: 'Désactivé',
    never: 'Jamais',

    // Amis
    friendsList: 'Liste d\'Amis',
    addFriend: 'Ajouter un Ami',
    searchUsers: 'Rechercher des utilisateurs',
    sentRequests: 'Demandes Envoyées',
    receivedRequests: 'Demandes Reçues',
    addFriendButton: 'Ajouter',
    acceptRequest: 'Accepter',
    rejectRequest: 'Rejeter',
    cancel: 'Annuler',
    removeFriend: 'Supprimer l\'Ami',
    confirmRemoval: 'Êtes-vous sûr de vouloir supprimer cet ami ?',
    confirm: 'Confirmer',
    loadingFriends: 'Chargement des amis...',
    noFriends: 'Vous n\'avez pas encore d\'amis.',
    delete: 'Supprimer',
    loadingUsers: 'Chargement des utilisateurs...',
    pending: 'En attente',
    noSentRequests: 'Aucune demande envoyée.',
    otherUsers: 'Autres Utilisateurs',
    add: 'Ajouter',
    noNewUsers: 'Aucun nouvel utilisateur disponible.',
    sent: 'Envoyé',
    loadingRequests: 'Chargement des demandes...',
    noRequests: 'Aucune demande reçue.',
    accept: 'Accepter',
    reject: 'Rejeter',
    manageFriends: 'Gérer les Amis',
    manageFriendsTitle: 'Gérer les Amis',
    addFriends: 'Ajouter des Amis',
    requests: 'Demandes',
    close: 'Fermer',
    confirmDeletion: 'Confirmer la Suppression',
    confirmDeleteFriend: 'Êtes-vous sûr de vouloir supprimer cet ami ?',
    confirmDeleteAccount: 'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.',

    // Modifier le Profil
    editProfileTitle: 'Modifier le Profil',
    changeProfilePic: 'Changer la Photo de Profil',
    chooseFile: 'Choisir un fichier',
    changeUsername: 'Changer le Nom d\'Utilisateur',
    newUsername: 'Nouveau nom d\'utilisateur',
    changePassword: 'Changer le Mot de Passe',
    currentPassword: 'Mot de passe actuel',
    newPassword: 'Nouveau mot de passe',
    confirmNewPassword: 'Confirmer le nouveau mot de passe',
    save: 'Enregistrer',
    saveChanges: 'Enregistrer les Modifications',

    // 2FA
    setupTwoFA: 'Configurer 2FA',
    disableTwoFA: 'Désactiver 2FA',
    scanQRCode: 'Scannez le code QR avec votre application d\'authentification',
    enterCode: 'Entrez le code à 6 chiffres de votre application',
    enable: 'Activer',
    disable: 'Désactiver',
    manage2FA: 'Gérer 2FA',
    manage2FATitle: 'Gérer 2FA',
    enterAuthCode: 'Entrez le code à 6 chiffres de votre application',
    toDisable2FA: 'Pour désactiver 2FA, entrez un code de vérification actuel.',
    authCode: 'Code à 6 chiffres',
    disable2FA: 'Désactiver 2FA',

    // Messages
    successProfileUpdate: 'Profil mis à jour avec succès !',
    successPasswordChange: 'Mot de passe changé avec succès !',
    success2FAEnabled: '2FA activé avec succès !',
    success2FADisabled: '2FA désactivé avec succès !',
    successFriendAdded: 'Ami ajouté avec succès !',
    successFriendRemoved: 'Ami supprimé avec succès !',
    errorLoadingFriends: 'Erreur lors du chargement des amis.',
    errorLoadingUsers: 'Erreur lors du chargement des utilisateurs.',
    errorLoadingRequests: 'Erreur lors du chargement des demandes.',

    // Messages d'alerte
    gameEndedNoWinner: 'Le jeu s\'est terminé sans vainqueur clair.',
    serverError: 'Erreur du serveur',
    connectionLost: 'La connexion au serveur a été perdue.',
    connectionError: 'Une erreur s\'est produite lors de la connexion au serveur.',
    connectionLostLobby: 'La connexion au serveur a été perdue ou il n\'a pas été possible d\'entrer dans le lobby.',
    errorDeletingAccount: 'Erreur lors de la suppression du compte.',

    // Tournoi
    tournamentTitle: 'TOURNOI',
    enterNickname: 'Entrez votre surnom pour le tournoi :',
    nickname: 'Surnom',
    joinTournament: 'Rejoindre le Tournoi',
    players: 'joueurs',
    chooseNickname: 'Choisissez un surnom pour votre utilisateur',
    nicknameEmpty: 'Le surnom ne peut pas être vide',
    nicknameTaken: 'Ce surnom est déjà utilisé dans la salle. Choisissez un autre surnom.',

    // Modal Surnom Tournoi
    nicknameModalTitle: 'Surnom déjà utilisé',
    nicknameModalText: 'Ce surnom est déjà utilisé dans la salle. Choisissez un autre surnom.',
    tryAgain: 'Réessayer',

    // Page de Victoire
    congratulations: 'Félicitations !',
    youWon: 'Vous avez gagné !',

    // Page de Défaite
    youLost: 'Vous avez perdu !',
    dontGiveUp: 'N\'abandonnez pas ! Essayez à nouveau au prochain tournoi.',
    backToMainMenu: 'Retour au Menu Principal',

    // Page 404
    pageNotFound: 'Page non trouvée',
    pageNotFoundDesc: 'La page que vous recherchez n\'existe pas.',
    goHome: 'Aller à l\'accueil',

    // Créateurs
    creatorsTitle: 'Créateurs',
    creatorsText: 'Ce projet a été créé par...',
    errorLoadingPage: 'Erreur lors du chargement de la page',

    // Historique des parties
    place: 'place',
    mode: 'Mode',
    points: 'pts',

    // Texte alternatif pour les images
    profilePictureAlt: 'Photo de Profil',
    qrCodeAlt: 'Code QR',
    winnerProfilePictureAlt: 'Photo de Profil du Gagnant',
    congratulationsGifAlt: 'Félicitations !',

    // Noms par défaut
    defaultPlayer: 'Joueur',

    // Messages généraux
    loading: 'Chargement...',
    errorLoadingMatchHistory: 'Erreur lors du chargement de l\'historique des parties.',

    // Erreurs
    errors: {
      "Invalid email address": "Adresse e-mail invalide.",
      "Wrong email address": "Adresse e-mail incorrecte.",
      "Invalid password: must be between 8 and 30 characters long": "Mot de passe invalide : doit contenir entre 8 et 30 caractères.",
      "Wrong password, try again": "Mot de passe incorrect, essayez à nouveau.",
      "Username already exists": "Le nom d'utilisateur existe déjà.",
      "Email already exists": "L'e-mail existe déjà.",
      "Points can't be negative": "Les points ne peuvent pas être négatifs.",
      "Invalid file extension. Only .jpeg/.jpg and .png are allowed": "Extension de fichier non valide. Seuls .jpeg/.jpg et .png sont autorisés.",
      "Invalid request from client. Sender and receiver uuid are the same": "Demande invalide du client. UUID de l'expéditeur et du destinataire sont identiques.",
      "Invalid friend request status for the operation": "Statut de demande d'ami invalide pour l'opération.",
      "This friendship already exists": "Cette amitié existe déjà.",
      "This friendship not exists": "Cette amitié n'existe pas.",
      "A database constraint, like unique, was violated": "Une contrainte de base de données, comme l'unicité, a été violée.",
      "Invalid token for 2FA": "Token invalide pour 2FA.",
      "2FA is not enabled for this user": "2FA n'est pas activé pour cet utilisateur.",
      "User(s) not found": "Utilisateur(s) non trouvé(s).",
      "Internal server error": "Erreur interne du serveur. Veuillez réessayer plus tard.",
      "Network Error": "Erreur réseau. Vérifiez votre connexion et réessayez.",
      "Default Error": "Une erreur s'est produite. Veuillez réessayer."
    }
  }
};

let currentLanguage: Language = 'pt-BR';

export function setLanguage(language: Language): void {
  currentLanguage = language;
}

export function getCurrentLanguage(): Language {
  return currentLanguage;
}

export function t(): typeof translations['pt-BR'] {
  return translations[currentLanguage];
}

export function tError(key: ErrorKeys): string {
  return translations[currentLanguage].errors[key];
}

export function toggleLanguage(): void {
  const languages: Language[] = ['pt-BR', 'en', 'es', 'fr'];
  const currentIndex = languages.indexOf(currentLanguage);
  const nextIndex = (currentIndex + 1) % languages.length;
  currentLanguage = languages[nextIndex];
}
