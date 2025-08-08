"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServiceClient = void 0;
const axios_1 = __importDefault(require("axios"));
const qs_1 = require("qs");
class UserServiceClient {
    baseUrl;
    constructor() {
        //Pode ser que seja 127.0.0.1:8080 (local é isso)
        this.baseUrl = process.env.BACKEND_API_URL || 'http://localhost:8080';
    }
    async VerifyIfUsersExistsByUsername(usernames) {
        try {
            const validUsernames = usernames.filter(u => u != null && u !== '');
            if (validUsernames.length === 0) {
                return false;
            }
            const response = await axios_1.default.get(`${this.baseUrl}/users/exists/usernames`, {
                params: { usernames: validUsernames },
                paramsSerializer: params => (0, qs_1.stringify)(params, { arrayFormat: 'repeat' }),
            });
            return response.data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error) && (error.response?.status === 404 || error.response?.status === 400)) {
                return false;
            }
            throw error;
        }
    }
    async VerifyIfUserExistsByUuid(uuid) {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/users/:${uuid}`, {
                params: { uuid: uuid }
            });
            return response.data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error) && error.response?.status === 404)
                return false;
            throw error;
        }
    }
    async VerifyIfUserExistsByUsername(username) {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/users/:${username}`, {
                params: { username: username }
            });
            return response.data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error) && error.response?.status === 404)
                return false;
            throw error;
        }
    }
    async UpdateStatsForUsers(updateStatsExternalDTO) {
        try {
            const response = await axios_1.default.put(`${this.baseUrl}/updateStats`, updateStatsExternalDTO);
            return response.data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error) && error.response?.status === 404)
                return false;
            throw error;
        }
    }
    async SearchForOpponent(username, wins, totalGames) {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/matchmaking`, {
                params: { username: username, wins: wins, totalGames: totalGames }
            });
            if (response.status !== 200)
                return null;
            return response.data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error) && error.response?.status === 404)
                return null;
            throw error;
        }
    }
}
exports.UserServiceClient = UserServiceClient;
