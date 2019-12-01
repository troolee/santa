import { Request, Response, NextFunction } from "express";
import { Db } from "mongodb";

export interface IRequestContext {
  db: Db;
}

export const commonHelpers = (db: Db) => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.context = {
      db,
    };

    res.ok = (data?: any, status: number = 200) => {
      res.status(status).json({
        status: 'ok',
        ...data,
      });
    };

    res.die = (data?: any, status: number = 400) => {
      res.status(status).json({
        status: 'error',
        ...data,
      });
    };

    next();
  };
};

export const commonHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Developed-By', 'Made in Canada by Ugly Unicorn (uglyunicorn.ca)');
  res.setHeader('X-Powered-By', 'Maple Syrup, eh!');

  next();
};
