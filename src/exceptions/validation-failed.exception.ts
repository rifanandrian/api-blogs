import HttpExeption from './http.exception';

class ValidationFailedException extends HttpExeption {
  constructor(errors: Array<string>) {
    super(400, 'Validation Failed', errors);
  }
}

export default ValidationFailedException;
