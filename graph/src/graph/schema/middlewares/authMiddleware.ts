import { JWT } from '@panva/jose';
import { GraphQLResolveInfo } from "graphql";
import { ObjectId } from 'bson';
import { authRsaKey, ITokenPayload } from 'src/lib/crypto';
import { IContext } from "src/graph/context";
import { IUserEntity } from 'src/db/interfaces';

export const authMiddleware = async (resolve: any, root: any, args: any, context: IContext,
                                     info: GraphQLResolveInfo) => {
  if (context.token === null) {
    let auth = context.req.headers.authorization;
    if (auth) {
      /* istanbul ignore next */
      if (typeof auth !== 'string') {
        auth = auth[0];
      }
      const [authType, token] = (auth as string).split(' ', 2);
      if (authType !== 'Bearer') {
        throw new Error('403: Authorization error');
      }

      try {
        const {id} = JWT.verify(token, authRsaKey) as ITokenPayload;
        const entityId = ObjectId.createFromHexString(id);
        const user = await context.db.collection('User').findOne({_id: entityId}) as IUserEntity;

        if (user === null) {
          throw new Error('403: Authorization error');
        }

        context.token = token;
        context.user = user;
      } catch {
        context.token = null;
        context.user = null;
      }
    }
  }

  return await resolve(root, args, context, info);
};
