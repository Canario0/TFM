export const LOGGER = Symbol('Logger');

export interface Logger {
    log(message: string, metadata?: unknown): void;
    error(message: string | Error, metadata?: unknown): void;
    warn(message: string, metadata?: unknown): void;
    debug(message: string, metadata?: unknown): void;
    info(message: string, metadata?: unknown): void;
}
