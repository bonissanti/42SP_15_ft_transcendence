"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserMatchmakingQueryDTO = void 0;
class GetUserMatchmakingQueryDTO {
    uuid;
    email;
    username;
    profilePic;
    matchesPlayed;
    wins;
    loses;
    winRatio;
    constructor(uuid, email, username, profilePic, matchesPlayed, wins, loses, winRatio) {
        this.uuid = uuid;
        this.email = email;
        this.username = username;
        this.profilePic = profilePic;
        this.matchesPlayed = matchesPlayed;
        this.wins = wins;
        this.loses = loses;
        this.winRatio = winRatio;
    }
}
exports.GetUserMatchmakingQueryDTO = GetUserMatchmakingQueryDTO;
