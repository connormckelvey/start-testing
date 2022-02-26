import * as testing from '../src'
import { NodeColorLogger } from '../src/extra/nodeLogger'
import * as loggerTests from '../src/logger.test'
import * as contextTests from '../src/context.test'
import * as runnerTests from '../src/runner.test'
import { nodeIntegrationTests } from '../test/nodeIntegration.test'

const unitTests = {
    ...loggerTests,
    ...contextTests,
    ...runnerTests,
}

async function runTests() {
    // Sanity tests to ensure below test suite is trustworthy
    await nodeIntegrationTests()

    testing.Runner.runSuite('unit tests', unitTests, { logger: new NodeColorLogger() })
        .then(process.exit)
}

runTests()
