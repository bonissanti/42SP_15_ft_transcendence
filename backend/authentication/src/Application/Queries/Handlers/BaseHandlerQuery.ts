import {NotificationError} from "../../../Shared/Errors/NotificationError.js";

export interface BaseHandlerQuery<T>
{
    Handle(command: T): Promise<T>;
}