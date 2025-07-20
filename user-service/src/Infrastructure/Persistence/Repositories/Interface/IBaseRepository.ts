import {NotificationError} from "../../../../Shared/Errors/NotificationError.js";
import {GetUserDTO} from "../../../../Application/DTO/Query/GetUserDTO.js";
import {GetUserQueryDTO} from "../../../../Domain/QueryDTO/GetUserQueryDTO.js";
import {User} from "../../../../Domain/Entities/Concrete/User.js";

export interface IBaseRepository<TQueryDTO, TEntity>
{
    Create(entity: TEntity, notification: NotificationError): Promise<void>;
    Update(_uuid: string, entity: TEntity, notification: NotificationError): Promise<void>;
    Delete(_uuid: string, notification: NotificationError): Promise<void>;
    GetAll(): Promise<TEntity[] | null>;
    GetUserQueryDTOByUuid(uuid: string): Promise<TQueryDTO | null>;
    GetUserEntityByUuid(uuid: string): Promise<TEntity | null>;
    GetFullUsers(): Promise<TQueryDTO[]>
    VerifyIfUserExistsByUUID(uuid: string): Promise<boolean>;
    VerifyIfUserExistsByUsername(username: string): Promise<boolean>;
}