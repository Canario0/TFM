import BaseError from './base';

export default class FailedPreconditionError extends BaseError {
    constructor(message?: string) {
        super(message, 'FAILED_PRECONDITION');
    }
}
