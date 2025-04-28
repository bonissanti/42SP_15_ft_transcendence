import {NotificationError} from "../../../../Shared/Errors/NotificationError.js";
import {UserQueryDTO} from "../../../../Domain/DTO/Query/UserQueryDTO.js";

export interface IBaseRepository<T>
{
    Create(entity: T, notification: NotificationError): Promise<void>;
    Update(_uuid: string, entity: T, notification: NotificationError): Promise<void>;
    Delete(_uuid: string, notification: NotificationError): Promise<void>;
    GetAll(): Promise<T[] | null>;
    GetFullUsers(): Promise<UserQueryDTO[]>
    GetUserByIdentifier(Uuid?: string, Username?: string): Promise<UserQueryDTO | null>;
    VerifyIfUserExistsByUUID(uuid: string): Promise<boolean>;
}