import {BaseValidator} from "../../Command/Validators/BaseValidator";
import {GenerateMatchmakingQuery} from "../QueryObject/GenerateMatchmakingQuery";
import {NotificationError} from "../../../Shared/Errors/NotificationError";
import {BackendApiClient} from "../../../Infrastructure/Http/Concrete/BackendApiClient";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog";
import {CustomError} from "../../../Shared/Errors/CustomError";
import {ValidationException} from "../../../Shared/Errors/ValidationException";

export class GenerateMatchmakingQueryValidator implements BaseValidator<GenerateMatchmakingQuery>
{
    private backendApiClient: BackendApiClient;

    constructor(private notificationError: NotificationError)
    {
        this.backendApiClient = new BackendApiClient();
    }

    public async Validator(query: GenerateMatchmakingQuery): Promise<void>
    {
        await this.ValidateUsersExists(query);

        if (query.wins < 0)
            this.notificationError.AddError(ErrorCatalog.NegativePoints);

        if (this.notificationError.NumberOfErrors() > 0)
        {
            const allErrors: CustomError[] = this.notificationError.GetAllErrors();
            throw new ValidationException(allErrors);
        }
    }

    private async ValidateUsersExists(query: GenerateMatchmakingQuery): Promise<void>
    {
        try
        {
            const exists: boolean = await this.backendApiClient.VerifyIfUserExists(query.uuid);

            if (!exists)
                this.notificationError.AddError(ErrorCatalog.UserNotFound);
        }
        catch (error)
        {
            this.notificationError.AddError(ErrorCatalog.InternalBackendApiErrorVerifyIfUserExists);
        }
    }
}