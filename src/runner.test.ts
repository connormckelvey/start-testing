import * as testing from './'
import { chaiAssert } from './extra/testUtils'

export async function testRunnerRunSuite(t: testing.Context) {
    const assert = chaiAssert(t)

    let numRunTests = 0
    const numfailed = await testing.Runner.runSuite('test runner', {
        testPass1: async () => { numRunTests++ },
        testPass2: async () => { numRunTests++ },
        testPass3: async () => { numRunTests++ },
        testError1: async(t) => { t.error("1"); numRunTests++ },
        testError2: async(t) => { t.error("2"); numRunTests++ },
        testFatal1: async(t) => { numRunTests++; t.fatal("1") },
        exclude1: async(t) => { numRunTests++ },
        exclude2: "whoops" as any
    })

    assert.equal(numRunTests, 6)
    assert.equal(numfailed, 3)
}
