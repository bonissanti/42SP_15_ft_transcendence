import {NotificationError} from "../../../../Shared/Errors/NotificationError.js";

export interface IBaseRepository<TQueryDTO, TEntity>
{
    Create(entity: TEntity, notification: NotificationError): Promise<void>;
    Update(_uuid: string, entity: TEntity, notification: NotificationError): Promise<void>;
    Delete(_uuid: string, notification: NotificationError): Promise<void>;
    GetAll(): Promise<TEntity[] | null>;
}