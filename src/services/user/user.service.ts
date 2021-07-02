import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import { LoginRequestDto } from "../../dto/auth/login.dto";
import { RegisterRequestDto } from "../../dto/auth/register.dto";
import { JwtSigned } from "../../dto/auth/jwt.dto";
import { User } from "../../models";
import JwtService from "../jwt/jwt.service";
import { UserDto } from "../../dto/user/user.dto";
import { createNewCartByUser } from "../cart/cart.service";
import { pick } from 'lodash';

export const getUsers = async (): Promise<Array<User>> => {
  const userRepository = getRepository(User);
  return userRepository.find();
};

export const createUser = async (payload: UserDto): Promise<User> => {
  const userRepository = getRepository(User);
  const user = new User();
  return userRepository.save({
    ...user,
    ...payload,
  });
};

export const updateUser = async (id: string, payload: Omit<UserDto, 'id'>): Promise<User> => {
  const userRepository = getRepository(User);
  const update = await userRepository.update({ id }, payload);
  if (!update.affected) {
    throw 'USER_UPDATE_FAILED';
  }

  const user = await getUser(id);
  return user;
}

export const getUserById = async (userId: string): Promise<User> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ id: userId });
  if (!user) {
    throw 'USER_NOT_FOUND';
  }

  return user;
}

export const getUserByEmail = async (email: string): Promise<User> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ email });
  if (!user) {
    throw 'USER_NOT_FOUND';
  }

  return user;
}

export const getUser = async (id: string): Promise<User> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ id: id });
  if (!user) {
    throw 'USER_NOT_FOUND';
  }

  return user;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const userRepository = getRepository(User);
  const deleteSuccessfully = await userRepository.delete({ id });
  return !!deleteSuccessfully.affected;
}

export const doLogin = async (
  request: LoginRequestDto
): Promise<{ user: { email: string, id: string, isAdmin: boolean }, tokens: JwtSigned }> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ email: request.email });
  if (!user) {
    throw "USER_NOT_FOUND";
  }

  if (!bcrypt.compareSync(request.password, user.password)) {
    throw "INVALID_PASSWORD";
  }

  const jwtService = new JwtService();
  const tokens = jwtService.createJWT({ userId: user.id });
  const responseUser = pick(user, ['id', 'email', 'isAdmin'])
  return {
    user: responseUser,
    tokens
  };
};

export const registerUser = async (request: RegisterRequestDto): Promise<User> => {
  const userRepository = getRepository(User);
  if (request.password !== request.confirmPassword) {
    throw 'CONFIRM_PASSWORD_NOT_MATCH';
  }

  const user = new User();
  user.email = request.email;
  user.password = bcrypt.hashSync(request.password, 8);
  const newUser = await userRepository.save(user);
  await createNewCartByUser(newUser);
  return newUser;
}

export const resetPassword = async (email: string): Promise<boolean> => {
  const user = getUserByEmail(email);
  // mando el mail
  // if mail se mando
  // return true

  return false;
}