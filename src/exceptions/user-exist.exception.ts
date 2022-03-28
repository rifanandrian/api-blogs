import HttpExeption from './http.exception';

class UserExistExecption extends HttpExeption {
  constructor(email: string) {
    super(400, `User with email ${email} already exist`);
  }
}

export default UserExistExecption;
