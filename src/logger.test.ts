import * as testing from './'
import { chaiAssert } from './extra/testUtils'

class TestLogger extends testing.Logger {
    new = () => new TestLogger()

    getLogs() {
        return this.logs
    }
}

export async function testLoggerLevels(t: testing.Context) {
    const logger = new TestLogger()
    const tests = [
        { input: "print", level: logger.print, expectedLogLevel: testing.LogLevel.DEFAULT },
        { input: "info", level: logger.info, expectedLogLevel: testing.LogLevel.INFO },
        { input: "warn", level: logger.warn, expectedLogLevel: testing.LogLevel.WARN },
        { input: "error", level: logger.error, expectedLogLevel: testing.LogLevel.ERROR },
        { input: "success", level: logger.success, expectedLogLevel: testing.LogLevel.SUCCESS }
    ]

    for (let i = 0; i < tests.length; i++) {
        const test = tests[i]
        
        await t.run(test.input, async (t) => {
            const assert = chaiAssert(t)

            test.level(test.input)

            const logs = logger.getLogs()
            assert.equal(logs.length, i + 1)

            const entry = logs.slice(-1)[0]
            assert.equal(entry.level, test.expectedLogLevel)
            assert.deepEqual(entry.message, [test.input])
        })
    }
}

export async function testLoggerNew(t: testing.Context) {
    const assert = chaiAssert(t)
    const logger = new TestLogger()
    assert.notDeepEqual(logger, logger.new())
}
