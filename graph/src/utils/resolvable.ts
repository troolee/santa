import { ObjectSchema } from "yup";
import { INode, INodeMutationPayload, IMutationInput } from "../graph/schema/interfaces";
import { IContext } from "../graph/context";

type Promisable<T> = T | Promise<T>;

export default function resolvable(schema: ObjectSchema) {
  return <I, T extends INode>(
    ƒ: (input: I, context: IContext) => Promisable<Partial<INodeMutationPayload<T>>>,
  ) => {
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
        ...await Promise.resolve(ƒ(data, context)),
      };
    };
  };
}
