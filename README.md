# Start Testing

Start Testing is a lightweight Typescript Testing Library with 0 dependencies and a minimal yet flexible API to get you from idea to validation as fast as possible.

## Install

`npm install --save-dev start-testing`

## Usage

### Writing Tests

```typescript
import * as testing from 'start-testing'

export async function testSimple(t: testing.Context) {
    const { status } = await fetch('https://www.example.com')
    if (status !== 200) {
        t.error(`expected: ${200}, got: ${status}`)
    }
}

export async function testFatal(t: testing.Context) {
    const { status } = await fetch('https://www.example.com')
    if (status !== 403) {
        t.fatal(`expected: ${403}, got: ${status}`)
    }
}

export async function testTableSerial(t: testing.Context) {
    const tests = [
        { url: "https://www.example.com", expectedCode: 200 },
        { url: "https://www.google.com", expectedCode: 200 },
        { url: "https://www.facebook.com", expectedCode: 200 },
        { url: "https://www.amazon.com", expectedCode: 200 }
    ]

    for (let test of tests) {
        await t.run(test.url, async t => {
            const res = await fetch(test.url)
            if (res.status !== test.expectedCode) {
                t.error(`expected: ${test.expectedCode}, got: ${res.status}`)
            }
        })
    }
}

export async function testTableParallel(t: testing.Context) {
    const tests = [
        { url: "https://www.example.com", expectedCode: 200 },
        { url: "https://www.google.com", expectedCode: 200 },
        { url: "https://www.facebook.com", expectedCode: 200 },
        { url: "https://www.amazon.com", expectedCode: 200 }
    ]

    await Promise.all(
        tests.map(test => t.run(test.url, async (t) => {
            const res = await fetch(test.url)
            if (res.status !== test.expectedCode) {
                t.error(`expected: ${test.expectedCode}, got: ${res.status}`)
            }
        }))
    )
}

```

### Running Tests (Node)

`runTests.ts`

```typescript
import * as testing from 'start-testing'
import * as tests from 'path/to/tests'

testing.Runner.runSuite('example tests', tests)
    .then(process.exit)
```

```bash
npx ts-node ./runTests.ts
```


## Reference 

### Context API

- `log(...message: any[])` - logs a message
- `error(message: any)` - marks the test as failed and records the error, allows the test to continue
- `fatal(message: any)` - marks the test as failed and records the error, stops the test from continuing 
