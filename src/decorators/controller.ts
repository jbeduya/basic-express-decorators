import { Router } from "./router"
import 'reflect-metadata'
import { HttpMethods } from "./httpmethods"
import { MetadataKeys } from "./MetadataKeys"
import { RequestHandler } from "express"

export function controller(prefix: string = '', ...middleware: RequestHandler[]) {
    const router = Router.getInstance()
    return function(target: Function) {
        for (let key in target.prototype) {
            const routeHandler = target.prototype[key]

            const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key)
            const method: HttpMethods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key)
            const actionMiddlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || []

            if (process.env.DEBUG) {
                console.log(`route: ${prefix}${path}`)
            }

            if (path && method) {
                router[method](`${prefix}${path}`, [...middleware, ...actionMiddlewares], routeHandler)
            }
        }
    }
}