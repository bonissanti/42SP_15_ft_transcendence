import {NotificationError} from "../../../Shared/Errors/NotificationError.js";

export interface BaseHandlerQuery<TQuery, TResult = TQuery>
{
    Handle(command: TQuery): Promise<TResult>;
}
