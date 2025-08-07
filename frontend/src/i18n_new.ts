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
  | "Invalid request freind. Sender and receiver uuid are the same"
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
    playRpsButton: 'Pedra, Papel, Tesoura',
    profileLink: 'Perfil',
    creatorsLink: 'Conheça nossos criadores!',

    // Seleção Pong
    pongTitle: 'PONG',
    selectMode: 'Selecione o modo de jogo:',
    singlePlayer: 'Single Player',
    multiplayer: 'Multiplayer',
    remoteMultiplayer: 'Multiplayer Remoto',
    tournament: 'Torneio',
    backToMenu: 'Voltar ao Menu',

    // Jogo Pong
    pongInstructions: 'P1: W/S | P2: ↑/↓| P3: A/D | P4: ←/→',
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

    // Jogo RPS
    rpsTitle: 'Pedra, Papel & Tesoura',
    player: 'Você',
    cpu: 'CPU',
    yourTurn: 'Faça sua jogada:',
    win: 'Você Ganhou!',
    lose: 'Você Perdeu!',
    draw: 'Empate!',
    vs: 'vs',

    // Login
    welcome: 'Bem-vindo!',
    chooseOption: 'Escolha uma opção para continuar.',
    login: 'Entrar',
    register: 'Cadastrar',
    or: 'ou',
    loginTitle: 'Login',
    email: 'Email',
    password: 'Senha',
    back: 'Voltar',
    registerTitle: 'Cadastro',
    username: 'Nome de usuário',
    shareEmail: 'Gostaria de compartilhar seu e-mail?',
    createAccount: 'Criar Conta',
    twoFactorVerification: 'Verificação de Dois Fatores',
    enterCode: 'Digite o código do seu aplicativo de autenticação:',
    verify: 'Verificar',
    backToLogin: 'Voltar ao Login',

    // Página de Perfil
    profileTitle: 'Nome',
    profileText: 'Informações básicas do usuário.',
    matchesPlayed: 'Partidas jogadas',
    wins: 'Vitórias',
    loses: 'Derrotas',
    lastLogin: 'Último login',
    status: 'Status',
    online: 'Online',
    offline: 'Offline',
    editProfile: 'Editar Perfil',
    manageFriends: 'Gerenciar Amizades',
    manage2FA: 'Gerenciar 2FA',
    logout: 'Sair',
    deleteAccount: 'Deletar a Conta',

    // Modal 2FA
    manage2FATitle: 'Gerenciar 2FA',
    scanQRCode: 'Escaneie o QR Code com seu app de autenticação (ex: Google Authenticator).',
    enterAuthCode: 'Depois, insira o código de 6 dígitos gerado pelo app.',
    authCode: 'Código de 6 dígitos',
    enable: 'Habilitar',
    toDisable2FA: 'Para desabilitar o 2FA, insira um código de verificação atual.',
    disable2FA: 'Desabilitar 2FA',
    cancel: 'Cancelar',

    // Modal Amigos
    manageFriendsTitle: 'Gerenciar Amizades',
    friends: 'Amigos',
    addFriends: 'Adicionar Amigos',
    requests: 'Solicitações',
    close: 'Fechar',
    loadingFriends: 'Carregando amigos...',
    noFriends: 'Você ainda não tem amigos.',
    delete: 'Deletar',
    loadingUsers: 'Carregando usuários...',
    sentRequests: 'Solicitações Enviadas',
    pending: 'Pendente',
    noSentRequests: 'Nenhuma solicitação enviada.',
    otherUsers: 'Outros Usuários',
    add: 'Adicionar',
    noNewUsers: 'Nenhum usuário novo para adicionar.',
    sent: 'Enviado',
    loadingRequests: 'Carregando solicitações...',
    noRequests: 'Nenhuma solicitação de amizade recebida.',
    accept: 'Aceitar',
    reject: 'Rejeitar',
    errorLoadingFriends: 'Erro ao carregar amigos.',
    errorLoadingUsers: 'Erro ao carregar usuários.',
    errorLoadingRequests: 'Erro ao carregar solicitações.',

    // Modal Confirmação
    confirmDeletion: 'Confirmar Exclusão',
    confirmDeleteFriend: 'Tem certeza que deseja remover esta amizade?',
    confirm: 'Confirmar',
    confirmDeleteAccount: 'Tem certeza que deseja deletar sua conta? Essa ação é irreversível.',

    // Modal Editar Perfil
    editProfileTitle: 'Editar Perfil',
    newUsername: 'Novo nome de usuário',
    newPassword: 'Nova senha',
    saveChanges: 'Salvar Alterações',

    // Modal Apelido Torneio
    chooseNickname: 'Escolha um apelido para o seu usuário',
    enterNickname: 'Digite seu apelido',
    nicknameEmpty: 'O apelido não pode estar vazio',
    nicknameTaken: 'Este apelido já está sendo usado na sala. Escolha outro apelido.',

    // Página de Criadores
    creatorsTitle: 'Criadores',
    creatorsText: 'Este projeto foi criado por...',

    // Página de Vencedor
    congratulations: 'Parabéns!',
    youWon: 'você ganhou!',

    // Página de Derrota
    youLost: 'Você Perdeu',
    dontGiveUp: 'Não desista! Tente novamente no próximo torneio.',
    backToMainMenu: 'Voltar ao Menu Principal',

    // Página 404
    pageNotFound: 'Página não encontrada!',

    // Geral
    loading: 'Carregando...',
    errorLoadingPage: 'Erro ao carregar a página',
    contentNotFound: 'Não foi possível encontrar o conteúdo solicitado.',

    errors: {
      "Invalid email address": "Endereço de e-mail inválido.",
      "Wrong email address": "Endereço de e-mail incorreto.",
      "Invalid password: must be between 8 and 30 characters long": "Senha inválida: deve ter entre 8 e 30 caracteres.",
      "Wrong password, try again": "Senha incorreta, tente novamente.",
      "Username already exists": "Este nome de usuário já existe.",
      "Email already exists": "Este e-mail já está em uso.",
      "Points can't be negative": "Os pontos não podem ser negativos.",
      "Invalid file extension. Only .jpeg/.jpg and .png are allowed": "Extensão de arquivo inválida. Apenas .jpeg/.jpg e .png são permitidos.",
      "Invalid request freind. Sender and receiver uuid are the same": "Solicitação de amizade inválida. Remetente e destinatário são a mesma pessoa.",
      "Invalid friend request status for the operation": "Status da solicitação de amizade inválido para esta operação.",
      "This friendship already exists": "Esta amizade já existe.",
      "This friendship not exists": "Esta amizade não existe.",
      "A database constraint, like unique, was violated": "Ocorreu um conflito de dados. Tente usar informações diferentes.",
      "Invalid token for 2FA": "Token 2FA inválido.",
      "2FA is not enabled for this user": "2FA não está ativado para este usuário.",
      "User(s) not found": "Usuário não encontrado.",
      "Internal server error": "Erro interno do servidor. Tente novamente mais tarde.",
      "Network Error": "Erro de rede. Verifique sua conexão e tente novamente.",
      "Default Error": "Ocorreu um erro. Tente novamente."
    } as Record<ErrorKeys, string>
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
    remoteMultiplayer: 'Remote Multiplayer',
    tournament: 'Tournament',
    backToMenu: 'Back to Menu',

    // Pong Game
    pongInstructions: 'P1: W/S | P2: ↑/↓ | P3: A/D | P4: ←/→',
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

    // RPS Game
    rpsTitle: 'Rock, Paper & Scissors',
    player: 'You',
    cpu: 'CPU',
    yourTurn: 'Make your move:',
    win: 'You Win!',
    lose: 'You Lose!',
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
    shareEmail: 'Would you like to share your email?',
    createAccount: 'Create Account',
    twoFactorVerification: 'Two-Factor Verification',
    enterCode: 'Enter the code from your authentication app:',
    verify: 'Verify',
    backToLogin: 'Back to Login',

    // Profile Page
    profileTitle: 'Profile',
    profileText: 'Basic user information.',
    matchesPlayed: 'Matches Played',
    wins: 'Wins',
    loses: 'Defeats',
    lastLogin: 'Last login',
    status: 'Status',
    online: 'Online',
    offline: 'Offline',
    editProfile: 'Edit Profile',
    manageFriends: 'Manage Friends',
    manage2FA: 'Manage 2FA',
    logout: 'Logout',
    deleteAccount: 'Delete Account',

    // 2FA Modal
    manage2FATitle: 'Manage 2FA',
    scanQRCode: 'Scan the QR Code with your authentication app (e.g., Google Authenticator).',
    enterAuthCode: 'Then, enter the 6-digit code generated by the app.',
    authCode: '6-digit code',
    enable: 'Enable',
    toDisable2FA: 'To disable 2FA, enter a current verification code.',
    disable2FA: 'Disable 2FA',
    cancel: 'Cancel',

    // Friends Modal
    manageFriendsTitle: 'Manage Friends',
    friends: 'Friends',
    addFriends: 'Add Friends',
    requests: 'Requests',
    close: 'Close',
    loadingFriends: 'Loading friends...',
    noFriends: 'You don\'t have any friends yet.',
    delete: 'Delete',
    loadingUsers: 'Loading users...',
    sentRequests: 'Sent Requests',
    pending: 'Pending',
    noSentRequests: 'No sent requests.',
    otherUsers: 'Other Users',
    add: 'Add',
    noNewUsers: 'No new users to add.',
    sent: 'Sent',
    loadingRequests: 'Loading requests...',
    noRequests: 'No friend requests received.',
    accept: 'Accept',
    reject: 'Reject',
    errorLoadingFriends: 'Error loading friends.',
    errorLoadingUsers: 'Error loading users.',
    errorLoadingRequests: 'Error loading requests.',

    // Confirmation Modal
    confirmDeletion: 'Confirm Deletion',
    confirmDeleteFriend: 'Are you sure you want to remove this friendship?',
    confirm: 'Confirm',
    confirmDeleteAccount: 'Are you sure you want to delete your account? This action is irreversible.',

    // Edit Profile Modal
    editProfileTitle: 'Edit Profile',
    newUsername: 'New username',
    newPassword: 'New password',
    saveChanges: 'Save Changes',

    // Tournament Nickname Modal
    chooseNickname: 'Choose a nickname for your user',
    enterNickname: 'Enter your nickname',
    nicknameEmpty: 'Nickname cannot be empty',
    nicknameTaken: 'This nickname is already being used in the room. Choose another nickname.',

    // Creators Page
    creatorsTitle: 'Creators',
    creatorsText: 'This project was created by...',
    
    // Winner Page
    congratulations: 'Congratulations!',
    youWon: 'you won!',

    // Defeat Page
    youLost: 'You Lost',
    dontGiveUp: 'Don\'t give up! Try again in the next tournament.',
    backToMainMenu: 'Back to Main Menu',

    // 404 Page
    pageNotFound: 'Page not found!',

    // General
    loading: 'Loading...',
    errorLoadingPage: 'Error loading page',
    contentNotFound: 'Could not find the requested content.',

    errors: {
      "Invalid email address": "Invalid email address.",
      "Wrong email address": "Wrong email address.",
      "Invalid password: must be between 8 and 30 characters long": "Invalid password: must be between 8 and 30 characters long.",
      "Wrong password, try again": "Wrong password, try again.",
      "Username already exists": "This username already exists.",
      "Email already exists": "This email is already in use.",
      "Points can't be negative": "Points can't be negative.",
      "Invalid file extension. Only .jpeg/.jpg and .png are allowed": "Invalid file extension. Only .jpeg/.jpg and .png are allowed.",
      "Invalid request freind. Sender and receiver uuid are the same": "Invalid friend request. Sender and receiver are the same person.",
      "Invalid friend request status for the operation": "Invalid friend request status for this operation.",
      "This friendship already exists": "This friendship already exists.",
      "This friendship not exists": "This friendship does not exist.",
      "A database constraint, like unique, was violated": "A data conflict occurred. Try using different information.",
      "Invalid token for 2FA": "Invalid 2FA token.",
      "2FA is not enabled for this user": "2FA is not enabled for this user.",
      "User(s) not found": "User not found.",
      "Internal server error": "Internal server error. Please try again later.",
      "Network Error": "Network error. Check your connection and try again.",
      "Default Error": "An error occurred. Please try again."
    } as Record<ErrorKeys, string>
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
    remoteMultiplayer: 'Multijugador Remoto',
    tournament: 'Torneo',
    backToMenu: 'Volver al menú',

    // Juego Pong
    pongInstructions: 'P1: W/S | P2: ↑/↓ | P3: A/D | P4: ←/→',
    waitingRoom: 'SALA DE ESPERA',
    tournamentWaitingRoom: 'SALA DE ESPERA DEL TORNEO',
    exitQueue: 'Salir de la Cola',
    waitingOpponents: 'Esperando oponentes...',
    waitingMorePlayers: 'Esperando {{count}} jugador(es) más...',
    tournamentStarting: '¡El torneo está a punto de comenzar!',
    waiting: 'Esperando...',
    finalTournament: 'Final del Torneo',
    ready: 'Listo',
    waitingOpponent: 'Esperando oponente...',
    opponentReady: '¡El oponente está listo!',

    // Juego RPS
    rpsTitle: 'Piedra, Papel y Tijeras',
    player: 'Tú',
    cpu: 'CPU',
    yourTurn: 'Haz tu jugada:',
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
    shareEmail: '¿Te gustaría compartir tu correo electrónico?',
    createAccount: 'Crear Cuenta',
    twoFactorVerification: 'Verificación de Dos Factores',
    enterCode: 'Ingresa el código de tu aplicación de autenticación:',
    verify: 'Verificar',
    backToLogin: 'Volver al Inicio de Sesión',

    // Página de Perfil
    profileTitle: 'Perfil',
    profileText: 'Información básica del usuario.',
    matchesPlayed: 'Partidas jugadas',
    wins: 'Victorias',
    loses: 'Derrotas',
    lastLogin: 'Último inicio de sesión',
    status: 'Estado',
    online: 'En línea',
    offline: 'Desconectado',
    editProfile: 'Editar Perfil',
    manageFriends: 'Gestionar Amigos',
    manage2FA: 'Gestionar 2FA',
    logout: 'Cerrar Sesión',
    deleteAccount: 'Eliminar Cuenta',

    // Modal 2FA
    manage2FATitle: 'Gestionar 2FA',
    scanQRCode: 'Escanea el código QR con tu aplicación de autenticación (ej: Google Authenticator).',
    enterAuthCode: 'Luego, ingresa el código de 6 dígitos generado por la aplicación.',
    authCode: 'Código de 6 dígitos',
    enable: 'Habilitar',
    toDisable2FA: 'Para deshabilitar 2FA, ingresa un código de verificación actual.',
    disable2FA: 'Deshabilitar 2FA',
    cancel: 'Cancelar',

    // Modal Amigos
    manageFriendsTitle: 'Gestionar Amigos',
    friends: 'Amigos',
    addFriends: 'Agregar Amigos',
    requests: 'Solicitudes',
    close: 'Cerrar',
    loadingFriends: 'Cargando amigos...',
    noFriends: 'Aún no tienes amigos.',
    delete: 'Eliminar',
    loadingUsers: 'Cargando usuarios...',
    sentRequests: 'Solicitudes Enviadas',
    pending: 'Pendiente',
    noSentRequests: 'Ninguna solicitud enviada.',
    otherUsers: 'Otros Usuarios',
    add: 'Agregar',
    noNewUsers: 'No hay usuarios nuevos para agregar.',
    sent: 'Enviado',
    loadingRequests: 'Cargando solicitudes...',
    noRequests: 'Ninguna solicitud de amistad recibida.',
    accept: 'Aceptar',
    reject: 'Rechazar',
    errorLoadingFriends: 'Error al cargar amigos.',
    errorLoadingUsers: 'Error al cargar usuarios.',
    errorLoadingRequests: 'Error al cargar solicitudes.',

    // Modal de Confirmación
    confirmDeletion: 'Confirmar Eliminación',
    confirmDeleteFriend: '¿Estás seguro de que deseas eliminar esta amistad?',
    confirm: 'Confirmar',
    confirmDeleteAccount: '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.',

    // Modal Editar Perfil
    editProfileTitle: 'Editar Perfil',
    newUsername: 'Nuevo nombre de usuario',
    newPassword: 'Nueva contraseña',
    saveChanges: 'Guardar Cambios',

    // Modal Apodo Torneo
    chooseNickname: 'Elige un apodo para tu usuario',
    enterNickname: 'Ingresa tu apodo',
    nicknameEmpty: 'El apodo no puede estar vacío',
    nicknameTaken: 'Este apodo ya está siendo usado en la sala. Elige otro apodo.',

    // Página de Creadores
    creatorsTitle: 'Creadores',
    creatorsText: 'Este proyecto fue creado por...',
  
    // Página de Ganador
    congratulations: '¡Felicidades!',
    youWon: '¡has ganado!',

    // Página de Derrota
    youLost: 'Perdiste',
    dontGiveUp: '¡No te rindas! Inténtalo de nuevo en el próximo torneo.',
    backToMainMenu: 'Volver al Menú Principal',

    // Página 404
    pageNotFound: '¡Página no encontrada!',

    // General
    loading: 'Cargando...',
    errorLoadingPage: 'Error al cargar la página',
    contentNotFound: 'No se pudo encontrar el contenido solicitado.',

    errors: {
      "Invalid email address": "Dirección de correo electrónico inválida.",
      "Wrong email address": "Dirección de correo electrónico incorrecta.",
      "Invalid password: must be between 8 and 30 characters long": "Contraseña no válida: debe tener entre 8 y 30 caracteres.",
      "Wrong password, try again": "Contraseña incorrecta, intente de nuevo.",
      "Username already exists": "Este nombre de usuario ya existe.",
      "Email already exists": "Este correo electrónico ya está en uso.",
      "Points can't be negative": "Los puntos no pueden ser negativos.",
      "Invalid file extension. Only .jpeg/.jpg and .png are allowed": "Extensión de archivo inválida. Solo se permiten .jpeg/.jpg y .png.",
      "Invalid request freind. Sender and receiver uuid are the same": "Solicitud de amistad inválida. El remitente y el receptor son la misma persona.",
      "Invalid friend request status for the operation": "Estado de la solicitud de amistad no válido para esta operación.",
      "This friendship already exists": "Esta amistad ya existe.",
      "This friendship not exists": "Esta amistad no existe.",
      "A database constraint, like unique, was violated": "Ocurrió un conflicto de datos. Intente usar información diferente.",
      "Invalid token for 2FA": "Token 2FA no válido.",
      "2FA is not enabled for this user": "El 2FA no está habilitado para este usuario.",
      "User(s) not found": "Usuario no encontrado.",
      "Internal server error": "Error interno del servidor. Por favor, inténtelo de nuevo más tarde.",
      "Network Error": "Error de red. Verifique su conexión e intente nuevamente.",
      "Default Error": "Ocurrió un error. Por favor, inténtelo de nuevo."
    } as Record<ErrorKeys, string>
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
    remoteMultiplayer: 'Multijoueur à Distance',
    tournament: 'Tournoi',
    backToMenu: 'Retour au menu',

    // Jeu Pong
    pongInstructions: 'J1 : W/S | J2 : ↑/↓ | J3 : A/D | J4 : ←/→',
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

    // Jeu RPS
    rpsTitle: 'Pierre, Papier & Ciseaux',
    player: 'Vous',
    cpu: 'CPU',
    yourTurn: 'Faites votre choix :',
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
    shareEmail: 'Souhaitez-vous partager votre e-mail ?',
    createAccount: 'Créer un Compte',
    twoFactorVerification: 'Vérification à Deux Facteurs',
    enterCode: 'Entrez le code de votre application d\'authentification :',
    verify: 'Vérifier',
    backToLogin: 'Retour à la Connexion',

    // Page de Profil
    profileTitle: 'Profil',
    profileText: 'Informations de base sur l\'utilisateur.',
    matchesPlayed: 'Parties jouées',
    wins: 'Victoires',
    loses: 'Défaites',
    lastLogin: 'Dernière connexion',
    status: 'Statut',
    online: 'En ligne',
    offline: 'Hors ligne',
    editProfile: 'Modifier le Profil',
    manageFriends: 'Gérer les Amis',
    manage2FA: 'Gérer l\'A2F',
    logout: 'Se Déconnecter',
    deleteAccount: 'Supprimer le Compte',

    // Modal 2FA
    manage2FATitle: 'Gérer l\'A2F',
    scanQRCode: 'Scannez le code QR avec votre application d\'authentification (ex : Google Authenticator).',
    enterAuthCode: 'Ensuite, saisissez le code à 6 chiffres généré par l\'application.',
    authCode: 'Code à 6 chiffres',
    enable: 'Activer',
    toDisable2FA: 'Pour désactiver l\'A2F, saisissez un code de vérification actuel.',
    disable2FA: 'Désactiver l\'A2F',
    cancel: 'Annuler',

    // Modal Amis
    manageFriendsTitle: 'Gérer les Amis',
    friends: 'Amis',
    addFriends: 'Ajouter des Amis',
    requests: 'Demandes',
    close: 'Fermer',
    loadingFriends: 'Chargement des amis...',
    noFriends: 'Vous n\'avez pas encore d\'amis.',
    delete: 'Supprimer',
    loadingUsers: 'Chargement des utilisateurs...',
    sentRequests: 'Demandes Envoyées',
    pending: 'En attente',
    noSentRequests: 'Aucune demande envoyée.',
    otherUsers: 'Autres Utilisateurs',
    add: 'Ajouter',
    noNewUsers: 'Aucun nouvel utilisateur à ajouter.',
    sent: 'Envoyé',
    loadingRequests: 'Chargement des demandes...',
    noRequests: 'Aucune demande d\'ami reçue.',
    accept: 'Accepter',
    reject: 'Rejeter',
    errorLoadingFriends: 'Erreur lors du chargement des amis.',
    errorLoadingUsers: 'Erreur lors du chargement des utilisateurs.',
    errorLoadingRequests: 'Erreur lors du chargement des demandes.',

    // Modal de Confirmation
    confirmDeletion: 'Confirmer la Suppression',
    confirmDeleteFriend: 'Êtes-vous sûr de vouloir supprimer cette amitié ?',
    confirm: 'Confirmer',
    confirmDeleteAccount: 'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.',

    // Modal Modifier le Profil
    editProfileTitle: 'Modifier le Profil',
    newUsername: 'Nouveau nom d\'utilisateur',
    newPassword: 'Nouveau mot de passe',
    saveChanges: 'Enregistrer les Modifications',

    // Modal Pseudo Tournoi
    chooseNickname: 'Choisissez un pseudo pour votre utilisateur',
    enterNickname: 'Entrez votre pseudo',
    nicknameEmpty: 'Le pseudo ne peut pas être vide',
    nicknameTaken: 'Ce pseudo est déjà utilisé dans la salle. Choisissez un autre pseudo.',

    // Page des Créateurs
    creatorsTitle: 'Créateurs',
    creatorsText: 'Ce projet a été créé par...',

    // Page du Gagnant
    congratulations: 'Félicitations !',
    youWon: 'vous avez gagné !',

    // Page de Défaite
    youLost: 'Vous avez Perdu',
    dontGiveUp: 'N\'abandonnez pas ! Réessayez dans le prochain tournoi.',
    backToMainMenu: 'Retour au Menu Principal',

    // Page 404
    pageNotFound: 'Page non trouvée !',

    // Général
    loading: 'Chargement...',
    errorLoadingPage: 'Erreur lors du chargement de la page',
    contentNotFound: 'Impossible de trouver le contenu demandé.',

    errors: {
      "Invalid email address": "Adresse e-mail invalide.",
      "Wrong email address": "Adresse e-mail incorrecte.",
      "Invalid password: must be between 8 and 30 characters long": "Mot de passe invalide : doit contenir entre 8 et 30 caractères.",
      "Wrong password, try again": "Mot de passe incorrect, réessayez.",
      "Username already exists": "Ce nom d\'utilisateur existe déjà.",
      "Email already exists": "Cet e-mail est déjà utilisé.",
      "Points can't be negative": "Les points ne peuvent pas être négatifs.",
      "Invalid file extension. Only .jpeg/.jpg and .png are allowed": "Extension de fichier non valide. Seuls .jpeg/.jpg et .png sont autorisés.",
      "Invalid request freind. Sender and receiver uuid are the same": "Demande d\'ami invalide. L\'expéditeur et le destinataire sont la même personne.",
      "Invalid friend request status for the operation": "Statut de demande d\'ami non valide pour cette opération.",
      "This friendship already exists": "Cette amitié existe déjà.",
      "This friendship not exists": "Cette amitié n\'existe pas.",
      "A database constraint, like unique, was violated": "Un conflit de données est survenu. Essayez d\'utiliser des informations différentes.",
      "Invalid token for 2FA": "Jeton 2FA invalide.",
      "2FA is not enabled for this user": "L\'A2F n\'est pas activée pour cet utilisateur.",
      "User(s) not found": "Utilisateur non trouvé.",
      "Internal server error": "Erreur interne du serveur. Veuillez réessayer plus tard.",
      "Network Error": "Erreur réseau. Vérifiez votre connexion et réessayez.",
      "Default Error": "Une erreur est survenue. Veuillez réessayer."
    } as Record<ErrorKeys, string>
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
