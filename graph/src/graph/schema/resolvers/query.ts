import app from './app';
import user from './user';

export default {
  Query: {
    ...app,
    ...user,
  },
  Node: {
    __resolveType: (obj: any) => obj.resolveType,
  },
};
