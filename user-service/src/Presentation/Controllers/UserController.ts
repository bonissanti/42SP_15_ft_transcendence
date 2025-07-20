import { CreateUserDTO } from "../../Domain/DTO/Command/CreateUserDTO.js";
import { Result } from "../../Shared/Utils/Result.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { BaseController } from "./BaseController.js";
import { CreateUserService } from "../../Application/Services/Concrete/CreateUserService.js";
import { NotificationError } from "../../Shared/Errors/NotificationError.js";
import { EditUserDTO } from "../../Domain/DTO/Command/EditUserDTO.js";
import { EditUserService } from "../../Application/Services/Concrete/EditUserService.js";
import { DeleteUserDTO } from "../../Domain/DTO/Command/DeleteUserDTO.js";
import { DeleteUserService } from "../../Application/Services/Concrete/DeleteUserService.js";
import { GetUserDTO } from "../../Domain/DTO/Query/GetUserDTO.js";
import { GetUserService } from "../../Application/Services/Concrete/GetUserService.js";
import { GetUserViewModel } from "../ViewModels/GetUserViewModel.js";
import { UserRepository } from "../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import { VerifyIfUsersExistsByUuidsDTO } from "../../Domain/DTO/Query/VerifyIfUsersExistsByUuidsDTO.js";
import { VerificationService } from "../../Application/Services/Concrete/VerificationService.js";

export class UserController extends BaseController {
  private readonly notificationError: NotificationError;
  private readonly createUserService: CreateUserService;
  private readonly editUserService: EditUserService;
  private readonly deleteUserService: DeleteUserService;
  private readonly getUserService: GetUserService;
  private readonly userRepository: UserRepository;
  private readonly verificationService: VerificationService;

  constructor(
    createUserService: CreateUserService,
    editUserService: EditUserService,
    deleteUserService: DeleteUserService,
    getUserService: GetUserService,
    userRepository: UserRepository,
    verificationService: VerificationService
  ) {
    super();
    this.notificationError = new NotificationError();
    this.createUserService = createUserService;
    this.editUserService = editUserService;
    this.deleteUserService = deleteUserService;
    this.getUserService = getUserService;
    this.userRepository = userRepository;
    this.verificationService = verificationService;
  }

  public async CreateUser(request: FastifyRequest<{ Body: CreateUserDTO }>, reply: FastifyReply): Promise<Result> {
    const body = request.body;
    const userDTO: CreateUserDTO = new CreateUserDTO(body.email, body.password, body.username, body.profilePic, body.lastLogin);
    const result: Result = await this.createUserService.Execute(userDTO, reply);
    return this.handleResult(result, reply, this.notificationError);
  }

  public async EditUser(request: FastifyRequest<{ Body: EditUserDTO }>, reply: FastifyReply): Promise<Result> {
    const body = request.body;
    const userDTO: EditUserDTO = new EditUserDTO(body.uuid, body.email, body.password, body.username, body.profilePic);
    const result: Result = await this.editUserService.Execute(userDTO, reply);
    return this.handleResult(result, reply, this.notificationError);
  }

  public async DeleteUser(request: FastifyRequest<{ Body: DeleteUserDTO }>, reply: FastifyReply): Promise<Result> {
    const body = request.body;
    const userDTO: DeleteUserDTO = new DeleteUserDTO(body.Uuid);
    const result: Result = await this.deleteUserService.Execute(userDTO, reply);
    return this.handleResult(result, reply, this.notificationError);
  }

  public async GetUser(request: FastifyRequest<{ Querystring: GetUserDTO }>, reply: FastifyReply): Promise<Result> {
    const query = request.query;
    const userDTO: GetUserDTO = new GetUserDTO(query.uuid, query.email, query.username, query.profilePic);
    const result: Result<GetUserViewModel> = await this.getUserService.Execute(userDTO, reply);
    return this.handleResult(result, reply, this.notificationError);
  }

  public async VerifyIfUsersExists(request: FastifyRequest<{ Querystring: { uuids: string[] } }>, reply: FastifyReply): Promise<Result> {
    const query = request.query;
    const usersDTO: VerifyIfUsersExistsByUuidsDTO = new VerifyIfUsersExistsByUuidsDTO(query.uuids);
    const result: Result<boolean> = await this.verificationService.VerifyIfUserExistsByUuidsService(usersDTO, reply);
    return this.handleResult(result, reply, this.notificationError);
  }

  public async findOne(request: FastifyRequest<{ Params: { uuid: string } }>, reply: FastifyReply) {
    try {
      const { uuid } = request.params;
      const dto = new GetUserDTO(uuid);
      const result: Result<GetUserViewModel> = await this.getUserService.Execute(dto, reply);
      return this.handleResult(result, reply, this.notificationError);
    } catch (error: any) {
      throw error;
    }
  }

  public async GetAllUsers(request: FastifyRequest, reply: FastifyReply): Promise<Result> {
    const result: Result<GetUserViewModel[]> = await this.getUserService.GetAllUsers();
    return this.handleResult(result, reply, this.notificationError);
  }

  public async UpdateUserStatus(uuid: string, isOnline: boolean, reply: FastifyReply): Promise<Result> {
    try {
      const user = await this.userRepository.GetUserEntityByUuid(uuid);
      if (!user) {
        return this.handleResult(Result.Failure("Usuário não encontrado."), reply, this.notificationError);
      }

      user.ChangeStatusOnline(isOnline);
      await this.userRepository.Update(uuid, user);
      return this.handleResult(Result.Sucess("Status do usuário atualizado."), reply, this.notificationError);
    } catch (error) {
      return this.handleResult(Result.Failure("Erro ao atualizar o status do usuário."), reply, this.notificationError);
    }
  }
}