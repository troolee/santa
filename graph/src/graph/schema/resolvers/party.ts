import { Db } from "mongodb";
import { IContext } from "../../../graph/context";
import { nodeIdToStr } from "../../../lib/utils/strings/nodeId";
import { IParty } from "../interfaces";
import { IPartyEntity, IUserEntity, IPartyMembershipEntity } from "../../../db/interfaces";

interface IPartyArgs {
  code: string;
}

export async function partyEntityToNode(db: Db, party: IPartyEntity, user: IUserEntity | null): Promise<IParty | null> {
  if (party === null) {
    return null;
  }
  const isHost = Boolean(user && `${user._id}` === `${party.host}`);
  const membership = user !== null
    ? await db.collection('PartyMembership').findOne({party: party._id, member: user._id})
    : null;
  const isJoined = membership !== null;
  let participants: string[] | null = null;
  if (user && membership) {
    participants = (await db.collection('PartyMembership').find({
      party: party._id,
      member: {$ne: user._id},
    }).limit(3).toArray()).map((doc: IPartyMembershipEntity) => doc.name);
  }
  return {
    id: nodeIdToStr({kind: 'Party', id: party._id}),
    name: party.name,
    code: party.slug,
    isJoined,
    isHost,
    password: isHost ? party.password : null,
    isProtected: Boolean(party.password),
    participantCount: isJoined ? party.participantCount : null,
    participants,
  } as IParty;
}

export default {
  party: async (root: any, {code}: IPartyArgs, {user, db}: IContext) => {
    const theCode = code.toUpperCase();
    const party = await db.collection('Party').findOne({slug: theCode});
    return await partyEntityToNode(db, party, user);
  },
};
