"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const fastify_1 = __importDefault(require("fastify"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const cors_1 = require("@fastify/cors");
const PrismaService_1 = __importDefault(require("./Infrastructure/Service/PrismaService"));
const TournamentRoutes_1 = require("./Presentation/Routes/TournamentRoutes/TournamentRoutes");
const TournamentController_1 = require("./Presentation/Controllers/TournamentController");
const HistoryController_1 = require("./Presentation/Controllers/HistoryController");
const HistoryRoutes_1 = require("./Presentation/Routes/HistoryRoutes/HistoryRoutes");
const MatchmakingController_1 = require("./Presentation/Controllers/MatchmakingController");
const MatchmakingRoutes_1 = require("./Presentation/Routes/MatchmakingRoutes/MatchmakingRoutes");
const websockets_1 = require("./game/websockets");
async function main() {
    const httpsOptions = {
        key: fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'ssl', 'localhost.key')),
        cert: fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'ssl', 'localhost.pem')),
    };
    const server = (0, fastify_1.default)({
        https: httpsOptions
    });
    server.register(jwt_1.default, {
        secret: process.env.JWT_SECRET || 'transcendence'
    });
    server.register(helmet_1.default, {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "https://accounts.google.com"],
                frameSrc: ["'self'", "https://accounts.google.com"],
                connectSrc: ["'self'", "https://accounts.google.com", "wss://localhost:3001"]
            }
        }
    });
    server.register(cors_1.fastifyCors, {
        origin: "https://localhost",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    });
    const tournamentController = new TournamentController_1.TournamentController();
    const historyController = new HistoryController_1.HistoryController();
    const matchmakingController = new MatchmakingController_1.MatchmakingController();
    await (0, TournamentRoutes_1.TournamentRoutes)(server, tournamentController);
    await (0, HistoryRoutes_1.HistoryRoutes)(server, historyController);
    await (0, MatchmakingRoutes_1.MatchmakingRoutes)(server, matchmakingController);
    server.setErrorHandler((async (error, request, reply) => {
        console.log("Error: ", error);
    }));
    (0, websockets_1.setupWebSocket)(server);
    try {
        const address = await server.listen({ port: 3001, host: '0.0.0.0' });
        console.log(`HTTPS and WSS Server listening on ${address}`);
    }
    catch (err) {
        console.log("Failed to start server: ", err, "");
        await PrismaService_1.default.$disconnect();
        process.exit(1);
    }
}
main();
