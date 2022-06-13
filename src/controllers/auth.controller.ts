import { Request, ResponseToolkit } from "@hapi/hapi";
import Boom from "@hapi/boom";
import * as bcrypt from "bcrypt";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { createToken } from "../utils/token";

const userRepository = AppDataSource.getRepository(User);

// Handler register new user
export const register = async (
  request: Request,
  h: ResponseToolkit
): Promise<any> => {
  const data: any = request.payload;

  const duplicateUser = await userRepository
    .createQueryBuilder("user")
    .where("user.username = :username OR user.email = :email", {
      username: data.username,
      email: data.email,
    })
    .getOne();

  if (!duplicateUser) {
    data.password = bcrypt.hashSync(data.password, 10);

    const user = new User();
    user.firstname = data.firstname;
    user.lastname = data.lastname;
    user.username = data.username;
    user.password = data.password;
    user.email = data.email;

    await userRepository.save(user);

    return h.response("Successfully registered!");
  } else {
    return Boom.badRequest("Username or email already registered!");
  }
};

// Handler login user
export const login = async (
  request: Request,
  h: ResponseToolkit
): Promise<any> => {
  const data: any = request.payload;

  const findUser = await userRepository
    .createQueryBuilder("user")
    .where("user.username = :username OR user.email = :email", {
      username: data.username,
      email: data.email,
    })
    .getOne();

  if (findUser && bcrypt.compareSync(data.password, findUser.password)) {
    return h.response({
      token: createToken({ id: findUser.id, username: findUser.username }),
    });
  }

  return Boom.badRequest("User not found!");
};
