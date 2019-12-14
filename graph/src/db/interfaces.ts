import { ObjectId, ObjectID } from "bson";

export interface IEntity {
  _id: ObjectId;
}

export interface IFacebookProfile {
  id: number;
  name: string;
}

export interface IUserProfiles {
  facebook: IFacebookProfile;
}

export interface IUserEntity extends IEntity {
  name: string;
  picture: string;
  profiles: IUserProfiles;
}

export interface IPartyEntity extends IEntity {
  host: ObjectId;
  name: string;
  password: string | null;
  slug: string;
  participantCount: number;
  isClosed?: boolean;
}

export interface IPartyMembershipEntity extends IEntity {
  party: ObjectId;
  member: ObjectId;
  name: string;
  target?: {
    user: ObjectID;
    name: string;
  };
}
