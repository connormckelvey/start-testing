export enum LogLevel {
    DEFAULT, INFO, WARN, ERROR, SUCCESS
}

export type LogEntry = {
    level: LogLevel,
    message: any[]
}

export class Logger {
    protected logs: LogEntry[] = []

    new = () => new Logger()
    print = (...message: any[]) => this.log(LogLevel.DEFAULT, ...message)
    info = (...message: any[]) => this.log(LogLevel.INFO, ...message)
    warn = (...message: any[]) => this.log(LogLevel.WARN, ...message)
    error = (...message: any[]) => this.log(LogLevel.ERROR, ...message)
    success = (...message: any[]) => this.log(LogLevel.SUCCESS, ...message)

    dump() {
        this.logs.forEach(entry => {
            console.log(...this.format(entry))
        })
    }

    protected log(level: LogLevel, ...message: any[]) {
        this.logs.push({ level, message: message })
    }

    protected format(entry: LogEntry) {
        return [entry.message.join(' ')]
    }
}