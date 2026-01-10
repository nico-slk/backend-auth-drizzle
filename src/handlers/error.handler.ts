export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends HttpError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

export class ConflictError extends HttpError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}
