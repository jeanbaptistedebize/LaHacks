import { Logger, ConflictException, Injectable } from '@nestjs/common';
import prisma from 'client';
import { Plant } from '@prisma/client';
import { CreatePlantModel, GetAllPlants } from './plant.dto';

@Injectable()
export class PlantService {
  async addPlant(ctx: any, plantData: CreatePlantModel): Promise<void> {
    try {
      const plantDb: Plant = await prisma.plant.create({
        data: {
          userId: ctx.__user.id,
          ...plantData,
        },
      });
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Plant not added !');
    }
  }

  async getAllplants() {
    try {
      const plants: Plant[] = await prisma.plant.findMany();

      return {
        plants,
      } as GetAllPlants;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Failed to get all plants !');
    }
  }

  async getAllOwned(ctx: any) {
    try {
      const plants: Plant[] = await prisma.plant.findMany({
        where: { userId: ctx.__user.id },
      });

      return {
        plants,
      } as GetAllPlants;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Failed to get all users plants !');
    }
  }
}
