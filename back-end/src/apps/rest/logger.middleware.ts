import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LOGGER, Logger } from 'src/context/shared/domain/logger';

@Injectable()
class LogsMiddleware implements NestMiddleware {
    constructor(
        @Inject(LOGGER)
        private readonly logger: Logger,
    ) {}

    use(request: Request, response: Response, next: NextFunction) {
        response.on('finish', () => {
            const { method, originalUrl } = request;
            const { statusCode, statusMessage } = response;

            const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`;

            if (statusCode >= 500) {
                return this.logger.error(message);
            }

            if (statusCode >= 400) {
                return this.logger.warn(message);
            }

            return this.logger.log(message);
        });

        next();
    }
}

export default LogsMiddleware;
