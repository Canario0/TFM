import BaseError from './base';

export default class InvalidArgumentError extends BaseError {
    constructor(message?: string) {
        super(message, 'INVALID_ARGUMENT');
    }
}
