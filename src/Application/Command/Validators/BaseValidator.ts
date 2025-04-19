import {NotificationError} from "../../../Shared/Errors/NotificationError.js";

export interface BaseValidator<T>
{
    Validator(command: T, notificationError: NotificationError): void;
}