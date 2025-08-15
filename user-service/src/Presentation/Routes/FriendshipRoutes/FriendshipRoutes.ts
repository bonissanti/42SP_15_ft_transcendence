import {FriendshipController} from "../../Controllers/FriendshipController.js";
import {authenticateJWT} from "../../Middleware/AuthMiddleware.js";
import {AddRequestFriendDTO} from "../../../Application/DTO/ToCommand/AddRequestFriendDTO.js";
import {ChangeRequestFriendStatusDTO} from "../../../Application/DTO/ToCommand/ChangeRequestFriendStatusDTO.js";
import {GetFriendshipListDTO} from "../../../Application/DTO/ToQuery/GetFriendshipListDTO.js";
import {FastifyReply, FastifyRequest} from "fastify";
import {DeleteFriendDTO} from "../../../Application/DTO/ToCommand/DeleteFriendDTO.js";

export const FriendshipRoutes = async (server: any, friendshipController: FriendshipController) => {

    server.post('/addFriend', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: AddRequestFriendDTO }>, reply: FastifyReply) => {
        return await friendshipController.AddFriend(request, reply);
    });

    server.put('/changeRequestStatus', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: ChangeRequestFriendStatusDTO }>, reply: FastifyReply) => {
        return await friendshipController.ChangeStatusRequestFriend(request, reply);
    })

    server.get('/friendsList', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Querystring: GetFriendshipListDTO }>, reply: FastifyReply) => {
        return await friendshipController.FriendshipStatusList(request, reply);
    })

    server.delete('/deleteFriend', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: DeleteFriendDTO }>, reply: FastifyReply) => {
        return await friendshipController.DeleteFriend(request, reply);
    })

}