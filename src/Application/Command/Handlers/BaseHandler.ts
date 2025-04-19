import {NotificationError} from "../../../Shared/Errors/NotificationError.js";

export interface BaseHandler<T>
{
    Handle(command: T, notificationError: NotificationError): Promise<void>;
}