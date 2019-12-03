import { ObjectId } from "bson";

export interface IEntity {
  _id: ObjectId;
}

export interface IUserEntity extends IEntity {
  name: string;
  picture: string;
}
