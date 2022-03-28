import HttpExeption from './http.exception';

class AuthorizationFailedException extends HttpExeption {
  constructor(errors?: Array<string>) {
    super(403, `Authorization failed`, errors);
  }
}

export default AuthorizationFailedException;
