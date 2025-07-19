import {NotificationError} from "../../../Shared/Errors/NotificationError";

export interface BaseHandlerCommand<T>
{
    Handle(command: T, notificationError: NotificationError): Promise<void>;
}