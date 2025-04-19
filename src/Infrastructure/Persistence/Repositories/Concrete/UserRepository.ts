import {IBaseRepository} from "../Interface/IBaseRepository";
import {User} from "../../../../Domain/Entities/Concrete/User";
import {NotificationError} from "../../../../Shared/Errors/NotificationError";
import {ErrorCatalog} from "../../../../Shared/Errors/ErrorCatalog";
import { PrismaClient, Prisma } from '../../../../../prisma/generated/prisma';

const prisma = new PrismaClient();


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