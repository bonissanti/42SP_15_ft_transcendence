"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllTournamentsQuery = void 0;
class GetAllTournamentsQuery {
    userUuid;
    constructor(userUuid) {
        this.userUuid = userUuid;
    }
    static fromDTO(queryDTO) {
        return new GetAllTournamentsQuery(queryDTO.username);
    }
}
exports.GetAllTournamentsQuery = GetAllTournamentsQuery;
