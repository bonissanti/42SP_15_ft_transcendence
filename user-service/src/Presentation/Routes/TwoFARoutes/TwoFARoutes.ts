import {authenticateJWT} from "../../Middleware/AuthMiddleware.js";
import {FastifyReply, FastifyRequest} from "fastify";
import {Verify2faDTO} from "../../../Application/DTO/ToQuery/Verify2faDTO.js";
import {TwoFAController} from "../../Controllers/TwoFAController.js";
import {EnableTwoFaDTO} from "../../../Application/DTO/ToCommand/EnableTwoFaDTO.js";
import {DisableTwoFaDTO} from "../../../Application/DTO/ToCommand/DisableTwoFaDTO.js";

export const TwoFARoutes = async (server: any, twoFAController: TwoFAController) => {
    server.post('/enable2fa', { preHandler: authenticateJWT }, async (request: FastifyRequest <{ Body: EnableTwoFaDTO }>, reply: FastifyReply) => {
        console.log("Recebido em /enable2fa: ", request.body);
        return await twoFAController.EnableTwoFA(request, reply);
    });

    server.put('/disable2fa', { preHandler: authenticateJWT }, async (request: FastifyRequest <{ Body: DisableTwoFaDTO }>, reply: FastifyReply) => {
        console.log("Recebido em /disable2fa: ", request.body);
        return await twoFAController.DisableTwoFA(request, reply);
    });

    server.get('/generateQrcode', { preHandler: authenticateJWT }, async (request: FastifyRequest <{ Querystring: { uuid: string } }>, reply: FastifyReply) => {
        console.log("Generating QR code for 2FA");
        return await twoFAController.Generate2FaQrcode(request, reply);
    });

    server.get('/verify2fa', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Querystring: Verify2faDTO }>, reply: FastifyReply) => {
        console.log("Recebido em /verify2fa: ", request.query);
        return await twoFAController.Verify2FA(request, reply);
    })
}