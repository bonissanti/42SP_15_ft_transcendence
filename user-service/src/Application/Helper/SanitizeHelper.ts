export class SanitizeHelper
{
    public static SanitizerBoolean(value: any): boolean
    {
        if (typeof value === 'boolean')
            return value;

        return value === '1' || value === 'true' || value === 1;
    }

    public static SanitizerNumber(value: any): number
    {
        if (typeof value === 'number')
            return true;
    }
}