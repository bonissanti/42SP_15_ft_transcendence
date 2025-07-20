import {NotificationError} from "../../../Shared/Errors/NotificationError";

export interface BaseValidator<T>
{
    Validator(command: T, notificationError: NotificationError): void;
}