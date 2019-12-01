// tslint:disable-next-line:no-namespace
declare namespace Express {
  // tslint:disable-next-line:interface-name
  export interface Response {
      ok: (obj?: any, status?: number) => void;
      die: (obj?: any, status?: number) => void;
  }

  // tslint:disable-next-line:interface-name
  export interface Request {
    context: IRequestContext;
  }
}
