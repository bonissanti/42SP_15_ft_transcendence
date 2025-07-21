import {BaseHandlerCommand} from "./BaseHandlerCommand.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {User} from "../../Entities/Concrete/User.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import {UpdateStatsCommand} from "../CommandObject/UpdateStatsCommand.js";

export class UpdateStatsCommandHandler implements BaseHandlerCommand<UpdateStatsCommand>
{
    private userRepository: UserRepository;
    private notificationError: NotificationError;

    constructor(userRepository: UserRepository, notification: NotificationError)
    {
        this.userRepository = userRepository;
        this.notificationError = notification;
    }

    async Handle(command: UpdateStatsCommand): Promise<void>
    {
        const usersList: string[] = [command.player1Username, command.player2Username];
        const usersEntities = await this.userRepository.GetUsersEntitiesByUsername(usersList);

        if (!usersEntities)
        {
            this.notificationError.AddError(ErrorCatalog.UserNotFound);
            return;
        }

        UpdateStatsCommandHandler.UpdateStats(command, usersEntities, this.notificationError);
        if (this.notificationError.NumberOfErrors() > 0)
            return;

        await this.userRepository.Update(usersEntities[0].Uuid, usersEntities[0]);
        await this.userRepository.Update(usersEntities[1].Uuid, usersEntities[1]);
        return ;
    }

    private static UpdateStats(command: UpdateStatsCommand, usersEntities: User[], notificationError: NotificationError): void
    {
        const player1 = usersEntities.find(user => user.Username == command.player1Username);
        const player2 = usersEntities.find(user => user.Username == command.player2Username);

        if (command.player1Points > command.player2Points)
        {
            this.WinStats(player1!, notificationError);
            this.LoserStats(player2!, notificationError);
        }
        else
        {
            this.WinStats(player2!, notificationError);
            this.LoserStats(player1!, notificationError);
        }
    }

    private static WinStats(winner: User, notificationError: NotificationError): void
    {
        if (!winner)
        {
            notificationError.AddError(ErrorCatalog.UserNotFound);
            return;
        }

        winner.wins += 1;
        winner.matchesPlayed += 1;
    }

    private static LoserStats(loser: User, notificationError: NotificationError): void
    {
        if (!loser)
        {
            notificationError.AddError(ErrorCatalog.UserNotFound);
            return;
        }

        loser.matchesPlayed += 1;
        loser.loses += 1;
    }
}