import { ObjectId } from "bson";

export interface IEntity {
  _id: ObjectId;
}

export interface IUserEntity extends IEntity {
  name: string;
  picture: string;
}

export interface IPartyEntity extends IEntity {
  host: ObjectId;
  name: string;
  password: string | null;
  slug: string;
  participantCount: number;
}

export interface IPartyMembershipEntity extends IEntity {
  party: ObjectId;
  member: ObjectId;
  name: string;
  target: ObjectId | null;
}
