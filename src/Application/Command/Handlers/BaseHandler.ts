export interface BaseHandler<T>
{
    Handle(command: T): Promise<void>;
}