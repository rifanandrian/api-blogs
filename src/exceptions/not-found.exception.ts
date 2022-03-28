import HttpExeption from './http.exception';

class NotFoundException extends HttpExeption {
  constructor(message: string) {
    super(400, message);
  }
}

export default NotFoundException;
