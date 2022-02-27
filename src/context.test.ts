import * as testing from './'
import { chaiAssert } from './extra/testUtils'

export async function testContextOK(t: testing.Context) {
    class TestLogger extends testing.Logger {
        new = () => new TestLogger()
    
        getLogs() {
            return this.logs
        }
    }

    class TestContext extends testing.Context {
        protected new = (name: string) => new TestContext(name, this.opts)

        assert() {
            const assert = chaiAssert(t)
            const { subContexts } = this
            assert.equal(subContexts.length, 1)

            const subContext = subContexts[0] as TestContext
            const { errors, failed, exception } = subContext
            assert.isFalse(failed)
            assert.lengthOf(errors, 0)
            assert.isUndefined(exception)

            assert.equal(this.numFailed(), 0)

            const logger = subContext.logger as TestLogger
            const logs = logger.getLogs()
            
            assert.lengthOf(logs, 3)

            assert.equal(logs[0].level, testing.LogLevel.INFO)
            assert.deepEqual(logs[0].message, ['TEST: test / test 1...'])

            assert.equal(logs[1].level, testing.LogLevel.DEFAULT)
            assert.deepEqual(logs[1].message, ['hello world'])

            assert.equal(logs[2].level, testing.LogLevel.SUCCESS)
            assert.isTrue(logs[2].message[0].startsWith('PASSED!'))

        }
    }

    const testContext = new TestContext('test', {
        logger: new TestLogger()
    })

    await testContext.run('test 1', async (t: TestContext) => {
        t.log('hello world')
    })

    testContext.assert()
}


export async function testContextError(t: testing.Context) {
    class TestContext extends testing.Context {
        protected new = (name: string) => new TestContext(name, this.opts)

        assert() {
            const assert = chaiAssert(t)
            const { subContexts } = this
            assert.equal(subContexts.length, 1)

            const { errors, failed, exception } = subContexts[0] as TestContext
            assert.isTrue(failed)
            assert.equal(errors.length, 1)
            assert.equal(errors[0], "test error")
            assert.isUndefined(exception)

            assert.equal(this.numFailed(), 1)
        }
    }

    const testContext = new TestContext('test', {
        logger: new testing.Logger()
    })

    await testContext.run('test 1', async (t: TestContext) => {
        t.error('test error')
    })

    testContext.assert()
}

export async function testContextFatal(t: testing.Context) {
    class TestContext extends testing.Context {
        protected new = (name: string) => new TestContext(name, this.opts)

        assert() {
            const assert = chaiAssert(t)
            const { subContexts } = this
            assert.equal(subContexts.length, 1)

            const { errors, failed, exception } = subContexts[0] as TestContext
            assert.isTrue(failed)
            assert.equal(errors.length, 0)
            assert.instanceOf(exception, Error)

            assert.equal(this.numFailed(), 1)
        }
    }

    const testContext = new TestContext('test', {
        logger: new testing.Logger()
    })

    await testContext.run('test 1', async (t: TestContext) => {
        t.fatal('test fatal')
    })

    testContext.assert()
}



