import { RequestHandler } from 'express';
import 'reflect-metadata'
import { MetadataKeys } from './MetadataKeys';

export enum HttpMethods {
    get = 'get',
    post = 'post',
    put = 'put',
    del = 'delete',
    patch = 'patch',
    options = 'options',
    head = 'head'
}

function routeBinder(method: HttpMethods) {
    return function(path: string, ...middlewares: RequestHandler[]) {
        return function(target: any, key: string, desc: PropertyDescriptor) {
            Reflect.defineMetadata(MetadataKeys.path, path, target, key);
            Reflect.defineMetadata(MetadataKeys.method, method, target, key)

            const actionMiddlewares = Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];

            Reflect.defineMetadata(MetadataKeys.middleware, [...actionMiddlewares, ...middlewares], target, key)
        }
    }
}

export const get = routeBinder(HttpMethods.get)
export const post = routeBinder(HttpMethods.post)
export const put = routeBinder(HttpMethods.put)
export const del = routeBinder(HttpMethods.del)
export const patch = routeBinder(HttpMethods.patch)
export const options = routeBinder(HttpMethods.options)
export const head = routeBinder(HttpMethods.head)