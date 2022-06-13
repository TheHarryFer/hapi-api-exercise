import { Request, ResponseToolkit } from "@hapi/hapi";
import Boom from "@hapi/boom";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);

// Handler get user data
export const get = async (
  request: Request,
  h: ResponseToolkit
): Promise<any> => {
  const userId: number = Number(request.params.userId) || 0;

  if (userId) {
    const result = await userRepository
      .createQueryBuilder("user")
      .select([
        "user.id",
        "user.firstname",
        "user.lastname",
        "user.username",
        "user.email",
      ])
      .where("user.id = :id", { id: userId })
      .getOne();

    if (result) {
      return h.response(result);
    } else {
      return Boom.badRequest("User not found!");
    }
  } else {
    const result = await userRepository
      .createQueryBuilder("user")
      .select([
        "user.id",
        "user.firstname",
        "user.lastname",
        "user.username",
        "user.email",
      ])
      .getMany();

    return h.response(result);
  }
};

// Handler update user data
export const update = async (
  request: Request,
  h: ResponseToolkit
): Promise<any> => {
  const updateData: any = request.payload;
  const userId: number = Number(request.params.userId);
  const userToUpdate = await userRepository.findOneBy({ id: userId });

  if (userToUpdate) {
    if (updateData.firstname) {
      userToUpdate.firstname = updateData.firstname;
    }
    if (updateData.lastname) {
      userToUpdate.lastname = updateData.lastname;
    }
    if (updateData.username) {
      const findDuplicate = await userRepository.findOneBy({
        username: updateData.username,
      });

      if (findDuplicate) return Boom.badRequest("Duplicated username!");

      userToUpdate.username = updateData.username;
    }
    if (updateData.email) {
      const findDuplicate = await userRepository.findOneBy({
        email: updateData.email,
      });

      if (findDuplicate) return Boom.badRequest("Duplicated email!");

      userToUpdate.email = updateData.email;
    }

    await userRepository.save(userToUpdate);

    return h.response("Successfully updated!");
  }

  return Boom.badRequest("User not found!");
};

// Handler delete user data
export const remove = async (
  request: Request,
  h: ResponseToolkit
): Promise<any> => {
  const userId: number = Number(request.params.userId);
  const userToDelete = await userRepository.findOneBy({ id: userId });

  if (userToDelete) {
    await userRepository.softDelete({ id: userId });

    return h.response("Successfully deleted!");
  }

  return Boom.badRequest("User not found!");
};
