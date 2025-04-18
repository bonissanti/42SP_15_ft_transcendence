import {NotificationError} from "../../../../Shared/Errors/NotificationError";

export interface IBaseRepository<T>
{
    Create(entity: T, notification: NotificationError): Promise<void>;
    Update(_username: string, entity: T, notification: NotificationError): Promise<void>;
    Delete(_username: string, notification: NotificationError): Promise<void>;
    GetByUsername(uuid: string, notification: NotificationError): Promise<T>;
    GetAll(): Promise<T[]>;
}