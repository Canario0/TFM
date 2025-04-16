import BaseError from './base';

export default class InternalError extends BaseError {
  constructor(message?: string) {
    super(message, 'INTERNAL');
  }
}
