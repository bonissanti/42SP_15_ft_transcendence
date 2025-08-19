# FT_TRANSCENDENCE 🏓

A real-time multiplayer Pong game platform built as the final project of 42's Common Core curriculum. This implementation features single-player (vs bot), multiplayer with 2 and 4 players, tournament mode, and an additional Rock Paper Scissors (RPS) game.

[![Watch the Demo](https://i.sstatic.net/Vp2cE.png)](https://drive.google.com/file/d/13-LrXIbCxl5CwCafj5Glb7it4JLWT2Y7/view?usp=sharing)

---

## :star: Features

- **Real-time multiplayer** online Pong games with matchmaking system
- **Multiple game modes**: Single-player vs AI, 2-player, 4-player, and tournament modes
- **Additional game**: Rock Paper Scissors (RPS)
- **User management**: OAuth integration, unique display names, avatar uploads, and statistics
- **Security**: Two-factor authentication (2FA) and JWT-based authentication
- **Social features**: Friend system
- **GDPR compliance**: Privacy-focused data handling
- **Multi-language**: Available in English, Portuguese, Spanish and French

---

## 🏗️ Architecture

This project follows a **microservices architecture** with clear separation of concerns:

ft_transcendence/ <br>
....├── frontend/           # Vanilla TypeScript SPA with Tailwind CSS <br>
....├── auth-service/       # Authentication and authorization service <br>
....├── user-service/       # User management and profiles <br>
....├── game-service/       # Game logic and real-time communication <br>
....├── ngrok-service/      # Development tunneling service <br>
....├── devops/             # Infrastructure and deployment configs<br> 
....└── docker-compose.yml  # Container orchestration<br>



### Backend Architecture Principles

- **Clean Architecture**: Application layer isolated from adapters (HTTP, DB, etc.)
- **Domain-Driven Design (DDD)**: Domain models encapsulate core business rules
- **CQRS Pattern**: Commands mutate state; queries read state for better scalability
- **Microservices**: Independent services with clear boundaries

---

## 🛠️ Tech Stack

### Frontend
- **Language**: TypeScript (Vanilla)
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Markup**: HTML5

### Backend
- **Runtime**: Node.js
- **Framework**: Fastify
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT, OAuth, 2FA (otplib)
- **Real-time**: WebSockets

### DevOps & Infrastructure
- **Containerization**: Docker & Docker Compose
- **Development**: Ngrok for tunneling
- **CI/CD**: GitHub Actions
- **Proxy**: Nginx (reverse proxy)


## Architecture (Backend)
The backend is intentionally simple while keeping clear boundaries:
- Clean Architecture: application layer isolated from adapters (HTTP, DB, etc.).
- DDD: domain models to encapsulate core business rules.
- CQRS: commands mutate state; queries read state. Separation keeps reads/writes independent and easier to evolve.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ft_transcendence
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development environment**
   ```bash
   make
   # or
   docker compose up --build
   ```

4. **Access the application**
    - Frontend: `http://localhost:3000`
    - API Documentation: `http://localhost:8080/docs`

> [!WARNING]
> Google authentication will not work in the local environment. Please log in in the normal way.

---

## 🎮 Game Features

### Pong Game Modes
- **Single Player**: Play against an AI bot 'Cachorrao', the best player in the world
- **Two Players**: Classic head-to-head Pong gameplay
- **Pong²**: Extended Pong with four paddles (4 players)
- **Tournament**: Classic head-to-head competition with multiple rounds (4 players)

### Rock Paper Scissors
- Quick matches vs bot
- Best-of-five rounds
- Real-time result updates

---

## 📊 Database Schema

The application uses SQLite with Prisma ORM for:
- User profiles and authentication
- Game sessions and statistics
- Friend relationships
- Tournament brackets
- Match history and leaderboards

---

## 🏆 Authors

Built by the 42 students working on this Common Core project. Follow us on Github:

**[bonissanti](https://github.com/bonissanti)**<br>
**[Edu2metros](https://github.com/Edu2metros)**<br>
**[phm-aguiar](https://github.com/phm-aguiar)**<br>
**[ArthurSobreira](https://github.com/ArthurSobreira)**<br>
**[MarcalAmaral](https://github.com/MarcalAmaral)**

---

## 🔗 Links

- [Project Demo Video](https://drive.google.com/file/d/13-LrXIbCxl5CwCafj5Glb7it4JLWT2Y7/view?usp=sharing)
- [42 School](https://42.fr/)

---


