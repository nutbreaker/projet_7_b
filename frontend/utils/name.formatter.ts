/**
 * Extracts the first letters of a person's first and last name.
 * 
 * @param name a full name string with first and last name separated by a space
 * @returns a two-character string containing the first letter of the first name and last name
 * 
 * @example
 * nameFormatter('John Doe')     // Returns "JD"
 * nameFormatter('Marie Dupont') // Returns "MD"
 */
export function nameFormatter(name: string) {
    const [firstName, lastName] = name.split(' ');

    return (firstName?.[0] ?? '') + (lastName?.[0] ?? '');
}