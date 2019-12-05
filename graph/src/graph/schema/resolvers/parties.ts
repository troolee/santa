import { ICreatePartyInput, IMutationInput, ICreatePartyPayload } from "../interfaces";
import { IContext } from "../../../graph/context";

export default {
  parties: () => ({
    createParty: ({input}: IMutationInput<ICreatePartyInput>, {db, user}: IContext): ICreatePartyPayload => {
      // do stuff
      return {
        node: null,
        userErrors: null,
        status: 'error',
      };
    },
  }),
};
