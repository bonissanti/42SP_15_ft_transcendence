import {NotificationError} from "../../../Shared/Errors/NotificationError.js";

export interface BaseHandlerCommand<T>
{
    Handle(command: T, notificationError: NotificationError): Promise<void>;
}