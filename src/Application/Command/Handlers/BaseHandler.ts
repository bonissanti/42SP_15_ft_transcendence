import {NotificationError} from "../../../Shared/Errors/NotificationError";

export interface BaseHandler<T>
{
    Handle(command: T, notificationError: NotificationError): Promise<void>;
}