import * as testing from '../'

export class NodeColorLogger extends testing.Logger {
    private static colorCodes = [0, 36, 33, 35, 32]

    new = () => new NodeColorLogger()
    
    protected format(entry: testing.LogEntry) {
        const code = NodeColorLogger.colorCodes[entry.level]
        return [`\x1b[${code}m%s\x1b[0m`, entry.message.join(' ')]
    }
}