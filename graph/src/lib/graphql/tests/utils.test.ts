import { GraphQLResolveInfo } from 'graphql';
import { getPathFromInfo } from '../utils';

describe('Test getPathFromInfo', () => {
  test('root value', () => {
    expect(getPathFromInfo({path: {
      prev: undefined,
      key: 'bar',
    }} as GraphQLResolveInfo)).toBe('bar');
  });

  test('2 levels value', () => {
    expect(getPathFromInfo({path: {
      prev: {
        prev: undefined,
        key: 'foo',
      },
      key: 'bar',
    }} as GraphQLResolveInfo)).toBe('foo.bar');
  });

  test('3 levels value', () => {
    expect(getPathFromInfo({path: {
      prev: {
        prev: {
          prev: undefined,
          key: 'hello',
        },
        key: 'foo',
      },
      key: 'bar',
    }} as GraphQLResolveInfo)).toBe('hello.foo.bar');
  });
});
