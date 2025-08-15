export interface BaseHandlerQuery<TQuery, TResult = TQuery>
{
    Handle(command: TQuery): Promise<TResult>;
}