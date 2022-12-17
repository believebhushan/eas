const httpStatusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500
  }
  
  class BaseError extends Error {
    constructor(message, name, statusCode, details) {
      super(message);
      this.name = name || 'Base Error';
      this.statusCode = statusCode || 500;
      this.details = details || undefined;
    }
  }
  
  class BadRequest extends BaseError {
    constructor(message, statusCode = httpStatusCodes.BAD_REQUEST, details) {
      super(message, 'BadRequest', statusCode, details);
    }
  }
  
  class NotFound extends BaseError {
    constructor(message, statusCode = httpStatusCodes.NOT_FOUND, details) {
      super(message, 'NotFound', statusCode, details, details);
    }
  }
  
  class InternalServerError extends BaseError {
    constructor(statusCode = httpStatusCodes.INTERNAL_SERVER, message, details) {
      super(message, 'InternalServerError', statusCode, details, details);
    }
  }
  
  module.exports = {
    BaseError,
    BadRequest,
    NotFound,
    InternalServerError,
  };
  