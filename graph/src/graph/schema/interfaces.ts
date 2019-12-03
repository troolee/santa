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
  picture: string;
}
