import { Db } from "mongodb";
import { IncomingMessage, ServerResponse } from "http";
import { IUserEntity } from "src/db/interfaces";

export interface IContext {
  db: Db;
  token: string | null;
  user: IUserEntity | null;
  res: ServerResponse;
  req: IncomingMessage;
}
