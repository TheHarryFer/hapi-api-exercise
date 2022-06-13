import { Request, ResponseToolkit } from "@hapi/hapi";
import Boom from "@hapi/boom";
import { AppDataSource } from "../data-source";
import { Location } from "../entity/Location";

const locationRepository = AppDataSource.getRepository(Location);

// Handler add location data
export const add = async (
  request: Request,
  h: ResponseToolkit
): Promise<any> => {
  const data: any = request.payload;

  const location = new Location();
  location.name = data.name;
  location.address = data.address;
  location.longtitude = data.longtitude;
  location.latitude = data.latitude;

  await locationRepository.save(location);

  return h.response("Successfully added!");
};

// Handler get location data
export const get = async (
  request: Request,
  h: ResponseToolkit
): Promise<any> => {
  const locationId: number = Number(request.params.locationId) || 0;

  if (locationId) {
    const result = await locationRepository
      .createQueryBuilder("location")
      .select([
        "location.id",
        "location.name",
        "location.address",
        "location.longtitude",
        "location.latitude",
      ])
      .where("location.id = :id", { id: locationId })
      .getOne();

    if (result) {
      return h.response(result);
    } else {
      return Boom.badRequest("Location not found!");
    }
  } else {
    const result = await locationRepository
      .createQueryBuilder("location")
      .select([
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

// Handler update location data
export const update = async (
  request: Request,
  h: ResponseToolkit
): Promise<any> => {
  const updateData: any = request.payload;
  const locationId: number = Number(request.params.locationId);
  const locationToUpdate = await locationRepository.findOneBy({
    id: locationId,
  });

  if (locationToUpdate) {
    if (updateData.name) {
      locationToUpdate.name = updateData.name;
    }
    if (updateData.address) {
      locationToUpdate.address = updateData.address;
    }
    if (updateData.longtitude) {
      locationToUpdate.longtitude = updateData.longtitude;
    }
    if (updateData.latitude) {
      locationToUpdate.latitude = updateData.latitude;
    }

    await locationRepository.save(locationToUpdate);

    return h.response("Successfully updated!");
  }

  return Boom.badRequest("Location not found!");
};

// Handler delete location data
export const remove = async (
  request: Request,
  h: ResponseToolkit
): Promise<any> => {
  const locationId: number = Number(request.params.locationId);
  const locationToDelete = await locationRepository.findOneBy({
    id: locationId,
  });

  if (locationToDelete) {
    await locationRepository.softDelete({ id: locationId });

    return h.response("Successfully deleted!");
  }

  return Boom.badRequest("Location not found!");
};
