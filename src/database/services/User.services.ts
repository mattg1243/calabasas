import User from '../models/User.entity';
import { CreateUserInput } from '../schemas/User.schema';
import { AppDataSource } from '../dataSource';
import { signJwt } from '../../utils/jwt';

// load user repository
const userRepository = AppDataSource.getRepository(User);

export const createUser = async (input: CreateUserInput) => {
  return (await AppDataSource.manager.save(AppDataSource.manager.create(User, input))) as User;
};

export const findUserByEmail = async (email: string) => {
  return await userRepository.findOneBy({ email: email });
};

export const findUserById = async (userId: string) => {
  return await userRepository.findOneBy({ _id: userId });
};

export const findUser = async (query: Object) => {
  return await userRepository.findOneBy(query);
};

export const signTokens = async (user: User) => {
  const accessToken = signJwt(user.toJSON(), 'ACCESS_PRIVATE_KEY', { expiresIn: '6h' });

  const refreshToken = signJwt(user.toJSON(), 'REFRESH_PRIVATE_KEY', {
    expiresIn: '2 days',
  });

  return { accessToken, refreshToken };
};
