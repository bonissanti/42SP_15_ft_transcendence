import {NotificationError} from "../../../../Shared/Errors/NotificationError.js";

export interface IBaseRepository<T>
{
    Create(entity: T, notification: NotificationError): Promise<void>;
    Update(_uuid: string, entity: T, notification: NotificationError): Promise<void>;
    Delete(_uuid: string, notification: NotificationError): Promise<void>;
    GetByUsername(_username: string, notification: NotificationError): Promise<T | null>;
    GetByUUID(uuid: string, notification: NotificationError): Promise<T | null>;
    GetAll(): Promise<T[] | null>;
    VerifyIfUserExistsByUUID(uuid: string): Promise<boolean>;
}