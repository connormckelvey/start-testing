import * as childProcess from 'child_process'
import * as path from 'path'
import { assert } from 'chai'

async function runFixture(fixture: string) {
    return new Promise<childProcess.ChildProcessWithoutNullStreams>((res) => {
        const file = path.join(__dirname, 'fixtures', fixture + '.ts')
        const process = childProcess.spawn("npx", ["ts-node", file])
        process.on('exit', () => {
            res(process)
        })
    })
}

async function testNodePass() {
    const process = await runFixture('nodePass')
    assert.equal(process.exitCode, 0)
}

async function testNodePassAssert() {
    const process = await runFixture('nodePassAssert')
    assert.equal(process.exitCode, 0)
}

async function testNodeFail() {
    const process = await runFixture('nodeFail')
    assert.equal(process.exitCode, 3)
}

async function testNodeFailAssert() {
    const process = await runFixture('nodeFailAssert')
    assert.equal(process.exitCode, 1)
}

export async function nodeIntegrationTests() {
    await Promise.all([
        testNodePass(),
        testNodePassAssert(),
        testNodeFail(),
        testNodeFailAssert()
    ])
}