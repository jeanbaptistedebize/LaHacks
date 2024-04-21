import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PLANT_TYPES } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsString, IsUUID, IsArray, IsNumber } from 'class-validator';

export class PlantModel {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  type: PLANT_TYPES;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsArray()
  @IsNumber({}, { each: true })
  coord: number[];

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  createdAt: Date;
}

export class CreatePlantModel extends OmitType(PlantModel, [
  'id',
  'createdAt',
]) {}

export class CreatePlantResponse {
  name: string;
}

export class GetAllPlants {
  @ApiProperty()
  plants: Omit<PlantModel, 'image'>[];
}
