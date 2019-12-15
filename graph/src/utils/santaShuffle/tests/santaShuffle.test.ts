import santaShuffle from '../santaShuffle';

describe('Test santa shuffle', () => {
  test('empty array remains empty', () => {
    const res = santaShuffle([]);
    expect(res).toStrictEqual([]);
  });
  test('array from 1 element should points to themself', () => {
    const res = santaShuffle([1]);
    expect(res).toStrictEqual([{src: 1, target: 1}]);
  });
  test('array from 2 elements should points to each other', () => {
    const res = santaShuffle([1, 2]);
    res.sort((a, b) => a.src - b.src);
    expect(res).toStrictEqual([
      {src: 1, target: 2},
      {src: 2, target: 1},
    ]);
  });
  test('custom comparator', () => {
    const res = santaShuffle([1, 2], (a, b) => a === b);
    res.sort((a, b) => a.src - b.src);
    expect(res).toStrictEqual([
      {src: 1, target: 2},
      {src: 2, target: 1},
    ]);
  });
});
