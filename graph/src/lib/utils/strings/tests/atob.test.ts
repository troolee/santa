import { atob } from '../atob';

describe('Testing atob', () => {
  test.each([
    ["SGVsbG8=", "Hello"],
    ["WW91IGNhbiBtb2NrIGEgc2luZ2xlIGZ1bmN0aW9uIHVzaW5nIGplc3QuZm4oKTo=", "You can mock a single function using jest.fn():"],
    ["", ""],
  ])('atob("%s") === "%s"', (a, b) => {
    expect(atob(a)).toBe(b);
  });
});
