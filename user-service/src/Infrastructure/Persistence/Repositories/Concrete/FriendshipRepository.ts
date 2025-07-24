import {Friendship} from "../../../../Domain/Entities/Concrete/Friendship.js";
import {StatusRequest} from "../../../../Application/Enums/StatusRequest.js";
import {GetFriendshipListQueryDTO} from "../../../../Domain/QueryDTO/GetFriendshipListQueryDTO.js";
import {IBaseRepository} from "../Interface/IBaseRepository.js";
import {PrismaClient} from "@prisma/client";

export class FriendshipRepository implements IBaseRepository<GetFriendshipListQueryDTO, Friendship>
{
    private prisma: PrismaClient;

    public async Create(entity: Friendship): Promise<void>
    {
        await this.prisma.friendship.create({
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
        await this.prisma.friendship.update({
            where: {uuid: friendshipUuid},
            data: {
                Status: entity.status,
            }
        });
    }

    public async Delete(friendshipUuid: string): Promise<void>
    {
        await this.prisma.friendship.delete({
            where: {uuid: friendshipUuid}
        });
    }

    public async GetFriendshipByUserAndStatus(userUuid: string, status: StatusRequest): Promise<Friendship[]>
    {
        const friendships = await this.prisma.friendship.findMany({
            where: {
                OR: [
                    {senderUuid: userUuid, status: status},
                    {receiverUuid: userUuid, status: status}
                ]
            },
            include: {
                sender: true,
                receiver: true
            }
        });

        if (!friendships || friendships.length === 0)
            return [];

        return friendships.map(friendship => {
            const isSender = friendship.senderUuid === userUuid;
            const friendUser = isSender ? friendship.receiverUuid : friendship.senderUuid;

            return this.mapToQueryDTO(friendship, friendUser);
        })
    }

    public async GetByFriendshipUuid(friendshipUuid: string): Promise<Friendship>
    {
        return await this.prisma.friendship.findUnique({
            where: {uuid: friendshipUuid}
        });
    }

    public async VerifyIfFriendshipExistsByUsersUuid(person1Uuid: string, person2Uuid: string): Promise<boolean>
    {
        const friendship = await this.prisma.friendship.findUnique({
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
        const friendship = await this.prisma.friendship.findUnique({
            where: {uuid: friendshipUuid}
        });

        return friendship !== null;
    }

    private mapToQueryDTO(friendship: Friendship, friendUser: any): GetFriendshipListQueryDTO
    {
        return new GetFriendshipListQueryDTO(
            friendship.uuid,
            friendship.status,
            friendUser.uuid,
            friendUser.username,
            friendUser.profilePic,
            friendUser.wins,
            friendUser.loses,
            friendUser.matchesPlayed
        );
    }
}
