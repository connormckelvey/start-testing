import { Context, Tests } from './context'
import { Logger } from './logger'

const defaultOptions = { 
    logger: new Logger()
}

export class Runner extends Context {
    static async runSuite(name: string, tests: Tests, opts = defaultOptions) {
        return new Runner(name, opts).runSuite(tests)
    }

    async runSuite(tests: Tests): Promise<number> {
        for (let [name, test] of Object.entries(tests)) {
            if (name.startsWith("test") && typeof test === 'function') {
                await this.run(name, test)
            }
        }
        const numFailed = this.numFailed()
        if (numFailed > 0) {
            this.logger.warn(`${numFailed} test failure${numFailed > 1 ? 's' : ''}`)
        }
        this.logger.dump()
        return numFailed
    }
}