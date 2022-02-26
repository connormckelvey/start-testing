import * as testing from '../../src'
import { chaiAssert } from '../../src/extra/testUtils'

const tests = {
    testFailAssert: async (t: testing.Context) => { 
        const assert = chaiAssert(t)
        assert.equal(0, 1)
    }
}

testing.Runner.runSuite('failings tests assert', tests)
    .then(process.exit)
