import {Friendship} from "../../../../Domain/Entities/Concrete/Friendship.js";
import {StatusRequestEnum} from "../../../../Application/Enums/StatusRequestEnum.js";
import {GetFriendshipListQueryDTO} from "../../../../Domain/QueryDTO/GetFriendshipListQueryDTO.js";
import {IBaseRepository} from "../Interface/IBaseRepository.js";
import {PrismaClient, StatusRequest, StatusRequest as PrismaStatusRequest} from "@prisma/client";

export class FriendshipRepository implements IBaseRepository<GetFriendshipListQueryDTO, Friendship>
{
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async Create(entity: Friendship): Promise<void>
    {
        await this.prisma.friendship.create({
            data: {
                uuid: entity.uuid,
                status: entity.status as PrismaStatusRequest,
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
                status: entity.status as PrismaStatusRequest,
            }
        });
    }

    public async Delete(friendshipUuid: string): Promise<void>
    {
        await this.prisma.friendship.delete({
            where: {uuid: friendshipUuid}
        });
    }

    public async GetFriendshipByUserAndStatus(userUuid: string, status: StatusRequestEnum): Promise<GetFriendshipListQueryDTO[]>
    {
        const friendships = await this.prisma.friendship.findMany({
            where: {
                OR: [
                    {senderUuid: userUuid, status: status as PrismaStatusRequest},
                    {receiverUuid: userUuid, status: status as PrismaStatusRequest}
                ]
            },
            include: {
                sender: true,
                receiver: true
            }
        });

        if (!friendships || friendships.length === 0)
            return [];

        return friendships.map((friendship: any) => {
            const isSender = friendship.senderUuid === userUuid;
            const friendUser = isSender ? friendship.receiver : friendship.sender;

            return this.mapToQueryDTO(friendship, friendUser);
        })
    }

    public async GetByFriendshipUuid(friendshipUuid: string): Promise<Friendship | null>
    {
        const friendship =  await this.prisma.friendship.findUnique({
            where: {uuid: friendshipUuid}
        });

        if (!friendship)
            return null;

        return Friendship.fromDatabase(
            friendship.uuid,
            friendship.status as StatusRequestEnum,
            friendship.receiverUuid,
            friendship.senderUuid,
            friendship.createdAt
        );
    }

    public async VerifyIfFriendshipExistsByUsersUuid(person1Uuid: string, person2Uuid: string): Promise<boolean>
    {
        const friendship = await this.prisma.friendship.findFirst({
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

    public async VerifyIfPendingRequestExists(person1Uuid: string, person2Uuid: string): Promise<boolean>
    {
        const friendship = await this.prisma.friendship.findFirst({
            where: {
                OR: [
                    { senderUuid: person1Uuid, receiverUuid: person2Uuid },
                    { senderUuid: person2Uuid, receiverUuid: person1Uuid }
                ],
                status: StatusRequest.PENDING
            }
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

    GetAll(): Promise<Friendship[] | null> {
        throw new Error("Method not implemented.");
    }
}
