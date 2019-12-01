/**
 * Encodes string to base64
 * @param s string to encode
 */
export function btoa(s: string): string {
  return Buffer.from(s).toString('base64');
}
