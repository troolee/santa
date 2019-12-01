/**
 * Decodes base64
 * @param s base64 encoded string
 */
export function atob(s: string): string {
  return Buffer.from(s, 'base64').toString();
}
