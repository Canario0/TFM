export default abstract class AggregateRoot {
    private _version: number;
    private dirtyFields: Set<string> = new Set();

    constructor(version?: number) {
        this._version = version ?? 0;
    }

    get version(): number {
        return this._version;
    }

    abstract toPrimitives(): any;

    getDirtyPrimitives(): Record<string, unknown> {
        return Object.fromEntries(
            Array.from(this.dirtyFields).map((field) => [field, this[field]]),
        );
    }

    isDirty(): boolean {
        return this.dirtyFields.size > 0;
    }

    incrementVersion(): void {
        this._version++;
    }

    commit(): void {
        this.cleanDirty();
        this.incrementVersion();
    }

    protected markDirty(field: string): void {
        this.dirtyFields.add(field);
    }

    private cleanDirty(): void {
        this.dirtyFields.clear();
    }
}
