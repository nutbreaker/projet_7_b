/**
 * Formats a timestamp into a French locale date string.
 * 
 * @param timestamp the date string to format (must be a valid date string 
 * parseable by Date constructor)
 * 
 * @returns A formatted date string in French locale (e.g., "27 juin")
 * 
 * @example
 * dateFormatter('2026-06-27') // Returns "27 juin"
 * dateFormatter('2026-01-15') // Returns "15 janvier"
 */
export function dateFormatter(timestamp: string): string {
    return new Date(timestamp).toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'long'
    });
}

/**
 * Formats a date to French locale with date and time.
 * 
 * @param timestamp a date string
 * @returns a formatted string in French locale (e.g., "23 mars, 11:20")
 */
export function dateTimeFormatter(timestamp: string): string {
    const date = new Date(timestamp);

    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));

    return utcDate.toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
    }).replace(' à ', ', ');
}

/**
 * Extracts (YYYY-MM-DD) from ISO 8601 string.
 *
 * @param isoDate the date string ISO formatted (ex: "2026-08-02T15:08:05.000Z" or "2026-08-02T15:08:05")
 * 
 * @returns the segment representing the date (ex: "2026-08-02"), or empty string if input falsy.
 *
 * @example
 * isoStringDate('2026-08-02T17:00:00.000Z');
 * // Output: '2026-08-02'
 * 
 * @example
 * isoStringDate();
 * // Output: ''
 */
export function isoStringDate(isoDate: string = '') {
    if (!isoDate) return '';

    const [date] = isoDate.split('T');

    return date;
}