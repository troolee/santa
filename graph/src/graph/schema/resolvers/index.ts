import app from './app';
import user from './user';
import parties from './parties';

export default {
  Query: {
    ...app,
    ...user,
  },
  Mutation: {
    ...parties,
  },
  Node: {
    __resolveType: (obj: any) => obj.resolveType,
  },
};
