import {PrismaClient, User as PrismaUser} from '@prisma/client';
import {IBaseRepository} from "../Interface/IBaseRepository.js";
import {User} from "../../../../Domain/Entities/Concrete/User.js";
import {ErrorCatalog} from "../../../../Shared/Errors/ErrorCatalog.js";
import {EmailVO} from "../../../../Domain/ValueObjects/EmailVO.js";
import {PasswordHashVO} from "../../../../Domain/ValueObjects/PasswordHashVO.js";
import {GetUserQueryDTO} from "../../../../Domain/QueryDTO/GetUserQueryDTO.js";

export class UserRepository implements IBaseRepository<GetUserQueryDTO, User> {
    public prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async Create(userEntity: User): Promise<void> {
        await this.prisma.user.create({
            data: {
                uuid: userEntity.Uuid,
                email: userEntity.Email.getEmail(),
                password: userEntity.PasswordHash.getPasswordHash(),
                username: userEntity.Username,
                profilePic: userEntity.ProfilePic,
                lastLogin: userEntity.LastLogin,
                auth0Id: userEntity.Auth0Id,
                isOnline: userEntity.isOnline,
            },
        });
    }

    public async Update(_uuid: string, userEntity: User | null): Promise<void> {
        await this.prisma.user.update({
            where: {uuid: _uuid},
            data: {
                email: userEntity?.Email.getEmail(),
                password: userEntity?.PasswordHash.getPasswordHash(),
                username: userEntity?.Username,
                profilePic: userEntity?.ProfilePic,
                lastLogin: userEntity?.LastLogin,
                auth0Id: userEntity?.Auth0Id,
                isOnline: userEntity?.isOnline,
                matchesPlayed: userEntity?.matchesPlayed,
                wins: userEntity?.wins,
                loses: userEntity?.loses,
            },
        });
    }

    public async Delete(_uuid: string): Promise<void> {
        await this.prisma.user.delete({
            where: {uuid: _uuid},
        });
    }

    public async GetAll(): Promise<User[]> {
        const usersData = await this.prisma.user.findMany();
        if (!usersData.length) {
            throw new Error(ErrorCatalog.UserNotFound.SetError());
        }
        return usersData.map(user => this.RecoverEntity(user));
    }

    public async GetUserQueryDTOByUuid(uuid: string): Promise<GetUserQueryDTO | null> {
        const userData = await this.prisma.user.findUnique({where: {uuid}});
        if (!userData) return null;
        const entity = this.RecoverEntity(userData);
        return this.mapToQueryDTO(entity);
    }

    public async GetUserEntityByUuid(uuid: string): Promise<User | null> {
        const userData = await this.prisma.user.findUnique({where: {uuid}});
        if (!userData) return null;
        return this.RecoverEntity(userData);
    }

    public async GetFullUsers(): Promise<GetUserQueryDTO[]> {
        const userEntities: User[] = await this.GetAll();
        return userEntities.map(user => this.mapToQueryDTO(user));
    }

    public async VerifyIfUserExistsByUUID(uuid: string): Promise<boolean> {
        const user = await this.prisma.user.findUnique({where: {uuid}});
        return user !== null;
    }

    public async VerifyIfUsersExistsByUUIDs(uuids: string[]): Promise<boolean> {
        const users = await this.prisma.user.findMany({where: {uuid: {in: uuids}}});
        return users.length === uuids.length;
    }

    public async VerifyIfUserExistsByUsername(username: string): Promise<boolean> {
        const user = await this.prisma.user.findUnique({where: {username}});
        return user !== null;
    }

    public async VerifyIfUsersExistsByUsername(usernames: string[]): Promise<boolean> {
        const users = await this.prisma.user.findMany({where: {username: {in: usernames}}});
        return users.length === usernames.length;
    }

    public async SearchForClosestOpponent(username: string, paremeterWin: number, paremterLoses: number, totalGames: number)
    {
        const maxRationDifference = 10;
        const minMatchesPlayed = Math.abs(15 - totalGames);
        const maxMatchesPlayed = totalGames + 10;
        const userWinRatio = (paremeterWin / totalGames) * 100;

        const potentialOpponents = await this.prisma.user.findMany({
            where: {
                username: { not: username },
                matchesPlayed: { gte: minMatchesPlayed, lte: maxMatchesPlayed },
            }
        })

        const usersWithRatioDifference = potentialOpponents
            .map(user => ({
                ...user,
                winRatio: (user.wins / user.matchesPlayed) * 100,
                ratioDifference: Math.abs(((user.wins / user.matchesPlayed) * 100) - userWinRatio)
            }))
            .filter(user => user.ratioDifference <= maxRationDifference);

        const candidates = usersWithRatioDifference.length > 0 ? usersWithRatioDifference : this.SearchForAnyOpponent(usersWithRatioDifference);
    }

    //TODO: trocar any por talvez, value object
    private SearchForAnyOpponent(usersWithRatioDifference: User)
    {

    }

    private mapToQueryDTO(userEntity: User): GetUserQueryDTO {
        return new GetUserQueryDTO(
            userEntity.Uuid,
            userEntity.Email.getEmail(),
            userEntity.Username,
            userEntity.ProfilePic ?? "",
            userEntity.matchesPlayed,
            userEntity.wins,
            userEntity.loses
        );
    }

    private RecoverEntity(user: PrismaUser): User {
        const userEntity = new User(
            EmailVO.AddEmail(user.email),
            new PasswordHashVO(user.password),
            user.username,
            user.profilePic,
            user.lastLogin,
            user.matchesPlayed,
            user.wins,
            user.loses
        );
        userEntity.Uuid = user.uuid;
        userEntity.Auth0Id = user.auth0Id;
        userEntity.isOnline = user.isOnline;

        return userEntity;
    }
}
