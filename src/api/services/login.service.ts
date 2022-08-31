import repository from '../../database/Repository';
import ILogin from '../../interfaces/ILogin';
import AppError from '../../utils/appError';
import generateToken from '../../utils/generateToken';

export default {
  async execute(data: ILogin) {
    const findAdmin = await repository.admin.execute(data);

    if (!findAdmin) throw new AppError('Admin not found', 404);

    const { password, username, id } = findAdmin;
    if (password !== data.password) throw new AppError('Invalid fields', 400);

    return generateToken({ username, id});
  }
};