import BaseError from './base';

export default class AlreadyExistsError extends BaseError {
    constructor(message?: string) {
        super(message, 'ALREADY_EXISTS');
    }
}
