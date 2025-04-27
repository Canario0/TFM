import BaseError from './base';

export default class ConcurrencyError extends BaseError {
    constructor(message?: string) {
        super(message, 'CONCURRENCY_ERROR');
    }
}
