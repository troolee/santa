import { ObjectId } from 'bson';
import { Db } from "mongodb";
import _ from '../../../utils/resolvable';
import { createPartyInputSchema } from "../../../validationSchemas/parties";
import { ICreatePartyInput, IParty } from "../interfaces";
import { nodeIdToStr } from '../../../lib/utils/strings/nodeId';
import { randomString } from '../../../lib/utils/strings/random';

const generatePartySlug = async (db: Db) => {
  const PartyCollection = db.collection('Party');
  while(true) {
    const slug = randomString(5, 'QWERTYUIPASDFGHJKLZXCVBNM');
    if (await PartyCollection.findOne({slug})) {
      continue;
    }
    return slug;
  }
};

export default {
  parties: () => ({

    createParty: _(createPartyInputSchema)(async(input: ICreatePartyInput, {db, user}) => {
      const entity = {
        _id: new ObjectId(),
        host: user!._id,
        name: input.name,
        password: input.password,
        slug: await generatePartySlug(db),
      };
      // await db.collection('Party').insertOne(entity);
      return {
        node: {
          id: nodeIdToStr({kind: 'Party', id: entity._id}),
          name: entity.name,
          password: entity.password,
          code: entity.slug,
        } as IParty,
      };
    }),

  }),
};
