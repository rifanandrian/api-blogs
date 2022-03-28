import HttpExeption from './http.exception';

class AuthenticationFailedException extends HttpExeption {
  constructor(errors?: Array<string>) {
    super(401, `Authentication failed`, errors);
  }
}

export default AuthenticationFailedException;
