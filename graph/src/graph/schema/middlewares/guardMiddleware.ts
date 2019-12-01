import { GraphQLResolveInfo } from "graphql";
import { IContext } from "../../context";

export const guardMiddleware = async (resolve: any, root: any, args: any, context: IContext,
                                      info: GraphQLResolveInfo) => {

  return await resolve(root, args, context, info);
};
