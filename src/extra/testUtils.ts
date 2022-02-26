import * as testing from '../'
import * as chai from 'chai'

export type TestUtil<T = any> = (t: testing.Context) => T
export type TestUtils<T extends Record<string, TestUtil>> = {
    [K in keyof T]: T[K]
}

function chaiWithContext(t: testing.Context, handler: (t: testing.Context, e: Error) => void) {
    return new Proxy<Chai.Assert>(chai.assert, {
        get(target, propertyKey, receiver) {
            return function (...args: any[]) {
                try {
                    const assertion = Reflect.get(target, propertyKey, receiver) as Function
                    assertion(...args)
                } catch (e) {
                    handler(t, e)
                }
            }
        }
    })
}

export function chaiAssert(t: testing.Context) {
    return chaiWithContext(t, (t, e) => {
        t.error(e)
        t.log(e.stack)
    })
}

export function chaiRequire(t: testing.Context) {
    return chaiWithContext(t, (t, e) => {
        t.fatal(e)
    })
}
