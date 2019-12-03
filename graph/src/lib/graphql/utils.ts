import { GraphQLResolveInfo } from "graphql";

export function getPathFromInfo({path}: GraphQLResolveInfo): string {
  const items = [];
  for (let p = path.prev; p; p = p.prev) {
    items.unshift(p.key);
  }
  items.push(path.key);
  return items.join('.');
}
