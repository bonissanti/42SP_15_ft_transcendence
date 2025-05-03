import {IBaseRepository} from "../Interface/IBaseRepository.js";
import {User} from "../../../../Domain/Entities/Concrete/User.js";
import {ErrorCatalog} from "../../../../Shared/Errors/ErrorCatalog.js";
import {EmailVO} from "../../../../Domain/ValueObjects/EmailVO.js";
import {PasswordHashVO} from "../../../../Domain/ValueObjects/PasswordHashVO.js";
import {GetUserQueryDTO} from "../../../../Domain/QueryDTO/GetUserQueryDTO.js";
import prisma from "@prisma";

export class UserRepository implements IBaseRepository<GetUserQueryDTO, User>
{
   public async Create(userEntity: User): Promise<void>
   {
           await prisma.user.create({
               data: {
                   uuid: userEntity.Uuid,
                   email: userEntity.Email.getEmail(),
                   password: userEntity.PasswordHash.getPasswordHash(),
                   username: userEntity.Username,
                   profilePic: userEntity.ProfilePic,
                   lastLogin: userEntity.LastLogin,
               },
           });
   }

   public async Update(_uuid: string, userEntity: User | null): Promise<void>
   {
       await prisma.user.update({
           where: {
               uuid: _uuid,
           },
          data: {
               email: userEntity?.Email.getEmail(),
              password: userEntity?.PasswordHash.getPasswordHash(),
              username: userEntity?.Username,
              profilePic: userEntity?.ProfilePic,
              lastLogin: userEntity?.LastLogin,
          },
       });
   }

   public async Delete(_uuid: string): Promise<void>
   {
       await prisma.user.delete({
           where: {
               uuid: _uuid,
           },
       })
   }

   public async GetAll(): Promise<User[]>
   {
       const users = await prisma.user.findMany();

       if (!users)
           throw new Error(ErrorCatalog.UserNotFound.SetError());

       return users.map(user => new User(
           EmailVO.AddEmail(user.email),
           new PasswordHashVO(user.password),
           user.username,
           user.profilePic ?? "",
           user.lastLogin
       ));
   }

   public async GetUserQueryDTOByUuid(uuid: string): Promise<GetUserQueryDTO | null>
   {
       const user = await prisma.user.findUnique({
           where: {
               uuid: uuid,
           }
       });

       if (!user)
           return null;

       const entity = this.RecoverEntity(user);
       return this.mapToQueryDTO(entity);
   }

    public async GetUserEntityByUuid(uuid: string): Promise<User | null>
    {
        const user = await prisma.user.findUnique({
            where: {
                uuid: uuid,
            }
        });

        if (!user)
            return null;

        return this.RecoverEntity(user);
    }

   public async GetFullUsers(): Promise<GetUserQueryDTO[]>
   {
       const userEntities: User[] = await this.GetAll();

       return userEntities.map(user => this.mapToQueryDTO(user));
   }

    public async VerifyIfUserExistsByUUID(uuid: string): Promise<boolean>
    {
        const user = await prisma.user.findUnique({
            where: {
                uuid: uuid,
            }
        });

        return user !== null;
    }

    public async VerifyIfUserExistsByUsername(username: string): Promise<boolean>
    {
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            }
        });

        return user !== null;
    }

   private mapToQueryDTO(userEntity: User): GetUserQueryDTO
   {
        return new GetUserQueryDTO(
            userEntity.Uuid,
            userEntity.Email.getEmail(),
            userEntity.Username,
            userEntity.ProfilePic ?? "",
        )
   }

   private RecoverEntity(user: any):User
   {
       const userEntity = new User(
           EmailVO.AddEmail(user.email),
           new PasswordHashVO(user.password),
           user.username,
           user.profilePic ?? "",
           user.lastLogin
       );
       return userEntity;
   }
}
