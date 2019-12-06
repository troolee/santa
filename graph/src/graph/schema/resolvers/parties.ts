import _ from '../../../utils/resolvable';
import { createPartyInputSchema } from "../../../validationSchemas/parties";
import { ICreatePartyInput, IParty } from "../interfaces";

export default {
  parties: () => ({

    createParty: _(createPartyInputSchema)((input: ICreatePartyInput, {db, user}) => {
      return {
        node: {
          id: "1",
          name: input.name,
          password: input.password,
        } as IParty,
      };
    }),

  }),
};
