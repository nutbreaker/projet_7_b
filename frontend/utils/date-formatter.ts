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