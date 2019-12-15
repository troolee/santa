import lodash from 'lodash';

interface IPair<T> {
  src: T;
  target: T;
}

type Comparator<T> = (a: T, b: T) => boolean;

export default function santaShuffle<T>(source: T[], cmp: Comparator<T> = (a, b) => a === b): Array<IPair<T>> {
  let hat = lodash.clone(source);
  const targets: T[] = [];

  for (let i = 0; i < source.length - 1; ++i) {
    const src = source[i];
    let target: T;
    while (true) {
      hat = lodash.shuffle(hat);
      target = hat.pop()!;
      if (!cmp(src, target)) {
        break;
      }
      hat.push(target);
    }
    targets.push(target);
  }

  if (cmp(lodash.last(source)!, hat[0])) {
    targets.push(targets.shift()!);
    targets.unshift(lodash.last(source)!);
  } else {
    targets.push(hat.pop()!);
  }

  const result = [];
  for (let i = 0; i < source.length; ++i) {
    result.push({
      src: source[i],
      target: targets[i],
    });
  }
  return result;
}
