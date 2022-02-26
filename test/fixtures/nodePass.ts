import * as testing from '../../src'

const tests = {
    testPass1: async (t: testing.Context) => {},
    testPass2: async (t: testing.Context) => {},
    testPass3: async (t: testing.Context) => {}
}

testing.Runner.runSuite('passing tests', tests)
    .then(process.exit)
