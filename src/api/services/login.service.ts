import Login from '../../database/models/Login';
import ILogin from '../../interfaces/ILogin';
import appError from '../../middlewares/appError';
import generateToken from '../../utils/generateToken';

export default {
  async execute(data: ILogin) {
    const findUser = await Login.execute(data);

    if (!findUser) throw appError('Admin not found', 404);

    const { password, username, id } = findUser;
    if (password !== data.password) throw appError('Invalid fields', 400);

    return generateToken({ username, id});
  }
};