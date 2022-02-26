import * as testing from '../../src'

const tests = {
    testFail1: async (t: testing.Context) => { t.error("1") },
    testFail2: async (t: testing.Context) => { t.error("2") },
    testFail3: async (t: testing.Context) => { t.error("3") }
}

testing.Runner.runSuite('failings tests', tests)
    .then(process.exit)
