import BaseError from './base';

export default class NotImplementedError extends BaseError {
  constructor(message?: string) {
    super(message, 'NOT_IMPLEMENTED');
  }
}
