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

    public async Update(friendshipUuid: string, entity: Friendship): Promise<void>
    {
        await prisma.friendship.update({
            where: {uuid: friendshipUuid},
            data: {
                Status: entity.status,
            }
        });
    }

    public async Delete(friendshipUuid: string): Promise<void>
    {
        await prisma.friendship.delete({
            where: {uuid: friendshipUuid}
        });
    }

    public async GetFriendshipByUserAndStatus(userUuid: string, status: StatusRequest): Promise<Friendship[]>
    {
        const friendship: Friendship = await prisma.friendship.findMany({
            where: {
                OR: [
                    {senderUuid: userUuid, status: status},
                    {receiverUuid: userUuid, status: status}
                ]
            }
        });

        if (friendship)
            return [];

        return friendship;
    }

    public async GetByFriendshipUuid(friendshipUuid: string): Promise<Friendship>
    {
        return await prisma.friendship.findUnique({
            where: {uuid: friendshipUuid}
        });
    }

    public async VerifyIfFriendshipExistsByUsersUuid(person1Uuid: string, person2Uuid: string): Promise<boolean>
    {
        const friendship = await prisma.friendship.findUnique({
            where:{
                OR:[
                    {senderUuid: person1Uuid, receiverUuid: person2Uuid},
                    {senderUuid: person2Uuid, receiverUuid: person1Uuid}
                ]
            }
        })

        return friendship !== null;
    }

    public async VerifyIfFriendshipExistsByFriendshipUuid(friendshipUuid: string): Promise<boolean>
    {
        const friendship = await prisma.friendship.findUnique({
            where: {uuid: friendshipUuid}
        });

        return friendship !== null;
    }
}
