import {IBaseRepository} from "../Interface/IBaseRepository.js";
import {User} from "../../../../Domain/Entities/Concrete/User.js";
import prisma from "@prisma";

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
               },
           });
   }

   public async Update(_username: string, userEntity: User): Promise<void>
   {
       await prisma.user.update({
           where: {
               username: _username,
           },
          data: {
               email: userEntity.Email.getEmail(),
              password: userEntity.PasswordHash.getPasswordHash(),
              username: userEntity.Username,
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

   // public async GetByUsername(_username: string): Promise<User>
   // {
   //     return await prisma.user.findUnique({
   //         where: {
   //             username: _username,
   //         }
   //     });
   // }
   //
   // public async GetAll(): Promise<User[]>
   // {
   //     return await prisma.user.findMany()
   // }
}