import { Request, Response } from "express";

export default function localAuthentication(req: Request, res: Response) {
  res.send(req.session);
}