import { Logger } from './logger'

export type Test = (t: Context, ...args: any[]) => Promise<void>
export type Tests = Record<string, Test>

export type ContextOptions = {
    logger: Logger
}

export class Context {
    protected failed: boolean = false
    protected errors: any[] = []
    protected exception?: Error

    protected subContexts: Context[] = []
    protected logger: Logger

    constructor(protected readonly name: string, protected readonly opts: ContextOptions) {
        this.logger = opts.logger.new()
    }

    log(...message: any[]) {
        this.logger.print(...message)
    }

    error(error: any) {
        this.failed = true
        this.errors.push(error)
    }

    fatal(error: any) {
        throw new Error(error)
    }

    async run(name: string, test: Test): Promise<void> {
        const start = performance.now()
        const ctx = this.addCtx(`${this.name} / ${name}`)
        try {
            ctx.logger.info(`TEST: ${ctx.name}...`)
            await test(ctx)
        } catch (e) {
            ctx.failed = true
            ctx.exception = e
        } finally {
            if (ctx.failed) {
                ctx.logger.error('FAILED:')
                ctx.errors.forEach(err => {
                    ctx.logger.error(`ERROR: ${err}`)
                })
                if (ctx.exception) {
                    ctx.logger.error(`FATAL: ${ctx.exception}`)
                    ctx.logger.print(ctx.exception.stack)
                }
            } else {
                const ms = Math.floor((performance.now() - start) * 1000) / 1000
                ctx.logger.success(`PASSED! (${ms} ms)`)
            }
            ctx.logger.dump()
        }
    }

    private addCtx(name: string) {
        const ctx = this.new(name)
        this.subContexts.push(ctx)
        return ctx
    }

    protected new = (name: string) =>   new Context(name, this.opts)

    protected numFailed(): number {
        return this.subContexts.reduce((count, ctx) => (
            count + ctx.numFailed()
        ), this.failed ? 1 : 0)
    }
}
