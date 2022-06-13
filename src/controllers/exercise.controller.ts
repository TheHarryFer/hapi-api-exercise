import { Request, ResponseToolkit } from "@hapi/hapi";
import Boom from "@hapi/boom";
import { AppDataSource } from "../data-source";
import { Exercise } from "../entity/Exercise";
import { User } from "../entity/User";
import { Location } from "../entity/Location";

const exerciseRepository = AppDataSource.getRepository(Exercise);
const userRepository = AppDataSource.getRepository(User);
const locationRepository = AppDataSource.getRepository(Location);

// Handler add exercise data
export const add = async (
  request: Request,
  h: ResponseToolkit
): Promise<any> => {
  const data: any = request.payload;

  const findUser = await userRepository
    .createQueryBuilder("user")
    .where("user.id = :id", {
      id: data.user,
    })
    .getOne();

  const findLocation = await locationRepository
    .createQueryBuilder("location")
    .where("location.id = :id", {
      id: data.location,
    })
    .getOne();

  if (!findUser) return Boom.badRequest("Invalid user!");
  if (!findLocation) return Boom.badRequest("Invalid location!");

  const exercise = new Exercise();
  exercise.type = data.type;
  exercise.duration = data.duration;
  exercise.calories = data.calories;
  exercise.user = findUser;
  exercise.location = findLocation;

  await exerciseRepository.save(exercise);

  return h.response("Successfully added!");
};

// Handler get exercise data
export const get = async (
  request: Request,
  h: ResponseToolkit
): Promise<any> => {
  const exerciseId: number = Number(request.params.exerciseId) || 0;

  if (exerciseId) {
    const result = await exerciseRepository
      .createQueryBuilder("exercise")
      .leftJoinAndSelect("exercise.user", "user")
      .leftJoinAndSelect("exercise.location", "location")
      .select([
        "exercise.id",
        "exercise.type",
        "exercise.duration",
        "exercise.calories",
        "user.id",
        "user.firstname",
        "user.lastname",
        "user.username",
        "user.email",
        "location.id",
        "location.name",
        "location.address",
        "location.longtitude",
        "location.latitude",
      ])
      .where("exercise.id = :id", { id: exerciseId })
      .getOne();

    if (result) {
      return h.response(result);
    } else {
      return Boom.badRequest("Exercise not found!");
    }
  } else {
    const result = await exerciseRepository
      .createQueryBuilder("exercise")
      .leftJoinAndSelect("exercise.user", "user")
      .leftJoinAndSelect("exercise.location", "location")
      .select([
        "exercise.id",
        "exercise.type",
        "exercise.duration",
        "exercise.calories",
        "user.id",
        "user.firstname",
        "user.lastname",
        "user.username",
        "user.email",
        "location.id",
        "location.name",
        "location.address",
        "location.longtitude",
        "location.latitude",
      ])
      .getMany();

    return h.response(result);
  }
};

// Handler get exercise data by user id
export const getByUserId = async (
  request: Request,
  h: ResponseToolkit
): Promise<any> => {
  const userId: number = Number(request.params.userId) || 0;

  const findUser = await userRepository
    .createQueryBuilder("user")
    .where("user.id = :id", {
      id: userId,
    })
    .getOne();

  if (!findUser) return Boom.badRequest("Invalid user!");

  const result = await exerciseRepository
    .createQueryBuilder("exercise")
    .select([
      "exercise.id",
      "exercise.type",
      "exercise.duration",
      "exercise.calories",
    ])
    .where("exercise.user = :id", { id: userId })
    .getMany();

  return h.response(result);
};

// Handler get exercise data by location id
export const getByLocationId = async (
  request: Request,
  h: ResponseToolkit
): Promise<any> => {
  const locationId: number = Number(request.params.locationId) || 0;

  const findLocation = await locationRepository
    .createQueryBuilder("location")
    .where("location.id = :id", {
      id: locationId,
    })
    .getOne();

  if (!findLocation) return Boom.badRequest("Invalid location!");

  const result = await exerciseRepository
    .createQueryBuilder("exercise")
    .select([
      "exercise.id",
      "exercise.type",
      "exercise.duration",
      "exercise.calories",
    ])
    .where("exercise.location = :id", { id: locationId })
    .getMany();

  return h.response(result);
};

// Handler update exercise data
export const update = async (
  request: Request,
  h: ResponseToolkit
): Promise<any> => {
  const updateData: any = request.payload;
  const exerciseId: number = Number(request.params.exerciseId);
  const exerciseToUpdate = await exerciseRepository.findOneBy({
    id: exerciseId,
  });

  if (exerciseToUpdate) {
    if (updateData.type) {
      exerciseToUpdate.type = updateData.type;
    }
    if (updateData.duration) {
      exerciseToUpdate.duration = updateData.duration;
    }
    if (updateData.calories) {
      exerciseToUpdate.calories = updateData.calories;
    }
    if (updateData.user) {
      const findUser = await userRepository
        .createQueryBuilder("user")
        .where("user.id = :id", {
          id: updateData.user,
        })
        .getOne();

      if (!findUser) return Boom.badRequest("Invalid user!");

      exerciseToUpdate.user = findUser;
    }
    if (updateData.location) {
      const findLocation = await locationRepository
        .createQueryBuilder("exercise")
        .where("exercise.id = :id", {
          id: updateData.location,
        })
        .getOne();

      if (!findLocation) return Boom.badRequest("Invalid location!");

      exerciseToUpdate.location = findLocation;
    }

    await exerciseRepository.save(exerciseToUpdate);

    return h.response("Successfully updated!");
  }

  return Boom.badRequest("Exercise not found!");
};

// Handler delete exercise data
export const remove = async (
  request: Request,
  h: ResponseToolkit
): Promise<any> => {
  const exerciseId: number = Number(request.params.exerciseId);
  const exerciseToDelete = await exerciseRepository.findOneBy({
    id: exerciseId,
  });

  if (exerciseToDelete) {
    await exerciseRepository.softDelete({ id: exerciseId });

    return h.response("Successfully deleted!");
  }

  return Boom.badRequest("Exercise not found!");
};
