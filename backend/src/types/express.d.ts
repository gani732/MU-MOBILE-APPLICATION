import { Request, Response, NextFunction } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId: number;
      role: string;
    };
  }
}

export type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
