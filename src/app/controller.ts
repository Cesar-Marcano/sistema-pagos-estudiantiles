import { NextFunction, Request, RequestHandler, Response } from "express";

export interface HydratedRequest<Body, User> extends Request {
  body: Body;
  user: User;
}

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type Handler<Body = null, User = null> = (
  req: HydratedRequest<Body, User>,
  res: Response
) => void;

export abstract class Controller<Body = never, User = null> {
  public abstract middlewares: Middleware[];

  public abstract handler(
    req: HydratedRequest<Body, User>,
    res: Response
  ): void;

  public build(): RequestHandler[] {
    return [...this.middlewares, this.handler.bind(this)] as RequestHandler[];
  }
}
