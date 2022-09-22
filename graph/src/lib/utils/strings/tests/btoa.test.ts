import { btoa } from 'src/lib/utils/strings/btoa';

describe('Testing btoa', () => {
  test.each([
    ["Hello", "SGVsbG8="],
    ["You can mock a single function using jest.fn():", "WW91IGNhbiBtb2NrIGEgc2luZ2xlIGZ1bmN0aW9uIHVzaW5nIGplc3QuZm4oKTo="],
    ["", ""],
  ])('btoa("%s") === "%s"', (a, b) => {
    expect(btoa(a)).toBe(b);
  });
});
