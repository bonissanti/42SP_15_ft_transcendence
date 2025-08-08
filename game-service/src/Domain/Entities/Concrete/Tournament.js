"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tournament = void 0;
const crypto = __importStar(require("crypto"));
class Tournament {
    tournamentUuid;
    tournamentName;
    player1Username;
    player2Username;
    player3Username;
    player4Username;
    aliasPlayer1;
    aliasPlayer2;
    aliasPlayer3;
    aliasPlayer4;
    constructor(tournamentName, player1Username, player2Username, player3Username, player4Username, aliasPlayer1, aliasPlayer2, aliasPlayer3, aliasPlayer4) {
        this.tournamentUuid = crypto.randomUUID();
        this.tournamentName = tournamentName;
        this.player1Username = player1Username;
        this.player2Username = player2Username;
        this.player3Username = player3Username;
        this.player4Username = player4Username;
        this.aliasPlayer1 = aliasPlayer1;
        this.aliasPlayer2 = aliasPlayer2;
        this.aliasPlayer3 = aliasPlayer3;
        this.aliasPlayer4 = aliasPlayer4;
    }
    static fromDatabase(tournamentUuid, tournamentName, player1Username, player2Username, player3Username, player4Username, aliasPlayer1, aliasPlayer2, aliasPlayer3, aliasPlayer4) {
        const tournament = Object.create(Tournament.prototype);
        tournament.tournamentUuid = tournamentUuid;
        tournament.tournamentName = tournamentName;
        tournament.player1Username = player1Username;
        tournament.player2Username = player2Username;
        tournament.player3Username = player3Username;
        tournament.player4Username = player4Username;
        tournament.aliasPlayer1 = aliasPlayer1;
        tournament.aliasPlayer2 = aliasPlayer2;
        tournament.aliasPlayer3 = aliasPlayer3;
        tournament.aliasPlayer4 = aliasPlayer4;
        return tournament;
    }
}
exports.Tournament = Tournament;
