import { Logger, ConflictException, Injectable } from '@nestjs/common';
import prisma from 'client';
import { Plant } from '@prisma/client';
import { CreatePlantModel, GetAllPlants } from './plant.dto';
import { generateImage } from 'utils/geminiCall';

export interface GeminiResponse {
  commonname: string;
  scientificname: string;
  isleaf: boolean;
  family: string;
  genus: string;
  species: string;
  description: string;
  disease: boolean;
  rarity: string;
}

@Injectable()
export class PlantService {
  async addPlant(
    ctx: any,
    plantData: CreatePlantModel,
  ): Promise<Omit<Plant, 'image'>> {
    let res: GeminiResponse = await generateImage(plantData.image);

    // @ts-ignore
    if (res.isleaf === 'true' || res.isleaf === true) {
      res.isleaf = true;
    } else {
      res.isleaf = false;
    }
    Logger.debug(JSON.stringify(res));
    try {
      const plantDb: Plant = await prisma.plant.create({
        // @ts-ignore
        data: {
          userId: ctx.__user.id,
          ...{
            commonname: 'string',
            scientificname: 'string',
            isleaf: false,
            family: 'string',
            genus: 'string',
            species: 'string',
            description: 'string',
            disease: 'string',
            rarity: 'string',
          },
          ...plantData,
          ...res,
        },
      });
      plantDb.image = undefined;
      return plantDb;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Plant not added !');
    }
  }

  async getAllplants() {
    try {
      const plants = await prisma.plant.findMany({
        select: {
          id: true,
          coord: true,
          commonname: true,
          scientificname: true,
          rarity: true,
          createdAt: true,
          userId: true,
        },
      });

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
