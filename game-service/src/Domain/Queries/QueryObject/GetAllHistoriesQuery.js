"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllHistoriesQuery = void 0;
class GetAllHistoriesQuery {
    username;
    constructor(username) {
        this.username = username;
    }
    static fromDTO(dto) {
        return new GetAllHistoriesQuery(dto.username);
    }
}
exports.GetAllHistoriesQuery = GetAllHistoriesQuery;
