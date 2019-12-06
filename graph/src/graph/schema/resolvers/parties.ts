import { ObjectId } from 'bson';
import { Db } from "mongodb";
import _ from '../../../utils/resolvable';
import { createPartyInputSchema } from "../../../validationSchemas/parties";
import { ICreatePartyInput } from "../interfaces";
import { randomString } from '../../../lib/utils/strings/random';
import { partyEntityToNode } from './party';

const generatePartySlug = async (db: Db) => {
  const PartyCollection = db.collection('Party');
  while (true) {
    const slug = randomString(5, 'QWERTYUIPASDFGHJKLZXCVBNMO');
    if (await PartyCollection.findOne({slug})) {
      continue;
    }
    return slug;
  }
};

export default {
  parties: () => ({

    createParty: _(createPartyInputSchema)(async (input: ICreatePartyInput, {db, user}) => {
      const entity = {
        _id: new ObjectId(),
        host: user!._id,
        name: input.name,
        password: input.password,
        slug: await generatePartySlug(db),
        participantCount: 1,
      };
      await db.collection('Party').insertOne(entity);
      await db.collection('PartyMembership').insertOne({
        party: entity._id,
        member: user!._id,
      });
      return {
        node: await partyEntityToNode(db, entity, user),
      };
    }),

  }),
};
