import { IncomingMessage, ServerResponse } from "http";

export interface IContext {
  token: Partial<string>;
  res: ServerResponse;
  req: IncomingMessage;
}
