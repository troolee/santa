import { ObjectSchema } from "yup";
import { INode, INodeMutationPayload, IMutationInput } from "../graph/schema/interfaces";
import { IContext } from "../graph/context";

export default function resolvable(schema: ObjectSchema) {
  return function resolve<I, T extends INode>(
    cb: (input: I, context: IContext) => Partial<INodeMutationPayload<T>> | Promise<Partial<INodeMutationPayload<T>>>,
  ) {
    return async ({input}: IMutationInput<I>, context: IContext) => {
      try {
        await schema.validate(input);
      } catch ({path, errors}) {
        return {
          status: 'error',
          userErrors: [{
            fieldName: path,
            messages: errors,
          }],
        };
      }
      const data = schema.cast(input) as any;
      return {
        status: 'ok',
        userErrors: null,
        ...await Promise.resolve(cb(data, context)),
      };
    };
  };
}
