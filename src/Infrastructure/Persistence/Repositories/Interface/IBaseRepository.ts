export interface IBaseRepository
{
    Save(): Promise<void>;
    Reset(): Promise<void>;
    Clean(): Promise<void>;
    Create<T>(entity: T): Promise<void>;
    Update<T>(entity: T): Promise<void>;
    Delete<T>(entity: T): Promise<void>;
    FindByUuid(uuid: string): Promise<any>;
}