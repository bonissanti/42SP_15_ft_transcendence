import {Friendship} from "../../../../Domain/Entities/Concrete/Friendship.js";
import {StatusRequest} from "../../../../Application/Enums/StatusRequest.js";

export class FriendshipRepository implements IBaseRepository<ListFriendshipQueryDTO, Friendship>
{
    public async Create(entity: Friendship): Promise<void>
    {
        await prisma.friendship.create({
            data: {
                uuid: entity.uuid,
                status: entity.status,
                receiverUuid: entity.receiverUuid,
                senderUuid: entity.senderUuid,
            }
        });
    }

    public async Update(friendshipUuid: string, status: StatusRequest)
    {
        await prisma.friendship.update({
            where: {uuid: friendshipUuid},
            data: {
                Status: status,
            }
        });
    }

    public async Delete(friendshipUuid: string)
    {
        await prisma.friendship.delete({
            where: {uuid: friendshipUuid}
        });
    }

    public async GetFriendshipByUserAndStatus(userUuid: string, status: StatusRequest)
    {
        await prisma.friendship.findMany({
            where: {
                OR: [
                    {senderUuid: userUuid, status: status},
                    {receiverUuid: userUuid, status: status}
                ]
            }
        });
    }

    public async GetByFriendshipUuid(friendshipUuid: string)
    {
        await prisma.friendship.findUnique({
            where: {uuid: friendshipUuid}
        });
    }

    public async VerifyIfFriendshipExists(person1Uuid: string, person2Uuid: string): Promise<boolean>
    {
        const friendship = await prisma.friendship.findUnique({
            where:{
                OR:[
                    {senderUuid: person1Uuid, receiverUuid: person2Uuid},
                    {senderUuid: person2Uuid, receiverUuid: person1Uuid}
                ]
            }
        })

        return friendship === null;
    }
}
