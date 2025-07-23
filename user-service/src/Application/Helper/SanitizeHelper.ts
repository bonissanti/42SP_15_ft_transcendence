export class SanitizeHelper
{
    public static SanitizerBoolean(value: any): boolean
    {
        if (typeof value === 'boolean')
            return value;

        return value === '1' || value === 'true' || value === 1;
    }

    public static SanitizerNumber(value: any): number | null
    {
        if (value === null || value === undefined)
            return null;

        const num = Number(value);
        if (isNaN(num))
            return null;

        return num;
    }

    public static SanitizerDate(value: string | Date | null | undefined): Date | null
    {
        if (value === null || value === undefined)
            return null;

        if (value instanceof Date)
            return value;

        const date = new Date(value);
        if (isNaN(date.getTime()))
            return null;

        return date;
    }
}