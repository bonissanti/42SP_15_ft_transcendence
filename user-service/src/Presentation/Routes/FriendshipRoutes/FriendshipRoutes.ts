import {FriendshipController} from "../../Controllers/FriendshipController.js";
import {authenticateJWT} from "../../Middleware/AuthMiddleware.js";
import {AddRequestFriendDTO} from "../../../Application/DTO/ToCommand/AddRequestFriendDTO.js";
import {ChangeRequestFriendStatusDTO} from "../../../Application/DTO/ToCommand/ChangeRequestFriendStatusDTO.js";

export const FriendshipRoutes = async (server: any, friendshipController: FriendshipController) => {

    server.post('/addFriend', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: AddRequestFriendDTO }>, reply: FastifyReply) => {
        await friendshipController.AddFriend(request, reply);
    });

    server.put('/changeRequestStatus', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: ChangeRequestFriendStatusDTO }>, reply: FastifyReply) => {
        await friendshipController.ChangeStatusRequestFriend(request, reply);
    })

    server.get('/friendsList', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: GetFriendshipListDTO }>, reply: FastifyReply) => {
        await friendshipController.FriendshipStatusList(request, reply);
    })

}