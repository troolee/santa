import app from './app';
import user from './user';
import parties from './parties';
import party from './party';

export default {
  Query: {
    ...app,
    ...user,
    ...party,
  },
  Mutation: {
    ...parties,
  },
  Node: {
    __resolveType: (obj: any) => obj.resolveType,
  },
  MutationPayload: {
    __resolveType: (obj: any) => obj.resolveType,
  },
};
