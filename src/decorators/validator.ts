import 'reflect-metadata'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { MetadataKeys } from './MetadataKeys'
import { validationResult } from 'express-validator';

export function validator(validators: any) {
    return function(target: any, key: string, desc: PropertyDescriptor) {
        const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];
        const customValidator = (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req).array()
            if (errors.length > 0) {
                return res.json(errors.map(m => [ m.param, m.msg ] )).status(400);
            }
            next();
        }
        Reflect.defineMetadata(MetadataKeys.middleware, [...middlewares, ...validators, customValidator], target, key)
    }
}