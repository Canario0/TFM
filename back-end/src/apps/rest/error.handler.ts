import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import AlreadyExistsError from 'src/context/shared/domain/errors/alreadyExistsError';
import FailedPreconditionError from 'src/context/shared/domain/errors/failedPreconditionError';
import ForbiddenError from 'src/context/shared/domain/errors/forbiddenError';
import InternalError from 'src/context/shared/domain/errors/internalError';
import InvalidArgumentError from 'src/context/shared/domain/errors/invalidArgumentError';
import NotFoundError from 'src/context/shared/domain/errors/notFoundError';
import UnauthorizedError from 'src/context/shared/domain/errors/unauthorizedError';

@Catch(
  InvalidArgumentError,
  AlreadyExistsError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  FailedPreconditionError,
  InternalError,
)
export class ErrorHandler implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof InvalidArgumentError) {
      response
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: exception.message, code: exception.code });
    }
    if (
      exception instanceof AlreadyExistsError ||
      exception instanceof FailedPreconditionError
    ) {
      response
        .status(HttpStatus.CONFLICT)
        .send({ message: exception.message, code: exception.code });
    }
    if (exception instanceof NotFoundError) {
      response
        .status(HttpStatus.NOT_FOUND)
        .send({ message: exception.message, code: exception.code });
    }
    if (exception instanceof UnauthorizedError) {
      response
        .status(HttpStatus.UNAUTHORIZED)
        .send({ message: exception.message, code: exception.code });
    }
    if (exception instanceof ForbiddenError) {
      response.status(HttpStatus.FORBIDDEN).send({
        message: exception.message,
        code: exception.code,
      });
    }
    if (exception instanceof InternalError) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: exception.message, code: exception.code });
    }
  }
}
