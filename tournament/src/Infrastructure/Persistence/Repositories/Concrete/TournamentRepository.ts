import {PrismaClient, Tournament as PrismaUser} from '@prisma/client';
import {IBaseRepository} from "../Interface/IBaseRepository.js";
import {ErrorCatalog} from "../../../../Shared/Errors/ErrorCatalog.js";
import {Tournament} from "../../../../Domain/Entities/Concrete/Tournament";
import {GetTournamentQueryDTO} from "../../../../Domain/QueryDTO/GetTournamentQueryDTO";

export class TournamentRepository implements IBaseRepository<GetTournamentQueryDTO, Tournament>
{
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async Create(tournamentEntity: Tournament): Promise<void>
    {
        await this.prisma.tournament.create({
            data: {
                tournamentName: tournamentEntity.tournamentName,
                player1Uuid: tournamentEntity.player1Uuid,
                player2Uuid: tournamentEntity.player2Uuid,
                player3Uuid: tournamentEntity.player3Uuid,
                player4Uuid: tournamentEntity.player4Uuid,
            },
        });
    }

    public async Update(_uuid: string, tournamentEntity: Tournament | null): Promise<void>
    {
        await this.prisma.tournament.update({
            where: {tournamentUuid: _uuid},
            data: {
                tournamentName: tournamentEntity.tournamentName,
                player1Uuid: tournamentEntity.player1Uuid,
                player2Uuid: tournamentEntity.player2Uuid,
                player3Uuid: tournamentEntity.player3Uuid,
                player4Uuid: tournamentEntity.player4Uuid,
            },
        });
    }

    public async Delete(_uuid: string): Promise<void> {
        await this.prisma.tournament.delete({
            where: {tournamentUuid: _uuid},
        });
    }

    public async GetAll(): Promise<Tournament[]>
    {
        const usersData = await this.prisma.tournament.findMany();
        if (!usersData.length) {
            throw new Error(ErrorCatalog.TournamentNotFound.SetError());
        }
        return usersData.map(user => this.RecoverEntity(user));
    }

    public async GetTournamentQueryDTOByUuid(uuid: string): Promise<GetTournamentQueryDTO | null> {
        const tournamentData = await this.prisma.tournament.findUnique({where: {uuid}});

        if (!tournamentData)
            return null;

        const entity = this.RecoverEntity(tournamentData);
        return this.mapToQueryDTO(entity);
    }

    public async GetTournamentEntityByUuid(uuid: string): Promise<Tournament | null>
    {
        const userData = await this.prisma.tournament.findUnique({where: {uuid}});

        if (!userData)
            return null;

        return this.RecoverEntity(userData);
    }

    public async GetAllTournaments(uuid?: string): Promise<GetTournamentQueryDTO[]>
    {
       const tournaments = await this.prisma.tournament.findMany({
           where: uuid? {
               OR: [
                   {player1Uuid: uuid},
                   {player2Uuid: uuid},
                   {player3Uuid: uuid},
                   {player4Uuid: uuid}
               ]
           } : {}
       });

       return tournaments.map(tournament => this.mapToQueryDTO(this.RecoverEntity(tournament)));
    }

    public async VerifyIfTournamentExistsByUUID(uuid: string): Promise<boolean> {
        const user = await this.prisma.tournament.findUnique({where: {uuid}});
        return user !== null;
    }

    private mapToQueryDTO(tournamentEntity: Tournament): GetTournamentQueryDTO {
        return new GetTournamentQueryDTO(
            tournamentEntity.tournamentUuid,
            tournamentEntity.tournamentName,
            tournamentEntity.player1Uuid,
            tournamentEntity.player2Uuid,
            tournamentEntity.player3Uuid,
            tournamentEntity.player4Uuid
        );
    }

    private RecoverEntity(tournament: PrismaUser): Tournament {
        return new Tournament(
            tournament.tournamentName,
            tournament.player1Uuid,
            tournament.player2Uuid,
            tournament.player3Uuid,
            tournament.player4Uuid
        );
    }
}
