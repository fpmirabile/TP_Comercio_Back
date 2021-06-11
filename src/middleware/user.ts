import express from "express";

export const isAdmin = [
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = (req as any).user;
    if (user) {
        if (user.isAdmin) {
          return next();
        }

        return res.status(401).send();
    }

    res.status(401).send();
  },
];
