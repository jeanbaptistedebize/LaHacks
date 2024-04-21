import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePlantModel } from './plant.dto';
import { PlantService } from './plant.service';
import { OllContext } from 'context/context.decorator';
import { LoggedMiddleware } from 'middleware/middleware.decorator';
import { Plant } from '@prisma/client';

@ApiBadRequestResponse({ description: 'Parameters are not valid' })
@ApiTags('Plant')
@ApiForbiddenResponse({
  description: 'User does not have permission to execute this action',
})
@Controller('/plant')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @ApiCookieAuth()
  @ApiBody({
    type: CreatePlantModel,
    description: 'Plant data model',
    examples: {
      template: {
        value: {
          coord: [0, 0],
          image: 'Stringb64',
        } as CreatePlantModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Post('/')
  async addPlant(@OllContext() ctx: any, @Body() body: CreatePlantModel): Promise<Omit<Plant, 'image'>> {
    return this.plantService.addPlant(ctx, body);
  }

  @LoggedMiddleware(true)
  @Get('/all')
  async getAllPlants() {
    return this.plantService.getAllplants();
  }

  @LoggedMiddleware(true)
  @Get('/owned')
  async getAllOwned(@OllContext() ctx: any) {
    return this.plantService.getAllOwned(ctx);
  }
}
