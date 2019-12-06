const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function randomString(length: number, abc: string = ABC): string {
  const result: string[] = [];
  const abcLength = abc.length;
  for (let i = 0; i < length; i++) {
     result.push(abc.charAt(Math.floor(Math.random() * abcLength)));
  }
  return result.join('');
}
