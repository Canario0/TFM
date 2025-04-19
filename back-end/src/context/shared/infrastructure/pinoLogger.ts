import pino, { Logger as PinoLoggerInstance } from 'pino';
import { LoggerService } from '@nestjs/common';
import { Logger } from '../domain/logger';

const format = '%s';
const formatWithMetadata = format + ' %O';

export default class PinoLogger implements Logger, LoggerService {
    private logger: PinoLoggerInstance;
    constructor() {
        this.logger = pino({
            level: 'debug',
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    ignore: 'pid,hostname',
                },
            },
        });
    }

    log(message: string, metadata?: unknown): void {
        this.info(message, metadata);
    }

    info(message: string, metadata?: unknown): void {
        this.logger.info(
            metadata ? formatWithMetadata : format,
            this.formatMessage(message, metadata),
            metadata,
        );
    }

    debug(message: string, metadata?: unknown): void {
        this.logger.debug(
            metadata ? formatWithMetadata : format,
            this.formatMessage(message, metadata),
            metadata,
        );
    }
    warn(message: string, metadata?: unknown): void {
        this.logger.warn(
            metadata ? formatWithMetadata : format,
            this.formatMessage(message, metadata),
            metadata,
        );
    }

    error(message: string | Error, metadata?: unknown): void {
        const instanceOfError = message instanceof Error;
        this.logger.error(
            metadata || (!metadata && instanceOfError)
                ? formatWithMetadata
                : format,
            instanceOfError
                ? message.message
                : this.formatMessage(message, message),
            metadata ?? message,
        );
    }

    verbose(message: string, metadata?: unknown): void {
        this.logger.trace(
            metadata ? formatWithMetadata : format,
            message,
            metadata,
        );
    }

    private formatMessage(message: string, metadata?: unknown): string {
        const instanceOfObject = metadata instanceof Object;
        return instanceOfObject ? message + metadata.constructor.name : message;
    }
}
