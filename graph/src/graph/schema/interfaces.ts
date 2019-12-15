export interface INode {
  id: string;
}

export interface IApp {
  name: string;
  version: string;
  author: string;
}

export interface IUser extends INode {
  name: string;
  picture: string | null;
}

export interface IParty extends INode {
  code: string;
  name: string;
  password: string | null;
  isJoined: boolean;
  isHost: boolean;
  isProtected: boolean;
  isClosed: boolean;
  participantCount: number | null;
  participants: string[] | null;
  target: IUser | null;
}

export interface IUserError {
  fieldName: string | null;
  messages: string[];
}

export interface IMutationPayload {
  status: 'ok' | 'error';
  userErrors: IUserError[] | null;
}

export interface INodeMutationPayload<T extends INode> extends IMutationPayload {
  node: T | null;
}

export type ICreatePartyPayload = INodeMutationPayload<IParty>;

export interface ICreatePartyInput {
  name: string;
  password: string | null;
}

export interface IJoinPartyInput {
  party: string;
  password: string | null;
}

export interface ILeavePartyInput {
  party: string;
}

export interface IClosePartyInput {
  party: string;
}

export type IJoinPartyPayload = INodeMutationPayload<IParty>;

export type ILeavePartyPayload = INodeMutationPayload<IParty>;

export type IClosePartyPayload = INodeMutationPayload<IParty>;

export interface IMutationInput<T> {
  input: T;
}
