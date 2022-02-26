import * as testing from '../../src'
import { chaiAssert } from '../../src/extra/testUtils'

const tests = {
    testPassAssert: async (t: testing.Context) => { 
        const assert = chaiAssert(t)
        assert.equal(0, 0)
    }
}

testing.Runner.runSuite('passing tests assert', tests)
    .then(process.exit)
