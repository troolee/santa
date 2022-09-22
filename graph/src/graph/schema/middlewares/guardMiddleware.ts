import { AuthenticationError } from "apollo-server-core";
import { GraphQLResolveInfo } from "graphql";
import { IContext } from "src/graph/context";
import { getPathFromInfo } from "src/lib/graphql/utils";

export const guardMiddleware = async (resolve: any, root: any, args: any, context: IContext,
                                      info: GraphQLResolveInfo) => {

  const path = getPathFromInfo(info);

  if (context.user === null) {
    if (info.operation.operation === 'mutation') {
      throw new AuthenticationError('Unauthenticated');
    } else if (!/(^app$)|(^app\.)|(^party$)|(^party\.)/.exec(path)) {
      return null;
    }
  }

  return await resolve(root, args, context, info);
};
