import {IBaseRepository} from "../Interface/IBaseRepository.js";
import {User} from "../../../../Domain/Entities/Concrete/User.js";
import prisma from "@prisma";
import {ErrorCatalog} from "../../../../Shared/Errors/ErrorCatalog.js";
import {EmailVO} from "../../../../Domain/ValueObjects/EmailVO.js";
import {PasswordHashVO} from "../../../../Domain/ValueObjects/PasswordHashVO.js";
import {UserViewModel} from "../../../../Presentation/ViewModels/UserViewModel.js";

export class UserRepository implements IBaseRepository<User>
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
          },
       });
   }

   public async Delete(_username: string): Promise<void>
   {
       await prisma.user.delete({
           where: {
               username: _username,
           },
       })
   }

   public async GetByUsername(_username: string): Promise<User | null>
   {
       const user = await prisma.user.findUnique({
           where: {
               username: _username,
           }
       });
       if (!user)
           return null;

       return new User(
           EmailVO.AddEmail(user.email),
           new PasswordHashVO(user.password),
           user.username,
           user.profilePic ?? ""
       );
   }

    public async GetByUUID(_uuid: string): Promise<User | null>
    {
        const user = await prisma.user.findUnique({
            where: {
                uuid: _uuid,
            }
        });
        if (!user)
            return null;

        return new User(
            EmailVO.AddEmail(user.email),
            new PasswordHashVO(user.password),
            user.username,
            user.profilePic ?? ""
        );
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
           user.profilePic ?? ""
       ));
   }

   public async GetFullUser(_username: string): Promise<UserViewModel | null>
   {
       const userEntities: User | null = await this.GetByUsername(_username);

       if (!userEntities)
           return null;

       return this.mapToViewModel(userEntities);
   }

   public async GetFullUsers(): Promise<UserViewModel[]>
   {
       const userEntities: User[] = await this.GetAll();

       return userEntities.map(user => this.mapToViewModel(user));
   }

   private mapToViewModel(userEntity: User): UserViewModel
   {
        return new UserViewModel(
            userEntity.Uuid,
            userEntity.Email.getEmail(),
            userEntity.PasswordHash.getPasswordHash(),
            userEntity.Username,
            userEntity.ProfilePic ?? "",
        )
   }
}