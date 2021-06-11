import express from 'express';


export interface CRUDController {
    getAll: (req: express.Request, res: express.Response, next: express.NextFunction) => any;
    getOne: (req: express.Request, res: express.Response, next: express.NextFunction) => any;
    update: (req: express.Request, res: express.Response, next: express.NextFunction) => any;
    create: (req: express.Request, res: express.Response, next: express.NextFunction) => any;
    delete: (req: express.Request, res: express.Response, next: express.NextFunction) => any;
}