import { Logger, ConflictException, Injectable } from '@nestjs/common';
import prisma from 'client';
import { Plant } from '@prisma/client';
import {
  CreatePlantModel,
  CreatePlantResponse,
  GetAllPlants,
} from './plant.dto';
import { generateImage } from 'utils/geminiCall';

export interface GeminiResponse {
  commonname: string;
  scientificname: string;
  isleaf: boolean;
  family: string;
  genus: string;
  species: string;
  description: string;
  disease: string;
  rarity: string;
}

@Injectable()
export class PlantService {
  async addPlant(
    ctx: any,
    plantData: CreatePlantModel,
  ): Promise<CreatePlantResponse> {
    const res: GeminiResponse = await generateImage(plantData.image);
    try {
      const plantDb: Plant = await prisma.plant.create({
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
      return { name: res.commonname };
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
