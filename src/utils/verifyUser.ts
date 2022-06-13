import { Request, ResponseToolkit } from "@hapi/hapi";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

// Verify user token
export const verifyUser = async (
  decoded: any,
  request: Request,
  h: ResponseToolkit
) => {
  const findUser = await AppDataSource.getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id AND user.username = :username", {
      id: decoded.id,
      username: decoded.username,
    })
    .getOne();

  if (findUser) {
    return { isValid: true, credentials: decoded };
  } else {
    return { isValid: false };
  }
};
