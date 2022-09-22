import app from 'src/graph/schema/resolvers/app';
import user from 'src/graph/schema/resolvers/user';
import parties from 'src/graph/schema/resolvers/parties';
import party from 'src/graph/schema/resolvers/party';

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
