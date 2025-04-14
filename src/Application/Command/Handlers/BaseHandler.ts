export interface BaseHandler<T>
{
    handle(command: T): Promise<void>;
}