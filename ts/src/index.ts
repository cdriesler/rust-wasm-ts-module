import rsfoo, { greet } from 'rsfoo'

export class Foo {

    private wasm: typeof rsfoo | undefined

    /** Compiles and stores a reference to the library's wasm module. */
    public async initialize(): Promise<void> {
        // Load wasm asynchronously
        this.wasm = await import('../node_modules/rsfoo')
    }

    /** Helper function that verifies wasm has been initialized. */
    private ready(): void {
        if (!this.wasm) {
            throw new Error('The wasm package has not been initialized.')
        }
    }

    public doSomething(): string {
        // Verify that wasm is initialized and can be called.
        this.ready()
        
        // Run imported function from rust
        const message = greet('mocha')

        return message
    }
}