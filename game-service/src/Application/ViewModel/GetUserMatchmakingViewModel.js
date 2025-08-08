"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserMatchmakingViewModel = void 0;
class GetUserMatchmakingViewModel {
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
    static fromQueryDTO(dto) {
        return new GetUserMatchmakingViewModel(dto.uuid, dto.email, dto.username, dto.profilePic, dto.matchesPlayed, dto.wins, dto.loses, dto.winRatio);
    }
}
exports.GetUserMatchmakingViewModel = GetUserMatchmakingViewModel;
