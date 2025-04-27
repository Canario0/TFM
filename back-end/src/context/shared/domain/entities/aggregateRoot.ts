export default abstract class AggregateRoot {
    private _version: number;
    constructor(version?: number) {
        this._version = version ?? 0;
    }

    get version(): number {
        return this._version;
    }

    incrementVersion(): void {
        this._version++;
    }

    abstract toPrimitives(): any;
}
