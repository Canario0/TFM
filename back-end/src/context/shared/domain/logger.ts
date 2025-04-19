export const LOGGER = Symbol('Logger');

export interface Logger {
    log(message: string): void;
    error(message: string | Error): void;
    warn(message: string): void;
    debug(message: string): void;
    info(message: string): void;
}
