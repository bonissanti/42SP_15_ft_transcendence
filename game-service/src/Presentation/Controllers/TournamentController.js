"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentController = void 0;
const BaseController_1 = require("./BaseController");
const NotificationError_1 = require("../../Shared/Errors/NotificationError");
const CreateTournamentDTO_1 = require("../../Application/DTO/ToCommand/CreateTournamentDTO");
const EditTournamentDTO_1 = require("../../Application/DTO/ToCommand/EditTournamentDTO");
const GetTournamentDTO_1 = require("../../Application/DTO/ToQuery/GetTournamentDTO");
const DeleteTournamentDTO_1 = require("../../Application/DTO/ToCommand/DeleteTournamentDTO");
const CreateTournamentService_1 = require("../../Application/Services/Concrete/CreateTournamentService");
const EditTournamentService_1 = require("../../Application/Services/Concrete/EditTournamentService");
const DeleteTournamentService_1 = require("../../Application/Services/Concrete/DeleteTournamentService");
const GetTournamentService_1 = require("../../Application/Services/Concrete/GetTournamentService");
const GetAllTournamentsDTO_1 = require("../../Application/DTO/ToQuery/GetAllTournamentsDTO");
const GetAllTournamentService_1 = require("../../Application/Services/Concrete/GetAllTournamentService");
class TournamentController extends BaseController_1.BaseController {
    notificationError;
    createTournament;
    editTournament;
    deleteTournament;
    getTournament;
    getAllTournament;
    constructor() {
        super();
        this.notificationError = new NotificationError_1.NotificationError();
        this.createTournament = new CreateTournamentService_1.CreateTournamentService(this.notificationError);
        this.editTournament = new EditTournamentService_1.EditTournamentService(this.notificationError);
        this.deleteTournament = new DeleteTournamentService_1.DeleteTournamentService(this.notificationError);
        this.getTournament = new GetTournamentService_1.GetTournamentService(this.notificationError);
        this.getAllTournament = new GetAllTournamentService_1.GetAllTournamentService(this.notificationError);
    }
    async CreateTournament(request, reply) {
        const body = request.body;
        const createTournamentDTO = new CreateTournamentDTO_1.CreateTournamentDTO(body.tournamentName, body.player1Username, body.player2Username, body.player3Username, body.player4Username, body.aliasPlayer1, body.aliasPlayer2, body.aliasPlayer3, body.aliasPlayer4);
        const result = await this.createTournament.Execute(createTournamentDTO, reply);
        return this.handleResult(result, reply, this.notificationError);
    }
    async EditTournament(request, reply) {
        const body = request.body;
        const editTournamentDTO = new EditTournamentDTO_1.EditTournamentDTO(body.tournamentUuid, body.tournamentName, body.player1Username, body.player2Username, body.player3Username, body.player4Username);
        const result = await this.editTournament.Execute(editTournamentDTO, reply);
        return this.handleResult(result, reply, this.notificationError);
    }
    async GetTournament(request, reply) {
        const query = request.query;
        const getTournamentDTO = new GetTournamentDTO_1.GetTournamentDTO(query.tournamentUuid);
        const result = await this.getTournament.Get(getTournamentDTO, reply);
        return this.handleResult(result, reply, this.notificationError);
    }
    async DeleteTournament(request, reply) {
        const body = request.body;
        const deleteTournamentDTO = new DeleteTournamentDTO_1.DeleteTournamentDTO(body.torunamentUuid);
        const result = await this.deleteTournament.Execute(deleteTournamentDTO, reply);
        return this.handleResult(result, reply, this.notificationError);
    }
    async GetAllTournaments(request, reply) {
        const query = request.query;
        const getAllTournamentsDTO = new GetAllTournamentsDTO_1.GetAllTournamentsDTO(query.username);
        const result = await this.getAllTournament.Execute(getAllTournamentsDTO, reply);
        return this.handleResult(result, reply, this.notificationError);
    }
}
exports.TournamentController = TournamentController;
